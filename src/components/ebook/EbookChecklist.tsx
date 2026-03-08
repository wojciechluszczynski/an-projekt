import { useState } from "react";
import { Check, Lightbulb } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const checklistData = [
  {
    title: "Planowanie",
    items: [
      "Czy mam określony zakres prac?",
      "Czy mam projekt wnętrza lub rzut z wymiarami?",
      "Czy wiem, które ściany są nośne?",
      "Czy znam stan instalacji elektrycznej i hydraulicznej?",
      "Czy ustaliłem priorytety: muszę / chcę / byłoby fajne?",
    ],
  },
  {
    title: "Budżet",
    items: [
      "Czy mam określony całkowity budżet na remont?",
      "Czy mam bufor awaryjny minimum 15–20%?",
      "Czy porównałem minimum 3 wyceny wykonawców?",
      "Czy mam podpisaną umowę z harmonogramem płatności?",
      "Czy wiem, co jest w cenie wykonawcy, a co kupuję sam?",
    ],
  },
  {
    title: "Materiały",
    items: [
      "Czy mam wybrany styl i kolorystykę całego wnętrza?",
      "Czy mam moodboard (podłoga + ściany + meble + oświetlenie)?",
      "Czy zamówiłem próbniki kolorów i materiałów?",
      "Czy sprawdziłem czasy dostaw dla płytek, okien, drzwi?",
      "Czy kupiłem materiały z nadmiarem (+10% podłogi, +15% płytki)?",
    ],
  },
  {
    title: "Wykonawcy",
    items: [
      "Czy mam harmonogram z datami dla każdej ekipy?",
      "Czy znam kolejność prac (hydraulika → elektryka → tynki → podłogi)?",
      "Czy wiem, gdzie mieszkam w trakcie remontu?",
      "Czy mam plan na przechowanie mebli i rzeczy?",
      "Czy mam numer kontaktowy do każdego fachowca?",
    ],
  },
  {
    title: "Przed startem",
    items: [
      "Czy wszystkie decyzje projektowe są podjęte zanim ruszą ekipy?",
      "Czy mam kontakt do projektantki na czas realizacji?",
      "Czy zrobiłem zdjęcia dokumentacyjne przed startem?",
      "Czy sprawdziłem opinie o wykonawcy (Google, Facebook)?",
      "Czy mam jasność co do gwarancji na wykonane prace?",
      "Czy ochroniłem podłogi i elementy, których nie remontuję?",
      "Czy poinformowałem sąsiadów o planowanych pracach?",
    ],
  },
];

const tips = [
  "Nigdy nie zamawiaj wszystkich materiałów w ostatniej chwili. Czas dostawy płytek lub mebli na wymiar potrafi wynosić 4–8 tygodni.",
  "Zaplanuj elektrykę i hydraulikę PRZED tynkami. To jedyny moment, żeby zrobić to dobrze bez skuwania ścian.",
  "Próbnik koloru na ścianie — minimum 2 dni. Obserwuj go rano, w południe i wieczorem przy sztucznym świetle.",
];

const EbookChecklist = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const totalItems = checklistData.reduce((sum, b) => sum + b.items.length, 0);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  const toggleCheck = (item: string) => {
    setCheckedItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  return (
    <section id="checklist" className="section-padding bg-secondary scroll-mt-16">
      <div className="max-w-[1000px] mx-auto">
        <FadeIn>
          <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent mb-4 block">05</span>
          <h2 className="font-heading text-2xl md:text-4xl text-foreground mb-3">
            Checklista 27 pytań przed remontem
          </h2>
          <p className="font-body text-sm text-muted-foreground mb-8">
            Kliknij, aby odhaczać kolejne punkty. Twój postęp: {checkedCount}/{totalItems}
          </p>

          <div className="w-full h-2 bg-border/30 rounded-full mb-10 overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(checkedCount / totalItems) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {checklistData.map((block) => (
              <div key={block.title} className="bg-background rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-heading text-sm text-accent mb-4">{block.title}</h3>
                <ul className="space-y-2.5">
                  {block.items.map((item) => (
                    <li key={item}>
                      <button
                        onClick={() => toggleCheck(item)}
                        className="flex items-start gap-2.5 w-full text-left group"
                      >
                        <span
                          className={`w-4 h-4 rounded border shrink-0 mt-0.5 flex items-center justify-center transition-all duration-200 ${
                            checkedItems[item]
                              ? "bg-accent border-accent"
                              : "border-border group-hover:border-accent/50"
                          }`}
                        >
                          {checkedItems[item] && <Check size={10} className="text-accent-foreground" />}
                        </span>
                        <span
                          className={`font-body text-xs transition-all duration-200 ${
                            checkedItems[item]
                              ? "text-muted-foreground line-through"
                              : "text-foreground/70 group-hover:text-foreground"
                          }`}
                        >
                          {item}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {tips.map((tip, i) => (
              <div key={i} className="bg-background rounded-xl p-4 border border-accent/10">
                <div className="flex items-start gap-2.5">
                  <Lightbulb size={14} className="text-accent mt-0.5 shrink-0" />
                  <p className="font-body text-xs text-foreground/70 leading-[1.7]">{tip}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Score card */}
          <div className="bg-background rounded-2xl p-6 shadow-sm border border-accent/10">
            <p className="font-heading text-base text-foreground mb-3">Twój wynik</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { range: "25–27", label: "Jesteś gotowy. Ruszaj spokojnie.", active: checkedCount >= 25 },
                { range: "18–24", label: "Kilka luk — uzupełnij zanim zaczniesz.", active: checkedCount >= 18 && checkedCount < 25 },
                { range: "< 18", label: "Warto zatrzymać się i zaplanować z projektantką.", active: checkedCount < 18 },
              ].map((r) => (
                <div
                  key={r.range}
                  className={`rounded-xl p-4 border transition-all duration-300 ${
                    r.active ? "border-accent bg-accent/8" : "border-border/50 bg-secondary"
                  }`}
                >
                  <span className={`font-heading text-lg ${r.active ? "text-accent" : "text-muted-foreground"}`}>
                    {r.range}
                  </span>
                  <p className="font-body text-xs text-muted-foreground mt-1">{r.label}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default EbookChecklist;
