import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Node, mergeAttributes } from '@tiptap/core';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import {
  Bold, Italic, Heading2, Heading3, List, ListOrdered,
  Quote, ImageIcon, LinkIcon, Undo, Redo, Minus, Video,
} from 'lucide-react';
import { useRef } from 'react';

interface TipTapEditorProps {
  content: string;
  onChange: (html: string) => void;
}

// ----------------------- Video Embed Extension -----------------------
// Obsługuje zarówno <video src=...> (wgrane pliki / bezpośrednie .mp4)
// jak i <iframe> z YouTube/Vimeo opakowane w <div class="video-embed">.

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

    return [
      'video',
      mergeAttributes({
        src,
        controls: 'true',
        preload: 'metadata',
        playsinline: 'true',
        class: 'blog-video',
      }),
    ];
  },
});

// ----------------------- URL parser -----------------------

function parseVideoUrl(rawUrl: string): { src: string; kind: 'youtube' | 'vimeo' | 'file' } | null {
  const url = rawUrl.trim();
  if (!url) return null;

  // YouTube: watch?v=, youtu.be/, /embed/, /shorts/
  const yt = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/,
  );
  if (yt) {
    return { src: `https://www.youtube-nocookie.com/embed/${yt[1]}`, kind: 'youtube' };
  }

  // Vimeo
  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) {
    return { src: `https://player.vimeo.com/video/${vm[1]}`, kind: 'vimeo' };
  }

  // Bezpośredni plik wideo
  if (/\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(url)) {
    return { src: url, kind: 'file' };
  }

  return null;
}

// ----------------------- Toolbar Button -----------------------

const MenuButton = ({ onClick, active, children, title }: {
  onClick: () => void; active?: boolean; children: React.ReactNode; title: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={`p-2 rounded transition-colors ${active ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}
  >
    {children}
  </button>
);

const TipTapEditor = ({ content, onChange }: TipTapEditorProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

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
    if (!file) return;

    const maxSize = 100 * 1024 * 1024; // 100 MB
    if (file.size > maxSize) {
      toast({
        title: 'Plik jest za duży',
        description: 'Maksymalny rozmiar to 100 MB. Skompresuj film lub wstaw link z YouTube/Vimeo.',
        variant: 'destructive',
      });
      e.target.value = '';
      return;
    }

    toast({ title: 'Wgrywam film…', description: 'To może chwilę potrwać.' });

    const ext = file.name.split('.').pop()?.toLowerCase() || 'mp4';
    const fileName = `videos/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error } = await supabase.storage
      .from('blog-images')
      .upload(fileName, file, { contentType: file.type, cacheControl: '3600' });

    if (error) {
      toast({ title: 'Błąd przesyłania filmu', description: error.message, variant: 'destructive' });
      e.target.value = '';
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from('blog-images').getPublicUrl(fileName);

    editor.chain().focus().insertContent({
      type: 'videoEmbed',
      attrs: { src: publicUrl, kind: 'file' },
    }).run();

    toast({ title: 'Film dodany', description: 'Pamiętaj, aby zapisać wpis.' });
    e.target.value = '';
  };

  const addVideo = () => {
    const choice = window.prompt(
      'Wstaw film:\n\n• Wpisz LINK z YouTube lub Vimeo (np. https://youtu.be/abc123)\n• albo bezpośredni adres pliku .mp4\n• albo wpisz "plik" aby wgrać film z dysku',
    );
    if (!choice) return;

    if (choice.trim().toLowerCase() === 'plik') {
      videoInputRef.current?.click();
      return;
    }

    const parsed = parseVideoUrl(choice);
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
        <MenuButton onClick={addVideo} title="Wstaw film (YouTube, Vimeo lub plik)">
          <Video size={16} />
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
          [&_.tiptap_video]:w-full [&_.tiptap_video]:rounded-lg [&_.tiptap_video]:my-6 [&_.tiptap_video]:bg-black
          [&_.tiptap_.video-embed]:relative [&_.tiptap_.video-embed]:w-full [&_.tiptap_.video-embed]:my-6 [&_.tiptap_.video-embed]:rounded-lg [&_.tiptap_.video-embed]:overflow-hidden [&_.tiptap_.video-embed]:bg-black [&_.tiptap_.video-embed]:aspect-video
          [&_.tiptap_.video-embed_iframe]:absolute [&_.tiptap_.video-embed_iframe]:inset-0 [&_.tiptap_.video-embed_iframe]:w-full [&_.tiptap_.video-embed_iframe]:h-full
          [&_.tiptap_.is-editor-empty:first-child::before]:text-muted-foreground/50 [&_.tiptap_.is-editor-empty:first-child::before]:float-left [&_.tiptap_.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.tiptap_.is-editor-empty:first-child::before]:pointer-events-none [&_.tiptap_.is-editor-empty:first-child::before]:h-0
        "
      />
    </div>
  );
};

export default TipTapEditor;
