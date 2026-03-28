import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit, Trash2, Eye, EyeOff, LogOut, Star } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  slug: string;
  category: string;
  published: boolean;
  featured: boolean;
  display_date: string;
  created_at: string;
}

const AdminPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchPosts();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) navigate('/admin');
  };

  const fetchPosts = async () => {
    const { data } = await supabase
      .from('blog_posts')
      .select('id, title, slug, category, published, featured, display_date, created_at')
      .order('created_at', { ascending: false });
    setPosts(data || []);
    setLoading(false);
  };

  const togglePublished = async (id: string, current: boolean) => {
    await supabase.from('blog_posts').update({ published: !current }).eq('id', id);
    fetchPosts();
  };

  const deletePost = async (id: string, title: string) => {
    if (!window.confirm(`Usunąć wpis "${title}"?`)) return;
    await supabase.from('blog_posts').delete().eq('id', id);
    fetchPosts();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-[1000px] mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl text-foreground">Wpisy na blogu</h1>
            <p className="font-body text-sm text-muted-foreground mt-1">Zarządzaj treściami na blogu AN Projekt</p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/admin/wpisy/nowy"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-accent-foreground font-body text-sm hover:bg-accent/90 transition-colors"
            >
              <Plus size={16} /> Nowy wpis
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border text-muted-foreground font-body text-sm hover:bg-secondary transition-colors"
            >
              <LogOut size={14} /> Wyloguj
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="bg-secondary/70 rounded-xl p-4 mb-6">
          <p className="font-body text-xs text-muted-foreground">
            💡 <strong>Podpowiedź:</strong> Kliknij ikonę oka, aby opublikować/ukryć wpis. Wpisy w trybie „szkic" nie są widoczne na stronie.
          </p>
        </div>

        {/* Posts list */}
        {loading ? (
          <p className="font-body text-muted-foreground text-center py-12">Ładowanie...</p>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-body text-muted-foreground mb-4">Nie masz jeszcze żadnych wpisów</p>
            <Link
              to="/admin/wpisy/nowy"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground font-body text-sm hover:bg-accent/90 transition-colors"
            >
              <Plus size={16} /> Dodaj pierwszy wpis
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div key={post.id} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-background hover:bg-secondary/30 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-heading text-base text-foreground truncate">{post.title}</h3>
                    {post.featured && <Star size={14} className="text-accent shrink-0" fill="currentColor" />}
                  </div>
                  <div className="flex items-center gap-3 font-body text-xs text-muted-foreground">
                    <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent">{post.category}</span>
                    <span>{post.display_date || 'Brak daty'}</span>
                    <span className={post.published ? 'text-green-600' : 'text-muted-foreground'}>
                      {post.published ? '● Opublikowany' : '○ Szkic'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => togglePublished(post.id, post.published)}
                    className="p-2 rounded-lg hover:bg-secondary transition-colors"
                    title={post.published ? 'Ukryj wpis' : 'Opublikuj wpis'}
                  >
                    {post.published ? <Eye size={16} className="text-green-600" /> : <EyeOff size={16} className="text-muted-foreground" />}
                  </button>
                  <Link
                    to={`/admin/wpisy/${post.id}`}
                    className="p-2 rounded-lg hover:bg-secondary transition-colors"
                    title="Edytuj"
                  >
                    <Edit size={16} className="text-muted-foreground" />
                  </Link>
                  <button
                    onClick={() => deletePost(post.id, post.title)}
                    className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
                    title="Usuń"
                  >
                    <Trash2 size={16} className="text-destructive/70" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminPosts;
