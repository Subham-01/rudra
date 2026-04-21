'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { createHotelInquiryLink } from "@/lib/whatsapp";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const heroVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const rooms = [
  {
    id: 1,
    name: "Premium Deluxe Room",
    description:
      "Designed for comfort and functionality, the Premium Deluxe Room is perfect for guests seeking a relaxing stay with modern amenities and elegant interiors.",
    amenities: [
      "Comfortable King Size Bed",
      "Air Conditioning & Free WiFi",
      "LED TV & Room Service",
      "Modern Bathroom",
    ],
    idealFor: "Solo travelers & couples",
    color: "from-amber-400 to-yellow-500",
    image: "/images/Hotels-in-motihari.JPG",
    position: "center",
  },
  {
    id: 2,
    name: "Royal Semi-Suite",
    description:
      "Enjoy extra space and refined interiors in our Royal Semi-Suite, offering a premium experience for guests who want more comfort and style.",
    amenities: [
      "Comfortable King Size Bed",
      "Air Conditioning & Free WiFi",
      "LED TV & Room Service",
      "Modern Bathroom",
    ],
    idealFor: "Families & business travelers",
    color: "from-amber-500 to-orange-500",
    image: "/images/Hotels-in-motihari1.JPG",
    position: "center",
  },
  {
    id: 3,
    name: "Royal Suite",
    description:
      "Experience the highest level of luxury with our Royal Suite, designed with premium features and elegant detailing for an unforgettable stay.",
    amenities: [
      "Large Luxury Room with Premium Design",
      "Separate Living Space",
      "Premium Bathroom & Amenities",
      "Exclusive Comfort",
    ],
    idealFor: "VIP guests & special occasions",
    color: "from-yellow-400 to-amber-600",
    image: "/images/Hotels-in-motihari.JPG",
    position: "center right",
  },
];

const features = [
  {
    icon: "✨",
    title: "Luxury Comfort",
    description:
      "Experience premium comfort with spacious rooms, elegant interiors, plush bedding, and a hospitality experience designed for a relaxing stay.",
  },
  {
    icon: "🏋️",
    title: "Wellness & Amenities",
    description:
      "Enjoy modern amenities along with access to gym, spa, lounge spaces, and the comforts expected from a luxury hotel in Motihari.",
  },
  {
    icon: "♿",
    title: "Accessible Facilities",
    description:
      "Specially designed rooms and facilities for differently abled guests, ensuring a comfortable, barrier-free, and welcoming stay for everyone.",
  },
  {
    icon: "🍽️",
    title: "Full-Service Hospitality",
    description:
      "Stay connected to open terrace dining, banquet experiences, and business-ready spaces within one premium hospitality destination.",
  },
];

const whyChooseUs = [
  "A complete experience of luxury stay, dining, wellness, and events",
  "Premium rooms backed by gym, spa, lounge, and bar facilities",
  "Professional and attentive hospitality for families, couples, and business travelers",
  "Elegant spaces for stays, dining, celebrations, and corporate visits",
  "Thoughtfully designed rooms for comfort, privacy, and refined relaxation",
  "Specially equipped rooms and facilities for differently abled guests",
  "A premium hotel in Motihari with modern amenities and direct booking support",
];

