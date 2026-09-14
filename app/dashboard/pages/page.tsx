import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { buildCanonicalPath } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import { LocalityPagesTable } from "@/components/dashboard/LocalityPagesTable";

export const dynamic = "force-dynamic";

export default async function PagesListPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/dashboard/login");
  }
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

  const formattedPages = (pages || []).map((p) => ({
    id: p.id,
    localityLabel: p.localityLabel || "",
    districtLabel: p.districtLabel || "",
    cityLabel: p.cityLabel || "",
    countryLabel: p.countryLabel || "",
    canonicalPath: buildCanonicalPath(p.country || "india", p.city || "delhi", p.district || "", p.locality || ""),
    status: p.status || "DRAFT",
    updatedAt: p.updatedAt ? (p.updatedAt instanceof Date ? p.updatedAt.toISOString() : String(p.updatedAt)) : new Date().toISOString(),
    publishedAt: p.publishedAt ? (p.publishedAt instanceof Date ? p.publishedAt.toISOString() : String(p.publishedAt)) : null,
    faqCount: p._count?.faqs || 0,
    interlinkCount: p._count?.interlinksFrom || 0,
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
