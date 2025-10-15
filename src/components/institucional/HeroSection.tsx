import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Users, Award } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { LGPDConsentModal } from './LGPDConsentModal';
import { useNavigate } from 'react-router-dom';

export function HeroSection() {
  const [showConsentModal, setShowConsentModal] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const scrollToContact = () => {
    const element = document.getElementById('contato');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Usuário já está logado
        navigate('/');
        return;
      }

      // Mostrar modal de consentimento LGPD
      setShowConsentModal(true);
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro. Por favor, tente novamente.',
        variant: 'destructive',
      });
    }
  };

  const handleConsentAccept = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        }
      });

      if (error) {
        toast({
          title: 'Erro na autenticação',
          description: error.message,
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Erro na autenticação',
        description: 'Não foi possível fazer login com Google',
        variant: 'destructive',
      });
    }
  };

  return (
    <section className="hero-gradient text-primary-foreground py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Transformamos dados em decisões de{" "}
                <span className="text-accent">qualidade</span>
              </h1>
              <p className="text-lg text-primary-foreground/90 max-w-xl">
                Consultoria especializada em avaliação de indicadores de qualidade 
                para clínicas e hospitais, usando metodologia própria baseada em 
                evidências científicas.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleGoogleSignIn}
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Entrar com Google
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => document.getElementById('indicadores')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver Indicadores
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <div className="text-2xl font-bold">150+</div>
                <div className="text-sm text-primary-foreground/80">Clínicas Avaliadas</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <BarChart3 className="w-8 h-8 text-accent" />
                </div>
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-primary-foreground/80">Avaliações Realizadas</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Award className="w-8 h-8 text-accent" />
                </div>
                <div className="text-2xl font-bold">85%</div>
                <div className="text-sm text-primary-foreground/80">Índice de Satisfação</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="institutional-card animate-float">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="text-sm font-semibold text-success">Sistema Ativo</span>
                </div>
                <h3 className="text-xl font-bold text-foreground">Dashboard em Tempo Real</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-excellence-light p-3 rounded-lg">
                    <div className="text-2xl font-bold text-excellence">92%</div>
                    <div className="text-sm text-excellence">Excelência</div>
                  </div>
                  <div className="bg-quality-light p-3 rounded-lg">
                    <div className="text-2xl font-bold text-quality">78%</div>
                    <div className="text-sm text-quality">Qualidade</div>
                  </div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-success rounded-full" style={{ width: '85%' }}></div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Monitoramento contínuo de indicadores de qualidade
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LGPDConsentModal
        open={showConsentModal}
        onOpenChange={setShowConsentModal}
        onAccept={handleConsentAccept}
      />
    </section>
  );
}
