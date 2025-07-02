import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClassificationBadge } from "@/components/ui/classification-badge";
import { Assessment } from "@/types/faiq";
import { Calendar, User, Eye, FileText } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface RecentAssessmentsProps {
  assessments: Assessment[];
}

export function RecentAssessments({ assessments }: RecentAssessmentsProps) {
  const recentAssessments = assessments
    .sort((a, b) => new Date(b.assessmentDate).getTime() - new Date(a.assessmentDate).getTime())
    .slice(0, 5);

  const getStatusBadge = (status: Assessment['status']) => {
    switch (status) {
      case 'concluida':
        return <Badge variant="secondary" className="bg-success-light text-success">Concluída</Badge>;
      case 'em_andamento':
        return <Badge variant="secondary" className="bg-warning-light text-warning">Em Andamento</Badge>;
      case 'revisao':
        return <Badge variant="secondary" className="bg-standard-light text-standard">Em Revisão</Badge>;
    }
  };

  return (
    <Card className="bg-card shadow-soft border-0">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Avaliações Recentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentAssessments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Nenhuma avaliação encontrada</p>
            </div>
          ) : (
            recentAssessments.map((assessment) => (
              <div
                key={assessment.id}
                className="p-4 border border-border/50 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-foreground">
                        {assessment.clinicName}
                      </h3>
                      {getStatusBadge(assessment.status)}
                      <ClassificationBadge 
                        classification={assessment.classification} 
                        className="text-xs px-2 py-1"
                      />
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(assessment.assessmentDate), "dd/MM/yyyy", { locale: ptBR })}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {assessment.assessorName}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Pontuação:</span>
                      <span className="font-bold text-primary">
                        {assessment.overallPercentage.toFixed(1)}%
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({assessment.totalScore}/{assessment.maxScore} pontos)
                      </span>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="shrink-0">
                    <Eye className="w-4 h-4 mr-1" />
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}