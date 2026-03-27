import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import LessonCard from '../components/LessonCard'
import { fetchLessons } from '../lib/api'
import { useAuthStore } from '../store/authStore'

// Niveaux pour regrouper les leçons
const LEVELS = [
  { label: 'Niveau 1 — La ligne', range: [1, 4] },
  { label: 'Niveau 2 — Le geste', range: [5, 8] },
  { label: 'Niveau 3 — Les ombres', range: [9, 12] },
  { label: 'Niveau 4 — Les formes', range: [13, 16] },
  { label: 'Niveau 5 — La composition', range: [17, 20] },
]

// Page liste de toutes les leçons
function LessonsList() {
  const { user } = useAuthStore()
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchLessons()
        setLessons(data)
      } catch (err) {
        setError('Impossible de charger les leçons.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // Filtrer les leçons d'un niveau
  const getLevelLessons = (range) =>
    lessons.filter(l => l.order_index >= range[0] && l.order_index <= range[1])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* En-tête */}
        <div className="mb-10">
          <h1 className="font-title text-4xl font-extrabold text-text mb-3">
            Les leçons
          </h1>
          <p className="font-body text-gray-500 text-lg">
            20 leçons pour maîtriser les fondamentaux du dessin.
          </p>
          {/* Barre de progression globale */}
          {user && lessons.length > 0 && (
            <ProgressBar
              completed={lessons.filter(l => l.completed).length}
              total={lessons.length}
            />
          )}
          {/* Bannière plan gratuit */}
          {!user && (
            <div className="mt-4 bg-secondary/10 border border-secondary/20 rounded-2xl p-4 flex items-center justify-between gap-4">
              <p className="font-body text-secondary text-sm">
                <strong>5 leçons gratuites</strong> disponibles sans inscription.
                Crée un compte pour débloquer tout le contenu.
              </p>
              <Link
                to="/signup"
                className="flex-shrink-0 bg-secondary text-white font-body font-semibold text-sm px-4 py-2 rounded-xl hover:bg-violet-700 transition-colors"
              >
                S'inscrire
              </Link>
            </div>
          )}
        </div>

        {/* État de chargement */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Erreur */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
            <p className="font-body text-red-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 text-sm text-red-500 hover:underline font-body"
            >
              Réessayer
            </button>
          </div>
        )}

        {/* Liste des leçons par niveau */}
        {!loading && !error && (
          <div className="space-y-10">
            {LEVELS.map((level) => {
              const levelLessons = getLevelLessons(level.range)
              if (levelLessons.length === 0) return null

              return (
                <div key={level.label}>
                  <h2 className="font-title font-bold text-xl text-text mb-4">
                    {level.label}
                  </h2>
                  <div className="space-y-3">
                    {levelLessons.map((lesson, i) => (
                      <LessonCard key={lesson.id} lesson={lesson} index={i} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

// Barre de progression globale
function ProgressBar({ completed, total }) {
  const percent = Math.round((completed / total) * 100)

  return (
    <div className="mt-6">
      <div className="flex justify-between font-body text-sm text-gray-500 mb-2">
        <span>{completed}/{total} leçons complétées</span>
        <span>{percent}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-3">
        <div
          className="bg-primary rounded-full h-3 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}

export default LessonsList
