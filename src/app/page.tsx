import type { Metadata } from "next";
import Script from "next/script";
import HomePageClient from "./components/HomePageClient";

const pageTitle = "Best Hotel in Motihari | Rooms, Banquet Hall, Dining";
const pageDescription =
  "Hotel Rudra Regency is a luxury hotel in Motihari with premium rooms, banquet hall bookings, open terrace dining, and conference facilities for stays, weddings, and business travel.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "best hotel in Motihari",
    "luxury hotel in Motihari",
    "hotel Rudra Regency Motihari",
    "banquet hall in Motihari",
    "conference hall in Motihari",
    "restaurant in Motihari",
    "room booking in Motihari",
    "hotel for wedding in Motihari",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "https://rudraregency.com",
    images: [
      {
        url: "/images/hotel-rudra-regency-motihari-reception4.JPG",
        width: 1200,
        height: 630,
        alt: "Hotel Rudra Regency luxury stay and reception ambience in Motihari",
      },
    ],
  },
  twitter: {
    title: pageTitle,
    description: pageDescription,
    images: ["/images/hotel-rudra-regency-motihari-reception4.JPG"],
  },
};

const homepageStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Hotel Rudra Regency Homepage",
    url: "https://rudraregency.com/",
    description: pageDescription,
    isPartOf: {
      "@type": "WebSite",
      name: "Hotel Rudra Regency",
      url: "https://rudraregency.com",
    },
    about: {
      "@type": "Hotel",
      name: "Hotel Rudra Regency",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Chandrahiya, Chararhiya",
        addressLocality: "Motihari",
        addressRegion: "Bihar",
        postalCode: "845401",
        addressCountry: "IN",
      },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://rudraregency.com/",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Why choose Hotel Rudra Regency in Motihari?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Hotel Rudra Regency combines premium rooms, a banquet hall, open terrace dining, and conference facilities in one location, making it suitable for stays, events, and business visits.",
        },
      },
      {
        "@type": "Question",
        name: "Can I book rooms and event spaces directly?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Guests can contact the hotel directly for room bookings, banquet hall reservations, dining inquiries, and conference room availability.",
        },
      },
      {
        "@type": "Question",
        name: "Does Hotel Rudra Regency offer dining options?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The hotel offers an open terrace restaurant and in-house dining with a premium hospitality experience.",
        },
      },
    ],
  },
];

export default function Home() {
  return (
    <>
      <Script
        id="homepage-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageStructuredData) }}
      />
      <HomePageClient />
    </>
  );
}
