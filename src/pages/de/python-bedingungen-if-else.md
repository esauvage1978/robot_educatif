---
layout: ../../layouts/DePost.astro
title: "Python-Bedingungen: if, elif, else — Lektion 4 (20 Übungen)"
description: "if, elif, else in Python 3 lernen: Vergleiche, and/or/not, Menüs und Noten. 20 korrigierte Übungen, Fehlersuche und nächste Schritte im Terminal-Kurs."
updated: "31. Oktober 2026"
faqSchema:
  - question: "Wofür dient if in Python?"
    answer: "if führt einen Block nur aus, wenn die getestete Bedingung wahr ist. elif hängt weitere Tests an; else deckt den Restfall ab. Einrückung (4 Leerzeichen) markiert den Block."
  - question: "Was ist der Unterschied zwischen if und elif?"
    answer: "Mit if / elif / else wird genau ein Block gewählt. Mehrere getrennte if können alle laufen, wenn ihre Bedingungen wahr sind."
  - question: "Warum passiert nach meinem if hinter input() nichts?"
    answer: "input() liefert Text (str). Für Zahlenvergleiche mit int() oder float() umwandeln wie in Lektion 3 — sonst kann 10 < \"2\" überraschen."
---

**Kurzantwort (Oktober 2026)** — In **Python 3** **wählt** eine **Bedingung** (`if`, `elif`, `else`), welche Anweisungen laufen, je nachdem ob ein Test **wahr** oder **falsch** ist. Werte vergleichst du mit `==`, `!=`, `<`, `>`, … und kombinierst Tests mit **`and`**, **`or`**, **`not`**. Kein Roboter nötig: ein **Terminal** (Fenster, in dem du `python` startest) reicht.

**Lektion 4** des [Python-Kurses](/programmation/python/). Aufbau auf [Lektion 3 — Datentypen und Eingabe](/de/python-datentypen-eingabe/) (`int(input(...))` usw.). Danach: [Lektion 5 — Schleifen](/python-boucles-for-while/), dann das [Terminal-Miniprojekt Zahlraten](/de/python-mini-terminalspiel/) mit Bedingungen und Schleifen.

| Information | Detail |
| --- | --- |
| **Ziel** | Lesbare `if` / `elif` / `else` schreiben und Tastatureingaben testen |
| **Niveau** | Einsteiger (nach Variablen und `input`) |
| **Dauer** | 45–90 Min. (Lektion + 5–10 Übungen) |
| **Material** | PC mit **Python 3** (kostenloser Interpreter) |
| **Voraussetzungen** | [Lektion 2 — Variablen](/python-variables-affichage/), [Lektion 3 — input](/de/python-datentypen-eingabe/) |
| **Ergebnis** | Skripte für gerade/ungerade, Notenprüfung, Menüreaktion |

![Terminal: zu klein / zu groß / gewonnen beim Zahlraten](/images/lot2/python-plus-ou-moins-terminal.webp)

*Rekonstruierte Sitzung: dasselbe Vergleichsprinzip steckt in Zahlraten (Übung 4) und im [Terminal-Miniprojekt](/de/python-mini-terminalspiel/). Credit: Emmanuel Sauvage, Robot Éducatif — Oktober 2026.*

**Bedingungen** entscheiden, welcher Teil des Programms läuft. In Python erkennst du einen von `if` abhängigen Block an der **Einrückung** (meist **4 Leerzeichen**): keine geschweiften Klammern `{}` wie in **C** oder **Java**.

## 1. Vergleiche und logische Operatoren

**Vergleiche**: `==` (gleich), `!=` (ungleich), `<`, `>`, `<=`, `>=`.

**Tests kombinieren**:

- **`and`**: beide müssen wahr sein.
- **`or`**: mindestens einer wahr.
- **`not`**: kehrt das Ergebnis um.

```python
age = 14
if 10 <= age <= 18:   # praktische „zwischen“-Form in Python
    print("Collège / lycée")
```

## 2. `if` / `else`

```python
note = int(input("Note sur 20 ? "))
if note >= 10:
    print("Validé")
else:
    print("À retravailler")
```

Der **`:`** nach der Bedingung ist Pflicht. Die nächste Zeile **muss** eingerückt sein.

## 3. Mit `elif` verketten

