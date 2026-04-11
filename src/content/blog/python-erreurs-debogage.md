---
title: "Python — erreurs, exceptions et débogage"
headline: "Erreurs, exceptions et débogage"
description: "SyntaxError, TypeError, ValueError ; try / except / else / finally ; lire un traceback ; print de debug et pas à pas dans l’IDE ; 20 exercices avec solutions repliables."
pubDate: 2026-03-28
updatedDate: 2026-03-29
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Python
seriesOrder: 9
tags: ["Python", "Programmation"]
relatedLinks:
  - title: "Leçon 8 — fichiers texte"
    href: "/python-fichiers-texte/"
  - title: "Leçon 10 — mini-jeu au terminal"
    href: "/python-mini-jeu-terminal/"
categories:
  - "Python"
  - "Programmation"
  - "Débogage"
  - "Intermédiaire"
---
Un **bug** est un comportement non voulu ; une **exception** est le mécanisme par lequel Python **arrête** une ligne qui échoue et affiche un **traceback**. Savoir **lire** ce message et **entourer** les zones fragiles avec `try` / `except` rend les programmes plus **robustes** — comme pour les [fichiers](/python-fichiers-texte/) manquants ou les **`int(input())`** qui reçoivent du texte invalide.

## 1. Erreurs fréquentes au début

| Type                 | Cause typique                                      |
|----------------------|----------------------------------------------------|
| **SyntaxError**      | `:` ou parenthèse oublié, guillemet mal fermé      |
| **IndentationError** | blocs `if` / `for` mal alignés (mélange onglets / espaces) |
| **TypeError**        | `"3" + 5`, appel de fonction avec mauvais types    |
| **ValueError**       | `int("abc")`, `int("3.5")` si tu voulais un entier |
| **NameError**        | variable utilisée avant affectation, faute de frappe |
| **ZeroDivisionError**| division par zéro                                  |

## 2. `try` / `except` ciblé

```python
try:
    x = int(input("Nombre entier ? "))
except ValueError:
    print("Ce n'est pas un entier valide.")
```

- Attrape **le type d’erreur** que tu sais **traiter** (ici une mauvaise conversion).
- Évite **`except:`** tout seul : tu masquerais n’importe quelle erreur et tu compliquerais le débogage.

Tu peux enchaîner plusieurs blocs **`except ValueError:`**, **`except ZeroDivisionError:`**, etc., pour des messages différents.

## 3. `else` et `finally` (optionnel)

- **`else`** (après `except`) : exécuté si **aucune** exception n’a été levée dans le `try`.
- **`finally`** : exécuté **toujours** (souvent pour libérer une ressource ; avec `with` sur les fichiers, c’est déjà géré).

```python
try:
    n = int(input("Nombre ? "))
except ValueError:
    print("Invalide.")
else:
    print(f"Le double est {2 * n}.")
```

## 4. Lire le traceback

Quand Python plante, le message s’affiche **du bas vers le haut** :

- La **dernière ligne** indique le **type** d’erreur et un court texte.
- Juste au-dessus, la **flèche** `^` pointe souvent la **portion** de ligne problématique.
- Remonte pour voir **quel fichier** et **quelle fonction** enchaînent les appels.

## 5. Déboguer sans honte

- **`print()`** temporaires : afficher les variables suspectes et les retirer une fois corrigé.
- **IDE** (VS Code, Thonny…) : **points d’arrêt**, exécution **pas à pas**, inspection des variables.
- Reproduire le bug avec **le plus petit** script possible.

## Exercices (20)

Les **solutions** sont masquées par défaut : clique sur **Afficher la solution** pour comparer ton code.

### Niveau simple

**Exercice 1** — Entoure **`int(input("Nombre ? "))`** avec **`try`** / **`except ValueError`** et affiche **`Ce n'est pas un entier.`** si la conversion échoue. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">try:
    x = int(input("Nombre ? "))
except ValueError:
    print("Ce n'est pas un entier.")</code></pre>
