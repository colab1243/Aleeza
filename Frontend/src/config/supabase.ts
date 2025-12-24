import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oarcrfzmikzaftifqroa.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hcmNyZnptaWt6YWZ0aWZxcm9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY2MDI2MDMsImV4cCI6MjA4MjE3ODYwM30.ZD1CLzgKXcdmkvjqDbuzSujylUGaaULtldb8YDfDEH4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

