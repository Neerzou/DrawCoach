import { create } from 'zustand'

// Store Zustand pour la gestion de l'authentification
// Sera connecté à Supabase Auth à l'étape 2
export const useAuthStore = create((set) => ({
  user: null,
  loading: true,

  // Définir l'utilisateur connecté
  setUser: (user) => set({ user, loading: false }),

  // Réinitialiser l'état (déconnexion)
  clearUser: () => set({ user: null, loading: false }),
}))
