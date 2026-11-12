---
layout: ../../layouts/ItPost.astro
title: "Forza Quattro in Python, capitolo 5: il pareggio"
description: "Chiudere la partita con quattro in fila o con il tavoliere pieno. Controllare la vittoria prima del pareggio."
updated: "11 November 2026"
---

Il file da scaricare è lo stesso della pagina francese, quindi i messaggi restano in francese.

Una partita finisce in due modi. Qualcuno ha quattro in fila, oppure il tavoliere è pieno e nessuno li ha. Il tavoliere contiene 42 pedine. Se tutte e 42 sono state giocate senza una vittoria, la partita è un pareggio.

L’ordine dei controlli è il senso di questo capitolo. Dopo una caduta riuscita:

1. Se `victoire` è vera, annuncia il giocatore che ha appena mosso e fermati.
2. Altrimenti, se `grille_pleine` è vera, annuncia il pareggio e fermati.
3. Altrimenti cambia giocatore e chiedi un’altra colonna.

Controllare prima il tavoliere pieno trasformerebbe l’ultima mossa vincente in un pareggio. La 42ª pedina può chiudere una riga.

I messaggi nel file sono in francese (`gagne`, `match nul`). La regola qui sopra è ciò che quei messaggi devono rispettare.

## Cosa devi vedere

Completa quattro pedine: compare il messaggio di vittoria e l’avversario non viene più interrogato. Riempi il tavoliere senza quattro in fila: il messaggio di pareggio compare una volta sola.

## Esercizi

1. Conta le mosse e stampane il numero alla fine.
2. Pulisci il terminale tra un turno e l’altro con `os.system("cls")` su Windows o `clear` su macOS e Linux.
3. Chiedi, a partita finita, se si vuole giocare ancora.

## Lo script

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Puissance 4 — Chapitre 5/6 : match nul si grille pleine, messages clairs.
Lancer : python puissance4_chapitre_05.py
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


def ligne_du_dernier_pion(grille, col):
    for ligne in range(LIGNES - 1, -1, -1):
        if grille[ligne][col] != VIDE:
            return ligne
    return -1


def grille_pleine(grille):
    return all(grille[0][c] != VIDE for c in range(COLONNES))


def compte_direction(grille, ligne, col, joueur, dl, dc):
    n = 0
    l, c = ligne, col
    while 0 <= l < LIGNES and 0 <= c < COLONNES and grille[l][c] == joueur:
        n += 1
        l += dl
        c += dc
    return n


def victoire(grille, ligne, col, joueur):
    for dl, dc in [(0, 1), (1, 0), (1, 1), (1, -1)]:
        total = (
            compte_direction(grille, ligne, col, joueur, dl, dc)
            + compte_direction(grille, ligne, col, joueur, -dl, -dc)
            - 1
        )
        if total >= 4:
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


def partie_deux_humains():
    grille = nouvelle_grille()
    joueur = J1
    while True:
        afficher_grille(grille)
        print(f"Joueur {sym(joueur)} — a toi.")
        col = demander_colonne()
        if not jouer_colonne(grille, col, joueur):
            print("Colonne pleine — choisis une autre colonne.")
            continue
        ligne = ligne_du_dernier_pion(grille, col)
        if victoire(grille, ligne, col, joueur):
            afficher_grille(grille)
            print(f"Bravo : le joueur {sym(joueur)} a aligne 4 !")
            return
        if grille_pleine(grille):
            afficher_grille(grille)
            print("Match nul : grille pleine, personne n'a 4 alignes.")
            return
        joueur = J2 if joueur == J1 else J1


if __name__ == "__main__":
    partie_deux_humains()
```

## Scarica

**[puissance4_chapitre_05.py](/downloads/puissance4/puissance4_chapitre_05.py)**

## Dopo

[Capitolo 6 — partita completa e avversario casuale](/it/forza-quattro-python-6-partita-completa/).

