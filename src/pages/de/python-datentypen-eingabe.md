---
layout: ../../layouts/DePost.astro
title: "Python 3 input: Datentypen und einen Wert eingeben (Lektion 3)"
description: "Python input und Typen: int, float, str, bool, Umwandlungen, strip(). 20 Übungen mit Lösungen für Tastatureingabe."
updated: "31. Oktober 2026"
faqSchema:
  - question: "Wie fragt man in Python 3 nach einem Wert?"
    answer: "Mit input(\"Meldung\"). Die Funktion gibt immer eine Zeichenkette (str) zurück. Danach mit int() oder float() umwandeln, wenn gerechnet werden soll."
  - question: "Warum liefert input() Text statt einer Zahl?"
    answer: "Weil die Tastatur Zeichen sendet. \"12\" ist Text; int(\"12\") ergibt die Zahl 12 für Berechnungen."
---

Du kannst bereits Variablen anzeigen ([Lektion 2 — Variablen und Ausgabe](/python-variables-affichage/)). Hier **reagiert** das Programm auf die Tastatur. In **Python 3** läuft alles über **`input()`**: die Funktion **fragt einen Wert ab**, wartet auf Enter und gibt **immer** eine Zeichenkette (`str`) zurück. Sauber nach `int` oder `float` **umzuwandeln** ist unverzichtbar vor den [Bedingungen mit if/else](/python-conditions-if-else/).

**Lektion 3** der Python-Serie. Kein Roboter nötig: Terminal oder Editor-Konsole reichen.

> **Weiter in dieser Serie:** [Zahlraten im Terminal](/de/python-mini-terminalspiel/) · [pathlib](/de/python-pathlib/).

![Konsole: input() liefert str, int() erlaubt Rechnen](/images/lot2/python-input-console.webp)

*Konsolensitzung: `input()` liefert eine Zeichenkette, `int()` wandelt sie in eine Zahl zum Rechnen um.*

