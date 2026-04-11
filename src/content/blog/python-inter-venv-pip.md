---
title: "Python intermédiaire — environnements virtuels et pip"
headline: "Python intermédiaire — environnements virtuels et pip"
description: "Pourquoi isoler les dépendances : venv, activation, pip, requirements.txt, figer les versions, PyPI et sécurité ; ressources officielles ; 20 exercices avec solutions repliables."
pubDate: 2026-03-29
updatedDate: 2026-03-29
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Python intermédiaire
seriesOrder: 2
tags: ["Python", "Programmation", "Bonnes pratiques"]
relatedLinks:
  - title: "Leçon 1 — modules et imports"
    href: "/python-inter-modules-imports/"
  - title: "Leçon 3 — pathlib"
    href: "/python-inter-pathlib/"
categories:
  - "Python"
  - "Programmation"
  - "Tutoriel"
  - "Intermédiaire"
---
Si tu installes des bibliothèques avec **`pip`** directement sur le **Python « système »** ou sur **un seul interpréteur partagé**, plusieurs projets se retrouvent à **dépendre des mêmes paquets** aux **mêmes numéros de version**. Un projet qui exige **`requests` 2.28** et un autre qui suppose **`requests` 2.32** ne peuvent pas coexister proprement dans un seul `site-packages` global. Résultat typique : **« ça marchait hier »** après une mise à jour, ou des **conflits** avec les paquets gérés par le système (surtout sous Linux, où **`sudo pip install`** peut **casser** des outils de la distribution).

Un **environnement virtuel** (`venv`, module standard depuis Python 3.3) crée un **dossier autonome** qui contient une **copie** (ou des liens) de l’interpréteur Python, les scripts **`pip`**, **`python`**, et surtout un répertoire **`site-packages`** **dédié** à ce projet. Tu peux donc avoir **un venv par projet**, chacun avec son graphe de versions, **sans toucher** au reste de la machine.

## 1. Créer un venv

La commande canonique est **`python -m venv CHEMIN`**. Le **`-m venv`** garantit que tu crées l’environnement **avec la même version de Python** que celle que tu invoques (`python3.11 -m venv .venv` si tu veux figer explicitement la 3.11).

```bash
python -m venv .venv
```

**Bonnes pratiques** : nommer le dossier **`.venv`** ou **`venv`** (convention largement reconnue par les IDE). **Ajoute ce dossier au `.gitignore`** : il est **régénérable** à partir des sources et de **`requirements.txt`**, mais il est **gros**, **binaire**, et **spécifique à l’OS** (chemins Windows vs Linux). Ce que tu versionnes, c’est le **manifeste** des dépendances, pas l’environnement matériel.

## 2. Activer l’environnement

L’**activation** ne « déplace » pas les fichiers : elle **modifie le `PATH`** (et parfois d’autres variables) pour que la commande **`python`** et **`pip`** utilisées dans le terminal pointent vers **`.venv\Scripts`** (Windows) ou **`.venv/bin`** (Unix). D’où l’importance de **vérifier** avec quel `pip` tu installes (`where pip` / `which pip`) quand quelque chose semble bizarre.

- **Windows (PowerShell)** : `.\.venv\Scripts\Activate.ps1` (si l’exécution de scripts est autorisée ; sinon **`cmd`** : `.\.venv\Scripts\activate.bat`).
- **macOS / Linux** : `source .venv/bin/activate`

Le prompt affiche souvent **`(.venv)`**. Pour quitter : **`deactivate`** (retrouve la config du shell avant activation). Sans activation, tu peux toujours invoquer **`.\.venv\Scripts\python.exe`** (Windows) ou **`.venv/bin/python`** en chemin absolu — pratique en **CI** ou scripts.

## 3. Installer des paquets et figer les dépendances

**`pip`** est le **gestionnaire de paquets** installé dans le venv ; par défaut il télécharge sur **PyPI** (Python Package Index). Les paquets sont **téléchargés** (souvent **wheels** précompilés) puis **installés** dans `site-packages` **du venv actif**.

