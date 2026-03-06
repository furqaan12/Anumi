import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export interface WaitlistEntry {
  id: number;
  email: string;
  country: string | null;
  city: string | null;
  region: string | null;
  ip: string | null;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const WAITLIST_FILE = path.join(DATA_DIR, 'waitlist.json');

async function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
}

async function readWaitlist(): Promise<WaitlistEntry[]> {
  await ensureDataDir();
  if (!existsSync(WAITLIST_FILE)) {
    return [];
  }
  const raw = await readFile(WAITLIST_FILE, 'utf-8');
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeWaitlist(entries: WaitlistEntry[]) {
  await ensureDataDir();
  await writeFile(WAITLIST_FILE, JSON.stringify(entries, null, 2), 'utf-8');
}

export class DuplicateEmailError extends Error {
  code = '23505';
  constructor() {
    super('Duplicate email');
  }
}

/**
 * Add an email to the local waitlist (when DATABASE_URL is not set).
 * @throws DuplicateEmailError if email already exists
 */
export async function addToWaitlistLocal(params: {
  email: string;
  country: string | null;
  city: string | null;
  region: string | null;
  ip: string | null;
}): Promise<void> {
  const entries = await readWaitlist();
  const exists = entries.some((e) => e.email.toLowerCase() === params.email.toLowerCase());
  if (exists) {
    throw new DuplicateEmailError();
  }
  const nextId = entries.length > 0 ? Math.max(...entries.map((e) => e.id)) + 1 : 1;
  entries.push({
    id: nextId,
    email: params.email,
    country: params.country,
    city: params.city,
    region: params.region,
    ip: params.ip,
    createdAt: new Date().toISOString(),
  });
  await writeWaitlist(entries);
}

/** Get all waitlist entries (for admin/notification when using local store). */
export async function getWaitlistEntries(): Promise<WaitlistEntry[]> {
  return readWaitlist();
}
