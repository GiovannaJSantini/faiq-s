export function ExpertiseSection() {
  const expertiseAreas = [
    { name: "Análise do Comportamento Aplicada", level: 95 },
    { name: "Indicadores e Dados", level: 90 },
    { name: "Gestão de Pessoas", level: 88 },
    { name: "Interdisciplinaridade", level: 85 },
    { name: "Qualidade Clínica", level: 92 },
    { name: "Desenvolvimento Organizacional", level: 87 }
  ];

  return (
    <section id="expertise" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Áreas de Expertise Técnica
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Competências consolidadas que sustentam a excelência dos nossos serviços
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {expertiseAreas.map((area, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">{area.name}</h3>
                <span className="text-sm font-medium text-[#1FA87A]">{area.level}%</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#1FA87A] to-[#168F67] rounded-full transition-all duration-1000"
                  style={{ width: `${area.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
