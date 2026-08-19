'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BedDoubleIcon, BriefcaseBusinessIcon, PartyPopperIcon, UtensilsCrossedIcon } from 'lucide-react';
import AdminOverlayWrapper from './AdminOverlayWrapper';
import VideoSection from './VideoSection';
import { useEffect, useState } from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { createHotelInquiryLink } from '@/lib/whatsapp';

const getFormattedDate = (offsetDays: number) => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().split('T')[0];
};

const defaultFacilities = [
  {
    eyebrow: 'Luxury Stay',
    title: 'Luxury Rooms',
    description: 'Luxury rooms designed for premium comfort with polished interiors and modern in-room amenities.',
    href: '/rooms',
    action: 'Explore Rooms',
    image: '/images/hotel-rudra-regency-motihari-premium-deluxe-room.jpg',
    position: 'center',
  },
  {
    eyebrow: 'Grand Events',
    title: 'Banquet Hall',
    description: 'A 10,000 sq ft banquet hall created for weddings, receptions, celebrations, and large social events.',
    href: '/banquet',
    action: 'View Banquet Hall',
    image: '/images/hotel-rudra-regency-motihari-wedding-banquet-venue.jpg',
    position: 'center',
  },
  {
    eyebrow: 'Premium Dining',
    title: 'Restaurant',
    description: 'Enjoy Open terrace dining, lounge-style seating, and a premium restaurant experience with bar service.',
    href: '/dining',
    action: 'Discover Dining',
    image: '/images/hotel-rudra-regency-motihari-premium-dining-restaurant.jpg',
    position: 'center',
  },
  {
    eyebrow: 'Business Ready',
    title: 'Meeting Hall',
    description: 'A high-tech meeting and conference hall designed for presentations, business and corporate events.',
    href: '/conference-room',
    action: 'View Conference Room',
    image: '/images/hotel-rudra-regency-motihari-business-conference.jpg',
    position: 'center',
  },
];

const defaultRooms = [
  {
    title: 'Premium Deluxe Room',
    description: 'A comfortable luxury stay with modern essentials and a calm, refined interior.',
    href: '/rooms',
    image: '/images/hotel-rudra-regency-motihari-premium-deluxe-room.jpg',
    position: 'center',
  },
  {
    title: 'Royal Semi-Suite',
    description: 'Extra space and polished detailing for guests who want a richer stay experience.',
    href: '/rooms',
    image: '/images/hotel-rudra-regency-motihari-royal-suite.jpg',
    position: 'center',
  },
  {
    title: 'Royal Suite',
    description: 'A premium suite atmosphere created for special stays and elevated comfort.',
    href: '/rooms',
    image: '/images/hotel-rudra-regency-motihari-premium-deluxe-room.jpg',
    position: 'center right',
  },
];

const defaultSliderImages = [
  {
    src: '/images/hotel-rudra-regency-motihari-luxury-suite-lounge.jpg',
    title: 'Luxury Suite Lounge',
    description: 'Premium interiors, elegant seating, and a refined stay experience designed for comfort.',
    position: 'center',
  },
  {
    src: '/images/hotel-rudra-regency-motihari-open-terrace-night.jpg',
    title: 'Open Terrace Ambience',
    description: 'A striking terrace setting for evening dining, relaxed conversations, and memorable visits.',
    position: 'center 58%',
  },
  {
    src: '/images/hotel-rudra-regency-motihari-conference-meeting-room.jpg',
    title: 'Business Meeting Hall',
    description: 'A polished conference setting built for presentations, meetings, and corporate sessions.',
    position: 'center',
  },
  {
    src: '/images/hotel-rudra-regency-motihari-grand-banquet-hall.jpg',
    title: 'Grand Banquet Hall',
    description: 'Spacious interiors and premium event ambience for celebrations, receptions, and gatherings.',
    position: 'center',
  },
  {
    src: '/images/hotel-rudra-regency-motihari-terrace-restaurant-lounge.jpg',
    title: 'Restaurant Terrace Dining',
    description: 'Open terrace dining with lounge-style seating for relaxed meals and premium hospitality.',
    position: 'center 42%',
  },
];

