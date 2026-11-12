---
layout: ../../layouts/EsPost.astro
title: "Conecta 4 en Python, capítulo 1: el tablero 6×7"
description: "Capítulo 1: una lista de seis listas de siete números. 0 es vacío, 1 y 2 son los jugadores."
updated: "11 November 2026"
---

El archivo descargable es el mismo que en la página francesa, así que los mensajes siguen en francés.

Un tablero de Conecta 4 tiene 6 filas y 7 columnas. Este capítulo solo construye el tablero. Todavía no hay una impresión de juego y nada cae: la gravedad es el capítulo 2.

Una casilla es un entero. `0` está vacía, `1` es el primer jugador, `2` el segundo. Los números se comparan mejor que los textos `"X"` y `"O"`.

`nouvelle_grille` devuelve una lista de 6 listas, cada una con 7 ceros. El índice exterior es la fila. **La fila 0 está arriba** y la fila 5 abajo. En el capítulo 2 la búsqueda empieza por abajo y se detiene en la primera casilla vacía.

`grille_pleine` solo es verdadera cuando en la fila 0 no queda ningún cero. Si la fila de arriba está llena, todas las columnas están llenas, porque las fichas caen siempre lo más abajo posible. El capítulo 5 usará la función para las tablas.

La demostración escribe un `1` en la fila 5, columna de índice 3. Para una persona es la última fila, columna 4, porque el teclado usará las columnas del 1 al 7.

![PowerShell después del capítulo 1: tablero creado, última fila [0, 0, 0, 1, 0, 0, 0], tablero no lleno.](/images/lot10/puissance4-ch1-terminal-output.webp)

*Salida de `puissance4_chapitre_01.py`. Los mensajes están en francés porque es el archivo publicado con la serie. El `1` está en la última fila, cuarta columna.*

## Cómo ejecutarlo

Guarda el script como `puissance4_chapitre_01.py` o descarga el archivo. En la carpeta del archivo:

```text
python puissance4_chapitre_01.py
```

Debes leer `Grille 6 x 7 creee.`, luego la última fila `[0, 0, 0, 1, 0, 0, 0]`, luego `Grille pleine ? False`.

## Ejercicios

1. Imprime todo el tablero, una fila por línea, antes de pasar al capítulo 2.
2. Coloca una segunda ficha en la fila 4, misma columna, y comprueba que queda justo encima de la primera.
3. ¿Qué devuelve `grille_pleine` si solo llenas la fila 5? Debe seguir siendo falso: la fila de arriba aún está vacía.

## El script

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Puissance 4 — Chapitre 1/6 : constantes, grille 6x7, demo pile dans une colonne.
Lancer : python puissance4_chapitre_01.py
"""

VIDE = 0
J1 = 1
J2 = 2
LIGNES = 6
COLONNES = 7


def nouvelle_grille():
    return [[VIDE for _ in range(COLONNES)] for _ in range(LIGNES)]


def grille_pleine(grille):
    """True si la ligne du haut est pleine (plus aucun coup possible)."""
    return all(grille[0][c] != VIDE for c in range(COLONNES))


if __name__ == "__main__":
    g = nouvelle_grille()
    print("Grille", LIGNES, "x", COLONNES, "creee.")
    assert len(g) == LIGNES and len(g[0]) == COLONNES

    # Demo : empiler trois J1 dans la colonne d'indice 3 (colonne 4 pour l'humain)
    col_demo = 3
    for _ in range(3):
        for ligne in range(LIGNES - 1, -1, -1):
            if g[ligne][col_demo] == VIDE:
                g[ligne][col_demo] = J1
                break

    print("Derniere ligne (bas de la grille) :", g[-1])
    print("Grille pleine ?", grille_pleine(g))
    print("OK — passe au chapitre 2 pour l'affichage et jouer_colonne.")
```

## Descarga

**[puissance4_chapitre_01.py](/downloads/puissance4/puissance4_chapitre_01.py)**

## Siguiente

[Capítulo 2 — mostrar el tablero y dejar caer una ficha](/es/conecta-4-python-2-gravedad/).

