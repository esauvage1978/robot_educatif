---
title: "Python avancé — gestionnaires de contexte et contextlib"
description: "with, __enter__, __exit__, contextmanager, suppress, ExitStack ; ressources ; 20 exercices avec solutions repliables."
pubDate: 2026-03-29
updatedDate: 2026-03-29
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Python avancé
seriesOrder: 3
tags: ["Python", "Programmation", "Avancé"]
relatedLinks:
  - title: "Leçon 2 — décorateurs"
    href: "/python-av-decorateurs-functools/"
  - title: "Leçon 4 — asyncio"
    href: "/python-av-asyncio/"
categories:
  - "Python"
  - "Programmation"
  - "Tutoriel"
  - "Avancé"
---

L’instruction **`with`** garantit qu’une **ressource** (fichier, verrou, connexion) est **libérée** proprement, même si un **bloc** lève une exception : c’est le **protocole des gestionnaires de contexte**. Tu peux l’implémenter en **classe** (`__enter__` / `__exit__`) ou de façon **fonctionnelle** avec **`contextlib.contextmanager`** et **`yield`**.

## 1. `with` et fichiers

```python
with open("f.txt", encoding="utf-8") as f:
    data = f.read()
# fichier fermé ici
```

**`__exit__`** reçoit le type d’exception, sa valeur et la traceback ; retourner **`True`** « avale » l’exception (usage rare et à documenter).

## 2. Classe minimale

```python
class CM:
    def __enter__(self):
        print("enter")
        return self
    def __exit__(self, exc_type, exc, tb):
        print("exit")
```

## 3. `contextlib.contextmanager`

```python
from contextlib import contextmanager

@contextmanager
def tag(name):
    print("<", name, ">")
    yield
    print("</", name, ">")
```

Le code **avant** `yield` = entrée ; **après** = sortie (comme `finally`).

## 4. `suppress`, `redirect_stdout`, `ExitStack`

- **`suppress(OSError)`** : ignore les exceptions listées dans le bloc.
- **`ExitStack`** : ouvre dynamiquement **plusieurs** context managers et les ferme dans l’ordre inverse — utile pour un nombre variable de contextes.

## Ressources externes

