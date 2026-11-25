# AN Projekt

Strona portfolio dla studia projektowania wnętrz AN Projekt — elegancka prezentacja realizacji z galerią, formularzem zapytania, chatbotem i sekcją e-book.

**Live:** [anprojekt.com.pl](https://anprojekt.com.pl)

---

## Funkcje

- Portfolio realizacji z karuzelą projektów i galerią zdjęć
- Formularz kontaktowy / zapytanie o projekt
- Chatbot — obsługa wstępnych pytań klientów
- Sekcja e-book do pobrania
- Announcement banner z aktualną promocją
- Cookie banner + RODO
- Custom cursor
- Animacje wejścia (FadeIn)
- Mobile-first, w pełni responsywna

---

## Stack

| Warstwa | Technologia |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite |
| UI | shadcn/ui + Radix UI |
| Styling | Tailwind CSS |
| Hosting | Cloudflare Pages (build `npm run build`, output `dist`) |
| Backend | Supabase (`rpdhnvnwxtzekpnlrvju`): Auth, Postgres, Storage, Edge Functions |

---

## Lokalne uruchomienie

```bash
npm install
npm run dev
```

Aplikacja dostępna pod [http://localhost:5173](http://localhost:5173).

---

## Deploy to Cloudflare Pages

The existing `an-projekt` Pages project uses Direct Upload. Build from a clean checkout of the reviewed commit. Export `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` for the new Supabase project before running these commands. Use only the public publishable or anon key.

```sh
npx --yes bun@1.3.14 install --frozen-lockfile
npx --yes bun@1.3.14 run build
npx --yes wrangler@4.50.0 pages deploy dist --project-name an-projekt --branch migration-preview
```

Use the Wrangler deployment URL for preview checks. After approval, rerun the deploy command with `--branch main` to update `an-projekt.pages.dev`. Record the commit and deployment URL. Before attaching a custom domain, verify the public routes, the form write and email delivery, and the header on the Pages hostname. The SPA fallback is in `public/_redirects`. The Pages hostname receives `X-Robots-Tag: noindex` from `public/_headers`. Check that the custom domain allows indexing at cutover.

Keep files over 25 MiB in Supabase Storage. Database migrations live in `supabase/migrations`. Apply them to the intended project before deploying frontend code that depends on them.
