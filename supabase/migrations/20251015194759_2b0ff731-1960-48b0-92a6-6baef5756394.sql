-- Criar função security definer para verificação de roles usando user_level
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role user_level)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND level = _role
  )
$$;

-- Criar tabela de clínicas
CREATE TABLE public.clinics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  responsible_name TEXT,
  responsible_title TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar enum para classificação de avaliações
CREATE TYPE public.assessment_classification AS ENUM ('excelencia', 'qualidade', 'padrao');

-- Criar enum para status de avaliações
CREATE TYPE public.assessment_status AS ENUM ('em_andamento', 'concluida', 'revisao');

-- Criar tabela de avaliações
CREATE TABLE public.assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  clinic_id UUID NOT NULL REFERENCES public.clinics(id) ON DELETE CASCADE,
  assessor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  assessor_name TEXT NOT NULL,
  assessment_date DATE NOT NULL,
  overall_percentage NUMERIC(5,2) NOT NULL DEFAULT 0,
  total_score NUMERIC(10,2) NOT NULL DEFAULT 0,
  max_score NUMERIC(10,2) NOT NULL DEFAULT 0,
  classification assessment_classification NOT NULL DEFAULT 'padrao',
  status assessment_status NOT NULL DEFAULT 'em_andamento',
  observations TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de scores por área
CREATE TABLE public.area_scores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  area_id TEXT NOT NULL,
  area_name TEXT NOT NULL,
  total_score NUMERIC(10,2) NOT NULL DEFAULT 0,
  max_score NUMERIC(10,2) NOT NULL DEFAULT 0,
  percentage NUMERIC(5,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de scores por categoria
CREATE TABLE public.category_scores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  area_score_id UUID NOT NULL REFERENCES public.area_scores(id) ON DELETE CASCADE,
  category_id TEXT NOT NULL,
  category_name TEXT NOT NULL,
  total_score NUMERIC(10,2) NOT NULL DEFAULT 0,
  max_score NUMERIC(10,2) NOT NULL DEFAULT 0,
  percentage NUMERIC(5,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de scores por indicador
CREATE TABLE public.indicator_scores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_score_id UUID NOT NULL REFERENCES public.category_scores(id) ON DELETE CASCADE,
  indicator_id TEXT NOT NULL,
  indicator_name TEXT NOT NULL,
  score NUMERIC(3,1) NOT NULL CHECK (score IN (0, 0.5, 1)),
  weight NUMERIC(3,2) NOT NULL DEFAULT 1,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS em todas as tabelas
ALTER TABLE public.clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.area_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.category_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.indicator_scores ENABLE ROW LEVEL SECURITY;

-- RLS Policies para clinics - todos usuários autenticados podem ver
CREATE POLICY "Usuários autenticados podem ver clinics"
ON public.clinics FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins podem inserir clinics"
ON public.clinics FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins podem atualizar clinics"
ON public.clinics FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins podem deletar clinics"
ON public.clinics FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- RLS Policies para assessments
CREATE POLICY "Usuários podem ver assessments"
ON public.assessments FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND (role = 'admin' OR role = 'avaliador')
  ) OR assessor_id = auth.uid()
);

CREATE POLICY "Admins e avaliadores podem criar assessments"
ON public.assessments FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND (role = 'admin' OR role = 'avaliador')
  )
);

CREATE POLICY "Criadores e admins podem atualizar assessments"
ON public.assessments FOR UPDATE
TO authenticated
USING (
  assessor_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
)
WITH CHECK (
  assessor_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins podem deletar assessments"
ON public.assessments FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- RLS Policies para area_scores
CREATE POLICY "Acesso a area_scores baseado em assessments"
ON public.area_scores FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.assessments
    WHERE assessments.id = area_scores.assessment_id
    AND (
      assessments.assessor_id = auth.uid() OR
      EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND (role = 'admin' OR role = 'avaliador')
      )
    )
  )
);

CREATE POLICY "Criar area_scores com permissão de assessment"
ON public.area_scores FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.assessments
    WHERE assessments.id = area_scores.assessment_id
    AND (
      assessments.assessor_id = auth.uid() OR
      EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
      )
    )
  )
);

