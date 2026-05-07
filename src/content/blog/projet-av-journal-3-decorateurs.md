---
title: "Projet Journal CLI (3/6) — comment utiliser des décorateurs Python"
headline: "Projet Journal CLI — comment utiliser des décorateurs pour métriques et logs"
description: "Projet Python avancé : ajouter des décorateurs timed et log_calls, mesurer le parsing, utiliser functools.wraps, logging, caplog et éviter les pièges des générateurs."
pubDate: 2026-03-29
updatedDate: 2026-05-06
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Projet Python avancé — Journal CLI
seriesOrder: 3
tags: ["Python", "Projet", "Décorateurs"]
relatedLinks:
  - title: "Partie 2 — parsing"
    href: "/projet-av-journal-2-parse-generateurs/"
  - title: "Python avancé — décorateurs"
    href: "/python-av-decorateurs-functools/"
  - title: "Python intermédiaire — tests et qualité"
    href: "/python-inter-tests-qualite/"
  - title: "Partie 4 — asyncio"
    href: "/projet-av-journal-4-asyncio-batch/"
categories:
  - "Python"
  - "Programmation"
  - "Projet"
  - "Avancé"
---
Dans la partie 2, tu as construit un parseur ligne à ligne avec des générateurs. Cette troisième étape ajoute une couche utile dans un vrai outil CLI : mesurer ce qui se passe sans polluer le cœur du code. Pour cela, on utilise des **décorateurs Python**.

L’objectif n’est pas d’ajouter des décorateurs partout “par style avancé”. Ils servent ici à instrumenter le projet : mesurer la durée d’un traitement, journaliser un appel, vérifier qu’une fonction n’est pas relancée trop souvent, et activer ces informations seulement en mode debug ou `--verbose`.

<aside class="article-callout" role="note">
<p><strong>Objectif de la partie 3</strong></p>
<ul>
<li>Créer un décorateur <code>@timed</code> avec <code>time.perf_counter</code>.</li>
<li>Utiliser <code>logging</code> plutôt que des <code>print</code> dispersés.</li>
<li>Conserver les métadonnées avec <code>functools.wraps</code>.</li>
<li>Comprendre pourquoi mesurer un générateur demande de la prudence.</li>
</ul>
</aside>

Si tu veux revoir la notion avant l’exercice, consulte [décorateurs et functools en Python avancé](/python-av-decorateurs-functools/). Pour garder le fil du projet, tu peux aussi revenir au [parsing par générateurs](/projet-av-journal-2-parse-generateurs/).

<div class="article-toc" role="navigation" aria-label="Sommaire de l’article">
<p class="article-toc-title">Sommaire</p>
<ul>
<li><a href="#pourquoi">Pourquoi ajouter des décorateurs ?</a></li>
<li><a href="#timed">Décorateur timed</a></li>
<li><a href="#generateurs">Piège avec les générateurs</a></li>
<li><a href="#logging">Logging et mode verbose</a></li>
<li><a href="#exercices">Exercices</a></li>
<li><a href="#suite">Suite du projet</a></li>
</ul>
</div>

<h2 id="pourquoi">Pourquoi ajouter des décorateurs ?</h2>

Dans un outil comme **`journal-stats`**, on veut parfois savoir combien de temps prend le parsing ou combien de fois une fonction est appelée. Si tu ajoutes ces mesures directement dans `parse_lines`, `aggregate` ou `main`, tu mélanges la logique métier avec l’observation du programme.

Un décorateur permet de garder une séparation nette : la fonction fait son travail, le décorateur ajoute une information autour de l’appel. C’est particulièrement utile avant la partie 4, où plusieurs fichiers seront traités et où les temps d’exécution deviendront plus visibles.

<h2 id="timed">Décorateur `timed`</h2>

Enveloppe les fonctions **`parse_lines`** et **`aggregate`** avec un décorateur **`@timed`** qui enregistre la durée via **`logging.info`** ou **`print`** en mode debug. Un second décorateur **`@log_calls`** peut compter les invocations — utile pour vérifier que tu ne **repars** pas le parseur dans une boucle par erreur.

Utilise **`functools.wraps`** pour garder **`__name__`** et la docstring, afin que **`pytest`** et **`help()`** restent lisibles.

<h2 id="generateurs">Attention aux générateurs</h2>

Un point subtil : décorer une fonction qui **retourne un générateur** ne mesure pas forcément le parcours complet. La fonction peut être appelée rapidement, puis le vrai travail se produit plus tard, quand le générateur est consommé.

