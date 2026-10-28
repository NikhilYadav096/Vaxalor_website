"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  src?: string;
  poster?: string;
  ratio?: string;
  label?: string;
  className?: string;
};

// A wide media frame. With `src` set it plays a muted looping video with an unmute toggle.
// Without one it shows a branded placeholder, so the space is ready for a video to be dropped in.
export default function VideoSlot({ src, poster, ratio, label = "Showreel coming soon", className = "" }: Props) {
  const [muted, setMuted] = useState(true);

  if (!src) {
    return (
      <div className={`video-slot is-empty ${className}`} style={ratio ? { aspectRatio: ratio } : undefined}>
        <div className="vs-art">
          <Image src="/images/hero-logo-poster.webp" alt="" width={600} height={600} sizes="(max-width: 900px) 70vw, 36vw" priority />
        </div>
        <span className="vs-tag">
          <span aria-hidden="true">▶</span> {label}
        </span>
      </div>
    );
  }

  return (
    <div className={`video-slot ${className}`} style={ratio ? { aspectRatio: ratio } : undefined}>
      <video
        src={src}
        poster={poster || undefined}
        autoPlay
        muted={muted}
        loop
        playsInline
        preload="metadata"
        aria-label="Vaxalor showreel"
      />
      <button type="button" className="vs-unmute" onClick={() => setMuted((m) => !m)} aria-pressed={!muted}>
        {muted ? "Unmute video" : "Mute video"}
      </button>
    </div>
  );
}
