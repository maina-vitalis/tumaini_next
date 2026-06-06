"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  ImageIcon,
  Loader2,
  MapPin,
  Mountain,
  Plus,
  Save,
  Star,
  Trash2,
  Upload,
  Users,
  X,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Zod schema for form validation
const tourSchema = z.object({
  tourName: z
    .string()
    .min(1, "Tour name is required")
    .max(100, "Tour name too long"),
  location: z
    .string()
    .min(1, "Location is required")
    .max(100, "Location too long"),
  price: z.number().min(0, "Price must be positive"),
  booking: z.number().min(0, "Booking count must be positive"),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5"),
  difficulty: z.enum([
    "Easy",
    "Moderate",
    "Advanced",
    "Challenging",
    "Strenuous",
  ]),
  level: z.enum([
    "Child-friendly",
    "Beginner",
    "Intermediate",
    "Advanced",
    "Expert",
  ]),
  hikeType: z.enum(["Day Hike", "Multi-day", "Summit", "Trail", "Adventure"]),
  date: z.date({ error: "Tour date is required" }),
  summary: z
    .string()
    .min(10, "Summary must be at least 10 characters")
    .max(500, "Summary too long"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  images: z.array(z.string()).min(1, "At least one image is required"),
  itinerary: z
    .array(
      z.object({
        time: z.string().min(1, "Time is required"),
        details: z.string().min(1, "Details are required"),
      })
    )
    .min(1, "At least one itinerary item is required"),
  inclusive: z
    .array(z.object({ value: z.string().min(1, "Item cannot be empty") }))
    .min(1, "At least one included item is required"),
  exclusive: z
    .array(z.object({ value: z.string().min(1, "Item cannot be empty") }))
    .min(1, "At least one excluded item is required"),
});

type TourFormData = z.infer<typeof tourSchema>;

export default function CreateTour() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [deletingImages, setDeletingImages] = useState<Set<number>>(new Set());

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<TourFormData>({
    resolver: zodResolver(tourSchema),
    defaultValues: {
      tourName: "",
      location: "",
      price: 0,
      booking: 0,
      rating: 5,
      difficulty: "Easy",
      level: "Beginner",
      hikeType: "Day Hike",
      summary: "",
      description: "",
      images: [],
      itinerary: [],
      inclusive: [],
      exclusive: [],
    },
  });

  const {
    fields: itineraryFields,
    append: appendItinerary,
    remove: removeItinerary,
  } = useFieldArray({
    control,
    name: "itinerary",
  });

  const {
    fields: inclusiveFields,
    append: appendInclusive,
    remove: removeInclusive,
  } = useFieldArray({
    control,
    name: "inclusive",
  });

  const {
    fields: exclusiveFields,
    append: appendExclusive,
    remove: removeExclusive,
  } = useFieldArray({
    control,
    name: "exclusive",
  });

  const watchedImages = watch("images");
  const [newItineraryItem, setNewItineraryItem] = useState({
    time: "",
    details: "",
  });
  const [newInclusiveItem, setNewInclusiveItem] = useState("");
  const [newExclusiveItem, setNewExclusiveItem] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploadPromises = Array.from(files).map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Upload failed");
        const data = await response.json();
        return data.url;
      } catch (error) {
        console.error("Upload error:", error);
        toast.error(`Failed to upload ${file.name}`);
        return null;
      }
    });

    try {
      const uploadedUrls = await Promise.all(uploadPromises);
      const validUrls = uploadedUrls.filter(
        (url): url is string => url !== null
      );

      if (validUrls.length > 0) {
        const currentImages = watch("images");
        setValue("images", [...currentImages, ...validUrls], {
          shouldDirty: true,
        });
        toast.success(`Successfully uploaded ${validUrls.length} image(s)`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload images");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const extractPublicId = (imageUrl: string): string => {
    try {
      const parts = imageUrl.split("/");
      const uploadIndex = parts.findIndex((part) => part === "upload");
      if (uploadIndex === -1) return "";

      const pathAfterUpload = parts.slice(uploadIndex + 2).join("/");
      const publicIdWithExtension = pathAfterUpload.replace(
        "tumaini-tours/",
        ""
      );
      const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, "");

      return `tumaini-tours/${publicId}`;
    } catch (error) {
      console.error("Error extracting public ID:", error);
      return "";
    }
  };

  const deleteImageFromCloudinary = async (
    imageUrl: string
  ): Promise<boolean> => {
    try {
      const publicId = extractPublicId(imageUrl);
      if (!publicId) {
        console.error("Could not extract public ID from URL:", imageUrl);
        return false;
      }

      const response = await fetch("/api/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Cloudinary deletion failed:", errorData);
        return false;
      }

      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error("Error deleting image from Cloudinary:", error);
      return false;
    }
  };

  const removeImage = async (index: number) => {
    const currentImages = watch("images");
    const imageUrl = currentImages[index];
    setDeletingImages((prev) => new Set(prev).add(index));

    try {
      const deleted = await deleteImageFromCloudinary(imageUrl);
      if (deleted) {
        const newImages = currentImages.filter((_, i) => i !== index);
        setValue("images", newImages, { shouldDirty: true });
        toast.success("Image deleted successfully");
      } else {
        toast.error("Failed to delete image from cloud storage");
      }
    } catch (error) {
      console.error("Error removing image:", error);
      toast.error("Failed to delete image");
    } finally {
      setDeletingImages((prev) => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
    }
  };

  const addItineraryItem = () => {
    if (newItineraryItem.time.trim() && newItineraryItem.details.trim()) {
      appendItinerary({ ...newItineraryItem });
      setNewItineraryItem({ time: "", details: "" });
    }
  };

  const addInclusiveItem = () => {
    if (newInclusiveItem.trim()) {
      appendInclusive({ value: newInclusiveItem.trim() });
      setNewInclusiveItem("");
    }
  };

  const addExclusiveItem = () => {
    if (newExclusiveItem.trim()) {
      appendExclusive({ value: newExclusiveItem.trim() });
      setNewExclusiveItem("");
    }
  };

  const onSubmit = async (data: TourFormData) => {
    try {
      const response = await fetch("/api/tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          date: format(data.date, "yyyy-MM-dd"),
          inclusive: data.inclusive.map((i) => i.value),
          exclusive: data.exclusive.map((i) => i.value),
        }),
      });

      if (response.ok) {
        toast.success("Tour created successfully!");
        router.push("/admin/dashboard");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to create tour");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-card-foreground">
                  Create New Tour
                </h1>
                <p className="text-muted-foreground">
                  Add a new tour to your collection
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {isDirty && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <AlertCircle className="h-3 w-3 text-primary" />
                  Unsaved changes
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <Card className="shadow-lg">
            <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Mountain className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="tourName" className="flex items-center gap-2">
                    <Mountain className="h-4 w-4" />
                    Tour Name *
                  </Label>
                  <Controller
                    name="tourName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="tourName"
                        placeholder="Enter tour name"
                        className={errors.tourName ? "border-destructive" : ""}
                      />
                    )}
                  />
                  {errors.tourName && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <XCircle className="h-3 w-3" />
                      {errors.tourName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location *
                  </Label>
                  <Controller
                    name="location"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="location"
                        placeholder="Enter location"
                        className={errors.location ? "border-destructive" : ""}
                      />
                    )}
                  />
                  {errors.location && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <XCircle className="h-3 w-3" />
                      {errors.location.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price" className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Price (KES) *
                  </Label>
                  <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="price"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className={errors.price ? "border-destructive" : ""}
                      />
                    )}
                  />
                  {errors.price && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <XCircle className="h-3 w-3" />
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="booking" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Current Bookings
                  </Label>
                  <Controller
                    name="booking"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="booking"
                        type="number"
                        placeholder="0"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className={errors.booking ? "border-destructive" : ""}
                      />
                    )}
                  />
                  {errors.booking && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <XCircle className="h-3 w-3" />
                      {errors.booking.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rating" className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Rating (1-5)
                  </Label>
                  <Controller
                    name="rating"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="rating"
                        type="number"
                        min="1"
                        max="5"
                        step="0.1"
                        placeholder="5.0"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className={errors.rating ? "border-destructive" : ""}
                      />
                    )}
                  />
                  {errors.rating && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <XCircle className="h-3 w-3" />
                      {errors.rating.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Tour Date *
                </Label>
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      date={field.value}
                      onDateChange={field.onChange}
                      placeholder="Select tour date"
                      className={errors.date ? "border-destructive" : ""}
                    />
                  )}
                />
                {errors.date && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <XCircle className="h-3 w-3" />
                    {errors.date.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tour Details */}
          <Card className="shadow-lg">
            <CardHeader className="bg-secondary text-secondary-foreground rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Mountain className="h-5 w-5" />
                Tour Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Controller
                    name="difficulty"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          className={
                            errors.difficulty ? "border-destructive" : ""
                          }
                        >
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Easy">Easy</SelectItem>
                          <SelectItem value="Moderate">Moderate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                          <SelectItem value="Challenging">
                            Challenging
                          </SelectItem>
                          <SelectItem value="Strenuous">Strenuous</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.difficulty && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <XCircle className="h-3 w-3" />
                      {errors.difficulty.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level">Experience Level</Label>
                  <Controller
                    name="level"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          className={errors.level ? "border-destructive" : ""}
                        >
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Child-friendly">
                            Child-friendly
                          </SelectItem>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                          <SelectItem value="Expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.level && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <XCircle className="h-3 w-3" />
                      {errors.level.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hikeType">Hike Type</Label>
                  <Controller
                    name="hikeType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          className={
                            errors.hikeType ? "border-destructive" : ""
                          }
                        >
                          <SelectValue placeholder="Select hike type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Day Hike">Day Hike</SelectItem>
                          <SelectItem value="Multi-day">Multi-day</SelectItem>
                          <SelectItem value="Summit">Summit</SelectItem>
                          <SelectItem value="Trail">Trail</SelectItem>
                          <SelectItem value="Adventure">Adventure</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.hikeType && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <XCircle className="h-3 w-3" />
                      {errors.hikeType.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="summary">Tour Summary *</Label>
                <Controller
                  name="summary"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      id="summary"
                      placeholder="Brief summary of the tour..."
                      rows={3}
                      className={errors.summary ? "border-destructive" : ""}
                    />
                  )}
                />
                {errors.summary && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <XCircle className="h-3 w-3" />
                    {errors.summary.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description *</Label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      id="description"
                      placeholder="Detailed description of the tour experience..."
                      rows={6}
                      className={errors.description ? "border-destructive" : ""}
                    />
                  )}
                />
                {errors.description && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <XCircle className="h-3 w-3" />
                    {errors.description.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Images, Itinerary, and Lists */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Images */}
            <Card className="shadow-lg">
              <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Tour Images *
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={uploading}
                      className="hidden"
                      id="image-upload"
                    />
                    <Label
                      htmlFor="image-upload"
                      className={`flex items-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted dark:hover:bg-muted/50 transition-colors ${
                        uploading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {uploading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Upload className="h-4 w-4" />
                      )}
                      {uploading ? "Uploading..." : "Upload Images"}
                    </Label>
                  </div>

                  {errors.images && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <XCircle className="h-3 w-3" />
                      {errors.images.message}
                    </p>
                  )}

                  <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto">
                    {watchedImages.map((image, index) => (
                      <div
                        key={index}
                        className="relative group border rounded-lg overflow-hidden bg-muted/20 dark:bg-muted/50"
                      >
                        <div className="aspect-video relative">
                          <Image
                            src={image}
                            alt={`Tour image ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                        <div className="p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              Image {index + 1}
                            </span>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => removeImage(index)}
                              disabled={deletingImages.has(index)}
                              className="h-8 w-8 p-0"
                            >
                              {deletingImages.has(index) ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                <Trash2 className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {watchedImages.length === 0 && (
                      <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                        <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="font-medium">No images uploaded yet</p>
                        <p className="text-sm">
                          Upload at least one image to continue
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Itinerary */}
            <Card className="shadow-lg">
              <CardHeader className="bg-secondary text-secondary-foreground rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Tour Itinerary *
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <Input
                      value={newItineraryItem.time}
                      onChange={(e) =>
                        setNewItineraryItem({
                          ...newItineraryItem,
                          time: e.target.value,
                        })
                      }
                      placeholder="Time (e.g., 6:00 AM)"
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), addItineraryItem())
                      }
                    />
                    <Textarea
                      value={newItineraryItem.details}
                      onChange={(e) =>
                        setNewItineraryItem({
                          ...newItineraryItem,
                          details: e.target.value,
                        })
                      }
                      placeholder="Activity details..."
                      rows={2}
                    />
                    <Button
                      type="button"
                      onClick={addItineraryItem}
                      className="w-full"
                      disabled={
                        !newItineraryItem.time.trim() ||
                        !newItineraryItem.details.trim()
                      }
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Itinerary Item
                    </Button>
                  </div>

                  {errors.itinerary && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <XCircle className="h-3 w-3" />
                      {errors.itinerary.message}
                    </p>
                  )}

                  <Separator />

                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {itineraryFields.map((item, index) => (
                      <div
                        key={item.id}
                        className="flex items-start justify-between bg-muted/50 p-3 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="font-medium text-sm">{item.time}</div>
                          <div className="text-sm text-muted-foreground">
                            {item.details}
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItinerary(index)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                    {itineraryFields.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>No itinerary items added yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Included and Excluded Items */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* What's Included */}
            <Card className="shadow-lg">
              <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  What&apos;s Included *
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newInclusiveItem}
                      onChange={(e) => setNewInclusiveItem(e.target.value)}
                      placeholder="Add included item..."
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), addInclusiveItem())
                      }
                    />
                    <Button
                      type="button"
                      onClick={addInclusiveItem}
                      disabled={!newInclusiveItem.trim()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {errors.inclusive && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <XCircle className="h-3 w-3" />
                      {errors.inclusive.message}
                    </p>
                  )}

                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {inclusiveFields.map((item, index) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between bg-muted/50 p-3 rounded-lg"
                      >
                        <span className="text-sm flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          {item.value}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeInclusive(index)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}

                    {inclusiveFields.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <CheckCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>No included items added yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What's Not Included */}
            <Card className="shadow-lg">
              <CardHeader className="bg-destructive text-destructive-foreground rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <XCircle className="h-5 w-5" />
                  What&apos;s Not Included *
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newExclusiveItem}
                      onChange={(e) => setNewExclusiveItem(e.target.value)}
                      placeholder="Add excluded item..."
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), addExclusiveItem())
                      }
                    />
                    <Button
                      type="button"
                      onClick={addExclusiveItem}
                      disabled={!newExclusiveItem.trim()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {errors.exclusive && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <XCircle className="h-3 w-3" />
                      {errors.exclusive.message}
                    </p>
                  )}

                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {exclusiveFields.map((item, index) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between bg-muted/50 p-3 rounded-lg"
                      >
                        <span className="text-sm flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-destructive" />
                          {item.value}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeExclusive(index)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}

                    {exclusiveFields.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <XCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>No excluded items added yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Submit Actions */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {isDirty ? (
                    <>
                      <AlertCircle className="h-4 w-4 text-primary" />
                      You have unsaved changes
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Ready to create tour
                    </>
                  )}
                </div>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-w-[120px]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Create Tour
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
