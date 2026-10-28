import Link from "next/link";
import SplitText from "@/components/motion/SplitText";
import Reveal from "@/components/motion/Reveal";
import Marquee from "@/components/motion/Marquee";
import { pillars } from "@/data/services";
import { toolkit } from "@/data/site";

// An index of the five pillars. Rows open on hover or keyboard focus to show their categories;
// on touch screens the categories are always visible.
export default function Services() {
  return (
    <>
      <section className="section services on-dark" aria-labelledby="services-title">
        <div className="wrap">
          <div className="sec-head">
            <Reveal className="label" variant="fade">
              <span>(02)</span> What we do
            </Reveal>
            <SplitText as="h2" className="h-lg" start="top 85%">
              <span id="services-title">Five pillars.</span> <span className="accent">One partner.</span>
            </SplitText>
            <Reveal as="p" className="lead" delay={0.15}>
              Technology, design, marketing and strategy as one offering, so you never have to manage five vendors.
            </Reveal>
          </div>

          <ul className="svc-list">
            {pillars.map((p) => (
              <li key={p.slug} className="svc">
                <Reveal variant="line" className="svc-rule" />
                <Link href={`/services/${p.slug}`} className="svc-row">
                  <span className="svc-n">{p.n}</span>
                  <SplitText as="h3" className="svc-title" start="top 95%">
                    {p.title}
                  </SplitText>
                  <span className="svc-count">{p.services} services</span>
                  <span className="svc-arrow" aria-hidden="true">→</span>
                </Link>
                <div className="svc-detail">
                  <div>
                    <p className="svc-short">{p.short}</p>
                    <ul className="svc-cats">
                      {p.categories.map((c) => (
                        <li key={c.name}>{c.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="toolkit" aria-label="Our toolkit">
        <p className="toolkit-label">Built with the best</p>
        <Marquee items={toolkit} />
      </section>
    </>
  );
}
