import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Assessment, Area } from "@/types/faiq";
import { faiqAreas } from "@/data/faiqData";
import { ChevronRight, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface AreasAnalysisProps {
  assessments: Assessment[];
}

export function AreasAnalysis({ assessments }: AreasAnalysisProps) {
  // Calcular estatísticas por área
  const getAreaStats = (areaId: string) => {
    const areaScores = assessments.flatMap(assessment => 
      assessment.areaScores.filter(areaScore => areaScore.areaId === areaId)
    );
    
    if (areaScores.length === 0) {
      return {
        avgPercentage: 0,
        totalAssessments: 0,
        trend: 'stable' as const
      };
    }

    const avgPercentage = areaScores.reduce((sum, score) => sum + score.percentage, 0) / areaScores.length;
    
    // Simular tendência (em um cenário real, compararíamos com período anterior)
    const trend: 'up' | 'down' | 'stable' = avgPercentage >= 80 ? 'up' : avgPercentage >= 60 ? 'stable' : 'down';
    
    return {
      avgPercentage,
      totalAssessments: areaScores.length,
      trend
    };
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-success" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-destructive" />;
      default: return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-quality';
    return 'text-standard';
  };

  return (
    <Card className="bg-card shadow-soft border-0">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Análise por Áreas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {faiqAreas.map((area) => {
            const stats = getAreaStats(area.id);
            
            return (
              <div key={area.id} className="space-y-3 p-4 rounded-lg bg-secondary/50 border border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{area.name}</h3>
                    <p className="text-sm text-muted-foreground">{area.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(stats.trend)}
                    <span className={`font-bold text-lg ${getPercentageColor(stats.avgPercentage)}`}>
                      {stats.avgPercentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
                
                <Progress 
                  value={stats.avgPercentage} 
                  className="h-2"
                />
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="text-xs">
                      {area.categories.length} categorias
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {area.categories.reduce((sum, cat) => sum + cat.indicators.length, 0)} indicadores
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <span>{stats.totalAssessments} avaliações</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
                
                {/* Categorias dentro da área */}
                <div className="mt-4 space-y-2">
                  {area.categories.map((category) => {
                    const categoryScores = assessments.flatMap(assessment => 
                      assessment.areaScores
                        .filter(areaScore => areaScore.areaId === area.id)
                        .flatMap(areaScore => 
                          areaScore.categoryScores.filter(catScore => catScore.categoryId === category.id)
                        )
                    );
                    
                    const categoryAvg = categoryScores.length > 0 
                      ? categoryScores.reduce((sum, score) => sum + score.percentage, 0) / categoryScores.length 
                      : 0;
                    
                    return (
                      <div key={category.id} className="flex items-center justify-between py-2 px-3 bg-background/80 rounded border border-border/30">
                        <div>
                          <span className="text-sm font-medium text-foreground">{category.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">
                            ({category.indicators.length} indicadores)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={categoryAvg} className="w-16 h-1" />
                          <span className={`text-sm font-medium ${getPercentageColor(categoryAvg)}`}>
                            {categoryAvg.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}