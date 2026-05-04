import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/showcase", "/api/"],
      },
    ],
    sitemap: "https://ecomartem.com/sitemap.xml",
    host: "https://ecomartem.com",
  };
}
