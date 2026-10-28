"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { isLoaded, setLenis } from "@/lib/motion";

// Smooth scrolling and ScrollTrigger housekeeping. Rendered once in the root layout.
export default function MotionProvider() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.1,
    });
    setLenis(lenis);
    if (!isLoaded()) lenis.stop();
    const start = () => lenis.start();
    window.addEventListener("vx:loaded", start);

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Layout shifts when fonts and images arrive; keep trigger positions honest.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    let t = 0;
    const onResize = () => {
      window.clearTimeout(t);
      t = window.setTimeout(refresh, 250);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("vx:loaded", start);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
