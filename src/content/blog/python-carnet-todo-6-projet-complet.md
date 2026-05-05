---
title: "Carnet Todo Python (6/6) : projet complet, main() et extensions"
headline: "Assembler ton carnet Todo Python — argparse, checklist, CSV"
description: "Application python json complète : chemin par défaut ou argument, checklist, priorités et export CSV. Fin de série tutoriel gratuite robot-educatif.info."
pubDate: 2026-03-29
updatedDate: 2026-04-18
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Carnet Todo
seriesOrder: 6
tags: ["Python", "Programmation", "Projet", "débutant", "JSON"]
relatedLinks:
  - title: "Sommaire — Carnet Todo"
    href: "/programmation/carnet-todo/"
  - title: "Partie 5 — persistance"
    href: "/python-carnet-todo-5-persistance/"
categories:
  - "Python"
  - "Programmation"
  - "Carnet Todo"
  - "Projet"
faqSchema:
  - question: "Comment lancer le carnet Todo avec un fichier personnalisé ?"
    answer: "Lire sys.argv après le nom du script pour choisir le chemin du JSON sinon utiliser un nom par défaut comme taches.json à côté du programme."
  - question: "Quelles extensions sont les plus naturelles après ce tutoriel ?"
    answer: "Priorité ou date sur chaque tâche, export CSV pour tableur, puis plus tard une API ou une interface qui lit le même fichier JSON."
  - question: "Où retrouver tout le parcours Carnet Todo ?"
    answer: "Sur la page pilier programmation carnet todo du site robot-educatif.info avec les six articles numérotés."
---
Tu **boucles la série** : `main()`, chemin du fichier en **argument** ou par défaut, checklist de fin, idées d’**extensions**. C’est le **projet python json** livrable à montrer sur un CV ou un portfolio, au même titre qu’un [jeu](/programmation/puissance-4/) mais côté **outil quotidien**.

Pour aller plus loin : [modules et imports](/python-inter-modules-imports/), [venv et pip](/python-inter-venv-pip/), coffrets [**Python 3 — apprendre et pratiquer**](https://www.amazon.fr/s?k=python+3+coffret+apprendre&tag=manuso06-21) (partenaire).

## 1. Point d’entrée

```python
import json
import sys
from pathlib import Path

def main():
    chemin = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("taches.json")
    data = charger_securise(chemin)
    try:
        boucle(data, chemin)
    finally:
        sauvegarder(chemin, data)
        print("Au revoir — données enregistrées.")

if __name__ == "__main__":
    main()
```

Adapte : si tu sauvegardes **à chaque** action, le `finally` peut seulement confirmer la dernière version ou être retiré.

N’oublie pas `import json` dans le fichier qui définit `charger_securise`.

## 2. Structure des fichiers suggérée

- `todo.py` — tout en un pour débuter  
- ou `todo/` avec `storage.py`, `model.py`, `cli.py`

## 3. Checklist

- [ ] UTF-8 partout.
- [ ] `ensure_ascii=False` au dump.
- [ ] Id uniques et `prochain_id` cohérent.
- [ ] Erreurs `int(input)` gérées.
- [ ] Message si fichier créé au premier lancement.

## 4. Extensions

- **Priorité** : `1` à `3` dans chaque tâche, tri à l’affichage.
- **Date d’échéance** : chaîne ISO `2026-04-01` (pas besoin de module au début).
- **Export CSV** : une ligne par tâche pour tableur.
- **Synchronisation** : hors scope débutant, mais le JSON facilite plus tard une API.

## Résultat attendu

Un **script unique** ou un petit paquet modulaire : tu lances `python todo.py` (ou avec un chemin), tu gères tes tâches, tu quittes en **sachant** que le JSON reflète le dernier état. Tu peux comparer avec la **checklist** ci-dessus avant de passer aux extensions.

## Et après cette série ?

- **Révision du fil :** [Sommaire Carnet Todo](/programmation/carnet-todo/)
- **Autres projets guidés :** [Pendu](/programmation/pendu/), [Puissance 4](/programmation/puissance-4/), [Bataille navale](/programmation/bataille-navale/), [mini jeu terminal](/python-mini-jeu-terminal/)
- **Montée en puissance :** [Python intermédiaire](/programmation/python-intermediaire/) ou [projets agenda](/programmation/projet-python-intermediaire-agenda/)

## Matériel recommandé (partenaire Amazon)

- [Python 3 — coffrets et manuels](https://www.amazon.fr/s?k=python+3+coffret+apprendre&tag=manuso06-21)
- [Projets pratiques Python](https://www.amazon.fr/s?k=python+projets+pratiques+livre&tag=manuso06-21)
- [Raspberry Pi — faire tourner tes scripts en continu](https://www.amazon.fr/s?k=raspberry+pi+5+kit+debutant&tag=manuso06-21)
