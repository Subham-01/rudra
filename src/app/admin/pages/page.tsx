'use client';

import { Home, Info, Utensils, Bed, Phone, Calendar, BookOpen, ExternalLink, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const pages = [
  { key: 'home', name: 'Home', path: '/', icon: Home, description: 'Main landing page showcasing the hotel overview.' },
  { key: 'about', name: 'About Us', path: '/about', icon: Info, description: 'Learn more about the heritage and values of Hotel Rudra Regency.' },
  { key: 'rooms', name: 'Rooms', path: '/rooms', icon: Bed, description: 'Browse available luxury rooms, suites, and amenities.' },
  { key: 'dining', name: 'Dining', path: '/dining', icon: Utensils, description: 'Explore our restaurant menus and dining experiences.' },
  { key: 'banquet', name: 'Banquet', path: '/banquet', icon: Calendar, description: 'Event, wedding, and banquet hall booking details.' },
  { key: 'conference', name: 'Conference', path: '/conference-room', icon: Calendar, description: 'Business meetings and corporate conference rooms.' },
  { key: 'blogs', name: 'Blogs', path: '/blogs', icon: BookOpen, description: 'Read latest articles, SEO content, and hotel updates.' },
  { key: 'contact', name: 'Contact', path: '/contact', icon: Phone, description: 'Contact form, map location, and direct inquiry details.' },
  { key: 'feedback', name: 'Feedback', path: '/feedback', icon: MessageSquare, description: 'Manage guest reviews and platform logo links.' },
];

export default function PagesDashboard() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <div className="mb-8 border-b pb-6">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Website Pages</h2>
        <p className="text-gray-500 mt-2 text-lg">Click on any page below to view its live preview on the website.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {pages.map((page) => {
          const Icon = page.icon;
          return (
            <Link key={page.path} href={page.key === 'blogs' ? '/admin/blogs' : `/admin/pages/${page.key}`}>
              <div className="group relative bg-[#0a0a0a] rounded-2xl overflow-hidden border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] h-full flex flex-col">
                
                {/* Top right icon */}
                <div className="absolute top-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-0 translate-x-2">
                  <ExternalLink className="w-5 h-5 text-[#D4AF37]" />
                </div>
                
                {/* Main Card Content */}
                <div className="p-10 flex flex-col items-center text-center space-y-6 flex-1">
                  <div className="w-20 h-20 rounded-full bg-[#1a1a1a] border border-[#D4AF37]/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#D4AF37]/10 transition-all duration-500 shadow-inner">
                    <Icon className="w-8 h-8 text-[#D4AF37]" strokeWidth={1.5} />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-widest uppercase mb-4">{page.name}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed font-light">{page.description}</p>
                  </div>
                </div>

                {/* Footer URL display */}
                <div className="mt-auto border-t border-white/10 bg-[#111] p-5 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37]/70 font-semibold">Live URL</span>
                  <span className="text-xs text-white/70 font-mono tracking-wider bg-black/50 px-3 py-1.5 rounded border border-white/5">{page.path}</span>
                </div>
                
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
