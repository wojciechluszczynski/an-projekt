## Plan – co zrobimy teraz, na co czekamy

Materiały z WeTransfer (Porcelanosa, Unilin, sala weselna, Nowowiejska od Pawła) jeszcze nie dotarły. Możemy jednak wykonać teraz wszystko, co nie wymaga tych plików, żeby po ich otrzymaniu zostało już tylko wgranie zdjęć.

---

### 1. Willa Harmonia – przywrócenie oryginalnych wizualizacji (ROBIMY TERAZ)

Zdjęcia z realizacji (`real-home-*.webp`) trafiły omyłkowo do projektu „Willa Harmonia". Cofniemy je w trzech miejscach:

- `src/pages/Realizacje.tsx` – kafelek „Willa Harmonia" w sekcji wyróżnionych oraz w siatce wszystkich projektów: `realHomeKitchen2` → `willaHarmonia1`.
- `src/pages/ProjectPage.tsx` – galeria projektu `willa-harmonia`: zamiast siedmiu zdjęć z realizacji wracamy do oryginalnych `willaHarmonia1…9`.
- Pozostałe miejsca, w których te zdjęcia są używane jako uniwersalne „real photos" (Strona główna marquee, Oferta, O mnie) – zostają bez zmian, zgodnie z dotychczasowymi ustaleniami.

### 2. Sekcja „Od projektu do realizacji" (NIE RUSZAMY)

Czekamy na zdjęcia z Nowowiejskiej od Pawła. Sekcja zostaje w obecnej formie.

### 3. Kod QR do druku (ROBIMY TERAZ)

Dodajemy w panelu admina (`/admin/wpisy`) mały widget „Materiały drukowane":

- Przycisk „Pobierz kod QR (PNG)" generujący QR prowadzący do `https://an-projekt.com.pl`.
- Generowanie po stronie klienta biblioteką `qrcode` (mała paczka, brak backendu).
- QR w wysokiej rozdzielczości (1024×1024, czarny na białym, margines), gotowy do druku.
- Pole tekstowe z podglądem aktualnego URL, na wypadek gdyby Ania chciała wygenerować QR do innej podstrony.

### 4. Nowy wpis blogowy – Porcelanosa (SZKIC – ROBIMY TERAZ, PUBLIKACJA PO ZDJĘCIACH)

Wpis utworzymy jako **szkic w CMS** (`published = false`) – Ania uzupełni zdjęcia/film po WeTransfer i opublikuje ręcznie z panelu:

- Tytuł: „Porcelanosa Group – kiedy design spotyka technologię"
- Slug: `porcelanosa-design-i-technologia`
- Kategoria: `Inspiracje` (dodajemy nową kategorię obok istniejących)
- `featured: false`, `published: false`
- Treść: szkielet z nagłówkami (Wstęp, Co zobaczyłam w Hiszpanii, Materiały, Wnioski dla moich projektów) + zaślepki na zdjęcia/wideo do wstawienia z edytora.

### 5. Nowy wpis blogowy – Unilin (SZKIC – ROBIMY TERAZ, PUBLIKACJA PO ZDJĘCIACH)

Analogicznie:

- Tytuł: „Unilin w Belgii – materiały od środka"
- Slug: `unilin-belgia-materialy-od-srodka`
- Kategoria: `Inspiracje`
- Szkielet treści + miejsca na media.

### 6. Nowa realizacja – Sala weselna (SZKIC – ROBIMY TERAZ, ODKRYWAMY PO WIZUALIZACJACH)

Dodajemy nową podstronę projektu, ale ukrywamy ją na liście realizacji do czasu wgrania wizualizacji:

- Slug: `sala-weselna`
- Tytuł: „Przestrzeń dla emocji – sala weselna"
- Wpis w `projectsData` w `ProjectPage.tsx` z pełnym opisem (wprowadzenie, wyzwanie, rozwiązanie) – zdjęcia wskazują tymczasowo na placeholder (`/placeholder.svg`) i są wyraźnie oznaczone w komentarzu kodu jako „TODO: podmienić po WeTransfer".
- W `Realizacje.tsx` wpis zostaje **zakomentowany** lub oflagowany `hidden: true`, żeby nie pojawił się publicznie z placeholderem.

### 7. Kategorie blogowe

Aktualnie jest: `Wszystkie`, `Współpraca`, `Błędy`, `Porady`, `Ebooki`, `Trendy`, `Materiały`. Dodajemy `Inspiracje` (do wpisów z wyjazdów Porcelanosa/Unilin).

---

## Czego NIE ruszamy

- Zdjęcia Ani (portret) – zostają.
- Pozostałe realizacje, kolejność i opisy – bez zmian.
- Sekcja „Od projektu do realizacji" – czeka na materiały od Pawła.
- Panel CMS `/admin` – tylko dodajemy widget QR, reszta bez zmian.

## Czeka na materiały

| Materiał | Co podmienimy |
|---|---|
| WeTransfer Porcelanosa | media w wpisie blogowym + publikacja |
| WeTransfer Unilin | media w wpisie blogowym + publikacja |
| WeTransfer sala weselna | obrazy w `ProjectPage` + odkrycie w `Realizacje` |
| Zdjęcia Nowowiejska (Paweł) | sekcja „Od projektu do realizacji" |

---

## Szczegóły techniczne

- QR: `bun add qrcode @types/qrcode`. Komponent `AdminQrWidget` w `src/components/admin/AdminQrWidget.tsx`, osadzony na górze `AdminPosts.tsx`. Generowanie do `<canvas>`, eksport `toDataURL("image/png")` → pobranie pliku `an-projekt-qr.png`.
- Szkice blogowe: jeden migration insert do `blog_posts` z `published=false`, kategoria `Inspiracje`. Treść Markdown/HTML zgodna z istniejącym edytorem TipTap.
- Sala weselna: wpis w `projectsData` (ProjectPage.tsx) + ukryty kafelek w `Realizacje.tsx` (warunek `!project.hidden`).
- Willa Harmonia rollback: 3 punktowe zmiany importów/referencji w `Realizacje.tsx` i `ProjectPage.tsx`.

Po Twojej akceptacji przechodzę do implementacji.