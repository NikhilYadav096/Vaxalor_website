"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { ease, getLenis, hold, release } from "@/lib/motion";

// Curtain wipe between routes. Internal link clicks are intercepted, the curtain rises, the route changes underneath,
// then the curtain lifts as the new page's entrance animations begin. Back/forward, new tabs, modified clicks,
// hash links and reduced-motion visitors use the browser's normal navigation.
export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const curtain = useRef<HTMLDivElement>(null);
  const covering = useRef(false);
  const failsafe = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//")) return;
      if (a.target && a.target !== "_self") return;
      if (a.hasAttribute("download")) return;

      const url = new URL(href, window.location.href);
      if (url.pathname === window.location.pathname) return; // same page or in-page hash: let the browser handle it
      if (covering.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      e.preventDefault();
      e.stopPropagation(); // capture phase: stops next/link from navigating on its own
      covering.current = true;
      hold();
      getLenis()?.stop();
      document.documentElement.classList.add("is-transitioning");

      gsap.fromTo(
        curtain.current,
        { yPercent: 0 },
        {
          yPercent: -100,
          duration: 0.75,
          ease: ease.inOut,
          onComplete: () => router.push(href + url.search + url.hash),
        }
      );
      // If navigation never lands, don't leave the visitor staring at a curtain.
      failsafe.current = window.setTimeout(lift, 4000);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  function lift() {
    window.clearTimeout(failsafe.current);
    if (!covering.current) return;
    getLenis()?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    // Let the new page mount and register its animations, then lift in step with them.
    window.setTimeout(() => {
      release();
      gsap.to(curtain.current, {
        yPercent: -200,
        duration: 0.85,
        ease: ease.inOut,
        onComplete: () => {
          gsap.set(curtain.current, { yPercent: 0 });
          covering.current = false;
          document.documentElement.classList.remove("is-transitioning");
          getLenis()?.start();
        },
      });
    }, 120);
  }

  useEffect(() => {
    if (covering.current) lift();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return <div ref={curtain} className="curtain" aria-hidden="true" />;
}
