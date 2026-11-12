---
layout: ../../layouts/DePost.astro
title: "Vier gewinnt in Python (6/6) — Komplettspiel und Zufalls-KI"
description: "Menü: zwei Menschen oder Mensch vs Zufalls-KI, puissance4_chapitre_06.py zum Download, Terminal-Tests und Fehlerbehebung — Serie Vier gewinnt, Oktober 2026."
updated: "31. Oktober 2026"
schemaUpdated: "2026-10-31"
faqSchema:
  - question: "Wie starte ich das fertige Vier-gewinnt-Skript?"
    answer: "Lade puissance4_chapitre_06.py herunter, öffne ein Terminal im Ordner, führe python puissance4_chapitre_06.py aus und wähle 1 (zwei Spieler) oder 2 (du als X gegen KI als O)."
  - question: "Ist die KI stark?"
    answer: "Nein. Sie wählt mit random.choice eine spielbare Spalte zufällig. Das ist eine Lernbasis; später kannst du Drohungen blockieren."
  - question: "Brauche ich die Kapitel 1 bis 5?"
    answer: "Ja zum Verstehen. Kapitel 6 bündelt alle Funktionen; die Teile 1–5 bauen Gitter, Schwerkraft, Sieg und Remis schrittweise auf."
---

Einige Links sind Partnerlinks (**Amazon.de**). Preise am Tag des Kaufs prüfen — wir erfinden keine lokalen Beträge.

**Kurzantwort (Oktober 2026)** — Du erhältst **Vier gewinnt** (vier in einer Reihe auf **6×7 Feldern**) im **Terminal** (Textfenster für `python …`): Ein **Menü** bietet **zwei Menschen** oder **du (X) gegen KI (O)** mit **zufälliger Spaltenwahl**. Lade **`puissance4_chapitre_06.py`** herunter. Einstieg: [Kapitel 1 — Gitter](/python-puissance-4-1-cahier-grille/). **Voraussetzung:** [Kapitel 5 — Remis](/python-puissance-4-5-match-nul/).

**Serie Vier gewinnt (6 Teile)** — [Übersicht](/programmation/puissance-4/) · [1](/python-puissance-4-1-cahier-grille/) · [2](/python-puissance-4-2-affichage-gravite/) · [3](/python-puissance-4-3-coup-alternance/) · [4](/python-puissance-4-4-quatre-alignes/) · [5](/python-puissance-4-5-match-nul/) · **6 (diese Seite)**

| Kriterium | Angabe |
| --- | --- |
| **Ziel** | Menü, Solo vs KI, Abbruch mit `q` |
| **Niveau** | Anfänger (nach Teilen 1–5) |
| **Dauer** | 30–60 Min. beim Abtippen; ~5 Min. nur Download |
| **Material** | PC mit **Python 3** |
| **Erfolg** | Gitter, Sieg/Remis, KI nennt die Spalte |

<figure class="article-figure">
  <img src="/images/lot10/puissance4-ch6-terminal-session.webp" alt="Terminal: Menü, ASCII-Gitter mit X und O, KI-Zug." width="920" height="696" loading="eager" decoding="async" />
  <figcaption>Beispielsession aus dem Skript Kapitel 6. Credit: Emmanuel Sauvage, Robot Éducatif — Oktober 2026.</figcaption>
</figure>

**KI** (*Künstliche Intelligenz* hier nur: Computer spielt allein) nutzt **`random`** aus der Python-Standardbibliothek.

## 1. Zwei-Spieler-Schleife

Siehe [Kapitel 5](/python-puissance-4-5-match-nul/) und optional [puissance4_chapitre_05.py](/downloads/puissance4/puissance4_chapitre_05.py). Frühere Schritte: [Anzeige](/python-puissance-4-2-affichage-gravite/), [Wechsel](/python-puissance-4-3-coup-alternance/), [Vier in einer Reihe](/python-puissance-4-4-quatre-alignes/).

## 2. Zufalls-KI

```python
import random

def choix_ia(grille):
    jouables = [c for c in range(COLONNES) if colonne_jouable(grille, c)]
    return random.choice(jouables)
```

Du spielst **J1** (`X`), die KI **J2** (`O`). Nach jedem KI-Zug wird die Spalte ausgegeben.

## 3. Starten und prüfen

```bash
python puissance4_chapitre_06.py
```

Modi **1** und **2** testen, **`q`** zum Beenden. Grundlagen: [Listen](/python-listes-et-chaines/), [Schleifen](/python-boucles-for-while/), [Bedingungen](/python-conditions-if-else/). Weitere Textspiele: [Galgenmännchen](/programmation/pendu/), [Schiffe versenken](/programmation/bataille-navale/), [Python-Kurs](/programmation/python/).

## 4. Download

**[puissance4_chapitre_06.py](/downloads/puissance4/puissance4_chapitre_06.py)** — Teile [1](/downloads/puissance4/puissance4_chapitre_01.py)–[5](/downloads/puissance4/puissance4_chapitre_05.py) zeigen den Aufbau. Meldungen im Skript sind Französisch (historisch); Logik ist sprachunabhängig.

## 5. Fehlerbehebung

| Symptom | Ursache | Maßnahme |
| --- | --- | --- |
| `python` unbekannt | Nicht im **PATH** | Python 3 mit PATH-Option oder `py …` unter Windows |
| Spalte abgelehnt | Volle Spalte | Erwartete Meldung « Colonne pleine » |
| KI bewegt sich nicht | Modus 1 | Neustart mit `2` |
| `empty sequence` | Keine Spalte frei | Remis-Logik prüfen |
| Zeichen kaputt | Kodierung | UTF-8-Kopfzeile im Skript |

## 6. Erweiterungen

- Gegnerische **Dreier** blockieren.
- **Undo** mit Stapel.
- [Todo-Heft-Serie](/programmation/carnet-todo/) für gespeicherte Punkte.

[Serien-Hub](/programmation/puissance-4/) · [Terminal-Minispiel](/de/python-mini-terminalspiel/).

## Amazon (Partner)

- <a href="/go/az-de-06cde53fe7" rel="sponsored nofollow noopener" class="affiliate-link">Python-Projekt- und Spielebücher bei Amazon.de</a>

*Emmanuel Sauvage — 31. Oktober 2026.*
