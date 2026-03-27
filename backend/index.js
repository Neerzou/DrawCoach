const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3001

// Middlewares globaux
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
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
