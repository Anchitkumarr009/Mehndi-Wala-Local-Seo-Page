import React from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MapPin, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-parchment">
      <SiteHeader />

      <main className="flex-1 max-w-wrap mx-auto px-6 py-16 md:py-24 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-parchment-deep flex items-center justify-center text-stain mb-6 border border-line">
          <MapPin className="w-8 h-8" />
        </div>

        <span className="text-xs font-extrabold text-stain uppercase tracking-widest mb-2">
          404 — Page Not Found
        </span>

        <h1 className="font-serif font-semibold text-3xl sm:text-4xl md:text-5xl text-ink mb-4 max-w-lg">
          Locality Guide Not Found
        </h1>

        <p className="font-sans text-sm sm:text-base text-ink-soft max-w-md mb-8 leading-relaxed">
          The requested locality guide could not be found or has not been published yet. Explore verified artists across other Delhi NCR hubs.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-stain hover:bg-stain-deep text-parchment text-xs font-bold uppercase tracking-wider rounded-sharp transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return to Directory</span>
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white hover:bg-parchment text-ink border border-line-strong text-xs font-bold uppercase tracking-wider rounded-sharp transition-colors"
          >
            <span>Editor Dashboard</span>
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
