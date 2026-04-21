'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { createHotelInquiryLink } from "@/lib/whatsapp";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const packages = [
  {
    name: "Premium Package",
    badge: "Premium",
    price: "₹ 2,11,000",
    gradient: "from-amber-500 to-yellow-400",
    border: "border-amber-400/30",
    items: [
      "Saumya Hall",
      "Deluxe Room – 8",
      "Family Suite – 1",
      "Kitchen Area",
    ],
  },
  {
    name: "Elite Package",
    badge: "Elite",
    price: "₹ 2,41,000",
    gradient: "from-amber-300 to-orange-400",
    border: "border-amber-300/40",
    featured: true,
    items: [
      "Saumya Hall",
      "1st Floor Banquet Hall",
      "Deluxe Room – 8",
      "Family Suite – 1",
      "Semi Suite – 2",
      "Kitchen Area",
    ],
  },
  {
    name: "Signature Package",
    badge: "Signature",
    price: "₹ 2,71,000",
    gradient: "from-yellow-500 to-amber-700",
    border: "border-yellow-400/30",
    items: [
      "Saumya Hall",
      "1st Floor Banquet Hall",
      "Deluxe Room – 8",
      "Family Suite – 1",
      "Premium Deluxe Room – 8",
      "Kitchen Area",
    ],
  },
];

const complimentaryItems = [
  "200 VIP Chairs",
  "1 Maharaja Sofa",
  "10 Round Tables",
  "8 Sofas",
];

const terms = [
  "Decoration & catering charges not included",
  "Cleaning charges: ₹5,000 extra",
  "All package prices are exclusive of GST",
  "Refundable security deposit of ₹25,000 required",
  "Any property damage during event will lead to deposit forfeiture",
];

