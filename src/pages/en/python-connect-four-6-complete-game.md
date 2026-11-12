---
layout: ../../layouts/EnPost.astro
title: "Connect Four in Python (6/6) — complete terminal game and random AI"
description: "Menu for two humans or you vs random AI, downloadable puissance4_chapitre_06.py, terminal tests and troubleshooting — Connect Four series, October 2026."
updated: "31 October 2026"
schemaUpdated: "2026-10-31"
faqSchema:
  - question: "How do I run the complete Connect Four script?"
    answer: "Download puissance4_chapitre_06.py, open a terminal in that folder, run python puissance4_chapitre_06.py, then choose 1 (two humans) or 2 (you as X vs AI as O)."
  - question: "Is the AI strong?"
    answer: "No. It picks a legal column at random with random.choice. It is a learning baseline; you can later block three-in-a-row threats."
  - question: "Do I need chapters 1 to 5 first?"
    answer: "Yes to understand the code. Chapter 6 bundles every function; parts 1–5 build the grid, gravity, win detection and draw step by step."
---

Some links below are affiliate links. **Amazon.co.uk** is the default shop; a **Amazon.com** link is included for US readers. Check today’s price — we do not invent local amounts.

**Direct answer (October 2026)** — You get **Connect Four** (four-in-a-row on a **6×7 grid**) in the **terminal** (the text window where you type `python …`): a **menu** offers **two humans** or **you (X) vs an AI (O)** that picks a **legal column at random**. Download **`puissance4_chapitre_06.py`** below. Start from [chapter 1 — grid setup](/python-puissance-4-1-cahier-grille/) if you are new to the series. **Prerequisite:** [chapter 5 — draw and messages](/python-puissance-4-5-match-nul/).

**Connect Four series (6 parts)** — [Hub](/programmation/puissance-4/) · [1 — grid](/python-puissance-4-1-cahier-grille/) · [2 — display & gravity](/python-puissance-4-2-affichage-gravite/) · [3 — turns](/python-puissance-4-3-coup-alternance/) · [4 — four in a row](/python-puissance-4-4-quatre-alignes/) · [5 — draw](/python-puissance-4-5-match-nul/) · **6 — complete game (this page)**

| Item | Detail |
| --- | --- |
| **Goal** | Menu + solo vs AI + quit with `q` |
| **Level** | Beginner (after parts 1–5) |
| **Time** | 30–60 min copying code; ~5 min if you only download the `.py` |
| **You need** | A PC with **Python 3** (free interpreter) |
| **Success check** | 6×7 grid, win/draw messages, AI announces its column |

<figure class="article-figure">
  <img src="/images/lot10/puissance4-ch6-terminal-session.webp" alt="Terminal session: menu 1 or 2, ASCII grid with X and O, AI column announced." width="920" height="696" loading="eager" decoding="async" />
  <figcaption>Sample session rebuilt from the chapter 6 script (menu, grid, human move then AI). Credit: Emmanuel Sauvage, Educational Robotics — October 2026.</figcaption>
</figure>

This final lesson adds a **menu** (`1` = two humans, `2` = you vs **AI** — here *artificial intelligence* only means the computer plays by itself) and **`q`** to quit mid-game. **Python** is the language; **`random`** is the standard library module for random picks.

## 1. Two-human loop (recap)

Follow [chapter 5 — draw and full two-player loop](/python-puissance-4-5-match-nul/): `partie_deux_humains()` prints the grid, reads a column, applies gravity, checks **win**, then **draw** when the top row is full. Compare with [puissance4_chapitre_05.py](/downloads/puissance4/puissance4_chapitre_05.py) if needed.

Earlier steps: [display & gravity](/python-puissance-4-2-affichage-gravite/), [alternating players](/python-puissance-4-3-coup-alternance/), [four aligned](/python-puissance-4-4-quatre-alignes/).

## 2. Random AI

The AI does not plan ahead: it lists playable columns, then uses **`random.choice`**.

```python
import random

def choix_ia(grille):
    jouables = [c for c in range(COLONNES) if colonne_jouable(grille, c)]
    return random.choice(jouables)
```

The AI plays `O` (**J2**, player 2); you play `X` (**J1**). After each AI move the script prints the column — essential for debugging.

Wire `partie_vs_ia()` and **`main()`** so startup reads `1` or `2`, as in the full file below.

## 3. Run and verify

1. Save or download `puissance4_chapitre_06.py`.
2. Open a terminal in that folder (PowerShell, Command Prompt, or **VS Code** / **Thonny** integrated terminal).
3. Run:

```bash
python puissance4_chapitre_06.py
```

4. Mode **1**: play two different columns, then try a full column (expect “Colonne pleine”).
5. Mode **2**: after your move, check `IA (O) joue la colonne …` (French strings in the script — normal).
6. Type **`q`**: the game should exit cleanly.

Refresh basics with [lists & strings](/python-listes-et-chaines/), [loops](/python-boucles-for-while/) and [if/else](/python-conditions-if-else/). Other text games: [Hangman hub](/programmation/pendu/), [Battleship hub](/programmation/bataille-navale/), [Python course](/programmation/python/).

## 4. Full chapter script

The file on disk matches the French article (function names in French, user messages in French). Download:

**[puissance4_chapitre_06.py](/downloads/puissance4/puissance4_chapitre_06.py)** — parts [1](/downloads/puissance4/puissance4_chapitre_01.py) through [5](/downloads/puissance4/puissance4_chapitre_05.py) show the build-up.

## 5. Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `python` not found | Python not on **PATH** | Reinstall Python 3 with “Add to PATH”, or use `py puissance4_chapitre_06.py` on Windows |
| Wrong column / crash | User types 8 or letters | Check `demander_colonne()` maps 1–7 to index 0–6 |
| AI never moves | Mode 1 selected | Restart and choose `2` |
| `ValueError: empty sequence` | No legal column left | End-of-game edge case; ensure `grille_pleine` is tested |
| Garbled characters | Encoding | Keep `# -*- coding: utf-8 -*-` and a UTF-8 terminal |

## 6. Extensions

- Block opponent **three-in-a-row** threats or complete your own threes.
- **Undo** with a stack of last moves.
- Next project on this site: [Todo notebook series](/programmation/carnet-todo/) for saving scores to a file.

Congratulations on the **Connect Four** track: [series hub](/programmation/puissance-4/) · [terminal guessing game](/en/python-mini-terminal-game/) · [robots programmable in Python](/robot-programmable-python/).

## Amazon (partner)

Books on **Python game projects** may inspire follow-ups — verify edition and level before buying.

- <a href="/go/az-gb-9c39d7b76e" rel="sponsored nofollow noopener" class="affiliate-link">Python game project books on Amazon.co.uk</a>
- <a href="/go/az-us-06848dad09" rel="sponsored nofollow noopener" class="affiliate-link">Python game project books on Amazon.com</a> (US)

*Emmanuel Sauvage — updated 31 October 2026.*
