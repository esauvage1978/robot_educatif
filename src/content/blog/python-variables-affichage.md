---
title: "Python — variables et affichage (print)"
description: "Affectation, noms de variables, print (virgules, concaténation), f-strings et expressions ; pièges courants et exercices avec solutions repliables."
pubDate: 2026-03-28
updatedDate: 2026-03-29
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Python
seriesOrder: 2
tags: ["Python", "Programmation"]
relatedLinks:
  - title: "Leçon 1 — environnement de développement"
    href: "/python-environnement-developpement/"
  - title: "Leçon 3 — types et saisie"
    href: "/python-types-et-saisie/"
categories:
  - "Python"
  - "Programmation"
  - "Tutoriel"
  - "Débutant"
---
Après avoir installé Python et ouvert un éditeur ([leçon 1](/python-environnement-developpement/)), tu passes à la **matière première** des programmes : stocker des informations dans des **variables** et les **afficher** à l’écran. Cette leçon reste volontairement sans `input()` : tout est écrit **dans le code** ; la saisie clavier arrive à la [leçon 3](/python-types-et-saisie/).

![Console Python](../../assets/programmation/python-terminal.svg)

## 1. Qu’est-ce qu’une variable ?

Une **variable** est un **nom** (que tu choisis) associé à une **valeur** en mémoire. En Python, on **affecte** avec le signe `=` : la valeur à droite est stockée sous le nom à gauche.

```python
score = 0
pseudo = "Nova"
```

Tu peux **relire** ou **modifier** la valeur plus tard en réutilisant le même nom :

```python
score = score + 10
print(score)  # 10
```

L’ordre compte : `10 = score` est une **erreur** (on ne peut pas affecter un nombre).

## 2. Bien nommer ses variables

Python accepte des noms faits de **lettres**, **chiffres** et **underscores** `_`, à condition de **ne pas commencer par un chiffre**. Évite les **accents** dans les noms (moins portable, parfois source de confusion).

**Style recommandé** : plusieurs mots en **snake_case** : `annee_naissance`, `vitesse_max`.

**À ne pas faire** : réutiliser un **mot réservé** du langage (`if`, `for`, `print`, `True`…). L’éditeur les colore souvent différemment : si ton nom « cloche », change-le.

## 3. Afficher avec `print`

`print` envoie du texte (et des valeurs) vers la **console** — le terminal ou la fenêtre de sortie de ton IDE.

### Plusieurs valeurs séparées par des virgules

Python insère **un espace** entre chaque élément et ajoute un **saut de ligne** à la fin.

```python
nom = "Lina"
print("Bonjour", nom, "!")   # Bonjour Lina !
```

### Concaténation avec `+` (chaînes uniquement)

Le `+` **colle** deux chaînes **sans espace automatique**. Pense aux espaces dans les guillemets.

```python
print("Bonjour " + nom + " !")
```

Si tu mélanges **nombre** et **texte**, `+` provoque une erreur. Utilise des **virgules** dans `print`, ou convertis avec `str()` :

```python
n = 7
print("La réponse est", n)
print("La réponse est " + str(n))
```

### `sep` et `end` (optionnel)

Tu peux changer le séparateur entre arguments et ce qui est affiché **après** (par défaut : saut de ligne).

```python
print("A", "B", "C", sep=" | ")   # A | B | C
print("Suite...", end="")
print(" même ligne.")
```

## 4. Les f-strings (Python 3.6+)

Une **f-string** est une chaîne précédée de `f` ; les **expressions** entre `{` et `}` sont **évaluées** et insérées dans le texte. C’est le moyen le plus lisible pour construire des messages.

```python
nom = "Lina"
age = 12
print(f"{nom} a {age} ans")
print(f"Dans deux ans, {age + 2} ans.")
```

Tu peux mettre des **calculs** ou des **appels de fonctions** courts dans les accolades (sans en abuser pour garder le code clair).

**Guillemets** : si ta f-string utilise des `"`, tu peux délimiter la chaîne avec `'` pour éviter les conflits, ou échapper — exemple :

```python
msg = f'Il a dit "OK" à {nom}.'
```

