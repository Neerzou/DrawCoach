import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import { fetchLesson, completeLesson } from '../lib/api'
import { useAuthStore } from '../store/authStore'

// Page détail d'une leçon
function LessonDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuthStore()

  const [lesson, setLesson] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [completing, setCompleting] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchLesson(id)
        setLesson(data)
      } catch (err) {
        setError('Leçon introuvable.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  // Marquer la leçon comme complétée
  const handleComplete = async () => {
    if (!user) {
      navigate('/login')
      return
    }
    setCompleting(true)
    try {
      await completeLesson(id)
      setLesson(prev => ({ ...prev, completed: true }))
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 3000)
    } catch (err) {
      console.error(err)
    } finally {
      setCompleting(false)
    }
  }

  // État de chargement
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  // Erreur
  if (error || !lesson) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-3xl mx-auto px-6 py-12 text-center">
          <p className="font-body text-red-500 mb-4">{error}</p>
          <Link to="/lessons" className="text-primary font-body hover:underline">
            ← Retour aux leçons
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Animation de célébration */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-10 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="font-title text-2xl font-extrabold text-text mb-2">
                Leçon complétée !
              </h2>
              <p className="font-body text-gray-500">Continue comme ça, tu progresses !</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* Fil d'ariane */}
        <div className="flex items-center gap-2 font-body text-sm text-gray-400 mb-8">
          <Link to="/lessons" className="hover:text-primary transition-colors">
            ← Toutes les leçons
          </Link>
          <span>/</span>
          <span className="text-text">Leçon {lesson.order_index}</span>
        </div>

        {/* En-tête leçon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-orange-50 text-primary font-title font-extrabold text-sm px-3 py-1 rounded-full">
              Leçon {lesson.order_index}
            </span>
            <span className="font-body text-sm text-gray-400">⏱ {lesson.duration_minutes} min</span>
            {lesson.completed && (
              <span className="bg-green-100 text-green-600 font-body font-semibold text-sm px-3 py-1 rounded-full">
                ✓ Complétée
              </span>
            )}
          </div>
          <h1 className="font-title text-3xl font-extrabold text-text mb-3">
            {lesson.title}
          </h1>
          <p className="font-body text-gray-500 text-lg">{lesson.description}</p>
        </motion.div>

        {/* Lecteur vidéo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-gray-900 rounded-3xl aspect-video flex items-center justify-center">
            {lesson.video_url ? (
              <iframe
                src={lesson.video_url}
                className="w-full h-full rounded-3xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="text-center text-gray-500">
                <div className="text-5xl mb-3">🎬</div>
                <p className="font-body text-sm">Vidéo à venir</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Exercice pratique */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl border border-gray-100 p-8 mb-8"
        >
          <h2 className="font-title text-xl font-bold text-text mb-4">
            ✏️ Exercice pratique
          </h2>
          <p className="font-body text-gray-600 leading-relaxed">
            Après avoir regardé la vidéo, prends une feuille et un stylo.
            Reproduis l'exercice montré dans la leçon à ta façon.
            L'objectif n'est pas la perfection — c'est la pratique régulière.
          </p>
          <div className="mt-4 bg-accent/10 rounded-2xl p-4">
            <p className="font-body text-sm text-yellow-800">
              💡 <strong>Conseil :</strong> Fais l'exercice au moins 3 fois avant d'uploader ton croquis.
              La répétition est la clé du progrès.
            </p>
          </div>
        </motion.div>

        {/* Upload de croquis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-secondary/5 border border-secondary/20 rounded-3xl p-8 mb-8"
        >
          <h2 className="font-title text-xl font-bold text-text mb-2">
            🤖 Obtiens ton feedback IA
          </h2>
          <p className="font-body text-gray-600 mb-4">
            Prends une photo de ton croquis et uploade-la pour recevoir
            un feedback personnalisé sur 4 axes.
          </p>
          {user ? (
            <Link
              to={`/lessons/${id}/upload`}
              className="inline-block bg-secondary text-white font-title font-bold px-6 py-3 rounded-xl hover:bg-violet-700 transition-colors"
            >
              Uploader mon croquis
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/signup"
                className="bg-secondary text-white font-title font-bold px-6 py-3 rounded-xl hover:bg-violet-700 transition-colors"
              >
                Créer un compte pour uploader
              </Link>
              <p className="font-body text-sm text-gray-400">Gratuit, sans CB</p>
            </div>
          )}
        </motion.div>

        {/* Bouton compléter la leçon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-between"
        >
          {/* Leçon précédente */}
          {lesson.order_index > 1 && (
            <Link
              to={`/lessons`}
              className="font-body text-gray-400 hover:text-text transition-colors"
            >
              ← Leçon précédente
            </Link>
          )}

          <div className="ml-auto">
            {lesson.completed ? (
              <Link
                to="/lessons"
                className="bg-green-500 text-white font-title font-bold px-8 py-3 rounded-xl hover:bg-green-600 transition-colors"
              >
                ✓ Voir les autres leçons
              </Link>
            ) : (
              <button
                onClick={handleComplete}
                disabled={completing || !user}
                className="bg-primary text-white font-title font-bold px-8 py-3 rounded-xl hover:bg-orange-500 transition-colors disabled:opacity-50"
              >
                {completing ? 'Enregistrement...' : 'Marquer comme complétée'}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default LessonDetail
