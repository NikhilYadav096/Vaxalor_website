"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ease } from "@/lib/motion";
import { projects } from "@/data/content";
import SplitText from "@/components/motion/SplitText";
import Reveal from "@/components/motion/Reveal";
import ImageReveal from "@/components/motion/ImageReveal";
import ArrowLink from "@/components/ui/ArrowLink";
import { useMotion } from "@/components/motion/useMotion";

// Four full-height panels that stack: each one slides over the last, which shrinks and dims behind it.
// Mobile and reduced-motion get a plain vertical list.
export default function WorkStack() {
  const ref = useRef<HTMLElement>(null);

  useMotion(ref, ({ desktop }, el) => {
    if (!desktop) return;
    const panels = Array.from(el.querySelectorAll<HTMLElement>(".panel"));
    panels.forEach((panel, i) => {
      const next = panels[i + 1];
      if (!next) return;
      const inner = panel.querySelector<HTMLElement>(".panel-inner");
      const dim = panel.querySelector<HTMLElement>(".panel-dim");
      const st = { trigger: next, start: "top bottom", end: "top top", scrub: true };
      gsap.to(inner, { scale: 0.92, yPercent: -3, ease: ease.none, scrollTrigger: st });
      gsap.to(dim, { opacity: 0.55, ease: ease.none, scrollTrigger: st });
    });
  });

  return (
    <section className="work-stack" ref={ref} aria-labelledby="work-title">
      <div className="wrap work-head">
        <Reveal className="label" variant="fade">
          <span>(03)</span> Selected work
        </Reveal>
        <SplitText as="h2" className="h-lg">
          <span id="work-title">Projects we&apos;re</span> <span className="accent">proud of.</span>
        </SplitText>
      </div>

      {projects.map((p, i) => (
        <article key={p.slug} className={`panel tone-${p.tone}`}>
          <div className="panel-inner">
            <div className="panel-text">
              <span className="panel-idx">
                0{i + 1} / 0{projects.length}
              </span>
              <SplitText as="h3" className="h-lg panel-name" start="top 85%">
                {p.name}
              </SplitText>
              <p className="panel-type">{p.type}</p>
              <p className="panel-desc">
                {p.text} {p.note}
              </p>
              <ArrowLink href={`/work/${p.slug}`}>View project</ArrowLink>
            </div>
            <div className="panel-media">
              <ImageReveal
                src={p.image}
                alt={`${p.name} website preview`}
                width={p.width}
                height={p.height}
                from={i % 2 ? "left" : "right"}
                sizes="(max-width: 900px) 100vw, 55vw"
                className="panel-img"
              />
            </div>
          </div>
          <div className="panel-dim" aria-hidden="true" />
        </article>
      ))}
    </section>
  );
}
