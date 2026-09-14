import React from "react";
import Link from "next/link";
import { siteConfig, uiLabels } from "@/content/labels";
import { Phone, Bookmark, Share2 } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface SiteHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
  activeLocality?: string;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  breadcrumbs = [],
  activeLocality,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-parchment/95 backdrop-blur-sm border-b border-line">
      <div className="max-w-wrap mx-auto px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo & Tagline */}
        <Link href="/" className="flex flex-col group text-ink no-underline">
          <span className="font-serif font-semibold text-xl tracking-tight leading-tight group-hover:text-stain transition-colors">
            {siteConfig.name.toUpperCase()}
          </span>
          <span className="font-sans font-bold text-[0.6rem] text-stain tracking-wider uppercase">
            {siteConfig.tagline}
          </span>
        </Link>



        {/* Right Action CTAs */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Bookmark this guide"
            className="hidden sm:inline-flex p-2 text-ink-soft hover:text-ink hover:bg-card border border-line rounded-sharp transition-colors"
          >
            <Bookmark className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label="Share this guide"
            className="hidden sm:inline-flex p-2 text-ink-soft hover:text-ink hover:bg-card border border-line rounded-sharp transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <a
            href={siteConfig.phoneTel}
            className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-stain border border-line-strong rounded-sharp hover:bg-card hover:border-stain transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{uiLabels.header.callBtn}</span>
          </a>

          <a
            href="#artists-section"
            className="inline-flex items-center px-4 py-2 text-xs font-bold text-parchment bg-stain hover:bg-stain-deep rounded-sharp tracking-wide uppercase transition-colors shadow-sm"
          >
            {uiLabels.header.seeArtistsBtn}
          </a>
        </div>
      </div>
    </header>
  );
};
