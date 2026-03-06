-- Run this SQL in your Supabase SQL Editor to set up the Student Approval system

CREATE TABLE public.student_requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.student_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert a request (needed for registration)
CREATE POLICY "Allow public insert of student requests" ON public.student_requests
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow anyone to read requests (to check their status during login)
CREATE POLICY "Allow public select of student requests" ON public.student_requests
  FOR SELECT
  TO public
  USING (true);

-- Restrict updates to authenticated admins only
CREATE POLICY "Allow admins to update student requests" ON public.student_requests
  FOR UPDATE
  TO authenticated
  USING (true);
