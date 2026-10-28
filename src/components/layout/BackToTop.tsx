"use client";

import { getLenis } from "@/lib/motion";

export default function BackToTop() {
  return (
    <button
      type="button"
      className="to-top"
      onClick={() => {
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(0, { duration: 1.6 });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      Back to top <span aria-hidden="true">↑</span>
    </button>
  );
}
