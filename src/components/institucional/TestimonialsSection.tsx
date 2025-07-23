
import { Quote, Star } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Dr. Maria Silva",
      role: "Diretora Clínica",
      institution: "Hospital São Paulo",
      content: "A consultoria FAIQ-S foi fundamental para elevarmos nossos padrões de qualidade. A metodologia é clara e os resultados são mensuráveis. Recomendo para todas as instituições de saúde.",
      rating: 5,
      improvement: "Aumento de 25% nos indicadores de qualidade"
    },
    {
      name: "Carlos Oliveira",
      role: "Gestor de Qualidade",
      institution: "Clínica Vida",
      content: "Excelente trabalho! A equipe da FAIQ-S nos ajudou a identificar pontos de melhoria que não conseguíamos enxergar. O dashboard é intuitivo e muito útil para o monitoramento contínuo.",
      rating: 5,
      improvement: "Certificação de Excelência alcançada"
    },
    {
      name: "Dra. Ana Costa",
      role: "Coordenadora Médica",
      institution: "Centro Médico Saúde+",
      content: "A avaliação foi muito detalhada e o plano de ação personalizado nos permitiu focar nos aspectos mais críticos. Hoje temos processos mais eficientes e maior satisfação dos pacientes.",
      rating: 5,
      improvement: "Redução de 40% nas não conformidades"
    }
  ];

  const cases = [
    {
      title: "Hospital Regional",
      challenge: "Baixa pontuação em indicadores de segurança",
      solution: "Implementação de protocolos específicos e treinamento da equipe",
      result: "Aumento de 35% na pontuação geral em 6 meses"
    },
    {
      title: "Clínica Especializada",
      challenge: "Processos despadronizados e falta de monitoramento",
      solution: "Desenvolvimento de indicadores personalizados e dashboard de acompanhamento",
      result: "Certificação de Qualidade obtida em 4 meses"
    },
    {
      title: "Grupo Hospitalar",
      challenge: "Necessidade de padronização entre unidades",
      solution: "Metodologia unificada e treinamento multiplataforma",
      result: "Harmonização de 95% dos processos em todas as unidades"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Depoimentos e Cases de Sucesso
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Veja o que nossos clientes falam sobre os resultados alcançados com a 
            consultoria FAIQ-S e conheça alguns de nossos cases de sucesso.
          </p>
        </div>

        {/* Depoimentos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="institutional-card">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              
              <div className="relative mb-4">
                <Quote className="w-8 h-8 text-primary/20 absolute -top-2 -left-2" />
                <p className="text-foreground leading-relaxed pl-6">
                  {testimonial.content}
                </p>
              </div>
              
              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm text-primary">{testimonial.institution}</p>
                  </div>
                </div>
                <div className="bg-success-light p-2 rounded text-center">
                  <p className="text-sm font-medium text-success">{testimonial.improvement}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cases de Sucesso */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Cases de Sucesso
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cases.map((case_, index) => (
              <div key={index} className="institutional-card">
                <h4 className="text-xl font-bold text-foreground mb-4">{case_.title}</h4>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-primary mb-2">Desafio</h5>
                    <p className="text-sm text-muted-foreground">{case_.challenge}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-accent mb-2">Solução</h5>
                    <p className="text-sm text-muted-foreground">{case_.solution}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-success mb-2">Resultado</h5>
                    <p className="text-sm font-medium text-success">{case_.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
