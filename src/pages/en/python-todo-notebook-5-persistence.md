---
layout: ../../layouts/EnPost.astro
title: "Python todo notebook (5/6): persistence"
description: "Save the todo notebook after each change or only on exit, recover from a broken JSON file, and keep an optional backup copy before you overwrite it."
updated: "29 March 2026"
faqSchema:
  - question: "When should a small notebook be saved?"
    answer: "After each change. Extra disk writes are not a problem at this size, and you keep the data if the program stops unexpectedly."
  - question: "What if the JSON file cannot be read?"
    answer: "charger_securise catches JSONDecodeError, tells you, and starts from an empty notebook. Renaming the old file to taches.json.broken keeps the broken copy."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

Without a **save**, closing the terminal throws the work away. Two common strategies:

1. **On every change**: after an add, a toggle or a delete, call `sauvegarder(chemin, data)`. Simple, and you keep the data if the program crashes.
2. **Only on exit**: fewer writes to disk. You can lose the latest changes if the power cuts out.

For a small notebook, **saving often** is not a problem.

## 1. Wrap the changes

```python
def avec_sauvegarde(chemin, data, fonction, *args):
    ok = fonction(data, *args)
    if ok:
        sauvegarder(chemin, data)
    return ok
```

Or call `sauvegarder` yourself after each menu branch that changes `data`.

## 2. A corrupt file

```python
import json

def charger_securise(chemin):
    try:
        return charger(chemin)
    except json.JSONDecodeError:
        print("Unreadable JSON file — starting empty. Save the old file first if you need it.")
        return {"prochain_id": 1, "taches": []}
```

Renaming `taches.json` to `taches.json.broken` before you overwrite it can help the person using the program.

## 3. A backup copy (optional)

Before you write, copy `taches.json` to `taches.json.bak` with `shutil.copy2`. That helps if the program is interrupted during the write. With small files, that interruption is rare.

## Exercises

1. Print **"saved"** only when `sauvegarder` has succeeded.
2. Add a **read-only** mode: an environment variable, or the argument `python todo.py --dry-run` (show the notebook, do not save).
3. Measure the **size** of the JSON after 100 fake tasks (a test loop).

## Next

[Part 6 — Put the project together: main() and extensions](/en/python-todo-notebook-6-complete/).

## On Amazon

A book search for Python and JSON data: [Check today's price on Amazon](https://www.amazon.com/s?k=python+data+json+book&tag=roboteducatif-20).
