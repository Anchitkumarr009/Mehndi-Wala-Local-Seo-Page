import { slugify } from "./utils";

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

/**
 * Parses bodyHtml, ensures every <h2> and <h3> has an id,
 * and extracts an array of headings for the Table of Contents.
 */
export function processHeadings(bodyHtml: string, extraSections?: { id: string; text: string }[]): {
  processedHtml: string;
  headings: HeadingItem[];
} {
  if (!bodyHtml) {
    return {
      processedHtml: "",
      headings: extraSections ? extraSections.map((s) => ({ id: s.id, text: s.text, level: 2 })) : [],
    };
  }

  const headings: HeadingItem[] = [];
  let index = 0;

  // Replace <h2...> and <h3...> to ensure they have unique anchor IDs
  const processedHtml = bodyHtml.replace(
    /<h(2|3)([^>]*)>(.*?)<\/h\1>/gi,
    (match, levelStr, attrs, innerContent) => {
      index++;
      const level = parseInt(levelStr, 10);
      // Strip HTML tags from inner text
      const cleanText = innerContent.replace(/<[^>]*>/g, "").trim();

      // Check if id already exists in attrs
      const idMatch = attrs.match(/id=["']([^"']+)["']/i);
      let id = idMatch ? idMatch[1] : "";

      if (!id) {
        id = slugify(cleanText.replace(/^\d+[\s.]*/, "").trim()) || `section-${index}`;
      }

      headings.push({
        id,
        text: cleanText.replace(/^\d+[\s.]*/, "").trim(),
        level,
      });

      // Remove existing id from attrs if any, then prepend new id
      const cleanAttrs = attrs.replace(/\s*id=["'][^"']*["']/i, "").trim();
      const newAttrs = cleanAttrs ? ` id="${id}" ${cleanAttrs}` : ` id="${id}"`;

      return `<h${level}${newAttrs}>${innerContent}</h${level}>`;
    }
  );

  if (extraSections) {
    for (const extra of extraSections) {
      headings.push({
        id: extra.id,
        text: extra.text,
        level: 2,
      });
    }
  }

  return {
    processedHtml,
    headings,
  };
}
