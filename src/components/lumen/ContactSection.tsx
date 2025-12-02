import { Button } from "@/components/ui/button";
import { Mail, Phone, Calendar } from "lucide-react";

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
                Estamos prontos para conversar sobre como podemos apoiar sua organização 
                na jornada rumo à excelência clínica e desenvolvimento sustentável.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#1FA87A]/10 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#1FA87A]" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">E-mail</p>
                    <p className="font-semibold text-foreground">contato@lumen.com.br</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#1FA87A]/10 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#1FA87A]" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Telefone</p>
                    <p className="font-semibold text-foreground">+55 (11) 99999-9999</p>
                  </div>
                </div>
              </div>

              <Button size="lg" className="mt-6">
                <Calendar className="mr-2 w-5 h-5" />
                Agendar Conversa Inicial
              </Button>
            </div>

            <div className="aspect-square bg-gradient-to-br from-[#1FA87A]/20 to-[#F28C28]/20 rounded-2xl flex items-center justify-center">
              <div className="text-center space-y-4 p-8">
                <div className="w-32 h-32 bg-[#1FA87A] rounded-full flex items-center justify-center mx-auto">
                  <span className="text-5xl text-white font-bold">L</span>
                </div>
                <p className="text-xl font-semibold text-foreground">
                  Vamos Construir Juntos<br />a Excelência
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
