import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { AuthModal } from "@/components/auth/AuthModal";
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
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1FA87A] to-[#168F67] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Lumen</h1>
                <p className="text-xs text-muted-foreground">Consultoria em Excelência Clínica</p>
              </div>
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
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">L</span>
                </div>
                <h3 className="text-lg font-bold">Grupo Fluida</h3>
              </div>
              <p className="text-white/80 text-sm">
                Consultoria especializada em excelência clínica, desenvolvimento organizacional 
                e serviços para o espectro autista (TEA).
              </p>
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

            <div>
              <h4 className="font-semibold mb-4">Links</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
                
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm text-white/80">
            <p>© 2025 Grupo Fluida. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </div>;
}