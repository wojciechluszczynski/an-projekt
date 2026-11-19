// Pure validation for the submit-form edge function. No Deno/runtime imports,
// so it can be unit-tested with vitest (src/test/submit-form-validate.test.ts).

export type FormKind = "contact" | "ebook";

export interface CleanSubmission {
  kind: FormKind;
  name: string;
  email: string;
  phone: string | null;
  city: string | null;
  project_type: string | null;
  area: string | null;
  stage: string | null;
  message: string | null;
  consent: boolean;
}

export type ValidationResult =
  | { ok: true; honeypot: false; data: CleanSubmission }
  | { ok: true; honeypot: true }
  | { ok: false; fields: Record<string, string> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// eslint-disable-next-line no-control-regex
const CONTROL_RE = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/;

const LIMITS = {
  name: 100,
  email: 255,
  phone: 30,
  city: 100,
  projectType: 100,
  area: 30,
  stage: 100,
  message: 2000,
} as const;

const PROJECT_TYPES = ["Mieszkanie", "Dom jednorodzinny", "Pojedyncze pomieszczenie", "Lokal usługowy", "Inne"];
const STAGES = ["Dopiero planuję", "Mam projekt / pomysł", "Remont w trakcie", "Szukam konsultacji"];

const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "");

export function validateSubmission(input: unknown): ValidationResult {
  const fields: Record<string, string> = {};
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return { ok: false, fields: { body: "invalid" } };
  }
  const raw = input as Record<string, unknown>;

  // Honeypot: real users never see this field. Pretend success, store nothing.
  if (str(raw.website) !== "") return { ok: true, honeypot: true };

  const kind = raw.kind;
  if (kind !== "contact" && kind !== "ebook") {
    return { ok: false, fields: { kind: "invalid" } };
  }

  const name = str(raw.name);
  const email = str(raw.email).toLowerCase();
  const phone = str(raw.phone);
  const city = str(raw.city);
  const projectType = str(raw.projectType);
  const area = str(raw.area);
  const stage = str(raw.stage);
  const message = str(raw.message);
  const consent = raw.consent === true;

  if (!name) fields.name = "required";
  else if (name.length > LIMITS.name || CONTROL_RE.test(name) || /[\r\n]/.test(name)) fields.name = "invalid";

  if (!email) fields.email = "required";
  else if (email.length > LIMITS.email || !EMAIL_RE.test(email) || CONTROL_RE.test(email)) fields.email = "invalid";

  if (phone.length > LIMITS.phone || CONTROL_RE.test(phone)) fields.phone = "invalid";
  if (city.length > LIMITS.city || CONTROL_RE.test(city)) fields.city = "invalid";
  if (area.length > LIMITS.area || CONTROL_RE.test(area)) fields.area = "invalid";
  if (projectType && !PROJECT_TYPES.includes(projectType)) fields.projectType = "invalid";
  if (stage && !STAGES.includes(stage)) fields.stage = "invalid";
  if (message.length > LIMITS.message) fields.message = "invalid";

  if (kind === "contact" && !message) fields.message = "required";
  if (!consent) fields.consent = "required";

  if (Object.keys(fields).length > 0) return { ok: false, fields };

  return {
    ok: true,
    honeypot: false,
    data: {
      kind,
      name,
      email,
      phone: phone || null,
      city: city || null,
      project_type: projectType || null,
      area: area || null,
      stage: stage || null,
      message: message || null,
      consent,
    },
  };
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Single-line, length-capped text safe for an email subject. */
export function subjectSafe(s: string, max = 80): string {
  // eslint-disable-next-line no-control-regex
  return s.replace(/[\u0000-\u001f\u007f]+/g, " ").trim().slice(0, max);
}
