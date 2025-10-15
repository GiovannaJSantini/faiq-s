import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';
import { IndicatorScore as TypeIndicatorScore, CategoryScore as TypeCategoryScore, AreaScore as TypeAreaScore } from '@/types/faiq';

type Assessment = Tables<'assessments'>;
type AssessmentInsert = TablesInsert<'assessments'>;

export interface AssessmentWithScores extends Assessment {
  clinic?: Tables<'clinics'>;
  area_scores?: (Tables<'area_scores'> & {
    category_scores?: (Tables<'category_scores'> & {
      indicator_scores?: Tables<'indicator_scores'>[];
    })[];
  })[];
}

export const useAssessments = (clinicId?: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: assessments = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['assessments', clinicId],
    queryFn: async () => {
      let query = supabase
        .from('assessments')
        .select(`
          *,
          clinic:clinics(*)
        `)
        .order('assessment_date', { ascending: false });
      
      if (clinicId) {
        query = query.eq('clinic_id', clinicId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as AssessmentWithScores[];
    },
  });

  const getAssessmentWithScores = useQuery({
    queryKey: ['assessment-with-scores'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('assessments')
        .select(`
          *,
          clinic:clinics(*),
          area_scores (
            *,
            category_scores (
              *,
              indicator_scores (*)
            )
          )
        `)
        .order('assessment_date', { ascending: false });
      
      if (error) throw error;
      return data as AssessmentWithScores[];
    },
  });

  const createAssessment = useMutation({
    mutationFn: async ({
      assessment,
      areaScores,
    }: {
      assessment: AssessmentInsert;
      areaScores: (TypeAreaScore & {
        categoryScores: (TypeCategoryScore & {
          indicatorScores: TypeIndicatorScore[];
        })[];
      })[];
    }) => {
      // Criar a avaliação
      const { data: assessmentData, error: assessmentError } = await supabase
        .from('assessments')
        .insert([assessment])
        .select()
        .single();
      
      if (assessmentError) throw assessmentError;

      // Criar area_scores
      for (const areaScore of areaScores) {
        const { data: areaData, error: areaError } = await supabase
          .from('area_scores')
          .insert([{
            assessment_id: assessmentData.id,
            area_id: areaScore.areaId,
            area_name: areaScore.areaId,
            total_score: areaScore.totalScore,
            max_score: areaScore.maxScore,
            percentage: areaScore.percentage,
          }])
          .select()
          .single();
        
        if (areaError) throw areaError;

        // Criar category_scores
        for (const categoryScore of areaScore.categoryScores) {
          const { data: categoryData, error: categoryError } = await supabase
            .from('category_scores')
            .insert([{
              area_score_id: areaData.id,
              category_id: categoryScore.categoryId,
              category_name: categoryScore.categoryId,
              total_score: categoryScore.totalScore,
              max_score: categoryScore.maxScore,
              percentage: categoryScore.percentage,
            }])
            .select()
            .single();
          
          if (categoryError) throw categoryError;

          // Criar indicator_scores
          const indicatorInserts = categoryScore.indicatorScores.map(indicator => ({
            category_score_id: categoryData.id,
            indicator_id: indicator.indicatorId,
            indicator_name: indicator.indicatorId,
            score: indicator.score,
            weight: 1,
            notes: indicator.notes,
          }));

          const { error: indicatorError } = await supabase
            .from('indicator_scores')
            .insert(indicatorInserts);
          
          if (indicatorError) throw indicatorError;
        }
      }

      return assessmentData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assessments'] });
      queryClient.invalidateQueries({ queryKey: ['assessment-with-scores'] });
      toast({
        title: 'Avaliação criada com sucesso',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Erro ao criar avaliação',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const deleteAssessment = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('assessments')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assessments'] });
      queryClient.invalidateQueries({ queryKey: ['assessment-with-scores'] });
      toast({
        title: 'Avaliação removida com sucesso',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Erro ao remover avaliação',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    assessments,
    isLoading,
    error,
    createAssessment,
    deleteAssessment,
    getAssessmentWithScores: getAssessmentWithScores.data || [],
  };
};
