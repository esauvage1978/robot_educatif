---
layout: ../../layouts/EsPost.astro
title: "Conecta 4 en Python, capítulo 2: pantalla y gravedad"
description: "Imprimir el tablero con . X O y dejar caer una ficha en la casilla libre más baja de una columna."
updated: "11 November 2026"
---

El archivo descargable es el mismo que en la página francesa, así que los mensajes siguen en francés.

El capítulo 1 guarda el tablero. Este capítulo lo hace legible y deja caer una ficha.

`afficher_grille` imprime los números de columna del 1 al 7 y después cada fila. El diccionario `SYM` convierte `0`, `1` y `2` en `.`, `X` y `O`. Las personas cuentan las columnas desde 1. Las listas siguen usando los índices del 0 al 6. El número impreso es el índice más uno.

`colonne_jouable` rechaza una columna fuera de 0–6 y una columna cuya casilla superior (`grille[0][col]`) ya está ocupada. Si arriba no hay sitio, ya no puede caer nada.

`jouer_colonne` recorre las filas desde abajo: `range(LIGNES - 1, -1, -1)` vale 5, 4, 3, 2, 1, 0. Escribe el número del jugador en la primera casilla vacía y devuelve `True`. Si no hay casilla libre, devuelve `False`. Una caída fallida no es una jugada. El capítulo 3, en ese caso, deja al mismo jugador.

La demostración deja caer tres fichas en la columna de índice 3: X, luego O, luego X. En pantalla es la columna 4, apilada desde abajo.

## Qué debes ver

Las tres casillas de abajo de la columna 4 muestran X, O y X, con la X al fondo. El resto sigue en `.`. Si una ficha aparece arriba, el bucle recorre de arriba abajo.

## Ejercicios

1. Añade una cuarta ficha en la misma columna y vuelve a imprimir el tablero.
2. Escribe `hauteur_colonne(grille, col)`: cuántas casillas de esa columna no están vacías.
3. Llama a `jouer_colonne` ocho veces en la misma columna. Las dos últimas llamadas deben devolver `False` y el tablero no debe crecer.

## El script

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

## Descarga

**[puissance4_chapitre_02.py](/downloads/puissance4/puissance4_chapitre_02.py)**

## Siguiente

[Capítulo 3 — leer una columna y turnarse](/es/conecta-4-python-3-turnos/). [Capítulo 1](/es/conecta-4-python-1-tablero/).

