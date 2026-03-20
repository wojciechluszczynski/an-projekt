import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";

import willaHarmonia1 from "@/assets/willa-harmonia-1.jpeg";
import willaHarmonia2 from "@/assets/willa-harmonia-2.jpeg";
import willaHarmonia3 from "@/assets/willa-harmonia-3.jpeg";
import willaHarmonia4 from "@/assets/willa-harmonia-4.jpeg";
import willaHarmonia5 from "@/assets/willa-harmonia-5.jpeg";
import willaHarmonia6 from "@/assets/willa-harmonia-6.jpeg";
import willaHarmonia7 from "@/assets/willa-harmonia-7.jpeg";
import willaHarmonia8 from "@/assets/willa-harmonia-8.jpeg";
import willaHarmonia9 from "@/assets/willa-harmonia-9.jpeg";
import domPowrot1 from "@/assets/dom-powrot-1.jpeg";
import domPowrot2 from "@/assets/dom-powrot-2.jpeg";
import domPowrot3 from "@/assets/dom-powrot-3.jpeg";
import domPowrot4 from "@/assets/dom-powrot-4.jpeg";
import domPowrot5 from "@/assets/dom-powrot-5.jpeg";
import domPowrot6 from "@/assets/dom-powrot-6.jpeg";
import apartamentKlasa1 from "@/assets/apartament-klasa-1.jpeg";
import apartamentKlasa2 from "@/assets/apartament-klasa-2.jpeg";
import apartamentKlasa3 from "@/assets/apartament-klasa-3.jpeg";
import apartamentKlasa4 from "@/assets/apartament-klasa-4.jpeg";
import apartamentKlasa5 from "@/assets/apartament-klasa-5.jpeg";
import apartamentKlasa6 from "@/assets/apartament-klasa-6.jpeg";
import apartamentKlasa7 from "@/assets/apartament-klasa-7.jpeg";
import apartamentKlasa8 from "@/assets/apartament-klasa-8.jpeg";
import pierwszeMieszkanie1 from "@/assets/pierwsze-mieszkanie-1.jpeg";
import pierwszeMieszkanie2 from "@/assets/pierwsze-mieszkanie-2.jpeg";
import pierwszeMieszkanie3 from "@/assets/pierwsze-mieszkanie-3.jpeg";
import pierwszeMieszkanie4 from "@/assets/pierwsze-mieszkanie-4.jpeg";
import pierwszeMieszkanie5 from "@/assets/pierwsze-mieszkanie-5.jpeg";
import pierwszeMieszkanie6 from "@/assets/pierwsze-mieszkanie-6.jpeg";
import nowyRozdzial1 from "@/assets/nowy-rozdzial-1.jpeg";
import nowyRozdzial2 from "@/assets/nowy-rozdzial-2.jpeg";
import nowyRozdzial3 from "@/assets/nowy-rozdzial-3.jpeg";
import nowyRozdzial4 from "@/assets/nowy-rozdzial-4.jpeg";
import nowyRozdzial5 from "@/assets/nowy-rozdzial-5.jpeg";
import nowyRozdzial6 from "@/assets/nowy-rozdzial-6.jpeg";
import nowyRozdzial7 from "@/assets/nowy-rozdzial-7.jpeg";
import nowyRozdzial8 from "@/assets/nowy-rozdzial-8.jpeg";
import vizBathroomMarble from "@/assets/viz-bathroom-marble.png";
import vizClosetMarble from "@/assets/viz-closet-marble.png";
import vizKitchenRattan from "@/assets/viz-kitchen-rattan.png";
import vizBedroomMural from "@/assets/viz-bedroom-mural.png";
import vizDiningFireplace from "@/assets/viz-dining-fireplace.png";
import vizBedroomDark from "@/assets/viz-bedroom-dark.png";
import vizDetailCeramics from "@/assets/viz-detail-ceramics.png";
import vizLivingBeige from "@/assets/viz-living-beige.png";

