import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs | Hotel Rudra Regency Motihari",
  description:
    "Read the latest blogs from Hotel Rudra Regency in Motihari — tips, stories, and insights on luxury stays, banquet events, dining experiences, and hospitality in Bihar.",
  keywords: [
    "Hotel Rudra Regency blog",
    "hotel blog Motihari",
    "luxury hotel tips Motihari",
    "banquet hall Motihari blog",
    "dining Motihari blog",
    "hospitality blog Bihar",
  ],
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: "Blogs | Hotel Rudra Regency Motihari",
    description:
      "Explore hotel stories, event tips, dining guides, and hospitality insights from Hotel Rudra Regency in Motihari.",
    url: "https://rudraregency.com/blogs",
    images: [
      {
        url: "/images/hotel-rudra-regency-motihari-reception4.JPG",
        width: 1200,
        height: 630,
        alt: "Hotel Rudra Regency Blogs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs | Hotel Rudra Regency Motihari",
    description:
      "Read tips and stories on luxury stays, events, and dining at Hotel Rudra Regency in Motihari.",
    images: ["/images/hotel-rudra-regency-motihari-reception4.JPG"],
  },
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
