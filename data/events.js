// =============================================================
// data/events.js — demo/fallback event list for the events section
// =============================================================

/**
 * These events are shown when no Google Calendar credentials are
 * configured in the Tweaks panel.  Dates use the local timezone.
 *
 * Shape: { date: Date, end: Date|null, title: string, desc: string, featured?: boolean }
 */
export const DEMO_EVENTS = [
  {
    date:     new Date(2026, 3, 20, 18, 0),
    end:      new Date(2026, 3, 20, 21, 0),
    title:    "Strawberry Hour ✿",
    desc:     "Pink everything. Strawberry parfaits, strawberry latte art, strawberry photo-ops. Wear something pink for a free sticker~",
    featured: true,
  },
  {
    date:  new Date(2026, 3, 23, 16, 0),
    end:   new Date(2026, 3, 23, 19, 0),
    title: "Butlers' Tea Party",
    desc:  "Sebastian and the boys serve a proper high-tea, three tiers, five kinds of scones. Dress code: garden soirée.",
  },
  {
    date:  new Date(2026, 3, 27, 20, 0),
    end:   new Date(2026, 3, 27, 23, 0),
    title: "Host Karaoke ✿",
    desc:  "The Hosts sing. You cheer. We keep the champagne flowing. BYO glitter encouraged.",
  },
];
