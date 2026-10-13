const navItems = [
  ["Home", "index.html", "home"],
  ["About", "about.html", "about"],
  ["Membership", "membership.html", "membership"],
  ["Events", "events.html", "events"],
  ["Initiatives", "initiatives.html", "initiatives"],
  ["Library", "library.html", "library"],
  ["Get involved", "get-involved.html", "get-involved"],
  ["Contact", "contact.html", "contact"],
];

const currentPage = document.body.dataset.page || "home";
const headerMount = document.querySelector("[data-site-header]");
const footerMount = document.querySelector("[data-site-footer]");

if (headerMount) {
  headerMount.outerHTML = `
    <header class="site-header">
      <div class="header-inner">
        <a class="brand" href="index.html" aria-label="NCS Abuja home">
          <img class="brand-logo" src="assets/cropped-ncs-abuja-logo-sml.png" alt="Nigeria Computer Society, Abuja Chapter">
        </a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Open navigation">
          <span></span><span></span>
        </button>
        <nav class="primary-nav" id="primary-nav" aria-label="Main navigation">
          ${navItems.map(([label, href, key]) => `<a href="${href}"${currentPage === key ? ' aria-current="page"' : ""}>${label}</a>`).join("")}
          <a class="nav-join" href="https://www.ncs.org.ng/membership-2/" target="_blank" rel="noreferrer">Join NCS</a>
        </nav>
      </div>
    </header>`;
}

if (footerMount) {
  footerMount.outerHTML = `
    <footer class="site-footer">
      <div class="footer-main">
        <div class="footer-brand-block">
          <img class="footer-logo" src="assets/cropped-ncs-abuja-logo-sml.png" alt="Nigeria Computer Society, Abuja Chapter">
          <p>Connecting technology professionals with the future of Nigeria.</p>
        </div>
        <div class="footer-contact">
          <span class="footer-label">CONTACT THE CHAPTER</span>
          <a href="mailto:abujachapter@ncs.org.ng">abujachapter@ncs.org.ng</a>
          <a href="mailto:info@ncsabuja.org.ng">info@ncsabuja.org.ng</a>
          <a href="tel:+2348164430384">+234 816 443 0384</a>
        </div>
        <div class="footer-address">
          <span class="footer-label">ABUJA OFFICE</span>
          <p>Plot 1321, Aderemi Adesoji Street,<br>Gudu District, Abuja, Nigeria</p>
          <a href="https://www.google.com/maps/search/?api=1&amp;query=Plot+1321+Aderemi+Adesoji+Street+Gudu+District+Abuja" target="_blank" rel="noreferrer">Open map ↗</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© <span data-current-year>2026</span> NCS Abuja Chapter</span>
        <nav aria-label="Footer navigation">
          <a href="library.html">Library</a>
          <a href="contact.html">Contact</a>
          <a href="https://ncsabuja.org.ng/privacy-policy/" target="_blank" rel="noreferrer">Privacy</a>
          <a href="https://ncs.org.ng" target="_blank" rel="noreferrer">Nigeria Computer Society ↗</a>
        </nav>
      </div>
    </footer>`;
  document.querySelector("[data-current-year]").textContent = new Date().getFullYear();
}
