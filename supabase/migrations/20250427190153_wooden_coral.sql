/*
  # Add user_id to registrations table

  1. Changes
    - Add user_id column to registrations table
    - Add foreign key constraint to auth.users
    - Update RLS policies to include user_id checks
*/

ALTER TABLE registrations 
ADD COLUMN user_id UUID REFERENCES auth.users(id);

-- Update RLS policies
DROP POLICY IF EXISTS "Service role can read all registrations" ON registrations;
DROP POLICY IF EXISTS "Anyone can insert registrations" ON registrations;

CREATE POLICY "Service role can read all registrations"
  ON registrations
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Users can read own registrations"
  ON registrations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can insert registrations"
  ON registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);