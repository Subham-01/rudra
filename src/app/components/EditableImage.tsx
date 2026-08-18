'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';

export default function EditableImage({
  src,
  alt,
  sectionKey,
  field,
  index = null,
  isAdmin = false,
  className = '',
  fill = false,
  width,
  height,
  sizes,
  priority = false
}: {
  src: string;
  alt: string;
  sectionKey: string;
  field: string;
  index?: number | null;
  isAdmin?: boolean;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
}) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      if (res.ok) {
        const data = await res.json();
        if (typeof window !== 'undefined' && window.parent) {
          window.parent.postMessage({
            type: 'INLINE_EDIT',
            sectionKey,
            index,
            field,
            value: data.url
          }, '*');
        }
      } else {
        alert('Upload failed');
      }
    } catch (err) {
      alert('Upload error');
    } finally {
      setIsUploading(false);
    }
  };

  const imgProps: any = { src, alt, className, sizes, priority };
  if (fill) imgProps.fill = true;
  else {
    imgProps.width = width;
    imgProps.height = height;
  }

  if (!isAdmin) {
    return <Image {...imgProps} />;
  }

  return (
    <div className={`relative group inline-block ${fill ? 'w-full h-full' : ''} ${className}`}>
      <Image {...imgProps} className={`${fill ? 'object-cover' : ''} ${className}`} />
      
      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-50">
        <label className="cursor-pointer flex flex-col items-center justify-center text-white p-4 rounded-xl hover:bg-white/10 transition">
          {isUploading ? (
            <>
              <Loader2 className="w-8 h-8 animate-spin text-amber-400 mb-2" />
              <span className="text-sm font-bold">Uploading...</span>
            </>
          ) : (
            <>
              <Upload className="w-8 h-8 text-amber-400 mb-2" />
              <span className="text-sm font-bold">Replace Image</span>
            </>
          )}
          <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={isUploading} />
        </label>
      </div>
    </div>
  );
}
