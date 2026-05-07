---
title: "Projet Agenda CLI (2/6) — comment gérer JSON avec pathlib"
headline: "Projet Agenda CLI — comment gérer les données JSON avec pathlib"
description: "Projet Python intermédiaire : gérer le fichier agenda avec pathlib, JSON UTF-8, load_events, save_events, écriture atomique, tmp_path et tests."
pubDate: 2026-03-29
updatedDate: 2026-05-06
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Projet Python intermédiaire — Agenda CLI
seriesOrder: 2
tags: ["Python", "Projet", "pathlib"]
relatedLinks:
  - title: "Partie 1 — cahier des charges"
    href: "/projet-inter-agenda-1-cahier-des-charges/"
  - title: "Python intermédiaire — pathlib"
    href: "/python-inter-pathlib/"
  - title: "Python fichiers texte"
    href: "/python-fichiers-texte/"
  - title: "Partie 3 — modèle et POO"
    href: "/projet-inter-agenda-3-modele-poo/"
categories:
  - "Python"
  - "Programmation"
  - "Projet"
  - "Intermédiaire"
---
Dans la partie 1, tu as défini le format JSON de l’agenda et les commandes principales. Cette deuxième étape s’occupe de la persistance : où stocker le fichier, comment le lire, comment l’écrire et comment éviter de perdre les données.

Le module **`storage`** isole tout ce qui touche au **disque** : où se trouve le fichier, comment le **lire** et l’**écrire**. On utilise **`pathlib.Path`** pour composer les chemins (`Path.home() / ".agenda" / "agenda.json"`) et **`json.load` / `json.dump`** avec **`encoding="utf-8"`**. Pour éviter un fichier **corrompu** si le processus meurt en pleine écriture, une stratégie simple est d’écrire dans un **fichier temporaire** dans le même répertoire puis **`Path.replace`** (atomique sur le même volume en général).

<aside class="article-callout" role="note">
<p><strong>Objectif de la partie 2</strong></p>
<ul>
<li>Créer un module <code>storage.py</code> dédié au disque.</li>
<li>Choisir un chemin de fichier configurable.</li>
<li>Lire et écrire du JSON UTF-8.</li>
<li>Tester la persistance avec <code>tmp_path</code>.</li>
</ul>
</aside>

Pour réviser les chemins modernes, consulte [pathlib en Python intermédiaire](/python-inter-pathlib/). Pour les bases de lecture/écriture, voir aussi [fichiers texte en Python](/python-fichiers-texte/).

<div class="article-toc" role="navigation" aria-label="Sommaire de l’article">
<p class="article-toc-title">Sommaire</p>
<ul>
<li><a href="#contrat">Contrat du module storage</a></li>
<li><a href="#json">Format JSON attendu</a></li>
<li><a href="#ecriture-atomique">Écriture atomique</a></li>
<li><a href="#tests">Tests à prévoir</a></li>
<li><a href="#exercices">Exercices</a></li>
<li><a href="#suite">Suite du projet</a></li>
</ul>
</div>

<h2 id="contrat">Contrat du module `storage`</h2>

- **`load_events(path: Path) -> dict`** : si le fichier n’existe pas, retourner **`{"events": []}`** (ou structure équivalente documentée).
- **`save_events(path: Path, data: dict) -> None`** : sérialiser avec **`indent=2`** pour un diff Git lisible.
- Créer les **répertoires parents** avec **`path.parent.mkdir(parents=True, exist_ok=True)`** avant écriture.

<h2 id="json">Format JSON attendu</h2>

Le fichier doit rester simple et lisible. Une racine `{"events": [...]}` suffit pour la v1. Évite de stocker directement des objets Python : le JSON doit rester portable, même si tu changes plus tard l’implémentation interne de `Event`.

Quand le JSON est invalide, ne laisse pas une trace d’erreur illisible pour l’utilisateur final. Le module peut lever une exception claire ; la CLI transformera ensuite cette erreur en message propre et code de sortie non zéro.

<h2 id="ecriture-atomique">Pourquoi une écriture atomique ?</h2>

Si ton programme écrit directement dans `agenda.json` et s’arrête au mauvais moment, tu peux laisser un fichier tronqué. Une stratégie plus sûre consiste à écrire dans un fichier temporaire situé dans le même dossier, puis à remplacer le fichier final avec `Path.replace`.

