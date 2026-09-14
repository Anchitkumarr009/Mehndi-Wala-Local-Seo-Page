"use client";

import React from "react";
import { Zap, Tag } from "lucide-react";

interface PriceEstimatorConfigCardProps {
  localityLabel: string;
  priceGuest: string;
  priceParty: string;
  priceBridal: string;
  priceDisclaimer: string;
  onChange: (fields: Partial<{
    priceGuest: string;
    priceParty: string;
    priceBridal: string;
    priceDisclaimer: string;
  }>) => void;
}

export const PriceEstimatorConfigCard: React.FC<PriceEstimatorConfigCardProps> = ({
  localityLabel,
  priceGuest,
  priceParty,
  priceBridal,
  priceDisclaimer,
  onChange,
}) => {
  return (
    <div className="bg-card border border-line rounded-sharp p-6 shadow-sm">
      <div className="flex items-center gap-2 pb-3 border-b border-line mb-4">
        <Tag className="w-4 h-4 text-stain" />
        <h3 className="font-serif font-semibold text-base text-ink m-0">
          Locality Quick Price Estimator
        </h3>
      </div>

      <p className="text-xs text-ink-soft mb-4 leading-relaxed">
        Customize the pricing gauge shown in the left sidebar specifically for {localityLabel || "this locality"}.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Simple / Guest Hand */}
        <div>
          <label className="block text-[0.68rem] font-bold text-ink-soft uppercase mb-1">
            Simple / Guest Hand Price
          </label>
          <input
            type="text"
            required
            placeholder="₹250 - ₹500"
            value={priceGuest}
            onChange={(e) => onChange({ priceGuest: e.target.value })}
            className="w-full px-2.5 py-1.5 text-xs font-semibold bg-white border border-line rounded-sharp text-ink focus:outline-none focus:border-stain"
          />
        </div>

        {/* Semi-Bridal / Party */}
        <div>
          <label className="block text-[0.68rem] font-bold text-ink-soft uppercase mb-1">
            Semi-Bridal / Party Price
          </label>
          <input
            type="text"
            required
            placeholder="₹1,000 - ₹3,500"
            value={priceParty}
            onChange={(e) => onChange({ priceParty: e.target.value })}
            className="w-full px-2.5 py-1.5 text-xs font-semibold bg-white border border-line rounded-sharp text-ink focus:outline-none focus:border-stain"
          />
        </div>

        {/* Full Bridal Package */}
        <div>
          <label className="block text-[0.68rem] font-bold text-ink-soft uppercase mb-1">
            Full Bridal Package Price
          </label>
          <input
            type="text"
            required
            placeholder="₹5,000 - ₹15,000"
            value={priceBridal}
            onChange={(e) => onChange({ priceBridal: e.target.value })}
            className="w-full px-2.5 py-1.5 text-xs font-semibold bg-white border border-line rounded-sharp text-ink focus:outline-none focus:border-stain"
          />
        </div>
      </div>

      {/* Disclaimer Text */}
      <div className="mb-5">
        <label className="block text-[0.68rem] font-bold text-ink-soft uppercase mb-1">
          Disclaimer / Notes Line
        </label>
        <input
          type="text"
          placeholder="(Prices vary by travel time/agreed upfront before booking)"
          value={priceDisclaimer}
          onChange={(e) => onChange({ priceDisclaimer: e.target.value })}
          className="w-full px-2.5 py-1.5 text-xs bg-white border border-line rounded-sharp text-ink focus:outline-none focus:border-stain"
        />
      </div>

      {/* Live Sidebar Card Preview */}
      <div className="pt-4 border-t border-line">
        <div className="text-[0.68rem] font-bold text-ink-soft uppercase tracking-wider mb-2">
          Sidebar Card Live Preview:
        </div>
        <div className="max-w-xs bg-ink text-parchment border border-line-strong rounded-sharp overflow-hidden shadow-sm">
          <div className="bg-[#421726] px-4 py-2.5 border-b border-white/10 flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-marigold-soft fill-current" />
            <div>
              <div className="font-bold text-[0.64rem] text-marigold-soft uppercase tracking-wider">
                QUICK ESTIMATOR
              </div>
              <div className="font-serif font-semibold text-xs text-parchment">
                {localityLabel || "Locality"} Pricing Gauge
              </div>
            </div>
          </div>
          <div className="p-3.5 space-y-2 text-xs">
            <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
              <span className="text-parchment/80">Simple / Guest Hand</span>
              <span className="font-bold text-marigold-soft">{priceGuest || "₹250 - ₹500"}</span>
            </div>
            <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
              <span className="text-parchment/80">Semi-Bridal / Party</span>
              <span className="font-bold text-marigold-soft">{priceParty || "₹1,000 - ₹3,500"}</span>
            </div>
            <div className="flex items-center justify-between pb-1">
              <span className="text-parchment/80">Full Bridal Package</span>
              <span className="font-bold text-marigold-soft">{priceBridal || "₹5,000 - ₹15,000"}</span>
            </div>
            <div className="pt-1 text-[0.65rem] text-parchment/60 leading-tight">
              {priceDisclaimer || "(Prices vary by travel time/agreed upfront before booking)"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
