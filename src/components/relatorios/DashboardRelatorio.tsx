import { Assessment } from "@/types/faiq";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, PieChart, Pie, Legend } from 'recharts';
import { faiqAreas } from "@/data/faiqData";

interface DashboardRelatorioProps {
  assessment: Assessment;
}

export function DashboardRelatorio({ assessment }: DashboardRelatorioProps) {
  // Dados para o radar de maturidade por área
  const radarData = assessment.areaScores.map((area) => {
    const areaData = faiqAreas.find(a => a.id === area.areaId);
    return {
      area: areaData?.name.replace(/^[IVX]+\.\s*/, '') || `Área ${area.areaId}`,
      score: area.percentage
    };
  });

  // Dados para o gráfico de distribuição (Padrão, Qualidade, Excelência)
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

  const distributionData = [
    { name: 'Excelência', value: excellenceCount, color: '#1FA87A' },
    { name: 'Qualidade', value: qualityCount, color: '#3B82F6' },
    { name: 'Padrão', value: standardCount, color: '#F28C28' }
  ];

  // Dados para Pareto de riscos (áreas com menor score)
  const paretoData = [...assessment.areaScores]
    .sort((a, b) => a.percentage - b.percentage)
    .slice(0, 5)
    .map((area) => {
      const areaData = faiqAreas.find(a => a.id === area.areaId);
      return {
        area: areaData?.name.replace(/^[IVX]+\.\s*/, '') || `Área ${area.areaId}`,
        score: area.percentage,
        gap: 100 - area.percentage
      };
    });

  // Dados para o heatmap (categorias por área)
  const heatmapData = assessment.areaScores.map((area) => {
    const areaData = faiqAreas.find(a => a.id === area.areaId);
    const categories = area.categoryScores.map((cat) => ({
      name: cat.categoryId,
      score: cat.percentage
    }));
    
    return {
      area: areaData?.name.replace(/^[IVX]+\.\s*/, '') || `Área ${area.areaId}`,
      avgScore: area.percentage,
      categories
    };
  });

  const getColor = (score: number) => {
    if (score >= 70) return '#1FA87A';
    if (score >= 50) return '#3B82F6';
    return '#F28C28';
  };

  return (
    <div className="grid gap-6">
      {/* Radar de Maturidade */}
      <Card>
        <CardHeader>
          <CardTitle>Radar de Maturidade por Área</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis 
                dataKey="area" 
                tick={{ fill: '#4B535A', fontSize: 12 }}
              />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar 
                name="Score" 
                dataKey="score" 
                stroke="#1FA87A" 
                fill="#1FA87A" 
                fillOpacity={0.6} 
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Distribuição por Nível */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Classificação</CardTitle>
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
                  outerRadius={80}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pareto de Riscos */}
        <Card>
          <CardHeader>
            <CardTitle>Pareto de Oportunidades (5 Menores Scores)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={paretoData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="area" type="category" width={100} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="score" fill="#1FA87A">
                  {paretoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getColor(entry.score)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Heatmap de Categorias */}
      <Card>
        <CardHeader>
          <CardTitle>Heatmap: Score por Área</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={heatmapData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="area" 
                angle={-45} 
                textAnchor="end" 
                height={120}
                tick={{ fontSize: 10 }}
              />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="avgScore" radius={[8, 8, 0, 0]}>
                {heatmapData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getColor(entry.avgScore)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
