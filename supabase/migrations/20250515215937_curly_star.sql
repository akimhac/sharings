/*
  # Add missing columns to registrations table

  1. Changes
    - Add role column to registrations table
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'registrations' AND column_name = 'role'
  ) THEN
    ALTER TABLE registrations ADD COLUMN role text NOT NULL DEFAULT 'coiffeur';
  END IF;
END $$;