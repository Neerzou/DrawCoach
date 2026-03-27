const express = require('express')
const router = express.Router()

// Routes utilisateurs - sera développé à l'étape 2
router.get('/me', (req, res) => {
  res.json({ message: 'Profil utilisateur - à implémenter' })
})

module.exports = router
