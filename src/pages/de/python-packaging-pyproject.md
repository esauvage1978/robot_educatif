---
layout: ../../layouts/DePost.astro
title: "pyproject.toml: modernes Python-Packaging (Leitfaden)"
description: "pyproject.toml (PEP 621): venv, python -m build, Wheel, console_scripts und Miniprojekt salutcli. 20 Übungen, Oktober 2026."
updated: "31. Oktober 2026"
schemaUpdated: "2026-10-31"
faqSchema:
  - question: "Wofür dient pyproject.toml?"
    answer: "Moderne Konfigurationsdatei eines Python-Projekts: Metadaten (Name, Version), Abhängigkeiten, CLI-Skripte und Build-Backend laut PEP 621."
  - question: "Wie installiere ich ein Projekt im Entwicklungsmodus?"
    answer: "Im Projektroot mit aktivem venv: pip install -e . (editierbare Installation). Quelländerungen gelten ohne Neuinstallation."
  - question: "Welcher Befehl erzeugt Wheel und sdist?"
    answer: "Nach pip install build: python -m build im Projektroot. Die Dateien liegen in dist/ (.whl und .tar.gz)."
---

**Kurzantwort (Oktober 2026):** Ein Python-Projekt wird mit **`pip`** (Paketmanager) **installierbar**, wenn Sie es in **`pyproject.toml`** nach **PEP 621** beschreiben — **PEP** bedeutet *Python Enhancement Proposal* (offizielle Sprachevolution). Mit **`python -m build`** entsteht ein **Wheel** (`.whl`), getestet wird mit **`pip install -e .`**. Die Lektion folgt auf dem [fortgeschrittenen Python-Pfad](/programmation/python-avance/) nach dem [Typing](/python-av-typing-avance/) und führt zum [Packaging-Kapitel (6/6) des CLI-Log-Projekts](/projet-av-journal-6-package-pyproject/).

Eine Bibliothek oder **Kommandozeilen-App** bedient sich der **CLI** (*Command Line Interface* — Eingabe im **Terminal**). **Standard-Packaging** umfasst Metadaten, **`src/`**-Layout, **`console_scripts`** (Shell-Befehl nach Installation, z. B. `salutcli`) und **Wheels**. **`pyproject.toml`** bündelt das. Das **Build-Backend** (Werkzeug, das aus `pyproject.toml` das Paket baut) steht unter **`[build-system]`** — z. B. **`setuptools`**, **`hatchling`**, **`flit`**, **`poetry`**; hier **setuptools**.

Reines **Python-Packaging** — kein Roboter. Editor und [venv mit pip](/python-inter-venv-pip/) (isolierter virtueller Ordner) genügen.

![Python-Terminal mit pip-Befehl](/images/lot2/python-plus-ou-moins-terminal.webp)

*Screenshot (Emmanuel Sauvage, Robot Éducatif — Oktober 2026): Python und `pip` im Terminal prüfen, am besten mit aktivem venv.*

| Info | Detail |
| --- | --- |
| **Ziel** | Gültiges `pyproject.toml`, Wheel bauen, CLI-Befehl starten |
| **Niveau** | Mittel → schwer (Übungen 15–20) |
| **Dauer** | 45–90 Minuten |
| **Voraussetzungen** | [venv und pip](/python-inter-venv-pip/), Python-Grundlagen, [pathlib](/de/python-pathlib/) hilfreich |
| **Ergebnis** | Ordner `dist/` mit `.whl` + Befehl `salutcli` |

<aside class="article-callout" role="note">
<p><strong>Bevor Sie beginnen</strong></p>
<ul>
<li><strong>Python 3.10+</strong> (<code>python --version</code>).</li>
<li><code>python -m venv .venv</code>, dann aktivieren.</li>
<li><code>python -m pip install -U pip build</code>.</li>
<li>Für **PyPI** (Python Package Index): **2FA** aktivieren; keine API-Tokens ins Git; <code>twine</code> nur zum Hochladen.</li>
</ul>
</aside>

