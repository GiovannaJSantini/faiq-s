import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Search, FileCheck, Play } from "lucide-react";

const steps = [
  {
    icon: FileText,
    number: "01",
    title: "Preenchimento do Formulário",
    description: "Preencha o formulário institucional com informações sobre sua clínica e necessidades."
  },
  {
    icon: Search,
    number: "02",
    title: "Análise Técnica",
    description: "Nossa equipe realiza análise técnica da solicitação para compreender o contexto institucional."
  },
  {
    icon: FileCheck,
    number: "03",
    title: "Definição de Escopo",
    description: "Elaboramos proposta personalizada com escopo, cronograma e investimento definidos."
  },
  {
    icon: Play,
    number: "04",
    title: "Início do Projeto",
    description: "Com a aprovação, iniciamos o projeto conforme cronograma acordado."
  }
];

export function HowToRequestSection() {
  return (
    <section id="solicitar" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Como Solicitar o Serviço
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Processo simples e transparente para iniciar sua jornada de qualidade clínica.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#1FA87A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-7 h-7 text-[#1FA87A]" />
                  </div>
                  <span className="text-xs font-bold text-[#1FA87A] mb-2 block">
                    PASSO {step.number}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)]">
                    <div className="border-t-2 border-dashed border-[#1FA87A]/30" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center bg-[#1FA87A]/5 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Pronto para elevar a qualidade clínica da sua instituição?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Preencha o formulário institucional e nossa equipe entrará em contato 
              para entender suas necessidades e apresentar as melhores soluções.
            </p>
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
          </div>
        </div>
      </div>
    </section>
  );
}
