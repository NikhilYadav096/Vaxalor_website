import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import { legalUpdated, privacy } from "@/data/content";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Vaxalor collects, uses and protects your information.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <>
      <PageHero label={`Last updated ${legalUpdated}`} title="Privacy Policy" />
      <section className="section prose-wrap" style={{ paddingTop: 0 }}>
        <div className="wrap prose">
          {privacy.map((s) => (
            <section key={s.h}>
              <h2>{s.h}</h2>
              <p>{s.p}</p>
            </section>
          ))}
          <section>
            <h2>Contact</h2>
            <p>
              Privacy questions and data requests go to <a href={`mailto:${site.generalEmail}`}>{site.generalEmail}</a>.
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