## 1. Minimales `pyproject.toml` (Konzept)

Drei Blöcke reichen zum Start:

```toml
[build-system]
requires = ["setuptools>=61"]
build-backend = "setuptools.build_meta"

[project]
name = "meinwerkzeug"
version = "0.1.0"
dependencies = ["requests>=2.28"]

[project.scripts]
meinwerkzeug = "meinwerkzeug.cli:main"
```

- **`[build-system]`** — welches Werkzeug das Wheel baut (hier **setuptools**).
- **`[project]`** — Name, Version, Abhängigkeiten (sichtbar auf **PyPI** bei Veröffentlichung).
- **`[project.scripts]`** — registriert einen Shell-Befehl; **`meinwerkzeug.cli:main`** zeigt auf **`main`** in **`cli.py`**.

## 2. Installation im Editier-Modus

**`pip install -e .`** installiert im **Entwicklungsmodus** (**`-e`** = editable): Quelländerungen gelten **ohne** Neuinstallation. Der Punkt **`.`** ist der Ordner mit **`pyproject.toml`**.

**Kontrolle:** **`pip show meinwerkzeug`** zeigt Version und Installationspfad.

## 3. Wheel und sdist

**`python -m build`** erzeugt zwei Dateien in **`dist/`**:

- **wheel** (`.whl`) — vorgebautes Archiv, schnelle Installation.
- **sdist** (`.tar.gz`, Quellverteilung) — Quellarchiv, lokal beim Nutzer gebaut (langsamer).

Zum Lernen genügen **lokales Wheel** und **`pip install -e .`** — kein **PyPI**-Konto nötig.

<figure>
<img src="/images/illustrations/projet-av-journal-6-package-pyproject.webp" alt="Didaktische Illustration: Python-Projekt mit pyproject.toml und Wheel in dist/" width="960" height="540" loading="lazy" decoding="async" />
<figcaption>Zielbild: Metadaten in <code>pyproject.toml</code>, Artefakte in <code>dist/</code> — Emmanuel Sauvage, Robot Éducatif, Oktober 2026.</figcaption>
</figure>

## 4. Versionen und Abhängigkeiten

**Semantic Versioning** nutzt **`MAJOR.MINOR.PATCH`** (z. B. **`1.2.3`**). In **`dependencies`** steuern **`~=`**, **`>=`**, **`<`** den **Resolver** von **`pip`** (Versionen passend zueinander wählen).

## Geführtes Miniprojekt: Befehl `salutcli`

Ziel: installierbares Paket mit **`salutcli Name`**. Ca. **30–40 Minuten**.

### Ordnerstruktur (`src/`)

```text
salutcli/
├── pyproject.toml
├── README.md
└── src/
    └── salutcli/
        ├── __init__.py
        └── cli.py
```

**`src/salutcli/cli.py`**:

```python
import sys

def main() -> None:
    name = sys.argv[1] if len(sys.argv) > 1 else "Welt"
    print(f"Hallo, {name}!")

if __name__ == "__main__":
    main()
```

**`pyproject.toml`** (vollständiges Beispiel):

```toml
[build-system]
requires = ["setuptools>=61"]
build-backend = "setuptools.build_meta"

[project]
name = "salutcli"
version = "0.1.0"
requires-python = ">=3.10"
dependencies = []

[project.scripts]
salutcli = "salutcli.cli:main"

[tool.setuptools.packages.find]
where = ["src"]
```

### Schritte (im Ordner `salutcli/`)

1. Struktur und Dateien anlegen.
2. venv aktivieren, dann **`pip install -e .`**
3. **`salutcli Ada`** → Ausgabe `Hallo, Ada!`
4. `cli.py` ändern ohne Neuinstallation — Editier-Modus übernimmt Änderungen.
5. **`python -m build`** (vorher **`pip install build`** falls nötig).
6. **`dist/`** prüfen: `.whl` und `.tar.gz`.
7. (Optional) In **frischem** venv: **`pip install dist/salutcli-0.1.0-py3-none-any.whl`**.

