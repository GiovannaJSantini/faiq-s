import { Assessment } from "@/types/faiq";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, PieChart, Pie, Legend } from 'recharts';
import { faiqAreas } from "@/data/faiqData";
import { AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DashboardRelatorioProps {
  assessment: Assessment;
}

export function DashboardRelatorio({ assessment }: DashboardRelatorioProps) {
  // 4.1 Radar de Maturidade (Escala 0-1)
  const radarData = assessment.areaScores.map((area) => {
    const areaData = faiqAreas.find(a => a.id === area.areaId);
    return {
      area: areaData?.name.replace(/^[IVX]+\.\s*/, '').replace(/^Área \d+:\s*/, '') || `Área ${area.areaId}`,
      score: area.percentage / 100 // Convertendo para escala 0-1
    };
  });

  // 4.2 Barras de Distribuição (Padrão, Qualidade, Excelência)
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

  const distributionData = [
    { name: 'Excelência', value: excellenceCount, color: 'hsl(var(--primary))' },
    { name: 'Qualidade', value: qualityCount, color: 'hsl(var(--chart-quality))' },
    { name: 'Padrão', value: standardCount, color: 'hsl(var(--chart-standard))' }
  ];

  // 4.3 Painel de Conformidade por Área
  const conformityData = assessment.areaScores.map((area) => {
    const areaData = faiqAreas.find(a => a.id === area.areaId);
    return {
      area: areaData?.name.replace(/^[IVX]+\.\s*/, '').replace(/^Área \d+:\s*/, '') || `Área ${area.areaId}`,
      percentage: area.percentage
    };
  });

  // 4.4 Heatmap de Risco
  const heatmapData = assessment.areaScores.map((area) => {
    const areaData = faiqAreas.find(a => a.id === area.areaId);
    const riskLevel = area.percentage >= 70 ? 'Baixo' : area.percentage >= 50 ? 'Moderado' : 'Alto';
    return {
      area: areaData?.name.replace(/^[IVX]+\.\s*/, '').replace(/^Área \d+:\s*/, '') || `Área ${area.areaId}`,
      score: area.percentage,
      riskLevel
    };
  }).sort((a, b) => a.score - b.score); // Ordenar por maior risco

  // 4.5 Indicadores Críticos (score = 0)
  const criticalIndicators: Array<{area: string, category: string, indicator: string}> = [];
  assessment.areaScores.forEach((area) => {
    const areaData = faiqAreas.find(a => a.id === area.areaId);
    area.categoryScores.forEach((cat) => {
      const categoryData = areaData?.categories.find(c => c.id === cat.categoryId);
      cat.indicatorScores.forEach((ind, idx) => {
        if (ind.score === 0) {
          const indicator = categoryData?.indicators[idx];
          if (indicator) {
            criticalIndicators.push({
              area: areaData?.name.replace(/^[IVX]+\.\s*/, '').replace(/^Área \d+:\s*/, '') || `Área ${area.areaId}`,
              category: categoryData?.name || `Categoria ${cat.categoryId}`,
              indicator: indicator.code
            });
          }
        }
      });
    });
  });

  const getColorByScore = (score: number) => {
    if (score >= 70) return 'hsl(var(--primary))';
    if (score >= 50) return 'hsl(var(--chart-quality))';
    return 'hsl(var(--chart-standard))';
  };

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'hsl(var(--chart-low-risk))'; // Cinza claro
    if (score >= 50) return 'hsl(var(--chart-medium-risk))'; // Laranja médio
    return 'hsl(var(--chart-high-risk))'; // Laranja forte
  };

  return (
    <div className="grid gap-6">
      {/* 4.1 Radar de Maturidade */}
      <Card>
        <CardHeader>
          <CardTitle>Painel de Maturidade por Área</CardTitle>
          <CardDescription className="text-sm text-muted-foreground mt-2">
            O painel a seguir apresenta o nível de maturidade da organização nas dez áreas estruturantes da FAIQ.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={450}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(var(--border))" strokeWidth={0.5} />
              <PolarAngleAxis 
                dataKey="area" 
                tick={{ fill: 'hsl(var(--foreground))', fontSize: 11, fontWeight: 500 }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 1]} 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
              />
              <Radar 
                name="Maturidade" 
                dataKey="score" 
                stroke="hsl(var(--primary))" 
                fill="hsl(var(--primary))" 
                fillOpacity={0.3} 
                strokeWidth={2}
              />
              <Tooltip 
                formatter={(value: number) => `${(value * 100).toFixed(1)}%`}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--popover))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* 4.2 Distribuição por Categoria */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Classificação</CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-2">
              Este bloco sintetiza o desempenho global, permitindo a visualização da distribuição entre níveis essenciais, intermediários e avançados.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={distributionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  labelLine={{ stroke: 'hsl(var(--border))' }}
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: '6px' }} />
                <Legend wrapperStyle={{ fontSize: '13px' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 4.4 Mapa de Calor (Heatmap de Risco) */}
        <Card>
          <CardHeader>
            <CardTitle>Mapa de Riscos por Área</CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-2">
              Intensidade de risco baseada no nível de maturidade: Baixo (≥70%), Moderado (50-70%), Alto (&lt;50%).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={heatmapData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeWidth={0.5} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} />
                <YAxis dataKey="area" type="category" width={120} tick={{ fontSize: 10 }} />
                <Tooltip 
                  formatter={(value: number) => `${value.toFixed(1)}%`}
                  contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: '6px' }}
                />
                <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                  {heatmapData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getRiskColor(entry.score)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(var(--chart-low-risk))' }} />
                <span>Baixo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(var(--chart-medium-risk))' }} />
                <span>Moderado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(var(--chart-high-risk))' }} />
                <span>Alto</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 4.3 Painel de Conformidade */}
      <Card>
        <CardHeader>
          <CardTitle>Painel de Conformidade por Área</CardTitle>
          <CardDescription className="text-sm text-muted-foreground mt-2">
            Percentual de conformidade para cada uma das dez áreas estruturantes da FAIQ.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={conformityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeWidth={0.5} />
              <XAxis 
                dataKey="area" 
                angle={-45} 
                textAnchor="end" 
                height={140}
                tick={{ fontSize: 10 }}
              />
              <YAxis 
                domain={[0, 100]} 
                tick={{ fontSize: 10 }}
                label={{ value: 'Conformidade (%)', angle: -90, position: 'insideLeft', style: { fontSize: 11 } }}
              />
              <Tooltip 
                formatter={(value: number) => `${value.toFixed(1)}%`}
                contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: '6px' }}
              />
              <Bar dataKey="percentage" radius={[6, 6, 0, 0]}>
                {conformityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getColorByScore(entry.percentage)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 4.5 Indicadores Críticos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-chart-high-risk" />
            Indicadores Críticos (Nota 0)
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground mt-2">
            Lista de indicadores que receberam pontuação zero, requerendo atenção imediata.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {criticalIndicators.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>✓ Nenhum indicador crítico identificado</p>
              <p className="text-sm mt-2">Todos os indicadores atingiram pelo menos o nível básico.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {criticalIndicators.map((item, idx) => (
                <div key={idx} className="border-l-2 border-chart-high-risk bg-muted/30 px-4 py-3 rounded-r">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-0.5 text-xs border-chart-high-risk text-chart-high-risk">
                      {item.indicator}
                    </Badge>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.area}</p>
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
