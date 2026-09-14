"use client";

import React, { useEffect, useState } from "react";
import { uiLabels } from "@/content/labels";
import { slugify } from "@/lib/utils";

export interface TocItem {
  id: string;
  text: string;
  level?: number;
}

interface TableOfContentsProps {
  headings?: TocItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ headings: initialHeadings = [] }) => {
  const [items, setItems] = useState<TocItem[]>(initialHeadings);
  const [activeId, setActiveId] = useState<string>(initialHeadings[0]?.id || "");

  useEffect(() => {
    if (initialHeadings && initialHeadings.length > 0) {
      setItems(initialHeadings);
      return;
    }

    // Fallback: search DOM if no server headings were passed
    const container = document.getElementById("guide-content");
    if (container) {
      const headingElements = container.querySelectorAll("h2, h3");
      const parsedItems: TocItem[] = [];
      headingElements.forEach((heading, index) => {
        let id = heading.id;
        if (!id) {
          const rawText = heading.textContent || `section-${index}`;
          id = slugify(rawText.replace(/^\d+[\s.]*/, "").trim());
          heading.id = id;
        }
        parsedItems.push({
          id,
          text: (heading.textContent || "").replace(/^\d+[\s.]*/, "").trim(),
          level: heading.tagName.toLowerCase() === "h3" ? 3 : 2,
        });
      });

      // Also check for faq and artist sections
      if (document.getElementById("faq-section")) {
        parsedItems.push({ id: "faq-section", text: "Frequently Asked Questions", level: 2 });
      }
      if (document.getElementById("artists-section")) {
        parsedItems.push({ id: "artists-section", text: "Artist Hub & Local Listings", level: 2 });
      }

      setItems(parsedItems);
    }
  }, [initialHeadings]);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -50% 0px" }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <div className="bg-card border border-line rounded-sharp p-5 shadow-sm">
      <h3 className="font-sans font-bold text-[0.72rem] text-stain uppercase tracking-wider mb-3">
        {uiLabels.sidebar.tocTitle}
      </h3>
      <ol className="space-y-2 text-[0.84rem] list-none p-0 m-0">
        {items.map((item, idx) => {
          const isActive = activeId === item.id;
          return (
            <li
              key={item.id}
              className={`flex items-start gap-2 ${
                item.level === 3 ? "pl-3 text-[0.78rem]" : ""
              }`}
            >
              <span className="font-semibold text-ink-soft/70 select-none text-[0.78rem]">
                {idx + 1}.
              </span>
              <a
                href={`#${item.id}`}
                className={`transition-colors hover:text-stain ${
                  isActive
                    ? "font-bold text-stain underline underline-offset-2"
                    : "text-ink-soft hover:underline"
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
