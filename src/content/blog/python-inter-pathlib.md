---
title: "Python intermédiaire — pathlib : chemins et fichiers"
description: "pathlib : Path, chemins portables, lecture/écriture UTF-8, existence, glob ; pourquoi abandonner os.path pour le code neuf ; ressources ; 20 exercices."
pubDate: 2026-03-29
updatedDate: 2026-03-29
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Python intermédiaire
seriesOrder: 3
tags: ["Python", "Programmation", "Bonnes pratiques"]
relatedLinks:
  - title: "Leçon 2 — venv et pip"
    href: "/python-inter-venv-pip/"
  - title: "Leçon 4 — classes et POO"
    href: "/python-inter-poo-classes/"
categories:
  - "Python"
  - "Programmation"
  - "Tutoriel"
  - "Intermédiaire"
---
Manipuler les chemins comme de **simples chaînes de caractères** (`"dossier" + "\\" + "fichier.txt"`) mène vite aux bugs : séparateurs **Windows** (`\`) vs **POSIX** (`/`), doubles barres, chemins **relatifs** ambigus selon le répertoire courant, et oublis d’**encodage** à la lecture. Le module **`pathlib`** (bibliothèque standard, stable depuis Python 3.4+) propose des objets **`Path`** qui **représentent** un chemin de façon **abstraite**, puis le **rendent** correctement pour le système au moment voulu.

Une **`Path`** sait se **composer** avec l’opérateur **`/`** (surchargé), lister un répertoire, tester **fichier** vs **dossier**, lire ou écrire du **texte** en une ligne. C’est devenu l’approche **recommandée** pour le **code neuf** ; l’ancien module **`os.path`** reste lisible dans du code legacy, mais **`pathlib`** unifie l’API et améliore la **lisibilité**.

## 1. Créer et composer un chemin

**`Path("relatif")`** pointe par rapport au répertoire de travail courant ; **`Path("/absolu")`** (sur Unix) ou **`Path("C:/Users/...")`** (sur Windows) fixent une racine. L’opérateur **`/`** évite les concaténations manuelles : chaque segment est un morceau du chemin, et la représentation finale respecte l’OS.

```python
from pathlib import Path
racine = Path(".")
fichier = racine / "data" / "notes.txt"
```

**Bonnes pratiques** : dans du **nouveau code**, privilégie **`pathlib.Path`** et **`/`** plutôt que **`os.path.join`** répété. Pour des chemins **sans accès disque** (logique pure), **`PurePath`** existe, mais **`Path`** suffit le plus souvent.

## 2. Lire et écrire du texte

Les méthodes **`read_text`** et **`write_text`** encapsulent l’ouverture de fichier et la lecture/écriture **complète** en mémoire — pratique pour des fichiers **petits ou moyens** (config, export). Pour de très gros fichiers, on préfère ouvrir en **flux** (`open()` ou `Path.open()`).

```python
p = Path("hello.txt")
p.write_text("Bonjour\n", encoding="utf-8")
print(p.read_text(encoding="utf-8"))
```

**Encodage** : sur Windows, l’encodage par défaut historique n’est pas toujours UTF-8 ; **imposer explicitement `encoding="utf-8"`** pour le texte évite les **`UnicodeDecodeError`** au déploiement sur un autre OS.

## 3. Existence, type et résolution

Avant de lire, on vérifie souvent **`exists()`** ; **`is_file()`** et **`is_dir()`** distinguent fichier et dossier. **`resolve()`** peut retourner un chemin **absolu** et **normalisé** (résolution des `..`), utile pour comparer deux chemins ou les afficher clairement.

```python
if p.exists():
    print("trouvé")
if p.is_file():
    ...
```

## 4. Parcourir un dossier et motifs (`glob`)

**`iterdir()`** énumère les **enfants directs** d’un répertoire. **`glob("**/*.py")`** ou **`rglob("*.py")`** appliquent des **motifs** récursifs — pratique pour traiter tous les fichiers d’un type sans écrire une boucle `os.walk` manuelle.

```python
for child in Path(".").iterdir():
    print(child.name)
```

**Bonnes pratiques** : ne pas oublier que **`glob`** dépend du **contenu réel du disque** ; en tests, on isole souvent un **répertoire temporaire** (`tmp_path` avec **pytest**) pour rester reproductible.

## Ressources externes

- **[pathlib — Documentation](https://docs.python.org/fr/3/library/pathlib.html)** : types `Path`, `PurePath`, méthodes (FR).
- **[Équivalence pathlib / os.path](https://docs.python.org/3/library/pathlib.html#corresponding-tools)** : tableau officiel (page EN ; la section existe aussi dans la doc FR sous le même titre).
- **[open() et encodage](https://docs.python.org/fr/3/library/functions.html#open)** : rappel sur `encoding` et le mode texte.

## Exercices (20)

Les exercices fixent les **réflexes** : composition avec **`/`**, **UTF-8**, tests d’existence. Les **solutions** sont masquées par défaut.

### Niveau simple

**Exercice 1** — Crée **`Path("a.txt")`** et affiche sa **représentation** avec **`print`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
print(Path("a.txt"))</code></pre>
</div>
</details>

**Exercice 2** — Construis le chemin **`dossier/sous/fichier.txt`** avec l’opérateur **`/`** à partir de **`Path("dossier")`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
p = Path("dossier") / "sous" / "fichier.txt"
print(p)</code></pre>
</div>
</details>

**Exercice 3** — Écris **`"hi"`** dans **`out.txt`** avec **`write_text`** et **`encoding="utf-8"`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
Path("out.txt").write_text("hi", encoding="utf-8")</code></pre>
</div>
</details>

**Exercice 4** — Lis le contenu de **`out.txt`** avec **`read_text`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
print(Path("out.txt").read_text(encoding="utf-8"))</code></pre>
</div>
</details>

**Exercice 5** — Vérifie si **`data.txt`** existe avec **`.exists()`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
print(Path("data.txt").exists())</code></pre>
</div>
</details>

**Exercice 6** — Affiche le **nom de fichier seul** (**`name`**) pour **`/tmp/a/b.txt`** (utilise **`Path`**). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
print(Path("/tmp/a/b.txt").name)</code></pre>
</div>
</details>

**Exercice 7** — Affiche le **dossier parent** avec **`.parent`** pour **`Path("dossier/fichier.py")`**. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
print(Path("dossier/fichier.py").parent)</code></pre>
</div>
</details>

### Niveau intermédiaire

**Exercice 8** — Liste les **fichiers** du répertoire courant dont le suffixe est **`.txt`** (boucle **`iterdir`** + test **`.suffix`**). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
for p in Path(".").iterdir():
    if p.is_file() and p.suffix == ".txt":
        print(p)</code></pre>
</div>
</details>

**Exercice 9** — Utilise **`glob("*.py")`** dans le dossier courant pour lister les **`.py`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
for p in Path(".").glob("*.py"):
    print(p)</code></pre>
</div>
</details>

**Exercice 10** — Crée un dossier **`tmp`** avec **`Path("tmp").mkdir(exist_ok=True)`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
Path("tmp").mkdir(exist_ok=True)</code></pre>
</div>
</details>

**Exercice 11** — Résous un chemin **absolu** avec **`.resolve()`** à partir de **`Path("README.md")`**. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
print(Path("README.md").resolve())</code></pre>
</div>
</details>

**Exercice 12** — Bonne pratique : explique pourquoi **`Path` / "a" / "b"`** vaut mieux que **`"a" + "/" + "b"`** sur des chemins utilisateur. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Path normalise les séparateurs selon l'OS et évite les doubles slash ou oublis.</code></pre>
</div>
</details>

**Exercice 13** — Ouvre en **binaire** avec **`open`** sur **`Path`** : **`Path("b.bin").read_bytes()`** (ou **`write_bytes`**). Affiche la longueur des octets lus. <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
p = Path("b.bin")
p.write_bytes(b"\x00\x01")
print(len(p.read_bytes()))</code></pre>
</div>
</details>

**Exercice 14** — Parcours **`rglob("*.md")`** depuis **`Path(".")`** pour trouver les **Markdown** récursivement (attention aux performances sur gros arbres). <span class="exo-badge exo-badge--inter">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
for p in Path(".").rglob("*.md"):
    print(p)</code></pre>
</div>
</details>

### Niveau difficile

**Exercice 15** — Fonction **`lire_si_existe(chemin: str) -> str | None`** : retourne le texte ou **`None`** si le fichier n’existe pas (**`FileNotFoundError`** géré proprement). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path

def lire_si_existe(chemin: str):
    p = Path(chemin)
    if not p.exists():
        return None
    return p.read_text(encoding="utf-8")</code></pre>
</div>
</details>

**Exercice 16** — Renomme **`old.txt`** en **`new.txt`** avec **`.rename`**. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
Path("old.txt").rename(Path("new.txt"))</code></pre>
</div>
</details>

**Exercice 17** — Compte les lignes d’un fichier texte avec **`read_text`** et **`splitlines()`** (sans fichier vide problématique). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
def nb_lignes(p):
    return len(Path(p).read_text(encoding="utf-8").splitlines())</code></pre>
</div>
</details>

**Exercice 18** — **`Path.home() / "Documents"`** : à quoi sert **`home()`** ? <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Répertoire personnel de l'utilisateur (variable selon l'OS).</code></pre>
</div>
</details>

**Exercice 19** — Bonne pratique sécurité : pourquoi éviter **`eval(Path(...).read_text())`** ? <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Un fichier texte peut contenir du code arbitraire exécuté : exécution de code non maîtrisée.</code></pre>
</div>
</details>

**Exercice 20** — Écris une fonction **`copier_texte(src, dst)`** avec **`read_text`** / **`write_text`** et **`encoding="utf-8"`** partout. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path

def copier_texte(src, dst):
    t = Path(src).read_text(encoding="utf-8")
    Path(dst).write_text(t, encoding="utf-8")</code></pre>
</div>
</details>

## Suite du parcours

[Classes et POO](/python-inter-poo-classes/) : structurer les données et le comportement avec des classes.

## Amazon (partenaire)

- [Python systèmes fichiers](https://www.amazon.fr/s?k=python+syst%C3%A8me+fichiers&tag=manuso06-21)
