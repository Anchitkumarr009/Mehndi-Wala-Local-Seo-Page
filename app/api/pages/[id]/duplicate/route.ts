import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

interface RouteProps {
  params: {
    id: string;
  };
}

export async function POST(request: NextRequest, { params }: RouteProps) {
  try {
    const { id } = params;

    const source = await prisma.localityPage.findUnique({
      where: { id },
      include: {
        faqs: true,
        interlinksFrom: true,
      },
    });

    if (!source) {
      return NextResponse.json({ error: "Source page not found" }, { status: 404 });
    }

    // Generate unique duplicate locality slug
    let copyNum = 1;
    let newLocality = `${source.locality}-copy`;
    let newLocalityLabel = `${source.localityLabel} (Copy)`;

    while (
      await prisma.localityPage.findUnique({
        where: {
          country_city_district_locality: {
            country: source.country,
            city: source.city,
            district: source.district,
            locality: newLocality,
          },
        },
      })
    ) {
      copyNum++;
      newLocality = `${source.locality}-copy-${copyNum}`;
      newLocalityLabel = `${source.localityLabel} (Copy ${copyNum})`;
    }

    // Duplicate record
    const duplicated = await prisma.localityPage.create({
      data: {
        country: source.country,
        countryLabel: source.countryLabel,
        city: source.city,
        cityLabel: source.cityLabel,
        district: source.district,
        districtLabel: source.districtLabel,
        locality: newLocality,
        localityLabel: newLocalityLabel,
        metaTitle: `${source.metaTitle} (Copy)`,
        metaDescription: source.metaDescription,
        h1: `${source.h1} (Copy)`,
        dek: source.dek,
        heroImageUrl: source.heroImageUrl,
        heroImageAlt: source.heroImageAlt,
        bodyHtml: source.bodyHtml,
        bodyJson: source.bodyJson,
        status: "DRAFT", // Always start duplicates as draft
        publishedAt: null,
        readTime: source.readTime,
        ratingValue: source.ratingValue,
        reviewCount: source.reviewCount,
        faqs: {
          create: source.faqs.map((f) => ({
            question: f.question,
            answer: f.answer,
            order: f.order,
          })),
        },
      },
    });

    // Copy interlinks
    for (const il of source.interlinksFrom) {
      await prisma.localityInterlink.create({
        data: {
          fromId: duplicated.id,
          toId: il.toId,
        },
      });
    }

    return NextResponse.json({ page: duplicated });
  } catch (error: any) {
    console.error("POST /api/pages/[id]/duplicate error:", error);
    return NextResponse.json({ error: "Failed to duplicate page" }, { status: 500 });
  }
}
