---
layout: ../../layouts/EnPost.astro
title: "mBot activity: scroll text on the LED matrix"
description: "Scroll a message on the mBot LED matrix: X position, loops, length×5+15 rule. Program diagrams included."
updated: "31 October 2026"
---

Some links on this page are affiliate links. If you buy through them, we may earn a commission at no extra cost to you.

On the **mBot**, the **LED matrix** (often **5 columns × 8 rows**) can show letters and symbols. To create the illusion of a **scrolling banner**, you do not “rotate pixels” by hand: you **display the same text** several times per second, but each time you change its **horizontal position** (often called **`X`** in mBlock).

By the end of this activity, you will have a **reusable pattern** to show any message, several times, in other projects.

---

## 1. Prerequisites

- An [mBot robot (Makeblock)](/en/mbot-my-first-educational-robot/).
- [mBlock 5](/en/install-mblock-5-windows/) and a first [look at the interface](/en/first-steps-mblock-5/).
- The [mBot blocks](/en/install-mbot-blocks/) (LED matrix, LEDs, etc.).
- Knowing how to **upload** a program to the board: [first mBot program](/en/first-mbot-program/).

Exact **block names** can vary with the **language** and **version** of mBlock; the **idea** (variable `X`, loop, delay) stays the same.

---

## 2. Understand the matrix before coding

### 2.1 A moving window on the message

Imagine the text as a **ribbon** wider than the screen. The matrix only shows a **window** of a few columns. By **sliding** the ribbon to the left (or shifting the display position), you make the letters **scroll**.

```text
     matrix (5 visible columns)
          ┌─────┐
ribbon … H e l l o  w o r l d …  →  we slide the ribbon
          └─────┘
```

To see what happens “for real”, here is a photo/capture on the robot with a simple display:

![Photo: a word displayed on the LED matrix](/capture/activite-mbot-faire-defiler-un-texte/2.1/photo_affichage_hel.webp)

And the matching program capture (activity 2.1):

![Image of the first text-display activity](/capture/activite-mbot-faire-defiler-un-texte/2.1/premiere-activite-affichage-texte.png)

mBlock program: [`afficher_1_mot.mblock`](/capture/activite-mbot-faire-defiler-un-texte/2.1/afficher_1_mot.mblock) (“show one word”).

### 2.2 The role of variable `X`

In mBlock, a block like **“show text at position X”** (wording may vary) places the **start** of the text at an abscissa `X` on the matrix.

- If you want the link with “text” programming in **Arduino C**, `X` is a classic **variable**: you give it a type (often `int`) and change its value across loops. See: [Arduino C — types and variables](/en/arduino-c-types-variables/).

- **Large `X`**: the text starts **on the right**; part of it can be **off-screen** (invisible).
- **`X` decreases**: the text shifts to the **left** → **scrolling** effect.

Logical diagram of **one frame** on screen:

```text
position X (schematic)
  small X     →  start of the word visible on the left
  medium X    →  word centred or partly visible
  large X     →  word pushed right / out of view
```

Takeaway: **to scroll, you must vary `X`** (often by decreasing it step by step in a loop).

---

## 3. First step: fixed display (truncated text)

**Goal**: show **“Hello”** to see how the matrix reacts.

Minimal logical structure:

```text
┌─────────────────────────────┐
│  When mBot starts           │
│    show text "Hello"        │
│    (at a fixed X)           │
└─────────────────────────────┘
```

After **upload**, you often see that **only the first letters** appear (the rest leave the visible area). That is normal: the matrix is **narrow**.

- By pushing **`X`** (e.g. toward **10** or **15**), you can **hide** the start of the word or make it **enter** from the right.

Here is the same word with a different `X` offset (example `X = 10`):

![Photo: a single character when X is 10](/capture/activite-mbot-faire-defiler-un-texte/2.2/photo_affichage_h.jpeg)

Program capture (activity 2.2):

![Image of the text-display activity when X is 10](/capture/activite-mbot-faire-defiler-un-texte/2.2/activite-affichage-texte-x-vaut-10.png)

mBlock program: [`afficher_1_mot_x_vaut_10.mblock`](/capture/activite-mbot-faire-defiler-un-texte/2.2/afficher_1_mot_x_vaut_10.mblock) (“show one word, X = 10”).

**Idea to keep**: a static display **proves** the link between **`X`** and what the eye sees. Scrolling will be **the same operation**, repeated with **`X` changing**.

---

## 4. Second step: a loop that moves `X`

**Goal**: **repeat**: show the text at the current position, **decrease `X`**, wait a bit — to create motion.

### 4.1 Prepare the start

- Create a variable **`X`**.
- At the beginning, set **`X = 15`** (a typical value to start **off-screen on the right** and let the message **enter**). Adjust for your text.

### 4.2 Scroll loop (one pass)

Logical structure:

