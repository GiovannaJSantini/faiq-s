import { CheckCircle, Monitor, Building, Users } from "lucide-react";

const topics = [
  "ABA Aplicada e Protocolos Clínicos",
  "Interdisciplinaridade e Trabalho em Equipe",
  "Fidedignidade Clínica e Coleta de Dados",
  "Engajamento e Motivação de Equipes",
  "Gestão Clínica e Tomada de Decisão",
  "Indicadores de Qualidade e Performance"
];

const formats = [
  { icon: Monitor, label: "Online", description: "Plataforma interativa com conteúdo ao vivo" },
  { icon: Building, label: "In-company", description: "Treinamentos customizados na sua organização" },
  { icon: Users, label: "Presencial", description: "Workshops e palestras com facilitação especializada" }
];

export function TrainingsSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Treinamentos, Workshops e Palestras
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Capacitação técnica especializada para elevar o nível de competência das suas equipes
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Tópicos */}
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
              Principais Temas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topics.map((topic, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-background rounded-lg">
                  <CheckCircle className="w-5 h-5 text-[#1FA87A] flex-shrink-0 mt-0.5" />
                  <p className="text-foreground">{topic}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Formatos */}
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
              Formatos Flexíveis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {formats.map((format, index) => (
                <div key={index} className="text-center p-6 bg-background rounded-lg">
                  <div className="w-16 h-16 bg-[#1FA87A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <format.icon className="w-8 h-8 text-[#1FA87A]" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">{format.label}</h4>
                  <p className="text-sm text-muted-foreground">{format.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
