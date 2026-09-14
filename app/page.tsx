import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { buildCanonicalPath } from "@/lib/utils";
import { siteConfig } from "@/content/labels";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MapPin, ArrowRight, ShieldCheck, Sparkles, Star } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const pages = await prisma.localityPage.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { localityLabel: "asc" },
  });

  return (
    <div className="flex flex-col min-h-screen bg-parchment">
      <SiteHeader />

      <main className="flex-1 max-w-wrap mx-auto px-6 py-12 md:py-16">
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-marigold text-ink text-xs font-extrabold uppercase px-3 py-1 rounded-sharp tracking-wider mb-4 shadow-sm">
            VERIFIED DIRECT BOOKINGS
          </span>
          <h1 className="font-serif font-semibold text-3xl sm:text-4xl md:text-5xl text-ink leading-tight tracking-tight mb-4">
            Direct-Booking Marketplace for Verified Mehndi Artists
          </h1>
          <p className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-2xl mx-auto">
            Find certified bridal and guest henna specialists in your specific neighbourhood.
            Upfront price lock, 100% natural henna, and platform-backed arrival guarantee.
          </p>
        </div>

        {/* Directory Hubs Grid */}
        <section className="mb-16">
          <div className="flex items-baseline justify-between gap-4 mb-6 pb-3 border-b border-line">
            <h2 className="font-serif font-semibold text-2xl text-ink">
              Explore Local Guides & Verified Hubs
            </h2>
            <span className="text-xs font-bold text-stain uppercase tracking-wider">
              {pages.length} Localities Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map((page) => {
              const url = buildCanonicalPath(
                page.country,
                page.city,
                page.district,
                page.locality
              );
              return (
                <Link
                  key={page.id}
                  href={url}
                  className="bg-card border border-line rounded-sharp p-6 hover:shadow-md hover:border-stain transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-stain uppercase mb-2">
                      <MapPin className="w-3.5 h-3.5 text-marigold" />
                      <span>
                        {page.districtLabel}, {page.cityLabel}
                      </span>
                    </div>
                    <h3 className="font-serif font-semibold text-xl text-ink group-hover:text-stain transition-colors mb-2">
                      {page.localityLabel}
                    </h3>
                    <p className="text-xs text-ink-soft line-clamp-2 leading-relaxed mb-4">
                      {page.dek || page.metaDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-line flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-ink font-semibold">
                      <Star className="w-3.5 h-3.5 text-marigold fill-marigold" />
                      <span>{page.ratingValue} / 5.0</span>
                    </div>
                    <span className="text-stain font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View Guide <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Features Row */}
        <section className="bg-parchment-deep border border-line rounded-sharp p-8 md:p-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-sharp bg-stain text-parchment flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-semibold text-base text-ink mb-1">
                  100% Price Lock
                </h4>
                <p className="text-xs text-ink-soft leading-relaxed m-0">
                  Fixed pricing at booking. No surprise venue or travel add-ons on the event day.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-sharp bg-stain text-parchment flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-semibold text-base text-ink mb-1">
                  Natural Organic Henna
                </h4>
                <p className="text-xs text-ink-soft leading-relaxed m-0">
                  Chemical-free pure henna pastes with optional 24-hour patch test protocols.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-sharp bg-stain text-parchment flex items-center justify-center flex-shrink-0">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-semibold text-base text-ink mb-1">
                  Verified Portfolios
                </h4>
                <p className="text-xs text-ink-soft leading-relaxed m-0">
                  Authentic, booking-verified photos. The artist you choose is the artist who arrives.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
