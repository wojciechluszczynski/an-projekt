import { Link, useParams } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import { ArrowRight } from "lucide-react";

import vizLivingBeige from "@/assets/viz-living-beige.png";
import vizBathroomMarble from "@/assets/viz-bathroom-marble.png";
import vizClosetMarble from "@/assets/viz-closet-marble.png";
import vizKitchenRattan from "@/assets/viz-kitchen-rattan.png";
import vizBedroomMural from "@/assets/viz-bedroom-mural.png";
import vizDiningFireplace from "@/assets/viz-dining-fireplace.png";
import vizBedroomDark from "@/assets/viz-bedroom-dark.png";
import vizDetailCeramics from "@/assets/viz-detail-ceramics.png";

const projectsData: Record<string, {
  title: string;
  type: string;
  area: string;
  location: string;
  pkg: string;
  time: string;
  challenge: string;
  story: string;
  scope: string[];
  result: string;
  images: string[];
}> = {
  "zlota-harmonia": {
    title: "Złota Harmonia",
    type: "Mieszkanie",
    area: "85 m²",
    location: "Rzeszów",
    pkg: "Komfortowa",
    time: "6 tygodni",
    challenge: "Małe pomieszczenia wymagały sprytnych rozwiązań, żeby zmieścić wszystko, czego potrzebuje czteroosobowa rodzina.",
    story: "Klientom zależało na wnętrzu, które będzie ciepłe i przytulne, ale jednocześnie uporządkowane i łatwe do utrzymania. Zaproponowałam spokojną paletę barw, miękkie tkaniny i przemyślany układ, który daje dużo miejsca do przechowywania.",
    scope: ["Układ funkcjonalny", "Projekt koncepcyjny", "4 wizualizacje 3D", "Wizualizacja 360°", "Dokumentacja techniczna"],
    result: "Funkcjonalne, ciepłe wnętrze, w którym każdy ma swoją przestrzeń – a jednocześnie wspólna strefa dzienna zachęca do wspólnego spędzania czasu.",
    images: [vizLivingBeige, vizBathroomMarble, vizClosetMarble, vizDetailCeramics],
  },
  "czarna-perla": {
    title: "Czarna Perła",
    type: "Dom jednorodzinny",
    area: "180 m²",
    location: "Podkarpacie",
    pkg: "Kompleks",
    time: "8 tygodni",
    challenge: "Duża otwarta przestrzeń i odważna wizja inwestora – trzeba było zbalansować nowoczesne materiały z ciepłem domowego wnętrza.",
    story: "Projekt obejmował cały dom od salonu po łazienkę na piętrze. Klient chciał ciemne, odważne materiały, ale bez efektu chłodu. Połączyłam czarny kamień z drewnem, ciepłym oświetleniem i dużą ilością zieleni.",
    scope: ["Pełny projekt koncepcyjny", "Wizualizacje 3D i 360°", "Wideo wizualne", "Dokumentacja techniczna", "3 spotkania nadzorujące", "Wspólne zakupy materiałów"],
    result: "Nowoczesny dom, który robi wrażenie, ale w którym dobrze się mieszka na co dzień.",
    images: [vizKitchenRattan, vizBedroomDark, vizBedroomMural, vizBathroomMarble],
  },
  "bambusowa-oaza": {
    title: "Bambusowa Oaza",
    type: "Salon z jadalnią",
    area: "65 m²",
    location: "Małopolska",
    pkg: "Koncepcyjna",
    time: "3 tygodnie",
    challenge: "Klienci chcieli wnętrze inspirowane naturą, ale nie wiedzieli, jak to przełożyć na konkretne rozwiązania.",
    story: "Zaproponowałam naturalny rattan, jasne drewno i spokojną paletę beżów i zieleni. Kominek stał się centralnym punktem, a duże okna z widokiem na ogród – integralną częścią projektu.",
    scope: ["Układ funkcjonalny", "Moodboard i propozycja stylistyczna", "3 wizualizacje 3D", "Podstawowe rysunki techniczne"],
    result: "Spójna koncepcja, która dała klientom jasny punkt wyjścia do dalszej realizacji.",
    images: [vizDiningFireplace, vizLivingBeige, vizDetailCeramics, vizClosetMarble],
  },
};

const ProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? projectsData[slug] : null;

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl text-foreground mb-4">Projekt nie znaleziony</h1>
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
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <img src={project.images[0]} alt={`${project.title} – projekt wnętrz ${project.location}`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/35" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-heading text-3xl md:text-5xl text-dark-foreground mb-3">{project.title}</h1>
          <p className="font-body text-sm text-dark-foreground/80 tracking-wide uppercase">
            {project.type} · {project.area} · {project.location}
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <section className="bg-background pt-10 px-6 md:px-12 lg:px-20">
        <div className="max-w-[900px] mx-auto">
          <nav className="flex items-center gap-2 text-xs font-body text-muted-foreground">
            <Link to="/" className="hover:text-accent transition-colors">Strona główna</Link>
            <span>/</span>
            <Link to="/realizacje" className="hover:text-accent transition-colors">Realizacje</Link>
            <span>/</span>
            <span className="text-foreground">{project.title}</span>
          </nav>
        </div>
      </section>

      {/* Story & details */}
      <section className="bg-background section-padding">
        <div className="max-w-[900px] mx-auto">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 mb-12">
              <div>
                <h2 className="font-heading text-2xl text-foreground mb-4">O projekcie</h2>
                <p className="text-muted-foreground font-body text-base leading-relaxed mb-4">{project.story}</p>
                <h3 className="font-heading text-lg text-foreground mb-2 mt-6">Wyzwanie</h3>
                <p className="text-muted-foreground font-body text-base leading-relaxed">{project.challenge}</p>
                <h3 className="font-heading text-lg text-foreground mb-2 mt-6">Efekt</h3>
                <p className="text-muted-foreground font-body text-base leading-relaxed">{project.result}</p>
              </div>
              <div className="md:border-l md:border-border md:pl-8 space-y-5 md:min-w-[200px]">
                {[
                  { label: "Lokalizacja", value: project.location },
                  { label: "Metraż", value: project.area },
                  { label: "Opcja", value: project.pkg },
                  { label: "Czas realizacji", value: project.time },
                ].map((d) => (
                  <div key={d.label}>
                    <p className="text-muted-foreground font-body text-xs tracking-[0.15em] uppercase mb-1">{d.label}</p>
                    <p className="font-heading text-base text-foreground">{d.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Scope */}
          <FadeIn delay={100}>
            <h3 className="font-heading text-lg text-foreground mb-3">Zakres prac</h3>
            <ul className="flex flex-wrap gap-2 mb-12">
              {project.scope.map((s) => (
                <li key={s} className="font-body text-sm text-muted-foreground bg-secondary px-4 py-1.5 rounded-full">{s}</li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-background px-6 md:px-12 lg:px-20 pb-20">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.images.map((img, i) => (
            <FadeIn key={i} delay={i * 80} className={i === 0 ? "md:col-span-2" : ""}>
              <img
                src={img}
                alt={`${project.title} wizualizacja ${i + 1}`}
                className={`w-full ${i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"} object-cover`}
                loading="lazy"
              />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary section-padding">
        <div className="max-w-[700px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4">Planujesz podobny projekt?</h2>
            <p className="text-muted-foreground font-body text-base mb-8">
              Napisz do mnie – chętnie porozmawiam o Twoim wnętrzu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/kontakt"
                className="px-7 py-3 rounded-full bg-accent text-accent-foreground text-sm tracking-[0.05em] font-body hover:bg-accent/90 transition-all duration-300"
              >
                Umów spotkanie
              </Link>
              <Link
                to="/realizacje"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full border border-foreground text-foreground text-sm tracking-[0.05em] font-body hover:bg-foreground hover:text-background transition-all duration-300"
              >
                Inne realizacje <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
};

export default ProjectPage;
