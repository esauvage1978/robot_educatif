---
layout: ../../layouts/EnPost.astro
title: "Python: a development environment (Windows, Mac, Linux)"
description: "Install free Python 3 on Windows, Mac and Linux, then pick an editor you can live with: VS Code, Thonny, or Pydroid 3 when you practice on a phone."
updated: "28 March 2026"
faqSchema:
  - question: "How do I check that Python is installed?"
    answer: "Open a terminal and run py --version or python --version. On a Mac the command is often python3 --version. You should see a Python 3 version number."
  - question: "Can I practice Python on an Android phone?"
    answer: "Yes, for short scripts. Pydroid 3 gives you an editor and a Python 3 interpreter. Termux plus the python package is another option if you are comfortable on the command line. A PC is easier for longer lessons."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

Choosing your **environment** at the start saves frustration: a current interpreter, an editor you can read, and, on a phone, an app that really runs Python 3.

The overview of the track is the [Python course](/programmation/python/). The next lesson is [variables and printing](/python-variables-affichage/).

## 1. What you need

- **Python 3** (the language, plus the `python` or `py` command in the terminal).
- A **text editor** or **IDE** so you can write `.py` files with syntax highlighting and a simple way to run them.
- (Optional) A **terminal** or a built-in **console** so you can run `python my_script.py`.

## 2. Windows — a free install you can actually use

1. Download the official installer from **[python.org/downloads/windows](https://www.python.org/downloads/windows/)** (free).
2. Run the installer and **check "Add python.exe to PATH"** before you install. You need that box if you want `python` in Command Prompt or PowerShell.
3. Check it in a terminal:

```text
py --version
```

or

```text
python --version
```

### Recommended editor: Visual Studio Code (free)

**[Visual Studio Code](https://code.visualstudio.com/)** is free, easy to get into, and widely used in teaching. After you install it:

- Install the **Python** extension (Microsoft) from the extensions bar.
- Open a folder, create a file `hello.py`, type `print("OK")` and run it with the ▶ button or the built-in terminal.

### A very teaching-friendly alternative: Thonny

**[Thonny](https://thonny.org/)** is built for teaching: a simple interface, no heavy setup, and a debugger built in. It fits if you want an **all-in-one** tool and fewer windows.

## 3. macOS

- Install Python 3 from **[python.org/downloads/macos](https://www.python.org/downloads/macos/)** or with **Homebrew** (`brew install python`) if you are comfortable in the terminal.
- **VS Code** and **Thonny** exist on Mac as well (the same links as above).
- Check the version: `python3 --version` (on a Mac the command is often `python3`).

## 4. Android — coding on a tablet or a phone

A PC is still the most comfortable place for a large project, and you can still **practice** on Android:

- **[Pydroid 3](https://play.google.com/store/apps/details?id=ru.iiec.pydroid3)** — an editor plus a Python 3 interpreter, pip for common libraries, and an interface that works with touch (free with ads; a paid version without ads). It is one of the more **stable** options for Python 3 on a phone.
- **Termux** (plus the `python` package) suits people who are comfortable on the command line. It is more technical.

> On Android, stick to **small scripts** and short exercises. For the rest of this series, a PC makes copy-paste and files easier.

## 5. One first test on every platform

Create a file `hello.py`:

```python
print("Educational robot — Python OK")
```

Run it from your editor or from the command line:

```text
python hello.py
```

or `python3 hello.py` on a Mac.

![Example output in a Python terminal](/images/blog/lot15/pendu-console-exemple.png)

## Hands-on exercises

1. Print your Python version in the terminal (`--version`).
2. Create `exo1.py` that prints three lines: your first name, your age (a number), and a sentence of your choice.
3. In VS Code or Thonny, set a light or dark theme so the text is comfortable to read.

## On Amazon

These links are **searches** on Amazon. The button opens Amazon so you can check today's price.

- Books on learning Python 3: [Check today's price on Amazon](https://www.amazon.com/s?k=learn+python+3+book&tag=roboteducatif-20)
- Python for beginners and kids: [Check today's price on Amazon](https://www.amazon.com/s?k=python+beginner+kids+book&tag=roboteducatif-20)
- Programming and algorithms for a general audience: [Check today's price on Amazon](https://www.amazon.com/s?k=programming+algorithms+beginner+book&tag=roboteducatif-20)

## What comes next

Go on to lesson 2: **variables and printing** — [Python variables and printing](/python-variables-affichage/).
