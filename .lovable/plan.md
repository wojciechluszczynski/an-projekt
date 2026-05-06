## Cel
Ania ma móc w panelu CMS wstawić do wpisu blogowego film (z pliku lub z linku YouTube/Vimeo), który następnie wyświetli się jako estetyczny odtwarzacz w treści posta.

## Zakres zmian

### 1. Edytor TipTap (`src/components/admin/TipTapEditor.tsx`)
- Dodaję nowy przycisk w toolbarze (ikona `Video` z lucide), obok obecnego przycisku „Wstaw zdjęcie".
- Po kliknięciu pojawia się prosty wybór:
  - **Wgraj plik wideo** (mp4/webm/mov, do ~50 MB) → ląduje w buckecie `blog-images` (już publicznym), wstawia tag `<video controls preload="metadata" class="blog-video">…</video>`.
  - **Wklej link** (YouTube / Vimeo / bezpośredni MP4) → automatyczna detekcja:
    - YouTube → osadzony `<iframe>` z `youtube-nocookie.com/embed/...`
    - Vimeo → osadzony `<iframe>` z `player.vimeo.com/video/...`
    - inny URL `.mp4`/`.webm` → `<video controls>` z tym źródłem
- Technicznie rejestruję w TipTap niestandardowe rozszerzenie `Node` o nazwie `videoEmbed`, które potrafi serializować/deserializować zarówno `<video>`, jak i `<iframe>` opakowany w `<div class="video-embed">` (dzięki temu zostają w treści po ponownej edycji wpisu — TipTap inaczej je gubi).
- Plik wideo wgrywany jest pod nazwę `videos/{timestamp}-{rand}.{ext}` w istniejącym buckecie `blog-images`.

### 2. Renderer wpisu (`src/pages/BlogPost.tsx`)
- W bloku `dangerouslySetInnerHTML` rozszerzam stylowanie Tailwind o:
  - `[&_video]` — pełna szerokość, zaokrąglone rogi, `aspect-video`, czarne tło, cień, `my-6`.
  - `[&_.video-embed]` — wrapper `relative aspect-video w-full my-6 rounded-lg overflow-hidden bg-black`, a wewnątrz `iframe` na `absolute inset-0 w-full h-full`.
- Dodaję do `DOMPurify.sanitize` konfigurację, która **dopuszcza** tagi `video`, `source`, `iframe` oraz atrybuty `controls`, `preload`, `poster`, `playsinline`, `src`, `type`, `allow`, `allowfullscreen`, `frameborder`, `loading`, `referrerpolicy`. Whitelist `iframe` zawężona do hostów: `youtube.com`, `youtube-nocookie.com`, `player.vimeo.com` — żeby nie otwierać dziury XSS.

### 3. Drobne UX
- W edytorze pod toolbarem subtelna podpowiedź przy najechaniu na ikonę: „Wstaw film (plik lub YouTube/Vimeo)".
- Jeśli upload się nie powiedzie (limit, brak sieci) — toast z czytelnym komunikatem zamiast `alert()`.
- Aktualizuję istniejący szkic Porcelanosa, żeby `<video>` w treści miał klasę spójną z nowym stylowaniem (kosmetyka, jeśli potrzeba).

## Czego NIE zmieniam
- Bucketów Supabase (używamy `blog-images`, jest publiczny).
- Schematu bazy — wideo to nadal część pola `content` (HTML).
- Brandu/layoutu wpisu — tylko nowe style dla `video`/`iframe`.
- Uprawnień CMS.

## Po akceptacji
Rozszerzenie TipTap → upload + parser linków → whitelist DOMPurify → style w `BlogPost.tsx` → szybki test na szkicu Porcelanosa.
