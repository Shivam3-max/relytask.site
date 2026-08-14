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

export default function Home() {
  return (
    <>
      <Hero />
      <ScrollClaim />
      <Reach />
      <Pillars />
      <WorkStrip />
      <Numbers />
      <OutreachSpotlight />
      <Process />
      <ToolsTeaser />
      <Testimonials />
    </>
  );
}