## 5. Pièges fréquents

- **`NameError`** : tu utilises un nom **avant** de l’avoir défini, ou tu fais une **faute de frappe** (`scor` au lieu de `score`).
- **Oublier les guillemets** pour du texte : `nom = Lina` cherche une variable `Lina`, pas le prénom.
- **`print` sans parenthèses** en Python 3 : écris bien `print(x)`, pas `print x`.

**Astuce** : ajouter un `print` temporaire (`print("ici", variable)`) pour voir où ton programme en est ; tu affineras avec la leçon sur le **débogage** plus tard dans le parcours.

## 6. Mini-parcours : du début à un petit résumé

Les **étapes** de ce programme servent de fil rouge pour les exercices ci-dessous : définir des **variables texte et numériques**, calculer un **total**, puis **afficher** avec virgules et **f-strings**.

```python
# Exemple complet sur une seule exécution
prenom = "Sam"
points = 100
bonus = 25
total = points + bonus

print("Joueur :", prenom)
print(f"Score de base : {points}, bonus : {bonus}")
print(f"Total affiché au classement : {total}")
```

Lance le script avec ton éditeur ou `python fichier.py` et vérifie que les trois lignes s’affichent comme prévu.

## Exercices (20)

Chaque exercice est relié aux **notions** de la leçon (variables, `print`, f-strings, `sep` / `end`, `str()`). Les **solutions** sont masquées par défaut : clique sur **Afficher la solution** pour comparer ton code.

### Niveau simple

**Exercice 1** — Crée une variable `prenom` avec une chaîne de ton choix, puis affiche-la avec `print`. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">prenom = "Alex"
print(prenom)</code></pre>
</div>
</details>

**Exercice 2** — Affiche **deux lignes** : d’abord `Hello`, puis `Python`, avec **deux** appels à `print`. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">print("Hello")
print("Python")</code></pre>
</div>
</details>

**Exercice 3** — Définis `a = 4` et `b = 9`, puis affiche les deux valeurs **sur une seule ligne** avec **une virgule** dans `print` (Python insérera un espace). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">a = 4
b = 9
print(a, b)</code></pre>
</div>
</details>

**Exercice 4** — Définis `mot = "Salut"` et affiche `Salut tout le monde` en **concaténant** avec `+` (pense aux espaces dans les chaînes). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">mot = "Salut"
print(mot + " tout le monde")</code></pre>
</div>
</details>

**Exercice 5** — Définis `largeur = 8` et `hauteur = 3`, calcule `aire = largeur * hauteur` et affiche `Aire :` suivi de la valeur avec une **f-string**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">largeur = 8
hauteur = 3
aire = largeur * hauteur
print(f"Aire : {aire}")</code></pre>
</div>
</details>

**Exercice 6** — Affiche les trois nombres `10`, `20`, `30` sur **une ligne** avec `sep=" → "`. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">print(10, 20, 30, sep=" → ")</code></pre>
</div>
</details>

**Exercice 7** — Définis `n = 6` et affiche une phrase du type `Le double de 6 vaut 12` en mettant le calcul `n * 2` **dans les accolades** d’une f-string. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = 6
print(f"Le double de {n} vaut {n * 2}")</code></pre>
</div>
</details>

### Niveau intermédiaire

**Exercice 8** — Définis `k = 42` et affiche exactement la chaîne `Réponse : 42` en utilisant **`+`** et **`str(k)`** (sans f-string). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">k = 42
print("Réponse : " + str(k))</code></pre>
</div>
</details>

**Exercice 9** — Affiche `AB` sur **une seule ligne** en utilisant **deux** `print` et `end=""` sur le premier. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">print("A", end="")
print("B")</code></pre>
</div>
</details>

**Exercice 10** — Deux notes `note1` et `note2` (entiers), calcule la **moyenne** `(note1 + note2) / 2` et l’affiche avec une **f-string** (tu peux laisser un `.0` si le résultat est entier). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">note1 = 14
note2 = 16
moyenne = (note1 + note2) / 2
print(f"Moyenne : {moyenne}")</code></pre>
</div>
</details>

