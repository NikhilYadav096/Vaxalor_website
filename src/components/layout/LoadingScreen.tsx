"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { release } from "@/lib/motion";

function finish() {
  document.documentElement.classList.remove("loader-lock");
  try {
    sessionStorage.setItem("vx-loaded", "1");
  } catch {}
  release();
}

// Intro layer: two dots open outward, a star spins between them, then the layer lifts once the page has loaded.
// Shown once per browser session.
export default function LoadingScreen() {
  const layer = useRef<HTMLDivElement>(null);
  const left = useRef<HTMLSpanElement>(null);
  const mid = useRef<HTMLSpanElement>(null);
  const right = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains("loader-skip")) {
      finish();
      setGone(true);
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    let closed = false;

    const close = () => {
      if (closed) return;
      closed = true;
      gsap.to(layer.current, {
        yPercent: -100,
        duration: reduced ? 0.01 : 0.9,
        ease: "power3.inOut",
        onStart: () => release(),
        onComplete: () => {
          finish();
          setGone(true);
        },
      });
    };

    const tweens: gsap.core.Animation[] = [];
    if (!reduced) {
      const dist = 72;
      gsap.set(left.current, { x: -dist, rotation: -30 });
      gsap.set(right.current, { x: dist, rotation: 30 });
      tweens.push(
        gsap.to([left.current, right.current], { x: 0, rotation: 0, duration: 0.45, ease: "back.out(1.4)" }),
        gsap.to(mid.current, { rotation: "+=360", duration: 2.4, ease: "none", repeat: -1 }),
        gsap
          .timeline({ repeat: -1, repeatDelay: 0.12, delay: 0.45 })
          .to(left.current, { rotation: 18, duration: 0.24, ease: "back.out(2)" })
          .to(right.current, { rotation: -18, duration: 0.24, ease: "back.out(2)" }, "+=0.12")
          .to(left.current, { rotation: 0, duration: 0.24, ease: "back.out(2)" }, "+=0.12")
          .to(right.current, { rotation: 0, duration: 0.24, ease: "back.out(2)" }, "+=0.12")
      );
    }

    // Close after a minimum on-screen time and once the page has loaded (hard cap 5s).
    let minElapsed = false;
    let loaded = document.readyState === "complete";
    const tryClose = () => minElapsed && loaded && close();
    const onLoad = () => {
      loaded = true;
      tryClose();
    };
    timers.push(window.setTimeout(() => { minElapsed = true; tryClose(); }, reduced ? 100 : 800));
    if (!loaded) window.addEventListener("load", onLoad, { once: true });
    timers.push(window.setTimeout(() => { loaded = true; tryClose(); }, 1800));
    timers.push(window.setTimeout(close, 5000));

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("load", onLoad);
      tweens.forEach((t) => t.kill());
    };
  }, []);

  if (gone) return null;

  return (
    <div className="loader" ref={layer} aria-hidden="true">
      <span className="loader-icon dot" ref={left} />
      <span className="loader-icon star" ref={mid}>
        <svg viewBox="0 0 24 24" width="100%" height="100%">
          <path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12C7 11 11 7 12 0z" fill="currentColor" />
        </svg>
      </span>
      <span className="loader-icon dot" ref={right} />
    </div>
  );
}
