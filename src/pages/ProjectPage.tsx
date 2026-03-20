import { useState, useEffect } from &#8221;react&#8221;;
import { Link, useParams } from &#8221;react-router-dom&#8221;;
import FadeIn from &#8221;@/components/FadeIn&#8221;;
import { ArrowRight, ChevronLeft, ChevronRight, X } from &#8221;lucide-react&#8221;;

import willaHarmonia1 from &#8221;@/assets/willa-harmonia-1.jpeg&#8221;;
import willaHarmonia2 from &#8221;@/assets/willa-harmonia-2.jpeg&#8221;;
import willaHarmonia3 from &#8221;@/assets/willa-harmonia-3.jpeg&#8221;;
import willaHarmonia4 from &#8221;@/assets/willa-harmonia-4.jpeg&#8221;;
import willaHarmonia5 from &#8221;@/assets/willa-harmonia-5.jpeg&#8221;;
import willaHarmonia6 from &#8221;@/assets/willa-harmonia-6.jpeg&#8221;;
import willaHarmonia7 from &#8221;@/assets/willa-harmonia-7.jpeg&#8221;;
import willaHarmonia8 from &#8221;@/assets/willa-harmonia-8.jpeg&#8221;;
import willaHarmonia9 from &#8221;@/assets/willa-harmonia-9.jpeg&#8221;;
import domPowrot1 from &#8221;@/assets/dom-powrot-1.jpeg&#8221;;
import domPowrot2 from &#8221;@/assets/dom-powrot-2.jpeg&#8221;;
import domPowrot3 from &#8221;@/assets/dom-powrot-3.jpeg&#8221;;
import domPowrot4 from &#8221;@/assets/dom-powrot-4.jpeg&#8221;;
import domPowrot5 from &#8221;@/assets/dom-powrot-5.jpeg&#8221;;
import domPowrot6 from &#8221;@/assets/dom-powrot-6.jpeg&#8221;;
import vizBathroomMarble from &#8221;@/assets/viz-bathroom-marble.png&#8221;;
import vizClosetMarble from &#8221;@/assets/viz-closet-marble.png&#8221;;
import vizKitchenRattan from &#8221;@/assets/viz-kitchen-rattan.png&#8221;;
import vizBedroomMural from &#8221;@/assets/viz-bedroom-mural.png&#8221;;
import vizDiningFireplace from &#8221;@/assets/viz-dining-fireplace.png&#8221;;
import vizBedroomDark from &#8221;@/assets/viz-bedroom-dark.png&#8221;;
import vizDetailCeramics from &#8221;@/assets/viz-detail-ceramics.png&#8221;;
import vizLivingBeige from &#8221;@/assets/viz-living-beige.png&#8221;;

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
  &#8221;willa-harmonia&#8221;: {
    title: &#8221;Willa Harmonia&#8221;,
    type: &#8221;Dom jednorodzinny&#8221;,
    area: &#8221;160 m²&#8221;,
    location: &#8221;Podkarpacie&#8221;,
    pkg: &#8221;Kompleks&#8221;,
    time: &#8221;10 tygodni&#8221;,
    challenge: &#8221;Intensywne tempo życia inwestorów wymagało stworzenia przestrzeni, która będzie przeciwwagą — nie kolejnym bodźcem, a miejscem wyciszenia.&#8221;,
    story: [
      &#8221;To miał być dom &#8222;na później&#8221;. Na spokojniejsze tempo, na więcej czasu dla siebie. Problem w tym, że życie inwestorów nie zwalniało — intensywna praca, szybkie tempo, ciągłe decyzje. Potrzebowali miejsca, które nie będzie kolejnym bodźcem, tylko przeciwwagą.&#8221;,
      &#8221;Od początku było jasne, że kluczem nie będzie spektakularna forma, tylko spokój. Dlatego zamiast nadmiaru — ograniczenie. Zamiast efektu &#8222;wow&#8221; — konsekwencja.&#8221;,
      &#8221;Parter został zaprojektowany jako jedna płynna przestrzeń, w której funkcje naturalnie się przenikają. Kuchnia, jadalnia i salon nie konkurują ze sobą, tylko tworzą tło dla codziennych rytuałów. Duża wyspa i stół stają się centrum życia — nie tylko do jedzenia, ale też rozmów, pracy i zatrzymania się na chwilę.&#8221;,
      &#8221;Materiały dobrano tak, żeby nie męczyły. Jasne drewno, kamień o delikatnym rysunku, miękkie tkaniny. Wszystko jest spokojne, ale nie chłodne. Minimalizm został tu &#8222;ocieplony&#8221; strukturą i światłem — to ono buduje klimat wnętrza w ciągu dnia i wieczorem przejmuje rolę pierwszego planu.&#8221;,
      &#8221;Duże przeszklenia otwierają dom na ogród, ale nie dominują przestrzeni. Są raczej tłem dla tego, co dzieje się w środku. Wnętrze nie potrzebuje widoku, żeby działać — ale kiedy się pojawia, staje się jego naturalnym przedłużeniem.&#8221;,
      &#8221;Część prywatna została potraktowana jeszcze spokojniej. Sypialnia to wyciszona, niemal hotelowa przestrzeń, w której wszystko sprowadza się do odpoczynku. Mocniejszy akcent pojawia się tylko tam, gdzie ma sens — jak w formie artystycznej ściany, która nadaje charakter, ale nie zaburza równowagi.&#8221;,
      &#8221;Łazienka i garderoba tworzą spójny, uporządkowany układ. Kamień, szkło i światło prowadzą użytkownika intuicyjnie przez przestrzeń. Nie ma tu przypadkowych decyzji — każdy element ma swoje miejsce i funkcję.&#8221;,
    ],
    scope: [&#8221;Pełny projekt koncepcyjny&#8221;, &#8221;Wizualizacje 3D i 360°&#8221;, &#8221;Dokumentacja techniczna&#8221;, &#8221;Nadzór nad realizacją&#8221;, &#8221;Dobór materiałów i mebli&#8221;],
    result: &#8221;Dom, który nie domaga się uwagi. Ale daje dokładnie to, czego jego właściciele najbardziej potrzebowali — spokój.&#8221;,
    images: [willaHarmonia1, willaHarmonia2, willaHarmonia3, willaHarmonia4, willaHarmonia5, willaHarmonia6, willaHarmonia7, willaHarmonia8, willaHarmonia9],
  },
  &#8221;dom-powrot&#8221;: {
    title: &#8221;Dom, do którego się wraca&#8221;,
    type: &#8221;Dom jednorodzinny&#8221;,
    area: &#8221;140 m²&#8221;,
    location: &#8221;Rzeszów&#8221;,
    pkg: &#8221;Kompleks&#8221;,
    time: &#8221;8 tygodni&#8221;,
    challenge: &#8221;Wnętrze, które kiedyś było &#8222;wystarczające&#8221;, z czasem zaczęło przeszkadzać. Za dużo przypadkowych decyzji, za mało spójności.&#8221;,
    story: [
      &#8221;To nie był projekt o zmianie stylu. To była decyzja o zmianie codzienności.&#8221;,
      &#8221;Inwestorzy przyszli z poczuciem zmęczenia własnym domem. Wnętrze, które kiedyś było &#8222;wystarczające&#8221;, z czasem zaczęło przeszkadzać. Za dużo przypadkowych decyzji, za mało spójności. Zamiast odpoczynku — lekki chaos, który trudno było nazwać, ale łatwo odczuć.&#8221;,
      &#8221;Od początku było jasne, że nie chodzi o rewolucję dla samego efektu. Raczej o uporządkowanie tego, co już jest — i nadanie temu nowej jakości.&#8221;,
      &#8221;Strefa dzienna została otwarta i uspokojona wizualnie. Kuchnia przestała być zbiorem funkcji, a zaczęła być naturalnym tłem dla życia. Jasna zabudowa, ciepłe drewno i kamień o subtelnym rysunku tworzą bazę, która nie narzuca się, ale buduje atmosferę. Światło — zarówno dzienne, jak i sztuczne — zostało potraktowane jak materiał.&#8221;,
      &#8221;Salon to kontynuacja tej samej historii. Duża, miękka sofa, niskie stoliki, kominek — wszystko jest tu po to, żeby zwolnić. To przestrzeń, w której nie trzeba nic robić. Wystarczy być.&#8221;,
      &#8221;W części prywatnej postawiliśmy na jeszcze większe wyciszenie. Sypialnia jest prosta, ale nie surowa. Warstwy tkanin, ciepłe drewno i miękkie światło budują poczucie bezpieczeństwa i komfortu.&#8221;,
      &#8221;Łazienka kontynuuje tę samą logikę. Połączenie kamienia i drewna, czytelny układ, brak zbędnych podziałów. Wszystko jest intuicyjne, spokojne, uporządkowane.&#8221;,
    ],
    scope: [&#8221;Pełny projekt koncepcyjny&#8221;, &#8221;Wizualizacje 3D&#8221;, &#8221;Dokumentacja techniczna&#8221;, &#8221;Nadzór nad realizacją&#8221;, &#8221;Dobór materiałów&#8221;],
    result: &#8221;Wnętrze, które nie próbuje imponować na pierwszy rzut oka. Zamiast tego robi coś trudniejszego — sprawia, że chce się w nim zostać.&#8221;,
    images: [domPowrot1, domPowrot2, domPowrot3, domPowrot4, domPowrot5, domPowrot6],
  },
  &#8221;bambusowa-oaza&#8221;: {
    title: &#8221;Bambusowa Oaza&#8221;,
    type: &#8221;Salon z jadalnią&#8221;,
    area: &#8221;65 m²&#8221;,
    location: &#8221;Małopolska&#8221;,
    pkg: &#8221;Koncepcyjna&#8221;,
    time: &#8221;3 tygodnie&#8221;,
    challenge: &#8221;Klienci chcieli wnętrze inspirowane naturą, ale nie wiedzieli, jak to przełożyć na konkretne rozwiązania.&#8221;,
    story: [
      &#8221;Zaproponowałam naturalny rattan, jasne drewno i spokojną paletę beżów i zieleni. Kominek stał się centralnym punktem, a duże okna z widokiem na ogród – integralną częścią projektu.&#8221;,
    ],
    scope: [&#8221;Układ funkcjonalny&#8221;, &#8221;Moodboard i propozycja stylistyczna&#8221;, &#8221;3 wizualizacje 3D&#8221;, &#8221;Podstawowe rysunki techniczne&#8221;],
    result: &#8221;Spójna koncepcja, która dała klientom jasny punkt wyjścia do dalszej realizacji.&#8221;,
    images: [vizDiningFireplace, vizLivingBeige, vizDetailCeramics, vizClosetMarble],
  },
  &#8221;marmurowa-lazienka&#8221;: {
    title: &#8221;Marmurowa Łazienka&#8221;,
    type: &#8221;Łazienka&#8221;,
    area: &#8221;12 m²&#8221;,
    location: &#8221;Krosno&#8221;,
    pkg: &#8221;Komfortowa&#8221;,
    time: &#8221;3 tygodnie&#8221;,
    challenge: &#8221;Niewielka przestrzeń, w której trzeba było pomieścić wannę, prysznic i dużo miejsca do przechowywania.&#8221;,
    story: [
      &#8221;Klientka marzyła o łazience w stylu hotelowym – jasny marmur, złote detale i dużo światła. Zaproponowałam duże płyty imitujące marmur, podświetlane lustro i sprytne schowki za lustrzanymi frontami.&#8221;,
    ],
    scope: [&#8221;Projekt koncepcyjny&#8221;, &#8221;2 wizualizacje 3D&#8221;, &#8221;Dokumentacja techniczna&#8221;, &#8221;Dobór materiałów&#8221;],
    result: &#8221;Elegancka łazienka, która wygląda na znacznie większą niż jest w rzeczywistości.&#8221;,
    images: [vizBathroomMarble, vizDetailCeramics, vizClosetMarble, vizLivingBeige],
  },
  &#8221;ciemna-sypialnia&#8221;: {
    title: &#8221;Ciemna Sypialnia&#8221;,
    type: &#8221;Sypialnia&#8221;,
    area: &#8221;20 m²&#8221;,
    location: &#8221;Rzeszów&#8221;,
    pkg: &#8221;Koncepcyjna&#8221;,
    time: &#8221;2 tygodnie&#8221;,
    challenge: &#8221;Klient chciał ciemną, przytulną sypialnię, ale bez efektu przygnębiającego wnętrza.&#8221;,
    story: [
      &#8221;Postawiłam na głębokie, ciepłe odcienie grafitu i brązu, miękkie tkaniny i punktowe oświetlenie. Drewniane panele za łóżkiem dodały ciepła, a duże okno z lnianą zasłoną zapewnia naturalny dostęp światła w ciągu dnia.&#8221;,
    ],
    scope: [&#8221;Moodboard&#8221;, &#8221;2 wizualizacje 3D&#8221;, &#8221;Propozycja kolorystyczna&#8221;, &#8221;Lista materiałów&#8221;],
    result: &#8221;Klimatyczna sypialnia, w której dobrze się odpoczywa – ciemna, ale ciepła i przytulna.&#8221;,
    images: [vizBedroomDark, vizBedroomMural, vizLivingBeige, vizKitchenRattan],
  },
  &#8221;mural-sypialnia&#8221;: {
    title: &#8221;Mural Sypialnia&#8221;,
    type: &#8221;Sypialnia&#8221;,
    area: &#8221;18 m²&#8221;,
    location: &#8221;Nowy Sącz&#8221;,
    pkg: &#8221;Koncepcyjna&#8221;,
    time: &#8221;2 tygodnie&#8221;,
    challenge: &#8221;Para chciała sypialnię z charakterem – coś więcej niż standardowe, białe ściany.&#8221;,
    story: [
      &#8221;Zaproponowałam delikatny mural z motywem roślinnym na ścianie za łóżkiem. Reszta wnętrza utrzymana w spokojnych beżach i bieli, żeby mural mógł być głównym akcentem. Drewniana podłoga i lniane tkaniny dopełniają całość.&#8221;,
    ],
    scope: [&#8221;Moodboard&#8221;, &#8221;2 wizualizacje 3D&#8221;, &#8221;Propozycja muralu&#8221;, &#8221;Dobór tkanin&#8221;],
    result: &#8221;Sypialnia z duszą – spokojna, ale z wyrazistym elementem, który nadaje charakter.&#8221;,
    images: [vizBedroomMural, vizBedroomDark, vizDiningFireplace, vizDetailCeramics],
  },
  &#8221;marmurowa-garderoba&#8221;: {
    title: &#8221;Marmurowa Garderoba&#8221;,
    type: &#8221;Garderoba&#8221;,
    area: &#8221;8 m²&#8221;,
    location: &#8221;Podkarpacie&#8221;,
    pkg: &#8221;Komfortowa&#8221;,
    time: &#8221;2 tygodnie&#8221;,
    challenge: &#8221;Mała garderoba musiała pomieścić ubrania dwóch osób i wyglądać elegancko.&#8221;,
    story: [
      &#8221;Zaprojektowałam system szaf od podłogi do sufitu z lustrzanymi frontami, które optycznie powiększają przestrzeń. Marmurowa podłoga i złote uchwyty nadają wnętrzu luksusowy charakter.&#8221;,
    ],
    scope: [&#8221;Projekt zabudowy&#8221;, &#8221;2 wizualizacje 3D&#8221;, &#8221;Dokumentacja techniczna&#8221;, &#8221;Dobór materiałów&#8221;],
    result: &#8221;Kompaktowa garderoba, która mieści wszystko i wygląda jak z katalogu.&#8221;,
    images: [vizClosetMarble, vizBathroomMarble, vizDetailCeramics, vizLivingBeige],
  },
  &#8221;detale-ceramiczne&#8221;: {
    title: &#8221;Detale Ceramiczne&#8221;,
    type: &#8221;Kuchnia&#8221;,
    area: &#8221;25 m²&#8221;,
    location: &#8221;Krosno&#8221;,
    pkg: &#8221;Komfortowa&#8221;,
    time: &#8221;4 tygodnie&#8221;,
    challenge: &#8221;Kuchnia otwarta na salon wymagała spójnego połączenia strefy gotowania z wypoczynkową.&#8221;,
    story: [
      &#8221;Ręcznie robiona ceramika na ścianie nad blatem stała się centralnym elementem projektu. Drewniane fronty, kamienny blat i rattanowe dodatki tworzą ciepłą, naturalną atmosferę.&#8221;,
    ],
    scope: [&#8221;Układ funkcjonalny&#8221;, &#8221;3 wizualizacje 3D&#8221;, &#8221;Dokumentacja techniczna&#8221;, &#8221;Nadzór nad wykonaniem płytek&#8221;],
    result: &#8221;Kuchnia, która jest sercem domu – piękna, funkcjonalna i z unikatowym charakterem dzięki ceramice.&#8221;,
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
      if (e.key === &#8221;Escape&#8221;) setLightbox(null);
      if (e.key === &#8221;ArrowRight&#8221;) setLightbox(prev => prev !== null ? (prev + 1) % project.images.length : null);
      if (e.key === &#8221;ArrowLeft&#8221;) setLightbox(prev => prev !== null ? (prev - 1 + project.images.length) % project.images.length : null);
    };
    document.addEventListener(&#8221;keydown&#8221;, handler);
    return () => document.removeEventListener(&#8221;keydown&#8221;, handler);
  }, [lightbox, project]);

  if (!project) {
    return (
      <main className=&#8221;min-h-screen flex items-center justify-center&#8221;>
        <div className=&#8221;text-center&#8221;>
          <h1 className=&#8221;font-heading text-3xl text-foreground mb-4&#8221;>Projekt nie znaleziony</h1>
          <Link to=&#8221;/realizacje&#8221; className=&#8221;text-accent font-body hover:underline&#8221;>
            Wróć do realizacji
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* Hero */}
      <section className=&#8221;relative h-[55vh] min-h-[400px] overflow-hidden&#8221;>
        <img src={project.images[0]} alt={`${project.title} – projekt wnętrz ${project.location}`} className=&#8221;w-full h-full object-cover&#8221; />
        <div className=&#8221;absolute inset-0 bg-foreground/35&#8221; />
        <div className=&#8221;absolute inset-0 flex flex-col items-center justify-center text-center px-6&#8221;>
          <h1 className=&#8221;font-heading text-3xl md:text-5xl text-dark-foreground mb-3&#8221;>{project.title}</h1>
          <p className=&#8221;font-body text-sm text-dark-foreground/80 tracking-wide uppercase&#8221;>
            {project.type} · {project.area} · {project.location}
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <section className=&#8221;bg-background pt-10 px-6 md:px-12 lg:px-20&#8221;>
        <div className=&#8221;max-w-[900px] mx-auto&#8221;>
          <nav className=&#8221;flex items-center gap-2 text-xs font-body text-muted-foreground&#8221;>
            <Link to=&#8221;/&#8221; className=&#8221;hover:text-accent transition-colors&#8221;>Strona główna</Link>
            <span>/</span>
            <Link to=&#8221;/realizacje&#8221; className=&#8221;hover:text-accent transition-colors&#8221;>Realizacje</Link>
            <span>/</span>
            <span className=&#8221;text-foreground&#8221;>{project.title}</span>
          </nav>
        </div>
      </section>

      {/* Story & details */}
      <section className=&#8221;bg-background section-padding&#8221;>
        <div className=&#8221;max-w-[900px] mx-auto&#8221;>
          <FadeIn>
            <div className=&#8221;grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 mb-12&#8221;>
              <div>
                <h2 className=&#8221;font-heading text-2xl text-foreground mb-4&#8221;>O projekcie</h2>
                {project.story.map((paragraph, i) => (
                  <p key={i} className=&#8221;text-muted-foreground font-body text-base leading-relaxed mb-4&#8221;>{paragraph}</p>
                ))}
              </div>
              <div className=&#8221;md:border-l md:border-border md:pl-8 space-y-5 md:min-w-[200px]&#8221;>
                {[
                  { label: &#8221;Lokalizacja&#8221;, value: project.location },
                  { label: &#8221;Metraż&#8221;, value: project.area },
                  { label: &#8221;Opcja&#8221;, value: project.pkg },
                  { label: &#8221;Czas realizacji&#8221;, value: project.time },
                ].map((d) => (
                  <div key={d.label}>
                    <p className=&#8221;text-muted-foreground font-body text-xs tracking-[0.15em] uppercase mb-1&#8221;>{d.label}</p>
                    <p className=&#8221;font-heading text-base text-foreground&#8221;>{d.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Scope */}
          <FadeIn delay={100}>
            <h3 className=&#8221;font-heading text-lg text-foreground mb-3&#8221;>Zakres prac</h3>
            <ul className=&#8221;flex flex-wrap gap-2 mb-12&#8221;>
              {project.scope.map((s) => (
                <li key={s} className=&#8221;font-body text-sm text-muted-foreground bg-secondary px-4 py-1.5 rounded-full&#8221;>{s}</li>
              ))}
            </ul>
          </FadeIn>

          {/* Result quote */}
          <FadeIn delay={150}>
            <blockquote className=&#8221;border-l-2 border-accent pl-5 py-1 mb-12&#8221;>
              <p className=&#8221;font-body text-base text-foreground/70 italic leading-relaxed&#8221;>{project.result}</p>
            </blockquote>
          </FadeIn>
        </div>
      </section>

      {/* Gallery - large single image with thumbnails */}
      <section className=&#8221;bg-background px-6 md:px-12 lg:px-20 pb-20&#8221;>
        <div className=&#8221;max-w-[1200px] mx-auto&#8221;>
          <FadeIn>
            {/* Main large image */}
            <button onClick={() => setLightbox(selectedImg)} className=&#8221;w-full group cursor-pointer mb-4&#8221;>
              <img
                src={project.images[selectedImg]}
                alt={`${project.title} wizualizacja ${selectedImg + 1}`}
                className=&#8221;w-full aspect-[16/9] object-cover rounded-lg transition-transform duration-500 group-hover:scale-[1.01]&#8221;
              />
            </button>
            {/* Thumbnail strip */}
            <div className=&#8221;flex gap-3 overflow-x-auto scrollbar-hide pb-2&#8221;>
              {project.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(i)}
                  className={`flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300 ${i === selectedImg ? &#8221;ring-2 ring-accent opacity-100&#8221; : &#8221;opacity-60 hover:opacity-90&#8221;}`}
                >
                  <img src={img} alt={`Miniatura ${i + 1}`} className=&#8221;h-20 md:h-24 w-32 md:w-40 object-cover&#8221; loading=&#8221;lazy&#8221; />
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className=&#8221;bg-secondary section-padding-sm&#8221;>
        <div className=&#8221;max-w-[700px] mx-auto text-center&#8221;>
          <FadeIn>
            <h2 className=&#8221;font-heading text-2xl md:text-3xl text-foreground mb-4&#8221;>Planujesz podobny projekt?</h2>
            <p className=&#8221;text-muted-foreground font-body text-base mb-8&#8221;>
              Napisz do mnie – chętnie porozmawiam o Twoim wnętrzu.
            </p>
            <div className=&#8221;flex flex-col sm:flex-row gap-4 justify-center&#8221;>
              <Link to=&#8221;/kontakt&#8221; className=&#8221;px-7 py-3 rounded-full bg-accent text-accent-foreground text-sm tracking-[0.05em] font-body hover:bg-accent/90 transition-all duration-300&#8221;>
                Umów spotkanie
              </Link>
              <Link to=&#8221;/realizacje&#8221; className=&#8221;inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full border border-foreground text-foreground text-sm tracking-[0.05em] font-body hover:bg-foreground hover:text-background transition-all duration-300&#8221;>
                Inne realizacje <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className=&#8221;fixed inset-0 z-[100] bg-foreground/95 flex items-center justify-center&#8221; onClick={() => setLightbox(null)}>
          <button className=&#8221;absolute top-6 right-6 text-dark-foreground/80 hover:text-dark-foreground transition-colors z-10&#8221; onClick={() => setLightbox(null)}>
            <X size={32} />
          </button>
          <button
            className=&#8221;absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-dark-foreground/20 backdrop-blur-sm flex items-center justify-center text-dark-foreground hover:bg-dark-foreground/30 transition-colors z-10&#8221;
            onClick={(e) => { e.stopPropagation(); setLightbox(prev => prev !== null ? (prev - 1 + project.images.length) % project.images.length : null); }}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className=&#8221;absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-dark-foreground/20 backdrop-blur-sm flex items-center justify-center text-dark-foreground hover:bg-dark-foreground/30 transition-colors z-10&#8221;
            onClick={(e) => { e.stopPropagation(); setLightbox(prev => prev !== null ? (prev + 1) % project.images.length : null); }}
          >
            <ChevronRight size={24} />
          </button>
          <img
            src={project.images[lightbox]}
            alt={`${project.title} wizualizacja`}
            className=&#8221;max-w-[90vw] max-h-[85vh] object-contain rounded-lg&#8221;
            onClick={(e) => e.stopPropagation()}
          />
          <div className=&#8221;absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2&#8221;>
            {project.images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === lightbox ? &#8221;bg-dark-foreground w-6&#8221; : &#8221;bg-dark-foreground/40&#8221;}`}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default ProjectPage;