
-- Create enum types for better data integrity
CREATE TYPE public.user_role AS ENUM ('admin', 'avaliador', 'cliente');
CREATE TYPE public.assessment_status AS ENUM ('em_andamento', 'concluida', 'revisao');
CREATE TYPE public.classification_type AS ENUM ('excelencia', 'qualidade', 'padrao');
CREATE TYPE public.clinic_type AS ENUM ('hospital', 'clinica', 'posto_saude', 'laboratorio', 'outro');

-- Create profiles table for user management
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  role user_role NOT NULL DEFAULT 'cliente',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create clinics table
CREATE TABLE public.clinics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  type clinic_type NOT NULL,
  created_by UUID REFERENCES public.profiles(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create areas table (10 areas of FAIQ)
CREATE TABLE public.areas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create categories table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  area_id UUID REFERENCES public.areas(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indicators table
CREATE TABLE public.indicators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  weight DECIMAL(3,2) NOT NULL DEFAULT 1.0,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create assessments table
CREATE TABLE public.assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID REFERENCES public.clinics(id) ON DELETE CASCADE NOT NULL,
  assessor_id UUID REFERENCES public.profiles(id) NOT NULL,
  assessment_date DATE NOT NULL,
  status assessment_status NOT NULL DEFAULT 'em_andamento',
  total_score DECIMAL(5,2),
  max_score DECIMAL(5,2),
  overall_percentage DECIMAL(5,2),
  classification classification_type,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indicator_scores table
CREATE TABLE public.indicator_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID REFERENCES public.assessments(id) ON DELETE CASCADE NOT NULL,
  indicator_id UUID REFERENCES public.indicators(id) ON DELETE CASCADE NOT NULL,
  score DECIMAL(2,1) NOT NULL CHECK (score IN (0, 0.5, 1)),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(assessment_id, indicator_id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.indicators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.indicator_scores ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create RLS policies for clinics
CREATE POLICY "Users can view all clinics" ON public.clinics
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create clinics" ON public.clinics
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Creators and admins can update clinics" ON public.clinics
  FOR UPDATE USING (
    auth.uid() = created_by OR 
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create RLS policies for areas, categories, and indicators (read-only for most users)
CREATE POLICY "Everyone can view areas" ON public.areas
  FOR SELECT USING (true);

CREATE POLICY "Everyone can view categories" ON public.categories
  FOR SELECT USING (true);

CREATE POLICY "Everyone can view indicators" ON public.indicators
  FOR SELECT USING (true);

-- Create RLS policies for assessments
CREATE POLICY "Users can view assessments they created or for their clinics" ON public.assessments
  FOR SELECT USING (
    auth.uid() = assessor_id OR
    EXISTS (
      SELECT 1 FROM public.clinics 
      WHERE id = clinic_id AND created_by = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Assessors can create assessments" ON public.assessments
  FOR INSERT WITH CHECK (
    auth.uid() = assessor_id AND
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('avaliador', 'admin')
    )
  );

CREATE POLICY "Assessors can update their own assessments" ON public.assessments
  FOR UPDATE USING (
    auth.uid() = assessor_id OR
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create RLS policies for indicator_scores
CREATE POLICY "Users can view scores for assessments they can access" ON public.indicator_scores
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.assessments 
      WHERE id = assessment_id AND (
        assessor_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM public.clinics 
          WHERE id = clinic_id AND created_by = auth.uid()
        ) OR
        EXISTS (
          SELECT 1 FROM public.profiles 
          WHERE id = auth.uid() AND role = 'admin'
        )
      )
    )
  );

CREATE POLICY "Assessors can manage scores for their assessments" ON public.indicator_scores
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.assessments 
      WHERE id = assessment_id AND (
        assessor_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM public.profiles 
          WHERE id = auth.uid() AND role = 'admin'
        )
      )
    )
  );

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.email,
    'cliente'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert the 10 areas of FAIQ
INSERT INTO public.areas (name, description, order_index) VALUES
('Liderança e Gestão', 'Avaliação da liderança organizacional e processos de gestão', 1),
('Estratégia e Planejamento', 'Planejamento estratégico e definição de objetivos organizacionais', 2),
('Foco no Cliente/Paciente', 'Orientação para satisfação e necessidades do cliente/paciente', 3),
('Informação e Conhecimento', 'Gestão da informação e conhecimento organizacional', 4),
('Pessoas', 'Gestão de recursos humanos e desenvolvimento de competências', 5),
('Processos', 'Gestão e melhoria de processos organizacionais', 6),
('Resultados', 'Mensuração e análise de resultados organizacionais', 7),
('Sociedade', 'Responsabilidade social e relacionamento com a comunidade', 8),
('Fornecedores', 'Gestão de relacionamento com fornecedores e parceiros', 9),
('Sustentabilidade', 'Práticas sustentáveis e responsabilidade ambiental', 10);