**Kontrolle:** **`pip show salutcli`** listet Name, Version und Pfad.

## Fehlerbehebung

| Symptom | Tipp |
| --- | --- |
| `ModuleNotFoundError` | `where = ["src"]` und Paket unter `src/`; [venv und pip](/python-inter-venv-pip/) |
| Befehl unbekannt | venv aktiv; Windows: neues Terminal |
| Build scheitert | `pip install build`; TOML-Syntax |
| Falsche Version installiert | `version` in `[project]` erhöhen oder `pip uninstall salutcli` |
| Falscher Import aus Arbeitsordner | **`src/`**-Layout bevorzugen |
| `ERROR: File "setup.py" not found` | Mit **`pyproject.toml` allein** **`python -m build`** nutzen, nicht **`setup.py`** |
| `twine upload` abgelehnt | Version, TestPyPI vs Produktion, **2FA** prüfen |

## Häufige Fragen

**Brauche ich PyPI zum Lernen?** Nein. Lokales Wheel und **`pip install`** reichen. PyPI dient der **Veröffentlichung**.

**Wheel oder sdist?** Das **Wheel** installiert direkt; **sdist** wird aus Quellcode neu gebaut.

**Noch `setup.py`?** Für neue Projekte reicht **`pyproject.toml`** mit setuptools ≥ 61.

## Externe Ressourcen

