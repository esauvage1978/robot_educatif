---
layout: ../../layouts/EnPost.astro
title: "Python todo notebook (1/6): brief and JSON"
description: "Why JSON fits a console todo notebook, how taches.json stores an id, a title and a done flag, and the five menu actions the later chapters build."
updated: "29 March 2026"
faqSchema:
  - question: "Why store the todo notebook as JSON?"
    answer: "You can open the file in a text editor, edit it by hand, and reuse the same file later in a web or mobile app. Python reads it with the built-in json module."
  - question: "Why does each task have an id instead of a line number?"
    answer: "An id stays put when you delete or reorder tasks. A line number would shift and point at the wrong task. prochain_id hands out the next unused integer."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

A **todo notebook** in the console is a program that **adds**, **lists**, **checks off** and **deletes** tasks, and **saves** them to disk so nothing disappears when you close the terminal. **JSON** is readable by a person, widely used, and Python already supports it through the built-in **`json`** module.

The wider path is the [Python course](/programmation/python/).

## 1. Why JSON instead of a binary dump?

- You can **open** the file in a text editor and understand what is inside.
- You can **edit** it by hand when you need to.
- You can reuse it later in a **web app** or a **mobile app** that reads the same file.

## 2. A structure you can start from

File `taches.json`:

```json
{
  "prochain_id": 3,
  "taches": [
    {"id": 1, "titre": "Finish the hangman", "fait": false},
    {"id": 2, "titre": "Groceries", "fait": true}
  ]
}
```

- **`prochain_id`**: an integer used to give each new task a unique **`id`**.
- **`taches`**: a list of **objects** (Python dictionaries) with at least `id`, `titre` and `fait`.

You can add `date_creation` or `priorite` later, as an extension.

## 3. What the menu will do (preview)

1. List the tasks, with a visual checkbox `[ ]` / `[x]`.
2. Add a task (you type the title).
3. Mark a task done or not done (by **id**).
4. Delete a task (by **id**).
5. Quit (the program saves automatically before you leave).

## 4. What you need first

- [Text files](/python-fichiers-texte/) (opening a file, UTF-8).
- [Lists and dictionaries](/python-listes-et-chaines/) — here, mostly **nested dicts**.

## Exercises

1. Write a minimal JSON file by hand with **two** tasks and check it on [jsonlint.com](https://jsonlint.com) (an online checker).
2. Name three **other** serialization formats you know or have heard of (CSV, XML, and so on).
3. Think about this: why does each task have an **`id`** instead of only a line number?

## Next

[Part 2 — Load and save the file with the json module](/en/python-todo-notebook-2-read-write-json/).

## On Amazon

A book search for Python, data and JSON: [Check today's price on Amazon](https://www.amazon.com/s?k=python+data+json+book&tag=roboteducatif-20).
