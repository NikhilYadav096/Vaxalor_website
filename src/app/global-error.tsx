"use client";

import { useEffect } from "react";

// Last resort: used only when the root layout itself fails, so nothing from the normal site (header, fonts, router)
// can be relied on. It is fully self-contained and uses a plain link, not the Next router.
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const base = { margin: 0, minHeight: "100vh", display: "grid", placeItems: "center", padding: "32px 24px", background: "#0a1020", color: "#fff", fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" } as const;
  const btn = { display: "inline-block", padding: "16px 28px", borderRadius: 999, font: "600 16px/1 system-ui, sans-serif", textDecoration: "none", cursor: "pointer", border: "1.5px solid #1a56d6" } as const;

  return (
    <html lang="en">
      <body style={base}>
        <main style={{ maxWidth: 640 }}>
          <p style={{ margin: "0 0 20px", font: "600 13px/1 system-ui, sans-serif", letterSpacing: "0.16em", textTransform: "uppercase", color: "#62b8f0" }}>
            Something went wrong
          </p>
          <h1 style={{ margin: "0 0 20px", fontSize: "clamp(2.4rem, 8vw, 4.2rem)", lineHeight: 1.02, letterSpacing: "-0.04em" }}>
            Vaxalor hit a <span style={{ color: "#62b8f0", fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400 }}>snag.</span>
          </h1>
          <p style={{ margin: "0 0 32px", fontSize: 18, lineHeight: 1.55, color: "rgba(255,255,255,0.75)" }}>
            The site couldn&apos;t load properly. That&apos;s on us, not you. Try again, and if it keeps happening write to{" "}
            <a href="mailto:official@vaxalor.com" style={{ color: "#fff" }}>official@vaxalor.com</a>
            {error.digest ? <> and quote reference <code>{error.digest}</code></> : null}.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button type="button" onClick={() => reset()} style={{ ...btn, background: "#1a56d6", color: "#fff" }}>
              Try again
            </button>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" style={{ ...btn, background: "transparent", color: "#fff", borderColor: "rgba(255,255,255,0.6)" }}>
              Back home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
