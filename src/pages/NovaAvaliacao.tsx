import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Save, FileText, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useClinics } from "@/hooks/useClinics";
import { useAssessments } from "@/hooks/useAssessments";
import { useAuth } from "@/hooks/useAuth";
import type { AreaScore, CategoryScore, IndicatorScore } from "@/types/faiq";
import { assessmentFormSchema, indicatorScoreSchema } from "@/lib/validations/assessment";

// Complete FAIQ structure with all 10 areas
const faiqStructure = [
  {
    id: 1,
    name: "I. Jornada do Profissional",
    categories: [
      {
        id: 1,
        name: "1. Recrutamento e Seleção",
        indicators: [
          "A organização possui descrições de cargos para cada posição, com qualificações mínimas, linhas de reportagem, hierarquia e deveres do cargo.",
          "Possui uma matriz de cargos x salários estabelecidos de acordo com a descrição de cargos",
          "Possui diretrizes claras para política de remuneração, mérito e promoção para seus profissionais"
        ]
      },
      {
        id: 2,
        name: "2. Onboarding Profissional",
        indicators: [
          "Possui processo estruturado de integração para novos colaboradores",
          "Oferece treinamento inicial obrigatório sobre políticas e procedimentos da organização",
          "Define mentor ou supervisor responsável pelo acompanhamento inicial do novo colaborador"
        ]
      },
      {
        id: 3,
        name: "3. Cargos x Competências",
        indicators: [
          "Possui matriz de competências técnicas e comportamentais para cada cargo",
          "Define claramente os requisitos de formação e experiência para cada posição",
          "Estabelece critérios objetivos para progressão de carreira"
        ]
      },
      {
        id: 4,
        name: "4. Treinamentos",
        indicators: [
          "Possui plano anual de capacitação para todos os colaboradores",
          "Oferece treinamentos específicos para desenvolvimento técnico continuado",
          "Mantém registro de participação e aproveitamento em treinamentos"
        ]
      },
      {
        id: 5,
        name: "5. Desenvolvimento",
        indicators: [
          "Realiza avaliações periódicas de desempenho dos colaboradores",
          "Oferece feedback estruturado e planos de desenvolvimento individual",
          "Possui sistema de reconhecimento e recompensa por performance"
        ]
      }
    ]
  },
  {
    id: 2,
    name: "II. Jornada do Cliente",
    categories: [
      {
        id: 6,
        name: "1. Admissão do Cliente",
        indicators: [
          "Possui diretrizes claras sobre o escopo de atendimento da clínica, e perfil de cliente que é atendido",
          "Possui diretrizes e processos para captação de leads",
          "Possui processo estruturado de triagem e avaliação inicial do cliente"
        ]
      },
      {
        id: 7,
        name: "2. Onboarding & Avaliação Inicial",
        indicators: [
          "Possui processo padronizado de acolhimento do cliente e família",
          "Aplica instrumentos de avaliação inicial validados e apropriados",
          "Estabelece metas iniciais baseadas na avaliação realizada"
        ]
      },
      {
        id: 8,
        name: "3. Intervenção",
        indicators: [
          "Desenvolve planos de intervenção individualizados baseados em evidências",
          "Registra sistematicamente o progresso do cliente durante as sessões",
          "Realiza ajustes no plano de intervenção baseados no progresso observado"
        ]
      },
      {
        id: 9,
        name: "4. Recursos Clínicos",
        indicators: [
          "Possui materiais e recursos adequados para diferentes tipos de intervenção",
          "Mantém ambiente terapêutico apropriado e seguro para os atendimentos",
          "Utiliza tecnologias e ferramentas que apoiam o processo terapêutico"
        ]
      }
    ]
  },
  {
    id: 3,
    name: "III. Cuidado Interdisciplinar",
    categories: [
      {
        id: 10,
        name: "1. Diretrizes",
        indicators: [
          "Possui protocolos claros para comunicação entre diferentes especialidades",
          "Define papéis e responsabilidades de cada área profissional",
          "Estabelece fluxos de trabalho integrados entre as especialidades"
        ]
      },
      {
        id: 11,
        name: "2. Avaliação",
        indicators: [
          "Realiza avaliações multidisciplinares de forma coordenada",
          "Integra resultados de diferentes avaliações em um relatório único",
          "Define consenso entre profissionais sobre diagnóstico e necessidades"
        ]
      },
      {
        id: 12,
        name: "3. Plano Individualizado",
        indicators: [
          "Desenvolve planos de intervenção com participação de todas as especialidades envolvidas",
          "Define metas compartilhadas e complementares entre as áreas",
          "Estabelece cronograma integrado de intervenções"
        ]
      },
      {
        id: 13,
        name: "4. Rotinas de Qualidade",
        indicators: [
          "Realiza reuniões regulares de discussão de casos entre equipes",
          "Monitora a efetividade da comunicação interdisciplinar",
          "Implementa melhorias baseadas no feedback das equipes"
        ]
      }
    ]
  },
  {
    id: 4,
    name: "IV. Jornada dos Stakeholders",
    categories: [
      {
        id: 14,
        name: "1. Coordenação e Participação do Cuidador",
        indicators: [
          "Envolve cuidadores no planejamento e definição de metas terapêuticas",
          "Oferece orientação e treinamento para cuidadores sobre estratégias de intervenção",
          "Mantém comunicação regular com cuidadores sobre progresso e ajustes necessários"
        ]
      },
      {
        id: 15,
        name: "2. Parceria com Agência Financiadora",
        indicators: [
          "Mantém comunicação clara e regular com operadoras de saúde",
          "Fornece documentação adequada e no prazo para autorização de procedimentos",
          "Estabelece fluxos eficientes para renovação e continuidade de autorizações"
        ]
      }
    ]
  },
  {
    id: 5,
    name: "V. Documentação Clínica",
    categories: [
      {
        id: 16,
        name: "1. Avaliação",
        indicators: [
          "Utiliza instrumentos padronizados e validados para avaliação inicial",
          "Registra de forma completa e organizada os resultados das avaliações",
          "Estabelece hipóteses diagnósticas baseadas em evidências coletadas"
        ]
      },
      {
        id: 17,
        name: "2. Intervenção",
        indicators: [
          "Documenta planos de intervenção de forma clara e detalhada",
          "Registra sistematicamente as sessões e progresso do cliente",
          "Mantém histórico organizado de todas as intervenções realizadas"
        ]
      },
      {
        id: 18,
        name: "3. Coleta e Análise de Dados",
        indicators: [
          "Coleta dados de forma sistemática e consistente durante as sessões",
          "Analisa dados coletados para orientar tomada de decisões clínicas",
          "Utiliza gráficos e relatórios para visualizar progresso do cliente"
        ]
      },
      {
        id: 19,
        name: "4. Alta e Interrupção do Tratamento",
        indicators: [
          "Estabelece critérios claros para alta e interrupção de tratamento",
          "Elabora relatório final completo sobre evolução do cliente",
          "Fornece orientações para continuidade do cuidado após alta"
        ]
      }
    ]
  },
  {
    id: 6,
    name: "VI. Qualidade & Sustentabilidade",
    categories: [
      {
        id: 20,
        name: "1. Diretrizes Clínicas",
        indicators: [
          "Possui protocolos clínicos baseados em evidências científicas atualizadas",
          "Define procedimentos padronizados para diferentes tipos de intervenção",
          "Mantém diretrizes atualizadas conforme evolução da área"
        ]
      },
      {
        id: 21,
        name: "2. Treinamento das Diretrizes",
        indicators: [
          "Oferece treinamento inicial obrigatório sobre diretrizes clínicas",
          "Realiza atualizações periódicas sobre mudanças em protocolos",
          "Avalia conhecimento e aplicação das diretrizes pelos profissionais"
        ]
      },
      {
        id: 22,
        name: "3. Monitoramento da Implementação",
        indicators: [
          "Monitora regularmente a adesão às diretrizes clínicas estabelecidas",
          "Identifica desvios e implementa ações corretivas quando necessário",
          "Mantém registros de conformidade com protocolos estabelecidos"
        ]
      },
      {
        id: 23,
        name: "4. Dashboard sobre Fidelidade da Implementação",
        indicators: [
          "Possui sistema de monitoramento em tempo real da fidelidade aos protocolos",
          "Gera relatórios automáticos sobre conformidade com diretrizes",
          "Utiliza indicadores visuais para facilitar acompanhamento da qualidade"
        ]
      },
      {
        id: 24,
        name: "5. Medida de Qualidade do Serviço",
        indicators: [
          "Estabelece métricas claras para avaliação da qualidade dos serviços",
          "Coleta feedback regular de clientes e familiares sobre satisfação",
          "Implementa melhorias baseadas em indicadores de qualidade identificados"
        ]
      }
    ]
  },
  {
    id: 7,
    name: "VII. Compliance",
    categories: [
      {
        id: 25,
        name: "1. Políticas de Privacidade",
        indicators: [
          "Possui políticas claras de proteção de dados pessoais e de saúde",
          "Implementa medidas de segurança da informação adequadas",
          "Treina colaboradores sobre políticas de privacidade e confidencialidade"
        ]
      },
      {
        id: 26,
        name: "2. Proteção ao Paciente",
        indicators: [
          "Estabelece protocolos para garantir segurança física e emocional dos pacientes",
          "Possui procedimentos para prevenção de situações de risco ou abuso",
          "Mantém ambiente seguro e adequado para atendimento de diferentes perfis"
        ]
      },
      {
        id: 27,
        name: "3. Requisitos Gerais e Responsabilidade Legal",
        indicators: [
          "Cumpre todas as exigências legais para funcionamento da clínica",
          "Mantém documentação legal atualizada e em conformidade",
          "Possui seguros e coberturas adequadas para proteção da organização"
        ]
      },
      {
        id: 28,
        name: "4. Ética, Integridade e Profissionalismo",
        indicators: [
          "Possui código de ética claro e conhecido por todos os colaboradores",
          "Estabelece procedimentos para denúncia e apuração de questões éticas",
          "Promove cultura organizacional baseada em integridade e profissionalismo"
        ]
      },
      {
        id: 29,
        name: "5. Saúde, Segurança e Preparação para Emergências",
        indicators: [
          "Possui planos de emergência e procedimentos de segurança estabelecidos",
          "Treina colaboradores para situações de emergência e primeiros socorros",
          "Mantém equipamentos de segurança e emergência em bom funcionamento"
        ]
      },
      {
        id: 30,
        name: "6. Mídia, Comunicação e Representação",
        indicators: [
          "Estabelece diretrizes claras para comunicação externa e uso de mídias sociais",
          "Possui políticas para uso de imagem e informações de pacientes",
          "Mantém comunicação institucional consistente e profissional"
        ]
      }
    ]
  },
  {
    id: 8,
    name: "VIII. Diversidade, Equidade e Inclusão",
    categories: [
      {
        id: 31,
        name: "1. Colaboradores",
        indicators: [
          "Promove diversidade na contratação e composição das equipes",
          "Oferece oportunidades iguais de desenvolvimento para todos os colaboradores",
          "Estabelece políticas antidiscriminação e de respeito à diversidade"
        ]
      },
      {
        id: 32,
        name: "2. Treinamento",
        indicators: [
          "Oferece treinamentos sobre diversidade, equidade e inclusão",
          "Sensibiliza colaboradores sobre questões de preconceito e discriminação",
          "Promove cultura organizacional inclusiva e respeitosa"
        ]
      },
      {
        id: 33,
        name: "3. Plano Estratégico",
        indicators: [
          "Inclui metas de diversidade e inclusão no planejamento estratégico",
          "Estabelece parcerias com organizações que promovem diversidade",
          "Monitora indicadores de diversidade e inclusão na organização"
        ]
      },
      {
        id: 34,
        name: "4. Clientes",
        indicators: [
          "Garante acesso equitativo aos serviços independente de background",
          "Adapta atendimento para diferentes necessidades culturais e linguísticas",
          "Promove ambiente acolhedor e inclusivo para todos os clientes"
        ]
      }
    ]
  },
  {
    id: 9,
    name: "IX. Envolvimento com a Comunidade",
    categories: [
      {
        id: 35,
        name: "1. Comunidade Local",
        indicators: [
          "Participa ativamente de eventos e iniciativas da comunidade local",
          "Oferece ações educativas e de conscientização para a comunidade",
          "Estabelece parcerias com organizações locais para projetos conjuntos"
        ]
      },
      {
        id: 36,
        name: "2. Comunidade Científica",
        indicators: [
          "Participa de eventos científicos da área com apresentação de trabalhos",
          "Publica pesquisas e estudos de caso em revistas científicas",
          "Colabora com instituições de ensino e pesquisa da área"
        ]
      }
    ]
  },
  {
    id: 10,
    name: "X. Operações Administrativas",
    categories: [
      {
        id: 37,
        name: "1. Gestão Financeira",
        indicators: [
          "Possui controles financeiros adequados e atualizados",
          "Realiza planejamento orçamentário anual com acompanhamento mensal",
          "Mantém fluxo de caixa organizado e relatórios gerenciais regulares"
        ]
      },
      {
        id: 38,
        name: "2. Princípios Orientadores",
        indicators: [
          "Possui missão, visão e valores claramente definidos e comunicados",
          "Alinha decisões organizacionais com princípios e valores estabelecidos",
          "Promove cultura organizacional consistente com princípios orientadores"
        ]
      },
      {
        id: 39,
        name: "3. Governança",
        indicators: [
          "Possui estrutura de governança clara com papéis e responsabilidades definidos",
          "Realiza reuniões regulares de governança com documentação adequada",
          "Estabelece processos de tomada de decisão transparentes e eficazes"
        ]
      },
      {
        id: 40,
        name: "4. Plano Estratégico",
        indicators: [
          "Possui plano estratégico formal com objetivos e metas claras",
          "Realiza acompanhamento regular do progresso das metas estratégicas",
          "Revisa e atualiza periodicamente o planejamento estratégico da organização"
        ]
      }
    ]
  }
];

