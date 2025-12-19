import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { AuthModal } from "@/components/auth/AuthModal";
import fluidaLogoHorizontal from "@/assets/fluida-logo-horizontal.jpeg";
interface LumenLayoutProps {
  children: ReactNode;
}
export function LumenLayout({
  children
}: LumenLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };
  const handleLoginClick = () => {
    if (user) {
      navigate('/');
    } else {
      setAuthModalOpen(true);
    }
  };
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src={fluidaLogoHorizontal} 
                alt="Fluida - Consultoria em Excelência Clínica" 
                className="h-12 w-auto"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <button onClick={() => scrollToSection('sobre')} className="text-foreground hover:text-primary transition-colors">
                Sobre
              </button>
              <button onClick={() => scrollToSection('servicos')} className="text-foreground hover:text-primary transition-colors">
                Serviços
              </button>
              <button onClick={() => scrollToSection('expertise')} className="text-foreground hover:text-primary transition-colors">
                Expertise
              </button>
              <button onClick={() => scrollToSection('metodologia')} className="text-foreground hover:text-primary transition-colors">
                Metodologia
              </button>
              <button onClick={() => scrollToSection('resultados')} className="text-foreground hover:text-primary transition-colors">
                Resultados
              </button>
              <button onClick={() => scrollToSection('contato')} className="text-foreground hover:text-primary transition-colors">
                Contato
              </button>
              <Button variant="outline" onClick={handleLoginClick}>
                {user ? 'Dashboard' : 'Login'}
              </Button>
              <Button onClick={() => scrollToSection('orcamento')}>
                Solicitar Orçamento
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-foreground">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && <nav className="lg:hidden mt-4 pb-4 flex flex-col gap-3">
              <button onClick={() => scrollToSection('sobre')} className="text-left text-foreground hover:text-primary transition-colors py-2">
                Sobre
              </button>
              <button onClick={() => scrollToSection('servicos')} className="text-left text-foreground hover:text-primary transition-colors py-2">
                Serviços
              </button>
              <button onClick={() => scrollToSection('expertise')} className="text-left text-foreground hover:text-primary transition-colors py-2">
                Expertise
              </button>
              <button onClick={() => scrollToSection('metodologia')} className="text-left text-foreground hover:text-primary transition-colors py-2">
                Metodologia
              </button>
              <button onClick={() => scrollToSection('resultados')} className="text-left text-foreground hover:text-primary transition-colors py-2">
                Resultados
              </button>
              <button onClick={() => scrollToSection('contato')} className="text-left text-foreground hover:text-primary transition-colors py-2">
                Contato
              </button>
              <Button variant="outline" onClick={handleLoginClick} className="w-full">
                {user ? 'Dashboard' : 'Login'}
              </Button>
              <Button onClick={() => scrollToSection('orcamento')} className="w-full">
                Solicitar Orçamento
              </Button>
            </nav>}
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#1FA87A] text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={fluidaLogoHorizontal} 
                  alt="Fluida" 
                  className="h-10 w-auto brightness-0 invert"
                />
              </div>
              <p className="text-white/80 text-sm">Consultoria especializada em qualidade clínica, governança e sustentabilidade institucional para clínicas para populações neurodivergentes</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <div className="space-y-2 text-sm">
                
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>grupofluida@gmail.com</span>
                </div>
              </div>
            </div>

            
          </div>

          
        </div>
      </footer>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </div>;
}