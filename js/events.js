// =============================================================
// js/events.js — load & render events (Google Calendar or demo)
// =============================================================

import { DEMO_EVENTS } from "../data/events.js";

// ---- Date helpers ----------------------------------------------------------

const MONTHS = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
const DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function fmtTime(d) {
  let h = d.getHours(), m = d.getMinutes();
  const ap = h >= 12 ? "pm" : "am";
  h = h % 12 || 12;
  return m ? `${h}:${String(m).padStart(2, "0")}${ap}` : `${h}${ap}`;
}

// ---- Mini-schedule (hero sidebar) ------------------------------------------

export function renderMiniSchedule(events) {
  const el = document.getElementById("mini-schedule");
  if (!el || !events.length) return;

  el.innerHTML = events.slice(0, 4).map(e => {
    const day      = String(e.date.getDate()).padStart(2, "0");
    const mo       = MONTHS[e.date.getMonth()];
    const timeStr  = e.end
      ? `${fmtTime(e.date)}–${fmtTime(e.end)}`
      : fmtTime(e.date);
    const shortTitle = e.title.length > 22 ? e.title.slice(0, 20) + "…" : e.title;

    return `
      <div class="sched-row">
        <div class="sr-date"><span class="day">${day}</span><span class="mo">${mo}</span></div>
        <div class="sr-info">
          <div class="title">${shortTitle}</div>
          <div class="time">${timeStr}</div>
        </div>
      </div>`;
  }).join("");
}

// ---- Main events grid ------------------------------------------------------

function renderEvents(events, live) {
  const grid   = document.getElementById("events-grid");
  grid.innerHTML = "";

  if (!events.length) {
    grid.innerHTML = `<div class="events-empty">no upcoming events — check back soon ♡</div>`;
    return;
  }

  events.slice(0, 6).forEach((e, i) => {
    const card = document.createElement("div");
    card.className = "event-card" + (i === 0 ? " featured" : "");

    const day     = e.date.getDate();
    const mo      = MONTHS[e.date.getMonth()];
    const dow     = DAYS[e.date.getDay()];
    const timeStr = e.end
      ? `${dow} · ${fmtTime(e.date)}–${fmtTime(e.end)}`
      : `${dow} · ${fmtTime(e.date)}`;

    card.innerHTML = `
      <div class="event-date-strip">
        <div class="big">${day}<span style="font-size:.5em; color:var(--plum-soft);">.${mo}</span></div>
        <div class="meta">${timeStr}</div>
      </div>
      <div class="event-title">${e.title}</div>
      <div class="event-desc">${e.desc || ""}</div>
      <div class="event-footer">
        <span class="spots">♡ seats open</span>
        <span class="rsvp">reserve →</span>
      </div>`;
    grid.appendChild(card);
  });

  renderMiniSchedule(events);
}

// ---- Google Calendar loader ------------------------------------------------

function resolveCalendarId(raw) {
  if (!raw) return "";
  try {
    const match = raw.match(/[?&]cid=([^&]+)/);
    if (match) return atob(decodeURIComponent(match[1]));
  } catch (_) {}
  return raw.trim();
}

export async function loadEvents() {
  const { gcalApiKey, gcalCalendarId } = window.__TWEAKS;

  if (!gcalApiKey || !gcalCalendarId) {
    renderEvents(DEMO_EVENTS, false);
    renderMiniSchedule(DEMO_EVENTS);
    return;
  }

  const calId = resolveCalendarId(gcalCalendarId);
  try {
    const now = new Date().toISOString();
    const url = [
      `https://www.googleapis.com/calendar/v3/calendars/`,
      `${encodeURIComponent(calId)}/events`,
      `?key=${encodeURIComponent(gcalApiKey)}`,
      `&timeMin=${encodeURIComponent(now)}`,
      `&singleEvents=true&orderBy=startTime&maxResults=10`,
    ].join("");

    const res  = await fetch(url);
    if (!res.ok) throw new Error("calendar " + res.status);
    const data = await res.json();

    const events = (data.items || []).map(it => ({
      date:  new Date(it.start.dateTime || it.start.date),
      end:   it.end ? new Date(it.end.dateTime || it.end.date) : null,
      title: it.summary || "Untitled",
      desc:  it.description || "",
    }));

    renderEvents(events, true);
    renderMiniSchedule(events);
  } catch (err) {
    renderEvents(DEMO_EVENTS, false);
    console.warn("GCal error:", err);
  }
}
