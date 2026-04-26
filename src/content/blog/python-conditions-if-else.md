---
title: "Python if else elif (4/10) : conditions pour débutants"
headline: "Apprendre Python (4/10) : Les Conditions (If, Else, Elif)"
description: "Python if else et elif : comparer, and / or / not, indentations. Condition python pour débutants — leçon 4/10, 20 exercices avec solutions."
pubDate: "2026-03-28"
updatedDate: "2026-04-18"
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Python
seriesOrder: 4
tags: ["Python", "Programmation"]
relatedLinks:
  - title: "Leçon 3 — types et saisie"
    href: "/python-types-et-saisie/"
  - title: "Leçon 5 — boucles for et while"
    href: "/python-boucles-for-while/"
  - title: "Parcours Python (10 leçons)"
    href: "/programmation/python/"
categories:
  - "Python"
  - "Programmation"
  - "Tutoriel"
  - "Débutant"
faqSchema:
  - question: "Comment écrire un if else en Python ?"
    answer: "Après if condition: (avec deux-points), le bloc indenté s’exécute si la condition est vraie. Sinon, else: lance le bloc indenté sous else. Pas d’accolades : l’indentation (souvent 4 espaces) délimite les blocs."
  - question: "C’est quoi elif en Python ?"
    answer: "elif enchaîne des tests après un if : Python parcourt les conditions dans l’ordre et exécute le premier bloc dont la condition est vraie. Un seul bloc « gagne », contrairement à plusieurs if indépendants."
  - question: "Comment faire une condition en Python débutant ?"
    answer: "Comparer des valeurs avec ==, !=, <, >, <=, >=, combiner avec and, or, not, puis utiliser if / elif / else. Les nombres saisis avec input doivent souvent être convertis en int ou float avant comparaison."
  - question: "python if else et logique du quotidien"
    answer: "C’est la même idée que « si j’ai faim je mange, sinon j’attends » : le programme choisit une branche selon une règle. Les variables et input des leçons précédentes alimentent les tests."
---

Ton programme peut maintenant **réfléchir** — en tout cas **choisir** entre plusieurs chemins. Avant, il était un peu **passif** : affichage, saisie… Maintenant il devient un **cerveau minimal** : il **décide**.

**Exemple concret (comme dans la vraie vie) :**  
si tu as **faim** → tu manges ; **sinon** → tu attends. En Python, c’est la même logique : une **condition** (`if`), une **branche sinon** (`else`), et parfois plusieurs cas (`elif`).

Tu t’appuies sur la [leçon 2](/python-variables-affichage/) (variables), la [leçon 3](/python-types-et-saisie/) (`int(input(...))`, conversions) pour **alimenter** tes tests. Bienvenue dans les **`python if else`** et la **condition python** : l’outil n°1 pour un **programme intelligent** et pour **apprendre python débutant** sans t’endormir.

![Console Python](../../assets/programmation/python-terminal.svg)

<div class="article-cta-row">
<a class="article-cta article-cta--primary" href="/python-types-et-saisie/">Leçon 3 — Saisie</a>
<a class="article-cta article-cta--secondary" href="/programmation/python/">Série Python</a>
</div>

---

## 🎮 Partie 1 — Mission 1 : faire un premier choix

### 🎯 Objectif

Écrire une **condition** qui n’affiche un message **que si** une règle est vraie.

### 💻 Code

```python
age = 12

if age >= 10:
    print("Tu peux apprendre Python !")
```

Ici, `age >= 10` est soit **vrai**, soit **faux**. Si c’est vrai, Python entre dans le bloc **indenté** sous `if` et affiche le message.

**Règle d’or :** après `if ...` tu mets un **`:`** (deux-points). La ligne suivante est **décalée** (souvent **4 espaces**) : c’est le **bloc** qui dépend du `if`. Pas d’accolades `{ }` comme dans d’autres langages.

---

## 🎮 Partie 2 — Mission 2 : comparer et combiner

**Comparaisons** : `==` (égal), `!=` (différent), `<`, `>`, `<=`, `>=`.

