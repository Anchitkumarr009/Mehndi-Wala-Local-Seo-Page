"use client";

import React from "react";
import { HelpCircle, Plus, Trash2, ArrowUp, ArrowDown, AlertCircle } from "lucide-react";
import { FaqFormValue } from "@/lib/validations/page";

interface FaqRepeaterProps {
  faqs: FaqFormValue[];
  onChange: (faqs: FaqFormValue[]) => void;
}

export const FaqRepeater: React.FC<FaqRepeaterProps> = ({ faqs, onChange }) => {
  const addFaq = () => {
    onChange([
      ...faqs,
      {
        question: "",
        answer: "",
        order: faqs.length + 1,
      },
    ]);
  };

  const removeFaq = (index: number) => {
    const updated = faqs
      .filter((_, i) => i !== index)
      .map((f, idx) => ({ ...f, order: idx + 1 }));
    onChange(updated);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...faqs];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    onChange(updated.map((f, idx) => ({ ...f, order: idx + 1 })));
  };

  const moveDown = (index: number) => {
    if (index === faqs.length - 1) return;
    const updated = [...faqs];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    onChange(updated.map((f, idx) => ({ ...f, order: idx + 1 })));
  };

  const updateField = (index: number, field: "question" | "answer", val: string) => {
    const updated = [...faqs];
    updated[index] = { ...updated[index], [field]: val };
    onChange(updated);
  };

  return (
    <div className="bg-card border border-line rounded-sharp p-6 shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-line mb-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-stain" />
          <h3 className="font-serif font-semibold text-base text-ink m-0">
            Frequently Asked Questions ({faqs.length})
          </h3>
        </div>
        <button
          type="button"
          onClick={addFaq}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-parchment bg-stain hover:bg-stain-deep rounded-sharp uppercase transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add FAQ</span>
        </button>
      </div>

      {faqs.length < 3 && (
        <div className="mb-4 p-2.5 bg-amber-50 border border-amber-200 rounded-sharp flex items-center gap-2 text-xs text-amber-800">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-600" />
          <span>
            We recommend adding at least 3–6 FAQs to enhance Search &amp; AEO rich snippets.
          </span>
        </div>
      )}

      {faqs.length === 0 ? (
        <div className="text-center py-8 text-xs text-ink-soft border border-dashed border-line rounded-sharp">
          No FAQs added yet. Click &quot;Add FAQ&quot; above to create Q&amp;A items for this locality.
        </div>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-parchment/60 p-4 border border-line rounded-sharp space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stain">Question #{idx + 1}</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => moveUp(idx)}
                    title="Move Up"
                    className="p-1 text-ink-soft hover:text-ink disabled:opacity-30"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === faqs.length - 1}
                    onClick={() => moveDown(idx)}
                    title="Move Down"
                    className="p-1 text-ink-soft hover:text-ink disabled:opacity-30"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeFaq(idx)}
                    title="Delete FAQ"
                    className="p-1 text-red-600 hover:text-red-800 ml-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <input
                  type="text"
                  required
                  placeholder="e.g. How much does bridal mehndi cost in Anand Vihar?"
                  value={faq.question}
                  onChange={(e) => updateField(idx, "question", e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs font-semibold bg-white border border-line rounded-sharp text-ink focus:outline-none focus:border-stain"
                />
              </div>

              <div>
                <textarea
                  required
                  rows={2}
                  placeholder="Detailed answer text..."
                  value={faq.answer}
                  onChange={(e) => updateField(idx, "answer", e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-line rounded-sharp text-ink focus:outline-none focus:border-stain"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
