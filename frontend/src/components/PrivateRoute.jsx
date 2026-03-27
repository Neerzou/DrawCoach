import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

// Redirige vers /login si l'utilisateur n'est pas connecté
function PrivateRoute() {
  const { user } = useAuthStore()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default PrivateRoute