</div>
</details>

**Exercice 2** — Dans un **`try`**, calcule **`1 / 0`** ; dans **`except ZeroDivisionError`**, affiche **`Division par zéro interdite.`** <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">try:
    x = 1 / 0
except ZeroDivisionError:
    print("Division par zéro interdite.")</code></pre>
</div>
</details>

**Exercice 3** — Ouvre **`inexistant.txt`** en lecture dans un **`try`** et attrape **`FileNotFoundError`** pour afficher **`Fichier introuvable.`** <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">try:
    with open("inexistant.txt", "r", encoding="utf-8") as f:
        f.read()
except FileNotFoundError:
    print("Fichier introuvable.")</code></pre>
</div>
</details>

**Exercice 4** — Utilise **`try` / `except ValueError` / `else`** : si la conversion **`int(input())`** réussit, le bloc **`else`** affiche **`OK :`** suivi de la valeur. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">try:
    n = int(input("Entier ? "))
except ValueError:
    print("Invalide.")
else:
    print("OK :", n)</code></pre>
</div>
</details>

**Exercice 5** — **`try`** avec **`finally`** : dans **`finally`**, affiche toujours **`Fin.`** (même après une **`ValueError`** sur **`int("abc")`**). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">try:
    int("abc")
except ValueError:
    print("Erreur de conversion.")
finally:
    print("Fin.")</code></pre>
</div>
</details>

**Exercice 6** — Boucle **`while True`** : demande un entier avec **`int(input())`** ; en cas de **`ValueError`**, affiche **`Réessaie.`** et continue ; en cas de succès, **`break`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">while True:
    try:
        n = int(input("Entier ? "))
        break
    except ValueError:
        print("Réessaie.")</code></pre>
</div>
</details>

**Exercice 7** — Attrape **`ValueError`** et **`ZeroDivisionError`** dans **deux** blocs **`except`** séparés après un **`try`** qui lit **`a`** et **`b`** avec **`int`**, puis affiche **`a / b`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">try:
    a = int(input("a ? "))
    b = int(input("b ? "))
    print(a / b)
except ValueError:
    print("Nombre invalide.")
except ZeroDivisionError:
    print("b ne doit pas être 0.")</code></pre>
</div>
</details>

### Niveau intermédiaire

**Exercice 8** — Fonction **`demander_entier()`** : redemande tant que **`int(input())`** lève **`ValueError`**, puis retourne l’entier valide. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def demander_entier():
    while True:
        try:
            return int(input("Entier ? "))
        except ValueError:
            print("Invalide, réessaie.")</code></pre>
</div>
</details>

**Exercice 9** — Fonction **`demander_entier_positif()`** : retourne un entier **au moins égal à 1** ; gère **`ValueError`** et le cas **0** ou **négatif** avec un message et une nouvelle demande. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def demander_entier_positif():
    while True:
        try:
            n = int(input("Entier au moins 1 ? "))
        except ValueError:
            print("Ce n'est pas un entier.")
            continue
        if n < 1:
            print("Il faut un entier au moins égal à 1.")
            continue
        return n</code></pre>
</div>
</details>

**Exercice 10** — **`try`** : convertis **`float(input())`** ; **`except ValueError`** : affiche **`Nombre décimal invalide.`** <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">try:
    x = float(input("Décimal ? "))
except ValueError:
    print("Nombre décimal invalide.")</code></pre>
</div>
</details>

**Exercice 11** — Liste **`xs = [10, 20]`** : dans un **`try`**, affiche **`xs[5]`** ; attrape **`IndexError`** et affiche **`Index hors limites.`** <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">xs = [10, 20]
try:
    print(xs[5])
except IndexError:
    print("Index hors limites.")</code></pre>
</div>
</details>

**Exercice 12** — Fonction **`diviser(a, b)`** qui retourne **`a / b`** ; si **`b == 0`**, lève **`ZeroDivisionError`** sera attrapée par l’appelant — écris un **`try`** / **`except`** à l’appel qui affiche **`Impossible.`** <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def diviser(a, b):
    return a / b

