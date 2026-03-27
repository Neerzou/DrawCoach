const express = require('express')
const router = express.Router()
const { getLessons, getLessonById, completeLesson } = require('../controllers/lessonsController')
const { requireAuth } = require('../middleware/auth')
const { supabase } = require('../lib/supabase')

// Middleware d'auth optionnelle : tente de récupérer l'utilisateur sans bloquer
async function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]
    try {
      const { data: { user } } = await supabase.auth.getUser(token)
      req.user = user || null
    } catch {
      req.user = null
    }
  }
  next()
}

// Récupérer toutes les leçons (auth optionnelle pour afficher la progression)
router.get('/', optionalAuth, getLessons)

// Récupérer une leçon par ID (auth optionnelle)
router.get('/:id', optionalAuth, getLessonById)

// Marquer une leçon comme complétée (auth obligatoire)
router.post('/:id/complete', requireAuth, completeLesson)

module.exports = router
