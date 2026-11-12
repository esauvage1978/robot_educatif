---
layout: ../../layouts/EsPost.astro
title: "Conecta 4 en Python, capítulo 3: columnas y turnos"
description: "Leer una columna del 1 al 7, rechazar un dato malo y cambiar de jugador solo después de una caída real."
updated: "11 November 2026"
---

El archivo descargable es el mismo que en la página francesa, así que los mensajes siguen en francés.

El tablero ya puede recibir una ficha. Este capítulo pregunta a una persona qué columna usar y alterna X y O. Todavía no sabe quién ha ganado. Esa prueba es el capítulo 4.

`demander_colonne` repite la pregunta hasta recibir un entero del 1 al 7. `input` devuelve texto y `int` lo convierte. Una palabra, una línea vacía o un número fuera del 1–7 se rechaza. La función devuelve el índice, es decir el número tecleado menos uno.

El bucle de turnos llama a `jouer_colonne`. Solo un resultado `True` cambia de jugador: `joueur = J2 if joueur == J1 else J1`. Si la columna está llena, sigue el mismo jugador. Cambiar igualmente regalaría un turno al rival.

El capítulo se detiene tras un número fijo de jugadas, porque aún no detecta la victoria. No subas ese límite esperando que se anuncie un ganador.

## Qué debes ver

Escribe `4` y otra vez `4`. La primera ficha es X al fondo de la columna 4, la segunda es O justo encima, y la pregunta vuelve al primer jugador. `abc` no debe cerrar el programa con un error.

## Ejercicios

1. Permite salir con `q`: `demander_colonne` devuelve `None` y el bucle se detiene.
2. Muestra el número de jugada en cada turno.
3. Juega una partida larga sin mensaje de victoria. El mensaje llega en el capítulo 4.

## El script

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

## Descarga

**[puissance4_chapitre_03.py](/downloads/puissance4/puissance4_chapitre_03.py)**

## Siguiente

[Capítulo 4 — detectar cuatro en línea](/es/conecta-4-python-4-cuatro-en-linea/).

