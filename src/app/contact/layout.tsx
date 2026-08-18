import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Contact Hotel Rudra Regency",
  description:
    "Contact Hotel Rudra Regency in Motihari for luxury room reservations, banquet bookings, open terrace dining, high-tech meeting hall events, and inquiries about gym, spa, lounge, and bar facilities.",
  keywords: [
    "Hotel Rudra Regency contact",
    "hotel booking in Motihari",
    "room reservation in Motihari",
    "banquet booking in Motihari",
    "conference booking in Motihari",
    "hotel facilities in Motihari",
    "luxury hotel contact in Motihari",
  ],
  alternates: {
    canonical: "https://rudraregency.com/contact",
  },
  openGraph: {
    title: "Contact Hotel Rudra Regency in Motihari",
    description:
      "Reach Hotel Rudra Regency for bookings, event planning, dining reservations, and luxury hospitality inquiries in Motihari.",
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
    description: "Contact us for room reservations, banquet bookings, dining, conference events, and full-facility inquiries.",
    images: ["/images/hotel-rudra-regency-motihari-reception4.JPG"],
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://rudraregency.com/" },
    { "@type": "ListItem", position: 2, name: "Contact", item: "https://rudraregency.com/contact" },
  ],
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script id="contact-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {children}
    </>
  );
}