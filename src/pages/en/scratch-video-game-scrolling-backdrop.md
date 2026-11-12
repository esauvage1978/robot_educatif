---
layout: ../../layouts/EnPost.astro
title: "Scratch: scroll a backdrop with the arrow keys"
description: "Part 1: draw a floor wider than the stage, then move it by 5 pixels with the arrow keys, three variables and a stop at each end."
updated: "12 November 2026"
---

This is the first part of a series. It builds the floor of a game and scrolls it with the arrow keys. The character, the platforms and the jump are not on this page.

## 1. Before you start

[Install mBlock 5](/en/install-mblock-5-windows/), or open [Scratch](https://scratch.mit.edu/). You should already know the stage, the sprite and the block categories: [mBlock 5 interface](/en/first-steps-mblock-5/). The [square activity](/en/scratch-activity-square/) is a first script on one sprite.

Several scripts can live on the same sprite, and they run at the same time. The script area shows the object you have selected.

## 2. Draw a floor wider than the stage

The floor is a **sprite**, not a backdrop. The backdrop has no **Motion** category, so it cannot change x.

1. In **Sprites**, click **add**, then **Paint**.
2. Draw a tile whose top is one colour for the whole path.
3. If there are several pieces, **convert to bitmap** and then **vectorise** so they become one costume. In the English editor the second command is often under the bitmap tools; use the command that merges the selection into one shape.
4. Duplicate the tile (Ctrl+C, Ctrl+V), line up five copies, select all (Ctrl+A) and merge again.
5. Shift that block to the right edge of the paint area and add another tile. In the original walk-through the width then read 841 pixels. Read the number on your screen: that is yours.
6. Repeat until the costume is at least 7,000 pixels wide. The Scratch stage is 480 pixels wide. A shorter floor has almost nothing to scroll.

## 3. The program

The stage runs from x = −240 to x = 240. The sprite’s x is the centre of the costume. Right arrow: the floor moves 5 pixels to the left. Left arrow: the opposite.

### Three variables

In **Variables**, create three variables **for this sprite only**:

- `decor_largeur`: the width you read in the costume editor;
- `decor_debut`: the starting x;
- `decor_fin`: the ending x.

When the green flag is clicked:

1. set `decor_largeur` to that width (7,000 in the example);
2. set `decor_debut` to `(decor_largeur / 2) − 240`;
3. set `decor_fin` to `240 − (decor_largeur / 2)`;
4. go to x: `decor_debut`, y: 0.

With 7,000, the start is 3,260 and the end is −3,260. The left edge of the costume then lines up with the left edge of the stage. This sum was not replayed in Scratch for this update. If the floor does not start on the left, the sign or the width you read does not match the costume.

### Arrows and limits

The **and** block runs the move only when both tests are true. Inside **forever**:

- if **right arrow pressed** and **x position > decor_fin**, **change x by −5**;
- if **left arrow pressed** and **x position < decor_debut**, **change x by 5**.

Check: green flag, the floor is on the left. Right arrow shifts it, then it stops when x reaches `decor_fin`. Left arrow brings it back and stops at `decor_debut`.

## 4. Next

Open examples on [Scratch](https://scratch.mit.edu/). On this site: [the square](/en/scratch-activity-square/), [install mBlock 5](/en/install-mblock-5-windows/), [first mBot program](/en/first-mbot-program/).
