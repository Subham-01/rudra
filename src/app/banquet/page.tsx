import Image from "next/image";
import Link from "next/link";
import { createHotelInquiryLink } from "@/lib/whatsapp";
import connectToDatabase from "@/lib/db";
import { PageContent, SiteSettings } from "@/lib/models";

import AdminOverlayWrapper from "@/app/components/AdminOverlayWrapper";
import { Metadata } from "next";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import VideoSection from "@/app/components/VideoSection";

export const metadata: Metadata = {
  title: "Best Banquet Hall in Motihari | Wedding Venues | Hotel Rudra Regency",
  description: "Book the largest and most premium banquet hall in Motihari. Perfect for weddings, receptions, and social celebrations with catering, luxury rooms, and full event support.",
  keywords: ["banquet hall in Motihari", "wedding venues in Motihari", "marriage hall Motihari", "event space Motihari", "best banquet hall in Motihari"],
  alternates: {
    canonical: "/banquet",
  },
};
const defaultPackages = [
  {
    name: "Premium Package",
    badge: "Premium",
    price: "₹ 2,11,000",
    gradient: "from-amber-500 to-yellow-400",
    border: "border-amber-400/30",
    featured: "false",
    item1: "Saumya Hall",
    item2: "Deluxe Room – 8",
    item3: "Family Suite – 1",
    item4: "Kitchen Area"
  },
  {
    name: "Elite Package",
    badge: "Elite",
    price: "₹ 2,41,000",
    gradient: "from-amber-300 to-orange-400",
    border: "border-amber-300/40",
    featured: "true",
    item1: "Saumya Hall",
    item2: "1st Floor Banquet Hall",
    item3: "Deluxe Room – 8",
    item4: "Family Suite – 1",
    item5: "Semi Suite – 2",
    item6: "Kitchen Area"
  },
  {
    name: "Signature Package",
    badge: "Signature",
    price: "₹ 2,71,000",
    gradient: "from-yellow-500 to-amber-700",
    border: "border-yellow-400/30",
    featured: "false",
    item1: "Saumya Hall",
    item2: "1st Floor Banquet Hall",
    item3: "Deluxe Room – 8",
    item4: "Family Suite – 1",
    item5: "Premium Deluxe Room – 8",
    item6: "Kitchen Area"
  },
];

const defaultComplimentaryItems = [
  { icon: "✦", text: "200 VIP Chairs" },
  { icon: "✦", text: "1 Maharaja Sofa" },
  { icon: "✦", text: "10 Round Tables" },
  { icon: "✦", text: "8 Sofas" }
];

const defaultTerms = [
  { text: "Decoration & catering charges not included" },
  { text: "Cleaning charges: ₹5,000 extra" },
  { text: "All package prices are exclusive of GST" },
  { text: "Refundable security deposit of ₹25,000 required" },
  { text: "Any property damage during event will lead to deposit forfeiture" }
];

