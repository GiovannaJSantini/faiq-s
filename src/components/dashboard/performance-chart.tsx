import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Assessment } from "@/types/faiq";

interface PerformanceChartProps {
  assessments: Assessment[];
}

export function PerformanceChart({ assessments }: PerformanceChartProps) {
  // Dados para o gráfico de barras - desempenho por clínica
  const barData = assessments.map(assessment => ({
    clinicName: assessment.clinicName,
    percentage: assessment.overallPercentage,
    classification: assessment.classification
  }));

  // Dados para o gráfico de pizza - distribuição por classificação
  const classificationData = [
    {
      name: 'Excelência',
      value: assessments.filter(a => a.classification === 'excelencia').length,
      color: 'hsl(var(--excellence))'
    },
    {
      name: 'Qualidade',
      value: assessments.filter(a => a.classification === 'qualidade').length,
      color: 'hsl(var(--quality))'
    },
    {
      name: 'Padrão',
      value: assessments.filter(a => a.classification === 'padrao').length,
      color: 'hsl(var(--standard))'
    }
  ].filter(item => item.value > 0);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 rounded-lg border shadow-medium">
          <p className="font-semibold">{label}</p>
          <p className="text-primary">
            Pontuação: {payload[0].value.toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  const getBarColor = (classification: string) => {
    switch (classification) {
      case 'excelencia': return 'hsl(var(--excellence))';
      case 'qualidade': return 'hsl(var(--quality))';
      default: return 'hsl(var(--standard))';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-card shadow-soft border-0">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Desempenho por Clínica
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="clinicName" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                domain={[0, 100]}
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="percentage" 
                radius={[4, 4, 0, 0]}
                fill="hsl(var(--primary))"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-card shadow-soft border-0">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Distribuição por Classificação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={classificationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {classificationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}