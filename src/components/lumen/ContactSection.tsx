import { Button } from "@/components/ui/button";
import { Mail, ArrowRight } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contato" className="py-20 bg-gradient-to-br from-[#1FA87A]/10 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Entre em Contato
              </h2>
              <p className="text-lg text-muted-foreground">
                Estamos prontos para conversar sobre como podemos apoiar sua instituição 
                na jornada rumo à qualidade clínica e governança sustentável.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#1FA87A]/10 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#1FA87A]" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">E-mail</p>
                    <a 
                      href="mailto:grupofluida@gmail.com" 
                      className="font-semibold text-foreground hover:text-[#1FA87A] transition-colors"
                    >
                      grupofluida@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button size="lg" asChild>
                  <a 
                    href="https://forms.gle/zEAZXbcQ5eCK1McbA" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Solicitar Orçamento
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="mailto:grupofluida@gmail.com">
                    <Mail className="mr-2 w-4 h-4" />
                    Enviar E-mail
                  </a>
                </Button>
              </div>
            </div>

            <div className="aspect-square bg-gradient-to-br from-[#1FA87A]/20 to-[#1FA87A]/5 rounded-2xl flex items-center justify-center hidden lg:flex">
              <div className="text-center space-y-4 p-8">
                <div className="w-32 h-32 bg-[#1FA87A] rounded-full flex items-center justify-center mx-auto">
                  <span className="text-5xl text-white font-bold">GF</span>
                </div>
                <p className="text-xl font-semibold text-foreground">
                  Grupo Fluida<br />Consultoria Clínica
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
