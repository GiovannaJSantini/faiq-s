-- Adicionar 'avaliador' ao enum user_role em transação separada
ALTER TYPE public.user_role ADD VALUE IF NOT EXISTS 'avaliador';