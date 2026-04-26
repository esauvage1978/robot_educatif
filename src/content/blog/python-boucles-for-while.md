---
title: "Apprendre Python (5/10) : Les Boucles (For et While)"
headline: "Apprendre Python (5/10) : Les Boucles (For et While)"
description: "Python boucle for et while : range, répétition, break et continue. Boucle python exemple pour débutants — leçon 5/10, 20 exercices avec solutions."
pubDate: "2026-03-28"
updatedDate: "2026-04-18"
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Python
seriesOrder: 5
tags: ["Python", "Programmation"]
relatedLinks:
  - title: "Leçon 4 — conditions if / else"
    href: "/python-conditions-if-else/"
  - title: "Leçon 6 — fonctions"
    href: "/python-fonctions/"
  - title: "Parcours Python (10 leçons)"
    href: "/programmation/python/"
categories:
  - "Python"
  - "Programmation"
  - "Tutoriel"
  - "Débutant"
faqSchema:
  - question: "C’est quoi une boucle en Python ?"
    answer: "Une boucle répète un bloc de code plusieurs fois. Avec for, on parcourt souvent une plage d’entiers (range) ou du texte caractère par caractère. Avec while, on répète tant qu’une condition reste vraie."
  - question: "Différence entre python for et python while ?"
    answer: "for sert surtout quand tu connais le nombre de tours ou ce que tu parcours (chaîne, plage). while sert quand tu répètes jusqu’à un événement (bonne saisie, mot stop, victoire au jeu) — souvent avec une condition qui change dans la boucle."
  - question: "Comment faire une boucle python exemple simple ?"
    answer: "Exemple for : for i in range(3): print(\"Hello\") affiche Hello trois fois. Exemple while : n = 3 puis while n > 0: print(n); n -= 1 compte à rebours."
  - question: "Comment apprendre python débutant avec les boucles ?"
    answer: "En enchaînant range, for sur une chaîne, puis while avec compteur ou saisie. Cette page propose 20 exercices progressifs avec solutions pour ancrer for, while, break et continue."
---

Tu veux **écrire 10 fois la même chose** à la main… ou **laisser Python le faire pour toi** ?

À la [leçon 4](/python-conditions-if-else/), ton programme **décidait** (`if` / `else`). Ici, il devient **automatisateur** : il **répète** une action autant de fois qu’il le faut — sans copier-coller jusqu’à la fin des temps.

**Promesse :** comprendre **python for** et **python while** en quelques minutes, avec des **boucle python exemple** concrets, pour **gagner du temps** et **apprendre python débutant** en mode mission (pas en mode encyclopédie).

Tu maîtrises déjà variables, saisie et **conditions** ; les **python boucle** sont la couche suivante : traiter **plusieurs** valeurs, **compter**, **réessayer** jusqu’au bon résultat.

![Console Python](../../assets/programmation/python-terminal.svg)

<div class="article-cta-row">
<a class="article-cta article-cta--primary" href="/python-conditions-if-else/">Leçon 4 — Conditions</a>
<a class="article-cta article-cta--secondary" href="/programmation/python/">Série Python</a>
</div>

---

## 🎮 Partie 1 — Mission 1 : répéter une action

### 🎯 Objectif

Afficher **plusieurs fois** le même message — d’abord « à la main », puis **avec une boucle**.

### 💻 Code (sans boucle)

Tu peux faire comme ça… mais imagine **100** lignes :

```python
print("Hello")
print("Hello")
print("Hello")
```

### 💻 Même chose, version **python for** (automatisation)

```python
for _ in range(3):
    print("Hello")
```

`range(3)` signifie « **3 tours** » (0, 1, 2 en coulisses — on s’en fiche ici). Le bloc **indenté** sous `for` est exécuté **à chaque tour**. Tu viens de gagner : **une idée**, **plusieurs exécutions**.

---

## 🎮 Partie 2 — Mission 2 : `for` et `range` (compter proprement)

`range(n)` produit les entiers **de 0 à n - 1** :

```python
for i in range(5):
    print(i)   # 0 1 2 3 4
```

**Variantes utiles** :

- `range(debut, fin)` : de `debut` **inclus** à `fin` **exclu**.
- `range(debut, fin, pas)` : avec un **pas** (positif ou négatif).

```python
for k in range(2, 8, 2):
    print(k)   # 2 4 6

for j in range(10, 0, -1):
    print(j)   # compte à rebours 10 → 1
```

Pour afficher de **1 à 10** **inclus** : `range(1, 11)`.

---

