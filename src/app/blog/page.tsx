import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import Reveal from "@/components/motion/Reveal";
import { posts } from "@/data/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes from the Vaxalor studio on pricing, shipping fast and what AI can really do for small businesses.",
  alternates: { canonical: "/blog" },
};

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

// Posts are published on the current vaxalor.com. They link there until the articles are migrated into this site.
export default function Blog() {
  return (
    <>
      <PageHero
        label="Blog"
        title={
          <>
            Notes from <span className="accent">the studio.</span>
          </>
        }
        lead="Candid writing on pricing, shipping fast and what AI can really do for a small business."
      />

      <section className="section blog" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <ul className="post-list">
            {posts.map((p, i) => (
              <li key={p.slug}>
                <Reveal variant="line" className="svc-rule" />
                <Reveal delay={i * 0.05}>
                  <a className="post" href={`https://www.vaxalor.com/blog/${p.slug}`} rel="noopener">
                    <span className="post-meta">
                      <time dateTime={p.date}>{fmt(p.date)}</time>
                      <span>{p.category}</span>
                    </span>
                    <span className="post-body">
                      <h2>{p.title}</h2>
                      <p>{p.excerpt}</p>
                    </span>
                    <span className="post-arrow" aria-hidden="true">↗</span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
