import { Building2, Hospital, GraduationCap, Network } from "lucide-react";

const clientTypes = [
  {
    icon: Building2,
    title: "Clínicas e Centros ABA",
    description: "Instituições especializadas em análise do comportamento aplicada"
  },
  {
    icon: Hospital,
    title: "Hospitais e Redes de Saúde",
    description: "Organizações de saúde com atendimento multiprofissional"
  },
  {
    icon: GraduationCap,
    title: "Instituições Educacionais",
    description: "Escolas e centros educacionais com foco em inclusão"
  },
  {
    icon: Network,
    title: "Redes de Atendimento",
    description: "Operadoras e redes integradas de serviços para TEA"
  }
];

export function ClientsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Perfil dos Nossos Clientes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trabalhamos com organizações comprometidas com a excelência no atendimento à população TEA
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {clientTypes.map((client, index) => (
            <div key={index} className="text-center p-6 border border-border rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#1FA87A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <client.icon className="w-8 h-8 text-[#1FA87A]" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{client.title}</h3>
              <p className="text-sm text-muted-foreground">{client.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
