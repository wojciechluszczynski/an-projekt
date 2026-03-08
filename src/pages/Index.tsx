import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import heroKitchen from "@/assets/hero-kitchen.png";
import heroBedroom from "@/assets/hero-bedroom.png";
import heroBathroom from "@/assets/hero-bathroom.png";
import heroCloset from "@/assets/hero-closet.png";
import heroKitchenAlt from "@/assets/hero-kitchen-alt.png";

const heroSlides = [heroKitchenAlt, heroBedroom, heroBathroom];

const projects = [
  {
    num: "01",
    title: "Złota Harmonia",
    desc: "Ciepłe wnętrze z nutą luksusu, złote akcenty, miękkie sofy, marmur.",
    image: heroBedroom,
    href: "/zlota-harmonia",
    meta: "Mieszkanie 85m² · Rzeszów",
  },
  {
    num: "02",
    title: "Czarna Perła",
    desc: "Nowoczesna kuchnia z czarnym marmurem ze złotymi żyłkami.",
    image: heroKitchen,
    href: "/czarna-perla",
    meta: "Dom 180m² · Podkarpacie",
  },
  {
    num: "03",
    title: "Bambusowa Oaza",
    desc: "Naturalny rattan, biały marmur, kominek, widok na naturę.",
    image: heroCloset,
    href: "/bambusowa-oaza",
    meta: "Salon 65m² · Małopolska",
  },
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main>
      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide}
              alt={`Wizualizacja wnętrza AN Projekt ${i + 1}`}
              className="w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-foreground/35" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-heading text-5xl md:text-7xl lg:text-[96px] text-dark-foreground mb-4 animate-fade-in-up">
            AN Projekt
          </h1>
          <p className="font-body text-lg md:text-xl text-dark-foreground/90 mb-10 animate-fade-in-up-delay">
            Twoje wnętrze, moja wizja.
          </p>
          <Link
            to="/realizacje"
            className="px-8 py-3.5 rounded-full bg-secondary text-secondary-foreground text-sm tracking-[0.12em] uppercase font-body hover:bg-accent hover:text-accent-foreground transition-all duration-300 animate-fade-in-up-delay-2"
          >
            Poznaj moje realizacje
          </Link>
        </div>
        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === currentSlide ? "bg-dark-foreground scale-125" : "bg-dark-foreground/40"
              }`}
              aria-label={`Slajd ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* CLAIM */}
      <section className="bg-secondary section-padding">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <FadeIn>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
              W AN Projekt wierzę, że wnętrza powinny inspirować, funkcjonować bezbłędnie i&nbsp;służyć przez lata.
            </h2>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="flex md:justify-end">
              <Link
                to="/oferta"
                className="px-8 py-3.5 rounded-full border border-foreground text-foreground text-sm tracking-[0.12em] uppercase font-body hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-300"
              >
                Sprawdź pakiety
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* REALIZACJE */}
      <section className="bg-background section-padding">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-16 text-center">
              Moje realizacje
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((p, i) => (
              <FadeIn key={p.href} delay={i * 150}>
                <Link to={p.href} className="group block">
                  <div className="overflow-hidden mb-6">
                    <img
                      src={p.image}
                      alt={`Wizualizacja ${p.title} AN Projekt`}
                      className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-muted-foreground font-body text-xs tracking-[0.15em] uppercase mb-2">
                    Projekt {p.num}/03
                  </p>
                  <h3 className="font-heading text-2xl text-foreground mb-1">{p.title}</h3>
                  <p className="text-muted-foreground font-body text-sm mb-1">{p.meta}</p>
                  <p className="text-muted-foreground font-body text-base mb-4">{p.desc}</p>
                  <span className="text-sm font-body tracking-[0.1em] uppercase text-foreground border-b border-foreground pb-0.5 group-hover:border-accent group-hover:text-accent transition-colors">
                    Poznaj projekt
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={300}>
            <div className="text-center mt-16">
              <Link
                to="/realizacje"
                className="px-8 py-3.5 rounded-full border border-foreground text-foreground text-sm tracking-[0.12em] uppercase font-body hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-300"
              >
                Zobacz wszystkie realizacje
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* O MNIE */}
      <section className="bg-background section-padding">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <FadeIn>
            <div className="overflow-hidden">
              <img
                src={heroBathroom}
                alt="Anna Nowak projektantka wnętrz AN Projekt"
                className="w-full aspect-[3/4] object-cover"
                loading="lazy"
              />
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
                Cześć, jestem Ania
              </h2>
              <p className="text-muted-foreground font-body text-base md:text-lg mb-8 leading-relaxed">
                Projektuję wnętrza, które łączą elegancję z&nbsp;funkcjonalnością. Każdy projekt to historia
                – od pustej przestrzeni do Twojego wymarzonego domu. Działam na Podkarpaciu i&nbsp;w&nbsp;Małopolsce,
                a&nbsp;moja pasja to tworzenie przestrzeni, w&nbsp;których chce się żyć.
              </p>
              <Link
                to="/o-mnie"
                className="px-8 py-3.5 rounded-full border border-foreground text-foreground text-sm tracking-[0.12em] uppercase font-body hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-300"
              >
                Poznaj mnie lepiej
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* OFERTA */}
      <section className="bg-secondary section-padding">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-16 text-center">
              Trzy pakiety dla różnych potrzeb
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Koncepcyjna",
                price: "120 zł/m²",
                desc: "Układ funkcjonalny, 3 wizualizacje, podstawowe rysunki techniczne.",
              },
              {
                name: "Komfortowa",
                price: "150 zł/m²",
                desc: "Pełny projekt, 4 wizualizacje, wizualizacja 360°, dokumentacja techniczna.",
              },
              {
                name: "Kompleksowa",
                price: "170 zł/m²",
                desc: "Pełen zakres + wideo, 3 spotkania nadzorujące, wsparcie od A do Z.",
              },
            ].map((pkg, i) => (
              <FadeIn key={pkg.name} delay={i * 150}>
                <div className="bg-background p-10 md:p-12 h-full flex flex-col">
                  <h3 className="font-heading text-2xl text-foreground mb-2">{pkg.name}</h3>
                  <p className="text-accent font-heading text-xl mb-6">{pkg.price}</p>
                  <p className="text-muted-foreground font-body text-base flex-1">{pkg.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={300}>
            <div className="text-center mt-16">
              <Link
                to="/oferta"
                className="px-8 py-3.5 rounded-full border border-foreground text-foreground text-sm tracking-[0.12em] uppercase font-body hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-300"
              >
                Poznaj szczegóły
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* KONTAKT CTA */}
      <section className="bg-primary section-padding">
        <div className="max-w-[1400px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-4">
              Masz projekt w&nbsp;głowie?
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-primary-foreground/70 font-body text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Napisz do mnie – razem stworzymy wnętrze, o&nbsp;jakim marzysz.
            </p>
          </FadeIn>
          <FadeIn delay={200}>
            <Link
              to="/kontakt"
              className="inline-block px-10 py-4 rounded-full bg-accent text-accent-foreground text-sm tracking-[0.12em] uppercase font-body hover:bg-accent/90 transition-all duration-300"
            >
              Rozpocznij swój projekt
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
};

export default Index;
