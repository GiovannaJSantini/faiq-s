import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2, FileText, Edit, Save, RotateCcw } from "lucide-react";
import { useAIAnalysis, AIAnalysis } from "@/hooks/useAIAnalysis";
import { Badge } from "@/components/ui/badge";
import { sanitizeText } from "@/lib/textSanitizer";

interface AIAnalysisSectionProps {
  assessmentId: string;
}

export function AIAnalysisSection({ assessmentId }: AIAnalysisSectionProps) {
  const { analysis, isLoading, isGenerating, isUpdating, generateAnalysis, updateAnalysis } = useAIAnalysis(assessmentId);
  
  const [editMode, setEditMode] = useState<Record<string, boolean>>({});
  const [editedValues, setEditedValues] = useState<Partial<AIAnalysis>>({});

  const handleEdit = (field: keyof AIAnalysis) => {
    setEditMode({ ...editMode, [field]: true });
    if (analysis) {
      setEditedValues({ ...editedValues, [field]: analysis[field] });
    }
  };

  const handleSave = (field: keyof AIAnalysis) => {
    if (editedValues[field] !== undefined) {
      updateAnalysis({ [field]: editedValues[field] });
      setEditMode({ ...editMode, [field]: false });
    }
  };

  const handleCancel = (field: keyof AIAnalysis) => {
    setEditMode({ ...editMode, [field]: false });
    if (analysis) {
      setEditedValues({ ...editedValues, [field]: analysis[field] });
    }
  };

  // Sanitize value for display (removes markdown, emojis, etc.)
  const getDisplayValue = (value: string | null | undefined): string => {
    if (!value) return '';
    return editMode ? value : sanitizeText(value);
  };

  const renderEditableField = (
    field: keyof AIAnalysis,
    label: string,
    description?: string,
    rows: number = 6
  ) => {
    const rawValue = editMode[field] ? (editedValues[field] as string) : (analysis?.[field] as string);
    const displayValue = editMode[field] ? rawValue : sanitizeText(rawValue);
    const isEditing = editMode[field];

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base font-semibold">{label}</Label>
            {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
          </div>
          <div className="flex gap-2">
            {!isEditing ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(field)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCancel(field)}
                  disabled={isUpdating}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleSave(field)}
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Salvar
                </Button>
              </>
            )}
          </div>
        </div>
        <Textarea
          value={displayValue || ""}
          onChange={(e) => setEditedValues({ ...editedValues, [field]: e.target.value })}
          rows={rows}
          disabled={!isEditing}
          className="font-mono text-sm"
        />
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Análise Estratégica
              </CardTitle>
              <CardDescription>
                Análise estruturada com insights acionáveis e campos editáveis
              </CardDescription>
            </div>
            {analysis?.is_manually_edited && (
              <Badge variant="secondary">Editado manualmente</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {!analysis ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhuma análise gerada ainda</h3>
              <p className="text-muted-foreground mb-4">
                Clique no botão abaixo para gerar uma análise estratégica desta avaliação
              </p>
              <Button
                onClick={() => generateAnalysis()}
                disabled={isGenerating}
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Gerando análise...
                  </>
                ) : (
                  <>
                    <FileText className="h-5 w-5 mr-2" />
                    Gerar Análise Estratégica
                  </>
                )}
              </Button>
            </div>
          ) : (
            <>
              <div className="flex justify-end">
                <Button
                  onClick={() => generateAnalysis()}
                  disabled={isGenerating}
                  variant="outline"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Regenerando...
                    </>
                  ) : (
                    <>
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Regenerar Análise
                    </>
                  )}
                </Button>
              </div>

              <Separator />

              {renderEditableField(
                "executive_summary",
                "Sumário Executivo",
                "Visão geral dos principais achados e nível de maturidade institucional",
                8
              )}

              <Separator />

              <div className="grid md:grid-cols-2 gap-6">
                {renderEditableField(
                  "swot_strengths",
                  "Forças Institucionais",
                  "Processos consolidados e competências identificadas",
                  6
                )}
                {renderEditableField(
                  "swot_weaknesses",
                  "Áreas de Atenção",
                  "Lacunas e pontos de melhoria identificados",
                  6
                )}
                {renderEditableField(
                  "swot_opportunities",
                  "Oportunidades Estratégicas",
                  "Potenciais de fortalecimento e desenvolvimento",
                  6
                )}
                {renderEditableField(
                  "swot_threats",
                  "Riscos Identificados",
                  "Ameaças e vulnerabilidades mapeadas",
                  6
                )}
              </div>

              <Separator />

              {renderEditableField(
                "risk_analysis",
                "Mapa de Riscos por Categoria",
                "Riscos categorizados (clínico, regulatório, organizacional) com severidade e estratégias de mitigação",
                8
              )}

              <Separator />

              {renderEditableField(
                "priority_recommendations",
                "Ações Prioritárias",
                "Top 5 ações ordenadas por impacto institucional",
                8
              )}

              <Separator />

              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Planos de Ação</h3>
                {renderEditableField(
                  "action_plan_30_days",
                  "Horizonte Crítico (0-30 dias)",
                  "Ações imediatas para mitigação de riscos prioritários",
                  6
                )}
                {renderEditableField(
                  "action_plan_90_days",
                  "Horizonte Estratégico (30-90 dias)",
                  "Implementação de melhorias estruturais e capacitações",
                  6
                )}
                {renderEditableField(
                  "action_plan_12_months",
                  "Horizonte de Maturidade (90-360 dias)",
                  "Consolidação de governança e transformação institucional",
                  6
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
