import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import Reveal from "@/components/motion/Reveal";
import ContactForm from "@/components/ui/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell Vaxalor about your project. We reply within 24 hours.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <>
      <PageHero
        label="Contact"
        title={
          <>
            Ready to build something <span className="accent">great?</span>
          </>
        }
        lead="Tell us about your project. We'll get back within 24 hours."
      />

      <section className="section contact" style={{ paddingTop: 0 }}>
        <div className="wrap contact-grid">
          <Reveal variant="children" as="dl" className="contact-info">
            <div>
              <dt>Talk to</dt>
              <dd>{site.contactPerson}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd><a href={`mailto:${site.email}`}>{site.email}</a></dd>
            </div>
            <div>
              <dt>General</dt>
              <dd><a href={`mailto:${site.generalEmail}`}>{site.generalEmail}</a></dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd><a href={site.phoneHref}>{site.phone}</a></dd>
            </div>
            <div>
              <dt>Follow</dt>
              <dd className="dd-links">
                {site.socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ))}
              </dd>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <ContactForm idPrefix="contact" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
