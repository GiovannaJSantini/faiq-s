import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutGrid, Layers, Puzzle, ClipboardCheck, RefreshCw } from "lucide-react";

const organizationCards = [
  {
    icon: LayoutGrid,
    title: "Organização por Áreas",
    description: "Serviços estruturados por dimensões da qualidade clínica, governança institucional e maturidade organizacional, alinhados ao modelo FAIQ."
  },
  {
    icon: Layers,
    title: "Atuação Transversal",
    description: "Abordagem integrada que atravessa áreas clínicas, administrativas e decisórias, garantindo coerência entre estratégia, operação e prática assistencial."
  },
  {
    icon: Puzzle,
    title: "Projetos Modulares",
    description: "Serviços combináveis e escaláveis, definidos conforme o momento da clínica, prioridades estratégicas e necessidades institucionais."
  },
  {
    icon: ClipboardCheck,
    title: "Diagnóstico como Base",
    description: "A Avaliação FAIQ-S orienta o planejamento, a priorização das intervenções e a definição do nível de serviço mais adequado."
  },
  {
    icon: RefreshCw,
    title: "Acompanhamento Contínuo",
    description: "Modelo de acompanhamento estratégico contínuo, contratado separadamente, para sustentação das decisões clínicas e organizacionais após a implantação dos projetos."
  }
];

export function PortfolioOrganizationSection() {
  return (
    <section id="organizacao" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Como o Portfólio Está Organizado
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estrutura modular e integrada para atender às necessidades específicas de cada instituição.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {organizationCards.map((card, index) => (
            <Card 
              key={index} 
              className={`hover:shadow-lg transition-shadow ${index === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-[#1FA87A]/10 rounded-lg flex items-center justify-center mb-4">
                  <card.icon className="w-6 h-6 text-[#1FA87A]" />
                </div>
                <CardTitle className="text-xl">{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{card.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
