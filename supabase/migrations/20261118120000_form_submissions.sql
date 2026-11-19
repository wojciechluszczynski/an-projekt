-- Contact form + ebook sign-ups.
-- Rows are written ONLY by the `submit-form` edge function (service role),
-- so there is intentionally no INSERT policy for anon/authenticated.

CREATE TABLE public.form_submissions (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind          text NOT NULL CHECK (kind IN ('contact', 'ebook')),
  name          text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email         text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  phone         text CHECK (char_length(phone) <= 30),
  city          text CHECK (char_length(city) <= 100),
  project_type  text CHECK (char_length(project_type) <= 100),
  area          text CHECK (char_length(area) <= 30),
  stage         text CHECK (char_length(stage) <= 100),
  message       text CHECK (char_length(message) <= 2000),
  consent       boolean NOT NULL DEFAULT false,
  -- salted SHA-256 of the client IP, used only for rate limiting
  ip_hash       text,
  user_agent    text CHECK (char_length(user_agent) <= 300),
  notified_at   timestamptz,
  notify_error  text,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX form_submissions_ip_hash_created_at_idx
  ON public.form_submissions (ip_hash, created_at DESC);
CREATE INDEX form_submissions_created_at_idx
  ON public.form_submissions (created_at DESC);

ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Admins (Anna, Wojtek) can read submissions and delete them (GDPR erasure).
CREATE POLICY "Admins can view submissions"
  ON public.form_submissions FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete submissions"
  ON public.form_submissions FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
