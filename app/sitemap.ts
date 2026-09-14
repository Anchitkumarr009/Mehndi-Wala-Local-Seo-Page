import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { buildCanonicalUrl } from "@/lib/utils";
import { siteConfig } from "@/content/labels";

export const dynamic = "force-dynamic";
export const revalidate = 0;



export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const publishedPages = await prisma.localityPage.findMany({
    where: { status: "PUBLISHED" },
    select: {
      country: true,
      city: true,
      district: true,
      locality: true,
      updatedAt: true,
      publishedAt: true,
    },
  });

  const localityUrls = publishedPages.map((p) => ({
    url: buildCanonicalUrl(p.country, p.city, p.district, p.locality),
    lastModified: p.updatedAt || p.publishedAt || new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: siteConfig.baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    ...localityUrls,
  ];
}
