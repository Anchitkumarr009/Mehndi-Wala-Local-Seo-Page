import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { localityPageSchema } from "@/lib/validations/page";
import { sanitizeContent } from "@/lib/sanitize";

interface RouteProps {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteProps) {
  try {
    const { id } = params;

    const page = await prisma.localityPage.findUnique({
      where: { id },
      include: {
        faqs: {
          orderBy: { order: "asc" },
        },
        interlinksFrom: {
          include: {
            to: true,
          },
        },
      },
    });

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json({
      page: {
        ...page,
        interlinkIds: page.interlinksFrom.map((il) => il.toId),
      },
    });
  } catch (error: any) {
    console.error("GET /api/pages/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch page" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteProps) {
  try {
    const { id } = params;
    const body = await request.json();

    const parsed = localityPageSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Check slug collision with any other page
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

    if (existing && existing.id !== id) {
      return NextResponse.json(
        { error: "Another locality page already exists with this exact URL path." },
        { status: 409 }
      );
    }

    const current = await prisma.localityPage.findUnique({
      where: { id },
    });

    if (!current) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    const sanitizedHtml = sanitizeContent(data.bodyHtml);

    // Update publishedAt if moving from DRAFT to PUBLISHED
    let publishedAt = current.publishedAt;
    if (data.status === "PUBLISHED" && current.status !== "PUBLISHED") {
      publishedAt = new Date();
    }

    // Update page
    const updated = await prisma.localityPage.update({
      where: { id },
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
        publishedAt,
        readTime: data.readTime,
        ratingValue: data.ratingValue,
        reviewCount: data.reviewCount,
        priceGuest: data.priceGuest,
        priceParty: data.priceParty,
        priceBridal: data.priceBridal,
        priceDisclaimer: data.priceDisclaimer,
      },
    });


    // Replace FAQs
    await prisma.faq.deleteMany({ where: { localityPageId: id } });
    if (data.faqs && data.faqs.length > 0) {
      await prisma.faq.createMany({
        data: data.faqs.map((f, i) => ({
          question: f.question,
          answer: f.answer,
          order: f.order ?? i,
          localityPageId: id,
        })),
      });
    }

    // Replace Interlinks
    await prisma.localityInterlink.deleteMany({ where: { fromId: id } });
    if (data.interlinkIds && data.interlinkIds.length > 0) {
      for (const toId of data.interlinkIds) {
        if (toId !== id) {
          await prisma.localityInterlink.create({
            data: {
              fromId: id,
              toId,
            },
          });
        }
      }
    }

    return NextResponse.json({ page: updated });
  } catch (error: any) {
    console.error("PUT /api/pages/[id] error:", error);
    return NextResponse.json({ error: error.message || "Failed to update page" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteProps) {
  try {
    const { id } = params;

    await prisma.localityPage.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE /api/pages/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete page" }, { status: 500 });
  }
}
