---
title: "Python — types de base et saisie clavier (input)"
headline: "Types de base et saisie clavier (input)"
description: "int, float, str, bool ; type(), conversions, input() et strip() ; pièges et 20 exercices avec solutions repliables."
pubDate: 2026-03-28
updatedDate: 2026-03-29
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Python
seriesOrder: 3
tags: ["Python", "Programmation"]
relatedLinks:
  - title: "Leçon 2 — variables et affichage"
    href: "/python-variables-affichage/"
  - title: "Leçon 4 — conditions if / else"
    href: "/python-conditions-if-else/"
categories:
  - "Python"
  - "Programmation"
  - "Tutoriel"
  - "Débutant"
---
Tu sais déjà afficher des variables ([leçon 2](/python-variables-affichage/)). Ici, le programme **réagit** à ce que tape l’utilisateur : tout passe par **`input()`**, qui renvoie **toujours** une chaîne (`str`). Savoir **convertir** proprement vers `int` ou `float` est indispensable avant d’enchaîner avec les [conditions](/python-conditions-if-else/).

![Console Python](../../assets/programmation/python-terminal.svg)

## 1. Les types les plus utiles au début

Python manipule des valeurs de **types** différents. Les quatre premiers à maîtriser :

| Type    | Rôle court              | Exemples        |
|---------|-------------------------|-----------------|
| `int`   | entier                  | `42`, `-3`, `0` |
| `float` | nombre à virgule        | `3.14`, `2.0`   |
| `str`   | texte                   | `"salut"`, `'x'` |
| `bool`  | vrai / faux             | `True`, `False` |

Pour **inspecter** le type en cours d’apprentissage :

```python
x = 10
y = "10"
print(type(x), type(y))  # <class 'int'> <class 'str'>
```

## 2. Conversions explicites

- **`int("42")`** → `42`. Échoue sur `"3.5"` ou `"douze"` → **`ValueError`**.
- **`float("3.5")`** ou **`float("2")`** → nombre décimal.
- **`str(2026)`** → `"2026"` (pour concaténer ou construire un message).

Règle pratique : dès que tu veux **calculer** à partir d’une saisie, convertis après `input()`.

## 3. `input()` : toujours du texte

```python
reponse = input("Un nombre entier ? ")
n = int(reponse)
print(f"Le suivant est {n + 1}")
```

Les espaces avant/après la frappe sont souvent gênants. Beaucoup de scripts commencent par :

```python
texte = input("Ville ? ").strip()
```

`strip()` enlève les espaces (et retours ligne invisibles) en début et fin de chaîne.

## 4. `bool` et comparaisons (aperçu)

Les comparaisons (`==`, `<`, …) produisent déjà un booléen. Tu peux aussi écrire `bool(0)` → `False`, `bool(1)` → `True` (les détails viendront avec la pratique des `if`).

## 5. Piège classique : mélanger texte et calcul

`"3" + "5"` donne `"35"`. Pour une somme :

```python
a = int(input("Premier nombre ? "))
b = int(input("Deuxième nombre ? "))
print(a + b)
```

Si l’utilisateur entre `3.5` alors que tu attendais un `int`, **`int()`** lève une erreur : on verra à la [leçon 9](/python-erreurs-debogage/) comment gérer ça avec `try` / `except`.

## Exercices (20)

Les exercices supposent que tu **lances le script** et que tu tapes les valeurs demandées dans la console. Les **solutions** sont cachées par défaut : ouvre **Afficher la solution** pour comparer.

### Niveau simple

**Exercice 1** — Affiche avec `print` les résultats de `type(7)` et `type("7")` (deux valeurs sur une ligne ou deux `print`). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">print(type(7), type("7"))</code></pre>
</div>
</details>

**Exercice 2** — Demande un texte avec `input("Ton prénom ? ")` (sans conversion), stocke dans `prenom`, puis affiche `Bonjour` suivi d’une virgule et de `prenom` avec **un seul** `print` et des virgules. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">prenom = input("Ton prénom ? ")
print("Bonjour,", prenom)</code></pre>
</div>
</details>

**Exercice 3** — Demande une phrase avec `input()`, enchaîne `.strip()` sur la même ligne que `input`, affiche la chaîne nettoyée entre guillemets dans un message du type `Tu as écrit : ...`. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">phrase = input("Une phrase : ").strip()
print(f"Tu as écrit : {phrase}")</code></pre>
</div>
</details>

**Exercice 4** — Crée une variable `s = "15"`, convertis en entier avec `int(s)`, affiche le résultat et son `type(...)`. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">s = "15"
n = int(s)
print(n, type(n))</code></pre>
</div>
</details>

**Exercice 5** — Crée `t = "2.5"`, convertis en `float`, affiche la valeur multipliée par `2` (sans f-string : un seul `print` avec une virgule suffit). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">t = "2.5"
x = float(t)
print(x * 2)</code></pre>
</div>
</details>

**Exercice 6** — Avec `n = 2026`, affiche la chaîne `"Année : "` suivie de `str(n)` en utilisant **concaténation** avec `+`. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = 2026
print("Année : " + str(n))</code></pre>
</div>
</details>

