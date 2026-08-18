import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Hotel Rudra Regency | Bookings & Inquiries in Motihari",
  description: "Get in touch with Hotel Rudra Regency in Motihari for room bookings, banquet hall reservations, dining inquiries, and corporate event planning.",
  keywords: ["contact hotel rudra regency", "hotel booking Motihari", "rudra regency contact number", "hotel in Motihari phone number"],
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}