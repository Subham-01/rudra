import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Hotel Rudra Regency",
  description:
    "Contact Hotel Rudra Regency in Motihari for hotel booking, room reservations, banquet bookings, dining inquiries, and conference events.",
  keywords: [
    "Hotel Rudra Regency contact",
    "hotel booking in Motihari",
    "room reservation in Motihari",
    "banquet booking in Motihari",
    "conference booking in Motihari",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Hotel Rudra Regency in Motihari",
    description:
      "Reach Hotel Rudra Regency for bookings, event planning, and hospitality inquiries in Motihari.",
    url: "https://rudraregency.com/contact",
    images: [
      {
        url: "/images/hotel-rudra-regency-motihari-reception4.JPG",
        width: 1200,
        height: 630,
        alt: "Contact Hotel Rudra Regency in Motihari",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Hotel Rudra Regency in Motihari",
    description: "Contact us for room reservations, banquet bookings, dining, and conference inquiries.",
    images: ["/images/hotel-rudra-regency-motihari-reception4.JPG"],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}