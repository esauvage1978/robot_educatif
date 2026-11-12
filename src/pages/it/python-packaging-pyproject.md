---
layout: ../../layouts/ItPost.astro
title: "pyproject.toml: packaging Python moderno (guida)"
description: "pyproject.toml (PEP 621): venv, python -m build, wheel, console_scripts e mini-progetto salutcli. 20 esercizi, ottobre 2026."
updated: "31 ottobre 2026"
schemaUpdated: "2026-10-31"
faqSchema:
  - question: "A cosa serve pyproject.toml?"
    answer: "File di configurazione moderno di un progetto Python: metadati, dipendenze, script CLI e build backend secondo la PEP 621."
  - question: "Come installo un progetto in modalità sviluppo?"
    answer: "Nella root del progetto, con venv attivo: pip install -e . (installazione editabile). Le modifiche al codice sono visibili senza reinstallare."
  - question: "Quale comando produce wheel e sdist?"
    answer: "Dopo pip install build, eseguire python -m build nella root: i file compaiono in dist/ (.whl e .tar.gz)."
---

**In sintesi (ottobre 2026):** per rendere un progetto **installabile** con **`pip`** (gestore pacchetti Python), descrivetelo in **`pyproject.toml`** secondo la **PEP 621** — **PEP** significa *Python Enhancement Proposal* (proposta ufficiale di evoluzione del linguaggio). Costruite un **wheel** (`.whl`) con **`python -m build`**, poi testate con **`pip install -e .`**. Lezione del [percorso Python avanzato](/programmation/python-avance/) dopo il [typing avanzato](/python-av-typing-avance/) e collegata al [capitolo packaging (6/6) del journal CLI](/projet-av-journal-6-package-pyproject/).

Distribuire una libreria o un’**app a riga di comando** usa la **CLI** (*Command Line Interface* — comandi nel **terminale**). Servono metadati, layout **`src/`**, **`console_scripts`** (comando shell dopo l’installazione, es. `salutcli`) e **wheel**. Un **build backend** (strumento che legge `pyproject.toml` e costruisce il pacchetto) si dichiara in **`[build-system]`** — **`setuptools`**, **`hatchling`**, **`flit`**, **`poetry`**; qui **setuptools**.

Solo **packaging Python** — nessun robot. Editor e [venv con pip](/python-inter-venv-pip/) (ambiente virtuale isolato) bastano.

![Terminale Python con comando pip](/images/lot2/python-plus-ou-moins-terminal.webp)

*Screenshot (Emmanuel Sauvage, Robot Éducatif — ottobre 2026): verificate Python e `pip` nel terminale, preferibilmente con venv attivo.*

| Info | Dettaglio |
| --- | --- |
| **Obiettivo** | `pyproject.toml` valido, wheel, comando CLI funzionante |
| **Livello** | Intermedio → difficile (esercizi 15–20) |
| **Tempo** | 45–90 minuti |
| **Prerequisiti** | [venv e pip](/python-inter-venv-pip/), basi Python, [pathlib](/it/python-pathlib/) utile |
| **Risultato** | Cartella `dist/` con `.whl` + comando `salutcli` |

<aside class="article-callout" role="note">
<p><strong>Prima di iniziare</strong></p>
<ul>
<li><strong>Python 3.10+</strong> (<code>python --version</code>).</li>
<li><code>python -m venv .venv</code> e attivazione.</li>
<li><code>python -m pip install -U pip build</code>.</li>
<li>Per **PyPI** (indice pubblico dei pacchetti Python): **2FA** attiva; mai token API nel repository; <code>twine</code> solo per pubblicare.</li>
</ul>
</aside>

## 1. `pyproject.toml` minimale

Tre blocchi per iniziare:

```toml
[build-system]
requires = ["setuptools>=61"]
build-backend = "setuptools.build_meta"

[project]
name = "mioutil"
version = "0.1.0"
dependencies = ["requests>=2.28"]

[project.scripts]
mioutil = "mioutil.cli:main"
```

- **`[build-system]`** — strumento che costruisce il wheel (qui **setuptools**).
- **`[project]`** — nome, versione, dipendenze (visibili su **PyPI** se pubblicate).
- **`[project.scripts]`** — registra un comando; **`mioutil.cli:main`** punta a **`main`** in **`cli.py`**.

## 2. Installazione editabile

