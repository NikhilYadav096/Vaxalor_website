import type Lenis from "lenis";

// ---- Motion tokens: every duration, ease, offset and stagger used on the site lives here. ----

export const ease = {
  out: "power4.out", // text and block entrances
  expo: "expo.out", // hero settle, big moves
  inOut: "power3.inOut", // clip-path wipes, curtains
  soft: "power2.out", // small UI
  none: "none", // scrubbed motion
} as const;

export const dur = {
  fast: 0.45,
  base: 0.95,
  text: 1.15,
  wipe: 1.35,
  hero: 1.4,
  settle: 2.2,
} as const;

export const stagger = {
  word: 0.055,
  char: 0.06,
  line: 0.12,
  list: 0.1,
} as const;

export const offset = {
  rise: 40, // px for fade-rise
  mask: 115, // yPercent for masked text
} as const;

export const trigger = {
  default: "top 90%",
  early: "top 96%",
  late: "top 78%",
} as const;

export const clip = {
  down: ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"],
  up: ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
  right: ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"],
  left: ["inset(0% 0% 0% 100%)", "inset(0% 0% 0% 0%)"],
  center: ["inset(50% 50% 50% 50%)", "inset(0% 0% 0% 0%)"],
} as const;
export type ClipDirection = keyof typeof clip;

// Desktop motion needs room; mobile keeps entrances only. Reduced motion gets nothing.
export const mq = {
  desktop: "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 900px) and (prefers-reduced-motion: no-preference)",
} as const;

// ---- Loader gating: entrances wait until the loading screen (or a page transition) lets them go. ----
// data-vx-loaded is "1" when entrances may play and "0" while a curtain is covering the page.

export const isLoaded = () => {
  if (typeof document === "undefined") return false;
  const root = document.documentElement;
  if (root.dataset.vxLoaded === "1") return true;
  if (root.dataset.vxLoaded === "0") return false;
  return root.classList.contains("loader-skip");
};

// Returns a cancel function, so a component that is torn down before the loader finishes can drop its pending callback.
export const afterLoad = (fn: () => void) => {
  if (isLoaded()) {
    fn();
    return () => {};
  }
  window.addEventListener("vx:loaded", fn, { once: true });
  return () => window.removeEventListener("vx:loaded", fn);
};

export const release = () => {
  document.documentElement.dataset.vxLoaded = "1";
  window.dispatchEvent(new Event("vx:loaded"));
};

export const hold = () => {
  document.documentElement.dataset.vxLoaded = "0";
};

// ---- Shared Lenis instance (created in MotionProvider). ----

let lenis: Lenis | null = null;
export const setLenis = (l: Lenis | null) => (lenis = l);
export const getLenis = () => lenis;
