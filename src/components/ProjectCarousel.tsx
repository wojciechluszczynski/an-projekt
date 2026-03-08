import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import { ArrowRight } from "lucide-react";

import vizLivingBeige from "@/assets/viz-living-beige.png";
import vizKitchenRattan from "@/assets/viz-kitchen-rattan.png";
import vizDiningFireplace from "@/assets/viz-dining-fireplace.png";

const projects = [
  {
    title: "Złota Harmonia",
    desc: "Ciepłe, przytulne mieszkanie z przemyślanym układem i eleganckimi detalami.",
    image: vizLivingBeige,
    href: "/realizacje",
    meta: "Mieszkanie 85 m² · Rzeszów",
  },
  {
    title: "Czarna Perła",
    desc: "Nowoczesny dom z odważnymi materiałami i dużą ilością naturalnego światła.",
    image: vizKitchenRattan,
    href: "/realizacje",
    meta: "Dom 180 m² · Podkarpacie",
  },
  {
    title: "Bambusowa Oaza",
    desc: "Przestrzeń inspirowana naturą, rattan, drewno i spokojne kolory.",
    image: vizDiningFireplace,
    href: "/realizacje",
    meta: "Salon 65 m² · Małopolska",
  },
];

const ProjectCarousel = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {projects.map((project, i) => (
        <FadeIn key={project.title} delay={i * 100}>
          <Link to={project.href} className="group block">
            <div className="overflow-hidden rounded-lg mb-4">
              <img
                src={project.image}
                alt={`${project.title} projekt wnętrz AN Projekt`}
                className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            <h3 className="font-heading text-lg text-foreground mb-1">{project.title}</h3>
            <p className="text-muted-foreground font-body text-xs mb-1.5">{project.meta}</p>
            <p className="text-muted-foreground font-body text-sm mb-3 leading-relaxed">{project.desc}</p>
            <span className="inline-flex items-center gap-1.5 text-sm font-body tracking-[0.05em] uppercase text-foreground border-b border-foreground/30 pb-0.5 group-hover:border-accent group-hover:text-accent transition-colors">
              Zobacz projekt <ArrowRight size={13} />
            </span>
          </Link>
        </FadeIn>
      ))}
    </div>
  );
};

export default ProjectCarousel;
