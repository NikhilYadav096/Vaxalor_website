"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ease } from "@/lib/motion";
import { process } from "@/data/site";
import SplitText from "@/components/motion/SplitText";
import Reveal from "@/components/motion/Reveal";
import { useMotion } from "@/components/motion/useMotion";

// Four steps, idea to launch. On desktop the title column stays put while the steps scroll past:
// a progress line fills, the active step lights up and the day range on the left follows.
export default function Process() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useMotion(root, ({ desktop }, el) => {
    if (!desktop) return;
    const steps = Array.from(el.querySelectorAll<HTMLElement>(".step"));
    const bar = el.querySelector<HTMLElement>(".proc-bar-fill");
    const triggers: ScrollTrigger[] = [];

    steps.forEach((step, i) => {
      triggers.push(
        ScrollTrigger.create({
          trigger: step,
          start: "top 58%",
          end: "bottom 58%",
          onToggle: (self) => self.isActive && setActive(i),
        })
      );
    });

    if (bar) {
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: ease.none,
          transformOrigin: "left center",
          scrollTrigger: { trigger: el.querySelector(".proc-steps"), start: "top 58%", end: "bottom 58%", scrub: true },
        }
      );
    }
    return () => triggers.forEach((t) => t.kill());
  });

  return (
    <section className="section process" ref={root} aria-labelledby="process-title">
      <div className="wrap proc-grid">
        <div className="proc-side">
          <Reveal className="label" variant="fade">
            <span>(05)</span> How we work
          </Reveal>
          <SplitText as="h2" className="h-lg">
            <span id="process-title">From idea to launch in</span> <span className="accent">four steps.</span>
          </SplitText>
          <div className="proc-days" aria-hidden="true">
            <span key={active} className="proc-days-text">{process[active].days}</span>
          </div>
          <div className="proc-track" aria-hidden="true">
            <div className="proc-bar">
              <div className="proc-bar-fill" />
            </div>
            <ol className="proc-ticks">
              {process.map((s, i) => (
                <li key={s.n} className={i === active ? "is-current" : i < active ? "is-done" : ""}>
                  <span className="tick-n">{s.n}</span>
                  <span className="tick-t">{s.title}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <ol className="proc-steps">
          {process.map((s, i) => (
            <li key={s.n} className={`step${i === active ? " is-active" : ""}`}>
              <span className="step-n">{s.n}</span>
              <div>
                <h3>{s.title}</h3>
                <p className="step-days">{s.days}</p>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
