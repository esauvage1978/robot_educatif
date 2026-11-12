---
layout: ../../layouts/EnPost.astro
title: "Python terminal game: higher or lower (mini-project)"
description: "Build a Python “higher or lower” terminal game: random, while, input, try/except. Full code, manual tests and variants."
updated: "31 October 2026"
faqSchema:
  - question: "How do I make a beginner Python game?"
    answer: "A terminal higher-or-lower game is enough: random.randint for the secret, input for guesses, while to loop, try/except for invalid input."
  - question: "Do I need a robot for this Python tutorial?"
    answer: "No. This mini-project runs only in the terminal. A computer with Python 3 is enough."
---

Want a simple **Python game** you can play right away in the **terminal** (the text window where you run `python`)? This “higher or lower” mini-project revisits **`input`**, **`int`**, **`while`**, **`if` / `elif` / `else`**, **`random`**, and **`try` / `except`** ([error handling with try/except](/python-erreurs-debogage/)).

Save the script as `higher_lower.py`, then run:

```bash
python higher_lower.py
```

![Example terminal session: guesses 50 then 75, abc rejected, win in 3 attempts](/images/lot2/python-plus-ou-moins-terminal.webp)

*Example terminal session: the program asks for a number, answers too low or too high, rejects `abc`, then announces the win in 3 attempts.*

**Course path.** This is **lesson 10** of the Python series. Refresh [types and input](/en/python-types-and-input/) or [pathlib](/en/python-pathlib/) if needed. Full outline: [Python course](/programmation/python/).

Some book links below are affiliate links. Check today’s price on the store page.

## 1. Game rules

- The computer picks a **secret number** between **1** and **100** (inclusive).
- You propose **integers**; after each try the program answers **too low**, **too high**, or confirms the win.
- At the end it shows **how many attempts** were needed.

## 2. Design steps (before coding everything at once)

1. Draw the secret with **`random.randint(1, 100)`**.
2. Initialise **`attempts = 0`**.
3. Loop: read a guess, **increment** the counter, compare, **`break`** when won.
4. If the input is not an integer, **do not crash**: `except ValueError`, clear message, `continue`.

## 3. Reference solution

```python
import random

secret = random.randint(1, 100)
attempts = 0

while True:
    try:
        guess = int(input("Your number (1-100)? "))
    except ValueError:
        print("Enter an integer.")
        continue

    attempts += 1
    if guess < secret:
        print("Too low.")
    elif guess > secret:
        print("Too high.")
    else:
        print(f"Won in {attempts} attempt(s)!")
        break
```

### Example console session

```text
Your number (1-100)? 50
Too low.
Your number (1-100)? 75
Too high.
Your number (1-100)? abc
Enter an integer.
Your number (1-100)? 62
Won in 3 attempt(s)!
```

## 4. Quick manual tests

- Win in **one** try: counter must show **1**.
- Type **`abc`**: message, loop **without** crashing.
- Chain **too low** then **too high**: keep guiding until the right number.

## Exercises to go further

1. **Attempt limit** (e.g. **7**): when exhausted, show the **secret** and “lost”.
2. **Two levels**: range **1–50** or **1–200**.
3. Save the **best score** in **`record.txt`** — see [reading and writing text files](/python-fichiers-texte/).
4. Show a **hint** every 5 attempts.
5. **Play again** with a yes/no prompt at the end.

## Next steps

More text games on this site: [Hangman](/programmation/pendu/), [Battleship](/programmation/bataille-navale/), [Connect Four](/programmation/puissance-4/). Back to the [Python course](/programmation/python/).

Practice books (affiliate links — UK first, then US):

- [Python game projects — Amazon UK](https://www.amazon.co.uk/s?k=python+projects+games+book&tag=roboteducatif-21) · [Amazon.com](https://www.amazon.com/s?k=python+projects+games+book&tag=roboteducatif-20)
- [Learn Python 3 with exercises — Amazon UK](https://www.amazon.co.uk/s?k=python+3+learn+exercises+book&tag=roboteducatif-21) · [Amazon.com](https://www.amazon.com/s?k=python+3+learn+exercises+book&tag=roboteducatif-20)

*Author: Emmanuel Sauvage · updated 31 October 2026.*
