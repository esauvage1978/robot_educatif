---
title: "Carnet Todo en Python (5/6) — persistance et robustesse"
description: "Sauvegarder après chaque modification ou à la fermeture ; copie de secours ; gestion JSONDecodeError."
pubDate: 2026-03-29
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Carnet Todo
seriesOrder: 5
tags: ["Python", "Programmation", "Projet"]
relatedLinks:
  - title: "Partie 4 — menu"
    href: "/python-carnet-todo-4-menu-cli/"
  - title: "Partie 6 — projet complet"
    href: "/python-carnet-todo-6-projet-complet/"
---

Sans **sauvegarde**, fermer le terminal efface tout. Deux stratégies courantes :

1. **À chaque modification** : après ajout, bascule, suppression → `sauvegarder(chemin, data)`. Simple et sûr si le programme plante.
2. **À la sortie uniquement** : moins d’écriture disque ; risque si coupure brutale.

Pour un petit carnet, **sauver souvent** ne pose aucun problème.

## 1. Envelopper les modifications

```python
def avec_sauvegarde(chemin, data, fonction, *args):
    ok = fonction(data, *args)
    if ok:
        sauvegarder(chemin, data)
    return ok
```

Ou appelle `sauvegarder` manuellement après chaque branche du menu qui modifie `data`.

## 2. Fichier corrompu

```python
import json

def charger_securise(chemin):
    try:
        return charger(chemin)
    except json.JSONDecodeError:
        print("Fichier JSON illisible — démarrage à vide. Sauvegarde l’ancien fichier si besoin.")
        return {"prochain_id": 1, "taches": []}
```

Renommer `taches.json` en `taches.json.broken` avant d’écraser peut aider l’utilisateur.

## 3. Copie de secours (option)

Avant d’écrire, copie `taches.json` vers `taches.json.bak` avec `shutil.copy2` — utile si le programme est interrompu pendant l’écriture (rare avec petits fichiers).

## Exercices

1. Affiche **« enregistré »** uniquement quand `sauvegarder` a réussi.
2. Ajoute un mode **lecture seule** : variable d’environnement ou argument `python todo.py --dry-run` (affiche sans sauver).
3. Mesure la **taille** du JSON après 100 tâches fictives (boucle de test).

## Suite

[Partie 6 — Assembler le projet, main() et extensions](/python-carnet-todo-6-projet-complet/).

## Amazon (partenaire)

- [Python données](https://www.amazon.fr/s?k=python+donn%C3%A9es+json+livre&tag=manuso06-21)
