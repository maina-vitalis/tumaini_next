import ToursClient from "@/components/tours/ToursClient";
import {
  generateBreadcrumbSchema,
  generateMetadata as generateSEOMetadata,
} from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
  title: "All Hiking Tours",
  description:
    "Browse our full collection of guided hiking tours in Kenya. Mt Kenya expeditions, Aberdares adventures, day hikes and multi-day treks for every fitness level. Book your next adventure.",
  keywords: [
    "hiking tours Kenya",
    "book hiking tours",
    "Mt Kenya tours",
    "Aberdares hiking",
    "guided hiking Kenya",
    "all tours",
    "adventure packages Kenya",
  ],
  url: "/tours",
});

// Breadcrumb + client interactive tours listing
export default function ToursPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tours", url: "/tours" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          <li>
            <a href="/" className="hover:text-primary transition-colors">
              Home
            </a>
          </li>
          <li>/</li>
          <li className="text-foreground font-medium" aria-current="page">
            Tours
          </li>
        </ol>
      </nav>

      <ToursClient />
    </>
  );
}
