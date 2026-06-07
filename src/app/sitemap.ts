import prisma from "@/lib/prisma";
import { SEO_CONFIG } from "@/lib/seo";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SEO_CONFIG.siteUrl;

  try {
    // Fetch all tours for dynamic routes (use slug for SEO-friendly URLs when available)
    const tours = await prisma.tour.findMany({
      select: {
        id: true,
        slug: true,
        updatedAt: true,
        createdAt: true,
        tourName: true, // can be used for logging if needed
      },
      orderBy: { createdAt: "desc" },
    });

    // Generate tour entries - high priority because these are conversion pages.
    // Prefer slug (human readable + good for SEO) over raw UUID id.
    const tourEntries: MetadataRoute.Sitemap = tours.map((tour) => ({
      url: `${baseUrl}/tour-details/${tour.slug || tour.id}`,
      lastModified: tour.updatedAt || tour.createdAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }));

    // Static pages with SEO priorities (best practice values)
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 1.0,
      },
      {
        url: `${baseUrl}/tours`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.95,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.75,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      },
      {
        url: `${baseUrl}/gallery`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      },
      {
        url: `${baseUrl}/hike-preparation`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.65,
      },
      {
        url: `${baseUrl}/event-cancellation`,
        lastModified: new Date(),
        changeFrequency: "yearly" as const,
        priority: 0.35,
      },
    ];

    return [...staticPages, ...tourEntries];
  } catch (error) {
    console.error("Error generating sitemap:", error);

    // Fallback sitemap with static pages only (still useful)
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 1.0,
      },
      {
        url: `${baseUrl}/tours`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.65,
      },
      {
        url: `${baseUrl}/hike-preparation`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      },
    ];
  }
}