**Übungs-Sprungmarken:** [Einfaches Niveau](#einfaches-niveau) · [Mittleres Niveau](#mittleres-niveau) · [Schwieriges Niveau](#schwieriges-niveau) — durchgehend **Du**-Form in den Aufgaben.

## 1. Die nützlichsten Typen am Anfang

Python arbeitet mit Werten unterschiedlicher **Typen**. Die ersten vier zum Beherrschen:

| Typ     | Kurze Rolle             | Beispiele        |
|---------|-------------------------|------------------|
| `int`   | Ganzzahl                | `42`, `-3`, `0`  |
| `float` | Kommazahl               | `3.14`, `2.0`    |
| `str`   | Text                    | `"hallo"`, `'x'` |
| `bool`  | wahr / falsch           | `True`, `False`  |

Zum **Prüfen** des Typs beim Lernen:

```python
x = 10
y = "10"
print(type(x), type(y))  # <class 'int'> <class 'str'>
```

## 2. Explizite Umwandlungen

- **`int("42")`** → `42`. Scheitert bei `"3.5"` oder `"zwölf"` → **`ValueError`**.
- **`float("3.5")`** oder **`float("2")`** → Dezimalzahl.
- **`str(2026)`** → `"2026"` (zum Verketten oder für eine Meldung).

Praxisregel: sobald du aus einer Eingabe **rechnen** willst, wandel nach `input()` um.

## 3. `input()`: immer Text

```python
antwort = input("Eine ganze Zahl? ")
n = int(antwort)
print(f"Die nächste ist {n + 1}")
```

Leerzeichen vor/nach dem Tippen stören oft. Viele Skripte beginnen mit:

```python
text = input("Stadt? ").strip()
```

`strip()` entfernt Leerzeichen (und unsichtbare Zeilenumbrüche) am Anfang und Ende der Zeichenkette.

## 4. `bool` und Vergleiche (Ausblick)

Vergleiche (`==`, `<`, …) erzeugen bereits einen booleschen Wert. Du kannst auch `bool(0)` → `False`, `bool(1)` → `True` schreiben (Details kommen mit der Praxis von `if`).

## 5. Klassischer Fallstrick: Text und Rechnung mischen

`"3" + "5"` ergibt `"35"`. Für eine Summe:

```python
a = int(input("Erste Zahl? "))
b = int(input("Zweite Zahl? "))
print(a + b)
```

Gibt der Nutzer `3.5` ein, obwohl ein `int` erwartet wurde, wirft **`int()`** einen Fehler: [Lektion 9 — Fehler und Debugging](/python-erreurs-debogage/) zeigt `try` / `except`.

## Übungen (20)

Die Übungen setzen voraus, dass du das **Skript startest** und die geforderten Werte in der Konsole tippst. Die **Lösungen** sind standardmäßig versteckt: öffne **Lösung anzeigen** zum Vergleichen.

### Einfaches Niveau

**Übung 1** — Zeige mit `print` die Ergebnisse von `type(7)` und `type("7")` (zwei Werte in einer Zeile oder zwei `print`). <span class="exo-badge exo-badge--simple">Einfach</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">print(type(7), type("7"))</code></pre>
</div>
</details>

**Übung 2** — Frage nach Text mit `input("Dein Vorname? ")` (ohne Umwandlung), speichere in `vorname`, dann zeige `Hallo` gefolgt von Komma und `vorname` mit **einem** `print` und Kommas. <span class="exo-badge exo-badge--simple">Einfach</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">vorname = input("Dein Vorname? ")
print("Hallo,", vorname)</code></pre>
</div>
</details>

**Übung 3** — Frage nach einem Satz mit `input()`, hänge `.strip()` in derselben Zeile an, zeige die bereinigte Zeichenkette in einer Meldung `Du hast geschrieben: ...`. <span class="exo-badge exo-badge--simple">Einfach</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">satz = input("Ein Satz: ").strip()
print(f"Du hast geschrieben: {satz}")</code></pre>
</div>
</details>

**Übung 4** — Erzeuge `s = "15"`, wandle mit `int(s)` um, zeige Ergebnis und `type(...)`. <span class="exo-badge exo-badge--simple">Einfach</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">s = "15"
n = int(s)
print(n, type(n))</code></pre>
</div>
</details>

**Übung 5** — Erzeuge `t = "2.5"`, wandle in `float`, zeige den Wert multipliziert mit `2` (ohne f-string: ein `print` mit Komma reicht). <span class="exo-badge exo-badge--simple">Einfach</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">t = "2.5"
x = float(t)
print(x * 2)</code></pre>
</div>
</details>

**Übung 6** — Mit `n = 2026` zeige `"Jahr: "` gefolgt von `str(n)` per **Konkatenation** mit `+`. <span class="exo-badge exo-badge--simple">Einfach</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = 2026
print("Jahr: " + str(n))</code></pre>
</div>
</details>

**Übung 7** — Frage **zwei** Zeichenketten mit zwei `input()` (`wort1`, `wort2`) und zeige ihre **direkte Konkatenation** (ohne Leerzeichen), um die Falle `"3"` + `"5"` → `"35"` zu zeigen. <span class="exo-badge exo-badge--simple">Einfach</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">wort1 = input("Erstes Wort: ")
wort2 = input("Zweites Wort: ")
print(wort1 + wort2)</code></pre>
</div>
</details>

### Mittleres Niveau

**Übung 8** — Frage eine **Ganzzahl** mit `input`, wandle mit `int`, zeige `Die nächste ist` gefolgt von `n + 1` (f-string). <span class="exo-badge exo-badge--inter">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = int(input("Eine Ganzzahl? "))
print(f"Die nächste ist {n + 1}")</code></pre>
</div>
</details>

**Übung 9** — Frage eine **Dezimalzahl** (`float`), zeige das **Doppelte** mit f-string. <span class="exo-badge exo-badge--inter">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">x = float(input("Eine Dezimalzahl? "))
print(f"Doppelt: {x * 2}")</code></pre>
</div>
</details>

**Übung 10** — Frage **zwei Ganzzahlen**, zeige **Summe** und **Produkt** in **zwei Zeilen**. <span class="exo-badge exo-badge--inter">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">a = int(input("Erste Ganzzahl? "))
b = int(input("Zweite Ganzzahl? "))
print(f"Summe: {a + b}")
print(f"Produkt: {a * b}")</code></pre>
</div>
</details>

**Übung 11** — Frage einen **Vornamen** (Zeichenkette) und ein **Alter** (`int`), dann zeige `… ist … Jahre alt` mit f-string. <span class="exo-badge exo-badge--inter">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">vorname = input("Vorname? ")
alter = int(input("Alter? "))
print(f"{vorname} ist {alter} Jahre alt")</code></pre>
</div>
</details>

**Übung 12** — Frage eine Temperatur in **°C** als `float`, berechne **°F** mit `f = c * 9 / 5 + 32` und zeige auf **1** Dezimalstelle mit `round(f, 1)`. <span class="exo-badge exo-badge--inter">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">c = float(input("Temperatur °C? "))
f = c * 9 / 5 + 32
print(f"In °F: {round(f, 1)}")</code></pre>
</div>
</details>

**Übung 13** — Frage eine Zeichenkette (nicht in Zahl umwandeln), zeige die **Länge** mit `len(...)`. <span class="exo-badge exo-badge--inter">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">text = input("Ein Wort oder Satz: ")
print(len(text))</code></pre>
</div>
</details>

**Übung 14** — Lies im Code eine Dezimal-Zeichenkette (`s = "12.5"`), wandle in `float`, zeige das **Dreifache**. <span class="exo-badge exo-badge--inter">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">s = "12.5"
x = float(s)
print(x * 3)</code></pre>
</div>
</details>

### Schwieriges Niveau

**Übung 15** — Frage **drei Ganzzahlen** nacheinander, berechne **Summe** und **Mittelwert** `(a+b+c)/3`, zeige beides mit f-strings. <span class="exo-badge exo-badge--hard">Schwer</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">a = int(input("a? "))
b = int(input("b? "))
c = int(input("c? "))
summe = a + b + c
mittel = summe / 3
print(f"Summe: {summe}")
print(f"Mittelwert: {mittel}")</code></pre>
</div>
</details>

**Übung 16** — Frage ein `float`, zeige den Wert **auf 2 Dezimalstellen gerundet** mit `round(x, 2)` **in** einer f-string. <span class="exo-badge exo-badge--hard">Schwer</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">x = float(input("Zahl? "))
print(f"Gerundet (2 Dez.): {round(x, 2)}")</code></pre>
</div>
</details>

**Übung 17** — Frage eine Zeichenkette, `.strip()`, wandle in `int`, zeige das **Quadrat** `n * n` mit f-string. <span class="exo-badge exo-badge--hard">Schwer</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = int(input("Eine Ganzzahl (Leerzeichen erlaubt): ").strip())
print(f"Quadrat: {n * n}")</code></pre>
</div>
</details>

**Übung 18** — Frage **zwei** Zahlen als `float`, berechne und zeige den **Mittelwert** `(a+b)/2` mit klarer Meldung. <span class="exo-badge exo-badge--hard">Schwer</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">a = float(input("Erste Zahl? "))
b = float(input("Zweite Zahl? "))
m = (a + b) / 2
print(f"Mittelwert: {m}")</code></pre>
</div>
</details>

**Übung 19** — Frage **Geburtsjahr** und **aktuelles Jahr** als `int`, berechne ungefähres **Alter** `aktuell - geburt` und zeige es (ohne Kalendertag: bewusst vereinfacht). <span class="exo-badge exo-badge--hard">Schwer</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">geburt = int(input("Geburtsjahr? "))
aktuell = int(input("Aktuelles Jahr? "))
alter = aktuell - geburt
print(f"Ungefähres Alter: {alter} Jahre")</code></pre>
</div>
</details>

**Übung 20** — Kette: `input` des **Vornamens** mit `.strip()`, `input` einer **Größe** in Metern als `float`, dann eine **f-string** in **einer Zeile** wie `Paul ist etwa 1.72 m groß`. <span class="exo-badge exo-badge--hard">Schwer</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">vorname = input("Vorname? ").strip()
groesse = float(input("Größe in m? "))
print(f"{vorname} ist etwa {groesse} m groß")</code></pre>
</div>
</details>

## Weiter im Kurs

[Lektion 4 — Bedingungen mit if/else](/python-conditions-if-else/) nutzt diese Umwandlungen, um Werte zu **testen**: gerade / ungerade, Menüs, Noten usw. Praxis dazu: [Zahlraten im Terminal](/de/python-mini-terminalspiel/).

## Amazon (Partner)

- [Übungen und Aufgaben Python](https://www.amazon.de/s?k=python+%C3%BCbungen+buch&tag=roboteducat00-21) — aktuellen Preis auf der Angebotsseite prüfen.
