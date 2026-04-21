'use client';

import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const contactDetails = [
  { label: "Address", value: "Chandrahiya, Motihari, Chararhiya, Bihar 845401" },
  { label: "Mobile", value: "+91 8651600015 | +91 8581828182" },
  { label: "Email", value: "info@rudraregency.com" },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <section className="relative overflow-hidden bg-black py-24 text-white sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-black to-neutral-950" />
        <div className="absolute right-6 top-16 h-20 w-20 rounded-full bg-amber-400/10 blur-2xl sm:right-10 sm:h-24 sm:w-24"></div>
        <div className="absolute bottom-12 left-4 h-28 w-28 rounded-full bg-yellow-400/10 blur-3xl sm:bottom-16 sm:left-10 sm:h-36 sm:w-36"></div>
        <div className="relative mx-auto flex max-w-6xl justify-center px-4 text-center sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={sectionVariants} className="flex max-w-5xl flex-col items-center">
            <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-amber-300 sm:text-sm sm:tracking-[0.3em]">Contact Us</p>
            <h1 className="mb-6 text-4xl font-bold leading-[1.05] text-balance sm:text-5xl">
              <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent">Get in touch with Hotel Rudra Regency</span>
            </h1>
            <p className="max-w-2xl text-base leading-8 text-neutral-300 sm:text-lg">
              Reach out for reservations, event planning, dining, conference bookings, or any questions about your stay. Our team can guide you on luxury rooms, banquet events, gym, spa, lounge, bar, and restaurant facilities.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="relative mx-auto -mt-14 max-w-7xl px-4 pb-24 sm:-mt-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants} className="rounded-[28px] border border-white/10 bg-neutral-900/80 p-5 shadow-2xl shadow-amber-500/5 backdrop-blur-xl sm:rounded-[32px] sm:p-8 lg:p-10">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-4">We are here to help</p>
              <h2 className="mb-4 text-3xl font-bold text-white text-balance sm:text-4xl">Plan your stay or event with confidence</h2>
              <p className="text-base leading-8 text-neutral-400">
                Our concierge team is available to assist with room reservations, banquet inquiries, dining requests, conference planning, and information about the hotel's gym, spa, lounge, bar, and other guest facilities.
              </p>
            </div>

            <div className="grid gap-6">
              {contactDetails.map((item) => (
                <div key={item.label} className="rounded-[24px] border border-white/10 bg-neutral-950/80 p-5 sm:rounded-3xl sm:p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-2">{item.label}</p>
                  <p className="text-base font-semibold leading-7 text-white sm:text-lg">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants} className="rounded-[28px] border border-white/10 bg-neutral-900/80 p-5 shadow-2xl shadow-amber-500/5 backdrop-blur-xl sm:rounded-[32px] sm:p-8 lg:p-10">
            <h3 className="text-2xl font-semibold text-white mb-6">Send us a message</h3>
            <form className="space-y-6">
              <label className="block">
                <span className="text-sm font-medium text-neutral-300">Name</span>
                <input type="text" className="mt-2 w-full rounded-2xl border border-white/10 bg-neutral-950/80 px-4 py-3 text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 outline-none" placeholder="Your name" />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-neutral-300">Email</span>
                <input type="email" className="mt-2 w-full rounded-2xl border border-white/10 bg-neutral-950/80 px-4 py-3 text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 outline-none" placeholder="you@example.com" />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-neutral-300">Mobile Number</span>
                <input type="tel" className="mt-2 w-full rounded-2xl border border-white/10 bg-neutral-950/80 px-4 py-3 text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 outline-none" placeholder="+91 98765 43210" />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-neutral-300">Message</span>
                <textarea rows={5} className="mt-2 w-full rounded-2xl border border-white/10 bg-neutral-950/80 px-4 py-3 text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 outline-none" placeholder="How can we help you?" />
              </label>
              <button type="submit" className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 px-8 py-3 text-base font-semibold text-black shadow-lg shadow-amber-500/25 transition hover:shadow-amber-500/40 sm:w-auto">
                Send Message
              </button>
            </form>
          </motion.section>
        </div>

        <section className="mt-12 overflow-hidden rounded-[28px] border border-white/10 bg-neutral-900 shadow-2xl shadow-amber-500/5 sm:mt-16 sm:rounded-[32px]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-5 sm:p-8 lg:p-10">
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-4">Visit Us</p>
              <h2 className="mb-6 text-3xl font-bold text-white text-balance sm:text-4xl">Located minutes from Bariya Devi Mandir</h2>
              <p className="text-base leading-8 text-neutral-400 mb-8">
                Our hotel offers easy access to Motihari's top cultural attractions, shopping, and business districts, while providing a calm retreat for guests.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="mt-1 text-amber-400 text-2xl">🗺️</span>
                  <div>
                    <p className="font-semibold text-white">Nearby Landmarks</p>
                    <p className="text-neutral-400">Bariya Devi Mandir, Gandhi Maidan, and local markets are just a short drive away.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="mt-1 text-amber-400 text-2xl">🚗</span>
                  <div>
                    <p className="font-semibold text-white">Parking & Transport</p>
                    <p className="text-neutral-400">Complimentary valet parking and shuttle options are available for guests.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="min-h-[280px] bg-[url('/images/hotel-rudra-regency-motihari-reception4.JPG')] bg-cover bg-center sm:min-h-[360px] lg:min-h-full" />
          </div>
        </section>
      </main>
    </div>
  );
}
