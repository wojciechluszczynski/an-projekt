import FadeIn from "@/components/FadeIn";
import annaPortrait from "@/assets/anna-nowak-portrait.png";

const EbookIntro = () => (
  <section id="intro" className="section-padding scroll-mt-16">
    <div className="max-w-[1000px] mx-auto">
      <FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-14 items-center">
          <div className="md:col-span-3 order-2 md:order-1">
            <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent mb-4 block">O mnie</span>
            <h2 className="font-heading text-2xl md:text-4xl text-foreground mb-6 leading-tight">
              Cześć, nazywam się Anna.
            </h2>
            <div className="space-y-4 font-body text-sm text-muted-foreground leading-[1.8]">
              <p>
                Projektowanie wnętrz zaczęło się u mnie od budowy własnego domu. Pamiętam tamten czas bardzo dobrze
                — dziesiątki decyzji dziennie, showroomy pełne możliwości, wykonawcy z różnymi radami, i ja pośrodku
                tego wszystkiego próbująca podjąć właściwy wybór. Wtedy po raz pierwszy zobaczyłam, jak wiele rzeczy
                można zrobić źle i jak kosztowne są te błędy, gdy wszystko już jest przykręcone, przyklejone albo pomalowane.
              </p>
              <p>
                To doświadczenie zmieniło moje podejście do projektowania. Nie projektuję wnętrz, które wyglądają
                dobrze na zdjęciach. Projektuję przestrzenie, w których naprawdę dobrze się żyje — funkcjonalne,
                spójne i dopasowane do stylu życia konkretnych ludzi.
              </p>
              <p>
                Od tamtej pory zaprojektowałam kilkadziesiąt wnętrz — mieszkań, domów i apartamentów — głównie
                na Podkarpaciu i w Małopolsce. Pracuję z rodzinami, które remontują swoje pierwsze mieszkanie,
                z parami urządzającymi nowy dom i z inwestorami, którym zależy na wysokiej jakości wykończenia.
              </p>
              <p>
                Każdy projekt zaczynam od rozmowy. Bo żeby zaprojektować dobre wnętrze, muszę najpierw dobrze
                poznać człowieka, który będzie w nim mieszkać.
              </p>
              <p className="text-foreground">
                Ten przewodnik stworzyłam dla Ciebie — jeśli planujesz remont lub wykończenie mieszkania
                i chcesz zrobić to świadomie, bez kosztownych pomyłek i z głową.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-border">
              <p className="font-heading text-lg italic text-foreground">Anna Nowak</p>
              <p className="font-body text-xs text-muted-foreground mt-0.5">AN Projekt · Odrzykoń, Podkarpacie</p>
            </div>
          </div>
          <div className="md:col-span-2 order-1 md:order-2">
            <div className="relative">
              <img src={annaPortrait} alt="Anna Nowak" className="w-full rounded-2xl object-cover object-top aspect-[3/4] shadow-xl" />
              <div className="absolute -bottom-3 -right-3 w-24 h-24 rounded-2xl bg-accent/10 -z-10" />
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  </section>
);

export default EbookIntro;
