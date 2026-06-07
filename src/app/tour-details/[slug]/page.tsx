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
  params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: param } = await params;

  try {
    // Support both slug (preferred for SEO) and id (for backwards compat with old links)
    let tour = await prisma.tour.findUnique({
      where: { slug: param },
      select: {
        id: true,
        slug: true,
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
      tour = await prisma.tour.findUnique({
        where: { id: param },
        select: {
          id: true,
          slug: true,
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
    }

    if (!tour) {
      return {
        title: "Tour Not Found | Tumaini Oasis Adventures",
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

    const urlSlug = tour.slug || tour.id;

    return generateTourMetadata({
      tourName: tour.tourName,
      description: tour.description || tour.summary || "",
      location: tour.location,
      price: tour.price,
      images,
      difficulty: tour.difficulty,
      id: urlSlug, // pass slug (or id fallback) so URL is built correctly
    });
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Tour Details | Tumaini Oasis Adventures",
      description: "Discover amazing hiking tours with Tumaini Oasis Adventures.",
    };
  }
}

export default async function TourDetailsPage({ params }: Props) {
  const { slug: param } = await params;

  try {
    // Prefer slug lookup for clean SEO URLs, fallback to id for old links
    let tour = await prisma.tour.findUnique({
      where: { slug: param },
      select: {
        id: true,
        slug: true,
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
      tour = await prisma.tour.findUnique({
        where: { id: param },
        select: {
          id: true,
          slug: true,
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
    }

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

    const urlSlug = tour.slug || tour.id;

    // Generate structured data
    const tourSchema = generateTourSchema({
      id: urlSlug,
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
      { name: tour.tourName, url: `/tour-details/${urlSlug}` },
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
