import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { siteConfig } from "@/content/labels";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-") // Replace spaces and underscores with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars except hyphens
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export function buildCanonicalPath(
  country: string,
  city: string,
  district: string,
  locality: string
): string {
  const c = slugify(country || "");
  const ci = slugify(city || "");
  const d = slugify(district || "");
  const l = slugify(locality || "");
  return `/${c}/${ci}/${d}/${l}`;
}

export function buildCanonicalUrl(
  country: string,
  city: string,
  district: string,
  locality: string
): string {
  const path = buildCanonicalPath(country, city, district, locality);
  return `${siteConfig.baseUrl}${path}`;
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
