import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import { legalUpdated, terms } from "@/data/content";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that apply to Vaxalor's services.",
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  return (
    <>
      <PageHero label={`Last updated ${legalUpdated}`} title="Terms of Service" />
      <section className="section prose-wrap" style={{ paddingTop: 0 }}>
        <div className="wrap prose">
          {terms.map((s, i) => (
            <section key={s.h}>
              <h2>
                {i + 1}. {s.h}
              </h2>
              <p>{s.p}</p>
            </section>
          ))}
          <section>
            <h2>Contact</h2>
            <p>
              Questions about these terms? Write to <a href={`mailto:${site.generalEmail}`}>{site.generalEmail}</a>.
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
