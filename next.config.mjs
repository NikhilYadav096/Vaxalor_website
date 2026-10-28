import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

// Dev and production builds use separate folders, so running `npm run build` never breaks a later `npm run dev`
// (the "Cannot find module './627.js'" error comes from the two sharing .next).
export default function config(phase) {
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
    poweredByHeader: false,
    async redirects() {
      // Links from the previous site used /work?project=<slug>.
      return ["cosmo-green-energy", "ideationx", "decalion-in", "laspore-com"].map((slug) => ({
        source: "/work",
        has: [{ type: "query", key: "project", value: slug }],
        destination: `/work/${slug}`,
        permanent: true,
      }));
    },
  };
  return nextConfig;
}
