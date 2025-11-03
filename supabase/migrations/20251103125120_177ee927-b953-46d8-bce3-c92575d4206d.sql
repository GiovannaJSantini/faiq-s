-- Remove hardcoded admin email from trigger function
-- Always assign 'cliente' role by default, admin promotion should be manual

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (id, name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.email
  );
  
  -- Always assign 'cliente' role by default
  -- Admins should be manually promoted via UPDATE statement
  INSERT INTO public.user_roles (user_id, role, level)
  VALUES (NEW.id, 'cliente'::app_role, 'padrao'::user_level);
  
  RETURN NEW;
END;
$$;