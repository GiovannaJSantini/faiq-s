import { Card, CardContent } from "@/components/ui/card";
import { Award, Briefcase, TrendingUp, Users } from "lucide-react";

const kpis = [
  {
    icon: Award,
    number: "15+",
    label: "Anos de Experiência",
    description: "Expertise consolidada em excelência clínica e desenvolvimento organizacional"
  },
  {
    icon: Briefcase,
    number: "50+",
    label: "Projetos Realizados",
    description: "Implementações bem-sucedidas em organizações de diversos portes"
  },
  {
    icon: TrendingUp,
    number: "200+",
    label: "Indicadores Avaliados",
    description: "Monitoramento rigoroso de qualidade e desempenho clínico"
  },
  {
    icon: Users,
    number: "1000+",
    label: "Profissionais Capacitados",
    description: "Treinamentos técnicos especializados e desenvolvimento de competências"
  }
];

export function KPIsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#1FA87A]/5 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Know-how e Autoridade
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Números que refletem nosso compromisso com a excelência
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 space-y-4">
                <div className="w-16 h-16 bg-[#1FA87A]/10 rounded-full flex items-center justify-center mx-auto">
                  <kpi.icon className="w-8 h-8 text-[#1FA87A]" />
                </div>
                <div>
                  <p className="text-4xl font-bold text-[#1FA87A] mb-2">{kpi.number}</p>
                  <p className="text-lg font-semibold text-foreground mb-2">{kpi.label}</p>
                  <p className="text-sm text-muted-foreground">{kpi.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
