---
layout: ../../layouts/EnPost.astro
title: "Python todo notebook (6/6): the complete project"
description: "Wire main(), default to taches.json or take a path argument, then extend the finished notebook with a priority, a due date and a one-row CSV export."
updated: "29 March 2026"
faqSchema:
  - question: "How do you choose which JSON file to open?"
    answer: "main uses the first command-line argument when you pass one. Otherwise it uses Path(\"taches.json\")."
  - question: "What can you add after the basic notebook works?"
    answer: "A priority from 1 to 3, an ISO due date such as 2026-04-01, and a CSV export with one row per task. Syncing to another device is left for later."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

## 1. Entry point

```python
import json
import sys
from pathlib import Path

def main():
    chemin = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("taches.json")
    data = charger_securise(chemin)
    try:
        boucle(data, chemin)
    finally:
        sauvegarder(chemin, data)
        print("Goodbye — data saved.")

if __name__ == "__main__":
    main()
```

Adjust this to match your save strategy. If you already save **on every** action, `finally` can only confirm the last version, or you can remove it.

Do not forget `import json` in the file that defines `charger_securise`.

## 2. A file layout you can use

- `todo.py` — everything in one file while you are starting
- or a `todo/` folder with `storage.py`, `model.py` and `cli.py`

## 3. Checklist

- [ ] UTF-8 everywhere.
- [ ] `ensure_ascii=False` when you dump.
- [ ] Unique ids, and a `prochain_id` that still matches them.
- [ ] Errors from `int(input)` are handled.
- [ ] A message when the file is created on the first run.

## 4. Extensions

- **Priority**: `1` to `3` on each task, and sort when you display the list.
- **Due date**: an ISO string such as `2026-04-01`. You do not need a date module at first.
- **CSV export**: one line per task, so a spreadsheet can open it.
- **Sync**: out of scope for a first project. JSON still makes a later API easier.

[Todo notebook contents](/programmation/carnet-todo/) — other series: [Hangman](/programmation/pendu/), [Connect Four](/en/connect-four-python/), [Battleship](/programmation/bataille-navale/).

## On Amazon

A book search for learning Python 3 through projects: [Check today's price on Amazon](https://www.amazon.com/s?k=python+3+learn+box+set&tag=roboteducatif-20).
