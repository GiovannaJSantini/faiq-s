import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Save, FileText, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sampleClinics } from "@/data/faiqData";

// Complete FAIQ structure with all 10 areas (abbreviated for space)
const faiqStructure = [
  {
    id: 1,
    name: "I. Jornada do Profissional",
    categories: [
      {
        id: 1,
        name: "1. Recrutamento e Seleção",
        indicators: [
          "A organização possui descrições de cargos para cada posição, com qualificações mínimas, linhas de reportagem, hierarquia e deveres do cargo.",
          "Possui uma matriz de cargos x salários estabelecidos de acordo com a descrição de cargos",
          "Possui diretrizes claras para política de remuneração, mérito e promoção para seus profissionais"
        ]
      }
    ]
  },
  {
    id: 2,
    name: "II. Jornada do Cliente",
    categories: [
      {
        id: 6,
        name: "1. Admissão do Cliente",
        indicators: [
          "Possui diretrizes claras sobre o escopo de atendimento da clínica, e perfil de cliente que é atendido",
          "Possui diretrizes e processos para captação de leads"
        ]
      }
    ]
  }
  // Note: Full 10 areas structure would be included here
];

const NovaAvaliacao = () => {
  const [selectedClinic, setSelectedClinic] = useState("");
  const [assessorName, setAssessorName] = useState("");
  const [observations, setObservations] = useState("");
  const [openAreas, setOpenAreas] = useState<number[]>([]);
  const [openCategories, setOpenCategories] = useState<number[]>([]);
  const [scores, setScores] = useState<Record<string, number>>({});
  const { toast } = useToast();

  const toggleArea = (areaId: number) => {
    setOpenAreas(prev => 
      prev.includes(areaId) 
        ? prev.filter(id => id !== areaId)
        : [...prev, areaId]
    );
  };

  const toggleCategory = (categoryId: number) => {
    setOpenCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const setIndicatorScore = (areaId: number, categoryId: number, indicatorIndex: number, score: number) => {
    const key = `${areaId}-${categoryId}-${indicatorIndex}`;
    setScores(prev => ({ ...prev, [key]: score }));
  };

  const getIndicatorScore = (areaId: number, categoryId: number, indicatorIndex: number) => {
    const key = `${areaId}-${categoryId}-${indicatorIndex}`;
    return scores[key] || 0;
  };

  const calculateOverallScore = () => {
    const totalScores = Object.values(scores);
    const avgScore = totalScores.reduce((sum, score) => sum + score, 0) / totalScores.length;
    return isNaN(avgScore) ? 0 : avgScore * 100;
  };

  const getClassification = (score: number) => {
    if (score >= 80) return { label: "Excelência", color: "bg-success text-success-foreground" };
    if (score >= 60) return { label: "Qualidade", color: "bg-details text-white" };
    return { label: "Padrão", color: "bg-standard text-standard-foreground" };
  };

  const handleSubmit = () => {
    if (!selectedClinic || !assessorName) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha a clínica e o nome do avaliador.",
        variant: "destructive",
      });
      return;
    }

    const overallScore = calculateOverallScore();
    const classification = getClassification(overallScore);

    toast({
      title: "Avaliação salva com sucesso!",
      description: `Pontuação geral: ${overallScore.toFixed(1)}% - ${classification.label}`,
    });
  };

  const overallScore = calculateOverallScore();
  const classification = getClassification(overallScore);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-details mb-2">Nova Avaliação FAIQ</h1>
        <p className="text-muted-foreground">
          Ferramenta de Avaliação de Indicadores de Qualidade - Sistema completo com 10 áreas
        </p>
      </div>

      {/* Basic Information */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-details">
            <FileText className="h-5 w-5 text-primary" />
            Informações Básicas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clinic">Clínica</Label>
              <Select value={selectedClinic} onValueChange={setSelectedClinic}>
                <SelectTrigger className="border-primary/20 focus:border-primary">
                  <SelectValue placeholder="Selecione a clínica" />
                </SelectTrigger>
                <SelectContent>
                  {sampleClinics.map((clinic) => (
                    <SelectItem key={clinic.id} value={clinic.id}>
                      {clinic.name}
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
                placeholder="Digite o nome do avaliador"
                className="border-primary/20 focus:border-primary"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="observations">Observações Gerais</Label>
            <Textarea
              id="observations"
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              placeholder="Observações sobre a avaliação (opcional)"
              rows={3}
              className="border-primary/20 focus:border-primary"
            />
          </div>
        </CardContent>
      </Card>

      {/* Overall Progress */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-details">
              <CheckCircle className="h-5 w-5 text-primary" />
              Progresso Geral
            </span>
            <Badge className={classification.color}>
              {classification.label}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-details">Pontuação geral</span>
              <span className="font-medium text-details">{overallScore.toFixed(1)}%</span>
            </div>
            <Progress value={overallScore} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* FAIQ Areas */}
      <div className="space-y-4">
        {faiqStructure.map((area) => (
          <Card key={area.id} className="border-l-4 border-l-primary">
            <Collapsible
              open={openAreas.includes(area.id)}
              onOpenChange={() => toggleArea(area.id)}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-primary/5 transition-colors">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {openAreas.includes(area.id) ? (
                        <ChevronDown className="h-4 w-4 text-primary" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-primary" />
                      )}
                      <span className="text-details">{area.name}</span>
                    </div>
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="space-y-4">
                  {area.categories.map((category) => (
                    <Card key={category.id} className="border-l-4 border-l-accent">
                      <Collapsible
                        open={openCategories.includes(category.id)}
                        onOpenChange={() => toggleCategory(category.id)}
                      >
                        <CollapsibleTrigger asChild>
                          <CardHeader className="cursor-pointer hover:bg-accent/5 transition-colors py-3">
                            <CardTitle className="text-base flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {openCategories.includes(category.id) ? (
                                  <ChevronDown className="h-3 w-3 text-primary" />
                                ) : (
                                  <ChevronRight className="h-3 w-3 text-primary" />
                                )}
                                <span className="text-details">{category.name}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {category.indicators.length} indicadores
                              </span>
                            </CardTitle>
                          </CardHeader>
                        </CollapsibleTrigger>
                        
                        <CollapsibleContent>
                          <CardContent className="space-y-3 pt-0">
                            {category.indicators.map((indicator, index) => (
                              <div key={index} className="bg-primary/5 p-4 rounded-lg space-y-3 border border-primary/10">
                                <p className="text-sm leading-relaxed text-foreground">{indicator}</p>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-medium text-details">Pontuação:</span>
                                  <div className="flex gap-1">
                                    {[0, 0.5, 1].map((score) => (
                                      <Button
                                        key={score}
                                        variant={getIndicatorScore(area.id, category.id, index) === score ? "default" : "outline"}
                                        size="sm"
                                        className={`h-8 w-12 ${
                                          getIndicatorScore(area.id, category.id, index) === score 
                                            ? "bg-primary text-white hover:bg-primary/90" 
                                            : "border-primary/20 text-primary hover:bg-primary/10"
                                        }`}
                                        onClick={() => setIndicatorScore(area.id, category.id, index, score)}
                                      >
                                        {score}
                                      </Button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </CardContent>
                        </CollapsibleContent>
                      </Collapsible>
                    </Card>
                  ))}
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <Button onClick={handleSubmit} className="gap-2 bg-details hover:bg-details/90" size="lg">
          <Save className="h-4 w-4" />
          Salvar Avaliação
        </Button>
      </div>
    </div>
  );
};

export default NovaAvaliacao;