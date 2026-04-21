'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const getFormattedDate = (offsetDays: number) => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().split("T")[0];
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
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

const facilities = [
  {
    eyebrow: "Hotels in Motihari",
    title: "Luxury Rooms",
    description: "Spacious rooms created for comfort, elegance, and a premium stay experience.",
    href: "/rooms",
    action: "Explore Rooms",
    image: "/images/Hotels-in-motihari.JPG",
    position: "center",
  },
  {
    eyebrow: "Hotels in Motihari",
    title: "Banquet Hall",
    description: "A grand venue designed for weddings, parties, and milestone celebrations.",
    href: "/banquet",
    action: "View Banquet Hall",
    image: "/images/hotel-rudra-regency-motihari-reception6.JPG",
    position: "center",
  },
  {
    eyebrow: "Premium Dining",
    title: "Open Terrace Restaurant",
    description: "Enjoy open-air dining with a polished atmosphere and elevated hospitality.",
    href: "/dining",
    action: "Discover Dining",
    image: "/images/open terrace motihari.JPG",
    position: "center",
  },
  {
    eyebrow: "Business Ready",
    title: "Meeting & Conference Hall",
    description: "A refined venue for meetings, conferences, and corporate events.",
    href: "/conference-room",
    action: "View Conference Room",
    image: "/images/hotel-rudra-regency-motihari-reception4.JPG",
    position: "center",
  },
];

const rooms = [
  {
    title: "Premium Deluxe Room",
    description: "A comfortable luxury stay with modern essentials and a calm, refined interior.",
    href: "/rooms",
    image: "/images/Hotels-in-motihari.JPG",
    position: "center",
  },
  {
    title: "Royal Semi-Suite",
    description: "Extra space and polished detailing for guests who want a richer stay experience.",
    href: "/rooms",
    image: "/images/Hotels-in-motihari1.JPG",
    position: "center",
  },
  {
    title: "Royal Suite",
    description: "A premium suite atmosphere created for special stays and elevated comfort.",
    href: "/rooms",
    image: "/images/Hotels-in-motihari.JPG",
    position: "center right",
  },
];

const sliderImages = [
  {
    src: "/images/hotel-rudra-regency-motihari-reception4.JPG",
    title: "Luxury Stay Experience",
    description: "A premium visual frame designed to crop any image beautifully and keep the layout polished.",
    position: "center",
  },
  {
    src: "/images/open terrace motihari.JPG",
    title: "Celebrations and Gatherings",
    description: "Showcase banquets, interiors, dining, or events inside a consistent high-end slider layout.",
    position: "center",
  },
  {
    src: "/images/restaurant.JPG",
    title: "Rooms, Dining, and Ambience",
    description: "Every image fills the frame automatically with clean cropping for a premium presentation.",
    position: "center",
  },
];

const highlights = [
  "Best luxury hotel in Motihari for stays, dining, events, and meetings",
  "Comfortable rooms, attentive service, and modern amenities for a seamless stay",
  "Professional hospitality for families, celebrations, and business visits",
  "A premium hotel in Motihari with comfort-first service and room booking support",
];

