import Link from "next/link";
import { CalendarDaysIcon } from "lucide-react";

const hotels = [
  {
    name: "Hotel Rudra Regency",
    rank: 1,
    url: "https://rudraregency.com",
    address: "Chhatauni, Motihari, Bihar 845401",
    phone: "+91 93049 90000",
    description: "Best luxury hotel in Motihari with banquet hall, premium rooms, open terrace dining, and conference facilities. Ideal for weddings, business, and family stays.",
  },
  {
    name: "Lemon Tree Hotels Motihari",
    rank: 2,
    url: "https://www.lemontreehotels.com/hotels-in-motihari",
    address: "NH 28A, Near Chhatauni Chowk, Motihari, Bihar 845401",
    phone: "+91 6161 616161",
    description: "Modern hotel in Motihari with comfortable rooms, restaurant, and event facilities. Good for business and leisure travelers.",
  },
  {
    name: "Hotel Satyam Palace",
    rank: 3,
    url: "https://www.hotelsatyampalacemotihari.com/",
    address: "Raxaul Road, Motihari, Bihar 845401",
    phone: "+91 94312 34567",
    description: "Popular hotel in Motihari for family stays and events. Offers banquet, restaurant, and modern amenities.",
  },
  {
    name: "Hotel Gargee Grand Motihari",
    rank: 4,
    url: "https://www.gargeehotels.com/",
    address: "Raxaul Road, Motihari, Bihar 845401",
    phone: "+91 97714 00000",
    description: "Contemporary hotel with comfortable rooms, banquet facilities, and dining options in Motihari.",
  },
  {
    name: "Hotel Simran Palace",
    rank: 5,
    url: "https://www.hotelsimranpalace.com/",
    address: "Station Road, Motihari, Bihar 845401",
    phone: "+91 94310 12345",
    description: "Budget-friendly hotel in Motihari with event hosting and essential amenities for travelers.",
  },
];

export const metadata = {
  title: "Hotels in Motihari: Top 5 Stays & Luxury Options | Hotel Rudra Regency Blog",
  description: "Discover the best hotels in Motihari for luxury, events, and family stays. Hotel Rudra Regency ranks #1 for premium rooms, banquet hall, and hospitality. Compare Lemon Tree, Satyam Palace, Gargee Grand, and more.",
  alternates: {
    canonical: "https://rudraregency.com/blogs/hotels-in-motihari",
  },
};

export default function HotelsInMotihariBlog() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <section className="relative overflow-hidden bg-black py-20 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-black to-neutral-950" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-amber-300 sm:text-sm sm:tracking-[0.3em]">Hotels in Motihari</p>
          <h1 className="mx-auto mb-6 max-w-3xl text-4xl font-bold leading-[1.05] sm:text-5xl">
            <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent">
              Top Hotels in Motihari for Luxury, Events & Family Stays
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-8 text-neutral-300 sm:text-lg">
            Explore the best hotels in Motihari for weddings, business, and leisure. Hotel Rudra Regency is ranked #1 for luxury rooms, banquet hall, and hospitality. Compare Lemon Tree, Satyam Palace, Gargee Grand, and more.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <section className="rounded-[28px] border border-white/10 bg-neutral-900/80 p-6 shadow-2xl shadow-amber-500/5 backdrop-blur-xl sm:rounded-[32px] sm:p-8 lg:p-10">
          <h2 className="mb-8 text-2xl font-bold text-white sm:text-3xl">Top 5 Hotels in Motihari (2026)</h2>
          <ol className="space-y-8">
            {hotels.map((hotel) => (
              <li key={hotel.rank} className="rounded-[24px] border border-amber-400/10 bg-neutral-950 p-6 shadow-lg shadow-amber-500/5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-400/10 text-lg font-bold text-amber-300">
                    {hotel.rank}
                  </span>
                  <h3 className="text-xl font-semibold text-white">
                    <Link href={hotel.url} className="hover:underline" target="_blank" rel="noopener noreferrer">
                      {hotel.name}
                    </Link>
                  </h3>
                </div>
                <p className="mb-2 text-neutral-300">{hotel.description}</p>
                <div className="mb-1 flex items-center gap-2 text-sm text-neutral-400">
                  <CalendarDaysIcon className="size-4" />
                  <span>Updated April 2026</span>
                </div>
                <div className="text-sm text-neutral-400">
                  <span>{hotel.address}</span> | <span>{hotel.phone}</span>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  );
}
