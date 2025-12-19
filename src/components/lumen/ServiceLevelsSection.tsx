import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Award, Crown } from "lucide-react";

const levels = [
  {
    icon: Shield,
    name: "Padrão",
    tagline: "Base segura e estruturada",
    description: "Fundamentação técnica para instituições que buscam estabelecer processos básicos de qualidade e organização clínica.",
    color: "bg-blue-500"
  },
  {
    icon: Award,
    name: "Qualidade",
    tagline: "Padronização e consistência técnica",
    description: "Elevação do padrão operacional com sistemas estruturados de qualidade, documentação e indicadores de desempenho.",
    color: "bg-[#1FA87A]"
  },
  {
    icon: Crown,
    name: "Excelência",
    tagline: "Governança e sustentabilidade institucional",
    description: "Maturidade organizacional completa com governança robusta, processos decisórios estruturados e preparação para certificações.",
    color: "bg-amber-500"
  }
];

export function ServiceLevelsSection() {
  return (
    <section id="niveis" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Níveis de Serviço
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            O nível adequado é definido após análise técnica da solicitação, 
            considerando o momento e as necessidades da instituição.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {levels.map((level, index) => (
            <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`absolute top-0 left-0 right-0 h-1 ${level.color}`} />
              <CardHeader className="text-center pt-8">
                <div className={`w-16 h-16 ${level.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <level.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">{level.name}</CardTitle>
                <p className="text-sm font-medium text-[#1FA87A]">{level.tagline}</p>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">{level.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground italic">
            O nível de serviço é definido com base na Avaliação Diagnóstica FAIQ-S e nas 
            prioridades estratégicas definidas em conjunto com a instituição.
          </p>
        </div>
      </div>
    </section>
  );
}
