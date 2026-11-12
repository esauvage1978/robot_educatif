---
layout: ../../layouts/DePost.astro
title: "mBot-Aktivität: Entfernungen messen (Ultraschallsensor)"
description: "mBlock-Tutorial für Einsteiger: mBot-Ultraschallsensor im Live-Modus auslesen, Entfernung auf der LED-Matrix mit Verbinden-Blöcken. Upload, Kontrollen, Fehlerbehebung."
updated: "31. Oktober 2026"
schemaUpdated: "2026-10-31"
faqSchema:
  - question: "Wie lese ich die Ultraschall-Entfernung des mBot in mBlock aus?"
    answer: "Variable anlegen, mBot verbinden, Live-Modus aktivieren, in einer Endlosschleife der Variable den Ultraschall-Block zuweisen. Der Wert erscheint in Zentimetern neben der Figur."
  - question: "Warum akzeptiert die LED-Matrix die Zahl nicht direkt?"
    answer: "Der Sensor liefert eine Zahl; der Textscroll-Block erwartet eine Zeichenkette. Verbinden Sie Entfernung und Einheit, z. B. verbinden(Entfernung, \" cm\")."
  - question: "Live-Modus oder Upload für diese Aktivität?"
    answer: "Live zeigt die Variable am PC. Für die Anzeige ohne USB-Kabel das Blockprogramm bauen und im Upload-Modus hochladen."
  - question: "Die Anzeige bleibt bei 0 oder springt — was prüfen?"
    answer: "Hindernis etwa 3–400 cm, flache Oberfläche, USB/Upload, mBot-Blöcke installiert."
---

Einige Links auf dieser Seite sind Affiliate-Links (Amazon.de). Bei Käufen über diese Links können wir eine Provision erhalten, ohne Mehrkosten für Sie.

> **Direkte Antwort (Oktober 2026)** — In **mBlock 5** (Makeblock-Blocksoftware, ähnlich **Scratch**) lesen Sie den **Ultraschallsensor** des mBot in eine **Variable** im **Live**-Modus (Echtzeit mit dem PC, ohne bei jedem Klick hochzuladen) aus und zeigen dieselbe Entfernung auf der **LED-Matrix**, indem Sie die **Zahl** in Text umwandeln (**verbinden** + `" cm"`) und das Programm **hochladen**.

Diese Aktivität in **zwei Teilen** führt Sie dazu:

1. Die vom **Ultraschallsensor** des <a href="/go/az-de-cba2aade06/" rel="sponsored nofollow noopener" class="affiliate-link">Makeblock mBot</a> gelieferte **Entfernung** zu lesen und **am Computer** zu sehen (Variable + **Live**-Modus);
2. Diese Entfernung auf der **LED-Matrix** **ohne Kabel** anzuzeigen (Programm **auf dem Roboter gespeichert**) und den Übergang **Zahl → Text** zu beherrschen.

Die genauen Blockbezeichnungen können je nach **mBlock-Version** und **Oberflächensprache** variieren; die **logische Reihenfolge** bleibt gleich.

<figure class="article-figure">
  <img src="/capture/activite-mbot-detecteur-dintrusion/robot-mbot-detectant-intrusion.png" alt="Makeblock mBot von vorne: Ultraschallsensor und LED-Matrix auf der mCore-Platine." width="960" height="540" loading="eager" decoding="async" />
  <figcaption>Beim klassischen mBot sitzt der Ultraschallsensor meist vorne; die LED-Matrix zeigt Text oder Werte. Foto: Emmanuel Sauvage, Robot Éducatif — Oktober 2026.</figcaption>
</figure>

<aside class="article-callout" role="note">
<p><strong>Klassischer mBot oder mBot2?</strong></p>
<p>Dieses Tutorial richtet sich an den <strong>mBot mit mCore-Platine</strong> und das übliche RJ25-Ultraschallmodul. Der <strong>mBot2</strong> nutzt mBuild-Blöcke; die Ideen (Variable, Live, verbinden, Matrix) bleiben ähnlich. Vor dem Kauf: <a href="/de/mbot-vs-mbot2/">Vergleich mBot vs mBot2</a>.</p>
</aside>

