---
title: "Python — listes et chaînes de caractères"
description: "Indices, slicing, méthodes list et str ; parcourir, modifier une liste ; split, join, strip ; idée de compréhension de liste ; 20 exercices avec solutions repliables."
pubDate: 2026-03-28
updatedDate: 2026-03-29
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Python
seriesOrder: 7
tags: ["Python", "Programmation"]
relatedLinks:
  - title: "Leçon 6 — fonctions"
    href: "/python-fonctions/"
  - title: "Leçon 8 — fichiers texte"
    href: "/python-fichiers-texte/"
categories:
  - "Python"
  - "Programmation"
  - "Tutoriel"
  - "Intermédiaire"
---
Les **listes** regroupent plusieurs valeurs dans un **ordre** (souvent homogènes : des nombres, des noms…). Les **chaînes** (`str`) se manipulent aussi par **indices** et **tranches**, mais sont **immuables** : une méthode comme `lower()` renvoie une **nouvelle** chaîne plutôt que de « modifier sur place » la variable.

## 1. Listes : indices et tranches

L’index du **premier** élément est **0**. L’index **-1** désigne le **dernier**.

```python
scores = [12, 15, 9]
scores.append(18)
print(scores[0])       # 12
print(scores[-1])      # 18
print(scores[1:3])     # [15, 9] — tranche : indice 1 inclus, 3 exclu
```

**Quelques méthodes utiles** : `append(x)`, `pop()` (retire souvent le dernier), `insert(i, x)`, `len(scores)`.

## 2. Parcourir une liste

Avec une [boucle](/python-boucles-for-while/) :

```python
total = 0
for s in scores:
    total += s
print(total)           # ou directement sum(scores)
```

## 3. Chaînes : nettoyage et découpage

```python
s = "  Robot  "
print(s.strip().lower())       # "robot"
morceaux = "a,b,c".split(",")  # ['a', 'b', 'c']
print("-".join(morceaux))      # a-b-c
```

**Tester une sous-chaîne** : `if "bot" in s:`.

## 4. Inverser une chaîne

Deux approches courantes en début de parcours :

```python
mot = "Python"
print(mot[::-1])    # slicing : pas -1 → ordre inverse
```

Ou une boucle qui construit caractère par caractère.

## 5. Compréhension de liste (aperçu)

Façon compacte de construire une liste à partir d’une autre séquence :

```python
nombres = [1, 2, 3, 4, 5]
carres = [n * n for n in nombres]
```

Tu n’es pas obligé de t’en servir tout de suite ; garde l’idée pour alléger certaines boucles plus tard.

## Exercices (20)

Chaque exercice reprend les **listes** et **chaînes** de la leçon (indices, tranches, `append`, `split`, `join`, etc.). Les **solutions** sont masquées par défaut : clique sur **Afficher la solution** pour comparer ton code.

### Niveau simple

**Exercice 1** — Crée **`nombres = [3, 7, 1]`** et affiche sa **longueur** avec **`len`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">nombres = [3, 7, 1]
print(len(nombres))</code></pre>
</div>
</details>

**Exercice 2** — Avec **`scores = [10, 14, 9]`**, affiche le **premier** et le **dernier** élément (indices **`0`** et **`-1`**). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">scores = [10, 14, 9]
print(scores[0])
print(scores[-1])</code></pre>
</div>
</details>

**Exercice 3** — Part de **`xs = [1, 2]`**, ajoute **`5`** à la fin avec **`append`**, puis affiche la liste. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">xs = [1, 2]
xs.append(5)
print(xs)</code></pre>
</div>
</details>

**Exercice 4** — Calcule la **somme** des éléments de **`[4, 1, 3]`** avec une boucle **`for`** et une variable **`total`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">total = 0
for x in [4, 1, 3]:
    total += x
print(total)</code></pre>
</div>
</details>

**Exercice 5** — À partir de **`"a,b,c"`**, obtiens une **liste** de trois chaînes avec **`split(",")`** et affiche-la. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">parts = "a,b,c".split(",")
print(parts)</code></pre>
</div>
</details>

**Exercice 6** — Pour **`s = "  HELLO  "`**, affiche la chaîne en **minuscules** sans espaces au début ni à la fin (**`strip`** et **`lower`**). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">s = "  HELLO  "
print(s.strip().lower())</code></pre>
</div>
</details>

**Exercice 7** — Avec **`mots = ["un", "deux", "trois"]`**, affiche une seule ligne **`un / deux / trois`** en utilisant **`join`** avec **`" / "`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">mots = ["un", "deux", "trois"]
print(" / ".join(mots))</code></pre>
</div>
</details>

