import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Flavoresca Restaurant in Motihari",
  description:
    "Discover The Flavoresca Restaurant by Hotel Rudra Regency in Motihari for premium indoor dining, open terrace evenings, and luxury restaurant ambience.",
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
  ],
  alternates: {
    canonical: "/dining",
  },
  openGraph: {
    title: "The Flavoresca Restaurant in Motihari | Hotel Rudra Regency",
    description:
      "Premium restaurant dining and open terrace ambience at The Flavoresca Restaurant by Hotel Rudra Regency in Motihari.",
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
    description: "Luxury indoor dining and open terrace restaurant experience in Motihari.",
    images: ["/images/DSC08003.JPG"],
  },
};

export default function DiningLayout({ children }: { children: React.ReactNode }) {
  return children;
}