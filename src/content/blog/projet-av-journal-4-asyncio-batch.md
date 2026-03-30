---
title: "Projet Journal CLI (4/6) — asyncio et traitement de plusieurs fichiers"
description: "gather, semaphore, run_in_executor pour lecture disque ; pas de blocage ; 12 exercices."
pubDate: 2026-03-29
updatedDate: 2026-03-29
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Projet Python avancé — Journal CLI
seriesOrder: 4
tags: ["Python", "Projet", "asyncio"]
relatedLinks:
  - title: "Partie 3 — décorateurs"
    href: "/projet-av-journal-3-decorateurs/"
  - title: "Partie 5 — typage"
    href: "/projet-av-journal-5-typing-mypy/"
categories:
  - "Python"
  - "Programmation"
  - "Projet"
  - "Avancé"
---
Quand tu analyses **plusieurs gros fichiers**, tu peux **paralléliser** le travail : **`asyncio.gather`** pour lancer des tâches qui **attendent** des I/O. **Attention** : la lecture fichier avec **`open()`** synchrone **bloque** la boucle — pattern courant : **`await loop.run_in_executor(None, parse_file_sync, path)`** où **`parse_file_sync`** lit et agrège en **thread** (I/O disque libère le GIL souvent).

En alternative minimaliste, rester **100 % synchrone** avec **`concurrent.futures.ThreadPoolExecutor`** pour ce projet — mais **documente** le choix : le **cours avancé** demande d’illustrer **`asyncio`**.

## Schéma recommandé

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

## Exercices (12)

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

## Suite

[Typage et mypy](/projet-av-journal-5-typing-mypy/)

## Amazon (partenaire)

- [Python asyncio livre](https://www.amazon.fr/s?k=python+asyncio+livre&tag=manuso06-21)
