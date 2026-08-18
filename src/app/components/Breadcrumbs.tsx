'use client';

import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import Script from "next/script";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `https://rudraregency.com${item.href}`,
    })),
  };

  return (
    <>
      <Script
        id={`breadcrumb-${items[items.length - 1]?.label}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="mx-auto flex max-w-7xl px-4 py-4 sm:px-6 lg:px-8 mt-[72px]">
        <ol className="flex items-center space-x-2 text-sm text-neutral-400">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && <ChevronRightIcon className="mx-1 h-4 w-4 text-neutral-600" />}
              {index === items.length - 1 ? (
                <span className="text-amber-300 font-medium" aria-current="page">{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-white transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