## 🎮 Partie 3 — Mission 3 : parcourir une chaîne (lettre par lettre)

Une chaîne est une **suite** de caractères ; `for lettre in mot:` affiche (ou teste) **un par un** :

```python
mot = input("Un mot ? ")
for lettre in mot:
    print(lettre)
```

Parfait pour compter des lettres, détecter un symbole, ou préparer ce que tu feras plus tard avec les **listes**.

---

## 🎮 Partie 4 — Mission 4 : `while` — « tant que… »

La boucle **continue** tant que la condition reste **vraie**. Il faut **faire évoluer** quelque chose dans le bloc (compteur, saisie…), sinon tu risques une boucle **infinie** — sauf si c’est **voulu** (`while True` + `break` plus tard).

```python
n = 3
while n > 0:
    print(n)
    n -= 1    # équivalent à n = n - 1
print("Décollage !")
```

C’est le cœur du **python while** : répéter **jusqu’à** ce que la situation change.

---

## 🎮 Partie 5 — Mission 5 : `break` et `continue` (contrôle fin)

- **`break`** : tu **sors** de la boucle **tout de suite** (souvent avec un `if` dedans).
- **`continue`** : tu **sautes** la fin du tour **actuel** et tu passes au suivant.

```python
for i in range(10):
    if i == 3:
        continue
    if i == 7:
        break
    print(i)
```

---

## 🎮 Partie 6 — Mission 6 : `for` ou `while` ?

- Tu sais **combien** de tours (ou tu parcours une **chaîne** / une **liste**) → en général **`for`**.
- Tu répètes jusqu’à un **événement** (bonne réponse, mot magique, partie gagnée) → souvent **`while`** avec une condition qui se met à jour, ou **`while True`** + **`break`**.

Tu es passé de « je choisis une branche » ([conditions](/python-conditions-if-else/)) à « je **répète** intelligemment » : c’est exactement le métier d’un **automatisateur**.

---

## 🤖 Résumé rapide (révision / IA)

- **`for`** + **`range`** = répétitions et comptages structurés.  
- **`for` sur une chaîne** = un caractère à la fois.  
- **`while`** = tant qu’une condition tient.  
- **`break` / `continue`** = boutons pause / suivant sur la boucle.  
- Enchaînement : [variables](/python-variables-affichage/) → [saisie](/python-types-et-saisie/) → [conditions](/python-conditions-if-else/) → **boucles** → [fonctions](/python-fonctions/) (leçon 6).

---

## Exercices (20)

Chaque exercice reprend les **boucles** de la leçon (`for`, `range`, `while`, `break`, `continue`). Les **solutions** sont masquées par défaut : clique sur **Afficher la solution** pour comparer ton code.

### Niveau simple

**Exercice 1** — Avec un `for` sur `range(5)`, affiche les entiers **0** à **4** (un par ligne). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">for i in range(5):
    print(i)</code></pre>
</div>
</details>

**Exercice 2** — Affiche les entiers de **1** à **10** inclus avec `range` (un par ligne). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">for i in range(1, 11):
    print(i)</code></pre>
</div>
</details>

**Exercice 3** — Calcule avec un `for` la **somme** des entiers de **1** à **20** et affiche le résultat (variable `total` initialisée à `0`). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">total = 0
for i in range(1, 21):
    total += i
print(total)</code></pre>
</div>
</details>

**Exercice 4** — Parcours la chaîne `"code"` avec `for lettre in ...` et affiche chaque caractère sur sa propre ligne. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">for lettre in "code":
    print(lettre)</code></pre>
</div>
</details>

**Exercice 5** — Avec un `while`, affiche **3**, **2**, **1**, **0** (une valeur par ligne), en partant de `n = 3` et en décrémentant jusqu’à afficher **0**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = 3
while n >= 0:
    print(n)
    n -= 1</code></pre>
</div>
</details>

**Exercice 6** — Affiche les **entiers pairs** de **0** à **10** inclus en utilisant `range` avec un **pas** de **2**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">for i in range(0, 11, 2):
    print(i)</code></pre>
</div>
</details>

**Exercice 7** — Affiche les **carrés** des entiers **1** à **10** (une ligne par valeur : `1`, `4`, `9`, …). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">for i in range(1, 11):
    print(i * i)</code></pre>
</div>
</details>

### Niveau intermédiaire

**Exercice 8** — Boucle `for i in range(15)` : affiche `i`, mais **`break`** dès que `i == 6` (tu ne dois pas afficher les valeurs après). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">for i in range(15):
    print(i)
    if i == 6:
        break</code></pre>