export default async function BanquetPage(props: { searchParams: Promise<{ editMode?: string }> }) {
  const searchParams = await props.searchParams;
  const isAdmin = searchParams?.editMode === 'true';

  let rawSettings: any[] = [];
  let rawContent: any[] = [];
  
  try {
    await connectToDatabase();
    rawSettings = await SiteSettings.find().lean();
    rawContent = await PageContent.find({ pageKey: 'banquet' }).lean();
  } catch (error) {
    console.error("Database connection failed in BanquetPage:", error);
  }

  const settings: Record<string, string> = {};
  rawSettings.forEach((s: any) => settings[s.key] = s.value);
  const whatsappNumber = settings.whatsapp_number;
  
  const getParsedContent = (key: string, fallback: any) => {
    const item = rawContent.find((c: any) => c.sectionKey === key);
    if (!item) return fallback;
    try { return JSON.parse(item.content); } catch { return fallback; }
  };

  const hero = getParsedContent('hero', {
    eyebrow: 'Banquet Hall',
    heading: 'Premium Banquet Hall in Motihari',
    description: 'Discover premium event packages with a 10,000 sq ft banquet hall, luxury room inventory, dining support, and curated inclusions designed for unforgettable weddings, receptions, and milestone celebrations.',
    bgImage: '/images/hotel-rudra-regency-motihari-luxury-banquet-setup.jpg',
    btnText: 'View Catering',
    btnUrl: '/dining'
  });
  const packagesHeader = getParsedContent('packagesHeader', {
    eyebrow: 'Banquet Packages',
    title: 'Choose the Celebration Style That Fits You',
    description: 'Three premium package tiers designed to match the scale, comfort, and elegance of your event.'
  });
  const venueAtmosphere = getParsedContent('venueAtmosphere', {
    eyebrow: 'Venue Atmosphere',
    description: 'Elegant halls, polished interiors, luxury stay support, and refined hospitality for premium wedding and celebration experiences.',
    image: '/images/hotel-rudra-regency-motihari-elegant-venue-atmosphere.jpg'
  });
  const complimentaryHeader = getParsedContent('complimentaryHeader', {
    eyebrow: 'Complimentary',
    title: 'Included in Every Package'
  });
  const termsHeader = getParsedContent('termsHeader', {
    eyebrow: 'Terms and Conditions',
    title: 'Important Booking Notes'
  });
  const footerCta = getParsedContent('footerCta', {
    title: 'Ready to Host a Grand Event?',
    description: 'Speak with our team to reserve the right banquet package, align dining and room requirements, and plan a celebration with confidence at one of Motihari\'s premium event destinations.',
  });

  const packages = getParsedContent('packages', defaultPackages);
  const complimentaryItems = getParsedContent('complimentaryItems', defaultComplimentaryItems);
  const terms = getParsedContent('terms', defaultTerms);

  return (
    <div className="min-h-screen overflow-hidden bg-neutral-950 text-white">
      <section className="relative min-h-[58vh] overflow-hidden">
        <Image
          src={hero.bgImage}
          alt="Banquet hall hero"
          fill
          className="object-cover opacity-55"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/22" />
        <div className="absolute right-6 top-16 h-24 w-24 rounded-full bg-amber-400/10 blur-3xl sm:right-12 sm:h-28 sm:w-28" />
        <div className="absolute bottom-12 left-4 h-28 w-28 rounded-full bg-yellow-400/10 blur-3xl sm:bottom-16 sm:left-10 sm:h-40 sm:w-40" />

        <div className="relative mx-auto flex min-h-[58vh] max-w-6xl items-center px-4 pb-10 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36">
          <div
            className="animate-fade-in-up max-w-3xl relative z-10"
          >
            <AdminOverlayWrapper isAdmin={isAdmin} sectionKey="hero" label="Hero Section">
              <p
                className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-amber-300 sm:text-sm sm:tracking-[0.38em]"
              >
                {hero.eyebrow}
              </p>
              <h1
                className="mb-5 text-4xl font-bold leading-[1.04] text-balance sm:text-5xl lg:text-6xl"
              >
                <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent">
                  {hero.heading}
                </span>
              </h1>
              <p
                className="max-w-2xl text-base leading-7 text-neutral-300 sm:text-lg sm:leading-8"
              >
                {hero.description}
              </p>
              <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4 relative z-10">
                <a
                  href={hero.btnUrl}
                  target={hero.btnUrl?.endsWith('.pdf') ? "_blank" : undefined}
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition hover:bg-white/10 sm:w-auto sm:px-8 sm:tracking-[0.18em]"
                >
                  {hero.btnText}
                </a>
              </div>
            </AdminOverlayWrapper>
          </div>
        </div>
      </section>

      <AdminOverlayWrapper isAdmin={isAdmin} sectionKey="banquetVideo" label="Banquet Showcase Video">
        <VideoSection 
          src="/videos/banquet.mp4" 
          title="Inside the Grand Banquet Hall" 
          description="See how our 10,000 sq ft venue transforms into the perfect setting for your celebration." 
        />
      </AdminOverlayWrapper>

      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Banquet', href: '/banquet' }]} />

      <main className="relative mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <section
          className="animate-fade-in-up mt-8 rounded-[28px] border border-white/10 bg-neutral-900/80 p-5 shadow-2xl shadow-amber-500/5 backdrop-blur-xl sm:mt-10 sm:rounded-[34px] sm:p-6 md:p-8"
        >
          <div className="mb-8 text-center relative z-10">
            <AdminOverlayWrapper isAdmin={isAdmin} sectionKey="packagesHeader" label="Packages Header">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.35em] text-amber-300">
                {packagesHeader.eyebrow}
              </p>
              <h2 className="text-2xl font-bold md:text-4xl">
                <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent">
                  {packagesHeader.title}
                </span>
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-neutral-400 md:text-base">
                {packagesHeader.description}
              </p>
            </AdminOverlayWrapper>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {packages.map((pkg: any, index: number) => (
              <AdminOverlayWrapper key={pkg.name} isAdmin={isAdmin} sectionKey="packages" label={`Edit Package ${index + 1}`} itemIndex={index}>
              <article
                className={`group animate-fade-in-up relative h-full overflow-hidden rounded-[26px] border ${pkg.border} bg-neutral-950 p-1 shadow-xl shadow-amber-500/5 transition-transform sm:rounded-[30px] ${
                  pkg.featured === "true" ? "ring-1 ring-amber-400/20" : ""
                } relative z-10`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(217,168,50,0.16),_transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex h-full flex-col rounded-[26px] bg-gradient-to-b from-neutral-900 to-neutral-950 px-5 py-6 md:px-6 md:py-7">
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <span className={`inline-flex rounded-full bg-gradient-to-r ${pkg.gradient} px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-black`}>
                      {pkg.badge}
                    </span>
                    {pkg.featured === "true" ? (
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
                    {[pkg.item1, pkg.item2, pkg.item3, pkg.item4, pkg.item5, pkg.item6].filter(Boolean).map((item: string) => (
                      <li key={item} className="flex items-start gap-2 border-b border-white/5 pb-2 last:border-b-0 last:pb-0">
                        <span className="mt-0.5 text-amber-400 text-xs">✦</span>
                        <span className="leading-5">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={createHotelInquiryLink(`the ${pkg.name} banquet package at Hotel Rudra Regency`, ["Event type: Wedding, reception, or celebration", "Location: Motihari"], whatsappNumber) }
                    className={`mt-auto inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] transition ${
                      pkg.featured === "true"
                        ? "bg-gradient-to-r from-amber-400 to-yellow-400 text-black shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40"
                        : "border border-amber-400/30 text-amber-300 hover:bg-amber-400/10"
                    }`}
                  >
                    Enquire Now
                  </Link>
                </div>
              </article>
              </AdminOverlayWrapper>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 sm:mt-10 sm:gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div
            className="animate-fade-in-up h-full overflow-hidden rounded-[34px] border border-white/10 bg-neutral-900/80 shadow-2xl shadow-amber-500/5 backdrop-blur-xl relative z-10"
          >
            <AdminOverlayWrapper isAdmin={isAdmin} sectionKey="venueAtmosphere" label="Venue Atmosphere" className="h-full w-full">
              <div className="relative h-full min-h-[22rem] overflow-hidden lg:min-h-full">
                <Image
                  src={venueAtmosphere.image}
                  alt="Venue atmosphere"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 57vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-amber-300">
                    {venueAtmosphere.eyebrow}
                  </p>
                  <p className="max-w-lg text-lg leading-7 text-neutral-200">
                    {venueAtmosphere.description}
                  </p>
                </div>
              </div>
            </AdminOverlayWrapper>
          </div>

          <div
            className="animate-fade-in-up rounded-[28px] border border-white/10 bg-neutral-900/80 p-5 shadow-2xl shadow-amber-500/5 backdrop-blur-xl sm:rounded-[34px] sm:p-8 relative z-10"
          >
            <div className="relative z-10">
              <AdminOverlayWrapper isAdmin={isAdmin} sectionKey="complimentaryHeader" label="Complimentary Header">
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-amber-300">
                  {complimentaryHeader.eyebrow}
                </p>
                <h3 className="mb-6 text-3xl font-bold text-white">
                  {complimentaryHeader.title}
                </h3>
              </AdminOverlayWrapper>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {complimentaryItems.map((item: any, index: number) => (
                <AdminOverlayWrapper key={index} isAdmin={isAdmin} sectionKey="complimentaryItems" label={`Edit Item ${index + 1}`} itemIndex={index}>
                <div
                  className="animate-fade-in-up rounded-[24px] border border-white/10 bg-neutral-950 px-5 py-5 text-center shadow-lg shadow-amber-500/5 relative z-10 h-full"
                >
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-400/10 text-xl text-amber-300">
                    {item.icon}
                  </div>
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-neutral-100">
                    {item.text}
                  </p>
                </div>
                </AdminOverlayWrapper>
              ))}
            </div>
          </div>
        </section>

        <section
          className="animate-fade-in-up mt-8 rounded-[28px] border border-white/10 bg-neutral-900/80 p-5 shadow-2xl shadow-amber-500/5 backdrop-blur-xl sm:mt-10 sm:rounded-[34px] sm:p-8 md:p-10 relative z-10"
        >
          <div className="mb-8 flex items-center gap-4 relative z-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/10 text-xl text-amber-300">
              !
            </div>
            <AdminOverlayWrapper isAdmin={isAdmin} sectionKey="termsHeader" label="Terms Header">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-amber-300">
                  {termsHeader.eyebrow}
                </p>
                <h3 className="mt-1 text-2xl font-bold text-white">{termsHeader.title}</h3>
              </div>
            </AdminOverlayWrapper>
          </div>

          <ul className="grid gap-4 md:grid-cols-2">
            {terms.map((term: any, index: number) => (
              <AdminOverlayWrapper key={index} isAdmin={isAdmin} sectionKey="terms" label={`Edit Term ${index + 1}`} itemIndex={index}>
              <li
                className="animate-fade-in-up flex items-start gap-3 rounded-[24px] border border-white/8 bg-neutral-950 px-5 py-4 text-neutral-300 relative z-10 h-full"
              >
                <span className="mt-1 text-amber-400">•</span>
                <span className="leading-6">{term.text}</span>
              </li>
              </AdminOverlayWrapper>
            ))}
          </ul>
        </section>

        <section
          className="animate-fade-in-up mt-8 rounded-[30px] border border-white/10 bg-gradient-to-br from-neutral-900 to-black px-5 py-10 text-center shadow-2xl shadow-amber-500/10 sm:mt-10 sm:rounded-[36px] sm:px-8 sm:py-12 relative z-10"
        >
          <AdminOverlayWrapper isAdmin={isAdmin} sectionKey="footerCta" label="Footer CTA">
            <h3 className="text-3xl font-bold text-balance sm:text-4xl md:text-5xl">
              <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent">
                {footerCta.title}
              </span>
            </h3>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-neutral-300 sm:text-lg">
              {footerCta.description}
            </p>
          </AdminOverlayWrapper>
          <div className="mt-8">
            <Link
              href={createHotelInquiryLink("a banquet hall booking at Hotel Rudra Regency", ["Event type: Wedding, reception, or social event", "Location: Motihari"], whatsappNumber) }
              className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-black shadow-lg shadow-amber-500/25 transition hover:scale-[1.03] hover:shadow-amber-500/40 sm:w-auto sm:px-10 sm:tracking-[0.2em]"
            >
              Talk to Our Event Team
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