**Combiner** des tests :

- **`and`** : il faut que **les deux** soient vrais.  
- **`or`** : il suffit **d’au moins un** vrai.  
- **`not`** : on **inverse** le résultat.

```python
age = 14
if 10 <= age <= 18:   # forme pratique « entre » en Python
    print("Collège / lycée")
```

---

## 🎮 Partie 3 — Mission 3 : `if` / `else` (deux chemins)

Soit c’est **oui**, soit c’est **non** :

```python
note = int(input("Note sur 20 ? "))
if note >= 10:
    print("Validé")
else:
    print("À retravailler")
```

Le **`:`** est obligatoire après `if` et après `else`. Tout ce qui est **indenté** sous `if` ne tourne **que** si la condition est vraie ; pareil pour `else`.

---

## 🎮 Partie 4 — Mission 4 : enchaîner avec `elif` (plusieurs cas)

Python teste les conditions **dans l’ordre** et exécute le **premier** bloc qui matche. C’est idéal pour les **mentions**, **menus**, **tranches d’âge**…

```python
note = int(input("Note /20 ? "))
if note >= 16:
    mention = "Très bien"
elif note >= 14:
    mention = "Bien"
elif note >= 12:
    mention = "Assez bien"
elif note >= 10:
    mention = "Passable"
else:
    mention = "Insuffisant"
print(f"Mention : {mention}")
```

Si tu enchaînes plusieurs `if` **sans** `elif`, **plusieurs** blocs pourraient s’exécuter ; avec `elif`, **un seul** bloc « gagne » — souvent ce que tu veux pour une **condition python** propre.

---

## 🎮 Partie 5 — Bonus : « vide » ou pas ?

Une chaîne **vide** peut servir de test — pratique après `input()` :

```python
texte = input("Pseudo (Entrée = anonyme) ? ").strip()
if not texte:
    texte = "Invité"
print(f"Bonjour {texte}")
```

(`not texte` est vrai pour `""` ; attention : `not "0"` reste faux, car la chaîne n’est pas vide.)

---

## 🎮 Partie 6 — Imbrications (aperçu)

Tu peux mettre un `if` **dans** un autre : garde la **même indentation** partout (comme des **poupées russes**). Pour des gros programmes, les [fonctions](/python-fonctions/) (leçon 6) aideront à **découper** le code.

---

## 🤖 Résumé rapide (révision / IA)

- **`if` / `elif` / `else`** = le programme **choisit** une branche.  
- **Indentation** = structure du code en Python.  
- **Comparaisons + and / or / not** = règles du jeu.  
- Enchaînement logique : [variables](/python-variables-affichage/) → [saisie](/python-types-et-saisie/) → **conditions** → [boucles](/python-boucles-for-while/) (leçon 5).

---

## Exercices (20)

Chaque exercice reprend les **conditions** de la leçon (`if`, `elif`, `else`, `and`, `or`, `not`, comparaisons). Les **solutions** sont masquées par défaut : clique sur **Afficher la solution** pour comparer ton code.

### Niveau simple

**Exercice 1** — Avec `n = 8`, affiche `pair` ou `impair` selon que `n % 2` vaut `0` ou non. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = 8
if n % 2 == 0:
    print("pair")
else:
    print("impair")</code></pre>
</div>
</details>

**Exercice 2** — Demande un entier avec `int(input(...))` et affiche s’il est **strictement positif**, **strictement négatif** ou **nul**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = int(input("Un entier ? "))
if n > 0:
    print("positif")
elif n < 0:
    print("négatif")
else:
    print("nul")</code></pre>
</div>
</details>

**Exercice 3** — Deux variables `a = 3` et `b = 9` : affiche le **plus grand** des deux en utilisant uniquement `if` / `else` (sans `max`). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">a = 3
b = 9
if a >= b:
    print(a)
else:
    print(b)</code></pre>
</div>
</details>