```bash
pip install requests
pip freeze > requirements.txt
```

Sur une autre machine (ou pour un collègue) :

```bash
python -m venv .venv
# activer le venv
pip install -r requirements.txt
```

**Figer les versions** : un fichier **`requirements.txt`** généré par **`pip freeze`** liste tout l’arbre avec **versions exactes** (`requests==2.31.0`, etc.), ce qui **reproduit** l’environnement. Pour un **prototype** ou un cours, un fichier plus **main** (`requests>=2.28,<3`) peut suffire, mais en **production** ou pour **déboguer** un bug ancien, les **versions figées** évitent les « déploiements qui ne sont pas comme la prod ». Des outils comme **pip-tools** (`pip-compile`) vont plus loin (résolution de dépendances avec commentaires) — hors périmètre de cette leçon, mais utile à connaître.

**Préfère `python -m pip`** à **`pip`** seul : ainsi **`pip`** est exécuté **par le même interpréteur** que **`python`**, ce qui évite d’installer dans le mauvais environnement lorsque plusieurs Python coexistent.

## 4. Mettre à jour sans tout casser

```bash
pip list --outdated
pip install --upgrade requests
```

Sur un **gros projet**, une montée de version majeure peut **changer des API** ou des **dépendances transitives**. Bon réflexe : lire les **release notes**, lancer les **tests** après chaque mise à jour ciblée, et éviter **`pip install --upgrade`** sur **tout** sans stratégie. **`pip check`** signale les **dépendances manquantes** ou **incohérentes** après une série d’installations manuelles.

## 5. PyPI, confiance et bonnes habitudes

**PyPI** est l’index **public** par défaut ; **`pip`** y accède en HTTPS. Tu n’y publies **jamais** de **secrets** (tokens API, mots de passe) : ils restent dans des **variables d’environnement** ou un **gestionnaire de secrets**, pas dans **`requirements.txt`**. Méfiance des **typosquatting** (noms de paquets proches d’une lib connue) : vérifie le **nom officiel** sur la doc du projet. Pour des dépendances **privées**, les équipes configurent des **index privés** ou des URLs — encore une fois, sans credentials dans Git.

**Note** : **Conda** / **mamba** sont un autre écosystème (souvent utile en **data science**). Ici on reste sur **venv + pip**, standard pour une **application Python** « classique ».

## Ressources externes

