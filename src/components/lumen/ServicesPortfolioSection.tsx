import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileSearch, FileCheck, Users, Building2, Shield, Headphones, Check } from "lucide-react";

const services = [
  {
    icon: FileSearch,
    number: "01",
    title: "Avaliação Diagnóstica FAIQ-S",
    description: "Auditoria técnica estruturada da qualidade clínica, governança e compliance institucional.",
    deliverables: [
      "Relatório técnico estruturado",
      "Score por área avaliada",
      "Mapa de riscos clínicos e organizacionais",
      "Sumário executivo para liderança"
    ]
  },
  {
    icon: FileCheck,
    number: "02",
    title: "Sistema de Qualidade Clínica",
    description: "Padronização e governança da documentação clínica e implantação de um sistema contínuo de qualidade baseado em evidências e fidelidade de implementação.",
    deliverables: [
      "Protocolos e diretrizes operacionais",
      "Sistema de documentação clínica",
      "Indicadores de qualidade",
      "Processos de melhoria contínua"
    ]
  },
  {
    icon: Users,
    number: "03",
    title: "Modelo de Desenvolvimento de Pessoas e Performance Clínica",
    description: "Estruturação técnica de cargos, competências e critérios de performance, com capacitação clínica estruturada por função.",
    deliverables: [
      "Matriz de competências por cargo",
      "Trilhas de desenvolvimento",
      "Sistema de avaliação de performance",
      "Programa de capacitação técnica"
    ]
  },
  {
    icon: Building2,
    number: "04",
    title: "Modelo Estratégico de Governança Clínica (Organizacional)",
    description: "Estruturação da governança organizacional e dos processos decisórios da clínica, garantindo previsibilidade e base para escala.",
    deliverables: [
      "Estrutura de governança",
      "Fluxos decisórios",
      "Comitês e fóruns técnicos",
      "Indicadores de gestão"
    ]
  },
  {
    icon: Shield,
    number: "05",
    title: "Modelo Estratégico de Governança Clínica",
    description: "Preparação técnica e organizacional para credenciamento e auditorias externas (operadoras e certificações).",
    deliverables: [
      "Análise de gaps para certificação",
      "Plano de adequação técnica",
      "Documentação para credenciamento",
      "Preparação para auditorias"
    ]
  },
  {
    icon: Headphones,
    number: "06",
    title: "On-going Consultation / Advisory Clínico",
    description: "Acompanhamento estratégico contínuo para sustentação das decisões clínicas e organizacionais.",
    deliverables: [
      "Reuniões mensais estruturadas de advisory",
      "Revisão periódica de indicadores clínicos e organizacionais",
      "Registro de decisões e recomendações técnicas",
      "Relatório mensal de acompanhamento e riscos"
    ],
    isOptional: true
  }
];

export function ServicesPortfolioSection() {
  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Portfólio de Serviços
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Soluções técnicas especializadas para elevar a qualidade clínica e 
            a maturidade organizacional da sua instituição.
          </p>
        </div>

        <div className="space-y-6">
          {services.map((service, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                <CardHeader className="lg:col-span-2 bg-card">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-[#1FA87A]/10 rounded-lg flex items-center justify-center">
                        <service.icon className="w-7 h-7 text-[#1FA87A]" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-[#1FA87A]">
                          Serviço {service.number}
                        </span>
                        {service.isOptional && (
                          <Badge variant="secondary">Opcional</Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl lg:text-2xl">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {service.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="bg-muted/30 p-6 flex flex-col justify-center">
                  <p className="text-sm font-semibold text-foreground mb-3">
                    Entregáveis-chave:
                  </p>
                  <ul className="space-y-2">
                    {service.deliverables.map((deliverable, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-[#1FA87A] flex-shrink-0 mt-0.5" />
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
