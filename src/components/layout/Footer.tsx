import Link from "next/link";
import SplitText from "@/components/motion/SplitText";
import BackToTop from "./BackToTop";
import { nav, site } from "@/data/site";
import { pillars } from "@/data/services";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <p className="footer-lede">{site.tagline}</p>
            <p className="footer-sub">
              We build websites, apps, AI solutions and business systems, shipped in 20 days and built to last.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="footer-h">Explore</h2>
            <ul>
              <li><Link href="/">Home</Link></li>
              {nav.map((n) => (
                <li key={n.href}><Link href={n.href}>{n.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <h2 className="footer-h">Services</h2>
            <ul>
              {pillars.map((p) => (
                <li key={p.slug}><Link href={`/services/${p.slug}`}>{p.title}</Link></li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="footer-h">Talk to us</h2>
            <ul>
              <li>{site.contactPerson}</li>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><a href={`mailto:${site.generalEmail}`}>{site.generalEmail}</a></li>
              <li><a href={site.phoneHref}>{site.phone}</a></li>
            </ul>
            <ul className="socials" aria-label="Social media">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}<span className="sr-only"> (opens in a new tab)</span></a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="wordmark" aria-hidden="true">
          <SplitText as="span" mode="chars" start="top 98%">Vaxalor</SplitText>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Vaxalor. All rights reserved.</span>
          <span className="legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/faq">FAQ</Link>
          </span>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
