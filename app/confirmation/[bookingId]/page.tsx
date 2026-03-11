'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import localFont from 'next/font/local';
import { getBookingById } from '@/lib/booking-store';
import type { Booking } from '@/lib/booking-types';
import { generateIcs, parseSessionDateTime, downloadIcs } from '@/lib/ics';

const mabryPro = localFont({
  src: '../../../public/fonts/MabryPro-Regular.ttf',
  variable: '--font-mabry-pro',
});

const fontColor = '#F9EAD1';

export default function ConfirmationPage() {
  const params = useParams();
  const bookingId = typeof params.bookingId === 'string' ? params.bookingId : '';
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    setBooking(getBookingById(bookingId));
  }, [bookingId]);

  const handleAddToCalendar = () => {
    if (!booking) return;
    const startDate = parseSessionDateTime(booking.sessionDay, booking.sessionTime);
    const ics = generateIcs({
      title: `${booking.sessionName} - Anumi`,
      description: booking.sessionDescription,
      locationUrl: booking.zoomLink,
      startDate,
      durationMinutes: 60,
    });
    downloadIcs(ics);
  };

  if (booking === undefined) {
    return null;
  }

  if (booking === null) {
    return (
      <div className={`relative min-h-[100dvh] w-full overflow-x-hidden bg-black ${mabryPro.className}`}>
        <div className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/wowblue.jpg)' }} />
        <div className="pointer-events-none absolute inset-0 z-0 bg-black/30" aria-hidden />
        <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col items-center justify-center px-6 pt-24 pb-12">
          <p className="text-xl" style={{ color: fontColor }}>
            Booking not found.
          </p>
          <Link
            href="/book"
            className="mt-6 rounded-full border border-white/10 bg-white/10 px-6 py-4 text-sm font-bold tracking-widest"
            style={{ color: fontColor }}
          >
            View sessions
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
        <div className="w-full max-w-2xl space-y-10">
          <h1
            className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl"
            style={{ color: fontColor }}
          >
            You&apos;re in!
          </h1>

          <div>
            <p className="text-lg leading-relaxed md:text-xl" style={{ color: fontColor }}>
              {booking.sessionName} – {booking.sessionDay}, {booking.sessionTime} IST
              <br />
              Led by {booking.sessionPractitioner}
            </p>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium" style={{ color: fontColor }}>
              Here&apos;s your session link:
            </p>
            <a
              href={booking.zoomLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center break-all text-lg font-medium underline decoration-[#7b3d73] underline-offset-2 transition-colors hover:decoration-[#9b5d93]"
              style={{ color: '#7b3d73' }}
            >
              {booking.zoomLink}
            </a>
          </div>

          <button
            type="button"
            onClick={handleAddToCalendar}
            className="flex min-h-[44px] w-full items-center justify-center rounded-full border border-white/10 bg-white/10 px-6 py-4 text-sm font-bold tracking-widest transition-all duration-300 hover:bg-white/20"
            style={{ color: fontColor }}
          >
            Add to Calendar
          </button>

          <p className="text-sm leading-relaxed" style={{ color: fontColor }}>
            We&apos;ll send this link to your email and WhatsApp as a reminder 1 hour before the session.
          </p>

          <Link
            href="/book"
            className="inline-block text-sm hover:opacity-80"
            style={{ color: fontColor }}
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
