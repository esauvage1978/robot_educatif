---
layout: ../../layouts/EnPost.astro
title: "Connect Four in Python: a six-chapter terminal game"
description: "Build Connect Four in the terminal: a 6×7 grid, gravity, turns, four-in-a-row, a draw, then a full game against a random opponent."
updated: "11 November 2026"
---

The downloadable script is the same file as on the French page, so its messages stay in French.

Two players drop tokens down columns. The first to line up four wins. You will write that game in Python 3, in the terminal, with no Pygame and no extra library.

You need to be comfortable with lists, `for` and `while` loops, and `if`. The series has six chapters. Each one ends with a script you can run, and the next chapter starts from that script.

The messages printed by the downloadable files are in French (`Grille`, `Colonne`, `Ton choix`). The Python is the same whatever language you read this in. The screenshots on chapters 1 and 6 show that French output, so you can compare your screen with the file.

Allow about 20 to 40 minutes per chapter. At the end of chapter 6 you can play two humans, or one human against an opponent that picks a legal column at random. That opponent does not look ahead.

## The six chapters

1. [The 6×7 grid](/en/python-connect-four-1-grid-setup/): empty cells, players 1 and 2, and why row 0 is the top.
2. [Display and gravity](/en/connect-four-python-2-display/): print the board and drop a token to the lowest free cell.
3. [Turns](/en/connect-four-python-3-turns/): read a column from the keyboard and switch player only after a legal drop.
4. [Four in a row](/en/connect-four-python-4-four-in-a-row/): count in four directions from the last token.
5. [A draw](/en/connect-four-python-5-draw/): a full board, and why the win is tested first.
6. [The full game](/en/connect-four-python-6-full-game/): a menu, quit with `q`, and a random opponent.

## What you can check

Run `python puissance4_chapitre_01.py`. You should see a 6 by 7 board created, the bottom row `[0, 0, 0, 1, 0, 0, 0]`, and `False` for a full board. If that line is different, the demo did not place the token in column index 3.

