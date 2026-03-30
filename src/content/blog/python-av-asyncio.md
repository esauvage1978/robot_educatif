---
title: "Python avancé — asyncio : concurrence et I/O non bloquants"
description: "Event loop, async/await, Task, gather, sleep ; différences avec threads ; limites du GIL côté CPU ; ressources ; 20 exercices avec solutions repliables."
pubDate: 2026-03-29
updatedDate: 2026-03-29
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Python avancé
seriesOrder: 4
tags: ["Python", "Programmation", "Avancé"]
relatedLinks:
  - title: "Leçon 3 — context managers"
    href: "/python-av-context-managers/"
  - title: "Leçon 5 — typage avancé"
    href: "/python-av-typing-avance/"
categories:
  - "Python"
  - "Programmation"
  - "Tutoriel"
  - "Avancé"
---

Le module **`asyncio`** fournit une **boucle d’événements** (event loop) pour exécuter des **coroutines** — fonctions déclarées avec **`async def`** et invoquées avec **`await`**. Contrairement aux **threads** du système d’exploitation, les coroutines sont **coopératives** : elles cèdent le contrôle aux points **`await`**, ce qui convient surtout à l’**I/O** (réseau, disque avec libs async) et à la **concurrence** de nombreuses connexions **sans** créer des milliers de threads.

**Important** : **`asyncio` ne parallélise pas le calcul CPU pur** sur plusieurs cœurs — le **GIL** reste ; pour du calcul parallèle CPU, voir **`multiprocessing`** ou **`concurrent.futures.ProcessPoolExecutor`**.

## 1. Première coroutine

```python
import asyncio

async def main():
    print("début")
    await asyncio.sleep(0.1)
    print("fin")

asyncio.run(main())
```

**`asyncio.run`** crée la boucle, exécute **`main()`** jusqu’à la fin et ferme proprement.

## 2. Tâches et `gather`

**`asyncio.create_task(coro)`** planifie une coroutine en **Task** concurrente. **`await asyncio.gather(a(), b())`** lance plusieurs coroutines et attend **toutes** les fins (exceptions regroupées).

## 3. Ne pas bloquer la boucle

Appeler une fonction **bloquante** (`time.sleep`, gros calcul) **dans** une coroutine **bloque toute** la boucle : les autres tâches ne s’exécutent pas. Utilise **`await asyncio.sleep`** ou **`loop.run_in_executor`** pour déléguer au **thread pool**.

## Ressources externes

