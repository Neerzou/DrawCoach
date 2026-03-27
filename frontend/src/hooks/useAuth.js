import { useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../store/authStore'

// Hook qui écoute les changements d'état d'authentification Supabase
// À placer dans le composant racine (App.jsx)
export function useAuthListener() {
  const { setUser, clearUser, setLoading } = useAuthStore()

  useEffect(() => {
    // Récupérer la session active au chargement
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // Écouter les changements d'auth (connexion, déconnexion, refresh token)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(session.user)
        } else {
          clearUser()
        }
      }
    )

    // Nettoyage à la destruction du composant
    return () => subscription.unsubscribe()
  }, [setUser, clearUser, setLoading])
}
