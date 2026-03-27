const express = require('express')
const router = express.Router()

// Routes des leçons - sera développé à l'étape 4
router.get('/', (req, res) => {
  res.json({ message: 'Liste des leçons - à implémenter' })
})

router.get('/:id', (req, res) => {
  res.json({ message: `Leçon ${req.params.id} - à implémenter` })
})

module.exports = router
