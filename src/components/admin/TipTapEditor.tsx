import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Node, mergeAttributes } from '@tiptap/core';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Bold, Italic, Heading2, Heading3, List, ListOrdered,
  Quote, ImageIcon, LinkIcon, Undo, Redo, Minus, Video, Loader2, Upload,
} from 'lucide-react';
import { useRef, useState } from 'react';

interface TipTapEditorProps {
  content: string;
  onChange: (html: string) => void;
}

// ----------------------- Video Embed Extension -----------------------
// Obsługuje zarówno <video> (z src lub <source>), jak i iframe YouTube/Vimeo
// opakowany w <div class="video-embed">.

const VideoEmbed = Node.create({
  name: 'videoEmbed',
  group: 'block',
  atom: true,
  draggable: true,
  selectable: true,

  addAttributes() {
    return {
      src: { default: null },
      kind: { default: 'file' }, // 'file' | 'youtube' | 'vimeo'
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div.video-embed',
        getAttrs: (el) => {
          const iframe = (el as HTMLElement).querySelector('iframe');
          const src = iframe?.getAttribute('src') || '';
          let kind = 'file';
          if (src.includes('youtube')) kind = 'youtube';
          else if (src.includes('vimeo')) kind = 'vimeo';
          return { src, kind };
        },
      },
      {
        tag: 'video',
        getAttrs: (el) => {
          const v = el as HTMLVideoElement;
          const src = v.getAttribute('src') || v.querySelector('source')?.getAttribute('src') || '';
          return { src, kind: 'file' };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { src, kind } = HTMLAttributes as { src: string; kind: string };
    if (!src) return ['div', { class: 'video-embed' }];

    if (kind === 'youtube' || kind === 'vimeo') {
      return [
        'div',
        { class: 'video-embed' },
        [
          'iframe',
          mergeAttributes({
            src,
            frameborder: '0',
            allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
            allowfullscreen: 'true',
            loading: 'lazy',
            referrerpolicy: 'strict-origin-when-cross-origin',
          }),
        ],
      ];
    }

    // Plik wideo: zawsze wstawiamy z <source>, żeby player był stabilny.
    const ext = (src.split('.').pop() || 'mp4').split('?')[0].toLowerCase();
    const mime = ext === 'webm' ? 'video/webm'
      : ext === 'ogg' ? 'video/ogg'
      : ext === 'mov' || ext === 'm4v' ? 'video/mp4'
      : 'video/mp4';

    return [
      'video',
      mergeAttributes({
        controls: 'true',
        preload: 'metadata',
        playsinline: 'true',
        class: 'blog-video',
      }),
      ['source', { src, type: mime }],
    ];
  },
});

// ----------------------- URL parser -----------------------

function parseVideoUrl(rawUrl: string): { src: string; kind: 'youtube' | 'vimeo' | 'file' } | null {
  const url = rawUrl.trim();
  if (!url) return null;

  const yt = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/,
  );
  if (yt) {
    return { src: `https://www.youtube-nocookie.com/embed/${yt[1]}`, kind: 'youtube' };
  }

  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) {
    return { src: `https://player.vimeo.com/video/${vm[1]}`, kind: 'vimeo' };
  }

  if (/\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(url)) {
    return { src: url, kind: 'file' };
  }

  return null;
}

// ----------------------- Toolbar Button -----------------------