const serviceBlocks = [
  {
    title: "Luxury Stay",
    subtitle: "Premium Comfort",
    text: "Elegant rooms with modern amenities and a polished atmosphere for restful stays.",
  },
  {
    title: "Grand Events",
    subtitle: "Banquet Experience",
    text: "A celebration-ready space for weddings, receptions, and high-energy social occasions.",
  },
  {
    title: "Premium Dining",
    subtitle: "Restaurant Ambience",
    text: "Open terrace and in-house dining crafted for memorable meals and premium hospitality.",
  },
  {
    title: "Business Hub",
    subtitle: "Conference Ready",
    text: "Meeting and conference spaces designed for professional flow and modern comfort.",
  },
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [checkIn, setCheckIn] = useState(getFormattedDate(0));
  const [checkOut, setCheckOut] = useState(getFormattedDate(1));
  const [guests, setGuests] = useState("2 Guests");

  const bookingBaseUrl = process.env.NEXT_PUBLIC_BOOKING_URL || "/contact";
  const bookingParams = new URLSearchParams();

  if (checkIn) {
    bookingParams.set("checkIn", checkIn);
  }

  if (checkOut) {
    bookingParams.set("checkOut", checkOut);
  }

  if (guests) {
    bookingParams.set("guests", guests);
  }

  const bookingHref = bookingParams.toString()
    ? `${bookingBaseUrl}${bookingBaseUrl.includes("?") ? "&" : "?"}${bookingParams.toString()}`
    : bookingBaseUrl;

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % sliderImages.length);
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-neutral-950 text-white">
      <section className="relative min-h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-75"
          style={{ backgroundImage: "url('/images/hotel-rudra-regency-motihari-reception4.JPG')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/22 via-black/18 to-neutral-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(217,168,50,0.18),_transparent_35%)]" />
        <div className="absolute right-12 top-20 h-28 w-28 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute bottom-16 left-10 h-44 w-44 rounded-full bg-yellow-400/10 blur-3xl" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 pb-16 pt-28 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex w-full justify-center"
          >
            <div className="flex w-full max-w-5xl flex-col items-center py-8 text-center">
              <motion.p
                variants={fadeUp}
                className="mb-5 text-sm font-medium uppercase tracking-[0.4em] text-amber-300 [text-shadow:0_2px_12px_rgba(0,0,0,0.55)]"
              >
                Welcome to Hotel Rudra Regency
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="mx-auto max-w-6xl text-3xl font-bold leading-[1.08] drop-shadow-[0_4px_22px_rgba(0,0,0,0.75)] md:text-5xl xl:text-[3.25rem] xl:whitespace-nowrap"
              >
                <span className="bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-200 bg-clip-text text-transparent">
                  Where Comfort Meets Timeless Hospitality
                </span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-neutral-200 [text-shadow:0_2px_14px_rgba(0,0,0,0.7)] md:text-base"
              >
                Hotel Rudra Regency is a premium hotel in Motihari offering luxury rooms, banquet hall bookings, open terrace dining, and conference facilities in one refined destination.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-9 flex flex-wrap justify-center gap-4">
                <Link href="/rooms" className="btn-primary inline-flex items-center justify-center px-8 py-3 text-sm uppercase tracking-[0.18em]">
                  Know More
                </Link>
                <Link href="/contact" className="btn-secondary inline-flex items-center justify-center px-8 py-3 text-sm uppercase tracking-[0.18em]">
                  Book Your Stay Now
                </Link>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-10 w-full max-w-5xl rounded-[34px] border border-white/10 bg-neutral-950/75 p-4 shadow-2xl shadow-amber-500/10 backdrop-blur-xl md:p-5"
              >
                <div className="grid gap-3 md:grid-cols-[1fr_1fr_0.9fr_auto]">
                  <label className="block text-left">
                    <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-400">
                      Check-In
                    </span>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(event) => setCheckIn(event.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-neutral-900/85 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                    />
                  </label>

                  <label className="block text-left">
                    <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-400">
                      Check-Out
                    </span>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(event) => setCheckOut(event.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-neutral-900/85 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                    />
                  </label>

                  <label className="block text-left">
                    <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-400">
                      Guests
                    </span>
                    <select
                      value={guests}
                      onChange={(event) => setGuests(event.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-neutral-900/85 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                    >
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                      <option>3 Guests</option>
                      <option>4 Guests</option>
                      <option>5+ Guests</option>
                    </select>
                  </label>

                  <div className="flex items-end">
                    <Link
                      href={bookingHref}
                      className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-black shadow-lg shadow-amber-500/20 transition hover:shadow-amber-500/35"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-neutral-950 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger}
            className="overflow-hidden rounded-[36px] border border-white/10 bg-neutral-950 shadow-2xl shadow-amber-500/5"
          >
            <div className="relative min-h-[560px]">
              {sliderImages.map((slide, index) => (
                <div
                  key={`${slide.title}-${index}`}
                  className={`absolute inset-0 transition-opacity duration-700 ${index === activeSlide ? "opacity-100" : "opacity-0"}`}
                >
                  <Image
                    src={slide.src}
                    alt={slide.title}
                    fill
                    priority={index === 0}
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: slide.position }}
                  />
                </div>
              ))}

              <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/15 px-4 py-3">
                  {sliderImages.map((slide, index) => (
                    <button
                      key={slide.title}
                      type="button"
                      aria-label={`Go to slide ${index + 1}`}
                      onClick={() => setActiveSlide(index)}
                      className={`h-2.5 rounded-full transition-all ${index === activeSlide ? "w-10 bg-amber-300" : "w-2.5 bg-white/35 hover:bg-white/55"}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/15 px-3 py-3">
                  <button
                    type="button"
                    aria-label="Previous slide"
                    onClick={() => setActiveSlide((current) => (current - 1 + sliderImages.length) % sliderImages.length)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    aria-label="Next slide"
                    onClick={() => setActiveSlide((current) => (current + 1) % sliderImages.length)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger}
            className="rounded-[36px] border border-white/10 bg-neutral-900/80 p-8 shadow-2xl shadow-amber-500/5"
          >
            <motion.p variants={fadeUp} className="mb-4 text-sm font-medium uppercase tracking-[0.32em] text-amber-300">
              Why Guests Choose Us
            </motion.p>
            <motion.div variants={stagger} className="grid gap-4">
              {highlights.map((item) => (
                <motion.div
                  key={item}
                  variants={fadeUp}
                  className="rounded-[24px] border border-white/10 bg-neutral-950 px-5 py-5 text-neutral-300"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-amber-400">✦</span>
                    <span className="leading-7">{item}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-neutral-950 to-neutral-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="mx-auto mb-9 max-w-5xl text-center"
          >
            <motion.p variants={fadeUp} className="mb-2 text-sm font-medium uppercase tracking-[0.34em] text-amber-300">
              Premium Facilities the Hotel Rudra Regency
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-xl font-bold text-white md:text-2xl xl:text-3xl">
              Crafted Spaces for Stay, Dining, Celebrations, and Business
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-3 max-w-2xl text-base leading-7 text-neutral-400">
              Every facility is shaped to support a premium guest experience, from restful stays and grand events to dining ambience and professional meetings.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
          >
            {facilities.map((facility, index) => (
              <motion.article
                key={facility.title}
                variants={scaleIn}
                whileHover={{ y: -6 }}
                className="overflow-hidden rounded-[30px] border border-white/10 bg-neutral-900/80 shadow-xl shadow-amber-500/5"
              >
                <div className="relative h-56 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover transition-transform duration-700 hover:scale-105"
                    style={{
                      backgroundImage: `url('${facility.image}')`,
                      backgroundPosition: facility.position,
                    }}
                  />
                  <div
                    className={`absolute inset-0 ${[
                      'bg-gradient-to-t from-black/85 via-black/15 to-transparent',
                      'bg-gradient-to-t from-black/85 via-amber-900/20 to-transparent',
                      'bg-gradient-to-t from-black/85 via-yellow-900/15 to-transparent',
                      'bg-gradient-to-t from-black/85 via-neutral-900/20 to-transparent',
                    ][index]}`}
                  />
                  <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-amber-300 backdrop-blur-sm">
                    {facility.eyebrow}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="mb-3 text-2xl font-semibold text-white">{facility.title}</h3>
                  <p className="mb-6 text-sm leading-7 text-neutral-400">{facility.description}</p>
                  <Link href={facility.href} className="inline-flex items-center text-sm font-semibold uppercase tracking-[0.16em] text-amber-300 transition hover:text-amber-200">
                    {facility.action}
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-neutral-950 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="mb-12 text-center"
          >
            <motion.p variants={fadeUp} className="mb-3 text-sm font-medium uppercase tracking-[0.34em] text-amber-300">
              Best Luxury Room
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-xl font-bold text-white md:text-2xl xl:text-3xl">
              Most Popular Rooms
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-base leading-8 text-neutral-400">
              Choose from elegantly designed rooms that balance premium comfort, clean interiors, and a memorable stay experience in Motihari.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="grid gap-6 md:grid-cols-3"
          >
            {rooms.map((room) => (
              <motion.article
                key={room.title}
                variants={scaleIn}
                whileHover={{ y: -6 }}
                className="overflow-hidden rounded-[30px] border border-white/10 bg-neutral-900/80 shadow-xl shadow-amber-500/5"
              >
                <div
                  className="h-60 bg-cover"
                  style={{
                    backgroundImage: `url('${room.image}')`,
                    backgroundPosition: room.position,
                  }}
                />
                <div className="p-6">
                  <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-amber-300">Popular</p>
                  <h3 className="mb-3 text-2xl font-semibold text-white">{room.title}</h3>
                  <p className="mb-6 text-sm leading-7 text-neutral-400">{room.description}</p>
                  <Link href={room.href} className="btn-primary inline-flex items-center justify-center px-6 py-3 text-sm uppercase tracking-[0.16em]">
                    Book Now
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-neutral-900 to-black py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="mx-auto mb-12 max-w-5xl text-center"
          >
            <motion.p variants={fadeUp} className="mb-3 text-sm font-medium uppercase tracking-[0.34em] text-amber-300">
              Luxury Redefined
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-xl font-bold text-white md:text-2xl xl:text-3xl xl:whitespace-nowrap">
              Stay, Celebrate, Dine, and Gather with One Premium Identity
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
          >
            {serviceBlocks.map((block) => (
              <motion.div
                key={block.title}
                variants={fadeUp}
                className="rounded-[30px] border border-white/10 bg-neutral-900/80 p-6 shadow-xl shadow-amber-500/5"
              >
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-amber-300">{block.subtitle}</p>
                <h3 className="text-2xl font-bold text-white">{block.title}</h3>
                <p className="mt-4 text-sm leading-7 text-neutral-400">{block.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-neutral-950 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger}
            className="rounded-[38px] border border-white/10 bg-gradient-to-br from-neutral-900 to-black px-8 py-12 text-center shadow-2xl shadow-amber-500/10"
          >
            <motion.p variants={fadeUp} className="mb-4 text-sm font-medium uppercase tracking-[0.34em] text-amber-300">
              Reserve Your Experience
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-xl font-bold text-white md:text-2xl xl:text-3xl">
              Experience a More Refined Stay in Motihari
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-neutral-300">
              Plan your stay, event, dining experience, or corporate gathering with a hotel designed to feel premium at every touchpoint.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary inline-flex items-center justify-center px-8 py-3 text-sm uppercase tracking-[0.18em]">
                Contact Us
              </Link>
              <Link href="/rooms" className="btn-secondary inline-flex items-center justify-center px-8 py-3 text-sm uppercase tracking-[0.18em]">
                Explore Rooms
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
