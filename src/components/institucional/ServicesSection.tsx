
import { BarChart3, Users, BookOpen, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ServicesSection() {
  const services = [
    {
      icon: BarChart3,
      title: "Avaliação de Qualidade",
      description: "Análise completa dos indicadores de qualidade da sua instituição usando nossa metodologia proprietária FAIQ-S.",
      features: [
        "Diagnóstico completo em 3 áreas principais",
        "Mais de 50 indicadores específicos",
        "Classificação em níveis de qualidade",
        "Relatório detalhado com plano de ação"
      ],
      highlight: "Mais Procurado"
    },
    {
      icon: Users,
      title: "Desenvolvimento de Indicadores",
      description: "Criação e implementação de indicadores personalizados para as necessidades específicas da sua clínica ou hospital.",
      features: [
        "Indicadores customizados",
        "Metodologia científica",
        "Integração com sistemas existentes",
        "Monitoramento contínuo"
      ]
    },
    {
      icon: BookOpen,
      title: "Treinamentos Especializados",
      description: "Capacitação da equipe em gestão de qualidade, análise de indicadores e melhoria contínua de processos.",
      features: [
        "Treinamentos presenciais e online",
        "Certificação profissional",
        "Material didático exclusivo",
        "Suporte pós-treinamento"
      ]
    },
    {
      icon: Headphones,
      title: "Suporte Técnico",
      description: "Acompanhamento contínuo com consultoria especializada para implementação e manutenção de melhorias.",
      features: [
        "Suporte 24/7",
        "Consultoria remota",
        "Acompanhamento de resultados",
        "Relatórios periódicos"
      ]
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contato');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="servicos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nossos Serviços
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Oferecemos soluções completas para avaliação e melhoria da qualidade 
            em instituições de saúde, com metodologia própria e equipe especializada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="institutional-card relative">
              {service.highlight && (
                <div className="absolute -top-3 left-6">
                  <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    {service.highlight}
                  </span>
                </div>
              )}
              
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              </div>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                onClick={scrollToContact}
                className="w-full institutional-button-secondary"
              >
                Solicitar Orçamento
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="institutional-card max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Pronto para elevar a qualidade da sua instituição?
            </h3>
            <p className="text-muted-foreground mb-6">
              Entre em contato conosco e descubra como podemos ajudar sua clínica 
              ou hospital a alcançar novos patamares de excelência.
            </p>
            <Button
              onClick={scrollToContact}
              size="lg"
              className="institutional-button"
            >
              Fale com um Consultor
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
