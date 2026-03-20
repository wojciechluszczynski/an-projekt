import { Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import vizBathroomMarble from "@/assets/viz-bathroom-marble.png";

const EbookCta = () => (
  <section id="cta" className="relative min-h-[55vh] overflow-hidden flex items-center justify-center scroll-mt-16">
    <img src={vizBathroomMarble} alt="AN Projekt realizacja" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 via-foreground/60 to-foreground/75" />
    <div className="relative z-10 text-center px-6 max-w-xl py-16">
      <FadeIn>
        <h2 className="font-heading text-3xl md:text-5xl text-white mb-5 leading-tight">
          Gotowa na swoje<br />wymarzone wnętrze?
        </h2>
        <p className="font-body text-sm text-white/60 mb-8 leading-[1.8]">
          Jeśli planujesz remont lub wykończenie mieszkania na Podkarpaciu lub w Małopolsce, napisz do mnie.
          Pierwsza rozmowa jest bezpłatna i bez zobowiązań. Opowiedz mi o swoim projekcie — razem ustalimy, czy i jak mogę Ci pomóc.
        </p>
        <div className="w-16 h-px bg-white/20 mx-auto mb-6" />
        <div className="font-body text-sm text-white/50 space-y-1.5 mb-8">
          <p>anna@anprojekt.com.pl</p>
          <p>Odrzykoń · Podkarpacie</p>
        </div>
        <Link
          to="/kontakt"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-foreground text-sm tracking-[0.05em] font-body hover:bg-white/90 transition-all duration-300 shadow-lg"
        >
          Napisz do mnie <ArrowRight size={14} />
        </Link>
        <p className="font-body text-[10px] text-white/30 mt-10">© 2026 AN Projekt · Anna Nowak</p>
      </FadeIn>
    </div>
  </section>
);

export default EbookCta;
