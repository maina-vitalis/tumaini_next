import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import { ParallaxScrollSecond } from "@/components/ui/parallax-scroll-2";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
  title: "Photo Gallery",
  description:
    "Explore stunning photos from our hiking adventures across Kenya's mountains including Mt Kenya, Aberdares, and scenic trails. See the experiences that await you.",
  keywords: [
    "hiking gallery Kenya",
    "Mt Kenya photos",
    "Kenya hiking pictures",
    "Tumaini Oasis Adventures gallery",
    "adventure photography",
    "mountain trail photos",
  ],
  url: "/gallery",
});

// Real adventure photos from Cloudinary
const galleryImages = [
  "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121730/image_9_luw3l9.jpg",
  "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121730/image12_yvhhqt.jpg",
  "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121730/image_11_bgmnuq.jpg",
  "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121730/image18_xmwb7f.jpg",
  "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121730/image_10_fd31dt.jpg",
  "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121729/image19_b80oyp.jpg",
  "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121729/image15_ue2jgy.jpg",
  "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121728/image21_cc3zqg.jpg",
  "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121728/image13_dj655i.jpg",
  "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121729/image_14_hwdava.jpg",
  "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121727/image16_zcep0t.jpg",
  "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121727/image23_z4kik6.jpg",
  "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121727/image20_smnsdq.jpg",
  "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121726/image25_ilvdhy.jpg",
  "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121726/tumaini_choose_us_wljnt0.jpg",
  "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121726/image24_gd8hxd.jpg",
  "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121726/image22_fvwdc0.jpg",
  "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121723/image_3_jsh8ai.jpg",
  "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121725/image_2_y2ttup.jpg",
  "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121724/image_1_fty6uw.jpg",
  "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121722/image_4_aqwwxc.jpg",
  "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121724/tumainiFitnessChooseUs_hhhmvm.jpg",
  "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121722/hero_xrswqk.jpg",
  "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121722/image6_h9pyvn.jpg",
  "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121722/image8_oern0h.jpg",
  "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121722/image5_pk0z1x.jpg",
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      {/* SEO-optimized heading structure */}
      <header className="text-center py-10 border-b">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-greenPrimary mb-3">
          Adventure Gallery
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Moments captured on the trails. Real hikers, real adventures across
          Kenya&apos;s most beautiful mountains.
        </p>
      </header>

      <div className="py-8">
        <ParallaxScrollSecond className="hidden md:block" images={galleryImages} />
        <ParallaxScroll className="md:hidden" images={galleryImages} />
      </div>
    </div>
  );
}
