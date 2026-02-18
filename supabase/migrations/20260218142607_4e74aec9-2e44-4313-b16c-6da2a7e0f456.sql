
-- 1. Política perquè admins puguin veure tots els perfils
CREATE POLICY "Admins can view all profiles"
  ON public.profiles
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- 2. Funció segura per obtenir tots els usuaris amb el seu email (des de auth.users)
CREATE OR REPLACE FUNCTION public.get_all_users_admin()
RETURNS TABLE (
  user_id uuid,
  name text,
  pronouns text,
  voice text,
  photo_url text,
  created_at timestamptz,
  email text,
  role text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Només admins poden cridar aquesta funció
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied';
  END IF;

  RETURN QUERY
  SELECT
    p.user_id,
    p.name,
    p.pronouns,
    p.voice,
    p.photo_url,
    p.created_at,
    u.email::text,
    COALESCE(r.role::text, 'user') AS role
  FROM public.profiles p
  LEFT JOIN auth.users u ON u.id = p.user_id
  LEFT JOIN public.user_roles r ON r.user_id = p.user_id AND r.role = 'admin'
  ORDER BY p.created_at DESC;
END;
$$;
