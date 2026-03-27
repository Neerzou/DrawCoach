const express = require('express')
const router = express.Router()

// Routes paiements Stripe - sera développé à l'étape 7
router.post('/create-checkout', (req, res) => {
  res.json({ message: 'Création session Stripe - à implémenter' })
})

router.post('/webhook', (req, res) => {
  res.json({ message: 'Webhook Stripe - à implémenter' })
})

module.exports = router
