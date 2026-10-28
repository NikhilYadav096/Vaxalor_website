"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { afterLoad, ease } from "@/lib/motion";
import { systems } from "@/data/services";
import SplitText from "@/components/motion/SplitText";
import Reveal from "@/components/motion/Reveal";
import { useMotion } from "@/components/motion/useMotion";

type Pt = readonly [number, number];
// `paths` overrides the default straight lines from the core to each module (used for the phone drawing's trunk).
type Layout = { box: string; core: Pt | null; pts: readonly Pt[]; w: number; h: number; paths?: readonly string[] };

// Two drawings of the same diagram. The wide one suits desktop; the compact one is laid out in a portrait box
// so its labels stay readable (about 14px) on a phone instead of shrinking to about 7px.
// "hub" fans five modules around a core, "flow" is a migration path.
const layouts: Record<"hub" | "flow", { wide: Layout; compact: Layout }> = {
  hub: {
    wide: { box: "0 0 560 380", core: [280, 180], pts: [[90, 70], [470, 70], [90, 290], [470, 290], [280, 336]], w: 108, h: 44 },
    // A central trunk with horizontal branches, so no line runs behind another module.
    compact: {
      box: "0 0 320 400",
      core: [160, 56],
      pts: [[84, 150], [236, 150], [84, 245], [236, 245], [160, 340]],
      w: 136,
      h: 50,
      paths: ["M160 82 V315", "M160 150 H84", "M160 150 H236", "M160 245 H84", "M160 245 H236"],
    },
  },
  flow: {
    wide: { box: "0 0 560 380", core: null, pts: [[70, 180], [175, 100], [280, 180], [385, 260], [490, 180]], w: 108, h: 44 },
    compact: { box: "0 0 320 400", core: null, pts: [[160, 40], [160, 120], [160, 200], [160, 280], [160, 360]], w: 190, h: 50 },
  },
};

function Graph({ layout, nodes, cls }: { layout: Layout; nodes: string[]; cls: string }) {
  const { core, pts, w, h, box, paths } = layout;
  const compact = cls.includes("compact");
  return (
    <svg
      viewBox={box}
      className={`sys-svg ${cls}`}
      role="img"
      aria-label={`Schematic of ${nodes.join(", ")}`}
    >
      {paths
        ? paths.map((d, i) => <path key={`l${i}`} className="sys-line" d={d} />)
        : pts.map(([x, y], i) => {
            const from = core ?? (i === 0 ? null : pts[i - 1]);
            if (!from) return null;
            return <path key={`l${i}`} className="sys-line" d={`M${from[0]} ${from[1]} L${x} ${y}`} />;
          })}
      {core && (
        <g className="sys-node core">
          <rect x={core[0] - (compact ? 64 : 56)} y={core[1] - 26} width={compact ? 128 : 112} height="52" rx="12" />
          <text x={core[0]} y={core[1] + (compact ? 6 : 5)} textAnchor="middle">Core</text>
        </g>
      )}
      {pts.map(([x, y], i) => (
        <g key={nodes[i]} className="sys-node">
          <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx="10" />
          <text x={x} y={y + (compact ? 6 : 5)} textAnchor="middle">{nodes[i]}</text>
        </g>
      ))}
    </svg>
  );
}

function Diagram({ id, nodes }: { id: string; nodes: string[] }) {
  const set = layouts[id === "legacy" ? "flow" : "hub"];
  return (
    <>
      <Graph layout={set.wide} nodes={nodes} cls="sys-svg-wide" />
      <Graph layout={set.compact} nodes={nodes} cls="sys-svg-compact" />
    </>
  );
}

export default function Systems() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const seen = useRef(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  // Draw the diagram: lines trace in, modules pop. Runs on first view and on every tab change.
  const draw = () => {
    const el = stage.current;
    if (!el) return;
    const lines = el.querySelectorAll<SVGPathElement>(".sys-line");
    const nodes = el.querySelectorAll<SVGGElement>(".sys-node");
    gsap.killTweensOf([...lines, ...nodes]);
    lines.forEach((l) => {
      // Both drawings are animated (only one is displayed). Some browsers can't measure a hidden path.
      let len = 400;
      try {
        len = l.getTotalLength() || len;
      } catch {}
      // visible again (they start hidden until first seen) but fully "undrawn"
      gsap.set(l, { autoAlpha: 0.5, strokeDasharray: len, strokeDashoffset: len });
    });
    gsap.set(nodes, { autoAlpha: 0, scale: 0.7, transformOrigin: "50% 50%", transformBox: "fill-box" });
    gsap.to(nodes, { autoAlpha: 1, scale: 1, duration: 0.7, ease: "back.out(1.5)", stagger: 0.07 });
    gsap.to(lines, { strokeDashoffset: 0, duration: 0.9, ease: ease.inOut, stagger: 0.08, delay: 0.1 });
  };

  useMotion(root, (_env, el) => {
    const st = ScrollTrigger.create({
      trigger: el.querySelector(".sys-stage"),
      start: "top 80%",
      once: true,
      onEnter: () =>
        afterLoad(() => {
          seen.current = true;
          draw();
        }),
    });
    // Hold the diagram back until it is first seen.
    el.querySelectorAll<SVGElement>(".sys-line, .sys-node").forEach((n) => (n.style.opacity = "0"));
    return () => st.kill();
  });

  useEffect(() => {
    if (seen.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) draw();
  }, [active]);

  const onKey = (e: KeyboardEvent) => {
    if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].includes(e.key)) return;
    e.preventDefault();
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
    const next = (active + dir + systems.length) % systems.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const s = systems[active];

  return (
    <section className="section systems" ref={root} aria-labelledby="systems-title">
      <div className="wrap">
        <div className="sec-head">
          <Reveal className="label" variant="fade">
            <span>(04)</span> Business systems
          </Reveal>
          <SplitText as="h2" className="h-lg">
            <span id="systems-title">Software that runs</span> <span className="accent">your business.</span>
          </SplitText>
          <Reveal as="p" className="lead" delay={0.15}>
            From a first SaaS product to the ERP, CRM and internal tools a company runs on, built to fit how you work.
          </Reveal>
        </div>

        <div className="sys-grid">
          <div role="tablist" aria-label="Business systems" aria-orientation="vertical" className="sys-tabs" onKeyDown={onKey}>
            {systems.map((x, i) => (
              <button
                key={x.id}
                ref={(n) => {
                  tabs.current[i] = n;
                }}
                role="tab"
                id={`sys-tab-${x.id}`}
                aria-selected={i === active}
                aria-controls="sys-panel"
                tabIndex={i === active ? 0 : -1}
                className="sys-tab"
                onClick={() => setActive(i)}
              >
                <span className="sys-tab-n">0{i + 1}</span>
                <span>{x.name}</span>
              </button>
            ))}
          </div>

          <div className="sys-stage" id="sys-panel" role="tabpanel" aria-labelledby={`sys-tab-${s.id}`} ref={stage}>
            <Diagram key={s.id} id={s.id} nodes={s.nodes} />
            <div className="sys-caption">
              <h3>{s.name}</h3>
              <p>{s.text}</p>
              <Link href="/services/technology-and-software" className="arrow-link">
                <span>Explore technology services</span>
                <span className="arr" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
