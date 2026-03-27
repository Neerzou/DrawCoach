import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

// Barre de navigation principale
function Navbar() {
  const { user, signOut } = useAuthStore()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="font-title text-2xl font-bold text-primary">
          DrawCoach
        </Link>

        {/* Liens de navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/lessons" className="font-body text-gray-500 hover:text-text transition-colors">
            Leçons
          </Link>
          <a href="#fonctionnalites" className="font-body text-gray-500 hover:text-text transition-colors">
            Fonctionnalités
          </a>
          <a href="#tarifs" className="font-body text-gray-500 hover:text-text transition-colors">
            Tarifs
          </a>
        </div>

        {/* Boutons auth */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="font-body font-medium text-text hover:text-primary transition-colors"
              >
                Tableau de bord
              </Link>
              <button
                onClick={handleSignOut}
                className="font-body text-gray-500 hover:text-text transition-colors"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="font-body font-medium text-text hover:text-primary transition-colors"
              >
                Connexion
              </Link>
              <Link
                to="/signup"
                className="bg-primary text-white font-body font-medium px-5 py-2 rounded-xl hover:bg-orange-500 transition-colors"
              >
                Commencer
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
