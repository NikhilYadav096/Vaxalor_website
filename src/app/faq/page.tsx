import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import Reveal from "@/components/motion/Reveal";
import ArrowLink from "@/components/ui/ArrowLink";
import { faqGroups } from "@/data/content";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about Vaxalor's services, process, pricing, support and data security.",
  alternates: { canonical: "/faq" },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqGroups.flatMap((g) =>
    g.items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } }))
  ),
};

export default function Faq() {
  return (
    <>
      <PageHero
        label="FAQ"
        title={
          <>
            Frequently <span className="accent">asked.</span>
          </>
        }
        lead="Everything you need to know about working with us."
      />

      <section className="section faq" style={{ paddingTop: 0 }}>
        <div className="wrap">
          {faqGroups.map((g) => (
            <div key={g.group} className="faq-group">
              <Reveal as="h2" className="faq-h">
                {g.group}
              </Reveal>
              <div>
                {g.items.map((it) => (
                  <details key={it.q}>
                    <summary>{it.q}</summary>
                    <p>{it.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
          <div className="faq-more">
            <ArrowLink href="/contact">Still curious? Talk to us</ArrowLink>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </>
  );
}
