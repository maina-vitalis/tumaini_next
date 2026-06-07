import { MetadataRoute } from "next";
import { SEO_CONFIG } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SEO_CONFIG.siteName,
    short_name: "Tumaini Oasis",
    description: SEO_CONFIG.defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#16a34a",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["travel", "sports", "outdoors"],
    lang: "en",
    dir: "ltr",
    orientation: "portrait",
  };
}
