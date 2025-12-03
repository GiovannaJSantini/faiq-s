import { LumenLayout } from "@/components/lumen/LumenLayout";
import { HeroSection } from "@/components/lumen/HeroSection";
import { AboutSection } from "@/components/lumen/AboutSection";
import { ServicesSection } from "@/components/lumen/ServicesSection";
import { ExpertiseSection } from "@/components/lumen/ExpertiseSection";
import { KPIsSection } from "@/components/lumen/KPIsSection";
import { ResultsSection } from "@/components/lumen/ResultsSection";
import { MethodologySection } from "@/components/lumen/MethodologySection";
import { TDSection } from "@/components/lumen/TDSection";
import { TrainingsSection } from "@/components/lumen/TrainingsSection";
import { ClientsSection } from "@/components/lumen/ClientsSection";
import { WhyLumenSection } from "@/components/lumen/WhyLumenSection";
import { ExcellenceSection } from "@/components/lumen/ExcellenceSection";
import { QuoteFormSection } from "@/components/lumen/QuoteFormSection";
import { ContactSection } from "@/components/lumen/ContactSection";

export default function Institucional() {
  return (
    <LumenLayout>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ExpertiseSection />
      <KPIsSection />
      <ResultsSection />
      <MethodologySection />
      <TDSection />
      <TrainingsSection />
      <ClientsSection />
      <WhyLumenSection />
      <ExcellenceSection />
      <QuoteFormSection />
      <ContactSection />
    </LumenLayout>
  );
}