Python prüft Bedingungen **der Reihe nach** und führt den **ersten** Block aus, dessen Bedingung wahr ist. Den Restfall ggf. mit **`else`** am Ende abdecken.

```python
note = int(input("Note /20 ? "))
if note >= 16:
    mention = "Très bien"
elif note >= 14:
    mention = "Bien"
elif note >= 12:
    mention = "Assez bien"
elif note >= 10:
    mention = "Passable"
else:
    mention = "Insuffisant"
print(f"Mention : {mention}")
```

Folgen mehrere `if` **ohne** `elif`, können **mehrere** Blöcke laufen; mit `elif` gewinnt nur einer.

## 4. Implizit „wahr“ oder „falsch“

Ein „leerer“ Wert kann als Bedingung dienen:

```python
texte = input("Pseudo (Entrée = anonyme) ? ").strip()
if not texte:
    texte = "Invité"
print(f"Bonjour {texte}")
```

(`not texte` ist wahr für `""`, aber: `not "0"` ist falsch, weil die Zeichenkette nicht leer ist.)

## 5. Verschachtelung (Überblick)

Ein `if` kann **in** einem anderen stehen: Einrückung konsequent halten. Bei komplexen Fällen helfen [Funktionen](/python-fonctions/) (Lektion 6), den Code zu gliedern.

## 6. Skript prüfen

1. Datei `test_conditions.py` mit einem Beispiel oben speichern.
2. Terminal im Ordner öffnen (PowerShell, Eingabeaufforderung oder integriertes Terminal in **Thonny** / **VS Code**).
3. `python test_conditions.py` starten und **mindestens** einen „wahren“ und einen „falschen“ Wert pro Zweig testen.
4. Wenn nichts erscheint: **`:`** nach `if` / `elif` / `else` und **Einrückung** der folgenden Zeile prüfen.

## 7. Häufige Fehler (Fehlersuche)

| Symptom | Wahrscheinliche Ursache | Korrektur |
| --- | --- | --- |
| `IndentationError` | Keine Leerzeichen nach `if:` | Block mit 4 Leerzeichen einrücken (oder einheitlicher Tab) |
| Seltsamer Vergleich (`10 < "2"`) | `input()` ohne `int()` | Umwandeln: `n = int(input(...))` ([Lektion 3](/de/python-datentypen-eingabe/)) |
| Mehrere Meldungen | Mehrere `if` statt `elif` | Mit `elif` für eine einzige Wahl verketten |
| `SyntaxError` bei `else` | `else` falsch platziert | `else` folgt auf `if` / `elif`-Kette, gleiche Einrückungsebene |
| `ValueError` bei `int(input())` | Nicht numerischer Text | Klare Meldung an den Nutzer; später [try / except](/python-erreurs-debogage/) |

## Übungen (20)

Jede Übung nutzt die **Bedingungen** dieser Lektion (`if`, `elif`, `else`, `and`, `or`, `not`, Vergleiche). **Lösungen** sind standardmäßig verborgen: **Lösung anzeigen** zum Vergleichen.

### Einfaches Niveau

**Übung 1** — Mit `n = 8` gib `pair` oder `impair` aus, je nachdem ob `n % 2` gleich `0` ist oder nicht. <span class="exo-badge exo-badge--simple">Einfach</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = 8
if n % 2 == 0:
    print("pair")
else:
    print("impair")</code></pre>
</div>
</details>

**Übung 2** — Frage mit `int(input(...))` nach einer Ganzzahl und gib aus, ob sie **strikt positiv**, **strikt negativ** oder **null** ist. <span class="exo-badge exo-badge--simple">Einfach</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = int(input("Un entier ? "))
if n > 0:
    print("positif")
elif n < 0:
    print("négatif")
else:
    print("nul")</code></pre>
</div>
</details>

**Übung 3** — Zwei Variablen `a = 3` und `b = 9`: gib die **größere** Zahl nur mit `if` / `else` aus (ohne `max`). <span class="exo-badge exo-badge--simple">Einfach</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">a = 3
b = 9
if a >= b:
    print(a)
else:
    print(b)</code></pre>
</div>
</details>

**Übung 4** — **Zahlraten (ein Versuch)**: `secret = 42`. Ganzzahl einlesen; `trop petit`, `trop grand` oder `gagné` ausgeben. <span class="exo-badge exo-badge--simple">Einfach</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">secret = 42
n = int(input("Nombre entre 1 et 100 ? "))
if n < secret:
    print("trop petit")
