import { supabase } from "@/integrations/supabase/client";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface SubmitPayload {
  kind: "contact" | "ebook";
  name: string;
  email: string;
  phone?: string;
  city?: string;
  projectType?: string;
  area?: string;
  stage?: string;
  message?: string;
  consent: boolean;
  /** Honeypot: must stay empty for real users. */
  website?: string;
}

// Flat shape (not a discriminated union): the project compiles with strict: false,
// where `if (!result.ok)` would not narrow a union.
export interface SubmitResult {
  ok: boolean;
  reason?: "validation" | "rate_limited" | "network" | "server";
  message?: string;
}

const MESSAGES = {
  validation: "Sprawdź, proszę, poprawność wypełnionych pól.",
  rate_limited: "Wysłano zbyt wiele wiadomości w krótkim czasie. Spróbuj ponownie za godzinę albo napisz na anprojekt.com@gmail.com.",
  network: "Nie udało się połączyć z serwerem. Sprawdź internet i spróbuj ponownie.",
  server: "Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz na anprojekt.com@gmail.com.",
} as const;

const fail = (reason: keyof typeof MESSAGES): SubmitResult => ({ ok: false, reason, message: MESSAGES[reason] });

/**
 * Sends a form to the `submit-form` edge function. Resolves `{ ok: true }` only
 * after the server confirmed the submission was stored.
 */
export async function submitForm(payload: SubmitPayload): Promise<SubmitResult> {
  try {
    const { data, error } = await supabase.functions.invoke("submit-form", { body: payload });
    if (error) {
      const status: number | undefined = (error as { context?: { status?: number } }).context?.status;
      if (status === 429) return fail("rate_limited");
      if (status === 400) return fail("validation");
      if (status === undefined) return fail("network");
      return fail("server");
    }
    if (data?.ok !== true) return fail("server");
    return { ok: true };
  } catch {
    return fail("network");
  }
}
