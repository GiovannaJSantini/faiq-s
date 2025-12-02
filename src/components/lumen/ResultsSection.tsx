import { Card, CardContent } from "@/components/ui/card";

const results = [
  {
    percentage: 95,
    title: "Padronização de Processos",
    description: "Organizações com protocolos e diretrizes implementados com sucesso"
  },
  {
    percentage: 87,
    title: "Aumento de Qualidade",
    description: "Melhoria mensurável nos indicadores de qualidade clínica"
  },
  {
    percentage: 78,
    title: "Implementação Operacional",
    description: "Taxa de execução bem-sucedida das recomendações estratégicas"
  },
  {
    percentage: 65,
    title: "Redução de Riscos",
    description: "Diminuição de não conformidades e riscos operacionais"
  }
];

export function ResultsSection() {
  return (
    <section id="resultados" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Resultados e Impacto
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Evidências concretas do impacto das nossas soluções
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((result, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="relative w-32 h-32 mx-auto">
                  <svg className="transform -rotate-90 w-32 h-32">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-muted"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - result.percentage / 100)}`}
                      className="text-[#1FA87A]"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-[#1FA87A]">{result.percentage}%</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{result.title}</h3>
                  <p className="text-sm text-muted-foreground">{result.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
