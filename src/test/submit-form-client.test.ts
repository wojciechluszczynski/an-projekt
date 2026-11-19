import { describe, it, expect, vi, beforeEach } from "vitest";

const { invoke } = vi.hoisted(() => ({ invoke: vi.fn() }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: { functions: { invoke } } }));

import { submitForm, EMAIL_RE } from "@/lib/submitForm";

const payload = { kind: "contact" as const, name: "Jan", email: "jan@example.com", message: "Cześć", consent: true };

describe("submitForm", () => {
  // Braces matter: returning the mock from beforeEach makes vitest call it as a cleanup hook.
  beforeEach(() => {
    invoke.mockReset();
  });

  it("calls the submit-form function and resolves ok only on a confirmed save", async () => {
    invoke.mockResolvedValue({ data: { ok: true }, error: null });
    await expect(submitForm(payload)).resolves.toEqual({ ok: true });
    expect(invoke).toHaveBeenCalledWith("submit-form", { body: payload });
  });

  it("does not report success when the response lacks ok: true", async () => {
    invoke.mockResolvedValue({ data: {}, error: null });
    await expect(submitForm(payload)).resolves.toMatchObject({ ok: false, reason: "server" });
  });

  it("maps HTTP errors to user-facing reasons", async () => {
    invoke.mockResolvedValue({ data: null, error: { context: { status: 429 } } });
    await expect(submitForm(payload)).resolves.toMatchObject({ ok: false, reason: "rate_limited" });
    invoke.mockResolvedValue({ data: null, error: { context: { status: 400 } } });
    await expect(submitForm(payload)).resolves.toMatchObject({ ok: false, reason: "validation" });
    invoke.mockResolvedValue({ data: null, error: { context: { status: 500 } } });
    await expect(submitForm(payload)).resolves.toMatchObject({ ok: false, reason: "server" });
  });

  it("treats a failed fetch (error without an HTTP response) as a network error", async () => {
    invoke.mockResolvedValue({ data: null, error: { name: "FunctionsFetchError" } });
    await expect(submitForm(payload)).resolves.toMatchObject({ ok: false, reason: "network" });
  });

  it("treats a thrown error as a network error", async () => {
    invoke.mockImplementation(() => {
      throw new Error("boom");
    });
    const result = await submitForm(payload);
    expect(result).toMatchObject({ ok: false, reason: "network" });
  });

  it("validates email shape", () => {
    expect(EMAIL_RE.test("a@b.pl")).toBe(true);
    expect(EMAIL_RE.test("a@b")).toBe(false);
  });
});
