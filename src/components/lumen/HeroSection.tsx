import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import fluidaLogoVertical from "@/assets/fluida-logo-vertical.jpeg";

const highlights = [
  "Qualidade clínica baseada em evidências",
  "Governança institucional estruturada",
  "Processos certificáveis"
];

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-background to-accent/10" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Consultoria Especializada</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
              Portfólio de Serviços em{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Qualidade Clínica
              </span>{" "}
              e Governança
            </h1>
            
            <p className="text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Consultoria especializada em qualidade clínica, governança e 
              sustentabilidade institucional para clínicas de saúde.
            </p>
            
            {/* Highlights */}
            <ul className="space-y-3">
              {highlights.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-foreground">
                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="group text-base px-8" asChild>
                <a href="https://forms.gle/zEAZXbcQ5eCK1McbA" target="_blank" rel="noopener noreferrer">
                  Solicitar Orçamento
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8" asChild>
                <a href="#portfolio">
                  Ver Serviços
                </a>
              </Button>
            </div>
          </div>

          <div className="relative hidden lg:flex justify-center">
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-xl" />
              
              <div className="relative aspect-square bg-gradient-to-br from-card to-muted rounded-3xl flex items-center justify-center p-12 shadow-xl border border-border/50">
                <img 
                  src={fluidaLogoVertical} 
                  alt="Fluida - Consultoria em Excelência Clínica" 
                  className="max-w-[280px] w-full h-auto rounded-xl shadow-lg"
                />
              </div>
              
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 px-4 py-2 bg-card rounded-full shadow-lg border border-border flex items-center gap-2">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                <span className="text-sm font-medium">FAIQ-S Certificado</span>
              </div>
              
              <div className="absolute -bottom-4 -left-4 px-4 py-2 bg-card rounded-full shadow-lg border border-border">
                <span className="text-sm font-medium text-muted-foreground">+50 clínicas atendidas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}