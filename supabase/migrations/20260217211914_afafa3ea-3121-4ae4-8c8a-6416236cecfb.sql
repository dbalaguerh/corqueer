
-- Create storage bucket for song files
INSERT INTO storage.buckets (id, name, public) VALUES ('songs', 'songs', true);

-- Allow public read access
CREATE POLICY "Song files are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'songs');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload songs"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'songs' AND auth.role() = 'authenticated');
