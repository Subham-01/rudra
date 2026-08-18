'use client';

import { useState } from 'react';

export default function EditableText({
  value,
  sectionKey,
  field,
  index = null,
  isAdmin = false,
  as: Tag = 'span',
  className = '',
}: {
  value: string;
  sectionKey: string;
  field: string;
  index?: number | null;
  isAdmin?: boolean;
  as?: any;
  className?: string;
}) {
  if (!isAdmin) return <Tag className={className}>{value}</Tag>;

  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      className={`outline-none hover:ring-2 hover:ring-amber-400/50 transition-all cursor-text rounded-sm ${className}`}
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        const newValue = e.currentTarget.textContent || '';
        if (newValue !== value && typeof window !== 'undefined' && window.parent) {
          window.parent.postMessage({
            type: 'INLINE_EDIT',
            sectionKey,
            index,
            field,
            value: newValue
          }, '*');
        }
      }}
    >
      {value}
    </Tag>
  );
}
