"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

interface Tour {
  id: string;
  tourName: string;
  price: number;
  date: string;
  images: string[] | string; // Can be JSON string or array
  difficulty: string;
  level: string;
}

const HeroImage = () => {
  const [nextTour, setNextTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNextTour = async () => {
      try {
        setError(null);
        const response = await fetch("/api/tours/recentTours", {
          cache: "no-store", // Ensure fresh data
          headers: {
            "Cache-Control": "no-cache",
          },
        });

        if (response.ok) {
          const tours: Tour[] = await response.json();
          // Get the first upcoming tour (they're ordered by date ascending)
          if (tours.length > 0) {
            setNextTour(tours[0]);
          }
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching next tour:", error);
        setError("Failed to load tour data");
      } finally {
        setLoading(false);
      }
    };

    fetchNextTour();

    // Set up interval to refetch data every minute
    const interval = setInterval(fetchNextTour, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Get the first image from the tour images array
  const getTourImage = (tour: Tour | null) => {
    if (!tour || !tour.images)
      return "https://res.cloudinary.com/dl0w5seja/image/upload/v1736663885/mount-kenya-7377780_1920_kgugrv.jpg";

    // Handle both string array and JSON string cases
    let imageArray: string[] = [];
    if (typeof tour.images === "string") {
      try {
        imageArray = JSON.parse(tour.images);
      } catch {
        return "https://res.cloudinary.com/dl0w5seja/image/upload/v1736663885/mount-kenya-7377780_1920_kgugrv.jpg";
      }
    } else if (Array.isArray(tour.images)) {
      imageArray = tour.images;
    }

    return imageArray.length > 0
      ? imageArray[0]
      : "https://res.cloudinary.com/dl0w5seja/image/upload/v1736663885/mount-kenya-7377780_1920_kgugrv.jpg";
  };

  // Format price to display in KES
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Format date to display nicely
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Check if tour is coming soon (within 7 days)
  const isComingSoon = (dateString: string) => {
    const tourDate = new Date(dateString);
    const today = new Date();
    const diffTime = tourDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0;
  };

  return (
    <div className="relative min-h-[40vh] w-full flex items-center overflow-hidden">
      {/* Split Layout Container */}
      <div className="w-full grid lg:grid-cols-2 gap-0 min-h-[80vh]">
        {/* Left Content Section */}
        <div className="flex flex-col justify-center px-4  bg-background relative z-10">
          <div className="max-w-xl">
            {/* Small Label */}
            <div className="inline-block mb-4 sm:mb-6">
              <span className="text-xs sm:text-sm font-medium text-foreground bg-primary/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                Kenya&apos;s Premier Adventure Company
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl  lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-[0.9]">
              Explore
              <span className=" text-greenPrimary"> Beyond</span>
              <span className="block text-foreground/60 font-light text-2xl lg:text-4xl mt-1 sm:mt-2">
                your limits
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-foreground mb-6 sm:mb-8 leading-relaxed">
              Join us on expertly guided hiking adventures across Kenya&apos;s
              most spectacular landscapes. From beginner trails to challenging
              peaks.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
              <Button
                className="group bg-greenPrimary hover:bg-greenPrimary/90 text-white px-6 sm:px-8 py-3 sm:py-4 
                          rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link
                  href="/tours"
                  className="flex items-center justify-center gap-2"
                >
                  Start Your Journey
                  <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Right Image Grid Section */}
        <div className="relative min-h-[50vh] sm:min-h-[60vh] lg:min-h-[90vh] p-4 sm:p-6 lg:p-8">
          {/* Image Grid Container */}
          <div className="h-full grid grid-cols-1 sm:grid-cols-2 grid-rows-3 sm:grid-rows-2 gap-3 sm:gap-4">
            {/* Large Main Image */}
            <div className="relative sm:col-span-2 row-span-2 sm:row-span-1 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl group">
              <Image
                src={getTourImage(nextTour)}
                alt={
                  nextTour
                    ? `${nextTour.tourName} hiking adventure`
                    : "Mountain hiking adventure with Tumaini Oasis Adventures"
                }
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Dynamic Floating Card */}
              <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6">
                {nextTour ? (
                  <Link href={`/tour-details/${(nextTour as any).slug || nextTour.id}`} className="block">
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
                      {loading ? (
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-24"></div>
                            <div className="h-3 bg-gray-200 rounded animate-pulse w-32"></div>
                          </div>
                          <div className="text-right">
                            <div className="h-5 bg-gray-200 rounded animate-pulse mb-1 w-20"></div>
                            <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                                Next Adventure
                              </h3>
                              {isComingSoon(nextTour.date) && (
                                <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">
                                  Soon
                                </span>
                              )}
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600 truncate max-w-[150px] sm:max-w-[200px]">
                              {nextTour.tourName}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatDate(nextTour.date)}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-base sm:text-lg font-bold text-greenPrimary">
                              {formatPrice(nextTour.price)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {nextTour.difficulty}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                ) : (
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl">
                    {loading ? (
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-24"></div>
                          <div className="h-3 bg-gray-200 rounded animate-pulse w-32"></div>
                        </div>
                        <div className="text-right">
                          <div className="h-5 bg-gray-200 rounded animate-pulse mb-1 w-20"></div>
                          <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
                        </div>
                      </div>
                    ) : error ? (
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                            Unable to Load
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600">
                            Please refresh the page
                          </p>
                        </div>
                        <div className="text-right">
                          <button
                            onClick={() => window.location.reload()}
                            className="text-sm font-medium text-greenPrimary hover:underline"
                          >
                            Refresh
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                            Next Adventure
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600">
                            Check our tours page
                          </p>
                        </div>
                        <div className="text-right">
                          <Link
                            href="/tours"
                            className="text-sm font-medium text-greenPrimary hover:underline"
                          >
                            View Tours
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Small Image 1 */}
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl group">
              <Image
                src="https://res.cloudinary.com/dl0w5seja/image/upload/v1730121729/image19_b80oyp.jpg"
                alt="Hiking group adventure"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Small Image 2 */}
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl group">
              <Image
                src="https://res.cloudinary.com/dl0w5seja/image/upload/v1735662600/selah/Ol%20Njorowa%20Gorges%20Hike%20%24%20Geothermal%20SPA-1735662600176.jpg"
                alt="Geothermal"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroImage;
