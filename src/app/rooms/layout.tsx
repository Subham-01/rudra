import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rooms in Motihari",
  description:
    "Explore room booking in Motihari with Premium Deluxe Rooms, Royal Semi-Suites, and Royal Suites at Hotel Rudra Regency, one of the best hotels in Motihari.",
  keywords: [
    "rooms in Motihari",
    "room booking in Motihari",
    "luxury rooms in Motihari",
    "best hotel rooms in Motihari",
    "premium hotel in Motihari",
  ],
  alternates: {
    canonical: "/rooms",
  },
  openGraph: {
    title: "Luxury Rooms in Motihari | Hotel Rudra Regency",
    description:
      "Book luxury rooms in Motihari at Hotel Rudra Regency with premium comfort and hospitality.",
    url: "https://rudraregency.com/rooms",
    images: [
      {
        url: "/images/Hotels-in-motihari.JPG",
        width: 1200,
        height: 630,
        alt: "Luxury rooms at Hotel Rudra Regency in Motihari",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Rooms in Motihari | Hotel Rudra Regency",
    description: "Book Premium Deluxe Rooms, Royal Semi-Suites, and Royal Suites in Motihari.",
    images: ["/images/Hotels-in-motihari.JPG"],
  },
};

export default function RoomsLayout({ children }: { children: React.ReactNode }) {
  return children;
}