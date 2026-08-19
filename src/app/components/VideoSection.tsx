'use client';

import { useEffect, useRef, useState } from 'react';

interface VideoSectionProps {
  src: string;
  title?: string;
  description?: string;
}

export default function VideoSection({ src, title, description }: VideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Attempt to play on mount (standard for background videos)
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          await videoRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.warn("Autoplay was prevented or video failed to load:", error);
          setIsPlaying(false);
        }
      }
    };
    playVideo();
  }, [src]);

  return (
    <section className="bg-neutral-950 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(title || description) && (
          <div className="mb-10 text-center animate-fade-in-up">
            {title && <h2 className="text-3xl font-bold text-white md:text-4xl">{title}</h2>}
            {description && <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-neutral-400">{description}</p>}
          </div>
        )}
        
        <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-[28px] sm:rounded-[36px] border border-white/10 bg-neutral-900/50 shadow-2xl shadow-amber-500/10">
          {/* Subtle glow behind the video player */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-yellow-500/5 blur-xl pointer-events-none" />
          
          <div className="relative aspect-video w-full bg-black">
            <video
              ref={videoRef}
              src={src}
              className="h-full w-full object-cover"
              loop
              muted
              playsInline
              controls={!isPlaying} // Show controls if autoplay fails or user pauses
              onError={() => setHasError(true)}
              onClick={(e) => {
                const video = e.currentTarget;
                if (video.paused) {
                  video.play();
                  setIsPlaying(true);
                } else {
                  video.pause();
                  setIsPlaying(false);
                }
              }}
            />

            {/* Error State / Placeholder when video is missing */}
            {hasError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900 p-6 text-center">
                <svg className="mb-4 h-12 w-12 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-widest">Video Not Uploaded Yet</p>
                <p className="mt-2 text-xs text-neutral-500">Waiting for {src} to be added to the server.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
