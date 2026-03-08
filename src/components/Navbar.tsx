import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.svg";

const navLinks = [
  { href: "/realizacje", label: "Realizacje" },
  { href: "/oferta", label: "Oferta" },
  { href: "/o-mnie", label: "O mnie" },
  { href: "/kontakt", label: "Kontakt" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Pages with light hero where navbar text should be white initially
  const darkHeroPages = ["/", "/oferta"];
  const hasDarkHero = darkHeroPages.includes(location.pathname) || Object.keys({ "zlota-harmonia": 1, "czarna-perla": 1, "bambusowa-oaza": 1 }).some(s => location.pathname === `/${s}`);
  const lightText = hasDarkHero && !scrolled && !mobileOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 md:px-12 lg:px-20 py-4">
        <Link to="/" className="z-50">
          <img
            src={logo}
            alt="AN Projekt – projektant wnętrz Krosno"
            className={`h-9 md:h-10 transition-all duration-300 ${
              lightText ? "brightness-0 invert" : ""
            }`}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm tracking-[0.12em] uppercase font-body transition-colors duration-300 ${
                lightText
                  ? "text-dark-foreground/90 hover:text-accent"
                  : "text-foreground hover:text-accent"
              } ${location.pathname === link.href ? "text-accent" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/kontakt"
            className={`text-sm tracking-[0.12em] uppercase font-body px-5 py-2 rounded-full border transition-all duration-300 ${
              lightText
                ? "border-dark-foreground/60 text-dark-foreground hover:bg-accent hover:border-accent hover:text-accent-foreground"
                : "border-foreground/30 text-foreground hover:bg-foreground hover:text-background"
            }`}
          >
            Napisz do mnie
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden z-50 transition-colors ${
            lightText ? "text-dark-foreground" : "text-foreground"
          }`}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-7 transition-all duration-500 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={`text-xl font-heading tracking-wider transition-colors hover:text-accent ${
              location.pathname === link.href ? "text-accent" : "text-foreground"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <Link
          to="/kontakt"
          className="mt-3 px-7 py-2.5 rounded-full bg-primary text-primary-foreground text-sm tracking-[0.12em] uppercase hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          Napisz do mnie
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
