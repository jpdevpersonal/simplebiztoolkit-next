/**
 * TipTap Rich Text Editor Component
 * Provides a WYSIWYG editing experience with theme-aware styling
 */

"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { useCallback, useEffect } from "react";
import type { TipTapDocument } from "@/types/api";

// ==============================================
// Types
// ==============================================

interface RichTextEditorProps {
  content: TipTapDocument | null;
  onChange: (content: TipTapDocument) => void;
  placeholder?: string;
  onImageUpload?: (file: File) => Promise<string>;
}

// ==============================================
// Custom Callout Extension
// ==============================================

import { Node, mergeAttributes } from "@tiptap/core";

const Callout = Node.create({
  name: "callout",
  group: "block",
  content: "block+",

  addAttributes() {
    return {
      type: {
        default: "info",
        parseHTML: (element: HTMLElement) =>
          element.getAttribute("data-callout-type"),
        renderHTML: (attributes: Record<string, string>) => ({
          "data-callout-type": attributes.type,
        }),
      },
      title: {
        default: "",
        parseHTML: (element: HTMLElement) =>
          element.getAttribute("data-callout-title"),
        renderHTML: (attributes: Record<string, string>) => ({
          "data-callout-title": attributes.title,
        }),
      },
    };
  },

  parseHTML() {
    return [{ tag: "aside[data-callout]" }];
  },

  renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, unknown> }) {
    return [
      "aside",
      mergeAttributes(HTMLAttributes, { "data-callout": "" }),
      0,
    ];
  },
});

// ==============================================
// Editor Component
// ==============================================

export function RichTextEditor({
  content,
  onChange,
  placeholder = "Start writing...",
  onImageUpload,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: "noopener noreferrer",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "editor-image",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Underline,
      Callout,
    ],
    content: (content as object) || { type: "doc", content: [] },
    onUpdate: ({ editor: ed }: { editor: Editor }) => {
      const json = ed.getJSON() as TipTapDocument;
      onChange(json);
    },
    editorProps: {
      attributes: {
        class: "editor-content prose",
      },
    },
  });

  // Handle image paste/drop
  useEffect(() => {
    if (!editor || !onImageUpload) return;

    const handlePaste = async (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.startsWith("image/")) {
          event.preventDefault();
          const file = item.getAsFile();
          if (file) {
            const url = await onImageUpload(file);
            editor.chain().focus().setImage({ src: url }).run();
          }
          break;
        }
      }
    };

    const editorElement = editor.view.dom;
    editorElement.addEventListener("paste", handlePaste);

    return () => {
      editorElement.removeEventListener("paste", handlePaste);
    };
  }, [editor, onImageUpload]);

  if (!editor) {
    return <div className="editor-loading">Loading editor...</div>;
  }

  return (
    <div className="editor-wrapper">
      <EditorToolbar editor={editor} onImageUpload={onImageUpload} />
      <EditorContent editor={editor} className="editor-body" />
    </div>
  );
}

// ==============================================
// Toolbar Component
// ==============================================

