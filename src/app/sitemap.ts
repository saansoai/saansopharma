import type { MetadataRoute } from "next";
import { articles } from "@/content/site";
import { SITE_URL } from "@/content/schema";

/**
 * Every indexable URL.
 *
 * Articles carry their own publication date as `lastModified` rather than
 * "now" — a sitemap that claims every page changed today is a sitemap crawlers
 * learn to distrust.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const articleEntries = articles.map((article) => ({
    url: `${SITE_URL}/insights/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
    ...(article.image ? { images: [`${SITE_URL}${article.image}`] } : {}),
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: [`${SITE_URL}/images/facility.jpeg`],
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...articleEntries,
  ];
}
