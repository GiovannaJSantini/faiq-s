import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Search, FileCheck, Play, Sparkles } from "lucide-react";

const steps = [
  {
    icon: FileText,
    number: "01",
    title: "Preenchimento do Formulário",
    description: "Preencha o formulário institucional com informações sobre sua clínica e necessidades.",
    color: "primary"
  },
  {
    icon: Search,
    number: "02",
    title: "Análise Técnica",
    description: "Nossa equipe realiza análise técnica da solicitação para compreender o contexto institucional.",
    color: "secondary"
  },
  {
    icon: FileCheck,
    number: "03",
    title: "Definição de Escopo",
    description: "Elaboramos proposta personalizada com escopo, cronograma e investimento definidos.",
    color: "accent"
  },
  {
    icon: Play,
    number: "04",
    title: "Início do Projeto",
    description: "Com a aprovação, iniciamos o projeto conforme cronograma acordado.",
    color: "success"
  }
];

const colorClasses = {
  primary: "bg-primary/10 text-primary border-primary/20",
  secondary: "bg-secondary/10 text-secondary border-secondary/20",
  accent: "bg-accent/10 text-accent border-accent/20",
  success: "bg-success/10 text-success border-success/20",
};

export function HowToRequestSection() {
  return (
    <section id="solicitar" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-sm font-medium rounded-full mb-4">
            Processo Simplificado
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Como Solicitar o Serviço
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Processo simples e transparente para iniciar sua jornada de qualidade clínica.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Steps Timeline */}
          <div className="relative">
            {/* Connection line - Desktop */}
            <div className="hidden lg:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary via-secondary to-success" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {steps.map((step, index) => (
                <div key={index} className="relative group">
                  <div className="text-center">
                    {/* Icon with ring */}
                    <div className="relative mx-auto mb-6">
                      <div className={`w-20 h-20 ${colorClasses[step.color as keyof typeof colorClasses]} rounded-2xl flex items-center justify-center mx-auto border-2 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <step.icon className="w-9 h-9" />
                      </div>
                      {/* Step number badge */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-foreground text-background rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                        {step.number}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 border border-border/50">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
            
            <div className="relative p-10 lg:p-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Comece Hoje</span>
              </div>
              
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                Pronto para elevar a qualidade clínica da sua instituição?
              </h3>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto text-lg">
                Preencha o formulário institucional e nossa equipe entrará em contato 
                para entender suas necessidades e apresentar as melhores soluções.
              </p>
              <Button size="lg" className="group text-base px-10 py-6" asChild>
                <a 
                  href="https://forms.gle/zEAZXbcQ5eCK1McbA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Solicitar Orçamento
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
