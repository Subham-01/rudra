import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conference Room in Motihari",
  description:
    "Host meetings, training sessions, and corporate gatherings in the premium conference room and meeting hall at Hotel Rudra Regency in Motihari.",
  keywords: [
    "conference hall in Motihari",
    "conference room in Motihari",
    "meeting hall in Motihari",
    "corporate event venue in Motihari",
    "business hotel in Motihari",
  ],
  alternates: {
    canonical: "/conference-room",
  },
  openGraph: {
    title: "Conference Room in Motihari | Hotel Rudra Regency",
    description:
      "Business-ready conference room in Motihari for meetings, seminars, and professional gatherings.",
    url: "https://rudraregency.com/conference-room",
    images: [
      {
        url: "/images/hotel-rudra-regency-motihari-reception4.JPG",
        width: 1200,
        height: 630,
        alt: "Conference and business ambience at Hotel Rudra Regency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Conference Room in Motihari | Hotel Rudra Regency",
    description: "Conference room and meeting hall in Motihari for business events and training sessions.",
    images: ["/images/hotel-rudra-regency-motihari-reception4.JPG"],
  },
};

export default function ConferenceRoomLayout({ children }: { children: React.ReactNode }) {
  return children;
}