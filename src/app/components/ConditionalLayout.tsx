'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import StickyNav from './StickyNav';
import Footer from './Footer';
import dynamic from 'next/dynamic';

const ChatWidget = dynamic(() => import('@/components/chat/ChatWidget'), { ssr: false });

function LayoutContent({ 
  children,
  settings = {},
  footerData = {}
}: { 
  children: React.ReactNode,
  settings?: Record<string, string>,
  footerData?: Record<string, any>
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isAdmin = pathname?.startsWith('/admin') || false;
  const isEditMode = searchParams?.get('editMode') === 'true' && searchParams?.get('editingPage') === 'footer';

  return (
    <>
      {!isAdmin && <StickyNav settings={settings} />}
      <main className="flex-1">{children}</main>
      {!isAdmin && (
        <>
          <Footer settings={settings} footerData={footerData} isEditMode={isEditMode} />
          <ChatWidget />
        </>
      )}
    </>
  );
}

export default function ConditionalLayout(props: {
  children: React.ReactNode,
  settings?: Record<string, string>,
  footerData?: Record<string, any>
}) {
  return (
    <Suspense fallback={
      <>
        <StickyNav settings={props.settings} />
        <main className="flex-1">{props.children}</main>
        <Footer settings={props.settings} footerData={props.footerData} isEditMode={false} />
      </>
    }>
      <LayoutContent {...props} />
    </Suspense>
  );
}
