"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Edit, Home, LogOut, MapPin, Plus, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Admin {
  id: string;
  email: string;
  name: string;
}

interface Tour {
  id: string;
  tourName: string;
  price: number;
  booking: number;
  images: string[];
  rating: number;
  difficulty: string;
  level: string;
  hikeType: string;
  location: string;
  date: string;
  description: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
  inclusive?: string[];
  exclusive?: string[];
}

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: Home,
  },
];

// Format price in KSH
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
  }).format(price);
};

// Format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function AdminDashboard() {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Parallel fetches for faster load
        const [adminResponse, toursResponse] = await Promise.all([
          fetch("/api/admin/verify"),
          fetch("/api/tours"),
        ]);

        if (adminResponse.ok) {
          const adminData = await adminResponse.json();
          setAdmin(adminData.admin);
        } else {
          router.push("/admin/login");
          return;
        }

        if (toursResponse.ok) {
          const toursData = await toursResponse.json();
          setTours(toursData);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error loading dashboard data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
      });

      if (response.ok) {
        toast.success("Logged out successfully");
        router.push("/admin/login");
      } else {
        toast.error("Logout failed");
      }
    } catch {
      toast.error("Logout error");
    }
  };

  const handleDeleteTour = async (tourId: string) => {
    if (!confirm("Are you sure you want to delete this tour?")) {
      return;
    }

    try {
      const response = await fetch(`/api/tours/${tourId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Tour deleted successfully");
        setTours(tours.filter((tour) => tour.id !== tourId));
      } else {
        toast.error("Failed to delete tour");
      }
    } catch {
      toast.error("Error deleting tour");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!admin) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <Sidebar className="hidden lg:block">
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <MapPin className="h-6 w-6 text-green-600" />
              <span className="font-bold text-lg">Tumaini Admin</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url} className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="p-4 border-t">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {admin.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{admin.name}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {admin.email}
                  </p>
                </div>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="w-full flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-x-hidden">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="lg:hidden" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-primary">
                  Tour Management
                </h1>
                <p className="text-sm mt-1">
                  Manage your hiking tours and bookings
                </p>
              </div>
            </div>
            <div className="sm:ml-auto">
              <Button
                onClick={() => router.push("/admin/tours/create")}
                className="w-full sm:w-auto flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Add New Tour</span>
                <span className="sm:hidden">Add Tour</span>
              </Button>
            </div>
          </div>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card className="bg-primary/20 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-primary">
                  Total Tours
                </CardTitle>
                <MapPin className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tours.length}</div>
                <p className="text-xs text-foreground/60 mt-1">
                  Active tour packages
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary/20 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-primary">
                  Avg Rating
                </CardTitle>
                <Star className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {tours.length > 0
                    ? (
                        tours.reduce((sum, tour) => sum + tour.rating, 0) /
                        tours.length
                      ).toFixed(1)
                    : "0"}
                </div>
                <p className="text-xs text-foreground/60 mt-1">
                  Average tour rating
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tours Management */}
          <Card className="shadow-sm bg-primary/10">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-lg font-semibold text-primary">
                  All Tours
                </CardTitle>
                <p className="text-sm mt-1">Manage your tour listings</p>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {tours.length === 0 ? (
                  <div className="text-center py-12 px-4">
                    <MapPin className="h-12 w-12 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No tours found</h3>
                    <p className="mb-4">
                      Get started by creating your first tour!
                    </p>
                    <Button
                      onClick={() => router.push("/admin/tours/create")}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create First Tour
                    </Button>
                  </div>
                ) : (
                  tours.map((tour) => (
                    <div
                      key={tour.id}
                      className="p-4 sm:p-6 hover:bg-primary/30 transition-colors"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        {/* Tour Image and Basic Info */}
                        <div className="flex items-start gap-4 flex-1">
                          {tour.images && tour.images.length > 0 ? (
                            <Image
                              src={tour.images[0]}
                              alt={tour.tourName}
                              width={80}
                              height={80}
                              className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover flex-shrink-0"
                            />
                          ) : (
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                              <MapPin className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm text-primary sm:text-base truncate">
                              {tour.tourName}
                            </h3>
                            <p className="text-sm truncate">{tour.location}</p>
                            <p className="text-xs mt-1">
                              {formatDate(tour.date)}
                            </p>
                            <div className="flex flex-wrap items-center gap-1 mt-2">
                              <Badge variant="default" className="text-xs">
                                {tour.difficulty}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {tour.level}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {tour.hikeType}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        {/* Stats and Actions */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6">
                          {/* Stats */}
                          <div className="grid grid-cols-2 gap-4 sm:gap-6 text-center">
                            <div>
                              <p className="text-lg sm:text-xl font-bold text-primary">
                                {formatPrice(tour.price)}
                              </p>
                              <p className="text-xs">Price</p>
                            </div>
                            <div>
                              <div className="flex items-center justify-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-lg sm:text-xl font-bold text-primary">
                                  {tour.rating}
                                </span>
                              </div>
                              <p className="text-xs">Rating</p>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              onClick={() =>
                                router.push(`/admin/tours/edit/${tour.id}`)
                              }
                              className="flex-1 sm:flex-none"
                            >
                              <Edit className="h-4 w-4 sm:mr-2" />
                              <span className="hidden sm:inline">Edit</span>
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleDeleteTour(tour.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 flex-1 sm:flex-none"
                            >
                              <Trash2 className="h-4 w-4 sm:mr-2" />
                              <span className="hidden sm:inline">Delete</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </SidebarProvider>
  );
}