- **[venv — Documentation](https://docs.python.org/fr/3/library/venv.html)** : création, contenu du dossier, activation (français).
- **[Installing packages](https://packaging.python.org/tutorials/installing-packages/)** (guide Python Packaging User Guide) : venv, `pip`, bonnes pratiques modernes.
- **[pip user guide](https://pip.pypa.io/en/stable/user_guide/)** : options utiles (`install`, `freeze`, contraintes).
- **[The Python Package Index (PyPI)](https://pypi.org/)** : recherche de paquets et métadonnées officielles.

## Exercices (20)

Chaque exercice reprend les **commandes et idées** de la leçon ; les **solutions** sont masquées par défaut.

### Niveau simple

**Exercice 1** — Commande pour créer un venv nommé **`.venv`** dans le dossier courant. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">python -m venv .venv</code></pre>
</div>
</details>

**Exercice 2** — Après activation du venv, quelle commande affiche le chemin du **`pip`** utilisé ? (indice : **`where pip`** sous Windows, **`which pip`** sous Unix). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">where pip</code></pre>
</div>
</details>

**Exercice 3** — Installe le paquet **`colorama`** (exemple) avec **`pip`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">pip install colorama</code></pre>
</div>
</details>

**Exercice 4** — Génère **`requirements.txt`** à partir de l’environnement actuel. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">pip freeze > requirements.txt</code></pre>
</div>
</details>

**Exercice 5** — Réinstalle tout depuis **`requirements.txt`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">pip install -r requirements.txt</code></pre>
</div>
</details>

**Exercice 6** — Liste les paquets installés dans le venv actif. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">pip list</code></pre>
</div>
</details>

**Exercice 7** — Pourquoi ajouter **`.venv/`** au fichier **`.gitignore`** ? (réponse en une phrase dans un commentaire Python). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Le dossier du venv est volumineux et recréable avec requirements.txt ; il ne doit pas être versionné.
</code></pre>
</div>
</details>

### Niveau intermédiaire

**Exercice 8** — Commande **`pip`** pour **désinstaller** un paquet nommé **`foo`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">pip uninstall foo</code></pre>
</div>
</details>

**Exercice 9** — Affiche les paquets **périmés** avec pip. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">pip list --outdated</code></pre>
</div>
</details>

**Exercice 10** — Crée un **`requirements-dev.txt`** conceptuel : explique en commentaire qu’y mettre (**outils de test**, **linter**) par rapport à **`requirements.txt`** production. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text"># requirements.txt : dépendances d'exécution (ex. requests)
# requirements-dev.txt : pytest, black, ruff — uniquement pour développer, pas pour déployer.</code></pre>
</div>
</details>

**Exercice 11** — Pourquoi **`pip install`** sans version peut casser un vieux projet ? (2 phrases). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># pip installe la dernière version compatible, qui peut supprimer une API utilisée par le code.
# D'où l'intérêt de figer les versions ou d'utiliser des contraintes dans requirements.</code></pre>
</div>
</details>

**Exercice 12** — Commande pour afficher **l’aide** de pip sur la sous-commande **`install`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">pip install --help</code></pre>
</div>
</details>

**Exercice 13** — Nomme **deux** risques d’installer des paquets avec **`sudo pip`** sur le Python système (Linux). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Casse les paquets gérés par le gestionnaire du système ; mélange les permissions et les versions.</code></pre>
</div>
</details>

**Exercice 14** — Écris la séquence **minimale** (commandes) pour cloner un dépôt, créer un venv, activer, installer **`requirements.txt`**, lancer **`python main.py`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">git clone URL_DU_DEPOT
cd projet
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python main.py</code></pre>
</div>
</details>

### Niveau difficile

**Exercice 15** — Utilise **`python -m pip`** plutôt que **`pip`** seul : explique l’avantage (une phrase). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Garantit que pip correspond au même interpréteur Python que celui invoqué.</code></pre>
</div>
</details>

**Exercice 16** — Fige **`requests`** en **2.31.0** dans **`requirements.txt`** et indique la commande d’installation. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text"># requirements.txt
requests==2.31.0

# pip install -r requirements.txt</code></pre>
</div>
</details>

**Exercice 17** — Différence entre **`pip check`** et **`pip list`** ? <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># pip list : inventaire des paquets installés.
# pip check : vérifie les dépendances manquantes ou en conflit.</code></pre>
</div>
</details>

**Exercice 18** — Bonne pratique : variable d’environnement **`PIP_DISABLE_PIP_VERSION_CHECK=1`** en CI — à quoi ça sert ? (réponse courte). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Évite les messages interactifs ou inutiles lors des builds automatisés.</code></pre>
</div>
</details>

**Exercice 19** — Propose une **politique** de branches Git : quand regénérer **`requirements.txt`** (équipe de 2 personnes). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">À chaque ajout ou mise à jour de dépendance fonctionnelle, sur la branche feature correspondante, après tests locaux.</code></pre>
</div>
</details>

**Exercice 20** — Scénario : tu dois **reproduire** un bug en production — pourquoi le **`requirements.txt`** avec versions figées aide-t-il ? <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># On installe le même graphe de versions qu'en prod et on élimine les écarts dus à une dépendance plus récente.</code></pre>
</div>
</details>

## Suite du parcours

[pathlib](/python-inter-pathlib/) : manipuler chemins et fichiers sans concaténer des chaînes à la main.

## Amazon (partenaire)

- [Python professionnel déploiement](https://www.amazon.fr/s?k=python+d%C3%A9ploiement+livre&tag=manuso06-21)
