"use client";

import React, { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";

interface GridItem {
  title: string;
  description: string;
}

interface InsertGridModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (html: string) => void;
}

export const InsertGridModal: React.FC<InsertGridModalProps> = ({
  isOpen,
  onClose,
  onInsert,
}) => {
  const [variant, setVariant] = useState<"grid-2x2" | "list">("grid-2x2");
  const [items, setItems] = useState<GridItem[]>([
    {
      title: "Design Scope Ambiguity",
      description:
        "You don't know if the artist does simple designs, fine bridal work, or both until they arrive.",
    },
    {
      title: "Mystery Pricing",
      description:
        "Pricing is a mystery until you personally message, wait hours for a reply, or get quoted unexpectedly.",
    },
    {
      title: "Unconfirmed Dates",
      description:
        "There's no way to confirm they're actually free on your date until the very last minute.",
    },
    {
      title: "Zero Accountability",
      description:
        "If the final pattern doesn't match what was promised, there's nowhere to raise it or get a resolution.",
    },
  ]);

  if (!isOpen) return null;

  const addItem = () => {
    setItems([...items, { title: "", description: "" }]);
  };

  const removeItem = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  const updateItem = (idx: number, field: "title" | "description", val: string) => {
    const updated = [...items];
    updated[idx][field] = val;
    setItems(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let html = "";
    if (variant === "grid-2x2") {
      const cardsHtml = items
        .map(
          (item, i) => `
  <div class="custom-problem-card">
    <div class="problem-num">${i + 1}</div>
    <h4>${item.title}</h4>
    <p>${item.description}</p>
  </div>`
        )
        .join("");

      html = `<div class="custom-problem-grid">${cardsHtml}</div>\n`;
    } else {
      const listHtml = items
        .map(
          (item, i) => `
  <div class="custom-checklist-item">
    <div class="checklist-num">${i + 1}</div>
    <div class="checklist-body">
      <h4>${item.title}</h4>
      <p>${item.description}</p>
    </div>
  </div>`
        )
        .join("");

      html = `<div class="custom-checklist">${listHtml}</div>\n`;
    }

    onInsert(html);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-line rounded-sharp max-w-xl w-full p-6 shadow-xl max-h-[90vh] flex flex-col animate-fadeIn">
        <div className="flex items-center justify-between pb-3 border-b border-line mb-4">
          <h3 className="font-serif font-semibold text-lg text-ink m-0">
            Insert Numbered Grid / Checklist Block
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-ink-soft hover:text-ink p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-4 pr-1">
          {/* Variant Toggle */}
          <div>
            <label className="block text-xs font-bold text-ink-soft uppercase mb-1.5">
              Layout Variant
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setVariant("grid-2x2")}
                className={`py-2 px-3 text-xs font-bold rounded-sharp border transition-colors ${
                  variant === "grid-2x2"
                    ? "bg-stain text-parchment border-stain"
                    : "bg-white text-ink border-line hover:bg-parchment"
                }`}
              >
                2×2 Problem Grid (Marigold Badges)
              </button>
              <button
                type="button"
                onClick={() => setVariant("list")}
                className={`py-2 px-3 text-xs font-bold rounded-sharp border transition-colors ${
                  variant === "list"
                    ? "bg-stain text-parchment border-stain"
                    : "bg-white text-ink border-line hover:bg-parchment"
                }`}
              >
                Numbered Checklist (Maroon Badges)
              </button>
            </div>
          </div>

          {/* Items List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-ink-soft uppercase">
                Grid Items ({items.length})
              </label>
              <button
                type="button"
                onClick={addItem}
                className="inline-flex items-center gap-1 text-xs font-bold text-stain hover:underline"
              >
                <Plus className="w-3.5 h-3.5" /> Add Item
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-parchment/60 p-3 border border-line rounded-sharp space-y-2 relative"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-stain">Item #{idx + 1}</span>
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(idx)}
                        className="text-red-600 hover:text-red-800 p-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Title (e.g. Mystery Pricing)"
                    value={item.title}
                    onChange={(e) => updateItem(idx, "title", e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-line rounded-sharp text-ink focus:outline-none focus:border-stain"
                  />
                  <textarea
                    required
                    rows={2}
                    placeholder="Description line..."
                    value={item.description}
                    onChange={(e) => updateItem(idx, "description", e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-line rounded-sharp text-ink focus:outline-none focus:border-stain"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-line flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-ink-soft hover:bg-parchment border border-line rounded-sharp uppercase"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-parchment bg-stain hover:bg-stain-deep rounded-sharp uppercase"
            >
              Insert Block
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
