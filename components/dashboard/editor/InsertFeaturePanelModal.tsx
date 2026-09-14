"use client";

import React, { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";

interface FeatureItem {
  title: string;
  description: string;
}

interface InsertFeaturePanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (html: string) => void;
}

export const InsertFeaturePanelModal: React.FC<InsertFeaturePanelModalProps> = ({
  isOpen,
  onClose,
  onInsert,
}) => {
  const [items, setItems] = useState<FeatureItem[]>([
    {
      title: "Verified Artist Profiles",
      description:
        "Genuine, non-reposted photos and transparent artist profiles so you know exactly what you're booking.",
    },
    {
      title: "Upfront Pricing",
      description:
        "Clear breakdown per hand and package, so there's no guessing game before you even start the conversation.",
    },
    {
      title: "Real-Time Availability",
      description:
        "Instant visibility on open slots so you're not left wondering if your date and time slot works.",
    },
    {
      title: "Genuine Trust Score",
      description:
        "Built from real customer verification and post-event reviews, not just star ratings that can be gamed.",
    },
  ]);

  const [highlight, setHighlight] = useState(
    "The goal is simple: booking a mehndi artist should feel as easy as booking anything else you plan for a function — not an exercise to test your patience."
  );

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

    const itemsHtml = items
      .map(
        (item) => `
    <div class="feature-item">
      <span class="feature-icon">✓</span>
      <div>
        <h4>${item.title}</h4>
        <p>${item.description}</p>
      </div>
    </div>`
      )
      .join("");

    const highlightHtml = highlight
      ? `<div class="feature-highlight">${highlight}</div>`
      : "";

    const html = `
<div class="custom-feature-panel">
  <div class="feature-grid">
    ${itemsHtml}
  </div>
  ${highlightHtml}
</div>
`;

    onInsert(html);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-line rounded-sharp max-w-xl w-full p-6 shadow-xl max-h-[90vh] flex flex-col animate-fadeIn">
        <div className="flex items-center justify-between pb-3 border-b border-line mb-4">
          <h3 className="font-serif font-semibold text-lg text-ink m-0">
            Insert Maroon Feature Panel
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
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-ink-soft uppercase">
                Feature Items ({items.length})
              </label>
              <button
                type="button"
                onClick={addItem}
                className="inline-flex items-center gap-1 text-xs font-bold text-stain hover:underline"
              >
                <Plus className="w-3.5 h-3.5" /> Add Feature
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-parchment/60 p-3 border border-line rounded-sharp space-y-2 relative"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-stain">Feature #{idx + 1}</span>
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
                    placeholder="Title (e.g. Upfront Pricing)"
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

          <div>
            <label className="block text-xs font-bold text-ink-soft uppercase mb-1">
              Bottom Highlight Banner (Optional)
            </label>
            <textarea
              rows={2}
              value={highlight}
              onChange={(e) => setHighlight(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-line rounded-sharp text-ink focus:outline-none focus:border-stain"
            />
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
              Insert Feature Panel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
