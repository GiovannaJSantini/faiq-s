import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Assessment, Area } from "@/types/faiq";
import { faiqAreas } from "@/data/faiqData";
import { ChevronRight, TrendingUp, TrendingDown, Minus } from "lucide-react";
interface AreasAnalysisProps {
  assessments: Assessment[];
}
export function AreasAnalysis({
  assessments
}: AreasAnalysisProps) {
  // Calcular estatísticas por área
  const getAreaStats = (areaId: string) => {
    const areaScores = assessments.flatMap(assessment => assessment.areaScores.filter(areaScore => areaScore.areaId === areaId));
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
      case 'up':
        return <TrendingUp className="w-4 h-4 text-success" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-destructive" />;
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };
  const getPercentageColor = (percentage: number) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-quality';
    return 'text-standard';
  };
  return <Card className="bg-card shadow-soft border-0">
      
      
    </Card>;
}