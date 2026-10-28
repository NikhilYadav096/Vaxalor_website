"use client";

import { useEffect, type DependencyList, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { mq } from "@/lib/motion";

export type MotionEnv = { desktop: boolean; mobile: boolean };

// Runs `setup` inside gsap.matchMedia so desktop and mobile get separate setups,
// reduced-motion visitors get none, and everything is reverted on unmount or breakpoint change.
// `setup` may return a cleanup function (used to restore DOM that a split text changed).
export function useMotion(
  scope: RefObject<HTMLElement | null>,
  setup: (env: MotionEnv, el: HTMLElement) => void | (() => void),
  deps: DependencyList = []
) {
  useEffect(() => {
    const el = scope.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia(el);
    mm.add({ desktop: mq.desktop, mobile: mq.mobile }, (ctx) => {
      const { desktop, mobile } = ctx.conditions as MotionEnv;
      return setup({ desktop: !!desktop, mobile: !!mobile }, el);
    });
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
