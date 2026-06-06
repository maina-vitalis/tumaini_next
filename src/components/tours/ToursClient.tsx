"use client";

import BrowseTourCard from "@/components/tours/BrowseTourCard";
import BrowseTourSkeleton from "@/components/tours/BrowseTourSkeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Tour } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Mountain } from "lucide-react";

const ToursClient = () => {
  const {
    data: tours = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tours"],
    queryFn: async () => {
      const response = await axios.get("/api/tours");
      return response.data as Tour[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <div className="text-sm font-medium py-2 px-3 bg-primary/50 rounded-full w-fit mx-auto">
                Discover Kenya&apos;s Best Hiking Adventures
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Explore Our
                <span className="text-primary block">Adventure Tours</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                From beginner-friendly trails to challenging summit expeditions,
                discover Kenya&apos;s most spectacular landscapes with our
                expert guides.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {tours.length}+
                </div>
                <div className="text-sm text-muted-foreground">
                  Tours Available
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">4.8</div>
                <div className="text-sm text-muted-foreground">
                  Average Rating
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">
                  Happy Hikers
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Results */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">
              {isLoading
                ? "Loading tours..."
                : `${tours.length} Tours Available`}
            </h2>
            <p className="text-muted-foreground mt-1">
              Discover amazing hiking adventures across Kenya
            </p>
          </div>
        </div>

        {/* Tours Grid */}
        {isLoading ? (
          <div className="space-y-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <BrowseTourSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <Card className="p-12 text-center">
            <CardContent className="space-y-4">
              <Mountain className="w-16 h-16 mx-auto text-muted-foreground" />
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Unable to load tours
                </h3>
                <p className="text-muted-foreground mb-4">
                  There was an error loading the tours. Please try refreshing
                  the page.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : tours.length === 0 ? (
          <Card className="p-12 text-center">
            <CardContent className="space-y-4">
              <Mountain className="w-16 h-16 mx-auto text-muted-foreground" />
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  No tours available
                </h3>
                <p className="text-muted-foreground mb-4">
                  Check back soon for new exciting adventures!
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <section className="space-y-6" aria-label="Tour listings">
            {tours.map((tour) => (
              <BrowseTourCard key={tour.id} tour={tour} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default ToursClient;
