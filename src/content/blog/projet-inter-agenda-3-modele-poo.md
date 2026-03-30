---
title: "Projet Agenda CLI (3/6) — modèle métier et classes"
description: "Classe Event, validation des dates avec datetime, service AgendaService ; séparation storage ; 12 exercices."
pubDate: 2026-03-29
updatedDate: 2026-03-29
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Projet Python intermédiaire — Agenda CLI
seriesOrder: 3
tags: ["Python", "Projet", "POO"]
relatedLinks:
  - title: "Partie 2 — données"
    href: "/projet-inter-agenda-2-donnees-pathlib/"
  - title: "Partie 4 — tests"
    href: "/projet-inter-agenda-4-tests-pytest/"
categories:
  - "Python"
  - "Programmation"
  - "Projet"
  - "Intermédiaire"
---
Le **`model`** décrit la **forme** des événements et les conversions **dict ↔ objet** ; le **`service`** applique les **règles** : ajouter un événement avec nouvel **`id`**, filtrer par dates, supprimer. Garder **`storage`** ignorant des classes métier (il ne manipule que **dict** JSON) ou fournir des **méthodes** `Event.to_dict()` / `Event.from_dict()` — les deux approches sont valides si tu restes **cohérent**.

## Datetime

Parse les chaînes ISO avec **`datetime.fromisoformat`** (Python 3.7+) pour comparer des instants. Normalise en **timezone** si tu en ajoutes plus tard ; en v1, reste en **naïf** UTC local mais **documente** le choix.

## Exercices (12)

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

## Suite

[Tests avec pytest](/projet-inter-agenda-4-tests-pytest/)

## Amazon (partenaire)

- [Python orienté objet](https://www.amazon.fr/s?k=python+orient%C3%A9+objet+livre&tag=manuso06-21)
