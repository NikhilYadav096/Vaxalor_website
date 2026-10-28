import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import FinalCta from "@/components/sections/FinalCta";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import ScrubWords from "@/components/motion/ScrubWords";
import Counter from "@/components/motion/Counter";
import ImageReveal from "@/components/motion/ImageReveal";
import VideoSlot from "@/components/ui/VideoSlot";
import { facts, team, values } from "@/data/site";
import { media } from "@/data/media";

export const metadata: Metadata = {
  title: "About",
  description:
    "Vaxalor is a small team that builds big things: websites, apps and AI solutions with soul, shipped in 20 days.",
  alternates: { canonical: "/about" },
};

const initials = (n: string) =>
  n
    .split(" ")
    .map((w) => w[0])
    .join("");

export default function About() {
  return (
    <>
      <PageHero
        label="About Vaxalor"
        title={
          <>
            We&apos;re a small team that builds <span className="accent">big things.</span>
          </>
        }
        lead="We believe software should be built with intention and crafted to last."
      />

      <section className="section about-story">
        <div className="wrap">
          <ScrubWords as="p" className="story-statement">
            Vaxalor started with a simple frustration: why does building software take so long and cost so much? We saw
            startups waiting months for an MVP and small businesses paying premium prices for template websites. So we
            built the studio we wished existed.
          </ScrubWords>

          <div className="about-grid">
            <Reveal as="p" className="about-copy">
              Our team is lean and focused on quality and speed together. Every client gets our full attention, not a junior
              developer learning on the job.
            </Reveal>
            <Reveal as="blockquote" className="about-quote" delay={0.1}>
              We don&apos;t just build software. We build the thing that changes everything for your business.
            </Reveal>
          </div>

          <ul className="facts facts-row">
            {facts.map((f) => (
              <li key={f.label}>
                <Counter to={f.value} suffix={f.suffix} plain={f.plain} />
                <span>{f.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="about-video" aria-label="Our story">
        <VideoSlot src={media.storyVideo} label="Story video coming soon" className="about-video-slot" />
      </section>

      <section className="section on-night values" aria-labelledby="values-title">
        <div className="wrap">
          <div className="sec-head">
            <Reveal className="label" variant="fade">What we stand for</Reveal>
            <SplitText as="h2" className="h-lg">
              <span id="values-title">Three values.</span> <span className="accent">One standard.</span>
            </SplitText>
          </div>
          <ul className="values-grid">
            {values.map((v, i) => (
              <li key={v.title}>
                <Reveal variant="line" className="why-rule" />
                <span className="why-n">0{i + 1}</span>
                <h3>{v.title}</h3>
                <Reveal as="p" delay={0.1}>
                  {v.text}
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section team" aria-labelledby="team-title">
        <div className="wrap">
          <div className="sec-head">
            <Reveal className="label" variant="fade">The team</Reveal>
            <SplitText as="h2" className="h-lg">
              <span id="team-title">The people</span> <span className="accent">behind it.</span>
            </SplitText>
          </div>
          <ul className="team-grid">
            {team.map((m, i) => (
              <li key={m.name}>
                <Reveal delay={i * 0.08} className="member">
                  <span className="member-mark" aria-hidden="true">{initials(m.name)}</span>
                  <h3>{m.name}</h3>
                  <p className="member-role">{m.role}</p>
                  <p>{m.note}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
