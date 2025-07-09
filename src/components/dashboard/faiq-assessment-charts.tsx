
import { AssessmentLevelsChart } from "./assessment-levels-chart";

export function FaiqAssessmentCharts() {
  const assessmentAreas = [
    {
      title: "Área 1 - Liderança e Gestão",
      categories: ["Mando", "Tato", "Social", "Visão", "Estratégia", "Decisão", "Comunicação", "Delegação", "Motivação", "Controle", "Inovação", "Mudança"]
    },
    {
      title: "Área 2 - Estratégia e Planejamento", 
      categories: ["Missão", "Visão", "Objetivos", "Análise", "Estratégias", "Planos", "Recursos", "Cronograma", "Métricas", "Revisão", "Ajustes", "Comunicação"]
    },
    {
      title: "Área 3 - Foco no Cliente/Paciente",
      categories: ["Necessidades", "Expectativas", "Satisfação", "Feedback", "Relacionamento", "Qualidade", "Tempo", "Custo", "Inovação", "Fidelização", "Retenção", "Experiência"]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Avaliação FAIQ-S por Níveis de Qualidade
        </h2>
        <p className="text-muted-foreground">
          Estrutura de avaliação organizada em três níveis: Padrão, Qualidade e Excelência
        </p>
      </div>
      
      {assessmentAreas.map((area, index) => (
        <AssessmentLevelsChart
          key={index}
          title={area.title}
          categories={area.categories}
          indicatorsPerCategory={15}
        />
      ))}
    </div>
  );
}
