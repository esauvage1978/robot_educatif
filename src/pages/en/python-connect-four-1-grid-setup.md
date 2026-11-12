---
layout: ../../layouts/EnPost.astro
title: "Connect Four in Python (1/6) — grid spec and 6×7 data structure"
description: "Build the 6×7 list-of-lists grid, VIDE/J1/J2 constants, grille_pleine — downloadable puissance4_chapitre_01.py, Connect Four series, October 2026."
updated: "31 October 2026"
schemaUpdated: "2026-10-31"
faqSchema:
  - question: "Why a 6×7 grid in Connect Four?"
    answer: "It matches the classic game: tokens drop in a column to the lowest free cell. Six rows give enough depth; seven columns allow varied strategies."
  - question: "What do VIDE = 0, J1 = 1 and J2 = 2 mean?"
    answer: "Constants for cell state: empty, player 1 (shown as X later), player 2 (O). Numbers keep logic simple inside the list structure."
  - question: "How do I check chapter 1 works?"
    answer: "Run python puissance4_chapitre_01.py. Expect Grille 6 x 7 creee, a bottom row with a single 1 at index 3 (three tokens stacked in that column), Grille pleine ? False, and the OK message pointing to chapter 2."
---

Some links below are affiliate links. **Amazon.co.uk** is the default shop; an **Amazon.com** link is included for US readers. Check today’s price — we do not invent local amounts.

**Direct answer (October 2026)** — You lay the **foundation** of **Connect Four** in **Python 3**: a **6×7 grid** as a **list of lists**, **constants** (`VIDE`, `J1`, `J2`) and **`grille_pleine`** to detect a future **draw**. No pretty display yet: you work in a **terminal** (text window where you run `python filename.py`). Download **`puissance4_chapitre_01.py`** below; next step is [chapter 2 — display and gravity](/python-puissance-4-2-affichage-gravite/).

**Connect Four series (6 parts)** — [Hub](/programmation/puissance-4/) · **1 — grid (this page)** · [2 — display](/python-puissance-4-2-affichage-gravite/) · [3 — turns](/python-puissance-4-3-coup-alternance/) · [4 — four in a row](/python-puissance-4-4-quatre-alignes/) · [5 — draw](/python-puissance-4-5-match-nul/) · [6 — complete game](/en/python-connect-four-6-complete-game/)

| Item | Detail |
| --- | --- |
| **Goal** | Constants, `nouvelle_grille()`, `grille_pleine()` |
| **Level** | Beginner (after lists and Python basics) |
| **Time** | 30–45 min (read + copy or download) |
| **You need** | PC with **Python 3** (free interpreter) |
| **Prerequisites** | [Python course](/programmation/python/), especially [lists & strings](/python-listes-et-chaines/) and [if/else](/en/python-conditions-if-else/) |
| **Success check** | Script creates an empty grid, stacks three tokens in one column, reports not full |

<figure class="article-figure">
  <img src="/images/lot10/puissance4-ch1-terminal-output.webp" alt="Terminal output after running puissance4_chapitre_01.py: grid created, bottom row with 1s, grid not full." width="920" height="520" loading="eager" decoding="async" />
  <figcaption>Output rebuilt from chapter 1 script (French messages in the file — normal). Credit: Emmanuel Sauvage, Educational Robotics — October 2026.</figcaption>
</figure>

## The game you are coding

**Connect Four** ( **Puissance 4** in French) uses a **vertical** board: two players drop tokens into **columns**; each token **falls** to the lowest free slot. First to align **four** tokens (**horizontal**, **vertical** or **diagonal**) wins. A full board with no winner is a **draw**.

This chapter only prepares the **data structure** reused in parts 2–6. If you finished the [terminal “higher or lower” mini-game](/en/python-mini-terminal-game/), you already know the terminal; here you add a **2D grid** (rows and columns).

## Where to run the script

Open a **terminal** in your project folder:

- **Windows**: PowerShell or Command Prompt; try `py puissance4_chapitre_01.py` if `python` fails.
- **Mac / Linux**: Terminal; `python3` if needed.
- **VS Code** or **Thonny**: integrated terminal, same commands.

