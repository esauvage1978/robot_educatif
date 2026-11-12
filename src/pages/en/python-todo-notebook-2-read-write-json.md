---
layout: ../../layouts/EnPost.astro
title: "Python todo notebook (2/6): read and write JSON"
description: "Load and save the todo notebook with json.load and json.dump, UTF-8, a readable indent, and an empty notebook when the file taches.json is missing."
updated: "29 March 2026"
faqSchema:
  - question: "What happens if taches.json does not exist?"
    answer: "charger returns a ready empty notebook: prochain_id set to 1 and an empty taches list."
  - question: "Why pass ensure_ascii=False and indent=2 to json.dump?"
    answer: "ensure_ascii=False keeps accented letters in the file instead of \\u escapes. indent=2 adds line breaks and indentation so a person can read the JSON."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

The **`json`** module converts between **JSON text** and **Python objects** (`dict`, `list`, `str`, `bool`, `int`, `float`, `None`).

## 1. Load

```python
import json
from pathlib import Path

def charger(chemin: Path):
    if not chemin.exists():
        return {"prochain_id": 1, "taches": []}
    with chemin.open("r", encoding="utf-8") as f:
        return json.load(f)
```

If the file **does not exist**, return an **empty** structure that is ready to use.

## 2. Save

```python
def sauvegarder(chemin: Path, data):
    with chemin.open("w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
```

- **`ensure_ascii=False`**: keeps accented letters in the file instead of `\u` escapes.
- **`indent=2`**: **readable** JSON, with line breaks and indentation.

## 3. Errors you may hit

- **Malformed JSON**: `json.JSONDecodeError`. You can print a message and start again from an empty notebook ([try/except](/python-erreurs-debogage/)).
- A **locked file** or a full disk: rare in an exercise, and still worth remembering.

## 4. pathlib (optional, and cleaner)

`Path("taches.json")` avoids mixing Windows and Unix slashes. `chemin.exists()` says clearly what you are testing. The [pathlib lesson](/en/python-pathlib/) goes further if you want the whole module.

## Exercises

1. Create `test.json` by hand, load it and print `type(data)`.
2. Save a dictionary that contains a **list of numbers**, then open it again.
3. Try an **empty** file: what does `json.load` do? Wrap the call in `try` / `except`.

## Next

[Part 3 — Data model: add a task and increment the id](/en/python-todo-notebook-3-data-model/).

## On Amazon

A book search for Python, files and data: [Check today's price on Amazon](https://www.amazon.com/s?k=python+data+files+book&tag=roboteducatif-20).
