-- Update handle_new_user function to assign admin role to specific emails
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_emails TEXT[] := ARRAY['paulabragakenyon@gmail.com', 'juliasargi@gmail.com', 'giovannaj.santini@gmail.com'];
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (id, name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.email
  );
  
  -- Check if email should be admin
  IF NEW.email = ANY(admin_emails) THEN
    INSERT INTO public.user_roles (user_id, role, level)
    VALUES (NEW.id, 'admin'::app_role, 'excelencia'::user_level);
  ELSE
    -- Assign default 'cliente' role
    INSERT INTO public.user_roles (user_id, role, level)
    VALUES (NEW.id, 'cliente'::app_role, 'padrao'::user_level);
  END IF;
  
  RETURN NEW;
END;
$$;