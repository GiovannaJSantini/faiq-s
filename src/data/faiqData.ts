import { Area, Clinic, Assessment } from '@/types/faiq';

export const faiqAreas: Area[] = [
  {
    id: 'area-1',
    name: 'I. Jornada do Profissional',
    description: 'Avaliação da experiência e desenvolvimento profissional',
    categories: [
      {
        id: 'cat-1-1',
        name: 'Recrutamento e Seleção',
        description: 'Processos de contratação e integração',
        indicators: [
          {
            id: 'ind-1-1-1',
            name: 'Processo estruturado de recrutamento',
            description: 'Existência de processo formal e documentado',
            weight: 1
          },
          {
            id: 'ind-1-1-2',
            name: 'Critérios técnicos definidos',
            description: 'Critérios claros para seleção de profissionais',
            weight: 1
          },
          {
            id: 'ind-1-1-3',
            name: 'Programa de integração',
            description: 'Processo estruturado de onboarding',
            weight: 1
          }
        ]
      },
      {
        id: 'cat-1-2',
        name: 'Desenvolvimento Profissional',
        description: 'Capacitação e crescimento profissional',
        indicators: [
          {
            id: 'ind-1-2-1',
            name: 'Plano de desenvolvimento individual',
            description: 'PDI estruturado para cada profissional',
            weight: 1
          },
          {
            id: 'ind-1-2-2',
            name: 'Programa de educação continuada',
            description: 'Treinamentos regulares e atualizações técnicas',
            weight: 1
          },
          {
            id: 'ind-1-2-3',
            name: 'Avaliação de desempenho',
            description: 'Sistema regular de feedback e avaliação',
            weight: 1
          }
        ]
      },
      {
        id: 'cat-1-3',
        name: 'Ambiente de Trabalho',
        description: 'Qualidade do ambiente e relações interpessoais',
        indicators: [
          {
            id: 'ind-1-3-1',
            name: 'Clima organizacional',
            description: 'Pesquisa e monitoramento do clima',
            weight: 1
          },
          {
            id: 'ind-1-3-2',
            name: 'Comunicação interna',
            description: 'Canais efetivos de comunicação',
            weight: 1
          },
          {
            id: 'ind-1-3-3',
            name: 'Reconhecimento e recompensas',
            description: 'Sistema de reconhecimento profissional',
            weight: 1
          }
        ]
      }
    ]
  },
  {
    id: 'area-2',
    name: 'II. Jornada do Paciente',
    description: 'Experiência e cuidado centrado no paciente',
    categories: [
      {
        id: 'cat-2-1',
        name: 'Acesso e Acolhimento',
        description: 'Facilidade de acesso e qualidade do acolhimento',
        indicators: [
          {
            id: 'ind-2-1-1',
            name: 'Agendamento eficiente',
            description: 'Sistema ágil e acessível de marcação',
            weight: 1
          },
          {
            id: 'ind-2-1-2',
            name: 'Protocolo de acolhimento',
            description: 'Processo padronizado de recepção',
            weight: 1
          },
          {
            id: 'ind-2-1-3',
            name: 'Tempo de espera adequado',
            description: 'Controle e redução dos tempos de espera',
            weight: 1
          }
        ]
      },
      {
        id: 'cat-2-2',
        name: 'Assistência Clínica',
        description: 'Qualidade do cuidado clínico',
        indicators: [
          {
            id: 'ind-2-2-1',
            name: 'Protocolos clínicos',
            description: 'Protocolos baseados em evidências',
            weight: 1
          },
          {
            id: 'ind-2-2-2',
            name: 'Continuidade do cuidado',
            description: 'Coordenação entre diferentes níveis',
            weight: 1
          },
          {
            id: 'ind-2-2-3',
            name: 'Segurança do paciente',
            description: 'Práticas de segurança implementadas',
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
        name: 'Mapeamento de Processos',
        description: 'Documentação e padronização de processos',
        indicators: [
          {
            id: 'ind-3-1-1',
            name: 'Processos mapeados',
            description: 'Documentação completa dos processos',
            weight: 1
          },
          {
            id: 'ind-3-1-2',
            name: 'Indicadores de processo',
            description: 'Métricas de monitoramento definidas',
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

// Avaliações de exemplo
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
      }
    ],
    totalScore: 7,
    maxScore: 9,
    overallPercentage: 77.78,
    classification: 'qualidade',
    status: 'concluida',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'assess-2',
    clinicId: 'clinic-2',
    clinicName: 'Centro Médico Esperança',
    assessmentDate: new Date('2024-01-20'),
    assessorName: 'Dra. Maria Santos',
    areaScores: [
      {
        areaId: 'area-1',
        categoryScores: [
          {
            categoryId: 'cat-1-1',
            indicatorScores: [
              { indicatorId: 'ind-1-1-1', score: 1 },
              { indicatorId: 'ind-1-1-2', score: 1 },
              { indicatorId: 'ind-1-1-3', score: 1 }
            ],
            totalScore: 3,
            maxScore: 3,
            percentage: 100
          },
          {
            categoryId: 'cat-1-2',
            indicatorScores: [
              { indicatorId: 'ind-1-2-1', score: 1 },
              { indicatorId: 'ind-1-2-2', score: 1 },
              { indicatorId: 'ind-1-2-3', score: 0.5 }
            ],
            totalScore: 2.5,
            maxScore: 3,
            percentage: 83.33
          },
          {
            categoryId: 'cat-1-3',
            indicatorScores: [
              { indicatorId: 'ind-1-3-1', score: 1 },
              { indicatorId: 'ind-1-3-2', score: 1 },
              { indicatorId: 'ind-1-3-3', score: 1 }
            ],
            totalScore: 3,
            maxScore: 3,
            percentage: 100
          }
        ],
        totalScore: 8.5,
        maxScore: 9,
        percentage: 94.44
      }
    ],
    totalScore: 8.5,
    maxScore: 9,
    overallPercentage: 94.44,
    classification: 'excelencia',
    status: 'concluida',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  }
];