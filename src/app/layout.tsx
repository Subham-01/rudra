import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import StickyNav from "./components/StickyNav";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rudraregency.com"),
  applicationName: "Hotel Rudra Regency",
  title: {
    default: "Hotel Rudra Regency | Luxury Hotel in Motihari",
    template: "%s | Hotel Rudra Regency",
  },
  description:
    "Hotel Rudra Regency is among the best hotels in Motihari, offering luxury rooms, banquet hall bookings, open terrace dining, conference facilities, and premium stays for families, business travelers, and events.",
  keywords: [
    "Hotel Rudra Regency",
    "hotel in Motihari",
    "best hotel in Motihari",
    "luxury hotel in Motihari",
    "best luxury hotel in Motihari",
    "hotels in Motihari",
    "premium hotels in Motihari",
    "top hotels in Motihari",
    "hotel booking in Motihari",
    "room booking in Motihari",
    "banquet hall in Motihari",
    "best banquet hall in Motihari",
    "wedding banquet hall in Motihari",
    "marriage hall in Motihari",
    "conference hall in Motihari",
    "meeting hall in Motihari",
    "restaurant in Motihari",
    "open terrace restaurant in Motihari",
    "rooms in Motihari",
    "stay in Motihari",
  ],
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://rudraregency.com",
    siteName: "Hotel Rudra Regency",
    title: "Hotel Rudra Regency | Luxury Hotel in Motihari",
    description:
      "Book premium rooms, banquet celebrations, dining experiences, and conference events at one of the best hotels in Motihari.",
    images: [
      {
        url: "/images/hotel-rudra-regency-motihari-reception4.JPG",
        width: 1200,
        height: 630,
        alt: "Hotel Rudra Regency reception and premium hotel ambience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Rudra Regency | Luxury Hotel in Motihari",
    description:
      "Best luxury hotel in Motihari for rooms, dining, banquet hall events, and conference bookings.",
    images: ["/images/hotel-rudra-regency-motihari-reception4.JPG"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "hospitality",
  manifest: "/manifest.webmanifest",
  other: {
    "geo.region": "IN-BR",
    "geo.placename": "Motihari, Bihar, India",
    "geo.position": "26.6512;84.9180",
    ICBM: "26.6512, 84.9180",
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Hotel Rudra Regency",
    url: "https://rudraregency.com",
    description:
      "Official website of Hotel Rudra Regency, a premium hotel in Motihari for stays, dining, weddings, and corporate events.",
    inLanguage: "en-IN",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://rudraregency.com/?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": ["Hotel", "LodgingBusiness"],
    name: "Hotel Rudra Regency",
    description:
      "Best luxury hotel in Motihari offering premium rooms, gym, spa, lounge, bar, open terrace restaurant dining, a 10,000 sq ft banquet hall, and a high-tech meeting hall.",
    url: "https://rudraregency.com",
    logo: "https://rudraregency.com/images/Logo-removebg-preview.png",
    image: [
      "https://rudraregency.com/images/hotel-rudra-regency-motihari-reception4.JPG",
      "https://rudraregency.com/images/hotel-rudra-regency-motihari-reception6.JPG",
      "https://rudraregency.com/images/Hotels-in-motihari.JPG",
    ],
    telephone: "+91 8651600015",
    email: "info@rudraregency.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Chandrahiya, Chararhiya",
      addressLocality: "Motihari",
      addressRegion: "Bihar",
      postalCode: "845401",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 26.6512,
      longitude: 84.9180,
    },
    hasMap: "https://maps.google.com/?q=Hotel+Rudra+Regency+Motihari",
    areaServed: [
      "Motihari",
      "East Champaran",
      "Bihar",
    ],
    priceRange: "₹₹",
    checkinTime: "12:00",
    checkoutTime: "11:00",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    sameAs: [
      "https://www.facebook.com/hotelrudraregency7",
      "https://www.instagram.com/hotel.rudra.regency?igsh=MTUzbmN6dnJ6bGJidA==",
      "https://wa.me/918651600015",
    ],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Luxury Rooms", value: true },
      { "@type": "LocationFeatureSpecification", name: "Banquet Hall", value: true },
      { "@type": "LocationFeatureSpecification", name: "Open Terrace Restaurant", value: true },
      { "@type": "LocationFeatureSpecification", name: "Conference Room", value: true },
      { "@type": "LocationFeatureSpecification", name: "Gym", value: true },
      { "@type": "LocationFeatureSpecification", name: "Spa", value: true },
      { "@type": "LocationFeatureSpecification", name: "Lounge", value: true },
      { "@type": "LocationFeatureSpecification", name: "Bar", value: true },
      { "@type": "LocationFeatureSpecification", name: "High-Tech Meeting Hall", value: true },
      { "@type": "LocationFeatureSpecification", name: "Accessible Rooms for Differently Abled Guests", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free WiFi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Air Conditioning", value: true },
      { "@type": "LocationFeatureSpecification", name: "24-Hour Front Desk", value: true },
    ],
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script
          id="hotel-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <StickyNav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
