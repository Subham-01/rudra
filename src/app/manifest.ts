import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hotel Rudra Regency",
    short_name: "Rudra Regency",
    description:
      "Premium hotel in Motihari for luxury stays, banquet hall bookings, dining, and conference events.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#d9a832",
    icons: [
      {
        src: "/images/hotel-rudra-regency-motihari-reception4.JPG",
        sizes: "192x192",
        type: "image/jpeg",
      },
      {
        src: "/images/hotel-rudra-regency-motihari-reception6.JPG",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  };
}