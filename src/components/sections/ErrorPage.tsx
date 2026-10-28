import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import SplitText from "@/components/motion/SplitText";
import Reveal from "@/components/motion/Reveal";

export type Suggestion = { href: string; label: string; hint?: string };

// Shared layout for every "this didn't work out" page: not found (site-wide and per section) and runtime errors.
// The large glyphs put the mascot where a zero or letter would go, so each page is recognisably Vaxalor.
export default function ErrorPage({
  label,
  glyphs,
  title,
  lead,
  actions,
  suggestionsTitle,
  suggestions,
  note,
}: {
  label: string;
  /** Text shown either side of the mascot, e.g. ["4", "4"] reads 4 [mascot] 4. */
  glyphs: [string, string];
  title: ReactNode;
  lead: ReactNode;
  actions: ReactNode;
  suggestionsTitle?: string;
  suggestions?: Suggestion[];
  /** Small print under the actions, e.g. an error reference. */
  note?: ReactNode;
}) {
  return (
    <>
      <section className="err" aria-labelledby="err-title">
        <div className="wrap err-grid">
          <div className="err-copy">
            <Reveal className="label" variant="fade" delay={0.1}>
              {label}
            </Reveal>
            <SplitText as="h1" mode="lines" className="err-title" delay={0.15}>
              <span id="err-title">{title}</span>
            </SplitText>
            <Reveal as="p" className="lead" delay={0.45}>
              {lead}
            </Reveal>
            <Reveal className="page-actions" delay={0.6}>
              {actions}
            </Reveal>
            {note && (
              <Reveal as="p" className="err-note" variant="fade" delay={0.8}>
                {note}
              </Reveal>
            )}
          </div>

          <Reveal className="err-glyphs" delay={0.3} aria-hidden="true">
            <span>{glyphs[0]}</span>
            <Image
              className="err-mascot"
              src="/images/mascot.png"
              alt=""
              width={596}
              height={419}
              sizes="(max-width: 900px) 40vw, 22vw"
            />
            <span>{glyphs[1]}</span>
          </Reveal>
        </div>
      </section>

      {suggestions && suggestions.length > 0 && (
        <section className="err-next" aria-labelledby="err-next-title">
          <div className="wrap">
            <Reveal as="h2" className="err-next-title" variant="fade">
              <span id="err-next-title">{suggestionsTitle ?? "Where to next"}</span>
            </Reveal>
            <Reveal as="ul" variant="children" className="err-links">
              {suggestions.map((s, i) => (
                <li key={s.href}>
                  <Link href={s.href} className="err-link">
                    <span className="err-link-n">0{i + 1}</span>
                    <span className="err-link-main">
                      <span className="err-link-label">{s.label}</span>
                      {s.hint && <span className="err-link-hint">{s.hint}</span>}
                    </span>
                    <span className="err-link-arr" aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
