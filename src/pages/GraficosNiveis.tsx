
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { CategoryPerformanceChart } from "@/components/dashboard/category-performance-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, PieChart as PieChartIcon } from "lucide-react";

const levelData = [
  { name: "Padrão", count: 45, color: "hsl(var(--standard))" },
  { name: "Qualidade", count: 30, color: "hsl(var(--quality))" },
  { name: "Excelência", count: 25, color: "hsl(var(--excellence))" }
];

const areasData = [
  { area: "I. Jornada do Profissional", padrao: 12, qualidade: 8, excelencia: 5 },
  { area: "II. Jornada do Cliente", padrao: 10, qualidade: 7, excelencia: 8 },
  { area: "III. Gestão de Processos", padrao: 8, qualidade: 9, excelencia: 6 },
  { area: "IV. Liderança e Governança", padrao: 15, qualidade: 5, excelencia: 3 },
  { area: "V. Estratégia e Inovação", padrao: 11, qualidade: 8, excelencia: 7 },
  { area: "VI. Resultados Organizacionais", padrao: 14, qualidade: 6, excelencia: 4 },
  { area: "VII. Informação e Conhecimento", padrao: 9, qualidade: 9, excelencia: 8 },
  { area: "VIII. Responsabilidade Social", padrao: 13, qualidade: 7, excelencia: 5 },
  { area: "IX. Relacionamento Interpessoal", padrao: 7, qualidade: 11, excelencia: 9 },
  { area: "X. Sustentabilidade e Meio Ambiente", padrao: 6, qualidade: 10, excelencia: 12 }
];

const GraficosNiveis = () => {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Avaliação FAIQ-S por Níveis de Qualidade</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">  
          Estrutura de avaliação organizada em três níveis: Padrão, Qualidade e Excelência
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
                  Porcentagem de organizações em cada nível de qualidade
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
                  Número de organizações classificadas em cada nível
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
                Distribuição das 10 áreas do FAIQ-S pelos níveis de qualidade
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
          <CategoryPerformanceChart />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GraficosNiveis;
