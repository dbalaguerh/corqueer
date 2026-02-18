
CREATE TABLE public.song_lyrics (
  id integer PRIMARY KEY,
  title text NOT NULL,
  lyrics text,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_by uuid
);

ALTER TABLE public.song_lyrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view lyrics"
  ON public.song_lyrics FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update lyrics"
  ON public.song_lyrics FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert lyrics"
  ON public.song_lyrics FOR INSERT
  TO authenticated
  WITH CHECK (true);
