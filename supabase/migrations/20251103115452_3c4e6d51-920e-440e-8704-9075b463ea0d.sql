-- Update remaining RLS policies that still reference profiles.role
-- This completes the migration to using has_app_role() for all role checks

-- User consents policies
DROP POLICY IF EXISTS "Admins podem ver todos os consentimentos" ON public.user_consents;
CREATE POLICY "Admins podem ver todos os consentimentos"
ON public.user_consents FOR SELECT
TO authenticated
USING (public.has_app_role(auth.uid(), 'admin'));

-- Assessments DELETE policy (was still referencing profiles.role)
DROP POLICY IF EXISTS "Admins podem deletar assessments" ON public.assessments;
CREATE POLICY "Admins podem deletar assessments"
ON public.assessments FOR DELETE
TO authenticated
USING (public.has_app_role(auth.uid(), 'admin'));

-- Area scores policies
DROP POLICY IF EXISTS "Acesso a area_scores baseado em assessments" ON public.area_scores;
CREATE POLICY "Acesso a area_scores baseado em assessments"
ON public.area_scores FOR SELECT
TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.assessments
  WHERE assessments.id = area_scores.assessment_id 
  AND (
    assessments.assessor_id = auth.uid() 
    OR public.has_app_role(auth.uid(), 'admin')
    OR public.has_app_role(auth.uid(), 'avaliador')
  )
));

DROP POLICY IF EXISTS "Criar area_scores com permissão de assessment" ON public.area_scores;
CREATE POLICY "Criar area_scores com permissão de assessment"
ON public.area_scores FOR INSERT
TO authenticated
WITH CHECK (EXISTS (
  SELECT 1 FROM public.assessments
  WHERE assessments.id = area_scores.assessment_id 
  AND (
    assessments.assessor_id = auth.uid() 
    OR public.has_app_role(auth.uid(), 'admin')
  )
));

DROP POLICY IF EXISTS "Atualizar area_scores com permissão" ON public.area_scores;
CREATE POLICY "Atualizar area_scores com permissão"
ON public.area_scores FOR UPDATE
TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.assessments
  WHERE assessments.id = area_scores.assessment_id 
  AND (
    assessments.assessor_id = auth.uid() 
    OR public.has_app_role(auth.uid(), 'admin')
  )
));

DROP POLICY IF EXISTS "Deletar area_scores com permissão de admin" ON public.area_scores;
CREATE POLICY "Deletar area_scores com permissão de admin"
ON public.area_scores FOR DELETE
TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.assessments
  WHERE assessments.id = area_scores.assessment_id 
  AND public.has_app_role(auth.uid(), 'admin')
));

-- Category scores policies
DROP POLICY IF EXISTS "Acesso a category_scores baseado em area_scores" ON public.category_scores;
CREATE POLICY "Acesso a category_scores baseado em area_scores"
ON public.category_scores FOR SELECT
TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.area_scores
  JOIN public.assessments ON assessments.id = area_scores.assessment_id
  WHERE area_scores.id = category_scores.area_score_id 
  AND (
    assessments.assessor_id = auth.uid() 
    OR public.has_app_role(auth.uid(), 'admin')
    OR public.has_app_role(auth.uid(), 'avaliador')
  )
));

DROP POLICY IF EXISTS "Criar category_scores com permissão" ON public.category_scores;
CREATE POLICY "Criar category_scores com permissão"
ON public.category_scores FOR INSERT
TO authenticated
WITH CHECK (EXISTS (
  SELECT 1 FROM public.area_scores
  JOIN public.assessments ON assessments.id = area_scores.assessment_id
  WHERE area_scores.id = category_scores.area_score_id 
  AND (
    assessments.assessor_id = auth.uid() 
    OR public.has_app_role(auth.uid(), 'admin')
  )
));

DROP POLICY IF EXISTS "Atualizar category_scores com permissão" ON public.category_scores;
CREATE POLICY "Atualizar category_scores com permissão"
ON public.category_scores FOR UPDATE
TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.area_scores
  JOIN public.assessments ON assessments.id = area_scores.assessment_id
  WHERE area_scores.id = category_scores.area_score_id 
  AND (
    assessments.assessor_id = auth.uid() 
    OR public.has_app_role(auth.uid(), 'admin')
  )
));

DROP POLICY IF EXISTS "Deletar category_scores com permissão de admin" ON public.category_scores;
CREATE POLICY "Deletar category_scores com permissão de admin"
ON public.category_scores FOR DELETE
TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.area_scores
  JOIN public.assessments ON assessments.id = area_scores.assessment_id
  WHERE area_scores.id = category_scores.area_score_id 
  AND public.has_app_role(auth.uid(), 'admin')
));

-- Indicator scores policies
DROP POLICY IF EXISTS "Acesso a indicator_scores baseado em category_scores" ON public.indicator_scores;
CREATE POLICY "Acesso a indicator_scores baseado em category_scores"
ON public.indicator_scores FOR SELECT
TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.category_scores
  JOIN public.area_scores ON area_scores.id = category_scores.area_score_id
  JOIN public.assessments ON assessments.id = area_scores.assessment_id
  WHERE category_scores.id = indicator_scores.category_score_id 
  AND (
    assessments.assessor_id = auth.uid() 
    OR public.has_app_role(auth.uid(), 'admin')
    OR public.has_app_role(auth.uid(), 'avaliador')
  )
));

DROP POLICY IF EXISTS "Criar indicator_scores com permissão" ON public.indicator_scores;
CREATE POLICY "Criar indicator_scores com permissão"
ON public.indicator_scores FOR INSERT
TO authenticated
WITH CHECK (EXISTS (
  SELECT 1 FROM public.category_scores
  JOIN public.area_scores ON area_scores.id = category_scores.area_score_id
  JOIN public.assessments ON assessments.id = area_scores.assessment_id
  WHERE category_scores.id = indicator_scores.category_score_id 
  AND (
    assessments.assessor_id = auth.uid() 
    OR public.has_app_role(auth.uid(), 'admin')
  )
));

DROP POLICY IF EXISTS "Atualizar indicator_scores com permissão" ON public.indicator_scores;
CREATE POLICY "Atualizar indicator_scores com permissão"
ON public.indicator_scores FOR UPDATE
TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.category_scores
  JOIN public.area_scores ON area_scores.id = category_scores.area_score_id
  JOIN public.assessments ON assessments.id = area_scores.assessment_id
  WHERE category_scores.id = indicator_scores.category_score_id 
  AND (
    assessments.assessor_id = auth.uid() 
    OR public.has_app_role(auth.uid(), 'admin')
  )
));

DROP POLICY IF EXISTS "Deletar indicator_scores com permissão de admin" ON public.indicator_scores;
CREATE POLICY "Deletar indicator_scores com permissão de admin"
ON public.indicator_scores FOR DELETE
TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.category_scores
  JOIN public.area_scores ON area_scores.id = category_scores.area_score_id
  JOIN public.assessments ON assessments.id = area_scores.assessment_id
  WHERE category_scores.id = indicator_scores.category_score_id 
  AND public.has_app_role(auth.uid(), 'admin')
));

-- Now safe to drop the legacy role column from profiles
ALTER TABLE public.profiles DROP COLUMN IF EXISTS role;