**Exercice 11** — `minutes = 5` et `secondes = 30` : calcule le **nombre total de secondes** dans une variable, puis affiche-le avec une f-string. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">minutes = 5
secondes = 30
total_sec = minutes * 60 + secondes
print(f"Total en secondes : {total_sec}")</code></pre>
</div>
</details>

**Exercice 12** — Affiche sur **une ligne** : `x = 7` et le **double** de `x`, en utilisant `print` avec des **virgules** et une **expression** `x * 2` comme argument. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">x = 7
print("x =", x, "double =", x * 2)</code></pre>
</div>
</details>

**Exercice 13** — Définis `nom = "Kim"` et affiche `Kim a dit "oui"` en utilisant une f-string délimitée par des **guillemets simples** `'` pour pouvoir mettre des `"` dans le texte. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">nom = "Kim"
print(f'{nom} a dit "oui"')</code></pre>
</div>
</details>

**Exercice 14** — Reprends la **structure** du mini-parcours (§6) avec **d’autres valeurs** : `prenom`, `points`, `bonus`, `total`, puis **trois** `print` comme dans l’exemple (virgules puis deux f-strings). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">prenom = "Noa"
points = 50
bonus = 10
total = points + bonus

print("Joueur :", prenom)
print(f"Score de base : {points}, bonus : {bonus}")
print(f"Total affiché au classement : {total}")</code></pre>
</div>
</details>

### Niveau difficile

**Exercice 15** — Affectation multiple : `a, b, c = 2, 3, 5`, calcule `somme = a + b + c` et affiche `Somme : 10` avec une f-string. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">a, b, c = 2, 3, 5
somme = a + b + c
print(f"Somme : {somme}")</code></pre>
</div>
</details>

**Exercice 16** — `age = 11` : calcule `annee_naissance = 2026 - age` et affiche une phrase du type `Né(e) vers 2015` avec une f-string (adapte le texte si tu préfères « environ »). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">age = 11
annee_naissance = 2026 - age
print(f"Né(e) vers {annee_naissance}")</code></pre>
</div>
</details>

**Exercice 17** — Définis `x = 3` et `y = 4`, puis affiche `Expression : (3+4)*2 = 14` en utilisant **uniquement** des f-strings et les variables (pas les littéraux 3 et 4 dans le message si tu peux tout tirer de `x` et `y`). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">x = 3
y = 4
print(f"Expression : ({x}+{y})*2 = {(x + y) * 2}")</code></pre>
</div>
</details>

**Exercice 18** — `score = 1200` et `niveau = 5` : affiche **deux lignes** avec deux f-strings : une pour `Score : …`, une pour `Niveau : …`. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">score = 1200
niveau = 5
print(f"Score : {score}")
print(f"Niveau : {niveau}")</code></pre>
</div>
</details>

**Exercice 19** — Affiche `1|2|3` puis, **à la ligne suivante**, `Fin`, en **deux** appels à `print` : le premier utilise `sep="|"` (saut de ligne par défaut après) ; le second affiche `Fin`. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">print(1, 2, 3, sep="|")
print("Fin")</code></pre>
</div>
</details>

**Exercice 20** — Définis `prix_unitaire = 3` et `quantite = 7`, calcule `total = prix_unitaire * quantite`, puis affiche **trois** lignes : une avec **virgules** (`Article`, quantité), une f-string pour le **sous-total**, une f-string pour un message du type `Total TTC (imaginaire) : …` en réutilisant `total`. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">prix_unitaire = 3
quantite = 7
total = prix_unitaire * quantite

print("Article", "billets", "x", quantite)
print(f"Prix unitaire × quantité = {prix_unitaire} × {quantite}")
print(f"Total (démo) : {total}")</code></pre>
</div>
</details>

## Suite du parcours

La [leçon 3](/python-types-et-saisie/) introduit les **types** (`int`, `float`, `str`…) et la saisie avec **`input()`** : tu pourras alors personnaliser l’affichage selon ce que l’utilisateur tape.

## Amazon (partenaire)

- [Initiation Python livre](https://www.amazon.fr/s?k=python+initiation+livre&tag=manuso06-21)
