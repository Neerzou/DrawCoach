const express = require('express')
const router = express.Router()

// Routes des croquis et feedback IA - sera développé à l'étape 5
router.post('/upload', (req, res) => {
  res.json({ message: 'Upload de croquis - à implémenter' })
})

router.get('/user/:userId', (req, res) => {
  res.json({ message: `Croquis de l'utilisateur ${req.params.userId} - à implémenter` })
})

module.exports = router
