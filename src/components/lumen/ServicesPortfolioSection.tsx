import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileSearch, FileCheck, Users, Building2, Shield, Headphones, Check, ArrowRight } from "lucide-react";

const services = [
  {
    icon: FileSearch,
    number: "01",
    title: "Avaliação Diagnóstica FAIQ-S",
    description: "Auditoria técnica estruturada da qualidade clínica, governança e compliance institucional.",
    deliverables: ["Relatório técnico estruturado", "Score por área avaliada", "Mapa de riscos clínicos e organizacionais", "Sumário executivo para liderança"],
    color: "primary"
  },
  {
    icon: FileCheck,
    number: "02",
    title: "Sistema de Qualidade Clínica",
    description: "Padronização e governança da documentação clínica e implantação de um sistema contínuo de qualidade baseado em evidências e fidelidade de implementação.",
    deliverables: ["Protocolos e diretrizes operacionais", "Sistema de documentação clínica", "Indicadores de qualidade", "Processos de melhoria contínua"],
    color: "secondary"
  },
  {
    icon: Users,
    number: "03",
    title: "Modelo de Desenvolvimento de Pessoas e Performance Clínica",
    description: "Estruturação técnica de cargos, competências e critérios de performance, com capacitação clínica estruturada por função.",
    deliverables: ["Matriz de competências por cargo", "Trilhas de desenvolvimento", "Sistema de avaliação de performance", "Programa de capacitação técnica"],
    color: "accent"
  },
  {
    icon: Building2,
    number: "04",
    title: "Modelo Estratégico de Governança Clínica (Organizacional)",
    description: "Estruturação da governança organizacional e dos processos decisórios da clínica, garantindo previsibilidade e base para escala.",
    deliverables: ["Estrutura de governança", "Fluxos decisórios", "Comitês e fóruns técnicos", "Indicadores de gestão"],
    color: "success"
  },
  {
    icon: Shield,
    number: "05",
    title: "Modelo Estratégico de Governança Clínica",
    description: "Preparação técnica e organizacional para credenciamento e auditorias externas (operadoras e certificações).",
    deliverables: ["Análise de gaps para certificação", "Plano de adequação técnica", "Documentação para credenciamento", "Preparação para auditorias"],
    color: "excellence"
  },
  {
    icon: Headphones,
    number: "06",
    title: "On-going Consultation / Advisory Clínico",
    description: "Acompanhamento estratégico contínuo para sustentação das decisões clínicas e organizacionais.",
    deliverables: ["Reuniões mensais estruturadas de advisory", "Revisão periódica de indicadores clínicos e organizacionais", "Registro de decisões e recomendações técnicas", "Relatório mensal de acompanhamento e riscos"],
    isOptional: true,
    color: "primary"
  }
];

const colorClasses = {
  primary: "bg-primary/10 text-primary border-primary/20",
  secondary: "bg-secondary/10 text-secondary border-secondary/20",
  accent: "bg-accent/10 text-accent border-accent/20",
  success: "bg-success/10 text-success border-success/20",
  excellence: "bg-excellence/10 text-excellence border-excellence/20",
};

export function ServicesPortfolioSection() {
  return (
    <section id="portfolio" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            Nossas Soluções
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Portfólio de Serviços
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Soluções técnicas especializadas para elevar a qualidade clínica e 
            a maturidade organizacional da sua instituição.
          </p>
        </div>

        <div className="space-y-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Service Info */}
                <CardHeader className="lg:col-span-7 p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${colorClasses[service.color as keyof typeof colorClasses]} border`}>
                        <service.icon className="w-8 h-8" />
                      </div>
                    </div>
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-sm font-bold text-muted-foreground">
                          {service.number}
                        </span>
                        {service.isOptional && (
                          <Badge variant="outline" className="text-xs">
                            Contratação Separada
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl lg:text-2xl group-hover:text-primary transition-colors">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {service.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                {/* Deliverables */}
                <CardContent className="lg:col-span-5 bg-muted/30 p-8 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-border/50">
                  <p className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-primary" />
                    Entregáveis-chave
                  </p>
                  <ul className="space-y-3">
                    {service.deliverables.map((deliverable, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}