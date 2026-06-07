import ContactForm from "./ContactForm";
import { generateBreadcrumbSchema, generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = generateSEOMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Tumaini Oasis Adventures to book your next hiking adventure in Kenya. Call, email, or visit our office in Kasarani, Nairobi. Fast responses and expert advice.",
  keywords: [
    "contact Tumaini Oasis Adventures",
    "book hiking tour Kenya",
    "hiking guide contact",
    "Mt Kenya tour booking",
    "Nairobi adventure tours contact",
    "Kasarani office",
  ],
  url: "/contact",
});

export default function ContactPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
  ]);

  return (
    <>
      {/* Breadcrumb + Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li className="text-foreground font-medium" aria-current="page">
            Contact Us
          </li>
        </ol>
      </nav>

      <ContactForm />
    </>
  );
}
