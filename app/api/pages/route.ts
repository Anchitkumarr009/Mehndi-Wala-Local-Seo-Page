import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { localityPageSchema } from "@/lib/validations/page";
import { sanitizeContent } from "@/lib/sanitize";

export const dynamic = "force-dynamic";


export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";
    const status = searchParams.get("status") || "";

    const where: any = {};

    if (query) {
      where.OR = [
        { localityLabel: { contains: query } },
        { cityLabel: { contains: query } },
        { districtLabel: { contains: query } },
        { h1: { contains: query } },
      ];
    }

    if (status && (status === "DRAFT" || status === "PUBLISHED")) {
      where.status = status;
    }

    const pages = await prisma.localityPage.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      include: {
        _count: {
          select: { faqs: true, interlinksFrom: true },
        },
      },
    });

    return NextResponse.json({ pages });
  } catch (error: any) {
    console.error("GET /api/pages error:", error);
    return NextResponse.json({ error: error.message || String(error), stack: error.stack }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with shared Zod schema
    const parsed = localityPageSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Check uniqueness of country/city/district/locality
    const existing = await prisma.localityPage.findUnique({
      where: {
        country_city_district_locality: {
          country: data.country,
          city: data.city,
          district: data.district,
          locality: data.locality,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "A locality page with this exact URL path already exists." },
        { status: 409 }
      );
    }

    // Sanitize HTML
    const sanitizedHtml = sanitizeContent(data.bodyHtml);

    // Save page record with FAQs and Interlinks
    const created = await prisma.localityPage.create({
      data: {
        country: data.country,
        countryLabel: data.countryLabel,
        city: data.city,
        cityLabel: data.cityLabel,
        district: data.district,
        districtLabel: data.districtLabel,
        locality: data.locality,
        localityLabel: data.localityLabel,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        h1: data.h1,
        dek: data.dek || null,
        heroImageUrl: data.heroImageUrl || null,
        heroImageAlt: data.heroImageAlt || null,
        bodyHtml: sanitizedHtml,
        bodyJson: data.bodyJson ? JSON.stringify(data.bodyJson) : null,
        status: data.status,
        publishedAt: data.status === "PUBLISHED" ? new Date() : null,
        readTime: data.readTime,
        ratingValue: data.ratingValue,
        reviewCount: data.reviewCount,
        priceGuest: data.priceGuest,
        priceParty: data.priceParty,
        priceBridal: data.priceBridal,
        priceDisclaimer: data.priceDisclaimer,
        faqs: {

          create: data.faqs.map((f, i) => ({
            question: f.question,
            answer: f.answer,
            order: f.order ?? i,
          })),
        },
      },
    });

    // Create interlinks
    if (data.interlinkIds && data.interlinkIds.length > 0) {
      for (const toId of data.interlinkIds) {
        if (toId !== created.id) {
          await prisma.localityInterlink.create({
            data: {
              fromId: created.id,
              toId,
            },
          });
        }
      }
    }

    return NextResponse.json({ page: created }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/pages error:", error);
    return NextResponse.json({ error: error.message || "Failed to create page" }, { status: 500 });
  }
}
