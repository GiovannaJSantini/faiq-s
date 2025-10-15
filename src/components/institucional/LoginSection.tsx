import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthButton } from '@/components/auth/GoogleAuthButton';
import { LGPDConsent } from '@/components/auth/LGPDConsent';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { LogIn } from 'lucide-react';

export const LoginSection = () => {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Button
        onClick={() => setShowLoginDialog(true)}
        className="fixed top-4 right-4 z-50 bg-primary hover:bg-primary/90"
      >
        <LogIn className="mr-2 h-4 w-4" />
        Entrar
      </Button>

      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Bem-vindo ao FAIQ</DialogTitle>
            <DialogDescription>
              Faça login para acessar sua área de gestão de qualidade.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <LGPDConsent onConsentChange={setHasConsent} />
            
            <div className="space-y-3">
              <GoogleAuthButton disabled={!hasConsent} />
              
              {!hasConsent && (
                <p className="text-xs text-center text-muted-foreground">
                  É necessário aceitar os termos para continuar
                </p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
