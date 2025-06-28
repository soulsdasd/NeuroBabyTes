import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rulgslblhzfitjcujvps.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1bGdzbGJsaHpmaXRqY3VqdnBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxMjkyNDYsImV4cCI6MjA2NTcwNTI0Nn0.jxhxQz3jgaksTD9-QHtB9MCeIWt45PTVKgRLkDqnUEg';

export const supabase = createClient(supabaseUrl, supabaseKey)