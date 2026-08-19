import Image from "next/image";
import Link from "next/link";
import { createHotelInquiryLink } from "@/lib/whatsapp";
import connectToDatabase from "@/lib/db";
import { PageContent, SiteSettings } from "@/lib/models";
import { Metadata } from "next";
import AdminOverlayWrapper from "@/app/components/AdminOverlayWrapper";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import VideoSection from "@/app/components/VideoSection";

export const metadata: Metadata = {
  title: "Luxury Rooms & Suites in Motihari | Hotel Rudra Regency",
  description: "Book premium luxury rooms and suites in Motihari at Hotel Rudra Regency. Enjoy modern amenities, 24/7 service, gym, spa, and free WiFi for family and business stays.",
  keywords: ["luxury rooms in Motihari", "hotel booking Motihari", "suites in Motihari", "best hotel rooms in Motihari", "premium stay in Motihari"],
  alternates: {
    canonical: "/rooms",
  },
};
const defaultRooms = [
  {
    id: 1,
    name: "Premium Deluxe Room",
    description: "Designed for comfort and functionality, the Premium Deluxe Room is perfect for guests seeking a relaxing stay with modern amenities and elegant interiors.",
    amenities: ["Comfortable King Size Bed", "Air Conditioning & Free WiFi", "LED TV & Room Service", "Modern Bathroom"],
    idealFor: "Solo travelers & couples",
    color: "from-amber-400 to-yellow-500",
    image: "/images/hotel-rudra-regency-motihari-premium-deluxe-room.jpg",
    position: "center",
  },
  {
    id: 2,
    name: "Royal Semi-Suite",
    description: "Enjoy extra space and refined interiors in our Royal Semi-Suite, offering a premium experience for guests who want more comfort and style.",
    amenities: ["Comfortable King Size Bed", "Air Conditioning & Free WiFi", "LED TV & Room Service", "Modern Bathroom"],
    idealFor: "Families & business travelers",
    color: "from-amber-500 to-orange-500",
    image: "/images/hotel-rudra-regency-motihari-royal-suite.jpg",
    position: "center",
  },
  {
    id: 3,
    name: "Royal Suite",
    description: "Experience the highest level of luxury with our Royal Suite, designed with premium features and elegant detailing for an unforgettable stay.",
    amenities: ["Large Luxury Room with Premium Design", "Separate Living Space", "Premium Bathroom & Amenities", "Exclusive Comfort"],
    idealFor: "VIP guests & special occasions",
    color: "from-yellow-400 to-amber-600",
    image: "/images/hotel-rudra-regency-motihari-premium-deluxe-room.jpg",
    position: "center right",
  },
];

const defaultFeatures = [
  {
    icon: "✨",
    title: "Luxury Comfort",
    description: "Experience premium comfort with spacious rooms, elegant interiors, plush bedding, and a hospitality experience designed for a relaxing stay.",
  },
  {
    icon: "🏋️",
    title: "Wellness & Amenities",
    description: "Enjoy modern amenities along with access to gym, spa, lounge spaces, and the comforts expected from a luxury hotel in Motihari.",
  },
  {
    icon: "♿",
    title: "Accessible Facilities",
    description: "Specially designed rooms and facilities for differently abled guests, ensuring a comfortable, barrier-free, and welcoming stay for everyone.",
  },
  {
    icon: "🍽️",
    title: "Full-Service Hospitality",
    description: "Stay connected to open terrace dining, banquet experiences, and business-ready spaces within one premium hospitality destination.",
  },
];

const defaultWhyChooseUs = [
  { reason: "A complete experience of luxury stay, dining, wellness, and events" },
  { reason: "Premium rooms backed by gym, spa, lounge, and bar facilities" },
  { reason: "Professional and attentive hospitality for families, couples, and business travelers" },
  { reason: "Elegant spaces for stays, dining, celebrations, and corporate visits" },
  { reason: "Thoughtfully designed rooms for comfort, privacy, and refined relaxation" },
  { reason: "Specially equipped rooms and facilities for differently abled guests" },
  { reason: "A premium hotel in Motihari with modern amenities and direct booking support" },
];