elif n > secret:
    print("trop grand")
else:
    print("gagné")</code></pre>
</div>
</details>

**Übung 5** — Zeichenkette einlesen; ist sie nach `strip()` **leer**, `Erreur : pseudo vide` ausgeben, sonst `Bienvenue,` und die Zeichenkette. <span class="exo-badge exo-badge--simple">Einfach</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">s = input("Pseudo ? ").strip()
if not s:
    print("Erreur : pseudo vide")
else:
    print("Bienvenue,", s)</code></pre>
</div>
</details>

**Übung 6** — `x = int(input(...))`: `dans [0, 10]` wenn `0 <= x <= 10`, sonst `hors plage`. <span class="exo-badge exo-badge--simple">Einfach</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">x = int(input("Un nombre ? "))
if 0 <= x <= 10:
    print("dans [0, 10]")
else:
    print("hors plage")</code></pre>
</div>
</details>

**Übung 7** — `ok = True`: wenn `ok` wahr, `OK` ausgeben, sonst `KO` (`if ok:` ohne `== True`). <span class="exo-badge exo-badge--simple">Einfach</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">ok = True
if ok:
    print("OK")
else:
    print("KO")</code></pre>
</div>
</details>

### Mittleres Niveau

**Übung 8** — **Alter** (`int`) abfragen. Bei `< 0` oder `> 120` → `âge improbable`; sonst bei `age < 18` → `mineur`, sonst `majeur`. <span class="exo-badge exo-badge--inter">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">age = int(input("Âge ? "))
if age < 0 or age > 120:
    print("âge improbable")
elif age < 18:
    print("mineur")
else:
    print("majeur")</code></pre>
</div>
</details>

**Übung 9** — **Note** von 20 (`int`). `recalé` wenn `< 10`, `passable` wenn `< 12`, `bien` wenn `< 16`, sonst `très bien` (`elif`-Kette). <span class="exo-badge exo-badge--inter">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">note = int(input("Note /20 ? "))
if note < 10:
    print("recalé")
elif note < 12:
    print("passable")
elif note < 16:
    print("bien")
else:
    print("très bien")</code></pre>
</div>
</details>

**Übung 10** — **Menü**: `1 = Salut` und `2 = Au revoir` ausgeben, Wahl (`input`), passende Meldung; weder `1` noch `2` → `option inconnue`. <span class="exo-badge exo-badge--inter">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">print("1 = Salut")
print("2 = Au revoir")
c = input("Choix ? ")
if c == "1":
    print("Salut")
elif c == "2":
    print("Au revoir")
else:
    print("option inconnue")</code></pre>
</div>
</details>

**Übung 11** — `a` und `b` (Ganzzahlen). Bei `a == b` → `égaux`; sonst ausgeben, welche größer ist. <span class="exo-badge exo-badge--inter">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">a = int(input("a ? "))
b = int(input("b ? "))
if a == b:
    print("égaux")
elif a > b:
    print("a est plus grand")
else:
    print("b est plus grand")</code></pre>
</div>
</details>

**Übung 12** — `n = int(input(...))`: mit `and` nur `dans la plage`, wenn `n` **≥ 10 und ≤ 20**, sonst `dehors`. <span class="exo-badge exo-badge--inter">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = int(input("n ? "))
if n >= 10 and n <= 20:
    print("dans la plage")
else:
    print("dehors")</code></pre>
</div>
</details>

**Übung 13** — Kurze Eingabe `rep`. `oui` bei `o`/`O` (nach `strip()`), `non` bei `n`/`N`, sonst `réponse inattendue`. <span class="exo-badge exo-badge--inter">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">rep = input("o/n ? ").strip()
if rep == "o" or rep == "O":
    print("oui")
elif rep == "n" or rep == "N":
    print("non")
else:
    print("réponse inattendue")</code></pre>
</div>
</details>

**Übung 14** — `x = int(input(...))`: `positif ou nul` wenn `x >= 0`; sonst **verschachteltes `if`** für `négatif pair` oder `négatif impair`. <span class="exo-badge exo-badge--inter">Mittel</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">x = int(input("x ? "))
if x >= 0:
    print("positif ou nul")
else:
    if x % 2 == 0:
        print("négatif pair")
    else:
        print("négatif impair")</code></pre>
