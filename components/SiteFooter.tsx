export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <a className="footer-brand" href="/" aria-label="SAB Bio home">
          <img src="/assets/sab-bio-logo.svg" alt="SAB Bio" />
        </a>
        <div className="footer-meta">
          <small className="footer-copyright">
            <span>©2026 SAB Biotherapeutics, Inc.</span>
            <span>All Rights Reserved</span>
          </small>
          <nav className="footer-links" aria-label="Legal and contact">
            <a href="/terms-conditions/">Terms and Conditions</a>
            <a href="/privacy-policy/">Privacy Policy</a>
            <a href="/conflict-of-interest-policy/">
              Conflict of Interest Policy
            </a>
            <a href="/contact/">Contact Us</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
