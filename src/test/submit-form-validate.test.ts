import { describe, it, expect } from "vitest";
import { type CleanSubmission, validateSubmission, escapeHtml, subjectSafe } from "../../supabase/functions/submit-form/validate";

const valid = {
  kind: "contact",
  name: "  Jan Kowalski ",
  email: " Jan@Example.com ",
  message: "Chcę projekt mieszkania",
  consent: true,
};

describe("validateSubmission", () => {
  it("accepts a valid contact submission and normalises it", () => {
    const r = validateSubmission(valid);
    expect(r).toMatchObject({ ok: true, honeypot: false });
    const data = (r as { data: CleanSubmission }).data;
    expect(data.name).toBe("Jan Kowalski");
    expect(data.email).toBe("jan@example.com");
    expect(data.phone).toBeNull();
  });

  it("requires a message for contact but not for ebook", () => {
    expect(validateSubmission({ ...valid, message: "" })).toMatchObject({ ok: false, fields: { message: "required" } });
    expect(validateSubmission({ ...valid, kind: "ebook", message: undefined }).ok).toBe(true);
  });

  it("requires explicit consent", () => {
    expect(validateSubmission({ ...valid, consent: false })).toMatchObject({ ok: false, fields: { consent: "required" } });
    expect(validateSubmission({ ...valid, consent: "true" })).toMatchObject({ ok: false });
  });

  it("rejects bad email, over-long fields and control characters", () => {
    expect(validateSubmission({ ...valid, email: "not-an-email" })).toMatchObject({ ok: false, fields: { email: "invalid" } });
    expect(validateSubmission({ ...valid, message: "x".repeat(2001) })).toMatchObject({ ok: false, fields: { message: "invalid" } });
    expect(validateSubmission({ ...valid, name: "Jan\r\nBcc: evil@x.com" })).toMatchObject({ ok: false, fields: { name: "invalid" } });
  });

  it("rejects unknown kinds and non-object bodies", () => {
    expect(validateSubmission({ ...valid, kind: "spam" }).ok).toBe(false);
    expect(validateSubmission(null).ok).toBe(false);
    expect(validateSubmission("x").ok).toBe(false);
    expect(validateSubmission([]).ok).toBe(false);
  });

  it("rejects values outside the select lists", () => {
    expect(validateSubmission({ ...valid, projectType: "Zamek" })).toMatchObject({ ok: false, fields: { projectType: "invalid" } });
    expect(validateSubmission({ ...valid, stage: "Mieszkanie", projectType: "Mieszkanie" })).toMatchObject({ ok: false, fields: { stage: "invalid" } });
    expect(validateSubmission({ ...valid, projectType: "Mieszkanie", stage: "Remont w trakcie" }).ok).toBe(true);
  });

  it("flags the honeypot so nothing is stored", () => {
    expect(validateSubmission({ ...valid, website: "http://spam" })).toEqual({ ok: true, honeypot: true });
  });
});

describe("email helpers", () => {
  it("escapes HTML", () => {
    expect(escapeHtml(`<script>"a" & 'b'</script>`)).toBe("&lt;script&gt;&quot;a&quot; &amp; &#39;b&#39;&lt;/script&gt;");
  });
  it("makes single-line capped subjects", () => {
    expect(subjectSafe("a\r\nBcc: x")).not.toMatch(/[\r\n]/);
    expect(subjectSafe("x".repeat(200)).length).toBe(80);
  });
});
