import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Banquet Hall in Motihari",
  description:
    "Book the best banquet hall in Motihari at Hotel Rudra Regency with a 10,000 sq ft event space, luxury rooms, dining support, lounge access, and premium hospitality for weddings, receptions, and celebrations.",
  keywords: [
    "banquet hall in Motihari",
    "best banquet hall in Motihari",
    "wedding banquet hall in Motihari",
    "marriage hall in Motihari",
    "party hall in Motihari",
    "10000 sq ft banquet hall in Motihari",
    "luxury wedding venue in Motihari",
  ],
  alternates: {
    canonical: "/banquet",
  },
  openGraph: {
    title: "Banquet Hall in Motihari | Hotel Rudra Regency",
    description:
      "Elegant wedding and celebration venue in Motihari with a 10,000 sq ft banquet hall, premium room inventory, and hospitality support.",
    url: "https://rudraregency.com/banquet",
    images: [
      {
        url: "/images/hotel-rudra-regency-motihari-reception6.JPG",
        width: 1200,
        height: 630,
        alt: "Banquet hall ambience at Hotel Rudra Regency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Banquet Hall in Motihari | Hotel Rudra Regency",
    description: "Premium banquet hall in Motihari with large-format event hosting, dining support, and luxury stay options.",
    images: ["/images/hotel-rudra-regency-motihari-reception6.JPG"],
  },
};

export default function BanquetLayout({ children }: { children: React.ReactNode }) {
  return children;
}