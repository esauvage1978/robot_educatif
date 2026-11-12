---
layout: ../../layouts/EsPost.astro
title: "Conecta 4 en Python (1/6) — cuadrícula 6×7 y modelo de datos"
description: "Cuadrícula 6×7 como lista de listas, constantes VIDE/J1/J2, grille_pleine — puissance4_chapitre_01.py descargable, serie Conecta 4, octubre 2026."
updated: "31 de octubre de 2026"
schemaUpdated: "2026-10-31"
faqSchema:
  - question: "¿Por qué una cuadrícula 6×7 en Conecta 4?"
    answer: "Es el tablero clásico: las fichas caen en una columna hasta la casilla libre más baja. Seis filas y siete columnas es el estándar."
  - question: "¿Qué significan VIDE = 0, J1 = 1 y J2 = 2?"
    answer: "Constantes para casilla vacía, jugador 1 (luego X), jugador 2 (O). Los números simplifican la lógica en la lista."
  - question: "¿Cómo compruebo el capítulo 1?"
    answer: "Ejecuta python puissance4_chapitre_01.py: verás Grille 6 x 7 creee, última fila con un 1 en el índice 3 (tres fichas en la misma columna), Grille pleine ? False y el OK hacia el capítulo 2."
---

Algunos enlaces son de afiliado. **Amazon.es** es la tienda por defecto. Comprueba el precio del día — no inventamos importes.

**Respuesta directa (octubre de 2026)** — Colocas la **base** de **Conecta 4** en **Python 3**: **cuadrícula 6×7** como **lista de listas**, **constantes** (`VIDE`, `J1`, `J2`) y **`grille_pleine`** para un futuro **empate**. Aún sin gráficos: trabajas en la **terminal** (ventana de texto con `python archivo.py`). Descarga **`puissance4_chapitre_01.py`**; sigue el [capítulo 2 — visualización y gravedad](/python-puissance-4-2-affichage-gravite/).

**Serie Conecta 4 (6 partes)** — [Índice](/programmation/puissance-4/) · **1 — cuadrícula (esta página)** · [2](/python-puissance-4-2-affichage-gravite/) · [3](/python-puissance-4-3-coup-alternance/) · [4](/python-puissance-4-4-quatre-alignes/) · [5](/python-puissance-4-5-match-nul/) · [6 — juego completo](/es/python-conecta-4-6-juego-completo/)

| Dato | Detalle |
| --- | --- |
| **Objetivo** | Constantes, `nouvelle_grille()`, `grille_pleine()` |
| **Nivel** | Principiante (tras listas y bases Python) |
| **Tiempo** | 30–45 min |
| **Material** | PC con **Python 3** |
| **Prerrequisitos** | [Curso Python](/programmation/python/), [listas y cadenas](/python-listes-et-chaines/), [if/else](/es/python-condiciones-if-else/) |
| **Resultado** | Script que crea la cuadrícula, demo en columna, « no llena » |

<figure class="article-figure">
  <img src="/images/lot10/puissance4-ch1-terminal-output.webp" alt="Terminal: salida de puissance4_chapitre_01.py, cuadrícula creada, fila inferior con unos." width="920" height="520" loading="eager" decoding="async" />
  <figcaption>Salida reconstruida a partir del script del capítulo 1 (mensajes en francés en el archivo). Crédito: Emmanuel Sauvage, Robot Éducatif — octubre 2026.</figcaption>
</figure>

## El juego que programas

**Conecta 4** (**Puissance 4** en francés): fichas en **columnas**, **gravedad**, **cuatro en línea** para ganar; tablero lleno sin ganador = **empate**.

Este capítulo solo prepara la **estructura de datos** (los capítulos 2–6 la completan). Si hiciste el [mini-juego terminal](/es/python-mini-juego-terminal/), ya conoces la consola; aquí añades una **cuadrícula 2D**.

## Dónde ejecutar el script

**Windows**: PowerShell, `py` si hace falta. **Mac/Linux**: `python3`. **VS Code** o **Thonny**: terminal integrado.

## 1. Tamaño y símbolos

| Constante | Valor | Papel |
| --- | --- | --- |
| `LIGNES` | 6 | filas |
| `COLONNES` | 7 | columnas |
| `VIDE` | 0 | vacío |
| `J1` / `J2` | 1 / 2 | jugador 1 (X) / 2 (O) |

Fila **0** = **arriba**, **5** = **abajo**. Columna **0** a la izquierda. Demo: `col_demo = 3`.

## 2. `nouvelle_grille()`

```python
def nouvelle_grille():
    return [[VIDE for _ in range(COLONNES)] for _ in range(LIGNES)]
```

Repasa [listas y cadenas](/python-listes-et-chaines/) y [bucles](/python-boucles-for-while/) si lo necesitas.

## 3. `grille_pleine()`

```python
def grille_pleine(grille):
    return all(grille[0][c] != VIDE for c in range(COLONNES))
```

Se usa en el [capítulo 5](/python-puissance-4-5-match-nul/).

## 4. Script completo

Igual que **[puissance4_chapitre_01.py](/downloads/puissance4/puissance4_chapitre_01.py)** (nombres de funciones en francés en toda la serie).

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
VIDE, J1, J2 = 0, 1, 2
LIGNES, COLONNES = 6, 7

def nouvelle_grille():
    return [[VIDE for _ in range(COLONNES)] for _ in range(LIGNES)]

def grille_pleine(grille):
    return all(grille[0][c] != VIDE for c in range(COLONNES))

if __name__ == "__main__":
    g = nouvelle_grille()
    print("Grille", LIGNES, "x", COLONNES, "creee.")
    assert len(g) == LIGNES and len(g[0]) == COLONNES
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

## 5. Ejecutar y verificar

Sin traceback; mensajes como en la captura.

## 6. Solución de problemas

| Síntoma | Causa | Acción |
| --- | --- | --- |
| `python` no encontrado | PATH | Reinstala Python 3 o usa `py` |
| `IndentationError` | tabuladores | 4 espacios por bloque |
| Fila inferior solo ceros | falta la demo | revisa el doble `for` |
| `grille_pleine` True en cuadrícula nueva | prueba invertida | la fila superior debe tener `0` |

## 7. Ejercicios

1. `len(g)` y `len(g[0])` → **6** y **7**.  
2. `grille_pleine(nouvelle_grille())` → **False**.  
3. Dos `J2` en columna 0 desde abajo → `g[5][0]` y `g[4][0]` valen **2**.

Otras series: [ahorcado](/programmation/pendu/), [batalla naval](/programmation/bataille-navale/), [capítulo 6](/es/python-conecta-4-6-juego-completo/).

## Descarga

**[puissance4_chapitre_01.py](/downloads/puissance4/puissance4_chapitre_01.py)**

## Siguiente

[Capítulo 2 — visualización y gravedad](/python-puissance-4-2-affichage-gravite/)

## Amazon (socio)

- <a href="/go/az-es-4684743b04" rel="sponsored nofollow noopener" class="affiliate-link">Libros de proyectos y juegos Python en Amazon.es</a>

*Emmanuel Sauvage — actualización 31 de octubre de 2026.*
