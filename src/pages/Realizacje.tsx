import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import vizLivingBeige from "@/assets/viz-living-beige.png";
import vizKitchenRattan from "@/assets/viz-kitchen-rattan.png";
import vizDiningFireplace from "@/assets/viz-dining-fireplace.png";

const projects = [
  {
    title: "Złota Harmonia",
    type: "Mieszkanie",
    area: "85 m²",
    location: "Rzeszów",
    desc: "Ciepłe, przytulne wnętrze z przemyślanym układem i eleganckimi detalami.",
    image: vizLivingBeige,
    href: "/zlota-harmonia",
  },
  {
    title: "Czarna Perła",
    type: "Dom jednorodzinny",
    area: "180 m²",
    location: "Podkarpacie",
    desc: "Nowoczesny dom z odważnymi materiałami i dużą ilością naturalnego światła.",
    image: vizKitchenRattan,
    href: "/czarna-perla",
  },
  {
    title: "Bambusowa Oaza",
    type: "Salon z jadalnią",
    area: "65 m²",
    location: "Małopolska",
    desc: "Przestrzeń inspirowana naturą – rattan, drewno i spokojne kolory.",
    image: vizDiningFireplace,
    href: "/bambusowa-oaza",
  },
];

const Realizacje = () => {
  return (
    <main>
      <section className="pt-32 md:pt-40 pb-10 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">Portfolio</p>
            <h1 className="font-heading text-3xl md:text-5xl text-foreground mb-3 max-w-2xl">Moje realizacje</h1>
            <p className="text-muted-foreground font-body text-base max-w-lg">
              Każdy projekt to inna historia – zobacz, jak wygląda efekt współpracy.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding-sm">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <FadeIn key={p.href} delay={i * 120}>
              <Link to={p.href} className="group block">
                <div className="overflow-hidden mb-5">
                  <img
                    src={p.image}
                    alt={`${p.title} – projekt wnętrz ${p.location}`}
                    className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
                <h2 className="font-heading text-xl text-foreground mb-1">{p.title}</h2>
                <p className="text-muted-foreground font-body text-xs tracking-wide uppercase mb-2">
                  {p.type} · {p.area} · {p.location}
                </p>
                <p className="text-muted-foreground font-body text-sm mb-3">{p.desc}</p>
                <span className="text-sm font-body tracking-[0.05em] uppercase text-foreground border-b border-foreground/30 pb-0.5 group-hover:border-accent group-hover:text-accent transition-colors">
                  Zobacz projekt
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary section-padding">
        <div className="max-w-[700px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4">
              Chcesz zobaczyć, jak mogę pomóc z Twoim wnętrzem?
            </h2>
            <p className="text-muted-foreground font-body text-base mb-8">
              Napisz do mnie – chętnie porozmawiam o Twoim projekcie.
            </p>
            <Link
              to="/kontakt"
              className="px-7 py-3 rounded-full bg-accent text-accent-foreground text-sm tracking-[0.05em] font-body hover:bg-accent/90 transition-all duration-300"
            >
              Umów spotkanie
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
};

export default Realizacje;
