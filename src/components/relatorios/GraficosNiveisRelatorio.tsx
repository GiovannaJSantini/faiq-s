import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { CategoryPerformanceChart } from "@/components/dashboard/category-performance-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, PieChart as PieChartIcon } from "lucide-react";
import { Assessment } from "@/types/faiq";
import { faiqAreas } from "@/data/faiqData";

interface GraficosNiveisRelatorioProps {
  assessment: Assessment;
}

export function GraficosNiveisRelatorio({ assessment }: GraficosNiveisRelatorioProps) {
  // Calcular distribuição por níveis baseado nos indicadores reais
  const calculateLevelDistribution = () => {
    let excellenceCount = 0;
    let qualityCount = 0;
    let standardCount = 0;

    assessment.areaScores.forEach(areaScore => {
      areaScore.categoryScores.forEach(categoryScore => {
        categoryScore.indicatorScores.forEach(indicatorScore => {
          // Classificar baseado no score do indicador
          if (indicatorScore.score >= 0.8) {
            excellenceCount++;
          } else if (indicatorScore.score >= 0.5) {
            qualityCount++;
          } else {
            standardCount++;
          }
        });
      });
    });

    return [
      { name: "Padrão", count: standardCount, color: "hsl(var(--standard))" },
      { name: "Qualidade", count: qualityCount, color: "hsl(var(--quality))" },
      { name: "Excelência", count: excellenceCount, color: "hsl(var(--excellence))" }
    ];
  };

  // Calcular dados por área
  const calculateAreasData = () => {
    return faiqAreas.map(area => {
      const areaScore = assessment.areaScores.find(as => as.areaId === area.id);
      
      if (!areaScore) {
        return {
          area: area.name,
          padrao: 0,
          qualidade: 0,
          excelencia: 0
        };
      }

      let excellenceCount = 0;
      let qualityCount = 0;
      let standardCount = 0;

      areaScore.categoryScores.forEach(categoryScore => {
        categoryScore.indicatorScores.forEach(indicatorScore => {
          if (indicatorScore.score >= 0.8) {
            excellenceCount++;
          } else if (indicatorScore.score >= 0.5) {
            qualityCount++;
          } else {
            standardCount++;
          }
        });
      });

      return {
        area: area.name,
        padrao: standardCount,
        qualidade: qualityCount,
        excelencia: excellenceCount
      };
    });
  };

  const levelData = calculateLevelDistribution();
  const areasData = calculateAreasData();

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Avaliação FAIQ-S por Níveis de Qualidade</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">  
          Estrutura de avaliação organizada em três níveis - Padrão (atendimento mínimo), Qualidade (processo estruturado) e Excelência (processo robusto e auditável)
        </p>
      </div>

      <Tabs defaultValue="areas" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="areas" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Desempenho por Área
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <PieChartIcon className="w-4 h-4" />
            Desempenho por Categoria
          </TabsTrigger>
        </TabsList>

        <TabsContent value="areas" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="chart-container">
              <CardHeader>
                <CardTitle>Distribuição por Níveis</CardTitle>
                <CardDescription>
                  Visualização proporcional da classificação dos indicadores avaliados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={levelData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="count"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {levelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="chart-container">
              <CardHeader>
                <CardTitle>Comparativo por Níveis</CardTitle>
                <CardDescription>
                  Contagem absoluta de indicadores classificados em cada nível de maturidade
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={levelData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="chart-container">
            <CardHeader>
              <CardTitle>Desempenho por Área FAIQ-S</CardTitle>
              <CardDescription>
                Distribuição das 10 áreas estruturantes pelos níveis de qualidade - Padrão, Qualidade e Excelência
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={500}>
                <BarChart data={areasData} margin={{ top: 20, right: 30, left: 20, bottom: 100 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="area" 
                    angle={-45}
                    textAnchor="end"
                    height={120}
                    fontSize={12}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip />
                  <Bar dataKey="padrao" stackId="a" fill="hsl(var(--standard))" name="Padrão" />
                  <Bar dataKey="qualidade" stackId="a" fill="hsl(var(--quality))" name="Qualidade" />
                  <Bar dataKey="excelencia" stackId="a" fill="hsl(var(--excellence))" name="Excelência" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <CategoryPerformanceChart assessment={assessment} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
