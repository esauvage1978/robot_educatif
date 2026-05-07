---
title: "Projet Journal CLI (4/6) — comment traiter plusieurs fichiers avec asyncio"
headline: "Projet Journal CLI — comment traiter plusieurs fichiers avec asyncio"
description: "Projet Python avancé : traiter plusieurs fichiers log avec asyncio, gather, Semaphore, run_in_executor, to_thread, fusion de rapports et fallback synchrone."
pubDate: 2026-03-29
updatedDate: 2026-05-06
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Projet Python avancé — Journal CLI
seriesOrder: 4
tags: ["Python", "Projet", "asyncio"]
relatedLinks:
  - title: "Partie 3 — décorateurs"
    href: "/projet-av-journal-3-decorateurs/"
  - title: "Python avancé — asyncio"
    href: "/python-av-asyncio/"
  - title: "Python avancé — générateurs"
    href: "/python-av-generateurs-iterateurs/"
  - title: "Partie 5 — typage"
    href: "/projet-av-journal-5-typing-mypy/"
categories:
  - "Python"
  - "Programmation"
  - "Projet"
  - "Avancé"
---
Après le parsing et les métriques, le projet **Journal CLI** doit gérer un cas réaliste : analyser **plusieurs fichiers de logs**. Cette partie introduit `asyncio` pour lancer plusieurs traitements et limiter la concurrence proprement.

Le point à comprendre dès le départ : `asyncio` n’accélère pas automatiquement tout code Python. Une lecture avec **`open()`** reste synchrone et peut bloquer la boucle d’événements. Pour ce projet, le pattern utile consiste donc à garder un parseur synchrone fiable, puis à l’exécuter dans un thread avec **`run_in_executor`** ou **`asyncio.to_thread`**.

<aside class="article-callout" role="note">
<p><strong>Objectif de la partie 4</strong></p>
<ul>
<li>Lancer plusieurs analyses de fichiers avec <code>asyncio.gather</code>.</li>
<li>Limiter le nombre de fichiers simultanés avec <code>Semaphore</code>.</li>
<li>Éviter de bloquer la boucle avec une lecture disque synchrone.</li>
<li>Fusionner les rapports partiels en un rapport final.</li>
</ul>
</aside>

Pour réviser les bases, consulte [asyncio en Python avancé](/python-av-asyncio/). Cette étape s’appuie aussi sur les [générateurs Python](/python-av-generateurs-iterateurs/) et sur les décorateurs de la [partie 3](/projet-av-journal-3-decorateurs/).

<div class="article-toc" role="navigation" aria-label="Sommaire de l’article">
<p class="article-toc-title">Sommaire</p>
<ul>
<li><a href="#idee">Idée générale</a></li>
<li><a href="#schema">Schéma recommandé</a></li>
<li><a href="#executor">run_in_executor ou to_thread</a></li>
<li><a href="#limites">Limites et fallback synchrone</a></li>
<li><a href="#exercices">Exercices</a></li>
<li><a href="#suite">Suite du projet</a></li>
</ul>
</div>

<h2 id="idee">Idée générale</h2>

Quand tu analyses **plusieurs gros fichiers**, tu peux **paralléliser** le travail : **`asyncio.gather`** lance des tâches qui **attendent** des I/O, pendant qu’un `Semaphore` évite de démarrer trop de lectures à la fois. **Attention** : la lecture fichier avec **`open()`** synchrone **bloque** la boucle — pattern courant : **`await loop.run_in_executor(None, parse_file_sync, path)`** où **`parse_file_sync`** lit et agrège en **thread**.

En alternative minimaliste, rester **100 % synchrone** avec **`concurrent.futures.ThreadPoolExecutor`** pour ce projet — mais **documente** le choix : le **cours avancé** demande d’illustrer **`asyncio`**.

<h2 id="schema">Schéma recommandé</h2>

```python
async def process_paths(paths: list[Path]) -> Report:
    loop = asyncio.get_running_loop()
    sem = asyncio.Semaphore(4)

    async def one(p: Path):
        async with sem:
            return await loop.run_in_executor(None, parse_and_count, p)

    parts = await asyncio.gather(*[one(p) for p in paths])
    return merge_reports(parts)
```

<h2 id="executor">`run_in_executor` ou `asyncio.to_thread` ?</h2>

