const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3001

// Logger toutes les requêtes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

// Middlewares globaux
app.use(cors({
  origin: '*',
}))
app.use(express.json())

// Import des routes (à compléter au fur et à mesure des étapes)
const lessonsRouter = require('./routes/lessons')
const sketchesRouter = require('./routes/sketches')
const usersRouter = require('./routes/users')
const paymentsRouter = require('./routes/payments')

// Montage des routes
app.use('/api/lessons', lessonsRouter)
app.use('/api/sketches', sketchesRouter)
app.use('/api/users', usersRouter)
app.use('/api/payments', paymentsRouter)

// Route de santé pour vérifier que le serveur tourne
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'DrawCoach API en ligne' })
})

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur DrawCoach démarré sur http://localhost:${PORT}`)
})
