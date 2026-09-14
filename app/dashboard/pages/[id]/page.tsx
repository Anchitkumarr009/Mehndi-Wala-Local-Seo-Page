import React from "react";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { LocalityPageEditor } from "@/components/dashboard/editor/LocalityPageEditor";

interface EditPageProps {
  params: {
    id: string;
  };
}

export const dynamic = "force-dynamic";

export default async function EditLocalityPage({ params }: EditPageProps) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/dashboard/login");
  }

  const { id } = params;

  const page = await prisma.localityPage.findUnique({
    where: { id },
    include: {
      faqs: {
        orderBy: { order: "asc" },
      },
      interlinksFrom: true,
    },
  });

  if (!page) {
    notFound();
  }

  const initialData = {
    id: page.id,
    country: page.country,
    countryLabel: page.countryLabel,
    city: page.city,
    cityLabel: page.cityLabel,
    district: page.district,
    districtLabel: page.districtLabel,
    locality: page.locality,
    localityLabel: page.localityLabel,
    metaTitle: page.metaTitle,
    metaDescription: page.metaDescription,
    h1: page.h1,
    dek: page.dek || "",
    heroImageUrl: page.heroImageUrl || "",
    heroImageAlt: page.heroImageAlt || "",
    bodyHtml: page.bodyHtml,
    bodyJson: page.bodyJson ? JSON.parse(page.bodyJson) : null,
    status: page.status as "DRAFT" | "PUBLISHED",
    readTime: page.readTime || "11 min read",
    ratingValue: page.ratingValue || 4.8,
    reviewCount: page.reviewCount || 210,
    priceGuest: page.priceGuest || "₹250 - ₹500",
    priceParty: page.priceParty || "₹1,000 - ₹3,500",
    priceBridal: page.priceBridal || "₹5,000 - ₹15,000",
    priceDisclaimer:
      page.priceDisclaimer ||
      "(Prices vary by travel time/agreed upfront before booking)",
    faqs: page.faqs.map((f) => ({

      id: f.id,
      question: f.question,
      answer: f.answer,
      order: f.order,
    })),
    interlinkIds: page.interlinksFrom.map((il) => il.toId),
  };

  return <LocalityPageEditor initialData={initialData} isNew={false} />;
}
