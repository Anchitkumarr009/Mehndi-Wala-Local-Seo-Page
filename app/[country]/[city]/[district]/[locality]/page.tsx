import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { buildCanonicalUrl, buildCanonicalPath } from "@/lib/utils";
import { siteConfig, uiLabels } from "@/content/labels";
import { processHeadings } from "@/lib/toc";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileCallBar } from "@/components/layout/MobileCallBar";
import { FaqAccordion } from "@/components/public/FaqAccordion";
import { TableOfContents } from "@/components/public/TableOfContents";
import {
  PricingEstimatorCard,
  UrgentBookingCard,
  DateAvailabilityCard,
  ArtistPartnerCard,
  GuideFeedbackCard,
} from "@/components/public/SidebarCards";
import { LocalityInterlinkCard } from "@/components/public/LocalityInterlinkCard";
import { HowItWorksSection } from "@/components/public/HowItWorksSection";
import { TrustEntityDataSection } from "@/components/public/TrustEntityDataSection";
import { PhotoVideoGallery } from "@/components/public/PhotoVideoGallery";
import { MapPin, Clock, ShieldCheck, Star } from "lucide-react";

interface PageProps {
  params: {
    country: string;
    city: string;
    district: string;
    locality: string;
  };
  searchParams?: {
    preview?: string;
  };
}

export const dynamic = "force-dynamic";

// Dynamic SEO metadata generator
export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { country, city, district, locality } = params;
  const isPreview = Boolean(searchParams?.preview);

  const page = await prisma.localityPage.findUnique({
    where: {
      country_city_district_locality: {
        country: country.toLowerCase(),
        city: city.toLowerCase(),
        district: district.toLowerCase(),
        locality: locality.toLowerCase(),
      },
    },
  });

  if (!page || (page.status !== "PUBLISHED" && !isPreview)) {
    return {
      title: "Page Not Found | Mehndi Wala",
    };
  }

  const canonicalUrl = buildCanonicalUrl(country, city, district, locality);
  const ogImage =
    page.heroImageUrl || "https://images.unsplash.com/photo-1599818816933-289d0c64bead?w=1200";

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: page.heroImageAlt || page.h1,
        },
      ],
      locale: "en_IN",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
      images: [ogImage],
    },
  };
}

