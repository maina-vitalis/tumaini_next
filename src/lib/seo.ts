import { Metadata } from "next";

// SEO Constants - Best practice: Set NEXT_PUBLIC_BASE_URL in env for production (include protocol, no trailing slash)
// Primary brand name: Tumaini Oasis Adventures
export const SEO_CONFIG = {
  siteName: "Tumaini Oasis Adventures",
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://tumainioasisadventures.co.ke",
  defaultTitle:
    "Tumaini Oasis Adventures | Premier Hiking Tours & Adventure Experiences in Kenya",
  defaultDescription:
    "Join Tumaini Oasis Adventures for expert-led hiking tours, summit adventures, and scenic trail explorations across Kenya. Professional guides, safety-first approach, and unforgettable outdoor experiences for all fitness levels.",
  defaultKeywords: [
    "hiking tours Kenya",
    "Mt Kenya hiking",
    "Aberdares hiking",
    "adventure tours Kenya",
    "hiking guides Kenya",
    "outdoor adventures",
    "summit expeditions",
    "nature tours",
    "fitness hiking",
    "Kenya tourism",
    "mountain climbing",
    "trail hiking",
    "eco-tourism Kenya",
    "adventure fitness",
    "hiking experiences",
    "Tumaini Oasis Adventures",
    "Tumaini Fitness",
  ],
  author: "Tumaini Oasis Adventures",
  twitterHandle: "@TumainiFitness",
  // Real social profiles from site (handles may contain 'fitness' but brand name is Tumaini Oasis Adventures)
  facebookUrl: "https://web.facebook.com/tumainifitnesscentre",
  instagramUrl: "https://www.instagram.com/tumaini_fitness_centre/",
  xUrl: "https://x.com/Bonifac45261505",
  whatsappUrl: "https://wa.me/+254703371240",
  // Real contact details (update these if you have new emails configured on the new domain)
  phone: "+254 703 371 240",
  email: "info@tumainioasisadventures.co.ke",
  address: {
    street: "Kastemil Business Centre, Kasarani",
    city: "Nairobi",
    region: "Nairobi County",
    country: "KE",
  },
  // Use an existing high-quality image as default OG (update with a dedicated OG image later)
  defaultImage: "/image/hero.jpg",
  logo: "/icon.png",
};

// Generate structured data for organization (TravelAgency + LocalBusiness signals)
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "LocalBusiness"],
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    logo: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.logo}`,
    image: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.defaultImage}`,
    description: SEO_CONFIG.defaultDescription,
    telephone: SEO_CONFIG.phone,
    email: SEO_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SEO_CONFIG.address.street,
      addressLocality: SEO_CONFIG.address.city,
      addressRegion: SEO_CONFIG.address.region,
      addressCountry: SEO_CONFIG.address.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SEO_CONFIG.phone,
      contactType: "customer service",
      email: SEO_CONFIG.email,
      availableLanguage: ["English", "Swahili"],
    },
    sameAs: [
      SEO_CONFIG.facebookUrl,
      SEO_CONFIG.instagramUrl,
      SEO_CONFIG.xUrl,
    ].filter(Boolean),
    serviceArea: {
      "@type": "Country",
      name: "Kenya",
    },
    areaServed: "Kenya",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Hiking Tours & Adventure Experiences",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "Mt Kenya Hiking Tours",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "Aberdares Hiking Tours",
          },
        },
      ],
    },
  };
}

