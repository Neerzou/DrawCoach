import { useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import { uploadSketch } from '../lib/api'

function SketchUpload() {
  const { id } = useParams()
  const fileInputRef = useRef(null)

  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [error, setError] = useState(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFile = (selectedFile) => {
    if (!selectedFile || !selectedFile.type.startsWith('image/')) {
      setError('Veuillez sélectionner une image (JPG, PNG, etc.)')
      return
    }
    setFile(selectedFile)
    setPreview(URL.createObjectURL(selectedFile))
    setError(null)
    setFeedback(null)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFile(e.dataTransfer.files[0])
  }

  const handleSubmit = async () => {
    if (!file) return
    setLoading(true)
    setError(null)
    try {
      const result = await uploadSketch(file, id)
      setFeedback(result.feedback)
    } catch {
      setError("Erreur lors de l'analyse. Réessaie.")
    } finally {
      setLoading(false)
    }
  }

  const feedbackItems = feedback
    ? [
        { icon: '📐', label: 'Proportions', text: feedback.proportions },
        { icon: '✏️', label: 'Lignes', text: feedback.lignes },
        { icon: '🖼️', label: 'Composition', text: feedback.composition },
        { icon: '💡', label: 'Conseils', text: feedback.conseils },
      ]
    : []

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 py-12">

        {/* Fil d'ariane */}
        <div className="flex items-center gap-2 font-body text-sm text-gray-400 mb-8">
          <Link to={`/lessons/${id}`} className="hover:text-primary transition-colors">
            ← Retour à la leçon
          </Link>
        </div>

        <h1 className="font-title text-3xl font-extrabold text-text mb-2">
          Upload ton croquis
        </h1>
        <p className="font-body text-gray-500 mb-8">
          Notre IA analyse ton dessin et te donne un feedback personnalisé sur 4 axes.
        </p>

        {/* Zone d'upload */}
        {!feedback && (
          <div
            className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-colors mb-6
              ${dragOver ? 'border-primary bg-orange-50' : 'border-gray-200 hover:border-primary hover:bg-orange-50/50'}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
            />
            {preview ? (
              <img
                src={preview}
                alt="Aperçu"
                className="max-h-64 mx-auto rounded-2xl object-contain"
              />
            ) : (
              <>
                <div className="text-5xl mb-3">📸</div>
                <p className="font-title font-bold text-text mb-1">
                  Clique ou glisse ton image ici
                </p>
                <p className="font-body text-sm text-gray-400">JPG, PNG — max 10MB</p>
              </>
            )}
          </div>
        )}

        {/* Boutons d'action */}
        {!feedback && (
          <div className="flex gap-3">
            {preview && (
              <button
                onClick={() => { setFile(null); setPreview(null) }}
                className="font-body text-gray-400 hover:text-text px-4 py-3 rounded-xl border border-gray-200"
              >
                Changer
              </button>
            )}
            <button
              onClick={handleSubmit}
              disabled={!file || loading}
              className="flex-1 bg-secondary text-white font-title font-bold px-6 py-3 rounded-xl hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Analyse en cours...
                </span>
              ) : (
                'Analyser mon croquis'
              )}
            </button>
          </div>
        )}

        {/* Erreur */}
        {error && (
          <p className="font-body text-red-500 text-sm mt-4">{error}</p>
        )}

        {/* Feedback IA */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {preview && (
                <div className="mb-6">
                  <img
                    src={preview}
                    alt="Ton croquis"
                    className="max-h-48 rounded-2xl object-contain"
                  />
                </div>
              )}

              <div className="bg-gradient-to-br from-violet-50 to-orange-50 rounded-3xl p-6 mb-6">
                <h2 className="font-title text-xl font-bold text-text mb-4">
                  🤖 Ton feedback IA
                </h2>
                <div className="space-y-4">
                  {feedbackItems.map((item) => (
                    <div key={item.label} className="bg-white rounded-2xl p-4">
                      <p className="font-title font-bold text-text mb-1">
                        {item.icon} {item.label}
                      </p>
                      <p className="font-body text-gray-600 text-sm leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => { setFeedback(null); setFile(null); setPreview(null) }}
                  className="flex-1 border border-gray-200 font-title font-bold px-6 py-3 rounded-xl hover:border-primary hover:text-primary transition-colors"
                >
                  Uploader un autre croquis
                </button>
                <Link
                  to={`/lessons/${id}`}
                  className="flex-1 text-center bg-primary text-white font-title font-bold px-6 py-3 rounded-xl hover:bg-orange-500 transition-colors"
                >
                  Retour à la leçon
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default SketchUpload
