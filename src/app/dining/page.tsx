'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import Script from "next/script";

const sectionVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const diningExperiences = [
  {
    title: "The Flavoresca Main Dining",
    description: "A refined indoor restaurant with warm lighting, plush seating, and a polished setting for family dining, celebrations, and elegant evening meals.",
    details: ["Luxury indoor seating", "Premium hospitality service", "Signature fine-dining ambience"],
    image: "/images/restaurant (2).JPG",
  },
  {
    title: "Open Terrace Evenings",
    description: "An open terrace restaurant experience designed for breezy nights, premium lounge seating, and relaxed dining under the sky.",
    details: ["Open terrace atmosphere", "Day and night dining appeal", "Luxury outdoor setting"],
    image: "/images/DSC08003.JPG",
  },
  {
    title: "Private Dining Comfort",
    description: "From family meals to hotel guests seeking privacy, our dining service is designed to bring comfort, taste, and premium presentation together.",
    details: ["Curated menu selections", "Comfort-first hospitality", "Ideal for couples and families"],
    image: "/images/food.JPG",
  },
];

const featurePoints = [
  "Luxury indoor restaurant ambience",
  "Open terrace restaurant setting",
  "Premium family and couple dining",
  "Warm hospitality by Hotel Rudra Regency",
];

const signatureMoments = [
  {
    title: "Indoor Fine Dining",
    text: "The Flavoresca Restaurant by Hotel Rudra Regency brings together polished interiors, comfortable seating, and a welcoming premium atmosphere in Motihari.",
    image: "/images/restaurant.JPG",
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
        <div className="absolute top-16 right-10 h-24 w-24 rounded-full bg-amber-400/10 blur-2xl"></div>
        <div className="absolute bottom-16 left-10 h-36 w-36 rounded-full bg-yellow-400/10 blur-3xl"></div>
        <div className="relative flex min-h-[62vh] items-center max-w-6xl mx-auto px-4 pt-24 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
          <motion.div initial="hidden" animate="visible" variants={sectionVariants} className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.32em] text-amber-300 mb-4">Premium Restaurant Experience</p>
            <h1 className="mb-5 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl xl:max-w-4xl">
              <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent">
                The Flavoresca Restaurant by Hotel Rudra Regency
              </span>
            </h1>
            <p className="text-lg text-neutral-300 leading-relaxed max-w-2xl md:text-xl">
              Discover a premium restaurant in Motihari where elegant indoor dining, open terrace evenings, and warm hospitality come together in one luxury culinary destination.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="/pdf/flavoresca-menu.pdf"
                download
                className="inline-flex items-center justify-center rounded-full bg-amber-400 px-8 py-3 text-base font-semibold text-black shadow-xl transition hover:bg-amber-300"
              >
                View Menu
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-amber-300/30 bg-black/70 px-8 py-3 text-base font-semibold text-amber-200 transition hover:bg-black/90">
                Reserve a Table
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="relative mt-2 md:mt-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants} className="rounded-[32px] border border-white/10 bg-neutral-900/80 p-10 shadow-2xl shadow-amber-500/5 backdrop-blur-xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-4">Restaurant Branding</p>
              <h2 className="text-3xl font-bold text-white mb-6">A luxury dining destination with a stronger identity</h2>
              <p className="text-base leading-8 text-neutral-400 mb-6">
                The Flavoresca Restaurant by Hotel Rudra Regency is designed as a premium restaurant in Motihari for guests who want indoor elegance, open terrace charm, and memorable service in one destination.
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
                    <li>Warm hospitality for families and couples</li>
                    <li>Premium dining by Hotel Rudra Regency</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          {diningExperiences.map((item) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-[32px] border border-white/10 bg-neutral-900 shadow-lg shadow-amber-500/5"
            >
              <div className="h-56 bg-cover bg-center" style={{ backgroundImage: `url('${item.image}')` }} />
              <div className="p-8">
                <p className="text-xs uppercase tracking-[0.24em] text-amber-500 mb-3">{item.title}</p>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-3 leading-7">{item.description}</h3>
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

        <section className="mt-16 space-y-8">
          {signatureMoments.map((moment, index) => (
            <motion.div
              key={moment.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="grid overflow-hidden rounded-[34px] border border-white/10 bg-neutral-900 shadow-2xl shadow-amber-500/5 lg:grid-cols-[1.02fr_0.98fr]"
            >
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''} min-h-[320px] bg-cover bg-center`} style={{ backgroundImage: `url('${moment.image}')` }} />
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} flex items-center p-8 md:p-10`}>
                <div>
                  <p className="mb-3 text-sm uppercase tracking-[0.28em] text-amber-300">Signature Dining</p>
                  <h3 className="mb-4 text-3xl font-semibold text-white">{moment.title}</h3>
                  <p className="text-lg leading-8 text-neutral-300">{moment.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="overflow-hidden rounded-[32px] border border-white/10 bg-neutral-900 shadow-2xl shadow-amber-500/5">
            <div
              className="h-80 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/DSC07740.JPG')" }}
            />
            <div className="p-8">
              <p className="text-sm uppercase tracking-[0.28em] text-neutral-500 mb-4">Luxury open terrace</p>
              <p className="text-lg leading-8 text-neutral-300">A stylish terrace setting with premium outdoor seating, soft evening lighting, and the relaxed luxury that makes The Flavoresca Restaurant stand out in Motihari.</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-[32px] bg-black p-10 text-white shadow-2xl flex items-center justify-center text-center min-h-[360px]">
            <div>
              <h3 className="text-3xl font-semibold mb-4 text-amber-300">Reserve The Flavoresca experience</h3>
              <p className="text-lg leading-8 mb-6 text-amber-200">
                Whether you are planning a family dinner, a premium terrace evening, or a refined meal during your hotel stay, The Flavoresca Restaurant by Hotel Rudra Regency is ready to host you.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-black shadow-lg hover:bg-amber-300 transition">
                Reserve your table
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
