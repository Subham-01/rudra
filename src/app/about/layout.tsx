import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Hotel Rudra Regency Motihari",
  description:
    "Learn about Hotel Rudra Regency in Motihari — a premium hospitality destination offering luxury rooms, banquet hall, restaurant dining, and conference facilities for stays, celebrations, and business events.",
  keywords: [
    "about Hotel Rudra Regency",
    "Hotel Rudra Regency Motihari",
    "best hotel in Motihari",
    "luxury hotel in Motihari",
    "hotel about us Motihari",
    "premium hospitality Motihari",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Hotel Rudra Regency | Luxury Hotel in Motihari",
    description:
      "Hotel Rudra Regency is Motihari's premium hospitality destination — stay, dine, celebrate, and meet, all under one roof.",
    url: "https://rudraregency.com/about",
    images: [
      {
        url: "/images/hotel-rudra-regency-motihari-reception4.JPG",
        width: 1200,
        height: 630,
        alt: "Hotel Rudra Regency — About Us",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Hotel Rudra Regency | Luxury Hotel in Motihari",
    description:
      "Discover Hotel Rudra Regency — premium rooms, banquet hall, dining, and conference facilities in Motihari.",
    images: ["/images/hotel-rudra-regency-motihari-reception4.JPG"],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
