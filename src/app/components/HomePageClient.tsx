'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BedDoubleIcon,
  BriefcaseBusinessIcon,
  PartyPopperIcon,
  UtensilsCrossedIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { createHotelInquiryLink } from "@/lib/whatsapp";

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
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const facilities = [
  {
    eyebrow: "Luxury Stay",
    title: "Luxury Rooms",
    description: "Luxury rooms designed for premium comfort with polished interiors and modern in-room amenities.",
    href: "/rooms",
    action: "Explore Rooms",
    image: "/images/Hotels-in-motihari.JPG",
    position: "center",
  },
  {
    eyebrow: "Grand Events",
    title: "Banquet Hall",
    description: "A 10,000 sq ft banquet hall created for weddings, receptions, celebrations, and large social events.",
    href: "/banquet",
    action: "View Banquet Hall",
    image: "/images/banquet hall for  homepage .JPG",
    position: "center",
  },
  {
    eyebrow: "Premium Dining",
    title: "Restaurant",
    description: "Enjoy Open terrace dining, lounge-style seating, and a premium restaurant experience with bar service.",
    href: "/dining",
    action: "Discover Dining",
    image: "/images/Premium dining card .JPG",
    position: "center",
  },
  {
    eyebrow: "Business Ready",
    title: "Meeting Hall",
    description: "A high-tech meeting and conference hall designed for presentations, business and corporate events.",
    href: "/conference-room",
    action: "View Conference Room",
    image: "/images/Meeting hall for home page .JPG",
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
    src: "/images/homepage slider 1.JPG",
    title: "Luxury Suite Lounge",
    description: "Premium interiors, elegant seating, and a refined stay experience designed for comfort.",
    position: "center",
  },
  {
    src: "/images/Home Page slider 2.JPG",
    title: "Open Terrace Ambience",
    description: "A striking terrace setting for evening dining, relaxed conversations, and memorable visits.",
    position: "center 58%",
  },
  {
    src: "/images/Homepage slider 3.JPG",
    title: "Business Meeting Hall",
    description: "A polished conference setting built for presentations, meetings, and corporate sessions.",
    position: "center",
  },
  {
    src: "/images/Homepage slider 4.JPG",
    title: "Grand Banquet Hall",
    description: "Spacious interiors and premium event ambience for celebrations, receptions, and gatherings.",
    position: "center",
  },
  {
    src: "/images/homepage slider 5.JPG",
    title: "Restaurant Terrace Dining",
    description: "Open terrace dining with lounge-style seating for relaxed meals and premium hospitality.",
    position: "center 42%",
  },
];

const highlights = [
  "A premium hotel in Motihari with luxury rooms, a 10,000 sq ft banquet hall, and a high-tech meeting hall.",
  "Modern guest facilities including gym, spa, lounge, bar, and attentive hospitality for a seamless stay.",
  "Open terrace restaurant, family-friendly ambience, and premium support for celebrations and business visits.",
  "Direct booking assistance for rooms, dining, banquet events, conferences, and curated guest experiences.",
];

const serviceBlocks = [
  {
    title: "Luxury Stay",
    subtitle: "Premium Comfort",
    text: "Luxury rooms designed for premium comfort with polished interiors and modern in-room amenities.",
    href: "/rooms",
    action: "Explore Rooms",
    icon: BedDoubleIcon,
    highlights: ["Premium room categories", "Gym and spa access for guests"],
    accent: "from-amber-300/20 via-amber-200/8 to-transparent",
  },
  {
    title: "Grand Events",
    subtitle: "Banquet Experience",
    text: "A 10,000 sq ft banquet hall created for weddings, receptions, celebrations, and large social events.",
    href: "/banquet",
    action: "View Banquet Hall",
    icon: PartyPopperIcon,
    highlights: ["Wedding and reception hosting", "Large-format banquet support"],
    accent: "from-rose-300/18 via-amber-200/8 to-transparent",
  },
  {
    title: "Premium Dining",
    subtitle: "Restaurant Ambience",
    text: "Enjoy Open terrace dining, lounge-style seating, and a premium restaurant experience with bar service.",
    href: "/dining",
    action: "Discover Dining",
    icon: UtensilsCrossedIcon,
    highlights: ["Open terrace restaurant setting", "Lounge and bar experience"],
    accent: "from-yellow-200/18 via-amber-200/8 to-transparent",
  },
  {
    title: "Business Hub",
    subtitle: "Conference Ready",
    text: "A high-tech meeting and conference hall designed for presentations, business and corporate events.",
    href: "/conference-room",
    action: "View Conference Room",
    icon: BriefcaseBusinessIcon,
    highlights: ["High-tech meeting setup", "Conference-ready hospitality"],
    accent: "from-sky-200/16 via-neutral-200/8 to-transparent",
  },
];

