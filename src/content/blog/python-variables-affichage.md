---
title: "Python variables et print (2/10) : créer, afficher — débutant"
headline: "Apprendre Python (2/10) : Les Variables (Créer et Afficher des Données)"
description: "Python variables pour débutants : affectation, print, f-strings, afficher une variable. Apprendre Python pas à pas — leçon 2/10, exercices avec solutions."
pubDate: "2026-03-28"
updatedDate: "2026-04-18"
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Python
seriesOrder: 2
tags: ["Python", "Programmation"]
relatedLinks:
  - title: "Leçon 1 — installer Python et premier programme"
    href: "/python-environnement-developpement/"
  - title: "Leçon 3 — types et saisie"
    href: "/python-types-et-saisie/"
  - title: "Parcours Python (10 leçons)"
    href: "/programmation/python/"
categories:
  - "Python"
  - "Programmation"
  - "Tutoriel"
  - "Débutant"
faqSchema:
  - question: "C’est quoi une variable en Python ?"
    answer: "Un nom que tu choisis pour stocker une valeur en mémoire. On écrit nom = valeur avec le signe égal ; ensuite tu peux réutiliser le nom dans print ou dans des calculs."
  - question: "Comment afficher une variable Python ?"
    answer: "Avec print(nom) ou print(\"texte\", nom). Pour insérer des variables dans une phrase, les f-strings sont pratiques : print(f\"Bonjour {nom}\")."
  - question: "Comment apprendre Python débutant variables ?"
    answer: "Commencer par créer deux ou trois variables (texte et nombre), les afficher avec print, puis utiliser des f-strings pour des messages lisibles. Cette leçon propose 20 exercices progressifs avec solutions."
  - question: "Python débutant : f-string ou print avec virgules ?"
    answer: "Les deux marchent. Les virgules dans print ajoutent des espaces automatiquement. Les f-strings (f\"...{variable}...\") sont souvent plus claires pour des phrases complètes et des calculs dans le texte."
---

Dans la [leçon 1](/python-environnement-developpement/), tu as **parlé à l’ordinateur** avec un premier `print`.  
**Maintenant**, tu vas lui apprendre à **se souvenir** : des **python variables** — un prénom, un score, un âge — que tu **ranges** dans ton programme puis que tu **réaffiches** quand tu veux.

**Promesse (en ~5 minutes de lecture + ton premier script) :** tu comprends l’idée de **boîte étiquetée**, tu écris `prenom = "Alex"`, tu fais `print(prenom)`, et tu entends le petit déclic : *« ah, c’est ça une variable »*.  
Ensuite tu enchaînes avec **afficher** proprement : virgules, **f-strings**, et une ribambelle d’**exercices** pour verrouiller.

Cette leçon reste **sans** `input()` : tout est dans le code ; la saisie clavier arrive à la [leçon 3](/python-types-et-saisie/). Parfait pour **apprendre Python** en **débutant** sans surcharge.

![Console Python](../../assets/programmation/python-terminal.svg)

<div class="article-cta-row">
<a class="article-cta article-cta--primary" href="/python-environnement-developpement/">Leçon 1 — Installation</a>
<a class="article-cta article-cta--secondary" href="/programmation/python/">Toute la série (1/10)</a>
</div>

---

## 🎮 Partie 1 — Mission 1 : créer une mémoire

### 🎯 Objectif

Créer ta **première variable** et prouver que Python **retient** la valeur.

### 🧠 Explication simple

👉 Une **variable**, c’est une **boîte avec un nom** sur l’étiquette. Dedans tu mets **une** information : un **texte**, un **nombre**, plus tard plein d’autres choses.

👉 En Python, le signe `=` ne veut pas dire « égal en maths » : il veut dire **« ranger dans la boîte »**. À **gauche** le nom, à **droite** la valeur.

👉 Techniquement, une variable est un **nom** qui référence une valeur en mémoire — mais pour débuter, pense **boîte** et **étiquette**.

```python
prenom = "Alex"
```

Là, la boîte s’appelle `prenom` et contient le texte `Alex`. Tu peux **changer** le contenu plus tard :

```python
score = 0
score = score + 10
print(score)  # 10 — la boîte a été mise à jour
```

**Attention :** l’ordre compte. `10 = score` est **interdit** (tu ne peux pas ranger une boîte dans un nombre).

---

## 🎮 Partie 2 — Mission 2 : montrer ce que tu as stocké

