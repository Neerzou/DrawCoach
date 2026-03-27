-- Script SQL à exécuter dans Supabase > SQL Editor
-- Insère les 20 leçons fondamentales de DrawCoach

INSERT INTO lessons (title, description, video_url, order_index, difficulty, duration_minutes, is_free) VALUES

-- NIVEAU 1 : La ligne (leçons 1-4, gratuites)
(
  'La ligne droite maîtrisée',
  'Apprends à tracer des lignes droites confiantes sans règle. La base de tout dessin.',
  '',
  1, 'débutant', 5, true
),
(
  'Courbes et arcs de cercle',
  'Des courbes fluides et régulières en un seul mouvement. Dis adieu aux lignes hésitantes.',
  '',
  2, 'débutant', 5, true
),
(
  'Hachures et texture',
  'Crée de la texture et du volume grâce aux hachures croisées et parallèles.',
  '',
  3, 'débutant', 7, true
),
(
  'Les formes géométriques de base',
  'Carré, cercle, triangle : les briques fondamentales de tous les dessins.',
  '',
  4, 'débutant', 7, true
),

-- NIVEAU 2 : Le geste (leçons 5-8, gratuites pour la 5e)
(
  'Dessin gestuel : capturer le mouvement',
  'Dessine l''essence d''un sujet en 30 secondes. Libère ton trait.',
  '',
  5, 'débutant', 8, true
),
(
  'Proportions du corps humain',
  'Les 8 têtes canoniques et les proportions essentielles à retenir.',
  '',
  6, 'débutant', 9, false
),
(
  'La main et ses articulations',
  'Une des parties les plus difficiles à dessiner. On la décompose simplement.',
  '',
  7, 'intermédiaire', 10, false
),
(
  'Visage de face : les proportions',
  'Règle des tiers, placement des yeux, du nez et de la bouche.',
  '',
  8, 'intermédiaire', 10, false
),

-- NIVEAU 3 : Les ombres (leçons 9-12)
(
  'Comprendre la lumière et l''ombre',
  'Source de lumière, ombre propre, ombre portée. Les règles fondamentales.',
  '',
  9, 'intermédiaire', 8, false
),
(
  'Valeurs et contrastes',
  'De la lumière à l''ombre : créer une échelle de valeurs pour donner du volume.',
  '',
  10, 'intermédiaire', 9, false
),
(
  'Ombrager une sphère',
  'L''exercice classique pour maîtriser le passage progressif lumière/ombre.',
  '',
  11, 'intermédiaire', 10, false
),
(
  'Ombrager un visage',
  'Applique les règles d''ombrage à un visage humain pour le rendre réaliste.',
  '',
  12, 'intermédiaire', 12, false
),

-- NIVEAU 4 : Les formes complexes (leçons 13-16)
(
  'Penser en 3D : les formes simples',
  'Cube, cylindre, cône : dessine en perspective pour donner de la profondeur.',
  '',
  13, 'intermédiaire', 10, false
),
(
  'La perspective à 1 point de fuite',
  'Dessine des pièces et des rues avec une profondeur convaincante.',
  '',
  14, 'intermédiaire', 12, false
),
(
  'La perspective à 2 points de fuite',
  'Construis des bâtiments et des objets complexes en perspective.',
  '',
  15, 'avancé', 12, false
),
(
  'Décomposer un objet complexe',
  'Méthode pour dessiner n''importe quel objet en le simplifiant en formes basiques.',
  '',
  16, 'avancé', 10, false
),

-- NIVEAU 5 : La composition (leçons 17-20)
(
  'La règle des tiers',
  'Place ton sujet stratégiquement pour des dessins visuellement équilibrés.',
  '',
  17, 'avancé', 8, false
),
(
  'L''espace négatif',
  'Utilise le vide autour de ton sujet comme un outil de composition puissant.',
  '',
  18, 'avancé', 8, false
),
(
  'Rythme et dynamisme',
  'Crée des compositions qui guident l''oeil et racontent une histoire.',
  '',
  19, 'avancé', 10, false
),
(
  'Ton premier dessin complet',
  'Applique tout ce que tu as appris dans un dessin final de A à Z.',
  '',
  20, 'avancé', 15, false
);