```text
┌──────────────────────────────────────────┐
│  On start                                 │
│    X ← 15                                 │
│    ┌────────────────────────────────────┐ │
│    │  Repeat forever *                   │ │
│    │    show text at position X         │ │
│    │    X ← X − 1                        │ │
│    │    wait 0.1 s                       │ │
│    └────────────────────────────────────┘ │
└──────────────────────────────────────────┘

* Or “forever” depending on available blocks
```

Detailed flow (one iteration):

```text
   ┌──────────────┐
   │  Show        │
   │  text at X   │
   └──────┬───────┘
          │
          ▼
   ┌──────────────┐
   │  X ← X − 1   │
   └──────┬───────┘
          │
          ▼
   ┌──────────────┐
   │  Wait        │
   │  0.1 s       │
   └──────┬───────┘
          │
          └──────► (back to start of the loop)
```

The **delay** (often **0.1 s**) is essential: without it, scrolling would be too fast to read.

Local capture (section 4):

![Scrolling: loop that decreases X](/capture/activite-mbot-faire-defiler-un-texte/4/defilement-boucle-diminue-x.png)

mBlock program: [`boucle.mblock`](/capture/activite-mbot-faire-defiler-un-texte/4/boucle.mblock) (“loop”).

### 4.3 Limit of this version

- The program can **run forever** after the text has already **left** the screen.
- You often want to **chain** a **new pass** (or **several repetitions** of the message) cleanly.

→ Hence the **third step**: **bound** the inner loop and **wrap** it in a loop of **repetitions**.

---

## 5. Third step: several passes (nested loops)

**Goal**: scroll the **same message several times**, with a clear end for each pass.

### 5.1 Two loop levels

Logical structure **overview**:

```text
┌─────────────────────────────────────────────────────┐
│  On start                                            │
│    ┌──────────────────────────────────────────────┐ │
│    │  For each display of the message (e.g. 3×)      │ │  ← OUTER loop
│    │    X ← 15                                      │ │
│    │    ┌────────────────────────────────────────┐ │ │
│    │    │  For a fixed number of steps              │ │ │  ← INNER loop
│    │    │    show text at X                         │ │ │
│    │    │    X ← X − 1                              │ │ │
│    │    │    wait 0.1 s                             │ │ │
│    │    └────────────────────────────────────────┘ │ │
│    └──────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

**Nested** diagram (“boxes” view):

```text
 +-- repeat N times (whole message) ----------------+
 |                                                   |
 |   X ← 15                                          |
 |   +-- repeat (length × 5 + 15) times -----------+  |
 |   |      show ; X←X-1 ; wait                    |  |
 |   +---------------------------------------------+  |
 +---------------------------------------------------+
```

### 5.2 How many steps for the inner loop?

So that the hand-off between two passes is neither too long nor too short, a common rule is:

```text
number_of_steps = text_length * 5 + 15
```

Example: for the message `Hello` (5 characters), you get `5 * 5 + 15 = 40` steps in the inner loop. That gives the text time to enter from the right, scroll across, and leave the screen completely on the left before the next pass.

- **`text_length`**: number of characters in the message (at first, **without counting accents** if your display ignores them — see section 7).
- **× 5**: in practice, each “wide” character on the matrix is about **5 columns** wide in the font mBlock uses for this matrix — a useful **workshop approximation**, not a physical law.
- **`+ 15`**: margin to **exit** the text **fully** on the left after bringing it in from the right (the same margin you already used with the initial **`X`**).

You can store **`text_length`** in a variable to keep the program **readable**.

Local capture (step 5.2):

![Three scroll repetitions (nested loops)](/capture/activite-mbot-faire-defiler-un-texte/5.2/trois-repetitions-defilement.png)

mBlock program: [`defiler52.mblock`](/capture/activite-mbot-faire-defiler-un-texte/5.2/defiler52.mblock) (“scroll 5.2”).

### 5.2 bis DRY: do not write the same info twice

In this example, I deliberately **did not write the display text twice** (once to compute the length, then once to show it).

That programming habit is called **DRY** (*Don’t Repeat Yourself*):

- **do not repeat** the same information in several places;
- otherwise, the day you change the message, you may forget one occurrence and get an **inconsistent** program.

Here the DRY idea is: **one source** for the message — a single variable such as **`banner_text`** — then reuse that variable:

- to compute `text_length` from `banner_text`
- to display `banner_text` on the matrix

Keep **one** string variable for both length and drawing; do not hard-code `"Hello"` in two separate blocks.

### 5.2 ter mBlock bug: variable as `float` but message as text

By default, code generated by mBlock often declares variables as `float`. That is fine for numbers (position `X`, counters, etc.), but **not** for a string like `"My new message"`.

**Fix:** create a **dedicated text variable** in the blocks (for example `banner_text`), assign the message once, then use that variable for length and for `drawStr` / show-text. If you open the **Code** tab, cast or declare the message as a **`String`**, not `float`:

```cpp
String banner_text = "My new message";
int text_length = banner_text.length();
```

If you do:

```cpp
banner_text = "My new message";
```

while `banner_text` is still declared as `float`, the upload can fail (capture below):

![Upload error: float variable used as text](/capture/activite-mbot-faire-defiler-un-texte/5.2/erreur_televersement.png)

Example of code that causes the error. The variable names come from the mBlock project shown in the captures (`texte` = text, `longueur_texte` = text length, `taille_ecran` = screen size, `nombre_de_repetition` = number of repetitions); you can name yours as you like.

```cpp
// generated by mBlock5 for mBot
// codes make you happy

