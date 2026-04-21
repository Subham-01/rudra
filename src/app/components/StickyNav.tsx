'use client';

import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/banquet", label: "Banquet" },
  { href: "/conference-room", label: "Conference" },
  { href: "/dining", label: "Dining" },
  { href: "/contact", label: "Contact" },
];

export default function StickyNav() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 border-b border-amber-400/12 bg-neutral-950/92 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.28)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="py-3">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="inline-flex min-w-0 items-center gap-2">
              <div className="flex h-11 w-28 items-center justify-center overflow-hidden sm:h-12 sm:w-32 lg:h-14 lg:w-40">
              <Image
                src="/images/Logo-removebg-preview.png"
                alt="Hotel Rudra Regency"
                width={512}
                height={512}
                priority
                className="-ml-4 h-20 w-auto max-w-none object-contain sm:-ml-5 sm:h-22 lg:-ml-7 lg:h-28"
              />
              </div>
              <div className="min-w-0">
                <p className="text-[0.6rem] font-medium uppercase tracking-[0.32em] text-amber-200 sm:text-[0.64rem]">
                  Hotel
                </p>
                <p className="mt-1 truncate text-sm font-semibold tracking-[0.12em] text-stone-100 sm:text-base">
                  Rudra Regency
                </p>
              </div>
            </Link>

            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-black shadow-lg shadow-amber-500/20 sm:px-5"
            >
              Book Now
            </Link>
          </div>

          <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1 md:mx-0 md:mt-4 md:flex-wrap md:justify-center md:overflow-visible md:px-0 md:pb-0">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex shrink-0 items-center rounded-full border border-white/8 bg-white/[0.03] px-4 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-neutral-300 transition hover:border-amber-400/15 hover:bg-white/[0.05] hover:text-amber-200 sm:text-sm md:px-5"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
