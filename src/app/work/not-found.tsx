import type { Metadata } from "next";
import Link from "next/link";
import ErrorPage from "@/components/sections/ErrorPage";
import { projects } from "@/data/content";

export const metadata: Metadata = { title: "Project not found", robots: { index: false, follow: true } };

export default function WorkNotFound() {
  return (
    <ErrorPage
      label="Error 404 · Project not found"
      glyphs={["4", "4"]}
      title={
        <>
          That project <span className="accent">isn&apos;t here.</span>
        </>
      }
      lead="We couldn't find a project at that address. It may have been renamed, or the link might be mistyped. These are the projects we've published."
      actions={
        <>
          <Link href="/work" className="btn btn-primary">
            See all work <span aria-hidden="true">→</span>
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            Start a project
          </Link>
        </>
      }
      suggestionsTitle="Our projects"
      suggestions={projects.map((p) => ({ href: `/work/${p.slug}`, label: p.name, hint: `${p.type} · ${p.text}` }))}
    />
  );
}