</div>
</details>

**Exercice 9** — Affiche les entiers **0** à **9** sauf **5** : utilise `continue` pour sauter cette valeur. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">for i in range(10):
    if i == 5:
        continue
    print(i)</code></pre>
</div>
</details>

**Exercice 10** — Demande une **phrase** (chaîne) et compte combien de fois la lettre **`e`** ou **`E`** apparaît (boucle `for` sur les caractères). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">phrase = input("Phrase ? ")
n = 0
for c in phrase:
    if c == "e" or c == "E":
        n += 1
print(n)</code></pre>
</div>
</details>

**Exercice 11** — Avec un `while`, **redemande** un entier tant qu’il n’est **pas** dans l’intervalle **1** à **10** inclus ; affiche ensuite `OK :` suivi de la valeur. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = int(input("Nombre entre 1 et 10 ? "))
while n < 1 or n > 10:
    n = int(input("Encore : "))
print("OK :", n)</code></pre>
</div>
</details>

**Exercice 12** — Calcule la **somme** des **multiples de 5** de **5** à **50** inclus (`5 + 10 + … + 50`) avec une boucle `for`. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">total = 0
for x in range(5, 51, 5):
    total += x
print(total)</code></pre>
</div>
</details>

**Exercice 13** — Calcule **6!** = `1 × 2 × … × 6` avec une boucle `for` (variable `p` initialisée à **1**). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">p = 1
for k in range(1, 7):
    p *= k
print(p)</code></pre>
</div>
</details>

**Exercice 14** — Affiche un **compte à rebours** : **10**, **8**, **6**, … jusqu’à **0** (un nombre par ligne) avec `range` et un **pas négatif**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">for x in range(10, -1, -2):
    print(x)</code></pre>
</div>
</details>

### Niveau difficile

**Exercice 15** — Affiche la **table de multiplication par 7** : une ligne par multiplicateur de **1** à **10** (`7 x 1 = 7`, …). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">for m in range(1, 11):
    print(f"7 x {m} = {7 * m}")</code></pre>
</div>
</details>

**Exercice 16** — Boucle **`while True`** : à chaque tour, demande un mot ; si l’utilisateur tape **`stop`**, **quitte** la boucle avec `break` ; sinon affiche `encore`. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">while True:
    s = input("Mot (stop pour finir) ? ")
    if s == "stop":
        break
    print("encore")</code></pre>
</div>
</details>

**Exercice 17** — Affiche un **rectangle** de **5** lignes et **8** colonnes de caractères **`#`** en utilisant **deux boucles `for` imbriquées** (chaque ligne se termine par un saut de ligne). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">for ligne in range(5):
    for col in range(8):
        print("#", end="")
    print()</code></pre>
</div>
</details>

**Exercice 18** — Demande une **chaîne** et affiche sa **version inversée** en la reconstruisant dans une boucle `for` (sans utiliser `[::-1]` ni `reversed`). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">s = input("Texte ? ")
inv = ""
for c in s:
    inv = c + inv
print(inv)</code></pre>
</div>
</details>

**Exercice 19** — Demande deux entiers **`x`** et **`n`** (positifs) et calcule **x à la puissance n** avec une boucle (sans l’opérateur `**`). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">x = int(input("x ? "))
n = int(input("n ? "))
p = 1
for _ in range(n):
    p *= x
print(p)</code></pre>
</div>
</details>

**Exercice 20** — **Plus ou moins** : entier secret **40** dans le code ; en boucle **`while`**, demande une proposition, affiche `trop petit`, `trop grand` ou `gagné` et **arrête** quand c’est bon. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">secret = 40
while True:
    t = int(input("Proposition ? "))
    if t < secret:
        print("trop petit")
    elif t > secret:
        print("trop grand")
    else:
        print("gagné")
        break</code></pre>
</div>
</details>

## Suite du parcours

Les [fonctions](/python-fonctions/) (leçon 6) permettent de **nommer** un morceau de code réutilisable — par exemple `afficher_carres(n)` ou `demander_nombre_positif()`. Après les boucles, tu ranges ton « usine à répéter » dans des **boîtes** claires.

<div class="article-cta-row">
<a class="article-cta article-cta--primary" href="/python-fonctions/">Leçon 6 — Fonctions</a>
<a class="article-cta article-cta--secondary" href="/programmation/python/">Parcours Python</a>
</div>

## Amazon (partenaire)

- [Python 3 exercices corrigés](https://www.amazon.fr/s?k=python+3+exercices+corrig%C3%A9s&tag=manuso06-21)
