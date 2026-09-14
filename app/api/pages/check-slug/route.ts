import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export const dynamic = "force-dynamic";


export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const country = slugify(searchParams.get("country") || "");
    const city = slugify(searchParams.get("city") || "");
    const district = slugify(searchParams.get("district") || "");
    const locality = slugify(searchParams.get("locality") || "");
    const excludeId = searchParams.get("excludeId") || "";

    if (!country || !city || !district || !locality) {
      return NextResponse.json({ available: true, message: "Incomplete path" });
    }

    const existing = await prisma.localityPage.findUnique({
      where: {
        country_city_district_locality: {
          country,
          city,
          district,
          locality,
        },
      },
    });

    if (existing && existing.id !== excludeId) {
      return NextResponse.json({
        available: false,
        message: "This exact locality URL combination already exists in database.",
        existingId: existing.id,
      });
    }

    return NextResponse.json({
      available: true,
      message: "URL path is unique and available.",
    });
  } catch (error: any) {
    console.error("GET /api/pages/check-slug error:", error);
    return NextResponse.json({ error: "Failed to check slug" }, { status: 500 });
  }
}
