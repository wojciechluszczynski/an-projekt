import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import vizBathroomMarble from "@/assets/viz-bathroom-marble.png";
import vizClosetMarble from "@/assets/viz-closet-marble.png";
import vizBedroomDark from "@/assets/viz-bedroom-dark.png";
import vizDetailCeramics from "@/assets/viz-detail-ceramics.png";
import { ArrowRight } from "lucide-react";

const values = [
  { title: "Estetyka z funkcją", desc: "Projektuję tak, żeby było pięknie i praktycznie – w równym stopniu." },
  { title: "Bliskość i komunikacja", desc: "Pracuję bezpośrednio z klientem, bez pośredników. Słucham, pytam, proponuję." },
  { title: "Odpowiedzialność", desc: "Biorę odpowiedzialność za każdy etap – od pomysłu po nadzór na budowie." },
];

const OMnie = () => {
  return (
    <main>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-10 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">O mnie</p>
            <h1 className="font-heading text-3xl md:text-5xl text-foreground max-w-2xl">Cześć, jestem Ania</h1>
          </FadeIn>
        </div>
      </section>

      {/* Story */}
      <section className="bg-background section-padding-sm">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <FadeIn>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-5">Dlaczego projektuję wnętrza</h2>
              <p className="text-muted-foreground font-body text-base leading-relaxed mb-5">
                Od zawsze fascynowało mnie to, jak przestrzeń wpływa na nasze samopoczucie. Jak kolor ściany, układ mebli czy rodzaj światła mogą zmienić codzienność. Projektowanie wnętrz to dla mnie sposób na łączenie estetyki z&nbsp;tym, co&nbsp;naprawdę ważne&nbsp;– wygodą i&nbsp;funkcjonalnością.
              </p>
              <p className="text-muted-foreground font-body text-base leading-relaxed mb-5">
                Mieszkam w Odrzykoniu na Podkarpaciu. Pracuję głównie z klientami indywidualnymi z&nbsp;regionu Krosna, Rzeszowa i&nbsp;Nowego Sącza, choć zdarza się też współpraca zdalna. Lubię pracować blisko&nbsp;– to pozwala lepiej zrozumieć potrzeby i&nbsp;naprawdę dobrze poprowadzić projekt.
              </p>
              <p className="text-muted-foreground font-body text-base leading-relaxed">
                Każdy projekt traktuję indywidualnie. Nie mam jednego stylu, którym podpisuję każde wnętrze. Wolę wsłuchać się w&nbsp;to, czego potrzebuje klient, i&nbsp;zaproponować rozwiązanie, które jest spójne, przemyślane i&nbsp;realne do&nbsp;realizacji.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <img
              src={vizBathroomMarble}
              alt="Wnętrze zaprojektowane przez AN Projekt – projektant wnętrz Krosno"
              className="w-full aspect-[3/4] object-cover"
              loading="lazy"
            />
          </FadeIn>
        </div>
      </section>

      {/* Photo + approach */}
      <section className="bg-secondary section-padding">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <FadeIn>
            <img
              src={vizClosetMarble}
              alt="Anna Nowak przy pracy – projektantka wnętrz Podkarpacie"
              className="w-full aspect-[4/3] object-cover"
              loading="lazy"
            />
          </FadeIn>
          <FadeIn delay={150}>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-5">Jak pracuję</h2>
              <p className="text-muted-foreground font-body text-base leading-relaxed mb-4">
                Zaczynam od rozmowy – chcę wiedzieć, jak żyjesz, co lubisz, co Ci przeszkadza w obecnym wnętrzu. Potem proponuję układ, styl i materiały. Wszystko konsultuję z Tobą krok po kroku.
              </p>
              <p className="text-muted-foreground font-body text-base leading-relaxed">
                Zależy mi na tym, żeby proces był spokojny i zrozumiały. Nie chcę, żebyś czuł/a się przytłoczona liczbą decyzji. Moją rolą jest uprościć ten etap i pomóc Ci podjąć dobre wybory.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Video placeholder */}
      <section className="bg-background section-padding-sm">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <div className="bg-secondary aspect-video flex items-center justify-center mb-6 overflow-hidden">
              <img src={vizBedroomDark} alt="Wizualizacja sypialni AN Projekt" className="w-full h-full object-cover" />
            </div>
            <p className="text-muted-foreground font-body text-sm">Miejsce na krótkie wideo – Ania opowiada o swoim podejściu do projektów</p>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary section-padding">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-12 text-center">Co jest dla mnie ważne</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 100}>
                <div>
                  <h3 className="font-heading text-lg text-foreground mb-3">{v.title}</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background section-padding">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">
              Chcesz porozmawiać o swoim wnętrzu?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/realizacje"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full border border-foreground text-foreground text-sm tracking-[0.05em] font-body hover:bg-foreground hover:text-background transition-all duration-300"
              >
                Zobacz realizacje <ArrowRight size={14} />
              </Link>
              <Link
                to="/kontakt"
                className="px-7 py-3 rounded-full bg-accent text-accent-foreground text-sm tracking-[0.05em] font-body hover:bg-accent/90 transition-all duration-300"
              >
                Umów spotkanie
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
};

export default OMnie;