const directBookingBenefits = [
  "Fast assistance for room, banquet hall, restaurant, and conference hall inquiries.",
  "Support for guests visiting Motihari for family functions, business travel, or premium leisure stays.",
  "One property for luxury rooms, gym, spa, lounge, bar, open terrace dining, and grand events.",
];

const faqItems = [
  {
    question: "Why choose Hotel Rudra Regency in Motihari?",
    answer:
      "Hotel Rudra Regency combines luxury rooms, a 10,000 sq ft banquet hall, open terrace restaurant dining, gym, spa, lounge, bar, and a high-tech meeting hall in one destination for stays, events, and business visits.",
  },
  {
    question: "Is Hotel Rudra Regency one of the best hotels in Motihari for family and business stays?",
    answer:
      "Hotel Rudra Regency is a preferred choice for guests looking for a premium hotel in Motihari with comfortable rooms, modern amenities, dining, and event spaces for both family visits and business travel.",
  },
  {
    question: "Can I book rooms and event spaces directly?",
    answer:
      "Yes. Guests can contact the hotel directly for room bookings, banquet hall reservations, dining inquiries, and conference room availability.",
  },
  {
    question: "Do you offer room booking in Motihari for weddings, local functions, and outstation guests?",
    answer:
      "Yes. Guests visiting Motihari for weddings, family functions, business meetings, or short stays can book rooms directly with Hotel Rudra Regency for quick assistance and availability updates.",
  },
  {
    question: "Is the hotel suitable for weddings and corporate meetings?",
    answer:
      "Yes. The property is designed for both social celebrations and professional events, with dedicated banquet and conference spaces.",
  },
  {
    question: "Does Hotel Rudra Regency offer dining options?",
    answer:
      "Yes. The hotel offers an open terrace restaurant, premium dining ambience, lounge-style seating, and a hospitality experience suited to family meals and social evenings.",
  },
  {
    question: "Do you have a banquet hall in Motihari for weddings, receptions, and events?",
    answer:
      "Yes. Hotel Rudra Regency offers banquet facilities in Motihari for weddings, receptions, engagement functions, birthday parties, and other social events, along with hospitality support.",
  },
];

