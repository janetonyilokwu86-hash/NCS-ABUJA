/* Shared header, footer and cookie banner for every page. */
document.documentElement.classList.add("js");

const JOIN_URL = "https://www.ncs.org.ng/membership-2/";

const navItems = [
  ["About", "about.html", "about"],
  ["Membership", "membership.html", "membership"],
  ["Events", "events.html", "events"],
  ["Initiatives", "initiatives.html", "initiatives"],
  ["Library", "library.html", "library"],
  ["Get involved", "get-involved.html", "get-involved"],
  ["Contact", "contact.html", "contact"],
];

const page = document.body.dataset.page || "home";
const headerMount = document.querySelector("[data-site-header]");
const footerMount = document.querySelector("[data-site-footer]");

if (headerMount) {
  headerMount.outerHTML = `
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="index.html" aria-label="NCS Abuja Chapter home">
          <img src="assets/cropped-ncs-abuja-logo-sml.png" alt="Nigeria Computer Society, Abuja Chapter" width="110" height="65">
        </a>
        <nav class="primary-nav" id="primary-nav" aria-label="Main">
          ${navItems.map(([label, href, key]) => `<a class="nav-link" href="${href}"${page === key ? ' aria-current="page"' : ""}>${label}</a>`).join("")}
          <div class="mobile-cta"><a class="btn btn-dark" href="${JOIN_URL}" target="_blank" rel="noreferrer">Join NCS</a></div>
        </nav>
        <div class="header-cta">
          <a class="btn btn-dark btn-sm" href="${JOIN_URL}" target="_blank" rel="noreferrer">Join NCS</a>
          <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu"><span></span><span></span></button>
        </div>
      </div>
    </header>`;
}

if (footerMount) {
  footerMount.outerHTML = `
    <footer class="site-footer on-dark">
      <img class="field-bg" src="assets/img/bg-halftone.webp" alt="" loading="lazy">
      <div class="container">
        <div class="footer-cta">
          <h2>Join Abuja’s community of computing professionals.</h2>
          <div class="actions">
            <a class="btn btn-light" href="${JOIN_URL}" target="_blank" rel="noreferrer">Become a member</a>
            <a class="btn btn-outline-light" href="contact.html">Contact the chapter</a>
          </div>
        </div>
        <div class="footer-grid">
          <div class="footer-brand">
            <img src="assets/cropped-ncs-abuja-logo-sml.png" alt="Nigeria Computer Society, Abuja Chapter" width="110" height="65" loading="lazy">
            <p>The Abuja Chapter of the Nigeria Computer Society, the umbrella body for information technology professionals in Nigeria since 1978.</p>
            <div class="socials">
              <a href="https://www.youtube.com/@ncsabujachapter7278" target="_blank" rel="noreferrer" aria-label="NCS Abuja on YouTube"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z"/></svg></a>
              <a href="mailto:info@ncsabuja.org.ng" aria-label="Email NCS Abuja"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 5.5A1.5 1.5 0 0 1 3.5 4h17A1.5 1.5 0 0 1 22 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 18.5v-13Zm2 .9v.3l8 5.3 8-5.3v-.3H4Zm16 2.7-7.4 4.9a1 1 0 0 1-1.2 0L4 9.1V18h16V9.1Z"/></svg></a>
            </div>
          </div>
          <div class="footer-col">
            <h2>Chapter</h2>
            <ul>
              <li><a href="about.html">About us</a></li>
              <li><a href="about.html#leadership">Leadership</a></li>
              <li><a href="initiatives.html">Initiatives</a></li>
              <li><a href="events.html">Events and advocacy</a></li>
              <li><a href="library.html">Library</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h2>Take part</h2>
            <ul>
              <li><a href="membership.html">Membership</a></li>
              <li><a href="get-involved.html">Speak or volunteer</a></li>
              <li><a href="get-involved.html#partner">Partner with us</a></li>
              <li><a href="${JOIN_URL}" target="_blank" rel="noreferrer">Join on ncs.org.ng</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h2>Contact</h2>
            <ul>
              <li><a href="mailto:abujachapter@ncs.org.ng">abujachapter@ncs.org.ng</a></li>
              <li><a href="mailto:info@ncsabuja.org.ng">info@ncsabuja.org.ng</a></li>
              <li><a href="tel:+2348164430384">+234 816 443 0384</a></li>
              <li><address>Plot 1321, Aderemi Adesoji Street,<br>Gudu District, Abuja</address></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© <span data-current-year>2026</span> Nigeria Computer Society, Abuja Chapter</span>
          <nav aria-label="Legal">
            <a href="cookies.html">Cookie policy</a>
            <a href="#" data-cookie-settings>Cookie settings</a>
            <a href="https://web.archive.org/web/20260615182159/https://ncsabuja.org.ng/privacy-policy/" target="_blank" rel="noreferrer">Privacy policy</a>
            <a href="https://ncs.org.ng" target="_blank" rel="noreferrer">ncs.org.ng</a>
          </nav>
        </div>
      </div>
      <div class="footer-word" aria-hidden="true">NCS ABUJA</div>
    </footer>
    <div class="cookie-banner" role="dialog" aria-modal="false" aria-labelledby="cookie-title" hidden>
      <h2 id="cookie-title">Your privacy</h2>
      <p>We only store your choice. The video and map come from YouTube and Google and load only if you allow them. <a href="cookies.html">Cookie policy</a></p>
      <div class="actions">
        <button class="btn btn-dark" type="button" data-consent="all">Allow all</button>
        <button class="btn btn-outline" type="button" data-consent="essential">Essential only</button>
      </div>
    </div>`;
  const year = document.querySelector("[data-current-year]");
  if (year) year.textContent = new Date().getFullYear();
}
