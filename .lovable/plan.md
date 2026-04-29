## Plan

### 1. Zdjęcia Porcelanosa → wpis blogowy (4 zdjęcia)

Skopiuję 4 załączone zdjęcia do `public/blog/`:
- `porcelanosa-budynek.jpg` (Ania przed siedzibą Porcelanosa Grupo)
- `porcelanosa-probki.jpg` (regały z próbkami płytek i drewna)
- `porcelanosa-showroom.jpg` (showroom Top Trends)
- `porcelanosa-lobby.jpg` (designerskie lobby z falującymi liniami światła)

Zaktualizuję istniejący szkic `porcelanosa-design-i-technologia` w bazie:
- Ustawię `cover_image_url` i `og_image_url` na `porcelanosa-budynek.jpg`
- Wstawię w treści 4 zdjęcia z podpisami w sekcjach (Wstęp / Co zobaczyłam / Materiały / Wnioski)
- Na końcu dodam delikatną adnotację: *„To dopiero początek — niebawem wrzucę więcej materiałów z tego wyjazdu, w tym film."*
- Wpis pozostaje szkicem (`published = false`) — Ania uzupełni tekst i opublikuje z `/admin`.

### 2. Sala weselna ← „Unilin" (wyjaśnienie)

Według Twojej wiadomości 3 pliki, które wcześniej oznaczyłem jako Unilin (`public/blog/unilin-budynek.jpg`, `unilin-showroom.jpg`, `unilin-probki.jpg`), są w rzeczywistości wizualizacjami sali weselnej.

**Ważne:** projekt „Sala weselna" już ma 6 osobnych wizualizacji (`src/assets/sala-weselna-1…6.png`) używanych w `ProjectPage.tsx` i `Realizacje.tsx` — i to one są obecnie pokazywane.

Zaproponowane działanie:
- Skopiuję te 3 pliki z `public/blog/` do `src/assets/` jako `sala-weselna-7.png/.jpg`, `sala-weselna-8…`, `sala-weselna-9…` (zachowując oryginalne rozszerzenia).
- **Dodam** je do galerii `sala-weselna` w `ProjectPage.tsx` (na końcu obecnego zestawu, łącznie 9 zdjęć).
- Usunę 3 zdjęcia z treści wpisu blogowego `unilin-belgia-materialy-od-srodka` i wyczyszczę jego `cover_image_url`/`og_image_url` (wpis wraca do czystego szkicu, czeka na właściwe zdjęcia z Belgii).
- Skasuję pliki `public/blog/unilin-*.jpg` żeby nie zostawiać śmieci.

Jeżeli wolisz zamiast dodać je do galerii **podmienić** istniejące 6 wizualizacji — daj znać, ale domyślnie zakładam dodanie (więcej materiału = lepiej).

### 3. Pinterest w social media

Dodam ikonę Pinteresta (lucide `<Pin />` lub `<PinIcon />` — sprawdzę dostępność, użyję najbardziej Pinterest-podobnej ikony z lucide-react, np. własny SVG „P" jeśli potrzeba) z linkiem `https://pl.pinterest.com/anprojektcom/` w dwóch miejscach:
- `src/components/Footer.tsx` — obok Instagrama i Facebooka
- `src/pages/Kontakt.tsx` — w tej samej grupie ikon

Styl, kolory, hover, `target="_blank" rel="noopener noreferrer"` i `aria-label` — zgodnie z istniejącym wzorcem.

---

## Czego NIE ruszam
- 6 obecnych wizualizacji `sala-weselna-1…6` zostaje (dodaję, nie podmieniam).
- Status szkicu obu wpisów (`published = false`) — żebyś mogła dokończyć tekst.
- Reszta layoutu, kolorów, brandu — bez zmian.

Po akceptacji wykonuję wszystko jednym ciągiem.