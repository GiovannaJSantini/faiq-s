import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import fluidaLogoVertical from "@/assets/fluida-logo-vertical.jpeg";

export function HeroSection() {
  return <section className="relative bg-gradient-to-br from-[#1FA87A]/10 via-background to-background py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Portfólio de Serviços em Qualidade Clínica e Governança
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Consultoria especializada em qualidade clínica, governança e 
              sustentabilidade institucional para clínicas de saúde.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" asChild>
                <a href="https://forms.gle/zEAZXbcQ5eCK1McbA" target="_blank" rel="noopener noreferrer">
                  Solicitar Orçamento
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                
              </Button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="aspect-square bg-gradient-to-br from-[#1FA87A]/20 to-[#1FA87A]/5 rounded-2xl flex items-center justify-center p-8">
              <img 
                src={fluidaLogoVertical} 
                alt="Fluida - Consultoria em Excelência Clínica" 
                className="max-w-[280px] w-full h-auto rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>;
}