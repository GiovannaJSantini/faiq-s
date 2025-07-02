import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { sampleClinics, sampleAssessments, faiqAreas } from "@/data/faiqData";
import { Assessment } from "@/types/faiq";
import { ClassificationBadge } from "@/components/ui/classification-badge";
import { FileText, Download, TrendingUp, Building2, Calendar } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

export default function Relatorios() {
  const { toast } = useToast();
  const [selectedClinic, setSelectedClinic] = useState<string>("all");
  const [reportType, setReportType] = useState<string>("geral");

  const filteredAssessments = selectedClinic === "all" 
    ? sampleAssessments 
    : sampleAssessments.filter(a => a.clinicId === selectedClinic);

  const selectedClinicData = selectedClinic !== "all" 
    ? sampleClinics.find(c => c.id === selectedClinic)
    : null;

  // Dados para gráfico radar por área
  const getRadarData = (assessment: Assessment) => {
    return faiqAreas.map(area => {
      const areaScore = assessment.areaScores.find(as => as.areaId === area.id);
      return {
        area: area.name.replace('I. ', '').replace('II. ', '').replace('III. ', ''),
        percentage: areaScore ? areaScore.percentage : 0,
        fullMark: 100
      };
    });
  };

  // Dados para comparação entre clínicas
  const getComparisonData = () => {
    return sampleClinics.map(clinic => {
      const clinicAssessments = sampleAssessments.filter(a => a.clinicId === clinic.id);
      const latestAssessment = clinicAssessments.sort((a, b) => 
        new Date(b.assessmentDate).getTime() - new Date(a.assessmentDate).getTime()
      )[0];

      return {
        name: clinic.name,
        percentage: latestAssessment ? latestAssessment.overallPercentage : 0,
        classification: latestAssessment ? latestAssessment.classification : 'padrao',
        date: latestAssessment ? latestAssessment.assessmentDate : null
      };
    });
  };

  const generateReport = () => {
    const reportData = {
      clinic: selectedClinicData?.name || "Todas as Clínicas",
      date: new Date().toLocaleDateString('pt-BR'),
      assessments: filteredAssessments.length,
      type: reportType
    };

    toast({
      title: "Relatório gerado!",
      description: `Relatório ${reportType} para ${reportData.clinic} foi gerado com sucesso.`
    });
  };

  const exportData = () => {
    toast({
      title: "Exportação iniciada",
      description: "Os dados estão sendo preparados para download em Excel."
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
          <p className="text-muted-foreground">Análise detalhada das avaliações FAIQ por clínica</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportData}>
            <Download className="w-4 h-4 mr-2" />
            Exportar Excel
          </Button>
          <Button onClick={generateReport}>
            <FileText className="w-4 h-4 mr-2" />
            Gerar Relatório PDF
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card className="bg-card shadow-soft border-0">
        <CardHeader>
          <CardTitle>Filtros do Relatório</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Clínica</label>
              <Select value={selectedClinic} onValueChange={setSelectedClinic}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Clínicas</SelectItem>
                  {sampleClinics.map((clinic) => (
                    <SelectItem key={clinic.id} value={clinic.id}>
                      {clinic.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo de Relatório</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="geral">Relatório Geral</SelectItem>
                  <SelectItem value="detalhado">Relatório Detalhado</SelectItem>
                  <SelectItem value="comparativo">Análise Comparativa</SelectItem>
                  <SelectItem value="evolucao">Evolução Temporal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Período</label>
              <Select defaultValue="todos">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Períodos</SelectItem>
                  <SelectItem value="ultimo_mes">Último Mês</SelectItem>
                  <SelectItem value="ultimo_trimestre">Último Trimestre</SelectItem>
                  <SelectItem value="ultimo_semestre">Último Semestre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resumo Executivo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">
                  {selectedClinic === "all" ? sampleClinics.length : 1}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {selectedClinic === "all" ? "Clínicas" : "Clínica Selecionada"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">{filteredAssessments.length}</h3>
                <p className="text-sm text-muted-foreground">Avaliações</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">
                  {filteredAssessments.length > 0 
                    ? (filteredAssessments.reduce((sum, a) => sum + a.overallPercentage, 0) / filteredAssessments.length).toFixed(1)
                    : "0.0"}%
                </h3>
                <p className="text-sm text-muted-foreground">Média Geral</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-warning" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">
                  {filteredAssessments.filter(a => a.classification === 'excelencia').length}
                </h3>
                <p className="text-sm text-muted-foreground">Excelência</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      {selectedClinic !== "all" && filteredAssessments.length > 0 ? (
        /* Relatório Individual da Clínica */
        <div className="space-y-6">
          <Card className="bg-card shadow-soft border-0">
            <CardHeader>
              <CardTitle>Análise Detalhada - {selectedClinicData?.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={getRadarData(filteredAssessments[0])}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="area" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar 
                    name="Pontuação" 
                    dataKey="percentage" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))" 
                    fillOpacity={0.3} 
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border-0">
            <CardHeader>
              <CardTitle>Detalhamento por Área</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAssessments[0]?.areaScores.map((areaScore) => {
                  const area = faiqAreas.find(a => a.id === areaScore.areaId);
                  return (
                    <div key={areaScore.areaId} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{area?.name}</h4>
                        <span className="font-bold text-primary">
                          {areaScore.percentage.toFixed(1)}%
                        </span>
                      </div>
                      <Progress value={areaScore.percentage} className="h-2" />
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {areaScore.categoryScores.map((catScore) => {
                          const category = area?.categories.find(c => c.id === catScore.categoryId);
                          return (
                            <div key={catScore.categoryId} className="flex items-center justify-between text-sm p-2 bg-secondary/30 rounded">
                              <span className="text-muted-foreground">{category?.name}</span>
                              <span className="font-medium">{catScore.percentage.toFixed(0)}%</span>
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
        </div>
      ) : (
        /* Relatório Comparativo entre Clínicas */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-card shadow-soft border-0">
            <CardHeader>
              <CardTitle>Comparação entre Clínicas</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={getComparisonData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={12}
                  />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="percentage" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border-0">
            <CardHeader>
              <CardTitle>Ranking de Desempenho</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Posição</TableHead>
                    <TableHead>Clínica</TableHead>
                    <TableHead>Pontuação</TableHead>
                    <TableHead>Classificação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getComparisonData()
                    .sort((a, b) => b.percentage - a.percentage)
                    .map((clinic, index) => (
                      <TableRow key={clinic.name}>
                        <TableCell>
                          <Badge variant={index === 0 ? "default" : "secondary"}>
                            {index + 1}º
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{clinic.name}</TableCell>
                        <TableCell>{clinic.percentage.toFixed(1)}%</TableCell>
                        <TableCell>
                          <ClassificationBadge 
                            classification={clinic.classification} 
                            className="text-xs px-2 py-1"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Histórico de Avaliações */}
      <Card className="bg-card shadow-soft border-0">
        <CardHeader>
          <CardTitle>Histórico de Avaliações</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Clínica</TableHead>
                <TableHead>Avaliador</TableHead>
                <TableHead>Pontuação</TableHead>
                <TableHead>Classificação</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssessments
                .sort((a, b) => new Date(b.assessmentDate).getTime() - new Date(a.assessmentDate).getTime())
                .map((assessment) => (
                  <TableRow key={assessment.id}>
                    <TableCell>
                      {format(new Date(assessment.assessmentDate), "dd/MM/yyyy", { locale: ptBR })}
                    </TableCell>
                    <TableCell className="font-medium">{assessment.clinicName}</TableCell>
                    <TableCell>{assessment.assessorName}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{assessment.overallPercentage.toFixed(1)}%</span>
                        <span className="text-xs text-muted-foreground">
                          ({assessment.totalScore}/{assessment.maxScore})
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <ClassificationBadge 
                        classification={assessment.classification}
                        className="text-xs px-2 py-1"
                      />
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={assessment.status === 'concluida' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {assessment.status === 'concluida' ? 'Concluída' : 'Em Andamento'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}