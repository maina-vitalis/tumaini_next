import TourDetailsClient from "@/components/tourDetails/TourDetailsClient";
import prisma from "@/lib/prisma";
import {
  generateBreadcrumbSchema,
  generateTourMetadata,
  generateTourSchema,
} from "@/lib/seo";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Revalidate tour details periodically (data doesn't change super frequently)
export const revalidate = 60;

interface Props {
  params: Promise<{ tourId: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tourId } = await params;

  try {
    const tour = await prisma.tour.findUnique({
      where: { id: tourId },
      select: {
        id: true,
        tourName: true,
        price: true,
        booking: true,
        images: true,
        rating: true,
        difficulty: true,
        level: true,
        hikeType: true,
        location: true,
        date: true,
        description: true,
        summary: true,
        itinerary: true,
        inclusive: true,
        exclusive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!tour) {
      return {
        title: "Tour Not Found | Tumaini Fitness",
        description: "The requested tour could not be found.",
        robots: { index: false, follow: false },
      };
    }

    // Handle both old imageUrl and new images array
    const images = tour.images
      ? Array.isArray(tour.images)
        ? (tour.images as string[])
        : [tour.images as string]
      : [];

    return generateTourMetadata({
      tourName: tour.tourName,
      description: tour.description || tour.summary || "",
      location: tour.location,
      price: tour.price,
      images,
      difficulty: tour.difficulty,
      id: tour.id,
    });
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Tour Details | Tumaini Fitness",
      description: "Discover amazing hiking tours with Tumaini Fitness.",
    };
  }
}

export default async function TourDetailsPage({ params }: Props) {
  const { tourId } = await params;

  try {
    const tour = await prisma.tour.findUnique({
      where: { id: tourId },
      select: {
        id: true,
        tourName: true,
        price: true,
        booking: true,
        images: true,
        rating: true,
        difficulty: true,
        level: true,
        hikeType: true,
        location: true,
        date: true,
        description: true,
        summary: true,
        itinerary: true,
        inclusive: true,
        exclusive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!tour) {
      notFound();
    }

    // Handle both old imageUrl and new images array
    const images = tour.images
      ? Array.isArray(tour.images)
        ? (tour.images as string[])
        : [tour.images as string]
      : [];

    // Convert date to ISO string safely
    const dateString = new Date(tour.date).toISOString();

    // Generate structured data
    const tourSchema = generateTourSchema({
      id: tour.id,
      tourName: tour.tourName,
      description: tour.description || tour.summary || "",
      price: tour.price,
      location: tour.location,
      date: dateString,
      rating: tour.rating,
      images,
      difficulty: tour.difficulty,
    });

    // Generate breadcrumb structured data
    const breadcrumbSchema = generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Tours", url: "/tours" },
      { name: tour.tourName, url: `/tour-details/${tour.id}` },
    ]);

    return (
      <>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(tourSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />

        {/* Breadcrumb Navigation for SEO and UX */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li>
              <a href="/" className="hover:text-primary transition-colors">
                Home
              </a>
            </li>
            <li>/</li>
            <li>
              <a href="/tours" className="hover:text-primary transition-colors">
                Tours
              </a>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium" aria-current="page">
              {tour.tourName}
            </li>
          </ol>
        </nav>

        {/* Main Content */}
        <article>
          <TourDetailsClient tour={tour} />
        </article>
      </>
    );
  } catch (error) {
    console.error("Error fetching tour:", error);
    notFound();
  }
}