CREATE POLICY "Atualizar area_scores com permissão"
ON public.area_scores FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.assessments
    WHERE assessments.id = area_scores.assessment_id
    AND (
      assessments.assessor_id = auth.uid() OR
      EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
      )
    )
  )
);

CREATE POLICY "Deletar area_scores com permissão de admin"
ON public.area_scores FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.assessments
    WHERE assessments.id = area_scores.assessment_id
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
);

-- RLS Policies para category_scores
CREATE POLICY "Acesso a category_scores baseado em area_scores"
ON public.category_scores FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.area_scores
    JOIN public.assessments ON assessments.id = area_scores.assessment_id
    WHERE area_scores.id = category_scores.area_score_id
    AND (
      assessments.assessor_id = auth.uid() OR
      EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND (role = 'admin' OR role = 'avaliador')
      )
    )
  )
);

CREATE POLICY "Criar category_scores com permissão"
ON public.category_scores FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.area_scores
    JOIN public.assessments ON assessments.id = area_scores.assessment_id
    WHERE area_scores.id = category_scores.area_score_id
    AND (
      assessments.assessor_id = auth.uid() OR
      EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
      )
    )
  )
);

CREATE POLICY "Atualizar category_scores com permissão"
ON public.category_scores FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.area_scores
    JOIN public.assessments ON assessments.id = area_scores.assessment_id
    WHERE area_scores.id = category_scores.area_score_id
    AND (
      assessments.assessor_id = auth.uid() OR
      EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
      )
    )
  )
);

CREATE POLICY "Deletar category_scores com permissão de admin"
ON public.category_scores FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.area_scores
    JOIN public.assessments ON assessments.id = area_scores.assessment_id
    WHERE area_scores.id = category_scores.area_score_id
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
);

-- RLS Policies para indicator_scores
CREATE POLICY "Acesso a indicator_scores baseado em category_scores"
ON public.indicator_scores FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.category_scores
    JOIN public.area_scores ON area_scores.id = category_scores.area_score_id
    JOIN public.assessments ON assessments.id = area_scores.assessment_id
    WHERE category_scores.id = indicator_scores.category_score_id
    AND (
      assessments.assessor_id = auth.uid() OR
      EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND (role = 'admin' OR role = 'avaliador')
      )
    )
  )
);

CREATE POLICY "Criar indicator_scores com permissão"
ON public.indicator_scores FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.category_scores
    JOIN public.area_scores ON area_scores.id = category_scores.area_score_id
    JOIN public.assessments ON assessments.id = area_scores.assessment_id
    WHERE category_scores.id = indicator_scores.category_score_id
    AND (
      assessments.assessor_id = auth.uid() OR
      EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
      )
    )
  )
);

CREATE POLICY "Atualizar indicator_scores com permissão"
ON public.indicator_scores FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.category_scores
    JOIN public.area_scores ON area_scores.id = category_scores.area_score_id
    JOIN public.assessments ON assessments.id = area_scores.assessment_id
    WHERE category_scores.id = indicator_scores.category_score_id
    AND (
      assessments.assessor_id = auth.uid() OR
      EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
      )
    )
  )
);

CREATE POLICY "Deletar indicator_scores com permissão de admin"
ON public.indicator_scores FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.category_scores
    JOIN public.area_scores ON area_scores.id = category_scores.area_score_id
    JOIN public.assessments ON assessments.id = area_scores.assessment_id
    WHERE category_scores.id = indicator_scores.category_score_id
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
);

-- Triggers para updated_at
CREATE TRIGGER update_clinics_updated_at
BEFORE UPDATE ON public.clinics
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_assessments_updated_at
BEFORE UPDATE ON public.assessments
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Criar índices para performance
CREATE INDEX idx_assessments_clinic_id ON public.assessments(clinic_id);
CREATE INDEX idx_assessments_assessor_id ON public.assessments(assessor_id);
CREATE INDEX idx_assessments_status ON public.assessments(status);
CREATE INDEX idx_assessments_date ON public.assessments(assessment_date DESC);
CREATE INDEX idx_area_scores_assessment_id ON public.area_scores(assessment_id);
CREATE INDEX idx_category_scores_area_score_id ON public.category_scores(area_score_id);
CREATE INDEX idx_indicator_scores_category_score_id ON public.indicator_scores(category_score_id);