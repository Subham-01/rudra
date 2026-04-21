import type { Metadata } from "next";
import Script from "next/script";
import HomePageClient from "./components/HomePageClient";

const pageTitle = "Best Hotel in Motihari | Rooms, Banquet Hall, Dining";
const pageDescription =
  "Hotel Rudra Regency is a luxury hotel in Motihari with premium rooms, gym, spa, lounge, bar, open terrace restaurant dining, a 10,000 sq ft banquet hall, and a high-tech meeting hall for stays, weddings, and business travel.";

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
          text: "Hotel Rudra Regency combines luxury rooms, a 10,000 sq ft banquet hall, open terrace restaurant dining, gym, spa, lounge, bar, and a high-tech meeting hall in one destination for stays, events, and business visits.",
        },
      },
      {
        "@type": "Question",
        name: "Is Hotel Rudra Regency one of the best hotels in Motihari for family and business stays?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Hotel Rudra Regency is a preferred choice for guests looking for a premium hotel in Motihari with comfortable rooms, modern amenities, dining, and event spaces for both family visits and business travel.",
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
        name: "Do you offer room booking in Motihari for weddings, local functions, and outstation guests?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Guests visiting Motihari for weddings, family functions, business meetings, or short stays can book rooms directly with Hotel Rudra Regency for quick assistance and availability updates.",
        },
      },
      {
        "@type": "Question",
        name: "Is the hotel suitable for weddings and corporate meetings?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The property is designed for both social celebrations and professional events, with dedicated banquet and conference spaces.",
        },
      },
      {
        "@type": "Question",
        name: "Does Hotel Rudra Regency offer dining options?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The hotel offers an open terrace restaurant, premium dining ambience, lounge-style seating, and a hospitality experience suited to family meals and social evenings.",
        },
      },
      {
        "@type": "Question",
        name: "Do you have a banquet hall in Motihari for weddings, receptions, and events?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Hotel Rudra Regency offers banquet facilities in Motihari for weddings, receptions, engagement functions, birthday parties, and other social events, along with hospitality support.",
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
