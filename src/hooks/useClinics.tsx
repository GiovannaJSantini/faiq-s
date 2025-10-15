import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';

type Clinic = Tables<'clinics'>;
type ClinicInsert = TablesInsert<'clinics'>;
type ClinicUpdate = TablesUpdate<'clinics'>;

export const useClinics = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: clinics = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['clinics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clinics')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Clinic[];
    },
  });

  const createClinic = useMutation({
    mutationFn: async (clinic: ClinicInsert) => {
      const { data, error } = await supabase
        .from('clinics')
        .insert([clinic])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clinics'] });
      toast({
        title: 'Clínica criada com sucesso',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Erro ao criar clínica',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const updateClinic = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: ClinicUpdate }) => {
      const { data, error } = await supabase
        .from('clinics')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clinics'] });
      toast({
        title: 'Clínica atualizada com sucesso',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Erro ao atualizar clínica',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const deleteClinic = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('clinics')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clinics'] });
      toast({
        title: 'Clínica removida com sucesso',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Erro ao remover clínica',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    clinics,
    isLoading,
    error,
    createClinic,
    updateClinic,
    deleteClinic,
  };
};
