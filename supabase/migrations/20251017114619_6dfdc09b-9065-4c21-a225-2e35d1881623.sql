-- CRITICAL SECURITY FIX: Move roles to separate table to prevent privilege escalation

-- Create app_role enum for role types
CREATE TYPE public.app_role AS ENUM ('admin', 'avaliador', 'cliente');

-- Add role column to user_roles table (currently only has level)
ALTER TABLE public.user_roles ADD COLUMN role public.app_role NOT NULL DEFAULT 'cliente';

-- Create unique constraint to prevent duplicate role assignments
ALTER TABLE public.user_roles ADD CONSTRAINT user_roles_user_id_key UNIQUE (user_id);

-- Create security definer function to check user role (bypasses RLS)
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id uuid)
RETURNS app_role
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.user_roles WHERE user_id = _user_id LIMIT 1
$$;

-- Create helper function to check if user has specific role
CREATE OR REPLACE FUNCTION public.has_app_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Migrate existing roles from profiles to user_roles
UPDATE public.user_roles ur
SET role = CASE 
  WHEN p.role = 'admin' THEN 'admin'::app_role
  WHEN p.role = 'avaliador' THEN 'avaliador'::app_role
  ELSE 'cliente'::app_role
END
FROM public.profiles p
WHERE ur.user_id = p.id;

-- Update handle_new_user function to set role in user_roles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert profile without role
  INSERT INTO public.profiles (id, name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.email
  );
  
  -- Insert user_roles with default cliente role and padrao level
  INSERT INTO public.user_roles (user_id, role, level)
  VALUES (
    NEW.id,
    CASE 
      WHEN NEW.email = 'giovannaj.santini@gmail.com' THEN 'admin'::app_role
      ELSE 'cliente'::app_role
    END,
    'padrao'::user_level
  );
  
  RETURN NEW;
END;
$$;

-- Drop role column from profiles (after migration is complete)
-- This will be done in a separate step to ensure data integrity
-- ALTER TABLE public.profiles DROP COLUMN role;

-- Update RLS policies to use new role system

-- Profiles table policies
DROP POLICY IF EXISTS "Admins podem ver todos os perfis" ON public.profiles;
CREATE POLICY "Admins podem ver todos os perfis"
ON public.profiles FOR SELECT
TO authenticated
USING (public.has_app_role(auth.uid(), 'admin'));

-- User roles policies
DROP POLICY IF EXISTS "Admins podem ver todos os níveis" ON public.user_roles;
CREATE POLICY "Admins podem ver todos os níveis"
ON public.user_roles FOR SELECT
TO authenticated
USING (public.has_app_role(auth.uid(), 'admin'));

CREATE POLICY "Admins podem atualizar roles"
ON public.user_roles FOR UPDATE
TO authenticated
USING (public.has_app_role(auth.uid(), 'admin'))
WITH CHECK (public.has_app_role(auth.uid(), 'admin'));

-- Clinics policies - only admins can manage
DROP POLICY IF EXISTS "Usuários autenticados podem ver clinics" ON public.clinics;
DROP POLICY IF EXISTS "Admins podem inserir clinics" ON public.clinics;
DROP POLICY IF EXISTS "Admins podem atualizar clinics" ON public.clinics;
DROP POLICY IF EXISTS "Admins podem deletar clinics" ON public.clinics;

CREATE POLICY "Admins e avaliadores podem ver clinics"
ON public.clinics FOR SELECT
TO authenticated
USING (
  public.has_app_role(auth.uid(), 'admin') OR 
  public.has_app_role(auth.uid(), 'avaliador') OR
  -- Clientes podem ver apenas suas próprias clínicas (através de assessments)
  (public.has_app_role(auth.uid(), 'cliente') AND EXISTS (
    SELECT 1 FROM public.assessments
    WHERE clinic_id = clinics.id AND assessor_id = auth.uid()
  ))
);

CREATE POLICY "Admins podem inserir clinics"
ON public.clinics FOR INSERT
TO authenticated
WITH CHECK (public.has_app_role(auth.uid(), 'admin'));

CREATE POLICY "Admins podem atualizar clinics"
ON public.clinics FOR UPDATE
TO authenticated
USING (public.has_app_role(auth.uid(), 'admin'))
WITH CHECK (public.has_app_role(auth.uid(), 'admin'));

CREATE POLICY "Admins podem deletar clinics"
ON public.clinics FOR DELETE
TO authenticated
USING (public.has_app_role(auth.uid(), 'admin'));

-- Assessments policies
DROP POLICY IF EXISTS "Usuários podem ver assessments" ON public.assessments;
DROP POLICY IF EXISTS "Admins e avaliadores podem criar assessments" ON public.assessments;
DROP POLICY IF EXISTS "Criadores e admins podem atualizar assessments" ON public.assessments;

CREATE POLICY "Usuários podem ver assessments baseado em role"
ON public.assessments FOR SELECT
TO authenticated
USING (
  public.has_app_role(auth.uid(), 'admin') OR
  public.has_app_role(auth.uid(), 'avaliador') OR
  assessor_id = auth.uid()
);

CREATE POLICY "Admins e avaliadores podem criar assessments"
ON public.assessments FOR INSERT
TO authenticated
WITH CHECK (
  public.has_app_role(auth.uid(), 'admin') OR
  public.has_app_role(auth.uid(), 'avaliador')
);

CREATE POLICY "Criadores e admins podem atualizar assessments"
ON public.assessments FOR UPDATE
TO authenticated
USING (
  assessor_id = auth.uid() OR
  public.has_app_role(auth.uid(), 'admin')
)
WITH CHECK (
  assessor_id = auth.uid() OR
  public.has_app_role(auth.uid(), 'admin')
);