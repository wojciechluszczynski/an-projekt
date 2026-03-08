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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-12 lg:px-20 py-5">
        <Link to="/" className="z-50">
          <img
            src={logo}
            alt="AN Projekt logo"
            className={`h-10 md:h-12 transition-all duration-300 ${
              scrolled || mobileOpen ? "" : "brightness-0 invert"
            }`}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm tracking-[0.15em] uppercase font-body transition-colors duration-300 ${
                scrolled
                  ? "text-foreground hover:text-accent"
                  : "text-dark-foreground hover:text-accent"
              } ${location.pathname === link.href ? "border-b-2 border-accent pb-0.5" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/kontakt"
            className={`text-sm tracking-[0.15em] uppercase font-body px-6 py-2.5 rounded-full border transition-all duration-300 ${
              scrolled
                ? "border-foreground text-foreground hover:bg-accent hover:border-accent"
                : "border-dark-foreground text-dark-foreground hover:bg-accent hover:border-accent hover:text-accent-foreground"
            }`}
          >
            Napisz do mnie
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden z-50 transition-colors ${
            scrolled || mobileOpen ? "text-foreground" : "text-dark-foreground"
          }`}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={`text-2xl font-heading tracking-wider transition-colors hover:text-accent ${
              location.pathname === link.href ? "text-accent" : "text-foreground"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <Link
          to="/kontakt"
          className="mt-4 px-8 py-3 rounded-full bg-primary text-primary-foreground text-sm tracking-[0.15em] uppercase hover:bg-accent transition-colors"
        >
          Napisz do mnie
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
