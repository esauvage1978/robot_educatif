---
title: "Python intermédiaire — modules, packages et imports"
description: "Organiser le code en modules et packages : import, from, __main__, PEP 8 (guide de style officiel), ressources externes ; 20 exercices avec solutions repliables."
pubDate: 2026-03-29
updatedDate: 2026-03-29
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Python intermédiaire
seriesOrder: 1
tags: ["Python", "Programmation", "Bonnes pratiques"]
relatedLinks:
  - title: "Vue d’ensemble — Python intermédiaire"
    href: "/programmation/python-intermediaire/"
  - title: "Leçon 2 — venv et pip"
    href: "/python-inter-venv-pip/"
categories:
  - "Python"
  - "Programmation"
  - "Tutoriel"
  - "Intermédiaire"
---
Quand un script dépasse quelques dizaines de lignes, tout garder dans un seul fichier devient difficile à lire et à faire évoluer. Le **découper en modules** (fichiers `.py` qui regroupent des fonctions, constantes ou classes liées) sert deux objectifs : **clarifier les responsabilités** (chaque fichier a un rôle identifiable) et **réutiliser** le même code depuis plusieurs endroits sans copier-coller. En Python, le mécanisme central pour charger du code depuis un autre fichier est l’instruction **`import`** ; il s’appuie sur un **système d’import** (chemins, packages, cache) que tu peux approfondir via les ressources en fin de page.

Cette leçon pose les bases : comment importer la **bibliothèque standard** ou ton **propre code**, comment un fichier peut servir à la fois de **module** et de **script** grâce à **`__main__`**, et comment structurer un **package** (dossier de modules). Tu verras aussi comment la **PEP 8** t’aide à écrire un code **lisible et cohérent** avec le reste de l’écosystème Python.

## 1. Importer un module standard

La bibliothèque standard fournit des modules prêts à l’emploi (`math`, `os`, `json`, etc.). L’import le plus explicite est **`import nom_du_module`** : tu accèdes ensuite aux fonctions avec le **préfixe du module**, ce qui évite les ambiguïtés (par exemple savoir que `sqrt` vient bien de `math`).

```python
import math
print(math.sqrt(16))
```

**Bonnes pratiques** : regrouper les imports **en tête de fichier** (après l’éventuel docstring du module), **un import par ligne** pour faciliter la relecture et les diffs Git, sauf pour des imports courts du type `from pathlib import Path`. Évite de disperser des `import` au milieu du code : cela complique la lecture et peut masquer des dépendances.

## 2. `from` … `import` …

La forme **`from module import nom`** importe un **symbole précis** dans l’espace de noms courant. Tu peux alors utiliser `Path` directement sans préfixe, ce qui allège le code quand le symbole est très utilisé.

```python
from pathlib import Path
p = Path("notes.txt")
```

En revanche, **`from module import *`** est **déconseillé** : tu ne sais pas exactement quels noms entrent en jeu, tu risques d’**écraser** des variables existantes, et les outils d’analyse statique (linters) ont plus de mal à t’aider. Préfère toujours des imports **nommés et explicites**.

## 3. Ton propre module

Un fichier **`utils.py`** placé **dans le même répertoire** qu’un script **`main.py`** est un **module** comme les autres : Python le trouve parce qu’il figure dans le **chemin de recherche** (répertoire courant du script, puis `PYTHONPATH`, etc.). Tu peux alors importer ses définitions avec **`import utils`** et le préfixe `utils.` pour appeler tes fonctions.

```python
# utils.py
def doubler(x):
    return x * 2
```

```python
# main.py
import utils
print(utils.doubler(4))
```

C’est le modèle le plus simple pour partager du code entre plusieurs scripts d’un petit projet avant d’introduire un vrai **package** en sous-dossier.

## 4. `if __name__ == "__main__":`

Chaque fichier Python possède une variable **`__name__`**. Quand tu **exécutes** le fichier avec `python monfichier.py`, l’interpréteur définit **`__name__` à `"__main__"`**. Quand tu **importes** le même fichier depuis un autre module, **`__name__`** vaut le **nom du module** (par ex. `"utils"`). Le motif suivant permet donc de n’exécuter certaines lignes **que en mode script** (tests rapides, démo, CLI), tout en important le reste des définitions **sans effet de bord** quand le fichier est importé ailleurs.

```python
def saluer():
    print("Salut")

if __name__ == "__main__":
    saluer()
```

C’est une habitude **très répandue** : elle rend les modules **réutilisables** et **testables** sans lancer systématiquement tout le programme.

## 5. Packages (dossiers)

