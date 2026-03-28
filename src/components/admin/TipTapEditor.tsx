import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { supabase } from '@/integrations/supabase/client';
import {
  Bold, Italic, Heading2, Heading3, List, ListOrdered,
  Quote, ImageIcon, LinkIcon, Undo, Redo, Minus
} from 'lucide-react';
import { useRef } from 'react';

interface TipTapEditorProps {
  content: string;
  onChange: (html: string) => void;
}

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

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false, autolink: true }),
      Placeholder.configure({ placeholder: 'Zacznij pisać treść artykułu...' }),
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
      alert('Błąd przesyłania zdjęcia: ' + error.message);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('blog-images')
      .getPublicUrl(fileName);

    editor.chain().focus().setImage({ src: publicUrl }).run();
    e.target.value = '';
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
          [&_.tiptap_.is-editor-empty:first-child::before]:text-muted-foreground/50 [&_.tiptap_.is-editor-empty:first-child::before]:float-left [&_.tiptap_.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.tiptap_.is-editor-empty:first-child::before]:pointer-events-none [&_.tiptap_.is-editor-empty:first-child::before]:h-0
        "
      />
    </div>
  );
};

export default TipTapEditor;
