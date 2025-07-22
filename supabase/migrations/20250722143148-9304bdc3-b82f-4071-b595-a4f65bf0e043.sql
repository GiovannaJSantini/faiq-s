
-- Criar enum para níveis de usuário
CREATE TYPE public.user_level AS ENUM ('padrao', 'qualidade', 'excelencia');

-- Criar tabela de papéis de usuário
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    level user_level NOT NULL DEFAULT 'padrao',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Habilitar RLS na tabela user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Política para usuários verem seus próprios níveis
CREATE POLICY "Users can view their own level" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Política para administradores gerenciarem níveis (se necessário no futuro)
CREATE POLICY "Admins can manage user levels" 
ON public.user_roles 
FOR ALL 
USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
));

-- Função para verificar nível do usuário
CREATE OR REPLACE FUNCTION public.get_user_level(user_uuid UUID)
RETURNS user_level
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
    SELECT level FROM public.user_roles WHERE user_id = user_uuid;
$$;

-- Atualizar função handle_new_user para incluir nível padrão
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Inserir perfil
  INSERT INTO public.profiles (id, name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.email,
    'cliente'
  );
  
  -- Inserir nível padrão do usuário
  INSERT INTO public.user_roles (user_id, level)
  VALUES (NEW.id, 'padrao');
  
  RETURN NEW;
END;
$$;
