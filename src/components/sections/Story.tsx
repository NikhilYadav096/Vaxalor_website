import ScrubWords from "@/components/motion/ScrubWords";
import SplitText from "@/components/motion/SplitText";
import Reveal from "@/components/motion/Reveal";
import ImageReveal from "@/components/motion/ImageReveal";
import Counter from "@/components/motion/Counter";
import ArrowLink from "@/components/ui/ArrowLink";
import { facts } from "@/data/site";

// Brand story: one statement that brightens word by word as you read, an arch-framed mascot and three facts.
export default function Story() {
  return (
    <section className="section story" aria-labelledby="story-label">
      <div className="wrap">
        <Reveal className="label" variant="fade">
          <span>(01)</span> <span id="story-label">Who we are</span>
        </Reveal>

        <ScrubWords as="p" className="story-statement">
          Vaxalor started with a simple frustration: why does building software take so long and cost so much? We are a
          small team that builds big things, <span className="accent">with soul.</span>
        </ScrubWords>

        <div className="story-grid">
          <ImageReveal
            src="/images/mascot.png"
            alt="Vaxalor's robot mascot waving"
            width={596}
            height={419}
            ratio="4 / 5"
            fit="contain"
            from="up"
            className="arch"
            sizes="(max-width: 900px) 80vw, 32vw"
          />

          <div className="story-copy">
            <SplitText as="h2" className="h-md">
              Lean on purpose, <span className="accent">careful</span> by habit.
            </SplitText>
            <Reveal as="p" delay={0.1}>
              Startups were waiting months for an MVP. Small businesses were paying premium prices for template websites.
              We built Vaxalor to fix that: quality and speed together, with a team small enough to care about every detail.
            </Reveal>
            <Reveal as="p" delay={0.2}>
              Every client gets our full attention, not a junior developer learning on the job.
            </Reveal>
            <Reveal delay={0.3}>
              <ArrowLink href="/about">About Vaxalor</ArrowLink>
            </Reveal>

            <ul className="facts">
              {facts.map((f) => (
                <li key={f.label}>
                  <Counter to={f.value} suffix={f.suffix} plain={f.plain} />
                  <span>{f.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
