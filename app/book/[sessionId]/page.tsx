'use client';

import { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import localFont from 'next/font/local';
import { getSessionById } from '@/lib/sessions';
import { createBooking } from '@/lib/booking-store';

const mabryPro = localFont({
  src: '../../../public/fonts/MabryPro-Regular.ttf',
  variable: '--font-mabry-pro',
});

const fontColor = '#F9EAD1';
const PREFILL_EMAIL_KEY = 'anumi_prefill_email';

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function BookingFormPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = typeof params.sessionId === 'string' ? params.sessionId : '';
  const session = getSessionById(sessionId);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [addToCommunityWhatsapp, setAddToCommunityWhatsapp] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean; phone?: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefill = localStorage.getItem(PREFILL_EMAIL_KEY);
    if (prefill) setEmail(prefill);
  }, []);

  const validate = useCallback(() => {
    const next: typeof errors = {};
    if (!name.trim()) next.name = 'Name is required';
    if (!email.trim()) next.email = 'Email is required';
    else if (!validateEmail(email)) next.email = 'Please enter a valid email address';
    if (!phone.trim()) next.phone = 'Phone / WhatsApp is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [name, email, phone]);

  const handleBlur = (field: 'name' | 'email' | 'phone') => {
    setTouched((t) => ({ ...t, [field]: true }));
    if (field === 'name' && !name.trim()) setErrors((e) => ({ ...e, name: 'Name is required' }));
    if (field === 'email') {
      if (!email.trim()) setErrors((e) => ({ ...e, email: 'Email is required' }));
      else if (!validateEmail(email)) setErrors((e) => ({ ...e, email: 'Please enter a valid email address' }));
      else setErrors((e) => ({ ...e, email: undefined }));
    }
    if (field === 'phone' && !phone.trim()) setErrors((e) => ({ ...e, phone: 'Phone / WhatsApp is required' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true });
    if (!validate()) return;
    setIsSubmitting(true);
    const booking = createBooking({
      sessionId,
      userName: name.trim(),
      userEmail: email.trim(),
      userPhone: phone.trim(),
    });
    setIsSubmitting(false);
    if (booking) {
      router.push(`/confirmation/${booking.bookingId}`);
    } else {
      setErrors({ email: 'Something went wrong. Please try again.' });
    }
  };

  const inputClass =
    'w-full rounded-full border border-white/20 bg-white/10 px-6 py-4 text-white placeholder:text-white/50 focus:border-[#ff6e40] focus:bg-white/20 focus:outline-none transition-all backdrop-blur-sm';
  const isInvalid = !name.trim() || !email.trim() || !validateEmail(email) || !phone.trim();

  if (!session) {
    return (
      <div className={`relative min-h-[100dvh] w-full overflow-x-hidden bg-black ${mabryPro.className}`}>
        <div className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/wowblue.jpg)' }} />
        <div className="pointer-events-none absolute inset-0 z-0 bg-black/30" aria-hidden />
        <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col items-center justify-center px-6 pt-24 pb-12">
          <p className="text-xl text-[#F9EAD1]">Session not found.</p>
          <Link href="/book" className="mt-4 rounded-full border border-white/10 bg-white/10 px-6 py-4 text-sm font-bold tracking-widest" style={{ color: fontColor }}>
            Back to sessions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative min-h-[100dvh] w-full overflow-x-hidden bg-black ${mabryPro.className}`}>
      <div className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/wowblue.jpg)' }} />
      <div className="pointer-events-none absolute inset-0 z-0 bg-black/30" aria-hidden />
      <div className="absolute left-0 top-8 z-20 flex w-full justify-center">
        <Link
          href="/"
          className="text-2xl tracking-[0.2em] uppercase"
          style={{ fontFamily: 'var(--font-booton)', color: fontColor }}
        >
          anumi
        </Link>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col items-center px-6 pt-24 pb-12 md:pt-32">
        <div className="w-full max-w-lg">
          <p className="text-lg leading-relaxed" style={{ color: fontColor }}>
            You&apos;re booking: <strong>{session.name}</strong> – {session.day}, {session.time} IST
            <br />
            Led by {session.practitioner}
          </p>

          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium" style={{ color: fontColor }}>
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => handleBlur('name')}
                className={inputClass}
                placeholder="Your name"
                aria-required
                aria-invalid={touched.name && !!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className="mt-2 text-sm font-medium text-[#ff6e40]" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium" style={{ color: fontColor }}>
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur('email')}
                className={inputClass}
                placeholder="you@example.com"
                aria-required
                aria-invalid={touched.email && !!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-2 text-sm font-medium text-[#ff6e40]" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium" style={{ color: fontColor }}>
                Phone / WhatsApp
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={() => handleBlur('phone')}
                className={inputClass}
                placeholder="+91 98765 43210"
                aria-required
                aria-invalid={touched.phone && !!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone && (
                <p id="phone-error" className="mt-2 text-sm font-medium text-[#ff6e40]" role="alert">
                  {errors.phone}
                </p>
              )}
            </div>

            <label className="mt-2 flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={addToCommunityWhatsapp}
                onChange={(e) => setAddToCommunityWhatsapp(e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-white/10 text-[#ff6e40] focus:ring-[#ff6e40]"
              />
              <span className="text-sm" style={{ color: fontColor }}>
                Add me to the Anumi community WhatsApp channel
              </span>
            </label>

            <button
              type="submit"
              disabled={isSubmitting || isInvalid}
              className="mt-4 w-full rounded-full border border-white/10 bg-white/10 px-6 py-4 text-sm font-bold tracking-widest transition-all duration-300 hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-70"
              style={{ color: fontColor }}
            >
              {isSubmitting ? 'Booking...' : 'Confirm Booking'}
            </button>
          </form>

          <Link href="/book" className="mt-6 inline-block text-sm hover:opacity-80" style={{ color: fontColor }}>
            ← Back to sessions
          </Link>
        </div>
      </div>
    </div>
  );
}