export default function HomePageClient() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [checkIn, setCheckIn] = useState(getFormattedDate(0));
  const [checkOut, setCheckOut] = useState(getFormattedDate(1));
  const [guests, setGuests] = useState("2 Guests");
  const directBookingHref = createHotelInquiryLink("a direct booking at Hotel Rudra Regency");
  const bookingHref = createHotelInquiryLink("a stay at Hotel Rudra Regency", [
    `Check-in: ${checkIn || "Flexible"}`,
    `Check-out: ${checkOut || "Flexible"}`,
    `Guests: ${guests || "Not specified"}`,
  ]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % sliderImages.length);
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, []);

  const primaryCtaClass = cn(
    buttonVariants({ size: "lg" }),
    "rounded-full border border-amber-300/20 bg-amber-300 px-6 text-sm font-semibold uppercase tracking-[0.14em] text-neutral-950 hover:bg-amber-200 sm:px-8 sm:tracking-[0.16em]"
  );

  const secondaryCtaClass = cn(
    buttonVariants({ variant: "outline", size: "lg" }),
    "rounded-full border-white/12 bg-white/[0.02] px-6 text-sm font-semibold uppercase tracking-[0.14em] text-white/88 hover:bg-white/[0.05] hover:text-white sm:px-8 sm:tracking-[0.16em]"
  );

  const roomCtaClass = cn(
    buttonVariants({ variant: "outline", size: "lg" }),
    "rounded-full border border-amber-300/70 bg-transparent px-6 text-sm font-semibold uppercase tracking-[0.14em] text-amber-300 hover:bg-amber-300/10 hover:text-amber-200 sm:px-8 sm:tracking-[0.16em]"
  );

  return (
    <div className="min-h-screen overflow-hidden bg-neutral-950 text-white">
      <section className="relative min-h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-75"
          style={{ backgroundImage: "url('/images/hotel-rudra-regency-motihari-reception4.JPG')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/22 via-black/18 to-neutral-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(217,168,50,0.18),_transparent_35%)]" />
        <div className="absolute right-6 top-20 h-24 w-24 rounded-full bg-amber-400/10 blur-3xl sm:right-12 sm:h-28 sm:w-28" />
        <div className="absolute bottom-12 left-4 h-32 w-32 rounded-full bg-yellow-400/10 blur-3xl sm:bottom-16 sm:left-10 sm:h-44 sm:w-44" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 pb-14 pt-36 sm:px-6 sm:pb-16 sm:pt-40 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex w-full justify-center"
          >
            <div className="flex w-full max-w-5xl flex-col items-center py-6 text-center sm:py-8">
              <motion.p
                variants={fadeUp}
                className="mb-4 text-[11px] font-medium uppercase tracking-[0.32em] text-amber-300 [text-shadow:0_2px_12px_rgba(0,0,0,0.55)] sm:mb-5 sm:text-sm sm:tracking-[0.4em]"
              >
                Welcome to Hotel Rudra Regency
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="mx-auto max-w-4xl text-4xl font-bold leading-[1.02] drop-shadow-[0_4px_22px_rgba(0,0,0,0.75)] sm:whitespace-nowrap sm:text-5xl lg:max-w-5xl lg:text-6xl"
              >
                <span className="bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-200 bg-clip-text text-transparent">
                  Where Royalty Meets Refined Luxury
                </span>
              </motion.h1>
              <motion.div variants={fadeUp} className="mt-8 flex w-full flex-col justify-center gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
                <Link href="/rooms" className={cn(primaryCtaClass, "w-full sm:w-auto")}>
                  Explore Rooms
                </Link>
                <Link href={directBookingHref} className={cn(secondaryCtaClass, "w-full sm:w-auto")}>
                  Book Directly
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-8 w-full max-w-5xl sm:mt-10">
                <Card className="rounded-[28px] border-white/10 bg-neutral-950/75 text-white shadow-none backdrop-blur-xl sm:rounded-[34px]">
                  <CardContent className="p-4 md:p-5">
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
                      className={cn(primaryCtaClass, "w-full md:min-h-[50px]")}
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-neutral-950 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-[1.08fr_0.92fr] md:items-stretch lg:gap-8 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger}
            className="overflow-hidden rounded-[36px] border border-white/10 bg-neutral-950 shadow-none"
          >
            <div className="relative min-h-[420px] sm:min-h-[500px] lg:min-h-[560px]">
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

              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3 sm:bottom-8 sm:left-8 sm:right-8 sm:gap-4">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/15 px-3 py-2.5 sm:px-4 sm:py-3">
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

                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/15 px-2 py-2 sm:px-3 sm:py-3">
                  <button
                    type="button"
                    aria-label="Previous slide"
                    onClick={() => setActiveSlide((current) => (current - 1 + sliderImages.length) % sliderImages.length)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10 sm:h-11 sm:w-11"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    aria-label="Next slide"
                    onClick={() => setActiveSlide((current) => (current + 1) % sliderImages.length)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10 sm:h-11 sm:w-11"
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
            className="flex h-full flex-col rounded-[28px] border border-white/10 bg-neutral-900/80 p-5 shadow-none sm:rounded-[36px] sm:p-6"
          >
            <motion.p variants={fadeUp} className="mb-3 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-amber-300">
              Why Guests Choose Us
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-[1.7rem] font-bold leading-tight text-white md:text-[2rem]">
              A premium stay destination for Motihari visitors
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-3 text-sm leading-6 text-neutral-400 md:text-[0.96rem]">
              Whether you are planning a weekend stay, hosting a wedding function, arranging a corporate meeting, or looking for a quality restaurant in Motihari, Hotel Rudra Regency brings all of it together under one hospitality experience.
            </motion.p>
            <motion.ul variants={stagger} className="mt-5 space-y-3.5">
              {highlights.map((item) => (
                <motion.li key={item} variants={fadeUp} className="flex items-start gap-3 text-neutral-300">
                  <span className="mt-1 shrink-0 text-amber-300">✦</span>
                  <span className="text-sm leading-6 md:text-[0.95rem]">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-neutral-950 to-neutral-900 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="mx-auto mb-9 max-w-5xl text-center"
          >
            <motion.p variants={fadeUp} className="mb-2 text-sm font-medium uppercase tracking-[0.34em] text-amber-300">
              Premium Facilities at Hotel Rudra Regency
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-xl font-bold text-white md:text-2xl xl:text-3xl">
              Crafted spaces for stay, dining, celebrations, and business
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
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {facilities.map((facility, index) => (
              <motion.article
                key={facility.title}
                variants={scaleIn}
                whileHover={{ y: -6 }}
                className="overflow-hidden rounded-[30px] border border-white/10 bg-neutral-900/80 shadow-none"
              >
                <Link href={facility.href} className="group block h-full">
                  <div className="relative h-72 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover transition-transform duration-700 group-hover:scale-105"
                      style={{
                        backgroundImage: `url('${facility.image}')`,
                        backgroundPosition: facility.position,
                      }}
                    />
                    <div
                      className={`absolute inset-0 ${[
                        "bg-gradient-to-t from-black/90 via-black/18 to-transparent",
                        "bg-gradient-to-t from-black/90 via-amber-900/18 to-transparent",
                        "bg-gradient-to-t from-black/90 via-yellow-900/12 to-transparent",
                        "bg-gradient-to-t from-black/90 via-neutral-900/18 to-transparent",
                      ][index]}`}
                    />
                    <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-amber-300 backdrop-blur-sm">
                      {facility.eyebrow}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h3 className="text-2xl font-semibold text-white transition group-hover:text-amber-100">{facility.title}</h3>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-neutral-950 py-16 sm:py-20">
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
              Most popular rooms
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
              <motion.article key={room.title} variants={scaleIn} whileHover={{ y: -6 }}>
                <Card className="overflow-hidden rounded-[30px] border-white/10 bg-neutral-900/80 text-white shadow-none">
                <div
                  className="h-60 bg-cover"
                  style={{
                    backgroundImage: `url('${room.image}')`,
                    backgroundPosition: room.position,
                  }}
                />
                <CardContent className="p-6">
                  <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-neutral-500">Popular</p>
                  <h3 className="mb-3 text-2xl font-semibold text-white">{room.title}</h3>
                  <p className="mb-6 text-sm leading-7 text-neutral-400">{room.description}</p>
                  <Link href={createHotelInquiryLink(`the ${room.title} at Hotel Rudra Regency`)} className={cn(roomCtaClass, "w-full sm:w-auto")}>
                    Book Now
                  </Link>
                </CardContent>
                </Card>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-neutral-900 to-black py-16 sm:py-20">
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
            <motion.h2 variants={fadeUp} className="text-xl font-bold text-white md:text-2xl xl:text-3xl">
              Stay, celebrate, dine, and gather with one premium identity
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
              <motion.div key={block.title} variants={fadeUp} className="h-full">
                <Card className="group relative flex h-full overflow-hidden rounded-[30px] border-white/10 bg-[linear-gradient(180deg,rgba(26,26,26,0.96),rgba(10,10,10,0.98))] text-white shadow-none">
                  <div className={cn("absolute inset-x-0 top-0 h-24 bg-gradient-to-b", block.accent)} />
                  <CardContent className="relative grid h-full w-full grid-rows-[4.75rem_6rem_1fr_3.25rem] p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-h-[4.75rem]">
                        <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-500">{block.subtitle}</p>
                        <h3 className="mt-3 text-2xl font-semibold text-white">{block.title}</h3>
                      </div>
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-amber-200 backdrop-blur-sm">
                        <block.icon className="size-5" />
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-7 text-neutral-400">{block.text}</p>

                    <ul className="mt-6 grid content-start gap-3 self-start">
                      {block.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-200" />
                          <span className="text-sm leading-6 text-neutral-300">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-end border-t border-white/10 pt-5">
                      <Link href={block.href} className="inline-flex items-center whitespace-nowrap text-[12px] font-semibold uppercase tracking-[0.12em] text-amber-200 transition hover:text-amber-100 sm:text-[13px]">
                        {block.action}
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-neutral-950 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]"
          >
            <div className="rounded-[28px] border border-white/10 bg-neutral-900/70 p-5 shadow-none sm:rounded-[34px] sm:p-8">
              <motion.p variants={fadeUp} className="text-sm font-medium uppercase tracking-[0.32em] text-amber-300">
                Direct Booking Advantage
              </motion.p>
              <motion.h2 variants={fadeUp} className="mt-4 text-2xl font-bold text-white md:text-3xl">
                A Motihari hotel built for direct guest support
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-4 text-sm leading-7 text-neutral-400 md:text-base">
                Guests looking for hotels in Motihari often need more than a room. They need a reliable place for family visits, event planning, dining, or business meetings. Hotel Rudra Regency is structured around that full-service need.
              </motion.p>
              <motion.div variants={stagger} className="mt-8 grid gap-4">
                {directBookingBenefits.map((benefit) => (
                  <motion.div key={benefit} variants={fadeUp}>
                    <Card className="rounded-[24px] border-white/10 bg-neutral-950 text-neutral-300 shadow-none">
                      <CardContent className="px-5 py-4 text-sm leading-7">
                        {benefit}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-neutral-900/70 p-5 shadow-none sm:rounded-[34px] sm:p-8">
              <motion.p variants={fadeUp} className="text-sm font-medium uppercase tracking-[0.32em] text-amber-300">
                Frequently Asked Questions
              </motion.p>
              <motion.div variants={fadeUp} className="mt-6 rounded-[24px] border border-white/10 bg-black/10 px-5 py-3">
                <Accordion className="gap-1">
                  {faqItems.map((item) => (
                    <AccordionItem key={item.question} value={item.question} className="border-white/10">
                      <AccordionTrigger className="py-4 text-base font-semibold text-white hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm leading-7 text-neutral-300">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-neutral-950 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger}
            className="rounded-[30px] border border-white/10 bg-neutral-900 px-5 py-10 text-center shadow-none sm:rounded-[38px] sm:px-8 sm:py-12"
          >
            <motion.p variants={fadeUp} className="mb-4 text-sm font-medium uppercase tracking-[0.34em] text-amber-300">
              Reserve Your Experience
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-xl font-bold text-white md:text-2xl xl:text-3xl">
              Experience a more refined stay in Motihari
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-base leading-8 text-neutral-300 sm:text-lg">
              Plan your stay, event, dining experience, or corporate gathering with a hotel designed to feel premium at every touchpoint.
            </motion.p>
            <Separator className="mx-auto mt-8 max-w-xl bg-white/10" />
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href={directBookingHref} className={primaryCtaClass}>
                Contact Us
              </Link>
              <Link href="/rooms" className={secondaryCtaClass}>
                Explore Rooms
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}