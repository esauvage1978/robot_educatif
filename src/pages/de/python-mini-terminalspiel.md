---
layout: ../../layouts/DePost.astro
title: "Python-Terminalspiel: Zahlraten (Miniprojekt)"
description: "Ein Python-Zahlratespiel im Terminal bauen: random, while, input, try/except. Vollständiger Code, Tests und Varianten."
updated: "31. Oktober 2026"
faqSchema:
  - question: "Wie erstelle ich ein einfaches Python-Spiel als Anfänger?"
    answer: "Ein Zahlratespiel im Terminal reicht: random.randint für die Geheimzahl, input für Tipps, while für die Schleife, try/except für ungültige Eingaben."
  - question: "Brauche ich einen Roboter für dieses Python-Tutorial?"
    answer: "Nein. Das Miniprojekt läuft nur im Terminal. Ein Computer mit Python 3 genügt."
---

Du willst ein einfaches **Python-Spiel**, das du sofort im **Terminal** spielst (das Textfenster, in dem du `python` startest)? Dieses Zahlrate-Miniprojekt wiederholt **`input`**, **`int`**, **`while`**, **`if` / `elif` / `else`**, **`random`** und **`try` / `except`** ([Fehlerbehandlung mit try/except](/python-erreurs-debogage/)).

Speichere das Skript als `zahlraten.py` und starte:

```bash
python zahlraten.py
```

![Beispielsitzung im Terminal: Tipps 50 und 75, abc abgelehnt, Sieg nach 3 Versuchen](/images/lot2/python-plus-ou-moins-terminal.webp)

*Beispielsitzung im Terminal: das Programm fragt nach einer Zahl, antwortet mit zu klein / zu groß, lehnt `abc` ab und meldet den Sieg nach 3 Versuchen.*

**Kurs.** Das ist **Lektion 10** der Python-Serie. Bei Bedarf [Datentypen und Eingabe](/de/python-datentypen-eingabe/) oder [pathlib](/de/python-pathlib/) erneut öffnen. Gesamtübersicht: [Python-Kurs](/programmation/python/).

Einige Buchlinks unten sind Affiliate-Links. Prüfen Sie den Tagespreis auf der Produktseite.

## 1. Spielregeln

- Der Computer wählt eine **Geheimzahl** zwischen **1** und **100** (einschließlich).
- Du tippst **Ganzzahlen**; nach jedem Versuch antwortet das Programm **zu klein**, **zu groß** oder meldet den Sieg.
- Am Ende zeigt es **die Anzahl der Versuche**.

## 2. Entwurfsschritte (bevor alles auf einmal kodiert wird)

1. Geheimzahl mit **`random.randint(1, 100)`**.
2. Zähler **`versuche = 0`** initialisieren.
3. Schleife: Tipp lesen, Zähler erhöhen, vergleichen, bei Treffer **`break`**.
4. Keine Ganzzahl → **nicht abstürzen**: `except ValueError`, klare Meldung, `continue`.

## 3. Referenzlösung

```python
import random

secret = random.randint(1, 100)
versuche = 0

while True:
    try:
        tipp = int(input("Deine Zahl (1-100)? "))
    except ValueError:
        print("Bitte eine ganze Zahl eingeben.")
        continue

    versuche += 1
    if tipp < secret:
        print("Zu klein.")
    elif tipp > secret:
        print("Zu groß.")
    else:
        print(f"Gewonnen in {versuche} Versuch(en)!")
        break
```

### Beispielsitzung

```text
Deine Zahl (1-100)? 50
Zu klein.
Deine Zahl (1-100)? 75
Zu groß.
Deine Zahl (1-100)? abc
Bitte eine ganze Zahl eingeben.
Deine Zahl (1-100)? 62
Gewonnen in 3 Versuch(en)!
```

## 4. Schnelle manuelle Tests

- In **einem** Versuch gewinnen: Zähler zeigt **1**.
- **`abc`** tippen: Meldung, Schleife **ohne** Absturz.
- **Zu klein** dann **zu groß**: weiter führen bis zur richtigen Zahl.

## Übungen zum Vertiefen

1. **Versuchslimit** (z. B. **7**): bei Erschöpfung Geheimzahl und „verloren“ anzeigen.
2. **Zwei Stufen**: Bereich **1–50** oder **1–200**.
3. **Bestscore** in **`record.txt`** — siehe [Textdateien lesen und schreiben](/python-fichiers-texte/).
4. Alle 5 Versuche einen **Hinweis**.
5. **Nochmal spielen** mit ja/nein am Ende.

## Weiter im Kurs

Weitere Textspiele: [Galgenmännchen](/programmation/pendu/), [Schiffe versenken](/programmation/bataille-navale/), [Vier gewinnt](/programmation/puissance-4/). Zurück zum [Python-Kurs](/programmation/python/).

Übungsbücher (Partnerlinks — Amazon.de):

- [Python-Projekte Spiele](https://www.amazon.de/s?k=python+projekte+spiele+buch&tag=roboteducat00-21)
- [Python 3 lernen mit Übungen](https://www.amazon.de/s?k=python+3+lernen+uebungen+buch&tag=roboteducat00-21)

*Autor: Emmanuel Sauvage · Stand 31. Oktober 2026.*
