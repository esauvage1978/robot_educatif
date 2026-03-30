---
title: "Python intermédiaire — classes et programmation orientée objet"
description: "POO en Python : classes, __init__, self, méthodes, encapsulation par convention ; CapWords (PEP 8) ; dataclasses évoquées ; ressources ; 20 exercices."
pubDate: 2026-03-29
updatedDate: 2026-03-29
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Python intermédiaire
seriesOrder: 4
tags: ["Python", "Programmation", "Bonnes pratiques"]
relatedLinks:
  - title: "Leçon 3 — pathlib"
    href: "/python-inter-pathlib/"
  - title: "Leçon 5 — tests et qualité"
    href: "/python-inter-tests-qualite/"
categories:
  - "Python"
  - "Programmation"
  - "Tutoriel"
  - "Intermédiaire"
---
En **programmation orientée objet**, une **classe** est un **modèle** (un « moule ») à partir duquel on crée des **instances** : chaque instance possède son **état** (valeurs des attributs) et partage le **comportement** défini par les **méthodes**. En Python, tout est **objet** (y compris les fonctions et les modules) ; la POO n’est pas obligatoire pour chaque script, mais elle clarifie les gros programmes : **regrouper** ce qui va ensemble, **nommer** les responsabilités, et **réutiliser** des abstractions (héritage, composition — hors périmètre minimal de cette leçon).

Python privilégie la **simplicité** : pas de visibilité `private`/`public` stricte comme en Java ; on s’appuie sur des **conventions** (préfixe `_`) et sur la **discipline** d’équipe. Les **dataclasses** (`@dataclass`) du module **`dataclasses`** réduisent le code répétitif pour de simples « conteneurs de données » — à découvrir une fois **`__init__`** est bien compris.

## 1. Définir une classe et l’initialiseur `__init__`

L’appel **`Point(3, 4)`** crée d’abord une **instance vide** puis invoque **`__init__(self, 3, 4)`** pour **fixer les attributs** sur `self` (l’instance en cours de construction).

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

p = Point(3, 4)
print(p.x, p.y)
```

**`__init__`** n’est pas un **constructeur** au sens C++ : il ne « retourne » pas l’objet ; il **configure** l’instance déjà allouée. D’autres méthodes spéciales (`__new__`) existent pour des cas avancés.

## 2. Méthodes d’instance et `self`

Les **méthodes** définies dans la classe prennent **`self`** en **premier paramètre** : c’est la référence à **l’instance** qui appelle la méthode (`p.norme()` passe `p` comme `self`). Sans `self`, Python ne saurait pas sur **quel** objet travailler.

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def norme(self):
        return (self.x ** 2 + self.y ** 2) ** 0.5
```

**PEP 8** : les **noms de classes** utilisent **`CapWords`** (`MaClasse`) ; les **fonctions et variables** restent en **`snake_case`**. Cela distingue visuellement **types** et **valeurs**.

## 3. `__str__` et lisibilité

