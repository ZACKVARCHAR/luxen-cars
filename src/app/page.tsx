import { FleetSection } from "@/components/home/FleetSection";
import { HeroStage } from "@/components/home/HeroStage";
import { HowItWorks } from "@/components/home/HowItWorks";
import { SearchWidget } from "@/components/home/SearchWidget";
import { TrustContact } from "@/components/home/TrustContact";
import { ValueProps } from "@/components/home/ValueProps";

export default function HomePage() {
  return (
    <>
      <HeroStage />
      <SearchWidget />
      <ValueProps />
      <FleetSection />
      <HowItWorks />
      <TrustContact />
    </>
  );
}
