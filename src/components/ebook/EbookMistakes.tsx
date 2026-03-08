import FadeIn from "@/components/FadeIn";

const mistakes = [
  {
    err: "Brak planu funkcjonalnego przed zakupami",
    detail: "Klienci kupują meble lub lampy, które wyglądają pięknie w sklepie — i okazuje się, że nie pasują do układu przestrzeni lub blokują ruch w pokoju.",
    tip: "Najpierw plan na papierze z wymiarami, potem sklep.",
  },
  {
    err: "Złe proporcje mebli do przestrzeni",
    detail: "Za duża sofa w małym salonie, za mały stół w dużej jadalni. Efekt: wnętrze wygląda na niedokończone lub przytłoczone.",
    tip: "Przed zakupem narysuj mebel w skali na rzucie pomieszczenia.",
  },
  {
    err: "Niedoświetlone wnętrze",
    detail: "Jedna lampa sufitowa w centrum salonu to relikt lat 90. Dobre wnętrze ma minimum 3 źródła światła w różnych strefach i wysokościach.",
    tip: "Zaplanuj oświetlenie przed tynkami. Potem jest za późno.",
  },
  {
    err: "Kolorystyczny chaos",
    detail: "Każde pomieszczenie w innym kolorze, wzory walczące ze sobą. Wnętrze nie ma tożsamości — jest ruchliwe i męczące.",
    tip: "Jedna spójna paleta 3 kolorów na całe mieszkanie.",
  },
  {
    err: "Brak miejsca do przechowywania",
    detail: "Piękny salon bez szaf i zabudowy = bałagan w 2 tygodnie. Przechowywanie musi być zaplanowane na etapie projektu.",
    tip: "Zabudowa na wymiar projektowana razem z układem.",
  },
  {
    err: "Ślepe kopiowanie trendów z Instagrama",
    detail: "To co wygląda pięknie na profilu stylizowanym na sesję zdjęciową, niekoniecznie sprawdza się w mieszkaniu z dziećmi i kotem.",
    tip: "Dopasuj styl do swojego życia, nie do cudzej estetyki.",
  },
  {
    err: "Urządzanie pod Instagram zamiast pod życie",
    detail: "Biała sofa z aksamitu, dekoracyjne schody, rośliny wszędzie — ale zero miejsca na buty, a kuchnia za mała na codzienne gotowanie.",
    tip: "Zadaj sobie pytanie: „Czy w tym naprawdę chcę żyć?"",
  },
  {
    err: "Oszczędzanie na podłodze i oświetleniu",
    detail: "Te dwa elementy robią 80% odczucia wnętrza. Na wszystkim innym można szukać oszczędności.",
    tip: "Zainwestuj tu, oszczędzaj na dekoracjach.",
  },
  {
    err: "Za mało gniazdek elektrycznych w złych miejscach",
    detail: "Gniazdo za kanapą, brak gniazdka przy biurku, żadnego USB w sypialni. Trudna i droga do naprawienia po fakcie.",
    tip: "Plan elektryki z projektantką PRZED tynkami.",
  },
  {
    err: "Pośpiech przy wyborze wykonawcy",
    detail: "Najtańszy fachowiec rzadko kiedy okazuje się najtańszy w ostatecznym rozrachunku. Poprawki, opóźnienia, niedokończone prace.",
    tip: "Minimum 3 wyceny, sprawdź opinie, poproś o referencje.",
  },
];

const EbookMistakes = () => (
  <section id="mistakes" className="section-padding scroll-mt-16">
    <div className="max-w-[1000px] mx-auto">
      <FadeIn>
        <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent mb-4 block">06</span>
        <h2 className="font-heading text-2xl md:text-4xl text-foreground mb-10">
          10 błędów przy urządzaniu wnętrza — i jak ich uniknąć
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
          {mistakes.map((item, i) => (
            <div key={i} className="flex gap-4 py-5 border-b border-border/50 last:border-0 group">
              <span className="font-heading text-accent text-xs w-6 shrink-0 pt-0.5 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-body text-sm text-foreground/90 font-medium group-hover:text-foreground transition-colors mb-1.5">
                  {item.err}
                </p>
                <p className="font-body text-xs text-muted-foreground leading-[1.7] mb-1.5">
                  {item.detail}
                </p>
                <p className="font-body text-xs text-accent">→ {item.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  </section>
);

export default EbookMistakes;
