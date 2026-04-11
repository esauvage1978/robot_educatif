---
title: "Carnet Todo en Python (6/6) — projet complet et extensions"
headline: "Carnet Todo en Python (6/6) — projet complet et extensions"
description: "main() avec chemin par défaut ou argument ; récapitulatif ; priorités, dates, export CSV."
pubDate: 2026-03-29
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Carnet Todo
seriesOrder: 6
tags: ["Python", "Programmation", "Projet"]
relatedLinks:
  - title: "Partie 5 — persistance"
    href: "/python-carnet-todo-5-persistance/"
  - title: "Sommaire — Carnet Todo"
    href: "/programmation/carnet-todo/"
categories:
  - "Python"
  - "Programmation"
  - "Carnet Todo"
  - "Projet"
---
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

[Sommaire Carnet Todo](/programmation/carnet-todo/) — autres séries : [Pendu](/programmation/pendu/), [Puissance 4](/programmation/puissance-4/), [Bataille navale](/programmation/bataille-navale/).

## Amazon (partenaire)

- [Python 3 — manuels et projets](https://www.amazon.fr/s?k=python+3+coffret+apprendre&tag=manuso06-21)
