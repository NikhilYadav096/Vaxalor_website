"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ease } from "@/lib/motion";
import SplitText from "@/components/motion/SplitText";
import Reveal from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import { useMotion } from "@/components/motion/useMotion";

// Closing call to action. The rounded top edge flattens as it arrives, so the section "lands" on the page.
export default function FinalCta({ title = "Let's build something" }: { title?: string }) {
  const root = useRef<HTMLElement>(null);

  useMotion(root, ({ desktop }, el) => {
    if (!desktop) return;
    gsap.fromTo(
      el,
      { borderTopLeftRadius: "7vw", borderTopRightRadius: "7vw" },
      {
        borderTopLeftRadius: "0vw",
        borderTopRightRadius: "0vw",
        ease: ease.none,
        scrollTrigger: { trigger: el, start: "top bottom", end: "top 30%", scrub: true },
      }
    );
    const mascot = el.querySelector(".cta-mascot");
    if (mascot) {
      gsap.fromTo(
        mascot,
        { rotation: -10, yPercent: 10 },
        {
          rotation: 10,
          yPercent: -10,
          ease: ease.none,
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    }
  });

  return (
    <section className="cta on-night" ref={root} aria-labelledby="cta-title">
      <div className="wrap cta-grid">
        <div className="cta-main">
          <Reveal className="label" variant="fade">
            Start a conversation
          </Reveal>
          <SplitText as="h2" mode="lines" className="cta-title">
            <span id="cta-title">{title}</span> <span className="accent">with soul.</span>
          </SplitText>
          <Reveal as="p" className="lead" delay={0.2}>
            Tell us what you have in mind. We&apos;ll get back within 24 hours.
          </Reveal>
        </div>

        {/* Mascot and button share one column beside the headline, so the section reads as a single group. */}
        <div className="cta-side">
          <div className="cta-mascot" aria-hidden="true">
            <Image src="/images/mascot.png" alt="" width={596} height={419} sizes="(max-width: 900px) 110px, 220px" />
          </div>
          <Reveal delay={0.3}>
            <Magnetic strength={0.4}>
              <Link href="/contact" className="cta-btn">
                <span>Start a project</span>
                <span className="cta-btn-arr" aria-hidden="true">→</span>
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