**Python 3** runs your file; `print()` shows text. No robot or electronics — keyboard and code only.

## 1. Size and internal symbols

| Constant | Value | Role |
| --- | --- | --- |
| `LIGNES` | 6 | Rows (top → bottom) |
| `COLONNES` | 7 | Columns (left → right) |
| `VIDE` | 0 | Empty cell |
| `J1` | 1 | Player 1 (`X` later) |
| `J2` | 2 | Player 2 (`O`) |

**Indices** (zero-based, standard in Python):

- Row **0** = **top**, **5** = **bottom**.
- Column **0** = **left**, **6** = **right**.
- Human “column 4” is often index **3** — the demo uses `col_demo = 3`.

## 2. Empty grid: `nouvelle_grille()`

A **list of lists**: each row holds `COLONNES` cells set to `VIDE`.

```python
def nouvelle_grille():
    return [[VIDE for _ in range(COLONNES)] for _ in range(LIGNES)]
```

Refresh [lists & strings](/python-listes-et-chaines/) if nested lists are new; [loops](/python-boucles-for-while/) matter in later chapters.

## 3. Future draw: `grille_pleine()`

When **no** column accepts a token, the **top row** (`grille[0]`) has no `VIDE` left.

```python
def grille_pleine(grille):
    return all(grille[0][c] != VIDE for c in range(COLONNES))
```

Used fully in [chapter 5](/python-puissance-4-5-match-nul/).

## 4. Full chapter script

Same as **[puissance4_chapitre_01.py](/downloads/puissance4/puissance4_chapitre_01.py)** (function names and user strings stay in French on disk).

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Connect Four — Chapter 1/6: constants, 6x7 grid, demo stack in one column."""

VIDE = 0
J1 = 1
J2 = 2
LIGNES = 6
COLONNES = 7


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

## 5. Run and verify

1. Save or **download** the `.py` file.
2. Run `python puissance4_chapitre_01.py`.
3. Check: grid created message, bottom row with a **single** `1` at index 3 (three stacked tokens in that column), `Grille pleine ? False`, OK line.

No traceback should appear. Failed `assert` means wrong `LIGNES` / `COLONNES`.

## 6. Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `python` not found | Not on **PATH** | Reinstall Python 3 with “Add to PATH”, or `py` on Windows |
| `SyntaxError` | Broken copy-paste | Download the official `.py` |
| `IndentationError` | Tabs vs spaces | Use **4 spaces** per block |
| Bottom row all zeros | Demo loop missing | Keep the `for _ in range(3)` double loop |
| `grille_pleine` True on new grid | Inverted test | Top row must still contain `0` |

## 7. Exercises

1. On `g = nouvelle_grille()`, what are `len(g)` and `len(g[0])`? **Answer:** `6` and `7`.
2. Fill column 0 with two `J2` from the bottom; what are `g[5][0]` and `g[4][0]`? **Answer:** both `2`.
3. `grille_pleine(nouvelle_grille())`? **Answer:** `False`.

Other text games: [Hangman hub](/programmation/pendu/), [Battleship hub](/programmation/bataille-navale/). Series finale: [chapter 6 — full game](/en/python-connect-four-6-complete-game/).

## Download

**[puissance4_chapitre_01.py](/downloads/puissance4/puissance4_chapitre_01.py)** — run from its folder with `python puissance4_chapitre_01.py`.

## Next

[Chapter 2 — display and gravity](/python-puissance-4-2-affichage-gravite/) shows the board in **ASCII** in the terminal.

## Amazon (partner)

Books on **Python game projects** may inspire follow-ups — verify edition and level before buying.

- <a href="/go/az-gb-9c39d7b76e" rel="sponsored nofollow noopener" class="affiliate-link">Python game project books on Amazon.co.uk</a>
- <a href="/go/az-us-06848dad09" rel="sponsored nofollow noopener" class="affiliate-link">Python game project books on Amazon.com</a> (US)

*Emmanuel Sauvage — updated 31 October 2026.*
