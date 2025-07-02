import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Building2, CheckCircle, TrendingUp } from "lucide-react";
import { ClassificationBadge } from "@/components/ui/classification-badge";

interface StatsCardsProps {
  totalClinics: number;
  totalAssessments: number;
  avgScore: number;
  classificationsCount: {
    excelencia: number;
    qualidade: number;
    padrao: number;
  };
}

export function StatsCards({ 
  totalClinics, 
  totalAssessments, 
  avgScore, 
  classificationsCount 
}: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-card shadow-soft border-0 hover:shadow-medium transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total de Clínicas
          </CardTitle>
          <Building2 className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{totalClinics}</div>
          <p className="text-xs text-muted-foreground">
            Clínicas registradas no sistema
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card shadow-soft border-0 hover:shadow-medium transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Avaliações Realizadas
          </CardTitle>
          <Activity className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{totalAssessments}</div>
          <p className="text-xs text-muted-foreground">
            Avaliações concluídas
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card shadow-soft border-0 hover:shadow-medium transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Pontuação Média
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{avgScore.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">
            Média geral das avaliações
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card shadow-soft border-0 hover:shadow-medium transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Classificações
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <ClassificationBadge classification="excelencia" className="text-xs px-2 py-0.5" />
              <span className="text-sm font-medium">{classificationsCount.excelencia}</span>
            </div>
            <div className="flex items-center justify-between">
              <ClassificationBadge classification="qualidade" className="text-xs px-2 py-0.5" />
              <span className="text-sm font-medium">{classificationsCount.qualidade}</span>
            </div>
            <div className="flex items-center justify-between">
              <ClassificationBadge classification="padrao" className="text-xs px-2 py-0.5" />
              <span className="text-sm font-medium">{classificationsCount.padrao}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}