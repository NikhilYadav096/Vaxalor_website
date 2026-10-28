import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/sections/PageHero";
import FinalCta from "@/components/sections/FinalCta";
import Reveal from "@/components/motion/Reveal";
import ImageReveal from "@/components/motion/ImageReveal";
import ArrowLink from "@/components/ui/ArrowLink";
import { getProject, projects } from "@/data/content";

type Props = { params: Promise<{ slug: string }> };

// Known projects are prebuilt. Unknown slugs are still rendered on request so that notFound() below can show
// the project-specific 404 (app/work/not-found.tsx) instead of the generic one.
export const dynamicParams = true;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: "Project not found", robots: { index: false, follow: true } };
  return {
    title: p.name,
    description: `${p.name}: ${p.text}`,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { images: [{ url: p.image, width: p.width, height: p.height, alt: p.name }] },
  };
}

// Only what Vaxalor has published about each project is shown. Challenge, solution and result sections
// are intentionally absent until genuine case-study details are supplied.
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];

  return (
    <>
      <PageHero label={`Project 0${i + 1} / 0${projects.length}`} title={p.name} lead={p.text}>
        <ArrowLink href="/work">All projects</ArrowLink>
      </PageHero>

      <section className="case-media">
        <div className="wrap">
          <ImageReveal
            src={p.image}
            alt={`${p.name} website preview`}
            width={p.width}
            height={p.height}
            from="up"
            parallax={5}
            priority
            sizes="(max-width: 900px) 100vw, 90vw"
            className="case-img"
          />
        </div>
      </section>

      <section className="section case-meta">
        <div className="wrap">
          <Reveal variant="children" className="case-facts">
            <div>
              <h2>Category</h2>
              <p>{p.type}</p>
            </div>
            <div>
              <h2>Project</h2>
              <p>{p.name}</p>
            </div>
            {p.note && (
              <div>
                <h2>Delivery</h2>
                <p>{p.note.replace(/\.$/, "")}</p>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      <nav className="pillar-nav" aria-label="Next project">
        <div className="wrap">
          <ArrowLink href="/work" className="is-prev">All projects</ArrowLink>
          <ArrowLink href={`/work/${next.slug}`}>Next project: {next.name}</ArrowLink>
        </div>
      </nav>

      <FinalCta title="Want something like this?" />
    </>
  );
}
