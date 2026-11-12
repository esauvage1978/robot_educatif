---
layout: ../../layouts/EsPost.astro
title: "Conecta 4 en Python (6/6) — juego completo e IA aleatoria"
description: "Menú dos jugadores o humano vs IA aleatoria, descarga puissance4_chapitre_06.py, pruebas en terminal y solución de problemas — serie Conecta 4, octubre 2026."
updated: "31 de octubre de 2026"
schemaUpdated: "2026-10-31"
faqSchema:
  - question: "¿Cómo ejecuto el Conecta 4 completo?"
    answer: "Descarga puissance4_chapitre_06.py, abre una terminal en la carpeta, ejecuta python puissance4_chapitre_06.py y elige 1 (dos humanos) o 2 (tú X vs IA O)."
  - question: "¿La IA es fuerte?"
    answer: "No: elige una columna legal al azar con random.choice. Es una base didáctica; luego puedes bloquear amenazas de tres fichas."
  - question: "¿Necesito los capítulos 1 a 5?"
    answer: "Sí para entender el código. El capítulo 6 reúne todas las funciones; los capítulos 1–5 construyen cuadrícula, gravedad, victoria y empate."
---

Algunos enlaces son de afiliado (**Amazon.es**). Comprueba precio y disponibilidad el día de la compra.

**Respuesta directa (octubre de 2026)** — Obtienes **Conecta 4** (cuatro en línea en cuadrícula **6×7**) en la **terminal** (ventana de texto donde escribes `python …`): un **menú** ofrece **dos humanos** o **tú (X) contra IA (O)** con columna **aleatoria pero válida**. Descarga **`puissance4_chapitre_06.py`**. Empieza por el [capítulo 1 — cuadrícula](/python-puissance-4-1-cahier-grille/). **Prerrequisito:** [capítulo 5 — empate](/python-puissance-4-5-match-nul/).

**Serie Conecta 4 (6 partes)** — [Índice](/programmation/puissance-4/) · [1](/python-puissance-4-1-cahier-grille/) · [2](/python-puissance-4-2-affichage-gravite/) · [3](/python-puissance-4-3-coup-alternance/) · [4](/python-puissance-4-4-quatre-alignes/) · [5](/python-puissance-4-5-match-nul/) · **6 (esta página)**

| Criterio | Detalle |
| --- | --- |
| **Objetivo** | Menú, solo vs IA, salir con `q` |
| **Nivel** | Principiante (tras partes 1–5) |
| **Tiempo** | 30–60 min copiando; ~5 min solo descarga |
| **Material** | PC con **Python 3** |
| **Resultado** | Cuadrícula, victoria/empate, IA anuncia columna |

<figure class="article-figure">
  <img src="/images/lot10/puissance4-ch6-terminal-session.webp" alt="Terminal: menú, cuadrícula ASCII con X y O, jugada de la IA." width="920" height="696" loading="eager" decoding="async" />
  <figcaption>Sesión de ejemplo reconstruida a partir del script del capítulo 6. Crédito: Emmanuel Sauvage, Robot Éducatif — octubre de 2026.</figcaption>
</figure>

**IA** (*inteligencia artificial* aquí: el ordenador juega solo) usa el módulo **`random`** de Python.

## 1. Bucle a dos jugadores

Consulta el [capítulo 5](/python-puissance-4-5-match-nul/) y [puissance4_chapitre_05.py](/downloads/puissance4/puissance4_chapitre_05.py). Pasos previos: [visualización](/python-puissance-4-2-affichage-gravite/), [turnos](/python-puissance-4-3-coup-alternance/), [cuatro alineados](/python-puissance-4-4-quatre-alignes/).

## 2. IA aleatoria

```python
import random

def choix_ia(grille):
    jouables = [c for c in range(COLONNES) if colonne_jouable(grille, c)]
    return random.choice(jouables)
```

Tú **J1** (`X`), IA **J2** (`O`). Tras cada jugada de la IA se imprime la columna.

## 3. Ejecutar y comprobar

```bash
python puissance4_chapitre_06.py
```

Prueba modos **1** y **2**, **`q`** para salir. Bases: [listas](/python-listes-et-chaines/), [bucles](/python-boucles-for-while/), [if/else](/python-conditions-if-else/). Más juegos texto: [ahorcado](/programmation/pendu/), [batalla naval](/programmation/bataille-navale/), [curso Python](/programmation/python/).

## 4. Descarga

**[puissance4_chapitre_06.py](/downloads/puissance4/puissance4_chapitre_06.py)** — capítulos [1](/downloads/puissance4/puissance4_chapitre_01.py)–[5](/downloads/puissance4/puissance4_chapitre_05.py). Mensajes al usuario en francés en el script original.

## 5. Solución de problemas

| Síntoma | Causa | Acción |
| --- | --- | --- |
| `python` no encontrado | Fuera del **PATH** | Reinstala Python 3 con PATH o `py` en Windows |
| Columna rechazada | Columna llena | Mensaje esperado |
| IA no mueve | Modo 1 | Reinicia con `2` |
| `empty sequence` | Sin columnas libres | Revisa empate |
| Caracteres raros | Codificación | Cabecera UTF-8 en el archivo |

## 6. Extensiones

- Bloquear **tres en raya** rival.
- **Deshacer** con pila.
- [Serie Todo](/programmation/carnet-todo/).

[Hub de la serie](/programmation/puissance-4/) · [mini-juego terminal](/es/python-mini-juego-terminal/).

## Amazon (socio)

- <a href="/go/az-es-4684743b04" rel="sponsored nofollow noopener" class="affiliate-link">Libros de proyectos y juegos Python en Amazon.es</a>

*Emmanuel Sauvage — 31 de octubre de 2026.*