- **[contextlib](https://docs.python.org/fr/3/library/contextlib.html)** (FR)
- **[PEP 343 — The “with” Statement](https://peps.python.org/pep-0343/)**

## Exercices (20)

### Niveau simple

**Exercice 1** — Utilise **`with open(...)`** pour lire **`README`** si présent (ignore erreur avec **`try/except`** ou **`Path.exists`**). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
p = Path("README")
if p.exists():
    with p.open(encoding="utf-8") as f:
        print(f.read())</code></pre>
</div>
</details>

**Exercice 2** — Classe **`Timer`** affichant **`enter`** / **`exit`** avec **`print`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class Timer:
    def __enter__(self):
        print("enter")
        return self
    def __exit__(self, *a):
        print("exit")

with Timer():
    pass</code></pre>
</div>
</details>

**Exercice 3** — **`@contextmanager`** : fonction **`chdir(path)`** qui change le répertoire courant puis **restaure** l’ancien (utilise **`os.chdir`** et **`try/finally`** dans le générateur). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import os
from contextlib import contextmanager

@contextmanager
def chdir(path):
    old = os.getcwd()
    os.chdir(path)
    try:
        yield
    finally:
        os.chdir(old)</code></pre>
</div>
</details>

**Exercice 4** — Utilise **`contextlib.suppress(FileNotFoundError)`** pour tenter **`open("absent.txt")`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from contextlib import suppress
with suppress(FileNotFoundError):
    open("absent.txt")</code></pre>
</div>
</details>

**Exercice 5** — Que retourne **`__enter__`** en général et à quoi sert-il ? <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Valeur liée à `as x` ; souvent self ou une ressource ouverte.</code></pre>
</div>
</details>

**Exercice 6** — Différence entre **`finally:`** et **`__exit__`** dans un context manager ? <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># __exit__ peut décider de supprimer l'exception ; finally est toujours exécuté après le bloc.</code></pre>
</div>
</details>

**Exercice 7** — **`closing(thing)`** de **`contextlib`** : à quoi sert-il pour objets avec **`.close()`** ? <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Appelle thing.close() à la sortie du with même si pas un gestionnaire natif.</code></pre>
</div>
</details>

### Niveau intermédiaire

**Exercice 8** — Implémente un CM qui **compte** combien de fois on est entré (niveau réentrance simple avec compteur). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class Depth:
    def __init__(self):
        self.n = 0
    def __enter__(self):
        self.n += 1
        return self
    def __exit__(self, *a):
        self.n -= 1</code></pre>
</div>
</details>

**Exercice 9** — **`contextmanager`** qui **temporairement** ajoute une clé dans un **`dict`** puis la retire. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from contextlib import contextmanager

@contextmanager
def push(d, k, v):
    old = d.get(k, None)
    d[k] = v
    try:
        yield
    finally:
        if old is None:
            del d[k]
        else:
            d[k] = old</code></pre>
</div>
</details>

**Exercice 10** — Utilise **`ExitStack`** pour ouvrir **deux** fichiers temporaires (ou **`StringIO`**) dans un seul **`with`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from contextlib import ExitStack
from io import StringIO

with ExitStack() as stack:
    a = stack.enter_context(StringIO("hi"))
    b = stack.enter_context(StringIO("yo"))</code></pre>
</div>
</details>

**Exercice 11** — Si **`__exit__`** retourne **`False`**, que se passe-t-il pour l’exception ? <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Elle se propage après __exit__.</code></pre>
</div>
</details>

**Exercice 12** — **`contextlib.redirect_stdout`** : redirige **`print`** vers **`StringIO`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from contextlib import redirect_stdout
from io import StringIO
buf = StringIO()
with redirect_stdout(buf):
    print("x")
print(buf.getvalue())</code></pre>
</div>
</details>

**Exercice 13** — Pourquoi **`yield`** dans **`contextmanager`** doit être **un seul** (en général) ? <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Generator doit s'arrêter au premier yield ; sinon RuntimeError.</code></pre>
</div>
</details>

**Exercice 14** — Écris un CM **`atomic_write(path)`** : écrit dans un **fichier temporaire** puis **`replace`** atomique (schéma). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import tempfile
from pathlib import Path

@contextmanager
def atomic_write(path: Path):
    fd, tmp = tempfile.mkstemp(dir=path.parent)
    try:
        with open(fd, "w", encoding="utf-8", closefd=True) as f:
            yield f
        Path(tmp).replace(path)
    except Exception:
        Path(tmp).unlink(missing_ok=True)
        raise</code></pre>
</div>
</details>

### Niveau difficile

**Exercice 15** — Gestionnaire **async** : nomme le protocole (`__aenter__`) — hors cours détaillé, mais à rechercher pour **asyncio**. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># __aenter__ / __aexit__ ; async with pour ressources asyncio.</code></pre>
</div>
</details>

**Exercice 16** — Combine **`nested`** (déprécié) vs **`ExitStack`** : pourquoi **`ExitStack`** préféré ? <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Nombre variable de contextes, ordre de fermeture garanti.</code></pre>
</div>
</details>

**Exercice 17** — **`contextlib.aclosing`** (3.10+) pour **async generators** — une phrase d’usage. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Garantit aclose() sur async gen comme closing() pour .close().</code></pre>
</div>
</details>

**Exercice 18** — Teste un **`@contextmanager`** qui **lève** après **`yield`** : l’exception est-elle propagée au **`finally`** implicite ? <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Oui, le code après yield s'exécute en sortie ; exceptions gérées par GeneratorExit.</code></pre>
</div>
</details>

**Exercice 19** — Implémente **`nullcontext`** à la main (objet avec **`__enter__` → retour arg**, **`__exit__` → None**). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class NC:
    def __init__(self, v=None):
        self.v = v
    def __enter__(self):
        return self.v
    def __exit__(self, *a):
        pass</code></pre>
</div>
</details>

**Exercice 20** — Pourquoi **`with lock:`** avec un **`threading.Lock`** fonctionne (quel protocole) ? <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Lock implémente __enter__ (acquire) et __exit__ (release).</code></pre>
</div>
</details>

## Suite du parcours

[asyncio : concurrence structurée](/python-av-asyncio/) : `async` / `await` et boucle d’événements.

## Amazon (partenaire)

- [Python concurrent programming](https://www.amazon.fr/s?k=python+concurrent+programming+livre&tag=manuso06-21)
