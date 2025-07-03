import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, Users, Target, Shield, ClipboardCheck, Heart, Scale, UserCheck, Globe, Building } from "lucide-react";

const faiqData = [
  {
    id: 1,
    area: "I. Jornada do Profissional",
    description: "Descrição de cargo, requerimentos mínimos, condições da contratação (e.g., CLT, PJ), treinamento inicial e continuado, performance management.",
    icon: Users,
    color: "bg-blue-50 border-blue-200",
    categories: [
      {
        name: "1. Recrutamento e Seleção",
        description: "Estrutura de processo e roteiro de entrevistas alinhadas com a necessidade de cada cargo"
      },
      {
        name: "2. Onboarding Profissional", 
        description: "Processo de entrada do profissional, com treinamento básico inicial"
      },
      {
        name: "3. Cargos x Competências",
        description: "Descrição de cargos e requisitos técnicos para cada cargo"
      },
      {
        name: "4. Treinamentos",
        description: "Iniciais e continuado, plano de carreira."
      },
      {
        name: "5. Desenvolvimento",
        description: "Sistema de avaliação, práticas de feedback, acompanhamento de performance de desenvolvimento do profissional"
      }
    ]
  },
  {
    id: 2,
    area: "II. Jornada do Cliente",
    description: "Identificação do público alvo, screening, intake e avaliação inicial, plano de intervenção, acompanhamento do progresso, reavaliação e transição.",
    icon: Heart,
    color: "bg-primary/5 border-primary/20",
    categories: [
      {
        name: "1. Admissão do Cliente",
        description: "Processo inicial de entrada do paciente na clínica, incluindo triagem, coleta de dados e formalização do vínculo."
      },
      {
        name: "2. Onboarding & Avaliação Inicial",
        description: "Etapas de acolhimento e aplicação de instrumentos clínicos para conhecer o perfil do paciente e planejar o tratamento."
      },
      {
        name: "3. Intervenção",
        description: "Execução dos procedimentos terapêuticos individualizados com base no plano de tratamento."
      },
      {
        name: "4. Recursos Clínicos",
        description: "Ferramentas, materiais, tecnologias e protocolos utilizados para apoiar e qualificar o atendimento clínico."
      }
    ]
  },
  {
    id: 3,
    area: "III. Cuidado Interdisciplinar",
    description: "Interno (entre especialidades) e externo (médicos, família, escola).",
    icon: Target,
    color: "bg-accent/10 border-accent/30",
    categories: [
      {
        name: "1. Diretrizes",
        description: "Normas e orientações integradas que organizam a atuação conjunta das diferentes especialidades clínicas."
      },
      {
        name: "2. Avaliação",
        description: "Processo colaborativo entre áreas para identificar necessidades do paciente de forma ampla e complementar."
      },
      {
        name: "3. Plano individualizado",
        description: "Documento construído em conjunto pelas especialidades, com metas e estratégias integradas para o desenvolvimento do paciente."
      },
      {
        name: "4. Rotinas de qualidade",
        description: "Práticas sistemáticas de monitoramento, comunicação e ajustes que garantem a coerência e eficácia do trabalho interdisciplinar."
      }
    ]
  },
  {
    id: 4,
    area: "IV. Jornada dos Stakeholders",
    description: "Contratação, feedback do progresso dos clientes.",
    icon: UserCheck,
    color: "bg-details/10 border-details/30",
    categories: [
      {
        name: "1. Coordenação e Participação do Cuidador",
        description: "Envolve o engajamento de cuidadores na definição de metas, acompanhamento da intervenção e colaboração nas generalizações do tratamento fora do ambiente clínico."
      },
      {
        name: "2. Parceria com agência financiadora",
        description: "Comunicação, envio de documentos e alinhamento contínuo entre clínica e operadora de saúde para garantir a continuidade e a qualidade do atendimento autorizado."
      }
    ]
  },
  {
    id: 5,
    area: "V. Documentação Clínica",
    description: "Modelos padronizados e procedimentos para registros clínicos, relatórios e coleta de dados.",
    icon: FileText,
    color: "bg-green-50 border-green-200",
    categories: [
      {
        name: "1. Avaliação",
        description: "Registro estruturado dos instrumentos aplicados, resultados obtidos e hipóteses iniciais sobre o repertório e as necessidades do cliente."
      },
      {
        name: "2. Intervenção",
        description: "Documentação das metas, estratégias terapêuticas, procedimentos adotados e ajustes realizados ao longo do tratamento."
      },
      {
        name: "3. Coleta e Análise de Dado",
        description: "Registros sistemáticos do desempenho do paciente nas sessões, acompanhados da análise clínica para tomada de decisões baseadas em evidências."
      },
      {
        name: "4. Alta e Interrupção do Tratamento",
        description: "Relatório final que descreve a evolução do paciente, critérios para encerramento ou pausa do tratamento e orientações para continuidade ou encaminhamento."
      }
    ]
  },
  {
    id: 6,
    area: "VI. Qualidade & Sustentabilidade",
    description: "Qualidade, efetividade e fidelidade do tratamento baseado em evidências.",
    icon: ClipboardCheck,
    color: "bg-yellow-50 border-yellow-200",
    categories: [
      {
        name: "1. Diretrizes Clínicas",
        description: "Conjunto de procedimentos padronizados que orientam a prática dos profissionais da clínica, garantindo segurança, eficácia e alinhamento com a ciência ABA."
      },
      {
        name: "2. Treinamento das Diretrizes",
        description: "Processo de capacitação contínua da equipe clínica para assegurar o domínio e a aplicação correta das diretrizes. Inclui formação inicial, reciclagens, supervisão direta e uso de checklists ou materiais instrutivos."
      },
      {
        name: "3. Monitoramento da implementação",
        description: "Acompanhamento sistemático da adesão dos profissionais às diretrizes clínicas nas sessões."
      },
      {
        name: "4. Dash sobre fidegnidade da implementação",
        description: "Ferramenta visual que apresenta indicadores em tempo real sobre o grau de conformidade entre o plano de intervenção e sua execução prática."
      },
      {
        name: "5. Medida de qualidade do serviço",
        description: "Indicadores quantitativos e qualitativos que avaliam a eficácia, satisfação, organização e impacto do serviço prestado."
      }
    ]
  },
  {
    id: 7,
    area: "VII. Compliance",
    description: "Requierimentos dos planos de saúde, escolas e steakholders. Compliance com organizações regulamentárias (internas da profissão e externa - governamentais).",
    icon: Shield,
    color: "bg-red-50 border-red-200",
    categories: [
      {
        name: "1. Políticas de Privacidade",
        description: "Segurança da informação e conformidade com normas de proteção de dados de saúde."
      },
      {
        name: "2. Proteção ao Paciente",
        description: "Práticas que garantem a segurança, privacidade e dignidade dos pacientes durante o atendimento."
      },
      {
        name: "3. Requisitos Gerais e Responsabilidade Legal",
        description: "Exigências legais e éticas que asseguram o funcionamento regular e responsável da clínica."
      },
      {
        name: "4. Ética, Integridade e Profissionalismo",
        description: "Protocolos para segurança, emergência, proteção de dados e ambiente físico."
      },
      {
        name: "5. Saúde, Segurança e Preparação para Emergências",
        description: "Protocolos de segurança, primeiros socorros, transporte e gerenciamento de crises."
      },
      {
        name: "6. Mídia, Comunicação e Representação",
        description: "Práticas relacionadas à divulgação de serviços, redes sociais e uso da imagem dos pacientes."
      }
    ]
  },
  {
    id: 8,
    area: "VIII. Diversidade, Equidade e Inclusão",
    description: "Ações para promover ambiente inclusivo, acessível e representativo.",
    icon: Users,
    color: "bg-purple-50 border-purple-200",
    categories: [
      {
        name: "1. Colaboradores",
        description: "Oportunidades para colaboradores de backgrounds diversos fazerem parte da organização."
      },
      {
        name: "2. Treinamento",
        description: "Treinamento sobre diversidade, equidade e inclusão para colaboradores."
      },
      {
        name: "3. Plano estratégico",
        description: "Parceria com a comunidade para aumentar a representação de colaboradores e clientes com backgrounds diversos."
      },
      {
        name: "4. Clientes",
        description: "Oportunidade de acesso a serviços para cliente com backgrounds diversos."
      }
    ]
  },
  {
    id: 9,
    area: "IX. Envolvimento com a Comunidade",
    description: "Educação, acesso social, envolvimento com comunidade local e científica.",
    icon: Globe,
    color: "bg-indigo-50 border-indigo-200",
    categories: [
      {
        name: "1. Comunidade local",
        description: "Promoção de eventos em conjunto ou em prol da comunidade local."
      },
      {
        name: "2. Comunidade científica",
        description: "Produção de trabalhos a serem apresentados em eventos científicos ou publicados em revistas científicas."
      }
    ]
  },
  {
    id: 10,
    area: "X. Operações Administrativas",
    description: "Governança, estrutura organizacional, políticas institucionais e contratos.",
    icon: Building,
    color: "bg-gray-50 border-gray-200",
    categories: [
      {
        name: "1. Gestão financeira",
        description: "Conjunto de práticas voltadas ao planejamento, controle e análise dos recursos financeiros da clínica, assegurando sustentabilidade."
      },
      {
        name: "2. Princípios orientadores",
        description: "Valores e diretrizes éticas que norteiam a atuação da clínica, influenciando decisões e cultura organizacional."
      },
      {
        name: "3. Governança",
        description: "Estrutura de liderança e tomada de decisão que define responsabilidades, processos e garante conformidade com leis e ética."
      },
      {
        name: "4. Plano estratégico",
        description: "Documento que estabelece os objetivos de longo prazo da clínica, metas mensuráveis e ações concretas para alcançar crescimento, impacto social e excelência nos serviços."
      }
    ]
  }
];

