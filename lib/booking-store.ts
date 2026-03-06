'use client';

import type { Booking } from './booking-types';
import { getSessionById } from './sessions';

const STORAGE_KEY = 'anumi_bookings';

function getBookingsFromStorage(): Booking[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveBookingsToStorage(bookings: Booking[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

export function createBooking(params: {
  sessionId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
}): Booking | null {
  const session = getSessionById(params.sessionId);
  if (!session) return null;

  const booking: Booking = {
    bookingId: crypto.randomUUID(),
    sessionId: params.sessionId,
    userName: params.userName,
    userEmail: params.userEmail,
    userPhone: params.userPhone,
    zoomLink: session.zoomJoinUrl,
    bookedAt: new Date().toISOString(),
    sessionName: session.name,
    sessionDay: session.day,
    sessionTime: session.time,
    sessionPractitioner: session.practitioner,
    sessionDescription: session.description,
  };

  const bookings = getBookingsFromStorage();
  bookings.push(booking);
  saveBookingsToStorage(bookings);
  return booking;
}

export function getBookingById(bookingId: string): Booking | null {
  const bookings = getBookingsFromStorage();
  return bookings.find((b) => b.bookingId === bookingId) ?? null;
}
