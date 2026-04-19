// =============================================================
// js/cursor.js — custom heart cursor, lazy trail, spark particles
// =============================================================

const cm = document.querySelector(".cursor-main");
const ct = document.querySelector(".cursor-trail");

// Hide entirely on touch devices
if (matchMedia("(pointer: coarse)").matches) {
  document.body.style.cursor = "auto";
  cm.style.display = "none";
  ct.style.display = "none";
}

let mx = innerWidth / 2,  my = innerHeight / 2;
let tx = mx,              ty = my;

window.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cm.style.left = mx + "px";
  cm.style.top  = my + "px";
  if (Math.random() < 0.06) makeSpark(mx, my);
});

// Lazy trailing dot
(function loop() {
  tx += (mx - tx) * 0.18;
  ty += (my - ty) * 0.18;
  ct.style.left = tx + "px";
  ct.style.top  = ty + "px";
  requestAnimationFrame(loop);
})();

// Spark particles — colours are refreshed when the palette changes
let sparkColors = [];

export function refreshSparkColors() {
  const cs = getComputedStyle(document.body);
  sparkColors = [
    cs.getPropertyValue("--accent").trim(),
    cs.getPropertyValue("--accent-2").trim(),
    cs.getPropertyValue("--plum").trim(),
  ];
}
refreshSparkColors();

function makeSpark(x, y) {
  const el = document.createElement("div");
  el.className = "spark";
  el.style.left = x + (Math.random() * 30 - 15) + "px";
  el.style.top  = y + (Math.random() * 30 - 15) + "px";
  const c = sparkColors[Math.floor(Math.random() * sparkColors.length)] || "#ff8fb8";
  el.innerHTML = `<svg viewBox="0 0 24 24" fill="${c}" width="100%" height="100%">
    <path d="M12 2l1.5 6L20 10l-6 1.5L12 18l-2-6.5L4 10l6-2z"/>
  </svg>`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 700);
}
