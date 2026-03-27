import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

// Page de connexion avec email/mot de passe et Google OAuth
function Login() {
  const navigate = useNavigate()
  const { signIn, signInWithGoogle, error, loading } = useAuthStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Soumission du formulaire email/mot de passe
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await signIn(email, password)
    if (!error) {
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="font-title text-3xl font-bold text-primary">
            DrawCoach
          </Link>
          <p className="text-gray-500 mt-2 font-body">Bon retour parmi nous !</p>
        </div>

        {/* Carte */}
        <div className="bg-white rounded-2xl shadow-lg p-8">

          {/* Bouton Google */}
          <button
            onClick={signInWithGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 font-body font-medium text-text hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {/* Icône Google */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuer avec Google
          </button>

          {/* Séparateur */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-400 font-body">ou</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Formulaire email/mot de passe */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text font-body mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="toi@exemple.com"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 font-body text-text focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text font-body mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 font-body text-text focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Message d'erreur */}
            {error && (
              <p className="text-red-500 text-sm font-body">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-title font-bold py-3 rounded-xl hover:bg-orange-500 transition-colors disabled:opacity-50"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          {/* Lien inscription */}
          <p className="text-center text-sm text-gray-500 font-body mt-6">
            Pas encore de compte ?{' '}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              S'inscrire gratuitement
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
