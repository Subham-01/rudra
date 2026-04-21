import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  {
    href: "https://www.facebook.com/hotelrudraregency7",
    label: "Facebook",
    svg: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    color: "text-amber-200"
  },
  {
    href: "https://www.instagram.com/hotel.rudra.regency?igsh=MTUzbmN6dnJ6bGJidA==",
    label: "Instagram",
    svg: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    color: "text-amber-200"
  },
  {
    href: "https://wa.me/918651600015",
    label: "WhatsApp",
    svg: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488",
    color: "text-amber-200"
  },
];

const quickLinks = [
  { label: "Rooms", href: "/rooms" },
  { label: "Dining", href: "/dining" },
  { label: "Banquet Hall", href: "/banquet" },
  { label: "Conference Room", href: "/conference-room" },
  { label: "Contact", href: "/contact" },
];

const supportLinks = [
  { label: "Call Us", href: "tel:+918651600015" },
  { label: "Email Us", href: "mailto:info@rudraregency.com" },
  { label: "WhatsApp", href: "https://wa.me/918651600015" },
];

export default function Footer() {
  return (
    <footer className="border-t border-amber-400/10 bg-[linear-gradient(180deg,rgba(18,18,18,0.98),rgba(8,8,8,1))] text-neutral-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-[1.25fr_0.8fr_0.8fr_1fr]">
          <div className="space-y-5">
            <Link href="/" className="inline-flex h-24 w-48 items-start overflow-hidden sm:h-28 sm:w-56 lg:h-32 lg:w-[15rem]">
              <Image
                src="/images/Logo-removebg-preview.png"
                alt="Hotel Rudra Regency"
                width={512}
                height={512}
                className="-ml-6 -mt-8 h-40 w-auto max-w-none object-contain sm:-ml-8 sm:-mt-10 sm:h-48 lg:-ml-8 lg:-mt-10 lg:h-52"
              />
            </Link>
            <p className="max-w-sm text-sm leading-7 text-neutral-400">
              A premium hospitality destination in Motihari for luxury stays, banquets, dining, and business gatherings.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-amber-400/12 bg-white/[0.03] transition hover:border-amber-300/30 hover:bg-amber-400/10"
                  aria-label={social.label}
                >
                  <svg className={`w-5 h-5 ${social.color}`} viewBox="0 0 24 24" fill="currentColor">
                    <path d={social.svg} />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-lg font-semibold text-amber-100">Quick Links</p>
            <ul className="space-y-3 text-neutral-400">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition-colors hover:text-amber-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-lg font-semibold text-amber-100">Reach Us</p>
            <ul className="space-y-3 text-neutral-400">
              {supportLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition-colors hover:text-amber-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-lg font-semibold text-amber-100">Address</p>
            <div className="space-y-3 text-neutral-400">
              <p className="text-sm leading-7">Chandrahiya, Motihari, Chararhiya, Bihar 845401</p>
              <p className="text-sm leading-7">info@rudraregency.com</p>
              <p className="text-sm leading-7">+91 8651600015 | +91 8581828182</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-amber-400/10 pt-6 text-center text-sm text-neutral-500">
          <p>&copy; 2026 Hotel Rudra Regency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
