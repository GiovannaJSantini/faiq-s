import { Card, CardContent } from "@/components/ui/card";
import { LayoutGrid, Layers, Puzzle, ClipboardCheck, RefreshCw } from "lucide-react";

const organizationCards = [
  {
    icon: LayoutGrid,
    title: "Organização por Áreas",
    description: "Serviços estruturados por dimensões da qualidade clínica, governança institucional e maturidade organizacional, alinhados ao modelo FAIQ.",
    gradient: "from-primary/10 to-primary/5"
  },
  {
    icon: Layers,
    title: "Atuação Transversal",
    description: "Abordagem integrada que atravessa áreas clínicas, administrativas e decisórias, garantindo coerência entre estratégia, operação e prática assistencial.",
    gradient: "from-secondary/10 to-secondary/5"
  },
  {
    icon: Puzzle,
    title: "Projetos Modulares",
    description: "Serviços combináveis e escaláveis, definidos conforme o momento da clínica, prioridades estratégicas e necessidades institucionais.",
    gradient: "from-accent/10 to-accent/5"
  },
  {
    icon: ClipboardCheck,
    title: "Diagnóstico como Base",
    description: "A Avaliação FAIQ-S orienta o planejamento, a priorização das intervenções e a definição do nível de serviço mais adequado.",
    gradient: "from-success/10 to-success/5"
  },
  {
    icon: RefreshCw,
    title: "Acompanhamento Contínuo",
    description: "Modelo de acompanhamento estratégico contínuo, contratado separadamente, para sustentação das decisões clínicas e organizacionais após a implantação dos projetos.",
    gradient: "from-excellence/10 to-excellence/5"
  }
];

export function PortfolioOrganizationSection() {
  return (
    <section id="organizacao" className="py-24 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary text-sm font-medium rounded-full mb-4">
            Nossa Metodologia
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Como o Portfólio Está Organizado
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estrutura modular e integrada para atender às necessidades específicas de cada instituição.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {organizationCards.map((card, index) => (
            <Card 
              key={index} 
              className={`group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${index === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-50`} />
              <CardContent className="relative p-8">
                <div className="w-14 h-14 bg-card rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <card.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{card.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{card.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
