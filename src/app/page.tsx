import Hero from "@/components/hero/Hero";
import ScrollClaim from "@/components/home/ScrollClaim";
import Reach from "@/components/home/Reach";
import Pillars from "@/components/home/Pillars";
import WorkStrip from "@/components/home/WorkStrip";
import Numbers from "@/components/home/Numbers";
import OutreachSpotlight from "@/components/home/OutreachSpotlight";
import Process from "@/components/home/Process";
import ToolsTeaser from "@/components/home/ToolsTeaser";
import Testimonials from "@/components/home/Testimonials";

import { getStats } from "@/lib/settings";
import { getCaseStudies } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const stats = await getStats();
  const caseStudies = await getCaseStudies();
  const featured = caseStudies.filter((c) => c.featured);
  return (
    <>
      <Hero />
      <ScrollClaim />
      <Reach />
      <Pillars />
      <WorkStrip featured={featured} />
      <Numbers stats={stats} />
      <OutreachSpotlight />
      <Process />
      <ToolsTeaser />
      <Testimonials />
    </>
  );
}
