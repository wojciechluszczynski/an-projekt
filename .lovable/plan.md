## Plan

### 1. Drugi dostęp do panelu CMS — `w.luszczynski@gmail.com`

Aktualnie `/admin` używa Supabase Auth + RLS na `blog_posts`, gdzie **każdy zalogowany użytkownik** ma pełny dostęp (`Authenticated users can manage all posts`). Wystarczy więc dodać drugie konto — kod logowania nie wymaga zmian.

- Utworzę użytkownika w Supabase Auth:
  - email: `w.luszczynski@gmail.com`
  - hasło: `AnProjekt2026!cms`
  - email od razu potwierdzony (żeby od razu można się było zalogować bez weryfikacji)
- Konto zachowa pełne uprawnienia jak konto Ani — pełna edycja, publikacja, usuwanie wpisów.
- Zaktualizuję pamięć projektu (`mem://auth/admin-access`), żeby były wymienione **oba** konta administratora.

### 2. Widoczność autora wpisów (kto zrobił którą wersję roboczą)

Obecnie `blog_posts` nie ma kolumny autora — nie da się rozróżnić, kto utworzył/edytował dany wpis. Dodam to:

**Schemat (migracja):**
- Dodaję `author_id uuid` (nullable) i `last_edited_by uuid` (nullable) do `blog_posts`.
- Trigger `BEFORE INSERT`: jeśli `author_id IS NULL`, wstawia `auth.uid()`.
- Trigger `BEFORE UPDATE`: ustawia `last_edited_by = auth.uid()` i `updated_at = now()`.
- Backfill istniejących 2 szkiców → `author_id` = konto Ani (`anprojekt.com@gmail.com`).
- Widok pomocniczy `admin_post_authors` (security_invoker) zwracający `user_id` + email z `auth.users`, dostępny tylko dla zalogowanych — żeby UI mógł pokazać czytelną nazwę zamiast UUID-a.

**UI — `/admin/wpisy` (lista):**
- Pod tytułem każdego wpisu pojawi się drobny chip „Autor: Anna" lub „Autor: Wojciech" (mapowanie e-mail → imię po stronie klienta).
- Jeśli `last_edited_by` różni się od autora, dodatkowo „· edytował: …".
- Filtr u góry: **Wszyscy / Anna / Wojciech / Tylko szkice** — żebyś szybko widział, co Ania zostawiła w robocze.

**UI — edytor wpisu:**
- W prawym górnym rogu mała informacja „Utworzył: Anna · ostatnia edycja: Wojciech, 29 kwi 2026".

### 3. Film z wyjazdu do Porcelanosa

- Skopiuję załączony plik do `public/blog/porcelanosa-wyjazd-relacja.mp4` (oryginalny `porcelanosa-wyjazd.mp4` już jest — sprawdzę czy to ten sam, jeśli tak — pominę kopiowanie i użyję istniejącego, jeśli inny — dodam jako `-2.mp4`).
- W szkicu wpisu `porcelanosa-design-i-technologia` (Supabase, status `published=false` — nadal szkic) wstawię w treści osadzony odtwarzacz `<video controls>` z linkiem do pliku, podpis: „Krótka relacja z wyjazdu — pełniejszy materiał wkrótce."
- Plik dostępny też pod publicznym URL-em `/blog/porcelanosa-wyjazd-relacja.mp4`, więc Ania może go pobrać/podlinkować z poziomu CMS.

---

## Czego NIE zmieniam
- Hasła Ani (`anprojekt.com@gmail.com`) — bez zmian.
- RLS na `blog_posts` — pozostaje „każdy zalogowany admin = pełna edycja". Nie wprowadzam ról (admin/editor) — wg Twojej prośby chodzi o **widok**, nie o ograniczanie uprawnień.
- Layoutu/brandu — bez zmian, dodaję tylko subtelne chipsy autora.

## Po akceptacji wykonuję wszystko jednym ciągiem
Migracja → utworzenie konta → backfill autorów → UI listy + edytora → wstawienie filmu w szkic Porcelanosa.
