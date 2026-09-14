"use client";

import React from "react";
import { Globe, Image as ImageIcon, Sparkles } from "lucide-react";

interface SeoCardProps {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  dek: string;
  heroImageUrl: string;
  heroImageAlt: string;
  readTime: string;
  ratingValue: number;
  reviewCount: number;
  onChange: (fields: Partial<{
    metaTitle: string;
    metaDescription: string;
    h1: string;
    dek: string;
    heroImageUrl: string;
    heroImageAlt: string;
    readTime: string;
    ratingValue: number;
    reviewCount: number;
  }>) => void;
}

const PRESET_HERO_IMAGES = [
  {
    label: "Traditional Bridal Artistry",
    url: "https://images.unsplash.com/photo-1599818816933-289d0c64bead?q=80&w=1200&auto=format&fit=crop",
    alt: "Traditional Bridal Mehndi Artistry",
  },
  {
    label: "Fine-Line Intricate Palms",
    url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop",
    alt: "Intricate Fine-Line Bridal Henna",
  },
  {
    label: "Royal Rajasthani Patterns",
    url: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?q=80&w=1200&auto=format&fit=crop",
    alt: "Royal Rajasthani Bridal Henna Pattern",
  },
  {
    label: "Indo-Arabic Floral Hands",
    url: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1200&auto=format&fit=crop",
    alt: "Indo-Arabic Floral Mehndi Design",
  },
];