const projectsData: Record<string, {
  title: string;
  type: string;
  area: string;
  location: string;
  pkg: string;
  time: string;
  challenge: string;
  story: string[];
  scope: string[];
  result: string;
  images: string[];
}> = {
  "willa-harmonia": {
    title: "Willa Harmonia",
    type: "Dom jednorodzinny",
    area: "160 m\u00B2",
    location: "Podkarpacie",
    pkg: "Kompleks",
    time: "10 tygodni",
    challenge: "Intensywne tempo \u017Cycia inwestor\u00F3w wymaga\u0142o stworzenia przestrzeni, kt\u00F3ra b\u0119dzie przeciwwag\u0105 \u2014 nie kolejnym bod\u017Acem, a miejscem wyciszenia.",
    story: [
      "To mia\u0142 by\u0107 dom \u2018na p\u00F3\u017Aniej\u2019. Na spokojniejsze tempo, na wi\u0119cej czasu dla siebie. Problem w tym, \u017Ce \u017Cycie inwestor\u00F3w nie zwalnia\u0142o \u2014 intensywna praca, szybkie tempo, ci\u0105g\u0142e decyzje. Potrzebowali miejsca, kt\u00F3re nie b\u0119dzie kolejnym bod\u017Acem, tylko przeciwwag\u0105.",
      "Od pocz\u0105tku by\u0142o jasne, \u017Ce kluczem nie b\u0119dzie spektakularna forma, tylko spok\u00F3j. Dlatego zamiast nadmiaru \u2014 ograniczenie. Zamiast efektu \u2018wow\u2019 \u2014 konsekwencja.",
      "Parter zosta\u0142 zaprojektowany jako jedna p\u0142ynna przestrze\u0144, w kt\u00F3rej funkcje naturalnie si\u0119 przenikaj\u0105. Kuchnia, jadalnia i salon nie konkuruj\u0105 ze sob\u0105, tylko tworz\u0105 t\u0142o dla codziennych rytua\u0142\u00F3w. Du\u017Ca wyspa i st\u00F3\u0142 staj\u0105 si\u0119 centrum \u017Cycia \u2014 nie tylko do jedzenia, ale te\u017C rozm\u00F3w, pracy i zatrzymania si\u0119 na chwil\u0119.",
      "Materia\u0142y dobrano tak, \u017Ceby nie m\u0119czy\u0142y. Jasne drewno, kamie\u0144 o delikatnym rysunku, mi\u0119kkie tkaniny. Wszystko jest spokojne, ale nie ch\u0142odne. Minimalizm zosta\u0142 tu \u2018ocieplony\u2019 struktur\u0105 i \u015Bwiat\u0142em \u2014 to ono buduje klimat wn\u0119trza w ci\u0105gu dnia i wieczorem przejmuje rol\u0119 pierwszego planu.",
      "Du\u017Ce przeszklenia otwieraj\u0105 dom na ogr\u00F3d, ale nie dominuj\u0105 przestrzeni. S\u0105 raczej t\u0142em dla tego, co dzieje si\u0119 w \u015Brodku. Wn\u0119trze nie potrzebuje widoku, \u017Ceby dzia\u0142a\u0107 \u2014 ale kiedy si\u0119 pojawia, staje si\u0119 jego naturalnym przed\u0142u\u017Ceniem.",
      "Cz\u0119\u015B\u0107 prywatna zosta\u0142a potraktowana jeszcze spokojniej. Sypialnia to wyciszona, niemal hotelowa przestrze\u0144, w kt\u00F3rej wszystko sprowadza si\u0119 do odpoczynku. Mocniejszy akcent pojawia si\u0119 tylko tam, gdzie ma sens \u2014 jak w formie artystycznej \u015Bciany, kt\u00F3ra nadaje charakter, ale nie zaburza r\u00F3wnowagi.",
      "\u0141azienka i garderoba tworz\u0105 sp\u00F3jny, uporz\u0105dkowany uk\u0142ad. Kamie\u0144, szk\u0142o i \u015Bwiat\u0142o prowadz\u0105 u\u017Cytkownika intuicyjnie przez przestrze\u0144. Nie ma tu przypadkowych decyzji \u2014 ka\u017Cdy element ma swoje miejsce i funkcj\u0119.",
    ],
    scope: ["Pe\u0142ny projekt koncepcyjny", "Wizualizacje 3D i 360\u00B0", "Dokumentacja techniczna", "Nadz\u00F3r nad realizacj\u0105", "Dob\u00F3r materia\u0142\u00F3w i mebli"],
    result: "Dom, kt\u00F3ry nie domaga si\u0119 uwagi. Ale daje dok\u0142adnie to, czego jego w\u0142a\u015Bciciele najbardziej potrzebowali \u2014 spok\u00F3j.",
    images: [willaHarmonia1, willaHarmonia2, willaHarmonia3, willaHarmonia4, willaHarmonia5, willaHarmonia6, willaHarmonia7, willaHarmonia8, willaHarmonia9],
  },
  "dom-powrot": {
    title: "Dom, do kt\u00F3rego si\u0119 wraca",
    type: "Dom jednorodzinny",
    area: "140 m\u00B2",
    location: "Rzesz\u00F3w",
    pkg: "Kompleks",
    time: "8 tygodni",
    challenge: "Wn\u0119trze, kt\u00F3re kiedy\u015B by\u0142o \u2018wystarczaj\u0105ce\u2019, z czasem zacz\u0119\u0142o przeszkadza\u0107. Za du\u017Co przypadkowych decyzji, za ma\u0142o sp\u00F3jno\u015Bci.",
    story: [
      "To nie by\u0142 projekt o zmianie stylu. To by\u0142a decyzja o zmianie codzienno\u015Bci.",
      "Inwestorzy przyszli z poczuciem zm\u0119czenia w\u0142asnym domem. Wn\u0119trze, kt\u00F3re kiedy\u015B by\u0142o \u2018wystarczaj\u0105ce\u2019, z czasem zacz\u0119\u0142o przeszkadza\u0107. Za du\u017Co przypadkowych decyzji, za ma\u0142o sp\u00F3jno\u015Bci. Zamiast odpoczynku \u2014 lekki chaos, kt\u00F3ry trudno by\u0142o nazwa\u0107, ale \u0142atwo odczu\u0107.",
      "Od pocz\u0105tku by\u0142o jasne, \u017Ce nie chodzi o rewolucj\u0119 dla samego efektu. Raczej o uporz\u0105dkowanie tego, co ju\u017C jest \u2014 i nadanie temu nowej jako\u015Bci.",
      "Strefa dzienna zosta\u0142a otwarta i uspokojona wizualnie. Kuchnia przesta\u0142a by\u0107 zbiorem funkcji, a zacz\u0119\u0142a by\u0107 naturalnym t\u0142em dla \u017Cycia. Jasna zabudowa, ciep\u0142e drewno i kamie\u0144 o subtelnym rysunku tworz\u0105 baz\u0119, kt\u00F3ra nie narzuca si\u0119, ale buduje atmosfer\u0119. \u015Awiat\u0142o \u2014 zar\u00F3wno dzienne, jak i sztuczne \u2014 zosta\u0142o potraktowane jak materia\u0142.",
      "Salon to kontynuacja tej samej historii. Du\u017Ca, mi\u0119kka sofa, niskie stoliki, kominek \u2014 wszystko jest tu po to, \u017Ceby zwolni\u0107. To przestrze\u0144, w kt\u00F3rej nie trzeba nic robi\u0107. Wystarczy by\u0107.",
      "W cz\u0119\u015Bci prywatnej postawili\u015Bmy na jeszcze wi\u0119ksze wyciszenie. Sypialnia jest prosta, ale nie surowa. Warstwy tkanin, ciep\u0142e drewno i mi\u0119kkie \u015Bwiat\u0142o buduj\u0105 poczucie bezpiecze\u0144stwa i komfortu.",
      "\u0141azienka kontynuuje t\u0119 sam\u0105 logik\u0119. Po\u0142\u0105czenie kamienia i drewna, czytelny uk\u0142ad, brak zb\u0119dnych podzia\u0142\u00F3w. Wszystko jest intuicyjne, spokojne, uporz\u0105dkowane.",
    ],
    scope: ["Pe\u0142ny projekt koncepcyjny", "Wizualizacje 3D", "Dokumentacja techniczna", "Nadz\u00F3r nad realizacj\u0105", "Dob\u00F3r materia\u0142\u00F3w"],
    result: "Wn\u0119trze, kt\u00F3re nie pr\u00F3buje imponowa\u0107 na pierwszy rzut oka. Zamiast tego robi co\u015B trudniejszego \u2014 sprawia, \u017Ce chce si\u0119 w nim zosta\u0107.",
    images: [domPowrot1, domPowrot2, domPowrot3, domPowrot4, domPowrot5, domPowrot6],
  },
  "apartament-klasa": {
    title: "Apartament z klas\u0105",
    type: "Apartament",
    area: "95 m\u00B2",
    location: "Rzesz\u00F3w",
    pkg: "Kompleks",
    time: "8 tygodni",
    challenge: "Nowy etap \u017Cycia wymaga\u0142 przestrzeni, kt\u00F3ra b\u0119dzie naprawd\u0119 \u2018jej\u2019 \u2014 nie pokazowej, nie pod trendy, tylko takiej, w kt\u00F3rej wszystko ma sens.",
    story: [
      "S\u0105 takie projekty, w kt\u00F3rych od pocz\u0105tku wiadomo, \u017Ce chodzi o co\u015B wi\u0119cej ni\u017C tylko wn\u0119trze.",
      "Tu punktem wyj\u015Bcia by\u0142a zmiana. Nowy etap, nowe miejsce, ale te\u017C potrzeba stworzenia przestrzeni, kt\u00F3ra b\u0119dzie naprawd\u0119 \u2018jej\u2019. Nie pokazowej, nie pod trendy \u2014 tylko takiej, w kt\u00F3rej wszystko ma sens i pasuje do codziennego \u017Cycia.",
      "Od pierwszych rozm\u00F3w by\u0142o jasne, \u017Ce kluczowe b\u0119d\u0105 trzy rzeczy: lekko\u015B\u0107, elegancja i sp\u00F3jno\u015B\u0107. Bez przesady, bez nadmiaru, ale z wyczuciem.",
      "Strefa dzienna zosta\u0142a zaprojektowana jak dobrze skomponowana scena \u2014 wszystko ma tu swoje miejsce, ale nic nie dominuje. Mi\u0119kka sofa, jasne powierzchnie, z\u0142ote akcenty i kamie\u0144 tworz\u0105 spokojne t\u0142o, kt\u00F3re zmienia si\u0119 wraz ze \u015Bwiat\u0142em. Kuchnia p\u0142ynnie przechodzi w cz\u0119\u015B\u0107 wypoczynkow\u0105, a wyspa staje si\u0119 naturalnym centrum \u2014 miejscem spotka\u0144, rozm\u00F3w i codziennych rytua\u0142\u00F3w.",
      "Pojawia si\u0119 tu wi\u0119cej wyrazu ni\u017C w poprzednich projektach \u2014 ale w kontrolowany spos\u00F3b. Z\u0142oto, struktury, detale. To nie s\u0105 dodatki, tylko elementy, kt\u00F3re buduj\u0105 charakter i podkre\u015Blaj\u0105 osobowo\u015B\u0107 w\u0142a\u015Bcicielki.",
      "Sypialnia jest bardziej osobista. Mi\u0119kka, warstwowa, otulaj\u0105ca. Tkaniny, \u015Bwiat\u0142o i subtelne podzia\u0142y \u015Bciany tworz\u0105 przestrze\u0144, w kt\u00F3rej \u0142atwo si\u0119 wyciszy\u0107, ale nie ma w niej nudy. To wn\u0119trze ma energi\u0119 \u2014 tylko spokojniejsz\u0105, bardziej skupion\u0105.",
      "\u0141azienka to z kolei gra proporcji i \u015Bwiat\u0142a. Okr\u0105g\u0142e lustro, delikatne pod\u015Bwietlenia, po\u0142\u0105czenie drewna i kamienia. Wszystko jest dopracowane, ale nieprzekombinowane. Codzienno\u015B\u0107 ma tu swoj\u0105 estetyk\u0119.",
    ],
    scope: ["Pe\u0142ny projekt koncepcyjny", "Wizualizacje 3D i 360\u00B0", "Dokumentacja techniczna", "Nadz\u00F3r nad realizacj\u0105", "Dob\u00F3r materia\u0142\u00F3w i mebli"],
    result: "Przestrze\u0144, kt\u00F3ra nie tylko dobrze wygl\u0105da, ale te\u017C wspiera styl \u017Cycia w\u0142a\u015Bcicielki. Nowy etap nie zaczyna si\u0119 od wielkich deklaracji. Czasem zaczyna si\u0119 od miejsca, do kt\u00F3rego po prostu chce si\u0119 wraca\u0107.",
    images: [apartamentKlasa1, apartamentKlasa2, apartamentKlasa3, apartamentKlasa4, apartamentKlasa5, apartamentKlasa6, apartamentKlasa7, apartamentKlasa8],
  },
  "pierwsze-mieszkanie": {
    title: "Pierwsze wsp\u00F3lne mieszkanie",
    type: "Mieszkanie",
    area: "52 m\u00B2",
    location: "Rzesz\u00F3w",
    pkg: "Komfortowa",
    time: "6 tygodni",
    challenge: "Uk\u0142ad, kt\u00F3ry ogranicza\u0142 mo\u017Cliwo\u015Bci i sprawia\u0142, \u017Ce wn\u0119trze wydawa\u0142o si\u0119 mniejsze ni\u017C by\u0142o w rzeczywisto\u015Bci.",
    story: [
      "To by\u0142 jeden z tych projekt\u00F3w, w kt\u00F3rych metra\u017C nie m\u00F3wi ca\u0142ej prawdy.",
      "Mieszkanie by\u0142o niewielkie, ale ambicje \u2014 ju\u017C nie. M\u0142oda para przysz\u0142a z konkretn\u0105 wizj\u0105: chc\u0105 przestrzeni, kt\u00F3ra b\u0119dzie ich pierwszym wsp\u00F3lnym domem z prawdziwego zdarzenia. Nie tymczasowym. Nie \u2018na chwil\u0119\u2019. Tylko takim, do kt\u00F3rego wraca si\u0119 z przyjemno\u015Bci\u0105.",
      "Zamiast si\u0119 do tego dostosowa\u0107, postanowili\u015Bmy go przepracowa\u0107.",
      "Najwi\u0119ksza zmiana wydarzy\u0142a si\u0119 w strefie dziennej. Otwarcie przestrzeni, uporz\u0105dkowanie funkcji i wprowadzenie sp\u00F3jnych materia\u0142\u00F3w sprawi\u0142y, \u017Ce mieszkanie zacz\u0119\u0142o \u2018oddycha\u0107\u2019. Kuchnia, cho\u0107 kompaktowa, zyska\u0142a wyra\u017An\u0105 o\u015B i wygodn\u0105 wysp\u0119, kt\u00F3ra sta\u0142a si\u0119 centrum \u017Cycia \u2014 od porannej kawy po wieczorne rozmowy.",
      "Salon nie jest du\u017Cy, ale nie pr\u00F3buje udawa\u0107 wi\u0119kszego. Zamiast tego zosta\u0142 zaprojektowany tak, \u017Ceby by\u0142 po prostu wygodny. Mi\u0119kka sofa, \u015Bwiat\u0142o wpadaj\u0105ce przez du\u017Ce przeszklenia i spokojna baza kolorystyczna buduj\u0105 atmosfer\u0119, w kt\u00F3rej \u0142atwo si\u0119 zatrzyma\u0107.",
      "Osobnym wyzwaniem by\u0142o miejsce do pracy. Nie mia\u0142o by\u0107 \u2018k\u0105tem\u2019, tylko realn\u0105 przestrzeni\u0105, kt\u00F3ra dzia\u0142a na co dzie\u0144. W efekcie powsta\u0142o niewielkie, ale pe\u0142noprawne biuro \u2014 z w\u0142asnym rytmem, \u015Bwiat\u0142em i funkcj\u0105.",
      "Sypialnia zosta\u0142a maksymalnie uproszczona, ale z jednym wa\u017Cnym dodatkiem \u2014 garderob\u0105, kt\u00F3ra porz\u0105dkuje codzienno\u015B\u0107. Dzi\u0119ki temu sama przestrze\u0144 do odpoczynku pozostaje czysta i spokojna.",
      "Najwi\u0119ksze zaskoczenie? \u0141azienka. W niewielkim mieszkaniu uda\u0142o si\u0119 stworzy\u0107 przestrze\u0144, kt\u00F3ra nie jest kompromisem. Jest wygodna, czytelna i dopracowana \u2014 z wyra\u017Anym charakterem.",
    ],
    scope: ["Projekt koncepcyjny", "Wizualizacje 3D", "Dokumentacja techniczna", "Dob\u00F3r materia\u0142\u00F3w", "Nadz\u00F3r nad realizacj\u0105"],
    result: "Mieszkanie, kt\u00F3re wykorzystuje ka\u017Cdy metr, ale nie sprawia takiego wra\u017Cenia. I w\u0142a\u015Bnie dlatego ma szans\u0119 zosta\u0107 z nimi na d\u0142u\u017Cej.",
    images: [pierwszeMieszkanie1, pierwszeMieszkanie2, pierwszeMieszkanie3, pierwszeMieszkanie4, pierwszeMieszkanie5, pierwszeMieszkanie6],
  },
  "nowy-rozdzial": {
    title: "Nowy rozdzia\u0142 tej samej historii",
    type: "Biuro",
    area: "120 m\u00B2",
    location: "Podkarpacie",
    pkg: "Kompleks",
    time: "8 tygodni",
    challenge: "Nowa siedziba w nowoczesnym budynku wymaga\u0142a wn\u0119trza, kt\u00F3re nie b\u0119dzie tylko \u2018\u0142adne\u2019, ale przede wszystkim adekwatne do etapu rozwoju firmy.",
    story: [
      "To biuro nie powsta\u0142o od zera. Powsta\u0142o dla firmy, kt\u00F3ra ju\u017C dobrze wiedzia\u0142a, kim jest.",
      "Wieloletnie do\u015Bwiadczenie, sprawdzony zesp\u00F3\u0142 i konkretne potrzeby \u2014 ale jednocze\u015Bnie moment zmiany. Nowa siedziba w nowoczesnym budynku, z du\u017C\u0105 ilo\u015Bci\u0105 \u015Bwiat\u0142a i przestrzeni, wymaga\u0142a wn\u0119trza, kt\u00F3re nie b\u0119dzie tylko \u2018\u0142adne\u2019, ale przede wszystkim adekwatne do tego etapu rozwoju.",
      "Pierwsze za\u0142o\u017Cenie by\u0142o proste: ma si\u0119 tu dobrze pracowa\u0107. Drugie \u2014 to biuro ma robi\u0107 wra\u017Cenie, ale bez przesady.",
      "Dlatego zamiast i\u015B\u0107 w efektowno\u015B\u0107, postawili\u015Bmy na kontrol\u0119. Ciemniejsze, grafitowe zabudowy porz\u0105dkuj\u0105 przestrze\u0144 i nadaj\u0105 jej charakter, a naturalne drewno ociepla ca\u0142o\u015B\u0107 i r\u00F3wnowa\u017Cy techniczny klimat biura. Du\u017Ce przeszklenia nie tylko do\u015Bwietlaj\u0105 wn\u0119trze, ale te\u017C buduj\u0105 poczucie otwarto\u015Bci.",
      "Kluczowa by\u0142a organizacja pracy. Powsta\u0142y czytelne strefy: wsp\u00F3lna przestrze\u0144 do spotka\u0144 i pracy zespo\u0142owej oraz miejsca bardziej indywidualne, gdzie mo\u017Cna si\u0119 skupi\u0107. Szklane \u015Bciany pozwalaj\u0105 zachowa\u0107 kontakt wizualny, ale jednocze\u015Bnie daj\u0105 potrzebn\u0105 separacj\u0119.",
      "O\u015Bwietlenie nie jest tu dodatkiem \u2014 jest elementem kompozycji. Geometryczne, lekkie formy nad sto\u0142ami prowadz\u0105 wzrok i buduj\u0105 rytm ca\u0142ego wn\u0119trza. Wieczorem to one przejmuj\u0105 rol\u0119 \u015Bwiat\u0142a dziennego i nadaj\u0105 przestrzeni zupe\u0142nie inny charakter.",
      "Ziele\u0144 nie jest przypadkowa. Pojawia si\u0119 tam, gdzie naturalnie odpoczywa wzrok \u2014 przy stanowiskach pracy, w strefach wsp\u00F3lnych, przy przeszkleniach. To nie dekoracja, tylko narz\u0119dzie, kt\u00F3re realnie wp\u0142ywa na komfort pracy.",
    ],
    scope: ["Pe\u0142ny projekt koncepcyjny", "Wizualizacje 3D i 360\u00B0", "Dokumentacja techniczna", "Nadz\u00F3r nad realizacj\u0105", "Dob\u00F3r materia\u0142\u00F3w i o\u015Bwietlenia"],
    result: "Biuro, kt\u00F3re nie pr\u00F3buje by\u0107 \u2018kreatywne na si\u0142\u0119\u2019. Jest spokojne, uporz\u0105dkowane i \u015Bwiadome. Dobrze zaprojektowana przestrze\u0144 nie odci\u0105ga uwagi od pracy. Ona j\u0105 po prostu wspiera.",
    images: [nowyRozdzial1, nowyRozdzial2, nowyRozdzial3, nowyRozdzial4, nowyRozdzial5, nowyRozdzial6, nowyRozdzial7, nowyRozdzial8],
  },
  "bambusowa-oaza": {
    title: "Bambusowa Oaza",
    type: "Salon z jadalni\u0105",
    area: "65 m\u00B2",
    location: "Ma\u0142opolska",
    pkg: "Koncepcyjna",
    time: "3 tygodnie",
    challenge: "Klienci chcieli wn\u0119trze inspirowane natur\u0105, ale nie wiedzieli, jak to prze\u0142o\u017Cy\u0107 na konkretne rozwi\u0105zania.",
    story: [
      "Zaproponowa\u0142am naturalny rattan, jasne drewno i spokojn\u0105 palet\u0119 be\u017C\u00F3w i zieleni. Kominek sta\u0142 si\u0119 centralnym punktem, a du\u017Ce okna z widokiem na ogr\u00F3d \u2013 integraln\u0105 cz\u0119\u015Bci\u0105 projektu.",
    ],
    scope: ["Uk\u0142ad funkcjonalny", "Moodboard i propozycja stylistyczna", "3 wizualizacje 3D", "Podstawowe rysunki techniczne"],
    result: "Sp\u00F3jna koncepcja, kt\u00F3ra da\u0142a klientom jasny punkt wyj\u015Bcia do dalszej realizacji.",
    images: [vizDiningFireplace, vizLivingBeige, vizDetailCeramics, vizClosetMarble],
  },
  "marmurowa-lazienka": {
    title: "Marmurowa \u0141azienka",
    type: "\u0141azienka",
    area: "12 m\u00B2",
    location: "Krosno",
    pkg: "Komfortowa",
    time: "3 tygodnie",
    challenge: "Niewielka przestrze\u0144, w kt\u00F3rej trzeba by\u0142o pomie\u015Bci\u0107 wann\u0119, prysznic i du\u017Co miejsca do przechowywania.",
    story: [
      "Klientka marzy\u0142a o \u0142azience w stylu hotelowym \u2013 jasny marmur, z\u0142ote detale i du\u017Co \u015Bwiat\u0142a. Zaproponowa\u0142am du\u017Ce p\u0142yty imituj\u0105ce marmur, pod\u015Bwietlane lustro i sprytne schowki za lustrzanymi frontami.",
    ],
    scope: ["Projekt koncepcyjny", "2 wizualizacje 3D", "Dokumentacja techniczna", "Dob\u00F3r materia\u0142\u00F3w"],
    result: "Elegancka \u0142azienka, kt\u00F3ra wygl\u0105da na znacznie wi\u0119ksz\u0105 ni\u017C jest w rzeczywisto\u015Bci.",
    images: [vizBathroomMarble, vizDetailCeramics, vizClosetMarble, vizLivingBeige],
  },
  "ciemna-sypialnia": {
    title: "Ciemna Sypialnia",
    type: "Sypialnia",
    area: "20 m\u00B2",
    location: "Rzesz\u00F3w",
    pkg: "Koncepcyjna",
    time: "2 tygodnie",
    challenge: "Klient chcia\u0142 ciemn\u0105, przytulna sypialnie, ale bez efektu przygnębiającego wnętrza.",
    story: [
      "Postawi\u0142am na g\u0142\u0119bokie, ciep\u0142e odcienie grafitu i br\u0105zu, mi\u0119kkie tkaniny i punktowe o\u015Bwietlenie. Drewniane panele za \u0142\u00F3\u017Ckiem doda\u0142y ciep\u0142a, a du\u017Ce okno z lnian\u0105 zas\u0142on\u0105 zapewnia naturalny dost\u0119p \u015Bwiat\u0142a w ci\u0105gu dnia.",
    ],
    scope: ["Moodboard", "2 wizualizacje 3D", "Propozycja kolorystyczna", "Lista materia\u0142\u00F3w"],
    result: "Klimatyczna sypialnia, w kt\u00F3rej dobrze si\u0119 odpoczywa \u2013 ciemna, ale ciep\u0142a i przytulna.",
    images: [vizBedroomDark, vizBedroomMural, vizLivingBeige, vizKitchenRattan],
  },
  "mural-sypialnia": {
    title: "Mural Sypialnia",
    type: "Sypialnia",
    area: "18 m\u00B2",
    location: "Nowy S\u0105cz",
    pkg: "Koncepcyjna",
    time: "2 tygodnie",
    challenge: "Para chcia\u0142a sypialni\u0119 z charakterem \u2013 co\u015B wi\u0119cej ni\u017C standardowe, bia\u0142e \u015Bciany.",
    story: [
      "Zaproponowa\u0142am delikatny mural z motywem ro\u015Blinnym na \u015Bcianie za \u0142\u00F3\u017Ckiem. Reszta wn\u0119trza utrzymana w spokojnych be\u017Cach i bieli, \u017Ceby mural m\u00F3g\u0142 by\u0107 g\u0142\u00F3wnym akcentem. Drewniana pod\u0142oga i lniane tkaniny dope\u0142niaj\u0105 ca\u0142o\u015B\u0107.",
    ],
    scope: ["Moodboard", "2 wizualizacje 3D", "Propozycja muralu", "Dob\u00F3r tkanin"],
    result: "Sypialnia z dusz\u0105 \u2013 spokojna, ale z wyrazistym elementem, kt\u00F3ry nadaje charakter.",
    images: [vizBedroomMural, vizBedroomDark, vizDiningFireplace, vizDetailCeramics],
  },
  "marmurowa-garderoba": {
    title: "Marmurowa Garderoba",
    type: "Garderoba",
    area: "8 m\u00B2",
    location: "Podkarpacie",
    pkg: "Komfortowa",
    time: "2 tygodnie",
    challenge: "Ma\u0142a garderoba musia\u0142a pomie\u015Bci\u0107 ubrania dw\u00F3ch os\u00F3b i wygl\u0105da\u0107 elegancko.",
    story: [
      "Zaprojektowa\u0142am system szaf od pod\u0142ogi do sufitu z lustrzanymi frontami, kt\u00F3re optycznie powi\u0119kszaj\u0105 przestrze\u0144. Marmurowa pod\u0142oga i z\u0142ote uchwyty nadaj\u0105 wn\u0119trzu luksusowy charakter.",
    ],
    scope: ["Projekt zabudowy", "2 wizualizacje 3D", "Dokumentacja techniczna", "Dob\u00F3r materia\u0142\u00F3w"],
    result: "Kompaktowa garderoba, kt\u00F3ra mie\u015Bci wszystko i wygl\u0105da jak z katalogu.",
    images: [vizClosetMarble, vizBathroomMarble, vizDetailCeramics, vizLivingBeige],
  },
  "detale-ceramiczne": {
    title: "Detale Ceramiczne",
    type: "Kuchnia",
    area: "25 m\u00B2",
    location: "Krosno",
    pkg: "Komfortowa",
    time: "4 tygodnie",
    challenge: "Kuchnia otwarta na salon wymaga\u0142a sp\u00F3jnego po\u0142\u0105czenia strefy gotowania z wypoczynkow\u0105.",
    story: [
      "R\u0119cznie robiona ceramika na \u015Bcianie nad blatem sta\u0142a si\u0119 centralnym elementem projektu. Drewniane fronty, kamienny blat i rattanowe dodatki tworz\u0105 ciep\u0142\u0105, naturaln\u0105 atmosfer\u0119.",
    ],
    scope: ["Uk\u0142ad funkcjonalny", "3 wizualizacje 3D", "Dokumentacja techniczna", "Nadz\u00F3r nad wykonaniem p\u0142ytek"],
    result: "Kuchnia, kt\u00F3ra jest sercem domu \u2013 pi\u0119kna, funkcjonalna i z unikatowym charakterem dzi\u0119ki ceramice.",
    images: [vizDetailCeramics, vizKitchenRattan, vizDiningFireplace, vizBathroomMarble],
  },
};

const ProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? projectsData[slug] : null;
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [selectedImg, setSelectedImg] = useState(0);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (!project) return;
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox(prev => prev !== null ? (prev + 1) % project.images.length : null);
      if (e.key === "ArrowLeft") setLightbox(prev => prev !== null ? (prev - 1 + project.images.length) % project.images.length : null);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [lightbox, project]);

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl text-foreground mb-4">Projekt nie znaleziony</h1>
          <Link to="/realizacje" className="text-accent font-body hover:underline">
            Wr\u00F3\u0107 do realizacji
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <img src={project.images[0]} alt={`${project.title} \u2013 projekt wn\u0119trz ${project.location}`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/35" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-heading text-3xl md:text-5xl text-dark-foreground mb-3">{project.title}</h1>
          <p className="font-body text-sm text-dark-foreground/80 tracking-wide uppercase">
            {project.type} \u00B7 {project.area} \u00B7 {project.location}
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <section className="bg-background pt-10 px-6 md:px-12 lg:px-20">
        <div className="max-w-[900px] mx-auto">
          <nav className="flex items-center gap-2 text-xs font-body text-muted-foreground">
            <Link to="/" className="hover:text-accent transition-colors">Strona g\u0142\u00F3wna</Link>
            <span>/</span>
            <Link to="/realizacje" className="hover:text-accent transition-colors">Realizacje</Link>
            <span>/</span>
            <span className="text-foreground">{project.title}</span>
          </nav>
        </div>
      </section>

      {/* Story & details */}
      <section className="bg-background section-padding">
        <div className="max-w-[900px] mx-auto">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 mb-12">
              <div>
                <h2 className="font-heading text-2xl text-foreground mb-4">O projekcie</h2>
                {project.story.map((paragraph, i) => (
                  <p key={i} className="text-muted-foreground font-body text-base leading-relaxed mb-4">{paragraph}</p>
                ))}
              </div>
              <div className="md:border-l md:border-border md:pl-8 space-y-5 md:min-w-[200px]">
                {[
                  { label: "Lokalizacja", value: project.location },
                  { label: "Metra\u017C", value: project.area },
                  { label: "Opcja", value: project.pkg },
                  { label: "Czas realizacji", value: project.time },
                ].map((d) => (
                  <div key={d.label}>
                    <p className="text-muted-foreground font-body text-xs tracking-[0.15em] uppercase mb-1">{d.label}</p>
                    <p className="font-heading text-base text-foreground">{d.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Scope */}
          <FadeIn delay={100}>
            <h3 className="font-heading text-lg text-foreground mb-3">Zakres prac</h3>
            <ul className="flex flex-wrap gap-2 mb-12">
              {project.scope.map((s) => (
                <li key={s} className="font-body text-sm text-muted-foreground bg-secondary px-4 py-1.5 rounded-full">{s}</li>
              ))}
            </ul>
          </FadeIn>

          {/* Result quote */}
          <FadeIn delay={150}>
            <blockquote className="border-l-2 border-accent pl-5 py-1 mb-12">
              <p className="font-body text-base text-foreground/70 italic leading-relaxed">{project.result}</p>
            </blockquote>
          </FadeIn>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-background px-6 md:px-12 lg:px-20 pb-20">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <button onClick={() => setLightbox(selectedImg)} className="w-full group cursor-pointer mb-4">
              <img
                src={project.images[selectedImg]}
                alt={`${project.title} wizualizacja ${selectedImg + 1}`}
                className="w-full aspect-[16/9] object-cover rounded-lg transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </button>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
              {project.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(i)}
                  className={`flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300 ${i === selectedImg ? "ring-2 ring-accent opacity-100" : "opacity-60 hover:opacity-90"}`}
                >
                  <img src={img} alt={`Miniatura ${i + 1}`} className="h-20 md:h-24 w-32 md:w-40 object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary section-padding-sm">
        <div className="max-w-[700px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4">Planujesz podobny projekt?</h2>
            <p className="text-muted-foreground font-body text-base mb-8">
              Napisz do mnie \u2013 ch\u0119tnie porozmawiam o Twoim wn\u0119trzu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/kontakt" className="px-7 py-3 rounded-full bg-accent text-accent-foreground text-sm tracking-[0.05em] font-body hover:bg-accent/90 transition-all duration-300">
                Um\u00F3w spotkanie
              </Link>
              <Link to="/realizacje" className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full border border-foreground text-foreground text-sm tracking-[0.05em] font-body hover:bg-foreground hover:text-background transition-all duration-300">
                Inne realizacje <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[100] bg-foreground/95 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-dark-foreground/80 hover:text-dark-foreground transition-colors z-10" onClick={() => setLightbox(null)}>
            <X size={32} />
          </button>
          <button
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-dark-foreground/20 backdrop-blur-sm flex items-center justify-center text-dark-foreground hover:bg-dark-foreground/30 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); setLightbox(prev => prev !== null ? (prev - 1 + project.images.length) % project.images.length : null); }}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-dark-foreground/20 backdrop-blur-sm flex items-center justify-center text-dark-foreground hover:bg-dark-foreground/30 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); setLightbox(prev => prev !== null ? (prev + 1) % project.images.length : null); }}
          >
            <ChevronRight size={24} />
          </button>
          <img
            src={project.images[lightbox]}
            alt={`${project.title} wizualizacja`}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {project.images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === lightbox ? "bg-dark-foreground w-6" : "bg-dark-foreground/40"}`}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default ProjectPage;