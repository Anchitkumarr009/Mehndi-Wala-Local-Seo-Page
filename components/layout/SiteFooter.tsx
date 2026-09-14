import React from "react";
import Link from "next/link";
import { siteConfig, uiLabels } from "@/content/labels";

interface NearbyLink {
  localityLabel: string;
  url: string;
}

interface SiteFooterProps {
  districtLabel?: string;
  localityLabel?: string;
  cityLabel?: string;
  countryLabel?: string;
  nearbyLocalities?: NearbyLink[];
}

export const SiteFooter: React.FC<SiteFooterProps> = ({
  districtLabel = "East Delhi",
  localityLabel = "Anand Vihar",
  cityLabel = "Delhi",
  countryLabel = "India",
  nearbyLocalities = [],
}) => {
  // Default fallback links if none provided
  const displayLocalities =
    nearbyLocalities.length > 0
      ? nearbyLocalities.slice(0, 6)
      : [
          { localityLabel: "Anand Vihar & ISBT", url: "/india/delhi/east-delhi/anand-vihar" },
          { localityLabel: "Laxmi Nagar Main Market", url: "/india/delhi/east-delhi/laxmi-nagar" },
          { localityLabel: "Preet Vihar & Nirman Vihar", url: "/india/delhi/east-delhi/preet-vihar" },
          { localityLabel: "Mayur Vihar Phase 1 & 2", url: "/india/delhi/east-delhi/mayur-vihar" },
        ];

  return (
    <footer className="bg-stain-deep text-parchment pt-14 pb-8 border-t border-line-strong mt-16">
      <div className="max-w-wrap mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Description */}
          <div>
            <div className="font-serif font-semibold text-2xl tracking-tight text-white mb-3">
              {siteConfig.name}
            </div>
            <p className="text-sm text-parchment/80 leading-relaxed max-w-sm">
              {uiLabels.footer.blurb}
            </p>
          </div>

          {/* Column 2: Dynamic Localities */}
          <div>
            <h4 className="font-serif font-semibold text-base text-marigold-soft mb-4 tracking-wide uppercase text-xs">
              {districtLabel ? `${districtLabel} Hubs` : uiLabels.footer.nearbyColumn}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {displayLocalities.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.url}
                    className="text-parchment/85 hover:text-white hover:underline underline-offset-2 transition-colors"
                  >
                    {item.localityLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Curated Guides */}
          <div>
            <h4 className="font-serif font-semibold text-base text-marigold-soft mb-4 tracking-wide uppercase text-xs">
              {uiLabels.footer.exploreColumn}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#artists-section"
                  className="text-parchment/85 hover:text-white hover:underline underline-offset-2 transition-colors"
                >
                  Bridal Henna Preparation
                </a>
              </li>
              <li>
                <a
                  href="#faq-section"
                  className="text-parchment/85 hover:text-white hover:underline underline-offset-2 transition-colors"
                >
                  Organic Paste Safety Testing
                </a>
              </li>
              <li>
                <a
                  href="#guide-content"
                  className="text-parchment/85 hover:text-white hover:underline underline-offset-2 transition-colors"
                >
                  Arabic / Rajasthani Patterns
                </a>
              </li>
              <li>
                <a
                  href="#artists-section"
                  className="text-parchment/85 hover:text-white hover:underline underline-offset-2 transition-colors"
                >
                  Dark Stain Aftercare Protocol
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Artist Network */}
          <div>
            <h4 className="font-serif font-semibold text-base text-marigold-soft mb-4 tracking-wide uppercase text-xs">
              {uiLabels.footer.artistColumn}
            </h4>
            <p className="text-xs text-parchment/80 mb-4 leading-relaxed">
              Are you a professional henna artist? Expand your clientele with verified bookings.
            </p>
            <a
              href="/for-artists"
              className="inline-block px-4 py-2.5 text-xs font-bold text-parchment border border-marigold hover:bg-marigold hover:text-ink rounded-sharp tracking-wider uppercase transition-colors"
            >
              {uiLabels.footer.artistCta}
            </a>
          </div>
        </div>

        {/* Footer Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-parchment/60">
          <div>
            © {new Date().getFullYear()} {uiLabels.footer.copyrightSuffix} • {localityLabel},{" "}
            {districtLabel}, {cityLabel}, {countryLabel}
          </div>
          <div className="flex items-center gap-5">
            <a href="/privacy" className="hover:text-parchment transition-colors">
              {uiLabels.footer.privacy}
            </a>
            <span>•</span>
            <a href="/artist-code" className="hover:text-parchment transition-colors">
              {uiLabels.footer.codeOfConduct}
            </a>
            <span>•</span>
            <a href="/terms" className="hover:text-parchment transition-colors">
              {uiLabels.footer.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