**Exercice 4** — **Plus ou moins (un essai)** : `secret = 42`. Demande un entier ; affiche `trop petit`, `trop grand` ou `gagné` selon la comparaison. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">secret = 42
n = int(input("Nombre entre 1 et 100 ? "))
if n < secret:
    print("trop petit")
elif n > secret:
    print("trop grand")
else:
    print("gagné")</code></pre>
</div>
</details>

**Exercice 5** — Demande une chaîne ; si, après `strip()`, elle est **vide**, affiche `Erreur : pseudo vide` ; sinon affiche `Bienvenue,` suivi de la chaîne. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">s = input("Pseudo ? ").strip()
if not s:
    print("Erreur : pseudo vide")
else:
    print("Bienvenue,", s)</code></pre>
</div>
</details>

**Exercice 6** — `x = int(input(...))` : affiche `dans [0, 10]` si `0 <= x <= 10`, sinon `hors plage`. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">x = int(input("Un nombre ? "))
if 0 <= x <= 10:
    print("dans [0, 10]")
else:
    print("hors plage")</code></pre>
</div>
</details>

**Exercice 7** — `ok = True` : si `ok` est vrai, affiche `OK` ; sinon affiche `KO` (utilise `if ok:` sans `== True`). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">ok = True
if ok:
    print("OK")
else:
    print("KO")</code></pre>
</div>
</details>

### Niveau intermédiaire

**Exercice 8** — Demande un **âge** (`int`). Si `< 0` ou `> 120`, affiche `âge improbable` ; sinon si `age < 18` affiche `mineur`, sinon `majeur`. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">age = int(input("Âge ? "))
if age < 0 or age > 120:
    print("âge improbable")
elif age < 18:
    print("mineur")
else:
    print("majeur")</code></pre>
</div>
</details>

**Exercice 9** — Demande une **note** sur 20 (`int`). Affiche `recalé` si `< 10`, `passable` si `< 12`, `bien` si `< 16`, sinon `très bien` (chaîne `elif`). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">note = int(input("Note /20 ? "))
if note < 10:
    print("recalé")
elif note < 12:
    print("passable")
elif note < 16:
    print("bien")
else:
    print("très bien")</code></pre>
</div>
</details>

**Exercice 10** — **Menu** : affiche `1 = Salut` et `2 = Au revoir`, demande un choix (`input`), affiche le message ; si ce n’est ni `1` ni `2`, affiche `option inconnue`. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">print("1 = Salut")
print("2 = Au revoir")
c = input("Choix ? ")
if c == "1":
    print("Salut")
elif c == "2":
    print("Au revoir")
else:
    print("option inconnue")</code></pre>
</div>
</details>

**Exercice 11** — Demande `a` et `b` (entiers). Si `a == b` affiche `égaux` ; sinon affiche lequel est le plus grand (`a` ou `b`). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">a = int(input("a ? "))
b = int(input("b ? "))
if a == b:
    print("égaux")
elif a > b:
    print("a est plus grand")
else:
    print("b est plus grand")</code></pre>
</div>
</details>

**Exercice 12** — `n = int(input(...))` : avec `and`, affiche `dans la plage` seulement si `n` est **≥ 10 et ≤ 20**. Sinon affiche `dehors`. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = int(input("n ? "))
if n >= 10 and n <= 20:
    print("dans la plage")
else:
    print("dehors")</code></pre>
</div>
</details>

**Exercice 13** — Demande un caractère ou une courte chaîne `rep`. Affiche `oui` si `rep` vaut `o` ou `O` (après `strip()`), `non` si `n` ou `N`, sinon `réponse inattendue`. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">rep = input("o/n ? ").strip()
if rep == "o" or rep == "O":
    print("oui")
elif rep == "n" or rep == "N":
    print("non")
else:
    print("réponse inattendue")</code></pre>
</div>
</details>

**Exercice 14** — `x = int(input(...))` : affiche `positif ou nul` si `x >= 0`, sinon utilise un **`if` imbriqué** pour afficher `négatif pair` ou `négatif impair` selon la parité de `x`. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">x = int(input("x ? "))
if x >= 0:
    print("positif ou nul")
