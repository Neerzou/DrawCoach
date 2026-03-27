const { supabase } = require('../lib/supabase')

// Middleware de vérification du token JWT Supabase
// À utiliser sur toutes les routes privées
async function requireAuth(req, res, next) {
  // Récupérer le token dans le header Authorization
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token manquant ou invalide' })
  }

  const token = authHeader.split(' ')[1]

  // Vérifier le token auprès de Supabase
  const { data: { user }, error } = await supabase.auth.getUser(token)

  if (error || !user) {
    return res.status(401).json({ error: 'Non autorisé' })
  }

  // Attacher l'utilisateur à la requête pour les controllers suivants
  req.user = user
  next()
}

module.exports = { requireAuth }
