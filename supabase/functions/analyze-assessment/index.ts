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
    console.log('Starting AI analysis for assessment:', assessmentId);

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

    // Build comprehensive context for AI
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
            content: `Você é um consultor sênior especializado em gestão de qualidade e processos organizacionais para clínicas de saúde e farmácias. Analise avaliações FAIQ-S e gere insights acionáveis, priorizando áreas com maior impacto no negócio e segurança do paciente. Seja específico, prático e orientado a resultados.`
          },
          {
            role: 'user',
            content: `Analise a seguinte avaliação FAIQ-S e gere uma análise detalhada:

CLÍNICA: ${contextData.clinic.name} (${contextData.clinic.type})
LOCALIZAÇÃO: ${contextData.clinic.location}
DATA: ${contextData.assessmentDate}
PONTUAÇÃO GERAL: ${contextData.overallScore.toFixed(1)}%
CLASSIFICAÇÃO: ${contextData.classification}

ÁREAS AVALIADAS:
${contextData.areas.map((area: any) => `
${area.name}: ${area.score.toFixed(1)}%
${area.categories.map((cat: any) => `  - ${cat.name}: ${cat.score.toFixed(1)}%`).join('\n')}
`).join('\n')}

INDICADORES CRÍTICOS (score < 0.5):
${contextData.areas.flatMap((area: any) => 
  area.categories.flatMap((cat: any) => 
    cat.indicators.filter((ind: any) => ind.score < 0.5)
      .map((ind: any) => `- ${ind.name}: ${ind.score} ${ind.notes ? '(Obs: ' + ind.notes + ')' : ''}`)
  )
).join('\n')}

Gere uma análise estruturada usando a ferramenta fornecida.`
          }
        ],
        tools: [{
          type: 'function',
          function: {
            name: 'generate_analysis',
            description: 'Gera análise estruturada da avaliação FAIQ-S',
            parameters: {
              type: 'object',
              properties: {
                executive_summary: {
                  type: 'string',
                  description: 'Sumário executivo (2-3 parágrafos) destacando principais achados, pontuação geral e nível de maturidade'
                },
                swot_strengths: {
                  type: 'string',
                  description: 'Forças identificadas (3-5 pontos em bullet list)'
                },
                swot_weaknesses: {
                  type: 'string',
                  description: 'Fraquezas identificadas (3-5 pontos em bullet list)'
                },
                swot_opportunities: {
                  type: 'string',
                  description: 'Oportunidades de melhoria (3-5 pontos em bullet list)'
                },
                swot_threats: {
                  type: 'string',
                  description: 'Ameaças e riscos (3-5 pontos em bullet list)'
                },
                risk_analysis: {
                  type: 'string',
                  description: 'Análise de riscos detalhada com severidade e estratégias de mitigação'
                },
                priority_recommendations: {
                  type: 'string',
                  description: 'Top 5 recomendações prioritárias ordenadas por impacto'
                },
                action_plan_30_days: {
                  type: 'string',
                  description: 'Plano de ação para 30 dias (ações imediatas e rápidas vitórias)'
                },
                action_plan_90_days: {
                  type: 'string',
                  description: 'Plano de ação para 90 dias (melhorias estruturais)'
                },
                action_plan_12_months: {
                  type: 'string',
                  description: 'Plano de ação para 12 meses (transformação estratégica)'
                },
                area_specific_recommendations: {
                  type: 'object',
                  description: 'Recomendações específicas para cada área com score < 75%',
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
        error: 'Créditos de IA esgotados. Adicione créditos ao workspace.' 
      }), {
        status: 402,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI Gateway error:', aiResponse.status, errorText);
      throw new Error('Erro ao gerar análise IA');
    }

    const aiData = await aiResponse.json();
    console.log('AI analysis generated successfully');

    // Extract tool call arguments
    const toolCall = aiData.choices[0].message.tool_calls?.[0];
    if (!toolCall) {
      throw new Error('AI não retornou análise estruturada');
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