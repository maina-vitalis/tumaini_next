import { getAdminFromRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const limit = req.nextUrl.searchParams.get("limit") || undefined;
  try {
    const tours = await prisma.tour.findMany({
      take: limit ? parseInt(limit) : undefined,
      orderBy: {
        createdAt: "desc",
      },
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
        summary: true,
        createdAt: true,
        updatedAt: true,
        // Exclude large JSON fields (itinerary, inclusive, exclusive) for list views
      },
    });

    const response = NextResponse.json(tours);

    // Public data can be cached at edge/browser for short time.
    // s-maxage for CDN, stale-while-revalidate for fast subsequent loads.
    response.headers.set(
      "Cache-Control",
      "public, max-age=30, s-maxage=60, stale-while-revalidate=300"
    );

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Verify admin authentication
    const admin = getAdminFromRequest(req);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const {
      tourName,
      price,
      booking,
      images,
      rating,
      difficulty,
      level,
      hikeType,
      location,
      date,
      description,
      summary,
      itinerary,
      inclusive,
      exclusive,
    } = body;

    // Validate required fields
    if (
      !tourName ||
      !price ||
      !images ||
      !Array.isArray(images) ||
      images.length === 0 ||
      !location ||
      !date
    ) {
      return NextResponse.json(
        {
          error:
            "Missing required fields. Tour name, price, at least one image, location, and date are required.",
        },
        { status: 400 }
      );
    }

    // Create new tour
    const newTour = await prisma.tour.create({
      data: {
        tourName,
        price: parseFloat(price),
        booking: parseInt(booking) || 0,
        images: images || [],
        rating: parseInt(rating) || 5,
        difficulty: difficulty || "Medium",
        level: level || "Intermediate",
        hikeType: hikeType || "Day Hike",
        location,
        date,
        description: description || "",
        summary: summary || "",
        itinerary: itinerary || [],
        inclusive: inclusive || [],
        exclusive: exclusive || [],
      },
    });

    // Revalidate relevant pages to update cached data
    try {
      revalidatePath("/tours");
      revalidatePath("/"); // For hero section
    } catch (revalidateError) {
      console.error("Revalidation error:", revalidateError);
      // Don't fail the request if revalidation fails
    }

    return NextResponse.json(newTour, { status: 201 });
  } catch (error) {
    console.error("Create tour error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
