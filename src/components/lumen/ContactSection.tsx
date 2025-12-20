import { Button } from "@/components/ui/button";
import { Mail, ArrowRight, MessageCircle, Clock, CheckCircle2 } from "lucide-react";
const benefits = [{
  icon: Clock,
  text: "Resposta em até 24h"
}, {
  icon: MessageCircle,
  text: "Atendimento personalizado"
}, {
  icon: CheckCircle2,
  text: "Proposta sem compromisso"
}];
export function ContactSection() {
  return <section id="contato" className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-background to-primary/5" />
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div>
                <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                  Fale Conosco
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  Entre em Contato
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Estamos prontos para conversar sobre como podemos apoiar sua instituição 
                  na jornada rumo à qualidade clínica e governança sustentável.
                </p>
              </div>

              {/* Benefits */}
              <div className="flex flex-wrap gap-4">
                {benefits.map((benefit, index) => <div key={index} className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border">
                    <benefit.icon className="w-4 h-4 text-secondary" />
                    <span className="text-sm font-medium">{benefit.text}</span>
                  </div>)}
              </div>

              {/* Email Card */}
              <div className="p-6 bg-card rounded-2xl border border-border shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">E-mail</p>
                    <a href="mailto:grupofluida@gmail.com" className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                      grupofluida@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="group text-base px-8" asChild>
                  <a href="https://forms.gle/zEAZXbcQ5eCK1McbA" target="_blank" rel="noopener noreferrer">
                    Solicitar Orçamento
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="text-base px-8" asChild>
                  <a href="mailto:grupofluida@gmail.com">
                    <Mail className="mr-2 w-5 h-5" />
                    Enviar E-mail
                  </a>
                </Button>
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-2xl" />
              
              <div className="relative aspect-square bg-gradient-to-br from-card to-muted rounded-3xl flex items-center justify-center p-12 shadow-2xl border border-border/50">
                <div className="text-center space-y-6">
                  
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      Grupo Fluida
                    </p>
                    <p className="text-muted-foreground">
                      Consultoria Clínica
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 px-4 py-2 bg-card rounded-full shadow-lg border border-border flex items-center gap-2">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}