- **[Packaging Python](https://packaging.python.org/)**
- **[PEP 621](https://peps.python.org/pep-0621/)**
- **[setuptools](https://setuptools.pypa.io/)**

## Übungen (20)

### Einfaches Niveau

**Übung 1** — Nenne die **zwei** üblichen Artefakt-Dateien von **`python -m build`**. <span class="exo-badge exo-badge--simple">Einfach</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">.whl (wheel) und .tar.gz (sdist)</code></pre>
</div>
</details>

**Übung 2** — Was macht **`pip install -e .`**? <span class="exo-badge exo-badge--simple">Einfach</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Editierbare Installation: Verknüpfung zu den Quellen; Änderungen in src/ sofort wirksam.</code></pre>
</div>
</details>

**Übung 3** — Wo deklariert man eine **CLI** `foo` → **`pkg.cli:main`**? <span class="exo-badge exo-badge--simple">Einfach</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-toml">[project.scripts]
foo = "pkg.cli:main"</code></pre>
</div>
</details>

**Übung 4** — **`install_requires`** vs **`[project] dependencies`**. <span class="exo-badge exo-badge--simple">Einfach</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># PEP 621: dependencies in [project]; setuptools schreibt sie in Wheel-Metadaten.</code></pre>
</div>
</details>

**Übung 5** — Warum **`src/`-Layout**? <span class="exo-badge exo-badge--simple">Einfach</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Verhindert Import des falschen Pakets aus dem Arbeitsverzeichnis.</code></pre>
</div>
</details>

**Übung 6** — **`MANIFEST.in`**. <span class="exo-badge exo-badge--simple">Einfach</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Nicht-Python-Dateien in die sdist aufnehmen.</code></pre>
</div>
</details>

**Übung 7** — **`[project.optional-dependencies]`** mit **`dev`**. <span class="exo-badge exo-badge--simple">Einfach</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-toml">[project.optional-dependencies]
dev = ["pytest>=7"]</code></pre>
</div>
</details>

### Mittleres Niveau

**Übung 8** — **`pip install ".[dev]"`**. <span class="exo-badge exo-badge--inter">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">pip install ".[dev]"</code></pre>
</div>
</details>

**Übung 9** — **`__version__`** vs **`importlib.metadata.version("pkg")`**. <span class="exo-badge exo-badge--inter">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># metadata liest die installierte Version aus den Dist-Metadaten.</code></pre>
</div>
</details>

**Übung 10** — **`requires-python = ">=3.10"`**. <span class="exo-badge exo-badge--inter">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-toml">requires-python = ">=3.10"</code></pre>
</div>
</details>

**Übung 11** — **`twine upload`** statt **`pip`** für PyPI. <span class="exo-badge exo-badge--inter">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Spezielles Upload-Werkzeug mit Prüfungen und sicheren Uploads.</code></pre>
</div>
</details>

**Übung 12** — **`packages = ["pkg"]`** vs **`find:`**. <span class="exo-badge exo-badge--inter">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># find entdeckt Unterpakete automatisch.</code></pre>
</div>
</details>

**Übung 13** — Alternatives **Build-Backend**. <span class="exo-badge exo-badge--inter">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">hatchling, flit, poetry-core, pdm-backend</code></pre>
</div>
</details>

**Übung 14** — **`LICENSE`** und **`[project] license`**. <span class="exo-badge exo-badge--inter">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Klärt Wiederverwendungsrechte für Veröffentlichungen.</code></pre>
</div>
</details>

**Checkpoint:** Miniprojekt `salutcli` beherrschen, bevor Übungen 15–20.

### Schwieriges Niveau

**Übung 15** — **`dynamic = ["version"]`** mit **`setuptools-scm`**. <span class="exo-badge exo-badge--hard">Schwer</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-toml">[project]
dynamic = ["version"]

[tool.setuptools_scm]</code></pre>
<p>Version aus Git-Tags (z. B. <code>v1.2.3</code> → <code>1.2.3</code>).</p>
</div>
</details>

**Übung 16** — **`pip`**-Resolver bei Versionskonflikt. <span class="exo-badge exo-badge--hard">Schwer</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Backtracking über Constraints; Fehler bei unmöglichem Graphen.</code></pre>
</div>
</details>

**Übung 17** — **`[tool.setuptools.package-data]`**. <span class="exo-badge exo-badge--hard">Schwer</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-toml">[tool.setuptools.package-data]
"pkg" = ["data/*.json"]</code></pre>
</div>
</details>

**Übung 18** — **`pip install --no-deps`**. <span class="exo-badge exo-badge--hard">Schwer</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Unvollständige Umgebung; Laufzeitfehler bei fehlenden Abhängigkeiten.</code></pre>
</div>
</details>

**Übung 19** — **`uv`** / **`pip-tools compile`**. <span class="exo-badge exo-badge--hard">Schwer</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Reproduzierbare Auflösung mit Hashes.</code></pre>
</div>
</details>

**Übung 20** — **Namespace-Pakete**. <span class="exo-badge exo-badge--hard">Schwer</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Plugins separat unter demselben logischen Namespace verteilt.</code></pre>
</div>
</details>

## Ende des Fortgeschrittenen-Pfads

Geführtes Projekt: [CLI-Log-Hub](/programmation/projet-python-avance-journal/) — anwenden in [Packaging-Kapitel 6/6](/projet-av-journal-6-package-pyproject/) (Befehle sprachunabhängig).

## Weiter mit Python auf dieser Website

- [pathlib](/de/python-pathlib/)
- [Datentypen und Eingabe](/de/python-datentypen-eingabe/)
- [Terminal-Minispiel](/de/python-mini-terminalspiel/)
- [Fortgeschrittenen-Hub](/programmation/python-avance/)
- [Mittelstufe](/programmation/python-intermediaire/)
- [venv und pip](/python-inter-venv-pip/)

## Amazon (Partner)

Aktuellen Preis auf der Angebotsseite prüfen. Partnerlink — bei qualifizierten Käufen ist eine Provision möglich, **ohne Mehrpreis** für Sie.

- <a href="/go/az-de-a693911536" rel="sponsored nofollow noopener" class="affiliate-link">Python-Packaging-Bücher auf Amazon.de</a> — Titel und Auflage vor dem Kauf prüfen.

*Emmanuel Sauvage — aktualisiert am 31. Oktober 2026.*
