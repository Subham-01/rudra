import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Banquet Hall in Motihari",
  description:
    "Book the best banquet hall in Motihari at Hotel Rudra Regency for weddings, receptions, marriage functions, parties, and milestone events.",
  keywords: [
    "banquet hall in Motihari",
    "best banquet hall in Motihari",
    "wedding banquet hall in Motihari",
    "marriage hall in Motihari",
    "party hall in Motihari",
  ],
  alternates: {
    canonical: "/banquet",
  },
  openGraph: {
    title: "Banquet Hall in Motihari | Hotel Rudra Regency",
    description:
      "Elegant wedding and celebration venue in Motihari with premium banquet hall packages.",
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
    description: "Premium banquet hall in Motihari for weddings, receptions, and celebrations.",
    images: ["/images/hotel-rudra-regency-motihari-reception6.JPG"],
  },
};

export default function BanquetLayout({ children }: { children: React.ReactNode }) {
  return children;
}