**`pip install -e .`** = modalità **sviluppo** (**`-e`** = editable): modifiche visibili **senza** reinstallare. Il **`.`** è la cartella con **`pyproject.toml`**.

**Controllo:** **`pip show mioutil`** mostra versione e percorso.

## 3. Wheel e sdist

**`python -m build`** crea due file in **`dist/`**:

- **wheel** (`.whl`) — archivio precompilato, installazione rapida.
- **sdist** (`.tar.gz`) — sorgente, ricostruito sulla macchina dell’utente (più lento).

Per imparare bastano **wheel locale** e **`pip install -e .`** — nessun account **PyPI** obbligatorio.

<figure>
<img src="/images/illustrations/projet-av-journal-6-package-pyproject.webp" alt="Illustrazione didattica: progetto Python impacchettato con pyproject.toml e wheel in dist/" width="960" height="540" loading="lazy" decoding="async" />
<figcaption>Obiettivo: metadati in <code>pyproject.toml</code>, artefatti in <code>dist/</code> — Emmanuel Sauvage, Robot Éducatif, ottobre 2026.</figcaption>
</figure>

## 4. Versioni e dipendenze

**Semantic versioning** usa **`MAJOR.MINOR.PATCH`** (es. **`1.2.3`**). In **`dependencies`**, **`~=`**, **`>=`**, **`<`** guidano il **risolutore** di **`pip`**.

## Mini-progetto guidato: comando `salutcli`

Obiettivo: pacchetto installabile che saluta per nome. Circa **30–40 minuti**.

### Struttura cartelle (`src/`)

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
    nome = sys.argv[1] if len(sys.argv) > 1 else "mondo"
    print(f"Ciao, {nome}!")

if __name__ == "__main__":
    main()
