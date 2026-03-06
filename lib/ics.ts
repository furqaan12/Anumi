/**
 * Generate .ics file content for a session.
 * Format: https://www.kanzaki.com/docs/ical/
 */
export function generateIcs(params: {
  title: string;
  description: string;
  locationUrl: string;
  startDate: Date;
  durationMinutes?: number;
}): string {
  const { title, description, locationUrl, startDate, durationMinutes = 60 } = params;
  const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);

  const formatDate = (d: Date) => {
    return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  };

  const escape = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Anumi//Session//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${crypto.randomUUID()}@anumi`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(startDate)}`,
    `DTEND:${formatDate(endDate)}`,
    `SUMMARY:${escape(title)}`,
    `DESCRIPTION:${escape(description)}\\n\\nJoin: ${locationUrl}`,
    `LOCATION:${escape(locationUrl)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return lines.join('\r\n');
}

/**
 * Parse session day + time into a Date (next occurrence).
 * Simplified: uses current week; for production use a proper schedule or timezone lib.
 */
export function parseSessionDateTime(day: string, time: string): Date {
  const dayMap: Record<string, number> = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };
  const targetDay = dayMap[day] ?? 2;
  const normalized = time.replace(/\s/g, '').toLowerCase();
  const pm = normalized.includes('pm');
  const am = normalized.includes('am');
  const numPart = normalized.replace(/am|pm/g, '');
  const [h, m] = numPart.split(':').map((x) => parseInt(x, 10) || 0);
  let hour = h ?? 19;
  if (pm && hour !== 12) hour += 12;
  if (am && hour === 12) hour = 0;

  const d = new Date();
  const currentDay = d.getDay();
  let daysAhead = targetDay - currentDay;
  if (daysAhead <= 0) daysAhead += 7;
  d.setDate(d.getDate() + daysAhead);
  d.setHours(hour, m || 0, 0, 0);
  return d;
}

export function downloadIcs(icsContent: string, filename = 'anumi-session.ics') {
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
