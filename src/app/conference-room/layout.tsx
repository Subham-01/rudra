import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Conference Room in Motihari",
  description:
    "Host meetings, training sessions, and corporate gatherings in the high-tech conference room and meeting hall at Hotel Rudra Regency in Motihari, with dining, stay, and hospitality support.",
  keywords: [
    "conference hall in Motihari",
    "conference room in Motihari",
    "meeting hall in Motihari",
    "corporate event venue in Motihari",
    "business hotel in Motihari",
    "high tech meeting hall in Motihari",
    "conference hotel in Motihari",
  ],
  alternates: {
    canonical: "https://rudraregency.com/conference-room",
  },
  openGraph: {
    title: "Conference Room in Motihari | Hotel Rudra Regency",
    description:
      "Business-ready high-tech meeting hall in Motihari for meetings, seminars, training sessions, and professional gatherings.",
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
    description: "High-tech conference room and meeting hall in Motihari for business events, presentations, and training sessions.",
    images: ["/images/hotel-rudra-regency-motihari-reception4.JPG"],
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://rudraregency.com/" },
    { "@type": "ListItem", position: 2, name: "Conference Room", item: "https://rudraregency.com/conference-room" },
  ],
};

export default function ConferenceRoomLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script id="conference-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {children}
    </>
  );
}