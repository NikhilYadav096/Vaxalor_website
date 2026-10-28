"use client";

import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { afterLoad, dur, ease, offset, stagger as stag, trigger as trig } from "@/lib/motion";
import { useMotion } from "./useMotion";

type Props = {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  /** "up" fades and rises, "fade" only fades, "line" draws a rule from the left, "children" staggers direct children. */
  variant?: "up" | "fade" | "line" | "children";
  delay?: number;
  start?: string;
};

export default function Reveal({
  as: Tag = "div",
  className = "",
  style,
  children,
  variant = "up",
  delay = 0,
  start = trig.default,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useMotion(
    ref,
    (_env, el) => {
      const targets: Element[] = variant === "children" ? Array.from(el.children) : [el];
      const from =
        variant === "line"
          ? { scaleX: 0, transformOrigin: "left center" }
          : variant === "fade"
            ? { autoAlpha: 0 }
            : { autoAlpha: 0, y: offset.rise };
      const to =
        variant === "line"
          ? { scaleX: 1, duration: 1.2, ease: ease.inOut }
          : { autoAlpha: 1, y: 0, duration: dur.base, ease: ease.out };

      gsap.set(targets, from);
      const tween = gsap.to(targets, {
        ...to,
        delay,
        stagger: variant === "children" ? stag.list : 0,
        paused: true,
      });

      // Play once the element is on screen and the loading screen is gone.
      const st = ScrollTrigger.create({
        trigger: el,
        start,
        once: true,
        onEnter: () => afterLoad(() => tween.play()),
      });
      return () => st.kill();
    },
    [variant, delay]
  );

  const attr = variant === "line" ? { "data-reveal-line": "" } : { "data-reveal": variant };
  return (
    <Tag ref={ref} className={className} style={style} {...attr}>
      {children}
    </Tag>
  );
}
