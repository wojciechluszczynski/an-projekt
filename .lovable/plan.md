## Diagnoza — dlaczego strona nie działa

Sprawdziłem trzy środowiska:

| Środowisko | HTTP | Render |
|---|---|---|
| Preview Lovable (`id-preview--…lovable.app`) | 200 | ✅ działa, hero + nawigacja + slider |
| `an-projekt.lovable.app` | 200 (redirect → custom domain) | ❌ biały ekran |
| `an-projekt.com.pl` | 200 | ❌ biały ekran |

W konsoli produkcji jeden, jednoznaczny błąd, który wywala całą aplikację już na starcie:

```
Uncaught Error: supabaseUrl is required.
  at t6 (assets/index-GX_abV-b.js)
```

To rzuca `createClient` z `src/integrations/supabase/client.ts`, kiedy `import.meta.env.VITE_SUPABASE_URL` jest pusty. Build produkcyjny (`assets/index-GX_abV-b.js`, deployment id `ea0b9607-…`) został opublikowany **bez wstrzykniętych zmiennych Lovable Cloud**. Preview działa, bo Vite dev server ma `.env` lokalnie.

**Root cause:** stary build produkcyjny + brak republikacji po dodaniu/odświeżeniu Lovable Cloud. Domena, DNS, SSL i routing SPA są OK (Cloudflare zwraca 200 dla deep linków). To nie jest problem kodu, tylko deployu.

**Skutek:** każdy widok pada na białym ekranie, bo `supabase` jest importowany globalnie (m.in. w `Blog`, `BlogPost`, `Index`, `Chatbot`).

## Co zrobię (po Twojej akceptacji)

### 1. Stabilizacja produkcji (priorytet 1)
- **Nie zmieniam** `client.ts` ani `.env` — to są pliki zarządzane przez Lovable Cloud.
- Dodam w `src/main.tsx` minimalny **guard** sprawdzający obecność `VITE_SUPABASE_URL` przed `createRoot`. Jeśli env nie ma, zamiast białego ekranu pokaże się prosta strona „Trwa aktualizacja serwisu" z linkiem do kontaktu — już nigdy nie będzie czarnej dziury, nawet jeśli ktoś znów opublikuje pusty build.
- Po wdrożeniu kodu **Ty klikasz Publish → Update**. To jedyny sposób, żeby Lovable wbudowała aktualne envy do bundle'a. Republikacja nie wymaga zmian DNS, certyfikat zostaje.
- Jeśli przycisk Publish dalej będzie nieaktywny, sprawdzę razem z Tobą `publish_settings` i uprawnienia workspace’u.

### 2. CMS i blog — sanity check, bez zmian merytorycznych
- Sprawdzę, że `TipTapEditor` (dialog wideo + upload + parser YouTube/Vimeo) i `BlogPost` (sanitizer z `video/source/iframe` + fallback 12 s) działają na świeżym buildzie.
- Wpisy Porcelanosa i Unilin **nie są ruszane** (własne `cover_image_url`).
- Nie zmieniam mapowania miniatur dla wpisów hardcoded — zostają `real-home-*` zgodnie z poprzednim wdrożeniem.

### 3. Nowowiejska — uporządkowanie, bez publikacji

W repo jest już 8 plików: `src/assets/nowowiejska/nowowiejska-1..8.webp`. Ania przesłała **9 screenów** (jedno zdjęcie więcej niż mamy w paczce), więc co najmniej 1 oryginał nie został spakowany. Bez podglądu binariów obok screenów nie potwierdzę 1:1 mapowania — zrobię to wizualnie po akceptacji planu i opiszę w `nowowiejska-photos.ts`.

Stworzę `src/data/nowowiejska-photos.ts`:

```ts
export type NowowiejskaUse = 'blog' | 'social' | 'portfolioCandidate' | 'reject';
export type NowowiejskaRoom = 'kuchnia' | 'salon' | 'jadalnia' | 'schody' | 'lazienka' | 'inne';

export interface NowowiejskaPhoto {
  id: string;                  // np. "now-01"
  filename: string;            // "nowowiejska-1.webp"
  src: string;                 // import z @/assets/nowowiejska/...
  originalFilename?: string;   // np. "20260203_115359.jpg" (jeśli zmapowane)
  room: NowowiejskaRoom;
  recommendedUse: NowowiejskaUse;
  alt: string;
  note?: string;
}
```

- Wypełnię tablicę po obejrzeniu każdego `.webp` i porównaniu ze screenem.
- **Nigdzie tej tablicy publicznie nie renderuję.** Trafia tylko do repo jako konfiguracja gotowa do późniejszego użycia (blog, social, kandydat do portfolio).
- Brakujące oryginały oznaczę polem `originalFilename: undefined` + `note: 'brak w paczce, dosłać'` i zwrócę listę w podsumowaniu.

### 4. Blog — minimalna higiena
- Bez podmiany cover’ów. Sprawdzę tylko, czy karty nadal mają `aspect-[16/10] object-cover`, czy alt teksty są zdaniowe i czy `loading="lazy"` jest na miejscu.
- Sekcja „Jak to wygląda na żywo" zostaje **usunięta** (już jest). Sprawdzę, czy nie powstała pusta przerwa na `/realizacje`.

### 5. Czego NIE zrobię
- Nie tworzę sekcji portfolio Nowowiejska.
- Nie tworzę nowej podstrony realizacji.
- Nie wystawiam screenów Ani na stronie (mają overlay UI telefonu — to tylko wskazówka selekcji).
- Nie zmieniam DNS, domeny, schematu DB, RLS, treści wpisów CMS.
- Nie ruszam `client.ts`, `types.ts`, `.env`, `supabase/config.toml`.

## Pliki, których dotknę

- `src/main.tsx` — guard env z fallback UI (kilka linii).
- `src/data/nowowiejska-photos.ts` — nowy, niewykorzystywany jeszcze publicznie.
- (opcjonalnie) drobne porządki alt/loading w `Blog.tsx` jeśli znajdę realne braki.

## Po wdrożeniu dam podsumowanie

1. Dlaczego strona nie działała → stary build bez env Lovable Cloud, padający na `createClient`.
2. Co naprawione → guard w `main.tsx` + (po Twoim kliku Publish) świeży bundle z envami.
3. Status domeny / preview / CMS / wideo.
4. Mapowanie `nowowiejska-N.webp` ↔ oryginalne `20260203_*.jpg`.
5. Lista brakujących oryginałów (jeden lub więcej — potwierdzę po porównaniu).
6. Decyzje do podjęcia po Twojej stronie (głównie: które zdjęcia idą na blog, a które tylko na social).

## Wymaga Twojej akcji

Po wdrożeniu kodu **musisz kliknąć Publish → Update** w Lovable. Bez tego domena dalej będzie serwowała stary, zepsuty bundle. Jeśli przycisk jest nadal nieaktywny po odświeżeniu, daj znać — sprawdzę uprawnienia i status publikacji.
