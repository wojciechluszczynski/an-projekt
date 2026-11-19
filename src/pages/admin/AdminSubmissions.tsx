import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, BookOpen, Mail, MessageSquare, Phone, Trash2, LogOut } from 'lucide-react';

interface Submission {
  id: string;
  kind: string;
  name: string;
  email: string;
  phone: string | null;
  city: string | null;
  project_type: string | null;
  area: string | null;
  stage: string | null;
  message: string | null;
  created_at: string;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString('pl-PL', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });

const AdminSubmissions = () => {
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const load = async () => {
    const { data, error: err } = await supabase
      .from('form_submissions')
      .select('id, kind, name, email, phone, city, project_type, area, stage, message, created_at')
      .order('created_at', { ascending: false })
      .limit(200);
    if (err) setError('Nie udało się wczytać zgłoszeń. Spróbuj odświeżyć stronę.');
    setItems((data || []) as Submission[]);
    setLoading(false);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate('/admin');
      else load();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const remove = async (s: Submission) => {
    if (!window.confirm(`Usunąć zgłoszenie od ${s.name}? Tego nie da się cofnąć.`)) return;
    const { error: err } = await supabase.from('form_submissions').delete().eq('id', s.id);
    if (err) {
      setError('Nie udało się usunąć zgłoszenia.');
      return;
    }
    setItems((prev) => prev.filter((x) => x.id !== s.id));
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-[1000px] mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl text-foreground">Zgłoszenia</h1>
            <p className="font-body text-sm text-muted-foreground mt-1">Wiadomości z formularza kontaktowego i zapisy na e-book</p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/admin/wpisy"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border text-muted-foreground font-body text-sm hover:bg-secondary transition-colors"
            >
              <ArrowLeft size={14} /> Wpisy
            </Link>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border text-muted-foreground font-body text-sm hover:bg-secondary transition-colors"
            >
              <LogOut size={14} /> Wyloguj
            </button>
          </div>
        </div>

        {error && <p className="font-body text-sm text-destructive mb-4">{error}</p>}

        {loading ? (
          <p className="font-body text-muted-foreground text-center py-12">Ładowanie...</p>
        ) : items.length === 0 ? (
          <p className="font-body text-muted-foreground text-center py-16">Nie ma jeszcze zgłoszeń</p>
        ) : (
          <ul className="space-y-3">
            {items.map((s) => (
              <li key={s.id} className="p-4 rounded-xl border border-border bg-background">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/10 text-accent font-body text-xs">
                        {s.kind === 'ebook' ? <BookOpen size={11} /> : <MessageSquare size={11} />}
                        {s.kind === 'ebook' ? 'E-book' : 'Kontakt'}
                      </span>
                      <h3 className="font-heading text-base text-foreground truncate">{s.name}</h3>
                      <span className="font-body text-xs text-muted-foreground">{formatDate(s.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-4 flex-wrap font-body text-sm">
                      <a href={`mailto:${s.email}`} className="inline-flex items-center gap-1 text-accent hover:underline">
                        <Mail size={13} /> {s.email}
                      </a>
                      {s.phone && (
                        <a href={`tel:${s.phone.replace(/\s+/g, '')}`} className="inline-flex items-center gap-1 text-accent hover:underline">
                          <Phone size={13} /> {s.phone}
                        </a>
                      )}
                    </div>
                    {(s.project_type || s.area || s.city || s.stage) && (
                      <p className="font-body text-xs text-muted-foreground mt-2">
                        {[s.project_type, s.area, s.city, s.stage].filter(Boolean).join(' · ')}
                      </p>
                    )}
                    {s.message && (
                      <p className="font-body text-sm text-foreground mt-3 whitespace-pre-wrap break-words">{s.message}</p>
                    )}
                  </div>
                  <button
                    onClick={() => remove(s)}
                    className="p-2 rounded-lg hover:bg-destructive/10 transition-colors shrink-0"
                    title="Usuń zgłoszenie"
                  >
                    <Trash2 size={16} className="text-destructive/70" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
};

export default AdminSubmissions;
