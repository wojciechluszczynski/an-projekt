-- Site editor data model (draft; not applied anywhere).
--
-- Idea, copied from the Alloweat staging editor: the code keeps every text and
-- image as a default, `site_content` holds only the overrides Anna saved, and
-- every save is an append-only version with author, note and before/after.
-- A key with no row means "use the default from the code", so the page never has a hole.
-- Realizacje (projects) are real records because Anna adds and reorders them.

-- Who may edit the site: admin (Wojtek) and editor (Anna).
CREATE OR REPLACE FUNCTION public.can_edit_site()
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor');
$$;

-- ---------------------------------------------------------------- overrides
CREATE TABLE public.site_content (
  key         text PRIMARY KEY CHECK (key ~ '^[a-z0-9][a-z0-9_.-]{0,119}$'),
  -- {"text": "..."} for copy, {"path": "site-media/...", "alt": "..."} for images
  value       jsonb NOT NULL,
  updated_at  timestamptz NOT NULL DEFAULT now(),
  updated_by  uuid REFERENCES auth.users(id) ON DELETE SET NULL
);
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
-- Public read (the site renders it for visitors). No write policy: writes only through the RPCs below.
CREATE POLICY "Anyone can read site content"
  ON public.site_content FOR SELECT TO anon, authenticated USING (true);

