import { MetadataRoute } from "next";
import { SEO_CONFIG } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SEO_CONFIG.siteUrl;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/*",
          "/api/*",
          // Private/auth routes only
          "/admin",
          "/admin/dashboard",
          "/admin/login",
          "/admin/tours/*",
        ],
        crawlDelay: 1,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin/*", "/api/*"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admin/*", "/api/*"],
        crawlDelay: 1,
      },
      // AI crawlers: allow with a small delay so they can discover content for brand visibility
      // (complete blocks hurt discovery in AI answers / Perplexity / ChatGPT search)
      {
        userAgent: "GPTBot",
        allow: "/",
        crawlDelay: 2,
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        crawlDelay: 2,
      },
      {
        userAgent: ["CCBot", "anthropic-ai", "Claude-Web"],
        allow: "/",
        crawlDelay: 5,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
