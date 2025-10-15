import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

interface LGPDConsentProps {
  onConsentChange: (consented: boolean) => void;
}

export const LGPDConsent = ({ onConsentChange }: LGPDConsentProps) => {
  const [dataProcessing, setDataProcessing] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);

  const handleChange = (type: 'data' | 'privacy', checked: boolean) => {
    if (type === 'data') {
      setDataProcessing(checked);
      onConsentChange(checked && privacyPolicy);
    } else {
      setPrivacyPolicy(checked);
      onConsentChange(dataProcessing && checked);
    }
  };

  return (
    <div className="space-y-4">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Conforme a Lei Geral de Proteção de Dados (LGPD), precisamos do seu consentimento para processar seus dados pessoais.
        </AlertDescription>
      </Alert>

      <div className="space-y-3 p-4 border rounded-lg bg-muted/20">
        <div className="flex items-start gap-3">
          <Checkbox
            id="data-processing"
            checked={dataProcessing}
            onCheckedChange={(checked) => handleChange('data', checked as boolean)}
          />
          <Label htmlFor="data-processing" className="text-sm leading-relaxed cursor-pointer">
            Autorizo o processamento dos meus dados pessoais (nome, e-mail e informações de perfil) 
            para criação e gerenciamento da minha conta na plataforma FAIQ.
          </Label>
        </div>

        <div className="flex items-start gap-3">
          <Checkbox
            id="privacy-policy"
            checked={privacyPolicy}
            onCheckedChange={(checked) => handleChange('privacy', checked as boolean)}
          />
          <Label htmlFor="privacy-policy" className="text-sm leading-relaxed cursor-pointer">
            Li e concordo com a{' '}
            <a href="#politica" className="text-primary underline hover:no-underline">
              Política de Privacidade
            </a>{' '}
            e os{' '}
            <a href="#termos" className="text-primary underline hover:no-underline">
              Termos de Uso
            </a>
            .
          </Label>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Você pode revogar seu consentimento a qualquer momento através das configurações da sua conta. 
        Seus dados serão tratados conforme nossa Política de Privacidade e a LGPD (Lei 13.709/2018).
      </p>
    </div>
  );
};
