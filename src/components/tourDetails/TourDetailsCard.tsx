"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Tour } from "@prisma/client";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Camera,
  Check,
  Clock,
  Mail,
  MapPin,
  Mountain,
  Shield,
  Star,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import TourBooking from "./tourBooking";

type Props = {
  tour: Tour;
};

type ItineraryTypes = { time: string; details: string }[];

const TourDetailsCard = ({ tour }: Props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toast } = useToast();

  // Handle both old imageUrl and new images array
  const images = tour.images
    ? Array.isArray(tour.images)
      ? (tour.images as string[])
      : [tour.images as string]
    : [
        (tour as Tour & { imageUrl?: string }).imageUrl ||
          "/placeholder-image.jpg",
      ];

  const itinerary = tour.itinerary as ItineraryTypes;
  const inclusive = tour.inclusive as string[];
  const exclusive = tour.exclusive as string[];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-500 dark:bg-green-600";
      case "moderate":
        return "bg-yellow-500 dark:bg-yellow-600";
      case "advanced":
        return "bg-orange-500 dark:bg-orange-600";
      case "challenging":
        return "bg-red-500 dark:bg-red-600";
      case "strenuous":
        return "bg-red-700 dark:bg-red-800";
      default:
        return "bg-primary";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "child-friendly":
        return "bg-green-500 dark:bg-green-600";
      case "intermediate":
        return "bg-orange-500 dark:bg-orange-600";
      case "advanced":
        return "bg-red-500 dark:bg-red-600";
      default:
        return "bg-primary";
    }
  };

  const getDifficultyMessage = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "This is a beginner-friendly hike suitable for most fitness levels. Perfect for families and first-time hikers.";
      case "moderate":
        return "This hike requires basic fitness and some hiking experience. Expect moderate inclines and terrain changes.";
      case "advanced":
        return "This is a challenging hike requiring good physical fitness and hiking experience. Prepare for steep terrain and longer distances.";
      case "challenging":
        return "This hike demands excellent physical condition and extensive hiking experience. Expect difficult terrain, steep climbs, and endurance challenges.";
      case "strenuous":
        return "This is an extremely demanding hike for experienced mountaineers only. Requires peak physical fitness, technical skills, and mental resilience.";
      default:
        return "Ensure you're prepared for the challenge ahead. Check your fitness level and hiking experience.";
    }
  };

  return (
    <div className="bg-background">
      {/* Hero Section with Image Gallery */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden rounded-xl">
        <div className="relative h-full">
          <Image
            src={images[currentImageIndex]}
            alt={tour.tourName}
            fill
            className="object-cover transition-all duration-500"
            priority
            sizes="100vw"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Image Navigation */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm"
                onClick={prevImage}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm"
                onClick={nextImage}
              >
                <ArrowRight className="h-5 w-5" />
              </Button>

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      index === currentImageIndex
                        ? "bg-white"
                        : "bg-white/50 hover:bg-white/75"
                    )}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </>
          )}

          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge
                  className={cn(
                    "text-white border-0",
                    getDifficultyColor(tour.difficulty)
                  )}
                >
                  <Mountain className="w-3 h-3 mr-1" />
                  {tour.difficulty}
                </Badge>
                <Badge
                  className={cn(
                    "text-white border-0",
                    getLevelColor(tour.level)
                  )}
                >
                  <Users className="w-3 h-3 mr-1" />
                  {tour.level}
                </Badge>
                <Badge className="bg-primary text-primary-foreground">
                  <Clock className="w-3 h-3 mr-1" />
                  {tour.hikeType}
                </Badge>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 capitalize">
                {tour.tourName}
              </h1>

              <div className="flex flex-col sm:flex-row gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="capitalize">{tour.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>
                    {new Date(tour.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span>{tour.rating}/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tour Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-primary" />
                  Tour Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {tour.summary}
                </p>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Adventure</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="prose prose-sm max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: tour.description }}
                />
              </CardContent>
            </Card>

            {/* Itinerary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Detailed Itinerary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="multiple" className="w-full">
                  {itinerary?.map((item, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-semibold text-primary">
                              {index + 1}
                            </span>
                          </div>
                          <div>
                            <div className="font-semibold">{item.time}</div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pl-11">
                        <p className="text-muted-foreground">{item.details}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* What&apos;s Included/Excluded */}
            <Card>
              <CardHeader>
                <CardTitle>What to Expect</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="included" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger
                      value="included"
                      className="flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      What&apos;s Included
                    </TabsTrigger>
                    <TabsTrigger
                      value="excluded"
                      className="flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      What&apos;s Not Included
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="included" className="mt-6">
                    <div className="grid gap-3">
                      {inclusive && inclusive.length > 0 ? (
                        inclusive.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20"
                          >
                            <Check className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <Check className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p>No specific inclusions listed for this tour.</p>
                          <p className="text-xs mt-1">
                            Contact us for more details about what&apos;s
                            included.
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="excluded" className="mt-6">
                    <div className="grid gap-3">
                      {exclusive && exclusive.length > 0 ? (
                        exclusive.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/20"
                          >
                            <X className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <X className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p>No specific exclusions listed for this tour.</p>
                          <p className="text-xs mt-1">
                            Contact us for more details about what&apos;s not
                            included.
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Safety & Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Safety & Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Physical Fitness</h4>
                      <p className="text-sm text-muted-foreground">
                        {getDifficultyMessage(tour.difficulty)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Weather Conditions</h4>
                      <p className="text-sm text-muted-foreground">
                        Check weather conditions before departure. Tours may be
                        rescheduled for safety.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Group Safety</h4>
                      <p className="text-sm text-muted-foreground">
                        Stay with the group and follow your guide&apos;s
                        instructions at all times.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Pricing Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Book Your Adventure</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Pricing */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-lg bg-primary text-primary-foreground">
                      <div className="text-sm font-medium opacity-90">
                        Full Price
                      </div>
                      <div className="text-2xl font-bold">
                        KES {tour.price.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-primary/30">
                      <div className="text-sm font-medium">Booking Fee</div>
                      <div className="text-2xl font-bold">
                        KES {tour.booking.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Quick Stats */}

                  {/* Payment Methods */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-center">
                      Payment Options
                    </h3>

                    {/* M-Pesa Payment Component */}
                    <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white shadow-lg">
                      <div className="flex items-center justify-center mb-4">
                        <div className="bg-white rounded-lg p-2 mr-3">
                          <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              M
                            </span>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">M-PESA</h4>
                          <p className="text-green-100 text-sm">
                            Lipa Na M-PESA
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-green-100 text-sm">
                              Paybill Number
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-white hover:bg-white/20 h-6 px-2 text-xs"
                              onClick={async () => {
                                try {
                                  await navigator.clipboard.writeText("521000");
                                  toast({
                                    title: "Copied!",
                                    description:
                                      "Paybill number copied to clipboard",
                                  });
                                } catch (error) {
                                  console.log(error);
                                  toast({
                                    title: "Copy failed",
                                    description:
                                      "Please copy the number manually: 521000",
                                    variant: "destructive",
                                  });
                                }
                              }}
                            >
                              Copy
                            </Button>
                          </div>
                          <div className="font-mono text-xl font-bold">
                            521000
                          </div>
                        </div>

                        <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                          <div className="text-green-100 text-sm mb-1">
                            Account Number
                          </div>
                          <div className="font-mono text-lg font-semibold">
                            TFCre#
                            <span className="text-green-200">Your Number</span>
                          </div>
                          <p className="text-green-100 text-xs mt-1">
                            Replace &quot;Your Number&quot; with your phone
                            number
                          </p>
                        </div>

                        <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                          <div className="text-green-100 text-sm mb-1">
                            Amount
                          </div>
                          <div className="font-mono text-lg font-semibold">
                            KES {tour.booking.toLocaleString()}
                          </div>
                          <p className="text-green-100 text-xs mt-1">
                            Booking fee to secure your spot
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-200 mt-2 flex-shrink-0"></div>
                          <p className="text-green-100 text-xs">
                            After payment, send the M-PESA confirmation message
                            via WhatsApp for booking confirmation
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Booking Buttons */}
                  <div className="space-y-3">
                    <Button
                      className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white"
                      size="lg"
                    >
                      <a
                        className="flex w-full items-center justify-center gap-3"
                        href={`https://wa.me/+254703371240?text=Hello! I&apos;m interested in booking the ${tour.tourName} hike. Could you please provide more details?`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaWhatsapp className="text-xl" />
                        Book via WhatsApp
                      </a>
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full" size="lg">
                          <Mail className="w-4 h-4 mr-2" />
                          Book via Form
                        </Button>
                      </DialogTrigger>
                      <TourBooking tourName={tour.tourName} />
                    </Dialog>
                  </div>
                </CardContent>
              </Card>

              {/* Guide Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src="/icon.png" />
                      <AvatarFallback>TF</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">Tumaini Oasis Adventures Team</div>
                      <div className="text-sm text-muted-foreground">
                        Certified Mountain Guide
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm">4.9 • 200+ tours</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailsCard;
