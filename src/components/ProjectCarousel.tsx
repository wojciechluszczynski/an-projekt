import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";

import vizLivingBeige from "@/assets/viz-living-beige.png";
import vizKitchenRattan from "@/assets/viz-kitchen-rattan.png";
import vizDiningFireplace from "@/assets/viz-dining-fireplace.png";

const projects = [
  {
    title: "Złota Harmonia",
    desc: "Ciepłe, przytulne mieszkanie z przemyślanym układem i eleganckimi detalami.",
    image: vizLivingBeige,
    href: "/zlota-harmonia",
    meta: "Mieszkanie 85 m² · Rzeszów",
  },
  {
    title: "Czarna Perła",
    desc: "Nowoczesny dom z odważnymi materiałami i dużą ilością naturalnego światła.",
    image: vizKitchenRattan,
    href: "/czarna-perla",
    meta: "Dom 180 m² · Podkarpacie",
  },
  {
    title: "Bambusowa Oaza",
    desc: "Przestrzeń inspirowana naturą, rattan, drewno i spokojne kolory.",
    image: vizDiningFireplace,
    href: "/bambusowa-oaza",
    meta: "Salon 65 m² · Małopolska",
  },
];

const ProjectCarousel = () => {
  const [active, setActive] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoRef = useRef<ReturnType<typeof setInterval>>();

  const navigate = (dir: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActive((a) => (a + dir + projects.length) % projects.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  useEffect(() => {
    autoRef.current = setInterval(() => navigate(1), 5000);
    return () => clearInterval(autoRef.current);
  }, []);

  const getIndex = (offset: number) => (active + offset + projects.length) % projects.length;

  return (
    <FadeIn>
      <div className="relative flex items-center">
        {/* Left arrow */}
        <button
          onClick={() => navigate(-1)}
          className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 mr-3 md:mr-6"
          aria-label="Poprzedni projekt"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Carousel track */}
        <div className="flex-1 flex items-center justify-center gap-4 md:gap-6 overflow-hidden">
          {/* Prev item (blurred) */}
          <div className="hidden md:block w-1/4 shrink-0 opacity-30 blur-[3px] transition-all duration-500 ease-in-out">
            <img
              src={projects[getIndex(-1)].image}
              alt={projects[getIndex(-1)].title}
              className="w-full aspect-[4/5] object-cover rounded-lg"
            />
          </div>

          {/* Active item */}
          <div className="w-full md:w-1/2 shrink-0 transition-all duration-500 ease-in-out">
            <Link to={projects[active].href} className="group block">
              <div className="overflow-hidden rounded-lg mb-5">
                <img
                  src={projects[active].image}
                  alt={`${projects[active].title} projekt wnętrz AN Projekt`}
                  className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="text-center">
                <h3 className="font-heading text-2xl text-foreground mb-1">{projects[active].title}</h3>
                <p className="text-muted-foreground font-body text-sm mb-2">{projects[active].meta}</p>
                <p className="text-muted-foreground font-body text-sm mb-3 max-w-md mx-auto">{projects[active].desc}</p>
                <span className="text-sm font-body tracking-[0.05em] uppercase text-foreground border-b border-foreground/30 pb-0.5 group-hover:border-accent group-hover:text-accent transition-colors">
                  Zobacz projekt
                </span>
              </div>
            </Link>
          </div>

          {/* Next item (blurred) */}
          <div className="hidden md:block w-1/4 shrink-0 opacity-30 blur-[3px] transition-all duration-500 ease-in-out">
            <img
              src={projects[getIndex(1)].image}
              alt={projects[getIndex(1)].title}
              className="w-full aspect-[4/5] object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Right arrow */}
        <button
          onClick={() => navigate(1)}
          className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 ml-3 md:ml-6"
          aria-label="Następny projekt"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === active ? "bg-accent w-6" : "bg-foreground/20"
            }`}
            aria-label={`Projekt ${i + 1}`}
          />
        ))}
      </div>
    </FadeIn>
  );
};

export default ProjectCarousel;
