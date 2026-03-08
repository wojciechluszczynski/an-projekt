import { AlertTriangle } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const styles = [
  {
    name: "Japandi",
    desc: "Połączenie japońskiego minimalizmu z skandynawską funkcjonalnością. Jasne naturalne drewno, surowe tkaniny, dużo powietrza i spokoju.",
    colors: "kremowa biel, piaski, szałwia, ciemne akcenty",
    forWho: "osoby ceniące spokój, porządek i naturalne materiały",
  },
  {
    name: "Modern Classic",
    desc: "Nowoczesne wnętrza z eleganckimi akcentami — marmur, złote detale, sztukateria, symetria. Luksusowy efekt bez ostentacji.",
    colors: "biel, szampan, złoto, głęboka zieleń lub granat",
    forWho: "osoby szukające ponadczasowej elegancji",
  },
  {
    name: "Skandynawski",
    desc: "Jasno, funkcjonalnie, bez zbędnych elementów. Drewno sosny lub dębu, biel, szarość. Ciepłe tekstylia jako równoważnik chłodu.",
    colors: "biel, szarości, drewno, pastele",
    forWho: "rodziny z dziećmi, miłośnicy prostoty i porządku",
  },
  {
    name: "Boho Premium",
    desc: "Rattan, len, rośliny, wiklinowe lampy, wzory etniczne — ale w jakościowym, przemyślanym wydaniu. Ciepło, naturalnie, z charakterem.",
    colors: "beże, terrakota, zieleń, naturalne tkaniny",
    forWho: "osoby z duszą podróżniczą, ceniące unikatowe przedmioty",
  },
  {
    name: "Industrial",
    desc: "Beton, cegła, ciemny metal, surowe drewno. Kontrast chropowatości i miękkości (skóra, aksamit). Loftowy klimat w każdej przestrzeni.",
    colors: "szarości, czerń, ciemne drewno, metal",
    forWho: "osoby lubiące odwagę i wyraźny charakter wnętrza",
  },
];

const EbookStyles = () => (
  <section id="style" className="section-padding bg-secondary scroll-mt-16">
    <div className="max-w-[1000px] mx-auto">
      <FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          <div>
            <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent mb-4 block">03a</span>
            <h2 className="font-heading text-xl md:text-2xl text-foreground mb-6">Jak wybrać styl swojego wnętrza?</h2>
            <p className="font-body text-sm text-muted-foreground mb-5 leading-[1.8]">
              Zanim sięgniesz po Pinterest, odpowiedz sobie na 4 pytania:
            </p>
            <ol className="space-y-3 mb-8 font-body text-sm text-foreground/80">
              {[
                "Ciepłe czy zimne kolory? (beże i brązy vs. szarości i błękity)",
                "Dużo dekoracji czy minimalizm? (przytulny eklektyzm vs. czyste linie)",
                "Drewno i tkaniny czy beton i metal? (naturalne vs. industrialne)",
                "Klasyczna elegancja czy nowoczesna prostota?",
              ].map((q, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-[10px] font-heading text-accent">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{q}</span>
                </li>
              ))}
            </ol>

            <div className="space-y-4">
              {styles.map((s) => (
                <div key={s.name} className="bg-background rounded-xl p-4 border border-border/50">
                  <h4 className="font-heading text-sm text-accent mb-1.5">{s.name}</h4>
                  <p className="font-body text-xs text-foreground/70 leading-relaxed mb-2">{s.desc}</p>
                  <p className="font-body text-[11px] text-muted-foreground">
                    Kolory: {s.colors}
                  </p>
                  <p className="font-body text-[11px] text-muted-foreground">
                    Dla: {s.forWho}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent mb-4 block">03b</span>
            <h2 className="font-heading text-xl md:text-2xl text-foreground mb-6">Budżet — jak zaplanować?</h2>
            <p className="font-body text-sm text-muted-foreground mb-5">Koszt wykończenia (bez mebli):</p>
            <div className="space-y-4 mb-6">
              {[
                { name: "Standard", range: "1 500–2 500 zł/m²" },
                { name: "Premium", range: "2 500–4 000 zł/m²" },
                { name: "Luxury", range: "4 000+ zł/m²" },
              ].map((c) => (
                <div key={c.name} className="flex justify-between border-b border-border/50 pb-3">
                  <span className="font-body text-sm text-foreground font-medium">{c.name}</span>
                  <span className="font-body text-sm text-muted-foreground">{c.range}</span>
                </div>
              ))}
            </div>
            <div className="bg-background rounded-xl p-4 mb-5">
              <p className="font-body text-sm text-foreground/80 mb-1">Przykład: mieszkanie 70m²</p>
              <p className="font-body text-xs text-muted-foreground">Standard: 105–175 tys. zł &nbsp;·&nbsp; Premium: 175–280 tys. zł</p>
            </div>
            <div className="flex items-start gap-2.5 bg-accent/8 rounded-xl p-3.5">
              <AlertTriangle size={14} className="text-accent mt-0.5 shrink-0" />
              <p className="font-body text-xs text-foreground/70 leading-relaxed">
                Bufor awaryjny: minimum 15–20% ponad budżet główny
              </p>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  </section>
);

export default EbookStyles;
