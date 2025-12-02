import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-[#1FA87A]/10 via-background to-background py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Excelência em Qualidade Clínica e Desenvolvimento Organizacional
            </h1>
            <p className="text-lg text-muted-foreground">
              Serviços científicos, baseados em evidências e orientados a resultados 
              para organizações que atendem a população TEA.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => scrollToSection('orcamento')}>
                Solicitar Orçamento
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('servicos')}>
                Conhecer Serviços
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-[#1FA87A] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">Expertise técnica em TEA</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-[#1FA87A] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">Gestão baseada em dados</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-[#1FA87A] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">Implementação sustentável</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-[#1FA87A]/20 to-[#F28C28]/20 rounded-2xl flex items-center justify-center">
              <div className="text-center space-y-4 p-8">
                <div className="w-24 h-24 bg-[#1FA87A] rounded-full flex items-center justify-center mx-auto">
                  <span className="text-4xl text-white font-bold">L</span>
                </div>
                <p className="text-lg font-semibold text-foreground">
                  Transformando Organizações<br />através da Excelência
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
