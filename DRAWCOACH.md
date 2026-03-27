# DrawCoach - Document de référence projet

## 🎯 Vision du projet

DrawCoach est une web app SaaS d'apprentissage du dessin par l'habitude quotidienne.
Chaque utilisateur progresse à son rythme grâce à des leçons courtes (moins de 10 minutes)
et reçoit un feedback personnalisé de l'IA sur chaque croquis uploadé.

**Slogan :** "YouTube explique. DrawCoach te dit ce que TU as raté."

---

## 👥 Cible utilisateur

- **Audience :** Tout le monde, débutants complets comme intermédiaires
- **Persona principal :** Adulte occupé qui veut apprendre à dessiner avec 10-20 min par jour
- **Persona secondaire :** Ados et jeunes adultes qui veulent progresser seuls
- **Marché institutionnel (futur) :** Écoles et centres de formation continue

---

## 🌍 Langues

- **V1 :** Français (priorité absolue)
- **V2 :** Anglais
- **V3 :** Espagnol, Allemand
- Prévoir l'architecture i18n dès le départ (fichiers de traduction séparés)

---

## ✨ Fonctionnalités V1 (MVP)

### 1. Leçons structurées
- Vidéo courte (max 3-5 min) + exercice pratique à faire
- Progression logique : ligne → geste → ombre → forme → composition
- 20 leçons au lancement couvrant les fondamentaux
- Chaque leçon est liée à la suivante (pas de leçons isolées)
- Durée estimée affichée avant chaque leçon

### 2. Upload de croquis + Feedback IA
- L'utilisateur prend une photo ou upload son dessin (JPG, PNG, WEBP)
- L'IA Claude (claude-opus-4-5 vision) analyse le croquis
- Feedback structuré sur 4 axes :
  - **Proportions** (ex: "La tête est trop grande par rapport au corps")
  - **Qualité des lignes** (ex: "Tes lignes sont hésitantes, essaie de tracer d'un seul mouvement")
  - **Ombrage et lumière** (ex: "La source de lumière n'est pas cohérente")
  - **Composition générale** (ex: "Le sujet est trop centré, essaie la règle des tiers")
- Ton du feedback : encourageant, précis, actionnable (jamais décourageant)
- 3 feedbacks IA/mois en version gratuite, illimité en version payante

