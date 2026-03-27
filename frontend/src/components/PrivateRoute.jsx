import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

// Redirige vers /login si l'utilisateur n'est pas connecté
// Affiche un loader pendant la vérification de la session
function PrivateRoute() {
  const { user, loading } = useAuthStore()

  // Attendre la vérification de la session avant de rediriger
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default PrivateRoute
