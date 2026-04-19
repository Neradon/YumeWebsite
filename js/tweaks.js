// =============================================================
// js/tweaks.js — Tweaks panel: palette, card style, live inputs
// =============================================================

import { refreshSparkColors }  from "./cursor.js";
import { loadEvents }          from "./events.js";
import { loadDiscord }         from "./discord.js";

const body  = document.body;
const panel = document.getElementById("tweaks");

// ---- Apply & persist -------------------------------------------------------

export function applyTweaks(t) {
  body.dataset.palette   = t.palette;
  body.dataset.cardstyle = t.cardStyle;

  document.querySelectorAll(".swatch")
    .forEach(s => s.classList.toggle("active", s.dataset.pal === t.palette));
  document.querySelectorAll("#cs button")
    .forEach(b => b.classList.toggle("active", b.dataset.cs === t.cardStyle));

  refreshSparkColors();
}

function persist() {
  try {
    window.parent.postMessage({
      type: "__edit_mode_set_keys",
      edits: {
        palette:          window.__TWEAKS.palette,
        cardStyle:        window.__TWEAKS.cardStyle,
        gcalApiKey:       window.__TWEAKS.gcalApiKey       || "",
        gcalCalendarId:   window.__TWEAKS.gcalCalendarId   || "",
        discordServerId:  window.__TWEAKS.discordServerId  || "",
        discordInviteUrl: window.__TWEAKS.discordInviteUrl || "",
      },
    }, "*");
  } catch (_) {}
}

// ---- Palette swatches ------------------------------------------------------

document.querySelectorAll(".swatch").forEach(s => {
  s.addEventListener("click", () => {
    window.__TWEAKS.palette = s.dataset.pal;
    applyTweaks(window.__TWEAKS);
    persist();
  });
});

// ---- Card style buttons ----------------------------------------------------

document.querySelectorAll("#cs button").forEach(b => {
  b.addEventListener("click", () => {
    window.__TWEAKS.cardStyle = b.dataset.cs;
    applyTweaks(window.__TWEAKS);
    persist();
  });
});

// ---- Debounced text inputs -------------------------------------------------

function bindInput(id, key, reloadFn) {
  const el = document.getElementById(id);
  el.value = window.__TWEAKS[key] || "";
  let timer;
  el.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      window.__TWEAKS[key] = el.value.trim();
      persist();
      reloadFn();
    }, 400);
  });
}

bindInput("tw-gcal-id",     "gcalCalendarId",   loadEvents);
bindInput("tw-gcal-key",    "gcalApiKey",        loadEvents);
bindInput("tw-dc-id",       "discordServerId",   loadDiscord);
bindInput("tw-dc-invite",   "discordInviteUrl",  loadDiscord);

// ---- Open / close ----------------------------------------------------------

document.getElementById("tw-close").addEventListener("click", () => panel.classList.remove("open"));

// Edit-mode postMessage bridge (used by the Claude Design editor)
window.addEventListener("message", e => {
  const d = e.data || {};
  if (d.type === "__activate_edit_mode")   panel.classList.add("open");
  if (d.type === "__deactivate_edit_mode") panel.classList.remove("open");
});
window.parent.postMessage({ type: "__edit_mode_available" }, "*");
