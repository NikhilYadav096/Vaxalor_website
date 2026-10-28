"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { afterLoad, ease } from "@/lib/motion";
import { useMotion } from "./useMotion";

// Counts up when scrolled into view. The final value is in the markup, so it reads correctly without motion.
export default function Counter({
  to,
  suffix = "",
  plain = false,
}: {
  to: number;
  suffix?: string;
  /** Skip thousands separators (years). */
  plain?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const fmt = (n: number) => (plain ? String(n) : n.toLocaleString("en-IN"));

  useMotion(ref, (_env, el) => {
    const state = { v: 0 };
    el.textContent = fmt(0) + suffix;
    const tween = gsap.to(state, {
      v: to,
      duration: 1.8,
      ease: ease.out,
      paused: true,
      onUpdate: () => {
        el.textContent = fmt(Math.round(state.v)) + suffix;
      },
    });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 92%",
      once: true,
      onEnter: () => afterLoad(() => tween.play()),
    });
    return () => {
      st.kill();
      el.textContent = fmt(to) + suffix;
    };
  });

  return (
    <b ref={ref}>
      {fmt(to)}
      {suffix}
    </b>
  );
}
