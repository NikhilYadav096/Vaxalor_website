import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import FinalCta from "@/components/sections/FinalCta";
import Reveal from "@/components/motion/Reveal";
import ImageReveal from "@/components/motion/ImageReveal";
import SplitText from "@/components/motion/SplitText";
import { projects } from "@/data/content";

export const metadata: Metadata = {
  title: "Work",
  description: "Websites and e-commerce projects built by Vaxalor: Cosmo Green Energy, IdeationX, Decalion and Laspore.",
  alternates: { canonical: "/work" },
};

export default function Work() {
  return (
    <>
      <PageHero
        label="Selected work"
        title={
          <>
            Projects we&apos;re <span className="accent">proud of.</span>
          </>
        }
        lead="A few of the products we've built with founders and businesses."
      />

      <section className="work-index" aria-label="Projects">
        <ul>
          {projects.map((p, i) => (
            <li key={p.slug} className={`wi wi-${i % 2 ? "r" : "l"}`}>
              <Link href={`/work/${p.slug}`} className="wi-link">
                <ImageReveal
                  src={p.image}
                  alt={`${p.name} website preview`}
                  width={p.width}
                  height={p.height}
                  ratio="16 / 10"
                  from={i % 2 ? "left" : "right"}
                  parallax={6}
                  sizes="(max-width: 900px) 100vw, 60vw"
                  className="wi-img"
                />
                <div className="wi-text">
                  <span className="wi-n">0{i + 1}</span>
                  <SplitText as="h2" className="h-md" start="top 92%">
                    {p.name}
                  </SplitText>
                  <p className="wi-type">{p.type}</p>
                  <Reveal as="p" className="wi-desc" delay={0.1}>
                    {p.text} {p.note}
                  </Reveal>
                  <span className="wi-cta">
                    View project <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <FinalCta title="Your project could be next." />
    </>
  );
}
