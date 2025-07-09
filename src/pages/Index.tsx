
import { useNavigate } from "react-router-dom";
import { DashboardHeader } from "@/components/dashboard/header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { AreasAnalysis } from "@/components/dashboard/areas-analysis";
import { RecentAssessments } from "@/components/dashboard/recent-assessments";
import { sampleAssessments, sampleClinics } from "@/data/faiqData";

const Index = () => {
  const navigate = useNavigate();
  // Calcular estatísticas
  const totalClinics = sampleClinics.length;
  const totalAssessments = sampleAssessments.length;
  const avgScore = totalAssessments > 0 
    ? sampleAssessments.reduce((sum, assessment) => sum + assessment.overallPercentage, 0) / totalAssessments 
    : 0;
  
  const classificationsCount = {
    excelencia: sampleAssessments.filter(a => a.classification === 'excelencia').length,
    qualidade: sampleAssessments.filter(a => a.classification === 'qualidade').length,
    padrao: sampleAssessments.filter(a => a.classification === 'padrao').length,
  };

  return (
    <div className="space-y-8 p-6">
      {/* Cards de estatísticas */}
      <StatsCards 
        totalClinics={totalClinics}
        totalAssessments={totalAssessments}
        avgScore={avgScore}
        classificationsCount={classificationsCount}
      />
      
      {/* Gráficos de performance */}
      <PerformanceChart assessments={sampleAssessments} />
      
      {/* Análise detalhada por áreas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AreasAnalysis assessments={sampleAssessments} />
        <RecentAssessments assessments={sampleAssessments} />
      </div>
    </div>
  );
};

export default Index;
