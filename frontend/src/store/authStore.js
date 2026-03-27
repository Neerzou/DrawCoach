import { create } from 'zustand'
import { supabase } from '../lib/supabase'

// Store Zustand pour la gestion de l'authentification via Supabase
export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  error: null,

  // Définir l'utilisateur connecté
  setUser: (user) => set({ user, loading: false, error: null }),

  // Réinitialiser l'état (déconnexion)
  clearUser: () => set({ user: null, loading: false, error: null }),

  // Définir l'état de chargement
  setLoading: (loading) => set({ loading }),

  // Définir une erreur
  setError: (error) => set({ error, loading: false }),

  // Inscription avec email + mot de passe
  signUp: async (email, password, name) => {
    set({ loading: true, error: null })
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    })
    if (error) {
      set({ error: error.message, loading: false })
      return { error }
    }
    return { data }
  },

  // Connexion avec email + mot de passe
  signIn: async (email, password) => {
    set({ loading: true, error: null })
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      set({ error: error.message, loading: false })
      return { error }
    }
    set({ user: data.user, loading: false })
    return { data }
  },

  // Connexion avec Google OAuth
  signInWithGoogle: async () => {
    set({ loading: true, error: null })
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    })
    if (error) {
      set({ error: error.message, loading: false })
      return { error }
    }
  },

  // Déconnexion
  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null, loading: false, error: null })
  },
}))
