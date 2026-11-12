---
layout: ../../layouts/EnPost.astro
title: "How to draw a square in Scratch (easy activity)"
description: "How to draw a square in Scratch: place the sprite, plan its route, then program it with the pen and a “repeat 4 times” loop. A step-by-step activity for beginners."
updated: "31 October 2026"
---

Some links on this page are affiliate links. If you buy through them, we may earn a commission at no extra cost to you.

Drawing a square is one of the best first challenges for learning to program. It takes very few blocks, but it forces you to ask the right questions: where is the sprite? Which way is it facing? What must it do, and how many times?

In this activity you will make a small sprite (the character on the stage, here a panda) walk around a square with sides of 200 steps. You will start by understanding how the stage is mapped out, then place the sprite in the right spot, and finally **program the route yourself**. The solution is further down, folded away, so that you can try first: you learn best by trying, and even by making a few mistakes along the way.

The activity suits children from 8, with an adult nearby for the youngest. Allow about 30 minutes.

## What you need before you start

A program that lets you code with blocks, and a little familiarity with its screen:

- **Scratch** (the free software from MIT, the Massachusetts Institute of Technology, which you can use online at [scratch.mit.edu](https://scratch.mit.edu/)) or **mBlock 5** (Makeblock’s software, built on Scratch 3, which adds robot programming). To install mBlock, follow our guide [install mBlock 5 on Windows 10/11](/en/install-mblock-5-windows/).
- Having taken a tour of the screen: the stage, the block categories and the script area. The guide [first steps in mBlock 5](/en/first-steps-mblock-5/) introduces each of these zones.

The screenshots in this article come from mBlock 5. In online Scratch the blocks are the same; only a few menu labels differ slightly.

## The stage and its coordinate grid

To tell a sprite where to go, you need a way to point at an exact spot on the stage. Scratch and mBlock use an **orthonormal frame** for this: two axes that cross at a right angle, with the same scale on both.

- The **X** axis is horizontal: values increase towards the right.
- The **Y** axis is vertical: values increase towards the top.
- The point where the two axes cross is called the **origin**. Its coordinates are **(0, 0)** and it sits at the **centre** of the stage.

The coordinates of a point are written **(x, y)**: first the **x-coordinate** (the horizontal position), then the **y-coordinate** (the vertical position). The point (50, −30), for example, is 50 units to the right of the centre and 30 units below it.

![Diagram of the mBlock / Scratch stage coordinate grid: origin at the centre, x axis from −240 to +240, y axis from −180 to +180.](/images/blog/activite-scratch-carre/repere-orthonorme-mblock.svg)

*The stage is 480 units wide and 360 high. One unit is one “step” of the sprite: when you write “move 10 steps”, it travels 10 units.*

> **Stage limits:** for the sprite to stay visible, **x** must stay between **−240** and **+240**, and **y** between **−180** and **+180**.

## Place the sprite at the starting point

Our square will begin in the top-left corner. So place the sprite at coordinates **(−100, 100)**.

![The panda placed in the upper-left part of the stage, at the point (−100, 100).](/capture/carre/01-placement-lutin-moins100-100.png)

*The panda, placed at the top left of the stage.*

There are two ways to do it: **drag the sprite with the mouse** on the stage, or **type the values** into the sprite panel, under the **Sprites** tab. The second method is the more precise one.

![The mBlock Sprites panel, with X = −100, Y = 100, Size = 100 and Direction = 90.](/capture/carre/02-saisie-coordonnees-lutin.png)

*The Sprites panel: X is −100 and Y is 100. Also notice the **Direction** field, which is 90: the sprite is facing right. Keep that in mind, because you will need it.*

## Your turn to program!

Here is the challenge. The sprite is at (−100, 100), it faces right, and the side of the square is **200 steps** long.

> **Your mission:** when the **space bar** is pressed, the sprite walks the four sides of the square **clockwise** (the direction of a clock’s hands), then returns to its starting point.

Before touching a single block, grab a sheet of paper. Draw the square, write down where each of the four corners is, and imagine what the sprite has to do at each corner. That minute of thinking will save you a lot of time.

### Where to find the blocks

The blocks are sorted into **categories**, in the left-hand column of the programming area. Each category has its own colour: blue for **Motion**, orange for **Control**, yellow for **Events**, and so on. At the bottom of the column, the **extension** button lets you add more categories.

![The list of block categories in mBlock 5: Search, Motion, Looks, Sound, Events, Control, Sensing, Operators, Variables, My Blocks, and the extension button.](/images/blog/premier-pas-mblock/mblock-categories-blocs.png)

*The block categories in mBlock 5. The “extension” button at the bottom is used to add the Pen category.*

You then assemble the blocks in the large **script area** by dragging them and snapping them together one under the other, like puzzle pieces. A block that does not snap in does nothing: if it stays separate from the others, it will not run.

![The empty mBlock 5 script area: a grid of dots on which you drop the blocks.](/images/blog/premier-pas-mblock/mblock-zone-script.png)

*The script area, still empty. This is where you will build your program.*

### A hint to get there: the pen and the loop

You can make the sprite draw a line behind it with the **pen**. Here are the ingredients of the method that uses the fewest blocks, without telling you in which order to place them:

- a block from the **Events** category to start from the keyboard: “when space key pressed”;
- the **pen**, which you add with the **extension** button (choose the Pen extension): it has to be put down for the sprite to leave a trail;
- the **move … steps** block, from the **Motion** category;
- the **turn ↻ … degrees** block, also in **Motion**. The ↻ arrow turns clockwise;
- the **“repeat …”** loop from the **Control** category: instead of copying the same blocks several times, you put them inside the loop, which replays them as many times as you ask.

A square is the same thing four times: one side, then one turn. So ask yourself what goes inside the loop, how many times to repeat it, and by how many degrees to turn at each corner.

If you prefer to reason with the **coordinates** of your four corners, you can also use the “glide … secs to x: … y: …” block, which moves the sprite smoothly to a given point. Both methods work.

### How to check your work

Press the **space bar** on your keyboard. You have succeeded if:

1. the sprite makes one full turn clockwise;
2. it comes back exactly to its starting point;
3. if it uses the pen, the trail draws a proper square, not a rectangle or a spiral.

A few leads if it does not work: a turn in the wrong direction (↺ instead of ↻) sends the sprite off the stage, where it gets stuck on the edge. A block forgotten in the loop gives an open shape. And if nothing moves, check that all the blocks are snapped under the “when space key pressed” block.

Take your time to try. When you have finished, or if you are stuck, open the solution below.

<details class="exercise-solution">
<summary class="exercise-solution__summary">See a solution (after trying)</summary>

### The coordinates of the four corners

The square is 200 steps on each side and the starting point is (−100, 100). Clockwise, the four corners are therefore:

| Step | Corner | Coordinates |
|---|---|---|
| Start | Top left | (−100, 100) |
| 1 | Top right | (100, 100) |
| 2 | Bottom right | (100, −100) |
| 3 | Bottom left | (−100, −100) |
| Back | Top left | (−100, 100) |

To go from one corner to the next, only one of the two coordinates changes, and it changes by 200: exactly the length of the side.

### Solution with coordinates

This is the script contained in the project file: when space is pressed, the sprite glides for 1 second to each of the next three corners, then returns to the start.

![The script: when space key pressed, four “glide 1 secs to x: y:” blocks with the values (100, 100), (100, −100), (−100, −100), (−100, 100).](/capture/carre/03-scene-preparee-carre.png)

*The solution script. The four “glide” blocks follow the corners of the square clockwise.*

You can **[download the `carre.mblock` project](/capture/carre/carre.mblock)** (the file name is French for “square”): it contains the panda already placed at (−100, 100) and this script. Open it with mBlock 5 (**File** menu, then **Open**). If you use online Scratch, simply copy the blocks from the screenshot.

### Solution with the pen and “repeat 4”

This version uses a 90-degree turn at each corner. The sprite faces right (direction 90): it moves 200 steps, turns 90° to the right and now faces down, moves 200 steps, and so on until it is back at its starting position. Four turns of 90° make exactly one full turn, that is 360°.

Here is the structure of the script, block by block (as text, to be rebuilt in the script area):

```text
when [space] key pressed
erase all
go to x: -100 y: 100
point in direction 90
pen down
repeat 4
    move 200 steps
    turn ↻ 90 degrees
pen up
```

The first three lines after the event put the sprite back in its starting state: you can rerun the program as often as you like without the previous trails or the final position getting in the way. It is worth making a habit of this.

</details>

## Going further

Once your square works, change it to see what each value does:

- change the side length, for example 100 or 150 steps;
- change the colour or thickness of the line with the blocks of the Pen extension;
- draw an **equilateral triangle**: it has 3 sides, and the sprite turns 120° at each corner (360 divided by 3);
- draw a **hexagon**: 6 sides and 60° at each corner (360 divided by 6).

You have just discovered a useful rule: for a regular shape with n sides, you repeat n times “move, then turn 360 ÷ n degrees”.

If this first program was fun, the next step on a real robot is the [first mBot program](/en/first-mbot-program/). And if you hesitate between the two programs, read [mBlock or Scratch: which one should you choose?](/en/mblock-vs-scratch/).

## Frequently asked questions

### How do you draw a square in Scratch?

Place the sprite at a corner, put the pen down, then repeat 4 times “move 200 steps” and “turn 90 degrees”. The sprite then draws four equal sides and four right angles. The other method uses the coordinates of the four corners with the “glide to x: y:” block. Both solutions are detailed above, in the folded section.

### Why repeat 4 times, and why turn 90°?

A square has 4 equal sides and 4 right angles. A right angle measures 90 degrees. The “repeat 4 times” loop replays the same two instructions (one side, one turn) at each corner, without copying the blocks. After four turns of 90°, the sprite has rotated 360°: it faces its starting direction again.

### Is there a difference between Scratch and mBlock for this activity?

No, the motion, control and pen blocks are the same, because mBlock 5 is built on Scratch 3. The difference lies in what you can do: Scratch is for creating animations and games, while mBlock also lets you program robots (such as mBot) and offers a Python mode. To choose, read [mBlock or Scratch: which one should you choose?](/en/mblock-vs-scratch/).

### The sprite draws no line. What should I do?

Check that the block that puts the pen down (“pen down”) runs before the movements, and that it is not followed by a block that lifts the pen too early. Also check that the Pen extension has been added.

*Author: Emmanuel Sauvage.*