Par défaut, `print(p)` affiche une forme peu lisible. **`__str__`** retourne une **chaîne** destinée à l’utilisateur ; **`__repr__`** vise plutôt une représentation **non ambiguë** pour le débogage (souvent `NomChamps(...)`). Pour une première approche, **`__str__`** suffit pour rendre les objets **imprimables** — à définir **dans** la classe, au même niveau que les autres méthodes :

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"Point({self.x}, {self.y})"
```

## 4. Encapsulation « souple » : le préfixe `_`

Python n’empêche pas d’accéder à un attribut « interne » depuis l’extérieur. La convention **`_nom`** ou **`__nom`** (name mangling léger pour les sous-classes) signale : **« API interne, ne pas dépendre pour du code tiers »**. C’est une question de **contrat** documenté, pas de sécurité cryptographique.

## Ressources externes

- **[Classes — tutoriel officiel](https://docs.python.org/fr/3/tutorial/classes.html)** : syntaxe, portée, premiers objets (FR).
- **[Données du modèle](https://docs.python.org/fr/3/reference/datamodel.html)** : méthodes spéciales (`__init__`, `__str__`, etc.).
- **[dataclasses — documentation](https://docs.python.org/fr/3/library/dataclasses.html)** : quand factoriser `__init__` automatiquement.

## Exercices (20)

Les exercices renforcent **`self`**, les attributs et les méthodes. Les **solutions** sont masquées par défaut.

### Niveau simple

**Exercice 1** — Classe **`Compteur`** avec **`total = 0`** dans **`__init__`** et méthode **`plus_un`** qui incrémente **`total`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class Compteur:
    def __init__(self):
        self.total = 0

    def plus_un(self):
        self.total += 1</code></pre>
</div>
</details>

**Exercice 2** — Classe **`Personne`** avec attributs **`nom`** et **`age`** passés au constructeur. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class Personne:
    def __init__(self, nom, age):
        self.nom = nom
        self.age = age</code></pre>
</div>
</details>

**Exercice 3** — Méthode **`presenter(self)`** qui affiche **`Je suis {nom}`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class Personne:
    def __init__(self, nom):
        self.nom = nom

    def presenter(self):
        print(f"Je suis {self.nom}")</code></pre>
</div>
</details>

**Exercice 4** — Crée **`Rectangle`** avec **`largeur`**, **`hauteur`** et méthode **`aire(self)`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class Rectangle:
    def __init__(self, largeur, hauteur):
        self.largeur = largeur
        self.hauteur = hauteur

    def aire(self):
        return self.largeur * self.hauteur</code></pre>
</div>
</details>

**Exercice 5** — Implémente **`__str__`** sur **`Point`** pour afficher **`(x, y)`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"({self.x}, {self.y})"</code></pre>
</div>
</details>

**Exercice 6** — Attribut de **classe** **`nb = 0`** incrémenté à chaque **`__init__`** de **`Jeton`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class Jeton:
    nb = 0

    def __init__(self):
        Jeton.nb += 1</code></pre>
</div>
</details>

**Exercice 7** — Méthode **`deplacer(self, dx, dy)`** sur **`Point`** qui modifie **`x`** et **`y`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def deplacer(self, dx, dy):
        self.x += dx
        self.y += dy</code></pre>
</div>
</details>

### Niveau intermédiaire

**Exercice 8** — Classe **`Banque`** avec solde initial ; méthodes **`depot(montant)`** et **`retrait(montant)`** qui refusent le retrait si solde insuffisant (**`return False`**). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class Banque:
    def __init__(self, solde=0):
        self.solde = solde

    def depot(self, m):
        self.solde += m

    def retrait(self, m):
        if m > self.solde:
            return False
        self.solde -= m
        return True</code></pre>
</div>
</details>

**Exercice 9** — **`@property`** optionnel : transforme **`solde`** en lecture seule via **`@property`** (getter sans setter). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class Compte:
    def __init__(self, solde):
        self._solde = solde

    @property
    def solde(self):
        return self._solde</code></pre>
</div>
</details>

**Exercice 10** — Surcharge **`__eq__`** pour comparer deux **`Point`** par leurs coordonnées. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y</code></pre>
</div>
</details>

**Exercice 11** — Héritage simple : **`Chien(Animal)`** avec **`crier`** qui retourne **`"woof"`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class Animal:
    pass

class Chien(Animal):
    def crier(self):
        return "woof"</code></pre>
</div>
</details>

**Exercice 12** — **`super().__init__(...)`** dans une sous-classe qui ajoute un paramètre. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class A:
    def __init__(self, x):
        self.x = x

class B(A):
    def __init__(self, x, y):
        super().__init__(x)
        self.y = y</code></pre>
</div>
</details>

**Exercice 13** — Bonne pratique : pourquoi **`self`** n’est pas un mot réservé mais une convention ? <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># C'est le premier paramètre des méthodes d'instance ; tout le monde utilise self pour la lisibilité.</code></pre>
</div>
</details>

**Exercice 14** — Méthode **`classmethod`** pour **`from_string(cls, s)`** qui parse **`"3,4"`** en **`Point`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    @classmethod
    def from_string(cls, s):
        a, b = s.split(",")
        return cls(int(a), int(b))</code></pre>
</div>
</details>

### Niveau difficile

**Exercice 15** — Dataclass (**`from dataclasses import dataclass`**) pour **`Carte(valeur, couleur)`** avec **`__repr__`** automatique. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from dataclasses import dataclass

@dataclass
class Carte:
    valeur: str
    couleur: str</code></pre>
</div>
</details>

**Exercice 16** — **`__slots__`** : explique en une phrase à quoi ça sert (mémoire, attributs figés). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Limite les attributs d'instance et réduit la mémoire par objet.</code></pre>
</div>
</details>

**Exercice 17** — Implémente un petit **`Stack`** avec **`push`**, **`pop`**, **`vide`** (liste interne **`_items`**). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class Stack:
    def __init__(self):
        self._items = []

    def push(self, x):
        self._items.append(x)

    def pop(self):
        return self._items.pop()

    def vide(self):
        return len(self._items) == 0</code></pre>
</div>
</details>

**Exercice 18** — Anti-pattern : hériter de **`list`** pour ajouter des méthodes — cite un risque (réponse courte). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Expose toute l'API de list ; préférer la composition (attribut list interne).</code></pre>
</div>
</details>

**Exercice 19** — Méthode spéciale **`__len__(self)`** pour que **`len(obj)`** fonctionne sur une collection maison. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class Paquet:
    def __init__(self, items):
        self._items = items

    def __len__(self):
        return len(self._items)</code></pre>
</div>
</details>

**Exercice 20** — Documente une classe avec **docstring** multi-lignes (**résumé** + **Attributs**). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">class Boite:
    """Petit conteneur nommé.

    Attributs:
        nom: str -- identifiant affichable
    """
    def __init__(self, nom):
        self.nom = nom</code></pre>
</div>
</details>

## Suite du parcours

[Tests et qualité](/python-inter-tests-qualite/) : automatiser les vérifications avec **`pytest`** ou **`unittest`**.

## Amazon (partenaire)

- [Python orienté objet](https://www.amazon.fr/s?k=python+orient%C3%A9+objet+livre&tag=manuso06-21)
