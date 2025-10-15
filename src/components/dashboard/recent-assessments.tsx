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
export function RecentAssessments({
  assessments
}: RecentAssessmentsProps) {
  const recentAssessments = assessments.sort((a, b) => new Date(b.assessmentDate).getTime() - new Date(a.assessmentDate).getTime()).slice(0, 5);
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
  return <Card className="bg-card shadow-soft border-0">
      
      
    </Card>;
}