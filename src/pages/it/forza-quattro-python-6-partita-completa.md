---
layout: ../../layouts/ItPost.astro
title: "Forza Quattro in Python, capitolo 6: la partita completa"
description: "Forza Quattro nel terminale in due o contro un avversario che sceglie a caso una colonna libera."
updated: "11 November 2026"
---

Il file da scaricare è lo stesso della pagina francese, quindi i messaggi restano in francese.

Questo capitolo è la partita che puoi passare a qualcun altro. Riusa griglia, gravità, vittoria e pareggio. Aggiunge un menu e un avversario.

All’inizio il programma chiede la modalità. `1` sono due persone sulla stessa tastiera. `2` sei tu come X contro un avversario come O. `q` esce. L’avversario guarda le colonne che `colonne_jouable` accetta ancora e ne sceglie una con `random.choice`. Non blocca e non costruisce una propria riga. Una colonna libera a caso basta per provare le regole. Un avversario minimax sarebbe un altro progetto.

Nel tuo turno, `q` lascia la partita. Una colonna piena viene rifiutata e la domanda si ripete. Dopo una caduta valida il programma controlla la vittoria, poi il pareggio, poi cambia lato. Quando tocca all’avversario non c’è domanda: la colonna viene scelta e stampata.

![Capitolo 6: modalità 2, la persona gioca la colonna 4, anche l’avversario casuale gioca la colonna 4.](/images/lot10/puissance4-ch6-terminal-session.webp)

*Una esecuzione reale di `puissance4_chapitre_06.py`. Le domande sono in francese, come nel file. La colonna dell’avversario da te sarà un’altra, perché è casuale.*

## Esecuzione

```text
python puissance4_chapitre_06.py
```

Scegli `2`, gioca la colonna `4` e controlla che compaia una O in una colonna che non era piena. Poi completa quattro X e controlla che la partita si fermi sulla tua vittoria.

## Cosa questo gioco non fa

Non salva un punteggio, non colora le pedine e non ti impedisce di aiutare l’avversario. Sono estensioni, non regole mancanti.

## Estensioni

1. Alla fine chiedi un’altra partita senza riavviare il programma.
2. Stampa le colonne libere prima che l’avversario scelga.
3. Sostituisci `random.choice` con una funzione che gioca la colonna vincente quando esiste, e altrimenti sceglie a caso.

## Lo script

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Puissance 4 — Chapitre 6/6 : menu, deux humains ou Humain (X) vs IA aleatoire (O).
Lancer : python puissance4_chapitre_06.py
"""

import random

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
        raw = input(f"Colonne (1-{COLONNES}) ou q pour quitter ? ").strip().lower()
        if raw == "q":
            return None
        try:
            c = int(raw)
        except ValueError:
            print("Entre un nombre entier.")
            continue
        if 1 <= c <= COLONNES:
            return c - 1
        print("Hors plage.")


def choix_ia(grille):
    jouables = [c for c in range(COLONNES) if colonne_jouable(grille, c)]
    return random.choice(jouables)


def sym(joueur):
    return "X" if joueur == J1 else "O"


def partie_deux_humains():
    grille = nouvelle_grille()
    joueur = J1
    while True:
        afficher_grille(grille)
        print(f"Joueur {sym(joueur)}")
        col = demander_colonne()
        if col is None:
            print("Partie abandonnee.")
            return
        if not jouer_colonne(grille, col, joueur):
            print("Colonne pleine.")
            continue
        ligne = ligne_du_dernier_pion(grille, col)
        if victoire(grille, ligne, col, joueur):
            afficher_grille(grille)
            print(f"Joueur {sym(joueur)} a gagne !")
            return
        if grille_pleine(grille):
            afficher_grille(grille)
            print("Match nul.")
            return
        joueur = J2 if joueur == J1 else J1


def partie_vs_ia():
    grille = nouvelle_grille()
    joueur = J1
    while True:
        afficher_grille(grille)
        if joueur == J1:
            print("Toi = X")
            col = demander_colonne()
            if col is None:
                print("Abandon.")
                return
        else:
            col = choix_ia(grille)
            print(f"IA (O) joue la colonne {col + 1}")
        if not jouer_colonne(grille, col, joueur):
            if joueur == J1:
                print("Colonne pleine.")
            continue
        ligne = ligne_du_dernier_pion(grille, col)
        if victoire(grille, ligne, col, joueur):
            afficher_grille(grille)
            if joueur == J1:
                print("Tu as gagne !")
            else:
                print("L'IA a gagne.")
            return
        if grille_pleine(grille):
            afficher_grille(grille)
            print("Match nul.")
            return
        joueur = J2 if joueur == J1 else J1


def main():
    print("1 = Deux humains   2 = Toi (X) contre IA (O)")
    choix = input("Ton choix ? ").strip()
    if choix == "2":
        partie_vs_ia()
    else:
        partie_deux_humains()


if __name__ == "__main__":
    main()
```

## Scarica

**[puissance4_chapitre_06.py](/downloads/puissance4/puissance4_chapitre_06.py)**

## Serie

[Tutti e sei i capitoli](/it/forza-quattro-python/). [Capitolo 5 — il pareggio](/it/forza-quattro-python-5-pareggio/).

