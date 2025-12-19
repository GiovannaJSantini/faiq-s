import { LumenLayout } from "@/components/lumen/LumenLayout";
import { HeroSection } from "@/components/lumen/HeroSection";
import { PortfolioOrganizationSection } from "@/components/lumen/PortfolioOrganizationSection";
import { ServicesPortfolioSection } from "@/components/lumen/ServicesPortfolioSection";
import { ServiceLevelsSection } from "@/components/lumen/ServiceLevelsSection";
import { HowToRequestSection } from "@/components/lumen/HowToRequestSection";
import { ContactSection } from "@/components/lumen/ContactSection";

export default function Institucional() {
  return (
    <LumenLayout>
      <HeroSection />
      <PortfolioOrganizationSection />
      <ServicesPortfolioSection />
      <ServiceLevelsSection />
      <HowToRequestSection />
      <ContactSection />
    </LumenLayout>
  );
}
