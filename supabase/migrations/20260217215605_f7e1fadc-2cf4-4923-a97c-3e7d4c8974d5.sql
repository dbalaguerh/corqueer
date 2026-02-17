
-- Create wall_posts table
CREATE TABLE public.wall_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL DEFAULT '',
  content TEXT,
  media_urls TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.wall_posts ENABLE ROW LEVEL SECURITY;

-- Everyone authenticated can read all posts
CREATE POLICY "Authenticated users can view all posts"
  ON public.wall_posts FOR SELECT
  TO authenticated
  USING (true);

-- Users can insert their own posts
CREATE POLICY "Users can create their own posts"
  ON public.wall_posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- No update or delete policies = posts are permanent

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.wall_posts;

-- Create storage bucket for wall media
INSERT INTO storage.buckets (id, name, public) VALUES ('wall-media', 'wall-media', true);

-- Storage policies
CREATE POLICY "Authenticated users can upload wall media"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'wall-media');

CREATE POLICY "Anyone can view wall media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'wall-media');
