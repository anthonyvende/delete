import { ChevronIcon } from "./ui/ChevronIcon";

type NavItem = {
  label: string;
  href: string;
  items?: { label: string; href: string }[];
};

const navItems: NavItem[] = [
  {
    label: "About Us",
    href: "/about/",
    items: [
      { label: "Our Story", href: "/about/" },
      { label: "Our Leadership", href: "/about/leadership/" },
    ],
  },
  { label: "Pipeline", href: "/pipeline/" },
  {
    label: "Platform",
    href: "/platform/how-sab-142-works/",
    items: [
      { label: "How SAB-142 Works", href: "/platform/how-sab-142-works/" },
      { label: "Manufacturing", href: "/platform/manufacturing/" },
    ],
  },
  { label: "Patients", href: "/patients/about-sab-142/" },
  { label: "Investors & Media", href: "/#news-section" },
  { label: "Careers", href: "/careers/" },
];

export function SiteHeader() {
  return (
    <header className="site-header" data-menu-open="false" data-site-header>
      <div className="header-inner">
        <a className="brand" href="/" aria-label="SAB Bio home">
          <img src="/assets/sab-bio-logo.svg" alt="SAB Bio" />
        </a>
        <div className="nav-shell">
          <button
            className="menu-button"
            type="button"
            aria-expanded="false"
            aria-controls="primary-navigation"
            aria-label="Open navigation"
            data-menu-toggle
          >
            <span className="menu-button__icon" aria-hidden="true" />
          </button>
          <nav
            className="site-nav"
            id="primary-navigation"
            aria-label="Primary navigation"
            data-menu-panel
            data-open="false"
          >
            {navItems.map(({ label, href, items }) =>
              items ? (
                <div className="site-nav__item" key={href}>
                  <a className="site-nav__link" href={href}>
                    <span className="site-nav__label">{label}</span>
                    <span className="site-nav__chevron" aria-hidden="true">
                      <ChevronIcon />
                    </span>
                  </a>
                  <div
                    className="site-nav__submenu"
                    aria-label={`${label} pages`}
                  >
                    {items.map((item) => (
                      <a
                        className="site-nav__sublink"
                        href={item.href}
                        key={item.href}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a href={href} key={href}>
                  <span className="site-nav__label">{label}</span>
                </a>
              ),
            )}
            <a className="button button--secondary nav-cta" href="/contact/">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
