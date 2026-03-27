import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '../store/authStore'

// Couleurs par difficulté
const difficultyColors = {
  'débutant': 'bg-green-100 text-green-700',
  'intermédiaire': 'bg-yellow-100 text-yellow-700',
  'avancé': 'bg-red-100 text-red-700',
}

// Carte d'une leçon dans la liste
function LessonCard({ lesson, index }) {
  const { user } = useAuthStore()

  // Vérifier si la leçon est accessible
  const isLocked = !lesson.is_free && !user?.plan === 'pro'
  const isCompleted = lesson.completed

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        to={isLocked ? '/upgrade' : `/lessons/${lesson.id}`}
        className={`flex items-center gap-5 bg-white rounded-2xl p-5 border transition-all group
          ${isLocked
            ? 'border-gray-100 opacity-60 cursor-not-allowed'
            : 'border-gray-100 hover:border-primary hover:shadow-md'
          }
          ${isCompleted ? 'border-l-4 border-l-green-400' : ''}
        `}
      >
        {/* Numéro de leçon */}
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-title font-extrabold text-lg flex-shrink-0
          ${isCompleted ? 'bg-green-100 text-green-600' : 'bg-orange-50 text-primary'}
        `}>
          {isCompleted ? '✓' : lesson.order_index}
        </div>

        {/* Infos leçon */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-title font-bold text-text text-base group-hover:text-primary transition-colors">
              {lesson.title}
            </h3>
            {lesson.is_free && (
              <span className="text-xs bg-accent/20 text-yellow-700 font-body font-semibold px-2 py-0.5 rounded-full">
                Gratuit
              </span>
            )}
          </div>
          <p className="font-body text-sm text-gray-400 truncate">{lesson.description}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className={`text-xs font-body font-semibold px-2 py-0.5 rounded-full ${difficultyColors[lesson.difficulty]}`}>
              {lesson.difficulty}
            </span>
            <span className="text-xs font-body text-gray-400">
              ⏱ {lesson.duration_minutes} min
            </span>
          </div>
        </div>

        {/* Icône droite */}
        <div className="flex-shrink-0 text-gray-300 group-hover:text-primary transition-colors">
          {isLocked ? '🔒' : '›'}
        </div>
      </Link>
    </motion.div>
  )
}

export default LessonCard
