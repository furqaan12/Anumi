'use client';

import { useState, useTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { joinWaitlist } from './actions/subscribe';
import localFont from 'next/font/local';

const PREFILL_EMAIL_KEY = 'anumi_prefill_email';

const TESTIMONIALS = [
  {
    quote: 'I feel incredible. I\'m new to breathwork, but after doing this session I felt noticeably calm.',
    name: 'Ayush Kala',
    role: 'Product Manager',
  },
  {
    quote: 'It was amazing. I loved how gradual and safe the sessions felt.',
    name: 'Sanjana Ramesh',
    role: 'Business Development Executive',
  },
  {
    quote: 'I can vouch for these sessions. They\'ve become essential to starting my day and part of my daily routine.',
    name: 'Anmol Kumar',
    role: 'AI Product Engineer',
  },
  {
    quote: 'I felt calm and relaxed, and it helped me navigate my busy schedule.',
    name: 'Ebrahim Mohaseena Banu',
    role: 'Homeowner & Entrepreneur',
  },
] as const;

const TESTIMONIAL_ROTATE_MS = 4500;

const mabryPro = localFont({
  src: '../public/fonts/MabryPro-Regular.ttf',
  variable: '--font-mabry-pro',
});

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const fontColor = '#F9EAD1';

  useEffect(() => {
    const t = setInterval(() => {
      setTestimonialIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, TESTIMONIAL_ROTATE_MS);
    return () => clearInterval(t);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    startTransition(async () => {
      const formData = new FormData();
      formData.append('email', email);

      const result = await joinWaitlist(formData);

      if (result.error) {
        setMessage(result.error);
        setIsError(true);
      } else {
        if (typeof window !== 'undefined') window.localStorage.setItem(PREFILL_EMAIL_KEY, email);
        setEmail('');
        setMessage('');
        setIsError(false);
        router.push('/book');
      }
    });
  };

  return (
    <div className={`relative w-full min-h-[100dvh] overflow-x-hidden bg-black ${mabryPro.className}`}>
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: 'url(/wow.jpg)' }}
      />
      <div className="absolute inset-0 z-[0.5] bg-black/10 pointer-events-none" aria-hidden />
      <div className="absolute top-8 left-0 w-full flex justify-center z-20">
        <h2 className="text-2xl tracking-widest uppercase opacity-70" style={{ fontFamily: 'var(--font-booton)', color: fontColor }}>anumi</h2>
      </div>

      <div className={`relative z-10 min-h-[100dvh] flex flex-col items-center justify-start md:justify-center pt-24 pb-12 md:py-32 px-6 transition-all duration-500 max-w-[1400px] mx-auto`}>
        <div className={`w-full max-w-5xl mx-auto transition-all duration-500 ease-in-out flex flex-col lg:flex-row items-center justify-between text-left gap-12 lg:gap-16`}>

          <div className={`transition-all duration-500 w-full lg:flex-1`}>
            <h1
              className="text-2xl leading-[1.1] tracking-tight opacity-90 md:text-3xl lg:text-5xl xl:text-6xl"
              style={{ color: fontColor }}
            >
              Where Modern India Slows Down.
            </h1>
          </div>

          <div className={`transition-all duration-500 w-full lg:flex-1 lg:border-l lg:pl-12 lg:border-white/10 mt-8 lg:mt-0`}>
            <p
              className={`text-xl leading-relaxed opacity-90 md:text-2xl transition-all duration-500`}
              style={{ color: fontColor }}
            >
              Anumi is a space to pause, reset, catch your breath. For people on the go, or for anyone who needs a break. We're starting with live online breathwork and meditation sessions. Science-based, built for people who want practical tools. Come join the community of chill.
            </p>
          </div>
        </div>

        <div className="mt-12 w-full max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="relative w-full">
            <div className="relative group w-full">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-6 pr-48 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-[#ff6e40] focus:bg-white/20 transition-all backdrop-blur-sm"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff6e40] to-[#f89b3f] opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />

              <button
                disabled={isPending}
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 z-20 rounded-full px-6 bg-white/10 hover:bg-white/20 border border-white/10 text-sm font-bold tracking-widest opacity-90 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center"
                style={{ color: fontColor }}
              >
                <span className="relative z-10 whitespace-nowrap">
                  {isPending ? 'JOINING...' : 'JOIN THE CLUB'}
                </span>
              </button>
            </div>

            {message && (
              <p className={`text-base font-medium tracking-wide text-center mt-4 ${isError ? 'text-[#ff6e40]' : 'text-[#fab76a]'}`} style={{ color: isError ? '#ff6e40' : fontColor }}>
                {message}
              </p>
            )}
          </form>

          <div className="mt-14 w-full max-w-2xl mx-auto text-center min-h-[120px] flex flex-col justify-center">
            <blockquote key={testimonialIndex} className="testimonial-fade">
              <p className="text-lg leading-relaxed opacity-80 md:text-xl" style={{ color: fontColor }}>
                &ldquo;{TESTIMONIALS[testimonialIndex].quote}&rdquo;
              </p>
              <footer className="mt-4 text-sm opacity-70" style={{ color: fontColor }}>
                — {TESTIMONIALS[testimonialIndex].name}, {TESTIMONIALS[testimonialIndex].role}
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}
