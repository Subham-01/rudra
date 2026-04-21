import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Rooms in Motihari",
  description:
    "Explore room booking in Motihari with Premium Deluxe Rooms, Royal Semi-Suites, and Royal Suites at Hotel Rudra Regency, a luxury hotel with gym, spa, lounge, bar, open terrace restaurant, banquet hall, and meeting facilities.",
  keywords: [
    "rooms in Motihari",
    "room booking in Motihari",
    "luxury rooms in Motihari",
    "best hotel rooms in Motihari",
    "premium hotel in Motihari",
    "hotel with gym in Motihari",
    "hotel with spa in Motihari",
    "luxury stay in Motihari",
  ],
  alternates: {
    canonical: "https://rudraregency.com/rooms",
  },
  openGraph: {
    title: "Luxury Rooms in Motihari | Hotel Rudra Regency",
    description:
      "Book luxury rooms in Motihari at Hotel Rudra Regency with premium comfort, gym, spa, lounge, restaurant, and full-service hospitality.",
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
    description: "Book luxury rooms in Motihari with premium facilities including restaurant, lounge, gym, and spa access.",
    images: ["/images/Hotels-in-motihari.JPG"],
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://rudraregency.com/" },
    { "@type": "ListItem", position: 2, name: "Rooms", item: "https://rudraregency.com/rooms" },
  ],
};

export default function RoomsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script id="rooms-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {children}
    </>
  );
}