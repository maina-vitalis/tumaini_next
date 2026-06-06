import { getAdminFromRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ tourId: string }> }
) {
  try {
    // Verify admin authentication
    const admin = getAdminFromRequest(req);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { tourId } = await params;

    // Check if tour exists
    const existingTour = await prisma.tour.findUnique({
      where: { id: tourId },
    });

    if (!existingTour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }

    // Delete the tour
    await prisma.tour.delete({
      where: { id: tourId },
    });

    // Revalidate relevant pages to update cached data
    try {
      revalidatePath("/tours");
      revalidatePath(`/tour-details/${tourId}`);
      revalidatePath("/"); // For hero section
      // revalidateTag removed for Next 16 compatibility (use revalidatePath or updateTag)
    } catch (revalidateError) {
      console.error("Revalidation error:", revalidateError);
      // Don't fail the request if revalidation fails
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete tour error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ tourId: string }> }
) {
  try {
    const { tourId } = await params;

    const tour = await prisma.tour.findUnique({
      where: { id: tourId },
    });

    if (!tour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }

    const response = NextResponse.json(tour);

    // Tour details are relatively stable; allow some caching
    response.headers.set(
      "Cache-Control",
      "public, max-age=60, s-maxage=300, stale-while-revalidate=600"
    );

    return response;
  } catch (error) {
    console.error("Get tour error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ tourId: string }> }
) {
  try {
    // Verify admin authentication
    const admin = getAdminFromRequest(req);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { tourId } = await params;
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

    // Check if tour exists
    const existingTour = await prisma.tour.findUnique({
      where: { id: tourId },
    });

    if (!existingTour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }

    // Update the tour
    const updatedTour = await prisma.tour.update({
      where: { id: tourId },
      data: {
        tourName,
        price: parseFloat(price),
        booking: parseInt(booking),
        images: images || [],
        rating: parseInt(rating),
        difficulty,
        level,
        hikeType,
        location,
        date,
        description,
        summary,
        itinerary: itinerary || [],
        inclusive: inclusive || [],
        exclusive: exclusive || [],
      },
    });

    // Revalidate relevant pages to update cached data
    try {
      revalidatePath("/tours");
      revalidatePath(`/tour-details/${tourId}`);
      revalidatePath("/"); // For hero section
      // revalidateTag removed for Next 16 compatibility (use revalidatePath or updateTag)
    } catch (revalidateError) {
      console.error("Revalidation error:", revalidateError);
      // Don't fail the request if revalidation fails
    }

    return NextResponse.json(updatedTour);
  } catch (error) {
    console.error("Update tour error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
