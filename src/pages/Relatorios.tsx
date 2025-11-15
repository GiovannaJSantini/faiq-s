import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Assessment } from "@/types/faiq";
import { ClassificationBadge } from "@/components/ui/classification-badge";
import { FileText, Download, Eye, Building2, Calendar, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { useClinics } from "@/hooks/useClinics";
import { useAssessments } from "@/hooks/useAssessments";
import { generateAssessmentPDF } from "@/utils/pdfGenerator";
import { useUserRole } from "@/hooks/useUserRole";
import { useAuth } from "@/hooks/useAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RelatorioCompleto } from "@/components/relatorios/RelatorioCompleto";
import { DashboardRelatorio } from "@/components/relatorios/DashboardRelatorio";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Relatorios() {
  const { toast } = useToast();
  const { user } = useAuth();
  const { isCliente } = useUserRole();
  const [selectedClinic, setSelectedClinic] = useState<string>("all");
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "report">("list");
  const { clinics, isLoading: clinicsLoading } = useClinics();
  const { assessments: dbAssessments, isLoading: assessmentsLoading } = useAssessments();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (assessmentsLoading || clinicsLoading) {
        console.warn('[Relatorios] Loading timeout - consider refreshing');
      }
    }, 8000);
    
    return () => clearTimeout(timeout);
  }, [assessmentsLoading, clinicsLoading]);

  const assessments: Assessment[] = dbAssessments.map(a => ({
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

  const visibleClinics = isCliente 
    ? clinics.filter(clinic => 
        assessments.some(a => a.clinicId === clinic.id && a.assessorName === user?.email)
      )
    : clinics;

  let filteredAssessments = selectedClinic === "all" 
    ? assessments 
    : assessments.filter(a => a.clinicId === selectedClinic);

  if (isCliente && user?.email) {
    filteredAssessments = filteredAssessments.filter(a => a.assessorName === user.email);
  }

  const selectedClinicData = selectedClinic !== "all" 
    ? clinics.find(c => c.id === selectedClinic)
    : null;

  const handleGeneratePDF = (assessment: Assessment) => {
    try {
      generateAssessmentPDF(assessment, assessment.clinicName);
      toast({
        title: "PDF gerado com sucesso",
        description: "O relatório foi baixado automaticamente",
      });
    } catch (error) {
      toast({
        title: "Erro ao gerar PDF",
        description: "Não foi possível gerar o relatório",
        variant: "destructive",
      });
    }
  };

  const handleViewReport = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setViewMode("report");
  };

  if (assessmentsLoading || clinicsLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando relatórios...</p>
        </div>
      </div>
    );
  }

  if (viewMode === "report" && selectedAssessment) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Button 
              variant="outline" 
              onClick={() => {
                setViewMode("list");
                setSelectedAssessment(null);
              }}
            >
              ← Voltar para Lista
            </Button>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => handleGeneratePDF(selectedAssessment)}>
              <Download className="mr-2 h-4 w-4" />
              Baixar PDF
            </Button>
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dashboard">Dashboards</TabsTrigger>
            <TabsTrigger value="relatorio">Relatório Completo</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="mt-6">
            <DashboardRelatorio assessment={selectedAssessment} />
          </TabsContent>
          
          <TabsContent value="relatorio" className="mt-6">
            <ScrollArea className="h-[calc(100vh-250px)]">
              <RelatorioCompleto 
                assessment={selectedAssessment} 
                clinicName={selectedAssessment.clinicName}
              />
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  const stats = {
    totalClinics: visibleClinics.length,
    totalAssessments: filteredAssessments.length,
    avgScore: filteredAssessments.length > 0
      ? filteredAssessments.reduce((sum, a) => sum + a.overallPercentage, 0) / filteredAssessments.length
      : 0,
    excellenceCount: filteredAssessments.filter(a => a.classification === 'excelencia').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Relatórios de Avaliação</h1>
        <p className="text-muted-foreground">
          Visualize e exporte relatórios completos de avaliação organizacional
        </p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clínicas</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClinics}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avaliações</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAssessments}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Score Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgScore.toFixed(1)}%</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Excelência</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.excellenceCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Clínica</label>
            <Select value={selectedClinic} onValueChange={setSelectedClinic}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma clínica" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as clínicas</SelectItem>
                {visibleClinics.map((clinic) => (
                  <SelectItem key={clinic.id} value={clinic.id}>
                    {clinic.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Avaliações */}
      <Card>
        <CardHeader>
          <CardTitle>Avaliações Realizadas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Clínica</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Score Global</TableHead>
                <TableHead>Classificação</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssessments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    Nenhuma avaliação encontrada
                  </TableCell>
                </TableRow>
              ) : (
                filteredAssessments.map((assessment) => (
                  <TableRow key={assessment.id}>
                    <TableCell className="font-medium">{assessment.clinicName}</TableCell>
                    <TableCell>
                      {format(assessment.assessmentDate, "dd/MM/yyyy", { locale: ptBR })}
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">{assessment.overallPercentage.toFixed(1)}%</span>
                    </TableCell>
                    <TableCell>
                      <ClassificationBadge classification={assessment.classification} />
                    </TableCell>
                    <TableCell>
                      <Badge variant={assessment.status === 'concluida' ? 'default' : 'outline'}>
                        {assessment.status === 'concluida' ? 'Concluída' : 
                         assessment.status === 'em_andamento' ? 'Em andamento' : 'Revisão'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewReport(assessment)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleGeneratePDF(assessment)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          PDF
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}