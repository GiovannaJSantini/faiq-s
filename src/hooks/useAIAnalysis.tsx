import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface AIAnalysis {
  id: string;
  assessment_id: string;
  executive_summary: string | null;
  swot_strengths: string | null;
  swot_weaknesses: string | null;
  swot_opportunities: string | null;
  swot_threats: string | null;
  risk_analysis: string | null;
  priority_recommendations: string | null;
  action_plan_30_days: string | null;
  action_plan_90_days: string | null;
  action_plan_12_months: string | null;
  area_specific_recommendations: Record<string, string> | null;
  generated_at: string;
  last_edited_at: string | null;
  is_manually_edited: boolean;
}

export function useAIAnalysis(assessmentId: string) {
  const queryClient = useQueryClient();

  // Fetch existing analysis
  const { data: analysis, isLoading } = useQuery({
    queryKey: ["ai-analysis", assessmentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ai_report_analyses")
        .select("*")
        .eq("assessment_id", assessmentId)
        .single();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      return data as AIAnalysis | null;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Generate new analysis
  const generateMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke("analyze-assessment", {
        body: { assessmentId },
      });

      if (error) throw error;
      return data as AIAnalysis;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ai-analysis", assessmentId] });
      toast.success("Análise IA gerada com sucesso!");
    },
    onError: (error: any) => {
      console.error("Error generating AI analysis:", error);
      if (error.message?.includes("429")) {
        toast.error("Limite de requisições excedido. Tente novamente em alguns instantes.");
      } else if (error.message?.includes("402")) {
        toast.error("Créditos de IA esgotados. Adicione créditos ao workspace.");
      } else {
        toast.error("Erro ao gerar análise IA. Tente novamente.");
      }
    },
  });

  // Update analysis
  const updateMutation = useMutation({
    mutationFn: async (updates: Partial<Omit<AIAnalysis, "id" | "assessment_id">>) => {
      if (!analysis?.id) throw new Error("No analysis to update");

      const { data: userData } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("ai_report_analyses")
        .update({
          ...updates,
          last_edited_at: new Date().toISOString(),
          edited_by: userData.user?.id,
          is_manually_edited: true,
        })
        .eq("id", analysis.id)
        .select()
        .single();

      if (error) throw error;
      return data as AIAnalysis;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ai-analysis", assessmentId] });
      toast.success("Análise atualizada com sucesso!");
    },
    onError: (error) => {
      console.error("Error updating AI analysis:", error);
      toast.error("Erro ao atualizar análise. Tente novamente.");
    },
  });

  return {
    analysis,
    isLoading,
    isGenerating: generateMutation.isPending,
    isUpdating: updateMutation.isPending,
    generateAnalysis: generateMutation.mutate,
    updateAnalysis: updateMutation.mutate,
  };
}