### Niveau intermédiaire

**Exercice 8** — Pour **`lettres = ["a", "b", "c", "d", "e"]`**, affiche la **tranche** des indices **1** à **3** exclus (résultat attendu : **`b`** et **`c`**). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">lettres = ["a", "b", "c", "d", "e"]
print(lettres[1:3])</code></pre>
</div>
</details>

**Exercice 9** — Demande une **phrase** et affiche combien de fois la lettre **`a`** apparaît (minuscule uniquement), avec **`.count("a")`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">phrase = input("Phrase ? ")
print(phrase.count("a"))</code></pre>
</div>
</details>

**Exercice 10** — Demande une **chaîne** et affiche-la **à l’envers** avec le **slicing** **`[::-1]`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">s = input("Texte ? ")
print(s[::-1])</code></pre>
</div>
</details>

**Exercice 11** — Crée **`nombres = [1, 2, 3, 4, 5]`** puis une nouvelle liste **`carres`** avec une **compréhension** : le carré de chaque **`n`** dans **`nombres`**. Affiche **`carres`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">nombres = [1, 2, 3, 4, 5]
carres = [n * n for n in nombres]
print(carres)</code></pre>
</div>
</details>

**Exercice 12** — Part de **`xs = [10, 20, 30]`** : retire le **dernier** élément avec **`pop()`**, affiche l’élément retiré puis la liste mise à jour. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">xs = [10, 20, 30]
dernier = xs.pop()
print(dernier)
print(xs)</code></pre>
</div>
</details>

**Exercice 13** — Insère **`"x"`** à l’indice **0** dans **`["a", "b"]`** avec **`insert`**, puis affiche la liste. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">xs = ["a", "b"]
xs.insert(0, "x")
print(xs)</code></pre>
</div>
</details>

**Exercice 14** — Demande une **chaîne** `s` et un **mot** `m` ; affiche **`oui`** si **`m`** est **contenu** dans **`s`** (opérateur **`in`**), sinon **`non`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">s = input("Phrase ? ")
m = input("Mot ? ")
if m in s:
    print("oui")
else:
    print("non")</code></pre>
</div>
</details>

### Niveau difficile

**Exercice 15** — À partir de **`"pomme,poire,banane"`**, obtiens une **liste** de trois fruits, puis réaffiche-les sur **une ligne**, séparés par **` | `**, avec **`join`**. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">fruits = "pomme,poire,banane".split(",")
print(" | ".join(fruits))</code></pre>
</div>
</details>

**Exercice 16** — Liste **`notes = [12, 15, 9, 14]`** : calcule la **moyenne** (somme des éléments divisée par le nombre d’éléments), en **`float`**. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">notes = [12, 15, 9, 14]
moyenne = sum(notes) / len(notes)
print(moyenne)</code></pre>
</div>
</details>

**Exercice 17** — Compte combien de **voyelles** (**a, e, i, o, u** en minuscules) figurent dans une chaîne saisie (parcours **`for c in texte`** et test sur **`c.lower()`**). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">texte = input("Texte ? ")
voy = "aeiou"
n = 0
for c in texte:
    if c.lower() in voy:
        n += 1
print(n)</code></pre>
</div>
</details>

**Exercice 18** — Construis une **nouvelle liste** contenant uniquement les **pairs** de **`[1, 2, 3, 4, 5, 6]`** avec une **compréhension** (condition **`n % 2 == 0`**). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">pairs = [n for n in [1, 2, 3, 4, 5, 6] if n % 2 == 0]
print(pairs)</code></pre>
</div>
</details>

**Exercice 19** — Demande une phrase, découpe-la en **mots** avec **`split()`** (espaces), affiche le **nombre de mots**. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">phrase = input("Phrase ? ")
mots = phrase.split()
print(len(mots))</code></pre>
</div>
</details>

**Exercice 20** — Demande une **chaîne** et indique si c’est un **palindrome** (identique à l’envers), en comparant **`s`** et **`s[::-1]`** (tu peux passer **`s`** en minuscules pour ignorer la casse). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">s = input("Mot ou phrase ? ").strip().lower()
if s == s[::-1]:
    print("palindrome")
else:
    print("non")</code></pre>
</div>
</details>

## Suite du parcours

Lire et écrire des **fichiers texte** ([leçon 8](/python-fichiers-texte/)) permet de sauver des listes (scores, pseudos) sur le disque.

## Amazon (partenaire)

- [Structures de données Python](https://www.amazon.fr/s?k=structures+de+donn%C3%A9es+python&tag=manuso06-21)