export default function RoomsPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-neutral-950 text-white">
      <section
        className="relative flex min-h-[72vh] items-end overflow-hidden"
        style={{
          backgroundImage: "url('/images/Hotels-in-motihari.JPG')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-neutral-950" />
        <div className="absolute right-6 top-20 h-20 w-20 rounded-full bg-amber-400/10 blur-3xl sm:right-10 sm:h-24 sm:w-24" />
        <div className="absolute bottom-20 left-4 h-28 w-28 rounded-full bg-yellow-400/10 blur-3xl sm:bottom-24 sm:left-10 sm:h-44 sm:w-44" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 md:pb-20 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end"
          >
            <div>
              <motion.p
                variants={heroVariants}
                className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-amber-300 sm:text-sm sm:tracking-[0.38em]"
              >
                Stay Collection
              </motion.p>
              <motion.h1
                variants={heroVariants}
                className="mb-5 text-4xl font-bold leading-[1.02] text-balance sm:text-5xl lg:text-6xl"
              >
                <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent">
                  Luxury Rooms in Motihari
                </span>
              </motion.h1>
              <motion.p
                variants={heroVariants}
                className="max-w-3xl text-base leading-7 text-neutral-300 sm:text-lg sm:leading-8 md:text-xl"
              >
                Experience comfort, elegance, and modern amenities at one of the best luxury hotels in Motihari, with premium rooms, wellness facilities, dining, and event-ready hospitality.
              </motion.p>
            </div>

            <motion.div
              variants={heroVariants}
              className="rounded-[24px] border border-white/10 bg-neutral-950/70 p-4 shadow-2xl shadow-amber-500/5 backdrop-blur-xl md:rounded-[28px] md:p-5"
            >
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.24em] text-amber-300">
                Room Highlights
              </p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-2.5 py-3">
                  <p className="text-lg font-bold text-white md:text-xl">3</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-neutral-500">Categories</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-2.5 py-3">
                  <p className="text-lg font-bold text-white md:text-xl">24/7</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-neutral-500">Service</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-2.5 py-3">
                  <p className="text-lg font-bold text-white md:text-xl">In-House</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-neutral-500">Restaurant</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 -mt-8 pb-8 sm:-mt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-5 lg:grid-cols-4"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="rounded-[24px] border border-white/10 bg-neutral-900/85 p-5 shadow-xl shadow-amber-500/5 backdrop-blur-xl transition-all hover:-translate-y-1 sm:rounded-[28px] sm:p-6"
              >
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="mb-3 text-xl font-semibold text-white">{feature.title}</h3>
                <p className="text-sm leading-6 text-neutral-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-neutral-950 py-12 sm:py-14 md:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mb-12 text-center md:mb-14"
          >
            <motion.p
              variants={itemVariants}
              className="mb-3 text-sm font-medium uppercase tracking-[0.34em] text-amber-300"
            >
              Our Room Categories
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="mb-4 text-3xl font-bold text-white text-balance sm:text-4xl md:text-5xl"
            >
              A Curated Collection of Elegant Stays
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="mx-auto max-w-2xl text-base leading-8 text-neutral-400 md:text-lg"
            >
              Choose from our carefully curated collection of rooms designed to exceed your expectations.
            </motion.p>
          </motion.div>

          <div className="space-y-6 md:space-y-8">
            {rooms.map((room, index) => (
              <motion.article
                key={room.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
                className="grid overflow-hidden rounded-[28px] border border-white/10 bg-neutral-900/85 shadow-2xl shadow-amber-500/5 backdrop-blur-xl sm:rounded-[34px] lg:grid-cols-2"
              >
                <motion.div
                  variants={itemVariants}
                  className={`${index % 2 === 1 ? 'lg:order-2' : ''} relative min-h-[240px] overflow-hidden`}
                >
                  <div
                    className="absolute inset-0 bg-cover transition-transform duration-700 hover:scale-105"
                    style={{
                      backgroundImage: `url('${room.image}')`,
                      backgroundPosition: room.position,
                    }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${room.color} opacity-30`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <div className="absolute left-6 top-6 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-amber-300 backdrop-blur-sm">
                    {room.idealFor}
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white md:text-3xl">{room.name}</h3>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className={`${index % 2 === 1 ? 'lg:order-1' : ''} flex flex-col p-5 sm:p-6 md:p-7 lg:p-8`}
                >
                  <div className="mb-5">
                    <p className="mb-3 text-xs font-medium uppercase tracking-[0.26em] text-amber-300">
                      Room Overview
                    </p>
                    <p className="text-sm leading-7 text-neutral-300 md:text-base">
                      {room.description}
                    </p>
                  </div>

                  <div className="mb-5">
                    <p className="mb-4 text-xs font-medium uppercase tracking-[0.26em] text-neutral-500">
                      Included Amenities
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {room.amenities.map((amenity) => (
                        <div
                          key={amenity}
                          className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3"
                        >
                          <span className="mt-0.5 text-amber-400">✦</span>
                          <span className="text-xs leading-6 text-neutral-300 md:text-sm">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto flex">
                    <Link
                      href={createHotelInquiryLink(`the ${room.name} at Hotel Rudra Regency`)}
                      className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-black shadow-lg shadow-amber-500/20 transition hover:shadow-amber-500/35 sm:w-auto"
                    >
                      Check Availability
                    </Link>
                  </div>
                </motion.div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-900 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="rounded-[28px] border border-white/10 bg-neutral-950/80 p-5 shadow-2xl shadow-amber-500/5 sm:rounded-[34px] sm:p-8 md:p-10"
          >
            <motion.div variants={itemVariants} className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                Why Guests Choose Rudra Regency
              </h2>
              <p className="mx-auto max-w-2xl text-base leading-8 text-neutral-400 md:text-lg">
                Discover what makes Hotel Rudra Regency the perfect choice for your stay.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
            >
              {whyChooseUs.map((reason, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="rounded-[24px] border border-white/10 bg-white/[0.03] px-5 py-5 shadow-lg shadow-amber-500/5"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-amber-400/10 text-amber-300">
                    ✓
                  </div>
                  <p className="text-sm leading-7 text-neutral-300 md:text-base">{reason}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-neutral-950 py-14 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="rounded-[30px] border border-white/10 bg-gradient-to-br from-neutral-900 to-black px-5 py-10 text-center shadow-2xl shadow-amber-500/10 sm:rounded-[36px] sm:px-8 sm:py-12"
          >
            <motion.h2 variants={itemVariants} className="mb-5 text-3xl font-bold md:text-5xl">
              Ready to Book Your Stay?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="mx-auto mb-8 max-w-2xl text-base leading-8 text-neutral-300 sm:text-lg"
            >
              Experience luxury and comfort at Hotel Rudra Regency. Choose the perfect room for your needs.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link
                href={createHotelInquiryLink("a stay at Hotel Rudra Regency in Motihari")}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 px-10 py-4 text-sm font-bold uppercase tracking-[0.18em] text-black shadow-lg shadow-amber-500/25 transition hover:scale-[1.02] hover:shadow-amber-500/40"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
