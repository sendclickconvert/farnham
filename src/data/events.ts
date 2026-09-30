// =====================================================================
//  MEDICARE 101 WEBINAR DATES
// =====================================================================
//
//  HOW TO ADD A NEW DATE (no coding knowledge needed):
//
//  1. Scroll down to the EVENTS list below.
//  2. Copy one existing line — everything from the opening "{" to the
//     closing "}," — and paste it at the bottom of the list (or
//     anywhere; the site sorts them by date automatically).
//  3. Change the three parts:
//        start:        the date and time the session BEGINS
//        end:          the date and time the session ENDS
//        registerUrl:  the registration link for that session
//  4. Save the file. That's it. The site rebuilds and picks it up.
//
//  DATE FORMAT:   'YYYY-MM-DDTHH:MM:00-04:00'
//     - YYYY-MM-DD = year-month-day  (e.g. 2026-11-04 = Nov 4, 2026)
//     - T           = just a separator, leave it alone
//     - HH:MM       = 24-hour time   (10:00 = 10 AM, 18:00 = 6 PM, 20:00 = 8 PM)
//     - The ending "-04:00" or "-05:00" is the New York time-zone offset:
//          use -04:00 during Daylight Time  (2nd Sunday of March -> 1st Sunday of November)
//          use -05:00 during Standard Time  (1st Sunday of November -> 2nd Sunday of March)
//       If you get it wrong the time will show one hour off, so double-check.
//
//  PAST DATES: you do NOT need to delete old sessions. Any session whose
//  end time has already passed is hidden from the website automatically.
//  You can delete old lines to keep the list tidy, but it is not required.
//
//  Keep the comma at the end of every line inside the list.
// =====================================================================

export const MEDICARE_101_DESCRIPTION =
  'Are you currently enrolled in Medicare? Will you be turning 65 over the next year or two? Learn about eligibility, how and when to enroll, when you can make changes, and the insurance options available to you. Review and compare what services are covered/not covered under Medicare Parts A, B, C and D. Detail the costs associated with medical and drug insurance. Explore and evaluate Original Medicare, Medicare Supplement Insurance, High-Deductible Medicare Supplement Insurance, Prescription Drug Plans and Medicare Advantage Plans. This program will simplify the choices you need to make; help you make more well-informed decisions and explain what Medicare means for you! This is an educational event.';

export const REGISTRATION_NOTE = [
  'You must self-register in advance for this educational event.',
  'After registering, you will receive an attendance email containing information on joining the webinar.',
  'At the online registration page, please fill in your first name only and leave your last name blank.',
];

export interface MedicareEvent {
  /** Session start, ISO 8601 with New York offset (-04:00 EDT / -05:00 EST). */
  start: string;
  /** Session end, same format. */
  end: string;
  /** Registration link for this specific session. */
  registerUrl: string;
}

export const EVENTS: MedicareEvent[] = [
  // ---- 2026 (EDT, -04:00 through Nov 1; EST, -05:00 from Nov 4 on) ----
  { start: '2026-10-10T10:00:00-04:00', end: '2026-10-10T12:00:00-04:00', registerUrl: 'https://bit.ly/4w3B2CZ' }, // Sat Oct 10, 10 AM – 12 Noon
  { start: '2026-10-13T18:00:00-04:00', end: '2026-10-13T20:00:00-04:00', registerUrl: 'https://bit.ly/4uqv11R' }, // Tue Oct 13, 6 – 8 PM
  { start: '2026-10-19T18:00:00-04:00', end: '2026-10-19T20:00:00-04:00', registerUrl: 'https://bit.ly/4n41DMk' }, // Mon Oct 19, 6 – 8 PM
  { start: '2026-10-21T18:00:00-04:00', end: '2026-10-21T20:00:00-04:00', registerUrl: 'https://bit.ly/4nmQM0h' }, // Wed Oct 21, 6 – 8 PM
  { start: '2026-11-04T18:00:00-05:00', end: '2026-11-04T20:00:00-05:00', registerUrl: 'https://bit.ly/4dgfbkq' }, // Wed Nov 4, 6 – 8 PM
  { start: '2026-11-07T10:00:00-05:00', end: '2026-11-07T12:00:00-05:00', registerUrl: 'https://bit.ly/424zECz' }, // Sat Nov 7, 10 AM – 12 Noon
  { start: '2026-11-17T18:00:00-05:00', end: '2026-11-17T20:00:00-05:00', registerUrl: 'https://bit.ly/4uqy1eD' }, // Tue Nov 17, 6 – 8 PM
  { start: '2026-12-09T18:00:00-05:00', end: '2026-12-09T20:00:00-05:00', registerUrl: 'https://bit.ly/3QA1VhU' }, // Wed Dec 9, 6 – 8 PM
  { start: '2026-12-12T10:00:00-05:00', end: '2026-12-12T12:00:00-05:00', registerUrl: 'https://bit.ly/4tMq0AM' }, // Sat Dec 12, 10 AM – 12 Noon
];

/**
 * Sessions that have not finished yet as of build time, soonest first.
 * (The site is statically built, so "now" is the moment of the last deploy.)
 */
export function upcomingEvents(now: Date = new Date()): MedicareEvent[] {
  return EVENTS
    .filter((e) => new Date(e.end).getTime() > now.getTime())
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
}
