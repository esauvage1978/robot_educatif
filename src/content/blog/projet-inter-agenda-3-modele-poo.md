---
title: "Projet Agenda CLI (3/6) — comment créer le modèle métier"
headline: "Projet Agenda CLI — comment créer le modèle métier et les classes"
description: "Projet Python intermédiaire : créer la classe Event, convertir dict vers objet, valider datetime, séparer storage et AgendaService, puis préparer les tests."
pubDate: 2026-03-29
updatedDate: 2026-05-06
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Projet Python intermédiaire — Agenda CLI
seriesOrder: 3
tags: ["Python", "Projet", "POO"]
relatedLinks:
  - title: "Partie 2 — données"
    href: "/projet-inter-agenda-2-donnees-pathlib/"
  - title: "Python intermédiaire — POO et classes"
    href: "/python-inter-poo-classes/"
  - title: "Python intermédiaire — tests et qualité"
    href: "/python-inter-tests-qualite/"
  - title: "Partie 4 — tests"
    href: "/projet-inter-agenda-4-tests-pytest/"
categories:
  - "Python"
  - "Programmation"
  - "Projet"
  - "Intermédiaire"
---
Après le stockage JSON, il faut donner une forme claire aux données de l’agenda. Cette troisième partie introduit le **modèle métier** : une classe `Event`, des conversions entre dictionnaires JSON et objets Python, puis un `AgendaService` qui porte les règles de l’application.

L’objectif est de ne pas mélanger les responsabilités. Le module `storage` sait lire et écrire des dictionnaires JSON. Le module `model` sait représenter un événement. Le module `service` sait ajouter, lister, filtrer et supprimer des événements.

<aside class="article-callout" role="note">
<p><strong>Objectif de la partie 3</strong></p>
<ul>
<li>Créer une classe <code>Event</code> avec <code>dataclass</code>.</li>
<li>Convertir proprement <code>dict ↔ objet</code>.</li>
<li>Valider titre, date et durée.</li>
<li>Séparer règles métier et persistance disque.</li>
</ul>
</aside>

Pour réviser les bases, consulte [POO et classes en Python](/python-inter-poo-classes/). Cette partie prépare directement les [tests avec pytest](/projet-inter-agenda-4-tests-pytest/).

<div class="article-toc" role="navigation" aria-label="Sommaire de l’article">
<p class="article-toc-title">Sommaire</p>
<ul>
<li><a href="#roles">Rôle de model, service et storage</a></li>
<li><a href="#datetime">Datetime et validation</a></li>
<li><a href="#service">AgendaService</a></li>
<li><a href="#tests">Tests à préparer</a></li>
<li><a href="#exercices">Exercices</a></li>
<li><a href="#suite">Suite du projet</a></li>
</ul>
</div>

<h2 id="roles">Rôle de `model`, `service` et `storage`</h2>

Le **`model`** décrit la **forme** des événements et les conversions **dict ↔ objet** ; le **`service`** applique les **règles** : ajouter un événement avec nouvel **`id`**, filtrer par dates, supprimer. Garder **`storage`** ignorant des classes métier (il ne manipule que **dict** JSON) ou fournir des **méthodes** `Event.to_dict()` / `Event.from_dict()` — les deux approches sont valides si tu restes **cohérent**.

<h2 id="datetime">Datetime</h2>

Parse les chaînes ISO avec **`datetime.fromisoformat`** (Python 3.7+) pour comparer des instants. Normalise en **timezone** si tu en ajoutes plus tard ; en v1, reste en **naïf** UTC local mais **documente** le choix.

<h2 id="service">`AgendaService`</h2>

`AgendaService` orchestre le projet : il charge les événements, applique les règles, puis demande au stockage de sauvegarder. C’est ici que tu places les comportements importants : refuser un titre vide, générer un identifiant, trier les événements ou signaler un identifiant inconnu.

