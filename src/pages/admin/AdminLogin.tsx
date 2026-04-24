import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, LockKeyhole, Mail, Sparkles } from 'lucide-react';
import annaPortrait from '@/assets/anna-nowak-portrait.png';
import apartamentKlasa3 from '@/assets/apartament-klasa-3.jpeg';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError('Nieprawidłowy email lub hasło');
      setLoading(false);
      return;
    }

    navigate('/admin/wpisy');
  };

  return (
    <main className="min-h-screen bg-secondary">
      <div className="grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative hidden overflow-hidden lg:flex">
          <img
            src={apartamentKlasa3}
            alt="Wnętrze projektu AN Projekt"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/45" />
          <div className="relative flex w-full flex-col justify-between p-10 text-primary-foreground xl:p-14">
            <Link
              to="/"
              className="inline-flex w-fit items-center gap-2 text-sm font-body tracking-[0.05em] text-primary-foreground/90 transition-colors hover:text-primary-foreground"
            >
              <ArrowLeft size={16} /> Powrót na stronę
            </Link>

            <div className="max-w-xl">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-background/10 px-4 py-1.5 font-body text-xs uppercase tracking-[0.2em] text-primary-foreground/85">
                <Sparkles size={14} /> AN Projekt
              </p>
              <h1 className="mb-5 font-heading text-5xl leading-tight text-primary-foreground xl:text-6xl">
                Panel administracyjny bloga
              </h1>
              <p className="max-w-md font-body text-base text-primary-foreground/80 xl:text-lg">
                Dostęp do publikacji wpisów, edycji treści i zarządzania zapleczem strony w estetyce spójnej z marką.
              </p>
            </div>

            <div className="flex max-w-sm items-center gap-4 rounded-2xl border border-primary-foreground/15 bg-background/10 p-4 backdrop-blur-sm">
              <img
                src={annaPortrait}
                alt="Anna Nowak"
                className="h-14 w-14 rounded-2xl object-cover object-top"
              />
              <div>
                <p className="font-heading text-xl text-primary-foreground">Anna Nowak</p>
                <p className="font-body text-sm text-primary-foreground/75">Strefa zarządzania treścią AN Projekt</p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-md rounded-[28px] border border-border bg-background p-7 shadow-sm sm:p-9">
            <div className="mb-8 flex items-center justify-between lg:hidden">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-body text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft size={16} /> Powrót
              </Link>
              <div className="flex items-center gap-2">
                <img src={annaPortrait} alt="Anna Nowak" className="h-9 w-9 rounded-full object-cover object-top" />
                <span className="font-heading text-lg text-foreground">AN Projekt</span>
              </div>
            </div>

            <div className="mb-8">
              <p className="mb-3 font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">Panel CMS</p>
              <h2 className="mb-2 font-heading text-3xl text-foreground">Zaloguj się</h2>
              <p className="font-body text-sm text-muted-foreground">
                Użyj danych administratora, aby zarządzać wpisami na blogu.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="mb-1.5 block font-body text-xs uppercase tracking-[0.12em] text-muted-foreground">Email</label>
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-secondary/60 px-4 py-3 transition-colors focus-within:border-accent">
                  <Mail size={16} className="text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-transparent font-body text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
                    placeholder="anprojekt.com@gmail.com"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block font-body text-xs uppercase tracking-[0.12em] text-muted-foreground">Hasło</label>
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-secondary/60 px-4 py-3 transition-colors focus-within:border-accent">
                  <LockKeyhole size={16} className="text-muted-foreground" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-transparent font-body text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
                    placeholder="Wpisz hasło"
                  />
                </div>
              </div>

              {error && <p className="font-body text-sm text-destructive">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-accent py-3 text-sm font-body text-accent-foreground transition-colors hover:bg-accent/90 disabled:opacity-50"
              >
                {loading ? 'Logowanie...' : 'Wejdź do panelu'}
              </button>
            </form>

            <div className="mt-6 rounded-2xl bg-secondary px-4 py-3">
              <p className="font-body text-xs leading-relaxed text-muted-foreground">
                Logowanie odbywa się przez email i hasło administratora przypisane do zaplecza strony.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AdminLogin;
