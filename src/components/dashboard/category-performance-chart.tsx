
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Cell,
  PieChart,
  Pie
} from "recharts";
import { faiqAreas, sampleAssessments } from "@/data/faiqData";
import { useState } from "react";
import { TrendingUp, TrendingDown, Award, Target, BarChart3 } from "lucide-react";

interface CategoryData {
  name: string;
  shortName: string;
  areaName: string;
  percentage: number;
  level: 'excelencia' | 'qualidade' | 'padrao';
  totalIndicators: number;
  completedIndicators: number;
}

export function CategoryPerformanceChart() {
  const [viewMode, setViewMode] = useState<'bars' | 'radar' | 'pie'>('bars');

  // Processar dados das categorias - TODAS as categorias de TODAS as áreas
  const categoryData: CategoryData[] = [];
  
  faiqAreas.forEach(area => {
    area.categories.forEach(category => {
      // Buscar dados da avaliação mais recente
      const assessment = sampleAssessments[0];
      const areaScore = assessment?.areaScores.find(as => as.areaId === area.id);
      const categoryScore = areaScore?.categoryScores.find(cs => cs.categoryId === category.id);
      
      const percentage = categoryScore?.percentage || Math.random() * 100;
      const totalIndicators = category.indicators.length;
      const completedIndicators = categoryScore?.indicatorScores.length || Math.floor(Math.random() * totalIndicators);
      
      let level: 'excelencia' | 'qualidade' | 'padrao' = 'padrao';
      if (percentage >= 80) level = 'excelencia';
      else if (percentage >= 60) level = 'qualidade';
      
      categoryData.push({
        name: category.name,
        shortName: category.name.length > 30 ? category.name.substring(0, 30) + '...' : category.name,
        areaName: area.name,
        percentage: Math.round(percentage * 100) / 100,
        level,
        totalIndicators,
        completedIndicators
      });
    });
  });

  // Estatísticas resumidas de TODAS as categorias
  const stats = {
    totalCategories: categoryData.length,
    excellenceCount: categoryData.filter(cat => cat.level === 'excelencia').length,
    qualityCount: categoryData.filter(cat => cat.level === 'qualidade').length,
    standardCount: categoryData.filter(cat => cat.level === 'padrao').length,
    averagePerformance: Math.round(categoryData.reduce((acc, cat) => acc + cat.percentage, 0) / categoryData.length)
  };

  // Dados para gráfico de radar - top 10 categorias para melhor visualização
  const topCategories = categoryData
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 10);

  const radarData = topCategories.map(cat => ({
    category: cat.shortName,
    performance: cat.percentage,
    fullMark: 100
  }));

  // Dados para gráfico de pizza
  const pieData = [
    { name: 'Excelência', value: stats.excellenceCount, color: 'hsl(var(--excellence))' },
    { name: 'Qualidade', value: stats.qualityCount, color: 'hsl(var(--quality))' },
    { name: 'Padrão', value: stats.standardCount, color: 'hsl(var(--standard))' }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'excelencia': return 'hsl(var(--excellence))';
      case 'qualidade': return 'hsl(var(--quality))';
      default: return 'hsl(var(--standard))';
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as CategoryData;
      return (
        <div className="bg-card border border-border p-4 rounded-lg shadow-medium">
          <p className="font-semibold text-card-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">{data.areaName}</p>
          <p className="text-lg font-bold" style={{ color: getLevelColor(data.level) }}>
            {data.percentage.toFixed(1)}%
          </p>
          <p className="text-xs text-muted-foreground">
            {data.completedIndicators}/{data.totalIndicators} indicadores
          </p>
          <Badge variant={data.level === 'excelencia' ? 'default' : 'secondary'} className="mt-2">
            {data.level === 'excelencia' ? 'Excelência' : 
             data.level === 'qualidade' ? 'Qualidade' : 'Padrão'}
          </Badge>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    if (viewMode === 'bars') {
      return (
        <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="shortName" 
            angle={-45}
            textAnchor="end"
            height={140}
            fontSize={10}
            stroke="hsl(var(--muted-foreground))"
            interval={0}
          />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="percentage" 
            radius={[4, 4, 0, 0]}
            fill="hsl(var(--primary))"
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getLevelColor(entry.level)} />
            ))}
          </Bar>
        </BarChart>
      );
    }
    
    if (viewMode === 'radar') {
      return (
        <RadarChart data={radarData}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis dataKey="category" fontSize={10} />
          <PolarRadiusAxis 
            angle={45} 
            domain={[0, 100]} 
            fontSize={10}
            stroke="hsl(var(--muted-foreground))"
          />
          <Radar
            name="Performance"
            dataKey="performance"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.2}
            strokeWidth={2}
          />
          <Tooltip />
        </RadarChart>
      );
    }
    
    return (
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    );
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="section-header">Desempenho por Categoria FAIQ-S</h2>
        <p className="section-description max-w-2xl mx-auto">
          Análise completa do desempenho de todas as categorias do FAIQ-S, 
          proporcionando uma visão abrangente de todas as áreas de avaliação.
        </p>
      </div>

      {/* Controles de visualização */}
      <div className="flex justify-center gap-2">
        <Button
          variant={viewMode === 'bars' ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode('bars')}
        >
          <BarChart3 className="w-4 h-4 mr-1" />
          Barras
        </Button>
        <Button
          variant={viewMode === 'radar' ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode('radar')}
        >
          <Target className="w-4 h-4 mr-1" />
          Radar (Top 10)
        </Button>
        <Button
          variant={viewMode === 'pie' ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode('pie')}
        >
          <Award className="w-4 h-4 mr-1" />
          Distribuição
        </Button>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Categorias</p>
              <p className="text-2xl font-bold text-card-foreground">{stats.totalCategories}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-primary" />
          </div>
        </div>
        
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Média Geral</p>
              <p className="text-2xl font-bold text-card-foreground">{stats.averagePerformance}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-excellence" />
          </div>
        </div>
        
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Excelência</p>
              <p className="text-2xl font-bold text-excellence">{stats.excellenceCount}</p>
            </div>
            <Award className="w-8 h-8 text-excellence" />
          </div>
        </div>
        
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">A Melhorar</p>
              <p className="text-2xl font-bold text-standard">{stats.standardCount}</p>
            </div>
            <TrendingDown className="w-8 h-8 text-standard" />
          </div>
        </div>
      </div>

      {/* Gráficos principais */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="chart-container">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {viewMode === 'bars' && <BarChart3 className="w-5 h-5" />}
                {viewMode === 'radar' && <Target className="w-5 h-5" />}
                {viewMode === 'pie' && <Award className="w-5 h-5" />}
                {viewMode === 'bars' && 'Todas as Categorias FAIQ-S'}
                {viewMode === 'radar' && 'Top 10 Categorias (Radar)'}
                {viewMode === 'pie' && 'Distribuição por Nível'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={500}>
                {renderChart()}
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Lista de categorias */}
        <div className="space-y-4">
          <Card className="chart-container h-fit">
            <CardHeader>
              <CardTitle>Ranking de Categorias</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-[500px] overflow-y-auto">
              {categoryData
                .sort((a, b) => b.percentage - a.percentage)
                .map((category, index) => (
                  <div key={category.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className="text-xs font-bold bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-card-foreground truncate">
                          {category.shortName}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {category.areaName}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold" style={{ color: getLevelColor(category.level) }}>
                        {category.percentage.toFixed(0)}%
                      </span>
                      <Badge 
                        variant="outline" 
                        className="text-xs"
                        style={{ 
                          borderColor: getLevelColor(category.level),
                          color: getLevelColor(category.level)
                        }}
                      >
                        {category.level === 'excelencia' ? 'E' : 
                         category.level === 'qualidade' ? 'Q' : 'P'}
                      </Badge>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