<aside class="article-callout" role="note">
<p><strong>Live und Upload — zwei Modi</strong></p>
<ol>
<li><strong>Live</strong>: Das Skript spricht <strong>in Echtzeit</strong> mit dem Roboter über den PC — ideal, um die Entfernungsvariable auf dem Bildschirm zu sehen.</li>
<li><strong>Upload</strong> (Hochladen): Das Programm wird <strong>auf der mBot-Platine gespeichert</strong>; ohne USB-Kabel kann die LED-Matrix die Entfernung allein anzeigen.</li>
<li>Erst Live testen, dann für <strong>Wenn mBot startet</strong> im Upload-Modus anpassen (siehe <a href="/de/erste-schritte-mblock-5/">Erste Schritte mBlock</a>).</li>
</ol>
</aside>

| Kriterium | Detail |
| --- | --- |
| **Schwierigkeit** | Einsteiger (Variablen, Sensor); optionaler C-Teil: mittel |
| **Dauer** | Etwa 45–75 Minuten (Live + Matrix + Tests) |
| **Material** | Geladener mBot, PC, USB-Kabel (Bluetooth optional) |
| **Software** | <a href="/de/mblock-5-installieren-windows/">mBlock 5</a>, <a href="/de/mbot-bloecke-installieren/">mBot-Blöcke</a> |
| **Erfolgskontrolle** | Entfernung in cm am PC, dann etwa **`42 cm`** auf der Matrix |

<aside class="article-callout" role="note">
<p><strong>Für den Unterricht (Sekundarstufe)</strong></p>
<p>In einer Stunde können Sie eine <strong>echte Messung</strong>, <strong>visuelle Rückmeldung</strong> auf dem mBlock-Bildschirm und dasselbe Prinzip mit einem <strong>autonomen Programm auf dem Roboter</strong> zeigen — ideal für Sensor, Variable, Datentypen und Programme ohne PC.</p>
</aside>

