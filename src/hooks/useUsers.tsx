import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesUpdate } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';

type Profile = Tables<'profiles'>;
type ProfileUpdate = TablesUpdate<'profiles'>;

export const useUsers = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: users = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Profile[];
    },
  });

  const updateUser = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: ProfileUpdate }) => {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: 'Usuário atualizado com sucesso',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Erro ao atualizar usuário',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const createUser = useMutation({
    mutationFn: async ({ email, password, name, role }: { 
      email: string; 
      password: string; 
      name: string; 
      role: 'admin' | 'avaliador' | 'cliente' 
    }) => {
      // Criar usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (authError) throw authError;
      
      // O trigger handle_new_user já cria o perfil, mas precisamos atualizar o role se necessário
      if (authData.user && role !== 'cliente') {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ role, name })
          .eq('id', authData.user.id);
        
        if (profileError) throw profileError;
      }
      
      return authData.user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: 'Usuário criado com sucesso',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Erro ao criar usuário',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    users,
    isLoading,
    error,
    updateUser,
    createUser,
  };
};
