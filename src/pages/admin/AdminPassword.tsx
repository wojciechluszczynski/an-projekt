import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, LockKeyhole } from 'lucide-react';

const MIN_LENGTH = 12;

// Opened from a password recovery link (the session comes from the link) or by a logged-in admin.
const AdminPassword = () => {
  const [ready, setReady] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSignedIn(!!session);
      setReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(!!session);
      setReady(true);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < MIN_LENGTH) {
      setError(`Hasło musi mieć co najmniej ${MIN_LENGTH} znaków`);
      return;
    }
    if (password !== repeat) {
      setError('Hasła nie są takie same');
      return;
    }
    setSaving(true);
    const { error: err } = await supabase.auth.updateUser({ password });
    setSaving(false);
    if (err) {
      setError('Nie udało się zapisać hasła. Link mógł wygasnąć, poproś o nowy.');
      return;
    }
    navigate('/admin/wpisy');
  };

  return (
    <main className="min-h-screen bg-secondary flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md rounded-[28px] border border-border bg-background p-7 shadow-sm sm:p-9">
        <Link
          to="/admin/wpisy"
          className="mb-6 inline-flex items-center gap-2 text-sm font-body text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={16} /> Powrót
        </Link>
        <h1 className="mb-2 font-heading text-3xl text-foreground">Ustaw hasło</h1>

        {!ready ? (
          <p className="font-body text-sm text-muted-foreground">Ładowanie...</p>
        ) : !signedIn ? (
          <p className="font-body text-sm text-muted-foreground">
            Ten link wygasł albo został już użyty. Wróć do <Link to="/admin" className="text-accent underline">logowania</Link> i
            kliknij „Nie pamiętam hasła”.
          </p>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-4">
            {[
              { label: 'Nowe hasło', value: password, set: setPassword },
              { label: 'Powtórz hasło', value: repeat, set: setRepeat },
            ].map((f) => (
              <div key={f.label}>
                <label className="mb-1.5 block font-body text-xs uppercase tracking-[0.12em] text-muted-foreground">{f.label}</label>
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-secondary/60 px-4 py-3 transition-colors focus-within:border-accent">
                  <LockKeyhole size={16} className="text-muted-foreground" />
                  <input
                    type="password"
                    value={f.value}
                    onChange={(e) => f.set(e.target.value)}
                    required
                    autoComplete="new-password"
                    className="w-full bg-transparent font-body text-sm text-foreground focus:outline-none"
                  />
                </div>
              </div>
            ))}
            <p className="font-body text-xs text-muted-foreground">Co najmniej {MIN_LENGTH} znaków.</p>
            {error && <p className="font-body text-sm text-destructive">{error}</p>}
            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-full bg-accent py-3 text-sm font-body text-accent-foreground transition-colors hover:bg-accent/90 disabled:opacity-50"
            >
              {saving ? 'Zapisywanie...' : 'Zapisz hasło'}
            </button>
          </form>
        )}
      </div>
    </main>
  );
};

export default AdminPassword;
