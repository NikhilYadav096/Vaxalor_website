import SplitText from "@/components/motion/SplitText";
import Reveal from "@/components/motion/Reveal";
import { commitments, values } from "@/data/site";

// Four working commitments (from the current site's "Why us"), then the three values from the About page.
export default function Why() {
  return (
    <section className="section why on-brand" aria-labelledby="why-title">
      <div className="wrap">
        <div className="sec-head">
          <Reveal className="label" variant="fade">
            <span>(06)</span> Why Vaxalor
          </Reveal>
          <SplitText as="h2" className="h-lg">
            <span id="why-title">What you can</span> <span className="accent">count on.</span>
          </SplitText>
        </div>

        <ul className="why-grid">
          {commitments.map((c, i) => (
            <li key={c.title} className="why-item">
              <Reveal variant="line" className="why-rule" />
              <span className="why-n">0{i + 1}</span>
              <SplitText as="h3" className="h-md" start="top 94%">
                {c.title}
              </SplitText>
              <Reveal as="p" delay={0.15}>
                {c.text}
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal variant="children" className="why-values">
          {values.map((v) => (
            <div key={v.title}>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
