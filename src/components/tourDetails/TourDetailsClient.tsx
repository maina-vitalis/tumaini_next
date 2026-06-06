"use client";

import { Button } from "@/components/ui/button";
import { Tour } from "@prisma/client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import TourDetailsCard from "./TourDetailsCard";

interface TourDetailsClientProps {
  tour: Tour;
}

export default function TourDetailsClient({ tour }: TourDetailsClientProps) {
  return (
    <div className="bg-background">
      {/* Navigation Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button variant="ghost" asChild className="gap-2">
            <Link href="/tours">
              <ChevronLeft className="w-4 h-4" />
              Back to All Tours
            </Link>
          </Button>
        </div>
      </div>

      {/* Tour Details Content */}
      <TourDetailsCard tour={tour} />
    </div>
  );
}
