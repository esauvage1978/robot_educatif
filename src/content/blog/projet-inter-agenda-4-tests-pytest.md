---
title: "Projet Agenda CLI (4/6) — tests avec pytest"
headline: "Projet Agenda CLI — tester le service avec pytest, tmp_path et mocks"
description: "Projet Python intermédiaire : écrire des tests pytest pour l’Agenda CLI, utiliser tmp_path, fixtures, pytest.raises, mocks de stockage et préparer une CLI fiable."
pubDate: 2026-03-29
updatedDate: 2026-05-06
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Projet Python intermédiaire — Agenda CLI
seriesOrder: 4
tags: ["Python", "Projet", "pytest"]
relatedLinks:
  - title: "Sommaire — projet Agenda CLI"
    href: "/programmation/projet-python-intermediaire-agenda/"
  - title: "Tests automatisés et qualité Python"
    href: "/python-inter-tests-qualite/"
  - title: "Partie 3 — modèle"
    href: "/projet-inter-agenda-3-modele-poo/"
  - title: "Partie 5 — CLI argparse"
    href: "/projet-inter-agenda-5-cli-argparse/"
  - title: "Environnement virtuel et pip"
    href: "/python-inter-venv-pip/"
categories:
  - "Python"
  - "Programmation"
  - "Projet"
  - "Intermédiaire"
faqSchema:
  - question: "Pourquoi ajouter pytest dans le projet Agenda CLI ?"
    answer: "pytest permet de vérifier automatiquement les règles métier de l’agenda : ajout d’événement, validation du titre, lecture d’un fichier vide, suppression d’un identifiant inconnu ou JSON invalide. Cela évite de retester toute la CLI à la main après chaque changement."
  - question: "À quoi sert tmp_path dans un test pytest ?"
    answer: "tmp_path fournit un dossier temporaire propre pour chaque test. On peut y créer un fichier agenda.json sans toucher aux vraies données de l’utilisateur, ce qui rend les tests isolés et reproductibles."
  - question: "Faut-il tester la CLI ou le service en priorité ?"
    answer: "Il faut d’abord tester le service métier, car il contient les règles importantes. La CLI peut ensuite être testée avec quelques scénarios d’intégration pour vérifier que les arguments appellent bien le service."
  - question: "Quand utiliser monkeypatch ou mock ?"
    answer: "On les utilise pour contrôler une dépendance externe : heure courante, fichier, fonction de sauvegarde ou environnement. Le but est de rendre le test déterministe et de vérifier un comportement précis."
  - question: "Quelle est la suite après cette étape pytest ?"
    answer: "La suite logique est la partie CLI argparse : une fois le service testé, on peut exposer les commandes add, list ou delete avec plus de confiance."
---
Dans les trois premières parties du projet Agenda CLI, tu as posé le cahier des charges, la persistance JSON et le modèle métier. Cette quatrième étape sert à rendre le projet plus solide : écrire des **tests pytest** pour vérifier que l’agenda fonctionne encore quand tu modifies le code.

L’intention de cet article est pratique : apprendre à tester un **service Python** sans lancer toute la CLI à la main. Les tests isolent le **`AgendaService`** en utilisant un **fichier temporaire** par test (`tmp_path` fourni par pytest) ou un **faux stockage** en mémoire. L’objectif n’est pas de viser 100 % de couverture par principe, mais de sécuriser les comportements importants : ajout réussi, liste vide, suppression d’un ID inconnu, JSON invalide.

<aside class="article-callout" role="note">
<p><strong>Fiche rapide</strong></p>
<ul>
<li><strong>Niveau :</strong> Python intermédiaire, après classes et fichiers JSON.</li>
<li><strong>Durée :</strong> 60 à 90 minutes avec les exercices.</li>
<li><strong>Pré-requis :</strong> savoir créer un environnement virtuel et installer <code>pytest</code>.</li>
<li><strong>Objectif :</strong> tester la logique métier avant d’ajouter la CLI <code>argparse</code>.</li>
</ul>
</aside>

Pour réviser les bases, consulte [tests automatisés et qualité Python](/python-inter-tests-qualite/) et [environnement virtuel / pip](/python-inter-venv-pip/). Le sommaire complet du projet est disponible sur la page [Agenda CLI Python intermédiaire](/programmation/projet-python-intermediaire-agenda/).

<div class="article-toc" role="navigation" aria-label="Sommaire de l’article">
<p class="article-toc-title">Sommaire</p>
<ul>
<li><a href="#pourquoi-tester">Pourquoi tester l’Agenda CLI ?</a></li>
<li><a href="#structure-tests">Structure du dossier tests</a></li>
<li><a href="#strategie">Stratégie de test</a></li>
<li><a href="#exercices">Exercices pytest</a></li>
<li><a href="#faq">FAQ</a></li>
</ul>
</div>

<h2 id="pourquoi-tester">Pourquoi tester l’Agenda CLI ?</h2>

Un agenda paraît simple, mais il cache vite plusieurs cas fragiles : fichier absent, JSON invalide, titre vide, date mal formée, identifiant inconnu, liste vide. Sans tests, tu risques de corriger une fonction et de casser silencieusement une autre règle.

pytest te donne un filet de sécurité. Tu peux modifier le modèle, refactorer le stockage ou préparer la future CLI en relançant une commande courte :

```text
pytest -v
```

Si un test échoue, tu sais quel comportement a changé. C’est beaucoup plus fiable que de retaper cinq commandes dans un terminal après chaque modification.

<h2 id="structure-tests">Structure `tests/`</h2>

