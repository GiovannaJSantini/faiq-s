import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { assessmentId } = await req.json();
    console.log('Starting analysis for assessment:', assessmentId);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY')!;

    if (!lovableApiKey) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch assessment with all related data
    const { data: assessment, error: assessmentError } = await supabase
      .from('assessments')
      .select(`
        *,
        clinics (name, location, type),
        area_scores (
          area_id,
          area_name,
          percentage,
          category_scores (
            category_id,
            category_name,
            percentage,
            indicator_scores (
              indicator_id,
              indicator_name,
              score,
              notes
            )
          )
        )
      `)
      .eq('id', assessmentId)
      .single();

    if (assessmentError) throw assessmentError;

    console.log('Assessment data fetched successfully');

    // Build comprehensive context
    const contextData = {
      clinic: assessment.clinics,
      assessmentDate: assessment.assessment_date,
      overallScore: assessment.overall_percentage,
      classification: assessment.classification,
      areas: assessment.area_scores.map((area: any) => ({
        id: area.area_id,
        name: area.area_name,
        score: area.percentage,
        categories: area.category_scores.map((cat: any) => ({
          id: cat.category_id,
          name: cat.category_name,
          score: cat.percentage,
          indicators: cat.indicator_scores.map((ind: any) => ({
            id: ind.indicator_id,
            name: ind.indicator_name,
            score: ind.score,
            notes: ind.notes
          }))
        }))
      }))
    };

    // System prompt for institutional premium output
    const systemPrompt = `Você é um consultor clínico sênior especializado em gestão de qualidade hospitalar e farmacêutica, com experiência em governança clínica, compliance regulatório e excelência operacional.

REGRAS DE FORMATAÇÃO OBRIGATÓRIAS:
- NUNCA use markdown (**, __, ###, *, etc.)
- NUNCA mencione inteligência artificial, IA, algoritmos ou sistemas automatizados
- Use linguagem técnica, objetiva e institucional
- Evite superlativos desnecessários e elogios genéricos
- Parágrafos devem ter no máximo 4 linhas
- Use bullet points com "• " (ponto com espaço) para listas
- Escreva como se fosse um relatório de consultoria clínica premium

TERMINOLOGIA PADRONIZADA (use consistentemente):
- "qualidade clínica" (não "qualidade de atendimento")
- "governança clínica" (não "gestão clínica")  
- "maturidade institucional" (não "nível de desenvolvimento")
- "compliance regulatório" (não "conformidade com regras")
- "risco clínico" para impactos em segurança do paciente
- "risco regulatório" para exposições legais e normativas
- "risco organizacional" para impactos operacionais e de gestão

CATEGORIZAÇÃO DE RISCOS:
- Classifique CADA risco como: [Risco Clínico], [Risco Regulatório] ou [Risco Organizacional]
- Vincule cada risco a uma área específica avaliada
- Indique severidade: alto, moderado ou baixo

PLANOS DE AÇÃO:
- Derive CADA ação diretamente dos achados da avaliação
- Evite recomendações genéricas não baseadas nos dados
- Inclua: objetivo, responsável sugerido e evidência esperada
- Seja específico e acionável

ESTILO DO DOCUMENTO:
- O texto deve parecer produzido manualmente por consultores especialistas
- Deve ser confortável para leitura executiva
- Defensável em auditorias e conselhos técnicos
- Permitir leitura rápida por diretores e decisores`;

    // Call Lovable AI Gateway
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: `Analise a seguinte avaliação FAIQ-S e gere uma análise institucional estruturada:

INSTITUIÇÃO: ${contextData.clinic.name} (${contextData.clinic.type})
LOCALIZAÇÃO: ${contextData.clinic.location}
DATA DA AVALIAÇÃO: ${contextData.assessmentDate}
MATURIDADE GERAL: ${contextData.overallScore.toFixed(1)}%
CLASSIFICAÇÃO: ${contextData.classification === 'excelencia' ? 'Excelência' : contextData.classification === 'qualidade' ? 'Qualidade' : 'Padrão'}

RESULTADOS POR ÁREA:
${contextData.areas.map((area: any) => `
${area.name}: ${area.score.toFixed(1)}%
${area.categories.map((cat: any) => `  - ${cat.name}: ${cat.score.toFixed(1)}%`).join('\n')}
`).join('\n')}

INDICADORES CRÍTICOS (score < 0.5):
${contextData.areas.flatMap((area: any) => 
  area.categories.flatMap((cat: any) => 
    cat.indicators.filter((ind: any) => ind.score < 0.5)
      .map((ind: any) => `- [${area.name}] ${ind.name}: ${ind.score} ${ind.notes ? '(Obs: ' + ind.notes + ')' : ''}`)
  )
).join('\n')}

Gere uma análise institucional premium usando a ferramenta fornecida. Lembre-se: sem markdown, sem menção a IA, linguagem institucional e técnica.`
          }
        ],
        tools: [{
          type: 'function',
          function: {
            name: 'generate_analysis',
            description: 'Gera análise institucional estruturada da avaliação FAIQ-S',
            parameters: {
              type: 'object',
              properties: {
                executive_summary: {
                  type: 'string',
                  description: 'Sumário executivo direto e estratégico (2-3 parágrafos SEM markdown). Incluir: nível de maturidade institucional, principais riscos identificados, áreas prioritárias de atenção. Evitar elogios genéricos.'
                },
                swot_strengths: {
                  type: 'string',
                  description: 'Forças institucionais identificadas (3-5 pontos com bullet "• "). Processos consolidados, competências diferenciadas, áreas com governança madura.'
                },
                swot_weaknesses: {
                  type: 'string',
                  description: 'Áreas de atenção identificadas (3-5 pontos com bullet "• "). Lacunas em processos, riscos operacionais, deficiências de governança.'
                },
                swot_opportunities: {
                  type: 'string',
                  description: 'Oportunidades estratégicas (3-5 pontos com bullet "• "). Potenciais de desenvolvimento, alavancas de maturidade, diferenciais competitivos possíveis.'
                },
                swot_threats: {
                  type: 'string',
                  description: 'Riscos e ameaças mapeados (3-5 pontos com bullet "• "). Vulnerabilidades regulatórias, riscos clínicos, exposições organizacionais.'
                },
                risk_analysis: {
                  type: 'string',
                  description: 'Mapa de riscos CATEGORIZADO. Cada risco deve ter: categoria [Risco Clínico/Regulatório/Organizacional], área vinculada, severidade (alto/moderado/baixo), impacto potencial e estratégia de mitigação. SEM markdown.'
                },
                priority_recommendations: {
                  type: 'string',
                  description: 'Top 5 ações prioritárias ordenadas por impacto institucional. Cada ação deve ser ESPECÍFICA, derivada dos achados, com responsável sugerido e evidência esperada. SEM markdown, usar bullets "• ".'
                },
                action_plan_30_days: {
                  type: 'string',
                  description: 'Plano de ação 0-30 dias (horizonte crítico). Ações ESPECÍFICAS para mitigação de riscos prioritários identificados. Incluir: objetivo, responsável, evidência. Derivar dos achados, sem ações genéricas. SEM markdown.'
                },
                action_plan_90_days: {
                  type: 'string',
                  description: 'Plano de ação 30-90 dias (horizonte estratégico). Implementação de melhorias estruturais e capacitações. Ações ESPECÍFICAS derivadas dos achados. SEM markdown.'
                },
                action_plan_12_months: {
                  type: 'string',
                  description: 'Plano de ação 90-360 dias (horizonte de maturidade). Consolidação de governança e transformação institucional. Ações ESPECÍFICAS para elevação sustentável. SEM markdown.'
                },
                area_specific_recommendations: {
                  type: 'object',
                  description: 'Recomendações específicas para cada área com score abaixo de 75%. Chave = nome da área, valor = recomendação específica.',
                  additionalProperties: {
                    type: 'string'
                  }
                }
              },
              required: [
                'executive_summary',
                'swot_strengths',
                'swot_weaknesses',
                'swot_opportunities',
                'swot_threats',
                'risk_analysis',
                'priority_recommendations',
                'action_plan_30_days',
                'action_plan_90_days',
                'action_plan_12_months',
                'area_specific_recommendations'
              ]
            }
          }
        }],
        tool_choice: { type: 'function', function: { name: 'generate_analysis' } }
      }),
    });

    if (aiResponse.status === 429) {
      return new Response(JSON.stringify({ 
        error: 'Limite de requisições excedido. Tente novamente em alguns instantes.' 
      }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (aiResponse.status === 402) {
      return new Response(JSON.stringify({ 
        error: 'Créditos esgotados. Adicione créditos ao workspace.' 
      }), {
        status: 402,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI Gateway error:', aiResponse.status, errorText);
      throw new Error('Erro ao gerar análise');
    }

    const aiData = await aiResponse.json();
    console.log('Analysis generated successfully');

    // Extract tool call arguments
    const toolCall = aiData.choices[0].message.tool_calls?.[0];
    if (!toolCall) {
      throw new Error('Análise não retornou dados estruturados');
    }

    const analysis = JSON.parse(toolCall.function.arguments);

    // Save to database
    const { data: savedAnalysis, error: saveError } = await supabase
      .from('ai_report_analyses')
      .upsert({
        assessment_id: assessmentId,
        executive_summary: analysis.executive_summary,
        swot_strengths: analysis.swot_strengths,
        swot_weaknesses: analysis.swot_weaknesses,
        swot_opportunities: analysis.swot_opportunities,
        swot_threats: analysis.swot_threats,
        risk_analysis: analysis.risk_analysis,
        priority_recommendations: analysis.priority_recommendations,
        action_plan_30_days: analysis.action_plan_30_days,
        action_plan_90_days: analysis.action_plan_90_days,
        action_plan_12_months: analysis.action_plan_12_months,
        area_specific_recommendations: analysis.area_specific_recommendations,
        generated_at: new Date().toISOString(),
        is_manually_edited: false
      })
      .select()
      .single();

    if (saveError) throw saveError;

    console.log('Analysis saved to database');

    return new Response(JSON.stringify(savedAnalysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-assessment function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Erro desconhecido' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