```

**`pyproject.toml`** (esempio completo):

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

### Passi (nella cartella `salutcli/`)

1. Create struttura e file.
2. venv attivo → **`pip install -e .`**
3. **`salutcli Ada`** → `Ciao, Ada!`
4. Modificate `cli.py` senza reinstallare.
5. **`python -m build`** (prima **`pip install build`** se serve).
6. Controllate **`dist/`** (`.whl` e `.tar.gz`).
7. (Opzionale) In venv **nuovo**: **`pip install dist/salutcli-0.1.0-py3-none-any.whl`**.

**Controllo:** **`pip show salutcli`**.

## Risoluzione problemi

| Problema | Suggerimento |
| --- | --- |
| `ModuleNotFoundError` | `where = ["src"]` e cartella sotto `src/`; [venv e pip](/python-inter-venv-pip/) |
| Comando assente | Riattivare il venv; Windows: nuovo terminale |
| Build fallita | `pip install build`; sintassi TOML |
| Versione sbagliata | Incrementare `version` o `pip uninstall salutcli` |
| Import errato dalla cwd | Layout **`src/`** |
| `ERROR: File "setup.py" not found` | Con solo **`pyproject.toml`**, usate **`python -m build`**, non **`setup.py`** |
| `twine upload` rifiutato | Versione, TestPyPI vs produzione, **2FA** |

## Domande frequenti

**Serve PyPI per imparare?** No. Wheel locale e **`pip install`** bastano.

**Wheel o sdist?** Il **wheel** si installa così com’è; lo **sdist** si ricostruisce dal sorgente.

**Serve ancora `setup.py`?** Per progetti nuovi basta **`pyproject.toml`** con setuptools ≥ 61.

## Risorse esterne

- **[Packaging Python](https://packaging.python.org/)**
- **[PEP 621](https://peps.python.org/pep-0621/)**
- **[setuptools](https://setuptools.pypa.io/)**

## Esercizi (20)

### Livello semplice

**Esercizio 1** — I **due** artefatti di **`python -m build`**. <span class="exo-badge exo-badge--simple">Semplice</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">.whl (wheel) e .tar.gz (sdist)</code></pre>
</div>
</details>

**Esercizio 2** — **`pip install -e .`**. <span class="exo-badge exo-badge--simple">Semplice</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Installazione editabile: collega le sorgenti; le modifiche in src/ sono subito attive.</code></pre>
</div>
</details>

**Esercizio 3** — CLI **`foo`** → **`pkg.cli:main`**. <span class="exo-badge exo-badge--simple">Semplice</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-toml">[project.scripts]
foo = "pkg.cli:main"</code></pre>
</div>
</details>

**Esercizio 4** — **`install_requires`** vs **`[project] dependencies`**. <span class="exo-badge exo-badge--simple">Semplice</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># PEP 621 unifica in [project]; setuptools mappa verso i metadati del wheel.</code></pre>
</div>
</details>

**Esercizio 5** — Layout **`src/`**. <span class="exo-badge exo-badge--simple">Semplice</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Evita import errati dalla directory corrente.</code></pre>
</div>
</details>

**Esercizio 6** — **`MANIFEST.in`**. <span class="exo-badge exo-badge--simple">Semplice</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Include file non Python nella sdist.</code></pre>
</div>
</details>

**Esercizio 7** — **`optional-dependencies`** **`dev`**. <span class="exo-badge exo-badge--simple">Semplice</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-toml">[project.optional-dependencies]
dev = ["pytest>=7"]</code></pre>
</div>
</details>

### Livello intermedio

**Esercizio 8** — **`pip install ".[dev]"`**. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">pip install ".[dev]"</code></pre>
</div>
</details>

**Esercizio 9** — **`__version__`** vs **`importlib.metadata`**. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># metadata legge la versione installata dai metadati del dist.</code></pre>
</div>
</details>

**Esercizio 10** — **`requires-python = ">=3.10"`**. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-toml">requires-python = ">=3.10"</code></pre>
</div>
</details>

**Checkpoint (dopo esercizi 1–10):** mini-progetto, `[project.scripts]`, `python -m build`, `pip install -e .`.

**Esercizio 11** — **`twine upload`** e PyPI. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Strumento dedicato con controlli e upload sicuri.</code></pre>
</div>
</details>

**Esercizio 12** — **`packages`** vs **`find:`**. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># find scopre i sottopacchetti automaticamente.</code></pre>
</div>
</details>

**Esercizio 13** — **Build backend** alternativo. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">hatchling, flit, poetry-core, pdm-backend</code></pre>
</div>
</details>

**Esercizio 14** — **`LICENSE`**. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Chiarisce i diritti di riuso.</code></pre>
</div>
</details>

### Livello difficile

**Esercizio 15** — **`setuptools-scm`**. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-toml">[project]
dynamic = ["version"]

[tool.setuptools_scm]</code></pre>
<p>Versione derivata dai tag Git (es. <code>v1.2.3</code> → <code>1.2.3</code>).</p>
</div>
</details>

**Esercizio 16** — Risolutore **`pip`**. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Backtracking sui vincoli.</code></pre>
</div>
</details>

**Esercizio 17** — **`package-data`**. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-toml">[tool.setuptools.package-data]
"pkg" = ["data/*.json"]</code></pre>
</div>
</details>

**Esercizio 18** — **`--no-deps`**. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Ambiente incompleto; crash se mancano dipendenze.</code></pre>
</div>
</details>

**Esercizio 19** — **`uv`** / **`pip-tools`**. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Risoluzione riproducibile con hash.</code></pre>
</div>
</details>

**Esercizio 20** — **Namespace packages**. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Plugin distribuiti separatamente sotto lo stesso namespace logico.</code></pre>
</div>
</details>

## Fine del percorso avanzato

Progetto guidato: [hub journal CLI](/programmation/projet-python-avance-journal/) — applicazione in [capitolo packaging 6/6](/projet-av-journal-6-package-pyproject/) (comandi indipendenti dalla lingua dell’articolo).

## Per approfondire

- [pathlib](/it/python-pathlib/)
- [Tipi e input](/it/python-tipi-e-input/)
- [Mini-gioco terminale](/it/python-mini-gioco-terminale/)
- [Hub Python avanzato](/programmation/python-avance/)
- [Hub intermedio](/programmation/python-intermediaire/)
- [venv e pip](/python-inter-venv-pip/)

## Amazon (partner)

Verificate titolo, edizione e **prezzo attuale** su Amazon.it. Link partner — commissione possibile senza costi aggiuntivi per te.

- <a href="/go/az-it-37cd0256df" rel="sponsored nofollow noopener" class="affiliate-link">Libri Python packaging su Amazon.it</a> — controllate edizione prima dell’acquisto.
*Emmanuel Sauvage — aggiornato il 31 ottobre 2026.*