</div>
</details>

### Schweres Niveau

**Übung 15** — **Passwort** (Zeichenkette). Länge **strikt unter 6** → `trop court`; **strikt über 24** → `trop long`; sonst `OK`. <span class="exo-badge exo-badge--hard">Schwer</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">mdp = input("Mot de passe ? ")
if len(mdp) < 6:
    print("trop court")
elif len(mdp) > 24:
    print("trop long")
else:
    print("OK")</code></pre>
</div>
</details>

**Übung 16** — **Note** von 20. Außerhalb 0–20 → `note invalide`; sonst `elif`-Kette wie in der Lektion (16+ → Très bien, …). <span class="exo-badge exo-badge--hard">Schwer</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">note = int(input("Note /20 ? "))
if note < 0 or note > 20:
    print("note invalide")
elif note >= 16:
    print("Très bien")
elif note >= 14:
    print("Bien")
elif note >= 12:
    print("Assez bien")
elif note >= 10:
    print("Passable")
else:
    print("Insuffisant")</code></pre>
</div>
</details>

**Übung 17** — Drei Ganzzahlen `a`, `b`, `c`: `tous égaux`, `deux égaux` oder `tous différents`. <span class="exo-badge exo-badge--hard">Schwer</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">a = int(input("a ? "))
b = int(input("b ? "))
c = int(input("c ? "))
if a == b == c:
    print("tous égaux")
elif a == b or a == c or b == c:
    print("deux égaux")
else:
    print("tous différents")</code></pre>
</div>
</details>

**Übung 18** — **Alter** für ermäßigten Tarif: unter 12 → `enfant`, 12–17 → `ado`, 18–64 → `adulte`, 65+ → `senior`; negativ oder über 120 → `âge invalide`. <span class="exo-badge exo-badge--hard">Schwer</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">age = int(input("Âge ? "))
if age < 0 or age > 120:
    print("âge invalide")
elif age < 12:
    print("enfant")
elif age <= 17:
    print("ado")
elif age <= 64:
    print("adulte")
else:
    print("senior")</code></pre>
</div>
</details>

**Übung 19** — Zwei Ja/Nein-Antworten; `oui` (Groß/Klein, nach `strip()`) zählt als wahr. `les deux` / `au moins un` / `aucun`. <span class="exo-badge exo-badge--hard">Schwer</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">u = input("Premier oui/non ? ").strip().lower() == "oui"
v = input("Deuxième oui/non ? ").strip().lower() == "oui"
if u and v:
    print("les deux")
elif u or v:
    print("au moins un")
else:
    print("aucun")</code></pre>
</div>
</details>

**Übung 20** — Ganzzahl `n`. `Fizz` (Vielfaches von 3), `Buzz` (5), `FizzBuzz` (beides), sonst `n` (`elif`, eine Meldung). <span class="exo-badge exo-badge--hard">Schwer</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Lösung anzeigen</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = int(input("n ? "))
if n % 15 == 0:
    print("FizzBuzz")
elif n % 3 == 0:
    print("Fizz")
elif n % 5 == 0:
    print("Buzz")
else:
    print(n)</code></pre>
</div>
</details>

## Weiter im Kurs — Lektion 5 und Miniprojekt

Du beherrschst **Verzweigungen**; [Lektion 5 — for- und while-Schleifen](/python-boucles-for-while/) **wiederholt** Code (mehrere Versuche beim Zahlraten, Listen durchlaufen). Anschließend das [Terminal-Miniprojekt Zahlraten](/de/python-mini-terminalspiel/) mit `if`, `while` und `random`. Zur Serie: [Python-Hub](/programmation/python/), [Listen und Zeichenketten](/python-listes-et-chaines/) (Lektion 7), [Galgenmännchen](/programmation/pendu/) und [Schiffe versenken](/programmation/bataille-navale/). Eingabe auffrischen: [Lektion 3](/de/python-datentypen-eingabe/).

## Amazon (Partner)

Preise bei Amazon ändern sich — Edition und Angebot vor dem Kauf prüfen.

- <a href="/go/az-de-06cde53fe7" rel="sponsored nofollow noopener" class="affiliate-link">Python-Projekt- und Spielebücher bei Amazon.de</a>

*Emmanuel Sauvage — aktualisiert am 31. Oktober 2026.*
