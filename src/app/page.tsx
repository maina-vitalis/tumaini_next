import Hero from "@/components/homepage/Hero";
import RecentTours from "@/components/homepage/RecentTours";
import Safety from "@/components/homepage/Safety";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";
import { Button } from "@/components/ui/button";
import {
  generateFAQSchema,
  generateMetadata as generateSEOMetadata,
} from "@/lib/seo";
import { Metadata } from "next";
import { FaWhatsapp } from "react-icons/fa";

// Generate metadata for SEO
export const metadata: Metadata = generateSEOMetadata({
  title: "Premier Hiking Tours & Adventure Experiences in Kenya",
  description:
    "Join Tumaini Oasis Adventures for expert-led hiking tours across Kenya's most spectacular landscapes. Mt Kenya, Aberdares, and more. Professional guides, safety-first approach, unforgettable experiences for all levels.",
  keywords: [
    "hiking tours Kenya",
    "Mt Kenya hiking",
    "Aberdares tours",
    "adventure tourism Kenya",
    "mountain climbing",
    "guided hikes",
    "outdoor adventures",
    "Kenya safari alternatives",
    "eco-tourism",
    "fitness hiking",
  ],
});

export default function Home() {
  // Generate FAQ structured data
  const faqSchema = generateFAQSchema([
    {
      question: "What hiking tours do you offer in Kenya?",
      answer:
        "We offer a wide range of hiking tours across Kenya including Mt Kenya expeditions, Aberdares forest hikes, day hikes, multi-day adventures, and summit climbs suitable for all fitness levels.",
    },
    {
      question: "Are your hiking tours suitable for beginners?",
      answer:
        "Yes! We offer tours for all experience levels, from beginner-friendly day hikes to challenging summit expeditions. Our professional guides ensure everyone has a safe and enjoyable experience.",
    },
    {
      question: "What safety measures do you have in place?",
      answer:
        "Safety is our top priority. All our guides are certified, we provide safety equipment, conduct thorough briefings, maintain emergency communication, and follow strict safety protocols on all tours.",
    },
    {
      question: "What's included in your hiking tours?",
      answer:
        "Our tours typically include professional guide services, safety equipment, permits, transportation to trailheads, and detailed itineraries. Specific inclusions vary by tour - check individual tour details.",
    },
    {
      question: "How do I book a hiking tour?",
      answer:
        "You can browse our available tours on the website and contact us directly to make a booking. We'll help you choose the perfect adventure based on your fitness level and preferences.",
    },
  ]);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <div className="">
        {/* Hero Section */}
        <section className="mb-16">
          <Hero />
        </section>

        {/* Main Content */}
        <div className="space-y-24 pb-16">
          {/* Recent Tours Section */}
          <section className="container mx-auto px-4">
            <RecentTours />
          </section>

          {/* Why Choose Us Section */}
          <section className="container mx-auto px-4">
            <WhyChooseUs />
          </section>

          {/* Safety Section */}
          <section className="container mx-auto px-4">
            <Safety />
          </section>

          {/* Community CTA Section */}
          <section className="container mx-auto px-4">
            <div className="relative overflow-hidden rounded-2xl bg-greenPrimary p-8 text-white shadow-2xl">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-white/20"></div>
                <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-white/10"></div>
                <div className="absolute top-1/2 right-1/4 h-24 w-24 rounded-full bg-white/15"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 text-left max-w-3xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                  Join Our Adventure Community
                </h2>
                <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed">
                  Ready for breathtaking hikes? Connect with fellow adventurers,
                  get exclusive updates, and never miss out on your next
                  mountain conquest. Join our WhatsApp community today!
                </p>

                <Button
                  className="group relative overflow-hidden bg-white text-greenPrimary hover:bg-white/95 
                            border-2 border-white/20 hover:border-white transition-all duration-300 
                            rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl
                            hover:scale-105 transform"
                  asChild
                >
                  <a
                    href="https://chat.whatsapp.com/DGG9QDHw7au1KGOCu7pYDO"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3"
                  >
                    <span>Join Our Community</span>
                    <FaWhatsapp className="text-2xl group-hover:scale-110 transition-transform duration-300" />
                  </a>
                </Button>

                <div className="mt-6 flex items-center justify-start gap-6 text-sm text-white/80">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                    500+ Active Members
                  </span>
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                    Weekly Updates
                  </span>
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                    Exclusive Offers
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
