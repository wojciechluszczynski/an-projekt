## Cel
Naprawić dodawanie filmów MP4 w panelu CMS tak, żeby po wybraniu pliku Ania widziała w treści normalny odtwarzacz zamiast małego znaczka / ikony uszkodzonego elementu.

## Co najprawdopodobniej nie działa
Obecny wariant używa natywnego inputa ukrytego pod komendą wpisaną w `prompt`. Jeśli upload albo wstawienie noda do TipTap nie przejdzie idealnie, edytor zostawia pusty / nieczytelny element. Dodatkowo player w samym edytorze nie ma wystarczająco stabilnych wymiarów, więc może wyglądać jak mała ikonka.

## Plan zmian

1. **Poprawić obsługę uploadu w `TipTapEditor.tsx`**
   - Dodać stan `videoUploading`, żeby przycisk filmu był blokowany podczas wysyłania.
   - Wyczyścić input po każdej próbie, także po błędzie.
   - Walidować, czy plik jest faktycznie wideo i czy ma obsługiwane rozszerzenie.
   - Po udanym uploadzie wstawiać jednoznaczny HTML `<video controls preload="metadata" playsinline class="blog-video"><source ... /></video>` zamiast polegać wyłącznie na niestandardowym nodzie z `src`.
   - Jeśli upload się nie powiedzie, pokazać czytelny toast z powodem.

2. **Ulepszyć player widoczny wewnątrz CMS**
   - Nadać video w edytorze stabilny rozmiar: pełna szerokość, `aspect-video`, czarne tło, zaokrąglenie.
   - Dla iframe YouTube/Vimeo zachować wrapper `video-embed` z proporcją 16:9.
   - Dzięki temu po dodaniu pliku od razu będzie widać player, a nie sam znaczek.

3. **Uprościć UX przycisku filmu**
   - Zamiast wymagać wpisania słowa `plik`, po kliknięciu przycisku filmowego wybór będzie bardziej jednoznaczny:
     - najpierw pytanie: „Wgrać plik z komputera?”
     - jeśli nie, możliwość wklejenia linku YouTube/Vimeo/MP4.
   - To zmniejszy ryzyko, że Ania kliknie ikonę, ale nie uruchomi realnego wyboru pliku.

4. **Dopilnować renderowania wpisu blogowego**
   - Uzupełnić `BlogPost.tsx`, żeby `<video>` z `<source>` miało proporcję 16:9, pełną szerokość i poprawne style.
   - Zostawić whitelistę bezpieczeństwa dla `video`, `source` i zaufanych iframe.

5. **Weryfikacja**
   - Sprawdzić, czy edytor generuje poprawny HTML dla filmu.
   - Sprawdzić, czy zapisany HTML nadal przechodzi przez sanitizację i powinien renderować player we wpisie.

## Czego nie zmieniam
- Nie zmieniam struktury bazy.
- Nie zmieniam uprawnień CMS.
- Nie ruszam istniejących zdjęć ani treści wpisów poza ewentualnym kompatybilnym odczytem filmów.