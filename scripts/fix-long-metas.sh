#!/bin/bash

# Fix blog/index.astro description
sed -i 's|description="Découvrez nos articles sur la robotique éducative, la programmation pour enfants, des tutoriels mBlock, Scratch, Python, et nos guides d'\''achat de robots programmables."|description="Articles robotique éducative : tutoriels mBlock, Scratch, Python, guides achat robots et comparatifs pour enfants."|' src/pages/blog/index.astro

# Fix partenariat/index.astro
sed -i 's|description="Propositions de sujets pédagogiques pour les établissements ; possibilité d'\''essais matériel et d'\''articles détaillés, critiques et transparents sur ROBOT éducatif."|description="Propositions pédagogiques pour établissements : essais matériel, articles détaillés et transparents sur ROBOT éducatif."|' src/pages/partenariat/index.astro

# Fix programmation pages
sed -i 's|description="Série de cours Arduino C pour débutant orientée robotique : variables, conditions, boucles, timing (millis), modularité et bonnes pratiques, avec 20 exercices par leçon."|description="Cours Arduino C robotique : variables, conditions, boucles, timing, modularité. 20 exercices par leçon."|' src/pages/programmation/arduino-c/index.astro

sed -i 's|description="Projet guidé en six parties : architecture, parsing générateur, décorateurs et métriques, asyncio pour fichiers, typage, package pyproject et entrée console."|description="Projet Python avancé : architecture, générateurs, décorateurs, asyncio, typage et packaging moderne."|' src/pages/programmation/projet-python-avance-journal/index.astro

sed -i 's|description="Six leçons après le parcours intermédiaire : générateurs et itertools, décorateurs, gestionnaires de contexte, asyncio, typage statique avancé, packaging moderne — 20 exercices par cours."|description="Python avancé : générateurs, décorateurs, context managers, asyncio, typage statique. 20 exercices par cours."|' src/pages/programmation/python-avance/index.astro

echo "✓ Fixed 5 meta descriptions in Astro pages"
