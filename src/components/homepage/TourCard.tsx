import { Tour } from "@prisma/client";
import { Calendar, MapPin, Mountain, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "../ui/aspect-ratio";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

type Props = {
  tour: Tour;
};

function TourCard({ tour }: Props) {
  // Handle images array format
  const imageUrl =
    Array.isArray(tour.images) && tour.images.length > 0
      ? (tour.images as string[])[0]
      : "/placeholder-image.jpg";

  return (
    <div
      className="group relative bg-primary/20 rounded-xl overflow-hidden shadow-md hover:shadow-xl 
                    transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image Section */}
      <Link href={`/tour-details/${tour.id}`} className="block relative">
        <AspectRatio ratio={16 / 9} className="relative overflow-hidden">
          <Image
            src={imageUrl}
            alt={tour.tourName}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Gradient Overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />

          {/* Floating Badges */}
          <div className="absolute top-3 left-3">
            <Badge className="bg-white/90 text-gray-900 hover:bg-white border-0 font-medium text-xs">
              {tour.difficulty}
            </Badge>
          </div>

          <div className="absolute top-3 right-3">
            <div className="flex items-center gap-1 bg-white/90 rounded-full px-2 py-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium text-gray-900">
                {tour.rating}
              </span>
            </div>
          </div>
        </AspectRatio>
      </Link>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <Link href={`/tour-details/${tour.id}`}>
          <h3
            className="text-lg font-bold text-foreground line-clamp-1 group-hover:text-greenPrimary 
                        transition-colors duration-300 cursor-pointer"
          >
            {tour.tourName}
          </h3>
        </Link>

        {/* Tour Details - Compact Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs text-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-primary" />
            <span>
              {new Date(tour.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-text-primary" />
            <span className="truncate">{tour.location}</span>
          </div>

          <div className="flex items-center gap-1">
            <Mountain className="w-3 h-3 text-primary" />
            <span>{tour.level}</span>
          </div>

          <div className="ml-5">
            <span className="text-sm font-bold text-foreground">
              KES {tour.price.toLocaleString()}
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <Link href={`/tour-details/${tour.id}`} className="block">
          <Button
            className="w-full bg-greenPrimary hover:bg-greenPrimary/90 text-white py-2 
                      rounded-lg font-medium transition-all duration-300 hover:scale-[1.02] 
                      shadow-sm hover:shadow-md"
          >
            View Details
          </Button>
        </Link>
      </div>

      {/* Hover Effect Border */}
      <div
        className="absolute inset-0 rounded-xl border-2 border-transparent 
                      group-hover:border-greenPrimary/20 transition-colors duration-300 pointer-events-none"
      />
    </div>
  );
}

export default TourCard;
