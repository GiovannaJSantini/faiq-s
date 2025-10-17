import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export type AppRole = 'admin' | 'avaliador' | 'cliente';

export const useUserRole = () => {
  const { user } = useAuth();

  const { data: userRole, isLoading, error } = useQuery({
    queryKey: ['userRole', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();
      
      if (error) throw error;
      return data?.role as AppRole | null;
    },
    enabled: !!user?.id,
  });

  const isAdmin = userRole === 'admin';
  const isAvaliador = userRole === 'avaliador';
  const isCliente = userRole === 'cliente';

  return {
    userRole,
    isLoading,
    error,
    isAdmin,
    isAvaliador,
    isCliente,
  };
};
