import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import FinalCta from "@/components/sections/FinalCta";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import Marquee from "@/components/motion/Marquee";
import ArrowLink from "@/components/ui/ArrowLink";
import { pillars } from "@/data/services";
import { toolkit } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "57 services across five pillars: technology and software, data and AI, design and creative, digital marketing, and strategy and consulting.",
  alternates: { canonical: "/services" },
};

export default function Services() {
  return (
    <>
      <PageHero
        label="Our services"
        title={
          <>
            Everything your business needs <span className="accent">to grow.</span>
          </>
        }
        lead="Technology, design, marketing and strategy presented as one offering, so you never have to manage multiple vendors. 57 services across five pillars."
      />

      <section className="pillar-list">
        {pillars.map((p) => (
          <article key={p.slug} className="pillar" id={p.slug}>
            <div className="wrap pillar-grid">
              <div className="pillar-head">
                <Reveal variant="fade" className="pillar-n">
                  Pillar {p.n} / 05
                </Reveal>
                <SplitText as="h2" className="h-md" start="top 88%">
                  {p.title}
                </SplitText>
                <Reveal as="p" delay={0.1}>
                  {p.description}
                </Reveal>
                <Reveal delay={0.2}>
                  <ArrowLink href={`/services/${p.slug}`}>Explore {p.services} services</ArrowLink>
                </Reveal>
              </div>

              <div className="pillar-cats">
                {p.categories.map((c) => (
                  <Reveal key={c.name} className="pillar-cat">
                    <h3>{c.name}</h3>
                    <ul>
                      {c.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </Reveal>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="toolkit" aria-label="Our toolkit">
        <p className="toolkit-label">Built with the best</p>
        <Marquee items={toolkit} />
      </section>

      <FinalCta />
    </>
  );
}
