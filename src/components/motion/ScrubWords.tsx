"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ease } from "@/lib/motion";
import { useMotion } from "./useMotion";

// Large statement text whose words brighten one by one as you scroll through it (scroll-linked, reversible).
export default function ScrubWords({
  as: Tag = "p",
  className = "",
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useMotion(ref, (_env, el) => {
    const original = el.innerHTML;
    const words: HTMLElement[] = [];

    const walk = (node: Node, accent: boolean) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const e = node as HTMLElement;
        const a = accent || e.classList.contains("accent");
        Array.from(e.childNodes).forEach((c) => walk(c, a));
        if (e.classList.contains("accent") && e !== el) e.replaceWith(...Array.from(e.childNodes));
        return;
      }
      if (node.nodeType !== Node.TEXT_NODE || !node.textContent?.trim()) return;
      const frag = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) return frag.appendChild(document.createTextNode(part));
        const w = document.createElement("span");
        w.className = "sw" + (accent ? " accent" : "");
        w.textContent = part;
        words.push(w);
        frag.appendChild(w);
      });
      node.parentNode?.replaceChild(frag, node);
    };
    let started = false;
    const init = () => {
      started = true;
      walk(el, false);
      gsap.set(el, { visibility: "visible" });
      gsap.fromTo(
        words,
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: ease.none,
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 48%", scrub: 0.6 },
        }
      );
    };

    // Only split the text once it is within a couple of screens of view.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        init();
      },
      { rootMargin: "200% 0px 200% 0px" }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (started) el.innerHTML = original;
      el.style.visibility = "";
    };
  });

  return (
    <Tag ref={ref} data-split className={className}>
      {children}
    </Tag>
  );
}
