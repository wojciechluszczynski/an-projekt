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

## Wdrożenie

Hosting: Cloudflare Pages. Zmienne budowania (publiczne, w ustawieniach projektu Pages, Production i Preview):

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

`public/_redirects` daje fallback SPA (`/* /index.html 200`), `public/_headers` dodaje `noindex` na hostach `*.pages.dev`.
Pliki powyżej 25 MiB nie mogą trafić do `public/` (limit Pages); duże wideo trzymaj w Supabase Storage.
Migracje bazy: `supabase/migrations` są źródłem prawdy, na produkcję wykonuje je właściciel projektu.
