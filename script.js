/* Interactions: header, menu, hero slider, scroll motion, lightbox, library search, cookie consent and embeds. */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Header ---------------------------------------------------------------- */
const header = document.querySelector(".site-header");
if (header) {
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");
if (menuToggle && primaryNav) {
  const setMenu = (open) => {
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    primaryNav.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  menuToggle.addEventListener("click", () => setMenu(menuToggle.getAttribute("aria-expanded") !== "true"));
  primaryNav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") { setMenu(false); menuToggle.focus(); }
  });
  window.matchMedia("(min-width: 1181px)").addEventListener("change", (e) => { if (e.matches) setMenu(false); });
}

/* Hero slideshow: background photos with arrows and dots ------------- */
document.querySelectorAll("[data-slider]").forEach((slider) => {
  const slides = Array.from(slider.querySelectorAll(".slide"));
  const dots = Array.from(slider.querySelectorAll(".hero-dot"));
  const title = slider.querySelector("[data-slide-title]");
  const meta = slider.querySelector("[data-slide-meta]");
  const count = slider.querySelector("[data-slide-count]");
  const live = slider.querySelector("[data-slide-live]");
  const interval = 6500;
  let index = 0;
  let timer = null;
  let paused = reduceMotion;

  const schedule = () => {
    clearTimeout(timer);
    if (!paused && slides.length > 1) timer = setTimeout(() => show(index + 1), interval);
  };
  const show = (next, announce = false) => {
    index = (next + slides.length) % slides.length;
    slides.forEach((s, i) => {
      const on = i === index;
      s.classList.toggle("is-active", on);
      s.setAttribute("aria-hidden", String(!on));
    });
    dots.forEach((d, i) => d.setAttribute("aria-current", i === index ? "true" : "false"));
    const s = slides[index];
    if (title) title.textContent = s.dataset.title || "";
    if (meta) meta.textContent = s.dataset.meta || "";
    if (count) count.textContent = `${index + 1} / ${slides.length}`;
    if (announce && live) live.textContent = `Photo ${index + 1} of ${slides.length}: ${s.dataset.title}`;
    schedule();
  };
  const pause = () => { paused = true; clearTimeout(timer); };
  const resume = () => { if (reduceMotion) return; paused = false; schedule(); };

  dots.forEach((d, i) => d.addEventListener("click", () => show(i, true)));
  slider.querySelector("[data-prev]")?.addEventListener("click", () => show(index - 1, true));
  slider.querySelector("[data-next]")?.addEventListener("click", () => show(index + 1, true));
  const controls = slider.querySelector(".hero-bar");
  controls?.addEventListener("mouseenter", pause);
  controls?.addEventListener("mouseleave", resume);
  slider.addEventListener("focusin", pause);
  slider.addEventListener("focusout", (e) => { if (!slider.contains(e.relatedTarget)) resume(); });
  slider.addEventListener("keydown", (e) => {
    if (e.target.closest("a, input")) return;
    if (e.key === "ArrowLeft") { e.preventDefault(); show(index - 1, true); }
    if (e.key === "ArrowRight") { e.preventDefault(); show(index + 1, true); }
  });
  let touchX = null;
  slider.addEventListener("pointerdown", (e) => { if (e.pointerType === "touch" && !e.target.closest("a, button")) touchX = e.clientX; });
  slider.addEventListener("pointerup", (e) => {
    if (touchX === null) return;
    const dx = e.clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1), true);
  });
  document.addEventListener("visibilitychange", () => (document.hidden ? pause() : resume()));
  show(0);
});

/* Scroll motion: slide-ins and image wipes ------------------------------ */
document.querySelectorAll("[data-stagger]").forEach((group) => {
  const dir = group.dataset.stagger || "up";
  Array.from(group.children).forEach((child, i) => {
    if (!child.hasAttribute("data-wipe")) child.setAttribute("data-slide", dir);
    child.style.setProperty("--d", `${Math.min(i, 6) * 90}ms`);
  });
});
const moving = Array.from(document.querySelectorAll("[data-slide], [data-wipe]"));
if (reduceMotion) {
  moving.forEach((el) => el.classList.add("is-in"));
} else {
  // Reveal anything whose box has reached the lower 90% of the viewport. A plain
  // position check is used alongside IntersectionObserver so nothing can stay hidden.
  let pending = moving.slice();
  const reveal = () => {
    const limit = window.innerHeight * 0.92;
    pending = pending.filter((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < limit && r.bottom > 0) { el.classList.add("is-in"); return false; }
      if (r.bottom <= 0) { el.classList.add("is-in"); return false; }
      return true;
    });
    if (!pending.length) {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    }
  };
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { ticking = false; reveal(); });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  window.addEventListener("load", reveal);
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    moving.forEach((el) => io.observe(el));
  }
  reveal();
}

