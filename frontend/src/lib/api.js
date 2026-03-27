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
  const data = await res.json()
  return Array.isArray(data) ? data : []
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

// Uploader un croquis et obtenir un feedback IA
export async function uploadSketch(file, lessonId) {
  const headers = await getAuthHeaders()
  const formData = new FormData()
  formData.append('sketch', file)
  formData.append('lesson_id', lessonId)

  const res = await fetch(`${API_URL}/api/sketches/upload`, {
    method: 'POST',
    headers, // pas de Content-Type : le navigateur le gère automatiquement avec FormData
    body: formData,
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error || "Erreur lors de l'upload")
  }
  return res.json()
}
