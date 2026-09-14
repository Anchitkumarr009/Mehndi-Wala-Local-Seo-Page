"use client";

import React, { useEffect, useState, useCallback } from "react";
import { slugify, buildCanonicalUrl } from "@/lib/utils";
import { Copy, Check, AlertCircle, CheckCircle2, Loader2, Link2 } from "lucide-react";

interface UrlBuilderProps {
  country: string;
  countryLabel: string;
  city: string;
  cityLabel: string;
  district: string;
  districtLabel: string;
  locality: string;
  localityLabel: string;
  excludeId?: string;
  onChange: (fields: {
    country: string;
    countryLabel: string;
    city: string;
    cityLabel: string;
    district: string;
    districtLabel: string;
    locality: string;
    localityLabel: string;
  }) => void;
}

export const UrlBuilderCard: React.FC<UrlBuilderProps> = ({
  country,
  countryLabel,
  city,
  cityLabel,
  district,
  districtLabel,
  locality,
  localityLabel,
  excludeId,
  onChange,
}) => {
  const [copied, setCopied] = useState(false);
  const [checking, setChecking] = useState(false);
  const [slugStatus, setSlugStatus] = useState<{
    available: boolean;
    message?: string;
  } | null>(null);

  // Derive Canonical URL
  const canonicalUrl = buildCanonicalUrl(country, city, district, locality);

  // Debounced uniqueness check
  useEffect(() => {
    if (!country || !city || !district || !locality) {
      setSlugStatus(null);
      return;
    }

    setChecking(true);
    const timer = setTimeout(async () => {
      try {
        const params = new URLSearchParams({
          country,
          city,
          district,
          locality,
          excludeId: excludeId || "",
        });
        const res = await fetch(`/api/pages/check-slug?${params.toString()}`);
        const data = await res.json();
        setSlugStatus({
          available: data.available,
          message: data.message,
        });
      } catch (err) {
        console.error("Slug check failed:", err);
      } finally {
        setChecking(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [country, city, district, locality, excludeId]);

  const handleCopy = () => {
    navigator.clipboard.writeText(canonicalUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLabelChange = (field: "country" | "city" | "district" | "locality", label: string) => {
    const slug = slugify(label);
    onChange({
      country: field === "country" ? slug : country,
      countryLabel: field === "country" ? label : countryLabel,
      city: field === "city" ? slug : city,
      cityLabel: field === "city" ? label : cityLabel,
      district: field === "district" ? slug : district,
      districtLabel: field === "district" ? label : districtLabel,
      locality: field === "locality" ? slug : locality,
      localityLabel: field === "locality" ? label : localityLabel,
    });
  };

  const handleSlugOverride = (field: "country" | "city" | "district" | "locality", slugVal: string) => {
    const cleaned = slugify(slugVal);
    onChange({
      country: field === "country" ? cleaned : country,
      countryLabel: countryLabel,
      city: field === "city" ? cleaned : city,
      cityLabel: cityLabel,
      district: field === "district" ? cleaned : district,
      districtLabel: districtLabel,
      locality: field === "locality" ? cleaned : locality,
      localityLabel: localityLabel,
    });
  };

  return (
    <div className="bg-card border border-line rounded-sharp p-6 shadow-sm">
      <div className="flex items-center gap-2 pb-3 border-b border-line mb-4">
        <Link2 className="w-4 h-4 text-stain" />
        <h3 className="font-serif font-semibold text-base text-ink m-0">
          URL Builder &amp; Locality Hierarchy
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {/* Country */}
        <div>
          <label className="block text-[0.68rem] font-bold text-ink-soft uppercase mb-1">
            Country
          </label>
          <input
            type="text"
            required
            placeholder="India"
            value={countryLabel}
            onChange={(e) => handleLabelChange("country", e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs bg-white border border-line rounded-sharp text-ink focus:outline-none focus:border-stain"
          />
          <input
            type="text"
            placeholder="Slug (e.g. india)"
            value={country}
            onChange={(e) => handleSlugOverride("country", e.target.value)}
            className="w-full mt-1 px-2.5 py-1 text-[0.7rem] font-mono bg-parchment/60 border border-line rounded-sharp text-ink-soft focus:outline-none"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-[0.68rem] font-bold text-ink-soft uppercase mb-1">
            City / State
          </label>
          <input
            type="text"
            required
            placeholder="Delhi"
            value={cityLabel}
            onChange={(e) => handleLabelChange("city", e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs bg-white border border-line rounded-sharp text-ink focus:outline-none focus:border-stain"
          />
          <input
            type="text"
            placeholder="Slug (e.g. delhi)"
            value={city}
            onChange={(e) => handleSlugOverride("city", e.target.value)}
            className="w-full mt-1 px-2.5 py-1 text-[0.7rem] font-mono bg-parchment/60 border border-line rounded-sharp text-ink-soft focus:outline-none"
          />
        </div>

        {/* District */}
        <div>
          <label className="block text-[0.68rem] font-bold text-ink-soft uppercase mb-1">
            District / Zone
          </label>
          <input
            type="text"
            required
            placeholder="East Delhi"
            value={districtLabel}
            onChange={(e) => handleLabelChange("district", e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs bg-white border border-line rounded-sharp text-ink focus:outline-none focus:border-stain"
          />
          <input
            type="text"
            placeholder="Slug (e.g. east-delhi)"
            value={district}
            onChange={(e) => handleSlugOverride("district", e.target.value)}
            className="w-full mt-1 px-2.5 py-1 text-[0.7rem] font-mono bg-parchment/60 border border-line rounded-sharp text-ink-soft focus:outline-none"
          />
        </div>

        {/* Locality */}
        <div>
          <label className="block text-[0.68rem] font-bold text-ink-soft uppercase mb-1">
            Locality / Area
          </label>
          <input
            type="text"
            required
            placeholder="Anand Vihar"
            value={localityLabel}
            onChange={(e) => handleLabelChange("locality", e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs bg-white border border-line rounded-sharp text-ink focus:outline-none focus:border-stain"
          />
          <input
            type="text"
            placeholder="Slug (e.g. anand-vihar)"
            value={locality}
            onChange={(e) => handleSlugOverride("locality", e.target.value)}
            className="w-full mt-1 px-2.5 py-1 text-[0.7rem] font-mono bg-parchment/60 border border-line rounded-sharp text-ink-soft focus:outline-none"
          />
        </div>
      </div>

      {/* Live Canonical URL Preview Box */}
      <div className="bg-parchment-deep/70 p-3 rounded-sharp border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-[0.68rem] font-bold text-ink-soft uppercase tracking-wider mb-0.5">
            Canonical URL Preview
          </div>
          <div className="font-mono text-xs text-ink truncate select-all">
            {canonicalUrl}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {checking ? (
            <span className="flex items-center gap-1 text-xs text-ink-soft">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Checking...</span>
            </span>
          ) : slugStatus ? (
            slugStatus.available ? (
              <span className="flex items-center gap-1 text-xs text-green-700 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>URL Available</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs text-red-700 font-bold">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Slug Taken</span>
              </span>
            )
          ) : null}

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-ink bg-white hover:bg-parchment border border-line rounded-sharp transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-600" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-ink-soft" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
