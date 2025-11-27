-- Create table for AI-generated report analyses
CREATE TABLE ai_report_analyses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE UNIQUE,
  
  -- AI-generated and editable fields
  executive_summary TEXT,
  swot_strengths TEXT,
  swot_weaknesses TEXT,
  swot_opportunities TEXT,
  swot_threats TEXT,
  risk_analysis TEXT,
  priority_recommendations TEXT,
  action_plan_30_days TEXT,
  action_plan_90_days TEXT,
  action_plan_12_months TEXT,
  area_specific_recommendations JSONB,
  
  -- Metadata
  generated_at TIMESTAMPTZ DEFAULT now(),
  last_edited_at TIMESTAMPTZ,
  edited_by UUID REFERENCES auth.users(id),
  is_manually_edited BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE ai_report_analyses ENABLE ROW LEVEL SECURITY;

-- Policies: Users can view analyses for assessments they have access to
CREATE POLICY "Users can view AI analyses they have access to"
  ON ai_report_analyses
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM assessments
      WHERE assessments.id = ai_report_analyses.assessment_id
      AND (
        assessments.assessor_id = auth.uid()
        OR has_app_role(auth.uid(), 'admin'::app_role)
        OR has_app_role(auth.uid(), 'avaliador'::app_role)
      )
    )
  );

-- Policies: Users can create AI analyses for assessments they created
CREATE POLICY "Users can create AI analyses for their assessments"
  ON ai_report_analyses
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM assessments
      WHERE assessments.id = ai_report_analyses.assessment_id
      AND (
        assessments.assessor_id = auth.uid()
        OR has_app_role(auth.uid(), 'admin'::app_role)
        OR has_app_role(auth.uid(), 'avaliador'::app_role)
      )
    )
  );

-- Policies: Users can update AI analyses they have access to
CREATE POLICY "Users can update AI analyses they have access to"
  ON ai_report_analyses
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM assessments
      WHERE assessments.id = ai_report_analyses.assessment_id
      AND (
        assessments.assessor_id = auth.uid()
        OR has_app_role(auth.uid(), 'admin'::app_role)
        OR has_app_role(auth.uid(), 'avaliador'::app_role)
      )
    )
  );

-- Policies: Admins can delete AI analyses
CREATE POLICY "Admins can delete AI analyses"
  ON ai_report_analyses
  FOR DELETE
  USING (has_app_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_ai_report_analyses_updated_at
  BEFORE UPDATE ON ai_report_analyses
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();