/* Gallery lightbox ------------------------------------------------------ */
const figures = Array.from(document.querySelectorAll(".gallery figure"));
if (figures.length) {
  const box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", "Photo viewer");
  const svg = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${d}"/></svg>`;
  box.innerHTML = `<button class="lb-close" type="button" aria-label="Close">${svg("M6 6l12 12M18 6 6 18")}</button><button class="lb-prev" type="button" aria-label="Previous photo">${svg("M15 6l-6 6 6 6")}</button><button class="lb-next" type="button" aria-label="Next photo">${svg("M9 6l6 6-6 6")}</button><figure><img alt=""><figcaption></figcaption></figure>`;
  document.body.appendChild(box);
  const img = box.querySelector("img");
  const cap = box.querySelector("figcaption");
  let current = 0;
  let lastFocus = null;
  const render = () => {
    const f = figures[current];
    const src = f.querySelector("img");
    img.src = (src.getAttribute("src") || src.currentSrc).replace(/-sm\.webp$/, ".webp");
    img.alt = src.alt;
    cap.textContent = f.querySelector("figcaption")?.textContent || "";
  };
  const open = (i) => { current = i; render(); lastFocus = document.activeElement; box.classList.add("is-open"); box.querySelector(".lb-close").focus(); };
  const close = () => { box.classList.remove("is-open"); lastFocus?.focus(); };
  const step = (d) => { current = (current + d + figures.length) % figures.length; render(); };
  figures.forEach((f, i) => {
    f.tabIndex = 0;
    f.setAttribute("role", "button");
    f.setAttribute("aria-label", `Enlarge photo: ${f.querySelector("figcaption")?.textContent || f.querySelector("img").alt}`);
    f.addEventListener("click", () => open(i));
    f.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(i); } });
  });
  box.querySelector(".lb-close").addEventListener("click", close);
  box.querySelector(".lb-prev").addEventListener("click", () => step(-1));
  box.querySelector(".lb-next").addEventListener("click", () => step(1));
  box.addEventListener("click", (e) => { if (e.target === box) close(); });
  document.addEventListener("keydown", (e) => {
    if (!box.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
}

/* Library search -------------------------------------------------------- */
const search = document.querySelector("#library-search-input");
const searchStatus = document.querySelector("#library-search-status");
if (search && searchStatus) {
  const docs = Array.from(document.querySelectorAll(".doc-group .doc"));
  search.addEventListener("input", () => {
    const q = search.value.trim().toLocaleLowerCase();
    let shown = 0;
    docs.forEach((d) => {
      const match = d.textContent.toLocaleLowerCase().includes(q);
      d.closest("li").hidden = !match;
      if (match) shown += 1;
    });
    document.querySelectorAll(".doc-group").forEach((g) => { g.hidden = !g.querySelector("li:not([hidden])"); });
    searchStatus.textContent = q
      ? (shown ? `${shown} ${shown === 1 ? "document" : "documents"} found` : "No documents match. Try a broader word such as policy or 2023.")
      : `Showing all ${docs.length} documents`;
  });
}

/* Cookie consent and third-party embeds --------------------------------- */
const CONSENT_KEY = "ncs-abuja-consent";
const readConsent = () => { try { return localStorage.getItem(CONSENT_KEY); } catch { return null; } };
const writeConsent = (v) => { try { localStorage.setItem(CONSENT_KEY, v); } catch { /* storage blocked: banner shows again next visit */ } };

const loadEmbed = (embed, autoplay) => {
  if (embed.dataset.loaded) return;
  const frame = document.createElement("iframe");
  let src = embed.dataset.src;
  if (autoplay && src.includes("youtube")) src += (src.includes("?") ? "&" : "?") + "autoplay=1";
  frame.src = src;
  frame.title = embed.dataset.title || "Embedded content";
  frame.loading = "lazy";
  frame.referrerPolicy = embed.dataset.referrer || "strict-origin-when-cross-origin";
  frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  frame.allowFullscreen = true;
  embed.querySelector(".embed-facade, .map-placeholder")?.remove();
  embed.appendChild(frame);
  embed.dataset.loaded = "true";
};
const applyConsent = () => {
  if (readConsent() === "all") document.querySelectorAll(".embed[data-auto]").forEach((e) => loadEmbed(e, false));
};
document.querySelectorAll(".embed").forEach((embed) => {
  embed.querySelectorAll("[data-load-embed]").forEach((btn) => btn.addEventListener("click", () => loadEmbed(embed, true)));
});

const banner = document.querySelector(".cookie-banner");
if (banner) {
  const showBanner = () => { banner.hidden = false; requestAnimationFrame(() => banner.classList.add("is-visible")); };
  const hideBanner = () => { banner.classList.remove("is-visible"); setTimeout(() => { banner.hidden = true; }, 600); };
  banner.querySelectorAll("[data-consent]").forEach((btn) => btn.addEventListener("click", () => {
    writeConsent(btn.dataset.consent);
    hideBanner();
    applyConsent();
  }));
  document.querySelectorAll("[data-cookie-settings]").forEach((link) => link.addEventListener("click", (e) => { e.preventDefault(); showBanner(); banner.querySelector("button").focus(); }));
  if (!readConsent()) setTimeout(showBanner, 900);
}
applyConsent();
