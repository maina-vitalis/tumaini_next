import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  AlertTriangle,
  Backpack,
  Calendar,
  CheckCircle,
  Clock,
  Compass,
  Droplets,
  Heart,
  MapPin,
  Mountain,
  Shield,
  Star,
  Sun,
  Target,
  Utensils,
  Zap,
} from "lucide-react";

export default function PreparationPage() {
  const trainingPhases = [
    {
      phase: "5-6 Weeks Before",
      title: "Foundation Building",
      activities: [
        "Start with 30-minute walks daily",
        "Basic bodyweight exercises",
        "Light cardio 3x per week",
      ],
    },
    {
      phase: "3-4 Weeks Before",
      title: "Endurance Building",
      activities: [
        "45-60 minute hikes with elevation",
        "Strength training 2x per week",
        "Swimming or cycling",
      ],
    },
    {
      phase: "2 Weeks Before",
      title: "Peak Training",
      activities: [
        "Long hikes with full gear",
        "Hill repeats and stair climbing",
        "Core strengthening exercises",
      ],
    },
    {
      phase: "1 Week Before",
      title: "Tapering",
      activities: [
        "Light walks and stretching",
        "Gear testing and packing",
        "Mental preparation",
      ],
    },
    {
      phase: "Day Before",
      title: "Rest & Prepare",
      activities: ["Complete rest day", "Hydrate well", "Early bedtime"],
    },
  ];

  const preparationCategories = [
    {
      title: "Physical Training",
      icon: Activity,
      tips: [
        "Build cardiovascular endurance gradually",
        "Focus on leg and core strength",
        "Practice hiking with a loaded backpack",
        "Include balance and stability exercises",
      ],
      proTip: "Train on similar terrain when possible",
    },
    {
      title: "Nutrition Planning",
      icon: Utensils,
      tips: [
        "Eat balanced meals leading up to the hike",
        "Test energy foods during training",
        "Avoid trying new foods before the hike",
        "Plan your pre-hike breakfast",
      ],
      proTip: "Carb-load 2-3 days before for energy reserves",
    },
    {
      title: "Mental Preparation",
      icon: Target,
      tips: [
        "Visualize successful completion",
        "Set realistic expectations",
        "Prepare for challenging moments",
        "Practice positive self-talk",
      ],
      proTip: "Mental toughness is as important as physical fitness",
    },
    {
      title: "Equipment Check",
      icon: Backpack,
      tips: [
        "Test all gear before the hike",
        "Break in new hiking boots",
        "Pack according to weather forecast",
        "Create a gear checklist",
      ],
      proTip: "Never use brand new gear on a hike",
    },
    {
      title: "Route Planning",
      icon: MapPin,
      tips: [
        "Study the trail map and elevation profile",
        "Check weather conditions",
        "Identify rest stops and water sources",
        "Share your itinerary with someone",
      ],
      proTip: "Always have a backup plan",
    },
    {
      title: "Health & Safety",
      icon: Shield,
      tips: [
        "Consult doctor if you have health concerns",
        "Pack a comprehensive first aid kit",
        "Know your limits and listen to your body",
        "Inform guides of any medical conditions",
      ],
      proTip: "Your safety is more important than reaching the summit",
    },
  ];

  const gearCategories = [
    {
      category: "Footwear & Clothing",
      items: [
        "Broken-in hiking boots",
        "Moisture-wicking base layers",
        "Insulating mid-layer",
        "Waterproof outer shell",
        "Hiking socks (wool or synthetic)",
        "Sun hat and warm beanie",
        "Hiking pants/shorts",
        "Gaiters (if needed)",
      ],
    },
    {
      category: "Navigation & Safety",
      items: [
        "Map and compass",
        "GPS device or smartphone app",
        "Whistle",
        "Headlamp + extra batteries",
        "First aid kit",
        "Emergency shelter",
        "Multi-tool or knife",
        "Sunglasses and sunscreen",
      ],
    },
    {
      category: "Hydration & Nutrition",
      items: [
        "Water bottles or hydration system",
        "Water purification tablets",
        "High-energy snacks",
        "Lunch and extra food",
        "Electrolyte supplements",
        "Insulated mug (for hot drinks)",
      ],
    },
    {
      category: "Personal Items",
      items: [
        "Backpack (appropriate size)",
        "Trekking poles",
        "Camera",
        "Personal medications",
        "Toilet paper and trowel",
        "Hand sanitizer",
        "Cash for permits/fees",
        "Emergency contact information",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Badge className="bg-white/20 text-white border-white/30 text-lg px-4 py-2">
                <Mountain className="w-5 h-5 mr-2" />
                Preparation Guide
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Prepare for Your
              <span className="block text-primary-foreground/90">Epic Adventure</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Transform your hiking dreams into reality with our comprehensive
              preparation guide. Every summit conquered starts with proper
              preparation.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        {/* Training Timeline */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your Training Timeline
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Follow this progressive training schedule to build the fitness and
              confidence needed for your hike
            </p>
          </div>

          <div className="grid gap-6 md:gap-8">
            {trainingPhases.map((phase, index) => (
              <Card key={index} className="overflow-hidden border-l-4 border-l-primary">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-primary/10 text-primary p-6 md:w-64 flex-shrink-0">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-6 h-6" />
                        <span className="font-semibold">{phase.phase}</span>
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{phase.title}</h3>
                    </div>
                    <div className="p-6 flex-1">
                      <ul className="space-y-3">
                        {phase.activities.map((activity, actIndex) => (
                          <li key={actIndex} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Preparation Categories */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Essential Preparation Areas
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Master these key areas to ensure you&apos;re fully prepared for
              your hiking adventure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {preparationCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-md transition-all duration-300 border-border/50"
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-xl">
                        {category.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {category.tips.map((tip, tipIndex) => (
                        <li
                          key={tipIndex}
                          className="flex items-start gap-2 text-sm"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-3 border-t">
                      <div className="flex items-start gap-2">
                        <Star className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                        <p className="text-sm font-medium text-primary">
                          Pro Tip: {category.proTip}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Gear Checklist */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Complete Gear Checklist
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don&apos;t leave anything to chance. Use this comprehensive
              checklist to pack like a pro
            </p>
          </div>

          <Tabs defaultValue="footwear" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
              <TabsTrigger value="footwear">Clothing</TabsTrigger>
              <TabsTrigger value="navigation">Safety</TabsTrigger>
              <TabsTrigger value="hydration">Nutrition</TabsTrigger>
              <TabsTrigger value="personal">Personal</TabsTrigger>
            </TabsList>

            {gearCategories.map((category, index) => (
              <TabsContent
                key={index}
                value={
                  ["footwear", "navigation", "hydration", "personal"][index]
                }
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Backpack className="w-5 h-5" />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {category.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* Important Reminders */}
        <section>
          <Card className="border-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <AlertTriangle className="w-6 h-6" />
                Important Reminders
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2 text-foreground">
                    <Heart className="w-4 h-4 text-primary" />
                    Health & Safety
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>
                      • Consult your doctor if you have any health concerns
                    </li>
                    <li>• Never hike alone - stay with your group</li>
                    <li>• Know your limits and don&apos;t push beyond them</li>
                    <li>
                      • Inform guides of any medical conditions or medications
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2 text-foreground">
                    <Zap className="w-4 h-4 text-secondary" />
                    Final Preparations
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>
                      • Check weather forecast and adjust gear accordingly
                    </li>
                    <li>• Charge all electronic devices</li>
                    <li>• Trim toenails to prevent discomfort</li>
                    <li>• Get a good night&apos;s sleep before the hike</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Final 24 Hours */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Final 24 Hours Checklist
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Last-minute preparations to ensure you&apos;re ready for an
              amazing adventure
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Sun className="w-5 h-5" />
                  Night Before
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Pack your backpack and double-check gear",
                  "Prepare and lay out hiking clothes",
                  "Charge all devices and pack power banks",
                  "Hydrate well throughout the day",
                  "Eat a nutritious dinner",
                  "Get to bed early for quality sleep",
                  "Set multiple alarms",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-secondary">
                  <Clock className="w-5 h-5" />
                  Morning Of
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Wake up early and avoid rushing",
                  "Eat a substantial, familiar breakfast",
                  "Use the bathroom before leaving",
                  "Apply sunscreen and insect repellent",
                  "Fill water bottles and check gear",
                  "Arrive at meeting point 15 minutes early",
                  "Stay positive and excited!",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="bg-primary text-primary-foreground border-0">
            <CardContent className="p-12">
              <Mountain className="w-16 h-16 mx-auto mb-6 opacity-80" />
              <h2 className="text-3xl font-bold mb-4">
                Ready to Conquer Your Next Adventure?
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                With proper preparation, every mountain becomes conquerable.
                Your journey to the summit starts with the first step of
                preparation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Badge variant="secondary" className="text-lg px-6 py-3">
                  <Compass className="w-5 h-5 mr-2" />
                  Plan Your Route
                </Badge>
                <Badge variant="secondary" className="text-lg px-6 py-3">
                  <Droplets className="w-5 h-5 mr-2" />
                  Stay Hydrated
                </Badge>
                <Badge variant="secondary" className="text-lg px-6 py-3">
                  <Shield className="w-5 h-5 mr-2" />
                  Stay Safe
                </Badge>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