- **[asyncio — documentation](https://docs.python.org/fr/3/library/asyncio.html)** (FR)
- **[Coroutines and Tasks](https://docs.python.org/3/library/asyncio-task.html)**

## Exercices (20)

### Niveau simple

**Exercice 1** — Programme minimal avec **`asyncio.run(hello())`** où **`hello`** **`await asyncio.sleep(0)`** puis **`print("ok")`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import asyncio

async def hello():
    await asyncio.sleep(0)
    print("ok")

asyncio.run(hello())</code></pre>
</div>
</details>

**Exercice 2** — **`await asyncio.gather(sleep(0.1), sleep(0.1))`** et mesure que le temps total est **&lt; 0.2** s (ordre de grandeur). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import asyncio, time
async def main():
    t0 = time.perf_counter()
    await asyncio.gather(asyncio.sleep(0.1), asyncio.sleep(0.1))
    print(time.perf_counter() - t0)
asyncio.run(main())</code></pre>
</div>
</details>

**Exercice 3** — Crée **`asyncio.create_task`** sur une coroutine qui compte jusqu’à 3 avec **`await sleep(0)`** entre chaque **`print`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import asyncio

async def count():
    for i in range(1, 4):
        await asyncio.sleep(0)
        print(i)

async def main():
    t = asyncio.create_task(count())
    await t

asyncio.run(main())</code></pre>
</div>
</details>

**Exercice 4** — Différence entre **`async def`** et fonction normale qui retourne une coroutine ? <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># async def définit une coroutine ; l'appel retourne un objet coroutine, exécuté par la boucle.</code></pre>
</div>
</details>

**Exercice 5** — Pourquoi **`time.sleep(1)`** dans **`async def`** est une **mauvaise idée** ? <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Bloque le thread de la boucle d'événements ; toutes les tâches async sont gelées.</code></pre>
</div>
</details>

**Exercice 6** — Utilise **`asyncio.TimeoutError`** conceptuellement avec **`wait_for`** sur une coroutine qui dort trop longtemps. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import asyncio

async def lent():
    await asyncio.sleep(10)

async def main():
    try:
        await asyncio.wait_for(lent(), timeout=0.05)
    except asyncio.TimeoutError:
        print("timeout")

asyncio.run(main())</code></pre>
</div>
</details>

**Exercice 7** — Que fait **`asyncio.run`** par rapport à **`loop.run_until_complete`** (niveau utilisateur) ? <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># run est l'API haut niveau recommandée : crée et ferme la boucle proprement.</code></pre>
</div>
</details>

### Niveau intermédiaire

**Exercice 8** — **`asyncio.Semaphore(2)`** pour limiter à **2** appels concurrents simulés. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import asyncio

async def work(i, sem):
    async with sem:
        print("start", i)
        await asyncio.sleep(0.05)
        print("end", i)

async def main():
    sem = asyncio.Semaphore(2)
    await asyncio.gather(*(work(i, sem) for i in range(5)))

asyncio.run(main())</code></pre>
</div>
</details>

**Exercice 9** — **`asyncio.Queue`** : producteur qui **`put`**, consommateur qui **`get`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import asyncio

async def prod(q):
    await q.put(1)
    await q.put(2)

async def cons(q):
    print(await q.get())
    print(await q.get())

async def main():
    q = asyncio.Queue()
    await asyncio.gather(prod(q), cons(q))

asyncio.run(main())</code></pre>
</div>
</details>

**Exercice 10** — **`return_exceptions=True`** dans **`gather`** : comportement. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Les exceptions deviennent des valeurs de retour au lieu de remonter.</code></pre>
</div>
</details>

**Exercice 11** — Démarre un **`asyncio.Server`** TCP minimal (lecture doc) — esquisse. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># async def handle(reader, writer): ... ; asyncio.start_server(handle, host, port) ; serve forever.</code></pre>
</div>
</details>

**Exercice 12** — **`asyncio.shield`** : à quoi sert-il ? <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Protège une tâche d'annulation en cascade ; annulation ne remonte pas directement.</code></pre>
</div>
</details>

**Exercice 13** — **`run_in_executor`** pour appeler **`requests.get`** bloquant — schéma. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># loop = asyncio.get_running_loop(); await loop.run_in_executor(None, requests.get, url)</code></pre>
</div>
</details>

**Exercice 14** — Différence **concurrence** vs **parallélisme** en une phrase. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Concurrence : entrelacement ; parallélisme : exécution simultanée sur plusieurs cœurs.</code></pre>
</div>
</details>

### Niveau difficile

**Exercice 15** — Pattern **producer/consumer** avec **`Queue`** et **`sentinel`** pour arrêter. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Mettre None en fin ; consommateur break sur None.</code></pre>
</div>
</details>

**Exercice 16** — **`asyncio.CancelledError`** : quand est-elle levée ? <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Lorsque la tâche est annulée par task.cancel().</code></pre>
</div>
</details>

**Exercice 17** — Pourquoi **`asyncio.get_event_loop()`** en dehors d’un contexte async est déconseillé en 3.10+ ? <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Préférer get_running_loop() dans une coroutine pour éviter les boucles ambiguës.</code></pre>
</div>
</details>

**Exercice 18** — **`asyncio.TaskGroup`** (3.11+) : avantage sur **`gather`**. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Gestion structurée des sous-tâches et annulation en cascade (syntaxe async with).</code></pre>
</div>
</details>

**Exercice 19** — Mesure **wall time** vs **CPU time** pour une coroutine qui fait surtout du **`sleep`** — lequel reflète l’attente I/O ? <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Wall time (time.perf_counter) augmente ; CPU time peu car pas de travail CPU.</code></pre>
</div>
</details>

**Exercice 20** — Quand choisir **`anyio`** / **`trio`** plutôt qu’**`asyncio`** seul ? (réponse courte). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Bibliothèques tierces pour API unifiées, timeouts structurés, nursery patterns — selon écosystème.</code></pre>
</div>
</details>

## Suite du parcours

[Typage statique avancé](/python-av-typing-avance/) : Protocol, generics, Literal.

## Amazon (partenaire)

- [Python asyncio](https://www.amazon.fr/s?k=python+asyncio+livre&tag=manuso06-21)
