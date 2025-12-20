import { Card, CardContent } from "@/components/ui/card";
import { Shield, Award, Crown, ArrowRight } from "lucide-react";

const levels = [
  {
    icon: Shield,
    name: "Padrão",
    tagline: "Base segura e estruturada",
    description: "Fundamentação técnica para instituições que buscam estabelecer processos básicos de qualidade e organização clínica.",
    color: "primary",
    features: ["Processos básicos", "Documentação inicial", "Conformidade essencial"]
  },
  {
    icon: Award,
    name: "Qualidade",
    tagline: "Padronização e consistência técnica",
    description: "Elevação do padrão operacional com sistemas estruturados de qualidade, documentação e indicadores de desempenho.",
    color: "secondary",
    features: ["Indicadores de desempenho", "Processos padronizados", "Melhoria contínua"],
    highlighted: true
  },
  {
    icon: Crown,
    name: "Excelência",
    tagline: "Governança e sustentabilidade institucional",
    description: "Maturidade organizacional completa com governança robusta, processos decisórios estruturados e preparação para certificações.",
    color: "excellence",
    features: ["Governança robusta", "Certificações", "Escala sustentável"]
  }
];

const colorClasses = {
  primary: {
    bg: "bg-primary",
    bgLight: "bg-primary/10",
    text: "text-primary",
    border: "border-primary/30"
  },
  secondary: {
    bg: "bg-secondary",
    bgLight: "bg-secondary/10",
    text: "text-secondary",
    border: "border-secondary/30"
  },
  excellence: {
    bg: "bg-excellence",
    bgLight: "bg-excellence/10",
    text: "text-excellence",
    border: "border-excellence/30"
  }
};

export function ServiceLevelsSection() {
  return (
    <section id="niveis" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-excellence/10 text-excellence text-sm font-medium rounded-full mb-4">
            Níveis de Maturidade
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Níveis de Serviço
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            O nível adequado é definido após análise técnica da solicitação, 
            considerando o momento e as necessidades da instituição.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {levels.map((level, index) => {
            const colors = colorClasses[level.color as keyof typeof colorClasses];
            return (
              <Card 
                key={index} 
                className={`relative overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                  level.highlighted 
                    ? `${colors.border} shadow-xl scale-105` 
                    : 'border-border/50 hover:border-primary/30'
                }`}
              >
                {level.highlighted && (
                  <div className={`absolute top-0 left-0 right-0 py-1.5 ${colors.bg} text-white text-xs font-medium text-center`}>
                    Mais Popular
                  </div>
                )}
                
                <CardContent className={`p-8 ${level.highlighted ? 'pt-12' : ''}`}>
                  <div className={`w-20 h-20 ${colors.bgLight} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <level.icon className={`w-10 h-10 ${colors.text}`} />
                  </div>
                  
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-foreground mb-2">{level.name}</h3>
                    <p className={`text-sm font-medium ${colors.text}`}>{level.tagline}</p>
                  </div>
                  
                  <p className="text-muted-foreground text-center mb-6 leading-relaxed">
                    {level.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {level.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm">
                        <ArrowRight className={`w-4 h-4 ${colors.text} flex-shrink-0`} />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground italic max-w-2xl mx-auto">
            O nível de serviço é definido com base na Avaliação Diagnóstica FAIQ-S e nas 
            prioridades estratégicas definidas em conjunto com a instituição.
          </p>
        </div>
      </div>
    </section>
  );
}