const serviceBlocks = [
  {
    title: 'Luxury Stay',
    subtitle: 'Premium Comfort',
    text: 'Luxury rooms designed for premium comfort with polished interiors and modern in-room amenities.',
    href: '/rooms',
    action: 'Explore Rooms',
    icon: 'BedDoubleIcon',
    hl1: 'Premium room categories',
    hl2: 'Gym and spa access for guests',
    accent: 'from-amber-300/20 via-amber-200/8 to-transparent',
  },
  {
    title: 'Grand Events',
    subtitle: 'Banquet Experience',
    text: 'A 10,000 sq ft banquet hall created for weddings, receptions, celebrations, and large social events.',
    href: '/banquet',
    action: 'View Banquet Hall',
    icon: 'PartyPopperIcon',
    hl1: 'Wedding and reception hosting',
    hl2: 'Large-format banquet support',
    accent: 'from-rose-300/18 via-amber-200/8 to-transparent',
  },
  {
    title: 'Premium Dining',
    subtitle: 'Restaurant Ambience',
    text: 'Enjoy Open terrace dining, lounge-style seating, and a premium restaurant experience with bar service.',
    href: '/dining',
    action: 'Discover Dining',
    icon: 'UtensilsCrossedIcon',
    hl1: 'Open terrace restaurant setting',
    hl2: 'Lounge and bar experience',
    accent: 'from-yellow-200/18 via-amber-200/8 to-transparent',
  },
  {
    title: 'Business Hub',
    subtitle: 'Conference Ready',
    text: 'A high-tech meeting and conference hall designed for presentations, business and corporate events.',
    href: '/conference-room',
    action: 'View Conference Room',
    icon: 'BriefcaseBusinessIcon',
    hl1: 'High-tech meeting setup',
    hl2: 'Conference-ready hospitality',
    accent: 'from-sky-200/16 via-neutral-200/8 to-transparent',
  },
];

const faqItems = [
  {
    question: 'Why choose Hotel Rudra Regency in Motihari?',
    answer:
      'Hotel Rudra Regency combines luxury rooms, a 10,000 sq ft banquet hall, open terrace restaurant dining, gym, spa, lounge, bar, and a high-tech meeting hall in one destination for stays, events, and business visits.',
  },
  {
    question: 'Is Hotel Rudra Regency one of the best hotels in Motihari for family and business stays?',
    answer:
      'Hotel Rudra Regency is a preferred choice for guests looking for a premium hotel in Motihari with comfortable rooms, modern amenities, dining, and event spaces for both family visits and business travel.',
  },
  {
    question: 'Can I book rooms and event spaces directly?',
    answer:
      'Yes. Guests can contact the hotel directly for room bookings, banquet hall reservations, dining inquiries, and conference room availability.',
  },
  {
    question: 'Do you offer room booking in Motihari for weddings, local functions, and outstation guests?',
    answer:
      'Yes. Guests visiting Motihari for weddings, family functions, business meetings, or short stays can book rooms directly with Hotel Rudra Regency for quick assistance and availability updates.',
  },
  {
    question: 'Is the hotel suitable for weddings and corporate meetings?',
    answer:
      'Yes. The property is designed for both social celebrations and professional events, with dedicated banquet and conference spaces.',
  },
  {
    question: 'Does Hotel Rudra Regency offer dining options?',
    answer:
      'Yes. The hotel offers an open terrace restaurant, premium dining ambience, lounge-style seating, and a hospitality experience suited to family meals and social evenings.',
  },
  {
    question: 'Do you have a banquet hall in Motihari for weddings, receptions, and events?',
    answer:
      'Yes. Hotel Rudra Regency offers banquet facilities in Motihari for weddings, receptions, engagement functions, birthday parties, and other social events, along with hospitality support.',
  },
];

