import { supabase } from './supabase'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

// Récupère le token JWT de l'utilisateur connecté pour les appels API
async function getAuthHeaders() {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return {}
  return { Authorization: `Bearer ${session.access_token}` }
}

// Récupérer toutes les leçons
export async function fetchLessons() {
  const headers = await getAuthHeaders()
  const res = await fetch(`${API_URL}/api/lessons`, { headers })
  if (!res.ok) throw new Error('Erreur lors du chargement des leçons')
  return res.json()
}

// Récupérer une leçon par ID
export async function fetchLesson(id) {
  const headers = await getAuthHeaders()
  const res = await fetch(`${API_URL}/api/lessons/${id}`, { headers })
  if (!res.ok) throw new Error('Leçon introuvable')
  return res.json()
}

// Marquer une leçon comme complétée
export async function completeLesson(id) {
  const headers = await getAuthHeaders()
  const res = await fetch(`${API_URL}/api/lessons/${id}/complete`, {
    method: 'POST',
    headers,
  })
  if (!res.ok) throw new Error('Erreur lors de la complétion')
  return res.json()
}
