-- Add author tracking columns to blog_posts
ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS author_id uuid,
  ADD COLUMN IF NOT EXISTS last_edited_by uuid;

-- Trigger function: set author + last_edited_by from auth.uid() automatically
CREATE OR REPLACE FUNCTION public.blog_posts_set_author()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.author_id IS NULL THEN
      NEW.author_id := auth.uid();
    END IF;
    NEW.last_edited_by := auth.uid();
  ELSIF TG_OP = 'UPDATE' THEN
    NEW.last_edited_by := COALESCE(auth.uid(), NEW.last_edited_by);
    NEW.updated_at := now();
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS blog_posts_author_insert ON public.blog_posts;
CREATE TRIGGER blog_posts_author_insert
  BEFORE INSERT ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.blog_posts_set_author();

DROP TRIGGER IF EXISTS blog_posts_author_update ON public.blog_posts;
CREATE TRIGGER blog_posts_author_update
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.blog_posts_set_author();

-- Helper RPC: returns id + email for a list of user ids (only for authenticated users)
CREATE OR REPLACE FUNCTION public.get_admin_user_emails(user_ids uuid[])
RETURNS TABLE(id uuid, email text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT u.id, u.email::text
  FROM auth.users u
  WHERE u.id = ANY(user_ids)
    AND auth.uid() IS NOT NULL;
$$;

REVOKE ALL ON FUNCTION public.get_admin_user_emails(uuid[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_admin_user_emails(uuid[]) TO authenticated;