- **`test_storage.py`** : roundtrip, fichier absent.
- **`test_service.py`** : règles métier avec données contrôlées.
- **`test_cli.py`** (optionnel) : `CliRunner` de **click** si tu passes à click plus tard ; avec **argparse**, `subprocess` ou refactor `main()` pour injecter les dépendances.

<h2 id="strategie">Stratégie de test recommandée</h2>

Commence par le **service**, pas par la CLI. Le service contient les règles métier : ajouter, lister, supprimer, valider. La CLI ne fait normalement que lire des arguments, appeler le service et afficher un résultat. Si le service est fiable, la future partie `argparse` sera plus simple à valider.

Bonnes pratiques pour ce projet :

- un test doit vérifier un comportement précis ;
- utiliser `tmp_path` pour éviter d’écrire dans les vraies données ;
- utiliser `pytest.raises` pour les erreurs attendues ;
- figer l’heure avec `monkeypatch` si une fonction dépend de `datetime.now()` ;
- garder les tests lisibles, même si cela duplique un peu de préparation.

<h2 id="exercices">Exercices pytest (12)</h2>

**Exercice 1** — Commande pour lancer pytest en mode verbeux. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">pytest -v</code></pre>
</div>
</details>

**Exercice 2** — Fixture pytest retournant un **`AgendaService`** pointant vers **`tmp_path / "a.json"`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import pytest

@pytest.fixture
def svc(tmp_path):
    return AgendaService(tmp_path / "a.json")</code></pre>
</div>
</details>

**Exercice 3** — Test **`pytest.raises(ValueError)`** sur titre vide. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">with pytest.raises(ValueError):
    svc.add_event(title=" ", ...)</code></pre>
</div>
</details>

**Exercice 4** — Pourquoi **`monkeypatch`** pour l’heure courante dans un test déterministe ? <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Figée datetime.now() pour éviter tests flaky.</code></pre>
</div>
</details>

**Exercice 5** — Parametrize trois cas pour **`from_dict`** (ok, clé manquante, date invalide). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">@pytest.mark.parametrize("raw,exc", [(good, None), (bad, KeyError)])
def test_from_dict(raw, exc): ...</code></pre>
</div>
</details>

**Exercice 6** — **`coverage run -m pytest`** — intérêt. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Mesurer les lignes exécutées ; repérer branches non testées.</code></pre>
</div>
</details>

**Exercice 7** — Test d’intégration : CLI **`add`** puis **`list`** avec **subprocess** et `tmp_path`. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># subprocess.run([sys.executable, "-m", "agenda_cli", "add", ...], env={**os.environ, "AGENDA_FILE": str(p)})</code></pre>
</div>
</details>

**Exercice 8** — Évite les **tests d’ordre** sur les UUIDs si tu compares des **ensembles** d’IDs. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">assert {e.id for e in events} == expected_ids</code></pre>
</div>
</details>

**Exercice 9** — **`xfail`** pour un bug connu — quand l’utiliser ? <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Documenter un échec attendu jusqu'à correction ; ne pas masquer les vrais bugs.</code></pre>
</div>
</details>

**Exercice 10** — **`conftest.py`** : rôle à la racine des tests. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Fixtures et hooks partagés par tous les modules de test.</code></pre>
</div>
</details>

**Exercice 11** — Mock **`save_events`** pour vérifier qu’**on ne sauve pas** si validation échoue. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def save_events(*a, **k):
    raise AssertionError("ne devrait pas sauver")
# avec mock.patch.object(storage, "save_events", save_events)</code></pre>
</div>
</details>

**Exercice 12** — Checklist avant PR : tests verts, **lint**, **format**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">pytest ; ruff check ; éventuellement black --check</code></pre>
</div>
</details>

## Suite

Une fois ces tests en place, tu peux passer à la [partie 5 — CLI argparse](/projet-inter-agenda-5-cli-argparse/). Le service sera déjà couvert, donc tu pourras te concentrer sur les arguments, les messages et les codes de sortie.

Tu peux aussi revenir à la [partie 3 — modèle métier](/projet-inter-agenda-3-modele-poo/) si un test montre que la validation est encore trop floue.

<h2 id="faq">FAQ</h2>

### Pourquoi ajouter pytest dans le projet Agenda CLI ?

pytest permet de vérifier automatiquement les règles métier de l’agenda : ajout d’événement, validation du titre, lecture d’un fichier vide, suppression d’un identifiant inconnu ou JSON invalide. Cela évite de retester toute la CLI à la main après chaque changement.

### À quoi sert tmp_path dans un test pytest ?

`tmp_path` fournit un dossier temporaire propre pour chaque test. On peut y créer un fichier `agenda.json` sans toucher aux vraies données de l’utilisateur, ce qui rend les tests isolés et reproductibles.

### Faut-il tester la CLI ou le service en priorité ?

Il faut d’abord tester le service métier, car il contient les règles importantes. La CLI peut ensuite être testée avec quelques scénarios d’intégration pour vérifier que les arguments appellent bien le service.

### Quand utiliser monkeypatch ou mock ?

On les utilise pour contrôler une dépendance externe : heure courante, fichier, fonction de sauvegarde ou environnement. Le but est de rendre le test déterministe et de vérifier un comportement précis.

### Quelle est la suite après cette étape pytest ?

La suite logique est la partie CLI argparse : une fois le service testé, on peut exposer les commandes `add`, `list` ou `delete` avec plus de confiance.

## Amazon (partenaire)

- [pytest livre](https://www.amazon.fr/s?k=pytest+python+livre&tag=manuso06-21)
- [Python tests automatisés](https://www.amazon.fr/s?k=python+tests+automatis%C3%A9s&tag=manuso06-21)

*Partenaire Amazon — commission possible sur achats éligibles, sans surcoût pour vous.*
