'use client';

import { ReactNode } from 'react';

export default function AdminOverlayWrapper({
  children,
  sectionKey,
  label,
  isAdmin = false,
  itemIndex,
  className = "",
}: {
  children: ReactNode;
  sectionKey: string;
  label: string;
  isAdmin?: boolean;
  itemIndex?: number;
  className?: string;
}) {
  if (!isAdmin) {
    return <>{children}</>;
  }

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Send message to parent window (Admin Dashboard)
    if (typeof window !== 'undefined' && window.parent) {
      window.parent.postMessage({ type: 'OPEN_EDIT_SECTION', sectionKey, itemIndex }, '*');
    }
  };

  return (
    <div className={`relative group overflow-hidden ${className}`}>
      {children}
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity border-2 border-dashed border-[#D4AF37]">
        <button
          onClick={handleEditClick}
          className="bg-[#D4AF37] text-black px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2 hover:bg-[#c4a133] hover:scale-105 transition transform"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Edit {label} Section
        </button>
      </div>
    </div>
  );
}
