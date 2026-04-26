// =============================================================
// js/roster.js — render staff cards grid, tab switching, modal
// =============================================================

import { STAFF, ROLE_LABEL } from "../data/staff.js";

const rosterGrid = document.getElementById("roster-grid");
const modal      = document.getElementById("modal");

// ---- Render ----------------------------------------------------------------

export function renderRoster(key) {
  rosterGrid.innerHTML = "";

  const items =
    key === "all"
      ? [
          ...STAFF.maids.map(p   => ({ ...p, _role: "maids"   })),
          ...STAFF.butlers.map(p => ({ ...p, _role: "butlers" })),
          ...STAFF.hosts.map(p   => ({ ...p, _role: "hosts"   })),
        ]
      : STAFF[key].map(p => ({ ...p, _role: key }));

  items.forEach((p, i) => {
    const tiltCls = `tilt-${(i % 5) + 1}`;
    const card    = document.createElement("button");
    card.className = `card ${tiltCls}`;
    card.innerHTML = `
      <div class="c-photo" ${p.photo ? `style="background-image:url('pics/${p.photo}'); background-size:cover; background-position:center top;"` : ""}>
        <span class="ph-label">// ${p.handle.split(" ")[0]}.jpg</span>
        <span class="status-dot ${p.status === "on" ? "" : "off"}">
          ${p.status === "on" ? "on shift" : "off today"}
        </span>
      </div>
      <div class="c-name">${p.name}</div>
      <div class="c-handle">
        ${p.handle} ·
        <span style="color:var(--plum-soft); font-family:var(--font-body);
                     font-size:11px; text-transform:uppercase; letter-spacing:.1em;">
          ${p._role.slice(0, -1)}
        </span>
      </div>
      <div class="c-tags">
        <span class="c-tag specialty">${p.spec}</span>
        ${p.tags.slice(0, 2).map(t => `<span class="c-tag">${t}</span>`).join("")}
      </div>
      <div class="c-quote">"${p.quote}"</div>
    `;
    card.addEventListener("click", () => openModal(p._role, p));
    rosterGrid.appendChild(card);
  });
}

// Initialise with "all" tab
renderRoster("all");

// ---- Tabs ------------------------------------------------------------------

document.querySelectorAll("#roster-tabs .tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll("#roster-tabs .tab").forEach(b => b.classList.remove("active"));
    tab.classList.add("active");
    renderRoster(tab.dataset.roster);
  });
});

// ---- Modal -----------------------------------------------------------------

function openModal(key, p) {
  document.getElementById("m-role").textContent     = ROLE_LABEL[key];
  document.getElementById("m-name").textContent     = p.name;
  document.getElementById("m-handle").textContent   = p.handle;
  document.getElementById("m-ph-label").textContent = `// ${p.handle.split(" ")[0]}_full.jpg`;
  document.getElementById("m-pronouns").textContent = p.pronouns;
  document.getElementById("m-bio").textContent      = p.bio;
  document.getElementById("m-drink").textContent    = p.drink;
  document.getElementById("m-bday").textContent     = p.bday;
  document.getElementById("m-shifts").textContent   = p.shifts;
  document.getElementById("m-debut").textContent    = p.debut;

  const specs = document.getElementById("m-specs");
  specs.innerHTML = [p.spec, ...p.tags]
    .map(t => `<span class="c-tag">${t}</span>`)
    .join("");

  document.getElementById("m-quote").textContent = `"${p.quote}"`;
  modal.classList.add("open");
}

function closeModal() { modal.classList.remove("open"); }

document.getElementById("modal-close").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
