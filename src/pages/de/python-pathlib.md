---
layout: ../../layouts/DePost.astro
title: "Python pathlib: Pfade und Dateien (Path, UTF-8, glob)"
description: "pathlib-Tutorial: Path, portable Pfade, UTF-8, glob. 20 Übungen. Funktioniert mit reinen Python-Dateien — kein Roboter nötig."
updated: "31. Oktober 2026"
---

Einige Links auf dieser Seite sind Affiliate-Links. Beim Kauf darüber kann eine Provision anfallen — ohne Mehrkosten für Sie.

Pfade als **einfache Zeichenketten** zu behandeln (`"folder" + "\\" + "file.txt"`) führt schnell zu Fehlern: **Windows**-Trenner (`\`) vs **POSIX** (`/`), double slashes, mehrdeutige **relative** Pfade je nach aktuellem Verzeichnis, und vergessene **Kodierung** beim Lesen. Das Modul **`pathlib`** (Standardbibliothek, stabil seit Python 3.4+) liefert **`Path`**-Objekte, die einen Pfad **abstrakt repräsentieren** und ihn bei Bedarf korrekt für das System **ausgeben**.

Ein **`Path`** lässt sich mit dem Operator **`/`** (überladen) **zusammensetzen**, ein Verzeichnis auflisten, **Datei** vs **Ordner** prüfen und **Text** in einer Zeile lesen oder schreiben. Das ist der **empfohlene** Weg für **neuen Code**; das ältere Modul **`os.path`** bleibt in Legacy-Code lesbar, aber **`pathlib`** vereinheitlicht die API und verbessert die **Lesbarkeit**.

## 1. Pfad erzeugen und zusammensetzen

**`Path("relativ")`** bezieht sich auf das aktuelle Arbeitsverzeichnis; **`Path("/absolut")`** (unter Unix) oder **`Path("C:/Users/...")`** (unter Windows) setzen eine Wurzel. Der Operator **`/`** vermeidet manuelle Konkatenation: jedes Segment ist ein Pfadstück, die Darstellung respektiert das OS (**Betriebssystem**).

```python
from pathlib import Path
wurzel = Path(".")
datei = wurzel / "data" / "notes.txt"
```

**Gute Praxis**: in **neuem Code** **`pathlib.Path`** und **`/`** statt wiederholtem **`os.path.join`** bevorzugen. Für Pfade **ohne Festplattenzugriff** (reine Logik) gibt es **`PurePath`**, aber **`Path`** reicht meist.

## 2. Text lesen und schreiben

Die Methoden **`read_text`** und **`write_text`** kapseln das Öffnen und das **vollständige** Lesen/Schreiben im Speicher — praktisch für **kleine oder mittlere** Dateien (Config, Export). Bei sehr großen Dateien besser streamen (`open()` oder `Path.open()`).

```python
p = Path("hello.txt")
p.write_text("Hallo\n", encoding="utf-8")
print(p.read_text(encoding="utf-8"))
```

**Kodierung**: unter Windows ist die historische Standardkodierung nicht immer UTF-8; **`encoding="utf-8"` explizit setzen**, um **`UnicodeDecodeError`** beim Deployment auf einem anderen OS zu vermeiden.

## 3. Existenz, Typ und Auflösung

Vor dem Lesen prüfen wir oft **`exists()`**; **`is_file()`** und **`is_dir()`** unterscheiden Datei und Ordner. **`resolve()`** kann einen **absoluten**, **normalisierten** Pfad liefern (Auflösung von `..`), nützlich zum Vergleichen oder klaren Anzeigen.

```python
if p.exists():
    print("gefunden")
if p.is_file():
    ...
```

## 4. Ordner durchlaufen und Muster (`glob`)

**`iterdir()`** zählt die **direkten Kinder** eines Verzeichnisses auf. **`glob("**/*.py")`** oder **`rglob("*.py")`** wenden rekursive **Muster** an — praktisch, alle Dateien eines Typs zu verarbeiten, ohne eine manuelle `os.walk`-Schleife.

```python
for child in Path(".").iterdir():
    print(child.name)
```

**Gute Praxis**: **`glob`** hängt vom **echten Festplatteninhalt** ab; in Tests ein **temporäres Verzeichnis** isolieren (`tmp_path` mit **pytest**), um reproduzierbar zu bleiben.

## Externe Ressourcen

- **[Offizielle pathlib-Dokumentation](https://docs.python.org/3/library/pathlib.html)** (englisch): `Path`, `PurePath`, Methoden.
- **[Entsprechungstabelle pathlib / os.path](https://docs.python.org/3/library/pathlib.html#corresponding-tools)** (englisch, offiziell).
- **[open() und encoding](https://docs.python.org/3/library/functions.html#open)** (englisch): Hinweis zu `encoding` und Textmodus.

## Übungen (20)

Die Übungen festigen die **Reflexe**: Zusammensetzung mit **`/`**, **UTF-8**, Existenztests. **Lösungen** sind standardmäßig ausgeblendet.

### Einfaches Niveau

**Übung 1** — Erzeuge **`Path("a.txt")`** und gib die **Darstellung** mit **`print`** aus. <span class="exo-badge exo-badge--simple">Einfach</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
print(Path("a.txt"))</code></pre>
</div>
</details>

**Übung 2** — Baue den Pfad **`folder/sub/file.txt`** mit dem Operator **`/`** ausgehend von **`Path("folder")`**. <span class="exo-badge exo-badge--simple">Einfach</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
p = Path("folder") / "sub" / "file.txt"
print(p)</code></pre>
</div>
</details>

**Übung 3** — Schreibe **`"hi"`** in **`out.txt`** mit **`write_text`** und **`encoding="utf-8"`**. <span class="exo-badge exo-badge--simple">Einfach</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
Path("out.txt").write_text("hi", encoding="utf-8")</code></pre>
</div>
</details>

**Übung 4** — Lies den Inhalt von **`out.txt`** mit **`read_text`**. <span class="exo-badge exo-badge--simple">Einfach</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
print(Path("out.txt").read_text(encoding="utf-8"))</code></pre>
</div>
</details>

**Übung 5** — Prüfe mit **`.exists()`**, ob **`data.txt`** existiert. <span class="exo-badge exo-badge--simple">Einfach</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
print(Path("data.txt").exists())</code></pre>
</div>
</details>

**Übung 6** — Gib den **Dateinamen allein** (**`name`**) für **`/tmp/a/b.txt`** aus (nutze **`Path`**). <span class="exo-badge exo-badge--simple">Einfach</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
print(Path("/tmp/a/b.txt").name)</code></pre>
</div>
</details>

**Übung 7** — Gib den **Elternordner** mit **`.parent`** für **`Path("folder/file.py")`** aus. <span class="exo-badge exo-badge--simple">Einfach</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
print(Path("folder/file.py").parent)</code></pre>
</div>
</details>

### Mittleres Niveau

**Übung 8** — Liste die **Dateien** im aktuellen Verzeichnis mit Suffix **`.txt`** (**`iterdir`**-Schleife + Test **`.suffix`**). <span class="exo-badge exo-badge--inter">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
for p in Path(".").iterdir():
    if p.is_file() and p.suffix == ".txt":
        print(p)</code></pre>
</div>
</details>

**Übung 9** — Nutze **`glob("*.py")`** im aktuellen Ordner, um **`.py`**-Dateien aufzulisten. <span class="exo-badge exo-badge--inter">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
for p in Path(".").glob("*.py"):
    print(p)</code></pre>
</div>
</details>

**Übung 10** — Erzeuge einen Ordner **`tmp`** mit **`Path("tmp").mkdir(exist_ok=True)`**. <span class="exo-badge exo-badge--inter">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
Path("tmp").mkdir(exist_ok=True)</code></pre>
</div>
</details>

**Übung 11** — Löse einen **absoluten** Pfad mit **`.resolve()`** ausgehend von **`Path("README.md")`** auf. <span class="exo-badge exo-badge--inter">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
print(Path("README.md").resolve())</code></pre>
</div>
</details>

**Übung 12** — Gute Praxis: erkläre, warum `Path / "a" / "b"` besser ist als die Zeichenketten-Konkatenation `"a" + "/" + "b"` für Benutzerpfade. <span class="exo-badge exo-badge--inter">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Path normalisiert Trennzeichen je OS und vermeidet doppelte oder fehlende Slashes.</code></pre>
</div>
</details>

**Übung 13** — Öffne **binär** mit **`Path`**: **`Path("b.bin").read_bytes()`** (oder **`write_bytes`**). Gib die Länge der gelesenen Bytes aus. <span class="exo-badge exo-badge--inter">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
p = Path("b.bin")
p.write_bytes(b"\x00\x01")
print(len(p.read_bytes()))</code></pre>
</div>
</details>

**Übung 14** — Durchlaufe **`rglob("*.md")`** ab **`Path(".")`**, um **Markdown**-Dateien rekursiv zu finden (Performance bei großen Bäumen beachten). <span class="exo-badge exo-badge--inter">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
for p in Path(".").rglob("*.md"):
    print(p)</code></pre>
</div>
</details>

### Schwieriges Niveau

**Übung 15** — Funktion **`read_if_exists(path: str) -> str | None`**: Text zurückgeben oder **`None`**, wenn die Datei nicht existiert (**`FileNotFoundError`** sauber behandelt). <span class="exo-badge exo-badge--hard">Schwer</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path

def read_if_exists(path: str):
    p = Path(path)
    if not p.exists():
        return None
    return p.read_text(encoding="utf-8")</code></pre>
</div>
</details>

**Übung 16** — Benenne **`old.txt`** mit **`.rename`** in **`new.txt`** um. <span class="exo-badge exo-badge--hard">Schwer</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
Path("old.txt").rename(Path("new.txt"))</code></pre>
</div>
</details>

**Übung 17** — Zähle die Zeilen einer Textdatei mit **`read_text`** und **`splitlines()`** (leere Dateien sicher behandeln). <span class="exo-badge exo-badge--hard">Schwer</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
def line_count(p):
    return len(Path(p).read_text(encoding="utf-8").splitlines())</code></pre>
</div>
</details>

**Übung 18** — **`Path.home() / "Documents"`**: wozu dient **`home()`**? <span class="exo-badge exo-badge--hard">Schwer</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Persönliches Benutzerverzeichnis (variiert je OS).</code></pre>
</div>
</details>

**Übung 19** — Sicherheits-Praxis: warum **`eval(Path(...).read_text())`** vermeiden? <span class="exo-badge exo-badge--hard">Schwer</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Eine Textdatei kann beliebigen Code enthalten, der dann ausgeführt würde: unkontrollierte Codeausführung.</code></pre>
</div>
</details>

**Übung 20** — Schreibe eine Funktion **`copy_text(src, dst)`** mit **`read_text`** / **`write_text`** und überall **`encoding="utf-8"`**. <span class="exo-badge exo-badge--hard">Schwer</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path

def copy_text(src, dst):
    t = Path(src).read_text(encoding="utf-8")
    Path(dst).write_text(t, encoding="utf-8")</code></pre>
</div>
</details>

## Weiter im Kurs

Nächster Schritt: [Klassen und OOP](/python-inter-poo-classes/) — Daten und Verhalten mit Klassen strukturieren. Ebenfalls in dieser Serie: [Datentypen und Eingabe](/de/python-datentypen-eingabe/) · [Zahlraten im Terminal](/de/python-mini-terminalspiel/).

## Mini-Projekt Dateien (pathlib)

Lege einen Ordner `sensor_logs/` an, schreibe drei `.txt`-Dateien mit `Path.write_text(..., encoding="utf-8")`, liste sie mit `Path("sensor_logs").glob("*.txt")` und gib die Zeilenzahl aus.

Übungsbücher (Partnerlinks):

- [Python pathlib / Dateien](https://www.amazon.de/s?k=python+pathlib+dateien+buch&tag=roboteducat00-21)

*Autor: Emmanuel Sauvage · Stand 31. Oktober 2026.*
