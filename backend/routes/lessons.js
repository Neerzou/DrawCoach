const express = require('express')
const router = express.Router()
const { getLessons, getLessonById, completeLesson } = require('../controllers/lessonsController')
const { requireAuth } = require('../middleware/auth')

// Récupérer toutes les leçons (auth optionnelle pour afficher la progression)
router.get('/', (req, res, next) => {
  // Tenter d'authentifier sans bloquer si pas de token
  const authHeader = req.headers.authorization
  if (authHeader) {
    return requireAuth(req, res, () => getLessons(req, res))
  }
  getLessons(req, res)
})

// Récupérer une leçon par ID (auth optionnelle)
router.get('/:id', (req, res, next) => {
  const authHeader = req.headers.authorization
  if (authHeader) {
    return requireAuth(req, res, () => getLessonById(req, res))
  }
  getLessonById(req, res)
})

// Marquer une leçon comme complétée (auth obligatoire)
router.post('/:id/complete', requireAuth, completeLesson)

module.exports = router
