import { Check, Lightbulb } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const EbookNeedDesigner = () => (
  <section id="need" className="section-padding scroll-mt-16">
    <div className="max-w-[1000px] mx-auto">
      <FadeIn>
        <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent mb-4 block">01</span>
        <h2 className="font-heading text-2xl md:text-4xl text-foreground mb-6">
          Czy potrzebujesz projektanta wnętrz?
        </h2>
        <p className="font-body text-sm text-muted-foreground mb-4 leading-[1.8]">
          Odpowiedź nie jest zawsze „tak" — ale częściej niż myślisz.
        </p>
        <p className="font-body text-sm text-muted-foreground mb-8 leading-[1.8]">
          Klienci zgłaszają się do mnie najczęściej w trzech konkretnych momentach. Pierwszy: właśnie kupili
          mieszkanie od dewelopera i stoją przed pustymi ścianami, nie wiedząc od czego zacząć. Drugi: planują
          generalny remont starszego mieszkania i boją się popełnić te same błędy co poprzednio. Trzeci: mają
          już w głowie kilkanaście pomysłów z Pinteresta i Instagrama, ale nie potrafią połączyć ich w jedną spójną całość.
        </p>

        <p className="font-body text-sm text-muted-foreground mb-6">Warto rozważyć projektanta gdy:</p>
        <ul className="space-y-3 mb-8">
          {[
            "Kupujesz nowe mieszkanie lub dom z deweloperki",
            "Planujesz generalny remont",
            "Masz trudną przestrzeń — małą, ciemną, nieregularną",
            "Chcesz spójnego efektu bez podejmowania setek decyzji",
            "Zależy Ci na unikaniu błędów zakupowych",
            "Cenisz swój czas i spokój",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 font-body text-sm text-foreground/80">
              <span className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                <Check size={11} className="text-accent" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="bg-accent/8 rounded-2xl p-5 md:p-6 mb-12">
          <div className="flex items-start gap-3">
            <Lightbulb size={16} className="text-accent mt-0.5 shrink-0" />
            <p className="font-body text-sm text-foreground/80 leading-[1.8]">
              Dobry projekt często zwraca się w lepszych decyzjach zakupowych i unikniętych błędach remontowych.
              Klient, który płaci 9 000 zł za projekt mieszkania 75m², zazwyczaj oszczędza więcej na materiałach
              i unikniętych poprawkach. Projektantka zna dostawców, zna ceny i wie, co w połączeniu działa.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-secondary rounded-2xl p-6 md:p-7">
            <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent mb-5 block">
              Ile kosztuje projekt wnętrza?
            </span>
            <div className="space-y-4">
              {[
                { name: "Koncepcyjna", price: "120 zł/m²", desc: "Układ + wizualizacje" },
                { name: "Komfortowa", price: "150 zł/m²", desc: "Pełny + 3D 360°" },
                { name: "Kompleksowa", price: "170 zł/m²", desc: "Projekt + nadzór" },
              ].map((p) => (
                <div key={p.name} className="flex items-center justify-between border-b border-border/50 pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-body text-sm text-foreground font-medium">{p.name}</p>
                    <p className="font-body text-xs text-muted-foreground">{p.desc}</p>
                  </div>
                  <span className="font-heading text-sm text-accent">{p.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-secondary rounded-2xl p-6 md:p-7">
            <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent mb-5 block">
              Przykładowe koszty wykończenia 70m²
            </span>
            <div className="space-y-4">
              {[
                { name: "Standard", range: "105 000 – 175 000 zł" },
                { name: "Premium", range: "175 000 – 280 000 zł" },
                { name: "Luxury", range: "280 000 zł+" },
              ].map((c) => (
                <div key={c.name} className="flex items-center justify-between border-b border-border/50 pb-3 last:border-0 last:pb-0">
                  <span className="font-body text-sm text-foreground font-medium">{c.name}</span>
                  <span className="font-body text-sm text-muted-foreground">{c.range}</span>
                </div>
              ))}
            </div>
            <div className="flex items-start gap-2.5 mt-5 bg-accent/8 rounded-xl p-3.5">
              <Lightbulb size={14} className="text-accent mt-0.5 shrink-0" />
              <p className="font-body text-xs text-foreground/70 leading-relaxed">
                Bufor awaryjny: zawsze minimum 15–20% ponad planowany budżet.
              </p>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  </section>
);

export default EbookNeedDesigner;
