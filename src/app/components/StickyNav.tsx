'use client';

import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/rooms", label: "Rooms", icon: "🛏️" },
  { href: "/banquet", label: "Banquet", icon: "🎉" },
  { href: "/conference-room", label: "Conference", icon: "🏢" },
  { href: "/dining", label: "Dining", icon: "🍽️" },
  { href: "/contact", label: "Contact", icon: "📞" },
];

export default function StickyNav() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 border-b border-amber-400/12 bg-neutral-950/92 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.28)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center gap-1 lg:gap-0.5">
            <div className="flex h-12 w-34 items-center justify-center overflow-hidden sm:h-13 sm:w-38 lg:h-14 lg:w-40">
              <Image
                src="/images/Logo-removebg-preview.png"
                alt="Hotel Rudra Regency"
                width={512}
                height={512}
                priority
                className="-ml-6 h-24 w-auto max-w-none object-contain lg:-ml-7 lg:h-28"
              />
            </div>
            <div className="hidden lg:flex flex-col justify-center leading-none">
              <span className="text-center text-[0.64rem] font-medium uppercase tracking-[0.28em] text-amber-200">
                Hotel
              </span>
              <span className="mt-1 text-center text-sm font-semibold tracking-[0.12em] text-stone-100">
                Rudra Regency
              </span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center rounded-2xl border border-transparent px-4 py-2 text-sm font-medium text-neutral-300 transition hover:border-amber-400/15 hover:bg-white/[0.04] hover:text-amber-200"
              >
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2 md:hidden">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-transparent px-3 py-2 text-sm text-neutral-300 transition hover:border-amber-400/15 hover:bg-white/[0.04] hover:text-amber-200"
              >
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
