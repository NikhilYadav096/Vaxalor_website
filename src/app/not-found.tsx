import type { Metadata } from "next";
import Link from "next/link";
import ErrorPage from "@/components/sections/ErrorPage";
import { nav } from "@/data/site";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };

const hints: Record<string, string> = {
  "/services": "Five pillars, 57 services",
  "/work": "Projects we're proud of",
  "/blog": "Notes from the studio",
  "/about": "The small team behind Vaxalor",
  "/contact": "Tell us what you're building",
};

export default function NotFound() {
  return (
    <ErrorPage
      label="Error 404 · Page not found"
      glyphs={["4", "4"]}
      title={
        <>
          This page <span className="accent">wandered off.</span>
        </>
      }
      lead="The page you're looking for doesn't exist, or it has moved. Check the address, or pick up from one of the places below."
      actions={
        <>
          <Link href="/" className="btn btn-primary">
            Back home <span aria-hidden="true">→</span>
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            Tell us what's missing
          </Link>
        </>
      }
      suggestionsTitle="Where to next"
      suggestions={nav.map((n) => ({ href: n.href, label: n.label, hint: hints[n.href] }))}
    />
  );
}
