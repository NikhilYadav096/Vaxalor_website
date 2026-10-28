import type { ReactNode } from "react";
import SplitText from "@/components/motion/SplitText";
import Reveal from "@/components/motion/Reveal";

// Shared opening block for inner pages: label, a large headline, an optional lead and actions.
export default function PageHero({
  label,
  title,
  lead,
  children,
  tone = "light",
}: {
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  tone?: "light" | "night";
}) {
  return (
    <section className={`page-hero ${tone === "night" ? "on-night" : ""}`}>
      <div className="wrap">
        <Reveal className="label" variant="fade" delay={0.1}>
          {label}
        </Reveal>
        <SplitText as="h1" mode="lines" className="page-title" delay={0.15}>
          {title}
        </SplitText>
        {lead && (
          <Reveal as="p" className="lead" delay={0.5}>
            {lead}
          </Reveal>
        )}
        {children && (
          <Reveal className="page-actions" delay={0.65}>
            {children}
          </Reveal>
        )}
      </div>
    </section>
  );
}
