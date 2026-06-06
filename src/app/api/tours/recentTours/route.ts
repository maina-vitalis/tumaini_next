import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

    const tours = await prisma.tour.findMany({
      where: {
        date: {
          gte: currentDate, // Get tours with dates greater than or equal to today
        },
      },
      take: 3,
      orderBy: {
        date: "asc", // Order by date ascending to get the soonest upcoming tours first
      },
      select: {
        id: true,
        tourName: true,
        price: true,
        images: true,
        rating: true,
        difficulty: true,
        level: true,
        hikeType: true,
        location: true,
        date: true,
        summary: true,
        // lean select for cards
      },
    });

    const response = NextResponse.json(tours);

    // Recent tours change infrequently; allow short edge cache + SWR
    response.headers.set(
      "Cache-Control",
      "public, max-age=60, s-maxage=120, stale-while-revalidate=600"
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