const MenuButton = ({ onClick, active, disabled, children, title }: {
  onClick: () => void; active?: boolean; disabled?: boolean; children: React.ReactNode; title: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    disabled={disabled}
    className={`p-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${active ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}
  >
    {children}
  </button>
);

const TipTapEditor = ({ content, onChange }: TipTapEditorProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const [videoUploading, setVideoUploading] = useState(false);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [videoUrlInput, setVideoUrlInput] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false, autolink: true }),
      Placeholder.configure({ placeholder: 'Zacznij pisać treść artykułu...' }),
      VideoEmbed,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error } = await supabase.storage
      .from('blog-images')
      .upload(fileName, file);

    if (error) {
      toast({ title: 'Błąd przesyłania zdjęcia', description: error.message, variant: 'destructive' });
      e.target.value = '';
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('blog-images')
      .getPublicUrl(fileName);

    editor.chain().focus().setImage({ src: publicUrl }).run();
    e.target.value = '';
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // wyczyść od razu, żeby ten sam plik dało się ponownie wybrać
    if (!file) return;

    if (!file.type.startsWith('video/') && !/\.(mp4|webm|mov|m4v|ogg)$/i.test(file.name)) {
      toast({
        title: 'To nie jest plik wideo',
        description: 'Wybierz plik MP4, WEBM lub MOV.',
        variant: 'destructive',
      });
      return;
    }

    const maxSize = 100 * 1024 * 1024; // 100 MB
    if (file.size > maxSize) {
      toast({
        title: 'Plik jest za duży',
        description: 'Maksymalny rozmiar to 100 MB. Skompresuj film lub wstaw link z YouTube/Vimeo.',
        variant: 'destructive',
      });
      return;
    }

    setVideoUploading(true);
    toast({ title: 'Wgrywam film...', description: 'To może chwilę potrwać.' });

    const ext = (file.name.split('.').pop() || 'mp4').toLowerCase();
    const fileName = `videos/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error } = await supabase.storage
      .from('blog-images')
      .upload(fileName, file, {
        contentType: file.type || 'video/mp4',
        cacheControl: '3600',
      });

    if (error) {
      setVideoUploading(false);
      toast({
        title: 'Nie udało się wgrać filmu',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from('blog-images').getPublicUrl(fileName);

    editor.chain().focus().insertContent({
      type: 'videoEmbed',
      attrs: { src: publicUrl, kind: 'file' },
    }).run();

    setVideoUploading(false);
    toast({ title: 'Film dodany', description: 'Pamiętaj, aby zapisać wpis.' });
  };

  const addVideo = () => {
    if (videoUploading) return;
    setVideoUrlInput('');
    setVideoDialogOpen(true);
  };

  const submitVideoUrl = () => {
    const parsed = parseVideoUrl(videoUrlInput);
    if (!parsed) {
      toast({
        title: 'Nieobsługiwany link',
        description: 'Wstaw link z YouTube, Vimeo lub bezpośredni plik .mp4 / .webm.',
        variant: 'destructive',
      });
      return;
    }
    editor.chain().focus().insertContent({
      type: 'videoEmbed',
      attrs: parsed,
    }).run();
    setVideoDialogOpen(false);
    setVideoUrlInput('');
    toast({ title: 'Film dodany', description: 'Pamiętaj, aby zapisać wpis.' });
  };

  const pickVideoFile = () => {
    setVideoDialogOpen(false);
    // Małe opóźnienie, żeby modal zdążył się zamknąć przed otwarciem natywnego pickera.
    setTimeout(() => videoInputRef.current?.click(), 80);
  };

  const addLink = () => {
    const url = window.prompt('Wklej adres URL (np. /blog/nazwa-wpisu lub https://...)');
    if (!url) return;
    editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-background">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-0.5 p-2 border-b border-border bg-secondary/50">
        <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Pogrubienie">
          <Bold size={16} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Kursywa">
          <Italic size={16} />
        </MenuButton>
        <div className="w-px bg-border mx-1" />
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Nagłówek H2">
          <Heading2 size={16} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Nagłówek H3">
          <Heading3 size={16} />
        </MenuButton>
        <div className="w-px bg-border mx-1" />
        <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Lista punktowana">
          <List size={16} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Lista numerowana">
          <ListOrdered size={16} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Cytat">
          <Quote size={16} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Linia oddzielająca">
          <Minus size={16} />
        </MenuButton>
        <div className="w-px bg-border mx-1" />
        <MenuButton onClick={() => fileInputRef.current?.click()} title="Wstaw zdjęcie">
          <ImageIcon size={16} />
        </MenuButton>
        <MenuButton
          onClick={addVideo}
          disabled={videoUploading}
          title={videoUploading ? 'Trwa wgrywanie filmu...' : 'Wstaw film (plik z dysku lub YouTube/Vimeo)'}
        >
          {videoUploading ? <Loader2 size={16} className="animate-spin" /> : <Video size={16} />}
        </MenuButton>
        <MenuButton onClick={addLink} active={editor.isActive('link')} title="Wstaw link">
          <LinkIcon size={16} />
        </MenuButton>
        <div className="w-px bg-border mx-1" />
        <MenuButton onClick={() => editor.chain().focus().undo().run()} title="Cofnij">
          <Undo size={16} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().redo().run()} title="Ponów">
          <Redo size={16} />
        </MenuButton>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />
      <input
        ref={videoInputRef}
        type="file"
        accept="video/mp4,video/webm,video/quicktime,video/x-m4v,video/*"
        className="hidden"
        onChange={handleVideoUpload}
      />

      {/* Editor area */}
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none p-6 min-h-[400px] focus:outline-none
          [&_.tiptap]:outline-none [&_.tiptap]:min-h-[380px]
          [&_.tiptap_h2]:font-heading [&_.tiptap_h2]:text-2xl [&_.tiptap_h2]:text-foreground [&_.tiptap_h2]:mt-8 [&_.tiptap_h2]:mb-4
          [&_.tiptap_h3]:font-heading [&_.tiptap_h3]:text-xl [&_.tiptap_h3]:text-foreground [&_.tiptap_h3]:mt-6 [&_.tiptap_h3]:mb-3
          [&_.tiptap_p]:font-body [&_.tiptap_p]:text-muted-foreground [&_.tiptap_p]:leading-relaxed [&_.tiptap_p]:mb-4
          [&_.tiptap_ul]:list-disc [&_.tiptap_ul]:pl-6 [&_.tiptap_ul]:mb-4 [&_.tiptap_ul_li]:text-muted-foreground
          [&_.tiptap_ol]:list-decimal [&_.tiptap_ol]:pl-6 [&_.tiptap_ol]:mb-4 [&_.tiptap_ol_li]:text-muted-foreground
          [&_.tiptap_blockquote]:border-l-4 [&_.tiptap_blockquote]:border-accent/40 [&_.tiptap_blockquote]:pl-4 [&_.tiptap_blockquote]:italic [&_.tiptap_blockquote]:text-muted-foreground
          [&_.tiptap_img]:rounded-lg [&_.tiptap_img]:my-6 [&_.tiptap_img]:max-w-full
          [&_.tiptap_a]:text-accent [&_.tiptap_a]:underline
          [&_.tiptap_hr]:border-border [&_.tiptap_hr]:my-8
          [&_.tiptap_video]:block [&_.tiptap_video]:w-full [&_.tiptap_video]:aspect-video [&_.tiptap_video]:rounded-lg [&_.tiptap_video]:my-6 [&_.tiptap_video]:bg-black [&_.tiptap_video]:object-contain
          [&_.tiptap_.video-embed]:relative [&_.tiptap_.video-embed]:w-full [&_.tiptap_.video-embed]:my-6 [&_.tiptap_.video-embed]:rounded-lg [&_.tiptap_.video-embed]:overflow-hidden [&_.tiptap_.video-embed]:bg-black [&_.tiptap_.video-embed]:aspect-video
          [&_.tiptap_.video-embed_iframe]:absolute [&_.tiptap_.video-embed_iframe]:inset-0 [&_.tiptap_.video-embed_iframe]:w-full [&_.tiptap_.video-embed_iframe]:h-full
          [&_.tiptap_.is-editor-empty:first-child::before]:text-muted-foreground/50 [&_.tiptap_.is-editor-empty:first-child::before]:float-left [&_.tiptap_.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.tiptap_.is-editor-empty:first-child::before]:pointer-events-none [&_.tiptap_.is-editor-empty:first-child::before]:h-0
        "
      />

      {/* Video insert dialog */}
      <Dialog open={videoDialogOpen} onOpenChange={setVideoDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Wstaw film</DialogTitle>
            <DialogDescription>
              Wgraj plik z dysku (do 100 MB) albo wklej link do filmu na YouTube / Vimeo lub bezpośredni .mp4.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <Button
              type="button"
              onClick={pickVideoFile}
              className="w-full justify-center gap-2"
              disabled={videoUploading}
            >
              <Upload size={16} />
              Wgraj plik z komputera (MP4 / WEBM / MOV)
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">albo</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-body text-foreground flex items-center gap-2">
                <LinkIcon size={14} /> Link do filmu
              </label>
              <Input
                type="url"
                value={videoUrlInput}
                onChange={(e) => setVideoUrlInput(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    submitVideoUrl();
                  }
                }}
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button type="button" variant="outline" onClick={() => setVideoDialogOpen(false)}>
              Anuluj
            </Button>
            <Button type="button" onClick={submitVideoUrl} disabled={!videoUrlInput.trim()}>
              Wstaw link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TipTapEditor;
