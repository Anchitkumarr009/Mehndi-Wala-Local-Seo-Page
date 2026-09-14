"use client";

import React, { useState } from "react";
import { uiLabels } from "@/content/labels";
import { Calendar, Zap, Sparkles, CheckCircle2, ThumbsUp, ThumbsDown } from "lucide-react";

interface SidebarProps {
  localityLabel: string;
  districtLabel?: string;
  cityLabel?: string;
  priceGuest?: string | null;
  priceParty?: string | null;
  priceBridal?: string | null;
  priceDisclaimer?: string | null;
}

/** Left Sidebar: Quick Estimator / Pricing Guide Card */
export const PricingEstimatorCard: React.FC<SidebarProps> = ({
  localityLabel,
  priceGuest,
  priceParty,
  priceBridal,
  priceDisclaimer,
}) => {
  return (
    <div className="bg-ink text-parchment border border-line-strong rounded-sharp overflow-hidden shadow-sm">
      <div className="bg-[#421726] px-4 py-3 border-b border-white/10 flex items-center gap-2">
        <Zap className="w-4 h-4 text-marigold-soft fill-current" />
        <div>
          <div className="font-bold text-[0.68rem] text-marigold-soft uppercase tracking-wider">
            {uiLabels.sidebar.pricingEstimator.kicker}
          </div>
          <div className="font-serif font-semibold text-xs text-parchment">
            {localityLabel} {uiLabels.sidebar.pricingEstimator.titleSuffix}
          </div>
        </div>
      </div>
      <div className="p-4 space-y-2.5 text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <span className="text-parchment/80">
            {uiLabels.sidebar.pricingEstimator.guestTier}
          </span>
          <span className="font-bold text-marigold-soft">
            {priceGuest || uiLabels.sidebar.pricingEstimator.guestPrice}
          </span>
        </div>
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <span className="text-parchment/80">
            {uiLabels.sidebar.pricingEstimator.semiTier}
          </span>
          <span className="font-bold text-marigold-soft">
            {priceParty || uiLabels.sidebar.pricingEstimator.semiPrice}
          </span>
        </div>
        <div className="flex items-center justify-between pb-1">
          <span className="text-parchment/80">
            {uiLabels.sidebar.pricingEstimator.bridalTier}
          </span>
          <span className="font-bold text-marigold-soft">
            {priceBridal || uiLabels.sidebar.pricingEstimator.bridalPrice}
          </span>
        </div>
        <div className="pt-2 text-[0.68rem] text-parchment/60 leading-tight">
          {priceDisclaimer || uiLabels.sidebar.pricingEstimator.disclaimer}
        </div>
      </div>
    </div>
  );
};


/** Left Sidebar: Urgent Booking Card */
export const UrgentBookingCard: React.FC<SidebarProps> = ({ localityLabel }) => {
  return (
    <div className="bg-card border border-line rounded-sharp p-4 text-center shadow-sm">
      <div className="w-10 h-10 mx-auto mb-2.5 rounded-full bg-parchment flex items-center justify-center text-stain">
        <Sparkles className="w-5 h-5" />
      </div>
      <h4 className="font-serif font-semibold text-sm text-ink mb-1">
        {uiLabels.sidebar.urgentCard.title}
      </h4>
      <p className="text-xs text-ink-soft mb-3 leading-relaxed">
        {uiLabels.sidebar.urgentCard.descriptionPrefix} {localityLabel}{" "}
        {uiLabels.sidebar.urgentCard.descriptionSuffix}
      </p>
      <a
        href="#artists-section"
        className="block w-full py-2 px-3 text-[0.78rem] font-bold text-parchment bg-marigold hover:bg-marigold/90 rounded-sharp uppercase tracking-wider transition-colors shadow-sm"
      >
        {uiLabels.sidebar.urgentCard.cta}
      </a>
    </div>
  );
};