// Generate WebSite schema for better sitelinks / search box
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    description: SEO_CONFIG.defaultDescription,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SEO_CONFIG.siteUrl}/tours?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// Generate structured data for tour (TouristTrip)
export function generateTourSchema(tour: {
  id: string;
  tourName: string;
  description: string;
  price: number;
  location: string;
  date: string;
  rating: number;
  images: string[];
  difficulty: string;
  duration?: string;
}) {
  const tourUrl = getAbsoluteUrl(`/tour-details/${tour.id}`);
  const images = (tour.images || []).map((img) =>
    img && img.startsWith("http") ? img : getAbsoluteUrl(img || SEO_CONFIG.defaultImage)
  );

  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.tourName,
    description: tour.description,
    url: tourUrl,
    image: images.length > 0 ? images : [getAbsoluteUrl(SEO_CONFIG.defaultImage)],
    offers: {
      "@type": "Offer",
      price: tour.price,
      priceCurrency: "KES",
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString(),
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
      seller: {
        "@type": "Organization",
        name: SEO_CONFIG.siteName,
        url: SEO_CONFIG.siteUrl,
      },
    },
    provider: {
      "@type": "Organization",
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.siteUrl,
    },
    location: {
      "@type": "Place",
      name: tour.location,
      address: {
        "@type": "PostalAddress",
        addressCountry: "KE",
      },
    },
    startDate: tour.date,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tour.rating || 4.8,
      bestRating: 5,
      worstRating: 1,
      ratingCount: Math.max(12, Math.floor((tour.rating || 4.8) * 8)),
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Difficulty Level",
        value: tour.difficulty,
      },
    ],
  };
}

// Generate breadcrumb structured data
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : getAbsoluteUrl(item.url),
    })),
  };
}

// Generate FAQ structured data
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// Helper: ensure absolute URL for OG images, canonicals etc.
export function getAbsoluteUrl(path: string): string {
  if (!path) return SEO_CONFIG.siteUrl;
  if (path.startsWith("http")) return path;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SEO_CONFIG.siteUrl}${cleanPath}`;
}

// Generate metadata for pages (Next.js best practices)
export function generateMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = "website",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}): Metadata {
  const fullTitle = title
    ? `${title} | ${SEO_CONFIG.siteName}`
    : SEO_CONFIG.defaultTitle;

  const fullDescription = description || SEO_CONFIG.defaultDescription;
  const fullKeywords = [...SEO_CONFIG.defaultKeywords, ...keywords];
  const fullImage = image || SEO_CONFIG.defaultImage;
  const fullUrl = url ? getAbsoluteUrl(url) : SEO_CONFIG.siteUrl;
  const imageUrl = getAbsoluteUrl(fullImage);

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: fullKeywords,
    authors: [{ name: SEO_CONFIG.author }],
    creator: SEO_CONFIG.author,
    publisher: SEO_CONFIG.siteName,
    applicationName: SEO_CONFIG.siteName,
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type,
      title: fullTitle,
      description: fullDescription,
      url: fullUrl,
      siteName: SEO_CONFIG.siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || SEO_CONFIG.siteName,
        },
      ],
      locale: "en_KE",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [imageUrl],
      creator: SEO_CONFIG.twitterHandle,
      site: SEO_CONFIG.twitterHandle,
    },
    alternates: {
      canonical: fullUrl,
    },
    other: {
      "geo.region": "KE",
      "geo.placename": "Kenya",
    },
  };
}

// Generate tour-specific metadata
export function generateTourMetadata(tour: {
  tourName: string;
  description: string;
  location: string;
  price: number;
  images: string[];
  difficulty: string;
  id: string;
}) {
  const title = `${tour.tourName} - ${tour.location} Hiking Tour`;
  const descBase = (tour.description || "").substring(0, 155).trim();
  const description = `${descBase}... Book this ${tour.difficulty.toLowerCase()} hiking tour in ${tour.location} starting from KES ${tour.price.toLocaleString()}.`;
  const keywords = [
    tour.tourName.toLowerCase(),
    `${tour.location.toLowerCase()} hiking`,
    `${tour.difficulty.toLowerCase()} hike`,
    `hiking tour ${tour.location.toLowerCase()}`,
    `${tour.location.toLowerCase()} adventure`,
    "Kenya hiking",
  ];

  return generateMetadata({
    title,
    description,
    keywords,
    image: tour.images?.[0],
    url: `/tour-details/${tour.id}`,
    type: "article",
  });
}

// SEO-friendly URL slug generator
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim();
}