`run_in_executor` est explicite : tu vois la boucle, l’exécuteur et la fonction synchrone appelée. `asyncio.to_thread` est plus lisible pour un cas simple : déléguer une fonction bloquante à un thread.

Pour ce projet, les deux approches sont acceptables. Choisis-en une et reste cohérent. Le plus important est de garder une fonction synchrone testable, par exemple `parse_and_count(path)`, puis de l’appeler depuis la couche asynchrone.

<h2 id="limites">Limites et fallback synchrone</h2>

Un traitement async n’est pas toujours plus rapide :

- fichiers minuscules : l’overhead peut coûter plus cher que le gain ;
- disque déjà saturé : lancer plus de tâches n’aide pas ;
- parseur CPU-bound : les threads ne résolvent pas tout à cause du GIL ;
- environnement de debug : une version séquentielle est plus facile à comprendre.

Prévoir un fallback synchrone, par exemple `--no-async`, est une bonne décision pédagogique et pratique. Cela permet de comparer les résultats, tester plus facilement et éviter que `asyncio` masque un bug de parsing.

<h2 id="exercices">Exercices (12)</h2>

**Exercice 1** — Écris **`asyncio.run`** + coroutine **`main()`** qui **`await asyncio.sleep(0)`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import asyncio
async def main():
    await asyncio.sleep(0)
asyncio.run(main())</code></pre>
</div>
</details>

**Exercice 2** — Limite **4** fichiers simultanés avec **`Semaphore(4)`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">sem = asyncio.Semaphore(4)
async with sem:
    ...</code></pre>
</div>
</details>

**Exercice 3** — Pourquoi **`run_in_executor`** pour **`open`** / lecture ? <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Évite de bloquer la boucle d'événements sur I/O synchrone.</code></pre>
</div>
</details>

**Exercice 4** — Fusionne deux **`Counter`** avec **`sum`** ou **`counter.update`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from collections import Counter
a = Counter({"INFO": 1})
a.update(Counter({"INFO": 2, "ERROR": 1}))</code></pre>
</div>
</details>

**Exercice 5** — **`gather`** avec **`return_exceptions=True`** : cas d’un fichier **manquant**. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Récupérer FileNotFoundError dans la liste pour rapport d'erreurs.</code></pre>
</div>
</details>

**Exercice 6** — **`asyncio.run`** ne doit pas être appelé **dans** une coroutine — pourquoi ? <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Boucles imbriquées interdites ; utiliser await sur coroutines.</code></pre>
</div>
</details>

**Exercice 7** — Benchmark : version **sync** vs **async+executor** sur 10 fichiers — quand le gain est nul ? <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Sur disque lent ou fichiers minuscules ; overhead de scheduling.</code></pre>
</div>
</details>

**Exercice 8** — **`aiofiles`** (tiers) — quand l’ajouter ? <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Lecture/écriture async native sans thread pool ; dépendance pip.</code></pre>
</div>
</details>

**Exercice 9** — **`uvloop`** — contexte (Linux/macOS). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Boucle alternative plus rapide ; optionnel.</code></pre>
</div>
</details>

**Exercice 10** — **`asyncio.to_thread`** (3.9+) — équivalent à `run_in_executor`. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">await asyncio.to_thread(parse_and_count, path)</code></pre>
</div>
</details>

**Exercice 11** — **`main`** synchrone appelle **`asyncio.run`** une fois — **point d’entrée** unique. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def main():
    return asyncio.run(amain())</code></pre>
</div>
</details>

**Exercice 12** — Documente le **fallback** : si **`--no-async`**, traitement séquentiel synchrone. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Compatibilité environnements restreints ; debug plus simple.</code></pre>
</div>
</details>

<h2 id="suite">Suite</h2>

Passe ensuite à la partie 5 : [typage et mypy](/projet-av-journal-5-typing-mypy/). Les fonctions async, les rapports partiels et les erreurs récupérées par `gather` gagnent beaucoup à être typés clairement.

Tu peux aussi revenir à [asyncio en Python avancé](/python-av-asyncio/) si tu veux consolider les notions de coroutine, task, event loop et `gather`.

## Amazon (partenaire)

- [Python asyncio livre](https://www.amazon.fr/s?k=python+asyncio+livre&tag=manuso06-21)

*Partenaire Amazon — commission possible sur achats éligibles, sans surcoût pour vous.*
