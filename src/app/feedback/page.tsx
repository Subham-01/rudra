import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import connectToDatabase from "@/lib/db";
import { PageContent } from "@/lib/models";
import AdminOverlayWrapper from "@/app/components/AdminOverlayWrapper";

export const metadata: Metadata = {
  title: "Guest Feedback & Reviews | Hotel Rudra Regency",
  description: "Share your experience or read what other guests are saying about their stay, dining, and events at Hotel Rudra Regency.",
};

export const dynamic = 'force-dynamic';

const defaultHeader = {
  eyebrow: 'Guest Experience',
  heading: 'Reviews & Feedback',
  subtitle: 'How was your experience?',
  description: 'Your feedback helps us continuously improve our services and hospitality. If you enjoyed your stay, dining, or event with us, we would be incredibly grateful if you could take a moment to leave a review on your preferred platform.'
};

const defaultPlatforms = [
  {
    name: "Google",
    url: "#",
    logo: "/images/google-review.png",
    description: "Share your experience with us on Google Reviews.",
  },
  {
    name: "TripAdvisor",
    url: "#",
    logo: "/images/tripadvisor.png",
    description: "Rate your stay and dining experience on TripAdvisor.",
  },
  {
    name: "MakeMyTrip",
    url: "#",
    logo: "/images/makemytrip.png",
    description: "Booked through MMT? Let others know how we did.",
  },
  {
    name: "Goibibo",
    url: "#",
    logo: "/images/goibibo.png",
    description: "Share your honest feedback on Goibibo.",
  },
  {
    name: "Agoda",
    url: "#",
    logo: "/images/agoda.png",
    description: "Leave a review for your booking on Agoda.",
  },
  {
    name: "JustDial",
    url: "#",
    logo: "/images/justdial.png",
    description: "Rate our local hospitality on JustDial.",
  }
];

export default async function FeedbackPage(props: { searchParams: Promise<{ editMode?: string }> }) {
  const searchParams = await props.searchParams;
  const isAdmin = searchParams?.editMode === 'true';

  let rawContent: any[] = [];
  try {
    await connectToDatabase();
    rawContent = await PageContent.find({ pageKey: 'feedback' }).lean();
  } catch (error) {
    console.error("Database connection failed in FeedbackPage:", error);
  }

  const getParsedContent = (key: string, fallback: any) => {
    const item = rawContent.find((c: any) => c.sectionKey === key);
    if (!item) return fallback;
    try { return JSON.parse(item.content); } catch { return fallback; }
  };

  const header = getParsedContent('header', defaultHeader);
  const platforms = getParsedContent('platforms', defaultPlatforms);

  return (
    <div className="min-h-screen bg-neutral-950 text-white pb-24">
      <AdminOverlayWrapper isAdmin={isAdmin} sectionKey="header" label="Header Section">
        <section className="relative flex min-h-[35vh] items-end overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black" />
          <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-yellow-300/10 blur-3xl" />
          <div className="relative mx-auto w-full max-w-6xl px-4 pb-10 text-center sm:px-6 sm:pb-12 lg:px-8">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-amber-300">
              {header.eyebrow}
            </p>
            <h1 className="mx-auto max-w-4xl text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-5xl">
              <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent">
                {header.heading}
              </span>
            </h1>
          </div>
        </section>
      </AdminOverlayWrapper>

      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Feedback', href: '/feedback' }]} />

      <main className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-16 lg:px-8">
        <AdminOverlayWrapper isAdmin={isAdmin} sectionKey="header" label="Edit Subtitle & Description">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-white mb-4">{header.subtitle}</h2>
            <p className="text-neutral-400 text-base leading-relaxed">
              {header.description}
            </p>
          </div>
        </AdminOverlayWrapper>

        <AdminOverlayWrapper isAdmin={isAdmin} sectionKey="platforms" label="Review Platforms">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {platforms.map((platform: any) => (
              <Link 
                key={platform.name}
                href={platform.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center text-center rounded-[28px] border border-white/10 bg-neutral-900/50 p-8 shadow-xl shadow-amber-500/5 backdrop-blur-xl transition hover:bg-neutral-900 hover:border-amber-500/30"
              >
                <div className="relative h-20 w-48 mb-6 overflow-hidden flex items-center justify-center">
                  <Image
                    src={platform.logo || "/images/placeholder.png"}
                    alt={`${platform.name || 'Platform'} logo`}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 200px"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-300 transition-colors">
                  Review us on {platform.name || ''}
                </h3>
                <p className="text-sm text-neutral-400">
                  {platform.description}
                </p>
              </Link>
            ))}
          </div>
        </AdminOverlayWrapper>
      </main>
    </div>
  );
}
