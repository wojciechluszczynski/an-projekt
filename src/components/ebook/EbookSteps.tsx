import FadeIn from "@/components/FadeIn";

const steps = [
  {
    step: "01",
    title: "Pierwsza rozmowa",
    time: "30–60 min",
    desc: "To moment, w którym poznaję Ciebie i Twoje wnętrze — ale przede wszystkim Twój sposób życia. Pytam między innymi: czy lubisz gotować, jak często przyjmujesz gości, czy pracujesz zdalnie, czy macie dzieci albo zwierzęta, co Cię irytuje w obecnym mieszkaniu. To nie jest rozmowa o stylach ani kolorach — to rozmowa o tym, jak naprawdę chcesz żyć w swojej przestrzeni. Pierwsza rozmowa jest zawsze bezpłatna.",
  },
  {
    step: "02",
    title: "Wizja lokalna i pomiar",
    time: "1–2 godz.",
    desc: "Przyjeżdżam do Ciebie. Mierzę każde pomieszczenie, fotografuję, sprawdzam naturalne oświetlenie w różnych porach dnia i notuję wszystkie elementy, których nie widać na rzucie — gniazdka, grzejniki, kierunek otwierania drzwi, akustykę. To etap, który sprawia, że projekt jest dostosowany do Twojej konkretnej przestrzeni, a nie do wyobrażenia o niej.",
  },
  {
    step: "03",
    title: "Projekt koncepcyjny i moodboard",
    time: "1–2 tyg.",
    desc: "Tworzę układ funkcjonalny każdego pomieszczenia i propozycję kierunku wizualnego — moodboard z kolorami, materiałami, fakturami i nastrojem. Zanim cokolwiek zostanie zamodelowane w 3D, wspólnie sprawdzamy, czy to jest właściwy kierunek. To ważny etap — zmiany w koncepcji są tanie, zmiany na budowie — kosztowne.",
  },
  {
    step: "04",
    title: "Wizualizacje 3D i poprawki",
    time: "2–4 tyg.",
    desc: "Renderuję wnętrze. W zależności od pakietu przygotowuję 3–4 wizualizacje kluczowych pomieszczeń oraz panoramiczny widok 3D 360° — możesz wirtualnie „wejść" do swojego wnętrza i sprawdzić każdy kąt zanim cokolwiek zostanie zbudowane. W cenie pakietu są 2–3 rundy poprawek.",
  },
  {
    step: "05",
    title: "Dokumentacja techniczna i nadzór",
    time: "1–2 tyg.",
    desc: "Przygotowuję pełną dokumentację techniczną dla wykonawców — rysunki z wymiarami, zestawienie materiałów, harmonogram prac. W pakiecie Kompleksowa dodatkowo trzy wizyty na budowie: na początku realizacji, w połowie i przy odbiorze. To sprawia, że efekt końcowy jest naprawdę zgodny z projektem.",
  },
];

const EbookSteps = () => (
  <section id="steps" className="section-padding bg-primary text-primary-foreground scroll-mt-16">
    <div className="max-w-[1000px] mx-auto">
      <FadeIn>
        <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent mb-4 block">02</span>
        <h2 className="font-heading text-2xl md:text-4xl mb-10">5 kroków dobrego projektu wnętrza</h2>
        <div className="space-y-0">
          {steps.map((s, i) => (
            <div key={i} className="flex gap-5 md:gap-8 py-6 border-b border-primary-foreground/8 last:border-0 group">
              <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-accent/30 flex items-center justify-center">
                <span className="font-heading text-accent text-sm md:text-base">{s.step}</span>
              </div>
              <div className="flex-1 pt-1">
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="font-heading text-base md:text-lg group-hover:text-accent transition-colors">{s.title}</h3>
                  <span className="font-body text-[10px] text-primary-foreground/40 tracking-wider">{s.time}</span>
                </div>
                <p className="font-body text-sm text-primary-foreground/50 leading-[1.8]">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  </section>
);

export default EbookSteps;
