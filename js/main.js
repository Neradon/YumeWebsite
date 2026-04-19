// =============================================================
// js/main.js — application entry point
//
// Import order:
//   1. cursor   — must come first so refreshSparkColors is available
//   2. tweaks   — reads __TWEAKS and applies palette/card style
//   3. roster   — renders staff cards (sync, no network)
//   4. events   — async Google Calendar fetch (or demo fallback)
//   5. discord  — async Discord widget fetch
//   6. scroll   — smooth scroll for nav anchors and CTA buttons
// =============================================================

import "./cursor.js";
import { applyTweaks }  from "./tweaks.js";
import "./roster.js";
import { loadEvents }   from "./events.js";
import { loadDiscord }  from "./discord.js";

// ---- Apply saved tweaks on boot --------------------------------------------
applyTweaks(window.__TWEAKS);

// ---- Kick off async data loads ---------------------------------------------
loadEvents();
loadDiscord();
setInterval(loadDiscord, 60_000); // refresh Discord presence every minute

// ---- Smooth scroll ---------------------------------------------------------
// data-scroll="<selector>" buttons (e.g. hero CTAs)
document.querySelectorAll("[data-scroll]").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = document.querySelector(btn.dataset.scroll);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Anchor links inside the nav
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
