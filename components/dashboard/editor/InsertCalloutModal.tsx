"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

interface InsertCalloutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (html: string) => void;
}

export const InsertCalloutModal: React.FC<InsertCalloutModalProps> = ({
  isOpen,
  onClose,
  onInsert,
}) => {
  const [kicker, setKicker] = useState("THE REALITY ON THE GROUND");
  const [text, setText] = useState(
    "You don't lack good mehndi artists; it's that finding one who's actually free, actually good, and actually upfront about pricing takes more effort than it should."
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const html = `
<div class="custom-callout">
  <div class="callout-kicker">${kicker}</div>
  <p>${text}</p>
</div>
`;
    onInsert(html);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-line rounded-sharp max-w-md w-full p-6 shadow-xl animate-fadeIn">
        <div className="flex items-center justify-between pb-3 border-b border-line mb-4">
          <h3 className="font-serif font-semibold text-lg text-ink m-0">
            Insert Callout Box
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-ink-soft hover:text-ink p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-ink-soft uppercase mb-1">
              Eyebrow Kicker
            </label>
            <input
              type="text"
              required
              value={kicker}
              onChange={(e) => setKicker(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-line rounded-sharp text-ink focus:outline-none focus:border-stain"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-ink-soft uppercase mb-1">
              Callout Content / Paragraph
            </label>
            <textarea
              required
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-line rounded-sharp text-ink focus:outline-none focus:border-stain"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
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
              Insert Callout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