else:
    if x % 2 == 0:
        print("négatif pair")
    else:
        print("négatif impair")</code></pre>
</div>
</details>

### Niveau difficile

**Exercice 15** — Demande un **mot de passe** (chaîne). Si sa longueur est **&lt; 6**, affiche `trop court` ; sinon si elle est **&gt; 24**, affiche `trop long` ; sinon affiche `OK`. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">mdp = input("Mot de passe ? ")
if len(mdp) < 6:
    print("trop court")
elif len(mdp) > 24:
    print("trop long")
else:
    print("OK")</code></pre>
</div>
</details>

**Exercice 16** — Demande une **note** sur 20. Si **&lt; 0** ou **&gt; 20**, affiche `note invalide` ; sinon enchaîne un `elif` pour les mentions comme à la leçon (ex. `≥ 16` très bien, `≥ 14` bien, `≥ 12` assez bien, `≥ 10` passable, sinon insuffisant). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">note = int(input("Note /20 ? "))
if note < 0 or note > 20:
    print("note invalide")
elif note >= 16:
    print("Très bien")
elif note >= 14:
    print("Bien")
elif note >= 12:
    print("Assez bien")
elif note >= 10:
    print("Passable")
else:
    print("Insuffisant")</code></pre>
</div>
</details>

**Exercice 17** — `a`, `b`, `c` = trois entiers saisis. Affiche `tous égaux`, `deux égaux` ou `tous différents` selon le cas. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">a = int(input("a ? "))
b = int(input("b ? "))
c = int(input("c ? "))
if a == b == c:
    print("tous égaux")
elif a == b or a == c or b == c:
    print("deux égaux")
else:
    print("tous différents")</code></pre>
</div>
</details>

**Exercice 18** — Demande l’**âge** pour un tarif réduit : `&lt; 12` → `enfant`, `12` à `17` → `ado`, `18` à `64` → `adulte`, `≥ 65` → `senior` ; si `&lt; 0` ou `&gt; 120` → `âge invalide`. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">age = int(input("Âge ? "))
if age < 0 or age > 120:
    print("âge invalide")
elif age < 12:
    print("enfant")
elif age <= 17:
    print("ado")
elif age <= 64:
    print("adulte")
else:
    print("senior")</code></pre>
</div>
</details>

**Exercice 19** — Demande deux réponses `oui` / `non` ; considère que `oui` (minuscules ou non, après `strip()`) vaut vrai. Affiche `les deux` si les deux sont vrais, `au moins un` si exactement une l’est, `aucun` sinon. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">u = input("Premier oui/non ? ").strip().lower() == "oui"
v = input("Deuxième oui/non ? ").strip().lower() == "oui"
if u and v:
    print("les deux")
elif u or v:
    print("au moins un")
else:
    print("aucun")</code></pre>
</div>
</details>

**Exercice 20** — Demande un **entier** `n`. Affiche `Fizz` si multiple de 3, `Buzz` si multiple de 5, `FizzBuzz` si les deux, sinon affiche `n` (utilise `elif` pour qu’un seul message s’affiche). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = int(input("n ? "))
if n % 15 == 0:
    print("FizzBuzz")
elif n % 3 == 0:
    print("Fizz")
elif n % 5 == 0:
    print("Buzz")
else:
    print(n)</code></pre>
</div>
</details>

## Suite du parcours

Les [boucles](/python-boucles-for-while/) (leçon 5) **répètent** des actions : plusieurs essais au « plus ou moins », parcourir une liste de notes, etc. Les conditions que tu viens d’apprendre s’y **combinent** à merveille.

<div class="article-cta-row">
<a class="article-cta article-cta--primary" href="/python-boucles-for-while/">Leçon 5 — Boucles</a>
<a class="article-cta article-cta--secondary" href="/programmation/python/">Parcours Python</a>
</div>

## Amazon (partenaire)

- [Algorithmique et Python débutant](https://www.amazon.fr/s?k=algorithmique+python+d%C3%A9butant&tag=manuso06-21)
