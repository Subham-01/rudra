import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "The Flavoresca Restaurant in Motihari",
  description:
    "Discover The Flavoresca Restaurant by Hotel Rudra Regency in Motihari for premium indoor dining, open terrace evenings, lounge ambience, bar service, and a luxury restaurant experience.",
  keywords: [
    "The Flavoresca Restaurant",
    "The Flavoresca Restaurant by Hotel Rudra Regency",
    "restaurant in Motihari",
    "open terrace restaurant in Motihari",
    "fine dining in Motihari",
    "hotel restaurant in Motihari",
    "premium dining in Motihari",
    "best restaurant in Motihari",
    "luxury restaurant in Motihari",
    "family restaurant in Motihari",
    "rooftop dining in Motihari",
    "restaurant with lounge in Motihari",
    "bar in Motihari hotel",
  ],
  alternates: {
    canonical: "https://rudraregency.com/dining",
  },
  openGraph: {
    title: "The Flavoresca Restaurant in Motihari | Hotel Rudra Regency",
    description:
      "Premium restaurant dining, open terrace ambience, lounge seating, and elevated hospitality at The Flavoresca Restaurant in Motihari.",
    url: "https://rudraregency.com/dining",
    images: [
      {
        url: "/images/DSC08003.JPG",
        width: 1200,
        height: 630,
        alt: "The Flavoresca Restaurant open terrace dining at Hotel Rudra Regency in Motihari",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Flavoresca Restaurant in Motihari | Hotel Rudra Regency",
    description: "Luxury indoor dining, lounge ambience, bar-ready evenings, and open terrace restaurant experience in Motihari.",
    images: ["/images/DSC08003.JPG"],
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://rudraregency.com/" },
    { "@type": "ListItem", position: 2, name: "Dining", item: "https://rudraregency.com/dining" },
  ],
};

export default function DiningLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script id="dining-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {children}
    </>
  );
}