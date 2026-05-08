// =============================================================
// js/partners.js — render the partners scrolling strip
// =============================================================

import { PARTNERS } from "../data/partners.js";

const ITEM_WIDTH = 160; // px (logo box width + gap), used for overflow check

export function renderPartners() {
  const track   = document.getElementById("partners-track");
  const section = document.getElementById("partners");
  if (!track) return;

  if (!PARTNERS.length) {
    section.style.display = "none";
    return;
  }

  function buildItems() {
    return PARTNERS.map(p => {
      const a = document.createElement("a");
      a.className  = "partner-logo";
      a.href       = p.url;
      a.target     = "_blank";
      a.rel        = "noopener noreferrer";
      a.title      = p.name;
      a.setAttribute("aria-label", p.name);

      const img    = document.createElement("img");
      img.src      = p.logo;
      img.alt      = p.name;
      img.loading  = "lazy";

      a.appendChild(img);
      return a;
    });
  }

  // Populate the track with one set first, then decide if we need to scroll
  const items = buildItems();
  items.forEach(el => track.appendChild(el));

  // After layout, check whether the content overflows the wrapper
  requestAnimationFrame(() => {
    const wrapperWidth = track.parentElement.offsetWidth;
    const contentWidth = PARTNERS.length * ITEM_WIDTH;

    if (contentWidth > wrapperWidth) {
      // Duplicate items so the marquee loops seamlessly
      const dupes = buildItems();
      dupes.forEach(el => {
        el.setAttribute("aria-hidden", "true");
        track.appendChild(el);
      });
      track.classList.add("scrolling");
      // Speed: ~80px/s — adjust via --partners-duration custom property if needed
      const duration = Math.round((contentWidth / 80) * 10) / 10;
      track.style.setProperty("--partners-duration", `${duration}s`);
    }
  });
}
