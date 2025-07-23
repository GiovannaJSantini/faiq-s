
import { InstitutionalLayout } from "@/components/layout/InstitutionalLayout";
import { HeroSection } from "@/components/institucional/HeroSection";
import { AboutSection } from "@/components/institucional/AboutSection";
import { ServicesSection } from "@/components/institucional/ServicesSection";
import { DashboardDemo } from "@/components/institucional/DashboardDemo";
import { TestimonialsSection } from "@/components/institucional/TestimonialsSection";
import { ContactSection } from "@/components/institucional/ContactSection";

export default function Institucional() {
  return (
    <InstitutionalLayout>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <DashboardDemo />
      <TestimonialsSection />
      <ContactSection />
    </InstitutionalLayout>
  );
}
