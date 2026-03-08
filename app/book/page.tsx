'use client';

import { useState, useRef, useEffect } from 'react';
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
const WHY_ANUMI_IMAGE = '/GIRRLL.jpg?v=2';
const COMMUNITY_IMAGE = '/desert%20hike%20aesthetic.jpg';
const IMAGE_FALLBACK = '/hero-bg.jpeg';

const ANUMI_WORDS = ['Anumi', 'अनूमी', 'ಅನೂಮಿ', 'அனூமி', 'انومی'];
const ANUMI_ROTATE_MS = 2800;

const SECTION2_SCIENCE_EXPLANATION =
  '"These methods have helped people feel calmer, more present, and better equipped to manage everyday stress."\n\n— Dr. Meera Srinivasan, Neuroscientist\nBangalore Institute of Neurohealth';
const SECTION2_SCIENCE_RESEARCH_TITLE = '';
const SECTION2_SCIENCE_RESEARCH_URL = '';

function SessionCard({ session }: { session: Session }) {
  return (
    <div className="flex flex-col">
      <div
        className="group relative rounded-lg border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:bg-white/[0.08]"
        style={{ fontFamily: 'var(--font-mabry-pro)' }}
      >
        <div className="absolute inset-0 rounded-lg bg-black/10 pointer-events-none" aria-hidden />
        <div className="relative z-10">
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
      </div>
      {session.spotsRemaining != null && session.spotsTotal != null && (
        <p className="mt-2 text-center text-xs italic opacity-70" style={{ color: fontColor, fontFamily: 'var(--font-mabry-pro)' }}>
          {session.spotsRemaining} of {session.spotsTotal} spots remaining
        </p>
      )}
    </div>
  );
}

