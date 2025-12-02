import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export function MethodologySection() {
  return (
    <section id="metodologia" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Metodologia de Trabalho
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Abordagem estruturada em duas fases para garantir resultados sustentáveis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Fase 1 */}
          <Card className="border-2 border-[#1FA87A]/20">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-[#1FA87A] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <div>
                  <CardTitle className="text-2xl">Fase 1 – Diagnóstico</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">Duração: 1–2 meses</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-[#1FA87A] flex-shrink-0 mt-0.5" />
                <p className="text-foreground">Análise técnica abrangente dos processos clínicos</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-[#1FA87A] flex-shrink-0 mt-0.5" />
                <p className="text-foreground">Entrevistas qualificadas com lideranças e equipes</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-[#1FA87A] flex-shrink-0 mt-0.5" />
                <p className="text-foreground">Observações diretas de práticas clínicas</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-[#1FA87A] flex-shrink-0 mt-0.5" />
                <p className="text-foreground">Levantamento e análise de indicadores de qualidade</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-[#1FA87A] flex-shrink-0 mt-0.5" />
                <p className="text-foreground">Relatório estratégico com recomendações priorizadas</p>
              </div>
            </CardContent>
          </Card>

          {/* Fase 2 */}
          <Card className="border-2 border-[#F28C28]/20">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-[#F28C28] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <div>
                  <CardTitle className="text-2xl">Fase 2 – Implementação</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">Duração: 3–6 meses</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-[#F28C28] flex-shrink-0 mt-0.5" />
                <p className="text-foreground">Desenvolvimento de soluções customizadas</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-[#F28C28] flex-shrink-0 mt-0.5" />
                <p className="text-foreground">Acompanhamento contínuo da execução</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-[#F28C28] flex-shrink-0 mt-0.5" />
                <p className="text-foreground">Capacitação técnica de equipes e lideranças</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-[#F28C28] flex-shrink-0 mt-0.5" />
                <p className="text-foreground">Monitoramento de indicadores e resultados</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-[#F28C28] flex-shrink-0 mt-0.5" />
                <p className="text-foreground">Consolidação das mudanças e autonomia operacional</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
