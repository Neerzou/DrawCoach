-- Script SQL à exécuter dans Supabase > SQL Editor
-- Crée toutes les tables nécessaires pour DrawCoach

-- Table des utilisateurs (complète le profil auth.users de Supabase)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  avatar_url TEXT,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro')),
  stripe_customer_id TEXT,
  ai_feedbacks_used INTEGER NOT NULL DEFAULT 0,
  ai_feedbacks_reset_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des leçons
CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  order_index INTEGER NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('débutant', 'intermédiaire', 'avancé')),
  duration_minutes INTEGER,
  is_free BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table de progression des utilisateurs
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- Table des croquis uploadés et feedbacks IA
CREATE TABLE IF NOT EXISTS sketches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL,
  image_url TEXT NOT NULL,
  feedback_proportions TEXT,
  feedback_lines TEXT,
  feedback_shading TEXT,
  feedback_composition TEXT,
  global_score INTEGER CHECK (global_score BETWEEN 1 AND 10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- Sécurité : Row Level Security (RLS)
-- ==========================================

-- Activer RLS sur toutes les tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE sketches ENABLE ROW LEVEL SECURITY;

-- Politiques pour la table users
CREATE POLICY "Un utilisateur peut voir son propre profil"
  ON users FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Un utilisateur peut modifier son propre profil"
  ON users FOR UPDATE USING (auth.uid() = id);

-- Politiques pour user_progress
CREATE POLICY "Un utilisateur peut voir sa propre progression"
  ON user_progress FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Un utilisateur peut créer sa propre progression"
  ON user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Politiques pour sketches
CREATE POLICY "Un utilisateur peut voir ses propres croquis"
  ON sketches FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Un utilisateur peut uploader ses propres croquis"
  ON sketches FOR INSERT WITH CHECK (auth.uid() = user_id);

-- La table lessons est publique en lecture
CREATE POLICY "Les leçons sont visibles par tous"
  ON lessons FOR SELECT USING (true);

-- ==========================================
-- Fonction : créer automatiquement le profil
-- utilisateur après inscription
-- ==========================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Déclencher la fonction à chaque nouvelle inscription
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
