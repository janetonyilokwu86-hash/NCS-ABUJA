const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");
const hero = document.querySelector(".hero");
const heroSlides = Array.from(document.querySelectorAll(".hero-slide"));
const heroDots = Array.from(document.querySelectorAll(".hero-dot"));
const heroSlideCount = document.querySelector(".hero-slide-count");
const librarySearch = document.querySelector("#library-search-input");
const librarySearchStatus = document.querySelector("#library-search-status");
const libraryItems = Array.from(document.querySelectorAll(".library .document-item"));

let activeHeroSlide = 0;
let touchStartX = null;

function showHeroSlide(index) {
  activeHeroSlide = (index + heroSlides.length) % heroSlides.length;

  heroSlides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === activeHeroSlide;
    slide.classList.toggle("is-active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
    slide.inert = !isActive;
  });

  heroDots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === activeHeroSlide;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-pressed", String(isActive));
  });

  heroSlideCount.textContent = `${String(activeHeroSlide + 1).padStart(2, "0")} / ${String(heroSlides.length).padStart(2, "0")}`;
}

if (hero && heroSlides.length && heroDots.length && heroSlideCount) {
  document.querySelector(".hero-previous")?.addEventListener("click", () => {
    showHeroSlide(activeHeroSlide - 1);
  });

  document.querySelector(".hero-next")?.addEventListener("click", () => {
    showHeroSlide(activeHeroSlide + 1);
  });

  heroDots.forEach((dot, index) => {
    dot.addEventListener("click", () => showHeroSlide(index));
  });

  hero.addEventListener("keydown", (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showHeroSlide(activeHeroSlide - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showHeroSlide(activeHeroSlide + 1);
    }
  });

  hero.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "touch" && !event.target.closest("a, button")) {
      touchStartX = event.clientX;
    }
  });

  hero.addEventListener("pointerup", (event) => {
    if (touchStartX === null) return;
    const swipeDistance = event.clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(swipeDistance) < 48) return;
    showHeroSlide(activeHeroSlide + (swipeDistance < 0 ? 1 : -1));
  });

  hero.addEventListener("pointercancel", () => {
    touchStartX = null;
  });
}

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    primaryNav.classList.toggle("is-open", !isOpen);
  });

  primaryNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      primaryNav.classList.remove("is-open");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      primaryNav.classList.remove("is-open");
      menuToggle.focus();
    }
  });
}

if (librarySearch && librarySearchStatus) {
  librarySearch.addEventListener("input", () => {
    const query = librarySearch.value.trim().toLocaleLowerCase();
    let visibleItems = 0;

    libraryItems.forEach((item) => {
      const matches = item.textContent.toLocaleLowerCase().includes(query);
      item.hidden = !matches;
      if (matches) visibleItems += 1;
    });

    document.querySelectorAll(".library-group").forEach((group) => {
      const hasVisibleItems = group.querySelector(".document-item:not([hidden])") !== null;
      group.hidden = !hasVisibleItems;
    });

    librarySearchStatus.textContent = query
      ? `${visibleItems} ${visibleItems === 1 ? "document" : "documents"} found`
      : "Showing all library items";
  });
}
