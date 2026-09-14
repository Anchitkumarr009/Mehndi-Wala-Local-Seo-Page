"use client";

import React from "react";
import { Loader2, Eye, Save, Send, Trash2 } from "lucide-react";
import { buildCanonicalPath } from "@/lib/utils";

interface StatusActionBarProps {
  status: "DRAFT" | "PUBLISHED";
  loading: boolean;
  country: string;
  city: string;
  district: string;
  locality: string;
  onStatusChange: (status: "DRAFT" | "PUBLISHED") => void;
  onSave: (targetStatus: "DRAFT" | "PUBLISHED") => void;
  onDelete?: () => void;
}

export const StatusActionBar: React.FC<StatusActionBarProps> = ({
  status,
  loading,
  country,
  city,
  district,
  locality,
  onStatusChange,
  onSave,
  onDelete,
}) => {
  const previewPath =
    country && city && district && locality
      ? `${buildCanonicalPath(country, city, district, locality)}?preview=true`
      : "";

  return (
    <div className="bg-card border border-line rounded-sharp p-4 shadow-sm sticky bottom-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Left Status Mode */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
        <span className="text-xs font-bold text-ink-soft uppercase tracking-wider">
          Publish Status:
        </span>
        <div className="flex items-center bg-parchment p-1 rounded-sharp border border-line">
          <button
            type="button"
            onClick={() => onStatusChange("DRAFT")}
            className={`px-3 py-1 text-xs font-bold rounded-sharp transition-colors ${
              status === "DRAFT"
                ? "bg-amber-600 text-white shadow-2xs"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            Draft
          </button>
          <button
            type="button"
            onClick={() => onStatusChange("PUBLISHED")}
            className={`px-3 py-1 text-xs font-bold rounded-sharp transition-colors ${
              status === "PUBLISHED"
                ? "bg-green-700 text-white shadow-2xs"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            Published
          </button>
        </div>
      </div>

      {/* Right Action Buttons */}
      <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
        {onDelete && (
          <button
            type="button"
            disabled={loading}
            onClick={onDelete}
            className="p-2 text-red-600 hover:bg-red-50 border border-red-200 rounded-sharp transition-colors"
            title="Delete Locality Page"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}

        {previewPath && (
          <a
            href={previewPath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-ink hover:bg-parchment border border-line rounded-sharp uppercase tracking-wider transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </a>
        )}

        <button
          type="button"
          disabled={loading}
          onClick={() => onSave("DRAFT")}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-ink hover:bg-parchment border border-line-strong rounded-sharp uppercase tracking-wider transition-colors disabled:opacity-50"
        >
          {loading && status === "DRAFT" ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Save className="w-3.5 h-3.5" />
          )}
          <span>Save Draft</span>
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={() => onSave("PUBLISHED")}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-parchment bg-stain hover:bg-stain-deep rounded-sharp uppercase tracking-wider transition-colors shadow-sm disabled:opacity-50"
        >
          {loading && status === "PUBLISHED" ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Send className="w-3.5 h-3.5" />
          )}
          <span>Publish Page</span>
        </button>
      </div>
    </div>
  );
};
