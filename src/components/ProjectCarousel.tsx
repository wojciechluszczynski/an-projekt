import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import { ArrowRight } from "lucide-react";

import willaHarmonia1 from "@/assets/willa-harmonia-1.jpeg";
import domPowrot1 from "@/assets/dom-powrot-1.jpeg";
import apartamentKlasa1 from "@/assets/apartament-klasa-1.jpeg";

const projects = [
  {
    title: "Willa Harmonia",
    desc: "Dom, który nie domaga się uwagi. Ale daje dokładnie to, czego jego właściciele potrzebowali — spokój.",
    image: willaHarmonia1,
    href: "/willa-harmonia",
    meta: "Dom 160 m² · Podkarpacie",
  },
  {
    title: "Dom, do którego się wraca",
    desc: "Wnętrze, które nie próbuje imponować. Zamiast tego sprawia, że chce się w nim zostać.",
    image: domPowrot1,
    href: "/dom-powrot",
    meta: "Dom 140 m² · Rzeszów",
  },
  {
    title: "Apartament z klasą",
    desc: "Przestrzeń, która nie tylko dobrze wygląda, ale też wspiera styl życia właścicielki.",
    image: apartamentKlasa1,
    href: "/apartament-klasa",
    meta: "Apartament 95 m² · Rzeszów",
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
