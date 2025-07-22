
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const levelData = [
  { name: "Padrão", count: 45, color: "#ef4444" },
  { name: "Qualidade", count: 30, color: "#f59e0b" },
  { name: "Excelência", count: 25, color: "#10b981" }
];

const areasData = [
  { area: "Liderança e Gestão", padrao: 12, qualidade: 8, excelencia: 5 },
  { area: "Estratégia e Planejamento", padrao: 10, qualidade: 7, excelencia: 8 },
  { area: "Foco no Cliente/Paciente", padrao: 8, qualidade: 9, excelencia: 6 },
  { area: "Informação e Conhecimento", padrao: 15, qualidade: 5, excelencia: 3 },
  { area: "Pessoas", padrao: 11, qualidade: 8, excelencia: 7 },
  { area: "Processos", padrao: 14, qualidade: 6, excelencia: 4 },
  { area: "Resultados", padrao: 9, qualidade: 9, excelencia: 8 },
  { area: "Sociedade", padrao: 13, qualidade: 7, excelencia: 5 },
  { area: "Fornecedores", padrao: 7, qualidade: 11, excelencia: 9 },
  { area: "Sustentabilidade", padrao: 6, qualidade: 10, excelencia: 12 }
];

const GraficosNiveis = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Avaliação FAIQ-S por Níveis de Qualidade</h1>
        <p className="text-muted-foreground">
          Estrutura de avaliação organizada em três níveis: Padrão, Qualidade e Excelência
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
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

        <Card>
          <CardHeader>
            <CardTitle>Comparativo por Níveis</CardTitle>
            <CardDescription>
              Número de organizações classificadas em cada nível
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={levelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Desempenho por Área FAIQ</CardTitle>
          <CardDescription>
            Distribuição das 10 áreas do FAIQ-S pelos níveis de qualidade
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={areasData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="area" 
                angle={-45}
                textAnchor="end"
                height={120}
                fontSize={12}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="padrao" stackId="a" fill="#ef4444" name="Padrão" />
              <Bar dataKey="qualidade" stackId="a" fill="#f59e0b" name="Qualidade" />
              <Bar dataKey="excelencia" stackId="a" fill="#10b981" name="Excelência" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default GraficosNiveis;
