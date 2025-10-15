-- Adicionar 'avaliador' ao enum user_role
ALTER TYPE public.user_role ADD VALUE IF NOT EXISTS 'avaliador';