Un **package** est un dossier qui regroupe plusieurs modules. Traditionnellement, on y place un fichier **`__init__.py`** (souvent vide ou minimal) pour marquer le dossier comme package ; les versions récentes de Python autorisent aussi certains cas sans ce fichier (packages « namespace »), mais pour apprendre, le schéma **`monpaquet/__init__.py`** + **`monpaquet/sousmodule.py`** reste clair. Les imports prennent la forme **`import monpaquet.sousmodule`** ou **`from monpaquet import quelque_chose`**. Pour un premier projet, un seul dossier-package suffit souvent longtemps avant de complexifier l’arborescence.

## Qu’est-ce que la PEP 8 ?

**PEP** signifie **Python Enhancement Proposal** : ce sont des documents qui décrivent des évolutions du langage, de la bibliothèque ou des **conventions** de la communauté. La **[PEP 8](https://peps.python.org/pep-0008/)** n’est pas une règle du compilateur : Python n’impose pas un style précis pour exécuter ton code. C’est un **guide de style** — une convention largement suivie — qui explique comment **nommer** les variables et fonctions, comment **aérer** le code (espaces, lignes vides), comment **ordonner** les imports, quelle **longueur de ligne** viser pour la lisibilité, etc.

**Pourquoi s’y intéresser ?** Un style cohérent rend les projets **plus faciles à relire** pour toi et pour les autres, et s’aligne sur ce que tu verras dans la documentation officielle, les tutoriels et la plupart des bibliothèques open source. Les outils comme **Flake8**, **Ruff** ou le formateur **Black** s’appuient souvent sur ces règles (parfois avec des variantes). En pratique, pour cette leçon, retiens surtout :

- **Noms** : `snake_case` pour fonctions et variables ; **`CamelCase`** pour les classes (voir la leçon POO du parcours).
- **Lignes** : viser environ **79 à 100 caractères** selon les équipes (la PEP 8 historique parle de 79 pour le code ; beaucoup de projets modernes montent à 88 ou 100).
- **Imports** : grouper d’abord la **bibliothèque standard**, puis une ligne vide, puis les **dépendances tierces**, puis une ligne vide, puis le **code de ton projet** ; ordre souvent **alphabétique** au sein de chaque groupe.

## Ressources externes

- **[PEP 8 — Style Guide for Python Code](https://peps.python.org/pep-0008/)** : le document de référence sur le style (noms, indentation, espaces, imports). La PEP 8 est rédigée en anglais ; les outils et tutoriels francophones s’y réfèrent souvent mot pour mot sur les règles importantes.
- **[Tutoriel Python — Modules](https://docs.python.org/fr/3/tutorial/modules.html)** (documentation officielle en français) : modules, chemins et introduction aux packages.
- **[Tutoriel Python — Modules (EN)](https://docs.python.org/3/tutorial/modules.html)** : même contenu en anglais si tu préfères le vocabulaire technique d’origine.
- **[The import system](https://docs.python.org/3/reference/import.html)** : référence du langage sur la façon dont Python charge les modules (niveau avancé).
- **[Flake8](https://flake8.pycqa.org/)** : outil qui combine plusieurs vérifications (style proche de la PEP 8, imports, complexité) — utile dès que tu veux industrialiser la qualité du code.

## Exercices (20)

Chaque exercice prolonge la leçon. Les **solutions** sont masquées par défaut.

### Niveau simple

**Exercice 1** — Importe **`math`** et affiche **`math.pi`** arrondi à **2** décimales avec **`round(math.pi, 2)`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import math
print(round(math.pi, 2))</code></pre>
</div>
</details>

**Exercice 2** — Utilise **`from random import randint`** et affiche un entier aléatoire entre **1** et **6**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from random import randint
print(randint(1, 6))</code></pre>
</div>
</details>

**Exercice 3** — Importe le module **`sys`** et affiche **`sys.version`** (chaîne décrivant la version de Python). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import sys
print(sys.version)</code></pre>
</div>
</details>

**Exercice 4** — Crée une fonction **`carre(n)`** dans un fichier **`geo.py`**, puis dans **`main.py`** fais **`import geo`** et affiche **`geo.carre(5)`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># geo.py
def carre(n):
    return n * n

# main.py
import geo
print(geo.carre(5))</code></pre>
</div>
</details>

**Exercice 5** — Écris un script avec **`if __name__ == "__main__":`** qui affiche **`lancé en direct`** uniquement quand le fichier est exécuté, pas quand il est importé. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def f():
    return 1

if __name__ == "__main__":
    print("lancé en direct")</code></pre>
</div>
</details>

**Exercice 6** — Importe **`datetime`** et affiche la date du jour avec **`datetime.date.today()`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import datetime
print(datetime.date.today())</code></pre>
</div>
</details>

**Exercice 7** — Utilise **`import math as m`** puis affiche **`m.factorial(5)`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import math as m
print(m.factorial(5))</code></pre>
</div>
</details>

### Niveau intermédiaire

**Exercice 8** — Explique pourquoi **`from monmod import *`** est déconseillé (deux raisons en une phrase chacune, dans un commentaire en tête de fichier). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># On ne sait pas quels noms sont importés ; risque d'écraser des variables locales.
# Outils comme flake8 signalent les imports non utilisés difficilement à tracer.
pass</code></pre>
</div>
</details>

**Exercice 9** — Dans **`app.py`**, importe **`salut`** depuis **`hello.py`** avec **`from hello import salut`**, puis appelle **`salut()`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># hello.py
def salut():
    print("Salut")

# app.py
from hello import salut
salut()</code></pre>
</div>
</details>

**Exercice 10** — Utilise **`import os`** et affiche le **répertoire courant** avec **`os.getcwd()`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import os
print(os.getcwd())</code></pre>
</div>
</details>

**Exercice 11** — Regroupe en commentaires trois **sections d’imports** : standard (`math`), puis vide, puis « local » (`import monoutil` supposé existant). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import math

# import requests  # exemple tiers

# import monoutil  # projet (fichier à côté)
</code></pre>
</div>
</details>

**Exercice 12** — Module **`stats.py`** avec **`moyenne(xs)`** ; dans **`cli.py`**, **`import stats`** et affiche la moyenne de **`[2, 4, 6]`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># stats.py
def moyenne(xs):
    return sum(xs) / len(xs)

# cli.py
import stats
print(stats.moyenne([2, 4, 6]))</code></pre>
</div>
</details>

**Exercice 13** — Réécris l’import **`import datetime`** pour n’utiliser que **`datetime.datetime.now()`** en important la **classe** **`datetime`** du module **`datetime`** (attention aux homonymes). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from datetime import datetime
print(datetime.now())</code></pre>
</div>
</details>

**Exercice 14** — Ajoute dans **`__main__`** un appel à une fonction **`main()`** définie au-dessus, pour respecter l’habitude « une fonction **`main`** par script ». <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def main():
    print("ok")

if __name__ == "__main__":
    main()</code></pre>
</div>
</details>

### Niveau difficile

**Exercice 15** — Package minimal : dossier **`pkg/`** avec **`__init__.py`** vide et **`pkg/aide.py`** contenant **`def hint(): return "aide"`**. Depuis la racine, **`from pkg.aide import hint`** puis **`print(hint())`**. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># pkg/__init__.py  (vide)
# pkg/aide.py
def hint():
    return "aide"

# script.py
from pkg.aide import hint
print(hint())</code></pre>
</div>
</details>

**Exercice 16** — Utilise **`importlib.import_module("math")`** pour obtenir le module **`math`** sous le nom **`m`** dynamiquement, puis **`m.sqrt(9)`**. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import importlib
m = importlib.import_module("math")
print(m.sqrt(9))</code></pre>
</div>
</details>

**Exercice 17** — Documente une fonction avec une **docstring** d’une ligne et vérifie qu’elle apparaît dans **`help(ma_fonction)`** ou **`ma_fonction.__doc__`**. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def double(x):
    """Retourne le double de x."""
    return x * 2

print(double.__doc__)</code></pre>
</div>
</details>

**Exercice 18** — Condition **`if __name__ == "__main__":`** qui appelle **`main()`** ; dans **`main()`**, parse **`sys.argv[1]`** en entier (index **1** si présent, sinon **0**) — rappel : **`import sys`**. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import sys

def main():
    if len(sys.argv) > 1:
        n = int(sys.argv[1])
    else:
        n = 0
    print(n)

if __name__ == "__main__":
    main()</code></pre>
</div>
</details>

**Exercice 19** — Liste les attributs publics usuels d’un module **`math`** avec **`dir(math)`** (affichage brut), puis commente pourquoi filtrer ceux commençant par **`_`** en production. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import math
print([x for x in dir(math) if not x.startswith("_")])</code></pre>
</div>
</details>

**Exercice 20** — Bonne pratique : crée **`constants.py`** avec **`TAILLE_MAX = 100`** et importe cette constante dans **`run.py`** avec **`from constants import TAILLE_MAX`**. Affiche-la. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># constants.py
TAILLE_MAX = 100

# run.py
from constants import TAILLE_MAX
print(TAILLE_MAX)</code></pre>
</div>
</details>

## Suite du parcours

[Environnements virtuels et pip](/python-inter-venv-pip/) : isoler les dépendances et figer les versions pour des projets reproductibles.

## Amazon (partenaire)

- [Python architecture logicielle](https://www.amazon.fr/s?k=python+architecture+logicielle+livre&tag=manuso06-21)
