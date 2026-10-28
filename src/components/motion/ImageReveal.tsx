"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { afterLoad, clip, dur, ease, trigger as trig, type ClipDirection } from "@/lib/motion";
import { useMotion } from "./useMotion";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Direction the clip-path wipe opens from. */
  from?: ClipDirection;
  /** Scroll parallax for the picture inside its frame, as a percentage of the frame height (desktop only). */
  parallax?: number;
  /** CSS aspect-ratio for the frame, e.g. "4 / 5". Defaults to the image's own ratio. */
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  fit?: "cover" | "contain";
  className?: string;
  delay?: number;
  children?: ReactNode;
};

// Image frame that wipes open (clip-path), settles from a slight zoom, and drifts against the scroll.
export default function ImageReveal({
  src,
  alt,
  width,
  height,
  from = "down",
  parallax = 0,
  ratio,
  sizes = "(max-width: 900px) 100vw, 50vw",
  priority,
  fit = "cover",
  className = "",
  delay = 0,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useMotion(
    ref,
    ({ desktop }, el) => {
      const img = el.querySelector<HTMLElement>(".ir-img");
      const [hidden, shown] = clip[from];

      gsap.set(el, { clipPath: hidden });
      if (img) gsap.set(img, { scale: 1.25 });

      const tl = gsap.timeline({ paused: true, delay });
      tl.to(el, { clipPath: shown, duration: dur.wipe, ease: ease.inOut }, 0);
      if (img) tl.to(img, { scale: 1, duration: dur.settle, ease: ease.expo }, 0);

      const st = ScrollTrigger.create({
        trigger: el,
        start: trig.default,
        once: true,
        onEnter: () => afterLoad(() => tl.play()),
      });

      // Drift: the picture is taller than its frame, so it can travel without exposing an edge.
      if (desktop && parallax && img) {
        gsap.fromTo(
          img,
          { yPercent: -parallax },
          {
            yPercent: parallax,
            ease: ease.none,
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      }
      return () => st.kill();
    },
    [from, parallax, delay]
  );

  const drift = parallax ? { height: `${100 + parallax * 4}%`, top: `${-parallax * 2}%` } : undefined;

  return (
    <div
      ref={ref}
      data-clip
      className={`ir ${className}`}
      style={{ aspectRatio: ratio ?? `${width} / ${height}` }}
    >
      <div className={`ir-img${parallax ? " drift" : ""}`} style={drift}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          style={{ objectFit: fit }}
        />
      </div>
      {children}
    </div>
  );
}
