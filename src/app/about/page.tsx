import Link from "next/link";
import Image from "next/image";
import { CheckCircle2Icon, HeartHandshakeIcon, HotelIcon, SparklesIcon } from "lucide-react";

const pillars = [
  {
    title: "Refined Hospitality",
    text: "Every guest experience is shaped around attentive service, calm interiors, and practical comfort for stays, events, and dining.",
    icon: HeartHandshakeIcon,
  },
  {
    title: "All-in-One Destination",
    text: "Hotel Rudra Regency brings together premium rooms, banquet hosting, dining spaces, and business-ready facilities in one address.",
    icon: HotelIcon,
  },
  {
    title: "Premium Experience",
    text: "From family visits to celebrations and business gatherings, the hotel is designed to feel polished, warm, and easy to rely on.",
    icon: SparklesIcon,
  },
];

const highlights = [
  "Luxury rooms for family, leisure, and business stays",
  "Banquet spaces for weddings, receptions, and celebrations",
  "Restaurant and open terrace dining experiences",
  "Conference-ready hospitality with premium support",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-black">
        <Image
          src="/images/_Facebook Cover.png"
          alt="Hotel Rudra Regency — About Us"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-6 text-center sm:px-6 sm:pb-8 lg:px-8 lg:pb-10">
          <h1 className="mx-auto max-w-4xl text-2xl font-bold leading-[1.1] sm:text-3xl lg:text-4xl">
            <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent">
              Stay, Dine, Meet &amp; Celebrate — All Under One Roof
            </span>
          </h1>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <div className="rounded-[28px] border border-white/10 bg-neutral-900/80 p-5 shadow-2xl shadow-amber-500/5 backdrop-blur-xl sm:rounded-[32px] sm:p-8 lg:p-10">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-500">Our Story</p>
            <h2 className="mb-5 text-3xl font-bold text-white sm:text-4xl">Designed to host every kind of guest journey</h2>
            <p className="text-base leading-8 text-neutral-400">
              Whether guests arrive for a premium stay, a wedding function, a family dinner, or a business gathering, Hotel Rudra Regency is structured to make the experience smooth, polished, and memorable. The space, service, and atmosphere are all shaped around dependable hospitality with a luxury edge.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-neutral-900/80 p-5 shadow-2xl shadow-amber-500/5 backdrop-blur-xl sm:rounded-[32px] sm:p-8 lg:p-10">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-500">What We Offer</p>
            <div className="space-y-4">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[22px] border border-white/10 bg-neutral-950/80 px-4 py-4">
                  <CheckCircle2Icon className="mt-0.5 size-5 shrink-0 text-amber-300" />
                  <p className="text-sm leading-7 text-neutral-300 sm:text-base">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3 sm:mt-12 sm:gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <article key={pillar.title} className="rounded-[28px] border border-white/10 bg-neutral-900/80 p-5 shadow-2xl shadow-amber-500/5 backdrop-blur-xl sm:rounded-[32px] sm:p-8">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-300">
                  <Icon className="size-5" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-white">{pillar.title}</h3>
                <p className="text-base leading-8 text-neutral-400">{pillar.text}</p>
              </article>
            );
          })}
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] sm:mt-12 sm:gap-8">
          <div className="rounded-[28px] border border-white/10 bg-neutral-900/80 p-6 shadow-2xl shadow-amber-500/5 backdrop-blur-xl sm:rounded-[32px] sm:p-8">
            <div className="overflow-hidden rounded-[24px] border border-amber-300/15 bg-neutral-950/80">
              <div className="relative min-h-[280px] sm:min-h-[360px]">
                <Image
                  src="/images/director's image .jpeg"
                  alt="Director of Hotel Rudra Regency"
                  fill
                  sizes="(min-width: 1024px) 28vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="pt-5 text-center sm:pt-6">
              <p className="text-xl font-semibold text-white">Lav Kumar Singh (Sonu Singh)</p>
              <p className="mt-1 text-sm uppercase tracking-[0.2em] text-amber-300">Managing Director</p>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-neutral-900/80 p-6 shadow-2xl shadow-amber-500/5 backdrop-blur-xl sm:rounded-[32px] sm:p-8 lg:p-10">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-amber-300">A Message from the Director</p>
            <h2 className="mb-5 text-3xl font-bold text-white sm:text-4xl">Creating memorable hospitality at Hotel Rudra Regency</h2>
            <div className="space-y-5 text-base leading-8 text-neutral-300 sm:text-lg">
              <p>
                At Hotel Rudra Regency, our vision is to offer more than a stay or a meal. We work to create warm, memorable hospitality through comfortable spaces, attentive service, and experiences that guests value long after they leave.
              </p>
              <p>
                From luxury rooms and banquet celebrations to Flavoresca dining and business visits, every detail is guided by comfort, care, and quality. It is our privilege to host you, and we remain committed to making every visit to Hotel Rudra Regency feel effortless, refined, and welcoming.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-[28px] border border-white/10 bg-gradient-to-r from-neutral-900 to-black p-6 text-center shadow-2xl shadow-amber-500/5 sm:mt-12 sm:rounded-[32px] sm:p-10">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Plan your stay or event with one hospitality team</h2>
          <p className="mx-auto max-w-3xl text-base leading-8 text-neutral-300 sm:text-lg">
            Explore rooms, banquet spaces, dining experiences, and contact options to plan a refined guest experience at Hotel Rudra Regency.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/rooms" className="inline-flex items-center justify-center rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-amber-200">
              Explore Rooms
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-amber-300/30 bg-transparent px-6 py-3 text-sm font-semibold text-amber-200 transition hover:bg-amber-300/10">
              Contact Us
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}