---
title: "Carnet Todo Python (5/6) : persistance JSON et robustesse"
headline: "Sauvegarder un fichier JSON en Python — erreurs et copies de secours"
description: "JSONDecodeError, sauvegarde après coup ou à la sortie, backup .bak ; tutoriel carnet Todo avant l’assemblage final du projet."
pubDate: 2026-03-29
updatedDate: 2026-04-18
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Carnet Todo
seriesOrder: 5
tags: ["Python", "Programmation", "Projet", "débutant", "JSON"]
relatedLinks:
  - title: "Sommaire — Carnet Todo"
    href: "/programmation/carnet-todo/"
  - title: "Partie 4 — menu"
    href: "/python-carnet-todo-4-menu-cli/"
  - title: "Partie 6 — projet complet"
    href: "/python-carnet-todo-6-projet-complet/"
categories:
  - "Python"
  - "Programmation"
  - "Carnet Todo"
  - "Projet"
faqSchema:
  - question: "Que faire si le fichier JSON est corrompu ou invalide ?"
    answer: "Capturer json.JSONDecodeError au chargement, avertir, renommer l’ancien fichier si besoin et repartir d’une base vide ou d’une copie .bak."
  - question: "Faut-il sauvegarder après chaque action ou seulement à la fermeture ?"
    answer: "Sauvegarder souvent limite la perte en cas de crash ; ne sauvegarder qu’à la sortie réduit les écritures disque mais augmente le risque si la machine s’arrête brutalement."
  - question: "Où revoir les bases try except pour ce projet ?"
    answer: "Sur la page erreurs et débogage du parcours Python du même site, en complément de ce chapitre."
---
Sans **sauvegarde**, fermer le terminal efface tout — d’où l’importance de ce volet pour un **projet fichier json python** crédible. Rappelle-toi [erreurs et débogage](/python-erreurs-debogage/) et le [sommaire Carnet Todo](/programmation/carnet-todo/). Des ouvrages [**Python et données**](https://www.amazon.fr/s?k=python+donn%C3%A9es+json+livre&tag=manuso06-21) traitent aussi persistance et bonnes pratiques (partenaire).

Deux stratégies courantes :

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

## Résultat attendu

Stratégie de **sauvegarde** claire, **fichier corrompu** géré proprement, option **backup** comprise. Il ne reste qu’à [assembler le point d’entrée et les extensions](/python-carnet-todo-6-projet-complet/).

## Suite

**Étape suivante :** [assembler le projet, main() et extensions](/python-carnet-todo-6-projet-complet/).  
**Sommaire :** [Carnet Todo — page pilier](/programmation/carnet-todo/).

## Matériel recommandé (partenaire Amazon)

- [Python — données et JSON](https://www.amazon.fr/s?k=python+donn%C3%A9es+json+livre&tag=manuso06-21)
- [Raspberry Pi — héberger de petits scripts](https://www.amazon.fr/s?k=raspberry+pi+5+kit&tag=manuso06-21)
