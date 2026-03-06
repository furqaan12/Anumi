export interface Session {
  id: string;
  name: string;
  practitioner: string;
  day: string;
  time: string;
  description: string;
  zoomMeetingId?: string;
  zoomJoinUrl: string;
  /** Plain-language explanation for science tooltip */
  scienceExplanation?: string;
  /** Research study title for tooltip */
  scienceResearchTitle?: string;
  /** Research study URL */
  scienceResearchUrl?: string;
  /** Spots remaining (from Zoom API later). */
  spotsRemaining?: number;
  /** Total capacity (from Zoom API later). */
  spotsTotal?: number;
}

export interface Booking {
  bookingId: string;
  sessionId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  zoomLink: string;
  bookedAt: string;
  sessionName: string;
  sessionDay: string;
  sessionTime: string;
  sessionPractitioner: string;
  sessionDescription: string;
}
