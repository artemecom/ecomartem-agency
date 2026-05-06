import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: "https://ecomartem.com",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://ecomartem.com/assessment",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
