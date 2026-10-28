import { ImageResponse } from "next/og";

export const alt = "Vaxalor: digital products with soul";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#0a1020",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 34, letterSpacing: 6, textTransform: "uppercase", color: "#62b8f0", display: "flex" }}>
          Vaxalor
        </div>
        <div style={{ fontSize: 108, lineHeight: 1.02, fontWeight: 700, display: "flex", flexDirection: "column" }}>
          <span>We build digital</span>
          <span>
            products with <span style={{ color: "#62b8f0" }}>&nbsp;soul.</span>
          </span>
        </div>
        <div style={{ fontSize: 32, color: "#b8c4dc", display: "flex" }}>Websites, apps and AI, shipped in 20 days.</div>
      </div>
    ),
    size
  );
}
