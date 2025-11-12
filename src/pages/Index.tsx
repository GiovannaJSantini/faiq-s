import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardHeader } from "@/components/dashboard/header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { AreasAnalysis } from "@/components/dashboard/areas-analysis";
import { RecentAssessments } from "@/components/dashboard/recent-assessments";
import { useClinics } from "@/hooks/useClinics";
import { useAssessments } from "@/hooks/useAssessments";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  const [selectedClinic, setSelectedClinic] = useState<string>("all");
  const { clinics, isLoading: clinicsLoading } = useClinics();
  const { getAssessmentWithScores, isLoading: assessmentsLoading, error: assessmentsError } = useAssessments();

  // Filtrar avaliações baseado na clínica selecionada
  const filteredAssessments = selectedClinic === "all"
    ? getAssessmentWithScores
    : getAssessmentWithScores.filter(a => a.clinic_id === selectedClinic);

  // Converter para formato compatível com componentes existentes
  const assessments = filteredAssessments.map(a => ({
    id: a.id,
    clinicId: a.clinic_id,
    clinicName: a.clinic?.name || 'Desconhecida',
    assessmentDate: new Date(a.assessment_date),
    assessorName: a.assessor_name,
    areaScores: (a.area_scores || []).map(as => ({
      areaId: as.area_id,
      categoryScores: (as.category_scores || []).map(cs => ({
        categoryId: cs.category_id,
        indicatorScores: (cs.indicator_scores || []).map(is => ({
          indicatorId: is.indicator_id,
          score: is.score as 0 | 0.5 | 1,
          notes: is.notes || undefined,
        })),
        totalScore: cs.total_score,
        maxScore: cs.max_score,
        percentage: cs.percentage,
      })),
      totalScore: as.total_score,
      maxScore: as.max_score,
      percentage: as.percentage,
    })),
    totalScore: a.total_score,
    maxScore: a.max_score,
    overallPercentage: a.overall_percentage,
    classification: a.classification as 'excelencia' | 'qualidade' | 'padrao',
    status: a.status as 'em_andamento' | 'concluida' | 'revisao',
    createdAt: new Date(a.created_at),
    updatedAt: new Date(a.updated_at || a.created_at),
  }));

  // Calcular estatísticas
  const totalClinics = clinics.length;
  const totalAssessments = assessments.length;
  const avgScore = totalAssessments > 0 
    ? assessments.reduce((sum, assessment) => sum + assessment.overallPercentage, 0) / totalAssessments 
    : 0;
  
  const classificationsCount = {
    excelencia: assessments.filter(a => a.classification === 'excelencia').length,
    qualidade: assessments.filter(a => a.classification === 'qualidade').length,
    padrao: assessments.filter(a => a.classification === 'padrao').length,
  };

  if (clinicsLoading || assessmentsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (assessmentsError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-destructive mb-4">Erro ao carregar dados</p>
          <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* Filtros */}
      <Card className="bg-card shadow-soft border-0">
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clinic-filter">Clínica</Label>
              <Select value={selectedClinic} onValueChange={setSelectedClinic}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Clínicas</SelectItem>
                  {clinics.map((clinic) => (
                    <SelectItem key={clinic.id} value={clinic.id}>
                      {clinic.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cards de estatísticas */}
      <StatsCards 
        totalClinics={totalClinics}
        totalAssessments={totalAssessments}
        avgScore={avgScore}
        classificationsCount={classificationsCount}
      />
      
      {/* Gráficos de performance */}
      <PerformanceChart assessments={assessments} />
      
      {/* Análise detalhada por áreas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AreasAnalysis assessments={assessments} />
        <RecentAssessments assessments={assessments} />
      </div>
    </div>
  );
};

export default Index;
