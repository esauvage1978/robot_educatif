---
title: "Python input et types (3/10) : saisie clavier, int, float — débutant"
headline: "Apprendre Python (3/10) : Types et Saisie (Créer un Programme Interactif)"
description: "Python input pour débutants : types int float str, saisie utilisateur, conversions. Apprendre Python avec un programme interactif — leçon 3/10, 20 exercices."
pubDate: "2026-03-28"
updatedDate: "2026-04-18"
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Python
seriesOrder: 3
tags: ["Python", "Programmation"]
relatedLinks:
  - title: "Leçon 2 — variables et affichage"
    href: "/python-variables-affichage/"
  - title: "Leçon 4 — conditions if / else"
    href: "/python-conditions-if-else/"
  - title: "Parcours Python (10 leçons)"
    href: "/programmation/python/"
categories:
  - "Python"
  - "Programmation"
  - "Tutoriel"
  - "Débutant"
faqSchema:
  - question: "Comment utiliser input en Python ?"
    answer: "On écrit variable = input(\"Question ? \"). La fonction affiche le message, attend que l’utilisateur tape une ligne et valide, puis renvoie toujours une chaîne de caractères (str)."
  - question: "Quels sont les types Python les plus utiles au début ?"
    answer: "int pour les entiers, float pour les nombres à virgule, str pour le texte, bool pour vrai ou faux. input() renvoie toujours du str : il faut souvent convertir avec int() ou float() pour calculer."
  - question: "Python débutant saisie : pourquoi convertir après input ?"
    answer: "Parce que input renvoie du texte. Pour additionner deux nombres saisis, il faut int(input(...)) ou float(input(...)), sinon Python colle ou concatène du texte au lieu de calculer."
  - question: "Comment apprendre Python débutant avec des programmes interactifs ?"
    answer: "Enchaîner input, conversions et print : poser une question, stocker la réponse, afficher un message ou un calcul. Cette leçon propose 20 exercices progressifs avec solutions."
---

Ton programme ne va plus seulement **afficher** ce que tu as écrit dans le fichier…  
👉 Il va maintenant **te poser des questions** — comme un petit robot qui **écoute** puis **répond**. Bienvenue dans le monde du **`python input`** et des **types** : tu crées enfin un **programme interactif**.

**Promesse :** en suivant les missions, tu comprends **pourquoi** `input()` ramène du **texte**, comment passer à un **nombre** (`int`, `float`), et comment éviter le piège du `"3" + "5"` qui fait `"35"`. Parfait pour **apprendre python débutant** sans tableau noir interminable.

Tu maîtrises déjà les variables et `print` ([leçon 2](/python-variables-affichage/)). Ici, la **saisie utilisateur** change tout : **toi** (ou un camarade) devient partie du programme. Les **python types** servent ensuite à dire à Python : « ce texte, c’est en fait un entier » avant d’enchaîner avec les [conditions](/python-conditions-if-else/) à la leçon 4.

![Console Python](../../assets/programmation/python-terminal.svg)

<div class="article-cta-row">
<a class="article-cta article-cta--primary" href="/python-variables-affichage/">Leçon 2 — Variables</a>
<a class="article-cta article-cta--secondary" href="/programmation/python/">Série Python</a>
</div>

---

## 🎮 Partie 1 — Mission 1 : parler avec l’ordinateur

### 🎯 Objectif

**Faire entrer** une information au clavier et la **récupérer** dans une variable.

### 💻 Code minute

```python
prenom = input("Quel est ton prénom ? ")
print(prenom)
```

Lance le script : Python **affiche la question**, tu **tapes** ton prénom, tu valides (Entrée), puis il **réaffiche** ce que tu as écrit.  
Tu viens de faire : **utilisateur → programme** — la base de toute **saisie** en **python débutant**.

---

## 🎮 Partie 2 — Mission 2 : les types (sans prise de tête)

Python range chaque valeur dans une **famille** — un **type**. Au début, retiens surtout :

| Type | À quoi ça sert ? | Exemples |
| --- | --- | --- |
| `int` | entier (sans virgule) | `42`, `-3`, `0` |
| `float` | nombre à virgule | `3.14`, `2.0` |
| `str` | texte | `"salut"`, `'42'` |
| `bool` | vrai / faux | `True`, `False` |

Pour **voir** le type d’une valeur pendant que tu apprends :

```python
x = 10
y = "10"
print(type(x), type(y))  # int et str — pas la même chose !
```

👉 **À retenir :** en pratique, les **types** servent surtout à savoir si tu manipules du **texte** ou des **nombres** — et à ne pas confondre les deux.

---

## 🎮 Partie 3 — Mission 3 : `input()` = toujours du texte (str)

Peu importe ce que tu tapes : **âge**, **note**, **prix**… `input()` renvoie **toujours** une **`str`**. Pour **calculer**, il faut **convertir** :

```python
reponse = input("Un nombre entier ? ")
n = int(reponse)
print(f"Le suivant est {n + 1}")
```

Tu peux aussi écrire en une ligne : `n = int(input("..."))` une fois à l’aise.

### Nettoyer la saisie : `strip()`

Les espaces en trop avant/après arrivent souvent. Beaucoup de scripts font :

```python
texte = input("Ville ? ").strip()
```

`strip()` enlève espaces et retours ligne **en début et fin** de chaîne.

---

## 🎮 Partie 4 — Conversions express

- **`int("42")`** → `42` — plante si ce n’est pas un entier propre (`"3.5"` ou `"douze"` → erreur **`ValueError`**).
- **`float("3.5")`** → nombre décimal.
- **`str(2026)`** → `"2026"` pour coller du texte et des nombres sans surprise.

**Règle d’or :** dès que tu veux **additionner ou multiplier** à partir d’une saisie, **`int()`** ou **`float()`** après `input()`.

---

## 🎮 Partie 5 — `bool` (aperçu)

Les comparaisons (`==`, `<`, …) donnent déjà **`True`** ou **`False`**. Tu utiliseras ça partout dès la [leçon 4 — if / else](/python-conditions-if-else/). Pour l’instant, note juste : **bool** = réponse oui/non du programme.

---

## ⚠️ Piège dont tout le monde rit… puis pleure

`"3" + "5"` donne **`"35"`** (texte collé), pas `8`. Pour une **vraie** somme :

```python
a = int(input("Premier nombre ? "))
b = int(input("Deuxième nombre ? "))
print(a + b)
```

Si quelqu’un tape `3.5` alors que tu voulais un **`int`**, Python peut lever une erreur — la [leçon 9](/python-erreurs-debogage/) montrera comment **rattraper** ça avec `try` / `except`.

---

## 🤖 Résumé rapide (révision / IA)

- **`input("...")`** → toujours une **chaîne** ; interaction **question / réponse**.  
- **`int` / `float` / `str`** → **types** ; conversions explicites pour calculer.  
- **`strip()`** → saisie plus propre.  
- Suite logique : **conditions** avec la [leçon 4](/python-conditions-if-else/).

---

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

**Mission suivante :** la [leçon 4 — if / else](/python-conditions-if-else/) utilise tes **nombres** et **textes** pour **décider** : pair ou impair, menu, note minimale… Tu auras enfin le « si … sinon » pour compléter tes programmes **interactifs**.

<div class="article-cta-row">
<a class="article-cta article-cta--primary" href="/python-conditions-if-else/">Leçon 4 — Conditions</a>
<a class="article-cta article-cta--secondary" href="/programmation/python/">Hub Python</a>
</div>

## Amazon (partenaire)

- [Exercices et problèmes Python](https://www.amazon.fr/s?k=exercices+python+livre&tag=manuso06-21)
