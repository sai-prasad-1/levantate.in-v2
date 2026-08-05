"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { useEffect, useState } from "react";

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
};

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-ember underline" } }),
      Image.configure({ HTMLAttributes: { class: "rounded-xl my-4 max-w-full" } }),
      Placeholder.configure({ placeholder: "Write the note…" }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor: ed }) => onChange(ed.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose-admin min-h-[360px] max-w-none px-5 py-4 text-[15.5px] leading-[1.7] outline-none",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  async function uploadImage() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg,image/png,image/webp,image/gif";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file || !editor) return;
      setUploading(true);
      try {
        const form = new FormData();
        form.append("file", file);
        const res = await fetch("/api/admin/media", { method: "POST", body: form });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");
        editor.chain().focus().setImage({ src: data.url }).run();
      } catch (err) {
        alert(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
      }
    };
    input.click();
  }

  if (!editor) return null;

  return (
    <div className="overflow-hidden rounded-[16px] border border-[rgba(22,21,15,0.12)] bg-white">
      <div className="flex flex-wrap gap-1 border-b border-[rgba(22,21,15,0.08)] bg-panel-warm/60 px-2 py-2">
        <ToolbarBtn
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          label="B"
        />
        <ToolbarBtn
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          label="I"
        />
        <ToolbarBtn
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          label="U"
        />
        <ToolbarBtn
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          label="H2"
        />
        <ToolbarBtn
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          label="H3"
        />
        <ToolbarBtn
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          label="• List"
        />
        <ToolbarBtn
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          label="1. List"
        />
        <ToolbarBtn
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          label="Quote"
        />
        <ToolbarBtn
          active={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          label="Code"
        />
        <ToolbarBtn
          onClick={() => {
            const href = window.prompt("Link URL");
            if (!href) return;
            editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
          }}
          label="Link"
        />
        <ToolbarBtn onClick={uploadImage} label={uploading ? "…" : "Image"} />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

function ToolbarBtn({
  label,
  onClick,
  active,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ${
        active
          ? "bg-ink text-bone"
          : "bg-transparent text-[rgba(22,21,15,0.65)] hover:bg-[rgba(22,21,15,0.06)]"
      }`}
    >
      {label}
    </button>
  );
}
