
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Users, Award } from "lucide-react";

export function HeroSection() {
  const scrollToContact = () => {
    const element = document.getElementById('contato');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-gradient text-primary-foreground py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Transformamos dados em decisões de{" "}
                <span className="text-accent">qualidade</span>
              </h1>
              <p className="text-lg text-primary-foreground/90 max-w-xl">
                Consultoria especializada em avaliação de indicadores de qualidade 
                para clínicas e hospitais, usando metodologia própria baseada em 
                evidências científicas.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={scrollToContact}
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Solicite uma Avaliação
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => document.getElementById('indicadores')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver Indicadores
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <div className="text-2xl font-bold">150+</div>
                <div className="text-sm text-primary-foreground/80">Clínicas Avaliadas</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <BarChart3 className="w-8 h-8 text-accent" />
                </div>
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-primary-foreground/80">Avaliações Realizadas</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Award className="w-8 h-8 text-accent" />
                </div>
                <div className="text-2xl font-bold">85%</div>
                <div className="text-sm text-primary-foreground/80">Índice de Satisfação</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="institutional-card animate-float">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="text-sm font-semibold text-success">Sistema Ativo</span>
                </div>
                <h3 className="text-xl font-bold text-foreground">Dashboard em Tempo Real</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-excellence-light p-3 rounded-lg">
                    <div className="text-2xl font-bold text-excellence">92%</div>
                    <div className="text-sm text-excellence">Excelência</div>
                  </div>
                  <div className="bg-quality-light p-3 rounded-lg">
                    <div className="text-2xl font-bold text-quality">78%</div>
                    <div className="text-sm text-quality">Qualidade</div>
                  </div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-success rounded-full" style={{ width: '85%' }}></div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Monitoramento contínuo de indicadores de qualidade
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
