---
layout: ../../layouts/ItPost.astro
title: "Forza Quattro in Python, capitolo 3: colonne e turni"
description: "Leggere una colonna da 1 a 7, rifiutare un dato sbagliato e cambiare giocatore solo dopo una caduta riuscita."
updated: "11 November 2026"
---

Il file da scaricare è lo stesso della pagina francese, quindi i messaggi restano in francese.

Il tavoliere può ricevere una pedina. Questo capitolo chiede a una persona quale colonna usare e alterna X e O. Non sa ancora chi ha vinto. Quel controllo è il capitolo 4.

`demander_colonne` ripete la domanda finché non arriva un intero da 1 a 7. `input` restituisce testo, `int` lo converte. Una parola, una riga vuota o un numero fuori da 1–7 viene rifiutato. La funzione restituisce l’indice, cioè il numero digitato meno uno.

Il ciclo dei turni chiama `jouer_colonne`. Solo un risultato `True` cambia giocatore: `joueur = J2 if joueur == J1 else J1`. Se la colonna è piena, tocca ancora allo stesso giocatore. Cambiare lo stesso regalerebbe un turno all’avversario.

Il capitolo si ferma dopo un numero fisso di mosse, perché non riconosce la vittoria. Non alzare quel limite aspettandoti l’annuncio di un vincitore.

## Cosa devi vedere

Digita `4`, poi di nuovo `4`. La prima pedina è X in fondo alla colonna 4, la seconda è O subito sopra, e la domanda torna al primo giocatore. `abc` non deve far crashare il programma.

## Esercizi

1. Permetti di uscire con `q`: `demander_colonne` restituisce `None` e il ciclo si ferma.
2. Stampa il numero della mossa a ogni turno.
3. Gioca una partita lunga senza messaggio di vittoria. Il messaggio arriva al capitolo 4.

## Lo script

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Puissance 4 — Chapitre 3/6 : saisie colonne, alternance J1/J2 (sans detection victoire).
Lancer : python puissance4_chapitre_03.py
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


def demander_colonne():
    while True:
        raw = input(f"Colonne (1-{COLONNES}) ? ").strip()
        try:
            c = int(raw)
        except ValueError:
            print("Entre un nombre entier.")
            continue
        if 1 <= c <= COLONNES:
            return c - 1
        print("Hors plage.")


def sym(joueur):
    return "X" if joueur == J1 else "O"


def demo_partie_rapide():
    """Quelques coups en alternance (pas encore de victoire detectee)."""
    grille = nouvelle_grille()
    joueur = J1
    nb_coups = 0
    max_coups = 8
    while nb_coups < max_coups:
        afficher_grille(grille)
        print(f"Tour du joueur {sym(joueur)}")
        col = demander_colonne()
        if not jouer_colonne(grille, col, joueur):
            print("Colonne pleine ou invalide — rejoue.")
            continue
        nb_coups += 1
        joueur = J2 if joueur == J1 else J1
    afficher_grille(grille)
    print("Demo terminee (chapitre 4 : detection des 4 alignes).")


if __name__ == "__main__":
    demo_partie_rapide()
```

## Scarica

**[puissance4_chapitre_03.py](/downloads/puissance4/puissance4_chapitre_03.py)**

## Dopo

[Capitolo 4 — riconoscere quattro in fila](/it/forza-quattro-python-4-quattro-in-fila/).

