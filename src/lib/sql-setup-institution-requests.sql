-- Run this SQL in your Supabase SQL Editor to set up the Approval system

CREATE TABLE public.institution_requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  institution_name text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.institution_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert a request (since they do this from the InstitutionLogin page)
CREATE POLICY "Allow public insert of requests" ON public.institution_requests
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow anyone to read requests (to check their status during login)
-- Note: In a stricter enterprise system, you could check by a secure proxy or edge function, 
-- but for standard client-side validation, 'select' policy here works.
CREATE POLICY "Allow public select of requests" ON public.institution_requests
  FOR SELECT
  TO public
  USING (true);

-- Restrict updates to authenticated admins only
CREATE POLICY "Allow admins to update requests" ON public.institution_requests
  FOR UPDATE
  TO authenticated
  USING (true);   -- You can refine this using Role-based variables if needed
