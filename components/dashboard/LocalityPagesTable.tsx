"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import {
  Search,
  FileEdit,
  Copy,
  Trash2,
  ExternalLink,
  Loader2,
  MapPin,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export interface PageListItem {
  id: string;
  localityLabel: string;
  districtLabel: string;
  cityLabel: string;
  countryLabel: string;
  canonicalPath: string;
  status: string;
  updatedAt: string;
  publishedAt: string | null;
  faqCount: number;
  interlinkCount: number;
}

interface LocalityPagesTableProps {
  initialPages: PageListItem[];
}

export const LocalityPagesTable: React.FC<LocalityPagesTableProps> = ({ initialPages }) => {
  const router = useRouter();
  const [pages, setPages] = useState<PageListItem[]>(initialPages);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  const filteredPages = pages.filter((p) => {
    const matchesSearch =
      p.localityLabel.toLowerCase().includes(search.toLowerCase()) ||
      p.districtLabel.toLowerCase().includes(search.toLowerCase()) ||
      p.cityLabel.toLowerCase().includes(search.toLowerCase()) ||
      p.canonicalPath.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || p.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleDuplicate = async (id: string, name: string) => {
    setActionLoading(id);
    setMessage(null);
    try {
      const res = await fetch(`/api/pages/${id}/duplicate`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to duplicate page");

      setMessage({
        type: "success",
        text: `Duplicated "${name}" as draft!`,
      });
      router.refresh();
      // Reload pages list
      const updatedList = await (await fetch("/api/pages")).json();
      if (updatedList.pages) {
        setPages(
          updatedList.pages.map((p: any) => ({
            id: p.id,
            localityLabel: p.localityLabel,
            districtLabel: p.districtLabel,
            cityLabel: p.cityLabel,
            countryLabel: p.countryLabel,
            canonicalPath: `/${p.country}/${p.city}/${p.district}/${p.locality}`,
            status: p.status,
            updatedAt: p.updatedAt,
            publishedAt: p.publishedAt,
            faqCount: p._count?.faqs || 0,
            interlinkCount: p._count?.interlinksFrom || 0,
          }))
        );
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Duplication failed." });
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (
      !confirm(
        `Are you sure you want to delete the locality page for "${name}"? This cannot be undone.`
      )
    ) {
      return;
    }

    setActionLoading(id);
    setMessage(null);
    try {
      const res = await fetch(`/api/pages/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete page");

      setMessage({
        type: "success",
        text: `Deleted "${name}" successfully.`,
      });
      setPages(pages.filter((p) => p.id !== id));
      router.refresh();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Deletion failed." });
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Alert Message */}
      {message && (
        <div
          className={`p-3 rounded-sharp border flex items-center gap-2 text-xs ${
            message.type === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Filters Bar */}
      <div className="bg-card border border-line rounded-sharp p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-ink-soft absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by locality, district, city, or path..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-line rounded-sharp text-ink focus:outline-none focus:border-stain"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs font-bold text-ink-soft uppercase tracking-wider">
            Status:
          </span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-white border border-line rounded-sharp text-ink focus:outline-none focus:border-stain"
          >
            <option value="ALL">All Statuses ({pages.length})</option>
            <option value="PUBLISHED">Published Only</option>
            <option value="DRAFT">Draft Only</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-line rounded-sharp overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-parchment-deep border-b border-line text-ink uppercase tracking-wider font-bold text-[0.7rem]">
                <th className="p-3.5 pl-4">Locality &amp; Hierarchy</th>
                <th className="p-3.5">Canonical Path</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">FAQs / Links</th>
                <th className="p-3.5">Last Updated</th>
                <th className="p-3.5 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filteredPages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-xs text-ink-soft">
                    No locality pages found matching your search.
                  </td>
                </tr>
              ) : (
                filteredPages.map((page) => {
                  const isPublished = page.status === "PUBLISHED";
                  const previewHref = `${page.canonicalPath}${!isPublished ? "?preview=true" : ""}`;

                  return (
                    <tr
                      key={page.id}
                      className="hover:bg-parchment/40 transition-colors"
                    >
                      {/* Locality & District */}
                      <td className="p-3.5 pl-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-stain flex-shrink-0" />
                          <div>
                            <Link
                              href={`/dashboard/pages/${page.id}`}
                              className="font-serif font-semibold text-sm text-ink hover:text-stain hover:underline"
                            >
                              {page.localityLabel}
                            </Link>
                            <div className="text-[0.68rem] text-ink-soft">
                              {page.districtLabel}, {page.cityLabel}, {page.countryLabel}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Path */}
                      <td className="p-3.5">
                        <code className="text-[0.72rem] font-mono text-ink bg-parchment px-2 py-0.5 rounded-sharp border border-line select-all">
                          {page.canonicalPath}
                        </code>
                      </td>

                      {/* Status */}
                      <td className="p-3.5">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-[0.68rem] uppercase tracking-wider ${
                            isPublished
                              ? "bg-green-100 text-green-800 border border-green-200"
                              : "bg-amber-100 text-amber-800 border border-amber-200"
                          }`}
                        >
                          {page.status}
                        </span>
                      </td>

                      {/* Stats */}
                      <td className="p-3.5 text-ink-soft">
                        <span>{page.faqCount} FAQs</span> •{" "}
                        <span>{page.interlinkCount} Links</span>
                      </td>

                      {/* Updated */}
                      <td className="p-3.5 text-ink-soft">
                        {formatDate(page.updatedAt)}
                      </td>

                      {/* Actions */}
                      <td className="p-3.5 pr-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          {/* Edit */}
                          <Link
                            href={`/dashboard/pages/${page.id}`}
                            title="Edit Locality Page"
                            className="p-1.5 text-ink-soft hover:text-ink hover:bg-parchment border border-line rounded-sharp transition-colors"
                          >
                            <FileEdit className="w-3.5 h-3.5" />
                          </Link>

                          {/* Preview */}
                          <a
                            href={previewHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="View Live/Preview Page"
                            className="p-1.5 text-ink-soft hover:text-stain hover:bg-parchment border border-line rounded-sharp transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          {/* Duplicate */}
                          <button
                            type="button"
                            disabled={actionLoading === page.id}
                            onClick={() => handleDuplicate(page.id, page.localityLabel)}
                            title="Duplicate Page"
                            className="p-1.5 text-ink-soft hover:text-ink hover:bg-parchment border border-line rounded-sharp transition-colors disabled:opacity-50"
                          >
                            {actionLoading === page.id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            disabled={actionLoading === page.id}
                            onClick={() => handleDelete(page.id, page.localityLabel)}
                            title="Delete Page"
                            className="p-1.5 text-red-600 hover:bg-red-50 border border-red-200 rounded-sharp transition-colors disabled:opacity-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
