// Edge function: receives contact-form and ebook sign-ups from anprojekt.com.pl,
// validates them, rate-limits per IP, stores them in public.form_submissions and
// notifies the studio by email (Resend).
//
// Secrets (supabase secrets set ...):
//   RESEND_API_KEY   Resend API key (without it submissions are still saved)
//   MAIL_FROM        e.g. "AN Projekt <formularz@anprojekt.com.pl>" (verified Resend domain)
//   NOTIFY_TO        optional, defaults to anprojekt.com@gmail.com
//   IP_HASH_SALT     optional random string used when hashing IPs for rate limiting
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are injected by Supabase.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.100.1";
import { type CleanSubmission, escapeHtml, subjectSafe, validateSubmission } from "./validate.ts";

const RATE_LIMIT_MAX = 5; // submissions per IP...
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // ...per hour
const MAX_BODY_BYTES = 10_000;

const ALLOWED_ORIGINS = [
  /^https:\/\/(www\.)?anprojekt\.com\.pl$/,
  /^https:\/\/an-projekt\.lovable\.app$/,
  /^https:\/\/[a-z0-9-]+\.(lovable\.app|lovableproject\.com)$/,
  /^https:\/\/([a-z0-9-]+\.)?an-projekt\.pages\.dev$/, // Cloudflare Pages: production alias and previews
  /^http:\/\/localhost:\d+$/,
];

function corsHeaders(origin: string | null): Record<string, string> {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin",
  };
  if (origin && ALLOWED_ORIGINS.some((re) => re.test(origin))) {
    headers["Access-Control-Allow-Origin"] = origin;
  }
  return headers;
}

function json(body: unknown, status: number, cors: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}

async function sha256Hex(input: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("cf-connecting-ip") ?? req.headers.get("x-forwarded-for") ?? "";
  return fwd.split(",")[0].trim() || "unknown";
}

Deno.serve(async (req) => {
  const cors = corsHeaders(req.headers.get("origin"));
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405, cors);

  const text = await req.text();
  if (text.length > MAX_BODY_BYTES) return json({ error: "too_large" }, 413, cors);
  let payload: unknown;
  try {
    payload = JSON.parse(text);
  } catch {
    return json({ error: "invalid_json" }, 400, cors);
  }

  const result = validateSubmission(payload);
  if (!result.ok) return json({ error: "validation", fields: result.fields }, 400, cors);
  // Bot filled the hidden field: report success, store nothing.
  if (result.honeypot) return json({ ok: true }, 200, cors);
  const sub = result.data;

  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
    auth: { persistSession: false },
  });

  const ipHash = await sha256Hex(`${Deno.env.get("IP_HASH_SALT") ?? "an-projekt"}:${clientIp(req)}`);
  const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
  const { count, error: countError } = await supabase
    .from("form_submissions")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", since);
  if (countError) {
    console.error("rate limit lookup failed", countError.message);
    return json({ error: "server" }, 500, cors);
  }
  if ((count ?? 0) >= RATE_LIMIT_MAX) return json({ error: "rate_limited" }, 429, cors);

  const { data: row, error: insertError } = await supabase
    .from("form_submissions")
    .insert({
      ...sub,
      ip_hash: ipHash,
      user_agent: (req.headers.get("user-agent") ?? "").slice(0, 300) || null,
    })
    .select("id")
    .single();
  if (insertError || !row) {
    console.error("insert failed", insertError?.message);
    return json({ error: "server" }, 500, cors);
  }

  // The submission is safely stored. A mail failure must not lose it, so it is
  // recorded on the row instead of failing the request.
  let notified = false;
  let notifyError: string | null = null;
  const apiKey = Deno.env.get("RESEND_API_KEY");
  const from = Deno.env.get("MAIL_FROM");
  if (!apiKey || !from) {
    notifyError = "mail_not_configured";
  } else {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to: [Deno.env.get("NOTIFY_TO") ?? "anprojekt.com@gmail.com"],
          reply_to: sub.email,
          subject: subjectSafe(
            sub.kind === "contact" ? `Nowe zapytanie ze strony: ${sub.name}` : `Nowy zapis na ebooka: ${sub.name}`,
          ),
          html: renderEmail(sub),
        }),
        signal: AbortSignal.timeout(8000),
      });
      if (res.ok) notified = true;
      else notifyError = `resend_${res.status}`;
    } catch (e) {
      notifyError = `resend_exception: ${String(e).slice(0, 150)}`;
    }
  }
  if (notifyError) console.error("notification failed", row.id, notifyError);
  await supabase
    .from("form_submissions")
    .update({ notified_at: notified ? new Date().toISOString() : null, notify_error: notifyError })
    .eq("id", row.id);

  return json({ ok: true, notified }, 200, cors);
});

function renderEmail(s: CleanSubmission): string {
  const rows: [string, string | null][] = [
    ["Imię i nazwisko", s.name],
    ["E-mail", s.email],
    ["Telefon", s.phone],
    ["Miejscowość", s.city],
    ["Typ projektu", s.project_type],
    ["Metraż", s.area],
    ["Etap", s.stage],
  ];
  const table = rows
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${k}</td><td>${escapeHtml(v as string)}</td></tr>`)
    .join("");
  const message = s.message
    ? `<p style="white-space:pre-wrap;border-left:3px solid #ddd;padding-left:12px">${escapeHtml(s.message)}</p>`
    : "";
  return `<h2 style="font-family:sans-serif">${s.kind === "contact" ? "Nowe zapytanie ze strony" : "Nowy zapis na ebooka"}</h2>
<table style="font-family:sans-serif;font-size:14px">${table}</table>${message}
<p style="font-family:sans-serif;font-size:12px;color:#888">Zgoda RODO: tak. Odpowiedz na ten e-mail, aby napisać do klienta.</p>`;
}
