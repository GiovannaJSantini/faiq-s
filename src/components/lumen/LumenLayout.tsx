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
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-b border-border/50 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src={fluidaLogoHorizontal} 
                alt="Fluida - Consultoria em Excelência Clínica" 
                className="h-10 w-auto"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {[
                { id: 'organizacao', label: 'Metodologia' },
                { id: 'portfolio', label: 'Serviços' },
                { id: 'niveis', label: 'Níveis' },
                { id: 'solicitar', label: 'Como Funciona' },
                { id: 'contato', label: 'Contato' },
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)} 
                  className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                >
                  {item.label}
                </button>
              ))}
              <div className="w-px h-6 bg-border mx-2" />
              <Button variant="ghost" size="sm" onClick={handleLoginClick}>
                {user ? 'Dashboard' : 'Login'}
              </Button>
              <Button size="sm" onClick={() => scrollToSection('solicitar')}>
                Solicitar Orçamento
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="lg:hidden p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="lg:hidden mt-4 pb-4 flex flex-col gap-1 animate-fade-in">
              {[
                { id: 'organizacao', label: 'Metodologia' },
                { id: 'portfolio', label: 'Serviços' },
                { id: 'niveis', label: 'Níveis' },
                { id: 'solicitar', label: 'Como Funciona' },
                { id: 'contato', label: 'Contato' },
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)} 
                  className="text-left px-4 py-3 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                >
                  {item.label}
                </button>
              ))}
              <div className="h-px bg-border my-2" />
              <Button variant="outline" onClick={handleLoginClick} className="w-full">
                {user ? 'Dashboard' : 'Login'}
              </Button>
              <Button onClick={() => scrollToSection('solicitar')} className="w-full">
                Solicitar Orçamento
              </Button>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-foreground to-foreground/90 text-background py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="space-y-4">
              <img 
                src={fluidaLogoHorizontal} 
                alt="Fluida" 
                className="h-10 w-auto brightness-0 invert"
              />
              <p className="text-background/70 text-sm leading-relaxed">
                Consultoria especializada em qualidade clínica, governança e sustentabilidade 
                institucional para clínicas para populações neurodivergentes.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-background">Links Rápidos</h4>
              <ul className="space-y-2 text-sm">
                {[
                  { id: 'organizacao', label: 'Metodologia' },
                  { id: 'portfolio', label: 'Serviços' },
                  { id: 'niveis', label: 'Níveis' },
                  { id: 'contato', label: 'Contato' },
                ].map((item) => (
                  <li key={item.id}>
                    <button 
                      onClick={() => scrollToSection(item.id)}
                      className="text-background/70 hover:text-background transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-background">Contato</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-background/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <a 
                    href="mailto:grupofluida@gmail.com"
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    grupofluida@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-background/10 text-center">
            <p className="text-sm text-background/50">
              © {new Date().getFullYear()} Grupo Fluida. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </div>
  );
}