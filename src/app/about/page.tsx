import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  generateBreadcrumbSchema,
  generateOrganizationSchema,
  generateMetadata as generateSEOMetadata,
} from "@/lib/seo";
import {
  Award,
  CheckCircle,
  Heart,
  Mountain,
  Shield,
  Star,
  Target,
  Users,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

// Generate metadata for SEO
export const metadata: Metadata = generateSEOMetadata({
  title:
    "About Tumaini Oasis Adventures | Professional Hiking Guides & Adventure Tours Kenya",
  description:
    "Learn about Tumaini Oasis Adventures - Kenya's premier hiking tour company. Professional certified guides, 5+ years experience, safety-first approach.",
  keywords: [
    "about Tumaini Oasis Adventures",
    "hiking company Kenya",
    "professional hiking guides",
    "Kenya adventure tours",
    "certified mountain guides",
  ],
  url: "/about",
});

export default function AboutPage() {
  // Generate structured data
  const organizationSchema = {
    ...generateOrganizationSchema(),
    name: "Tumaini Oasis Adventures",
    description:
      "Tumaini Oasis Adventures - Kenya's premier hiking tour company offering professional certified guides, expert-led adventures, and unforgettable experiences across Kenya's mountains.",
  };
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about" },
  ]);

  // Company stats
  const stats = [
    { icon: Users, label: "Happy Hikers", value: "500+" },
    { icon: Mountain, label: "Tours Completed", value: "200+" },
    { icon: Award, label: "Years Experience", value: "5+" },
    { icon: Star, label: "Average Rating", value: "4.8" },
  ];

  // Core values
  const values = [
    {
      icon: Shield,
      title: "Safety First",
      description:
        "Your safety is our top priority. All guides are certified in wilderness first aid and emergency response.",
    },
    {
      icon: Heart,
      title: "Passion for Adventure",
      description:
        "We live and breathe the outdoors. Our passion for Kenya's mountains drives everything we do.",
    },
    {
      icon: Target,
      title: "Excellence",
      description:
        "We strive for excellence in every tour, ensuring unforgettable experiences for all our guests.",
    },
  ];

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li className="text-foreground font-medium" aria-current="page">
            About Us
          </li>
        </ol>
      </nav>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/5 py-16 lg:py-24">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="secondary" className="mb-6">
              <Mountain className="w-4 h-4 mr-2" />
              About Tumaini Oasis Adventures
            </Badge>

            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Your Gateway to
              <span className="text-primary block">Kenya&apos;s Mountains</span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
              For over 5 years, Tumaini Oasis Adventures has been Kenya&apos;s trusted
              partner for mountain adventures. We combine professional expertise
              with genuine passion to create unforgettable hiking experiences.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/tours">Explore Our Tours</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-4 opacity-90" />
                  <div className="text-3xl lg:text-4xl font-bold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm lg:text-base opacity-90">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Born from a passion for Kenya&apos;s incredible landscapes
              </p>

              <div className="space-y-6 text-lg leading-relaxed text-left">
                <p>
                  Tumaini Oasis Adventures was founded in 2019 with a simple mission: to
                  make Kenya&apos;s breathtaking mountains accessible to
                  everyone, regardless of their experience level. What started
                  as a small group of passionate hikers has grown into
                  Kenya&apos;s most trusted adventure tour company.
                </p>

                <p>
                  Our name &quot;Tumaini&quot; means &quot;hope&quot; in
                  Swahili, reflecting our belief that every mountain adventure
                  brings hope, healing, and transformation. We&apos;ve guided
                  over 500 adventurers to Kenya&apos;s peaks, from first-time
                  hikers to seasoned mountaineers.
                </p>

                <div className="grid md:grid-cols-2 gap-4 mt-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Certified professional guides</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Safety-first approach</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Sustainable tourism practices</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Community-focused initiatives</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-16 lg:py-24 bg-secondary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Our Core Values
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The principles that guide every adventure
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="text-center p-6 hover:shadow-lg transition-shadow"
                >
                  <CardContent className="space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <value.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Our Mission
              </h2>
              <p className="text-xl leading-relaxed text-muted-foreground">
                To provide safe, professional, and transformative hiking
                experiences that connect people with Kenya&apos;s natural beauty
                while supporting local communities and promoting sustainable
                tourism practices.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold">
                Ready for Your Next Adventure?
              </h2>
              <p className="text-xl opacity-90">
                Join hundreds of satisfied hikers who have discovered
                Kenya&apos;s mountains with us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/tours">
                    <Mountain className="w-5 h-5 mr-2" />
                    Browse Tours
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
                  asChild
                >
                  <Link href="/contact">Get In Touch</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
