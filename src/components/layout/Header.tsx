"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { afterLoad, dur, ease, getLenis } from "@/lib/motion";
import { nav, site } from "@/data/site";
import Magnetic from "@/components/motion/Magnetic";
import { useMotion } from "@/components/motion/useMotion";

function Roll({ children }: { children: string }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLElement>(null);

  // Drop in after the loader, then tuck away on scroll down and return on scroll up.
  useMotion(bar, (_env, el) => {
    let dead = false;
    gsap.set(el, { yPercent: -160, autoAlpha: 0 });
    afterLoad(() => {
      if (!dead) gsap.to(el, { yPercent: 0, autoAlpha: 1, duration: dur.hero, ease: ease.expo, delay: 0.2 });
    });

    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const hide = self.direction === 1 && self.scroll() > 240;
        // Wait for the entrance to finish before taking over the position.
        if (gsap.getProperty(el, "opacity") !== 1) return;
        gsap.to(el, { yPercent: hide ? -160 : 0, duration: 0.55, ease: ease.soft, overwrite: "auto" });
      },
    });
    return () => {
      dead = true;
      st.kill();
    };
  });

  useEffect(() => setOpen(false), [pathname]);

  // Lock scroll and listen for Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    getLenis()?.stop();
    document.documentElement.classList.add("menu-open");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("menu-open");
      getLenis()?.start();
    };
  }, [open]);

  const current = (href: string) => (pathname === href || pathname.startsWith(href + "/") ? "page" : undefined);

  return (
    <>
      <header className="header" ref={bar}>
        <div className="header-pill">
          <Link href="/" className="brand" aria-label="Vaxalor, home">
            <Image src="/images/logo.png" alt="" width={36} height={30} loading="eager" />
            <span>Vaxalor</span>
          </Link>
          <nav className="nav-links" aria-label="Primary">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} aria-current={current(n.href)}>
                <Roll>{n.label}</Roll>
              </Link>
            ))}
          </nav>
          <div className="header-cta">
            <Magnetic strength={0.25}>
              <Link href="/contact" className="btn btn-primary btn-sm">
                <Roll>Let&apos;s Talk</Roll>
              </Link>
            </Magnetic>
          </div>
          <button
            type="button"
            className="burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div id="mobile-menu" className={`menu${open ? " open" : ""}`} inert={!open}>
        <nav aria-label="Mobile">
          <ul>
            <li style={{ ["--i" as string]: 0 }}>
              <Link href="/">Home</Link>
            </li>
            {nav.map((n, i) => (
              <li key={n.href} style={{ ["--i" as string]: i + 1 }}>
                <Link href={n.href} aria-current={current(n.href)}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="menu-foot">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={site.phoneHref}>{site.phone}</a>
        </div>
      </div>
    </>
  );
}