const IndicadoresFaiq = () => {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Ferramenta de Avaliação de Indicadores de Qualidade (FAIQ) - v.1
        </h1>
        <p className="text-lg text-muted-foreground">
          Mapeamento de Operações, Diretrizes, e Indicadores de Qualidades Clínicas para Serviços Interdisciplinares ao Atendimento de Autistas
        </p>
      </div>

      <div className="space-y-6">
        {faiqData.map((area) => {
          const IconComponent = area.icon;
          return (
            <Card key={area.id} className={`${area.color} hover:shadow-medium transition-shadow`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  {area.area}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {area.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary" className="bg-white/70">
                      {area.categories.length} categorias
                    </Badge>
                  </div>
                  
                  <div className="grid gap-4">
                    {area.categories.map((category, index) => (
                      <div key={index} className="bg-white/50 rounded-lg p-4 border border-white/20">
                        <h4 className="font-semibold text-foreground mb-2">
                          {category.name}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {category.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-gradient-primary text-white">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            Sistema Completo de Avaliação
          </CardTitle>
          <CardDescription className="text-center text-white/80">
            A FAIQ oferece uma avaliação abrangente com 10 áreas principais, 
            cobrindo todos os aspectos essenciais para a qualidade dos serviços interdisciplinares 
            no atendimento a pessoas com autismo.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};

export default IndicadoresFaiq;