Ce n’est pas une garantie absolue contre tous les problèmes système, mais c’est un bon réflexe pour un projet local sérieux.

<h2 id="tests">Tests à prévoir</h2>

Les tests de stockage doivent utiliser `tmp_path`, pas ton vrai dossier utilisateur. Vérifie au minimum :

- fichier absent ;
- sauvegarde puis rechargement ;
- JSON invalide ;
- création automatique du dossier parent ;
- conservation des accents avec `ensure_ascii=False`.

<h2 id="exercices">Exercices (12)</h2>

**Exercice 1** — Écris l’expression **`Path.home() / ".agenda" / "agenda.json"`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
p = Path.home() / ".agenda" / "agenda.json"</code></pre>
</div>
</details>

**Exercice 2** — Charge un JSON avec **`json.loads`** depuis une chaîne **`'{"events":[]}'`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import json
data = json.loads('{"events":[]}')</code></pre>
</div>
</details>

**Exercice 3** — Pourquoi **`ensure_ascii=False`** dans **`json.dump`** pour le français ? <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Préserve les caractères Unicode lisibles au lieu d'échapper en \uXXXX.</code></pre>
</div>
</details>

**Exercice 4** — Gère **`JSONDecodeError`** lors du chargement : message utilisateur et sortie non zéro en CLI (schéma). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">try:
    ...
except json.JSONDecodeError as e:
    print("Fichier JSON invalide:", e)
    sys.exit(1)</code></pre>
</div>
</details>

**Exercice 5** — Utilise **`tempfile.NamedTemporaryFile`** ou **`mkstemp`** à côté du fichier cible pour écriture puis **`replace`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Écrire dans tmp dans le même dossier ; Path(tmp).replace(cible) pour atomicité.</code></pre>
</div>
</details>

**Exercice 6** — Teste **`load_events`** avec un **`tmp_path`** pytest et fichier absent. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def test_load_missing(tmp_path):
    p = tmp_path / "x.json"
    assert load_events(p) == {"events": []}</code></pre>
</div>
</details>

**Exercice 7** — Différence **`read_text`** vs **`open` + `json.load`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># read_text charge tout en str ; json.load attend un fichier ouvert en texte.</code></pre>
</div>
</details>

**Exercice 8** — Valide que la racine chargée contient bien la clé **`events`** de type **`list`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">if not isinstance(data.get("events"), list):
    raise ValueError("Format invalide")</code></pre>
</div>
</details>

**Exercice 9** — Variable d’environnement **`AGENDA_FILE`** pour surcharger le chemin par défaut. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import os
from pathlib import Path
def data_path() -> Path:
    return Path(os.environ.get("AGENDA_FILE", Path.home() / ".agenda" / "agenda.json"))</code></pre>
</div>
</details>

**Exercice 10** — **`Path.resolve()`** avant comparaison de chemins — cas d’usage. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Normaliser .. et symlinks pour savoir si deux chemins pointent au même fichier.</code></pre>
</div>
</details>

**Exercice 11** — **`chmod`** ou permissions : pourquoi le fichier dans **`~/.agenda`** peut poser question en multi-utilisateur ? <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Sur machine partagée, prévoir droits 600 (Unix) — hors scope v1 mais à noter.</code></pre>
</div>
</details>

**Exercice 12** — Écrit un test : sauvegarde puis rechargement donne les **mêmes** données (égalité profonde). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def test_roundtrip(tmp_path):
    d = {"events": [{"id": "1", "title": "A", "start": "2026-01-01T12:00:00", "duration_minutes": None, "note": ""}]}
    p = tmp_path / "a.json"
    save_events(p, d)
    assert load_events(p) == d</code></pre>
</div>
</details>

<h2 id="suite">Suite</h2>

Continue avec la partie 3 : [modèle métier et classes](/projet-inter-agenda-3-modele-poo/). Le stockage restera volontairement simple, tandis que la validation et les règles de l’agenda iront dans le modèle et le service.

## Amazon (partenaire)

- [Python fichiers données](https://www.amazon.fr/s?k=python+json+fichiers+livre&tag=manuso06-21)

*Partenaire Amazon — commission possible sur achats éligibles, sans surcoût pour vous.*
