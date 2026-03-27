import { createClient } from '@supabase/supabase-js'

// Initialisation du client Supabase pour le frontend
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variables Supabase manquantes dans le fichier .env')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
