import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import heroKitchen from "@/assets/hero-kitchen.png";
import heroBedroom from "@/assets/hero-bedroom.png";
import heroCloset from "@/assets/hero-closet.png";

const projects = [
  {
    title: "Złota Harmonia",
    meta: "Mieszkanie 85m² · Rzeszów",
    image: heroBedroom,
    href: "/zlota-harmonia",
  },
  {
    title: "Czarna Perła",
    meta: "Dom 180m² · Podkarpacie",
    image: heroKitchen,
    href: "/czarna-perla",
  },
  {
    title: "Bambusowa Oaza",
    meta: "Salon 65m² · Małopolska",
    image: heroCloset,
    href: "/bambusowa-oaza",
  },
];

const Realizacje = () => {
  return (
    <main>
      <section className="pt-40 pb-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto text-center">
          <h1 className="font-heading text-4xl md:text-6xl text-foreground mb-4">Moje realizacje</h1>
          <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto">
            Każdy projekt to historia – od pustej przestrzeni do wymarzonego domu.
          </p>
        </div>
      </section>

      <section className="section-padding-sm">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <FadeIn key={p.href} delay={i * 150}>
              <Link to={p.href} className="group block">
                <div className="overflow-hidden mb-6 relative">
                  <img
                    src={p.image}
                    alt={`Wizualizacja ${p.title} AN Projekt`}
                    className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-500" />
                </div>
                <h2 className="font-heading text-2xl text-foreground mb-1">{p.title}</h2>
                <p className="text-muted-foreground font-body text-sm mb-4">{p.meta}</p>
                <span className="text-sm font-body tracking-[0.1em] uppercase text-foreground border-b border-foreground pb-0.5 group-hover:border-accent group-hover:text-accent transition-colors">
                  Poznaj projekt
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Realizacje;
