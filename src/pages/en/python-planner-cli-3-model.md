---
layout: ../../layouts/EnPost.astro
title: "CLI planner project (3/6): domain model and classes"
description: "An Event class, date checks with datetime, and AgendaService, kept apart from storage. Twelve exercises on ids, filters, and validation."
updated: "29 March 2026"
faqSchema:
  - question: "What is the split between storage and service?"
    answer: "storage does raw persistence. service holds the business rules and the orchestration. Keep that split so each module has one job."
  - question: "What if duration_minutes is negative?"
    answer: "Reject it. If duration is not None and duration is less than 0, raise ValueError with a clear message such as invalid duration."
---

Some links on this page are affiliate links. The button opens Amazon so you can check today's price.

The **`model`** describes the **shape** of events and the **dict ↔ object** conversions. The **`service`** applies the **rules**: add an event with a new **`id`**, filter by dates, delete. Keep **`storage`** unaware of the domain classes (it only handles JSON **dict** values), or provide **methods** `Event.to_dict()` / `Event.from_dict()`. Both approaches are valid if you stay **consistent**.

Previous chapter: [data and pathlib](/en/python-planner-cli-2-pathlib/).

## Datetime

Parse ISO strings with **`datetime.fromisoformat`** (Python 3.7+) so you can compare instants. Normalize to a **timezone** if you add one later. In v1, stay with **naive** local datetimes, and **document** that choice.

## Exercises (12)

**Exercise 1** — An **`Event`** class with **`title`**, **`start: datetime`**, and **`id`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
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

**Exercise 2** — A method **`Event.from_dict(d: dict) -> Event`** with minimal validation. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
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

**Exercise 3** — **`AgendaService.add_event`** generates a **`uuid4`** for **`id`**. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import uuid
e.id = str(uuid.uuid4())</code></pre>
</div>
</details>

**Exercise 4** — Filter events whose **`start`** falls in **[d1, d2]** with the comparison **d1 <= e.start <= d2**. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">return [e for e in events if d1 <= e.start <= d2]</code></pre>
</div>
</details>

**Exercise 5** — Raise **`ValueError`** if **`title`** is empty when you add. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">if not title.strip():
    raise ValueError("empty title")</code></pre>
</div>
</details>

**Exercise 6** — Why do **`dataclasses`** cut the boilerplate here? <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Generates __init__, repr, and equality — useful for data objects.</code></pre>
</div>
</details>

**Exercise 7** — A **`to_dict`** method that mirrors **`from_dict`** for serialization. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
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

**Exercise 8** — **`remove_event(id)`**: if the id is missing, **`KeyError`** or **`False`** — pick one and document it. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># API option: raise KeyError("unknown id") — the CLI turns that into a message and exit code 1.</code></pre>
</div>
</details>

**Exercise 9** — Sort displayed events by **`start`**, ascending. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">sorted(events, key=lambda e: e.start)</code></pre>
</div>
</details>

**Exercise 10** — **SRP**: one sentence on the role of **`service`** versus **`storage`**. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">storage: raw persistence; service: business rules and orchestration.</code></pre>
</div>
</details>

**Exercise 11** — A unit test: calling **`add_event`** twice produces **two** distinct IDs. <span class="exo-badge exo-badge--inter">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def test_ids_distincts(service):
    a = service.add_event(...)
    b = service.add_event(...)
    assert a.id != b.id</code></pre>
</div>
</details>

**Exercise 12** — Edge case: a negative **`duration_minutes`** is rejected. <span class="exo-badge exo-badge--hard">Hard</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show the solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">if duration is not None and duration < 0:
    raise ValueError("invalid duration")</code></pre>
</div>
</details>

## Next

[Tests with pytest](/en/python-planner-cli-4-pytest/)

## Amazon

<a href="https://www.amazon.com/s?k=python+object+oriented+book&tag=roboteducatif-20" class="btn btn-action" rel="nofollow sponsored noopener" target="_blank">Check today's price on Amazon</a>
