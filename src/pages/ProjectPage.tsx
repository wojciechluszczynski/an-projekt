import { Link, useParams } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import heroKitchen from "@/assets/hero-kitchen.png";
import heroBedroom from "@/assets/hero-bedroom.png";
import heroCloset from "@/assets/hero-closet.png";
import heroBathroom from "@/assets/hero-bathroom.png";
import heroKitchenAlt from "@/assets/hero-kitchen-alt.png";

const projectsData: Record<string, {
  title: string;
  num: string;
  type: string;
  area: string;
  location: string;
  pkg: string;
  time: string;
  story: string;
  images: string[];
}> = {
  "zlota-harmonia": {
    title: "Złota Harmonia",
    num: "01",
    type: "Mieszkanie",
    area: "85m²",
    location: "Rzeszów",
    pkg: "Komfortowa",
    time: "6 tygodni",
    story: "Od pustej przestrzeni po ciepłe wnętrze z nutą luksusu. Złote akcenty, miękkie sofy i szlachetny marmur tworzą harmonijną całość, w której każdy detal ma znaczenie. Projekt łączy elegancję z codziennym komfortem – to dom, w którym chce się żyć.",
    images: [heroBedroom, heroBathroom, heroCloset],
  },
  "czarna-perla": {
    title: "Czarna Perła",
    num: "02",
    type: "Dom jednorodzinny",
    area: "180m²",
    location: "Podkarpacie",
    pkg: "Kompleksowa",
    time: "8 tygodni",
    story: "Nowoczesna kuchnia z czarnym marmurem ze złotymi żyłkami stała się sercem tego domu. Ciemne materiały kontrastują z ciepłem drewna i naturalnym światłem wpadającym przez panoramiczne okna. Projekt od A do Z – od koncepcji po nadzór na budowie.",
    images: [heroKitchen, heroKitchenAlt, heroBathroom],
  },
  "bambusowa-oaza": {
    title: "Bambusowa Oaza",
    num: "03",
    type: "Salon z jadalnią",
    area: "65m²",
    location: "Małopolska",
    pkg: "Koncepcyjna",
    time: "3 tygodnie",
    story: "Naturalny rattan, biały marmur i ciepło kominka tworzą przestrzeń inspirowaną naturą. Projekt koncepcyjny, który dał właścicielom jasną wizję i punkt wyjścia do realizacji wymarzonego salonu z widokiem na zieleń.",
    images: [heroCloset, heroBedroom, heroKitchenAlt],
  },
};

const ProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? projectsData[slug] : null;

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl text-foreground mb-4">Projekt nie znaleziony</h1>
          <Link to="/realizacje" className="text-accent font-body hover:underline">
            Wróć do realizacji
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img src={project.images[0]} alt={`${project.title} AN Projekt`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-heading text-4xl md:text-6xl text-dark-foreground mb-4">{project.title}</h1>
          <p className="font-body text-lg text-dark-foreground/80">
            {project.type} | {project.area} | {project.location}
          </p>
        </div>
      </section>

      {/* Breadcrumbs + Story */}
      <section className="bg-background section-padding">
        <div className="max-w-[900px] mx-auto">
          <FadeIn>
            <nav className="flex items-center gap-2 text-sm font-body text-muted-foreground mb-12">
              <Link to="/" className="hover:text-accent transition-colors">Home</Link>
              <span>/</span>
              <Link to="/realizacje" className="hover:text-accent transition-colors">Realizacje</Link>
              <span>/</span>
              <span className="text-foreground">{project.title}</span>
            </nav>
            <p className="text-muted-foreground font-body text-xs tracking-[0.15em] uppercase mb-4">
              Projekt {project.num}/03
            </p>
            <p className="text-foreground font-body text-lg md:text-xl leading-relaxed">{project.story}</p>
          </FadeIn>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-background px-6 md:px-12 lg:px-20 pb-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.images.map((img, i) => (
            <FadeIn key={i} delay={i * 100} className={i === 0 ? "md:col-span-2" : ""}>
              <img
                src={img}
                alt={`${project.title} wizualizacja ${i + 1}`}
                className="w-full aspect-video object-cover"
                loading="lazy"
              />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Details */}
      <section className="bg-secondary section-padding-sm">
        <div className="max-w-[900px] mx-auto">
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "Lokalizacja", value: project.location },
                { label: "Metraż", value: project.area },
                { label: "Pakiet", value: project.pkg },
                { label: "Czas realizacji", value: project.time },
              ].map((d) => (
                <div key={d.label}>
                  <p className="text-muted-foreground font-body text-xs tracking-[0.15em] uppercase mb-2">{d.label}</p>
                  <p className="font-heading text-xl text-foreground">{d.value}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary section-padding">
        <div className="max-w-[1400px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-heading text-3xl md:text-4xl text-primary-foreground mb-10">Rozpocznij swój projekt</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/kontakt"
                className="px-10 py-4 rounded-full bg-accent text-accent-foreground text-sm tracking-[0.12em] uppercase font-body hover:bg-accent/90 transition-all duration-300"
              >
                Napisz do mnie
              </Link>
              <Link
                to="/realizacje"
                className="px-10 py-4 rounded-full border border-primary-foreground/30 text-primary-foreground text-sm tracking-[0.12em] uppercase font-body hover:border-accent hover:text-accent transition-all duration-300"
              >
                Wróć do realizacji
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
};

export default ProjectPage;
