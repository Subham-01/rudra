'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import Script from "next/script";
import { createHotelInquiryLink } from "@/lib/whatsapp";

const sectionVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const diningExperiences = [
  {
    title: "The Flavoresca Main Dining",
    description: "A refined indoor restaurant with warm lighting, plush seating, and a polished setting for family dining, celebrations, and elegant evening meals.",
    details: ["Luxury indoor seating", "Premium hospitality service", "Signature fine-dining ambience"],
    image: "/images/flavoresca main dining  section.png",
  },
  {
    title: "Open Terrace Evenings",
    description: "An open terrace restaurant experience designed for breezy nights, premium lounge seating, and relaxed dining under the sky.",
    details: ["Open terrace atmosphere", "Day and night dining appeal", "Luxury outdoor setting"],
    image: "/images/open terrace evening  section.JPG",
  },
  {
    title: "Private Dining Comfort",
    description: "From family meals to hotel guests seeking privacy, our dining service is designed to bring comfort, taste, and premium presentation together.",
    details: ["Curated menu selections", "Comfort-first hospitality", "Ideal for couples and families"],
    image: "/images/private dining comfort section.JPG",
  },
];

const featurePoints = [
  "Luxury indoor restaurant ambience",
  "Open terrace restaurant setting",
  "Lounge-style evening atmosphere",
  "Bar-ready social experience",
  "Premium family and couple dining",
  "Warm hospitality by Hotel Rudra Regency",
];

const signatureMoments = [
  {
    title: "Indoor Fine Dining",
    text: "The Flavoresca Restaurant by Hotel Rudra Regency brings together polished interiors, comfortable seating, lounge ambience, and a welcoming premium atmosphere in Motihari.",
    image: "/images/indoor fine dining .JPG",
  },
  {
    title: "Open Terrace Luxury",
    text: "Our terrace dining spaces create a relaxed but elevated mood for evening dinners, small gatherings, and memorable open-air experiences.",
    image: "/images/DSC07480.JPG",
  },
];

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "The Flavoresca Restaurant by Hotel Rudra Regency",
  image: [
    "https://rudraregency.com/images/restaurant%20(2).JPG",
    "https://rudraregency.com/images/DSC08003.JPG",
    "https://rudraregency.com/images/restaurant.JPG",
  ],
  servesCuisine: ["Indian", "Multi-Cuisine"],
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Chandrahiya, Chararhiya",
    addressLocality: "Motihari",
    addressRegion: "Bihar",
    postalCode: "845401",
    addressCountry: "IN",
  },
  url: "https://rudraregency.com/dining",
  telephone: "+91 8651600015",
  parentOrganization: {
    "@type": "Hotel",
    name: "Hotel Rudra Regency",
  },
};

