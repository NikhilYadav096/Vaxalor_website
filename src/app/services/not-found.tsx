import type { Metadata } from "next";
import Link from "next/link";
import ErrorPage from "@/components/sections/ErrorPage";
import { pillars } from "@/data/services";

export const metadata: Metadata = { title: "Service not found", robots: { index: false, follow: true } };

export default function ServiceNotFound() {
  return (
    <ErrorPage
      label="Error 404 · Service not found"
      glyphs={["4", "4"]}
      title={
        <>
          We don&apos;t offer <span className="accent">that one.</span>
        </>
      }
      lead="There's no service at that address. Everything we do sits under five pillars, so one of these is probably what you need."
      actions={
        <>
          <Link href="/services" className="btn btn-primary">
            All services <span aria-hidden="true">→</span>
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            Ask us anything
          </Link>
        </>
      }
      suggestionsTitle="Our five pillars"
      suggestions={pillars.map((p) => ({ href: `/services/${p.slug}`, label: p.title, hint: p.short }))}
    />
  );
}
