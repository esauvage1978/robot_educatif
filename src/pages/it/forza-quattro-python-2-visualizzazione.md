---
layout: ../../layouts/ItPost.astro
title: "Forza Quattro in Python, capitolo 2: visualizzazione e gravità"
description: "Stampare il tavoliere con . X O e far cadere una pedina nella casella libera più bassa di una colonna."
updated: "11 November 2026"
---

Il file da scaricare è lo stesso della pagina francese, quindi i messaggi restano in francese.

Il capitolo 1 memorizza la griglia. Questo capitolo la rende leggibile e fa cadere una pedina.

`afficher_grille` stampa i numeri di colonna da 1 a 7, poi ogni riga. Il dizionario `SYM` trasforma `0`, `1` e `2` in `.`, `X` e `O`. Le persone contano le colonne da 1. Le liste usano ancora gli indici da 0 a 6. Il numero stampato è l’indice più uno.

`colonne_jouable` rifiuta una colonna fuori da 0–6 e una colonna la cui casella in alto (`grille[0][col]`) è già occupata. Se l’alto è pieno, non c’è più posto.

`jouer_colonne` percorre le righe dal basso: `range(LIGNES - 1, -1, -1)` vale 5, 4, 3, 2, 1, 0. Scrive il numero del giocatore nella prima casella vuota e restituisce `True`. Se nessuna casella è libera restituisce `False`. Un lancio fallito non è una mossa. Il capitolo 3, in quel caso, lascia lo stesso giocatore.

La dimostrazione lascia cadere tre pedine nella colonna di indice 3: X, poi O, poi X. Sullo schermo è la colonna 4, impilata dal basso.

## Cosa devi vedere

Le tre caselle in basso della colonna 4 mostrano X, O e X, con X in fondo. Le altre restano `.`. Se una pedina compare in alto, il ciclo parte dall’alto.

## Esercizi

1. Aggiungi una quarta pedina nella stessa colonna e ristampa la griglia.
2. Scrivi `hauteur_colonne(grille, col)`: quante caselle di quella colonna non sono vuote.
3. Chiama `jouer_colonne` otto volte sulla stessa colonna. Le ultime due chiamate devono restituire `False` e la griglia non deve crescere.

## Lo script

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Puissance 4 — Chapitre 2/6 : affichage ASCII, gravite, jouer_colonne.
Lancer : python puissance4_chapitre_02.py
"""

VIDE = 0
J1 = 1
J2 = 2
LIGNES = 6
COLONNES = 7
SYM = {0: ".", 1: "X", 2: "O"}


def nouvelle_grille():
    return [[VIDE for _ in range(COLONNES)] for _ in range(LIGNES)]


def afficher_grille(grille):
    print("  " + " ".join(str(c + 1) for c in range(COLONNES)))
    for ligne in grille:
        print("  " + " ".join(SYM[cell] for cell in ligne))


def colonne_jouable(grille, col):
    return 0 <= col < COLONNES and grille[0][col] == VIDE


def jouer_colonne(grille, col, joueur):
    if not colonne_jouable(grille, col):
        return False
    for ligne in range(LIGNES - 1, -1, -1):
        if grille[ligne][col] == VIDE:
            grille[ligne][col] = joueur
            return True
    return False


if __name__ == "__main__":
    g = nouvelle_grille()
    jouer_colonne(g, 3, J1)
    jouer_colonne(g, 3, J2)
    jouer_colonne(g, 3, J1)
    print("Exemple : trois pions dans la colonne 4 (indice 3)\n")
    afficher_grille(g)
```

## Scarica

**[puissance4_chapitre_02.py](/downloads/puissance4/puissance4_chapitre_02.py)**

## Dopo

[Capitolo 3 — leggere una colonna e alternare i turni](/it/forza-quattro-python-3-turni/). [Capitolo 1](/it/forza-quattro-python-1-griglia/).

