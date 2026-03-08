import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import vizKitchenRattan from "@/assets/viz-kitchen-rattan.png";
import { ArrowRight, Home, Building, Building2, Trees } from "lucide-react";

const packages = [
  {
    icon: Home,
    name: "Konsultacja",
    target: "Dla osób, które chcą omówić pomysł, układ, styl lub konkretny problem we wnętrzu.",
    features: [
      "Spotkanie online lub na miejscu (ok. 60 min)",
      "Analiza przestrzeni i potrzeb",
      "Wstępne rekomendacje stylistyczne i funkcjonalne",
      "Kierunek dalszych działań",
    ],
  },
  {
    icon: Building,
    name: "Opcja Koncepcyjna",
    target: "Dla osób szukających solidnej bazy projektowej. Pomysłu na układ i styl wnętrza.",
    features: [
      "Układ funkcjonalny pomieszczeń",
      "Propozycja stylistyczna i moodboard",
      "Wizualizacje 3D (3 ujęcia)",
      "Podstawowe rysunki techniczne",
    ],
  },
  {
    icon: Building2,
    name: "Opcja Komfortowa",
    target: "Dla osób, które chcą gotowy projekt do przekazania wykonawcy.",
    features: [
      "Pełny projekt koncepcyjny wnętrz",
      "Propozycja materiałów i kolorystyki",
      "4 wizualizacje 3D",
      "Wizualizacja 3D 360°",
      "Dokładna dokumentacja techniczna",
    ],
  },
  {
    icon: Trees,
    name: "Opcja Kompleks",
    target: "Dla osób szukających pełnego wsparcia. Od koncepcji, przez projekt, po nadzór na budowie.",
    features: [
      "Wszystko z Opcji Komfortowej",
      "Krótkie wideo wizualne głównych pomieszczeń",
      "3 spotkania nadzorujące:",
      "— wspólne zakupy materiałów",
      "— spotkanie na budowie z wykonawcą",
      "— kontrola realizacji na budowie",
    ],
  },
];

const timeline = [
  { step: "01", title: "Rozmowa i poznanie potrzeb", desc: "Bezpłatna pierwsza rozmowa. Poznaję Twoje oczekiwania, styl i budżet.", icon: "💬" },
  { step: "02", title: "Wizja lokalna i pomiar", desc: "Odwiedzam Twoją przestrzeń, robię pomiary i notuję szczegóły.", icon: "📏" },
  { step: "03", title: "Układ, kierunek i koncepcja", desc: "Przygotowuję wstępną koncepcję, moodboard i propozycję układu.", icon: "📐" },
  { step: "04", title: "Wizualizacje i korekty", desc: "Tworzę realistyczne wizualizacje 3D. Możesz wnieść poprawki.", icon: "🖥️" },
  { step: "05", title: "Dokumentacja i realizacja", desc: "Przekazuję pełną dokumentację techniczną gotową dla wykonawcy.", icon: "🏠" },
];

const faqs = [
  {
    q: "Ile trwa cały proces?",
    a: "Zależy od zakresu projektu. Prostsza koncepcja (np. jedno pomieszczenie) to ok. 2-3 tygodnie. Pełny projekt z wizualizacjami i dokumentacją techniczną zajmuje zwykle 4-6 tygodni. Opcja Kompleks z nadzorem na budowie to 6-8 tygodni lub dłużej, w zależności od harmonogramu prac remontowych. Na czas realizacji wpływa też szybkość podejmowania decyzji i ewentualne korekty.",
  },
  {
    q: "Czy mogę zamówić tylko konsultację?",
    a: "Oczywiście. Konsultacja to dobry start, jeśli masz konkretne pytanie, chcesz omówić układ pomieszczeń, dobrać materiały lub po prostu porozmawiać o swoim pomyśle na wnętrze. Spotkanie trwa ok. 60 minut i może odbyć się online lub na miejscu. Po konsultacji możesz zdecydować, czy chcesz kontynuować współpracę w szerszym zakresie.",
  },
  {
    q: "Czy dojeżdżasz do Rzeszowa i Nowego Sącza?",
    a: "Tak, działam na terenie Podkarpacia i Małopolski. Wizje lokalne w okolicach Krosna, Rzeszowa i Nowego Sącza są wliczone w cenę projektu. Przy większych odległościach ustalamy to indywidualnie. Wiele elementów projektów, takich jak koncepcja, wizualizacje czy dobór materiałów, mogę realizować również zdalnie.",
  },
  {
    q: "Co jeśli nie wiem, czego potrzebuję?",
    a: "Nie musisz wiedzieć od razu, to zupełnie normalne. Pierwsza rozmowa jest po to, żeby wspólnie ustalić, jaka forma współpracy będzie najlepsza. Opowiesz mi o swoich potrzebach, pokażesz zdjęcia przestrzeni, a ja zaproponuję kierunek i zakres, który będzie miał sens. Wiele osób zaczyna od konsultacji i dopiero potem decyduje się na pełny projekt.",
  },
  {
    q: "Jak wygląda kwestia cen?",
    a: "Wycena zależy od metrażu, liczby pomieszczeń i zakresu prac. Po pierwszej rozmowie i poznaniu Twoich potrzeb przygotuję indywidualną ofertę dopasowaną do projektu. Pierwsza rozmowa jest bezpłatna. Ceny są transparentne i nie ma żadnych ukrytych kosztów.",
  },
];

