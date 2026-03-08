import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import heroBathroom from "@/assets/hero-bathroom.png";
import heroCloset from "@/assets/hero-closet.png";

const OMnie = () => {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img src={heroCloset} alt="Anna Nowak projektantka wnętrz" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-heading text-4xl md:text-6xl text-dark-foreground">Cześć, jestem Anna</h1>
        </div>
      </section>

      {/* Story */}
      <section className="bg-background section-padding">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">Moja historia</h2>
              <p className="text-muted-foreground font-body text-base leading-relaxed mb-6">
                Od zawsze fascynowały mnie przestrzenie – to, jak wpływają na nasze samopoczucie, 
                jak organizują codzienność i&nbsp;jak mogą stać się odbiciem naszej osobowości. 
                Projektowanie wnętrz to dla mnie nie tylko zawód, to sposób myślenia o&nbsp;życiu.
              </p>
              <p className="text-muted-foreground font-body text-base leading-relaxed">
                Mieszkam na Podkarpaciu, w&nbsp;Odrzykoniu, i&nbsp;działam głównie w&nbsp;regionie Rzeszowa 
                oraz Nowego Sącza. Każdy projekt traktuję indywidualnie – wsłuchuję się w&nbsp;potrzeby, 
                szukam rozwiązań i&nbsp;tworzę wnętrza, w&nbsp;których chce się żyć.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <img
              src={heroBathroom}
              alt="Wnętrze zaprojektowane przez AN Projekt"
              className="w-full aspect-[3/4] object-cover"
              loading="lazy"
            />
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary section-padding">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-16 text-center">Moje wartości</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Jakość", desc: "Nie idę na kompromisy. Każdy detal ma znaczenie." },
              { title: "Funkcjonalność", desc: "Każdy centymetr ma znaczenie – projektuję z myślą o codziennym życiu." },
              { title: "Zaufanie", desc: "Przejmuję odpowiedzialność od A do Z – możesz na mnie polegać." },
            ].map((v, i) => (
              <FadeIn key={v.title} delay={i * 150}>
                <div className="text-center">
                  <h3 className="font-heading text-2xl text-foreground mb-4">{v.title}</h3>
                  <p className="text-muted-foreground font-body text-base">{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background section-padding">
        <div className="max-w-[1400px] mx-auto text-center">
          <FadeIn>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/realizacje"
                className="px-8 py-3.5 rounded-full border border-foreground text-foreground text-sm tracking-[0.12em] uppercase font-body hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-300"
              >
                Poznaj moje realizacje
              </Link>
              <Link
                to="/kontakt"
                className="px-8 py-3.5 rounded-full bg-primary text-primary-foreground text-sm tracking-[0.12em] uppercase font-body hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                Napisz do mnie
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
};

export default OMnie;
