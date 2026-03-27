import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'

// Animation réutilisable pour l'apparition au scroll
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

// Page d'accueil publique - Landing page DrawCoach
function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ======================== */}
      {/* SECTION HERO             */}
      {/* ======================== */}
      <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col items-center text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          {/* Badge */}
          <span className="inline-block bg-accent/20 text-yellow-700 font-body font-semibold text-sm px-4 py-1.5 rounded-full mb-6">
            🎨 Apprends à dessiner en 10 min/jour
          </span>

          {/* Titre principal */}
          <h1 className="font-title text-5xl md:text-6xl font-extrabold text-text leading-tight mb-6">
            YouTube explique.<br />
            <span className="text-primary">DrawCoach</span> te dit ce que{' '}
            <span className="text-secondary">TU</span> as raté.
          </h1>

          {/* Sous-titre */}
          <p className="font-body text-xl text-gray-500 max-w-2xl mx-auto mb-10">
            Des leçons courtes, un feedback IA personnalisé sur chaque croquis.
            Progresse à ton rythme, un dessin à la fois.
          </p>

          {/* Boutons CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-primary text-white font-title font-bold text-lg px-8 py-4 rounded-2xl hover:bg-orange-500 transition-colors shadow-lg shadow-primary/30"
            >
              Commencer gratuitement
            </Link>
            <Link
              to="/lessons"
              className="bg-white text-text font-title font-bold text-lg px-8 py-4 rounded-2xl border border-gray-200 hover:border-primary transition-colors"
            >
              Voir les leçons
            </Link>
          </div>

          {/* Preuve sociale */}
          <p className="font-body text-sm text-gray-400 mt-6">
            Pas de carte bancaire requise · 3 feedbacks IA gratuits/mois
          </p>
        </motion.div>

        {/* Illustration hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 w-full max-w-3xl"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            {/* Mockup interface feedback IA */}
            <div className="flex items-start gap-6">
              {/* Croquis fictif */}
              <div className="w-48 h-48 bg-gradient-to-br from-orange-100 to-violet-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="text-6xl">✏️</span>
              </div>
              {/* Feedback IA fictif */}
              <div className="flex-1 text-left space-y-3">
                <p className="font-title font-bold text-text">Feedback IA sur ton croquis</p>
                <FeedbackLine
                  icon="📐"
                  label="Proportions"
                  text="La tête est légèrement grande, mais les épaules sont bien placées !"
                  color="text-blue-600"
                />
                <FeedbackLine
                  icon="✒️"
                  label="Qualité des lignes"
                  text="Tes lignes sont plus assurées qu'avant, continue comme ça."
                  color="text-green-600"
                />
                <FeedbackLine
                  icon="💡"
                  label="Ombrage"
                  text="La source de lumière n'est pas encore cohérente — essaie de la fixer dès le départ."
                  color="text-yellow-600"
                />
                <FeedbackLine
                  icon="🖼️"
                  label="Composition"
                  text="Bon centrage ! Essaie la règle des tiers pour plus d'impact."
                  color="text-purple-600"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ======================== */}
      {/* SECTION COMMENT ÇA MARCHE */}
      {/* ======================== */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <h2 className="font-title text-4xl font-extrabold text-text mb-4">
              Comment ça marche ?
            </h2>
            <p className="font-body text-gray-500 text-lg">
              Trois étapes simples pour progresser chaque jour.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              icon="🎬"
              title="Regarde la leçon"
              description="Une vidéo courte de 3-5 minutes sur un fondamental du dessin. Ligne, geste, ombre ou composition."
              delay={0}
            />
            <StepCard
              number="2"
              icon="✏️"
              title="Dessine l'exercice"
              description="Mets en pratique immédiatement. Pas besoin de matériel — une feuille et un stylo suffisent."
              delay={0.15}
            />
            <StepCard
              number="3"
              icon="🤖"
              title="Reçois ton feedback IA"
              description="Prends une photo de ton croquis, uploade-la, et l'IA t'explique exactement ce que tu peux améliorer."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ======================== */}
      {/* SECTION FONCTIONNALITÉS  */}
      {/* ======================== */}
      <section id="fonctionnalites" className="py-20 max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-14"
        >
          <h2 className="font-title text-4xl font-extrabold text-text mb-4">
            Tout ce dont tu as besoin pour progresser
          </h2>
          <p className="font-body text-gray-500 text-lg">
            DrawCoach combine apprentissage structuré et feedback personnalisé.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard
            icon="📚"
            title="20 leçons structurées"
            description="Une progression logique : ligne → geste → ombre → forme → composition. Chaque leçon prépare la suivante."
            color="bg-orange-50"
            delay={0}
          />
          <FeatureCard
            icon="🧠"
            title="Feedback IA sur 4 axes"
            description="Proportions, qualité des lignes, ombrage et composition. Un feedback précis, encourageant et actionnable."
            color="bg-violet-50"
            delay={0.1}
          />
          <FeatureCard
            icon="📈"
            title="Suivi de progression"
            description="Dashboard personnel avec ton historique, ta galerie de croquis et ton score par compétence."
            color="bg-yellow-50"
            delay={0.2}
          />
          <FeatureCard
            icon="🔥"
            title="Habitude quotidienne"
            description="Un indicateur de régularité pour maintenir ta série de jours consécutifs, comme Duolingo."
            color="bg-green-50"
            delay={0.3}
          />
        </div>
      </section>

      {/* ======================== */}
      {/* SECTION TARIFS           */}
      {/* ======================== */}
      <section id="tarifs" className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <h2 className="font-title text-4xl font-extrabold text-text mb-4">
              Commence gratuitement
            </h2>
            <p className="font-body text-gray-500 text-lg">
              Passe Pro quand tu es prêt. Sans engagement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Plan Gratuit */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-background border border-gray-200 rounded-3xl p-8"
            >
              <p className="font-title font-bold text-lg text-gray-500 mb-2">Gratuit</p>
              <p className="font-title text-5xl font-extrabold text-text mb-6">0€</p>
              <ul className="space-y-3 mb-8">
                <PricingItem text="5 premières leçons" />
                <PricingItem text="3 feedbacks IA par mois" />
                <PricingItem text="Suivi de progression basique" />
              </ul>
              <Link
                to="/signup"
                className="block text-center border-2 border-primary text-primary font-title font-bold py-3 rounded-xl hover:bg-primary hover:text-white transition-colors"
              >
                Commencer gratuitement
              </Link>
            </motion.div>

            {/* Plan Pro */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.6, delay: 0.15 } } }}
              className="bg-secondary rounded-3xl p-8 relative overflow-hidden"
            >
              {/* Badge populaire */}
              <span className="absolute top-4 right-4 bg-accent text-yellow-800 text-xs font-body font-bold px-3 py-1 rounded-full">
                Le plus populaire
              </span>

              <p className="font-title font-bold text-lg text-violet-200 mb-2">Pro</p>
              <div className="flex items-end gap-2 mb-1">
                <p className="font-title text-5xl font-extrabold text-white">5€</p>
                <p className="font-body text-violet-300 mb-2">/mois</p>
              </div>
              <p className="font-body text-violet-300 text-sm mb-6">ou 50€/an (2 mois offerts)</p>
              <ul className="space-y-3 mb-8">
                <PricingItem text="Accès aux 20 leçons" light />
                <PricingItem text="Feedbacks IA illimités" light />
                <PricingItem text="Historique complet des croquis" light />
                <PricingItem text="Score détaillé par compétence" light />
                <PricingItem text="Badge Pro sur le profil" light />
                <PricingItem text="Essai gratuit 7 jours" light />
              </ul>
              <Link
                to="/signup"
                className="block text-center bg-white text-secondary font-title font-bold py-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                Essayer 7 jours gratuits
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ======================== */}
      {/* FOOTER                   */}
      {/* ======================== */}
      <footer className="py-10 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-title font-bold text-primary text-xl">DrawCoach</p>
          <p className="font-body text-sm text-gray-400">
            © 2026 DrawCoach · Apprends à dessiner, un croquis à la fois.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-body text-sm text-gray-400 hover:text-text transition-colors">
              Mentions légales
            </a>
            <a href="#" className="font-body text-sm text-gray-400 hover:text-text transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ========================
