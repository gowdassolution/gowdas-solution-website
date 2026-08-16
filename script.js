/* ==========================================================
   Gowda's Solution — interactions (restrained)
   ========================================================== */

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const canHover = window.matchMedia("(hover: hover) and (min-width: 861px)").matches;

/* Year */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Live Bengaluru clock (IST, UTC+5:30) ---------- */
(function clock() {
  const els = [document.getElementById("clock"), document.getElementById("clock2")].filter(Boolean);
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false,
  });
  const tick = () => {
    const t = fmt.format(new Date());
    els.forEach((el) => (el.textContent = "BLR " + t));
  };
  tick();
  setInterval(tick, 1000 * 15);
})();

/* ---------- Masthead pin + mobile menu ---------- */
const masthead = document.getElementById("masthead");
const menuBtn = document.getElementById("menuBtn");
const drawer = document.getElementById("drawer");

window.addEventListener("scroll", () => {
  masthead.classList.toggle("pinned", window.scrollY > 24);
}, { passive: true });

function closeDrawer() {
  masthead.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
  drawer.hidden = true;
}
menuBtn.addEventListener("click", () => {
  const open = !masthead.classList.contains("open");
  masthead.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  drawer.hidden = !open;
});
drawer.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeDrawer));

/* ---------- Anchor scrolling (native, reliable) ----------
   Uses the browser's own smooth scroll (CSS scroll-behavior); no
   rAF-driven library that could stall when the tab is throttled. */
function scrollToId(id) {
  const el = document.querySelector(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 68;
  window.scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" });
}
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (id.length > 1 && document.querySelector(id)) {
      e.preventDefault();
      closeDrawer();
      scrollToId(id);
    }
  });
});
document.getElementById("backTop").addEventListener("click", () => scrollToId("#top"));

/* ---------- Work index: floating preview plate ---------- */
if (canHover) {
  const plate = document.getElementById("plate");
  const plateName = document.getElementById("plateName");
  const screen = plate.querySelector(".plate__screen");
  const rows = document.querySelectorAll(".row");
  let raf = null, tx = 0, ty = 0, cx = 0, cy = 0, active = false;

  const move = () => {
    cx += (tx - cx) * 0.16;
    cy += (ty - cy) * 0.16;
    // Keep the preview card fully inside the viewport (it's centred on the
    // cursor via translate(-50%,-50%), so clamp its centre by half its size).
    const hw = plate.offsetWidth / 2, hh = plate.offsetHeight / 2, m = 14;
    const px = Math.min(Math.max(cx, hw + m), window.innerWidth - hw - m);
    const py = Math.min(Math.max(cy, hh + m), window.innerHeight - hh - m);
    plate.style.left = px + "px";
    plate.style.top = py + "px";
    if (active || Math.abs(tx - cx) > 0.5) raf = requestAnimationFrame(move);
  };

  rows.forEach((row) => {
    row.addEventListener("mouseenter", () => {
      active = true;
      plateName.textContent = row.dataset.plate;
      screen.style.setProperty("--tone", getComputedStyle(row).getPropertyValue("--tone"));
      plate.classList.add("show");
      if (!raf) raf = requestAnimationFrame(move);
    });
    row.addEventListener("mouseleave", () => {
      active = false;
      plate.classList.remove("show");
    });
    row.addEventListener("mousemove", (e) => {
      tx = e.clientX; ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(move);
    });
  });
}

/* ---------- Contact form (front-end only) ---------- */
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.target;
  const status = document.getElementById("formStatus");
  const name = f.name.value.trim();
  const email = f.email.value.trim();
  const message = f.message.value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !emailOk || !message) {
    status.style.color = "#b0603f";
    status.textContent = "Add your name, a valid email, and a note.";
    return;
  }
  status.style.color = "";
  status.textContent = `Thanks, ${name.split(" ")[0]} — noted. (Wire a backend to deliver this.)`;
  f.reset();
});