Pour mesurer correctement le parsing, tu peux :

- mesurer l’agrégation, qui consomme réellement les lignes ;
- écrire un décorateur spécialisé pour générateur ;
- utiliser un context manager autour de la boucle qui consomme les lignes ;
- documenter clairement ce qui est mesuré.

Cette nuance est importante dans un projet avancé : un décorateur mal placé donne une métrique rassurante mais fausse.

<h2 id="logging">Logging et mode verbose</h2>

Le module `logging` doit être configuré dans `main`, pas au milieu des modules métier. Ainsi, la bibliothèque reste silencieuse par défaut, et la CLI choisit d’activer les messages avec un futur flag `--verbose`.

Pour les tests, `caplog` de pytest est plus propre que de vérifier un `print`. Cela permet de confirmer que le décorateur émet bien un message sans rendre les tests dépendants de la sortie console.

<h2 id="exercices">Exercices (12)</h2>

**Exercice 1** — Décorateur **`timed`** avec **`time.perf_counter`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import time, functools, logging
def timed(f):
    @functools.wraps(f)
    def wrapper(*a, **k):
        t0 = time.perf_counter()
        out = f(*a, **k)
        logging.info("%s took %.4fs", f.__name__, time.perf_counter() - t0)
        return out
    return wrapper</code></pre>
</div>
</details>

**Exercice 2** — Applique **`@timed`** sur **`aggregate`** uniquement — pourquoi pas sur le générateur **sans** le consommer ? <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># timed sur fonction qui retourne générateur mesure la création, pas le parcours.</code></pre>
</div>
</details>

**Exercice 3** — Décorateur **`count_lines`** sur un générateur qui **incrémente** un **`Counter`** global — piège. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># État global : préférer classe ou closure avec compteur par appel.</code></pre>
</div>
</details>

**Exercice 4** — **`logging.basicConfig(level=logging.DEBUG)`** en **`main`** uniquement. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">import logging
logging.basicConfig(level=logging.DEBUG)</code></pre>
</div>
</details>

**Exercice 5** — Test : mock **`logging.info`** et vérifie qu’il est appelé avec **`timed`**. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">def test_timed_logs(caplog):
    @timed
    def f():
        return 1
    with caplog.at_level(logging.INFO):
        f()
    assert "took" in caplog.text</code></pre>
</div>
</details>

**Exercice 6** — **`lru_cache`** sur **`parse_line`** si ligne **seule** — pertinent ? <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Peut aider si beaucoup de lignes dupliquées ; sinon mémoire.</code></pre>
</div>
</details>

**Exercice 7** — **`singledispatch`** sur type de **source** — fichier vs stdin. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Deux implémentations parse_lines selon Path vs TextIO.</code></pre>
</div>
</details>

**Exercice 8** — Ordre des décorateurs **`@timed`** et **`@log_calls`** sur **`f`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># @timed @log_calls def f → f = timed(log_calls(f)) — log_calls exécuté en premier à l'appel.</code></pre>
</div>
</details>

**Exercice 9** — Évite les **effets de bord** dans les décorateurs : principe. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">Un décorateur ne doit pas casser la signature ni les métadonnées (wraps).</code></pre>
</div>
</details>

**Exercice 10** — **`contextmanager`** pour mesurer un **bloc** dans **`main`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from contextlib import contextmanager
@contextmanager
def timer(name):
    t0 = time.perf_counter()
    yield
    print(name, time.perf_counter() - t0)</code></pre>
</div>
</details>

**Exercice 11** — **`__wrapped__`** après **`wraps`** — usage. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Accéder à la fonction originale décorée.</code></pre>
</div>
</details>

**Exercice 12** — Documente en **README** le flag **`--verbose`** activant les logs décoratifs. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">--verbose : niveau DEBUG pour les durées de parse/aggregate.</code></pre>
</div>
</details>

<h2 id="suite">Suite</h2>

La suite logique est la partie 4 : [asyncio et batch de fichiers](/projet-av-journal-4-asyncio-batch/). Les métriques ajoutées ici aideront à comprendre ce qui change quand on traite plusieurs fichiers et quand on délègue de l’I/O disque.

Tu peux aussi revoir [tests et qualité Python](/python-inter-tests-qualite/) pour tester proprement les logs avec `caplog`.

## Amazon (partenaire)

- [Python patterns](https://www.amazon.fr/s?k=python+design+patterns+livre&tag=manuso06-21)

*Partenaire Amazon — commission possible sur achats éligibles, sans surcoût pour vous.*
