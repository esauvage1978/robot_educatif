---
layout: ../../layouts/EsPost.astro
title: "Conecta 4 en Python, capítulo 5: tablas"
description: "Terminar la partida con cuatro en línea o con el tablero lleno. Comprobar la victoria antes de las tablas."
updated: "11 November 2026"
---

El archivo descargable es el mismo que en la página francesa, así que los mensajes siguen en francés.

Una partida termina de dos maneras. Alguien tiene cuatro en línea, o el tablero está lleno y nadie los tiene. El tablero cabe 42 fichas. Si se han jugado las 42 sin victoria, la partida es tablas.

El orden de las pruebas es el contenido de este capítulo. Después de una caída válida:

1. Si `victoire` es verdadera, anuncia al jugador que acaba de mover y detente.
2. Si no, y `grille_pleine` es verdadera, anuncia tablas y detente.
3. Si no, cambia de jugador y pide otra columna.

Comprobar primero el tablero lleno convertiría la última jugada ganadora en tablas. La ficha 42 puede cerrar una línea.

Los mensajes del archivo están en francés (`gagne`, `match nul`). La regla de arriba es lo que esos mensajes tienen que respetar.

## Qué debes ver

Completa cuatro fichas: aparece el mensaje de victoria y ya no se pregunta al rival. Llena el tablero sin cuatro en línea: el mensaje de tablas aparece una sola vez.

## Ejercicios

1. Cuenta las jugadas y muestra el número al final.
2. Limpia la terminal entre turnos con `os.system("cls")` en Windows o `clear` en macOS y Linux.
3. Pregunta, al terminar, si se quiere jugar otra vez.

## El script

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

## Descarga

**[puissance4_chapitre_05.py](/downloads/puissance4/puissance4_chapitre_05.py)**

## Siguiente

[Capítulo 6 — partida completa y rival aleatorio](/es/conecta-4-python-6-partida-completa/).