function EditorToolbar({
  editor,
  onImageUpload,
}: {
  editor: Editor;
  onImageUpload?: (file: File) => Promise<string>;
}) {
  const addLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(async () => {
    if (onImageUpload) {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = async () => {
        const file = input.files?.[0];
        if (file) {
          const url = await onImageUpload(file);
          editor.chain().focus().setImage({ src: url }).run();
        }
      };
      input.click();
    } else {
      const url = window.prompt("Enter image URL");
      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    }
  }, [editor, onImageUpload]);

  const addCallout = useCallback(
    (type: string) => {
      const title = window.prompt("Callout title (optional)");
      editor
        .chain()
        .focus()
        .insertContent({
          type: "callout",
          attrs: { type, title: title || "" },
          content: [{ type: "paragraph" }],
        })
        .run();
    },
    [editor],
  );

  return (
    <div className="editor-toolbar">
      <div className="editor-toolbar-group">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Bold"
        >
          <BoldIcon />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italic"
        >
          <ItalicIcon />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          title="Underline"
        >
          <UnderlineIcon />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
          title="Strikethrough"
        >
          <StrikeIcon />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          active={editor.isActive("code")}
          title="Inline Code"
        >
          <CodeIcon />
        </ToolbarButton>
      </div>

      <div className="editor-toolbar-divider" />

      <div className="editor-toolbar-group">
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          active={editor.isActive("heading", { level: 2 })}
          title="Heading 2"
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          active={editor.isActive("heading", { level: 3 })}
          title="Heading 3"
        >
          H3
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          active={editor.isActive("heading", { level: 4 })}
          title="Heading 4"
        >
          H4
        </ToolbarButton>
      </div>

      <div className="editor-toolbar-divider" />

      <div className="editor-toolbar-group">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="Bullet List"
        >
          <ListIcon />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="Numbered List"
        >
          <OrderedListIcon />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          title="Quote"
        >
          <QuoteIcon />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive("codeBlock")}
          title="Code Block"
        >
          <CodeBlockIcon />
        </ToolbarButton>
      </div>

      <div className="editor-toolbar-divider" />

      <div className="editor-toolbar-group">
        <ToolbarButton
          onClick={addLink}
          active={editor.isActive("link")}
          title="Link"
        >
          <LinkIcon />
        </ToolbarButton>
        <ToolbarButton onClick={addImage} title="Image">
          <ImageIcon />
        </ToolbarButton>
      </div>

      <div className="editor-toolbar-divider" />

      <div className="editor-toolbar-group">
        <select
          className="editor-toolbar-select"
          onChange={(e) => {
            if (e.target.value) {
              addCallout(e.target.value);
              e.target.value = "";
            }
          }}
          value=""
        >
          <option value="">+ Callout</option>
          <option value="info">Info</option>
          <option value="warning">Warning</option>
          <option value="success">Success</option>
          <option value="error">Error</option>
        </select>
      </div>

      <div className="editor-toolbar-divider" />

      <div className="editor-toolbar-group">
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal Rule"
        >
          <HrIcon />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo"
        >
          <UndoIcon />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo"
        >
          <RedoIcon />
        </ToolbarButton>
      </div>
    </div>
  );
}

// ==============================================
// Toolbar Button Component
// ==============================================

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`editor-toolbar-btn ${active ? "active" : ""}`}
    >
      {children}
    </button>
  );
}

// ==============================================
// Icons
// ==============================================

function BoldIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
      <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
    </svg>
  );
}

function ItalicIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="19" y1="4" x2="10" y2="4" />
      <line x1="14" y1="20" x2="5" y2="20" />
      <line x1="15" y1="4" x2="9" y2="20" />
    </svg>
  );
}

function UnderlineIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" />
      <line x1="4" y1="21" x2="20" y2="21" />
    </svg>
  );
}

function StrikeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="4" y1="12" x2="20" y2="12" />
      <path d="M17.5 7.5c-.7-1-2.2-2-4.5-2-3 0-5 1.5-5 4 0 1.7 1 2.8 3 3.5" />
      <path d="M8.5 16.5c.7 1 2.2 2 4.5 2 3 0 5-1.5 5-4 0-.5-.1-1-.3-1.5" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <circle cx="4" cy="6" r="1" fill="currentColor" />
      <circle cx="4" cy="12" r="1" fill="currentColor" />
      <circle cx="4" cy="18" r="1" fill="currentColor" />
    </svg>
  );
}

function OrderedListIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="10" y1="6" x2="21" y2="6" />
      <line x1="10" y1="12" x2="21" y2="12" />
      <line x1="10" y1="18" x2="21" y2="18" />
      <text x="3" y="7" fontSize="6" fill="currentColor" stroke="none">
        1
      </text>
      <text x="3" y="13" fontSize="6" fill="currentColor" stroke="none">
        2
      </text>
      <text x="3" y="19" fontSize="6" fill="currentColor" stroke="none">
        3
      </text>
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
    </svg>
  );
}

function CodeBlockIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <polyline points="8 10 5 12 8 14" />
      <polyline points="16 10 19 12 16 14" />
      <line x1="12" y1="8" x2="12" y2="16" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function HrIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="3" y1="12" x2="21" y2="12" />
    </svg>
  );
}

function UndoIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  );
}

function RedoIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
  );
}
