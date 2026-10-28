import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/sections/PageHero";
import FinalCta from "@/components/sections/FinalCta";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import ImageReveal from "@/components/motion/ImageReveal";
import ArrowLink from "@/components/ui/ArrowLink";
import { getPillar, pillars } from "@/data/services";
import { commitments, process } from "@/data/site";
import { projects } from "@/data/content";

type Props = { params: Promise<{ slug: string }> };

// Known pillars are prebuilt. Unknown slugs are still rendered on request so that notFound() below can show
// the service-specific 404 (app/services/not-found.tsx) instead of the generic one.
export const dynamicParams = true;

export function generateStaticParams() {
  return pillars.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPillar(slug);
  if (!p) return { title: "Service not found", robots: { index: false, follow: true } };
  return { title: p.title, description: p.description, alternates: { canonical: `/services/${p.slug}` } };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const p = getPillar(slug);
  if (!p) notFound();

  const index = pillars.indexOf(p);
  const next = pillars[index + 1];
  const prev = pillars[index - 1];
  // The portfolio is websites and a store, so it is relevant to the technology and design pillars only.
  const showWork = p.slug === "technology-and-software" || p.slug === "design-and-creative";

  return (
    <>
      <PageHero
        label={`Pillar ${p.n} / 05`}
        title={p.title}
        lead={`${p.description} ${p.categories.length} categories · ${p.services} services.`}
      >
        <Link href="/contact" className="btn btn-primary">
          {p.cta} <span aria-hidden="true">→</span>
        </Link>
        <Link href="/services" className="btn btn-ghost">
          All services
        </Link>
      </PageHero>

      <section className="section deliver" aria-labelledby="deliver-title">
        <div className="wrap">
          <div className="sec-head">
            <Reveal className="label" variant="fade">What we deliver</Reveal>
            <SplitText as="h2" className="h-md">
              <span id="deliver-title">Everything we ship under</span> <span className="accent">{p.title.split(" ")[0]}.</span>
            </SplitText>
          </div>

          <div className="deliver-grid">
            {p.categories.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.08} className="deliver-cat">
                <span className="deliver-n">0{i + 1}</span>
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
      </section>

      {showWork && (
        <section className="section soft" aria-labelledby="rel-work">
          <div className="wrap">
            <div className="sec-head">
              <Reveal className="label" variant="fade">Relevant work</Reveal>
              <SplitText as="h2" className="h-md">
                <span id="rel-work">Recent</span> <span className="accent">projects.</span>
              </SplitText>
            </div>
            <ul className="rel-grid">
              {projects.map((pr, i) => (
                <li key={pr.slug}>
                  <Link href={`/work/${pr.slug}`} className="rel-card">
                    <ImageReveal
                      src={pr.image}
                      alt={`${pr.name} website preview`}
                      width={pr.width}
                      height={pr.height}
                      ratio="16 / 10"
                      from={i % 2 ? "left" : "right"}
                      sizes="(max-width: 900px) 100vw, 25vw"
                    />
                    <span className="rel-name">{pr.name}</span>
                    <span className="rel-type">{pr.type}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="how-title">
        <div className="wrap">
          <div className="sec-head">
            <Reveal className="label" variant="fade">How we work, every project</Reveal>
            <SplitText as="h2" className="h-md">
              <span id="how-title">Four commitments.</span> <span className="accent">No exceptions.</span>
            </SplitText>
          </div>
          <ul className="commit-grid">
            {commitments.map((c, i) => (
              <li key={c.title}>
                <Reveal variant="line" className="commit-rule" />
                <span className="commit-n">0{i + 1}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </li>
            ))}
          </ul>

          <ol className="mini-process" aria-label="Project timeline">
            {process.map((s) => (
              <li key={s.n}>
                <span>{s.days}</span>
                <strong>{s.title}</strong>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <nav className="pillar-nav" aria-label="Other pillars">
        <div className="wrap">
          {prev ? <ArrowLink href={`/services/${prev.slug}`} className="is-prev">{prev.title}</ArrowLink> : <span />}
          {next ? <ArrowLink href={`/services/${next.slug}`}>Next pillar: {next.title}</ArrowLink> : <span />}
        </div>
      </nav>

      <FinalCta />
    </>
  );
}
