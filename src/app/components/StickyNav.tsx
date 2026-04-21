'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MenuIcon,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { createHotelInquiryLink } from "@/lib/whatsapp";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/banquet", label: "Banquet" },
  { href: "/conference-room", label: "Conference" },
  { href: "/dining", label: "Dining" },
  { href: "/contact", label: "Contact" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function StickyNav() {
  const pathname = usePathname();
  const bookingHref = createHotelInquiryLink("a stay at Hotel Rudra Regency in Motihari");
  const primaryActionClass = cn(
    buttonVariants({ size: "lg" }),
    "rounded-full border border-amber-300/20 bg-amber-300 px-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-950 hover:bg-amber-200"
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-black/40 via-black/20 to-transparent">
      <div className="mx-auto max-w-7xl px-4 pt-2 sm:px-6 sm:pt-3 lg:px-8">
        <div className="rounded-[20px] border border-white/10 bg-neutral-950/92 p-1 backdrop-blur-xl">
          <nav className="flex items-center gap-3 px-1 py-0.5 sm:px-2">
            <Link href="/" className="inline-flex shrink-0 items-center rounded-[18px] px-0.5 py-0.5">
              <div className="flex h-14 w-40 items-center justify-center overflow-hidden sm:h-[4.25rem] sm:w-52 lg:h-20 lg:w-64">
                <Image
                  src="/images/Logo-removebg-preview.png"
                  alt="Hotel Rudra Regency"
                  width={512}
                  height={512}
                  priority
                  className="-ml-5 -mt-1 h-32 w-auto max-w-none object-contain sm:-ml-7 sm:-mt-1.5 sm:h-40 lg:-ml-9 lg:-mt-2 lg:h-48"
                />
              </div>
            </Link>

            <div className="hidden lg:flex lg:flex-1 lg:justify-center">
              <div className="flex items-center gap-1 rounded-full border border-white/8 bg-white/[0.02] p-1.5">
                {navItems.map((item) => {
                  const isActive = isActivePath(pathname, item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "rounded-full px-4 py-2.5 text-sm font-medium text-neutral-300 transition hover:bg-white/[0.05] hover:text-white",
                        isActive && "bg-white/[0.06] text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="ml-auto hidden md:flex">
              <Link
                href={bookingHref}
                className={primaryActionClass}
              >
                Book Now
              </Link>
            </div>

            <div className="ml-auto flex items-center gap-2 md:hidden">
              <Link
                href={bookingHref}
                className={cn(buttonVariants({ size: "sm" }), "rounded-full border border-amber-300/20 bg-amber-300 px-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-950 hover:bg-amber-200")}
              >
                Book
              </Link>

              <Sheet>
                <SheetTrigger
                  render={
                    <button
                      type="button"
                      className={cn(
                        buttonVariants({ variant: "outline", size: "icon-lg" }),
                        "rounded-2xl border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]"
                      )}
                    />
                  }
                >
                  <MenuIcon className="size-5" />
                  <span className="sr-only">Open navigation</span>
                </SheetTrigger>
                <SheetContent side="right" className="w-[88vw] max-w-sm border-white/10 bg-neutral-950 text-white">
                  <SheetHeader className="px-5 pb-2 pt-5 text-left">
                    <SheetTitle className="text-lg font-semibold text-white">Hotel Rudra Regency</SheetTitle>
                    <SheetDescription className="text-neutral-400">
                      Luxury stay, dining, celebrations, and business hospitality in Motihari.
                    </SheetDescription>
                  </SheetHeader>

                  <div className="px-5 pb-5">
                    <Separator className="my-5 bg-white/10" />

                    <div className="space-y-2">
                      {navItems.map((item) => {
                        const isActive = isActivePath(pathname, item.href);

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                              "flex items-center rounded-[18px] border border-white/8 bg-white/[0.02] px-4 py-4 text-sm font-medium text-neutral-200 transition hover:bg-white/[0.05]",
                              isActive && "bg-white/[0.06] text-white"
                            )}
                          >
                            <span>{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>

                    <Link href={bookingHref} className={cn(primaryActionClass, "mt-5 flex justify-center")}>Book Direct</Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </nav>

          <div className="hidden items-center justify-between rounded-[18px] border border-white/8 bg-white/[0.03] px-3 py-1.5 md:flex lg:hidden">
            <div className="flex flex-wrap items-center gap-2">
              {navItems.map((item) => {
                const isActive = isActivePath(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-full px-3 py-2 text-xs font-medium uppercase tracking-[0.14em] text-neutral-300 transition hover:bg-white/[0.05] hover:text-white",
                      isActive && "bg-amber-300/10 text-amber-100"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
