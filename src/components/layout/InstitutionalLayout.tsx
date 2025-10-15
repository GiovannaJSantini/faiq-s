import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
interface InstitutionalLayoutProps {
  children: ReactNode;
}
export function InstitutionalLayout({
  children
}: InstitutionalLayoutProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <div className="min-h-screen bg-background">
      {/* Header/Navigation */}
      <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">F</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">FAIQ-S</h1>
                <p className="text-xs text-muted-foreground">Consultoria em Qualidade</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              
              
              
              <button onClick={() => scrollToSection('contato')} className="text-foreground hover:text-primary transition-colors">
                Contato
              </button>
              
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">F</span>
                </div>
                <h3 className="text-lg font-bold">FAIQ-S</h3>
              </div>
              <p className="text-primary-foreground/80 text-sm">
                Consultoria especializada em avaliação de indicadores de qualidade 
                para clínicas e hospitais.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+55 (11) 99999-9999</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>contato@faiq-s.com.br</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>São Paulo, SP</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Serviços</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>Avaliação de Qualidade</li>
                <li>Análise de Indicadores</li>
                <li>Treinamentos</li>
                <li>Consultoria Técnica</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm text-primary-foreground/80">
            <p>&copy; 2024 FAIQ-S Consultoria. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>;
}