const NovaAvaliacao = () => {
  const navigate = useNavigate();
  const [selectedClinic, setSelectedClinic] = useState("");
  const [assessorName, setAssessorName] = useState("");
  const [observations, setObservations] = useState("");
  const [openAreas, setOpenAreas] = useState<number[]>([]);
  const [openCategories, setOpenCategories] = useState<number[]>([]);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const { clinics, isLoading: clinicsLoading } = useClinics();
  const { createAssessment } = useAssessments();
  const { user } = useAuth();

  const toggleArea = (areaId: number) => {
    setOpenAreas(prev => 
      prev.includes(areaId) 
        ? prev.filter(id => id !== areaId)
        : [...prev, areaId]
    );
  };

  const toggleCategory = (categoryId: number) => {
    setOpenCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const setIndicatorScore = (areaId: number, categoryId: number, indicatorIndex: number, score: number) => {
    const key = `${areaId}-${categoryId}-${indicatorIndex}`;
    setScores(prev => ({ ...prev, [key]: score }));
  };

  const getIndicatorScore = (areaId: number, categoryId: number, indicatorIndex: number) => {
    const key = `${areaId}-${categoryId}-${indicatorIndex}`;
    return scores[key] || 0;
  };

  const calculateOverallScore = () => {
    const totalScores = Object.values(scores);
    const avgScore = totalScores.reduce((sum, score) => sum + score, 0) / totalScores.length;
    return isNaN(avgScore) ? 0 : avgScore * 100;
  };

  const getClassification = (score: number) => {
    if (score >= 80) return { label: "Excelência", color: "bg-success text-success-foreground" };
    if (score >= 60) return { label: "Qualidade", color: "bg-details text-white" };
    return { label: "Padrão", color: "bg-standard text-standard-foreground" };
  };

  const handleSubmit = async () => {
    // Validate form data
    const formValidation = assessmentFormSchema.safeParse({
      selectedClinic,
      assessorName,
      observations
    });

    if (!formValidation.success) {
      toast({
        title: "Dados inválidos",
        description: formValidation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    // Validate all indicator scores
    for (const [key, score] of Object.entries(scores)) {
      const scoreValidation = indicatorScoreSchema.safeParse(score);
      if (!scoreValidation.success) {
        toast({
          title: "Pontuação inválida",
          description: `${scoreValidation.error.errors[0].message} (indicador ${key})`,
          variant: "destructive",
        });
        return;
      }
    }

    if (!user) {
      toast({
        title: "Erro de autenticação",
        description: "Você precisa estar autenticado para criar uma avaliação.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      // Calcular pontuações por área
      const areaScores: (AreaScore & {
        categoryScores: (CategoryScore & {
          indicatorScores: IndicatorScore[];
        })[];
      })[] = faiqStructure.map((area) => {
        const categoryScores = area.categories.map((category) => {
          const indicatorScores: IndicatorScore[] = category.indicators.map((_, index) => {
            const key = `${area.id}-${category.id}-${index}`;
            const score = (scores[key] || 0) as 0 | 0.5 | 1;
            return {
              indicatorId: `${category.id}-${index + 1}`,
              score,
              notes: observations || '',
            };
          });

          const totalScore = indicatorScores.reduce((sum, is) => sum + is.score, 0);
          const maxScore = indicatorScores.length;
          const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

          return {
            categoryId: `${category.id}`,
            indicatorScores,
            totalScore,
            maxScore,
            percentage,
          };
        });

        const totalScore = categoryScores.reduce((sum, cs) => sum + cs.totalScore, 0);
        const maxScore = categoryScores.reduce((sum, cs) => sum + cs.maxScore, 0);
        const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

        return {
          areaId: `${area.id}`,
          categoryScores,
          totalScore,
          maxScore,
          percentage,
        };
      });

      const totalScore = areaScores.reduce((sum, as) => sum + as.totalScore, 0);
      const maxScore = areaScores.reduce((sum, as) => sum + as.maxScore, 0);
      const overallPercentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

      const classificationResult = getClassification(overallPercentage);
      const classification = 
        overallPercentage >= 80 ? 'excelencia' as const :
        overallPercentage >= 60 ? 'qualidade' as const :
        'padrao' as const;

      await createAssessment.mutateAsync({
        assessment: {
          clinic_id: selectedClinic,
          assessor_id: user.id,
          assessor_name: assessorName,
          assessment_date: new Date().toISOString().split('T')[0],
          overall_percentage: overallPercentage,
          total_score: totalScore,
          max_score: maxScore,
          classification,
          status: 'concluida',
          observations: observations || null,
        },
        areaScores,
      });

      toast({
        title: "Avaliação salva com sucesso!",
        description: `Pontuação geral: ${overallPercentage.toFixed(1)}% - ${classificationResult.label}`,
      });

      // Navegar para a página de relatórios
      setTimeout(() => {
        navigate('/relatorios');
      }, 1500);
    } catch (error: any) {
      console.error('Erro ao salvar avaliação:', error);
      toast({
        title: "Erro ao salvar avaliação",
        description: error.message || "Ocorreu um erro ao salvar a avaliação.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const overallScore = calculateOverallScore();
  const classification = getClassification(overallScore);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-details mb-2">Nova Avaliação FAIQ</h1>
        <p className="text-muted-foreground">
          Ferramenta de Avaliação de Indicadores de Qualidade - Sistema completo com 10 áreas
        </p>
      </div>

      {/* Basic Information */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-details">
            <FileText className="h-5 w-5 text-primary" />
            Informações Básicas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clinic">Clínica</Label>
              <Select value={selectedClinic} onValueChange={setSelectedClinic}>
                <SelectTrigger className="border-primary/20 focus:border-primary">
                  <SelectValue placeholder="Selecione a clínica" />
                </SelectTrigger>
                <SelectContent>
                  {clinicsLoading ? (
                    <SelectItem value="loading" disabled>Carregando...</SelectItem>
                  ) : clinics.length === 0 ? (
                    <SelectItem value="empty" disabled>Nenhuma clínica cadastrada</SelectItem>
                  ) : (
                    clinics.map((clinic) => (
                      <SelectItem key={clinic.id} value={clinic.id}>
                        {clinic.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="assessor">Nome do Avaliador</Label>
              <Input
                id="assessor"
                value={assessorName}
                onChange={(e) => setAssessorName(e.target.value)}
                placeholder="Digite o nome do avaliador"
                className="border-primary/20 focus:border-primary"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="observations">Observações Gerais</Label>
            <Textarea
              id="observations"
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              placeholder="Observações sobre a avaliação (opcional)"
              rows={3}
              className="border-primary/20 focus:border-primary"
            />
          </div>
        </CardContent>
      </Card>

      {/* Overall Progress */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-details">
              <CheckCircle className="h-5 w-5 text-primary" />
              Progresso Geral
            </span>
            <Badge className={classification.color}>
              {classification.label}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-details">Pontuação geral</span>
              <span className="font-medium text-details">{overallScore.toFixed(1)}%</span>
            </div>
            <Progress value={overallScore} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* FAIQ Areas */}
      <div className="space-y-4">
        {faiqStructure.map((area) => (
          <Card key={area.id} className="border-l-4 border-l-primary">
            <Collapsible
              open={openAreas.includes(area.id)}
              onOpenChange={() => toggleArea(area.id)}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-primary/5 transition-colors">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {openAreas.includes(area.id) ? (
                        <ChevronDown className="h-4 w-4 text-primary" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-primary" />
                      )}
                      <span className="text-details">{area.name}</span>
                    </div>
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="space-y-4">
                  {area.categories.map((category) => (
                    <Card key={category.id} className="border-l-4 border-l-accent">
                      <Collapsible
                        open={openCategories.includes(category.id)}
                        onOpenChange={() => toggleCategory(category.id)}
                      >
                        <CollapsibleTrigger asChild>
                          <CardHeader className="cursor-pointer hover:bg-accent/5 transition-colors py-3">
                            <CardTitle className="text-base flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {openCategories.includes(category.id) ? (
                                  <ChevronDown className="h-3 w-3 text-primary" />
                                ) : (
                                  <ChevronRight className="h-3 w-3 text-primary" />
                                )}
                                <span className="text-details">{category.name}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {category.indicators.length} indicadores
                              </span>
                            </CardTitle>
                          </CardHeader>
                        </CollapsibleTrigger>
                        
                        <CollapsibleContent>
                          <CardContent className="space-y-3 pt-0">
                            {category.indicators.map((indicator, index) => (
                              <div key={index} className="bg-primary/5 p-4 rounded-lg space-y-3 border border-primary/10">
                                <p className="text-sm leading-relaxed text-foreground">{indicator}</p>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-medium text-details">Pontuação:</span>
                                  <div className="flex gap-1">
                                    {[0, 0.5, 1].map((score) => (
                                      <Button
                                        key={score}
                                        variant={getIndicatorScore(area.id, category.id, index) === score ? "default" : "outline"}
                                        size="sm"
                                        className={`h-8 w-12 ${
                                          getIndicatorScore(area.id, category.id, index) === score 
                                            ? "bg-primary text-white hover:bg-primary/90" 
                                            : "border-primary/20 text-primary hover:bg-primary/10"
                                        }`}
                                        onClick={() => setIndicatorScore(area.id, category.id, index, score)}
                                      >
                                        {score}
                                      </Button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </CardContent>
                        </CollapsibleContent>
                      </Collapsible>
                    </Card>
                  ))}
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <Button 
          onClick={handleSubmit} 
          className="gap-2 bg-details hover:bg-details/90" 
          size="lg"
          disabled={isSaving}
        >
          <Save className="h-4 w-4" />
          {isSaving ? "Salvando..." : "Salvar Avaliação"}
        </Button>
      </div>
    </div>
  );
};

export default NovaAvaliacao;
