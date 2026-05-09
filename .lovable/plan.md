## Diagnoza filmu w blogu — co już sprawdziłem

Sprawdziłem realny stan zapisanych wpisów (Porcelanosa, Unilin) bezpośrednio w bazie. Sytuacja:

- Plik `.mp4` w storage **istnieje i jest publiczny** — odpowiedź `HTTP/2 200`, `content-type: video/mp4`, ~40 MB.
- HTML zapisany w treści wpisu ma poprawną strukturę:
  ```html
  <video controls="true" preload="metadata" playsinline="true" class="blog-video">
    <source src="https://.../videos/...mp4" type="video/mp4">
  </video>
  ```
- `BlogPost.tsx` używa `dangerouslySetInnerHTML` z `sanitizeBlogHtml`, a sanitizer ma już `ADD_TAGS: ["video", "source", "iframe"]`.

Czyli sam **render działa**. Realny problem zgłaszany przez Anię to ten z edytora CMS:
1. Po kliknięciu ikony filmu pojawia się `window.confirm(...)`, który Ania mogła interpretować jako alert i klikać „Anuluj". Wtedy nie otwiera się picker pliku, tylko prompt na URL — i jeśli wklei zwykły link (nie YouTube/Vimeo/.mp4), film „się nie dodaje".
2. Plik mógł zostać wgrany, ale widziała tylko ikonkę noda, bo w starszych wpisach był wstawiany sam `<video>` bez `<source>` — i takie stare wpisy wciąż mogą być w bazie.
3. `cover_image_url` może być mylone z dodawaniem filmu do treści.

Root cause główny: **UX wstawiania wideo wymaga dwóch kroków przez natywne dialogi przeglądarki** (`confirm` + ewentualny picker albo `prompt`). Łatwo to przeklikać źle.

## Plan zmian

### 1. Edytor CMS — proste, jednoznaczne wstawianie filmu (`TipTapEditor.tsx`)
- Zamiana `window.confirm`/`window.prompt` na **mały modal w UI** (Radix Dialog) z dwiema opcjami:
  - „Wgraj plik z dysku" → otwiera picker `video/*`,
  - „Wklej link (YouTube / Vimeo / .mp4)" → osobne pole `Input` z walidacją.
- W trakcie uploadu pokazujemy spinner i blokujemy przycisk, po sukcesie toast „Film dodany".
- Po wstawieniu zawsze tworzymy `<video controls preload="metadata" playsinline class="blog-video"><source src=... type=video/mp4></video>` — czyli już używaną strukturę z `<source>`.

### 2. Blog frontend — twardy fallback dla wideo (`BlogPost.tsx`)
- Po sanitizacji uruchamiamy mały hook, który dla każdego `<video>` w treści dopina `onerror`/`onstalled` listener — jeśli wideo nie wczyta się w X sekund, podmieniamy go na komunikat:
  > „Nie udało się wczytać filmu. [Otwórz w nowej karcie]" (link do `src`).
- Dzięki temu nigdy nie zostaje pusty czarny prostokąt ani sama ikonka.

### 3. Sekcja „Jak to wygląda na żywo" (`Realizacje.tsx`)
- Usuwamy całą sekcję `Real execution photos` (linie ~191–228) wraz z tablicą `realPhotos`.
- Pozostawiamy stałą `realPhotos` tylko jeśli jest reużywana gdzie indziej (sprawdzę i jeśli nie — usuwam komplet).
- Sekcja znika z `/realizacje`. Carousel/grid głównych projektów zostaje.

### 4. Podmiana grafik na blogu (`Blog.tsx` + `BlogPost.tsx`)
Zdjęcia z dotychczasowej sekcji „na żywo" (`real-home-kitchen-1/2/5/6.webp`, `real-home-bedroom-1.webp`) wykorzystamy jako miniatury wpisów hardcodowanych:
- „Jak wygląda współpraca…" — `real-home-kitchen-1`
- „Projekt wnętrza – od czego zacząć" — `real-home-bedroom-1`
- „Projektant wnętrz Krosno i Rzeszów" — `real-home-kitchen-5`
- „10 najczęstszych błędów" — `real-home-kitchen-2`
- „Jak dobrać kolory…" — `real-home-kitchen-6`
- pozostałe wpisy zostawiam na obecnych grafikach.

Karty zachowują ten sam kontener `aspect-[16/10] object-cover` — nie ma rozciągania, jest spójny crop.

Wpisy CMS (Porcelanosa, Unilin) mają własne `cover_image_url` i ich **nie ruszamy** — to assety, które Ania świadomie ustawiła.

### 5. Paczka Nowowiejska
- Rozpakuję ZIP (8 plików `.webp`, 1920 px), wrzucam do `src/assets/nowowiejska/` z czytelnymi nazwami.
- Na tym etapie **nie tworzę sekcji „Realizacje"** ani case study.
- Ocenię jakość (czy nadają się jako tła kart / hero blogowy). Jeśli któreś wyraźnie pasują tematycznie do wpisów, podmienię miniatury, ale tylko gdy podnosi to estetykę. W przeciwnym razie zostawiam je w repo jako gotowe assety i czekamy na decyzję.

### 6. Czego NIE robię
- Nie zmieniam schematu bazy ani RLS.
- Nie dotykam treści wpisów Porcelanosa/Unilin w bazie.
- Nie tworzę nowej sekcji portfolio dla Nowowiejskiej.

## Krótko technicznie
- Pliki edytowane: `src/components/admin/TipTapEditor.tsx`, `src/pages/BlogPost.tsx`, `src/pages/Blog.tsx`, `src/pages/Realizacje.tsx`.
- Pliki tworzone: `src/assets/nowowiejska/*.webp` + ewentualny mały komponent dialogu wewnątrz `TipTapEditor.tsx`.
- Bez zmian w DB.

## Po wdrożeniu dostarczę krótkie podsumowanie
- co dokładnie powodowało, że film „się nie dodawał" (UX dialogów `confirm`/`prompt`),
- jakie miniatury bloga zostały podmienione,
- które zdjęcia z Nowowiejskiej trafiły do repo i czy któreś użyłem od razu,
- co wymaga Twojej decyzji (np. czy konkretne zdjęcie nadaje się jako cover wpisu).
