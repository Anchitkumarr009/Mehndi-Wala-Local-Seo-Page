import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildCanonicalPath } from "@/lib/utils";

export const dynamic = "force-dynamic";


export async function GET(request: NextRequest) {
  try {
    const pages = await prisma.localityPage.findMany({
      select: {
        id: true,
        country: true,
        countryLabel: true,
        city: true,
        cityLabel: true,
        district: true,
        districtLabel: true,
        locality: true,
        localityLabel: true,
        status: true,
      },
      orderBy: { localityLabel: "asc" },
    });

    const formatted = pages.map((p) => ({
      id: p.id,
      localityLabel: p.localityLabel,
      districtLabel: p.districtLabel,
      cityLabel: p.cityLabel,
      countryLabel: p.countryLabel,
      status: p.status,
      url: buildCanonicalPath(p.country, p.city, p.district, p.locality),
      searchKey: `${p.localityLabel} ${p.districtLabel} ${p.cityLabel} ${p.countryLabel}`.toLowerCase(),
    }));

    return NextResponse.json({ localities: formatted });
  } catch (error: any) {
    console.error("GET /api/pages/interlinks error:", error);
    return NextResponse.json({ error: "Failed to fetch interlinks" }, { status: 500 });
  }
}
