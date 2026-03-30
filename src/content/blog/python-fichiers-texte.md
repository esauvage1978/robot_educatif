---
title: "Python — lire et écrire des fichiers texte"
description: "open avec with, modes r / w / a, encoding utf-8, read et readlines, écriture ligne par ligne ; fichier manquant et bonnes habitudes ; 20 exercices avec solutions repliables."
pubDate: 2026-03-28
updatedDate: 2026-03-29
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Python
seriesOrder: 8
tags: ["Python", "Programmation"]
relatedLinks:
  - title: "Leçon 7 — listes et chaînes"
    href: "/python-listes-et-chaines/"
  - title: "Leçon 9 — erreurs et débogage"
    href: "/python-erreurs-debogage/"
categories:
  - "Python"
  - "Programmation"
  - "Fichiers"
  - "Intermédiaire"
---
Les **fichiers** permettent de **conserver** des données entre deux exécutions du programme (scores, préférences, journaux). En Python, on ouvre un fichier avec **`open`**, mais la forme recommandée est le bloc **`with`** : le fichier est **fermé automatiquement**, même si une erreur survient au milieu.

## 1. Où se trouve le fichier ?

Par défaut, Python cherche le fichier **dans le répertoire de travail** (souvent le dossier où tu lances `python script.py`). Pour les premiers exercices, mets le `.txt` **à côté** de ton script ou indique un chemin clair.

## 2. Lire tout le contenu

```python
with open("notes.txt", "r", encoding="utf-8") as f:
    contenu = f.read()
print(contenu)
```

- **`"r"`** : lecture (*read*).
- **`encoding="utf-8"`** : accents et caractères spéciaux corrects (habitude à prendre dès le début).

## 3. Lire ligne par ligne

```python
with open("notes.txt", "r", encoding="utf-8") as f:
    for ligne in f:
        print(ligne.strip())
```

Ou `lignes = f.readlines()` pour obtenir une **liste** de chaînes (souvent avec `\n` en fin : pense à `strip()`).

## 4. Écrire (écraser ou créer)

```python
with open("sortie.txt", "w", encoding="utf-8") as f:
    f.write("ligne 1\n")
    f.write("ligne 2\n")
```

**`"w"`** : le fichier est **recréé** (contenu précédent perdu). Pour **ajouter** à la fin sans tout effacer, utilise **`"a"`** (*append*) :

```python
with open("invites.txt", "a", encoding="utf-8") as f:
    f.write("Nouveau prénom\n")
```

## 5. Fichier introuvable

Si le nom est faux ou le fichier absent, Python lève **`FileNotFoundError`**. Tu pourras intercepter cette erreur avec **`try` / `except`** ([leçon 9](/python-erreurs-debogage/)).

## Exercices (20)

Place les **fichiers** dans le même dossier que ton script quand l’énoncé le suppose (ex. **`notes.txt`**). Les **solutions** sont masquées par défaut : clique sur **Afficher la solution** pour comparer ton code.

### Niveau simple

**Exercice 1** — Ouvre **`hello.txt`** en lecture (**`"r"`**, **`encoding="utf-8"`**), lis **tout** le contenu avec **`read()`**, puis affiche-le. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">with open("hello.txt", "r", encoding="utf-8") as f:
    contenu = f.read()
print(contenu)</code></pre>
</div>
</details>

**Exercice 2** — Compte le **nombre de lignes** d’un fichier texte en parcourant **`for ligne in f:`** (crée au préalable un **`data.txt`** avec plusieurs lignes). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = 0
with open("data.txt", "r", encoding="utf-8") as f:
    for _ in f:
        n += 1
print(n)</code></pre>
</div>
</details>

**Exercice 3** — Crée (ou écrase) **`sortie.txt`** en mode **`"w"`** et écris **deux** lignes avec **`write`**, en terminant chaque ligne par **`"\n"`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">with open("sortie.txt", "w", encoding="utf-8") as f:
    f.write("ligne 1\n")
    f.write("ligne 2\n")</code></pre>
</div>
</details>

**Exercice 4** — **Ajoute** une ligne **`"nouveau\n"`** à la fin de **`log.txt`** en mode **`"a"`** (**append**). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">with open("log.txt", "a", encoding="utf-8") as f:
    f.write("nouveau\n")</code></pre>
</div>
</details>

**Exercice 5** — Lis un fichier en entier et affiche le **nombre de caractères** du texte lu (**`len`** sur le résultat de **`read()`**). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">with open("notes.txt", "r", encoding="utf-8") as f:
    contenu = f.read()
print(len(contenu))</code></pre>
</div>
</details>

**Exercice 6** — Parcours un fichier **ligne par ligne** et affiche chaque ligne **sans** le saut de ligne final grâce à **`strip()`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">with open("data.txt", "r", encoding="utf-8") as f:
    for ligne in f:
        print(ligne.strip())</code></pre>
</div>
</details>

**Exercice 7** — Utilise **`readlines()`** pour obtenir une **liste** de lignes, puis affiche le **nombre d’éléments** de cette liste. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">with open("data.txt", "r", encoding="utf-8") as f:
    lignes = f.readlines()
print(len(lignes))</code></pre>
</div>
</details>

### Niveau intermédiaire