export default function DiningPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Script
        id="flavoresca-restaurant-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />
      <section className="relative overflow-hidden bg-black text-white min-h-[62vh]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-55"
          style={{ backgroundImage: "url('/images/DSC08003.JPG')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/48 to-black/30" />
        <div className="absolute right-6 top-16 h-20 w-20 rounded-full bg-amber-400/10 blur-2xl sm:right-10 sm:h-24 sm:w-24"></div>
        <div className="absolute bottom-12 left-4 h-28 w-28 rounded-full bg-yellow-400/10 blur-3xl sm:bottom-16 sm:left-10 sm:h-36 sm:w-36"></div>
        <div className="relative flex min-h-[62vh] items-center max-w-6xl mx-auto px-4 pt-24 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
          <motion.div initial="hidden" animate="visible" variants={sectionVariants} className="max-w-3xl">
            <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-amber-300 sm:text-sm sm:tracking-[0.32em]">Premium Restaurant Experience</p>
            <h1 className="mb-5 text-4xl font-bold leading-[1.04] text-balance sm:text-5xl lg:text-6xl xl:max-w-4xl">
              <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent">
                The Flavoresca Restaurant by Hotel Rudra Regency
              </span>
            </h1>
            <p className="max-w-2xl text-base leading-7 text-neutral-300 sm:text-lg sm:leading-8 md:text-xl">
              Discover a premium restaurant in Motihari where elegant indoor dining, open terrace evenings, lounge ambience, and warm hospitality come together in one luxury culinary destination.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              <a
                href="/pdf/flavoresca-menu.pdf"
                download
                className="inline-flex items-center justify-center rounded-full bg-amber-400 px-6 py-3 text-base font-semibold text-black shadow-xl transition hover:bg-amber-300 sm:px-8"
              >
                View Menu
              </a>
              <Link href={createHotelInquiryLink("a dining reservation at The Flavoresca Restaurant", ["Location: Hotel Rudra Regency, Motihari", "Reservation type: Table booking"]) } className="inline-flex items-center justify-center rounded-full border border-amber-300/30 bg-black/70 px-6 py-3 text-base font-semibold text-amber-200 transition hover:bg-black/90 sm:px-8">
                Reserve a Table
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="relative mt-2 md:mt-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants} className="rounded-[28px] border border-white/10 bg-neutral-900/80 p-5 shadow-2xl shadow-amber-500/5 backdrop-blur-xl sm:rounded-[32px] sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-4">Restaurant Branding</p>
              <h2 className="mb-6 text-3xl font-bold text-white text-balance sm:text-4xl">A luxury dining destination with a stronger identity</h2>
              <p className="text-base leading-8 text-neutral-400 mb-6">
                The Flavoresca Restaurant by Hotel Rudra Regency is designed as a premium restaurant in Motihari for guests who want indoor elegance, open terrace charm, lounge-style ambience, and memorable service in one destination.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {featurePoints.map((item) => (
                  <div key={item} className="rounded-3xl border border-white/10 bg-neutral-950/75 p-5">
                    <p className="font-semibold text-white">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[28px] ring-1 ring-amber-200/10 shadow-xl min-h-[360px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/restaurant.JPG')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10" />
              <div className="relative flex min-h-[360px] items-end p-8 text-center sm:text-left">
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-amber-300">The Flavoresca promise</h3>
                  <ul className="space-y-4 text-amber-100">
                    <li>Elegant indoor restaurant ambience</li>
                    <li>Luxury open terrace evenings</li>
                    <li>Lounge and bar-style social atmosphere</li>
                    <li>Warm hospitality for families and couples</li>
                    <li>Premium dining by Hotel Rudra Regency</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <section className="mt-10 grid gap-6 lg:grid-cols-3 sm:mt-12">
          {diningExperiences.map((item) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-[26px] border border-white/10 bg-neutral-900 shadow-lg shadow-amber-500/5 sm:rounded-[32px]"
            >
              <div className="h-56 bg-cover bg-center" style={{ backgroundImage: `url('${item.image}')` }} />
              <div className="p-5 sm:p-8">
                <p className="text-xs uppercase tracking-[0.24em] text-amber-500 mb-3">{item.title}</p>
                <h3 className="mb-3 text-lg font-semibold leading-7 text-white md:text-xl">{item.description}</h3>
                <ul className="space-y-2.5 text-sm text-neutral-400 leading-6">
                  {item.details.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-1 text-amber-600">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </section>

        <section className="mt-12 space-y-6 sm:mt-16 sm:space-y-8">
          {signatureMoments.map((moment, index) => (
            <motion.div
              key={moment.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="grid overflow-hidden rounded-[28px] border border-white/10 bg-neutral-900 shadow-2xl shadow-amber-500/5 sm:rounded-[34px] lg:grid-cols-[1.02fr_0.98fr]"
            >
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''} min-h-[320px] bg-cover bg-center`} style={{ backgroundImage: `url('${moment.image}')` }} />
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} flex items-center p-5 sm:p-8 md:p-10`}>
                <div>
                  <h3 className="mb-4 text-3xl font-semibold text-white text-balance">{moment.title}</h3>
                  <p className="text-base leading-8 text-neutral-300 sm:text-lg">{moment.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        <section className="mt-12 sm:mt-16">
          <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="flex min-h-[320px] items-center justify-center rounded-[28px] bg-black p-5 text-center text-white shadow-2xl sm:min-h-[360px] sm:rounded-[32px] sm:p-10">
            <div>
              <h3 className="mb-4 text-3xl font-semibold text-amber-300 text-balance">Reserve The Flavoresca experience</h3>
              <p className="mb-6 text-base leading-8 text-amber-200 sm:text-lg">
                Whether you are planning a family dinner, a premium terrace evening, or a refined lounge-style meal during your hotel stay, The Flavoresca Restaurant by Hotel Rudra Regency is ready to host you.
              </p>
              <Link href={createHotelInquiryLink("a dining reservation at The Flavoresca Restaurant", ["Location: Hotel Rudra Regency, Motihari", "Reservation type: Table booking"]) } className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-black shadow-lg hover:bg-amber-300 transition">
                Reserve your table
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