export const SeoCard: React.FC<SeoCardProps> = ({
  metaTitle,
  metaDescription,
  h1,
  dek,
  heroImageUrl,
  heroImageAlt,
  readTime,
  ratingValue,
  reviewCount,
  onChange,
}) => {
  const titleLen = metaTitle.length;
  const descLen = metaDescription.length;

  const getTitleCounterColor = () => {
    if (titleLen > 70) return "text-red-600 font-bold";
    if (titleLen > 60) return "text-amber-600 font-semibold";
    return "text-ink-soft";
  };

  const getDescCounterColor = () => {
    if (descLen > 160) return "text-red-600 font-bold";
    if (descLen > 155) return "text-amber-600 font-semibold";
    return "text-ink-soft";
  };

  return (
    <div className="bg-card border border-line rounded-sharp p-6 shadow-sm space-y-5">
      <div className="flex items-center gap-2 pb-3 border-b border-line">
        <Globe className="w-4 h-4 text-stain" />
        <h3 className="font-serif font-semibold text-base text-ink m-0">
          SEO Metadata &amp; Display Attributes
        </h3>
      </div>

      {/* Meta Title */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-bold text-ink-soft uppercase">
            Meta Title (Browser &amp; SERP Title) *
          </label>
          <span className={`text-[0.7rem] ${getTitleCounterColor()}`}>
            {titleLen} / 60 chars {titleLen > 60 && "(caution)"}
          </span>
        </div>
        <input
          type="text"
          required
          placeholder="e.g. Mehndi Artist in Anand Vihar, East Delhi | Verified Henna Booking"
          value={metaTitle}
          onChange={(e) => onChange({ metaTitle: e.target.value })}
          className="w-full px-3 py-2 text-sm bg-white border border-line rounded-sharp text-ink focus:outline-none focus:border-stain"
        />
        <p className="text-[0.68rem] text-ink-soft mt-1">
          Shown in Google search results and browser tab. Recommended: 50–60 characters.
        </p>
      </div>

      {/* Meta Description */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-bold text-ink-soft uppercase">
            Meta Description *
          </label>
          <span className={`text-[0.7rem] ${getDescCounterColor()}`}>
            {descLen} / 155 chars {descLen > 155 && "(caution)"}
          </span>
        </div>
        <textarea
          required
          rows={3}
          placeholder="e.g. Book verified mehndi artists in Anand Vihar, East Delhi. Upfront locked pricing, organic henna paste, on-time arrival guarantee near ISBT."
          value={metaDescription}
          onChange={(e) => onChange({ metaDescription: e.target.value })}
          className="w-full px-3 py-2 text-sm bg-white border border-line rounded-sharp text-ink focus:outline-none focus:border-stain"
        />
        <p className="text-[0.68rem] text-ink-soft mt-1">
          Appears under title in Google snippet. Recommended: 140–155 characters.
        </p>
      </div>

      {/* H1 Heading */}
      <div>
        <label className="block text-xs font-bold text-ink-soft uppercase mb-1">
          H1 Main Heading (On-Page Hero Title) *
        </label>
        <input
          type="text"
          required
          placeholder="e.g. Mehndi Artist in Anand Vihar: A No-Stress Way to Book for Your Next Function"
          value={h1}
          onChange={(e) => onChange({ h1: e.target.value })}
          className="w-full px-3 py-2 text-sm bg-white border border-line rounded-sharp text-ink focus:outline-none focus:border-stain"
        />
        <p className="text-[0.68rem] text-ink-soft mt-1">
          The main editorial headline on the page. Can be longer and more engaging than the Meta Title.
        </p>
      </div>

      {/* Dek / Subtitle */}
      <div>
        <label className="block text-xs font-bold text-ink-soft uppercase mb-1">
          Dek / Subtitle (Paragraph below H1)
        </label>
        <textarea
          rows={2}
          placeholder="e.g. Why finding a trusted, verified henna artist near Anand Vihar ISBT doesn't have to be a last-minute WhatsApp scramble."
          value={dek}
          onChange={(e) => onChange({ dek: e.target.value })}
          className="w-full px-3 py-2 text-sm bg-white border border-line rounded-sharp text-ink focus:outline-none focus:border-stain"
        />
      </div>

      {/* Hero Image Fields & Live Preview */}
      <div className="pt-3 border-t border-line">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-stain uppercase">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Hero Image Configuration</span>
          </div>
          <span className="text-[0.68rem] text-ink-soft">
            Paste any URL or choose a preset below
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
          <div>
            <label className="block text-[0.68rem] font-bold text-ink-soft uppercase mb-1">
              Hero Image URL
            </label>
            <input
              type="text"
              placeholder="https://..."
              value={heroImageUrl}
              onChange={(e) => onChange({ heroImageUrl: e.target.value })}
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-line rounded-sharp text-ink focus:outline-none focus:border-stain"
            />
          </div>

          <div>
            <label className="block text-[0.68rem] font-bold text-ink-soft uppercase mb-1">
              Image Alt Text / Caption
            </label>
            <input
              type="text"
              placeholder="e.g. Traditional Bridal Mehndi Artistry"
              value={heroImageAlt}
              onChange={(e) => onChange({ heroImageAlt: e.target.value })}
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-line rounded-sharp text-ink focus:outline-none focus:border-stain"
            />
          </div>
        </div>

        {/* Quick Presets */}
        <div className="mb-4">
          <div className="text-[0.68rem] font-bold text-ink-soft uppercase mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-marigold" />
            <span>1-Click Preset Hero Photos:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESET_HERO_IMAGES.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() =>
                  onChange({
                    heroImageUrl: preset.url,
                    heroImageAlt: preset.alt,
                  })
                }
                className="px-2.5 py-1 text-[0.7rem] font-semibold bg-white hover:bg-parchment text-ink border border-line rounded-sharp transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Hero Preview */}
        {heroImageUrl && (
          <div className="pt-2">
            <div className="text-[0.68rem] font-bold text-ink-soft uppercase mb-1.5">
              Live Hero Preview:
            </div>
            <div className="relative w-full aspect-[21/9] max-h-48 rounded-sharp overflow-hidden border border-line bg-parchment-deep shadow-2xs">
              <img
                src={heroImageUrl}
                alt={heroImageAlt || "Hero preview"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1599818816933-289d0c64bead?w=1200";
                }}
              />
              <div className="absolute bottom-2 left-2 z-10 bg-ink/85 backdrop-blur-sm text-parchment text-[0.7rem] font-semibold px-2.5 py-1 rounded-sharp border border-white/10">
                {heroImageAlt || "Traditional Bridal Mehndi Artistry"}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Editorial Meta Chips */}
      <div className="pt-3 border-t border-line grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-[0.68rem] font-bold text-ink-soft uppercase mb-1">
            Read Time
          </label>
          <input
            type="text"
            placeholder="11 min read"
            value={readTime}
            onChange={(e) => onChange({ readTime: e.target.value })}
            className="w-full px-2.5 py-1.5 text-xs bg-white border border-line rounded-sharp text-ink focus:outline-none focus:border-stain"
          />
        </div>

        <div>
          <label className="block text-[0.68rem] font-bold text-ink-soft uppercase mb-1">
            Rating Score
          </label>
          <input
            type="number"
            step="0.1"
            min="1"
            max="5"
            value={ratingValue}
            onChange={(e) => onChange({ ratingValue: parseFloat(e.target.value) || 4.8 })}
            className="w-full px-2.5 py-1.5 text-xs bg-white border border-line rounded-sharp text-ink focus:outline-none focus:border-stain"
          />
        </div>

        <div>
          <label className="block text-[0.68rem] font-bold text-ink-soft uppercase mb-1">
            Review Count
          </label>
          <input
            type="number"
            min="1"
            value={reviewCount}
            onChange={(e) => onChange({ reviewCount: parseInt(e.target.value, 10) || 200 })}
            className="w-full px-2.5 py-1.5 text-xs bg-white border border-line rounded-sharp text-ink focus:outline-none focus:border-stain"
          />
        </div>
      </div>
    </div>
  );
};
