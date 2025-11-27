import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronDown, ChevronRight, Save, FileText, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useClinics } from "@/hooks/useClinics";
import { useAssessments } from "@/hooks/useAssessments";
import { useAuth } from "@/hooks/useAuth";
import { faiqAreas } from "@/data/faiqData";
import type { AreaScore, CategoryScore, IndicatorScore } from "@/types/faiq";
import { assessmentFormSchema, indicatorScoreSchema } from "@/lib/validations/assessment";
import { ClassificationBadge } from "@/components/ui/classification-badge";

const NovaAvaliacao = () => {
  const navigate = useNavigate();
  const [selectedClinic, setSelectedClinic] = useState("");
  const [assessorName, setAssessorName] = useState("");
  const [observations, setObservations] = useState("");
  const [openAreas, setOpenAreas] = useState<string[]>([]);
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  
  const { toast } = useToast();
  const { clinics, isLoading: clinicsLoading } = useClinics();
  const { createAssessment } = useAssessments();
  const { user } = useAuth();

  const toggleArea = (areaId: string) => {
    setOpenAreas(prev =>
      prev.includes(areaId) ? prev.filter(id => id !== areaId) : [...prev, areaId]
    );
  };

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev =>
      prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]
    );
  };

  const setIndicatorScore = (indicatorId: string, score: number) => {
    setScores(prev => ({
      ...prev,
      [indicatorId]: score
    }));
  };

  const getIndicatorScore = (indicatorId: string): number => {
    return scores[indicatorId] ?? -1;
  };

  const setIndicatorNote = (indicatorId: string, note: string) => {
    setNotes(prev => ({
      ...prev,
      [indicatorId]: note
    }));
  };

  const getIndicatorNote = (indicatorId: string): string => {
    return notes[indicatorId] || '';
  };

  const totalIndicators = faiqAreas.reduce((acc, area) =>
    acc + area.categories.reduce((catAcc, cat) =>
      catAcc + cat.indicators.length, 0
    ), 0
  );

  const scoredIndicators = Object.keys(scores).filter(key => scores[key] >= 0).length;
  const progressPercentage = totalIndicators > 0 ? (scoredIndicators / totalIndicators) * 100 : 0;

  const calculateOverallScore = () => {
    if (scoredIndicators === 0) return 0;
    
    let totalWeightedScore = 0;
    let totalWeight = 0;

    faiqAreas.forEach(area => {
      area.categories.forEach(category => {
        category.indicators.forEach(indicator => {
          const score = scores[indicator.id];
          if (score !== undefined && score >= 0) {
            totalWeightedScore += score * indicator.weight;
            totalWeight += indicator.weight;
          }
        });
      });
    });

    return totalWeight > 0 ? (totalWeightedScore / totalWeight) * 100 : 0;
  };

  const getClassification = (score: number): 'excelencia' | 'qualidade' | 'padrao' => {
    if (score >= 80) return 'excelencia';
    if (score >= 60) return 'qualidade';
    return 'padrao';
  };

  const handleSaveClick = () => {
    const formValidation = assessmentFormSchema.safeParse({
      selectedClinic,
      assessorName,
      observations
    });

    if (!formValidation.success) {
      toast({
        title: "Dados inválidos",
        description: formValidation.error.errors[0].message,
        variant: "destructive"
      });
      return;
    }

    for (const [key, score] of Object.entries(scores)) {
      const scoreValidation = indicatorScoreSchema.safeParse(score);
      if (!scoreValidation.success) {
        toast({
          title: "Pontuação inválida",
          description: `${scoreValidation.error.errors[0].message} (indicador ${key})`,
          variant: "destructive"
        });
        return;
      }
    }

    if (!user) {
      toast({
        title: "Erro de autenticação",
        description: "Você precisa estar autenticado para criar uma avaliação.",
        variant: "destructive"
      });
      return;
    }

    setShowSaveModal(true);
  };

  const handleConfirmSave = async () => {
    setIsSaving(true);
    try {
      const areaScores: (AreaScore & {
        categoryScores: (CategoryScore & {
          indicatorScores: IndicatorScore[];
        })[];
      })[] = faiqAreas.map(area => {
        const categoryScores = area.categories.map(category => {
          const indicatorScores: IndicatorScore[] = category.indicators.map((indicator) => {
            const score = (scores[indicator.id] ?? 0) as 0 | 0.5 | 1;
            return {
              indicatorId: indicator.id,
              score,
              notes: notes[indicator.id] || ''
            };
          });

          const totalScore = indicatorScores.reduce((sum, is) => sum + is.score * 
            (area.categories.find(c => c.id === category.id)?.indicators.find(i => i.id === is.indicatorId)?.weight || 1), 0);
          const maxScore = indicatorScores.reduce((sum, is) => sum + 
            (area.categories.find(c => c.id === category.id)?.indicators.find(i => i.id === is.indicatorId)?.weight || 1), 0);
          const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

          return {
            categoryId: category.id,
            indicatorScores,
            totalScore,
            maxScore,
            percentage
          };
        });

        const totalScore = categoryScores.reduce((sum, cs) => sum + cs.totalScore, 0);
        const maxScore = categoryScores.reduce((sum, cs) => sum + cs.maxScore, 0);
        const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

        return {
          areaId: area.id,
          categoryScores,
          totalScore,
          maxScore,
          percentage
        };
      });

      const totalScore = areaScores.reduce((sum, as) => sum + as.totalScore, 0);
      const maxScore = areaScores.reduce((sum, as) => sum + as.maxScore, 0);
      const overallPercentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
      const classification = getClassification(overallPercentage);

      const assessment = {
        clinic_id: selectedClinic,
        assessor_id: user!.id,
        assessor_name: assessorName,
        assessment_date: new Date().toISOString().split('T')[0],
        observations: observations || null,
        total_score: totalScore,
        max_score: maxScore,
        overall_percentage: overallPercentage,
        classification,
        status: 'concluida' as const
      };

      await createAssessment.mutateAsync({ assessment, areaScores });

      toast({
        title: "Avaliação salva!",
        description: "A avaliação foi salva com sucesso e já está disponível nos relatórios.",
      });

      navigate('/relatorios');
    } catch (error: any) {
      console.error('Error saving assessment:', error);
      toast({
        title: "Erro ao salvar",
        description: error.message || "Não foi possível salvar a avaliação. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
      setShowSaveModal(false);
    }
  };

  const overallScore = calculateOverallScore();
  const classification = getClassification(overallScore);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Nova Avaliação FAIQ</h1>
            <p className="text-muted-foreground mt-1">
              Avaliação completa com {totalIndicators} indicadores
            </p>
          </div>
          <Button
            onClick={handleSaveClick}
            size="lg"
            className="gap-2"
            disabled={scoredIndicators === 0 || !selectedClinic || !assessorName}
          >
            <Save className="h-5 w-5" />
            Salvar Avaliação
          </Button>
        </div>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
            <CardDescription>Dados gerais da avaliação</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clinic">Clínica *</Label>
                <Select value={selectedClinic} onValueChange={setSelectedClinic}>
                  <SelectTrigger id="clinic">
                    <SelectValue placeholder="Selecione a clínica" />
                  </SelectTrigger>
                  <SelectContent>
                    {clinicsLoading ? (
                      <SelectItem value="loading" disabled>Carregando...</SelectItem>
                    ) : clinics?.length === 0 ? (
                      <SelectItem value="empty" disabled>Nenhuma clínica cadastrada</SelectItem>
                    ) : (
                      clinics?.map((clinic) => (
                        <SelectItem key={clinic.id} value={clinic.id}>
                          {clinic.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assessor">Nome do Avaliador *</Label>
                <Input
                  id="assessor"
                  value={assessorName}
                  onChange={(e) => setAssessorName(e.target.value)}
                  placeholder="Digite seu nome"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="observations">Observações Gerais</Label>
              <Textarea
                id="observations"
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                placeholder="Adicione observações gerais sobre a avaliação..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Progresso Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Indicadores avaliados</span>
                  <span className="font-medium text-foreground">
                    {scoredIndicators} de {totalIndicators} ({progressPercentage.toFixed(1)}%)
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Pontuação geral</span>
                  <span className="font-medium text-foreground">{overallScore.toFixed(1)}%</span>
                </div>
                <Progress value={overallScore} className="h-3" />
              </div>

              {scoredIndicators > 0 && (
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-sm text-muted-foreground">Classificação atual</span>
                  <ClassificationBadge classification={classification} />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* FAIQ Assessment Areas */}
        <div className="space-y-4">
          {faiqAreas.map((area, areaIndex) => (
            <Card key={area.id}>
              <Collapsible
                open={openAreas.includes(area.id)}
                onOpenChange={() => toggleArea(area.id)}
              >
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 hover:bg-muted/50 transition-colors rounded-t-lg">
                    <div className="flex items-center gap-3">
                      {openAreas.includes(area.id) ? (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      )}
                      <div className="text-left">
                        <CardTitle className="text-xl">{area.name}</CardTitle>
                        <CardDescription className="text-sm mt-1">
                          {area.categories.length} categorias • {area.categories.reduce((sum, cat) => sum + cat.indicators.length, 0)} indicadores
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <CardContent className="space-y-6 pt-6">
                    {area.categories.map((category) => (
                      <div key={category.id} className="space-y-4">
                        <Collapsible
                          open={openCategories.includes(category.id)}
                          onOpenChange={() => toggleCategory(category.id)}
                        >
                          <CollapsibleTrigger className="w-full">
                            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                              {openCategories.includes(category.id) ? (
                                <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                              )}
                              <div className="text-left flex-1">
                                <h4 className="font-semibold text-foreground">{category.name}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                                <p className="text-xs text-muted-foreground mt-1">{category.indicators.length} indicadores</p>
                              </div>
                            </div>
                          </CollapsibleTrigger>

                          <CollapsibleContent>
                            <div className="mt-4 space-y-4 pl-4">
                              {category.indicators.map((indicator) => (
                                <div
                                  key={indicator.id}
                                  className="bg-card border border-border p-4 rounded-lg space-y-3"
                                >
                                  {/* Code and Classification */}
                                  <div className="flex items-center justify-between">
                                    <span className="font-mono text-xs bg-muted px-2 py-1 rounded font-medium">
                                      {indicator.code}
                                    </span>
                                    <ClassificationBadge classification={indicator.classification} />
                                  </div>

                                  {/* Indicator Name */}
                                  <p className="text-sm leading-relaxed text-foreground">
                                    {indicator.name}
                                  </p>

                                  {/* Description */}
                                  {indicator.description && (
                                    <p className="text-xs text-muted-foreground">
                                      {indicator.description}
                                    </p>
                                  )}

                                  {/* Scoring Buttons */}
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium text-muted-foreground">Pontuação:</span>
                                    <div className="flex gap-1">
                                      {[0, 0.5, 1].map((scoreValue) => (
                                        <Button
                                          key={scoreValue}
                                          variant={getIndicatorScore(indicator.id) === scoreValue ? "default" : "outline"}
                                          size="sm"
                                          className="h-8 w-14 text-xs"
                                          onClick={() => setIndicatorScore(indicator.id, scoreValue)}
                                        >
                                          {scoreValue}
                                        </Button>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Notes Field */}
                                  <div className="space-y-1">
                                    <Label htmlFor={`note-${indicator.id}`} className="text-xs text-muted-foreground">
                                      Observações:
                                    </Label>
                                    <Textarea
                                      id={`note-${indicator.id}`}
                                      placeholder="Adicione observações específicas sobre este indicador..."
                                      value={getIndicatorNote(indicator.id)}
                                      onChange={(e) => setIndicatorNote(indicator.id, e.target.value)}
                                      rows={2}
                                      className="text-sm"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    ))}
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>

        {/* Fixed Save Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={handleSaveClick}
            size="lg"
            className="shadow-lg gap-2"
            disabled={scoredIndicators === 0 || !selectedClinic || !assessorName}
          >
            <Save className="h-5 w-5" />
            Salvar Avaliação
          </Button>
        </div>

        {/* Confirmation Modal */}
        <Dialog open={showSaveModal} onOpenChange={setShowSaveModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                Confirmar Salvamento
              </DialogTitle>
              <DialogDescription>
                Revise as informações antes de salvar a avaliação.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Clínica:</span>
                  <span className="font-medium text-foreground">
                    {clinics?.find(c => c.id === selectedClinic)?.name}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Avaliador:</span>
                  <span className="font-medium text-foreground">{assessorName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Indicadores avaliados:</span>
                  <span className="font-medium text-foreground">
                    {scoredIndicators} de {totalIndicators}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Pontuação final:</span>
                  <span className="font-medium text-foreground">{overallScore.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between text-sm items-center">
                  <span className="text-muted-foreground">Classificação:</span>
                  <ClassificationBadge classification={classification} />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowSaveModal(false)}
                disabled={isSaving}
              >
                Cancelar
              </Button>
              <Button onClick={handleConfirmSave} disabled={isSaving}>
                {isSaving ? (
                  <>Salvando...</>
                ) : (
                  <>
                    <FileText className="h-4 w-4 mr-2" />
                    Confirmar e Salvar
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default NovaAvaliacao;
