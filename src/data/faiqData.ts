import { Area, Clinic, Assessment } from '@/types/faiq';

export const faiqAreas: Area[] = [
  {
    id: '1',
    name: 'Área 1: Jornada do Profissional',
    description: 'Gestão da experiência e desenvolvimento profissional',
    categories: [
      {
        id: '1-1',
        name: '1. Recrutamento e Seleção',
        description: 'Processos de contratação e integração',
        indicators: [
          {
            id: 'I.1.a',
            code: 'I.1.a',
            name: 'A organização possui descrições de cargos para cada posição, com qualificações mínimas, linhas de reportagem, hierarquia e deveres do cargo.',
            description: 'Descrições de cargos estruturadas',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'I.1.b',
            code: 'I.1.b',
            name: 'Possui uma matriz de cargos x salários estabelecidos de acordo com a descrição de cargos',
            description: 'Matriz de cargos e salários',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'I.1.c',
            code: 'I.1.c',
            name: 'Possui diretrizes claras para política de remuneração, mérito e promoção para seus profissionais',
            description: 'Políticas de remuneração',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'I.1.d',
            code: 'I.1.d',
            name: 'Possui perguntas padronizadas para triagem e entrevistas de profissionais alinhadas a descrição de cargos',
            description: 'Triagem e entrevistas padronizadas',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'I.1.e',
            code: 'I.1.e',
            name: 'Possui diretrizes descritas para o processo de contratação',
            description: 'Diretrizes de contratação',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'I.1.f',
            code: 'I.1.f',
            name: 'Possui uma carta de oferta padronizada e específicos da organização para contratação de novos profissionais',
            description: 'Carta de oferta padronizada',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'I.1.g',
            code: 'I.1.g',
            name: 'Realiza a verificação de antecedentes estaduais e federais',
            description: 'Verificação de antecedentes',
            weight: 1,
            classification: 'padrao'
          }
        ]
      },
      {
        id: '1-2',
        name: '2. Onboarding Profissional',
        description: 'Integração de novos colaboradores',
        indicators: [
          {
            id: 'I.2.a',
            code: 'I.2.a',
            name: 'Os processo de onboarding clínico e administrativo estão descritos, e a clínica faz uso do mesmo em sua prática organizacional',
            description: 'Processo de onboarding estruturado',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'I.2.b',
            code: 'I.2.b',
            name: 'Possui diretrizes claras e material necessário para o treinamento técnico inicial de novos profissionais clínicos',
            description: 'Treinamento técnico inicial',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'I.2.c',
            code: 'I.2.c',
            name: 'O treinamento inicial para novos profissionais clínicos ocorre de acordo com as diretrizes',
            description: 'Implementação do treinamento',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'I.2.d',
            code: 'I.2.d',
            name: 'Possui um processo de avaliação de competências do profissional após o treinamento inicial, antes do início dos atendimentos',
            description: 'Avaliação de competências',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'I.2.e',
            code: 'I.2.e',
            name: 'Possui um manual do colaborador conforme legislação e diretrizes da organização',
            description: 'Manual do colaborador',
            weight: 1,
            classification: 'padrao'
          }
        ]
      },
      {
        id: '1-3',
        name: '3. Cargos x Competências',
        description: 'Matriz de competências por cargo',
        indicators: [
          {
            id: 'I.3.a',
            code: 'I.3.a',
            name: 'Possui diretores clínicos com certificação de nível avançado e experiência comprovada em gestão e clínica',
            description: 'Diretores clínicos qualificados',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'I.3.b',
            code: 'I.3.b',
            name: 'Possui supervisores ABA com nível de especialista na área, e experiência em supervisão comprovada',
            description: 'Supervisores ABA qualificados',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'I.3.c',
            code: 'I.3.c',
            name: 'Possui supervisores interdisciplinares com nível de especialista na área, e experiência em supervisão comprovada',
            description: 'Supervisores interdisciplinares qualificados',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'I.3.d',
            code: 'I.3.d',
            name: 'Possui profissionais de atendimento direto com certificação aplicável aos requisitos da legislação vigente Ex. CRP, CRF etc.',
            description: 'Profissionais certificados',
            weight: 1,
            classification: 'padrao'
          }
        ]
      },
      {
        id: '1-4',
        name: '4. Treinamentos',
        description: 'Capacitação profissional',
        indicators: [
          {
            id: 'I.4.a',
            code: 'I.4.a',
            name: 'A organização garante que todos os funcionários recebem treinamento específico para suas áreas e cargos',
            description: 'Treinamento específico',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'I.4.b',
            code: 'I.4.b',
            name: 'A organização realiza treinamentos para prevenção e manejo de crises agressivas de forma contínua',
            description: 'Treinamento de manejo de crises',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'I.4.c',
            code: 'I.4.c',
            name: 'Possui diretrizes claras e processos estabelecidos para educação continuada e com métricas de desempenho',
            description: 'Educação continuada',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'I.4.d',
            code: 'I.4.d',
            name: 'Os profissionais recebem supervisão regular, de acordo com as melhores práticas e diretrizes da área',
            description: 'Supervisão regular',
            weight: 1,
            classification: 'padrao'
          }
        ]
      },
      {
        id: '1-5',
        name: '5. Desenvolvimento',
        description: 'Crescimento e progressão profissional',
        indicators: [
          {
            id: 'I.5.a',
            code: 'I.5.a',
            name: 'Possui sistemas de avaliação de performance e monitoramento, bem como planos de desenvolvimento individual documentados para profissionais',
            description: 'Avaliação de performance',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'I.5.b',
            code: 'I.5.b',
            name: 'Realiza feedback formal e "on the job" regularmente',
            description: 'Feedback regular',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'I.5.c',
            code: 'I.5.c',
            name: 'Realiza avaliação de satisfação dos funcionários e faz esforços para colocar planos de ações de melhorias com foco na resolução de queixas',
            description: 'Avaliação de satisfação',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'I.5.d',
            code: 'I.5.d',
            name: 'Possui um plano de sucessão para lideranças estruturado',
            description: 'Plano de sucessão',
            weight: 1,
            classification: 'excelencia'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Área 2: Jornada do Cliente',
    description: 'Experiência e cuidado ao cliente',
    categories: [
      {
        id: '2-1',
        name: '1. Admissão do Cliente',
        description: 'Processo de admissão e início de serviços',
        indicators: [
          {
            id: 'II.1.a',
            code: 'II.1.a',
            name: 'Possui diretrizes claras sobre o escopo de atendimento da clínica, e perfil de cliente que é atendido',
            description: 'Escopo e perfil de atendimento',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'II.1.b',
            code: 'II.1.b',
            name: 'Possui diretrizes e processos para captação de leads',
            description: 'Captação de leads',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'II.1.c',
            code: 'II.1.c',
            name: 'Realiza processo de triagem de novos clientes com base no perfil da clínica e diretrizes',
            description: 'Triagem de clientes',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'II.1.d',
            code: 'II.1.d',
            name: 'Coleta de dados sobre fila de espera',
            description: 'Gestão de fila de espera',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'II.1.e',
            code: 'II.1.e',
            name: 'Comunica de forma clara aos clientes interessados no serviço da clínica como acessá-los',
            description: 'Comunicação sobre acesso',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'II.1.f',
            code: 'II.1.f',
            name: 'Possui diretrizes e processo claros para início de serviços',
            description: 'Diretrizes de início de serviços',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'II.1.g',
            code: 'II.1.g',
            name: 'Aplica as diretrizes para início dos serviços de forma padronizada para todos os clientes',
            description: 'Padronização do início',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'II.1.h',
            code: 'II.1.h',
            name: 'Realiza entrevista inicial com cliente interessado nos serviços',
            description: 'Entrevista inicial',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'II.1.i',
            code: 'II.1.i',
            name: 'Busca autorização dos serviços do responsável financeiro antes de iniciar o processo de avaliação',
            description: 'Autorização financeira',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'II.1.j',
            code: 'II.1.j',
            name: 'Identifica e obtém consentimento informado para início da avaliação e serviços clínicos',
            description: 'Consentimento informado',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'II.1.k',
            code: 'II.1.k',
            name: 'Verifica se a equipe de atendimento possui permissão, competência, tempo e recursos para atender o novo cliente',
            description: 'Verificação de capacidade',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'II.1.l',
            code: 'II.1.l',
            name: 'Estabelece e coordena documentação para início do atendimento',
            description: 'Documentação de início',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'II.1.m',
            code: 'II.1.m',
            name: 'Comunica ao cliente tempo estimado do processo de onboarding e oferece guia do cliente',
            description: 'Comunicação de onboarding',
            weight: 1,
            classification: 'qualidade'
          }
        ]
      },
      {
        id: '2-2',
        name: '2. Onboarding & Avaliação Inicial',
        description: 'Processo de avaliação inicial',
        indicators: [
          {
            id: 'II.2.a',
            code: 'II.2.a',
            name: 'Realiza o processo de onboarding no tempo estipulado',
            description: 'Onboarding no prazo',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'II.2.c',
            code: 'II.2.c',
            name: 'Revisa documentação prévia do cliente',
            description: 'Revisão de documentação',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'II.2.d',
            code: 'II.2.d',
            name: 'No processo de avaliação, faz uso de escalas adaptativas',
            description: 'Escalas adaptativas',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'II.2.e',
            code: 'II.2.e',
            name: 'Utiliza protocolos normativos baseados em evidências conforme idade e desenvolvimento',
            description: 'Protocolos baseados em evidência',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'II.2.f',
            code: 'II.2.f',
            name: 'Coleta preferências do cliente e usa avaliação de preferências',
            description: 'Avaliação de preferências',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'II.2.g',
            code: 'II.2.g',
            name: 'Possui diretrizes claras para avaliação funcional e análise funcional',
            description: 'Diretrizes de avaliação funcional',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'II.2.h',
            code: 'II.2.h',
            name: 'Conduz análise funcional com consentimento informado e equipe treinada',
            description: 'Análise funcional',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'II.2.i',
            code: 'II.2.i',
            name: 'Possui relatório de devolutiva de avaliação padronizado',
            description: 'Relatório de devolutiva',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'II.2.j',
            code: 'II.2.j',
            name: 'Faz esforços para cumprir carga horária recomendada',
            description: 'Carga horária recomendada',
            weight: 1,
            classification: 'qualidade'
          }
        ]
      },
      {
        id: '2-3',
        name: '3. Intervenção',
        description: 'Planejamento e execução da intervenção',
        indicators: [
          {
            id: 'II.3.a',
            code: 'II.3.a',
            name: 'Cria objetivos claros, completos e mensuráveis',
            description: 'Objetivos mensuráveis',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'II.3.b',
            code: 'II.3.b',
            name: 'Programa e reavalia o cliente no tempo indicado',
            description: 'Reavaliação programada',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'II.3.c',
            code: 'II.3.c',
            name: 'Utiliza práticas baseadas em evidência',
            description: 'Práticas baseadas em evidência',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'II.3.d',
            code: 'II.3.d',
            name: 'Fornece treinamento de supervisão apropriada à equipe',
            description: 'Treinamento de supervisão',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'II.3.e',
            code: 'II.3.e',
            name: 'Implementa o plano de intervenção conforme protocolo',
            description: 'Implementação do plano',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'II.3.f',
            code: 'II.3.f',
            name: 'Coleta e monitora dados, realizando análise sistemática',
            description: 'Coleta e análise de dados',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'II.3.g',
            code: 'II.3.g',
            name: 'Programa ensino para generalização e manutenção',
            description: 'Generalização e manutenção',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'II.3.h',
            code: 'II.3.h',
            name: 'Faz revisão sistematizada do plano de intervenção',
            description: 'Revisão do plano',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'II.3.i',
            code: 'II.3.i',
            name: 'Executa carga horária de supervisão proporcional',
            description: 'Carga horária de supervisão',
            weight: 1,
            classification: 'qualidade'
          }
        ]
      },
      {
        id: '2-4',
        name: '4. Recursos Clínicos',
        description: 'Recursos e infraestrutura clínica',
        indicators: [
          {
            id: 'II.4.a',
            code: 'II.4.a',
            name: 'Conduz avaliação de satisfação do cliente sistematizada',
            description: 'Avaliação de satisfação',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'II.4.b',
            code: 'II.4.b',
            name: 'Mantém ambiente seguro e com materiais necessários',
            description: 'Ambiente seguro',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'II.4.c',
            code: 'II.4.c',
            name: 'Possui rotinas que promovem coordenação do cuidado',
            description: 'Coordenação do cuidado',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'II.4.d',
            code: 'II.4.d',
            name: 'Possui diretrizes claras para alta e transferência de caso',
            description: 'Diretrizes de alta',
            weight: 1,
            classification: 'excelencia'
          }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Área 3: Cuidado Interdisciplinar',
    description: 'Integração e colaboração entre disciplinas',
    categories: [
      {
        id: '3-1',
        name: '1. Diretrizes',
        description: 'Diretrizes de interdisciplinaridade',
        indicators: [
          {
            id: 'III.1.a',
            code: 'III.1.a',
            name: 'Diretriz geral de interdisciplinaridade',
            description: 'Diretriz de interdisciplinaridade',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'III.1.b',
            code: 'III.1.b',
            name: 'Treinamento sobre diretriz para todos os profissionais',
            description: 'Treinamento interdisciplinar',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'III.1.c',
            code: 'III.1.c',
            name: 'Diretriz para avaliação interdisciplinar',
            description: 'Avaliação interdisciplinar',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'III.1.d',
            code: 'III.1.d',
            name: 'Diretriz para desenvolvimento de plano interdisciplinar',
            description: 'Plano interdisciplinar',
            weight: 1,
            classification: 'qualidade'
          }
        ]
      },
      {
        id: '3-2',
        name: '2. Avaliação',
        description: 'Processo de avaliação interdisciplinar',
        indicators: [
          {
            id: 'III.2.a',
            code: 'III.2.a',
            name: 'Roteiro de entrevista de interdisciplinaridade',
            description: 'Roteiro de entrevista',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'III.2.b',
            code: 'III.2.b',
            name: 'Avaliação coordenada com todos os profissionais envolvidos',
            description: 'Avaliação coordenada',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'III.2.c',
            code: 'III.2.c',
            name: 'Co-utilização de ferramentas de avaliação',
            description: 'Ferramentas compartilhadas',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'III.2.d',
            code: 'III.2.d',
            name: 'Relatório de devolutiva único',
            description: 'Relatório único',
            weight: 1,
            classification: 'excelencia'
          }
        ]
      },
      {
        id: '3-3',
        name: '3. Plano Individualizado',
        description: 'Planejamento integrado',
        indicators: [
          {
            id: 'III.3.a',
            code: 'III.3.a',
            name: 'Objetivos têm colaboração',
            description: 'Objetivos colaborativos',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'III.3.b',
            code: 'III.3.b',
            name: 'Plano individualizado único com todas as disciplinas',
            description: 'Plano único',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'III.3.c',
            code: 'III.3.c',
            name: 'Objetivos comuns',
            description: 'Objetivos compartilhados',
            weight: 1,
            classification: 'excelencia'
          }
        ]
      },
      {
        id: '3-4',
        name: '4. Rotinas de Qualidade',
        description: 'Monitoramento e qualidade interdisciplinar',
        indicators: [
          {
            id: 'III.4.a',
            code: 'III.4.a',
            name: 'Existe revisão de pares',
            description: 'Revisão de pares',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'III.4.b',
            code: 'III.4.b',
            name: 'Existem medidas de progresso comuns',
            description: 'Medidas de progresso',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'III.4.c',
            code: 'III.4.c',
            name: 'Existe dashboard para qualidade interdisciplinar',
            description: 'Dashboard interdisciplinar',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'III.4.d',
            code: 'III.4.d',
            name: 'Reavaliação conjunta',
            description: 'Reavaliação conjunta',
            weight: 1,
            classification: 'excelencia'
          }
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'Área 4: Jornada do Stakeholder',
    description: 'Engajamento de cuidadores e parceiros',
    categories: [
      {
        id: '4-1',
        name: '1. Coordenação e Participação do Cuidador',
        description: 'Envolvimento e comunicação com cuidadores',
        indicators: [
          {
            id: 'IV.1.a',
            code: 'IV.1.a',
            name: 'Antes do início da intervenção, a clínica comunica o cliente sobre canais de reclamação e denúncia',
            description: 'Canais de comunicação',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'IV.1.b',
            code: 'IV.1.b',
            name: 'Possui política sobre práticas não baseadas em evidências',
            description: 'Política baseada em evidência',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'IV.1.c',
            code: 'IV.1.c',
            name: 'Realiza o trabalho de educação dos cuidadores sobre seu impacto terapêutico',
            description: 'Educação de cuidadores',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'IV.1.d',
            code: 'IV.1.d',
            name: 'Possui um sistema claro que prioriza o envolvimento dos cuidadores no planejamento terapêutico',
            description: 'Envolvimento no planejamento',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'IV.1.e',
            code: 'IV.1.e',
            name: 'Define metas mínimas de participação dos cuidadores',
            description: 'Metas de participação',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'IV.1.f',
            code: 'IV.1.f',
            name: 'Faz esforços para gerar envolvimento dos cuidadores na implementação do tratamento',
            description: 'Envolvimento na implementação',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'IV.1.g',
            code: 'IV.1.g',
            name: 'Documenta a participação (ou ausência) do cuidador no tratamento, de maneira sistematizada',
            description: 'Documentação de participação',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'IV.1.h',
            code: 'IV.1.h',
            name: 'Faz esforços para colaborar com outros profissionais da equipe terapêutica',
            description: 'Colaboração com equipe',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'IV.1.i',
            code: 'IV.1.i',
            name: 'Mede de forma regular a satisfação do cliente e resolve insatisfações',
            description: 'Medição de satisfação',
            weight: 1,
            classification: 'qualidade'
          }
        ]
      },
      {
        id: '4-2',
        name: '2. Parceria com agência financiadora',
        description: 'Gestão de relacionamento com financiadores',
        indicators: [
          {
            id: 'IV.2.a',
            code: 'IV.2.a',
            name: 'Descrição dos requisitos das agências financiadoras',
            description: 'Requisitos de financiadores',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'IV.2.b',
            code: 'IV.2.b',
            name: 'Remuneração sustentável',
            description: 'Sustentabilidade financeira',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'IV.2.c',
            code: 'IV.2.c',
            name: 'Notifica imediatamente a família sobre mudanças financeiras e políticas',
            description: 'Comunicação de mudanças',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'IV.2.e',
            code: 'IV.2.e',
            name: 'Monitora requerimentos, contratos e pagamentos das instituições credenciadas',
            description: 'Monitoramento de contratos',
            weight: 1,
            classification: 'padrao'
          }
        ]
      }
    ]
  },
  {
    id: '5',
    name: 'Área 5: Documentação Clínica',
    description: 'Padronização e qualidade documental',
    categories: [
      {
        id: '5-1',
        name: '1. Avaliação',
        description: 'Documentação de avaliação',
        indicators: [
          {
            id: 'V.1.a',
            code: 'V.1.a',
            name: 'Possui modelo padronizado para atividades de avaliação',
            description: 'Modelo de atividades',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'V.1.b',
            code: 'V.1.b',
            name: 'Possui modelo padronizado de relatório de avaliação',
            description: 'Relatório padronizado',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'V.1.c',
            code: 'V.1.c',
            name: 'Na reavaliação, segue modelos padrão de atividades e relatórios',
            description: 'Padrão de reavaliação',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'V.1.d',
            code: 'V.1.d',
            name: 'Possui protocolo descritivo de avaliação de preferências, políticas de uso e frequência',
            description: 'Protocolo de preferências',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'V.1.e',
            code: 'V.1.e',
            name: 'Possui modelo padronizado para atividades de análise funcional',
            description: 'Modelo de análise funcional',
            weight: 1,
            classification: 'qualidade'
          }
        ]
      },
      {
        id: '5-2',
        name: '2. Intervenção',
        description: 'Documentação de intervenção',
        indicators: [
          {
            id: 'V.2.a',
            code: 'V.2.a',
            name: 'Possui modelo padronizado de plano de tratamento/progresso',
            description: 'Plano de tratamento',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'V.2.b',
            code: 'V.2.b',
            name: 'Possui plano de tratamento com descrição tecnológica do ensino por habilidade e meta',
            description: 'Descrição tecnológica',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'V.2.c',
            code: 'V.2.c',
            name: 'Participação e definição de objetivos parentais descritas e atualizadas no planejamento',
            description: 'Objetivos parentais',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'V.2.d',
            code: 'V.2.d',
            name: 'Possui modelo padronizado de registro/notas de supervisão',
            description: 'Notas de supervisão',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'V.2.e',
            code: 'V.2.e',
            name: 'Possui modelo padronizado para registro/notas de caso para profissionais de cuidado direto',
            description: 'Notas de caso',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'V.2.f',
            code: 'V.2.f',
            name: 'Possui protocolo de conduta para manejo comportamental',
            description: 'Protocolo de manejo',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'V.2.g',
            code: 'V.2.g',
            name: 'Possui modelo padronizado de relatório de supervisão',
            description: 'Relatório de supervisão',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'V.2.h',
            code: 'V.2.h',
            name: 'Possui modelo padronizado de relatório de orientação parental',
            description: 'Relatório de orientação',
            weight: 1,
            classification: 'excelencia'
          }
        ]
      },
      {
        id: '5-3',
        name: '3. Coleta e Análise de Dados',
        description: 'Gestão de dados clínicos',
        indicators: [
          {
            id: 'V.3.a',
            code: 'V.3.a',
            name: 'Realiza coleta diária de dados via sistemas ou papel',
            description: 'Coleta diária de dados',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'V.3.b',
            code: 'V.3.b',
            name: 'Gera gráficos como resultado da coleta diária',
            description: 'Geração de gráficos',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'V.3.c',
            code: 'V.3.c',
            name: 'Realiza análise dos dados por inspeção visual, com documentação da análise',
            description: 'Análise visual de dados',
            weight: 1,
            classification: 'excelencia'
          }
        ]
      },
      {
        id: '5-4',
        name: '4. Alta e Interrupção do Tratamento',
        description: 'Documentação de encerramento',
        indicators: [
          {
            id: 'V.4.a',
            code: 'V.4.a',
            name: 'Possui modelo padronizado de relatório de alta',
            description: 'Relatório de alta',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'V.4.b',
            code: 'V.4.b',
            name: 'Possui modelo padronizado de relatório para interrupção/transferência',
            description: 'Relatório de interrupção',
            weight: 1,
            classification: 'qualidade'
          }
        ]
      }
    ]
  },
  {
    id: '6',
    name: 'Área 6: Qualidade & Sustentabilidade',
    description: 'Gestão de qualidade e melhoria contínua',
    categories: [
      {
        id: '6-1',
        name: '1. Diretrizes Clínicas',
        description: 'Protocolos e procedimentos clínicos',
        indicators: [
          {
            id: 'VI.1.a',
            code: 'VI.1.a',
            name: 'Diretrizes para aceitar clientes',
            description: 'Diretrizes de aceitação',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'VI.1.b',
            code: 'VI.1.b',
            name: 'Diretrizes para avaliação inicial/reavaliação',
            description: 'Diretrizes de avaliação',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VI.1.c',
            code: 'VI.1.c',
            name: 'Diretrizes para análise funcional',
            description: 'Diretrizes de análise funcional',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'VI.1.d',
            code: 'VI.1.d',
            name: 'Diretrizes para treinamento inicial do profissional',
            description: 'Diretrizes de treinamento',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VI.1.e',
            code: 'VI.1.e',
            name: 'Diretrizes para elaboração de plano de tratamento',
            description: 'Diretrizes de plano',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VI.1.f',
            code: 'VI.1.f',
            name: 'Diretrizes para treinamento de pais',
            description: 'Diretrizes de treinamento parental',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'VI.1.g',
            code: 'VI.1.g',
            name: 'Diretrizes para coleta de dados',
            description: 'Diretrizes de coleta',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VI.1.h',
            code: 'VI.1.h',
            name: 'Diretrizes para supervisão de caso',
            description: 'Diretrizes de supervisão',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VI.1.i',
            code: 'VI.1.i',
            name: 'Diretrizes para análise de dados',
            description: 'Diretrizes de análise',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'VI.1.j',
            code: 'VI.1.j',
            name: 'Diretrizes para serviços em ambiente natural',
            description: 'Diretrizes de ambiente natural',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VI.1.k',
            code: 'VI.1.k',
            name: 'Diretrizes para revisão de caso',
            description: 'Diretrizes de revisão',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'VI.1.l',
            code: 'VI.1.l',
            name: 'Diretrizes para gerenciamento de performance da equipe',
            description: 'Diretrizes de performance',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'VI.1.m',
            code: 'VI.1.m',
            name: 'Diretrizes clínicas para cuidado interdisciplinar',
            description: 'Diretrizes interdisciplinares',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'VI.1.n',
            code: 'VI.1.n',
            name: 'Diretrizes clínicas específicas para cada especialidade',
            description: 'Diretrizes por especialidade',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VI.1.o',
            code: 'VI.1.o',
            name: 'Diretrizes para alta ou interrupção do tratamento',
            description: 'Diretrizes de alta',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'VI.1.p',
            code: 'VI.1.p',
            name: 'Diretrizes para agendamento, remanejamento e reposição',
            description: 'Diretrizes de agendamento',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VI.1.q',
            code: 'VI.1.q',
            name: 'Diretrizes para Telesaúde',
            description: 'Diretrizes de telesaúde',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VI.1.r',
            code: 'VI.1.r',
            name: 'Diretrizes de contratação de profissionais clínicos',
            description: 'Diretrizes de contratação',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VI.1.s',
            code: 'VI.1.s',
            name: 'Diretrizes para Saúde e Segurança',
            description: 'Diretrizes de segurança',
            weight: 1,
            classification: 'padrao'
          }
        ]
      },
      {
        id: '6-2',
        name: '2. Treinamento das Diretrizes',
        description: 'Capacitação sobre procedimentos',
        indicators: [
          {
            id: 'VI.2.a',
            code: 'VI.2.a',
            name: 'Treinamento desenvolvido',
            description: 'Treinamento estruturado',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'VI.2.b',
            code: 'VI.2.b',
            name: 'Medidas de sucesso do treinamento',
            description: 'Medição de eficácia',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'VI.2.c',
            code: 'VI.2.c',
            name: 'Programa de reciclagem do treinamento',
            description: 'Reciclagem periódica',
            weight: 1,
            classification: 'excelencia'
          }
        ]
      },
      {
        id: '6-3',
        name: '3. Monitoramento da Implementação',
        description: 'Auditoria de conformidade',
        indicators: [
          {
            id: 'VI.3.a',
            code: 'VI.3.a',
            name: 'Checklist da implementação de diretrizes',
            description: 'Checklist de conformidade',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'VI.3.b',
            code: 'VI.3.b',
            name: 'Retreino diante de discrepâncias',
            description: 'Retreino corretivo',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'VI.3.c',
            code: 'VI.3.c',
            name: 'Revisão regular das diretrizes',
            description: 'Revisão periódica',
            weight: 1,
            classification: 'qualidade'
          }
        ]
      },
      {
        id: '6-4',
        name: '4. Dash sobre Fidedignidade da Implementação',
        description: 'Indicadores de qualidade',
        indicators: [
          {
            id: 'VI.4.a',
            code: 'VI.4.a',
            name: 'Taxa de Implementação de Procedimentos Clínicos',
            description: 'Taxa de implementação',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'VI.4.b',
            code: 'VI.4.b',
            name: 'Taxa de Supervisão Clínica',
            description: 'Taxa de supervisão',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'VI.4.c',
            code: 'VI.4.c',
            name: 'Adesão a Documentos e Protocolos de Planejamento',
            description: 'Adesão a protocolos',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'VI.4.d',
            code: 'VI.4.d',
            name: 'Taxa de Conformidade nos Registros Clínicos',
            description: 'Conformidade de registros',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'VI.4.e',
            code: 'VI.4.e',
            name: 'Aderência a Protocolos de Avaliação',
            description: 'Aderência a avaliação',
            weight: 1,
            classification: 'excelencia'
          }
        ]
      },
      {
        id: '6-5',
        name: '5. Medida de Qualidade do Serviço',
        description: 'Métricas e dashboards',
        indicators: [
          {
            id: 'VI.5.a',
            code: 'VI.5.a',
            name: 'Identificação de medidas de qualidade',
            description: 'Identificação de métricas',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'VI.5.b',
            code: 'VI.5.b',
            name: 'Identificação da fonte do dado para importação',
            description: 'Fonte de dados',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'VI.5.c',
            code: 'VI.5.c',
            name: 'Auditoria da qualidade do dado importado',
            description: 'Auditoria de dados',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'VI.5.d',
            code: 'VI.5.d',
            name: 'Dashboards com diferentes filtros',
            description: 'Dashboards interativos',
            weight: 1,
            classification: 'excelencia'
          }
        ]
      }
    ]
  },
  {
    id: '7',
    name: 'Área 7: Compliance',
    description: 'Conformidade legal e ética',
    categories: [
      {
        id: '7-1',
        name: '1. Políticas de Privacidade',
        description: 'LGPD e proteção de dados',
        indicators: [
          {
            id: 'VII.1.a',
            code: 'VII.1.a',
            name: 'Entrega prévia do aviso de privacidade ao cuidador',
            description: 'Aviso de privacidade',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VII.1.b',
            code: 'VII.1.b',
            name: 'Comunicação eletrônica compatível com a LGPD',
            description: 'Comunicação segura',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VII.1.c',
            code: 'VII.1.c',
            name: 'Armazenamento compatível com LGPD',
            description: 'Armazenamento seguro',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VII.1.d',
            code: 'VII.1.d',
            name: 'Política e procedimentos de violação de dados',
            description: 'Procedimentos de incidente',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'VII.1.e',
            code: 'VII.1.e',
            name: 'Treinamento sobre LGPD na admissão e anualmente',
            description: 'Treinamento LGPD',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'VII.1.f',
            code: 'VII.1.f',
            name: 'Restrição de acesso apenas a quem necessita',
            description: 'Controle de acesso',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VII.1.g',
            code: 'VII.1.g',
            name: 'Proteção física de equipamentos com dados de pacientes',
            description: 'Proteção física',
            weight: 1,
            classification: 'qualidade'
          }
        ]
      },
      {
        id: '7-2',
        name: '2. Proteção ao Paciente',
        description: 'Direitos e segurança do paciente',
        indicators: [
          {
            id: 'VII.2.a',
            code: 'VII.2.a',
            name: 'Guia com direitos e responsabilidades do cliente',
            description: 'Guia do cliente',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VII.2.b',
            code: 'VII.2.b',
            name: 'Manual do cliente',
            description: 'Manual completo',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'VII.2.c',
            code: 'VII.2.c',
            name: 'Diretrizes sobre consentimento informado',
            description: 'Consentimento informado',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VII.2.d',
            code: 'VII.2.d',
            name: 'Diretrizes sobre contenção e isolamento',
            description: 'Diretrizes de contenção',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VII.2.e',
            code: 'VII.2.e',
            name: 'Reconhecimento de que o cliente primário é o paciente e seus cuidadores',
            description: 'Foco no cliente',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'VII.2.f',
            code: 'VII.2.f',
            name: 'Ação preventiva para evitar interrupção dos serviços e aviso prévio',
            description: 'Continuidade de serviço',
            weight: 1,
            classification: 'qualidade'
          }
        ]
      },
      {
        id: '7-3',
        name: '3. Requisitos Gerais e Responsabilidade Legal',
        description: 'Conformidade legal e seguros',
        indicators: [
          {
            id: 'VII.3.a',
            code: 'VII.3.a',
            name: 'Cumprimento de registros e licenças',
            description: 'Registros e licenças',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VII.3.b',
            code: 'VII.3.b',
            name: 'Seguro geral, patrimonial e de responsabilidade civil',
            description: 'Seguros obrigatórios',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VII.3.c',
            code: 'VII.3.c',
            name: 'Seguro contra acidentes de trabalho',
            description: 'Seguro de acidentes',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VII.3.d',
            code: 'VII.3.d',
            name: 'Seguro contra incidentes cibernéticos',
            description: 'Seguro cibernético',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VII.3.e',
            code: 'VII.3.e',
            name: 'Precisão na folha de pagamento',
            description: 'Folha de pagamento',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VII.3.f',
            code: 'VII.3.f',
            name: 'Planejamento estratégico anual',
            description: 'Planejamento estratégico',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'VII.3.g',
            code: 'VII.3.g',
            name: 'Planejamento orçamentário',
            description: 'Orçamento anual',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'VII.3.h',
            code: 'VII.3.h',
            name: 'Relacionamento com assessorias jurídicas',
            description: 'Assessoria jurídica',
            weight: 1,
            classification: 'qualidade'
          }
        ]
      },
      {
        id: '7-4',
        name: '4. Ética, Integridade e Profissionalismo',
        description: 'Conduta ética e profissional',
        indicators: [
          {
            id: 'VII.4.a',
            code: 'VII.4.a',
            name: 'Cumpre o escopo designado na avaliação',
            description: 'Cumprimento de escopo',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VII.4.b',
            code: 'VII.4.b',
            name: 'Garante que a intervenção siga o plano de tratamento',
            description: 'Adesão ao plano',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VII.4.c',
            code: 'VII.4.c',
            name: 'Caseloads compatíveis com supervisão adequada',
            description: 'Caseloads adequados',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'VII.4.d',
            code: 'VII.4.d',
            name: 'Conformidade com protocolos de ensino e manejo',
            description: 'Conformidade de protocolos',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VII.4.e',
            code: 'VII.4.e',
            name: 'Conformidade com leis regulatórias',
            description: 'Conformidade legal',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VII.4.f',
            code: 'VII.4.f',
            name: 'Nenhum dirigente sob investigação regulatória',
            description: 'Integridade de dirigentes',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VII.4.g',
            code: 'VII.4.g',
            name: 'Promoção de práticas éticas',
            description: 'Promoção de ética',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VII.4.h',
            code: 'VII.4.h',
            name: 'Concorrência ética e justa',
            description: 'Concorrência justa',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VII.4.i',
            code: 'VII.4.i',
            name: 'Evita relações duplas',
            description: 'Prevenção de conflitos',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VII.4.j',
            code: 'VII.4.j',
            name: 'Protege privacidade dos funcionários',
            description: 'Privacidade de funcionários',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VII.4.k',
            code: 'VII.4.k',
            name: 'Não oferece incentivos por presença ou indicação',
            description: 'Política de incentivos',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VII.4.l',
            code: 'VII.4.l',
            name: 'Canal de denúncia confidencial e política de não retaliação',
            description: 'Canal de denúncia',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VII.4.m',
            code: 'VII.4.m',
            name: 'Comitê ou responsável por ética',
            description: 'Comitê de ética',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'VII.4.n',
            code: 'VII.4.n',
            name: 'Código de ética organizacional',
            description: 'Código de ética',
            weight: 1,
            classification: 'qualidade'
          }
        ]
      },
      {
        id: '7-5',
        name: '5. Saúde, Segurança e Emergências',
        description: 'Protocolos de segurança e emergência',
        indicators: [
          {
            id: 'VII.5.a',
            code: 'VII.5.a',
            name: 'Política de proteção contra abuso',
            description: 'Proteção contra abuso',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'VII.5.b',
            code: 'VII.5.b',
            name: 'Plano de resposta para acidentes',
            description: 'Resposta a acidentes',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VII.5.c',
            code: 'VII.5.c',
            name: 'Acesso a kit de primeiros socorros',
            description: 'Kit de primeiros socorros',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VII.5.d',
            code: 'VII.5.d',
            name: 'Política de transporte seguro',
            description: 'Transporte seguro',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VII.5.e',
            code: 'VII.5.e',
            name: 'Diretrizes para manejo seguro de medicamentos',
            description: 'Manejo de medicamentos',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VII.5.f',
            code: 'VII.5.f',
            name: 'Plano de emergência para acidentes',
            description: 'Plano de emergência',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VII.5.g',
            code: 'VII.5.g',
            name: 'Equipe treinada para crises agressivas',
            description: 'Treinamento de crises',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'VII.5.h',
            code: 'VII.5.h',
            name: 'Diretrizes de revisão pós-incidentes',
            description: 'Revisão pós-incidente',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'VII.5.i',
            code: 'VII.5.i',
            name: 'Política sobre doenças dos pacientes',
            description: 'Política de doenças',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'VII.5.j',
            code: 'VII.5.j',
            name: 'Checklist de segurança do espaço físico',
            description: 'Segurança física',
            weight: 1,
            classification: 'qualidade'
          }
        ]
      }
    ]
  },
  {
    id: '8',
    name: 'Área 8: Diversidade e Equidade',
    description: 'Inclusão e diversidade organizacional',
    categories: [
      {
        id: '8-1',
        name: '1. Colaboradores',
        description: 'Diversidade na equipe',
        indicators: [
          {
            id: 'VIII.1.a',
            code: 'VIII.1.a',
            name: 'Realiza autoavaliação de diversidade anualmente',
            description: 'Autoavaliação de diversidade',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'VIII.1.b',
            code: 'VIII.1.b',
            name: 'Analisa dados de diversidade da equipe',
            description: 'Análise de diversidade',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'VIII.1.c',
            code: 'VIII.1.c',
            name: 'Há representação diversa',
            description: 'Representação diversa',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'VIII.1.d',
            code: 'VIII.1.d',
            name: 'Revisa políticas internas com foco em equidade',
            description: 'Políticas de equidade',
            weight: 1,
            classification: 'qualidade'
          }
        ]
      },
      {
        id: '8-2',
        name: '2. Treinamento',
        description: 'Capacitação em diversidade',
        indicators: [
          {
            id: 'VIII.2.a',
            code: 'VIII.2.a',
            name: 'Oferece treinamentos regulares sobre DEI e viés implícito',
            description: 'Treinamento DEI',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'VIII.2.b',
            code: 'VIII.2.b',
            name: 'Oferece treinamento sobre DEI para cuidadores',
            description: 'Treinamento para cuidadores',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'VIII.2.c',
            code: 'VIII.2.c',
            name: 'Oferece treinamento sobre DEI para parceiros',
            description: 'Treinamento para parceiros',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'VIII.2.d',
            code: 'VIII.2.d',
            name: 'Disponibiliza canais seguros para relatos de discriminação',
            description: 'Canal de denúncia',
            weight: 1,
            classification: 'padrao'
          }
        ]
      },
      {
        id: '8-3',
        name: '3. Plano Estratégico',
        description: 'Estratégia de diversidade',
        indicators: [
          {
            id: 'VIII.3.a',
            code: 'VIII.3.a',
            name: 'Possui declaração de diversidade',
            description: 'Declaração de diversidade',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'VIII.3.b',
            code: 'VIII.3.b',
            name: 'Inclui indicadores de DEI no plano estratégico',
            description: 'Indicadores DEI',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'VIII.3.c',
            code: 'VIII.3.c',
            name: 'Parcerias para diversificar quadro de colaboradores',
            description: 'Parcerias de diversidade',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'VIII.3.d',
            code: 'VIII.3.d',
            name: 'Comitê de diversidade ativo',
            description: 'Comitê de diversidade',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'VIII.3.e',
            code: 'VIII.3.e',
            name: 'Publica relatórios anuais de DEI',
            description: 'Relatórios DEI',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'VIII.3.f',
            code: 'VIII.3.f',
            name: 'Orçamento dedicado para iniciativas de DEI',
            description: 'Orçamento DEI',
            weight: 1,
            classification: 'qualidade'
          }
        ]
      },
      {
        id: '8-4',
        name: '4. Clientes',
        description: 'Atendimento culturalmente sensível',
        indicators: [
          {
            id: 'VIII.4.a',
            code: 'VIII.4.a',
            name: 'Inclui perguntas sobre identidade cultural, gênero e linguagem',
            description: 'Coleta de identidade',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'VIII.4.b',
            code: 'VIII.4.b',
            name: 'Programa individualizado considera práticas culturais',
            description: 'Sensibilidade cultural',
            weight: 1,
            classification: 'qualidade'
          }
        ]
      }
    ]
  },
  {
    id: '9',
    name: 'Área 9: Envolvimento com a Comunidade',
    description: 'Impacto social e científico',
    categories: [
      {
        id: '9-1',
        name: '1. Comunidade Local',
        description: 'Engajamento comunitário',
        indicators: [
          {
            id: 'IX.1.a',
            code: 'IX.1.a',
            name: 'Realiza eventos abertos ao público sobre autismo e inclusão',
            description: 'Eventos públicos',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'IX.1.b',
            code: 'IX.1.b',
            name: 'Divulga conteúdo educativo mensalmente',
            description: 'Conteúdo educativo',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'IX.1.c',
            code: 'IX.1.c',
            name: 'Parcerias com escolas públicas ou centros comunitários para capacitação',
            description: 'Parcerias educacionais',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'IX.1.d',
            code: 'IX.1.d',
            name: 'Oferece suporte gratuito ou social para famílias de baixa renda',
            description: 'Suporte social',
            weight: 1,
            classification: 'excelencia'
          }
        ]
      },
      {
        id: '9-2',
        name: '2. Comunidade Científica',
        description: 'Produção e disseminação científica',
        indicators: [
          {
            id: 'IX.2.a',
            code: 'IX.2.a',
            name: 'Participa de eventos científicos',
            description: 'Participação em eventos',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'IX.2.b',
            code: 'IX.2.b',
            name: 'Apresenta em eventos científicos',
            description: 'Apresentações científicas',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'IX.2.c',
            code: 'IX.2.c',
            name: 'Publica em revistas científicas',
            description: 'Publicações científicas',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'IX.2.d',
            code: 'IX.2.d',
            name: 'Mantém grupos de estudo internos',
            description: 'Grupos de estudo',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'IX.2.e',
            code: 'IX.2.e',
            name: 'Promove eventos científicos próprios',
            description: 'Eventos próprios',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'IX.2.f',
            code: 'IX.2.f',
            name: 'Desenvolve pesquisa aplicada em parceria com universidades',
            description: 'Pesquisa aplicada',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'IX.2.g',
            code: 'IX.2.g',
            name: 'Participa de comitês e fóruns técnicos',
            description: 'Participação em comitês',
            weight: 1,
            classification: 'qualidade'
          }
        ]
      }
    ]
  },
  {
    id: '10',
    name: 'Área 10: Operações Administrativas',
    description: 'Gestão operacional e administrativa',
    categories: [
      {
        id: '10-1',
        name: '1. Gestão Financeira',
        description: 'Gestão financeira e fiduciária',
        indicators: [
          {
            id: 'X.1.a',
            code: 'X.1.a',
            name: 'Gestão financeira e fiduciária',
            description: 'Gestão financeira',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'X.1.b',
            code: 'X.1.b',
            name: 'Possui tabela de honorários',
            description: 'Tabela de honorários',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'X.1.c',
            code: 'X.1.c',
            name: 'Realiza divulgação clara de valores',
            description: 'Transparência de valores',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'X.1.d',
            code: 'X.1.d',
            name: 'Acordos escritos com pacientes, fornecedores e parceiros',
            description: 'Acordos formais',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'X.1.e',
            code: 'X.1.e',
            name: 'Contratos assinados quando há pagamento do paciente',
            description: 'Contratos formalizados',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'X.1.f',
            code: 'X.1.f',
            name: 'Busca autorizações de serviço com seguradoras',
            description: 'Autorizações de seguradoras',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'X.1.g',
            code: 'X.1.g',
            name: 'Orçamento reflete prioridades estratégicas',
            description: 'Orçamento estratégico',
            weight: 1,
            classification: 'padrao'
          }
        ]
      },
      {
        id: '10-2',
        name: '2. Princípios Orientadores',
        description: 'Missão, visão e valores',
        indicators: [
          {
            id: 'X.2.a',
            code: 'X.2.a',
            name: 'Organização possui princípios orientadores',
            description: 'Princípios orientadores',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'X.2.b',
            code: 'X.2.b',
            name: 'Declaração de missão',
            description: 'Declaração de missão',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'X.2.c',
            code: 'X.2.c',
            name: 'Declaração de visão',
            description: 'Declaração de visão',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'X.2.d',
            code: 'X.2.d',
            name: 'Princípios e valores fundamentais claros',
            description: 'Valores fundamentais',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'X.2.e',
            code: 'X.2.e',
            name: 'Definição e escopo dos serviços ABA',
            description: 'Escopo de serviços',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'X.2.f',
            code: 'X.2.f',
            name: 'Políticas e procedimentos atualizados',
            description: 'Políticas atualizadas',
            weight: 1,
            classification: 'qualidade'
          }
        ]
      },
      {
        id: '10-3',
        name: '3. Governança',
        description: 'Estrutura de governança',
        indicators: [
          {
            id: 'X.3.a',
            code: 'X.3.a',
            name: 'Autorização legal para operar',
            description: 'Autorização legal',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'X.3.b',
            code: 'X.3.b',
            name: 'Estrutura de governança e gestão',
            description: 'Estrutura de governança',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'X.3.c',
            code: 'X.3.c',
            name: 'Capacidade organizacional definida',
            description: 'Capacidade organizacional',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'X.3.d',
            code: 'X.3.d',
            name: 'Cobertura de seguros adequada',
            description: 'Seguros adequados',
            weight: 1,
            classification: 'padrao'
          }
        ]
      },
      {
        id: '10-4',
        name: '4. Plano estratégico',
        description: 'Planejamento estratégico',
        indicators: [
          {
            id: 'X.4.a',
            code: 'X.4.a',
            name: 'Análise de mercado do ambiente operacional',
            description: 'Análise de mercado',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'X.4.b',
            code: 'X.4.b',
            name: 'Metas e objetivos que apoiam prioridades clínicas e operacionais',
            description: 'Metas alinhadas',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'X.4.c',
            code: 'X.4.c',
            name: 'Projeção de 1 a 3 anos para expansão e planejamento financeiro',
            description: 'Projeção de longo prazo',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'X.4.d',
            code: 'X.4.d',
            name: 'Plano revisado e atualizado anualmente',
            description: 'Revisão anual',
            weight: 1,
            classification: 'excelencia'
          },
          {
            id: 'X.4.e',
            code: 'X.4.e',
            name: 'Liderança toma decisões informadas e não reativas',
            description: 'Decisões informadas',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'X.4.f',
            code: 'X.4.f',
            name: 'Colaboradores compreendem e se mobilizam nas metas',
            description: 'Engajamento de colaboradores',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'X.4.g',
            code: 'X.4.g',
            name: 'Organização preparada para expansão sem perder qualidade',
            description: 'Preparação para expansão',
            weight: 1,
            classification: 'qualidade'
          }
        ]
      },
      {
        id: '10-5',
        name: '5. Estrutura Física',
        description: 'Infraestrutura física',
        indicators: [
          {
            id: 'X.5.a',
            code: 'X.5.a',
            name: 'Ambientes com acessibilidade',
            description: 'Acessibilidade',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'X.5.b',
            code: 'X.5.b',
            name: 'Salas com controle de estímulos sensoriais',
            description: 'Controle sensorial',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'X.5.c',
            code: 'X.5.c',
            name: 'Controle de incidentes estruturais',
            description: 'Controle de incidentes',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'X.5.d',
            code: 'X.5.d',
            name: 'Controle de ocupação das salas',
            description: 'Controle de ocupação',
            weight: 1,
            classification: 'padrao'
          },
          {
            id: 'X.5.e',
            code: 'X.5.e',
            name: 'Sinalização clara e inclusiva',
            description: 'Sinalização inclusiva',
            weight: 1,
            classification: 'qualidade'
          },
          {
            id: 'X.5.f',
            code: 'X.5.f',
            name: 'Equipamentos de emergência dentro da validade',
            description: 'Equipamentos de emergência',
            weight: 1,
            classification: 'padrao'
          }
        ]
      }
    ]
  }
];

export const getClassification = (percentage: number): 'excelencia' | 'qualidade' | 'padrao' => {
  if (percentage >= 85) return 'excelencia';
  if (percentage >= 70) return 'qualidade';
  return 'padrao';
};

// Sample data removed for simplicity - can be added back if needed
export const sampleClinics: Clinic[] = [];
export const sampleAssessments: Assessment[] = [];