export default function BanquetPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-neutral-950 text-white">
      <section className="relative min-h-[58vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-55"
          style={{ backgroundImage: "url('/images/banquet hall hero section.JPG')" }}
        />
        <div className="absolute inset-0 bg-black/22" />
        <div className="absolute right-6 top-16 h-24 w-24 rounded-full bg-amber-400/10 blur-3xl sm:right-12 sm:h-28 sm:w-28" />
        <div className="absolute bottom-12 left-4 h-28 w-28 rounded-full bg-yellow-400/10 blur-3xl sm:bottom-16 sm:left-10 sm:h-40 sm:w-40" />

        <div className="relative mx-auto flex min-h-[58vh] max-w-6xl items-center px-4 pb-10 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.p
              variants={fadeUp}
              className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-amber-300 sm:text-sm sm:tracking-[0.38em]"
            >
              Banquet Hall
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="mb-5 text-4xl font-bold leading-[1.04] text-balance sm:text-5xl lg:text-6xl"
            >
              <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent">
                Banquet Packages Crafted for Grand Celebrations
              </span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="max-w-2xl text-base leading-7 text-neutral-300 sm:text-lg sm:leading-8"
            >
              Discover premium event packages with a 10,000 sq ft banquet hall, luxury room inventory, dining support, and curated inclusions designed for unforgettable weddings, receptions, and milestone celebrations.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="/dining"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition hover:bg-white/10 sm:w-auto sm:px-8 sm:tracking-[0.18em]"
              >
                View Catering
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <main className="relative mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mt-8 rounded-[28px] border border-white/10 bg-neutral-900/80 p-5 shadow-2xl shadow-amber-500/5 backdrop-blur-xl sm:mt-10 sm:rounded-[34px] sm:p-6 md:p-8"
        >
          <motion.div variants={fadeUp} className="mb-8 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.35em] text-amber-300">
              Banquet Packages
            </p>
            <h2 className="text-2xl font-bold md:text-4xl">
              <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent">
                Choose the Celebration Style That Fits You
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-neutral-400 md:text-base">
              Three premium package tiers designed to match the scale, comfort, and elegance of your event.
            </p>
          </motion.div>

          <motion.div variants={stagger} className="grid gap-5 lg:grid-cols-3">
            {packages.map((pkg) => (
              <motion.article
                key={pkg.name}
                variants={scaleIn}
                whileHover={{ y: -6 }}
                className={`group relative h-full overflow-hidden rounded-[26px] border ${pkg.border} bg-neutral-950 p-1 shadow-xl shadow-amber-500/5 transition-transform sm:rounded-[30px] ${
                  pkg.featured ? "ring-1 ring-amber-400/20" : ""
                }`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(217,168,50,0.16),_transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex h-full flex-col rounded-[26px] bg-gradient-to-b from-neutral-900 to-neutral-950 px-5 py-6 md:px-6 md:py-7">
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <span className={`inline-flex rounded-full bg-gradient-to-r ${pkg.gradient} px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-black`}>
                      {pkg.badge}
                    </span>
                    {pkg.featured ? (
                      <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-amber-300">
                        Most Popular
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-white leading-7">{pkg.name}</h3>
                  <p className="mb-1 text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
                    Package Price
                  </p>
                  <p className={`mb-5 bg-gradient-to-r ${pkg.gradient} bg-clip-text text-lg md:text-xl font-medium text-transparent`}>
                    {pkg.price}
                  </p>

                  <div className="mb-4 h-px bg-gradient-to-r from-transparent via-amber-400/35 to-transparent" />

                  <ul className="mb-5 space-y-2 text-[13px] text-neutral-300">
                    {pkg.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 border-b border-white/5 pb-2 last:border-b-0 last:pb-0">
                        <span className="mt-0.5 text-amber-400 text-xs">✦</span>
                        <span className="leading-5">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={createHotelInquiryLink(`the ${pkg.name} banquet package at Hotel Rudra Regency`, ["Event type: Wedding, reception, or celebration", "Location: Motihari"]) }
                    className={`mt-auto inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] transition ${
                      pkg.featured
                        ? "bg-gradient-to-r from-amber-400 to-yellow-400 text-black shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40"
                        : "border border-amber-400/30 text-amber-300 hover:bg-amber-400/10"
                    }`}
                  >
                    Enquire Now
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>

        <section className="mt-8 grid gap-6 sm:mt-10 sm:gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger}
            className="h-full overflow-hidden rounded-[34px] border border-white/10 bg-neutral-900/80 shadow-2xl shadow-amber-500/5 backdrop-blur-xl"
          >
            <div className="relative h-full min-h-[22rem] overflow-hidden lg:min-h-full">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/venue atmosphere .JPG')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-amber-300">
                  Venue Atmosphere
                </p>
                <p className="max-w-lg text-lg leading-7 text-neutral-200">
                  Elegant halls, polished interiors, luxury stay support, and refined hospitality for premium wedding and celebration experiences.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger}
            className="rounded-[28px] border border-white/10 bg-neutral-900/80 p-5 shadow-2xl shadow-amber-500/5 backdrop-blur-xl sm:rounded-[34px] sm:p-8"
          >
            <motion.div variants={fadeUp}>
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-amber-300">
                Complimentary
              </p>
              <h3 className="mb-6 text-3xl font-bold text-white">
                Included in Every Package
              </h3>
            </motion.div>

            <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-2">
              {complimentaryItems.map((item) => (
                <motion.div
                  key={item}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className="rounded-[24px] border border-white/10 bg-neutral-950 px-5 py-5 text-center shadow-lg shadow-amber-500/5"
                >
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-400/10 text-xl text-amber-300">
                    ✦
                  </div>
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-neutral-100">
                    {item}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger}
          className="mt-8 rounded-[28px] border border-white/10 bg-neutral-900/80 p-5 shadow-2xl shadow-amber-500/5 backdrop-blur-xl sm:mt-10 sm:rounded-[34px] sm:p-8 md:p-10"
        >
          <motion.div variants={fadeUp} className="mb-8 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/10 text-xl text-amber-300">
              !
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-amber-300">
                Terms and Conditions
              </p>
              <h3 className="mt-1 text-2xl font-bold text-white">Important Booking Notes</h3>
            </div>
          </motion.div>

          <motion.ul variants={stagger} className="grid gap-4 md:grid-cols-2">
            {terms.map((term) => (
              <motion.li
                key={term}
                variants={fadeUp}
                className="flex items-start gap-3 rounded-[24px] border border-white/8 bg-neutral-950 px-5 py-4 text-neutral-300"
              >
                <span className="mt-1 text-amber-400">•</span>
                <span className="leading-6">{term}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger}
          className="mt-8 rounded-[30px] border border-white/10 bg-gradient-to-br from-neutral-900 to-black px-5 py-10 text-center shadow-2xl shadow-amber-500/10 sm:mt-10 sm:rounded-[36px] sm:px-8 sm:py-12"
        >
          <motion.h3 variants={fadeUp} className="text-3xl font-bold text-balance sm:text-4xl md:text-5xl">
            <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent">
              Ready to Host a Grand Event?
            </span>
          </motion.h3>
          <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-base leading-8 text-neutral-300 sm:text-lg">
            Speak with our team to reserve the right banquet package, align dining and room requirements, and plan a celebration with confidence at one of Motihari's premium event destinations.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8">
            <Link
              href={createHotelInquiryLink("a banquet hall booking at Hotel Rudra Regency", ["Event type: Wedding, reception, or social event", "Location: Motihari"]) }
              className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-black shadow-lg shadow-amber-500/25 transition hover:scale-[1.03] hover:shadow-amber-500/40 sm:w-auto sm:px-10 sm:tracking-[0.2em]"
            >
              Talk to Our Event Team
            </Link>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
}
