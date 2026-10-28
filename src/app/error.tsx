"use client";

import { useEffect } from "react";
import Link from "next/link";
import ErrorPage from "@/components/sections/ErrorPage";
import { nav, site } from "@/data/site";

// Shown inside the normal layout (header and footer stay) when a page fails while rendering.
export default function RouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorPage
      label="Something went wrong"
      glyphs={["!", "!"]}
      title={
        <>
          That wasn&apos;t <span className="accent">meant to happen.</span>
        </>
      }
      lead="Something broke on our side while loading this page. It isn't you. Try again, and if it keeps happening, let us know."
      actions={
        <>
          <button type="button" className="btn btn-primary" onClick={() => reset()}>
            Try again <span aria-hidden="true">↻</span>
          </button>
          <Link href="/" className="btn btn-ghost">
            Back home
          </Link>
        </>
      }
      note={
        <>
          Still stuck? Write to <a href={`mailto:${site.generalEmail}`}>{site.generalEmail}</a>
          {error.digest ? <> and quote reference <code>{error.digest}</code></> : null}.
        </>
      }
      suggestionsTitle="Or head somewhere else"
      suggestions={nav.map((n) => ({ href: n.href, label: n.label }))}
    />
  );
}
