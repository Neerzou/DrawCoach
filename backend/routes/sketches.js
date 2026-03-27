const express = require('express')
const router = express.Router()
const multer = require('multer')
const Anthropic = require('@anthropic-ai/sdk')
const { supabase } = require('../lib/supabase')

// Config multer (stockage en mémoire)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error('Seules les images sont acceptées'))
  },
})

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// Décode le JWT Supabase (base64url → base64 standard)
function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Non autorisé' })

  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    const payload = JSON.parse(Buffer.from(base64, 'base64').toString('utf8'))
    if (!payload.sub) return res.status(401).json({ error: 'Token invalide' })
    req.user = { id: payload.sub, email: payload.email }
    next()
  } catch (e) {
    console.error('requireAuth error:', e.message)
    return res.status(401).json({ error: 'Token invalide' })
  }
}

// POST /api/sketches/upload
router.post('/upload', requireAuth, upload.single('sketch'), async (req, res) => {
  console.log('Upload reçu — user:', req.user?.id, 'file:', req.file?.originalname)

  try {
    const { lesson_id } = req.body

    if (!req.file) return res.status(400).json({ error: 'Aucune image fournie' })
    if (!lesson_id) return res.status(400).json({ error: 'lesson_id requis' })

    // Convertir en base64
    const imageBase64 = req.file.buffer.toString('base64')
    const mediaType = req.file.mimetype

    console.log('Appel Claude Vision...')

    // Appel Claude Vision
    const message = await anthropic.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: mediaType, data: imageBase64 },
            },
            {
              type: 'text',
              text: `Tu es un coach de dessin bienveillant et expert. Analyse ce croquis et donne un feedback structuré en JSON avec exactement ces 4 champs :
{
  "proportions": "feedback sur les proportions et formes (2-3 phrases)",
  "lignes": "feedback sur la qualité des lignes et le tracé (2-3 phrases)",
  "composition": "feedback sur la composition et l'équilibre (2-3 phrases)",
  "conseils": "1-2 conseils concrets pour progresser"
}
Sois encourageant, précis et constructif. Réponds UNIQUEMENT avec le JSON, sans texte avant ou après.`,
            },
          ],
        },
      ],
    })

    console.log('Claude a répondu')

    // Parser le feedback
    let feedback
    try {
      feedback = JSON.parse(message.content[0].text)
    } catch {
      feedback = { raw: message.content[0].text }
    }

    // Sauvegarder en base (sans image_url pour l'instant)
    const { error: dbError } = await supabase
      .from('sketches')
      .insert({
        user_id: req.user.id,
        lesson_id: lesson_id,
        image_url: 'pending',
        feedback_proportions: feedback.proportions || '',
        feedback_lines: feedback.lignes || '',
        feedback_composition: feedback.composition || '',
      })

    if (dbError) {
      console.error('DB error (non bloquant):', dbError.message)
    }

    res.json({ feedback, saved: !dbError })
  } catch (err) {
    console.error('=== ERREUR UPLOAD ===', err.message)
    if (err.status === 529) {
      return res.status(503).json({ error: "L'IA est temporairement surchargée. Réessaie dans quelques secondes." })
    }
    res.status(500).json({ error: "Erreur lors du traitement de l'image" })
  }
})

// GET /api/sketches/lesson/:lessonId
router.get('/lesson/:lessonId', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('sketches')
      .select('*')
      .eq('user_id', req.user.id)
      .eq('lesson_id', req.params.lessonId)
      .order('created_at', { ascending: false })

    if (error) throw error
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération' })
  }
})

module.exports = router