export default function BookPage() {
  const [showCommunityForm, setShowCommunityForm] = useState(false);
  const [communitySubmitted, setCommunitySubmitted] = useState(false);
  const [communityName, setCommunityName] = useState('');
  const [communityWhatsapp, setCommunityWhatsapp] = useState('');
  const [communityShare, setCommunityShare] = useState('');
  type FloatingButton = 'why-anumi' | 'community' | null;
  const [floatingButton, setFloatingButton] = useState<FloatingButton>('why-anumi');
  const [whyAnumiImageError, setWhyAnumiImageError] = useState(false);
  const [anumiWordIndex, setAnumiWordIndex] = useState(0);
  const whyAnumiRef = useRef<HTMLElement>(null);
  const communityRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setInterval(() => {
      setAnumiWordIndex((i) => (i + 1) % ANUMI_WORDS.length);
    }, ANUMI_ROTATE_MS);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const whySection = whyAnumiRef.current;
    const commSection = communityRef.current;
    if (!whySection || !commSection) return;

    const update = () => {
      const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
      const whyRect = whySection.getBoundingClientRect();
      const commRect = commSection.getBoundingClientRect();
      const inSection1 = whyRect.top >= viewportHeight * 0.4;
      const inSection2 = !inSection1 && commRect.top >= viewportHeight * 0.4;
      if (inSection1) setFloatingButton('why-anumi');
      else if (inSection2) setFloatingButton('community');
      else setFloatingButton(null);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const handleCommunitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCommunitySubmitted(true);
  };

  return (
    <div className={`relative min-h-[100dvh] w-full overflow-x-hidden bg-black ${mabryPro.className}`}>
      {/* Section 1 background */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/sec1.jpg)' }}
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

      <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col w-full">
        {/* Section 1: Session cards */}
        <div className="flex min-h-[100dvh] flex-col items-center justify-start px-6 pt-24 pb-12 md:justify-center md:py-32">
          <div className="w-full max-w-5xl">
            <h1
              className="text-2xl leading-[1.1] tracking-tight md:text-3xl lg:text-5xl xl:text-6xl"
              style={{ color: fontColor }}
            >
              Welcome to{' '}
              <span key={anumiWordIndex} className="inline-block min-w-[1.2em] anumi-word-fade">
                {ANUMI_WORDS[anumiWordIndex]}
              </span>
            </h1>
            <p
              className="mt-6 text-xl leading-relaxed md:text-2xl"
              style={{ color: fontColor }}
            >
              We&apos;re running free live sessions this week for a limited time. Pick a time that works for you:
            </p>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {SESSIONS.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Why Anumi */}
        <section id="why-anumi" ref={whyAnumiRef} className="w-full">
          <div
            className="relative aspect-[16/10] min-h-[280px] w-full overflow-hidden bg-neutral-950"
            style={{
              backgroundImage: whyAnumiImageError
                ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0d0d0d 100%)'
                : undefined,
            }}
          >
            {!whyAnumiImageError && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={WHY_ANUMI_IMAGE}
                alt="Why Anumi"
                className="h-full w-full object-cover"
                onError={(e) => {
                  const el = e.currentTarget;
                  const url = el.src;
                  if (url.endsWith(IMAGE_FALLBACK) || url.endsWith(COMMUNITY_IMAGE)) {
                    setWhyAnumiImageError(true);
                    return;
                  }
                  if (url.includes('GIRRLL.jpg')) {
                    el.src = IMAGE_FALLBACK;
                    return;
                  }
                  setWhyAnumiImageError(true);
                }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" aria-hidden />
            <div className="absolute left-0 top-0 z-20 flex w-full justify-center pt-8">
              <Link
                href="/"
                className="text-2xl tracking-[0.2em] uppercase opacity-90"
                style={{ fontFamily: 'var(--font-booton)', color: fontColor }}
              >
                anumi
              </Link>
            </div>
            <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 pt-8 text-left md:px-10 md:pb-12 z-10">
              <h2 className="text-2xl font-medium tracking-tight md:text-4xl" style={{ color: fontColor }}>
                If you live in the city, you know the feeling: always on, always stressed, running on empty.
              </h2>
              <div className="mt-4 max-w-2xl text-lg leading-relaxed opacity-90 md:text-xl" style={{ color: fontColor }}>
                We built Anumi because that&apos;s not sustainable. Our sessions teach you nervous system regulation,{' '}
                <ScienceInfoTooltip
                  trigger="text"
                  explanation={SECTION2_SCIENCE_EXPLANATION}
                  researchTitle={SECTION2_SCIENCE_RESEARCH_TITLE}
                  researchUrl={SECTION2_SCIENCE_RESEARCH_URL}
                >
                  science-backed
                </ScienceInfoTooltip>{' '}
                practices that help your body actually settle. Not just mentally understanding stress, but physically releasing it.
              </div>
              <p className="mt-4 max-w-2xl text-base leading-relaxed opacity-90 md:text-lg" style={{ color: fontColor }}>
                Why Anumi? Because you shouldn&apos;t need a guru or an expensive clinic to learn how to calm down. You just need the right tools and a space to practice them.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Community */}
        <section id="community" ref={communityRef} className="w-full">
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={COMMUNITY_IMAGE}
              alt="Community"
              className="h-full w-full object-cover"
              onError={(e) => {
                const el = e.currentTarget;
                if (el.src.endsWith(IMAGE_FALLBACK)) return;
                el.src = IMAGE_FALLBACK;
              }}
            />
            <div className="absolute left-0 top-0 flex w-full justify-center pt-8">
              <Link
                href="/"
                className="z-20 text-2xl tracking-[0.2em] uppercase opacity-90"
                style={{ fontFamily: 'var(--font-booton)', color: fontColor }}
              >
                anumi
              </Link>
            </div>
            <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 pt-8 text-left md:px-10 md:pb-12">
              <h2 className="text-2xl font-medium tracking-tight md:text-4xl" style={{ color: fontColor }}>
                The Anumi Community.
              </h2>
              <p className="mt-3 max-w-xl text-lg leading-relaxed opacity-90 md:text-xl" style={{ color: fontColor }}>
                A place where you can be yourself. Nothing more needed. Just authenticity.
              </p>
              {!showCommunityForm && !communitySubmitted && (
                <button
                  type="button"
                  onClick={() => setShowCommunityForm(true)}
                  className="mt-6 rounded-full border border-white/10 bg-white/10 px-8 py-4 text-sm font-bold tracking-widest transition-all duration-300 hover:bg-white/20"
                  style={{ color: fontColor }}
                >
                  I&apos;m interested
                </button>
              )}
            </div>
          </div>

          {showCommunityForm && !communitySubmitted && (
            <div className="mx-auto max-w-md px-6 py-12">
              <h3 className="text-2xl font-medium tracking-tight md:text-3xl" style={{ color: fontColor }}>
                Join the community
              </h3>
              <form onSubmit={handleCommunitySubmit} className="mt-8 flex flex-col gap-5">
                <div>
                  <label htmlFor="community-name" className="mb-2 block text-sm opacity-90" style={{ color: fontColor }}>
                    Name
                  </label>
                  <input
                    id="community-name"
                    type="text"
                    value={communityName}
                    onChange={(e) => setCommunityName(e.target.value)}
                    required
                    className="w-full rounded-full border border-white/20 bg-white/10 px-6 py-4 text-white placeholder:text-white/50 focus:border-[#ff6e40] focus:bg-white/20 focus:outline-none transition-all"
                    style={{ color: fontColor }}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="community-whatsapp" className="mb-2 block text-sm opacity-90" style={{ color: fontColor }}>
                    WhatsApp
                  </label>
                  <input
                    id="community-whatsapp"
                    type="tel"
                    value={communityWhatsapp}
                    onChange={(e) => setCommunityWhatsapp(e.target.value)}
                    required
                    className="w-full rounded-full border border-white/20 bg-white/10 px-6 py-4 text-white placeholder:text-white/50 focus:border-[#ff6e40] focus:bg-white/20 focus:outline-none transition-all"
                    style={{ color: fontColor }}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label htmlFor="community-share" className="mb-2 block text-sm opacity-90" style={{ color: fontColor }}>
                    Share anything about yourself
                  </label>
                  <textarea
                    id="community-share"
                    value={communityShare}
                    onChange={(e) => setCommunityShare(e.target.value)}
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
          )}

          {communitySubmitted && (
            <div className="mx-auto max-w-md px-6 py-12 text-center">
              <p className="text-xl md:text-2xl" style={{ color: fontColor }}>
                You&apos;ll be added in soon!
              </p>
              <button
                type="button"
                onClick={() => {
                  setCommunitySubmitted(false);
                  setShowCommunityForm(false);
                }}
                className="mt-8 text-sm opacity-80 transition-opacity hover:opacity-100"
                style={{ color: fontColor, fontFamily: 'var(--font-mabry-pro)' }}
              >
                ← Back
              </button>
            </div>
          )}
        </section>
      </div>

      {floatingButton === 'why-anumi' && (
        <a
          href="#why-anumi"
          className="fixed bottom-6 right-6 z-20 text-sm font-medium tracking-wide opacity-70 transition-opacity duration-300 hover:opacity-100"
          style={{ color: fontColor, fontFamily: 'var(--font-mabry-pro)' }}
        >
          Why Anumi? →
        </a>
      )}
      {floatingButton === 'community' && (
        <a
          href="#community"
          className="fixed bottom-6 right-6 z-20 text-sm font-medium tracking-wide opacity-80 transition-opacity duration-300 hover:opacity-100"
          style={{ color: fontColor, fontFamily: 'var(--font-mabry-pro)' }}
        >
          Community →
        </a>
      )}
    </div>
  );
}
