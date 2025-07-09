import { Area, Clinic, Assessment } from '@/types/faiq';

export const faiqAreas: Area[] = [
  {
    id: 'area-1',
    name: 'I. Jornada do Profissional',
    description: 'Avaliação da experiência e desenvolvimento profissional',
    categories: [
      {
        id: 'cat-1-1',
        name: '1. Recrutamento e Seleção',
        description: 'Processos de contratação e integração',
        indicators: [
          {
            id: 'ind-1-1-1',
            name: 'I.1.a - Processo estruturado de recrutamento',
            description: 'A organização possui processo formal e documentado para recrutamento e seleção de profissionais',
            weight: 1
          },
          {
            id: 'ind-1-1-2',
            name: 'I.1.b - Critérios técnicos definidos',
            description: 'Existem critérios claros e objetivos para seleção de profissionais baseados em competências técnicas',
            weight: 1
          },
          {
            id: 'ind-1-1-3',
            name: 'I.1.c - Programa de integração',
            description: 'A organização possui processo estruturado de onboarding para novos colaboradores',
            weight: 1
          }
        ]
      },
      {
        id: 'cat-1-2',
        name: '2. Desenvolvimento Profissional',
        description: 'Capacitação e crescimento profissional',
        indicators: [
          {
            id: 'ind-1-2-1',
            name: 'I.2.a - Plano de desenvolvimento individual',
            description: 'Cada profissional possui PDI estruturado com metas e prazos definidos',
            weight: 1
          },
          {
            id: 'ind-1-2-2',
            name: 'I.2.b - Programa de educação continuada',
            description: 'A organização oferece treinamentos regulares e atualizações técnicas',
            weight: 1
          },
          {
            id: 'ind-1-2-3',
            name: 'I.2.c - Avaliação de desempenho',
            description: 'Existe sistema regular de feedback e avaliação de desempenho profissional',
            weight: 1
          }
        ]
      },
      {
        id: 'cat-1-3',
        name: '3. Ambiente de Trabalho',
        description: 'Qualidade do ambiente e relações interpessoais',
        indicators: [
          {
            id: 'ind-1-3-1',
            name: 'I.3.a - Clima organizacional',
            description: 'A organização realiza pesquisa e monitoramento do clima organizacional',
            weight: 1
          },
          {
            id: 'ind-1-3-2',
            name: 'I.3.b - Comunicação interna',
            description: 'Existem canais efetivos de comunicação interna entre equipes',
            weight: 1
          },
          {
            id: 'ind-1-3-3',
            name: 'I.3.c - Reconhecimento e recompensas',
            description: 'A organização possui sistema de reconhecimento e recompensas profissionais',
            weight: 1
          }
        ]
      }
    ]
  },
  {
    id: 'area-2',
    name: 'II. Jornada do Cliente',
    description: 'Experiência e cuidado centrado no paciente',
    categories: [
      {
        id: 'cat-2-1',
        name: '1. Admissão do Cliente',
        description: 'Processo de entrada e acolhimento inicial',
        indicators: [
          {
            id: 'ind-2-1-1',
            name: 'II.1.a - Diretrizes claras sobre escopo de atendimento',
            description: 'Possui diretrizes claras sobre o escopo de atendimento da clínica, e perfil de cliente que é atendido',
            weight: 1
          },
          {
            id: 'ind-2-1-2',
            name: 'II.1.b - Processo para captação de leads',
            description: 'Possui diretrizes e processos para captação de leads',
            weight: 1
          },
          {
            id: 'ind-2-1-3',
            name: 'II.1.c - Triagem de novos clientes',
            description: 'Realiza processo de triagem de novos clientes com base no perfil da clínica e diretrizes',
            weight: 1
          },
          {
            id: 'ind-2-1-4',
            name: 'II.1.d - Coleta de dados sobre fila de espera',
            description: 'Coleta de dados sobre fila de espera',
            weight: 1
          },
          {
            id: 'ind-2-1-5',
            name: 'II.1.e - Comunicação clara aos clientes interessados',
            description: 'Comunica de forma clara aos clientes interessados no serviço da clínica como acessá-los',
            weight: 1
          },
          {
            id: 'ind-2-1-6',
            name: 'II.1.f - Diretrizes para início de serviços',
            description: 'Possui diretrizes e processo claros para início de serviços',
            weight: 1
          },
          {
            id: 'ind-2-1-7',
            name: 'II.1.g - Aplicação padronizada das diretrizes',
            description: 'Aplica as diretrizes para início dos serviços de forma padronizada para todos os clientes',
            weight: 1
          },
          {
            id: 'ind-2-1-8',
            name: 'II.1.h - Entrevista inicial com cliente',
            description: 'Realiza entrevista inicial com cliente interessado nos serviços',
            weight: 1
          },
          {
            id: 'ind-2-1-9',
            name: 'II.1.i - Autorização financeira antes da avaliação',
            description: 'Busca autorização dos serviços do responsável financeiro antes de iniciar o processo de avaliação',
            weight: 1
          },
          {
            id: 'ind-2-1-10',
            name: 'II.1.j - Consentimento informado',
            description: 'Identifica e obtém consentimento informado para início da avaliação e serviços clínicos',
            weight: 1
          },
          {
            id: 'ind-2-1-11',
            name: 'II.1.k - Verificação da equipe de atendimento',
            description: 'Verifica se a equipe de atendimento possui permissão, competência, tempo e recursos para atender o novo cliente',
            weight: 1
          },
          {
            id: 'ind-2-1-12',
            name: 'II.1.l - Documentação coordenada',
            description: 'Estabelece e coordenada documentação para início do atendimento (autorizações, controle de prestação de serviços)',
            weight: 1
          },
          {
            id: 'ind-2-1-13',
            name: 'II.1.m - Comunicação sobre onboarding',
            description: 'Comunica ao cliente tempo estimado do processo de onboarding, e oferece o guia do cliente com diretrizes, direitos e deveres',
            weight: 1
          }
        ]
      },
      {
        id: 'cat-2-2',
        name: '2. Onboarding & Avaliação Inicial',
        description: 'Processo de integração e avaliação inicial do cliente',
        indicators: [
          {
            id: 'ind-2-2-1',
            name: 'II.2.a - Onboarding no tempo estipulado',
            description: 'Realiza o processo de onboarding no tempo estipulado',
            weight: 1
          },
          {
            id: 'ind-2-2-2',
            name: 'II.2.c - Documentação prévia do cliente',
            description: 'Revisa documentação prévia do cliente (análise de avaliações prévias, documentação clínica, dados)',
            weight: 1
          },
          {
            id: 'ind-2-2-3',
            name: 'II.2.d - Escalas adaptativas',
            description: 'No processo de avaliação, faz uso de escalas adaptativas',
            weight: 1
          },
          {
            id: 'ind-2-2-4',
            name: 'II.2.e - Protocolos normativos baseados em evidências',
            description: 'Para o processo de avaliação, utiliza protocolos normativos de avaliações baseadas em evidências, coerentes com a idade cronológica do cliente, e ao seu nível de desenvolvimento',
            weight: 1
          },
          {
            id: 'ind-2-2-5',
            name: 'II.2.f - Avaliação de preferências',
            description: 'Coleta informações sobre as preferências do clientes e faz uso de avaliação de preferências',
            weight: 1
          },
          {
            id: 'ind-2-2-6',
            name: 'II.2.g - Diretrizes para avaliação funcional',
            description: 'Possui diretrizes claras para avaliação funcional e análise funcional',
            weight: 1
          },
          {
            id: 'ind-2-2-7',
            name: 'II.2.h - Análise funcional com consentimento',
            description: 'Quando necessário, conduz análise funcional garantindo consentimento informado, e equipe treinada para tal prática',
            weight: 1
          },
          {
            id: 'ind-2-2-8',
            name: 'II.2.i - Relatório padronizado',
            description: 'Possui um relatório de devolutiva de avaliação padronizado, com descrição dos resultados, indicação de tipos de serviços, indicação de carga horária, supervisão, responsável parental, e local de atendimento',
            weight: 1
          },
          {
            id: 'ind-2-2-9',
            name: 'II.2.j - Cumprimento da carga horária',
            description: 'Faz esforços para cumprir a carga horária recomendada na avaliação clínica',
            weight: 1
          }
        ]
      },
      {
        id: 'cat-2-3',
        name: '3. Intervenção',
        description: 'Processo de intervenção terapêutica',
        indicators: [
          {
            id: 'ind-2-3-1',
            name: 'II.3.a - Objetivos claros e mensuráveis',
            description: 'Com base nos resultados da avaliação, cria objetivos claros, completos e mensuráveis, apropriados ao nível de desenvolvimento e idade',
            weight: 1
          },
          {
            id: 'ind-2-3-2',
            name: 'II.3.b - Reagendamento correto',
            description: 'Programa e reagenda o cliente em tempo indicado e correto (de acordo com a diretriz)',
            weight: 1
          },
          {
            id: 'ind-2-3-3',
            name: 'II.3.c - Práticas baseadas em evidência',
            description: 'Utiliza práticas baseadas em evidência para desenvolver o plano de intervenção',
            weight: 1
          },
          {
            id: 'ind-2-3-4',
            name: 'II.3.d - Treinamento de supervisão',
            description: 'Fornece treinamento de supervisão apropriadas para ensino de procedimentos que serão utilizados no plano de tratamento do cliente para a equipe responsável',
            weight: 1
          },
          {
            id: 'ind-2-3-5',
            name: 'II.3.e - Implementação do plano',
            description: 'Implementa o plano de intervenção de acordo com a descrição do protocolo de ensino e/ou redução de comportamentos',
            weight: 1
          },
          {
            id: 'ind-2-3-6',
            name: 'II.3.f - Coleta e análise de dados',
            description: 'Coleta e monitora dados individuais de clientes e faz análise sistemática dos mesmos para tomar decisões sobre a intervenção',
            weight: 1
          },
          {
            id: 'ind-2-3-7',
            name: 'II.3.g - Generalização e manutenção',
            description: 'Programa o ensino para generalização e manutenção de habilidades',
            weight: 1
          },
          {
            id: 'ind-2-3-8',
            name: 'II.3.h - Revisão sistemática do plano',
            description: 'Faz a revisão do plano de intervenção de forma sistematizada',
            weight: 1
          },
          {
            id: 'ind-2-3-9',
            name: 'II.3.i - Supervisão proporcional',
            description: 'Executa a carga horária de supervisão proporcional à carga terapêutica dos casos, conforme melhores práticas da área',
            weight: 1
          }
        ]
      },
      {
        id: 'cat-2-4',
        name: '4. Recursos Clínicos',
        description: 'Gestão de recursos e ambiente clínico',
        indicators: [
          {
            id: 'ind-2-4-1',
            name: 'II.4.a - Avaliação de satisfação do cliente',
            description: 'Conduz avaliação da satisfação do cliente de forma sistematizada e frequência adequada',
            weight: 1
          },
          {
            id: 'ind-2-4-2',
            name: 'II.4.b - Ambiente seguro para atendimento',
            description: 'Em ambiente clínicos de atendimento, a organização faz esforços para manter o local de prestação de serviços seguro, com disponibilidade de materiais necessários para o atendimento programado do cliente',
            weight: 1
          },
          {
            id: 'ind-2-4-3',
            name: 'II.4.c - Coordenação entre especialidades',
            description: 'A organização possui rotinas de atendimento que promovem a coordenação do cuidado entre as especialidades',
            weight: 1
          },
          {
            id: 'ind-2-4-4',
            name: 'II.4.d - Diretrizes para alta e transferência',
            description: 'Possui diretrizes claras e processos para alta e também transferência do caso para equipe interna e/ou externa',
            weight: 1
          }
        ]
      }
    ]
  },
  {
    id: 'area-3',
    name: 'III. Gestão de Processos',
    description: 'Eficiência e qualidade dos processos organizacionais',
    categories: [
      {
        id: 'cat-3-1',
        name: '1. Mapeamento de Processos',
        description: 'Documentação e padronização de processos',
        indicators: [
          {
            id: 'ind-3-1-1',
            name: 'III.1.a - Processos mapeados e documentados',
            description: 'A organização possui documentação completa dos processos críticos de trabalho',
            weight: 1
          },
          {
            id: 'ind-3-1-2',
            name: 'III.1.b - Indicadores de processo definidos',
            description: 'Existem métricas de monitoramento definidas para os processos principais',
            weight: 1
          },
          {
            id: 'ind-3-1-3',
            name: 'III.1.c - Revisão periódica dos processos',
            description: 'Os processos são revisados e atualizados periodicamente',
            weight: 1
          }
        ]
      },
      {
        id: 'cat-3-2',
        name: '2. Controle de Qualidade',
        description: 'Sistemas de controle e garantia da qualidade',
        indicators: [
          {
            id: 'ind-3-2-1',
            name: 'III.2.a - Sistema de auditoria interna',
            description: 'A organização possui sistema estruturado de auditoria interna',
            weight: 1
          },
          {
            id: 'ind-3-2-2',
            name: 'III.2.b - Planos de ação corretiva',
            description: 'Existem planos de ação para correção de não conformidades identificadas',
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