export default async function RoomsPage(props: { searchParams: Promise<{ editMode?: string }> }) {
  const searchParams = await props.searchParams;
  const isAdmin = searchParams?.editMode === 'true';
  
  let rawSettings: any[] = [];
  let rawContent: any[] = [];
  
  try {
    await connectToDatabase();
    rawSettings = await SiteSettings.find().lean();
    rawContent = await PageContent.find({ pageKey: 'rooms' }).lean();
  } catch (error) {
    console.error("Database connection failed in RoomsPage:", error);
  }

  const settings: Record<string, string> = {};
  rawSettings.forEach((s: any) => settings[s.key] = s.value);
  const whatsappNumber = settings.whatsapp_number;
  
  const getParsedContent = (key: string, fallback: any) => {
    const item = rawContent.find((c: any) => c.sectionKey === key);
    if (!item) return fallback;
    try { return JSON.parse(item.content); } catch { return fallback; }
  };

  const rooms = getParsedContent('rooms', defaultRooms);
  const features = getParsedContent('features', defaultFeatures);
  const whyChooseUs = getParsedContent('whyChooseUs', defaultWhyChooseUs);
  const hero = getParsedContent('hero', {
    eyebrow: 'Stay Collection',
    heading: 'Luxury Rooms in Motihari',
    description: 'Experience comfort, elegance, and modern amenities at one of the best luxury hotels in Motihari, with premium rooms, wellness facilities, dining, and event-ready hospitality.',
    bgImage: '/images/hotel-rudra-regency-motihari-premium-deluxe-room.jpg'
  });
  const footerCta = getParsedContent('footerCta', {
    title: 'Ready to Book Your Stay?',
    description: 'Experience luxury and comfort at Hotel Rudra Regency. Choose the perfect room for your needs.',
  });
  const roomsHeader = getParsedContent('roomsHeader', {
    eyebrow: 'Our Room Categories',
    title: 'A Curated Collection of Elegant Stays',
    description: 'Choose from our carefully curated collection of rooms designed to exceed your expectations.',
  });
  const whyChooseUsHeader = getParsedContent('whyChooseUsHeader', {
    title: 'Why Guests Choose Rudra Regency',
    description: 'Discover what makes Hotel Rudra Regency the perfect choice for your stay.',
  });

  return (
    <div className="min-h-screen overflow-hidden bg-neutral-950 text-white">
      <section
        className="relative flex min-h-[72vh] items-end overflow-hidden"
        style={{
          backgroundImage: `url('${hero.bgImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-neutral-950" />
        <div className="absolute right-6 top-20 h-20 w-20 rounded-full bg-amber-400/10 blur-3xl sm:right-10 sm:h-24 sm:w-24" />
        <div className="absolute bottom-20 left-4 h-28 w-28 rounded-full bg-yellow-400/10 blur-3xl sm:bottom-24 sm:left-10 sm:h-44 sm:w-44" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 md:pb-20 lg:px-8">
          <div
            className="animate-fade-in-up grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end"
          >
            <div>
              <AdminOverlayWrapper isAdmin={isAdmin} sectionKey="hero" label="Hero Section">
                <div className="relative z-10">
                  <p
                    className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-amber-300 sm:text-sm sm:tracking-[0.38em]"
                  >
                    {hero.eyebrow}
                  </p>
                  <h1
                    className="mb-5 text-4xl font-bold leading-[1.02] text-balance sm:text-5xl lg:text-6xl"
                  >
                    <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent">
                      {hero.heading}
                    </span>
                  </h1>
                  <p
                    className="max-w-3xl text-base leading-7 text-neutral-300 sm:text-lg sm:leading-8 md:text-xl"
                  >
                    {hero.description}
                  </p>
                </div>
              </AdminOverlayWrapper>
            </div>

            <div
              className="rounded-[24px] border border-white/10 bg-neutral-950/70 p-4 shadow-2xl shadow-amber-500/5 backdrop-blur-xl md:rounded-[28px] md:p-5"
            >
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.24em] text-amber-300">
                Room Highlights
              </p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-2.5 py-3">
                  <p className="text-lg font-bold text-white md:text-xl">{rooms.length}</p>
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
            </div>
          </div>
        </div>
      </section>

      <AdminOverlayWrapper isAdmin={isAdmin} sectionKey="roomsVideo" label="Rooms Showcase Video">
        <VideoSection 
          src="/videos/rooms.mp4" 
          title="Inside Our Luxury Rooms" 
          description="Take a closer look at the premium comfort and modern amenities awaiting you." 
        />
      </AdminOverlayWrapper>

      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Rooms', href: '/rooms' }]} />

      <section className="relative z-10 -mt-8 pb-8 sm:-mt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="grid grid-cols-2 gap-5 lg:grid-cols-4"
          >
            {features.map((feature: any, index: number) => (
              <AdminOverlayWrapper key={feature.title} isAdmin={isAdmin} sectionKey="features" label={`Edit Feature ${index + 1}`} itemIndex={index}>
                <div
                  className="animate-fade-in-up rounded-[24px] border border-white/10 bg-neutral-900/85 p-5 shadow-xl shadow-amber-500/5 backdrop-blur-xl transition-all hover:-translate-y-1 sm:rounded-[28px] sm:p-6 h-full relative z-10"
                >
                  <div className="mb-4 text-4xl">{feature.icon}</div>
                  <h3 className="mb-3 text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="text-sm leading-6 text-neutral-400">{feature.description}</p>
                </div>
              </AdminOverlayWrapper>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-950 py-12 sm:py-14 md:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div
            className="animate-fade-in-up mb-12 text-center md:mb-14"
          >
            <AdminOverlayWrapper isAdmin={isAdmin} sectionKey="roomsHeader" label="Rooms Header">
              <div className="relative z-10">
                <p
                  className="mb-3 text-sm font-medium uppercase tracking-[0.34em] text-amber-300"
                >
                  {roomsHeader.eyebrow}
                </p>
                <h2
                  className="mb-4 text-3xl font-bold text-white text-balance sm:text-4xl md:text-5xl"
                >
                  {roomsHeader.title}
                </h2>
                <p
                  className="mx-auto max-w-2xl text-base leading-8 text-neutral-400 md:text-lg"
                >
                  {roomsHeader.description}
                </p>
              </div>
            </AdminOverlayWrapper>
          </div>

          <div className="space-y-6 md:space-y-8">
            {rooms.map((room: any, index: number) => (
              <AdminOverlayWrapper key={room.name} isAdmin={isAdmin} sectionKey="rooms" label={`Edit Room ${index + 1}`} itemIndex={index}>
                <article
                  className="animate-fade-in-up grid overflow-hidden rounded-[28px] border border-white/10 bg-neutral-900/85 shadow-2xl shadow-amber-500/5 backdrop-blur-xl sm:rounded-[34px] lg:grid-cols-2 relative z-10"
                >
                  <div
                    className={`${index % 2 === 1 ? 'lg:order-2' : ''} relative min-h-[240px] overflow-hidden`}
                  >
                    <Image
                      src={room.image}
                      alt={room.name}
                      fill
                      className="object-cover"
                      style={{ objectPosition: room.position }}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${room.color} opacity-30`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                    <div className="absolute left-6 top-6 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-amber-300 backdrop-blur-sm">
                      {room.idealFor}
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl font-bold text-white md:text-3xl">{room.name}</h3>
                    </div>
                  </div>

                  <div
                    className={`${index % 2 === 1 ? 'lg:order-1' : ''} flex flex-col p-5 sm:p-6 md:p-7 lg:p-8`}
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
                        {[room.amenity1, room.amenity2, room.amenity3, room.amenity4].filter(Boolean).map((amenity: string) => (
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
                        href={createHotelInquiryLink(`the ${room.name} at Hotel Rudra Regency`, [], whatsappNumber)}
                        className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-black shadow-lg shadow-amber-500/20 transition hover:shadow-amber-500/35 sm:w-auto"
                      >
                        Check Availability
                      </Link>
                    </div>
                  </div>
                </article>
              </AdminOverlayWrapper>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-900 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="animate-fade-in-up rounded-[28px] border border-white/10 bg-neutral-950/80 p-5 shadow-2xl shadow-amber-500/5 sm:rounded-[34px] sm:p-8 md:p-10"
          >
            <div className="mb-8 text-center">
              <AdminOverlayWrapper isAdmin={isAdmin} sectionKey="whyChooseUsHeader" label="Why Choose Us Header">
                <div className="relative z-10">
                  <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                    {whyChooseUsHeader.title}
                  </h2>
                  <p className="mx-auto max-w-2xl text-base leading-8 text-neutral-400 md:text-lg">
                    {whyChooseUsHeader.description}
                  </p>
                </div>
              </AdminOverlayWrapper>
            </div>

            <div
              className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
            >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 relative z-10 w-full col-span-full">
                  {whyChooseUs.map((item: any, index: number) => (
                    <AdminOverlayWrapper key={index} isAdmin={isAdmin} sectionKey="whyChooseUs" label={`Edit Point ${index + 1}`} itemIndex={index}>
                    <div
                      className="animate-fade-in-up rounded-[24px] border border-white/10 bg-white/[0.03] px-5 py-5 shadow-lg shadow-amber-500/5 relative z-10"
                    >
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-amber-400/10 text-amber-300">
                        ✓
                      </div>
                      <p className="text-sm leading-7 text-neutral-300 md:text-base">{item.reason}</p>
                    </div>
                    </AdminOverlayWrapper>
                  ))}
                </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-950 py-14 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AdminOverlayWrapper isAdmin={isAdmin} sectionKey="footerCta" label="Footer CTA">
            <div
              className="animate-fade-in-up rounded-[30px] border border-white/10 bg-gradient-to-br from-neutral-900 to-black px-5 py-10 text-center shadow-2xl shadow-amber-500/10 sm:rounded-[36px] sm:px-8 sm:py-12 relative z-10"
            >
              <h2 className="mb-5 text-3xl font-bold md:text-5xl">
                {footerCta.title}
              </h2>
              <p
                className="mx-auto mb-8 max-w-2xl text-base leading-8 text-neutral-300 sm:text-lg"
              >
                {footerCta.description}
              </p>
              <div>
                <Link
                  href={createHotelInquiryLink("a stay at Hotel Rudra Regency in Motihari", [], whatsappNumber)}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 px-10 py-4 text-sm font-bold uppercase tracking-[0.18em] text-black shadow-lg shadow-amber-500/25 transition hover:scale-[1.02] hover:shadow-amber-500/40"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </AdminOverlayWrapper>
        </div>
      </section>
    </div>
  );
}
