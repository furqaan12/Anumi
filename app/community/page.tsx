'use client';

import { useState } from 'react';
import Link from 'next/link';
import localFont from 'next/font/local';

const mabryPro = localFont({
  src: '../../public/fonts/MabryPro-Regular.ttf',
  variable: '--font-mabry-pro',
});

const fontColor = '#F9EAD1';
const noiseBg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

const COMMUNITY_IMAGE = '/desert%20hike%20aesthetic.jpg';
const COMMUNITY_IMAGE_FALLBACK = '/hero-bg.jpeg';

export default function CommunityPage() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [share, setShare] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={`relative min-h-[100dvh] w-full overflow-x-hidden bg-black ${mabryPro.className}`}>
        <div className="pointer-events-none absolute inset-0 z-[1] mix-blend-overlay opacity-20" style={{ backgroundImage: noiseBg }} />
        <div className="absolute left-0 top-8 z-20 flex w-full justify-center">
          <Link href="/" className="text-2xl tracking-[0.2em] uppercase opacity-80" style={{ fontFamily: 'var(--font-booton)', color: fontColor }}>
            anumi
          </Link>
        </div>
        <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col items-center justify-center px-6 pt-24 pb-12">
          <p className="text-center text-xl md:text-2xl" style={{ color: fontColor }}>
            You&apos;ll be added in soon!
          </p>
          <button
            type="button"
            onClick={() => { setSubmitted(false); setShowForm(false); }}
            className="mt-8 text-sm opacity-80 transition-opacity hover:opacity-100"
            style={{ color: fontColor, fontFamily: 'var(--font-mabry-pro)' }}
          >
            ← Back to community page
          </button>
        </div>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className={`relative min-h-[100dvh] w-full overflow-x-hidden bg-black ${mabryPro.className}`}>
        <div className="pointer-events-none absolute inset-0 z-[1] mix-blend-overlay opacity-20" style={{ backgroundImage: noiseBg }} />
        <div className="absolute left-0 top-8 z-20 flex w-full justify-center">
          <Link href="/" className="text-2xl tracking-[0.2em] uppercase opacity-80" style={{ fontFamily: 'var(--font-booton)', color: fontColor }}>
            anumi
          </Link>
        </div>
        <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col items-center px-6 pt-24 pb-12">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-medium tracking-tight md:text-3xl" style={{ color: fontColor }}>
              Join the community
            </h2>
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm opacity-90" style={{ color: fontColor }}>
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-full border border-white/20 bg-white/10 px-6 py-4 text-white placeholder:text-white/50 focus:border-[#ff6e40] focus:bg-white/20 focus:outline-none transition-all"
                  style={{ color: fontColor }}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="whatsapp" className="mb-2 block text-sm opacity-90" style={{ color: fontColor }}>
                  WhatsApp
                </label>
                <input
                  id="whatsapp"
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  required
                  className="w-full rounded-full border border-white/20 bg-white/10 px-6 py-4 text-white placeholder:text-white/50 focus:border-[#ff6e40] focus:bg-white/20 focus:outline-none transition-all"
                  style={{ color: fontColor }}
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label htmlFor="share" className="mb-2 block text-sm opacity-90" style={{ color: fontColor }}>
                  Share anything about yourself
                </label>
                <textarea
                  id="share"
                  value={share}
                  onChange={(e) => setShare(e.target.value)}
                  rows={4}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-6 py-4 text-white placeholder:text-white/50 focus:border-[#ff6e40] focus:bg-white/20 focus:outline-none transition-all resize-none"
                  style={{ color: fontColor }}
                  placeholder="A few words about you..."
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full rounded-full border border-white/10 bg-white/10 px-6 py-4 text-sm font-bold tracking-widest transition-all duration-300 hover:bg-white/20"
                style={{ color: fontColor }}
              >
                Join community
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative min-h-[100dvh] w-full overflow-x-hidden bg-black ${mabryPro.className}`}>
      <div className="pointer-events-none absolute inset-0 z-[1] mix-blend-overlay opacity-20" style={{ backgroundImage: noiseBg }} />

      <div className="relative z-10">
        {/* Full-bleed image with Anumi on top, text + button at bottom left */}
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={COMMUNITY_IMAGE}
            alt="Community"
            className="h-full w-full object-cover"
            onError={(e) => {
              const el = e.currentTarget;
              if (el.src.endsWith(COMMUNITY_IMAGE_FALLBACK)) return;
              el.src = COMMUNITY_IMAGE_FALLBACK;
            }}
          />
          <div className="absolute left-0 top-0 flex w-full justify-center pt-8">
            <Link href="/" className="z-20 text-2xl tracking-[0.2em] uppercase opacity-90" style={{ fontFamily: 'var(--font-booton)', color: fontColor }}>
              anumi
            </Link>
          </div>
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 pt-8 text-left md:pb-12 md:px-10">
            <h1 className="text-2xl font-medium tracking-tight md:text-4xl" style={{ color: fontColor }}>
              The Anumi Community.
            </h1>
            <p className="mt-3 max-w-xl text-lg leading-relaxed opacity-90 md:text-xl" style={{ color: fontColor }}>
              A place where you can be yourself. Nothing more needed. Just authenticity.
            </p>
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="mt-6 rounded-full border border-white/10 bg-white/10 px-8 py-4 text-sm font-bold tracking-widest transition-all duration-300 hover:bg-white/20"
              style={{ color: fontColor }}
            >
              I&apos;m interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
