"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { afterLoad, dur, ease } from "@/lib/motion";
import { media } from "@/data/media";
import SplitText from "@/components/motion/SplitText";
import Reveal from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import { useMotion } from "@/components/motion/useMotion";
import VideoSlot from "@/components/ui/VideoSlot";

// The hero sets the motion language for the whole site:
// headline lines rise first, then copy and calls to action, then the media frame, then the mascot pops in.
// Scrolling expands the frame from an inset card to full width.
function HeroMedia() {
  const ref = useRef<HTMLDivElement>(null);

  useMotion(ref, ({ desktop }, el) => {
    const frame = el.querySelector<HTMLElement>(".hero-frame");
    const art = el.querySelector<HTMLElement>(".vs-art, video");
    const mascot = el.querySelector<HTMLElement>(".hero-mascot");
    let dead = false;

    gsap.set(el, { autoAlpha: 0, y: 90 });
    if (mascot) gsap.set(mascot, { scale: 0, rotation: -24 });

    afterLoad(() => {
      if (dead) return;
      gsap.to(el, { autoAlpha: 1, y: 0, duration: dur.hero, ease: ease.expo, delay: 1.0 });
      if (mascot) {
        gsap.to(mascot, { scale: 1, rotation: 0, duration: 1, ease: "back.out(1.7)", delay: 1.9 });
        gsap.to(mascot, { y: -14, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2.9 });
      }
    });

    if (desktop && frame) {
      gsap.fromTo(
        frame,
        { clipPath: "inset(0% 7% 0% 7% round 28px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: ease.none,
          scrollTrigger: { trigger: el, start: "top 88%", end: "top 12%", scrub: 0.6 },
        }
      );
      if (art) {
        gsap.fromTo(
          art,
          { scale: 1, yPercent: -4 },
          {
            scale: 1.12,
            yPercent: 6,
            ease: ease.none,
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      }
    }
    return () => {
      dead = true;
    };
  });

  return (
    <div className="hero-media" ref={ref}>
      <div className="hero-frame">
        <VideoSlot src={media.heroVideo} poster={media.heroPoster} className="hero-video" />
      </div>
      <div className="hero-mascot">
        <Image src="/images/mascot.png" alt="" width={596} height={419} sizes="(max-width: 900px) 120px, 220px" />
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero" aria-label="Introduction">
      <div className="wrap hero-top">
        <Reveal variant="fade" delay={0.15} className="hero-eyebrow">
          <span className="pulse" aria-hidden="true" />
          Digital studio<span className="eyebrow-more"> · Websites, apps &amp; AI</span>
        </Reveal>

        <SplitText as="h1" mode="lines" className="hero-title" delay={0.25}>
          We build digital products with <span className="accent">soul.</span>
        </SplitText>

        <div className="hero-row">
          <Reveal as="p" delay={0.7} className="hero-sub">
            From websites to AI solutions, shipped in 20 days and built to last.
          </Reveal>
          <Reveal delay={0.85} className="hero-ctas">
            <Magnetic>
              <Link href="/contact" className="btn btn-primary">
                Start your project <span aria-hidden="true">→</span>
              </Link>
            </Magnetic>
            <Link href="/work" className="btn btn-ghost">
              See our work
            </Link>
          </Reveal>
        </div>
      </div>

      <HeroMedia />
    </section>
  );
}
