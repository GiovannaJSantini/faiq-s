
import { useState, useEffect, createContext, useContext } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { recordAuthConsents } from '@/utils/consentManager';

type Profile = Tables<'profiles'>;

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let isInitializing = false;

    console.log('[useAuth] Initializing auth...');

    const initAuth = async () => {
      if (isInitializing) return;
      isInitializing = true;
      
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log('[useAuth] Session:', session?.user?.id || 'none');
        
        if (!isMounted) return;
        
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchProfile(session.user.id);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('[useAuth] Error initializing auth:', error);
        if (isMounted) {
          setLoading(false);
        }
      } finally {
        isInitializing = false;
      }
    };

    // Global timeout to prevent infinite loading
    const globalTimeout = setTimeout(() => {
      console.error('[useAuth] Global timeout - forcing loading to false');
      setLoading(false);
    }, 10000);

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;
        
        setUser(session?.user ?? null);
        if (session?.user) {
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 0);
          
          if (event === 'SIGNED_IN') {
            setTimeout(() => {
              recordAuthConsents(session.user.id).catch(console.error);
            }, 0);
          }
        } else {
          setProfile(null);
          setLoading(false);
        }
      }
    );

    return () => {
      isMounted = false;
      clearTimeout(globalTimeout);
      subscription?.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    let timeoutId: NodeJS.Timeout | null = null;
    
    try {
      console.log('[useAuth] Fetching profile for user:', userId);
      
      timeoutId = setTimeout(() => {
        console.warn('[useAuth] Profile fetch timeout - setting loading to false');
        setLoading(false);
      }, 5000);

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (timeoutId) clearTimeout(timeoutId);

      if (error && error.code !== 'PGRST116') {
        console.error('[useAuth] Profile fetch error:', error);
        setProfile(null);
        return;
      }
      
      console.log('[useAuth] Profile loaded:', data?.id || 'none');
      setProfile(data);
    } catch (error) {
      console.error('[useAuth] Error fetching profile:', error);
      setProfile(null);
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
      console.log('[useAuth] Setting loading to false');
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string, name: string) => {
    const redirectUrl = import.meta.env.VITE_OAUTH_REDIRECT_URL || window.location.origin;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${redirectUrl}/`,
        data: {
          name,
        },
      },
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      signIn,
      signUp,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
