import React from "react";
import { siteConfig } from "@/content/labels";
import {
  CalendarDays,
  UserCheck,
  Sparkles,
  Home,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
} from "lucide-react";

interface HowItWorksSectionProps {
  localityLabel: string;
  districtLabel: string;
  cityLabel: string;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  localityLabel,
  districtLabel,
  cityLabel,
}) => {
  const steps = [
    {
      number: "01",
      icon: CalendarDays,
      title: "Select Style & Occasion",
      desc: `Choose between Traditional Bridal, Semi-Bridal, Arabic, or Guest designs. Specify your preferred date, time slot, and location in ${localityLabel}.`,
      badge: "Upfront Price Estimate",
    },
    {
      number: "02",
      icon: UserCheck,
      title: "Direct Artist Match",
      desc: `We connect you directly with vetted mehndi artists stationed within or near ${localityLabel}, ${districtLabel}. View real portfolios with zero agent commission markups.`,
      badge: "Verified Local Artists",
    },
    {
      number: "03",
      icon: Sparkles,
      title: "Fresh Herbal Henna Prep",
      desc: `Artists prepare 100% natural Sojat henna freshly coned 24–48 hrs prior with pure eucalyptus and clove essential oils for deep mahogany stains.`,
      badge: "Zero Chemical / Skin Safe",
    },
    {
      number: "04",
      icon: Home,
      title: "Doorstep Artistry & Direct Pay",
      desc: `Your artist arrives on time at your doorstep in ${localityLabel}. Enjoy customized intricate designs and pay the agreed amount directly upon completion.`,
      badge: "Punctuality Guarantee",
    },
  ];

  return (
    <section id="how-it-works" className="mt-16 scroll-mt-20">
      <div className="bg-card border border-line rounded-sharp p-6 md:p-10 shadow-sm">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-line">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[0.72rem] font-extrabold uppercase tracking-wider text-stain bg-parchment px-2.5 py-1 rounded-sharp mb-2.5">
              <Clock className="w-3.5 h-3.5 text-marigold" />
              <span>Simple 4-Step Process</span>
            </div>
            <h2 className="font-serif font-semibold text-2xl md:text-3xl text-ink leading-tight m-0">
              How Booking a Mehndi Artist Works in{" "}
              <span className="text-stain">{localityLabel}</span>
            </h2>
          </div>
          <p className="font-sans text-xs md:text-sm text-ink-soft max-w-md m-0">
            Book verified home-service mehndi artists across {localityLabel} &amp; {districtLabel} with transparent rates and zero hidden charges.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-white/80 hover:bg-white border border-line hover:border-line-strong rounded-sharp p-5 md:p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-sm group"
              >
                {/* Step Top Bar: Number & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif font-bold text-2xl text-marigold tracking-tight">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-parchment flex items-center justify-center text-stain group-hover:bg-stain group-hover:text-parchment transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Step Title */}
                  <h3 className="font-serif font-semibold text-base text-ink mb-2 leading-snug">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="font-sans text-xs text-ink-soft leading-relaxed mb-4">
                    {step.desc}
                  </p>
                </div>

                {/* Step Badge */}
                <div className="pt-3 border-t border-line/60 flex items-center gap-1 text-[0.7rem] font-bold text-stain">
                  <CheckCircle2 className="w-3.5 h-3.5 text-marigold shrink-0" />
                  <span>{step.badge}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Action / Urgency Banner */}
        <div className="bg-parchment-deep/50 border border-line-strong rounded-sharp p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-9 h-9 rounded-full bg-stain text-parchment flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-serif font-semibold text-sm text-ink m-0">
                Planning a function in {localityLabel} in the next 24–48 hours?
              </p>
              <p className="font-sans text-xs text-ink-soft m-0">
                Our local coordinators check active artist slots instantly. Average response time is under 15 minutes.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-stain hover:bg-stain-deep text-parchment text-xs font-bold uppercase tracking-wider rounded-sharp transition-colors w-full sm:w-auto text-center shadow-sm"
            >
              <span>Instant WhatsApp Check</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
