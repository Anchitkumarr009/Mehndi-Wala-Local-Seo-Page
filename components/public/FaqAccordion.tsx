"use client";

import React, { useState } from "react";
import { uiLabels } from "@/content/labels";

export interface FaqItem {
  id?: string;
  question: string;
  answer: string;
  order?: number;
}

interface FaqAccordionProps {
  items: FaqItem[];
  localityLabel?: string;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  items,
  localityLabel = "",
}) => {
  // Keep track of the currently opened FAQ index (-1 means all closed)
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default
  const [allOpen, setAllOpen] = useState(false);

  const toggleItem = (idx: number) => {
    if (allOpen) {
      setAllOpen(false);
      setOpenIndex(idx);
    } else {
      setOpenIndex((prev) => (prev === idx ? null : idx));
    }
  };

  const handleToggleAll = () => {
    if (allOpen) {
      setAllOpen(false);
      setOpenIndex(null);
    } else {
      setAllOpen(true);
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <section id="faq-section" className="mt-14 pt-8 border-t border-line scroll-mt-20">
      <div className="flex items-baseline justify-between gap-4 mb-2">
        <div>
          <span className="text-[0.78rem] font-bold text-stain uppercase tracking-wider block mb-1">
            {uiLabels.faq.kicker}
          </span>
          <h2 className="font-serif font-semibold text-2xl md:text-3xl text-ink m-0">
            {uiLabels.faq.title}
          </h2>
        </div>
        <button
          type="button"
          onClick={handleToggleAll}
          className="text-xs font-bold text-stain hover:text-stain-deep uppercase tracking-wider cursor-pointer select-none py-1 px-2 border border-line-strong rounded-sharp hover:bg-card transition-colors"
        >
          {allOpen ? "COLLAPSE ALL" : uiLabels.faq.toggleAll}
        </button>
      </div>

      <div className="mt-6 border-t border-line divide-y divide-line">
        {items.map((item, idx) => {
          const isOpen = allOpen || openIndex === idx;
          return (
            <div key={item.id || idx} className="group">
              <button
                type="button"
                onClick={() => toggleItem(idx)}
                aria-expanded={isOpen}
                className="w-full text-left py-4 md:py-5 flex items-center justify-between gap-4 cursor-pointer select-none group-hover:text-stain transition-colors"
              >
                <span className="font-serif font-semibold text-base md:text-lg text-ink group-hover:text-stain transition-colors leading-snug">
                  {idx + 1}. {item.question}
                </span>
                <span
                  className={`text-xl font-light text-stain flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {isOpen && (
                <div className="pb-5 pr-8 text-sm md:text-[0.95rem] text-ink-soft leading-relaxed animate-fadeIn">
                  <p className="m-0" dangerouslySetInnerHTML={{ __html: item.answer }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