export default function HomePageClient({ 
  contentData = [],
  isAdmin = false,
}: { 
  contentData?: any[],
  isAdmin?: boolean,
}) {
  const getParsedContent = (key: string, fallback: any) => {
    const item = contentData.find(c => c.sectionKey === key);
    if (!item) return fallback;
    try { return JSON.parse(item.content); } catch { return fallback; }
  };
  const facilities = getParsedContent('facilities', defaultFacilities);
  const rooms = getParsedContent('rooms', defaultRooms);
  const sliderImages = getParsedContent('sliderImages', defaultSliderImages);
  
  const hero = getParsedContent('hero', {
    bgImage: '/images/hotel-rudra-regency-motihari-reception4.JPG',
    eyebrow: 'Welcome to Hotel Rudra Regency',
    heading: 'Hotel Rudra Regency — Luxury Hotel in Motihari, Bihar',
    btn1: 'Explore Rooms',
    btn2: 'Book Directly',
  });

  const whyChooseUs = getParsedContent('whyChooseUs', {
    eyebrow: 'Why Guests Choose Us',
    title: 'A premium stay destination for Motihari visitors',
    description: 'Whether you are planning a weekend stay, hosting a wedding function, arranging a corporate meeting, or looking for a quality restaurant in Motihari, Hotel Rudra Regency brings all of it together under one hospitality experience.',
  });

  const whyChooseUsHighlights = getParsedContent('whyChooseUsHighlights', [
    { text: 'A premium hotel in Motihari with luxury rooms, a 10,000 sq ft banquet hall, and a high-tech meeting hall.' },
    { text: 'Modern guest facilities including gym, spa, lounge, bar, and attentive hospitality for a seamless stay.' },
    { text: 'Open terrace restaurant, family-friendly ambience, and premium support for celebrations and business visits.' },
    { text: 'Direct booking assistance for rooms, dining, banquet events, conferences, and curated guest experiences.' },
  ]);

  const facilitiesHeader = getParsedContent('facilitiesHeader', {
    eyebrow: 'Premium Facilities at Hotel Rudra Regency',
    title: 'Crafted spaces for stay, dining, celebrations, and business',
    description: 'Every facility is shaped to support a premium guest experience, from restful stays and grand events to dining ambience and professional meetings.',
  });

  const roomsHeader = getParsedContent('roomsHeader', {
    eyebrow: 'Best Luxury Room',
    title: 'Most popular rooms',
    description: 'Choose from elegantly designed rooms that balance premium comfort, clean interiors, and a memorable stay experience in Motihari.',
  });

  const serviceBlocksHeader = getParsedContent('serviceBlocksHeader', {
    eyebrow: 'Luxury Redefined',
    title: 'Stay, celebrate, dine, and gather with one premium identity',
  });

  const dServiceBlocks = getParsedContent('serviceBlocks', serviceBlocks);

  const directBooking = getParsedContent('directBooking', {
    eyebrow: 'Direct Booking Advantage',
    title: 'A Motihari hotel built for direct guest support',
    description: 'Guests looking for hotels in Motihari often need more than a room. They need a reliable place for family visits, event planning, dining, or business meetings. Hotel Rudra Regency is structured around that full-service need.',
    b1: 'Fast assistance for room, banquet hall, restaurant, and conference hall inquiries.',
    b2: 'Support for guests visiting Motihari for family functions, business travel, or premium leisure stays.',
    b3: 'One property for luxury rooms, gym, spa, lounge, bar, open terrace dining, and grand events.',
  });

  const faqs = getParsedContent('faqs', faqItems);

  const footerCta = getParsedContent('footerCta', {
    eyebrow: 'Reserve Your Experience',
    title: 'Experience a more refined stay in Motihari',
    description: 'Plan your stay, event, dining experience, or corporate gathering with a hotel designed to feel premium at every touchpoint.',
  });

  const [activeSlide, setActiveSlide] = useState(0);
  const [checkIn, setCheckIn] = useState(getFormattedDate(0));
  const [checkOut, setCheckOut] = useState(getFormattedDate(1));
  const [guests, setGuests] = useState('2 Guests');

  const directBookingHref = createHotelInquiryLink('a direct booking at Hotel Rudra Regency');
  const bookingHref = createHotelInquiryLink('a stay at Hotel Rudra Regency', [
    `Check-in: ${checkIn || 'Flexible'}`,
    `Check-out: ${checkOut || 'Flexible'}`,
    `Guests: ${guests || 'Not specified'}`,
  ]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % sliderImages.length);
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, []);

  const primaryCtaClass = cn(
    buttonVariants({ size: 'lg' }),
    'rounded-full border border-amber-300/20 bg-amber-300 px-6 text-sm font-semibold uppercase tracking-[0.14em] text-neutral-950 hover:bg-amber-200 sm:px-8 sm:tracking-[0.16em]'
  );

  const secondaryCtaClass = cn(
    buttonVariants({ variant: 'outline', size: 'lg' }),
    'rounded-full border-white/12 bg-white/[0.02] px-6 text-sm font-semibold uppercase tracking-[0.14em] text-white/88 hover:bg-white/[0.05] hover:text-white sm:px-8 sm:tracking-[0.16em]'
  );

  const roomCtaClass = cn(
    buttonVariants({ variant: 'outline', size: 'lg' }),
    'rounded-full border border-amber-300/70 bg-transparent px-6 text-sm font-semibold uppercase tracking-[0.14em] text-amber-300 hover:bg-amber-300/10 hover:text-amber-200 sm:px-8 sm:tracking-[0.16em]'
  );

  return (
    <div className="min-h-screen overflow-hidden bg-neutral-950 text-white">
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={hero.bgImage || "/images/hotel-rudra-regency-motihari-reception4.JPG"}
            alt="Hotel Rudra Regency reception and premium hotel ambience"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/22 via-black/18 to-neutral-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(217,168,50,0.18),_transparent_35%)]" />
        
        <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 pb-14 pt-36">
          <div className="flex w-full max-w-5xl flex-col items-center">
            <div className="w-full">
              <AdminOverlayWrapper isAdmin={isAdmin} sectionKey="hero" label="Hero & Booking">
                <div className="flex flex-col items-center py-6 text-center relative z-10">
                  <p className="animate-fade-in-up mb-4 text-[11px] font-medium uppercase tracking-[0.32em] text-amber-300">
                    {hero.eyebrow}
                  </p>
                  <h1 className="animate-fade-in-up mx-auto max-w-4xl text-4xl font-bold leading-[1.02] sm:text-5xl lg:text-6xl">
                    <span className="bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-200 bg-clip-text text-transparent">
                      {hero.heading}
                    </span>
                  </h1>
                  <div className="animate-fade-in-up mt-8 flex w-full flex-col justify-center gap-3 sm:flex-row sm:gap-4">
                    <Link href="/rooms" className={cn(primaryCtaClass, 'w-full sm:w-auto')}>{hero.btn1}</Link>
                    <Link href={directBookingHref} className={cn(secondaryCtaClass, 'w-full sm:w-auto')}>{hero.btn2}</Link>
                  </div>
                </div>
              </AdminOverlayWrapper>
            </div>
            <div className="animate-fade-in-up mt-4 w-full max-w-5xl">
              <Card className="rounded-[28px] border-white/10 bg-neutral-950/75 text-white shadow-none backdrop-blur-xl">
                <CardContent className="p-4 md:p-5">
                  <div className="grid gap-3 md:grid-cols-[1fr_1fr_0.9fr_auto]">
                    <label className="block text-left">
                      <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-400">Check-In</span>
                      <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-neutral-900/85 px-4 py-3 text-sm outline-none focus:border-amber-400" />
                    </label>
                    <label className="block text-left">
                      <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-400">Check-Out</span>
                      <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-neutral-900/85 px-4 py-3 text-sm outline-none focus:border-amber-400" />
                    </label>
                    <label className="block text-left">
                      <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-400">Guests</span>
                      <select value={guests} onChange={(e) => setGuests(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-neutral-900/85 px-4 py-3 text-sm outline-none focus:border-amber-400">
                        <option>1 Guest</option><option>2 Guests</option><option>3 Guests</option><option>4 Guests</option><option>5+ Guests</option>
                      </select>
                    </label>
                    <div className="flex items-end">
                      <Link href={bookingHref} className={cn(primaryCtaClass, 'w-full md:min-h-[50px]')}>Book Now</Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <AdminOverlayWrapper isAdmin={isAdmin} sectionKey="hotelVideo" label="Hotel Overview Video">
        <VideoSection 
          src="/videos/home.mp4" 
          title="Experience Rudra Regency" 
          description="A glimpse into the luxury, comfort, and hospitality that awaits you in Motihari." 
        />
      </AdminOverlayWrapper>

      <section className="bg-neutral-950 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-[1.08fr_0.92fr] lg:gap-8 lg:px-8">
          <div className="overflow-hidden rounded-[36px] border border-white/10 bg-neutral-950 shadow-none">
            <AdminOverlayWrapper isAdmin={isAdmin} sectionKey="sliderImages" label="Hero Slider">
              <div className="relative min-h-[420px] sm:min-h-[500px] lg:min-h-[560px]">
                {sliderImages.map((slide: any, index: number) => (
                  <div key={index} className={`absolute inset-0 transition-opacity duration-700 ${index === activeSlide ? 'opacity-100' : 'opacity-0'}`}>
                    <Image priority={index === 0} src={slide.src} alt={slide.title} fill className="object-cover" style={{ objectPosition: slide.position }} />
                  </div>
                ))}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3 sm:bottom-8 sm:left-8 sm:right-8">
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/15 px-3 py-2.5">
                    {sliderImages.map((_: any, index: number) => (
                      <button key={index} onClick={() => setActiveSlide(index)} className={`h-2.5 rounded-full transition-all ${index === activeSlide ? 'w-10 bg-amber-300' : 'w-2.5 bg-white/35'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </AdminOverlayWrapper>
          </div>

          <div className="flex h-full flex-col rounded-[28px] border border-white/10 bg-neutral-900/80 p-5 sm:rounded-[36px] sm:p-6">
            <div className="mb-5">
              <AdminOverlayWrapper isAdmin={isAdmin} sectionKey="whyChooseUs" label="Title & Desc">
                <p className="mb-3 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-amber-300">{whyChooseUs.eyebrow}</p>
                <h2 className="text-[1.7rem] font-bold leading-tight text-white md:text-[2rem]">{whyChooseUs.title}</h2>
                <p className="mt-3 text-sm leading-6 text-neutral-400 md:text-[0.96rem]">{whyChooseUs.description}</p>
              </AdminOverlayWrapper>
            </div>
            <div className="flex-1">
              <AdminOverlayWrapper isAdmin={isAdmin} sectionKey="whyChooseUsHighlights" label="Bullet Points">
                <ul className="space-y-3.5">
                  {whyChooseUsHighlights.map((item: any, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-neutral-300">
                      <span className="mt-1 shrink-0 text-amber-300">✦</span>
                      <span className="text-sm leading-6 md:text-[0.95rem]">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </AdminOverlayWrapper>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-neutral-950 to-neutral-900 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-9 max-w-5xl text-center py-4">
            <AdminOverlayWrapper isAdmin={isAdmin} sectionKey="facilitiesHeader" label="Facilities Header">
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.34em] text-amber-300">{facilitiesHeader.eyebrow}</p>
              <h2 className="text-xl font-bold text-white md:text-2xl xl:text-3xl">{facilitiesHeader.title}</h2>
              <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-neutral-400">{facilitiesHeader.description}</p>
            </AdminOverlayWrapper>
          </div>
          <AdminOverlayWrapper isAdmin={isAdmin} sectionKey="facilities" label="Facilities Cards">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {facilities.map((facility: any, index: number) => (
                <article key={index} className="group overflow-hidden rounded-[30px] border border-white/10 bg-neutral-900/80">
                  <Link href={facility.href} className="block">
                    <div className="relative h-72 overflow-hidden">
                      <Image src={facility.image} alt={facility.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" style={{ objectPosition: facility.position }} />
                      <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-amber-300 backdrop-blur-sm">{facility.eyebrow}</div>
                      <div className="absolute inset-x-0 bottom-0 p-6"><h3 className="text-2xl font-semibold text-white">{facility.title}</h3></div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </AdminOverlayWrapper>
        </div>
      </section>

      <section className="bg-neutral-950 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center py-4">
            <AdminOverlayWrapper isAdmin={isAdmin} sectionKey="roomsHeader" label="Rooms Header">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.34em] text-amber-300">{roomsHeader.eyebrow}</p>
              <h2 className="text-xl font-bold text-white md:text-2xl xl:text-3xl">{roomsHeader.title}</h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-neutral-400">{roomsHeader.description}</p>
            </AdminOverlayWrapper>
          </div>
          <AdminOverlayWrapper isAdmin={isAdmin} sectionKey="rooms" label="Room Cards">
            <div className="grid gap-6 md:grid-cols-3">
              {rooms.map((room: any, index: number) => (
                <article key={index} className="overflow-hidden rounded-[30px] border border-white/10 bg-neutral-900/80">
                  <div className="relative h-60 overflow-hidden">
                    <Image src={room.image} alt={room.title} fill className="object-cover" style={{ objectPosition: room.position }} />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="mb-3 text-2xl font-semibold text-white">{room.title}</h3>
                    <p className="mb-6 text-sm leading-7 text-neutral-400">{room.description}</p>
                    <Link href={createHotelInquiryLink(`the ${room.title} at Hotel Rudra Regency`)} className={cn(roomCtaClass, 'w-full sm:w-auto')}>Book Now</Link>
                  </CardContent>
                </article>
              ))}
            </div>
          </AdminOverlayWrapper>
        </div>
      </section>

      <section className="bg-gradient-to-b from-neutral-900 to-black py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-5xl text-center py-4">
            <AdminOverlayWrapper isAdmin={isAdmin} sectionKey="serviceBlocksHeader" label="Service Blocks Header">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.34em] text-amber-300">{serviceBlocksHeader.eyebrow}</p>
              <h2 className="text-xl font-bold text-white md:text-2xl xl:text-3xl">{serviceBlocksHeader.title}</h2>
            </AdminOverlayWrapper>
          </div>
          <AdminOverlayWrapper isAdmin={isAdmin} sectionKey="serviceBlocks" label="Service Blocks">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {dServiceBlocks.map((block: any, index: number) => {
                const icons = { BedDoubleIcon, PartyPopperIcon, UtensilsCrossedIcon, BriefcaseBusinessIcon };
                const Icon = icons[block.icon as keyof typeof icons] || BedDoubleIcon;
                return (
                  <Card key={index} className="flex h-full overflow-hidden rounded-[30px] border border-white/10 bg-neutral-900/80 text-white shadow-none">
                    <CardContent className="grid h-full grid-rows-[4.75rem_6rem_1fr_3.25rem] p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-500">{block.subtitle}</p>
                          <h3 className="mt-3 text-2xl font-semibold text-white">{block.title}</h3>
                        </div>
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-amber-200"><Icon className="size-5" /></div>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-neutral-400">{block.text}</p>
                      <ul className="mt-6 grid gap-3">
                        {block.hl1 && <li className="flex items-start gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-200" /><span className="text-sm text-neutral-300">{block.hl1}</span></li>}
                        {block.hl2 && <li className="flex items-start gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-200" /><span className="text-sm text-neutral-300">{block.hl2}</span></li>}
                      </ul>
                      <div className="flex items-end border-t border-white/10 pt-5">
                        <Link href={block.href || '#'} className="text-[12px] font-semibold uppercase tracking-[0.12em] text-amber-200">{block.action}</Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            </AdminOverlayWrapper>
        </div>
      </section>

      <section className="bg-neutral-950 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[28px] border border-white/10 bg-neutral-900/70 p-5 shadow-none sm:rounded-[34px] sm:p-8">
              <AdminOverlayWrapper isAdmin={isAdmin} sectionKey="directBooking" label="Direct Booking Info">
                <div className="relative z-10">
                  <p className="mb-3 text-sm font-medium uppercase tracking-[0.34em] text-amber-300">
                    {directBooking.eyebrow}
                  </p>
                  <h2 className="mt-4 text-2xl font-bold text-white md:text-3xl">
                    {directBooking.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-neutral-400 md:text-base">
                    {directBooking.description}
                  </p>
                  <div className="mt-8 grid gap-4">
                    {[directBooking.b1, directBooking.b2, directBooking.b3].map((benefit, i) => (
                      benefit ? (
                        <div key={i} className="rounded-[24px] border-white/10 bg-neutral-950 text-neutral-300 shadow-none">
                          <div className="px-5 py-4 text-sm leading-7">{benefit}</div>
                        </div>
                      ) : null
                    ))}
                  </div>
                </div>
              </AdminOverlayWrapper>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-neutral-900/70 p-5 shadow-none sm:rounded-[34px] sm:p-8">
              <AdminOverlayWrapper isAdmin={isAdmin} sectionKey="faqs" label="FAQs">
                <div className="relative z-10">
                  <p className="mb-3 text-sm font-medium uppercase tracking-[0.34em] text-amber-300">
                    Frequently Asked Questions
                  </p>
                  <div className="mt-6 rounded-[24px] border border-white/10 bg-black/10 px-5 py-3 relative z-10">
                    <Accordion className="gap-1">
                      {faqs.map((item: any) => (
                        <AccordionItem key={item.question} value={item.question} className="border-white/10">
                          <AccordionTrigger className="py-4 text-base font-semibold text-white hover:no-underline text-left">
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-sm leading-7 text-neutral-300">
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              </AdminOverlayWrapper>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-950 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div>
            <AdminOverlayWrapper isAdmin={isAdmin} sectionKey="footerCta" label="Footer CTA">
              <div className="animate-fade-in-up relative z-10 rounded-[30px] border border-white/10 bg-neutral-900 px-5 py-10 text-center shadow-none sm:rounded-[38px] sm:px-8 sm:py-12">
                <p className="mb-4 text-sm font-medium uppercase tracking-[0.34em] text-amber-300">
                  {footerCta.eyebrow}
                </p>
            <h2 className="text-xl font-bold text-white md:text-2xl xl:text-3xl">
              {footerCta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-neutral-300 sm:text-lg">
              {footerCta.description}
            </p>
            <Separator className="mx-auto mt-8 max-w-xl bg-white/10" />
                <div className="mt-8 flex flex-wrap justify-center gap-4 relative z-10">
                  <Link href={directBookingHref} className={primaryCtaClass}>
                    Contact Us
                  </Link>
                  <Link href="/rooms" className={secondaryCtaClass}>
                    Explore Rooms
                  </Link>
                </div>
              </div>
            </AdminOverlayWrapper>
          </div>
        </div>
      </section>
    </div>
  );
}
