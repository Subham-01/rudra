'use client';

import Link from "next/link";
import { motion } from "framer-motion";

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
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const heroVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
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
      "Experience premium comfort with spacious rooms, elegant interiors, and plush bedding designed for a relaxing stay.",
  },
  {
    icon: "💻",
    title: "Modern Amenities",
    description:
      "Enjoy high-speed WiFi, smart TV, air conditioning, and all essential facilities for a seamless and comfortable experience.",
  },
  {
    icon: "📍",
    title: "Perfect Location",
    description:
      "Located near Bariya Devi Mandir, our hotel offers easy access to key attractions and a peaceful environment.",
  },
];

const whyChooseUs = [
  "A complete experience of stay, dining, and events",
  "Perfect blend of luxury, convenience, and hospitality",
  "Professional and attentive service at every step",
  "Elegant spaces for stays, dining, and celebrations",
  "Thoughtfully designed rooms for comfort and relaxation",
  "Experience refined comfort with modern amenities",
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
        <div className="absolute top-20 right-10 h-24 w-24 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute bottom-24 left-10 h-44 w-44 rounded-full bg-yellow-400/10 blur-3xl" />

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
                className="mb-4 text-sm font-medium uppercase tracking-[0.38em] text-amber-300"
              >
                Stay Collection
              </motion.p>
              <motion.h1
                variants={heroVariants}
                className="mb-6 text-4xl font-bold leading-tight md:text-6xl"
              >
                <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent">
                  Luxury Rooms in Motihari
                </span>
              </motion.h1>
              <motion.p
                variants={heroVariants}
                className="max-w-3xl text-lg leading-8 text-neutral-300 md:text-xl"
              >
                Experience comfort, elegance, and modern amenities at one of the best hotels in Motihari.
              </motion.p>
            </div>

            <motion.div
              variants={heroVariants}
              className="rounded-[28px] border border-white/10 bg-neutral-950/70 p-4 shadow-2xl shadow-amber-500/5 backdrop-blur-xl md:p-5"
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

      <section className="relative z-10 -mt-10 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-5 md:grid-cols-3"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="rounded-[28px] border border-white/10 bg-neutral-900/85 p-6 shadow-xl shadow-amber-500/5 backdrop-blur-xl transition-all hover:-translate-y-1"
              >
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="mb-3 text-xl font-semibold text-white">{feature.title}</h3>
                <p className="text-sm leading-6 text-neutral-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-neutral-950 py-14 md:py-16">
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
              className="mb-4 text-3xl font-bold text-white md:text-5xl"
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
                className="grid overflow-hidden rounded-[34px] border border-white/10 bg-neutral-900/85 shadow-2xl shadow-amber-500/5 backdrop-blur-xl lg:grid-cols-2"
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
                  className={`${index % 2 === 1 ? 'lg:order-1' : ''} flex flex-col p-6 md:p-7 lg:p-8`}
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
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-black shadow-lg shadow-amber-500/20 transition hover:shadow-amber-500/35"
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

      <section className="bg-neutral-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="rounded-[34px] border border-white/10 bg-neutral-950/80 p-8 shadow-2xl shadow-amber-500/5 md:p-10"
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

      <section className="bg-neutral-950 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="rounded-[36px] border border-white/10 bg-gradient-to-br from-neutral-900 to-black px-8 py-12 text-center shadow-2xl shadow-amber-500/10"
          >
            <motion.h2 variants={itemVariants} className="mb-5 text-3xl font-bold md:text-5xl">
              Ready to Book Your Stay?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-neutral-300"
            >
              Experience luxury and comfort at Hotel Rudra Regency. Choose the perfect room for your needs.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link
                href="/contact"
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
