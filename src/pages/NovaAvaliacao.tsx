import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { faiqAreas, sampleClinics, getClassification } from "@/data/faiqData";
import { Assessment, AreaScore, CategoryScore, IndicatorScore, ScoreValue } from "@/types/faiq";
import { Save, Send, AlertCircle, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function NovaAvaliacao() {
  const { toast } = useToast();
  const [selectedClinic, setSelectedClinic] = useState("");
  const [assessorName, setAssessorName] = useState("");
  const [currentAreaIndex, setCurrentAreaIndex] = useState(0);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, ScoreValue>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});

  const currentArea = faiqAreas[currentAreaIndex];
  const currentCategory = currentArea?.categories[currentCategoryIndex];

  const updateScore = (indicatorId: string, score: ScoreValue) => {
    setScores(prev => ({ ...prev, [indicatorId]: score }));
  };

  const updateNote = (indicatorId: string, note: string) => {
    setNotes(prev => ({ ...prev, [indicatorId]: note }));
  };

  const calculateProgress = () => {
    const totalIndicators = faiqAreas.reduce(
      (total, area) => total + area.categories.reduce((catTotal, cat) => catTotal + cat.indicators.length, 0),
      0
    );
    const answeredIndicators = Object.keys(scores).length;
    return (answeredIndicators / totalIndicators) * 100;
  };

  const nextCategory = () => {
    if (currentCategoryIndex < currentArea.categories.length - 1) {
      setCurrentCategoryIndex(prev => prev + 1);
    } else if (currentAreaIndex < faiqAreas.length - 1) {
      setCurrentAreaIndex(prev => prev + 1);
      setCurrentCategoryIndex(0);
    }
  };

  const prevCategory = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(prev => prev - 1);
    } else if (currentAreaIndex > 0) {
      setCurrentAreaIndex(prev => prev - 1);
      setCurrentCategoryIndex(faiqAreas[currentAreaIndex - 1].categories.length - 1);
    }
  };

  const saveAssessment = () => {
    if (!selectedClinic || !assessorName.trim()) {
      toast({
        variant: "destructive",
        title: "Dados incompletos",
        description: "Selecione uma clínica e informe o nome do avaliador."
      });
      return;
    }

    // Calcular pontuações por área
    const areaScores: AreaScore[] = faiqAreas.map(area => {
      const categoryScores: CategoryScore[] = area.categories.map(category => {
        const indicatorScores: IndicatorScore[] = category.indicators.map(indicator => ({
          indicatorId: indicator.id,
          score: scores[indicator.id] || 0,
          notes: notes[indicator.id]
        }));

        const totalScore = indicatorScores.reduce((sum, score) => sum + score.score, 0);
        const maxScore = category.indicators.length;
        const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

        return {
          categoryId: category.id,
          indicatorScores,
          totalScore,
          maxScore,
          percentage
        };
      });

      const totalScore = categoryScores.reduce((sum, cat) => sum + cat.totalScore, 0);
      const maxScore = categoryScores.reduce((sum, cat) => sum + cat.maxScore, 0);
      const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

      return {
        areaId: area.id,
        categoryScores,
        totalScore,
        maxScore,
        percentage
      };
    });

    const totalScore = areaScores.reduce((sum, area) => sum + area.totalScore, 0);
    const maxScore = areaScores.reduce((sum, area) => sum + area.maxScore, 0);
    const overallPercentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

    const clinic = sampleClinics.find(c => c.id === selectedClinic);
    
    const assessment: Assessment = {
      id: `assess-${Date.now()}`,
      clinicId: selectedClinic,
      clinicName: clinic?.name || '',
      assessmentDate: new Date(),
      assessorName,
      areaScores,
      totalScore,
      maxScore,
      overallPercentage,
      classification: getClassification(overallPercentage),
      status: 'concluida',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    toast({
      title: "Avaliação salva!",
      description: `Avaliação da ${clinic?.name} foi salva com pontuação de ${overallPercentage.toFixed(1)}%`,
    });
  };

  const isComplete = calculateProgress() === 100;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Nova Avaliação FAIQ</h1>
          <p className="text-muted-foreground">Ferramenta de Avaliação de Indicadores de Qualidade</p>
        </div>
        <div className="flex items-center gap-2">
          <Progress value={calculateProgress()} className="w-32" />
          <span className="text-sm text-muted-foreground">{calculateProgress().toFixed(0)}%</span>
        </div>
      </div>

      {/* Configuração inicial */}
      <Card className="bg-card shadow-soft border-0">
        <CardHeader>
          <CardTitle>Dados da Avaliação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clinic">Clínica a ser avaliada</Label>
              <Select value={selectedClinic} onValueChange={setSelectedClinic}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma clínica" />
                </SelectTrigger>
                <SelectContent>
                  {sampleClinics.map((clinic) => (
                    <SelectItem key={clinic.id} value={clinic.id}>
                      {clinic.name} - {clinic.location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="assessor">Nome do Avaliador</Label>
              <Input
                id="assessor"
                value={assessorName}
                onChange={(e) => setAssessorName(e.target.value)}
                placeholder="Digite seu nome"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navegação por áreas */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {faiqAreas.map((area, index) => (
          <Button
            key={area.id}
            variant={index === currentAreaIndex ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setCurrentAreaIndex(index);
              setCurrentCategoryIndex(0);
            }}
            className="shrink-0"
          >
            {area.name}
          </Button>
        ))}
      </div>

      {currentArea && currentCategory && (
        <Card className="bg-card shadow-soft border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">{currentArea.name}</CardTitle>
                <Badge variant="secondary" className="mt-2">
                  {currentCategory.name}
                </Badge>
                <p className="text-sm text-muted-foreground mt-1">
                  {currentCategory.description}
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                Categoria {currentCategoryIndex + 1} de {currentArea.categories.length}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentCategory.indicators.map((indicator) => (
              <div key={indicator.id} className="space-y-4 p-4 border border-border rounded-lg bg-secondary/30">
                <div>
                  <h4 className="font-semibold text-foreground">{indicator.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{indicator.description}</p>
                </div>
                
                <div className="space-y-3">
                  <Label>Pontuação</Label>
                  <RadioGroup
                    value={scores[indicator.id]?.toString() || ""}
                    onValueChange={(value) => updateScore(indicator.id, parseFloat(value) as ScoreValue)}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id={`${indicator.id}-0`} />
                      <Label htmlFor={`${indicator.id}-0`}>0 - Não atende</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0.5" id={`${indicator.id}-0.5`} />
                      <Label htmlFor={`${indicator.id}-0.5`}>0,5 - Atende parcialmente</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id={`${indicator.id}-1`} />
                      <Label htmlFor={`${indicator.id}-1`}>1 - Atende completamente</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`note-${indicator.id}`}>Observações (opcional)</Label>
                  <Textarea
                    id={`note-${indicator.id}`}
                    value={notes[indicator.id] || ""}
                    onChange={(e) => updateNote(indicator.id, e.target.value)}
                    placeholder="Adicione observações sobre este indicador..."
                    className="min-h-[80px]"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Navegação entre categorias */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={prevCategory}
          disabled={currentAreaIndex === 0 && currentCategoryIndex === 0}
        >
          Anterior
        </Button>
        
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={saveAssessment}
            disabled={!selectedClinic || !assessorName.trim()}
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar Rascunho
          </Button>
          
          {isComplete && (
            <Button
              onClick={saveAssessment}
              disabled={!selectedClinic || !assessorName.trim()}
              className="bg-success text-success-foreground hover:bg-success/90"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Finalizar Avaliação
            </Button>
          )}
        </div>

        <Button
          onClick={nextCategory}
          disabled={currentAreaIndex === faiqAreas.length - 1 && 
                   currentCategoryIndex === currentArea?.categories.length - 1}
        >
          Próximo
        </Button>
      </div>
    </div>
  );
}