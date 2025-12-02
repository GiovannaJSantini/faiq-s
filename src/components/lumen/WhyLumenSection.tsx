const reasons = [
  {
    number: "01",
    title: "Expertise Comprovada",
    description: "Mais de 15 anos de experiência em excelência clínica e desenvolvimento organizacional para instituições TEA."
  },
  {
    number: "02",
    title: "Abordagem Científica",
    description: "Metodologias baseadas em evidências, análise rigorosa de dados e frameworks reconhecidos internacionalmente."
  },
  {
    number: "03",
    title: "Soluções Práticas",
    description: "Foco em implementação real e sustentável, com acompanhamento contínuo e resultados mensuráveis."
  },
  {
    number: "04",
    title: "Compromisso com Resultados",
    description: "Monitoramento de indicadores, ajustes estratégicos e garantia de impacto duradouro nas organizações."
  },
  {
    number: "05",
    title: "Visão Sistêmica",
    description: "Entendimento profundo da complexidade organizacional, integrando processos clínicos, gestão e desenvolvimento."
  }
];

export function WhyLumenSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#1FA87A]/5 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Por Que Escolher a Lumen
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Diferenciais que nos tornam parceiros estratégicos das organizações mais exigentes
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {reasons.map((reason, index) => (
            <div key={index} className="flex gap-6 p-6 bg-background rounded-lg border border-border hover:shadow-lg transition-shadow">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-[#1FA87A] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">{reason.number}</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{reason.title}</h3>
                <p className="text-muted-foreground">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
