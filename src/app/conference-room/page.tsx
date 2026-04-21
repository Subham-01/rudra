'use client';

import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
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
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const roomFormats = [
  {
    title: "Executive Meetings",
    description:
      "A polished setting for client discussions, management meetings, and focused business sessions.",
    points: ["Private ambience", "Professional seating plan", "Ideal for formal discussions"],
  },
  {
    title: "Training Sessions",
    description:
      "Designed for workshops, inductions, seminars, and team learning with a clean and practical setup.",
    points: ["Presentation-ready layout", "Comfortable long-session use", "Flexible attendee arrangement"],
  },
  {
    title: "Corporate Gatherings",
    description:
      "Suitable for launches, briefings, networking meets, and compact business events with hospitality support.",
    points: ["Welcoming arrival experience", "Refreshment coordination", "Balanced formal-premium feel"],
  },
];

const essentials = [
  "High-speed WiFi connectivity",
  "Projector and presentation-friendly setup",
  "Air-conditioned comfort",
  "Custom seating arrangement support",
  "Tea, coffee, and dining coordination",
  "Dedicated assistance for event flow",
];

const process = [
  "Share your event type, date, and expected guest count.",
  "Our team helps you finalize the layout and service requirements.",
  "Arrive to a polished, ready-to-use conference setup.",
];

export default function ConferenceRoomPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-neutral-950 text-white">
      <section className="relative min-h-[62vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-55"
          style={{ backgroundImage: "url('/images/hotel-rudra-regency-motihari-reception6.JPG')" }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute top-16 right-12 h-28 w-28 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute bottom-16 left-10 h-40 w-40 rounded-full bg-yellow-400/10 blur-3xl" />

        <div className="relative mx-auto flex min-h-[62vh] max-w-6xl items-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="w-full"
          >
            <div className="max-w-3xl">
              <motion.p
                variants={fadeUp}
                className="mb-4 text-sm font-medium uppercase tracking-[0.38em] text-amber-300"
              >
                Conference Room
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="mb-6 text-4xl font-bold leading-tight md:text-6xl"
              >
                <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent">
                  Business Meetings in a Refined, Simplified Setting
                </span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="max-w-2xl text-lg leading-8 text-neutral-300"
              >
                Host presentations, strategy sessions, training programs, and corporate discussions in a conference space designed for clarity, comfort, and smooth coordination.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 px-8 py-3 text-sm font-bold uppercase tracking-[0.18em] text-black shadow-lg shadow-amber-500/25 transition hover:shadow-amber-500/40"
                >
                  Enquire Now
                </Link>
                <Link
                  href="/dining"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition hover:bg-white/10"
                >
                  View Dining Support
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="relative mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="-mt-14 rounded-[34px] border border-white/10 bg-neutral-900/80 p-6 shadow-2xl shadow-amber-500/5 backdrop-blur-xl md:p-8"
        >
          <motion.div variants={fadeUp} className="mb-8 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.35em] text-amber-300">
              Event Formats
            </p>
            <h2 className="text-2xl font-bold md:text-4xl">
              <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent">
                A Clearer Layout for Professional Gatherings
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-neutral-400 md:text-base">
              Inspired by premium hotel meeting pages, simplified into a focused layout for quick decision-making.
            </p>
          </motion.div>

          <motion.div variants={stagger} className="grid gap-5 lg:grid-cols-3">
            {roomFormats.map((format) => (
              <motion.article
                key={format.title}
                variants={scaleIn}
                whileHover={{ y: -6 }}
                className="rounded-[28px] border border-white/10 bg-neutral-950 p-6 shadow-xl shadow-amber-500/5"
              >
                <h3 className="mb-3 text-xl font-bold text-white">{format.title}</h3>
                <p className="mb-5 text-sm leading-6 text-neutral-400">{format.description}</p>
                <ul className="space-y-2 text-sm text-neutral-300">
                  {format.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-0.5 text-amber-400">✦</span>
                      <span className="leading-6">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>

        <section className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger}
            className="rounded-[34px] border border-white/10 bg-neutral-900/80 p-8 shadow-2xl shadow-amber-500/5 backdrop-blur-xl"
          >
            <motion.div variants={fadeUp} className="mb-6">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-amber-300">
                Included Essentials
              </p>
              <h3 className="text-3xl font-bold text-white">
                Everything Needed for a Smooth Session
              </h3>
            </motion.div>

            <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-2">
              {essentials.map((item) => (
                <motion.div
                  key={item}
                  variants={fadeUp}
                  className="rounded-[22px] border border-white/10 bg-neutral-950 px-5 py-4 shadow-lg shadow-amber-500/5"
                >
                  <p className="text-sm leading-6 text-neutral-200">{item}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger}
            className="overflow-hidden rounded-[34px] border border-white/10 bg-neutral-900/80 shadow-2xl shadow-amber-500/5 backdrop-blur-xl"
          >
            <div className="relative h-full min-h-[320px] overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/hotel-rudra-regency-motihari-reception4.JPG')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-black/35 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-amber-300">
                  Professional Ambience
                </p>
                <p className="max-w-lg text-lg leading-7 text-neutral-200">
                  A premium business-ready environment with elegant interiors and hospitality support that keeps the experience polished without overcomplicating the layout.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger}
          className="mt-10 rounded-[34px] border border-white/10 bg-neutral-900/80 p-8 shadow-2xl shadow-amber-500/5 backdrop-blur-xl md:p-10"
        >
          <motion.div variants={fadeUp} className="mb-8">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-amber-300">
              Booking Flow
            </p>
            <h3 className="mt-3 text-2xl font-bold text-white md:text-3xl">
              How to Plan Your Conference with Us
            </h3>
          </motion.div>

          <motion.div variants={stagger} className="grid gap-4 md:grid-cols-3">
            {process.map((step, index) => (
              <motion.div
                key={step}
                variants={fadeUp}
                className="rounded-[24px] border border-white/8 bg-neutral-950 px-5 py-5 text-neutral-300"
              >
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-amber-300">
                  Step {index + 1}
                </p>
                <p className="leading-7">{step}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger}
          className="mt-10 rounded-[36px] border border-white/10 bg-gradient-to-br from-neutral-900 to-black px-8 py-12 text-center shadow-2xl shadow-amber-500/10"
        >
          <motion.h3 variants={fadeUp} className="text-3xl font-bold md:text-5xl">
            Ready to Schedule Your Next Meeting?
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-neutral-300"
          >
            Let our team help you plan a conference experience that feels professional, premium, and easy to manage.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-amber-400/40 bg-transparent px-8 py-3 text-sm font-bold uppercase tracking-[0.18em] text-amber-300 transition hover:bg-amber-400/10"
            >
              Contact Our Team
            </Link>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
}