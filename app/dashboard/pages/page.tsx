import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { buildCanonicalPath } from "@/lib/utils";
import { PlusCircle, Search, FileEdit, Copy, Trash2, ExternalLink, Globe } from "lucide-react";
import { LocalityPagesTable } from "@/components/dashboard/LocalityPagesTable";

export const dynamic = "force-dynamic";

export default async function PagesListPage() {
  let pages: any[] = [];
  try {
    pages = await prisma.localityPage.findMany({
      orderBy: { updatedAt: "desc" },
      include: {
        _count: {
          select: { faqs: true, interlinksFrom: true },
        },
      },
    });
  } catch (err) {
    console.error("Error fetching locality pages in dashboard:", err);
  }

  const formattedPages = pages.map((p) => ({
    id: p.id,
    localityLabel: p.localityLabel,
    districtLabel: p.districtLabel,
    cityLabel: p.cityLabel,
    countryLabel: p.countryLabel,
    canonicalPath: buildCanonicalPath(p.country, p.city, p.district, p.locality),
    status: p.status,
    updatedAt: p.updatedAt.toISOString(),
    publishedAt: p.publishedAt ? p.publishedAt.toISOString() : null,
    faqCount: p._count.faqs,
    interlinkCount: p._count.interlinksFrom,
  }));

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line">
        <div>
          <h1 className="font-serif font-semibold text-2xl md:text-3xl text-ink m-0">
            Locality Pages ({pages.length})
          </h1>
          <p className="text-xs text-ink-soft mt-1">
            Manage programmatic SEO landing pages across all 4 URL path segments.
          </p>
        </div>

        <Link
          href="/dashboard/pages/new"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-parchment bg-stain hover:bg-stain-deep rounded-sharp uppercase tracking-wider transition-colors shadow-sm self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Locality Page</span>
        </Link>
      </div>

      {/* Interactive Table with Search, Filter, Duplicate, Delete */}
      <LocalityPagesTable initialPages={formattedPages} />
    </div>
  );
}
