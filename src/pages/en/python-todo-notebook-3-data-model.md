---
layout: ../../layouts/EnPost.astro
title: "Python todo notebook (3/6): the data model"
description: "Add a task, find it by id, toggle done and delete it, while prochain_id stays consistent. The notebook rules live in this chapter, before the menu."
updated: "29 March 2026"
faqSchema:
  - question: "What does ajouter_tache do with a blank title?"
    answer: "It strips spaces and returns False. It does not append a task, and it does not change prochain_id."
  - question: "Are deleted task ids reused?"
    answer: "No. Tasks you keep keep their ids, and prochain_id only goes up. That is simpler if another file still refers to an old id."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

You already [load and save](/en/python-todo-notebook-2-read-write-json/) the top-level dictionary. This chapter holds the **rules of the notebook**, before you polish the menu.

## 1. Add a task

```python
def ajouter_tache(data, titre):
    titre = titre.strip()
    if not titre:
        return False
    tid = data["prochain_id"]
    data["taches"].append({"id": tid, "titre": titre, "fait": False})
    data["prochain_id"] = tid + 1
    return True
```

## 2. Find a task by id

```python
def trouver_tache(data, tid):
    for t in data["taches"]:
        if t["id"] == tid:
            return t
    return None
```

Compare with **`==`** on the integer `id`. Do not name your own variable `id`, or you hide the built-in function `id()`.

## 3. Toggle "done"

```python
def basculer_fait(data, tid):
    t = trouver_tache(data, tid)
    if t is None:
        return False
    t["fait"] = not t["fait"]
    return True
```

## 4. Delete

```python
def supprimer_tache(data, tid):
    avant = len(data["taches"])
    data["taches"] = [t for t in data["taches"] if t["id"] != tid]
    return len(data["taches"]) < avant
```

The **ids** of the tasks you keep are **not** reused. That is the simpler choice. `prochain_id` keeps climbing.

## Exercises

1. Write `nombre_taches_actives(data)`: the tasks whose `fait` is false.
2. Reject titles longer than **200** characters.
3. Add a function `reordonner_ids` (advanced, and optional): renumber the tasks from 1 to n. Think about the risk if another file still points at the old ids.

## Next

[Part 4 — Command-line menu (a while loop)](/en/python-todo-notebook-4-cli-menu/).

## On Amazon

A book search for clean Python practice: [Check today's price on Amazon](https://www.amazon.com/s?k=clean+code+python+book&tag=roboteducatif-20).
