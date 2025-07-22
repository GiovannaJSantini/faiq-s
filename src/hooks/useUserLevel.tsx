
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

type UserLevel = 'padrao' | 'qualidade' | 'excelencia';

export const useUserLevel = () => {
  const { user } = useAuth();
  const [userLevel, setUserLevel] = useState<UserLevel>('padrao');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserLevel();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchUserLevel = async () => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('level')
        .eq('user_id', user?.id)
        .single();

      if (error) {
        console.error('Error fetching user level:', error);
        return;
      }

      if (data) {
        setUserLevel(data.level as UserLevel);
      }
    } catch (error) {
      console.error('Error fetching user level:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserLevel = async (newLevel: UserLevel) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ level: newLevel })
        .eq('user_id', user?.id);

      if (error) throw error;
      
      setUserLevel(newLevel);
      return { success: true };
    } catch (error) {
      console.error('Error updating user level:', error);
      return { success: false, error };
    }
  };

  return {
    userLevel,
    loading,
    updateUserLevel
  };
};
