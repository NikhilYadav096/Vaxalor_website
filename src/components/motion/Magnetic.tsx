"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ease } from "@/lib/motion";
import { useMotion } from "./useMotion";

// Pulls its child gently toward the pointer. Desktop with a fine pointer only; touch and reduced motion see nothing.
export default function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useMotion(
    ref,
    ({ desktop }, el) => {
      if (!desktop || !window.matchMedia("(pointer: fine)").matches) return;
      const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.5)" });
      const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.5)" });

      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        x((e.clientX - (r.left + r.width / 2)) * strength);
        y((e.clientY - (r.top + r.height / 2)) * strength);
      };
      const leave = () => {
        x(0);
        y(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
        gsap.to(el, { x: 0, y: 0, duration: 0.3, ease: ease.soft });
      };
    },
    [strength]
  );

  return (
    <span ref={ref} className={`magnetic ${className}`}>
      {children}
    </span>
  );
}
