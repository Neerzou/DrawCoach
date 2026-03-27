import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages publiques
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import LessonsList from './pages/LessonsList'

// Pages privées
import Dashboard from './pages/Dashboard'
import LessonDetail from './pages/LessonDetail'
import Progress from './pages/Progress'
import Profile from './pages/Profile'
import Upgrade from './pages/Upgrade'

// Composant de route protégée (à compléter avec l'auth Supabase à l'étape 2)
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/lessons" element={<LessonsList />} />

        {/* Routes privées (connexion requise) */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lessons/:id" element={<LessonDetail />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upgrade" element={<Upgrade />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