### 3. Suivi de progression
- Dashboard personnel avec historique des leçons complétées
- Galerie des croquis uploadés avec feedbacks associés
- Score de progression par compétence (lignes, ombres, proportions, composition)
- Indicateur de régularité (jours consécutifs d'activité)

---

## 🎨 Design et style visuel

### Philosophie
- **Style :** Coloré, fun, motivant — inspiré de Duolingo
- **Feeling :** Accessible, jamais intimidant, célèbre chaque progrès
- **Public :** Tout âge, donc interface claire et lisible

### Palette de couleurs
- **Primaire :** Orange vif `#FF6B35` (énergie, créativité)
- **Secondaire :** Violet doux `#7C3AED` (art, premium)
- **Accent :** Jaune `#FCD34D` (succès, encouragement)
- **Fond clair :** `#FAFAFA`
- **Fond sombre (dark mode futur) :** `#1A1A2E`
- **Texte principal :** `#1F2937`

### Typographie
- **Titres :** Nunito (rond, fun, lisible)
- **Corps :** Inter (clean, moderne)

### Composants UI clés
- Cartes de leçons avec illustration colorée
- Barre de progression animée
- Badge de complétion après chaque leçon
- Animation de célébration (confettis) à la fin d'une leçon
- Bouton d'upload de croquis bien visible sur chaque leçon

---

## 🔐 Authentification

- **Email + mot de passe** (via Supabase Auth)
- **Google OAuth** (via Supabase Auth)
- Pas d'inscription obligatoire pour voir la landing page et les 3 premières leçons
- Inscription requise pour sauvegarder la progression et uploader des croquis

---

## 💰 Modèle freemium

### Plan Gratuit
- Accès aux 5 premières leçons
- 3 feedbacks IA par mois
- Suivi de progression basique

### Plan Pro (5€/mois ou 50€/an)
- Accès illimité aux 20 leçons V1 (et toutes les futures)
- Feedbacks IA illimités
- Historique complet des croquis
- Score de progression détaillé par compétence
- Badge "Pro" sur le profil

### Paiement
- Stripe pour les paiements
- Facturation mensuelle ou annuelle
- Essai gratuit 7 jours sur le plan Pro

---

## 🏗️ Stack technique

### Frontend
- **Framework :** React + Vite
- **Style :** TailwindCSS
- **Routing :** React Router v6
- **State management :** Zustand (simple, léger)
- **Animations :** Framer Motion

### Backend
- **Runtime :** Node.js
- **Framework :** Express.js
- **API :** REST
- **Upload fichiers :** Multer

### Base de données
- **Service :** Supabase (PostgreSQL)
- **Auth :** Supabase Auth (email + Google OAuth)
- **Storage :** Supabase Storage (pour les images de croquis)

### IA
- **Service :** Anthropic Claude API (claude-opus-4-5 vision)
- **Usage :** Analyse des croquis uploadés
- **Prompt système :** Toujours encourageant, feedback structuré en 4 axes

### Déploiement
- **Frontend :** Vercel
- **Backend :** Vercel Serverless Functions
- **Base de données :** Supabase cloud (hébergé)

---

## 🗄️ Structure de la base de données

### Table `users`
```
id, email, name, avatar_url, plan (free/pro), created_at, stripe_customer_id
```

### Table `lessons`
```
id, title, description, video_url, order_index, difficulty, duration_minutes, created_at
```

### Table `user_progress`
```
id, user_id, lesson_id, completed_at, sketch_url, ai_feedback, score
```

### Table `sketches`
```
id, user_id, lesson_id, image_url, feedback_proportions, feedback_lines,
feedback_shading, feedback_composition, global_score, created_at
```

---

## 📁 Structure des dossiers du projet

```
DrawCoach/
├── frontend/
│   ├── src/
│   │   ├── components/     (boutons, cartes, navbar...)
│   │   ├── pages/          (Home, Dashboard, Lesson, Profile...)
│   │   ├── hooks/          (useAuth, useProgress...)
│   │   ├── store/          (Zustand stores)
│   │   ├── lib/            (supabase client, api calls)
│   │   └── locales/        (fr.json, en.json...)
│   ├── public/
│   └── package.json
├── backend/
│   ├── routes/             (lessons, sketches, users, payments)
│   ├── controllers/        (logique métier)
│   ├── middleware/         (auth, upload, validation)
│   ├── lib/                (claude api, supabase, stripe)
│   └── package.json
└── DRAWCOACH.md            (ce fichier)
```

---

## 📄 Pages de l'application

### Pages publiques (sans connexion)
- `/` — Landing page (héro, fonctionnalités, prix, témoignages)
- `/login` — Connexion
- `/signup` — Inscription
- `/lessons` — Aperçu des leçons (3 premières accessibles)

### Pages privées (connexion requise)
- `/dashboard` — Tableau de bord personnel
- `/lessons/:id` — Page d'une leçon (vidéo + exercice + upload)
- `/progress` — Suivi détaillé de la progression
- `/profile` — Profil utilisateur
- `/upgrade` — Page de passage au plan Pro

---

## 🚀 Ordre de développement recommandé

1. **Setup projet** (React + Vite + TailwindCSS + Express)
2. **Connexion Supabase** (auth email + Google OAuth)
3. **Landing page** (design complet)
4. **Système de leçons** (liste + page détail + vidéo)
5. **Upload croquis + feedback IA** (coeur du produit)
6. **Dashboard progression**
7. **Stripe paiements** (freemium + Pro)
8. **Déploiement Vercel**

---

## ⚠️ Règles importantes pour Claude Code

- Toujours commenter le code en français
- Utiliser TailwindCSS pour tous les styles (pas de CSS custom sauf exception)
- Chaque composant React dans son propre fichier
- Toujours gérer les états de chargement (loading) et d'erreur
- Le feedback IA doit toujours être encourageant, jamais brutal
- Ne jamais stocker les clés API dans le code (utiliser les variables d'environnement .env)
- Tester chaque fonctionnalité avant de passer à la suivante
```

---

*Document créé le 27/03/2026 — Version 1.0*
*À mettre à jour à chaque évolution majeure du projet*
