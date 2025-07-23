
import { Target, Eye, Heart, CheckCircle } from "lucide-react";

export function AboutSection() {
  const values = [
    {
      icon: Target,
      title: "Missão",
      description: "Elevar os padrões de qualidade em instituições de saúde através de avaliações técnicas precisas e metodologia científica comprovada."
    },
    {
      icon: Eye,
      title: "Visão",
      description: "Ser referência nacional em consultoria de qualidade para o setor de saúde, contribuindo para a melhoria contínua dos serviços prestados."
    },
    {
      icon: Heart,
      title: "Valores",
      description: "Compromisso com a excelência, transparência nas avaliações, inovação tecnológica e foco no impacto positivo na saúde dos pacientes."
    }
  ];

  const differentials = [
    "Metodologia própria baseada em evidências científicas",
    "Equipe especializada em indicadores de qualidade",
    "Plataforma tecnológica avançada para análise de dados",
    "Relatórios detalhados e planos de ação personalizados",
    "Acompanhamento contínuo pós-avaliação",
    "Certificação reconhecida pelo setor"
  ];

  return (
    <section id="sobre" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Sobre a FAIQ-S
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Somos uma consultoria especializada em avaliação de indicadores de qualidade, 
            com foco em clínicas e hospitais. Nossa metodologia exclusiva combina rigor 
            científico com praticidade operacional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => (
            <div key={index} className="institutional-card text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Nossos Diferenciais
            </h3>
            <div className="space-y-4">
              {differentials.map((differential, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-foreground">{differential}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="institutional-card">
            <h4 className="text-xl font-bold text-foreground mb-4">
              Metodologia FAIQ-S
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h5 className="font-semibold text-foreground">Diagnóstico Inicial</h5>
                  <p className="text-sm text-muted-foreground">Análise completa dos processos atuais</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h5 className="font-semibold text-foreground">Avaliação Técnica</h5>
                  <p className="text-sm text-muted-foreground">Aplicação de indicadores específicos</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-success text-success-foreground rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h5 className="font-semibold text-foreground">Plano de Ação</h5>
                  <p className="text-sm text-muted-foreground">Estratégias personalizadas de melhoria</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
