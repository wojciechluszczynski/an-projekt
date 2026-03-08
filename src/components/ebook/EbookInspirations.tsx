import FadeIn from "@/components/FadeIn";

const polishSites = [
  { name: "architecturaldigest.pl", desc: "najlepszy polski magazyn wnętrzarski" },
  { name: "bryla.pl", desc: "realizacje, nagrody, branża" },
  { name: "whitemad.pl", desc: "TOP 20 wnętrz w Polsce co roku" },
  { name: "weranda.pl", desc: "dom, ogród, styl życia" },
  { name: "homebook.pl", desc: "katalog polskich projektantów + realizacje" },
];

const igAccounts = [
  { handle: "@deerdesign.pl", desc: "Warszawa/Kraków, 3500+ projektów" },
  { handle: "@pamastudio_wroclaw", desc: "Wnętrze Roku SAW 2025" },
  { handle: "@all_design_agnieszka_lorenc", desc: "Kraków, Małopolska" },
];

const internationalIg = [
  { handle: "@architectural_digest", desc: "12M+, globalny standard" },
  { handle: "@dezeen", desc: "architektura i design" },
  { handle: "@norm.architects", desc: "duński minimalizm, Japandi" },
  { handle: "@axelvervoordt", desc: "ultra premium, ponadczasowość" },
];

const EbookInspirations = () => (
  <section id="inspirations" className="section-padding scroll-mt-16">
    <div className="max-w-[1000px] mx-auto">
      <FadeIn>
        <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent mb-4 block">09</span>
        <h2 className="font-heading text-2xl md:text-4xl text-foreground mb-10">
          Gdzie szukać inspiracji do projektu wnętrza?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Polish sites */}
          <div>
            <h3 className="font-heading text-sm text-foreground mb-5 flex items-center gap-2">
              Polskie serwisy i konta
            </h3>
            <div className="space-y-3">
              {polishSites.map((s) => (
                <div key={s.name} className="flex items-baseline gap-3 border-b border-border/50 pb-3 last:border-0">
                  <span className="font-body text-sm text-accent font-medium">{s.name}</span>
                  <span className="font-body text-xs text-muted-foreground">{s.desc}</span>
                </div>
              ))}
            </div>

            <h4 className="font-body text-xs text-foreground/70 font-medium mt-6 mb-3">Instagram — polscy projektanci:</h4>
            <div className="space-y-2">
              {igAccounts.map((a) => (
                <div key={a.handle} className="flex items-baseline gap-3">
                  <span className="font-body text-xs text-accent">{a.handle}</span>
                  <span className="font-body text-[11px] text-muted-foreground">{a.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* International */}
          <div>
            <h3 className="font-heading text-sm text-foreground mb-5 flex items-center gap-2">
              Zagraniczne inspiracje
            </h3>
            <div className="space-y-2 mb-6">
              {internationalIg.map((a) => (
                <div key={a.handle} className="flex items-baseline gap-3">
                  <span className="font-body text-xs text-accent">{a.handle}</span>
                  <span className="font-body text-[11px] text-muted-foreground">{a.desc}</span>
                </div>
              ))}
            </div>

            <h4 className="font-body text-xs text-foreground/70 font-medium mb-3">Nagrody — weryfikacja jakości:</h4>
            <div className="space-y-2">
              <p className="font-body text-xs text-muted-foreground">SAW Wnętrze Roku: saw.org.pl</p>
              <p className="font-body text-xs text-muted-foreground">AD100 Polska: architecturaldigest.pl/ad100-2025</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-body text-xs text-foreground/70 font-medium mb-3">Pinterest — gotowe tablice:</h4>
          <div className="flex flex-wrap gap-2">
            {["japandi interior 2026", "modern classic interior", "interior design 2026 trends", "polish interior design"].map((q) => (
              <span key={q} className="font-body text-[11px] px-3 py-1.5 rounded-full bg-accent/8 text-accent border border-accent/15">
                {q}
              </span>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  </section>
);

export default EbookInspirations;
