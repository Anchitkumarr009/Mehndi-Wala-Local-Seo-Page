"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

interface InsertLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (url: string) => void;
  initialUrl?: string;
}

export const InsertLinkModal: React.FC<InsertLinkModalProps> = ({
  isOpen,
  onClose,
  onInsert,
  initialUrl = "",
}) => {
  const [url, setUrl] = useState(initialUrl);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      onInsert(url);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-line rounded-sharp max-w-md w-full p-6 shadow-xl animate-fadeIn">
        <div className="flex items-center justify-between pb-3 border-b border-line mb-4">
          <h3 className="font-serif font-semibold text-lg text-ink m-0">Insert / Edit Link</h3>
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
              Hyperlink URL *
            </label>
            <input
              type="text"
              required
              placeholder="https://... or /india/delhi/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
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
              Apply Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
