import { cn } from "@/lib/utils";
import { Tour } from "@prisma/client";
import { ArrowRight, Calendar, Clock, MapPin, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

type Props = {
  tour: Tour;
};

const BrowseTourCard = ({ tour }: Props) => {
  // Handle both old imageUrl and new images array
  const imageUrl = tour.images
    ? Array.isArray(tour.images)
      ? (tour.images as string[])[0]
      : (tour.images as string)
    : (tour as Tour & { imageUrl?: string }).imageUrl ||
      "/placeholder-image.jpg";

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-500 dark:bg-green-600 text-white";
      case "moderate":
        return "bg-yellow-500 dark:bg-yellow-600 text-white";
      case "advanced":
        return "bg-orange-500 dark:bg-orange-600 text-white";
      case "challenging":
        return "bg-red-500 dark:bg-red-600 text-white";
      case "strenuous":
        return "bg-red-700 dark:bg-red-800 text-white";
      default:
        return "bg-primary text-primary-foreground";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "child-friendly":
        return "bg-green-500 dark:bg-green-600 text-white";
      case "intermediate":
        return "bg-orange-500 dark:bg-orange-600 text-white";
      case "advanced":
        return "bg-red-500 dark:bg-red-600 text-white";
      default:
        return "bg-primary text-primary-foreground";
    }
  };

  const getHikeTypeColor = (hikeType: string) => {
    switch (hikeType.toLowerCase()) {
      case "day-hike":
        return "bg-blue-500 dark:bg-blue-600 text-white";
      case "multi-day-hike":
        return "bg-purple-500 dark:bg-purple-600 text-white";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const tourSlug = (tour as Tour & { slug?: string | null }).slug || tour.id;

  return (
    <Card className="group overflow-hidden transition-all duration-300 border-0 shadow-sm hover:shadow-xl border border-transparent hover:border-primary">
      <Link href={`/tour-details/${tourSlug}`} className="block">
        <div className="grid md:grid-cols-[300px_1fr] gap-0">
          {/* Image Section */}
          <div className="relative h-64 md:h-auto overflow-hidden">
            <Image
              src={imageUrl}
              alt={tour.tourName}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 300px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

            {/* Floating Rating */}
            <div className="absolute top-4 right-4 bg-white/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm text-primary font-semibold">
                {tour.rating}
              </span>
            </div>

            {/* Price Badge */}
            <div className="absolute bottom-4 left-4 bg-primary text-primary-foreground rounded-lg px-3 py-2">
              <div className="text-lg font-bold">
                KES {tour.price.toLocaleString()}
              </div>
              <div className="text-xs opacity-90">per person</div>
            </div>
          </div>

          {/* Content Section */}
          <CardContent className="p-6 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge
                  className={cn(
                    "text-xs font-medium",
                    getDifficultyColor(tour.difficulty)
                  )}
                >
                  {tour.difficulty}
                </Badge>
                <Badge
                  className={cn(
                    "text-xs font-medium",
                    getLevelColor(tour.level)
                  )}
                >
                  <Users className="w-3 h-3 mr-1" />
                  {tour.level}
                </Badge>
                <Badge
                  className={cn(
                    "text-xs font-medium",
                    getHikeTypeColor(tour.hikeType)
                  )}
                >
                  <Clock className="w-3 h-3 mr-1" />
                  {tour.hikeType}
                </Badge>
              </div>

              {/* Title and Summary */}
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {tour.tourName}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                  {tour.summary}
                </p>
              </div>

              {/* Tour Details */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="capitalize">{tour.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>
                    {new Date(tour.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-6 pt-4 border-t">
              <Button
                variant="ghost"
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 justify-between"
              >
                <span>View Details</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </CardContent>
        </div>
      </Link>
    </Card>
  );
};

export default BrowseTourCard;