Cette couche est aussi celle que tu testeras le plus. Si `AgendaService` est propre, la future CLI `argparse` pourra rester fine : lire des arguments, appeler le service, afficher un message.

<h2 id="tests">Tests à préparer</h2>

Avant d’écrire la partie pytest, note déjà les comportements à protéger :

- `Event.from_dict` accepte un dictionnaire valide ;
- une date invalide est rejetée ;
- un titre vide déclenche une erreur ;
- deux ajouts produisent deux identifiants distincts ;
- supprimer un identifiant inconnu est documenté.

<h2 id="exercices">Exercices (12)</h2>

**Exercice 1** — Classe **`Event`** avec **`title`**, **`start: datetime`**, **`id`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from dataclasses import dataclass
from datetime import datetime

@dataclass
class Event:
    id: str
    title: str
    start: datetime
    duration_minutes: int | None
    note: str</code></pre>
</div>
</details>

**Exercice 2** — Méthode **`Event.from_dict(d: dict) -> Event`** avec validation minimale. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">@staticmethod
def from_dict(d):
    return Event(
        id=str(d["id"]),
        title=d["title"],
        start=datetime.fromisoformat(d["start"]),
        duration_minutes=d.get("duration_minutes"),
        note=d.get("note", ""),
    )</code></pre>
</div>
</details>

**Exercice 3** — **`AgendaService.add_event`** génère un **`uuid4`** pour **`id`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import uuid
e.id = str(uuid.uuid4())</code></pre>
</div>
</details>

**Exercice 4** — Filtre les événements **`start`** dans **[d1, d2]** avec comparaison **d1 <= e.start <= d2**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">return [e for e in events if d1 <= e.start <= d2]</code></pre>
</div>
</details>

**Exercice 5** — Lève **`ValueError`** si **`title`** vide à l’ajout. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">if not title.strip():
    raise ValueError("titre vide")</code></pre>
</div>
</details>

**Exercice 6** — Pourquoi **`dataclasses`** réduit le boilerplate ici ? <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Génère __init__, repr, égalité — utile pour objets données.</code></pre>
</div>
</details>

**Exercice 7** — Méthode **`to_dict`** symétrique de **`from_dict`** pour la sérialisation. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def to_dict(self):
    return {
        "id": self.id,
        "title": self.title,
        "start": self.start.isoformat(timespec="seconds"),
        "duration_minutes": self.duration_minutes,
        "note": self.note,
    }</code></pre>
</div>
</details>

**Exercice 8** — **`remove_event(id)`** : si absent, **`KeyError`** ou **`False`** — choisis et documente. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Option API : raise KeyError("id inconnu") — la CLI convertit en message + code 1.</code></pre>
</div>
</details>

**Exercice 9** — Tri des événements affichés par **`start`** croissant. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">sorted(events, key=lambda e: e.start)</code></pre>
</div>
</details>

**Exercice 10** — Séparation **SRP** : une phrase sur le rôle de **`service`** vs **`storage`**. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">storage : persistance brute ; service : règles métier et orchestration.</code></pre>
</div>
</details>

**Exercice 11** — Test unitaire : **`add_event`** deux fois produit **deux** IDs distincts. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def test_ids_distincts(service):
    a = service.add_event(...)
    b = service.add_event(...)
    assert a.id != b.id</code></pre>
</div>
</details>

**Exercice 12** — Cas limite : **`duration_minutes`** négatif — rejet. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">if duration is not None and duration < 0:
    raise ValueError("durée invalide")</code></pre>
</div>
</details>

<h2 id="suite">Suite</h2>

Continue avec la partie 4 : [tests avec pytest](/projet-inter-agenda-4-tests-pytest/). Tu y vérifieras le service sans lancer toute la CLI à la main.

## Amazon (partenaire)

- [Python orienté objet](https://www.amazon.fr/s?k=python+orient%C3%A9+objet+livre&tag=manuso06-21)

*Partenaire Amazon — commission possible sur achats éligibles, sans surcoût pour vous.*
