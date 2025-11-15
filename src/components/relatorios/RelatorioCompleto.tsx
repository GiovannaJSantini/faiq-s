import { Assessment } from "@/types/faiq";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClassificationBadge } from "@/components/ui/classification-badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Building2, Calendar, User, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { faiqAreas } from "@/data/faiqData";
import { Separator } from "@/components/ui/separator";

interface RelatorioCompletoProps {
  assessment: Assessment;
  clinicName: string;
}

export function RelatorioCompleto({ assessment, clinicName }: RelatorioCompletoProps) {
  // Calcular estatísticas
  const totalIndicators = assessment.areaScores.reduce((sum, area) => 
    sum + area.categoryScores.reduce((catSum, cat) => 
      catSum + cat.indicatorScores.length, 0
    ), 0
  );

  const excellenceCount = assessment.areaScores.reduce((sum, area) => 
    sum + area.categoryScores.reduce((catSum, cat) => 
      catSum + cat.indicatorScores.filter(ind => ind.score === 1).length, 0
    ), 0
  );

  const qualityCount = assessment.areaScores.reduce((sum, area) => 
    sum + area.categoryScores.reduce((catSum, cat) => 
      catSum + cat.indicatorScores.filter(ind => ind.score === 0.5).length, 0
    ), 0
  );

  const standardCount = assessment.areaScores.reduce((sum, area) => 
    sum + area.categoryScores.reduce((catSum, cat) => 
      catSum + cat.indicatorScores.filter(ind => ind.score === 0).length, 0
    ), 0
  );

  const excellencePercent = ((excellenceCount / totalIndicators) * 100).toFixed(1);
  const qualityPercent = ((qualityCount / totalIndicators) * 100).toFixed(1);
  const standardPercent = ((standardCount / totalIndicators) * 100).toFixed(1);

  return (
    <div className="space-y-8 print:space-y-6">
      {/* 1. Identificação */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">1. Identificação da Organização</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Nome da instituição</p>
                <p className="font-medium">{clinicName}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Data da avaliação</p>
                <p className="font-medium">
                  {format(assessment.assessmentDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Responsável técnico</p>
                <p className="font-medium">{assessment.assessorName}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Classificação</p>
                <ClassificationBadge classification={assessment.classification} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Objetivo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">2. Objetivo do Relatório</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            O objetivo deste relatório é apresentar uma análise integrada da maturidade organizacional em dez áreas críticas: 
            jornada do profissional, jornada do cliente, cuidado interdisciplinar, stakeholders, documentação clínica, 
            qualidade e sustentabilidade, compliance, diversidade e equidade, envolvimento comunitário e operações administrativas. 
            A avaliação orienta decisões estratégicas, priorização de investimentos e gestão da melhoria contínua.
          </p>
        </CardContent>
      </Card>

      {/* 3. Metodologia */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">3. Metodologia da Avaliação</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 mt-0.5 text-primary" />
              <span>Revisão documental</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 mt-0.5 text-primary" />
              <span>Observação direta de processos</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 mt-0.5 text-primary" />
              <span>Entrevistas com lideranças e equipes</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 mt-0.5 text-primary" />
              <span>Auditoria de conformidade</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 mt-0.5 text-primary" />
              <span>Análise quantitativa e qualitativa</span>
            </li>
          </ul>
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="font-medium mb-2">Classificação dos itens:</p>
            <div className="space-y-1 text-sm">
              <p><Badge variant="outline">Padrão</Badge> – atendimento mínimo</p>
              <p><Badge variant="outline">Qualidade</Badge> – processo estruturado</p>
              <p><Badge variant="outline">Excelência</Badge> – processo robusto, auditável e escalável</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. Sumário Executivo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">4. Sumário Executivo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-3">Panorama Geral</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">{assessment.overallPercentage.toFixed(1)}%</p>
                    <p className="text-sm text-muted-foreground mt-1">Score Global</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">{excellencePercent}%</p>
                    <p className="text-sm text-muted-foreground mt-1">Excelência</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-amber-600">{qualityPercent}%</p>
                    <p className="text-sm text-muted-foreground mt-1">Qualidade</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Pontos Fortes Estruturantes
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              {assessment.areaScores
                .filter(area => area.percentage >= 70)
                .map((area, idx) => {
                  const areaData = faiqAreas.find(a => a.id === area.areaId);
                  return (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-green-600">•</span>
                      <span>{areaData?.name || `Área ${area.areaId}`} - {area.percentage.toFixed(1)}%</span>
                    </li>
                  );
                })}
              {assessment.areaScores.filter(area => area.percentage >= 70).length === 0 && (
                <li className="text-muted-foreground italic">Nenhuma área atingiu 70% ou mais</li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              Oportunidades de Melhoria
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              {assessment.areaScores
                .filter(area => area.percentage < 50)
                .map((area, idx) => {
                  const areaData = faiqAreas.find(a => a.id === area.areaId);
                  return (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-600">•</span>
                      <span>{areaData?.name || `Área ${area.areaId}`} - {area.percentage.toFixed(1)}%</span>
                    </li>
                  );
                })}
              {assessment.areaScores.filter(area => area.percentage < 50).length === 0 && (
                <li className="text-muted-foreground italic">Todas as áreas atingiram pelo menos 50%</li>
              )}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* 5. Resultados por Área */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">5. Resultados por Área</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {assessment.areaScores.map((areaScore) => {
            const areaData = faiqAreas.find(a => a.id === areaScore.areaId);
            if (!areaData) return null;

            return (
              <div key={areaScore.areaId} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{areaData.name}</h3>
                  <Badge variant={areaScore.percentage >= 70 ? "default" : areaScore.percentage >= 50 ? "secondary" : "outline"}>
                    {areaScore.percentage.toFixed(1)}%
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  {areaScore.categoryScores.map((catScore) => {
                    const categoryData = areaData.categories.find(c => c.id === catScore.categoryId);
                    if (!categoryData) return null;

                    return (
                      <div key={catScore.categoryId} className="ml-4">
                        <p className="font-medium text-sm mb-2">{categoryData.name}</p>
                        <div className="space-y-1 ml-4">
                          {catScore.indicatorScores.map((indScore, idx) => {
                            const indicator = categoryData.indicators[idx];
                            if (!indicator) return null;

                            return (
                              <div key={indScore.indicatorId} className="text-sm flex items-start gap-2">
                                <span className={
                                  indScore.score === 1 ? "text-green-600" :
                                  indScore.score === 0.5 ? "text-amber-600" :
                                  "text-red-600"
                                }>
                                  {indScore.score === 1 ? "✓" : indScore.score === 0.5 ? "○" : "✗"}
                                </span>
                                <span className="text-muted-foreground">{indicator.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* 6. Análise Quantitativa */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">6. Análise Quantitativa</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-4">6.1 Score de Maturidade por Área</h3>
            <div className="space-y-3">
              {assessment.areaScores.map((area) => {
                const areaData = faiqAreas.find(a => a.id === area.areaId);
                return (
                  <div key={area.areaId} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{areaData?.name || `Área ${area.areaId}`}</span>
                      <span className="font-medium">{area.percentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all" 
                        style={{ width: `${area.percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Separator />

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-semibold mb-2">6.2 Score Global</h4>
              <p className="text-3xl font-bold text-primary">{assessment.overallPercentage.toFixed(1)}%</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">6.3 Score de Risco</h4>
              <p className="text-3xl font-bold text-red-600">{standardPercent}%</p>
              <p className="text-xs text-muted-foreground">Itens em nível Padrão</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Índice de Robustez</h4>
              <p className="text-3xl font-bold text-green-600">{excellencePercent}%</p>
              <p className="text-xs text-muted-foreground">Itens em nível Excelência</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 7. Plano de Ação Estratégico */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">7. Plano de Ação Estratégico</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-3">Horizonte 30 Dias – Operacional</h3>
            <p className="text-muted-foreground mb-3">Correções imediatas e padronizações básicas</p>
            <ul className="space-y-2">
              {assessment.areaScores
                .filter(area => area.percentage < 40)
                .slice(0, 3)
                .map((area, idx) => {
                  const areaData = faiqAreas.find(a => a.id === area.areaId);
                  return (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary">→</span>
                      <span className="text-sm">Revisar e padronizar processos em {areaData?.name}</span>
                    </li>
                  );
                })}
            </ul>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-lg mb-3">Horizonte 90 Dias – Estrutural</h3>
            <p className="text-muted-foreground mb-3">Implementação de diretrizes e capacitações</p>
            <ul className="space-y-2">
              {assessment.areaScores
                .filter(area => area.percentage >= 40 && area.percentage < 60)
                .slice(0, 3)
                .map((area, idx) => {
                  const areaData = faiqAreas.find(a => a.id === area.areaId);
                  return (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary">→</span>
                      <span className="text-sm">Desenvolver diretrizes formais para {areaData?.name}</span>
                    </li>
                  );
                })}
            </ul>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-lg mb-3">Horizonte 12 Meses – Transformação</h3>
            <p className="text-muted-foreground mb-3">Governança, KPIs e expansão sustentável</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary">→</span>
                <span className="text-sm">Implementar dashboards de qualidade para todas as áreas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">→</span>
                <span className="text-sm">Estabelecer comitês de qualidade e compliance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">→</span>
                <span className="text-sm">Desenvolver programa de certificação interno</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
