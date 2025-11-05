import { Area, Clinic, Assessment } from '@/types/faiq';

export const faiqAreas: Area[] = [
  {
    id: '1',
    name: 'I. Jornada do Profissional',
    description: 'Avaliação da experiência e desenvolvimento profissional',
    categories: [
      {
        id: '1',
        name: '1. Recrutamento e Seleção',
        description: 'Processos de contratação e integração',
        indicators: [
          {
            id: '1-1',
            name: 'A organização possui descrições de cargos para cada posição, com qualificações mínimas, linhas de reportagem, hierarquia e deveres do cargo.',
            description: 'Descrições de cargos estruturadas',
            weight: 1
          },
          {
            id: '1-2',
            name: 'Possui uma matriz de cargos x salários estabelecidos de acordo com a descrição de cargos',
            description: 'Matriz de cargos e salários',
            weight: 1
          },
          {
            id: '1-3',
            name: 'Possui diretrizes claras para política de remuneração, mérito e promoção para seus profissionais',
            description: 'Políticas de remuneração',
            weight: 1
          }
        ]
      },
      {
        id: '2',
        name: '2. Onboarding Profissional',
        description: 'Integração de novos colaboradores',
        indicators: [
          {
            id: '2-1',
            name: 'Possui processo estruturado de integração para novos colaboradores',
            description: 'Processo de onboarding',
            weight: 1
          },
          {
            id: '2-2',
            name: 'Oferece treinamento inicial obrigatório sobre políticas e procedimentos da organização',
            description: 'Treinamento inicial',
            weight: 1
          },
          {
            id: '2-3',
            name: 'Define mentor ou supervisor responsável pelo acompanhamento inicial do novo colaborador',
            description: 'Sistema de mentoria',
            weight: 1
          }
        ]
      },
      {
        id: '3',
        name: '3. Cargos x Competências',
        description: 'Matriz de competências por cargo',
        indicators: [
          {
            id: '3-1',
            name: 'Possui matriz de competências técnicas e comportamentais para cada cargo',
            description: 'Matriz de competências',
            weight: 1
          },
          {
            id: '3-2',
            name: 'Define claramente os requisitos de formação e experiência para cada posição',
            description: 'Requisitos de cargo',
            weight: 1
          },
          {
            id: '3-3',
            name: 'Estabelece critérios objetivos para progressão de carreira',
            description: 'Critérios de progressão',
            weight: 1
          }
        ]
      },
      {
        id: '4',
        name: '4. Treinamentos',
        description: 'Capacitação profissional',
        indicators: [
          {
            id: '4-1',
            name: 'Possui plano anual de capacitação para todos os colaboradores',
            description: 'Plano de capacitação',
            weight: 1
          },
          {
            id: '4-2',
            name: 'Oferece treinamentos específicos para desenvolvimento técnico continuado',
            description: 'Treinamentos técnicos',
            weight: 1
          },
          {
            id: '4-3',
            name: 'Mantém registro de participação e aproveitamento em treinamentos',
            description: 'Registro de treinamentos',
            weight: 1
          }
        ]
      },
      {
        id: '5',
        name: '5. Desenvolvimento',
        description: 'Desenvolvimento profissional contínuo',
        indicators: [
          {
            id: '5-1',
            name: 'Realiza avaliações periódicas de desempenho dos colaboradores',
            description: 'Avaliações de desempenho',
            weight: 1
          },
          {
            id: '5-2',
            name: 'Oferece feedback estruturado e planos de desenvolvimento individual',
            description: 'Feedback e PDI',
            weight: 1
          },
          {
            id: '5-3',
            name: 'Possui sistema de reconhecimento e recompensa por performance',
            description: 'Sistema de reconhecimento',
            weight: 1
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'II. Jornada do Cliente',
    description: 'Experiência e cuidado centrado no paciente',
    categories: [
      {
        id: '6',
        name: '1. Admissão do Cliente',
        description: 'Processo de entrada e acolhimento inicial',
        indicators: [
          {
            id: '6-1',
            name: 'Possui diretrizes claras sobre o escopo de atendimento da clínica, e perfil de cliente que é atendido',
            description: 'Diretrizes de escopo',
            weight: 1
          },
          {
            id: '6-2',
            name: 'Possui diretrizes e processos para captação de leads',
            description: 'Processos de captação',
            weight: 1
          },
          {
            id: '6-3',
            name: 'Possui processo estruturado de triagem e avaliação inicial do cliente',
            description: 'Triagem estruturada',
            weight: 1
          }
        ]
      },
      {
        id: '7',
        name: '2. Onboarding & Avaliação Inicial',
        description: 'Processo de integração e avaliação inicial do cliente',
        indicators: [
          {
            id: '7-1',
            name: 'Possui processo padronizado de acolhimento do cliente e família',
            description: 'Acolhimento padronizado',
            weight: 1
          },
          {
            id: '7-2',
            name: 'Aplica instrumentos de avaliação inicial validados e apropriados',
            description: 'Instrumentos validados',
            weight: 1
          },
          {
            id: '7-3',
            name: 'Estabelece metas iniciais baseadas na avaliação realizada',
            description: 'Metas iniciais',
            weight: 1
          }
        ]
      },
      {
        id: '8',
        name: '3. Intervenção',
        description: 'Processo de intervenção terapêutica',
        indicators: [
          {
            id: '8-1',
            name: 'Desenvolve planos de intervenção individualizados baseados em evidências',
            description: 'Planos individualizados',
            weight: 1
          },
          {
            id: '8-2',
            name: 'Registra sistematicamente o progresso do cliente durante as sessões',
            description: 'Registro sistemático',
            weight: 1
          },
          {
            id: '8-3',
            name: 'Realiza ajustes no plano de intervenção baseados no progresso observado',
            description: 'Ajustes baseados em dados',
            weight: 1
          }
        ]
      },
      {
        id: '9',
        name: '4. Recursos Clínicos',
        description: 'Gestão de recursos e ambiente clínico',
        indicators: [
          {
            id: '9-1',
            name: 'Possui materiais e recursos adequados para diferentes tipos de intervenção',
            description: 'Recursos adequados',
            weight: 1
          },
          {
            id: '9-2',
            name: 'Mantém ambiente terapêutico apropriado e seguro para os atendimentos',
            description: 'Ambiente apropriado',
            weight: 1
          },
          {
            id: '9-3',
            name: 'Utiliza tecnologias e ferramentas que apoiam o processo terapêutico',
            description: 'Tecnologias de apoio',
            weight: 1
          }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'III. Cuidado Interdisciplinar',
    description: 'Integração e coordenação entre especialidades',
    categories: [
      {
        id: '10',
        name: '1. Diretrizes',
        description: 'Diretrizes de coordenação interdisciplinar',
        indicators: [
          {
            id: '10-1',
            name: 'Possui protocolos claros para comunicação entre diferentes especialidades',
            description: 'Protocolos de comunicação',
            weight: 1
          },
          {
            id: '10-2',
            name: 'Define papéis e responsabilidades de cada área profissional',
            description: 'Papéis definidos',
            weight: 1
          },
          {
            id: '10-3',
            name: 'Estabelece fluxos de trabalho integrados entre as especialidades',
            description: 'Fluxos integrados',
            weight: 1
          }
        ]
      },
      {
        id: '11',
        name: '2. Avaliação',
        description: 'Avaliação interdisciplinar',
        indicators: [
          {
            id: '11-1',
            name: 'Realiza avaliações multidisciplinares de forma coordenada',
            description: 'Avaliações coordenadas',
            weight: 1
          },
          {
            id: '11-2',
            name: 'Integra resultados de diferentes avaliações em um relatório único',
            description: 'Relatório integrado',
            weight: 1
          },
          {
            id: '11-3',
            name: 'Define consenso entre profissionais sobre diagnóstico e necessidades',
            description: 'Consenso profissional',
            weight: 1
          }
        ]
      },
      {
        id: '12',
        name: '3. Plano Individualizado',
        description: 'Planejamento integrado de intervenções',
        indicators: [
          {
            id: '12-1',
            name: 'Desenvolve planos de intervenção com participação de todas as especialidades envolvidas',
            description: 'Planos colaborativos',
            weight: 1
          },
          {
            id: '12-2',
            name: 'Define metas compartilhadas e complementares entre as áreas',
            description: 'Metas compartilhadas',
            weight: 1
          },
          {
            id: '12-3',
            name: 'Estabelece cronograma integrado de intervenções',
            description: 'Cronograma integrado',
            weight: 1
          }
        ]
      },
      {
        id: '13',
        name: '4. Rotinas de Qualidade',
        description: 'Práticas de qualidade interdisciplinar',
        indicators: [
          {
            id: '13-1',
            name: 'Realiza reuniões regulares de discussão de casos entre equipes',
            description: 'Reuniões de caso',
            weight: 1
          },
          {
            id: '13-2',
            name: 'Monitora a efetividade da comunicação interdisciplinar',
            description: 'Monitoramento de comunicação',
            weight: 1
          },
          {
            id: '13-3',
            name: 'Implementa melhorias baseadas no feedback das equipes',
            description: 'Melhoria contínua',
            weight: 1
          }
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'IV. Jornada dos Stakeholders',
    description: 'Relacionamento com partes interessadas',
    categories: [
      {
        id: '14',
        name: '1. Coordenação e Participação do Cuidador',
        description: 'Envolvimento de cuidadores',
        indicators: [
          {
            id: '14-1',
            name: 'Envolve cuidadores no planejamento e definição de metas terapêuticas',
            description: 'Participação de cuidadores',
            weight: 1
          },
          {
            id: '14-2',
            name: 'Oferece orientação e treinamento para cuidadores sobre estratégias de intervenção',
            description: 'Treinamento de cuidadores',
            weight: 1
          },
          {
            id: '14-3',
            name: 'Mantém comunicação regular com cuidadores sobre progresso e ajustes necessários',
            description: 'Comunicação com cuidadores',
            weight: 1
          }
        ]
      },
      {
        id: '15',
        name: '2. Parceria com Agência Financiadora',
        description: 'Relacionamento com operadoras',
        indicators: [
          {
            id: '15-1',
            name: 'Mantém comunicação clara e regular com operadoras de saúde',
            description: 'Comunicação com operadoras',
            weight: 1
          },
          {
            id: '15-2',
            name: 'Fornece documentação adequada e no prazo para autorização de procedimentos',
            description: 'Documentação adequada',
            weight: 1
          },
          {
            id: '15-3',
            name: 'Estabelece fluxos eficientes para renovação e continuidade de autorizações',
            description: 'Fluxos de autorização',
            weight: 1
          }
        ]
      }
    ]
  },
  {
    id: '5',
    name: 'V. Documentação Clínica',
    description: 'Gestão de documentação e registros',
    categories: [
      {
        id: '16',
        name: '1. Avaliação',
        description: 'Documentação de avaliações',
        indicators: [
          {
            id: '16-1',
            name: 'Utiliza instrumentos padronizados e validados para avaliação inicial',
            description: 'Instrumentos padronizados',
            weight: 1
          },
          {
            id: '16-2',
            name: 'Registra de forma completa e organizada os resultados das avaliações',
            description: 'Registro organizado',
            weight: 1
          },
          {
            id: '16-3',
            name: 'Estabelece hipóteses diagnósticas baseadas em evidências coletadas',
            description: 'Hipóteses baseadas em evidências',
            weight: 1
          }
        ]
      },
      {
        id: '17',
        name: '2. Intervenção',
        description: 'Documentação de intervenções',
        indicators: [
          {
            id: '17-1',
            name: 'Documenta planos de intervenção de forma clara e detalhada',
            description: 'Planos documentados',
            weight: 1
          },
          {
            id: '17-2',
            name: 'Registra sistematicamente as sessões e progresso do cliente',
            description: 'Registro de sessões',
            weight: 1
          },
          {
            id: '17-3',
            name: 'Mantém histórico organizado de todas as intervenções realizadas',
            description: 'Histórico organizado',
            weight: 1
          }
        ]
      },
      {
        id: '18',
        name: '3. Coleta e Análise de Dados',
        description: 'Gestão de dados clínicos',
        indicators: [
          {
            id: '18-1',
            name: 'Coleta dados de forma sistemática e consistente durante as sessões',
            description: 'Coleta sistemática',
            weight: 1
          },
          {
            id: '18-2',
            name: 'Analisa dados coletados para orientar tomada de decisões clínicas',
            description: 'Análise de dados',
            weight: 1
          },
          {
            id: '18-3',
            name: 'Utiliza gráficos e relatórios para visualizar progresso do cliente',
            description: 'Visualização de progresso',
            weight: 1
          }
        ]
      },
      {
        id: '19',
        name: '4. Alta e Interrupção do Tratamento',
        description: 'Processo de alta',
        indicators: [
          {
            id: '19-1',
            name: 'Estabelece critérios claros para alta e interrupção de tratamento',
            description: 'Critérios de alta',
            weight: 1
          },
          {
            id: '19-2',
            name: 'Elabora relatório final completo sobre evolução do cliente',
            description: 'Relatório final',
            weight: 1
          },
          {
            id: '19-3',
            name: 'Fornece orientações para continuidade do cuidado após alta',
            description: 'Orientações pós-alta',
            weight: 1
          }
        ]
      }
    ]
  },
  {
    id: '6',
    name: 'VI. Qualidade & Sustentabilidade',
    description: 'Gestão da qualidade e sustentabilidade',
    categories: [
      {
        id: '20',
        name: '1. Diretrizes Clínicas',
        description: 'Protocolos e diretrizes',
        indicators: [
          {
            id: '20-1',
            name: 'Possui protocolos clínicos baseados em evidências científicas atualizadas',
            description: 'Protocolos baseados em evidências',
            weight: 1
          },
          {
            id: '20-2',
            name: 'Define procedimentos padronizados para diferentes tipos de intervenção',
            description: 'Procedimentos padronizados',
            weight: 1
          },
          {
            id: '20-3',
            name: 'Mantém diretrizes atualizadas conforme evolução da área',
            description: 'Atualização de diretrizes',
            weight: 1
          }
        ]
      },
      {
        id: '21',
        name: '2. Treinamento das Diretrizes',
        description: 'Capacitação em protocolos',
        indicators: [
          {
            id: '21-1',
            name: 'Oferece treinamento inicial obrigatório sobre diretrizes clínicas',
            description: 'Treinamento inicial',
            weight: 1
          },
          {
            id: '21-2',
            name: 'Realiza atualizações periódicas sobre mudanças em protocolos',
            description: 'Atualizações periódicas',
            weight: 1
          },
          {
            id: '21-3',
            name: 'Avalia conhecimento e aplicação das diretrizes pelos profissionais',
            description: 'Avaliação de conhecimento',
            weight: 1
          }
        ]
      },
      {
        id: '22',
        name: '3. Monitoramento da Implementação',
        description: 'Monitoramento de conformidade',
        indicators: [
          {
            id: '22-1',
            name: 'Monitora regularmente a adesão às diretrizes clínicas estabelecidas',
            description: 'Monitoramento de adesão',
            weight: 1
          },
          {
            id: '22-2',
            name: 'Identifica desvios e implementa ações corretivas quando necessário',
            description: 'Ações corretivas',
            weight: 1
          },
          {
            id: '22-3',
            name: 'Mantém registros de conformidade com protocolos estabelecidos',
            description: 'Registros de conformidade',
            weight: 1
          }
        ]
      },
      {
        id: '23',
        name: '4. Dashboard sobre Fidelidade da Implementação',
        description: 'Monitoramento visual de qualidade',
        indicators: [
          {
            id: '23-1',
            name: 'Possui sistema de monitoramento em tempo real da fidelidade aos protocolos',
            description: 'Monitoramento em tempo real',
            weight: 1
          },
          {
            id: '23-2',
            name: 'Gera relatórios automáticos sobre conformidade com diretrizes',
            description: 'Relatórios automáticos',
            weight: 1
          },
          {
            id: '23-3',
            name: 'Utiliza indicadores visuais para facilitar acompanhamento da qualidade',
            description: 'Indicadores visuais',
            weight: 1
          }
        ]
      },
      {
        id: '24',
        name: '5. Medida de Qualidade do Serviço',
        description: 'Avaliação de qualidade',
        indicators: [
          {
            id: '24-1',
            name: 'Estabelece métricas claras para avaliação da qualidade dos serviços',
            description: 'Métricas de qualidade',
            weight: 1
          },
          {
            id: '24-2',
            name: 'Coleta feedback regular de clientes e familiares sobre satisfação',
            description: 'Feedback de clientes',
            weight: 1
          },
          {
            id: '24-3',
            name: 'Implementa melhorias baseadas em indicadores de qualidade identificados',
            description: 'Melhorias baseadas em dados',
            weight: 1
          }
        ]
      }
    ]
  },
  {
    id: '7',
    name: 'VII. Compliance',
    description: 'Conformidade legal e regulatória',
    categories: [
      {
        id: '25',
        name: '1. Políticas de Privacidade',
        description: 'Proteção de dados e privacidade',
        indicators: [
          {
            id: '25-1',
            name: 'Possui políticas claras de proteção de dados pessoais e de saúde',
            description: 'Políticas de proteção',
            weight: 1
          },
          {
            id: '25-2',
            name: 'Implementa medidas de segurança da informação adequadas',
            description: 'Segurança da informação',
            weight: 1
          },
          {
            id: '25-3',
            name: 'Treina colaboradores sobre políticas de privacidade e confidencialidade',
            description: 'Treinamento em privacidade',
            weight: 1
          }
        ]
      },
      {
        id: '26',
        name: '2. Proteção ao Paciente',
        description: 'Segurança do paciente',
        indicators: [
          {
            id: '26-1',
            name: 'Estabelece protocolos para garantir segurança física e emocional dos pacientes',
            description: 'Protocolos de segurança',
            weight: 1
          },
          {
            id: '26-2',
            name: 'Possui procedimentos para prevenção de situações de risco ou abuso',
            description: 'Prevenção de riscos',
            weight: 1
          },
          {
            id: '26-3',
            name: 'Mantém ambiente seguro e adequado para atendimento de diferentes perfis',
            description: 'Ambiente seguro',
            weight: 1
          }
        ]
      },
      {
        id: '27',
        name: '3. Requisitos Gerais e Responsabilidade Legal',
        description: 'Conformidade legal',
        indicators: [
          {
            id: '27-1',
            name: 'Cumpre todas as exigências legais para funcionamento da clínica',
            description: 'Conformidade legal',
            weight: 1
          },
          {
            id: '27-2',
            name: 'Mantém documentação legal atualizada e em conformidade',
            description: 'Documentação legal',
            weight: 1
          },
          {
            id: '27-3',
            name: 'Possui seguros e coberturas adequadas para proteção da organização',
            description: 'Seguros adequados',
            weight: 1
          }
        ]
      },
      {
        id: '28',
        name: '4. Ética, Integridade e Profissionalismo',
        description: 'Conduta ética',
        indicators: [
          {
            id: '28-1',
            name: 'Possui código de ética claro e conhecido por todos os colaboradores',
            description: 'Código de ética',
            weight: 1
          },
          {
            id: '28-2',
            name: 'Estabelece procedimentos para denúncia e apuração de questões éticas',
            description: 'Procedimentos éticos',
            weight: 1
          },
          {
            id: '28-3',
            name: 'Promove cultura organizacional baseada em integridade e profissionalismo',
            description: 'Cultura de integridade',
            weight: 1
          }
        ]
      },
      {
        id: '29',
        name: '5. Saúde, Segurança e Preparação para Emergências',
        description: 'Gestão de emergências',
        indicators: [
          {
            id: '29-1',
            name: 'Possui planos de emergência e procedimentos de segurança estabelecidos',
            description: 'Planos de emergência',
            weight: 1
          },
          {
            id: '29-2',
            name: 'Treina colaboradores para situações de emergência e primeiros socorros',
            description: 'Treinamento em emergências',
            weight: 1
          },
          {
            id: '29-3',
            name: 'Mantém equipamentos de segurança e emergência em bom funcionamento',
            description: 'Equipamentos de segurança',
            weight: 1
          }
        ]
      },
      {
        id: '30',
        name: '6. Mídia, Comunicação e Representação',
        description: 'Comunicação institucional',
        indicators: [
          {
            id: '30-1',
            name: 'Estabelece diretrizes claras para comunicação externa e uso de mídias sociais',
            description: 'Diretrizes de comunicação',
            weight: 1
          },
          {
            id: '30-2',
            name: 'Possui políticas para uso de imagem e informações de pacientes',
            description: 'Políticas de imagem',
            weight: 1
          },
          {
            id: '30-3',
            name: 'Mantém comunicação institucional consistente e profissional',
            description: 'Comunicação consistente',
            weight: 1
          }
        ]
      }
    ]
  },
  {
    id: '8',
    name: 'VIII. Diversidade, Equidade e Inclusão',
    description: 'Promoção de diversidade e inclusão',
    categories: [
      {
        id: '31',
        name: '1. Colaboradores',
        description: 'Diversidade na equipe',
        indicators: [
          {
            id: '31-1',
            name: 'Promove diversidade na contratação e composição das equipes',
            description: 'Diversidade na contratação',
            weight: 1
          },
          {
            id: '31-2',
            name: 'Oferece oportunidades iguais de desenvolvimento para todos os colaboradores',
            description: 'Oportunidades iguais',
            weight: 1
          },
          {
            id: '31-3',
            name: 'Estabelece políticas antidiscriminação e de respeito à diversidade',
            description: 'Políticas antidiscriminação',
            weight: 1
          }
        ]
      },
      {
        id: '32',
        name: '2. Treinamento',
        description: 'Capacitação em diversidade',
        indicators: [
          {
            id: '32-1',
            name: 'Oferece treinamentos sobre diversidade, equidade e inclusão',
            description: 'Treinamentos em DEI',
            weight: 1
          },
          {
            id: '32-2',
            name: 'Sensibiliza colaboradores sobre questões de preconceito e discriminação',
            description: 'Sensibilização',
            weight: 1
          },
          {
            id: '32-3',
            name: 'Promove cultura organizacional inclusiva e respeitosa',
            description: 'Cultura inclusiva',
            weight: 1
          }
        ]
      },
      {
        id: '33',
        name: '3. Plano Estratégico',
        description: 'Estratégia de diversidade',
        indicators: [
          {
            id: '33-1',
            name: 'Inclui metas de diversidade e inclusão no planejamento estratégico',
            description: 'Metas de DEI',
            weight: 1
          },
          {
            id: '33-2',
            name: 'Estabelece parcerias com organizações que promovem diversidade',
            description: 'Parcerias em DEI',
            weight: 1
          },
          {
            id: '33-3',
            name: 'Monitora indicadores de diversidade e inclusão na organização',
            description: 'Monitoramento de DEI',
            weight: 1
          }
        ]
      },
      {
        id: '34',
        name: '4. Clientes',
        description: 'Atendimento inclusivo',
        indicators: [
          {
            id: '34-1',
            name: 'Garante acesso equitativo aos serviços independente de background',
            description: 'Acesso equitativo',
            weight: 1
          },
          {
            id: '34-2',
            name: 'Adapta atendimento para diferentes necessidades culturais e linguísticas',
            description: 'Atendimento adaptado',
            weight: 1
          },
          {
            id: '34-3',
            name: 'Promove ambiente acolhedor e inclusivo para todos os clientes',
            description: 'Ambiente acolhedor',
            weight: 1
          }
        ]
      }
    ]
  },
  {
    id: '9',
    name: 'IX. Envolvimento com a Comunidade',
    description: 'Engajamento comunitário',
    categories: [
      {
        id: '35',
        name: '1. Comunidade Local',
        description: 'Participação local',
        indicators: [
          {
            id: '35-1',
            name: 'Participa ativamente de eventos e iniciativas da comunidade local',
            description: 'Participação comunitária',
            weight: 1
          },
          {
            id: '35-2',
            name: 'Oferece ações educativas e de conscientização para a comunidade',
            description: 'Ações educativas',
            weight: 1
          },
          {
            id: '35-3',
            name: 'Estabelece parcerias com organizações locais para projetos conjuntos',
            description: 'Parcerias locais',
            weight: 1
          }
        ]
      },
      {
        id: '36',
        name: '2. Comunidade Científica',
        description: 'Participação científica',
        indicators: [
          {
            id: '36-1',
            name: 'Participa de eventos científicos da área com apresentação de trabalhos',
            description: 'Participação em eventos',
            weight: 1
          },
          {
            id: '36-2',
            name: 'Publica pesquisas e estudos de caso em revistas científicas',
            description: 'Publicações científicas',
            weight: 1
          },
          {
            id: '36-3',
            name: 'Colabora com instituições de ensino e pesquisa da área',
            description: 'Colaborações acadêmicas',
            weight: 1
          }
        ]
      }
    ]
  },
  {
    id: '10',
    name: 'X. Operações Administrativas',
    description: 'Gestão administrativa e estratégica',
    categories: [
      {
        id: '37',
        name: '1. Gestão Financeira',
        description: 'Gestão financeira',
        indicators: [
          {
            id: '37-1',
            name: 'Possui controles financeiros adequados e atualizados',
            description: 'Controles financeiros',
            weight: 1
          },
          {
            id: '37-2',
            name: 'Realiza planejamento orçamentário anual com acompanhamento mensal',
            description: 'Planejamento orçamentário',
            weight: 1
          },
          {
            id: '37-3',
            name: 'Mantém fluxo de caixa organizado e relatórios gerenciais regulares',
            description: 'Fluxo de caixa',
            weight: 1
          }
        ]
      },
      {
        id: '38',
        name: '2. Princípios Orientadores',
        description: 'Valores organizacionais',
        indicators: [
          {
            id: '38-1',
            name: 'Possui missão, visão e valores claramente definidos e comunicados',
            description: 'Missão e valores',
            weight: 1
          },
          {
            id: '38-2',
            name: 'Alinha decisões organizacionais com princípios e valores estabelecidos',
            description: 'Alinhamento estratégico',
            weight: 1
          },
          {
            id: '38-3',
            name: 'Promove cultura organizacional consistente com princípios orientadores',
            description: 'Cultura organizacional',
            weight: 1
          }
        ]
      },
      {
        id: '39',
        name: '3. Governança',
        description: 'Estrutura de governança',
        indicators: [
          {
            id: '39-1',
            name: 'Possui estrutura de governança clara com papéis e responsabilidades definidos',
            description: 'Estrutura de governança',
            weight: 1
          },
          {
            id: '39-2',
            name: 'Realiza reuniões regulares de governança com documentação adequada',
            description: 'Reuniões de governança',
            weight: 1
          },
          {
            id: '39-3',
            name: 'Estabelece processos de tomada de decisão transparentes e eficazes',
            description: 'Processos decisórios',
            weight: 1
          }
        ]
      },
      {
        id: '40',
        name: '4. Plano Estratégico',
        description: 'Planejamento estratégico',
        indicators: [
          {
            id: '40-1',
            name: 'Possui plano estratégico formal com objetivos e metas claras',
            description: 'Planejamento estratégico',
            weight: 1
          },
          {
            id: '40-2',
            name: 'Realiza acompanhamento regular do progresso das metas estratégicas',
            description: 'Acompanhamento estratégico',
            weight: 1
          },
          {
            id: '40-3',
            name: 'Revisa e atualiza periodicamente o planejamento estratégico da organização',
            description: 'Atualização estratégica',
            weight: 1
          }
        ]
      }
    ]
  }
];

// Função para calcular classificação baseada na porcentagem
export const getClassification = (percentage: number): 'excelencia' | 'qualidade' | 'padrao' => {
  if (percentage >= 80) return 'excelencia';
  if (percentage >= 60) return 'qualidade';
  return 'padrao';
};

// Dados de exemplo para demonstração
export const sampleClinics: Clinic[] = [
  {
    id: 'clinic-1',
    name: 'Clínica São Lucas',
    location: 'São Paulo - SP',
    type: 'Especializada',
    assessments: []
  },
  {
    id: 'clinic-2',
    name: 'Centro Médico Esperança',
    location: 'Rio de Janeiro - RJ',
    type: 'Geral',
    assessments: []
  },
  {
    id: 'clinic-3',
    name: 'Hospital Santa Maria',
    location: 'Belo Horizonte - MG',
    type: 'Hospital',
    assessments: []
  }
];

// Enhanced sample assessments with multiple areas
export const sampleAssessments: Assessment[] = [
  {
    id: 'assess-1',
    clinicId: 'clinic-1',
    clinicName: 'Clínica São Lucas',
    assessmentDate: new Date('2024-01-15'),
    assessorName: 'Dr. João Silva',
    areaScores: [
      {
        areaId: 'area-1',
        categoryScores: [
          {
            categoryId: 'cat-1-1',
            indicatorScores: [
              { indicatorId: 'ind-1-1-1', score: 1 },
              { indicatorId: 'ind-1-1-2', score: 0.5 },
              { indicatorId: 'ind-1-1-3', score: 1 }
            ],
            totalScore: 2.5,
            maxScore: 3,
            percentage: 83.33
          },
          {
            categoryId: 'cat-1-2',
            indicatorScores: [
              { indicatorId: 'ind-1-2-1', score: 0.5 },
              { indicatorId: 'ind-1-2-2', score: 1 },
              { indicatorId: 'ind-1-2-3', score: 0.5 }
            ],
            totalScore: 2,
            maxScore: 3,
            percentage: 66.67
          },
          {
            categoryId: 'cat-1-3',
            indicatorScores: [
              { indicatorId: 'ind-1-3-1', score: 1 },
              { indicatorId: 'ind-1-3-2', score: 1 },
              { indicatorId: 'ind-1-3-3', score: 0.5 }
            ],
            totalScore: 2.5,
            maxScore: 3,
            percentage: 83.33
          }
        ],
        totalScore: 7,
        maxScore: 9,
        percentage: 77.78
      },
      {
        areaId: 'area-2',
        categoryScores: [
          {
            categoryId: 'cat-2-1',
            indicatorScores: [
              { indicatorId: 'ind-2-1-1', score: 1 },
              { indicatorId: 'ind-2-1-2', score: 0.5 },
              { indicatorId: 'ind-2-1-3', score: 1 },
              { indicatorId: 'ind-2-1-4', score: 0 },
              { indicatorId: 'ind-2-1-5', score: 1 },
              { indicatorId: 'ind-2-1-6', score: 1 },
              { indicatorId: 'ind-2-1-7', score: 0.5 },
              { indicatorId: 'ind-2-1-8', score: 1 },
              { indicatorId: 'ind-2-1-9', score: 1 },
              { indicatorId: 'ind-2-1-10', score: 0.5 },
              { indicatorId: 'ind-2-1-11', score: 0 },
              { indicatorId: 'ind-2-1-12', score: 1 },
              { indicatorId: 'ind-2-1-13', score: 0.5 }
            ],
            totalScore: 9,
            maxScore: 13,
            percentage: 69.23
          }
        ],
        totalScore: 9,
        maxScore: 13,
        percentage: 69.23
      },
      {
        areaId: 'area-3',
        categoryScores: [
          {
            categoryId: 'cat-3-1',
            indicatorScores: [
              { indicatorId: 'ind-3-1-1', score: 0.5 },
              { indicatorId: 'ind-3-1-2', score: 1 },
              { indicatorId: 'ind-3-1-3', score: 0 }
            ],
            totalScore: 1.5,
            maxScore: 3,
            percentage: 50
          },
          {
            categoryId: 'cat-3-2',
            indicatorScores: [
              { indicatorId: 'ind-3-2-1', score: 0 },
              { indicatorId: 'ind-3-2-2', score: 0.5 }
            ],
            totalScore: 0.5,
            maxScore: 2,
            percentage: 25
          }
        ],
        totalScore: 2,
        maxScore: 5,
        percentage: 40
      }
    ],
    totalScore: 18,
    maxScore: 27,
    overallPercentage: 66.67,
    classification: 'qualidade',
    status: 'concluida',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  }
];
