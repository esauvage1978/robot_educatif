---
title: "Python intermédiaire — tests automatisés et qualité de code"
description: "Tests automatisés : assert, unittest, pytest, structure des tests ; analyse statique (ruff/flake8) ; pourquoi tester et ressources ; 20 exercices."
pubDate: 2026-03-29
updatedDate: 2026-03-29
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Python intermédiaire
seriesOrder: 5
tags: ["Python", "Programmation", "Bonnes pratiques"]
relatedLinks:
  - title: "Leçon 4 — classes et POO"
    href: "/python-inter-poo-classes/"
  - title: "Leçon 6 — expressions régulières"
    href: "/python-inter-regex-re/"
categories:
  - "Python"
  - "Programmation"
  - "Tutoriel"
  - "Intermédiaire"
---
Écrire des **tests automatisés**, c’est capturer **le comportement attendu** sous forme de code qui peut être **relancé** à volonté (localement, en **CI** avant fusion). Quand tu modifies une fonction, les tests signalent **régressions** : soit le comportement a changé par erreur, soit il faut **mettre à jour** le test pour refléter une nouvelle règle métier. Sans filet de tests, une « petite correction » peut **casser un autre module** sans que tu t’en rendes compte avant la mise en production.

On distingue souvent les **tests unitaires** (une unité isolée, souvent une fonction ou une classe avec dépendances simulées), les **tests d’intégration** (plusieurs composants ensemble), et les **tests bout-en-bout** (application réelle). Ce cours se concentre sur les **bases** des tests unitaires et sur l’**analyse statique** (linters), complémentaire : le linter trouve du code **suspect** sans l’exécuter ; les tests vérifient la **logique** avec des exemples.

## 1. `assert` : garde-fou rapide

```python
assert doubler(2) == 4
```

Une condition **`assert`** lève **`AssertionError`** si elle est fausse. **Attention** : avec **`python -O`** (optimisation), Python **supprime** les `assert` : ne t’appuie pas sur eux pour des **vérifications de sécurité** en production. Pour une **suite de tests** sérieuse, utilise **`unittest`** ou **`pytest`**.

## 2. `unittest` : style « classe de tests »

Le module **`unittest`** imite les conventions **xUnit** : une classe hérite de **`TestCase`**, les méthodes **`test_*`** contiennent les scénarios, et des méthodes comme **`assertEqual`** produisent des messages d’erreur **structurés**.

```python
import unittest

class TestMath(unittest.TestCase):
    def test_carre(self):
        self.assertEqual(3 * 3, 9)

if __name__ == "__main__":
    unittest.main()
```

**Découverte** : `unittest` trouve les tests par **nommage** et par **héritage** ; lancer le fichier exécute **`unittest.main()`**.

## 3. `pytest` : assertions libres et découverte

**`pytest`** est très utilisé dans l’écosystème actuel : tu peux écrire des fonctions **`test_*`** avec de simples **`assert`**, sans sous-classe obligatoire. La découverte automatique parcourt les dossiers **`test_*.py`** ou **`tests/`**.

Fichier **`test_foo.py`** :

```python
def doubler(x):
    return x * 2

def test_doubler():
    assert doubler(3) == 6
```

Lancer : **`pytest`** (à installer dans le venv : **`pip install pytest`**).

**Bonnes pratiques** : un nom de test **`test_*`** **explicite** (`test_doubler_positif`) ; regrouper les fichiers dans **`tests/`** pour séparer **code applicatif** et **code de test**. Les **fixtures** `pytest` permettent de préparer des données réutilisables — à explorer après les bases.

## 4. Qualité statique (linters)

Des outils comme **`ruff`** (rapide, nombreuses règles) ou **`flake8`** (style PEP 8, imports, complexité) **analysent le texte source** et signalent incohérences, imports inutilisés, ou erreurs évidentes **sans exécuter** tout le programme. Ce n’est **pas** un substitut aux tests : un code « propre » peut encore être **fonctionnellement faux**. Combine **linters + tests** pour un bon équilibre **style / correction**.

## Ressources externes

