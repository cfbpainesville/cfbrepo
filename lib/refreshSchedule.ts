// Airtable refresh schedule
//
// Pages that read from Airtable re-check it twice a week:
//   Monday at 1:00 AM Eastern Time and Friday at 1:00 AM Eastern Time.
// (The site also reads fresh data every time it is published.)
//
// Daylight saving time is handled automatically because the schedule is
// defined in the America/New_York time zone, not in UTC.

const TIME_ZONE = "America/New_York";
const REFRESH_WEEKDAYS = [1, 5]; // 0 = Sunday ... 1 = Monday, 5 = Friday
const REFRESH_HOUR = 1; // 1:00 AM
const REFRESH_MINUTE = 0;

// Never ask the framework to re-check more often than this (safety floor).
const MIN_SECONDS = 60;

interface WallClock {
  year: number;
  month: number; // 1-12
  day: number;
  hour: number;
  minute: number;
}

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  hourCycle: "h23",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
});

// Wall-clock time in the schedule's time zone for a given instant.
function toWallClock(date: Date): WallClock {
  const parts: Record<string, number> = {};
  for (const part of formatter.formatToParts(date)) {
    if (part.type !== "literal") {
      parts[part.type] = parseInt(part.value, 10);
    }
  }
  return {
    year: parts.year,
    month: parts.month,
    day: parts.day,
    hour: parts.hour,
    minute: parts.minute,
  };
}

// Convert a wall-clock time in the schedule's time zone to a UTC instant.
function wallClockToDate(wc: WallClock): Date {
  const guess = Date.UTC(wc.year, wc.month - 1, wc.day, wc.hour, wc.minute);
  const seen = toWallClock(new Date(guess));
  const seenAsUtc = Date.UTC(
    seen.year,
    seen.month - 1,
    seen.day,
    seen.hour,
    seen.minute
  );
  const offset = seenAsUtc - guess; // time-zone offset at that moment
  return new Date(guess - offset);
}

// The next scheduled refresh moment strictly after `now`.
export function nextRefreshDate(now: Date = new Date()): Date {
  const today = toWallClock(now);
  for (let dayOffset = 0; dayOffset <= 7; dayOffset++) {
    const candidateDay = new Date(
      Date.UTC(today.year, today.month - 1, today.day + dayOffset)
    );
    if (!REFRESH_WEEKDAYS.includes(candidateDay.getUTCDay())) continue;

    const candidate = wallClockToDate({
      year: candidateDay.getUTCFullYear(),
      month: candidateDay.getUTCMonth() + 1,
      day: candidateDay.getUTCDate(),
      hour: REFRESH_HOUR,
      minute: REFRESH_MINUTE,
    });
    if (candidate.getTime() > now.getTime()) return candidate;
  }
  // Unreachable: there is always a Monday or Friday within the next 7 days.
  return new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
}

// Seconds from `now` until the next scheduled refresh.
export function secondsUntilNextRefresh(now: Date = new Date()): number {
  const seconds = Math.ceil((nextRefreshDate(now).getTime() - now.getTime()) / 1000);
  return Math.max(MIN_SECONDS, seconds);
}
