/** @type {import('tailwindcss').Config} */
export default {
  // Fichiers à scanner pour les classes Tailwind
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Palette de couleurs DrawCoach (cf. DRAWCOACH.md)
      colors: {
        primary: '#FF6B35',    // Orange vif - énergie, créativité
        secondary: '#7C3AED',  // Violet doux - art, premium
        accent: '#FCD34D',     // Jaune - succès, encouragement
        background: '#FAFAFA', // Fond clair
        dark: '#1A1A2E',       // Fond sombre (dark mode futur)
        text: '#1F2937',       // Texte principal
      },
      // Typographie DrawCoach
      fontFamily: {
        title: ['Nunito', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
