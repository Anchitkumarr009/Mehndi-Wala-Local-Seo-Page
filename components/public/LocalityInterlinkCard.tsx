import React from "react";
import Link from "next/link";
import { uiLabels } from "@/content/labels";
import { MapPin, Sparkles, Bell } from "lucide-react";

interface InterlinkItem {
  id: string;
  localityLabel: string;
  districtLabel?: string;
  cityLabel?: string;
  url: string;
}

interface LocalityInterlinkCardProps {
  localityLabel: string;
  districtLabel: string;
  cityLabel: string;
  countryLabel: string;
  interlinks: InterlinkItem[];
}

export const LocalityInterlinkCard: React.FC<LocalityInterlinkCardProps> = ({
  localityLabel,
  districtLabel,
  cityLabel,
  countryLabel,
  interlinks = [],
}) => {
  return (
    <section id="artists-section" className="mt-16 scroll-mt-20">
      <div className="bg-card border border-line rounded-sharp p-6 md:p-8 shadow-sm">
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-5 border-b border-line">
          <h2 className="font-serif font-semibold text-xl md:text-2xl text-ink m-0">
            {uiLabels.interlinkCard.titlePrefix}{" "}
            <span className="text-stain">{localityLabel}</span>, {districtLabel}
          </h2>
          <span className="text-xs font-bold text-stain hover:underline uppercase tracking-wide cursor-pointer">
            {districtLabel} {uiLabels.interlinkCard.guideLinkSuffix}
          </span>
        </div>

        {/* Empty State / Browse State Box */}
        <div className="my-8 bg-parchment/60 border border-dashed border-line-strong rounded-sharp p-8 md:p-10 text-center max-w-xl mx-auto">
          <div className="w-12 h-12 rounded-full bg-parchment-deep mx-auto mb-3 flex items-center justify-center text-marigold">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-semibold text-lg text-ink mb-1.5">
            {uiLabels.interlinkCard.emptyStateTitle}
          </h3>
          <p className="text-sm text-ink-soft mb-6 leading-relaxed max-w-md mx-auto">
            {uiLabels.interlinkCard.emptyStateDescPrefix} {localityLabel}, {districtLabel}
            {uiLabels.interlinkCard.emptyStateDescSuffix}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              className="px-5 py-2.5 text-xs font-bold text-parchment bg-stain hover:bg-stain-deep rounded-sharp uppercase tracking-wider transition-colors shadow-sm"
            >
              {uiLabels.interlinkCard.browseAllBtn}
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-stain bg-white hover:bg-parchment border border-line-strong rounded-sharp uppercase tracking-wider transition-colors"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>{uiLabels.interlinkCard.notifyBtn}</span>
            </button>
          </div>
        </div>

        {/* Explore Nearby Areas Chips */}
        {interlinks.length > 0 && (
          <div className="pt-6 border-t border-line flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="text-xs font-extrabold text-ink uppercase tracking-wider whitespace-nowrap">
                {uiLabels.interlinkCard.exploreNearby}
              </span>
              <div className="flex flex-wrap gap-2">
                {interlinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.url}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-ink-soft bg-white hover:bg-parchment hover:text-ink border border-line rounded-sharp transition-colors group"
                  >
                    <MapPin className="w-3 h-3 text-stain group-hover:scale-110 transition-transform" />
                    <span>{link.localityLabel}</span>
                  </Link>
                ))}
              </div>
            </div>

            <span className="text-xs font-bold text-stain hover:underline cursor-pointer whitespace-nowrap">
              View {districtLabel} {uiLabels.interlinkCard.viewMapSuffix}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
