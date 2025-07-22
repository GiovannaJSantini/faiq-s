
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
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'bars' | 'radar' | 'pie'>('bars');

  // Processar dados das categorias
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
        shortName: category.name.split('.')[1]?.trim() || category.name,
        areaName: area.name,
        percentage: Math.round(percentage * 100) / 100,
        level,
        totalIndicators,
        completedIndicators
      });
    });
  });

  // Filtrar dados por área selecionada
  const filteredData = selectedArea 
    ? categoryData.filter(cat => cat.areaName === selectedArea)
    : categoryData;

  // Estatísticas resumidas
  const stats = {
    totalCategories: filteredData.length,
    excellenceCount: filteredData.filter(cat => cat.level === 'excelencia').length,
    qualityCount: filteredData.filter(cat => cat.level === 'qualidade').length,
    standardCount: filteredData.filter(cat => cat.level === 'padrao').length,
    averagePerformance: Math.round(filteredData.reduce((acc, cat) => acc + cat.percentage, 0) / filteredData.length)
  };

  // Dados para gráfico de radar
  const radarData = filteredData.map(cat => ({
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
        <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="shortName" 
            angle={-45}
            textAnchor="end"
            height={100}
            fontSize={12}
            stroke="hsl(var(--muted-foreground))"
          />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="percentage" 
            radius={[4, 4, 0, 0]}
            fill="hsl(var(--primary))"
          >
            {filteredData.map((entry, index) => (
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
          <PolarAngleAxis dataKey="category" fontSize={12} />
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
          Análise detalhada do desempenho de cada categoria dentro das áreas de avaliação, 
          proporcionando insights granulares sobre pontos fortes e oportunidades de melhoria.
        </p>
      </div>

      {/* Filtros e controles */}
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedArea === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedArea(null)}
          >
            Todas as Áreas
          </Button>
          {faiqAreas.map(area => (
            <Button
              key={area.id}
              variant={selectedArea === area.name ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedArea(area.name)}
              className="text-xs"
            >
              {area.name.split('.')[0]}
            </Button>
          ))}
        </div>
        
        <div className="flex gap-2">
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
            Radar
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
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Categorias</p>
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
                {viewMode === 'bars' && 'Desempenho por Categoria'}
                {viewMode === 'radar' && 'Perfil de Desempenho'}
                {viewMode === 'pie' && 'Distribuição por Nível'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                {renderChart()}
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Lista de categorias */}
        <div className="space-y-4">
          <Card className="chart-container h-fit">
            <CardHeader>
              <CardTitle>Categorias por Desempenho</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-96 overflow-y-auto">
              {filteredData
                .sort((a, b) => b.percentage - a.percentage)
                .map((category, index) => (
                  <div key={category.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-card-foreground truncate">
                        {category.shortName}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {category.areaName}
                      </p>
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
