import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import heroKitchen from "@/assets/hero-kitchen.png";
import heroBedroom from "@/assets/hero-bedroom.png";
import heroCloset from "@/assets/hero-closet.png";
import heroBathroom from "@/assets/hero-bathroom.png";

const packages = [
  {
    name: "Koncepcyjna",
    price: "120 zł/m²",
    features: [
      "Układ funkcjonalny pomieszczeń",
      "Wizualizacje – 3 ujęcia",
      "Podstawowe rysunki techniczne",
    ],
    target: "Dla właścicieli mieszkań i domów szukających inspiracji i podstawowego projektu.",
  },
  {
    name: "Komfortowa",
    price: "150 zł/m²",
    features: [
      "Wszystko z pakietu Koncepcyjna",
      "Pełny projekt wnętrz",
      "4 wizualizacje",
      "Wizualizacja 3D 360°",
      "Dokładna dokumentacja techniczna",
    ],
    target: "Dla osób chcących gotowy projekt do realizacji.",
  },
  {
    name: "Kompleksowa",
    price: "170 zł/m²",
    features: [
      "Wszystko z pakietu Komfortowa",
      "Krótkie wideo wizualne głównych pomieszczeń",
      "Wspólne zakupy z projektantką",
      "Spotkanie z wykonawcą na budowie",
      "Kontrola realizacji na budowie",
    ],
    target: "Dla inwestorów premium szukających pełnego wsparcia od A do Z.",
  },
];

const timeline = [
  { step: "01", title: "Pierwsza rozmowa", desc: "Bezpłatna konsultacja – poznajmy się i omówmy Twoje potrzeby." },
  { step: "02", title: "Wizja lokalna + pomiar", desc: "Odwiedzam Twoją przestrzeń i dokonuję szczegółowych pomiarów." },
  { step: "03", title: "Projekt koncepcyjny", desc: "Przygotowuję wstępną koncepcję i moodboard." },
  { step: "04", title: "Wizualizacje i poprawki", desc: "Realistyczne wizualizacje 3D z możliwością naniesienia zmian." },
  { step: "05", title: "Dokumentacja + realizacja", desc: "Pełna dokumentacja techniczna gotowa do przekazania wykonawcy." },
];

const faqs = [
  { q: "Ile kosztuje projekt wnętrz?", a: "Ceny zaczynają się od 120 zł/m². Ostateczna wycena zależy od wybranego pakietu i metrażu." },
  { q: "Jak długo trwa projekt?", a: "Projekt koncepcyjny to ok. 2-3 tygodnie, kompleksowy – 6-8 tygodni. Czas zależy od zakresu i metrażu." },
  { q: "Czy dojeżdżasz do Krakowa / Rzeszowa?", a: "Tak! Działam na terenie Podkarpacia i Małopolski. Wizje lokalne w Rzeszowie i Nowym Sączu wliczone w cenę." },
  { q: "Czy mogę kupić tylko konsultację?", a: "Oczywiście! Oferuję 60-minutowe konsultacje online lub na miejscu. Skontaktuj się, aby umówić termin." },
];

const Oferta = () => {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img src={heroKitchen} alt="Wizualizacja wnętrza AN Projekt oferta" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-heading text-4xl md:text-6xl text-dark-foreground mb-4">Moja oferta</h1>
          <p className="font-body text-lg text-dark-foreground/80">Trzy pakiety – jeden cel: Twoje wymarzone wnętrze.</p>
        </div>
      </section>

      {/* Packages */}
      <section className="bg-background section-padding">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <FadeIn key={pkg.name} delay={i * 150}>
              <div className="bg-secondary p-10 md:p-12 h-full flex flex-col">
                <h2 className="font-heading text-3xl text-foreground mb-2">{pkg.name}</h2>
                <p className="text-accent font-heading text-2xl mb-8">{pkg.price}</p>
                <ul className="flex-1 space-y-3 mb-8">
                  {pkg.features.map((f) => (
                    <li key={f} className="text-muted-foreground font-body text-base flex items-start gap-2">
                      <span className="text-accent mt-1">•</span> {f}
                    </li>
                  ))}
                </ul>
                <p className="text-muted-foreground font-body text-sm italic mb-8">{pkg.target}</p>
                <Link
                  to="/kontakt"
                  className="text-center py-3.5 rounded-full border border-foreground text-foreground text-sm tracking-[0.12em] uppercase font-body hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-300"
                >
                  Napisz do mnie
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-secondary section-padding">
        <div className="max-w-[900px] mx-auto">
          <FadeIn>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-16 text-center">
              Jak przebiega współpraca
            </h2>
          </FadeIn>
          <div className="space-y-12">
            {timeline.map((item, i) => (
              <FadeIn key={item.step} delay={i * 100}>
                <div className="flex gap-8 items-start">
                  <span className="font-heading text-4xl text-accent shrink-0">{item.step}</span>
                  <div>
                    <h3 className="font-heading text-xl text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground font-body text-base">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background section-padding">
        <div className="max-w-[800px] mx-auto">
          <FadeIn>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-12 text-center">
              Najczęściej zadawane pytania
            </h2>
          </FadeIn>
          <div className="space-y-8">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="border-b border-border pb-8">
                  <h3 className="font-heading text-xl text-foreground mb-3">{faq.q}</h3>
                  <p className="text-muted-foreground font-body text-base">{faq.a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary section-padding">
        <div className="max-w-[1400px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-heading text-3xl md:text-4xl text-primary-foreground mb-4">Masz pytania?</h2>
            <p className="text-primary-foreground/60 font-body text-lg mb-10">Napisz do mnie – chętnie pomogę.</p>
            <Link
              to="/kontakt"
              className="inline-block px-10 py-4 rounded-full bg-accent text-accent-foreground text-sm tracking-[0.12em] uppercase font-body hover:bg-accent/90 transition-all duration-300"
            >
              Napisz do mnie
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
};

export default Oferta;
