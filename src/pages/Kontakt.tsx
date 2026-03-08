import { useState } from "react";
import { Instagram, Facebook } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { toast } from "sonner";

const Kontakt = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
    honeypot: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.honeypot) return;
    if (!form.firstName || !form.lastName || !form.phone || !form.email || !form.message) {
      toast.error("Proszę wypełnić wszystkie pola.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Proszę podać prawidłowy adres email.");
      return;
    }
    setSubmitted(true);
    toast.success("Dziękuję! Ania odezwie się w ciągu 24 godzin.");
  };

  const inputClass =
    "w-full bg-transparent border-b border-primary-foreground/30 text-primary-foreground font-body text-base py-3 px-0 placeholder:text-primary-foreground/30 focus:outline-none focus:border-accent transition-colors";

  return (
    <main className="bg-primary min-h-screen pt-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pb-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Left */}
          <FadeIn>
            <div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-6">
                Buduję Twoją wizję
              </h1>
              <p className="text-primary-foreground/60 font-body text-lg mb-12">
                Krok po kroku, razem. Chętnie opowiem Ci o&nbsp;Twoim projekcie.
              </p>

              <div className="flex flex-col gap-3 text-primary-foreground/70 font-body text-base mb-10">
                <span className="text-primary-foreground font-medium">Anna Nowak · AN Projekt</span>
                <span>Odrzykoń, Podkarpacie</span>
                <a href="tel:+48XXXXXXXXX" className="hover:text-accent transition-colors">
                  +48 XXX XXX XXX
                </a>
                <a href="mailto:anna@anprojekt.com.pl" className="hover:text-accent transition-colors">
                  anna@anprojekt.com.pl
                </a>
              </div>

              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/an_projekt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/50 hover:text-accent transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="https://www.facebook.com/anna.nowakpaprocka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/50 hover:text-accent transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={24} />
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Right - Form */}
          <FadeIn delay={200}>
            {submitted ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <h2 className="font-heading text-3xl text-primary-foreground mb-4">Dziękuję!</h2>
                  <p className="text-primary-foreground/60 font-body text-lg">
                    Ania odezwie się do Ciebie w&nbsp;ciągu 24 godzin.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  value={form.honeypot}
                  onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Imię *"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className={inputClass}
                    maxLength={100}
                  />
                  <input
                    type="text"
                    placeholder="Nazwisko *"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className={inputClass}
                    maxLength={100}
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Telefon *"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClass}
                  maxLength={20}
                />
                <input
                  type="email"
                  placeholder="Email *"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                  maxLength={255}
                />
                <textarea
                  placeholder="Napisz kilka słów o swoim projekcie lub zadaj pytanie... *"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputClass} resize-none min-h-[120px]`}
                  maxLength={1000}
                />
                <button
                  type="submit"
                  className="w-full mt-4 py-4 rounded-full bg-primary-foreground text-primary font-body text-sm tracking-[0.12em] uppercase hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                >
                  Wyślij wiadomość
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </main>
  );
};

export default Kontakt;
