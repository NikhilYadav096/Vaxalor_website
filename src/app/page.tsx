import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Story from "@/components/sections/Story";
import Services from "@/components/sections/Services";
import WorkStack from "@/components/sections/WorkStack";
import Systems from "@/components/sections/Systems";
import Process from "@/components/sections/Process";
import Why from "@/components/sections/Why";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: { absolute: "Vaxalor | Websites, apps and AI solutions shipped in 20 days" },
  description:
    "Vaxalor is a digital studio building websites, apps, AI solutions and business systems. Shipped in 20 days, built to last.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Story />
      <Services />
      <WorkStack />
      <Systems />
      <Process />
      <Why />
      <FinalCta />
    </>
  );
}