/** Desktop Right Sidebar: Date Availability Check Mini-form */
export const DateAvailabilityCard: React.FC<SidebarProps> = ({ localityLabel }) => {
  const [date, setDate] = useState("");
  const [occasion, setOccasion] = useState("Bridal Full Package");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-card border border-line rounded-sharp p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <Calendar className="w-4 h-4 text-stain" />
        <h4 className="font-sans font-bold text-xs text-ink uppercase tracking-wider">
          {uiLabels.rightCards.availability.title}
        </h4>
      </div>
      <p className="text-xs text-ink-soft mb-3 leading-relaxed">
        {uiLabels.rightCards.availability.descriptionPrefix} {localityLabel}
        {uiLabels.rightCards.availability.descriptionSuffix}
      </p>

      {submitted ? (
        <div className="bg-parchment-deep p-3 rounded-sharp text-center text-xs text-ink">
          <CheckCircle2 className="w-5 h-5 text-stain mx-auto mb-1" />
          <p className="font-semibold m-0">Searching available slots...</p>
          <p className="text-[0.7rem] text-ink-soft m-0 mt-1">
            Matching verified artists in {localityLabel}.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-[0.68rem] font-bold text-ink-soft uppercase mb-1">
              {uiLabels.rightCards.availability.functionDateLabel}
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-line rounded-sharp text-ink focus:outline-none focus:border-stain"
            />
          </div>
          <div>
            <label className="block text-[0.68rem] font-bold text-ink-soft uppercase mb-1">
              {uiLabels.rightCards.availability.occasionLabel}
            </label>
            <select
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-line rounded-sharp text-ink focus:outline-none focus:border-stain"
            >
              <option value="Bridal Full Package">Bridal Full Package</option>
              <option value="Engagement / Roka">Engagement / Roka</option>
              <option value="Family & Guest Mehndi">Family & Guest Mehndi</option>
              <option value="Karwa Chauth / Festival">Karwa Chauth / Festival</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 text-xs font-bold text-parchment bg-stain hover:bg-stain-deep rounded-sharp uppercase tracking-wider transition-colors shadow-sm"
          >
            {uiLabels.rightCards.availability.btnLabel}
          </button>
        </form>
      )}
    </div>
  );
};

/** Desktop Right Sidebar: Artist Partner Program Card */
export const ArtistPartnerCard: React.FC<SidebarProps> = ({ localityLabel }) => {
  return (
    <div className="bg-[#B95D12] text-white rounded-sharp p-4 shadow-sm">
      <span className="inline-block text-[0.64rem] font-extrabold uppercase tracking-wider bg-black/20 px-2 py-0.5 rounded-full mb-2">
        {uiLabels.rightCards.partner.badge}
      </span>
      <h4 className="font-serif font-semibold text-sm text-white mb-1.5 leading-snug">
        {uiLabels.rightCards.partner.titlePrefix} {localityLabel}
        {uiLabels.rightCards.partner.titleSuffix}
      </h4>
      <p className="text-xs text-white/90 mb-3 leading-relaxed">
        {uiLabels.rightCards.partner.description}
      </p>
      <a
        href="/for-artists"
        className="block text-center py-2 text-xs font-bold text-white bg-stain-deep hover:bg-ink rounded-sharp uppercase tracking-wider transition-colors shadow-sm"
      >
        {uiLabels.rightCards.partner.cta}
      </a>
    </div>
  );
};

/** Desktop Right Sidebar: Was this guide helpful? */
export const GuideFeedbackCard: React.FC = () => {
  const [feedback, setFeedback] = useState<string | null>(null);

  return (
    <div className="bg-card border border-line rounded-sharp p-3 text-center shadow-sm">
      <div className="text-[0.72rem] font-bold text-ink-soft uppercase mb-2">
        {uiLabels.rightCards.feedback.title}
      </div>
      {feedback ? (
        <p className="text-xs text-stain font-semibold m-0">Thank you for your feedback!</p>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setFeedback("yes")}
            className="flex items-center gap-1 px-3 py-1 text-xs font-semibold text-ink bg-parchment hover:bg-parchment-deep border border-line rounded-sharp transition-colors"
          >
            <ThumbsUp className="w-3.5 h-3.5 text-stain" />
            <span>Yes</span>
          </button>
          <button
            type="button"
            onClick={() => setFeedback("needs-more")}
            className="flex items-center gap-1 px-3 py-1 text-xs font-semibold text-ink bg-parchment hover:bg-parchment-deep border border-line rounded-sharp transition-colors"
          >
            <ThumbsDown className="w-3.5 h-3.5 text-ink-soft" />
            <span>Needs more</span>
          </button>
        </div>
      )}
    </div>
  );
};