const Oferta = () => {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <img src={vizKitchenRattan} alt="Projekt wnętrza, oferta AN Projekt" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/35" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-heading text-3xl md:text-5xl text-dark-foreground mb-3">Oferta</h1>
          <p className="font-body text-base text-dark-foreground/80 max-w-lg">
            Wybierz formę współpracy dopasowaną do Twoich potrzeb. Od konsultacji po pełne wsparcie.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="bg-background section-padding">
        <div className="max-w-[1200px] mx-auto">
          <div className="space-y-10">
            {packages.map((pkg, i) => (
              <FadeIn key={pkg.name} delay={i * 100}>
                <div className="bg-secondary p-8 md:p-10 grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-6 md:gap-10 rounded-lg">
                  <div>
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                      <pkg.icon size={22} className="text-accent" />
                    </div>
                    <h2 className="font-heading text-2xl text-foreground mb-3">{pkg.name}</h2>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed">{pkg.target}</p>
                  </div>
                  <div>
                    <ul className="space-y-2 mb-6">
                      {pkg.features.map((f) => (
                        <li key={f} className="text-foreground/80 font-body text-sm flex items-start gap-2">
                          {f.startsWith("—") ? (
                            <span className="ml-4">{f}</span>
                          ) : (
                            <><span className="text-accent mt-0.5 shrink-0">·</span> {f}</>
                          )}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/kontakt"
                      className="inline-flex items-center gap-2 text-sm font-body tracking-[0.05em] uppercase text-foreground border-b border-foreground/30 pb-0.5 hover:border-accent hover:text-accent transition-colors"
                    >
                      Zapytaj o tę opcję <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-secondary section-padding">
        <div className="max-w-[800px] mx-auto">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4 text-center">
              Jak przebiega współpraca
            </h2>
            <p className="text-muted-foreground font-body text-base text-center mb-14 max-w-lg mx-auto">
              Przejrzysty proces, bez niespodzianek. Wiesz, czego się spodziewać na każdym etapie.
            </p>
          </FadeIn>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden md:block" />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <FadeIn key={item.step} delay={i * 80}>
                  <div className="flex gap-6 items-start group">
                    <div className="relative z-10 shrink-0 w-12 h-12 rounded-full bg-background border-2 border-accent/30 flex items-center justify-center text-xl group-hover:border-accent group-hover:scale-110 transition-all duration-300">
                      {item.icon}
                    </div>
                    <div className="pt-1">
                      <p className="font-body text-xs tracking-[0.15em] uppercase text-accent mb-1">Krok {item.step}</p>
                      <h3 className="font-heading text-lg text-foreground mb-1">{item.title}</h3>
                      <p className="text-muted-foreground font-body text-base">{item.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background section-padding">
        <div className="max-w-[700px] mx-auto">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-12 text-center">
              Najczęściej zadawane pytania
            </h2>
          </FadeIn>
          <div className="space-y-8">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="border-b border-border pb-7">
                  <h3 className="font-heading text-lg text-foreground mb-3">{faq.q}</h3>
                  <p className="text-muted-foreground font-body text-base leading-relaxed">{faq.a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary section-padding">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-primary-foreground mb-4">Masz pytania?</h2>
            <p className="text-primary-foreground/70 font-body text-base mb-8">
              Napisz do mnie. Chętnie opowiem o możliwościach współpracy. Pierwsza rozmowa jest bezpłatna.
            </p>
            <Link
              to="/kontakt"
              className="inline-block px-8 py-3.5 rounded-full bg-accent text-accent-foreground text-sm tracking-[0.05em] font-body hover:bg-accent/90 transition-all duration-300"
            >
              Umów konsultację
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
};

export default Oferta;
