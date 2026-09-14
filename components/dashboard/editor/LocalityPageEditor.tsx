"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LocalityPageFormValues, localityPageSchema } from "@/lib/validations/page";
import { UrlBuilderCard } from "./UrlBuilderCard";
import { SeoCard } from "./SeoCard";
import { PriceEstimatorConfigCard } from "./PriceEstimatorConfigCard";
import { TiptapEditor } from "./TiptapEditor";
import { FaqRepeater } from "./FaqRepeater";
import { InterlinksCard } from "./InterlinksCard";
import { StatusActionBar } from "./StatusActionBar";
import { FileText, AlertCircle, CheckCircle2 } from "lucide-react";

interface LocalityPageEditorProps {
  initialData?: Partial<LocalityPageFormValues> & { id?: string };
  isNew?: boolean;
}

export const LocalityPageEditor: React.FC<LocalityPageEditorProps> = ({
  initialData,
  isNew = false,
}) => {
  const router = useRouter();

  const [formData, setFormData] = useState<LocalityPageFormValues>({
    country: initialData?.country || "india",
    countryLabel: initialData?.countryLabel || "India",
    city: initialData?.city || "delhi",
    cityLabel: initialData?.cityLabel || "Delhi",
    district: initialData?.district || "east-delhi",
    districtLabel: initialData?.districtLabel || "East Delhi",
    locality: initialData?.locality || "",
    localityLabel: initialData?.localityLabel || "",
    metaTitle: initialData?.metaTitle || "",
    metaDescription: initialData?.metaDescription || "",
    h1: initialData?.h1 || "",
    dek: initialData?.dek || "",
    heroImageUrl:
      initialData?.heroImageUrl ||
      "https://images.unsplash.com/photo-1599818816933-289d0c64bead?w=1200",
    heroImageAlt: initialData?.heroImageAlt || "",
    bodyHtml: initialData?.bodyHtml || "<p></p>",
    bodyJson: initialData?.bodyJson || null,
    status: initialData?.status || "DRAFT",
    readTime: initialData?.readTime || "11 min read",
    ratingValue: initialData?.ratingValue || 4.8,
    reviewCount: initialData?.reviewCount || 210,
    priceGuest: initialData?.priceGuest || "₹250 - ₹500",
    priceParty: initialData?.priceParty || "₹1,000 - ₹3,500",
    priceBridal: initialData?.priceBridal || "₹5,000 - ₹15,000",
    priceDisclaimer:
      initialData?.priceDisclaimer ||
      "(Prices vary by travel time/agreed upfront before booking)",
    faqs: initialData?.faqs || [],
    interlinkIds: initialData?.interlinkIds || [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSave = async (targetStatus?: "DRAFT" | "PUBLISHED") => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    const submissionData = {
      ...formData,
      status: targetStatus || formData.status,
    };

    // Client validation
    const parsed = localityPageSchema.safeParse(submissionData);
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      setError(`${issue.path.join(".")}: ${issue.message}`);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    try {
      const endpoint = isNew ? "/api/pages" : `/api/pages/${initialData?.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save locality page.");
      }

      setSuccess(
        targetStatus === "PUBLISHED"
          ? "Locality page published successfully!"
          : "Draft saved successfully!"
      );

      if (isNew && data.page?.id) {
        router.push(`/dashboard/pages/${data.page.id}`);
        router.refresh();
      } else {
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while saving.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id) return;
    if (
      !confirm(
        `Are you sure you want to delete the locality page for "${formData.localityLabel}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/pages/${initialData.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete page");
      router.push("/dashboard/pages");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to delete page.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Page Title & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line">
        <div>
          <h1 className="font-serif font-semibold text-2xl md:text-3xl text-ink m-0">
            {isNew ? "Create New Locality Page" : `Edit: ${formData.localityLabel || "Locality Page"}`}
          </h1>
          <p className="text-xs text-ink-soft mt-1">
            Fill in the 4 URL segments, SEO tags, pricing estimator, rich content, FAQs, and nearby interlinks.
          </p>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-sharp flex items-center gap-2 text-xs text-red-800">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Success Alert */}
      {success && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-sharp flex items-center gap-2 text-xs text-green-800">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-green-600" />
          <span>{success}</span>
        </div>
      )}

      {/* 1. URL Builder Card */}
      <UrlBuilderCard
        country={formData.country}
        countryLabel={formData.countryLabel}
        city={formData.city}
        cityLabel={formData.cityLabel}
        district={formData.district}
        districtLabel={formData.districtLabel}
        locality={formData.locality}
        localityLabel={formData.localityLabel}
        excludeId={initialData?.id}
        onChange={(fields) => setFormData((prev) => ({ ...prev, ...fields }))}
      />

      {/* 2. SEO Card with Hero Image URL & Live Preview */}
      <SeoCard
        metaTitle={formData.metaTitle}
        metaDescription={formData.metaDescription}
        h1={formData.h1}
        dek={formData.dek || ""}
        heroImageUrl={formData.heroImageUrl || ""}
        heroImageAlt={formData.heroImageAlt || ""}
        readTime={formData.readTime}
        ratingValue={formData.ratingValue}
        reviewCount={formData.reviewCount}
        onChange={(fields) => setFormData((prev) => ({ ...prev, ...fields }))}
      />

      {/* 3. Locality Quick Price Estimator Config Card */}
      <PriceEstimatorConfigCard
        localityLabel={formData.localityLabel}
        priceGuest={formData.priceGuest}
        priceParty={formData.priceParty}
        priceBridal={formData.priceBridal}
        priceDisclaimer={formData.priceDisclaimer}
        onChange={(fields) => setFormData((prev) => ({ ...prev, ...fields }))}
      />

      {/* 4. Rich Text Content Editor */}
      <div className="bg-card border border-line rounded-sharp p-6 shadow-sm">
        <div className="flex items-center gap-2 pb-3 border-b border-line mb-4">
          <FileText className="w-4 h-4 text-stain" />
          <h3 className="font-serif font-semibold text-base text-ink m-0">
            Rich Body Content (Tiptap Editorial Editor)
          </h3>
        </div>
        <p className="text-xs text-ink-soft mb-4">
          Use the custom toolbar blocks to insert Callout Boxes, 2×2 Problem Grids, Numbered Checklists,
          and Maroon Feature Panels matching the public design template.
        </p>
        <TiptapEditor
          value={formData.bodyHtml}
          initialJson={formData.bodyJson}
          onChange={(html, json) => {
            setFormData((prev) => ({
              ...prev,
              bodyHtml: html,
              bodyJson: json,
            }));
          }}
        />
      </div>

      {/* 5. FAQ Repeater */}
      <FaqRepeater
        faqs={formData.faqs}
        onChange={(faqs) => setFormData((prev) => ({ ...prev, faqs }))}
      />

      {/* 6. Interlinking Card */}
      <InterlinksCard
        currentId={initialData?.id}
        selectedIds={formData.interlinkIds}
        onChange={(ids) => setFormData((prev) => ({ ...prev, interlinkIds: ids }))}
      />

      {/* 7. Sticky Status & Action Bar */}
      <StatusActionBar
        status={formData.status}
        loading={loading}
        country={formData.country}
        city={formData.city}
        district={formData.district}
        locality={formData.locality}
        onStatusChange={(status) => setFormData((prev) => ({ ...prev, status }))}
        onSave={handleSave}
        onDelete={!isNew ? handleDelete : undefined}
      />
    </div>
  );
};
