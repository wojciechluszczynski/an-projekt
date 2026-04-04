import FadeIn from "@/components/FadeIn";
import miejsceZnali2 from "@/assets/miejsce-znali-2.png";

const tocEntries = [
  "Czy potrzebujesz projektanta?",
  "5 kroków projektu wnętrza",
  "Styl i budżet",
  "Kolory i materiały",
  "Checklista 27 pytań przed remontem",
  "10 najczęstszych błędów",
  "Realizacja — case study",
  "Jak wybrać projektanta?",
  "Gdzie szukać inspiracji?",
  "Najczęstsze pytania klientów",
  "Jak mogę Ci pomóc?",
  "Następny krok",
];

const EbookToc = () => (
  <section id="toc" className="section-padding bg-secondary scroll-mt-16">
    <div className="max-w-[1000px] mx-auto">
      <FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
          <div>
            <h2 className="font-heading text-2xl md:text-4xl text-foreground mb-10 leading-tight">
              Co znajdziesz<br />w tym przewodniku
            </h2>
            <div className="space-y-0">
              {tocEntries.map((item, i) => (
                <div
                  key={i}
                  className="flex items-baseline gap-4 py-3 border-b border-border/50 last:border-0 group hover:bg-background/50 px-2 -mx-2 rounded transition-colors cursor-default"
                >
                  <span className="font-heading text-accent text-xs w-6 shrink-0 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-body text-sm text-foreground/80 group-hover:text-foreground transition-colors flex-1">
                    {item}
                  </span>
                  <span className="font-body text-[10px] text-muted-foreground/40 group-hover:text-accent transition-colors">
                    →
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <img src={miejsceZnali2} alt="Detal wnętrza" className="w-full rounded-2xl object-cover aspect-[3/4] shadow-lg" />
          </div>
        </div>
      </FadeIn>
    </div>
  </section>
);

export default EbookToc;
