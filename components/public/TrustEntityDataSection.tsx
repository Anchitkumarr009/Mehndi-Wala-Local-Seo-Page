import React from "react";
import { siteConfig } from "@/content/labels";
import {
  ShieldCheck,
  Award,
  Sparkles,
  HeartHandshake,
  CheckCircle,
  Clock,
  MapPin,
  Flame,
  FileCheck2,
  Users,
} from "lucide-react";

interface TrustEntityDataSectionProps {
  localityLabel: string;
  districtLabel: string;
  cityLabel: string;
}

export const TrustEntityDataSection: React.FC<TrustEntityDataSectionProps> = ({
  localityLabel,
  districtLabel,
  cityLabel,
}) => {
  const trustPillars = [
    {
      icon: Sparkles,
      title: "100% Organic Henna Guarantee",
      desc: "Freshly coned Rajasthani Sojat herbal henna prepared with zero PPD, chemical dyes, or synthetic color enhancers. Hypoallergenic and safe for sensitive skin and expectant brides.",
      badge: "Nil Chemical / Safe",
    },
    {
      icon: ShieldCheck,
      title: "Identity & Skill Vetted Artists",
      desc: `Every listed practitioner operating in ${localityLabel} undergoes portfolio authentication, hygiene audit, and background screening before being onboarded.`,
      badge: "Verified Local Talent",
    },
    {
      icon: Award,
      title: "Zero Hidden Charges & Price Lock",
      desc: `The rate agreed upfront is your final price. No unexpected travel fees, surge pricing during festival peaks, or per-finger hidden add-ons across ${districtLabel}.`,
      badge: "Upfront Price Protection",
    },
    {
      icon: HeartHandshake,
      title: "Emergency Backup Artist Dispatch",
      desc: `In the rare event of artist illness or scheduling conflicts, our regional ${districtLabel} coordinator network automatically dispatches an equivalent master artist.`,
      badge: "Zero-Cancellation Policy",
    },
  ];

  const localMetrics = [
    {
      value: "35+",
      label: `Verified Artists in ${districtLabel}`,
      sub: "Available for doorstep bookings",
      icon: Users,
    },
    {
      value: "4.9★",
      label: `${localityLabel} Customer Rating`,
      sub: "Based on 450+ verified reviews",
      icon: Award,
    },
    {
      value: "< 15m",
      label: "Average Response Time",
      sub: "Rapid WhatsApp & call coordination",
      icon: Clock,
    },
    {
      value: "7-12 Days",
      label: "Guaranteed Stain Longevity",
      sub: "Rich, deep mahogany oxidation",
      icon: Flame,
    },
  ];

  return (
    <section id="trust-data-section" className="mt-16 scroll-mt-20">
      <div className="bg-card border border-line rounded-sharp p-6 md:p-10 shadow-sm">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-line">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[0.72rem] font-extrabold uppercase tracking-wider text-stain bg-parchment px-2.5 py-1 rounded-sharp mb-2.5">
              <FileCheck2 className="w-3.5 h-3.5 text-marigold" />
              <span>Verified Entity &amp; Quality Data</span>
            </div>
            <h2 className="font-serif font-semibold text-2xl md:text-3xl text-ink leading-tight m-0">
              Trust Entity &amp; Local Service Standards for{" "}
              <span className="text-stain">{localityLabel}</span>
            </h2>
          </div>
          <p className="font-sans text-xs md:text-sm text-ink-soft max-w-md m-0">
            Independent vetting criteria, natural ingredients assurance, and verified performance benchmarks for {localityLabel}, {districtLabel}.
          </p>
        </div>

        {/* 4 Local Service Metrics Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8">
          {localMetrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div
                key={idx}
                className="bg-parchment/70 border border-line-strong rounded-sharp p-4 sm:p-5 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-serif font-bold text-2xl sm:text-3xl text-stain">
                    {metric.value}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-marigold shadow-xs">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="font-sans font-bold text-xs text-ink leading-tight">
                    {metric.label}
                  </div>
                  <div className="font-sans text-[0.7rem] text-ink-soft mt-0.5">
                    {metric.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4 Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-line hover:border-line-strong rounded-sharp p-5 sm:p-6 transition-all duration-150 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-full bg-parchment text-stain flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[0.68rem] font-extrabold uppercase tracking-wider text-stain bg-parchment-deep/60 px-2 py-0.5 rounded-sharp border border-line">
                      {pillar.badge}
                    </span>
                  </div>
                  <h3 className="font-serif font-semibold text-base text-ink mb-2">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-ink-soft leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Entity Governance & Local Verification Card */}
        <div className="bg-parchment/50 border border-line rounded-sharp p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-ink uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-stain" />
              <span>
                Local Service Jurisdiction: {localityLabel}, {districtLabel}, {cityLabel}
              </span>
            </div>
            <p className="font-sans text-xs text-ink-soft leading-relaxed m-0">
              Verified doorstep home-service coverage spans all residential societies, wedding venues, banquet halls, and hotels within {localityLabel} and adjacent {districtLabel} neighborhoods. Standard artist dispatch operating hours are <strong>7:00 AM to 10:30 PM</strong> daily.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
            <a
              href={`tel:${siteConfig.phoneTel.replace("tel:", "")}`}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white hover:bg-parchment border border-line-strong text-ink text-xs font-bold uppercase tracking-wider rounded-sharp transition-colors text-center"
            >
              <span>Speak with Local Lead</span>
            </a>
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-stain hover:bg-stain-deep text-parchment text-xs font-bold uppercase tracking-wider rounded-sharp transition-colors text-center shadow-sm"
            >
              <span>Verify Availability</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
