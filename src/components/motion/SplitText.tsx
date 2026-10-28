"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { afterLoad, dur, ease, offset, stagger as stag, trigger as trig } from "@/lib/motion";
import { useMotion } from "./useMotion";

type Mode = "words" | "lines" | "chars";

type Props = {
  as?: ElementType;
  mode?: Mode;
  className?: string;
  children: ReactNode;
  delay?: number;
  start?: string;
  stagger?: number;
};

const mask = () => {
  const m = document.createElement("span");
  m.className = "ha-mask";
  return m;
};

// Splits `el` into words or characters (each wrapped in a clipping mask) and returns the units to animate.
// Elements with class "accent" are unwrapped, their words keep the class so styling survives re-grouping.
function split(el: HTMLElement, mode: Mode): HTMLElement[] {
  const units: HTMLElement[] = [];

  const makeUnit = (text: string, accent: boolean) => {
    const inner = document.createElement("span");
    inner.className = "ha-unit" + (accent ? " accent" : "");
    inner.textContent = text;
    if (mode === "lines") {
      inner.className = "ha-w" + (accent ? " accent" : "");
      units.push(inner);
      return inner;
    }
    const m = mask();
    m.appendChild(inner);
    units.push(inner);
    return m;
  };

  const walk = (node: Node, accent: boolean) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const elNode = node as HTMLElement;
      const isAccent = accent || elNode.classList.contains("accent");
      Array.from(elNode.childNodes).forEach((c) => walk(c, isAccent));
      if (elNode.classList.contains("accent") && elNode !== el) {
        elNode.replaceWith(...Array.from(elNode.childNodes));
      }
      return;
    }
    if (node.nodeType !== Node.TEXT_NODE || !node.textContent) return;
    if (!node.textContent.trim()) return;
    const frag = document.createDocumentFragment();
    const parts = mode === "chars" ? Array.from(node.textContent) : node.textContent.split(/(\s+)/);
    parts.forEach((part) => {
      if (!part) return;
      frag.appendChild(/^\s+$/.test(part) ? document.createTextNode(part) : makeUnit(part, accent));
    });
    node.parentNode?.replaceChild(frag, node);
  };

  walk(el, false);
  return units;
}

// Groups word spans into visual lines and wraps each line in its own mask.
function toLines(el: HTMLElement, words: HTMLElement[]): HTMLElement[] {
  const rows: HTMLElement[][] = [];
  let top = -9999;
  words.forEach((w) => {
    const t = Math.round(w.getBoundingClientRect().top);
    if (Math.abs(t - top) > 4) {
      rows.push([]);
      top = t;
    }
    rows[rows.length - 1].push(w);
  });

  const lineUnits: HTMLElement[] = [];
  rows.forEach((row) => {
    const m = mask();
    m.classList.add("ha-line");
    const inner = document.createElement("span");
    inner.className = "ha-unit";
    row[0].before(m);
    m.appendChild(inner);
    row.forEach((w, i) => {
      // keep the original spacing between words on a line
      if (i > 0) inner.appendChild(document.createTextNode(" "));
      inner.appendChild(w);
    });
    lineUnits.push(inner);
  });
  // drop stray whitespace left between line masks
  Array.from(el.childNodes).forEach((n) => {
    if (n.nodeType === Node.TEXT_NODE && !n.textContent?.trim()) n.remove();
  });
  return lineUnits;
}

// Headline and paragraph reveal: units rise out of a mask as the element enters the viewport.
// The text stays real DOM text, readable with scripts off, and is restored on cleanup.
export default function SplitText({
  as: Tag = "div",
  mode = "words",
  className = "",
  children,
  delay = 0,
  start = trig.default,
  stagger,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useMotion(
    ref,
    (_env, el) => {
      const original = el.innerHTML;
      let units: HTMLElement[] = [];
      let masks: HTMLElement[] = [];
      // idle: waiting to enter view. playing: rising now. done: settled in place.
      let phase: "idle" | "playing" | "done" = "idle";
      let tween: gsap.core.Tween | undefined;
      let cancelLoad: (() => void) | undefined;
      let st: ScrollTrigger | undefined;
      let cancelled = false;
      let triggered = false;
      let lastWidth = el.clientWidth;
      let rt = 0;

      // Masks only stop clipping once their text is exactly in place, so unclipped text can never sit displaced.
      const unmask = (list: HTMLElement[]) => list.forEach((m) => (m.style.overflow = "visible"));

      const build = () => {
        tween?.kill();
        tween = undefined;
        el.innerHTML = original;
        const base = split(el, mode);
        units = mode === "lines" ? toLines(el, base) : base;
        masks = Array.from(el.querySelectorAll<HTMLElement>(".ha-mask"));
        gsap.set(el, { visibility: "visible" });
        gsap.set(units, { yPercent: phase === "done" ? 0 : offset.mask });
        if (phase === "done") unmask(masks);
      };

      const play = () => {
        if (cancelled) return;
        phase = "playing";
        const mine = units; // this animation belongs to this build of the text, and only touches it
        const myMasks = masks;
        tween = gsap.to(mine, {
          yPercent: 0,
          duration: dur.text,
          ease: ease.out,
          delay,
          stagger: stagger ?? (mode === "chars" ? stag.char : mode === "lines" ? stag.line : stag.word),
          onComplete: () => {
            if (cancelled || mine !== units) return;
            phase = "done";
            gsap.set(mine, { yPercent: 0 });
            unmask(myMasks);
          },
        });
      };

      const go = () => {
        if (triggered || cancelled) return;
        triggered = true;
        cancelLoad = afterLoad(play);
      };

      let started = false;
      let ro: ResizeObserver | undefined;

      const init = () => {
        if (cancelled) return;
        started = true;
        build();
        st = ScrollTrigger.create({ trigger: el, start, once: true, onEnter: go });
        // Already past its start point (hot reload, resize, anchor jump): don't wait for an event that won't come.
        if (st.scroll() >= st.start) go();

        if (mode === "lines") {
          ro = new ResizeObserver(() => {
            if (Math.abs(el.clientWidth - lastWidth) < 2) return;
            lastWidth = el.clientWidth;
            window.clearTimeout(rt);
            rt = window.setTimeout(() => {
              if (cancelled) return;
              const wasPlaying = phase === "playing";
              build(); // re-wraps the lines for the new width
              if (wasPlaying) play(); // interrupted mid-rise: start again on the fresh lines
            }, 200);
          });
          ro.observe(el);
        }
      };

      // Splitting rewrites the DOM, so only do it when the heading is within a couple of screens of view.
      // Until then it stays hidden (CSS) and costs nothing. Line grouping also needs the loaded font.
      const begin = () => (mode === "lines" && document.fonts ? document.fonts.ready.then(init) : init());
      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          io.disconnect();
          begin();
        },
        { rootMargin: "200% 0px 200% 0px" }
      );
      io.observe(el);

      return () => {
        cancelled = true;
        io.disconnect();
        window.clearTimeout(rt);
        ro?.disconnect();
        st?.kill();
        cancelLoad?.();
        tween?.kill(); // an in-flight reveal must not finish late and touch the next build of this text
        if (started) el.innerHTML = original;
        el.style.visibility = "";
      };
    },
    [mode, delay, start]
  );

  return (
    <Tag ref={ref} data-split className={className}>
      {children}
    </Tag>
  );
}
