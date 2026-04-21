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
      <section className="relative overflow-hidden bg-black text-white py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-black to-neutral-950" />
        <div className="absolute top-16 right-10 h-24 w-24 rounded-full bg-amber-400/10 blur-2xl"></div>
        <div className="absolute bottom-16 left-10 h-36 w-36 rounded-full bg-yellow-400/10 blur-3xl"></div>
        <div className="relative mx-auto flex max-w-6xl justify-center px-4 text-center sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={sectionVariants} className="flex max-w-5xl flex-col items-center">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-amber-300">Contact Us</p>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl xl:whitespace-nowrap">
              <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent">Get in touch with Hotel Rudra Regency</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-neutral-300">
              Reach out for reservations, event planning, or any questions about your stay. Our team is ready to assist you with warm and attentive hospitality.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="relative -mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants} className="rounded-[32px] border border-white/10 bg-neutral-900/80 p-10 shadow-2xl shadow-amber-500/5 backdrop-blur-xl">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-4">We are here to help</p>
              <h2 className="text-3xl font-bold text-white mb-4">Plan your stay or event with confidence</h2>
              <p className="text-base leading-8 text-neutral-400">
                Our concierge team is available to assist with room reservations, banquet inquiries, dining requests, and local recommendations.
              </p>
            </div>

            <div className="grid gap-6">
              {contactDetails.map((item) => (
                <div key={item.label} className="rounded-3xl border border-white/10 bg-neutral-950/80 p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-2">{item.label}</p>
                  <p className="text-lg font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants} className="rounded-[32px] border border-white/10 bg-neutral-900/80 p-10 shadow-2xl shadow-amber-500/5 backdrop-blur-xl">
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
              <button type="submit" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 px-8 py-3 text-base font-semibold text-black shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition">
                Send Message
              </button>
            </form>
          </motion.section>
        </div>

        <section className="mt-16 rounded-[32px] overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl shadow-amber-500/5">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-10">
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-4">Visit Us</p>
              <h2 className="text-3xl font-bold text-white mb-6">Located minutes from Bariya Devi Mandir</h2>
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
            <div className="h-96 bg-[url('/images/hotel-rudra-regency-motihari-reception4.JPG')] bg-cover bg-center" />
          </div>
        </section>
      </main>
    </div>
  );
}
