import Link from "next/link";
import { ArrowRightIcon, CalendarDaysIcon, NewspaperIcon } from "lucide-react";

const featuredPosts = [
  {
    title: "How to Choose the Right Banquet Hall in Motihari for Weddings and Receptions",
    excerpt: "A practical guide to selecting the right venue based on guest count, ambience, hospitality support, and event flow.",
    category: "Events",
  },
  {
    title: "What Makes a Premium Hotel Stay Feel Truly Comfortable",
    excerpt: "From room design and hospitality to dining access and service quality, the small details define a better stay experience.",
    category: "Stay",
  },
  {
    title: "Planning Business Meetings with Dining and Stay Support in One Venue",
    excerpt: "Why integrated meeting spaces, guest rooms, and restaurant access can simplify corporate planning in Motihari.",
    category: "Business",
  },
];

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <section className="relative overflow-hidden bg-black py-24 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-black to-neutral-950" />
        <div className="absolute right-6 top-16 h-20 w-20 rounded-full bg-amber-400/10 blur-2xl sm:right-10 sm:h-24 sm:w-24" />
        <div className="absolute bottom-12 left-4 h-28 w-28 rounded-full bg-yellow-400/10 blur-3xl sm:bottom-16 sm:left-10 sm:h-36 sm:w-36" />
        <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-amber-300 sm:text-sm sm:tracking-[0.3em]">Blogs</p>
          <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-bold leading-[1.05] sm:text-5xl">
            <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent">
              Hospitality insights, stay ideas, and event planning guidance
            </span>
          </h1>
          <p className="mx-auto max-w-3xl text-base leading-8 text-neutral-300 sm:text-lg">
            Explore useful articles around premium stays, banquet planning, dining experiences, and business hospitality at Hotel Rudra Regency.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <section className="rounded-[28px] border border-white/10 bg-neutral-900/80 p-6 shadow-2xl shadow-amber-500/5 backdrop-blur-xl sm:rounded-[32px] sm:p-8 lg:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-neutral-500">Latest Articles</p>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">Content shaped around real guest needs</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/15 bg-amber-400/10 px-4 py-2 text-sm text-amber-200">
              <NewspaperIcon className="size-4" />
              <span>Fresh editorial space for future updates</span>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3 sm:mt-12 sm:gap-8">
          {featuredPosts.map((post, index) => (
            <article key={post.title} className="rounded-[28px] border border-white/10 bg-neutral-900/80 p-5 shadow-2xl shadow-amber-500/5 backdrop-blur-xl sm:rounded-[32px] sm:p-8">
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="inline-flex rounded-full border border-amber-300/20 bg-amber-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-amber-200">
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-neutral-500">
                  <CalendarDaysIcon className="size-4" />
                  <span>Article {index + 1}</span>
                </span>
              </div>
              <h3 className="mb-4 text-2xl font-semibold text-white">{post.title}</h3>
              <p className="text-base leading-8 text-neutral-400">{post.excerpt}</p>
              <Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-amber-200 transition hover:text-amber-100">
                Enquire with our team
                <ArrowRightIcon className="size-4" />
              </Link>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-[28px] border border-white/10 bg-gradient-to-r from-neutral-900 to-black p-6 text-center shadow-2xl shadow-amber-500/5 sm:mt-12 sm:rounded-[32px] sm:p-10">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Need help planning a stay, dining visit, or event?</h2>
          <p className="mx-auto max-w-3xl text-base leading-8 text-neutral-300 sm:text-lg">
            Use these insights as a starting point, then connect with the Hotel Rudra Regency team for direct support and availability.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/banquet" className="inline-flex items-center justify-center rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-amber-200">
              Explore Banquet
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