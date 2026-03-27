const { supabase } = require('../lib/supabase')

// Récupérer toutes les leçons avec la progression de l'utilisateur
async function getLessons(req, res) {
  try {
    const userId = req.user?.id

    // Récupérer toutes les leçons triées par ordre
    const { data: lessons, error } = await supabase
      .from('lessons')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) throw error

    // Si l'utilisateur est connecté, récupérer sa progression
    if (userId) {
      const { data: progress } = await supabase
        .from('user_progress')
        .select('lesson_id')
        .eq('user_id', userId)

      const completedIds = new Set((progress || []).map(p => p.lesson_id))

      // Ajouter le statut "completed" à chaque leçon
      const lessonsWithProgress = lessons.map(lesson => ({
        ...lesson,
        completed: completedIds.has(lesson.id),
      }))

      return res.json(lessonsWithProgress)
    }

    res.json(lessons)
  } catch (error) {
    console.error('Erreur getLessons:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
}

// Récupérer une leçon par son ID
async function getLessonById(req, res) {
  try {
    const { id } = req.params

    const { data: lesson, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !lesson) {
      return res.status(404).json({ error: 'Leçon introuvable' })
    }

    // Vérifier si l'utilisateur a complété cette leçon
    if (req.user) {
      const { data: progress } = await supabase
        .from('user_progress')
        .select('id')
        .eq('user_id', req.user.id)
        .eq('lesson_id', id)
        .single()

      return res.json({ ...lesson, completed: !!progress })
    }

    res.json(lesson)
  } catch (error) {
    console.error('Erreur getLessonById:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
}

// Marquer une leçon comme complétée
async function completeLesson(req, res) {
  try {
    const { id } = req.params
    const userId = req.user.id

    // Vérifier que la leçon existe
    const { data: lesson, error: lessonError } = await supabase
      .from('lessons')
      .select('id')
      .eq('id', id)
      .single()

    if (lessonError || !lesson) {
      return res.status(404).json({ error: 'Leçon introuvable' })
    }

    // Insérer la progression (ignore si déjà complétée grâce au UNIQUE)
    const { error } = await supabase
      .from('user_progress')
      .upsert({ user_id: userId, lesson_id: id }, { onConflict: 'user_id,lesson_id' })

    if (error) throw error

    res.json({ success: true, message: 'Leçon complétée !' })
  } catch (error) {
    console.error('Erreur completeLesson:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
}

module.exports = { getLessons, getLessonById, completeLesson }
