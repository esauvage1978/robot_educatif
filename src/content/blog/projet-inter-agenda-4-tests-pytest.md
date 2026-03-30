---
title: "Projet Agenda CLI (4/6) — tests avec pytest"
description: "Fixtures tmp_path, tests du service, mocks de stockage, couverture des erreurs ; 12 exercices."
pubDate: 2026-03-29
updatedDate: 2026-03-29
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Projet Python intermédiaire — Agenda CLI
seriesOrder: 4
tags: ["Python", "Projet", "pytest"]
relatedLinks:
  - title: "Partie 3 — modèle"
    href: "/projet-inter-agenda-3-modele-poo/"
  - title: "Partie 5 — CLI argparse"
    href: "/projet-inter-agenda-5-cli-argparse/"
categories:
  - "Python"
  - "Programmation"
  - "Projet"
  - "Intermédiaire"
---
Les tests **isolent** le **`AgendaService`** en utilisant un **fichier temporaire** par test (`tmp_path` fourni par pytest) ou un **faux** `storage` en mémoire. Vise **une assertion par comportement** : ajout réussi, liste vide, suppression d’un ID inconnu, JSON invalide.

## Structure `tests/`

- **`test_storage.py`** : roundtrip, fichier absent.
- **`test_service.py`** : règles métier avec données contrôlées.
- **`test_cli.py`** (optionnel) : `CliRunner` de **click** si tu passes à click plus tard ; avec **argparse**, `subprocess` ou refactor `main()` pour injecter les dépendances.

## Exercices (12)

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

[CLI argparse](/projet-inter-agenda-5-cli-argparse/)

## Amazon (partenaire)

- [pytest livre](https://www.amazon.fr/s?k=pytest+python+livre&tag=manuso06-21)
