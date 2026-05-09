## Plan: Sekcja Nowowiejska na home + porządki na blogu

### 1. Sekcja "Jak to wygląda na żywo?" (home)

Sekcja jest już usunięta z kodu — przywracam ją z nowymi zdjęciami z paczki Nowowiejska.

**Lokalizacja:** `src/pages/Index.tsx` — wstawiam sekcję pomiędzy istniejącymi blokami (przed sekcją z testimonialami, po realizacjach), żeby nie zaburzyć rytmu.

**Zawartość:**
- Nagłówek H2 (Playfair): **"Jak to wygląda na żywo?"** (z pytajnikiem zgodnie z core memory)
- Krótki lead (1 zdanie, 1 os., taupe/muted): "Wizualizacja to jedno — zdjęcia z gotowych wnętrz mówią same za siebie."
- Grid 5 zdjęć (3 + 2, jak na screenie), wszystkie `aspect-[4/3] object-cover`, `rounded-xl`, hover scale subtelny, `loading="lazy"`, alt z `nowowiejska-photos.ts`.
- Bez podpisów typu "Dom gotowy na więcej…" (na screenie były krzywe — zostawiam czyste kafle, jak w stylu editorial).
- Pod gridem mały link tekstowy: **"Zobacz wszystkie realizacje →"** do `/realizacje`.

**Wybór 5 zdjęć z `src/data/nowowiejska-photos.ts`:**
Biorę te oznaczone `recommendedUse: 'portfolioCandidate'` + 1 uzupełnienie z `'blog'`:
1. `now-01` (kuchnia, 115359)
2. `now-02` (jadalnia, 115631)
3. `now-06` (salon, 115833)
4. `now-08` (salon, 115921)
5. `now-04` (kuchnia/salon, 115930)

**Czego NIE robię:**
- Nie dodaję ramek, podpisów ani "lightboxa".
- Nie zmieniam istniejących sekcji home.
- Nie ruszam `ProjectCarousel`.

### 2. Blog — styl kafli (`src/pages/Blog.tsx`)

Aktualny stan: `rounded-xl` na obrazkach, brak cienia (już OK), ale featured post ma `bg-secondary rounded-xl` co tworzy "kartę". Na screenie widać zaokrąglone rogi z cieniem (artefakt produkcji / aparatu). Wyrównuję:

- **Kafle wpisów** (`regularPosts.map`): zostawiam `rounded-xl` (0.75rem zgodnie z core), upewniam się że NIE ma `shadow-*`, hover tylko subtelne `scale-[1.02]` na obrazku.
- **Featured post**: redukuję dominację — usuwam `bg-secondary` z karty, zostawiam zwykłe tło, obraz `rounded-xl`, tekst po prawej bez tła. Bardziej editorial, mniej "kartowo".
- **Filtry kategorii** (chip "Wszystkie"): zostawiam — tylko upewniam się że styl jest spójny (taupe accent dla aktywnej, transparent dla nieaktywnej).
- **Search input**: zostawiam.

### 3. Blog — podmiana okładek

Wpisy hardcodowane w `blogPosts[]` (Blog.tsx wiersze 24-117) używają mieszanki: realHomeKitchen* (stockowe webp) + zdjęcia realizacji (willaHarmonia, apartamentKlasa itp.).

**Podmieniam okładki tematycznie pasujące zdjęciami z Nowowiejskiej** (te 3 oznaczone `recommendedUse: 'blog'`):
- `now-03` (jadalnia alt) → wpis **"Jak dobrać kolory, materiały i dodatki…"** (zamiast realHomeKitchen6)
- `now-04` (kuchnia/salon) → wpis **"Najczęstsze błędy przy projektowaniu kuchni i salonu"** (zamiast apartamentKlasa3)
- `now-07` (kuchnia) → wpis **"10 najczęstszych błędów przy urządzaniu mieszkania"** (zamiast realHomeKitchen2)

Zostałe wpisy zostawiam bez zmian (już mają sensowne okładki z realizacji).

**Czego NIE robię:**
- Nie ruszam `BlogPost.tsx`, `TipTapEditor.tsx`, sanitizera.
- Nie ruszam wpisów Porcelanosa / Unilin (mają własne `cover_image_url` z DB).
- Nie zmieniam kategorii ani slugów.
- Nie dodaję nowych wpisów.

### 4. Pliki do edycji

- `src/pages/Index.tsx` — dodaję sekcję + 5 importów z `@/assets/nowowiejska/`.
- `src/pages/Blog.tsx` — dopinam 3 importy nowowiejska, podmieniam 3 pola `image:`, czyszczę styl featured post.

### 5. Po wdrożeniu

Trzeba kliknąć **Publish → Update**, żeby zmiany pojawiły się na `an-projekt.com.pl` (preview pokaże od razu). Domena nadal serwuje stary bundle z `supabaseUrl is required` — guard z `main.tsx` jest już na miejscu na wypadek kolejnej wpadki.
