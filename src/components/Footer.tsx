import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-[1400px] mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Col 1 */}
          <div>
            <h3 className="font-heading text-3xl mb-4">AN Projekt</h3>
            <p className="text-primary-foreground/60 font-body text-base mb-6">
              Projektuję wnętrza, które inspirują.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/an_projekt/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/60 hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={22} />
              </a>
              <a
                href="https://www.facebook.com/anna.nowakpaprocka"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/60 hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={22} />
              </a>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-body text-sm tracking-[0.15em] uppercase mb-6 text-primary-foreground/40">
              Nawigacja
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { href: "/realizacje", label: "Realizacje" },
                { href: "/oferta", label: "Oferta" },
                { href: "/o-mnie", label: "O mnie" },
                { href: "/kontakt", label: "Kontakt" },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-primary-foreground/60 hover:text-accent transition-colors font-body text-base"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-body text-sm tracking-[0.15em] uppercase mb-6 text-primary-foreground/40">
              Kontakt
            </h4>
            <div className="flex flex-col gap-2 text-primary-foreground/60 font-body text-base">
              <span>Anna Nowak</span>
              <span>Odrzykoń, Podkarpacie</span>
              <a href="tel:+48XXXXXXXXX" className="hover:text-accent transition-colors">
                +48 XXX XXX XXX
              </a>
              <a href="mailto:anna@anprojekt.com.pl" className="hover:text-accent transition-colors">
                anna@anprojekt.com.pl
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/40 text-sm font-body">
            © 2026 AN Projekt. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex gap-6 text-sm font-body">
            <Link to="/polityka-prywatnosci" className="text-primary-foreground/40 hover:text-accent transition-colors">
              Polityka prywatności
            </Link>
            <Link to="/regulamin" className="text-primary-foreground/40 hover:text-accent transition-colors">
              Regulamin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
