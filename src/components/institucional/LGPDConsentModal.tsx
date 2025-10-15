import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LGPDConsentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => void;
}

export const LGPDConsentModal = ({ open, onOpenChange, onAccept }: LGPDConsentModalProps) => {
  const [dataProcessingConsent, setDataProcessingConsent] = useState(false);

  const handleAccept = () => {
    if (dataProcessingConsent) {
      onAccept();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Política de Privacidade e Termos de Uso</DialogTitle>
          <DialogDescription>
            Por favor, leia e aceite nossa política de privacidade antes de continuar
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="font-semibold text-foreground mb-2">1. Coleta de Dados</h3>
              <p className="text-muted-foreground">
                Coletamos informações básicas do seu perfil do Google, incluindo nome e endereço de e-mail, 
                quando você faz login em nossa plataforma. Estes dados são usados exclusivamente para 
                identificação e personalização da sua experiência.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">2. Uso dos Dados (LGPD)</h3>
              <p className="text-muted-foreground">
                Em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018), 
                seus dados pessoais serão utilizados apenas para:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                <li>Autenticação e acesso à plataforma</li>
                <li>Personalização da experiência do usuário</li>
                <li>Comunicações relacionadas ao serviço</li>
                <li>Análises estatísticas anônimas</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">3. Compartilhamento de Dados</h3>
              <p className="text-muted-foreground">
                Não compartilhamos seus dados pessoais com terceiros, exceto quando necessário para 
                a prestação do serviço (como provedores de infraestrutura) ou quando exigido por lei.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">4. Seus Direitos</h3>
              <p className="text-muted-foreground">
                Você tem direito a:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                <li>Confirmar a existência de tratamento dos seus dados</li>
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
                <li>Solicitar a anonimização, bloqueio ou eliminação de dados</li>
                <li>Revogar o consentimento a qualquer momento</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">5. Segurança</h3>
              <p className="text-muted-foreground">
                Implementamos medidas técnicas e organizacionais para proteger seus dados contra 
                acesso não autorizado, perda ou alteração.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">6. Contato</h3>
              <p className="text-muted-foreground">
                Para exercer seus direitos ou esclarecer dúvidas sobre tratamento de dados, 
                entre em contato através do e-mail: privacidade@faiqassessment.com
              </p>
            </section>
          </div>
        </ScrollArea>

        <div className="flex items-start space-x-2 py-4">
          <Checkbox
            id="data-processing"
            checked={dataProcessingConsent}
            onCheckedChange={(checked) => setDataProcessingConsent(checked === true)}
          />
          <Label 
            htmlFor="data-processing" 
            className="text-sm leading-tight cursor-pointer"
          >
            Eu li e aceito a Política de Privacidade e concordo com o tratamento dos meus dados 
            pessoais conforme descrito acima, em conformidade com a LGPD.
          </Label>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleAccept}
            disabled={!dataProcessingConsent}
          >
            Aceitar e Continuar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
