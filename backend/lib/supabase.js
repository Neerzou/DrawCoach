const { createClient } = require('@supabase/supabase-js')

// Client Supabase avec la clé service_role (accès admin, côté serveur uniquement)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)

module.exports = { supabase }
