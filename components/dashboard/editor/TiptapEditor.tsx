"use client";

import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import {
  Heading2,
  Heading3,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Minus,
  MessageSquare,
  Grid2X2,
  LayoutGrid,
  Code,
  Eye,
} from "lucide-react";
import { InsertCalloutModal } from "./InsertCalloutModal";
import { InsertGridModal } from "./InsertGridModal";
import { InsertFeaturePanelModal } from "./InsertFeaturePanelModal";
import { InsertImageModal } from "./InsertImageModal";
import { InsertLinkModal } from "./InsertLinkModal";

interface TiptapEditorProps {
  value: string;
  initialJson?: any;
  onChange: (html: string, json: any) => void;
}

export const TiptapEditor: React.FC<TiptapEditorProps> = ({
  value,
  initialJson,
  onChange,
}) => {
  const [isCalloutOpen, setIsCalloutOpen] = useState(false);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [isFeatureOpen, setIsFeatureOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isLinkOpen, setIsLinkOpen] = useState(false);
  const [htmlMode, setHtmlMode] = useState(false);
  const [rawHtml, setRawHtml] = useState(value || "");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-stain underline",
        },
      }),
      ImageExtension.configure({
        inline: false,
        HTMLAttributes: {
          class: "rich-inline-img",
        },
      }),
    ],
    content: initialJson ? initialJson : value || "<p></p>",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const json = editor.getJSON();
      setRawHtml(html);
      onChange(html, json);
    },
    editorProps: {
      attributes: {
        class:
          "prose max-w-none p-4 min-h-[450px] bg-white text-ink focus:outline-none font-sans rich-content",
      },
    },
  });

  const handleInsertHtml = (htmlChunk: string) => {
    if (editor) {
      editor.commands.insertContent(htmlChunk);
      const updatedHtml = editor.getHTML();
      const updatedJson = editor.getJSON();
      setRawHtml(updatedHtml);
      onChange(updatedHtml, updatedJson);
    }
  };

  const handleRawHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newHtml = e.target.value;
    setRawHtml(newHtml);
    if (editor) {
      editor.commands.setContent(newHtml);
      onChange(newHtml, editor.getJSON());
    } else {
      onChange(newHtml, null);
    }
  };

  const handleInsertImage = (url: string, alt: string, caption?: string) => {
    if (caption) {
      const figureHtml = `
<figure class="rich-figure">
  <img src="${url}" alt="${alt}" />
  <figcaption>${caption}</figcaption>
</figure>
`;
      handleInsertHtml(figureHtml);
    } else {
      if (editor) {
        editor.chain().focus().setImage({ src: url, alt }).run();
      }
    }
  };

  const handleApplyLink = (url: string) => {
    if (editor) {
      if (url === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
      } else {
        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
      }
    }
  };

  if (!editor) {
    return (
      <div className="border border-line rounded-sharp p-8 bg-card text-center text-xs text-ink-soft">
        Loading rich text editor...
      </div>
    );
  }

  return (
    <div className="border border-line rounded-sharp overflow-hidden bg-card shadow-sm">
      {/* Toolbar */}
      <div className="bg-parchment-deep border-b border-line p-2 flex flex-wrap items-center gap-1">
        {/* H2 */}
        <button
          type="button"
          title="Heading 2"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-1.5 rounded-sharp text-xs font-bold transition-colors ${
            editor.isActive("heading", { level: 2 })
              ? "bg-stain text-parchment"
              : "text-ink hover:bg-parchment"
          }`}
        >
          <Heading2 className="w-4 h-4" />
        </button>

        {/* H3 */}
        <button
          type="button"
          title="Heading 3"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-1.5 rounded-sharp text-xs font-bold transition-colors ${
            editor.isActive("heading", { level: 3 })
              ? "bg-stain text-parchment"
              : "text-ink hover:bg-parchment"
          }`}
        >
          <Heading3 className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-line-strong mx-1" />

        {/* Bold */}
        <button
          type="button"
          title="Bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded-sharp text-xs font-bold transition-colors ${
            editor.isActive("bold")
              ? "bg-stain text-parchment"
              : "text-ink hover:bg-parchment"
          }`}
        >
          <Bold className="w-4 h-4" />
        </button>

        {/* Italic */}
        <button
          type="button"
          title="Italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded-sharp text-xs font-bold transition-colors ${
            editor.isActive("italic")
              ? "bg-stain text-parchment"
              : "text-ink hover:bg-parchment"
          }`}
        >
          <Italic className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-line-strong mx-1" />

        {/* Bullet List */}
        <button
          type="button"
          title="Bullet List"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded-sharp text-xs font-bold transition-colors ${
            editor.isActive("bulletList")
              ? "bg-stain text-parchment"
              : "text-ink hover:bg-parchment"
          }`}
        >
          <List className="w-4 h-4" />
        </button>

        {/* Numbered List */}
        <button
          type="button"
          title="Numbered List"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded-sharp text-xs font-bold transition-colors ${
            editor.isActive("orderedList")
              ? "bg-stain text-parchment"
              : "text-ink hover:bg-parchment"
          }`}
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        {/* Blockquote */}
        <button
          type="button"
          title="Blockquote"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1.5 rounded-sharp text-xs font-bold transition-colors ${
            editor.isActive("blockquote")
              ? "bg-stain text-parchment"
              : "text-ink hover:bg-parchment"
          }`}
        >
          <Quote className="w-4 h-4" />
        </button>

        {/* Horizontal Rule */}
        <button
          type="button"
          title="Horizontal Divider"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-1.5 rounded-sharp text-xs text-ink hover:bg-parchment transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-line-strong mx-1" />

        {/* Link */}
        <button
          type="button"
          title="Link"
          onClick={() => setIsLinkOpen(true)}
          className={`p-1.5 rounded-sharp text-xs font-bold transition-colors ${
            editor.isActive("link")
              ? "bg-stain text-parchment"
              : "text-ink hover:bg-parchment"
          }`}
        >
          <LinkIcon className="w-4 h-4" />
        </button>

        {/* Image */}
        <button
          type="button"
          title="Image with Caption"
          onClick={() => setIsImageOpen(true)}
          className="p-1.5 rounded-sharp text-xs text-ink hover:bg-parchment transition-colors"
        >
          <ImageIcon className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-line-strong mx-1" />

        {/* Custom Block 1: Callout Box */}
        <button
          type="button"
          onClick={() => setIsCalloutOpen(true)}
          className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold text-stain bg-white hover:bg-parchment border border-line-strong rounded-sharp transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>+ Callout Box</span>
        </button>

        {/* Custom Block 2: Numbered Grid */}
        <button
          type="button"
          onClick={() => setIsGridOpen(true)}
          className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold text-stain bg-white hover:bg-parchment border border-line-strong rounded-sharp transition-colors"
        >
          <Grid2X2 className="w-3.5 h-3.5" />
          <span>+ Numbered Grid</span>
        </button>

        {/* Custom Block 3: Feature Panel */}
        <button
          type="button"
          onClick={() => setIsFeatureOpen(true)}
          className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold text-parchment bg-stain-deep hover:bg-stain rounded-sharp transition-colors"
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>+ Feature Panel</span>
        </button>

        {/* Toggle Raw HTML View */}
        <div className="ml-auto">
          <button
            type="button"
            onClick={() => setHtmlMode(!htmlMode)}
            className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-ink-soft hover:text-ink bg-white border border-line rounded-sharp transition-colors"
          >
            {htmlMode ? (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>Visual</span>
              </>
            ) : (
              <>
                <Code className="w-3.5 h-3.5" />
                <span>HTML</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor Surface */}
      {htmlMode ? (
        <textarea
          rows={20}
          value={rawHtml}
          onChange={handleRawHtmlChange}
          className="w-full p-4 font-mono text-xs bg-gray-900 text-green-400 focus:outline-none min-h-[450px]"
        />
      ) : (
        <EditorContent editor={editor} />
      )}

      {/* Structured Content Insertion Modals */}
      <InsertCalloutModal
        isOpen={isCalloutOpen}
        onClose={() => setIsCalloutOpen(false)}
        onInsert={handleInsertHtml}
      />

      <InsertGridModal
        isOpen={isGridOpen}
        onClose={() => setIsGridOpen(false)}
        onInsert={handleInsertHtml}
      />

      <InsertFeaturePanelModal
        isOpen={isFeatureOpen}
        onClose={() => setIsFeatureOpen(false)}
        onInsert={handleInsertHtml}
      />

      <InsertImageModal
        isOpen={isImageOpen}
        onClose={() => setIsImageOpen(false)}
        onInsert={handleInsertImage}
      />

      <InsertLinkModal
        isOpen={isLinkOpen}
        onClose={() => setIsLinkOpen(false)}
        onInsert={handleApplyLink}
        initialUrl={editor.getAttributes("link").href || ""}
      />
    </div>
  );
};
