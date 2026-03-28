import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import TipTapEditor from '@/components/admin/TipTapEditor';
import { ArrowLeft, Save, Eye, ImageIcon, Loader2 } from 'lucide-react';

const categories = ['Współpraca', 'Błędy', 'Porady', 'Trendy', 'Materiały'];

const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/ł/g, 'l').replace(/ą/g, 'a').replace(/ę/g, 'e')
    .replace(/ś/g, 's').replace(/ć/g, 'c').replace(/ź/g, 'z')
    .replace(/ż/g, 'z').replace(/ó/g, 'o').replace(/ń/g, 'n')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

interface PostForm {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  cover_image_url: string;
  og_image_url: string;
  meta_title: string;
  meta_description: string;
  display_date: string;
  read_time: string;
  featured: boolean;
  published: boolean;
  related_slugs: string[];
}

const defaultPost: PostForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: 'Porady',
  cover_image_url: '',
  og_image_url: '',
  meta_title: '',
  meta_description: '',
  display_date: '',
  read_time: '5 min',
  featured: false,
  published: false,
  related_slugs: [],
};

const AdminPostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'nowy';

  const [post, setPost] = useState<PostForm>(defaultPost);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [allPosts, setAllPosts] = useState<{ slug: string; title: string }[]>([]);
  const [coverUploading, setCoverUploading] = useState(false);
  const [ogUploading, setOgUploading] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchAllPostSlugs();
    if (!isNew && id) fetchPost(id);
  }, [id]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) navigate('/admin');
  };

  const fetchPost = async (postId: string) => {
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', postId)
      .single();

    if (data) {
      setPost({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        cover_image_url: data.cover_image_url || '',
        og_image_url: data.og_image_url || '',
        meta_title: data.meta_title || '',
        meta_description: data.meta_description || '',
        display_date: data.display_date,
        read_time: data.read_time,
        featured: data.featured,
        published: data.published,
        related_slugs: data.related_slugs || [],
      });
    }
  };

  const fetchAllPostSlugs = async () => {
    const { data } = await supabase
      .from('blog_posts')
      .select('slug, title')
      .order('title');
    setAllPosts(data || []);
  };

  const update = (field: keyof PostForm, value: any) => {
    setPost(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'title' && (isNew || !prev.slug)) {
        updated.slug = slugify(value);
      }
      return updated;
    });
    setSaved(false);
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'cover_image_url' | 'og_image_url',
    setUploading: (v: boolean) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const ext = file.name.split('.').pop();
    const fileName = `${field}-${Date.now()}.${ext}`;

    const { error } = await supabase.storage.from('blog-images').upload(fileName, file);
    if (error) {
      alert('Błąd przesyłania: ' + error.message);
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from('blog-images').getPublicUrl(fileName);
    update(field, publicUrl);
    setUploading(false);
    e.target.value = '';
  };

  const handleSave = async () => {
    if (!post.title || !post.slug) {
      alert('Tytuł i slug są wymagane');
      return;
    }
    setSaving(true);

    const payload = {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      cover_image_url: post.cover_image_url || null,
      og_image_url: post.og_image_url || null,
      meta_title: post.meta_title || null,
      meta_description: post.meta_description || null,
      display_date: post.display_date,
      read_time: post.read_time,
      featured: post.featured,
      published: post.published,
      related_slugs: post.related_slugs,
    };

    let error;
    if (isNew) {
      ({ error } = await supabase.from('blog_posts').insert(payload));
    } else {
      ({ error } = await supabase.from('blog_posts').update(payload).eq('id', id));
    }

    if (error) {
      alert('Błąd zapisu: ' + error.message);
    } else {
      setSaved(true);
      if (isNew) navigate('/admin/wpisy');
    }
    setSaving(false);
  };

  const toggleRelated = (slug: string) => {
    const current = post.related_slugs;
    const updated = current.includes(slug)
      ? current.filter(s => s !== slug)
      : [...current, slug];
    update('related_slugs', updated);
  };

  const Label = ({ children, hint }: { children: React.ReactNode; hint?: string }) => (
    <div className="mb-1.5">
      <label className="font-body text-xs font-medium text-foreground">{children}</label>
      {hint && <p className="font-body text-[11px] text-muted-foreground mt-0.5">{hint}</p>}
    </div>
  );

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-[900px] mx-auto px-6 py-8">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/admin/wpisy" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} /> Wróć do listy
          </Link>
          <div className="flex items-center gap-3">
            {saved && <span className="font-body text-xs text-green-600">✓ Zapisano</span>}
            {!isNew && post.published && (
              <a href={`/blog/${post.slug}`} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border font-body text-xs text-muted-foreground hover:bg-secondary transition-colors">
                <Eye size={14} /> Podgląd
              </a>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-accent-foreground font-body text-sm hover:bg-accent/90 transition-colors disabled:opacity-50"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              {saving ? 'Zapisuję...' : 'Zapisz'}
            </button>
          </div>
        </div>

        <h1 className="font-heading text-2xl text-foreground mb-6">{isNew ? 'Nowy wpis' : 'Edytuj wpis'}</h1>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <Label hint="Tytuł widoczny na stronie i w wynikach wyszukiwania">Tytuł artykułu</Label>
            <input
              type="text"
              value={post.title}
              onChange={e => update('title', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background font-body text-base text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
              placeholder="np. Jak urządzić małe mieszkanie?"
            />
          </div>

          {/* Slug */}
          <div>
            <Label hint="Adres URL wpisu – generowany automatycznie z tytułu. Możesz zmienić ręcznie.">Slug (URL)</Label>
            <div className="flex items-center gap-2">
              <span className="font-body text-sm text-muted-foreground">/blog/</span>
              <input
                type="text"
                value={post.slug}
                onChange={e => update('slug', e.target.value)}
                className="flex-1 px-3 py-2.5 rounded-lg border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>

          {/* Category + Date + Read time */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label hint="Wybierz kategorię z listy">Kategoria</Label>
              <select
                value={post.category}
                onChange={e => update('category', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <Label hint="Np. „5 marca 2026"">Data publikacji</Label>
              <input
                type="text"
                value={post.display_date}
                onChange={e => update('display_date', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="5 marca 2026"
              />
            </div>
            <div>
              <Label hint="Np. „7 min"">Czas czytania</Label>
              <input
                type="text"
                value={post.read_time}
                onChange={e => update('read_time', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="7 min"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <Label hint="Krótki opis widoczny na liście artykułów (1–2 zdania)">Zajawka</Label>
            <textarea
              value={post.excerpt}
              onChange={e => update('excerpt', e.target.value)}
              rows={2}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent resize-none"
              placeholder="Krótki opis artykułu widoczny na liście bloga"
            />
          </div>

          {/* Cover image */}
          <div>
            <Label hint="Główne zdjęcie artykułu widoczne na liście i w nagłówku">Zdjęcie główne</Label>
            <div className="flex items-center gap-4">
              {post.cover_image_url && (
                <img src={post.cover_image_url} alt="" className="w-24 h-16 object-cover rounded-lg border border-border" />
              )}
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border font-body text-xs text-muted-foreground hover:bg-secondary transition-colors cursor-pointer">
                <ImageIcon size={14} />
                {coverUploading ? 'Przesyłanie...' : 'Wybierz zdjęcie'}
                <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, 'cover_image_url', setCoverUploading)} />
              </label>
            </div>
          </div>

          {/* Content */}
          <div>
            <Label hint="Użyj paska narzędzi do formatowania tekstu, dodawania nagłówków, zdjęć i linków">Treść artykułu</Label>
            <TipTapEditor content={post.content} onChange={v => update('content', v)} />
          </div>

          {/* Related posts */}
          <div>
            <Label hint="Zaznacz wpisy, które pojawią się jako „Podobne artykuły" na dole">Powiązane wpisy</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {allPosts
                .filter(p => p.slug !== post.slug)
                .map(p => (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => toggleRelated(p.slug)}
                    className={`px-3 py-1.5 rounded-full font-body text-xs transition-colors ${
                      post.related_slugs.includes(p.slug)
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-secondary text-muted-foreground hover:bg-accent/10'
                    }`}
                  >
                    {p.title}
                  </button>
                ))}
              {allPosts.filter(p => p.slug !== post.slug).length === 0 && (
                <p className="font-body text-xs text-muted-foreground">Brak innych wpisów do powiązania</p>
              )}
            </div>
          </div>

          {/* SEO section */}
          <div className="border-t border-border pt-6">
            <h2 className="font-heading text-lg text-foreground mb-4">SEO i udostępnianie</h2>

            <div className="space-y-4">
              <div>
                <Label hint="Tytuł w wynikach Google (maks. 60 znaków). Domyślnie używany tytuł artykułu.">Meta Title</Label>
                <input
                  type="text"
                  value={post.meta_title}
                  onChange={e => update('meta_title', e.target.value)}
                  maxLength={70}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                  placeholder={post.title || 'Tytuł SEO'}
                />
                <p className="font-body text-[11px] text-muted-foreground mt-1">{(post.meta_title || '').length}/60 znaków</p>
              </div>

              <div>
                <Label hint="Opis w wynikach Google (maks. 160 znaków). Domyślnie używana zajawka.">Meta Description</Label>
                <textarea
                  value={post.meta_description}
                  onChange={e => update('meta_description', e.target.value)}
                  maxLength={170}
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent resize-none"
                  placeholder={post.excerpt || 'Opis SEO'}
                />
                <p className="font-body text-[11px] text-muted-foreground mt-1">{(post.meta_description || '').length}/160 znaków</p>
              </div>

              <div>
                <Label hint="Obrazek wyświetlany przy udostępnianiu w social media (1200×630 px). Domyślnie – zdjęcie główne.">Obrazek OG (social media)</Label>
                <div className="flex items-center gap-4">
                  {post.og_image_url && (
                    <img src={post.og_image_url} alt="" className="w-28 h-16 object-cover rounded-lg border border-border" />
                  )}
                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border font-body text-xs text-muted-foreground hover:bg-secondary transition-colors cursor-pointer">
                    <ImageIcon size={14} />
                    {ogUploading ? 'Przesyłanie...' : 'Wybierz obrazek OG'}
                    <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, 'og_image_url', setOgUploading)} />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Toggles */}
          <div className="border-t border-border pt-6 flex flex-wrap gap-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={post.featured}
                onChange={e => update('featured', e.target.checked)}
                className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
              />
              <div>
                <span className="font-body text-sm text-foreground">Wyróżniony</span>
                <p className="font-body text-[11px] text-muted-foreground">Wpis pojawi się jako duży baner na górze bloga</p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={post.published}
                onChange={e => update('published', e.target.checked)}
                className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
              />
              <div>
                <span className="font-body text-sm text-foreground">Opublikowany</span>
                <p className="font-body text-[11px] text-muted-foreground">Wpis będzie widoczny publicznie na blogu</p>
              </div>
            </label>
          </div>

          {/* Bottom save */}
          <div className="pt-4 flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground font-body text-sm hover:bg-accent/90 transition-colors disabled:opacity-50"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              {saving ? 'Zapisuję...' : 'Zapisz wpis'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminPostEditor;