try:
    print(diviser(3, 0))
except ZeroDivisionError:
    print("Impossible.")</code></pre>
</div>
</details>

**Exercice 13** — Combine **`try`** sur **`int(input())`** et un **`if`** : si l’entier est **négatif**, affiche **`Pas de négatif`** sans planter (sans lever d’exception pour ça). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">try:
    n = int(input("Entier ? "))
except ValueError:
    print("Pas un entier.")
else:
    if n < 0:
        print("Pas de négatif")
    else:
        print("OK :", n)</code></pre>
</div>
</details>

**Exercice 14** — Simule un **debug** : **`x = 3`** puis **`print("debug x =", x)`**, puis **`if x > 0:`** et **`print("debug après if", x)`** (deux traces comme à la leçon). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">x = 3
print("debug x =", x)
if x > 0:
    print("debug après if", x)</code></pre>
</div>
</details>

### Niveau difficile

**Exercice 15** — Fonction **`lire_entier_ou_none()`** : retourne **`int(input())`** ou **`None`** si **`ValueError`** (pas de boucle infinie). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def lire_entier_ou_none():
    try:
        return int(input("Entier ? "))
    except ValueError:
        return None</code></pre>
</div>
</details>

**Exercice 16** — **`try`** / **`except`** / **`else`** / **`finally`** : dans **`try`**, **`int(input())`** ; **`except ValueError`** : message ; **`else`** : **`Bravo`** ; **`finally`** : **`Terminé.`** <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">try:
    n = int(input("Entier ? "))
except ValueError:
    print("Invalide.")
else:
    print("Bravo")
finally:
    print("Terminé.")</code></pre>
</div>
</details>

**Exercice 17** — Lit un fichier dans **`try`** / **`except FileNotFoundError`** ; en cas de succès, affiche **`Lu.`**, sinon **`Pas de fichier.`** <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">try:
    with open("data.txt", "r", encoding="utf-8") as f:
        f.read()
except FileNotFoundError:
    print("Pas de fichier.")
else:
    print("Lu.")</code></pre>
</div>
</details>

**Exercice 18** — Boucle **trois essais max** pour lire un entier : à chaque **`ValueError`**, incrémente un compteur ; après **3** échecs, affiche **`Abandon`** et **`break`**. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">essais = 0
while essais < 3:
    try:
        n = int(input("Entier ? "))
        print("OK", n)
        break
    except ValueError:
        essais += 1
        print("Encore une fois.")
else:
    print("Abandon")</code></pre>
</div>
</details>

**Exercice 19** — Enchaîne **`try`** : **`int(input())`** puis **`10 / n`** ; attrape **`ValueError`**, **`ZeroDivisionError`** et affiche un message **différent** pour chaque. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">try:
    n = int(input("Entier ? "))
    print(10 / n)
except ValueError:
    print("Ce n'est pas un entier.")
except ZeroDivisionError:
    print("Division par zéro.")</code></pre>
</div>
</details>

**Exercice 20** — Écris **`saisir_note_sur_20()`** qui retourne un **entier entre 0 et 20** : boucle jusqu’à succès ; gère **`ValueError`** et les valeurs **hors plage** avec des messages distincts. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def saisir_note_sur_20():
    while True:
        try:
            n = int(input("Note /20 ? "))
        except ValueError:
            print("Entier attendu.")
            continue
        if n < 0 or n > 20:
            print("La note doit être entre 0 et 20.")
            continue
        return n</code></pre>
</div>
</details>

## Suite du parcours

Le [mini-jeu « plus ou moins »](/python-mini-jeu-terminal/) assemble boucles, `input`, `random` et un `try` / `except` propre sur la saisie.

## Amazon (partenaire)

- [Bonnes pratiques Python](https://www.amazon.fr/s?k=clean+code+python+livre&tag=manuso06-21)
