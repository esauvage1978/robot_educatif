---
layout: ../../layouts/EnPost.astro
title: "Python todo notebook (4/6): the command-line menu"
description: "A while-loop menu for the todo notebook: list, add, toggle and delete by id, and turn a typed id into an int without crashing when the input is letters."
updated: "29 March 2026"
faqSchema:
  - question: "What happens if you type letters where an id is expected?"
    answer: "int() raises ValueError. The menu prints that the id is invalid and continues the loop, so the notebook is left unchanged."
  - question: "Does this chapter save the file?"
    answer: "Not yet. Saving comes in the next chapter, either after each change or only when you quit."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

The [model](/en/python-todo-notebook-3-data-model/) is ready. You need a clear text **interface** that calls the right functions and **shows** what they return. Turning typed text into a number is the same idea as in [types and input](/en/python-types-and-input/).

## 1. Show the list

```python
def afficher_liste(data):
    if not data["taches"]:
        print("(No tasks.)")
        return
    for t in data["taches"]:
        case = "[x]" if t["fait"] else "[ ]"
        print(f"{t['id']:3} {case} {t['titre']}")
```

## 2. Main menu

```python
def menu():
    print("\n--- Todo ---\n1. List\n2. Add\n3. Check / uncheck\n4. Delete\n5. Quit")

def boucle(data, chemin):
    while True:
        menu()
        choix = input("Choice? ").strip()
        if choix == "1":
            afficher_liste(data)
        elif choix == "2":
            titre = input("Title? ")
            if ajouter_tache(data, titre):
                print("Added.")
            else:
                print("Empty title.")
        elif choix == "3":
            try:
                tid = int(input("Id? "))
            except ValueError:
                print("Invalid id.")
                continue
            if basculer_fait(data, tid):
                print("Updated.")
            else:
                print("Id not found.")
        elif choix == "4":
            try:
                tid = int(input("Id to delete? "))
            except ValueError:
                print("Invalid id.")
                continue
            if supprimer_tache(data, tid):
                print("Deleted.")
            else:
                print("Id not found.")
        elif choix == "5":
            return
        else:
            print("Unknown option.")
```

**Saving** comes in [part 5](/en/python-todo-notebook-5-persistence/): after every change, or only when you quit.

## Exercises

1. Add an option **6**: show only the tasks that are **not done**.
2. Shortcuts: accept `l` to list and `q` to quit.
3. After each successful action, print the **path** of the JSON file you are using.

## Next

[Part 5 — When to save: after each action, or on the way out](/en/python-todo-notebook-5-persistence/).

## On Amazon

A book search for Python exercises: [Check today's price on Amazon](https://www.amazon.com/s?k=python+exercises+book&tag=roboteducatif-20).
