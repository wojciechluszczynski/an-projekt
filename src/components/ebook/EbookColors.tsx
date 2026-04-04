import { AlertTriangle } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import willaHarmonia3 from "@/assets/willa-harmonia-3.jpeg";

const colorMistakes = [
  {
    title: "Za dużo kontrastów naraz",
    desc: "Wnętrze staje się niespokojne. Kontrasty działają, gdy jest ich mało i są zaplanowane. Jeden mocny akcent kolorystyczny to właśnie 10% z zasady 60-30-10 — nie więcej.",
  },
  {
    title: "Zbyt zimne sztuczne oświetlenie",
    desc: "Nawet najcieplejsza paleta kolorów może wyglądać sterylnie przy zimnym oświetleniu (6000K). Do wnętrz mieszkalnych wybieraj źródła w temperaturze 2700–3000K — ciepłe, miodowe.",
  },
  {
    title: "Brak koloru dominującego",
    desc: "Kiedy żaden kolor nie dominuje, wnętrze nie ma kierunku. Zawsze zacznij od największej powierzchni — ściany i podłogi nadają ton reszcie.",
  },
];

const EbookColors = () => (
  <section id="colors" className="overflow-hidden scroll-mt-16">
    <div className="relative h-56 md:h-72">
      <img src={willaHarmonia3} alt="Realizacja AN Projekt" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20" />
    </div>
    <div className="section-padding">
      <div className="max-w-[1000px] mx-auto">
        <FadeIn>
          <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent mb-4 block">04</span>
          <h2 className="font-heading text-2xl md:text-4xl text-foreground mb-8">Jak dobrać kolory i materiały?</h2>

          <div className="bg-secondary rounded-2xl p-6 md:p-8 mb-8">
            <h3 className="font-heading text-lg text-foreground mb-4">Zasada 60-30-10</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {[
                { pct: "60%", label: "Kolor dominujący", desc: "ściany, podłogi, duże meble", color: "bg-foreground/10" },
                { pct: "30%", label: "Kolor uzupełniający", desc: "sofa, zasłony, zabudowa szafy", color: "bg-accent/15" },
                { pct: "10%", label: "Akcent", desc: "poduszki, rośliny, obrazy, lampy", color: "bg-accent/30" },
              ].map((c) => (
                <div key={c.pct} className={`${c.color} rounded-xl p-4 text-center`}>
                  <span className="font-heading text-2xl text-foreground block mb-1">{c.pct}</span>
                  <p className="font-body text-xs text-foreground font-medium">{c.label}</p>
                  <p className="font-body text-[10px] text-muted-foreground mt-0.5">{c.desc}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2 font-body text-xs text-muted-foreground">
              <p>Przykład klasyczny: biel 60% + ciepła szarość 30% + złoto 10%</p>
              <p>Przykład odważny: głęboki granat 60% + kremowa biel 30% + mosiądz 10%</p>
            </div>
          </div>

          <p className="font-body text-sm text-foreground/80 mb-4">Zasada 3 faktur: max 3 materiały w 1 pomieszczeniu</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
            {[
              { combo: "Drewno orzechowe + len + mosiądz", style: "Modern Classic" },
              { combo: "Trawertyn + biel + rattan", style: "Boho Premium" },
              { combo: "Drewno dębowe jasne + tkanina + czerń", style: "Japandi" },
              { combo: "Beton + skóra + drewno ciemne", style: "Industrial" },
            ].map((c) => (
              <div key={c.style} className="bg-secondary rounded-xl p-4 border border-border/50">
                <p className="font-body text-xs text-muted-foreground mb-1">{c.combo}</p>
                <p className="font-heading text-sm text-accent">{c.style}</p>
              </div>
            ))}
          </div>

          {/* Color mistakes - NEW in V3 */}
          <div className="mb-10">
            <h3 className="font-heading text-lg text-foreground mb-5 flex items-center gap-2">
              <AlertTriangle size={16} className="text-accent" />
              Najczęstsze błędy przy doborze kolorów
            </h3>
            <div className="space-y-4">
              {colorMistakes.map((m) => (
                <div key={m.title} className="bg-secondary rounded-xl p-5 border border-border/50">
                  <h4 className="font-heading text-sm text-foreground mb-2">{m.title}</h4>
                  <p className="font-body text-xs text-muted-foreground leading-[1.8]">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="font-body text-xs text-foreground font-medium mr-1">Trendy kolorystyczne 2026:</span>
            {["Zieleń butelkowa", "Terakota", "Głęboki burgundy", "Ciepły brąz orzechowy", "Ochre", "Kremowy off-white"].map((t) => (
              <span key={t} className="font-body text-[11px] px-3 py-1 rounded-full bg-accent/8 text-accent border border-accent/15">
                {t}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-body text-xs text-foreground font-medium mr-1">Materiały 2026:</span>
            {["Rattan", "Trawertyn", "Mosiądz szczotkowany", "Len surowy", "Jedwab naturalny", "Drewno orzechowe"].map((t) => (
              <span key={t} className="font-body text-[11px] px-3 py-1 rounded-full bg-foreground/5 text-foreground/70 border border-border/50">
                {t}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  </section>
);

export default EbookColors;
