import vizLivingBeige from "@/assets/viz-living-beige.png";

const EbookCover = () => (
  <section className="relative min-h-[85vh] md:min-h-screen overflow-hidden flex items-center justify-center">
    <img src={vizLivingBeige} alt="AN Projekt wnętrze" className="absolute inset-0 w-full h-full object-cover scale-105" />
    <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/55 to-foreground/70" />
    <div className="relative z-10 text-center px-6 max-w-2xl">
      <span className="inline-block font-body text-[10px] md:text-xs tracking-[0.25em] uppercase text-white/60 mb-6 animate-fade-in-up">
        Przewodnik 2026
      </span>
      <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-white mb-5 leading-[1.1] animate-fade-in-up-delay">
        Projekt wnętrza<br />od&nbsp;A&nbsp;do&nbsp;Z
      </h1>
      <p className="font-body text-sm md:text-base text-white/60 mb-10 animate-fade-in-up-delay-2">
        Przewodnik dla właścicieli mieszkań i domów
      </p>
      <div className="w-20 h-px bg-white/20 mx-auto mb-5 animate-fade-in-up-delay-2" />
      <p className="font-body text-[10px] md:text-xs text-white/40 tracking-wider animate-fade-in-up-delay-2">
        AN Projekt &nbsp;·&nbsp; Anna Nowak &nbsp;·&nbsp; anprojekt.com.pl
      </p>
    </div>
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in-up-delay-2">
      <span className="font-body text-[9px] text-white/30 tracking-widest uppercase">Czytaj</span>
      <div className="w-px h-8 bg-white/20" />
    </div>
  </section>
);

export default EbookCover;