export default async function LocalityDetailPage({ params, searchParams }: PageProps) {
  const { country, city, district, locality } = params;
  const isPreview = Boolean(searchParams?.preview);

  const page = await prisma.localityPage.findUnique({
    where: {
      country_city_district_locality: {
        country: country.toLowerCase(),
        city: city.toLowerCase(),
        district: district.toLowerCase(),
        locality: locality.toLowerCase(),
      },
    },
    include: {
      faqs: {
        orderBy: { order: "asc" },
      },
      interlinksFrom: {
        include: {
          to: true,
        },
      },
    },
  });

  if (!page || (page.status !== "PUBLISHED" && !isPreview)) {
    notFound();
  }

  const canonicalUrl = buildCanonicalUrl(country, city, district, locality);

  // Map interlinks
  const interlinks = page.interlinksFrom.map((item) => ({
    id: item.to.id,
    localityLabel: item.to.localityLabel,
    districtLabel: item.to.districtLabel,
    cityLabel: item.to.cityLabel,
    url: buildCanonicalPath(
      item.to.country,
      item.to.city,
      item.to.district,
      item.to.locality
    ),
  }));

  // Build Extra sections for TOC
  const extraSections: { id: string; text: string }[] = [];
  if (page.faqs && page.faqs.length > 0) {
    extraSections.push({ id: "faq-section", text: "Frequently Asked Questions" });
  }
  extraSections.push({ id: "how-it-works", text: "How Booking Works" });
  extraSections.push({ id: "artists-section", text: `${page.localityLabel} Artist Hub` });
  extraSections.push({ id: "trust-data-section", text: "Trust & Verified Standards" });
  extraSections.push({ id: "gallery-section", text: "Photo & Video Gallery" });

  // Process Headings & extract TOC items
  const { processedHtml, headings } = processHeadings(page.bodyHtml, extraSections);

  // Build JSON-LD structured data objects
  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.baseUrl}/#organization`,
    name: siteConfig.name,
    url: siteConfig.baseUrl,
    logo: `${siteConfig.baseUrl}/assets/logo.png`,
    description: uiLabels.footer.blurb,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: siteConfig.supportEmail,
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
  };

  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.baseUrl}/#website`,
    name: siteConfig.name,
    url: siteConfig.baseUrl,
    publisher: { "@id": `${siteConfig.baseUrl}/#organization` },
  };

  const jsonLdWebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: page.metaTitle,
    description: page.metaDescription,
    isPartOf: { "@id": `${siteConfig.baseUrl}/#website` },
    about: { "@id": `${siteConfig.baseUrl}/#organization` },
    datePublished: page.publishedAt?.toISOString() || page.createdAt.toISOString(),
    dateModified: page.updatedAt.toISOString(),
    inLanguage: "en-IN",
  };

  const jsonLdLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${siteConfig.name} — ${page.localityLabel}, ${page.districtLabel}`,
    image: page.heroImageUrl || "https://images.unsplash.com/photo-1599818816933-289d0c64bead?w=1200",
    url: canonicalUrl,
    telephone: siteConfig.phoneDisplay,
    email: siteConfig.supportEmail,
    address: {
      "@type": "PostalAddress",
      streetAddress: page.streetAddress || `${page.localityLabel} Main Sector`,
      addressLocality: `${page.localityLabel}, ${page.districtLabel}`,
      addressRegion: page.cityLabel,
      addressCountry: "IN",
    },
    geo:
      page.latitude && page.longitude
        ? {
            "@type": "GeoCoordinates",
            latitude: page.latitude,
            longitude: page.longitude,
          }
        : undefined,
    priceRange: "₹250–₹15,000",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: page.ratingValue?.toString() || "4.8",
      reviewCount: page.reviewCount?.toString() || "210",
    },
  };

  const jsonLdBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: page.countryLabel,
        item: `${siteConfig.baseUrl}/${page.country}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.cityLabel,
        item: `${siteConfig.baseUrl}/${page.country}/${page.city}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.districtLabel,
        item: `${siteConfig.baseUrl}/${page.country}/${page.city}/${page.district}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: page.localityLabel,
        item: canonicalUrl,
      },
    ],
  };

  const jsonLdFaq =
    page.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: page.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer.replace(/<[^>]*>/g, ""),
            },
          })),
        }
      : null;

  const jsonLdGallery = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${canonicalUrl}#gallery`,
    name: `Mehndi photo & video gallery — ${page.localityLabel} artists`,
    about: { "@id": `${siteConfig.baseUrl}/#organization` },
  };

  const breadcrumbs = [
    { label: page.countryLabel, href: `/${page.country}` },
    { label: page.cityLabel, href: `/${page.country}/${page.city}` },
    { label: page.districtLabel, href: `/${page.country}/${page.city}/${page.district}` },
    { label: page.localityLabel },
  ];

  return (
    <>
      {/* Schema.org Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGallery) }}
      />
      {jsonLdFaq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
      )}

      {/* Header with Breadcrumbs */}
      <SiteHeader breadcrumbs={breadcrumbs} activeLocality={page.localityLabel} />

      {/* Main Container */}
      <main className="flex-1 max-w-wrap mx-auto px-6 py-6 md:py-10">
        {/* Breadcrumb Navigation (Above Local Guide & Locality Header) */}
        <nav
          aria-label="Breadcrumb navigation"
          className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-ink-soft mb-4"
        >
          <Link
            href="/"
            className="text-ink-soft hover:text-ink hover:underline underline-offset-2 transition-colors"
          >
            Home
          </Link>
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <React.Fragment key={idx}>
                <span className="text-line-strong select-none font-light">/</span>
                {crumb.href && !isLast ? (
                  <Link
                    href={crumb.href}
                    className="text-ink-soft hover:text-ink hover:underline underline-offset-2 transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-ink font-semibold">{crumb.label}</span>
                )}
              </React.Fragment>
            );
          })}
        </nav>

        {/* Category Ribbon / Kicker Row */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="bg-marigold text-ink text-[0.72rem] font-extrabold uppercase px-2.5 py-0.5 rounded-sharp tracking-wider shadow-sm">
            {uiLabels.kicker.localGuideBadge}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-stain uppercase tracking-wide">
            <MapPin className="w-3.5 h-3.5 text-marigold" />
            {page.localityLabel}, {page.districtLabel}
          </span>
        </div>

        {/* H1 Heading */}
        <h1 className="font-serif font-semibold text-3xl sm:text-4xl md:text-5xl text-ink leading-[1.12] tracking-tight max-w-4xl mb-4">
          {page.h1}
        </h1>

        {/* Subtitle / Dek */}
        {page.dek && (
          <p className="font-sans text-base sm:text-lg text-ink-soft leading-relaxed max-w-3xl mb-6">
            {page.dek}
          </p>
        )}

        {/* Byline Row */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-ink-soft py-3 border-y border-line mb-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-stain text-parchment font-serif font-bold flex items-center justify-center text-[0.65rem]">
              MW
            </div>
            <span className="font-semibold text-ink">{uiLabels.kicker.editorialByline}</span>
          </div>

          <span className="text-line-strong">•</span>

          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-ink-soft" />
            <span>{page.readTime || "11 min read"}</span>
          </div>

          <span className="text-line-strong">•</span>

          <div className="inline-flex items-center gap-1 text-stain font-semibold bg-card px-2 py-0.5 rounded-full border border-line">
            <ShieldCheck className="w-3.5 h-3.5 text-stain" />
            <span>{uiLabels.kicker.verifiedBadge}</span>
          </div>

          <span className="text-line-strong">•</span>

          <div className="inline-flex items-center gap-1 text-ink font-bold">
            <Star className="w-3.5 h-3.5 text-marigold fill-marigold" />
            <span>{page.ratingValue ? `${page.ratingValue} / 5.0` : uiLabels.kicker.defaultRating}</span>
          </div>
        </div>

        {/* Hero Image Section */}
        {page.heroImageUrl && (
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-sharp overflow-hidden border border-line shadow-sm mb-12 bg-parchment-deep">
            <img
              src={page.heroImageUrl}
              alt={page.heroImageAlt || page.h1}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 bg-ink/85 backdrop-blur-sm text-parchment text-xs font-semibold px-3 py-1.5 rounded-sharp border border-white/10">
              {page.heroImageAlt || `Traditional Bridal Mehndi Artistry • ${page.localityLabel} Celebrations`}
            </div>
          </div>
        )}

        {/* Two/Three-Column Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column Sidebar (Sticky Desktop) */}
          <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-20 order-2 lg:order-1">
            <TableOfContents headings={headings} />
            <PricingEstimatorCard
              localityLabel={page.localityLabel}
              priceGuest={page.priceGuest}
              priceParty={page.priceParty}
              priceBridal={page.priceBridal}
              priceDisclaimer={page.priceDisclaimer}
            />
            <UrgentBookingCard localityLabel={page.localityLabel} />
          </aside>


          {/* Main Rich Content Column */}
          <article className="lg:col-span-6 order-1 lg:order-2">
            <div
              id="guide-content"
              className="rich-content"
              dangerouslySetInnerHTML={{ __html: processedHtml }}
            />

            {/* FAQs Accordion */}
            {page.faqs.length > 0 && (
              <FaqAccordion items={page.faqs} localityLabel={page.localityLabel} />
            )}
          </article>

          {/* Right Column Sticky Desktop Widgets */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 lg:sticky lg:top-20 order-3">
            <DateAvailabilityCard localityLabel={page.localityLabel} />
            <ArtistPartnerCard localityLabel={page.localityLabel} />
            <GuideFeedbackCard />
          </aside>
        </div>

        {/* 1. How It Works Section (Before Mehndi artists in {locality} section) */}
        <HowItWorksSection
          localityLabel={page.localityLabel}
          districtLabel={page.districtLabel}
          cityLabel={page.cityLabel}
        />

        {/* 2. Locality Interlinking Card (Mehndi artists in {locality} Section) */}
        <LocalityInterlinkCard
          localityLabel={page.localityLabel}
          districtLabel={page.districtLabel}
          cityLabel={page.cityLabel}
          countryLabel={page.countryLabel}
          interlinks={interlinks}
        />

        {/* 3. Trust Entity & Data Section (After Mehndi artists in {locality} section) */}
        <TrustEntityDataSection
          localityLabel={page.localityLabel}
          districtLabel={page.districtLabel}
          cityLabel={page.cityLabel}
        />

        {/* 4. Photo & Video Gallery Section */}
        <PhotoVideoGallery
          localityLabel={page.localityLabel}
          districtLabel={page.districtLabel}
        />
      </main>

      {/* Global Site Footer */}
      <SiteFooter
        localityLabel={page.localityLabel}
        districtLabel={page.districtLabel}
        cityLabel={page.cityLabel}
        countryLabel={page.countryLabel}
        nearbyLocalities={interlinks}
      />

      {/* Mobile Sticky Action Bar */}
      <MobileCallBar />
    </>
  );
}
