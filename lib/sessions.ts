import type { Session } from './booking-types';

// TODO: Replace mock Zoom URLs with real Zoom API integration.
// Create meetings via Zoom API (OAuth or JWT) and store zoomMeetingId + zoomJoinUrl per session.
const MOCK_ZOOM_BASE = 'https://zoom.us/j/mocklink';

export const SESSIONS: Session[] = [
  {
    id: '1',
    name: 'Evening Wind Down',
    practitioner: 'Vaishali',
    day: 'Tuesday',
    time: '7:30pm',
    description: 'Breathwork and body scan to help you settle after a long day',
    zoomJoinUrl: `${MOCK_ZOOM_BASE}-1`,
    spotsRemaining: 20,
    spotsTotal: 50,
    scienceExplanation:
      'Breathwork activates your vagus nerve, shifting your body from stress mode to rest mode. Even 10 minutes can lower your heart rate and help you feel calmer.',
    scienceResearchTitle: 'Effects of Diaphragmatic Breathing on Health',
    scienceResearchUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5455070/',
  },
  {
    id: '2',
    name: 'Stress Relief Session',
    practitioner: 'Tushima',
    day: 'Wednesday',
    time: '8:00pm',
    description: 'Gentle practices to release stress and sleep better',
    zoomJoinUrl: `${MOCK_ZOOM_BASE}-2`,
    spotsRemaining: 20,
    spotsTotal: 50,
    scienceExplanation:
      'Slow, controlled breathing reduces cortisol (your stress hormone) and helps regulate your nervous system. Research shows it can reduce anxiety within minutes.',
    scienceResearchTitle: 'Breathwork for Stress and Anxiety Reduction',
    scienceResearchUrl: 'https://www.frontiersin.org/articles/10.3389/fpsyg.2017.00874/full',
  },
  {
    id: '3',
    name: 'Morning Reset',
    practitioner: 'Kirti',
    day: 'Thursday',
    time: '7:00am',
    description: 'Start your day grounded with breathwork and light movement',
    zoomJoinUrl: `${MOCK_ZOOM_BASE}-3`,
    spotsRemaining: 20,
    spotsTotal: 50,
    scienceExplanation:
      "Morning breathwork primes your nervous system for the day ahead, improving focus and emotional regulation. It's like a reset button for your body.",
    scienceResearchTitle: 'Breath Practices for Autonomic Nervous System Balance',
    scienceResearchUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6137615/',
  },
];

export function getSessionById(id: string): Session | undefined {
  return SESSIONS.find((s) => s.id === id);
}