- **[unittest — documentation](https://docs.python.org/fr/3/library/unittest.html)** (FR).
- **[pytest — documentation](https://docs.pytest.org/en/stable/)** : guide de démarrage et bonnes pratiques.
- **[Python Packaging User Guide](https://packaging.python.org/)** : contexte sur les projets installables et les dépendances de test.
- **[Ruff](https://docs.astral.sh/ruff/)** : linter / formateur rapide (alternative moderne à une pile flake8 + isort séparée).

## Exercices (20)

Les exercices alternent **`assert`**, **`unittest`** et ébauches **`pytest`**. Les **solutions** sont masquées par défaut.

### Niveau simple

**Exercice 1** — Écris **`assert 1 + 1 == 2`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">assert 1 + 1 == 2</code></pre>
</div>
</details>

**Exercice 2** — Test **`unittest`** : **`self.assertTrue(3 > 2)`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import unittest

class T(unittest.TestCase):
    def test_ok(self):
        self.assertTrue(3 > 2)</code></pre>
</div>
</details>

**Exercice 3** — **`self.assertEqual(a, b)`** avec **`a=5`**, **`b=5`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import unittest
unittest.TestCase().assertEqual(5, 5)</code></pre>
</div>
</details>

**Exercice 4** — Fonction **`pair(n)`** ; test **`pytest`** **`assert pair(2) is True`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def pair(n):
    return n % 2 == 0

def test_pair():
    assert pair(2) is True</code></pre>
</div>
</details>

**Exercice 5** — **`self.assertRaises(ValueError, int, "abc")`** en **unittest**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import unittest
unittest.TestCase().assertRaises(ValueError, int, "abc")</code></pre>
</div>
</details>

**Exercice 6** — Nomme **deux** avantages des tests automatiques (phrases courtes). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Détecter les régressions après refactor.
# Documenter le comportement attendu par des exemples exécutables.</code></pre>
</div>
</details>

**Exercice 7** — Pourquoi ne pas se fier uniquement aux **`print`** pour valider ? <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Non rejouable automatiquement ; oubli facile avant commit.</code></pre>
</div>
</details>

### Niveau intermédiaire

**Exercice 8** — **`pytest.raises`** pour vérifier **`ZeroDivisionError`** sur **`1/0`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import pytest

def test_zero():
    with pytest.raises(ZeroDivisionError):
        1 / 0</code></pre>
</div>
</details>

**Exercice 9** — Fixture **`pytest`** simple : fonction **`donnee()`** qui retourne **`[1,2,3]`** via **`@pytest.fixture`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import pytest

@pytest.fixture
def donnee():
    return [1, 2, 3]

def test_len(donnee):
    assert len(donnee) == 3</code></pre>
</div>
</details>

**Exercice 10** — **`setUp`** dans **`unittest.TestCase`** pour initialiser une ressource. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import unittest

class T(unittest.TestCase):
    def setUp(self):
        self.x = 10

    def test_x(self):
        self.assertEqual(self.x, 10)</code></pre>
</div>
</details>

**Exercice 11** — Bonne pratique : un test doit vérifier **une** chose principale — reformule en une phrase. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Un échec de test doit indiquer clairement quelle hypothèse est fausse.</code></pre>
</div>
</details>

**Exercice 12** — Test paramétré **`pytest.mark.parametrize`** avec entrées **`(0,0)`**, **`(1,2)`** pour **`f(a,b)=a+b`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import pytest

@pytest.mark.parametrize("a,b,r", [(0, 0, 0), (1, 2, 3)])
def test_add(a, b, r):
    assert a + b == r</code></pre>
</div>
</details>

**Exercice 13** — Différence entre **test unitaire** et **test d’intégration** (réponse courte). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Unitaire : une fonction isolée ; intégration : plusieurs modules ou E/S réelles.</code></pre>
</div>
</details>

**Exercice 14** — Pourquoi **`ruff check .`** avant un commit peut sauver du temps ? <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Attrape typos, imports inutilisés et style avant exécution complète.</code></pre>
</div>
</details>

### Niveau difficile

**Exercice 15** — **`mock.patch`** : idée seulement — à quoi sert **`unittest.mock`** pour tester du code qui appelle le réseau ? <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Remplacer temporairement une dépendance (ex. requests.get) par une réponse fictive.</code></pre>
</div>
</details>

**Exercice 16** — Stratégie **TDD** en trois mots d’étape (commentaire). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Rouge : écrire un test qui échoue. Vert : code minimal. Refactor : nettoyer.</code></pre>
</div>
</details>

**Exercice 17** — Couverture **`pytest-cov`** : que mesure **`--cov`** ? <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Pourcentage de lignes exécutées pendant les tests (indicateur, pas preuve de qualité).</code></pre>
</div>
</details>

**Exercice 18** — Test **`approx`** pour flottants : **`pytest.approx(0.1 + 0.2)`** vs **`0.3`**. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import pytest
assert 0.1 + 0.2 == pytest.approx(0.3)</code></pre>
</div>
</details>

**Exercice 19** — Évite les tests **non déterministes** : donne un exemple de mauvaise pratique. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># assert time.time() == ... ou dépendre de l'ordre des fichiers sans tri.</code></pre>
</div>
</details>

**Exercice 20** — Checklist **avant PR** : liste **quatre** éléments (tests, lint, doc, format). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Tests verts localement ; ruff/flake8 OK ; changelog ou docstring mise à jour ; format black si équipe.</code></pre>
</div>
</details>

## Suite du parcours

[Expressions régulières](/python-inter-regex-re/) : chercher et valider des motifs dans du texte.

## Amazon (partenaire)

- [Tests logiciels Python](https://www.amazon.fr/s?k=tests+logiciels+python+livre&tag=manuso06-21)
