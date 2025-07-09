
import { FaiqAssessmentCharts } from "@/components/dashboard/faiq-assessment-charts";

const GraficosNiveis = () => {
  return (
    <div className="space-y-8 p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Gráficos de Níveis FAIQ-S
        </h1>
        <p className="text-muted-foreground text-lg">
          Visualização detalhada da estrutura de avaliação por níveis de qualidade
        </p>
      </div>
      
      <FaiqAssessmentCharts />
    </div>
  );
};

export default GraficosNiveis;