### 🎯 Objectif

**Afficher** une variable avec `print` — c’est le **python afficher variable** de base.

### 💻 Code express

```python
prenom = "Alex"
print(prenom)
print("Le joueur s’appelle", prenom)
```

Tu dois voir `Alex` puis une phrase complète. **Wow** : le même prénom sert **deux fois** sans retaper le texte à la main.

---

## 🧠 Les règles du jeu (noms de variables)

Python accepte des noms en **lettres**, **chiffres** et **`_`**, mais **pas** en commençant par un chiffre. Style courant : **`snake_case`** (`mon_score`, `annee_naissance`).  
Évite les **mots réservés** (`if`, `for`, `print`…) comme noms — ton éditeur les colore souvent différemment.

---

## 🎮 Partie 3 — Mission 3 : `print` comme une tablette magique

`print` envoie du texte vers la **console** (fenêtre en bas dans VS Code, ou terminal).

### Virgules = espaces automatiques

```python
nom = "Lina"
print("Bonjour", nom, "!")   # Bonjour Lina !
```

### Coller du texte avec `+` (chaînes seulement)

```python
print("Bonjour " + nom + " !")
```

Si tu mélanges **nombre** et **texte**, `+` peut grincer : utilise des **virgules** ou `str()` :

```python
n = 7
print("La réponse est", n)
print("La réponse est " + str(n))
```

### `sep` et `end` (bonus)

```python
print("A", "B", "C", sep=" | ")   # A | B | C
print("Suite...", end="")
print(" même ligne.")
```

---

## 🎮 Partie 4 — Mission 4 : les f-strings (effet « pro »)

Une **f-string** commence par `f` devant les guillemets ; ce que tu mets entre `{` et `}` est **calculé** et inséré dans la phrase.

```python
nom = "Lina"
age = 12
print(f"{nom} a {age} ans")
print(f"Dans deux ans : {age + 2} ans.")
```

C’est **le** moyen lisible pour **python afficher variable** dans une phrase complète — idéal pour **python débutant variables** qui veulent du texte soigné.

```python
msg = f'Il a dit "OK" à {nom}.'
```

---

## ⚠️ Pièges (tout le monde tombe dedans au moins une fois)

- **`NameError`** : tu utilises un nom avant de l’avoir créé, ou **faute de frappe** (`scor` vs `score`).
- **Texte sans guillemets** : `nom = Lina` cherche une variable `Lina`, pas le prénom.
- **`print x`** sans parenthèses : en Python 3, écris **`print(x)`**.

**Astuce débutant :** un `print("debug", variable)` au bon endroit, et tu vois ce que contient la boîte.

---

## 🏆 Mini-boss : exemple « score » (à lancer tout de suite)

Copie ce bloc dans un fichier `.py`, exécute-le : tu dois voir **trois lignes** — c’est le **fil rouge** des exercices (texte + nombres + **f-strings**).

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

Si ça s’affiche, tu as compris l’essentiel des **python variables** et de l’**affichage**. Place aux **20 missions** ci-dessous pour le mode « entraînement ».

---

## 🤖 Résumé rapide (révision / IA)

- **Variable** = nom `=` valeur (boîte étiquetée).  
- **`print`** = montrer à l’écran ; **virgules** ou **f-strings** pour jolies phrases.  
- **f-string** = `f"…{nom}…"` pour insérer variables et calculs.

---

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

**Exercice 14** — Reprends la **structure** du **mini-boss « score »** (exemple plus haut) avec **d’autres valeurs** : `prenom`, `points`, `bonus`, `total`, puis **trois** `print` comme dans l’exemple (virgules puis deux f-strings). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

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

**Mission suivante :** la [leçon 3](/python-types-et-saisie/) te donne les **noms des types** (`int`, `float`, `str`…) et le pouvoir de **`input()`** : ton programme pourra **lire** ce que quelqu’un tape au clavier — fini le tout-dans-le-code pour les textes personnalisés.

<div class="article-cta-row">
<a class="article-cta article-cta--primary" href="/python-types-et-saisie/">Leçon 3 — Types et saisie</a>
<a class="article-cta article-cta--secondary" href="/programmation/python/">Hub Python</a>
</div>

## Amazon (partenaire)

- [Initiation Python livre](https://www.amazon.fr/s?k=python+initiation+livre&tag=manuso06-21)