-- ----------------------------------------------------------------- versions
CREATE TABLE public.content_versions (
  id            bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  author_id     uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  author_email  text,
  note          text NOT NULL CHECK (char_length(btrim(note)) BETWEEN 1 AND 300),
  -- [{"key": "...", "before": <jsonb|null>, "after": <jsonb|null>}] : the "Bylo / Jest" list
  changes       jsonb NOT NULL,
  -- full state of site_content after this version, so restoring never needs a replay
  snapshot      jsonb NOT NULL,
  restored_from bigint REFERENCES public.content_versions(id),
  created_at    timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.content_versions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Editors can read versions"
  ON public.content_versions FOR SELECT TO authenticated USING (public.can_edit_site());

-- ------------------------------------------------------------------ projects
CREATE TABLE public.projects (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title       text NOT NULL CHECK (char_length(title) BETWEEN 1 AND 150),
  subtitle    text CHECK (char_length(subtitle) <= 300),
  area        text CHECK (char_length(area) <= 30),
  location    text CHECK (char_length(location) <= 100),
  -- [{"heading": "...", "body": "..."}] same shape as StoryItem in ProjectPage.tsx
  story       jsonb NOT NULL DEFAULT '[]'::jsonb,
  -- [{"path": "projects/<slug>/<file>", "alt": "..."}] in display order; first one is the cover
  images      jsonb NOT NULL DEFAULT '[]'::jsonb,
  sort_order  integer NOT NULL DEFAULT 0,
  published   boolean NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  updated_by  uuid REFERENCES auth.users(id) ON DELETE SET NULL
);
CREATE INDEX projects_sort_idx ON public.projects (sort_order, created_at DESC);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read published projects"
  ON public.projects FOR SELECT TO anon, authenticated USING (published OR public.can_edit_site());
CREATE POLICY "Editors can insert projects"
  ON public.projects FOR INSERT TO authenticated WITH CHECK (public.can_edit_site());
CREATE POLICY "Editors can update projects"
  ON public.projects FOR UPDATE TO authenticated USING (public.can_edit_site()) WITH CHECK (public.can_edit_site());
-- Deleting a project is admin only; editors unpublish instead.
CREATE POLICY "Admins can delete projects"
  ON public.projects FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Every change to a project keeps the previous state, so a project can be rolled back too.
CREATE TABLE public.project_revisions (
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  project_id  uuid NOT NULL,
  op          text NOT NULL CHECK (op IN ('insert', 'update', 'delete')),
  snapshot    jsonb NOT NULL,        -- the row as it was after (insert/update) or before (delete)
  author_id   uuid,
  author_email text,
  created_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX project_revisions_project_idx ON public.project_revisions (project_id, id DESC);
ALTER TABLE public.project_revisions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Editors can read project revisions"
  ON public.project_revisions FOR SELECT TO authenticated USING (public.can_edit_site());

CREATE OR REPLACE FUNCTION public.projects_track()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  _row public.projects;
BEGIN
  IF TG_OP = 'DELETE' THEN _row := OLD; ELSE _row := NEW; END IF;
  IF TG_OP <> 'DELETE' THEN
    NEW.updated_at := now();
    NEW.updated_by := auth.uid();
    _row := NEW;
  END IF;
  INSERT INTO public.project_revisions (project_id, op, snapshot, author_id, author_email)
  VALUES (_row.id, lower(TG_OP), to_jsonb(_row), auth.uid(), auth.jwt() ->> 'email');
  IF TG_OP = 'DELETE' THEN RETURN OLD; END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER projects_track_biu BEFORE INSERT OR UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.projects_track();
CREATE TRIGGER projects_track_bd BEFORE DELETE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.projects_track();

-- -------------------------------------------------------------- access log
-- Append only: who signed in to the editor and what they did. Admin reads, CSV export from the panel.
CREATE TABLE public.editor_audit_log (
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  actor_id    uuid,
  actor_email text,
  action      text NOT NULL CHECK (char_length(action) <= 60),
  target      text CHECK (char_length(target) <= 200),
  detail      jsonb,
  created_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX editor_audit_log_created_idx ON public.editor_audit_log (created_at DESC);
ALTER TABLE public.editor_audit_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read the audit log"
  ON public.editor_audit_log FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Versions and logs are only ever added to: not even service-role code paths in the app update them.
CREATE OR REPLACE FUNCTION public.forbid_change()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  RAISE EXCEPTION '% is append only', TG_TABLE_NAME USING ERRCODE = '42501';
END;
$$;
CREATE TRIGGER content_versions_append_only BEFORE UPDATE OR DELETE ON public.content_versions
  FOR EACH ROW EXECUTE FUNCTION public.forbid_change();
CREATE TRIGGER project_revisions_append_only BEFORE UPDATE OR DELETE ON public.project_revisions
  FOR EACH ROW EXECUTE FUNCTION public.forbid_change();
CREATE TRIGGER editor_audit_log_append_only BEFORE UPDATE OR DELETE ON public.editor_audit_log
  FOR EACH ROW EXECUTE FUNCTION public.forbid_change();

-- ---------------------------------------------------------------- RPCs
-- Save: _changes = [{"key": "home.hero.title", "value": {"text": "..."}}]; "value": null removes the
-- override (back to the default in the code). Applies the whole list and writes one version, atomically.
CREATE OR REPLACE FUNCTION public.save_content_version(_changes jsonb, _note text)
RETURNS bigint
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  _c       jsonb;
  _key     text;
  _new     jsonb;
  _before  jsonb;
  _diff    jsonb := '[]'::jsonb;
  _id      bigint;
BEGIN
  IF NOT public.can_edit_site() THEN
    RAISE EXCEPTION 'forbidden' USING ERRCODE = '42501';
  END IF;
  IF _note IS NULL OR char_length(btrim(_note)) = 0 THEN
    RAISE EXCEPTION 'note_required' USING ERRCODE = '22023';
  END IF;
  IF jsonb_typeof(_changes) IS DISTINCT FROM 'array' OR jsonb_array_length(_changes) = 0
     OR jsonb_array_length(_changes) > 500 THEN
    RAISE EXCEPTION 'bad_changes' USING ERRCODE = '22023';
  END IF;

  FOR _c IN SELECT * FROM jsonb_array_elements(_changes) LOOP
    _key := _c ->> 'key';
    _new := CASE WHEN jsonb_typeof(_c -> 'value') = 'null' THEN NULL ELSE _c -> 'value' END;
    IF _key IS NULL OR _key !~ '^[a-z0-9][a-z0-9_.-]{0,119}$' THEN
      RAISE EXCEPTION 'bad_key' USING ERRCODE = '22023';
    END IF;
    IF _new IS NOT NULL AND (jsonb_typeof(_new) <> 'object' OR length(_new::text) > 20000) THEN
      RAISE EXCEPTION 'bad_value' USING ERRCODE = '22023';
    END IF;

    SELECT value INTO _before FROM public.site_content WHERE key = _key;
    IF _before IS NOT DISTINCT FROM _new THEN CONTINUE; END IF;

    _diff := _diff || jsonb_build_array(jsonb_build_object('key', _key, 'before', _before, 'after', _new));
    IF _new IS NULL THEN
      DELETE FROM public.site_content WHERE key = _key;
    ELSE
      INSERT INTO public.site_content (key, value, updated_at, updated_by)
      VALUES (_key, _new, now(), auth.uid())
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now(), updated_by = auth.uid();
    END IF;
  END LOOP;

  IF jsonb_array_length(_diff) = 0 THEN
    RAISE EXCEPTION 'no_changes' USING ERRCODE = '22023';
  END IF;

  INSERT INTO public.content_versions (author_id, author_email, note, changes, snapshot)
  VALUES (auth.uid(), auth.jwt() ->> 'email', btrim(_note), _diff,
          COALESCE((SELECT jsonb_object_agg(key, value) FROM public.site_content), '{}'::jsonb))
  RETURNING id INTO _id;

  INSERT INTO public.editor_audit_log (actor_id, actor_email, action, target, detail)
  VALUES (auth.uid(), auth.jwt() ->> 'email', 'save_version', _id::text,
          jsonb_build_object('keys', jsonb_array_length(_diff)));
  RETURN _id;
END;
$$;

-- Restore: puts site_content back to the snapshot of a version and records that as a NEW version,
-- so nothing is lost and the restore itself can be undone.
CREATE OR REPLACE FUNCTION public.restore_content_version(_version_id bigint, _note text DEFAULT NULL)
RETURNS bigint
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  _snap    jsonb;
  _current jsonb;
  _diff    jsonb;
  _id      bigint;
BEGIN
  IF NOT public.can_edit_site() THEN
    RAISE EXCEPTION 'forbidden' USING ERRCODE = '42501';
  END IF;
  SELECT snapshot INTO _snap FROM public.content_versions WHERE id = _version_id;
  IF _snap IS NULL THEN
    RAISE EXCEPTION 'version_not_found' USING ERRCODE = '22023';
  END IF;
  SELECT COALESCE(jsonb_object_agg(key, value), '{}'::jsonb) INTO _current FROM public.site_content;

  SELECT COALESCE(jsonb_agg(jsonb_build_object('key', k, 'before', _current -> k, 'after', _snap -> k)), '[]'::jsonb)
    INTO _diff
    FROM (SELECT key AS k FROM jsonb_each(_current) UNION SELECT key FROM jsonb_each(_snap)) AS keys
   WHERE (_current -> k) IS DISTINCT FROM (_snap -> k);

  IF jsonb_array_length(_diff) = 0 THEN
    RAISE EXCEPTION 'no_changes' USING ERRCODE = '22023';
  END IF;

  DELETE FROM public.site_content WHERE true;
  INSERT INTO public.site_content (key, value, updated_at, updated_by)
  SELECT key, value, now(), auth.uid() FROM jsonb_each(_snap);

  INSERT INTO public.content_versions (author_id, author_email, note, changes, snapshot, restored_from)
  VALUES (auth.uid(), auth.jwt() ->> 'email',
          COALESCE(NULLIF(btrim(_note), ''), 'Przywrocono wersje ' || _version_id),
          _diff, _snap, _version_id)
  RETURNING id INTO _id;

  INSERT INTO public.editor_audit_log (actor_id, actor_email, action, target, detail)
  VALUES (auth.uid(), auth.jwt() ->> 'email', 'restore_version', _id::text,
          jsonb_build_object('from', _version_id));
  RETURN _id;
END;
$$;

REVOKE ALL ON FUNCTION public.save_content_version(jsonb, text) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.restore_content_version(bigint, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.save_content_version(jsonb, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.restore_content_version(bigint, text) TO authenticated;

-- Client-side event logging (sign-in to the editor, opened pages). Capped, own identity only.
CREATE OR REPLACE FUNCTION public.log_editor_event(_action text, _target text DEFAULT NULL, _detail jsonb DEFAULT NULL)
RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF NOT public.can_edit_site() THEN
    RAISE EXCEPTION 'forbidden' USING ERRCODE = '42501';
  END IF;
  INSERT INTO public.editor_audit_log (actor_id, actor_email, action, target, detail)
  VALUES (auth.uid(), auth.jwt() ->> 'email', left(_action, 60), left(_target, 200),
          CASE WHEN _detail IS NOT NULL AND length(_detail::text) <= 2000 THEN _detail END);
END;
$$;
REVOKE ALL ON FUNCTION public.log_editor_event(text, text, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.log_editor_event(text, text, jsonb) TO authenticated;

-- ------------------------------------------------------------------ media
-- Public read (images are on the public site), editors and admins write.
INSERT INTO storage.buckets (id, name, public) VALUES ('site-media', 'site-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can read site media"
  ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'site-media');
CREATE POLICY "Editors can upload site media"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'site-media' AND public.can_edit_site());
-- Files are never overwritten or deleted by editors (old versions may still point at them); admin cleans up.
CREATE POLICY "Admins can delete site media"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'site-media' AND public.has_role(auth.uid(), 'admin'));