**Exercice 8** — **Copie** le contenu de **`source.txt`** vers **`dest.txt`** en lisant tout le texte puis en l’écrivant en mode **`"w"`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">with open("source.txt", "r", encoding="utf-8") as f:
    texte = f.read()
with open("dest.txt", "w", encoding="utf-8") as f:
    f.write(texte)</code></pre>
</div>
</details>

**Exercice 9** — Demande un **prénom** à l’utilisateur et **ajoute-le** à la fin de **`invites.txt`** (mode **`"a"`**), avec un **saut de ligne** après le prénom. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">prenom = input("Prénom ? ")
with open("invites.txt", "a", encoding="utf-8") as f:
    f.write(prenom + "\n")</code></pre>
</div>
</details>

**Exercice 10** — Lis **`entree.txt`** et affiche **uniquement la première ligne** (tu peux utiliser **`readline()`** ou **`read().splitlines()[0]`** si le fichier n’est pas vide). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">with open("entree.txt", "r", encoding="utf-8") as f:
    premiere = f.readline().strip()
print(premiere)</code></pre>
</div>
</details>

**Exercice 11** — Affiche **uniquement la dernière ligne** d’un fichier non vide en parcourant les lignes et en **mémorisant** la dernière lue. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">derniere = ""
with open("journal.txt", "r", encoding="utf-8") as f:
    for ligne in f:
        derniere = ligne
print(derniere.strip())</code></pre>
</div>
</details>

**Exercice 12** — Écris une **liste** de trois chaînes dans **`liste.txt`**, **une par ligne**, avec une boucle **`for`** et **`write`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">items = ["pomme", "poire", "banane"]
with open("liste.txt", "w", encoding="utf-8") as f:
    for x in items:
        f.write(x + "\n")</code></pre>
</div>
</details>

**Exercice 13** — Lis tout le fichier, puis utilise **`splitlines()`** pour obtenir une liste de lignes **sans** les caractères de fin de ligne ; affiche cette liste. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">with open("data.txt", "r", encoding="utf-8") as f:
    texte = f.read()
lignes = texte.splitlines()
print(lignes)</code></pre>
</div>
</details>

**Exercice 14** — Copie **`a.txt`** vers **`b.txt`** **ligne par ligne** (lecture avec **`for ligne in f`**, écriture de chaque ligne dans le second fichier). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">with open("a.txt", "r", encoding="utf-8") as src, open("b.txt", "w", encoding="utf-8") as dst:
    for ligne in src:
        dst.write(ligne)</code></pre>
</div>
</details>

### Niveau difficile

**Exercice 15** — Compte les lignes **non vides** (après **`strip()`**, la chaîne ne doit pas être vide). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = 0
with open("data.txt", "r", encoding="utf-8") as f:
    for ligne in f:
        if ligne.strip():
            n += 1
print(n)</code></pre>
</div>
</details>

**Exercice 16** — Lis **`texte.txt`** et écris **`majuscules.txt`** avec le même contenu passé en **`upper()`**. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">with open("texte.txt", "r", encoding="utf-8") as f:
    contenu = f.read()
with open("majuscules.txt", "w", encoding="utf-8") as f:
    f.write(contenu.upper())</code></pre>
</div>
</details>

**Exercice 17** — Demande un **nom de fichier** et un **texte** ; crée ce fichier en **`"w"`** avec ce texte (un seul **`write`**). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">nom = input("Nom du fichier ? ")
texte = input("Contenu ? ")
with open(nom, "w", encoding="utf-8") as f:
    f.write(texte)</code></pre>
</div>
</details>

**Exercice 18** — À partir d’une liste **`nombres = [1, 2, 3]`**, écris **`nums.txt`** en mettant **un nombre par ligne** (convertis chaque élément avec **`str`** avant écriture). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">nombres = [1, 2, 3]
with open("nums.txt", "w", encoding="utf-8") as f:
    for n in nombres:
        f.write(str(n) + "\n")</code></pre>
</div>
</details>

**Exercice 19** — Lis **`entiers.txt`** (une ligne = un entier), construis une liste d’**entiers** avec **`int`** sur chaque ligne **`strip()`**, puis affiche la **somme** (**`sum`**). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">vals = []
with open("entiers.txt", "r", encoding="utf-8") as f:
    for ligne in f:
        vals.append(int(ligne.strip()))
print(sum(vals))</code></pre>
</div>
</details>

**Exercice 20** — Combine **`read().splitlines()`** et **`" | ".join(...)`** pour lire un fichier dont chaque ligne est un mot, puis écrire **`resume.txt`** contenant **une seule ligne** avec les mots séparés par **` | `**. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">with open("mots.txt", "r", encoding="utf-8") as f:
    mots = f.read().splitlines()
ligne = " | ".join(mots)
with open("resume.txt", "w", encoding="utf-8") as f:
    f.write(ligne + "\n")</code></pre>
</div>
</details>

## Suite du parcours

Gérer proprement les **erreurs** ([leçon 9](/python-erreurs-debogage/)) évite que ton programme plante brutalement si un fichier manque ou si la conversion d’un nombre échoue.

## Amazon (partenaire)

- [Python fichiers données CSV](https://www.amazon.fr/s?k=python+donn%C3%A9es+fichiers+livre&tag=manuso06-21)
