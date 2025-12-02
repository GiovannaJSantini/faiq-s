import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileCheck, Users, BookOpen, Target, TrendingUp, GraduationCap, BarChart } from "lucide-react";

const services = [
  {
    icon: FileCheck,
    title: "Auditoria Clínica",
    description: "Avaliação técnica completa de processos, protocolos e práticas clínicas baseada em evidências científicas."
  },
  {
    icon: TrendingUp,
    title: "Acompanhamento Pós-Auditoria",
    description: "Monitoramento contínuo da implementação de melhorias e análise de indicadores de qualidade."
  },
  {
    icon: BookOpen,
    title: "Diretrizes Operacionais Padronizadas",
    description: "Desenvolvimento de protocolos, manuais e procedimentos operacionais alinhados às melhores práticas."
  },
  {
    icon: Target,
    title: "Sistemas de Qualidade Clínica",
    description: "Implementação de sistemas de gestão da qualidade, indicadores e processos de melhoria contínua."
  },
  {
    icon: Users,
    title: "Formação de Lideranças",
    description: "Desenvolvimento de competências técnicas e comportamentais para gestores e coordenadores clínicos."
  },
  {
    icon: GraduationCap,
    title: "Treinamentos e Workshops",
    description: "Capacitação técnica especializada em ABA, gestão clínica, interdisciplinaridade e qualidade."
  },
  {
    icon: BarChart,
    title: "T&D, Carreira e Performance",
    description: "Estruturação de trilhas de desenvolvimento, sistemas de supervisão e avaliação de desempenho."
  }
];

export function ServicesSection() {
  return (
    <section id="servicos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Nossos Serviços
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Soluções completas e integradas para elevar a qualidade clínica e 
            o desempenho organizacional da sua instituição.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-[#1FA87A]/10 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-[#1FA87A]" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  {service.description}
                </CardDescription>
                <Button variant="link" className="p-0 h-auto text-[#1FA87A]">
                  Saiba Mais →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