> **Video** — *mBot-Aktivität: Entfernungen messen* (französische Sprache): [YouTube — Schritt-für-Schritt-Demo](https://www.youtube.com/watch?v=1smaSvnB7Aw). Automatische Untertitel auf Deutsch einschalten, falls verfügbar.

## Material und Software

- [mBot Überblick](/de/mbot-mein-erster-lernroboter/) · [mBlock 5 installieren](/de/mblock-5-installieren-windows/) · [Erste Schritte](/de/erste-schritte-mblock-5/) · [mBot-Blöcke](/de/mbot-bloecke-installieren/) · [mBlock vs Scratch](/de/mblock-vs-scratch/)

## 1. Voraussetzungen

- Einen [Lernroboter mBot (Makeblock)](/de/mbot-mein-erster-lernroboter/) besitzen.
- [mBlock 5 installieren](/de/mblock-5-installieren-windows/) und die [mBlock-5-Oberfläche](/de/erste-schritte-mblock-5/) kennen.
- [mBot-Blöcke installieren / aktivieren](/de/mbot-bloecke-installieren/).
- Einmal [ein Programm hochgeladen](/de/erstes-mbot-programm/) haben (**Upload**-Modus).
- Die [Aktivität Text scrollen](/de/mbot-aktivitaet-text-scrollen/) auf der Matrix schon gemacht oder parallel — gleiche Logik für eine **Zeichenkette**.

## 2. Der Ultraschallsensor: nützliche Erinnerung

Das **Ultraschall**-Modul misst **Entfernung** per Schallwelle und Laufzeitmessung nach Reflexion. Beim klassischen mBot sitzt er meist **vorne**; richten Sie den Roboter auf das Hindernis.

- **Üblicher Bereich**: oft **etwa 3 cm bis 400 cm** — zu nah oder zu weit wird die Messung **unzuverlässig**.
- **Anwendungen**: Hindernisvermeidung, [Einbruchmelder](/de/mbot-aktivitaet-einbruchmelder/), „Stopp“-Spiel usw.

Die Schallgeschwindigkeit fließt in die Berechnung ein; für die Aktivität zählt: der Block liefert **Zentimeter (cm)** — Einheit in mBlock prüfen.

## 3. Erster Teil: Entfernung auf dem Bildschirm (Live-Modus)

**Ziel**: eine **Variable** übernimmt in einer Schleife den Sensorwert; Anzeige **im Figurenbereich** am PC.

1. **Variable** anlegen und Anzeige auf der Bühne aktivieren.
2. mBot verbinden (USB oder **Bluetooth** — drahtlos; siehe [Bluetooth-Hilfe mBlock](/de/mblock-bluetooth-probleme/) bei Verbindungsabbrüchen) und **Live**-Modus wählen — **Echtzeit**, ohne bei jedem Klick alles hochzuladen.
3. In **für immer** der Variable die **Ultraschallmessung** zuweisen (Block „Entfernung / Ultraschall“ unter **mBot** oder **Sensoren**).
4. Kurzes **warten** (einige Zehntel ms) stabilisiert die Anzeige.

Beim Start des Skripts (grüne Flagge oder Live-Button) aktualisiert sich die Variable in **cm**, solange das Hindernis im gültigen Bereich bleibt.

<figure class="article-figure">
  <img src="/capture/capteur/mblock-capteur-ultrason-variable-lutin.png" alt="mBlock-Screenshot: Schleife liest Ultraschallsensor und schreibt in eine Variable." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Beispielskript: Schleife → Sensor lesen → Variable setzen. mBlock-5-Screenshot — Emmanuel Sauvage, Robot Éducatif — Oktober 2026.</figcaption>
</figure>

Beispielprojekt: [distance_sans_affichage.mblock](/capture/capteur/distance_sans_affichage.mblock).

**Kontrolle:** Blatt in **40 cm** Abstand — Variable nahe **40**. Bei **42** laut „zweiundvierzig Zentimeter“ sagen — dieselbe Zeichenkette wie auf der Matrix.

## 4. Zweiter Teil: Entfernung auf der LED-Matrix (autonom)

**Ziel**: der Roboter **allein** zeigt die Entfernung auf der **LED-Matrix**, mit **Scrollen** wenn nötig — wie [Text scrollen](/de/mbot-aktivitaet-text-scrollen/).

<figure class="article-figure">
  <img src="/capture/activite-mbot-faire-defiler-un-texte/2.1/photo_affichage_hel.webp" alt="Foto: mBot mit Wort auf der LED-Matrix." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Dieselbe LED-Matrix wie beim Textscrollen — Anzeige z. B. « 42 cm ». Foto: Emmanuel Sauvage, Robot Éducatif — Oktober 2026.</figcaption>
</figure>

### 4.1 Das Problem: Zahl vs. Text

Der **Textscroll**-Block erwartet eine **Zeichenkette** (**String**: Folge von Zeichen), z. B. `"42 cm"`. Der Sensor liefert eine **Zahl**. In Scratch / mBlock müssen Sie **Text zusammensetzen**.

### 4.2 Ansatz A — Nur Blöcke (für Einsteiger empfohlen)

Bleiben Sie in der **Blockpalette** — kein **Arduino**-Tab nötig.

1. Ultraschallwert in Variable lesen.
2. **Zeichenkette** mit **verbinden**: `verbinden(Entfernung, " cm")`.
3. An dasselbe **Scroll**-Muster wie in [Text scrollen](/de/mbot-aktivitaet-text-scrollen/) übergeben.
4. **Upload**-Modus — Kabel ab, Anzeige bleibt; Ereignis **Wenn mBot startet**, falls angeboten.

**Erfolgskriterium:** etwa **42 cm** zur Wand → Matrix zeigt **`42 cm`**.

- **Vorteil**: alles in **Blöcken** für Lernende.
- **Nachteil**: zwei Prozeduren bei gemischtem Text — benennen (`scroll_entfernung`, `scroll_text`).

Projekt speichern, z. B. `entfernung_matrix.mblock`, vor Ansatz B.

### 4.3 Ansatz B — Arduino-/C-Code (optional)

Erst nach Ansatz A. mBlock **generiert** Code aus Blöcken; Sie bearbeiten **Arduino C** (Tab **Code** / Symbol `</>`).

**Typische Schritte**:

1. Programm **in Blöcken** bauen (Schleife, Sensor, Scroll-Aufruf).
2. **Code**-Ansicht öffnen, **alles kopieren**.
3. Tab **Arduino**, **einfügen**, Scroll-Aufruf anpassen — **Zahl und Einheit** als **String** verketten.

```cpp
defilement_texte_N_N(String(data) + String(" cm"), 1);
```

**Sicherheit**: `.mblock`-Backup, erneutes Hochladen, Kabel und Batterien prüfen.

## 5. Erweiterungsideen

- Ausreißer filtern; Schwellenwerte — [Einbruchmelder](/de/mbot-aktivitaet-einbruchmelder/).
- [Ultraschall-Serie Episode 1 (französische Seite, gleiche Blocklogik)](/serie-capteur-ultrason-mbot-1-mesurer-distance/), [Projektideen für eine Stunde](/de/mbot-ein-stunden-projekte/) oder [LED blinken](/de/mbot-aktivitaet-leds-blinken/).

## 6. Kontrollen und Fehlerbehebung

| Problem | Häufige Ursache | Maßnahme |
|---------|-----------------|----------|
| Variable steht | Live aus / nicht verbunden | USB, **mBot**, Live neu starten |
| Wert **0** | Außerhalb 3–400 cm | Flache Fläche, mittlerer Abstand |
| Bluetooth wackelt | Reichweite / Akku | USB im Unterricht; [Bluetooth-Hilfe](/de/mblock-bluetooth-probleme/) |
| Matrix leer ohne Kabel | Nicht hochgeladen | **Upload** erneut; **Wenn mBot startet** |
| Keine Sensorblöcke | mBot-Bibliothek aus | [Blöcke installieren](/de/mbot-bloecke-installieren/) |
| Typfehler Scroll | Zahl statt Text | **Verbinden** + `" cm"` |
| Wert springt stark | Schräge Fläche / Hand im Strahl | Ebene Fläche; Hände weg |

## FAQ

### Wie lese ich die Entfernung aus?

Variable + Schleife + Ultraschall in **Live** mit Bühnenanzeige.

### Warum `" cm"` verbinden?

Scroll erwartet **Text**, Sensor liefert **Zahl**.

### Live oder Upload?

**Live** am PC testen; **Upload** für Demo ohne Kabel.

## 7. Weitergehen

[Einbruchmelder](/de/mbot-aktivitaet-einbruchmelder/), [LED blinken](/de/mbot-aktivitaet-leds-blinken/), [Erstes Programm](/de/erstes-mbot-programm/) und **mBlock**-Guides in der Seitenleiste.

**Für die Klasse**: [10 kostenlose mBot-Projekte](/de/10-kostenlose-mbot-klassenprojekte/) mit PDF-Arbeitsblättern.

Hardware: <a href="/go/az-de-cba2aade06/" rel="sponsored nofollow noopener" class="affiliate-link">mBot bei Amazon.de</a> — Tagespreis prüfen.

*Amazon-Partner — Provision auf qualifizierte Käufe möglich, ohne Mehrkosten für Sie.*

*Emmanuel Sauvage — Aktualisierung 31. Oktober 2026.*