// Composants internes
// ========================

function FeedbackLine({ icon, label, text, color }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-lg flex-shrink-0">{icon}</span>
      <p className="font-body text-sm text-gray-600">
        <span className={`font-semibold ${color}`}>{label} : </span>
        {text}
      </p>
    </div>
  )
}

function StepCard({ number, icon, title, description, delay }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } } }}
      className="bg-background rounded-3xl p-8 text-center border border-gray-100"
    >
      <div className="w-12 h-12 bg-primary text-white font-title font-extrabold text-xl rounded-full flex items-center justify-center mx-auto mb-4">
        {number}
      </div>
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-title font-bold text-xl text-text mb-2">{title}</h3>
      <p className="font-body text-gray-500">{description}</p>
    </motion.div>
  )
}

function FeatureCard({ icon, title, description, color, delay }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } } }}
      className={`${color} rounded-3xl p-8`}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-title font-bold text-xl text-text mb-2">{title}</h3>
      <p className="font-body text-gray-600">{description}</p>
    </motion.div>
  )
}

function PricingItem({ text, light = false }) {
  return (
    <li className="flex items-center gap-3">
      <span className={`text-lg ${light ? 'text-violet-300' : 'text-primary'}`}>✓</span>
      <span className={`font-body ${light ? 'text-violet-100' : 'text-text'}`}>{text}</span>
    </li>
  )
}

export default Home
