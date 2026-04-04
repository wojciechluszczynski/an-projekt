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
import domScenariusz1 from "@/assets/dom-scenariusz-1.png";
import domScenariusz2 from "@/assets/dom-scenariusz-2.png";
import domScenariusz3 from "@/assets/dom-scenariusz-3.png";
import domScenariusz4 from "@/assets/dom-scenariusz-4.png";
import domScenariusz5 from "@/assets/dom-scenariusz-5.png";
import domScenariusz6 from "@/assets/dom-scenariusz-6.png";
import domScenariusz7 from "@/assets/dom-scenariusz-7.png";
import domScenariusz8 from "@/assets/dom-scenariusz-8.png";
import domScenariusz9 from "@/assets/dom-scenariusz-9.png";
import domScenariusz10 from "@/assets/dom-scenariusz-10.png";
import domScenariusz11 from "@/assets/dom-scenariusz-11.png";
import domScenariusz12 from "@/assets/dom-scenariusz-12.png";
import miejsceZnali1 from "@/assets/miejsce-znali-1.png";
import miejsceZnali2 from "@/assets/miejsce-znali-2.png";
import miejsceZnali3 from "@/assets/miejsce-znali-3.png";
import miejsceZnali4 from "@/assets/miejsce-znali-4.png";
import miejsceZnali5 from "@/assets/miejsce-znali-5.png";

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
    area: "160 m²",
    location: "Podkarpacie",
    pkg: "Kompleks",
    time: "10 tygodni",
    challenge: "Intensywne tempo życia inwestorów wymagało stworzenia przestrzeni, która będzie przeciwwagą — nie kolejnym bodźcem, a miejscem wyciszenia.",
    story: [
      "To miał być dom 'na później'. Na spokojniejsze tempo, na więcej czasu dla siebie. Problem w tym, że życie inwestorów nie zwalniało — intensywna praca, szybkie tempo, ciągłe decyzje. Potrzebowali miejsca, które nie będzie kolejnym bodźcem, tylko przeciwwagą.",
      "Od początku było jasne, że kluczem nie będzie spektakularna forma, tylko spokój. Dlatego zamiast nadmiaru — ograniczenie. Zamiast efektu 'wow' — konsekwencja.",
      "Parter został zaprojektowany jako jedna płynna przestrzeń, w której funkcje naturalnie się przenikają. Kuchnia, jadalnia i salon nie konkurują ze sobą, tylko tworzą tło dla codziennych rytuałów. Duża wyspa i stół stają się centrum życia — nie tylko do jedzenia, ale też rozmów, pracy i zatrzymania się na chwilę.",
      "Materiały dobrano tak, żeby nie męczyły. Jasne drewno, kamień o delikatnym rysunku, miękkie tkaniny. Wszystko jest spokojne, ale nie chłodne. Minimalizm został tu 'ocieplony' strukturą i światłem — to ono buduje klimat wnętrza w ciągu dnia i wieczorem przejmuje rolę pierwszego planu.",
      "Duże przeszklenia otwierają dom na ogród, ale nie dominują przestrzeni. Są raczej tłem dla tego, co dzieje się w środku. Wnętrze nie potrzebuje widoku, żeby działać — ale kiedy się pojawia, staje się jego naturalnym przedłużeniem.",
      "Część prywatna została potraktowana jeszcze spokojniej. Sypialnia to wyciszona, niemal hotelowa przestrzeń, w której wszystko sprowadza się do odpoczynku. Mocniejszy akcent pojawia się tylko tam, gdzie ma sens — jak w formie artystycznej ściany, która nadaje charakter, ale nie zaburza równowagi.",
      "Łazienka i garderoba tworzą spójny, uporządkowany układ. Kamień, szkło i światło prowadzą użytkownika intuicyjnie przez przestrzeń. Nie ma tu przypadkowych decyzji — każdy element ma swoje miejsce i funkcję.",
    ],
    scope: ["Pełny projekt koncepcyjny", "Wizualizacje 3D i 360°", "Dokumentacja techniczna", "Nadzór nad realizacją", "Dobór materiałów i mebli"],
    result: "Dom, który nie domaga się uwagi. Ale daje dokładnie to, czego jego właściciele najbardziej potrzebowali — spokój.",
    images: [willaHarmonia1, willaHarmonia2, willaHarmonia3, willaHarmonia4, willaHarmonia5, willaHarmonia6, willaHarmonia7, willaHarmonia8, willaHarmonia9],
  },
  "dom-powrot": {
    title: "Dom, do którego się wraca",
    type: "Dom jednorodzinny",
    area: "140 m²",
    location: "Rzeszów",
    pkg: "Kompleks",
    time: "8 tygodni",
    challenge: "Wnętrze, które kiedyś było 'wystarczające', z czasem zaczęło przeszkadzać. Za dużo przypadkowych decyzji, za mało spójności.",
    story: [
      "To nie był projekt o zmianie stylu. To była decyzja o zmianie codzienności.",
      "Inwestorzy przyszli z poczuciem zmęczenia własnym domem. Wnętrze, które kiedyś było 'wystarczające', z czasem zaczęło przeszkadzać. Za dużo przypadkowych decyzji, za mało spójności. Zamiast odpoczynku — lekki chaos, który trudno było nazwać, ale łatwo odczuć.",
      "Od początku było jasne, że nie chodzi o rewolucję dla samego efektu. Raczej o uporządkowanie tego, co już jest — i nadanie temu nowej jakości.",
      "Strefa dzienna została otwarta i uspokojona wizualnie. Kuchnia przestała być zbiorem funkcji, a zaczęła być naturalnym tłem dla życia. Jasna zabudowa, ciepłe drewno i kamień o subtelnym rysunku tworzą bazę, która nie narzuca się, ale buduje atmosferę. Światło — zarówno dzienne, jak i sztuczne — zostało potraktowane jak materiał.",
      "Salon to kontynuacja tej samej historii. Duża, miękka sofa, niskie stoliki, kominek — wszystko jest tu po to, żeby zwolnić. To przestrzeń, w której nie trzeba nic robić. Wystarczy być.",
      "W części prywatnej postawiliśmy na jeszcze większe wyciszenie. Sypialnia jest prosta, ale nie surowa. Warstwy tkanin, ciepłe drewno i miękkie światło budują poczucie bezpieczeństwa i komfortu.",
      "Łazienka kontynuuje tę samą logikę. Połączenie kamienia i drewna, czytelny układ, brak zbędnych podziałów. Wszystko jest intuicyjne, spokojne, uporządkowane.",
    ],
    scope: ["Pełny projekt koncepcyjny", "Wizualizacje 3D", "Dokumentacja techniczna", "Nadzór nad realizacją", "Dobór materiałów"],
    result: "Wnętrze, które nie próbuje imponować na pierwszy rzut oka. Zamiast tego robi coś trudniejszego — sprawia, że chce się w nim zostać.",
    images: [domPowrot1, domPowrot2, domPowrot3, domPowrot4, domPowrot5, domPowrot6],
  },
  "apartament-klasa": {
    title: "Apartament z klasą",
    type: "Apartament",
    area: "95 m²",
    location: "Rzeszów",
    pkg: "Kompleks",
    time: "8 tygodni",
    challenge: "Nowy etap życia wymagał przestrzeni, która będzie naprawdę 'jej' — nie pokazowej, nie pod trendy, tylko takiej, w której wszystko ma sens.",
    story: [
      "Są takie projekty, w których od początku wiadomo, że chodzi o coś więcej niż tylko wnętrze.",
      "Tu punktem wyjścia była zmiana. Nowy etap, nowe miejsce, ale też potrzeba stworzenia przestrzeni, która będzie naprawdę 'jej'. Nie pokazowej, nie pod trendy — tylko takiej, w której wszystko ma sens i pasuje do codziennego życia.",
      "Od pierwszych rozmów było jasne, że kluczowe będą trzy rzeczy: lekkość, elegancja i spójność. Bez przesady, bez nadmiaru, ale z wyczuciem.",
      "Strefa dzienna została zaprojektowana jak dobrze skomponowana scena — wszystko ma tu swoje miejsce, ale nic nie dominuje. Miękka sofa, jasne powierzchnie, złote akcenty i kamień tworzą spokojne tło, które zmienia się wraz ze światłem. Kuchnia płynnie przechodzi w część wypoczynkową, a wyspa staje się naturalnym centrum — miejscem spotkań, rozmów i codziennych rytuałów.",
      "Pojawia się tu więcej wyrazu niż w poprzednich projektach — ale w kontrolowany sposób. Złoto, struktury, detale. To nie są dodatki, tylko elementy, które budują charakter i podkreślają osobowość właścicielki.",
      "Sypialnia jest bardziej osobista. Miękka, warstwowa, otulająca. Tkaniny, światło i subtelne podziały ściany tworzą przestrzeń, w której łatwo się wyciszyć, ale nie ma w niej nudy. To wnętrze ma energię — tylko spokojniejszą, bardziej skupioną.",
      "Łazienka to z kolei gra proporcji i światła. Okrągłe lustro, delikatne podświetlenia, połączenie drewna i kamienia. Wszystko jest dopracowane, ale nieprzekombinowane. Codzienność ma tu swoją estetykę.",
    ],
    scope: ["Pełny projekt koncepcyjny", "Wizualizacje 3D i 360°", "Dokumentacja techniczna", "Nadzór nad realizacją", "Dobór materiałów i mebli"],
    result: "Przestrzeń, która nie tylko dobrze wygląda, ale też wspiera styl życia właścicielki. Nowy etap nie zaczyna się od wielkich deklaracji. Czasem zaczyna się od miejsca, do którego po prostu chce się wracać.",
    images: [apartamentKlasa1, apartamentKlasa2, apartamentKlasa3, apartamentKlasa4, apartamentKlasa5, apartamentKlasa6, apartamentKlasa7, apartamentKlasa8],
  },
  "pierwsze-mieszkanie": {
    title: "Pierwsze wspólne mieszkanie",
    type: "Mieszkanie",
    area: "52 m²",
    location: "Rzeszów",
    pkg: "Komfortowa",
    time: "6 tygodni",
    challenge: "Układ, który ograniczał możliwości i sprawiał, że wnętrze wydawało się mniejsze niż było w rzeczywistości.",
    story: [
      "To był jeden z tych projektów, w których metraż nie mówi całej prawdy.",
      "Mieszkanie było niewielkie, ale ambicje — już nie. Młoda para przyszła z konkretną wizją: chcą przestrzeni, która będzie ich pierwszym wspólnym domem z prawdziwego zdarzenia. Nie tymczasowym. Nie 'na chwilę'. Tylko takim, do którego wraca się z przyjemnością.",
      "Zamiast się do tego dostosować, postanowiliśmy go przepracować.",
      "Największa zmiana wydarzyła się w strefie dziennej. Otwarcie przestrzeni, uporządkowanie funkcji i wprowadzenie spójnych materiałów sprawiły, że mieszkanie zaczęło 'oddychać'. Kuchnia, choć kompaktowa, zyskała wyraźną oś i wygodną wyspę, która stała się centrum życia — od porannej kawy po wieczorne rozmowy.",
      "Salon nie jest duży, ale nie próbuje udawać większego. Zamiast tego został zaprojektowany tak, żeby był po prostu wygodny. Miękka sofa, światło wpadające przez duże przeszklenia i spokojna baza kolorystyczna budują atmosferę, w której łatwo się zatrzymać.",
      "Osobnym wyzwaniem było miejsce do pracy. Nie miało być 'kątem', tylko realną przestrzenią, która działa na co dzień. W efekcie powstało niewielkie, ale pełnoprawne biuro — z własnym rytmem, światłem i funkcją.",
      "Sypialnia została maksymalnie uproszczona, ale z jednym ważnym dodatkiem — garderobą, która porządkuje codzienność. Dzięki temu sama przestrzeń do odpoczynku pozostaje czysta i spokojna.",
      "Największe zaskoczenie? Łazienka. W niewielkim mieszkaniu udało się stworzyć przestrzeń, która nie jest kompromisem. Jest wygodna, czytelna i dopracowana — z wyraźnym charakterem.",
    ],
    scope: ["Projekt koncepcyjny", "Wizualizacje 3D", "Dokumentacja techniczna", "Dobór materiałów", "Nadzór nad realizacją"],
    result: "Mieszkanie, które wykorzystuje każdy metr, ale nie sprawia takiego wrażenia. I właśnie dlatego ma szansę zostać z nimi na dłużej.",
    images: [pierwszeMieszkanie1, pierwszeMieszkanie2, pierwszeMieszkanie3, pierwszeMieszkanie4, pierwszeMieszkanie5, pierwszeMieszkanie6],
  },
  "nowy-rozdzial": {
    title: "Nowy rozdział tej samej historii",
    type: "Biuro",
    area: "120 m²",
    location: "Podkarpacie",
    pkg: "Kompleks",
    time: "8 tygodni",
    challenge: "Nowa siedziba w nowoczesnym budynku wymagała wnętrza, które nie będzie tylko 'ładne', ale przede wszystkim adekwatne do etapu rozwoju firmy.",
    story: [
      "To biuro nie powstało od zera. Powstało dla firmy, która już dobrze wiedziała, kim jest.",
      "Wieloletnie doświadczenie, sprawdzony zespół i konkretne potrzeby — ale jednocześnie moment zmiany. Nowa siedziba w nowoczesnym budynku, z dużą ilością światła i przestrzeni, wymagała wnętrza, które nie będzie tylko 'ładne', ale przede wszystkim adekwatne do tego etapu rozwoju.",
      "Pierwsze założenie było proste: ma się tu dobrze pracować. Drugie — to biuro ma robić wrażenie, ale bez przesady.",
      "Dlatego zamiast iść w efektowność, postawiliśmy na kontrolę. Ciemniejsze, grafitowe zabudowy porządkują przestrzeń i nadają jej charakter, a naturalne drewno ociepla całość i równoważy techniczny klimat biura. Duże przeszklenia nie tylko doświetlają wnętrze, ale też budują poczucie otwartości.",
      "Kluczowa była organizacja pracy. Powstały czytelne strefy: wspólna przestrzeń do spotkań i pracy zespołowej oraz miejsca bardziej indywidualne, gdzie można się skupić. Szklane ściany pozwalają zachować kontakt wizualny, ale jednocześnie dają potrzebną separację.",
      "Oświetlenie nie jest tu dodatkiem — jest elementem kompozycji. Geometryczne, lekkie formy nad stołami prowadzą wzrok i budują rytm całego wnętrza. Wieczorem to one przejmują rolę światła dziennego i nadają przestrzeni zupełnie inny charakter.",
      "Zieleń nie jest przypadkowa. Pojawia się tam, gdzie naturalnie odpoczywa wzrok — przy stanowiskach pracy, w strefach wspólnych, przy przeszkleniach. To nie dekoracja, tylko narzędzie, które realnie wpływa na komfort pracy.",
    ],
    scope: ["Pełny projekt koncepcyjny", "Wizualizacje 3D i 360°", "Dokumentacja techniczna", "Nadzór nad realizacją", "Dobór materiałów i oświetlenia"],
    result: "Biuro, które nie próbuje być 'kreatywne na siłę'. Jest spokojne, uporządkowane i świadome. Dobrze zaprojektowana przestrzeń nie odciąga uwagi od pracy. Ona ją po prostu wspiera.",
    images: [nowyRozdzial1, nowyRozdzial2, nowyRozdzial3, nowyRozdzial4, nowyRozdzial5, nowyRozdzial6, nowyRozdzial7, nowyRozdzial8],
  },
  "dom-scenariusz": {
    title: "Dom gotowy na więcej niż jeden scenariusz",
    type: "Dom jednorodzinny",
    area: "130 m²",
    location: "Rzeszów",
    pkg: "Kompleks",
    time: "10 tygodni",
    challenge: "Życie w trakcie zmiany — małżeństwo z małą córeczką i drugim dzieckiem w drodze potrzebowało domu, który realnie odpowie na codzienność, która za chwilę miała się zmienić.",
    story: [
      "Ten projekt od początku miał konkretny kontekst — życie w trakcie zmiany.",
      "Małżeństwo z małą córeczką i drugim dzieckiem w drodze. Dom w centrum Rzeszowa, który miał przestać być 'po prostu miejscem do mieszkania', a zacząć realnie odpowiadać na codzienność, która za chwilę miała się zmienić.",
      "Największym wyzwaniem nie był styl. Była funkcja.",
      "Jedna z kluczowych decyzji dotyczyła pracy zdalnej. Potrzebne było miejsce, które nie będzie prowizorycznym biurkiem w salonie, tylko pełnoprawną przestrzenią do skupienia. Problem w tym, że dostępne pomieszczenie nie miało okna.",
      "Zamiast je skreślić — wykorzystaliśmy je maksymalnie. Po wyburzeniach i wprowadzeniu przeszkleń powstało biuro, które dziś jest jednym z najbardziej komfortowych miejsc w domu. Światło z sąsiednich stref zaczęło pracować na jego korzyść, a zamknięcie w szkle daje jednocześnie prywatność i poczucie kontaktu z resztą wnętrza.",
      "Pralnia przeniesiona do garażu uwolniła cenną przestrzeń, którą mogliśmy przeznaczyć na funkcje naprawdę potrzebne na co dzień. Po kolejnych zmianach i przesunięciach ścian udało nam się uzyskać garderobę — element, który porządkuje życie bardziej, niż się wydaje na etapie projektu.",
      "Strefa dzienna została utrzymana w jasnej, spokojnej tonacji, ale z wyraźnymi akcentami materiałowymi. Wyspa kuchenna i ciepłe drewno budują centrum domu — miejsce, które naturalnie przyciąga domowników. To tu toczy się codzienność.",
      "Sypialnia została wyciszona. Miękkie światło, tkaniny i ograniczona paleta kolorów tworzą przestrzeń do odpoczynku, która kontrastuje z bardziej dynamiczną częścią dzienną.",
      "Pokoje dziecięce są inne — lżejsze, bardziej swobodne, gotowe na zmiany. Bo to właśnie tam wszystko będzie się zmieniać najszybciej.",
      "Ten projekt miał jeszcze jeden wymiar — logistyczny. Inwestorzy na co dzień mieszkali w Warszawie, a cały proces realizacji odbywał się na miejscu, w Rzeszowie. Nadzór autorski i dobra współpraca z wykonawcami były tu kluczowe.",
    ],
    scope: ["Pełny projekt koncepcyjny", "Wizualizacje 3D i 360°", "Dokumentacja techniczna", "Nadzór nad realizacją", "Dobór materiałów i mebli"],
    result: "Dom, który nie tylko wygląda, ale przede wszystkim działa. Gotowy na nowy etap życia — bez chaosu, bez kompromisów i bez potrzeby 'poprawek po czasie'.",
    images: [domScenariusz1, domScenariusz2, domScenariusz3, domScenariusz4, domScenariusz5, domScenariusz6, domScenariusz7, domScenariusz8, domScenariusz9, domScenariusz10, domScenariusz11, domScenariusz12],
  },
  "miejsce-znali": {
    title: "Miejsce, które wszyscy znali",
    type: "Lokal gastronomiczny",
    area: "200 m²",
    location: "Krosno",
    pkg: "Kompleks",
    time: "12 tygodni",
    challenge: "Dawny bar — trochę sentymentalny, trochę zapomniany. Każdy go kojarzył, ale jego czas już minął. Wyzwaniem było nie burzyć historii, tylko ją wykorzystać.",
    story: [
      "W Krośnie są takie adresy, które pamięta się latami. Ten był jednym z nich.",
      "Dawny bar — trochę sentymentalny, trochę zapomniany. Każdy go kojarzył, ale jego czas już minął. I wtedy pojawił się ktoś, kto zamiast zaczynać od zera, postanowił dać temu miejscu drugą szansę.",
      "To był najciekawszy moment tego projektu — decyzja, żeby nie burzyć historii, tylko ją wykorzystać.",
      "Stary budynek został. Surowa cegła, konstrukcja, proporcje — wszystko to, co budowało jego charakter. Ale tuż obok pojawiła się zupełnie nowa część. Otwarta, przeszklona, pełna światła. Taka, w której granica między wnętrzem a ogrodem właściwie znika.",
      'I dopiero w tym kontraście zaczyna się prawdziwa "atmosfera".',
      "Drewno spina oba światy. W starej części jest naturalną kontynuacją tego, co było tu wcześniej. W nowej — ociepla nowoczesną, bardziej surową architekturę. Zieleń wchodzi do środka i robi coś, czego nie da się osiągnąć samym materiałem — daje życie.",
      "Układ przestrzeni jest prosty, ale przemyślany. Są miejsca bardziej kameralne i takie, które żyją gwarem. Można tu przyjść na szybki obiad, ale równie dobrze spędzić pół dnia.",
      "I co ważne — to nie jest restauracja „na pokaz". To miejsce zaprojektowane tak, żeby działało w codzienności. Z myślą o rodzinach, o spotkaniach, o dzieciach, które też mają tu swoje miejsce — nie jako dodatek, tylko naturalna część całości.",
      "Największą zmianą w tym projekcie nie jest wnętrze. Tylko to, że ludzie znowu chcą tu przychodzić.",
    ],
    scope: ["Pełny projekt koncepcyjny", "Wizualizacje 3D i 360°", "Dokumentacja techniczna", "Nadzór nad realizacją", "Dobór materiałów i oświetlenia"],
    result: "Miejsce, które nie zaczyna od nowa — tylko od tego, co zawsze miało. Ludzie znowu chcą tu przychodzić.",
    images: [miejsceZnali1, miejsceZnali2, miejsceZnali3, miejsceZnali4, miejsceZnali5],
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
            Wróć do realizacji
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <img src={project.images[0]} alt={`${project.title} – projekt wnętrz ${project.location}`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/35" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-heading text-3xl md:text-5xl text-dark-foreground mb-3">{project.title}</h1>
          <p className="font-body text-sm text-dark-foreground/80 tracking-wide uppercase">
            {project.type} · {project.area} · {project.location}
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <section className="bg-background pt-10 px-6 md:px-12 lg:px-20">
        <div className="max-w-[900px] mx-auto">
          <nav className="flex items-center gap-2 text-xs font-body text-muted-foreground">
            <Link to="/" className="hover:text-accent transition-colors">Strona główna</Link>
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
                  { label: "Metraż", value: project.area },
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
              Napisz do mnie – chętnie porozmawiam o Twoim wnętrzu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/kontakt" className="px-7 py-3 rounded-full bg-accent text-accent-foreground text-sm tracking-[0.05em] font-body hover:bg-accent/90 transition-all duration-300">
                Umów spotkanie
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