#include <MeMCore.h>
#include <Arduino.h>
#include <Wire.h>
#include <SoftwareSerial.h>

MeLEDMatrix ledMtx_1(1);

float x = 0;
float texte = 0;  // BUG: should be String banner_text
float longueur_texte = 0;
float nombre_de_repetition = 0;
float i = 0;
float j = 0;
float taille_ecran = 0;

void _delay(float seconds) {
  long endTime = millis() + seconds * 1000;
  while(millis() < endTime) _loop();
}

void setup() {
  ledMtx_1.setColorIndex(1);
  ledMtx_1.setBrightness(6);
  texte = "My new message";  // fails while texte is float
  longueur_texte = String(texte).length();
  taille_ecran = 15;
  nombre_de_repetition = 3;
  for(int i=0;i<(int)ceil(nombre_de_repetition);i+=1){
    x = taille_ecran;
    for(int count=0;count<int((longueur_texte * 5 + taille_ecran));count++){

      ledMtx_1.drawStr(x, 0 + 7, String(texte).c_str());
      x += -1;
      _delay(0.1);
    }

  }

}

void _loop() {
}

void loop() {
  _loop();
}
```

### 5.2 quater Fix: change the type of `texte`

The fix is to declare `texte` as a **string**.

#### Steps in mBlock (important)

1. Go to `</>` → **Arduino C preview** (read-only).
2. **Copy** the code.
3. Open the **Arduino C** tab (this one is meant to be edited).
4. **Paste** the code, then replace the declaration of `texte`.

Corrected version:

```cpp
// generated by mBlock5 for mBot
// codes make you happy

#include <MeMCore.h>
#include <Arduino.h>
#include <Wire.h>
#include <SoftwareSerial.h>

MeLEDMatrix ledMtx_1(1);

float x = 0;
const char* texte = "";
float longueur_texte = 0;
float nombre_de_repetition = 0;
float i = 0;
float j = 0;
float taille_ecran = 0;

void _delay(float seconds) {
  long endTime = millis() + seconds * 1000;
  while(millis() < endTime) _loop();
}

void setup() {
  ledMtx_1.setColorIndex(1);
  ledMtx_1.setBrightness(6);
  texte = "My new message";
  longueur_texte = String(texte).length();
  taille_ecran = 15;
  nombre_de_repetition = 3;
  for(int i=0;i<(int)ceil(nombre_de_repetition);i+=1){
    x = taille_ecran;
    for(int count=0;count<int((longueur_texte * 5 + taille_ecran));count++){

      ledMtx_1.drawStr(x, 0 + 7, String(texte).c_str());
      x += -1;
      _delay(0.1);
    }

  }

}

void _loop() {
}

void loop() {
  _loop();
}
```

> Note: on an mBot/mCore, `const char*` is often “lighter” than `String` as a global. Here we use `String(texte)` only to get the length and to provide a `c_str()` for display.

---

## 6. Common pitfall: accents and special characters

**Accented** characters are often **poorly supported** or **invisible** depending on version / display mode. For a workshop:

- first test with **`HELLO`**, **`MBOT`**, **`SALUT`**;
- if you must show local-language text, plan **without accents** or an **abbreviation** until you validate on your mBlock version.

---

## 7. Recap: teaching chain

```text
fixed display (understand X and truncation)
        │
        ▼
one loop: X decreases → continuous scroll
        │
        ▼
two loops: N clean passes + steps ≈ length×5+15
        │
        ▼
you can scroll a message and repeat it cleanly
```

You can now reuse this “scroll engine” in your projects (show a score, an instruction, a distance…), by copying the logic when you need it.

---

## 8. Going further

- Continue with [measure distances](/en/mbot-activity-measure-distance/) to display a dynamic value.
- Vary the **speed** (`wait 0.05` vs `0.2`) and observe **readability**.
- Discuss in class: **how many columns** per character if you measure on a screenshot? (link with **pixel** and **typography**).

[mBot — Amazon UK](https://www.amazon.co.uk/dp/B07XR98YYQ?tag=roboteducatif-21) · [Amazon.com](https://www.amazon.com/dp/B07XR98YYQ?tag=roboteducatif-20)
