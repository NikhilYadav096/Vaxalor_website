"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ease } from "@/lib/motion";
import { useMotion } from "./useMotion";

// Endless ticker whose speed follows scroll velocity and whose direction follows scroll direction.
export default function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useMotion(ref, (_env, el) => {
    const track = el.querySelector<HTMLElement>(".marquee-track");
    if (!track) return;
    const loop = gsap.to(track, { xPercent: -50, duration: 38, ease: ease.none, repeat: -1 });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const v = Math.min(Math.abs(self.getVelocity()) / 260, 6);
        const dir = self.direction;
        gsap.to(loop, { timeScale: dir * (1 + v), duration: 0.4, overwrite: true });
        gsap.to(loop, { timeScale: dir, duration: 1.2, delay: 0.4, overwrite: false });
      },
    });
    return () => st.kill();
  });

  // Two copies, so translating by -50% loops seamlessly.
  const row = [...items, ...items];
  return (
    <div ref={ref} className={`marquee ${className}`} role="group" aria-label={items.join(", ")}>
      <div className="marquee-track" aria-hidden="true">
        {row.map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}