**Exercice 7** — Demande **deux** chaînes avec deux `input()` (`mot1`, `mot2`) et affiche leur **concaténation directe** (sans espace), pour montrer le piège `"3"` + `"5"` → `"35"`. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">mot1 = input("Premier mot : ")
mot2 = input("Deuxième mot : ")
print(mot1 + mot2)</code></pre>
</div>
</details>

### Niveau intermédiaire

**Exercice 8** — Demande un **entier** avec `input`, convertis avec `int`, affiche `Le suivant est` suivi de `n + 1` (f-string). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = int(input("Un entier ? "))
print(f"Le suivant est {n + 1}")</code></pre>
</div>
</details>

**Exercice 9** — Demande un nombre **décimal** (`float`), affiche son **double** avec une f-string. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">x = float(input("Un nombre décimal ? "))
print(f"Double : {x * 2}")</code></pre>
</div>
</details>

**Exercice 10** — Demande **deux entiers**, affiche leur **somme** et leur **produit** sur **deux lignes** (deux `print` ou deux f-strings). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">a = int(input("Premier entier ? "))
b = int(input("Deuxième entier ? "))
print(f"Somme : {a + b}")
print(f"Produit : {a * b}")</code></pre>
</div>
</details>

**Exercice 11** — Demande un **prénom** (chaîne) et un **âge** (`int`), puis affiche `… a … ans` avec une f-string. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">prenom = input("Prénom ? ")
age = int(input("Âge ? "))
print(f"{prenom} a {age} ans")</code></pre>
</div>
</details>

**Exercice 12** — Demande une température en **°C** en `float`, calcule **°F** avec `f = c * 9 / 5 + 32` et affiche le résultat arrondi à **1** décimale avec `round(f, 1)` dans le message. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">c = float(input("Température °C ? "))
f = c * 9 / 5 + 32
print(f"En °F : {round(f, 1)}")</code></pre>
</div>
</details>

**Exercice 13** — Demande une chaîne (sans la convertir en nombre), affiche sa **longueur** avec `len(...)`. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">texte = input("Un mot ou une phrase : ")
print(len(texte))</code></pre>
</div>
</details>

**Exercice 14** — Lis une chaîne qui représente un décimal (ex. `"12.5"`) dans le code (`s = "12.5"`), convertis en `float`, affiche le **triple** de la valeur. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">s = "12.5"
x = float(s)
print(x * 3)</code></pre>
</div>
</details>

### Niveau difficile

**Exercice 15** — Demande **trois entiers** successifs, calcule la **somme** et la **moyenne** `(a+b+c)/3`, affiche les deux avec des f-strings (la moyenne peut afficher des décimales). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">a = int(input("a ? "))
b = int(input("b ? "))
c = int(input("c ? "))
somme = a + b + c
moyenne = somme / 3
print(f"Somme : {somme}")
print(f"Moyenne : {moyenne}")</code></pre>
</div>
</details>

**Exercice 16** — Demande un `float`, puis affiche la valeur **arrondie à 2 décimales** en utilisant `round(x, 2)` **dans** une f-string. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">x = float(input("Nombre ? "))
print(f"Valeur arrondie (2 déc.) : {round(x, 2)}")</code></pre>
</div>
</details>

**Exercice 17** — Demande une chaîne, applique `.strip()`, convertis en `int`, puis affiche le **carré** `n * n` avec une f-string. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = int(input("Un entier (espaces autorisés) : ").strip())
print(f"Carré : {n * n}")</code></pre>
</div>
</details>

**Exercice 18** — Demande **deux** nombres en `float`, calcule et affiche la **moyenne** `(a+b)/2` avec un message clair. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">a = float(input("Premier nombre ? "))
b = float(input("Deuxième nombre ? "))
m = (a + b) / 2
print(f"Moyenne : {m}")</code></pre>
</div>
</details>

**Exercice 19** — Demande une **année de naissance** et l’**année courante** en entiers (`int`), calcule un **âge** approximatif `courant - naissance` et affiche-le (sans gérer le jour du calendrier : c’est volontairement simplifié). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">naissance = int(input("Année de naissance ? "))
courant = int(input("Année courante ? "))
age = courant - naissance
print(f"Âge approximatif : {age} ans")</code></pre>
</div>
</details>

**Exercice 20** — Enchaîne : `input` du **prénom** avec `.strip()`, `input` d’une **taille** en mètres en `float`, puis une **f-string** sur **une ligne** du type `Paul mesure environ 1.72 m` (adapte avec les variables). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">prenom = input("Prénom ? ").strip()
taille = float(input("Taille en m ? "))
print(f"{prenom} mesure environ {taille} m")</code></pre>
</div>
</details>

## Suite du parcours

La [leçon 4](/python-conditions-if-else/) utilise ces conversions pour **tester** des valeurs : pair / impair, menus, notes, etc.

## Amazon (partenaire)

- [Exercices et problèmes Python](https://www.amazon.fr/s?k=exercices+python+livre&tag=manuso06-21)
