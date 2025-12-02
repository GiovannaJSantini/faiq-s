import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, TrendingUp, Users, Award, BookOpen } from "lucide-react";

const tdItems = [
  {
    icon: Target,
    title: "Trilhas de Carreira",
    description: "Estruturação de planos de desenvolvimento profissional alinhados aos objetivos organizacionais"
  },
  {
    icon: BookOpen,
    title: "Competências Técnicas e Comportamentais",
    description: "Mapeamento e desenvolvimento de habilidades essenciais para cada função"
  },
  {
    icon: Users,
    title: "Sistema de Supervisão Contínua",
    description: "Implementação de processos estruturados de mentoria e acompanhamento"
  },
  {
    icon: TrendingUp,
    title: "Avaliação de Performance",
    description: "Métodos objetivos de avaliação baseados em indicadores e competências"
  },
  {
    icon: Award,
    title: "Programas de Crescimento",
    description: "Iniciativas estratégicas para desenvolvimento de talentos e sucessão"
  }
];

export function TDSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            T&D, Carreira e Performance
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Soluções integradas para desenvolver pessoas e fortalecer equipes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tdItems.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-[#1FA87A]/10 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-[#1FA87A]" />
                </div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
