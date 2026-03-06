'use client';

import Link from 'next/link';
import localFont from 'next/font/local';
import { SESSIONS } from '@/lib/sessions';
import type { Session } from '@/lib/booking-types';
import { ScienceInfoTooltip } from './science-info-tooltip';

const mabryPro = localFont({
  src: '../../public/fonts/MabryPro-Regular.ttf',
  variable: '--font-mabry-pro',
});

const fontColor = '#F9EAD1';
const noiseBg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

function SessionCard({ session }: { session: Session }) {
  return (
    <div className="flex flex-col">
      <div
        className="group relative rounded-lg border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:bg-white/[0.08]"
        style={{ fontFamily: 'var(--font-mabry-pro)' }}
      >
        {session.scienceExplanation && session.scienceResearchTitle && session.scienceResearchUrl && (
          <div className="absolute right-4 top-4">
            <ScienceInfoTooltip
              explanation={session.scienceExplanation}
              researchTitle={session.scienceResearchTitle}
              researchUrl={session.scienceResearchUrl}
            />
          </div>
        )}
        <p className="text-sm font-medium tracking-wide opacity-80" style={{ color: fontColor }}>
          {session.day}, {session.time} IST
        </p>
        <h3 className="mt-2 text-xl font-medium tracking-tight md:text-2xl" style={{ color: fontColor }}>
          {session.name}
        </h3>
        <p className="mt-1 text-sm opacity-80" style={{ color: fontColor }}>
          With {session.practitioner}
        </p>
        <p className="mt-3 text-base leading-relaxed opacity-90" style={{ color: fontColor }}>
          {session.description}
        </p>
        <Link
          href={`/book/${session.id}`}
          className="mt-6 flex w-full items-center justify-center rounded-full border border-white/10 bg-white/10 px-6 py-4 text-sm font-bold tracking-widest transition-all duration-300 hover:bg-white/20"
          style={{ color: fontColor }}
        >
          Book This Session
        </Link>
      </div>
      {session.spotsRemaining != null && session.spotsTotal != null && (
        <p className="mt-2 text-center text-xs italic opacity-80" style={{ color: fontColor, fontFamily: 'var(--font-mabry-pro)' }}>
          {session.spotsRemaining} of {session.spotsTotal} spots remaining
        </p>
      )}
    </div>
  );
}

export default function BookPage() {
  return (
    <div className={`relative min-h-[100dvh] w-full overflow-x-hidden bg-black ${mabryPro.className}`}>
      <div
        className="pointer-events-none absolute inset-0 z-[1] mix-blend-overlay opacity-20"
        style={{ backgroundImage: noiseBg }}
      />

      <div className="absolute left-0 top-8 z-20 flex w-full justify-center">
        <Link
          href="/"
          className="text-2xl tracking-[0.2em] uppercase opacity-80"
          style={{ fontFamily: 'var(--font-booton)', color: fontColor }}
        >
          anumi
        </Link>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col items-center justify-start px-6 pt-24 pb-12 md:justify-center md:py-32">
        <div className="w-full max-w-5xl">
          <h1
            className="text-2xl leading-[1.1] tracking-tight md:text-3xl lg:text-5xl xl:text-6xl"
            style={{ color: fontColor }}
          >
            Welcome to Anumi
          </h1>
          <p
            className="mt-6 text-xl leading-relaxed md:text-2xl"
            style={{ color: fontColor }}
          >
            We&apos;re running free live sessions this week. Pick a time that works for you:
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {SESSIONS.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        </div>
      </div>

      <Link
        href="/community"
        className="fixed bottom-6 right-6 z-20 text-sm font-medium tracking-wide opacity-80 transition-opacity hover:opacity-100"
        style={{ color: fontColor, fontFamily: 'var(--font-mabry-pro)' }}
      >
        Community →
      </Link>
    </div>
  );
}
