import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";
import { pillars } from "@/data/services";
import { projects } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number) => ({ url: `${SITE_URL}${path}`, lastModified: now, priority });
  return [
    page("", 1),
    page("/services", 0.9),
    ...pillars.map((p) => page(`/services/${p.slug}`, 0.8)),
    page("/work", 0.9),
    ...projects.map((p) => page(`/work/${p.slug}`, 0.7)),
    page("/about", 0.7),
    page("/blog", 0.6),
    page("/contact", 0.9),
    page("/faq", 0.5),
    page("/privacy", 0.2),
    page("/terms", 0.2),
  ];
}
