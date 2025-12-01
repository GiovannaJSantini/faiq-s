import { Assessment } from "@/types/faiq";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClassificationBadge } from "@/components/ui/classification-badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Building2, Calendar, User, TrendingUp, CheckCircle, AlertTriangle, Target } from "lucide-react";
import { faiqAreas } from "@/data/faiqData";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface RelatorioCompletoProps {
  assessment: Assessment;
  clinicName: string;
}

export function RelatorioCompleto({ assessment, clinicName }: RelatorioCompletoProps) {
  // Estatísticas
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

  // Identificar áreas fortes e de melhoria
  const strongAreas = assessment.areaScores.filter(a => a.percentage >= 70).slice(0, 3);
  const improvementAreas = assessment.areaScores.filter(a => a.percentage < 50).slice(0, 3);
  const strategicLeverages = assessment.areaScores
    .filter(a => a.percentage >= 50 && a.percentage < 70)
    .slice(0, 3);

  return (
    <div className="space-y-8 print:space-y-6">
      {/* 3.1 Identificação da Organização */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader className="bg-muted/30">
          <CardTitle className="text-2xl text-primary">1. Identificação da Organização</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Clínica</p>
                  <p className="font-semibold text-lg">{clinicName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Data da Avaliação</p>
                  <p className="font-semibold">{format(assessment.assessmentDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Consultor Responsável</p>
                  <p className="font-semibold">{assessment.assessorName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Classificação</p>
                  <ClassificationBadge classification={assessment.classification} />
                </div>
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
            <p className="text-sm font-medium text-primary">Escopo da Avaliação</p>
            <p className="text-sm text-muted-foreground mt-1">
              Avaliação completa de maturidade organizacional em 10 áreas estruturantes do framework FAIQ, 
              compreendendo {totalIndicators} indicadores avaliados através de revisão documental, 
              observação direta de processos e entrevistas com stakeholders-chave.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 3.2 Sumário Executivo */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader className="bg-muted/30">
          <CardTitle className="text-2xl text-primary">2. Sumário Executivo</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Maturidade Geral */}
          <div className="bg-muted/30 p-6 rounded-lg border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Maturidade Organizacional Global</p>
                <p className="text-4xl font-bold text-primary mt-1">{assessment.overallPercentage.toFixed(1)}%</p>
              </div>
              <ClassificationBadge classification={assessment.classification} />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-xs text-muted-foreground">Excelência</p>
                <p className="text-2xl font-semibold text-primary">{excellencePercent}%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Qualidade</p>
                <p className="text-2xl font-semibold text-chart-quality">{qualityPercent}%</p>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed italic border-l-2 border-primary pl-4">
            A análise identifica padrões de maturidade consistentes em {strongAreas.length} áreas-chave, 
            com oportunidades estratégicas de fortalecimento em {improvementAreas.length} dimensões críticas 
            que impactam diretamente a governança clínica e a consistência operacional.
          </p>

          <Separator />

          {/* Três Forças */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-primary">
              <CheckCircle className="h-5 w-5" />
              Três Forças Principais
            </h3>
            <ul className="space-y-2">
              {strongAreas.map((area, idx) => {
                const areaData = faiqAreas.find(a => a.id === area.areaId);
                return (
                  <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>{areaData?.name || `Área ${area.areaId}`}</strong> - Maturidade de {area.percentage.toFixed(1)}% demonstra processos estruturados e sustentáveis</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Três Riscos */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-chart-high-risk">
              <AlertTriangle className="h-5 w-5" />
              Três Riscos Prioritários
            </h3>
            <ul className="space-y-2">
              {improvementAreas.map((area, idx) => {
                const areaData = faiqAreas.find(a => a.id === area.areaId);
                return (
                  <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-chart-high-risk font-bold">•</span>
                    <span><strong>{areaData?.name || `Área ${area.areaId}`}</strong> - Lacunas críticas ({area.percentage.toFixed(1)}%) com impacto direto em conformidade e qualidade do cuidado</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Três Alavancas Estratégicas */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-chart-quality">
              <Target className="h-5 w-5" />
              Três Alavancas Estratégicas
            </h3>
            <ul className="space-y-2">
              {strategicLeverages.map((area, idx) => {
                const areaData = faiqAreas.find(a => a.id === area.areaId);
                return (
                  <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-chart-quality font-bold">•</span>
                    <span><strong>{areaData?.name || `Área ${area.areaId}`}</strong> - Oportunidade de elevação estruturada a partir de base intermediária ({area.percentage.toFixed(1)}%)</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* 3.5 Análises Executivas por Área */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader className="bg-muted/30">
          <CardTitle className="text-2xl text-primary">3. Análises Executivas por Área</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {assessment.areaScores.map((areaScore) => {
            const areaData = faiqAreas.find(a => a.id === areaScore.areaId);
            if (!areaData) return null;

            const fortalezas: string[] = [];
            const riscos: string[] = [];

            areaScore.categoryScores.forEach(cat => {
              const excellenceInCat = cat.indicatorScores.filter(ind => ind.score === 1).length;
              const criticalInCat = cat.indicatorScores.filter(ind => ind.score === 0).length;
              const categoryData = areaData.categories.find(c => c.id === cat.categoryId);
              
              if (excellenceInCat >= cat.indicatorScores.length * 0.7 && categoryData) {
                fortalezas.push(`${categoryData.name}: processos robustos e auditáveis`);
              }
              if (criticalInCat >= 2 && categoryData) {
                riscos.push(`${categoryData.name}: lacunas críticas com impacto operacional`);
              }
            });

            return (
              <div key={areaScore.areaId} className="border rounded-lg p-6 bg-muted/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-primary">{areaData.name}</h3>
                  <Badge variant={areaScore.percentage >= 70 ? "default" : areaScore.percentage >= 50 ? "secondary" : "outline"}>
                    {areaScore.percentage.toFixed(1)}%
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Descrição</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {areaData.description}. A área apresenta maturidade de {areaScore.percentage.toFixed(1)}%, 
                      indicando {areaScore.percentage >= 70 ? 'processos estruturados e sustentáveis' : 
                                 areaScore.percentage >= 50 ? 'base estabelecida com oportunidades de fortalecimento' : 
                                 'necessidade de desenvolvimento estrutural significativo'}.
                    </p>
                  </div>

                  {fortalezas.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">Forças</p>
                      <ul className="space-y-1">
                        {fortalezas.slice(0, 3).map((f, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {riscos.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold text-chart-high-risk uppercase tracking-wide mb-2">Riscos</p>
                      <ul className="space-y-1">
                        {riscos.slice(0, 3).map((r, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 text-chart-high-risk mt-0.5 flex-shrink-0" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-3 border-t">
                    <p className="text-xs italic text-muted-foreground">
                      <strong>Impacto Operacional e Clínico:</strong> As evidências observadas nesta área impactam 
                      diretamente a consistência da intervenção e a governança clínica, com reflexos em conformidade 
                      regulatória e qualidade percebida pelos stakeholders.
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* 3.6 Tabela Completa de Indicadores (incluindo VII.6) */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader className="bg-muted/30">
          <CardTitle className="text-2xl text-primary">4. Tabela Completa de Indicadores</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Código</TableHead>
                <TableHead className="w-[200px]">Categoria</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead className="w-[120px]">Classificação</TableHead>
                <TableHead className="w-[80px] text-center">Nota</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assessment.areaScores.map((area) => {
                const areaData = faiqAreas.find(a => a.id === area.areaId);
                return area.categoryScores.map((cat) => {
                  const categoryData = areaData?.categories.find(c => c.id === cat.categoryId);
                  return cat.indicatorScores.map((ind, idx) => {
                    const indicator = categoryData?.indicators[idx];
                    if (!indicator) return null;

                    return (
                      <TableRow key={ind.indicatorId}>
                        <TableCell className="font-mono text-xs">{indicator.code}</TableCell>
                        <TableCell className="text-xs">{categoryData?.name}</TableCell>
                        <TableCell className="text-xs">{indicator.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {indicator.classification === 'excelencia' ? 'Excelência' : 
                             indicator.classification === 'qualidade' ? 'Qualidade' : 'Padrão'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={`font-bold ${
                            ind.score === 1 ? 'text-primary' :
                            ind.score === 0.5 ? 'text-chart-quality' :
                            'text-chart-high-risk'
                          }`}>
                            {ind.score}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  });
                });
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 3.7 Análise Qualitativa Detalhada */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader className="bg-muted/30">
          <CardTitle className="text-2xl text-primary">5. Análise Qualitativa Detalhada</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* 3.7.1 SWOT */}
          <div>
            <h3 className="font-semibold text-lg mb-4">5.1 Análise SWOT</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 bg-primary/5">
                <p className="font-semibold text-primary mb-2">Forças (Strengths)</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {strongAreas.map((area, idx) => {
                    const areaData = faiqAreas.find(a => a.id === area.areaId);
                    return <li key={idx}>• {areaData?.name.replace(/^[IVX]+\.\s*/, '').replace(/^Área \d+:\s*/, '')}</li>;
                  })}
                </ul>
              </div>
              <div className="border rounded-lg p-4 bg-chart-high-risk/5">
                <p className="font-semibold text-chart-high-risk mb-2">Fraquezas (Weaknesses)</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {improvementAreas.map((area, idx) => {
                    const areaData = faiqAreas.find(a => a.id === area.areaId);
                    return <li key={idx}>• {areaData?.name.replace(/^[IVX]+\.\s*/, '').replace(/^Área \d+:\s*/, '')}</li>;
                  })}
                </ul>
              </div>
              <div className="border rounded-lg p-4 bg-chart-quality/5">
                <p className="font-semibold text-chart-quality mb-2">Oportunidades (Opportunities)</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {strategicLeverages.map((area, idx) => {
                    const areaData = faiqAreas.find(a => a.id === area.areaId);
                    return <li key={idx}>• Fortalecimento estruturado de {areaData?.name.replace(/^[IVX]+\.\s*/, '').replace(/^Área \d+:\s*/, '')}</li>;
                  })}
                </ul>
              </div>
              <div className="border rounded-lg p-4 bg-muted/30">
                <p className="font-semibold text-muted-foreground mb-2">Ameaças (Threats)</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Risco regulatório em áreas críticas</li>
                  <li>• Impacto na qualidade percebida</li>
                  <li>• Vulnerabilidade em conformidade</li>
                </ul>
              </div>
            </div>
          </div>

          <Separator />

          {/* 3.7.3 Consequências Clínicas */}
          <div>
            <h3 className="font-semibold text-lg mb-3">5.2 Consequências Clínicas e Operacionais</h3>
            <div className="bg-muted/30 border-l-4 border-l-chart-high-risk p-4 rounded-r-lg">
              <p className="text-sm text-muted-foreground leading-relaxed">
                As lacunas identificadas implicam em risco <strong>{
                  assessment.overallPercentage >= 70 ? 'baixo a moderado' :
                  assessment.overallPercentage >= 50 ? 'moderado' : 'moderado a alto'
                }</strong> para segurança do paciente, continuidade de cuidado e consistência de intervenção. 
                Recomenda-se ação imediata nas áreas críticas para mitigar exposição regulatória e 
                preservar a qualidade clínica percebida por stakeholders.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3.8 Plano de Ação Estratégico */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader className="bg-muted/30">
          <CardTitle className="text-2xl text-primary">6. Plano de Ação Estratégico</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Crítico 0-30 dias */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-chart-high-risk">6.1 Horizonte Crítico (0–30 dias)</h3>
            <p className="text-sm text-muted-foreground mb-3">Ações de correção imediata para mitigar riscos operacionais e regulatórios</p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Objetivo</TableHead>
                  <TableHead>KPI</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Evidência</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {improvementAreas.slice(0, 2).map((area, idx) => {
                  const areaData = faiqAreas.find(a => a.id === area.areaId);
                  return (
                    <TableRow key={idx}>
                      <TableCell className="text-sm">Padronizar processos em {areaData?.name.replace(/^[IVX]+\.\s*/, '').replace(/^Área \d+:\s*/, '')}</TableCell>
                      <TableCell className="text-sm">100% conformidade mínima</TableCell>
                      <TableCell className="text-sm">Diretor Clínico</TableCell>
                      <TableCell className="text-sm">Checklist validado</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          <Separator />

          {/* Estratégico 30-90 dias */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-chart-quality">6.2 Horizonte Estratégico (30–90 dias)</h3>
            <p className="text-sm text-muted-foreground mb-3">Implementação de diretrizes e capacitações estruturadas</p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Objetivo</TableHead>
                  <TableHead>KPI</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Evidência</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {strategicLeverages.slice(0, 2).map((area, idx) => {
                  const areaData = faiqAreas.find(a => a.id === area.areaId);
                  return (
                    <TableRow key={idx}>
                      <TableCell className="text-sm">Desenvolver diretrizes para {areaData?.name.replace(/^[IVX]+\.\s*/, '').replace(/^Área \d+:\s*/, '')}</TableCell>
                      <TableCell className="text-sm">Protocolos formalizados</TableCell>
                      <TableCell className="text-sm">Comitê Qualidade</TableCell>
                      <TableCell className="text-sm">Documento auditável</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          <Separator />

          {/* Maturidade 90-180 dias */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-primary">6.3 Horizonte de Maturidade (90–180 dias)</h3>
            <p className="text-sm text-muted-foreground mb-3">Consolidação de processos e início de monitoramento</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                <span>Implementar dashboards de qualidade para áreas críticas</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                <span>Estabelecer rotina de auditorias internas</span>
              </li>
            </ul>
          </div>

          <Separator />

          {/* Excelência 180-360 dias */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-primary">6.4 Horizonte de Excelência (180–360 dias)</h3>
            <p className="text-sm text-muted-foreground mb-3">Governança, KPIs e expansão sustentável</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                <span>Desenvolver programa de certificação interno</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                <span>Estabelecer comitês de qualidade e compliance permanentes</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                <span>Integrar sistemas de monitoramento de performance</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* 3.9 Recomendações Finais */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader className="bg-muted/30">
          <CardTitle className="text-2xl text-primary">7. Recomendações Finais</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-muted-foreground leading-relaxed">
            Recomenda-se priorizar processos estruturantes que elevem a qualidade clínica, reforcem a governança 
            e reduzam variabilidade operacional. A implementação sequencial das ações propostas, com foco em áreas 
            críticas nos primeiros 30 dias, permitirá mitigação de riscos regulatórios e fortalecimento da base de 
            conformidade. O estabelecimento de rotinas de monitoramento e auditorias internas será fundamental para 
            sustentação dos ganhos de maturidade ao longo dos próximos 12 meses.
          </p>
        </CardContent>
      </Card>

      {/* 3.10 Referências Técnicas */}
      <Card className="border-l-4 border-l-muted">
        <CardHeader className="bg-muted/30">
          <CardTitle className="text-xl text-muted-foreground">8. Referências Técnicas</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground italic">
            Este relatório se baseia exclusivamente em frameworks e documentos reconhecidos na área, 
            apresentados de forma formal e alinhados às melhores práticas profissionais em gestão de 
            qualidade, compliance e excelência clínica.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
