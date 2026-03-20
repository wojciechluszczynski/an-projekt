import { Check } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const packages = [
  {
    name: "Koncepcyjna",
    price: "Wycena indywidualna",
    features: [
      "Układ funkcjonalny wszystkich pomieszczeń",
      "3 wizualizacje kluczowych pomieszczeń",
      "Moodboard stylu i materiałów",
      "Podstawowe rysunki techniczne",
      "2 rundy poprawek",
    ],
    forWho: "Dla właścicieli szukających dobrego startu i jasnego kierunku projektowego",
    highlight: false,
  },
  {
    name: "Komfortowa",
    price: "150 zł/m²",
    features: [
      "Wszystko z pakietu Koncepcyjna",
      "Pełny projekt wnętrza wszystkich pomieszczeń",
      "4 wizualizacje + panorama 3D 360°",
      "Kompletna dokumentacja techniczna",
      "Zestawienie materiałów i mebli",
      "3 rundy poprawek",
    ],
    forWho: "Dla osób chcących gotowy, kompletny projekt do oddania wykonawcy",
    highlight: true,
  },
  {
    name: "Kompleksowa",
    price: "170 zł/m²",
    features: [
      "Wszystko z pakietu Komfortowa",
      "Krótkie wideo wizualne wnętrza",
      "3 spotkania nadzorujące na budowie",
      "Dostępność do konsultacji na czas realizacji",
    ],
    forWho: "Dla inwestorów premium, którym zależy na efekcie końcowym zgodnym z projektem",
    highlight: false,
  },
];

const EbookOffer = () => (
  <section id="offer" className="section-padding scroll-mt-16">
    <div className="max-w-[1000px] mx-auto">
      <FadeIn>
        <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent mb-4 block">11</span>
        <h2 className="font-heading text-2xl md:text-4xl text-foreground mb-10">
          Jak mogę Ci pomóc zaprojektować Twoje wnętrze?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className={`rounded-2xl p-6 md:p-7 flex flex-col transition-all duration-300 hover:shadow-lg ${
                pkg.highlight
                  ? "bg-primary text-primary-foreground ring-2 ring-accent shadow-md scale-[1.02]"
                  : "bg-secondary"
              }`}
            >
              {pkg.highlight && (
                <span className="font-body text-[9px] tracking-[0.15em] uppercase text-accent mb-3 block">
                  Najpopularniejsza
                </span>
              )}
              <div className="flex items-baseline justify-between mb-5">
                <h3 className="font-heading text-lg">{pkg.name}</h3>
                <span className="font-heading text-accent text-base">{pkg.price}</span>
              </div>
              <ul className="space-y-2.5 mb-5 flex-1">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 font-body text-xs">
                    <Check size={12} className="text-accent mt-0.5 shrink-0" />
                    <span className={pkg.highlight ? "text-primary-foreground/70" : "text-foreground/70"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <p className={`font-body text-xs italic ${pkg.highlight ? "text-primary-foreground/50" : "text-muted-foreground"}`}>
                {pkg.forWho}
              </p>
            </div>
          ))}
        </div>

        <p className="font-body text-xs text-muted-foreground text-center">
          Obszar: Podkarpacie (Krosno, Rzeszów, Sanok, Przemyśl) + Małopolska (Nowy Sącz)
        </p>
      </FadeIn>
    </div>
  </section>
);

export default EbookOffer;
