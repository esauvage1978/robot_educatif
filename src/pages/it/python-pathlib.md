---
layout: ../../layouts/ItPost.astro
title: "Python pathlib: percorsi e file (Path, UTF-8, glob)"
description: "Tutorial pathlib: Path, percorsi portabili, UTF-8, glob. 20 esercizi. Funziona con semplici file Python — nessun robot necessario."
updated: "31 ottobre 2026"
---

Alcuni link di questa pagina sono di affiliazione. Se acquisti tramite questi link possiamo ricevere una commissione senza costi aggiuntivi per te.

Trattare i percorsi come **semplici stringhe** (`"cartella" + "\\" + "file.txt"`) porta in fretta a bug: separatori **Windows** (`\`) vs **POSIX** (`/`), doppie barre, percorsi **relativi** ambigui secondo la directory corrente, e dimenticanze di **encoding** in lettura. Il modulo **`pathlib`** (libreria standard, stabile da Python 3.4+) propone oggetti **`Path`** che **rappresentano** un percorso in modo astratto, poi lo **rendono** correttamente per il sistema al momento opportuno.

Un **`Path`** sa **comporre** con l’operatore **`/`** (sovraccaricato), elencare una directory, testare **file** vs **cartella**, leggere o scrivere **testo** in una riga. È diventato l’approccio **consigliato** per il **codice nuovo**; il vecchio modulo **`os.path`** resta leggibile nel legacy, ma **`pathlib`** unifica l’API e migliora la **leggibilità**.

## 1. Creare e comporre un percorso

**`Path("relativo")`** punta rispetto alla directory di lavoro corrente; **`Path("/assoluto")`** (su Unix) o **`Path("C:/Users/...")`** (su Windows) fissano una radice. L’operatore **`/`** evita concatenazioni manuali: ogni segmento è un pezzo del percorso e la rappresentazione finale rispetta l’OS.

```python
from pathlib import Path
root = Path(".")
file = root / "data" / "notes.txt"
```

**Buone pratiche**: nel **codice nuovo**, privilegia **`pathlib.Path`** e **`/`** piuttosto che **`os.path.join`** ripetuto. Per percorsi **senza accesso disco** (logica pura) esiste **`PurePath`**, ma **`Path`** basta il più delle volte.

## 2. Leggere e scrivere testo

I metodi **`read_text`** e **`write_text`** incapsulano l’apertura del file e la lettura/scrittura **completa** in memoria — pratici per file **piccoli o medi** (config, export). Per file molto grandi, preferisci lo streaming (`open()` o `Path.open()`).

```python
p = Path("hello.txt")
p.write_text("Ciao\n", encoding="utf-8")
print(p.read_text(encoding="utf-8"))
```

**Encoding**: su Windows, l’encoding predefinito storico non è sempre UTF-8; **imporre esplicitamente `encoding="utf-8"`** per il testo evita **`UnicodeDecodeError`** al deploy su un altro OS.

## 3. Esistenza, tipo e risoluzione

Prima di leggere, si verifica spesso **`exists()`**; **`is_file()`** e **`is_dir()`** distinguono file e cartella. **`resolve()`** può restituire un percorso **assoluto** e **normalizzato** (risoluzione dei `..`), utile per confrontare due percorsi o mostrarli chiaramente.

```python
if p.exists():
    print("trovato")
if p.is_file():
    ...
```

## 4. Percorrere una cartella e pattern (`glob`)

**`iterdir()`** elenca i **figli diretti** di una directory. **`glob("**/*.py")`** o **`rglob("*.py")`** applicano **pattern** ricorsivi — pratici per trattare tutti i file di un tipo senza scrivere un loop `os.walk` manuale.

```python
for child in Path(".").iterdir():
    print(child.name)
```

**Buone pratiche**: non dimenticare che **`glob`** dipende dal **contenuto reale del disco**; nei test, isolare spesso una **directory temporanea** (`tmp_path` con **pytest**) per restare riproducibili.

## Risorse esterne

- **[pathlib — documentazione ufficiale (EN)](https://docs.python.org/3/library/pathlib.html)**: tipi `Path`, `PurePath`, metodi.
- **[Tabella pathlib ↔ os.path (EN)](https://docs.python.org/3/library/pathlib.html#corresponding-tools)**: equivalenze ufficiali.
- **[open() e encoding (EN)](https://docs.python.org/3/library/functions.html#open)**: promemoria su `encoding` e modalità testo.

### Mini-tabella os.path ↔ pathlib

| Operazione | os.path | pathlib |
|------------|---------|---------|
| Unire segmenti | `os.path.join("a", "b")` | `Path("a") / "b"` |
| Esiste? | `os.path.exists(p)` | `Path(p).exists()` |

## Esercizi (20)

Gli esercizi fissano i **riflessi**: composizione con **`/`**, **UTF-8**, test di esistenza. Le **soluzioni** sono nascoste di default.

### Livello semplice

**Esercizio 1** — Crea **`Path("a.txt")`** e stampa la sua **rappresentazione** con **`print`**. <span class="exo-badge exo-badge--simple">Semplice</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
print(Path("a.txt"))</code></pre>
</div>
</details>

**Esercizio 2** — Costruisci il percorso **`folder/sub/file.txt`** con l’operatore **`/`** a partire da **`Path("folder")`**. <span class="exo-badge exo-badge--simple">Semplice</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
p = Path("folder") / "sub" / "file.txt"
print(p)</code></pre>
</div>
</details>

**Esercizio 3** — Scrivi **`"hi"`** in **`out.txt`** con **`write_text`** e **`encoding="utf-8"`**. <span class="exo-badge exo-badge--simple">Semplice</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
Path("out.txt").write_text("hi", encoding="utf-8")</code></pre>
</div>
</details>

**Esercizio 4** — Leggi il contenuto di **`out.txt`** con **`read_text`**. <span class="exo-badge exo-badge--simple">Semplice</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
print(Path("out.txt").read_text(encoding="utf-8"))</code></pre>
</div>
</details>

**Esercizio 5** — Verifica se **`data.txt`** esiste con **`.exists()`**. <span class="exo-badge exo-badge--simple">Semplice</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
print(Path("data.txt").exists())</code></pre>
</div>
</details>

**Esercizio 6** — Stampa il **nome file da solo** (**`name`**) per **`/tmp/a/b.txt`** (usa **`Path`**). <span class="exo-badge exo-badge--simple">Semplice</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
print(Path("/tmp/a/b.txt").name)</code></pre>
</div>
</details>

**Esercizio 7** — Stampa la **cartella padre** con **`.parent`** per **`Path("folder/file.py")`**. <span class="exo-badge exo-badge--simple">Semplice</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
print(Path("folder/file.py").parent)</code></pre>
</div>
</details>

### Livello intermedio

**Esercizio 8** — Elenca i **file** della directory corrente con suffisso **`.txt`** (loop **`iterdir`** + test **`.suffix`**). <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
for p in Path(".").iterdir():
    if p.is_file() and p.suffix == ".txt":
        print(p)</code></pre>
</div>
</details>

**Esercizio 9** — Usa **`glob("*.py")`** nella cartella corrente per elencare i **`.py`**. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
for p in Path(".").glob("*.py"):
    print(p)</code></pre>
</div>
</details>

**Esercizio 10** — Crea una cartella **`tmp`** con **`Path("tmp").mkdir(exist_ok=True)`**. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
Path("tmp").mkdir(exist_ok=True)</code></pre>
</div>
</details>

**Esercizio 11** — Risolvi un percorso **assoluto** con **`.resolve()`** a partire da **`Path("README.md")`**. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
print(Path("README.md").resolve())</code></pre>
</div>
</details>

**Esercizio 12** — Confronta `Path("a") / "b"` con la concatenazione di stringhe `"a" + "/" + "b"`. Perché l’operatore `/` di `Path` è preferibile? <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
# Path / "a" / "b" normalizza i separatori secondo l'OS (Windows vs POSIX)
# ed evita doppie slash o omissioni. La stringa "a"+"/"+"b" e' fragile.
print(Path("a") / "b")</code></pre>
</div>
</details>

**Esercizio 13** — Apri in **binario** con **`Path`**: **`Path("b.bin").read_bytes()`** (o **`write_bytes`**). Stampa la lunghezza dei byte letti. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
p = Path("b.bin")
p.write_bytes(b"\x00\x01")
print(len(p.read_bytes()))</code></pre>
</div>
</details>

**Esercizio 14** — Percorri **`rglob("*.md")`** da **`Path(".")`** per trovare i **Markdown** ricorsivamente (attenzione alle prestazioni su alberi grandi). <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
for p in Path(".").rglob("*.md"):
    print(p)</code></pre>
</div>
</details>

### Livello difficile

**Esercizio 15** — Funzione **`read_if_exists(path: str) -> str | None`**: restituisce il testo o **`None`** se il file non esiste (**`FileNotFoundError`** gestito bene). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path

def read_if_exists(path: str):
    p = Path(path)
    if not p.exists():
        return None
    return p.read_text(encoding="utf-8")</code></pre>
</div>
</details>

**Esercizio 16** — Rinomina **`old.txt`** in **`new.txt`** con **`.rename`**. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
Path("old.txt").rename(Path("new.txt"))</code></pre>
</div>
</details>

**Esercizio 17** — Conta le righe di un file di testo con **`read_text`** e **`splitlines()`** (file vuoti gestiti senza problemi). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
def line_count(p):
    return len(Path(p).read_text(encoding="utf-8").splitlines())</code></pre>
</div>
</details>

**Esercizio 18** — **`Path.home() / "Documents"`**: a cosa serve **`home()`**? <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
# home() = cartella utente dell'OS (es. C:\Users\nome su Windows).
docs = Path.home() / "Documents"
print(docs)</code></pre>
</div>
</details>

**Esercizio 19** — Buona pratica di sicurezza: perché evitare **`eval(Path(...).read_text())`**? <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Un file di testo può contenere codice arbitrario eseguito: esecuzione di codice non controllata.</code></pre>
</div>
</details>

**Esercizio 20** — Scrivi una funzione **`copy_text(src, dst)`** con **`read_text`** / **`write_text`** e **`encoding="utf-8"`** ovunque. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path

def copy_text(src, dst):
    t = Path(src).read_text(encoding="utf-8")
    Path(dst).write_text(t, encoding="utf-8")</code></pre>
</div>
</details>

## Seguito del percorso

Prossimo passo: [Classi e OOP](/python-inter-poo-classes/) — strutturare dati e comportamento con le classi. Sempre in questa serie: [tipi e input](/it/python-tipi-e-input/) · [indovina il numero al terminale](/it/python-mini-gioco-terminale/).

## Mini-progetto file (pathlib)

Crea una cartella `sensor_logs/`, scrivi tre file `.txt` con `Path.write_text(..., encoding="utf-8")`, elencali con `Path("sensor_logs").glob("*.txt")` e stampa il numero di righe di ciascuno.

Libri di esercizi (link partner):

- [Python pathlib / file](https://www.amazon.it/s?k=python+pathlib+file+libro&tag=roboteducat0f-21)

*Autore: Emmanuel Sauvage · aggiornato il 31 ottobre 2026.*
