---
layout: ../../layouts/DePost.astro
title: "mBot-Programm: LEDs blinken lassen (mBlock)"
description: "Drei mBlock-Aktivitäten mit mBot-RGB-LEDs: abwechselnd rot, RGB-Zyklus, Fade mit Variablen. Upload-Modus, Tests und Fehlerbehebung."
updated: "31. Oktober 2026"
schemaUpdated: "2026-10-31"
faqSchema:
  - question: "Wie lasse ich die mBot-LEDs in mBlock blinken?"
    answer: "In mBlock 5 mit Gerät mBot: Start-Ereignis, Schleife, RGB-LED-Blöcke (0–255) und Warte-Blöcke stapeln. Modus Upload wählen, wenn der Roboter ohne USB-Kabel blinken soll."
  - question: "Warum bleibt eine LED nach dem Programm an?"
    answer: "Eine LED geht nicht von selbst aus: Farbe 0, 0, 0 setzen. In Aktivität 1 die andere Seite zuerst ausschalten."
  - question: "Live- oder Upload-Modus zum Blinken?"
    answer: "Live testet mit dem PC. Für eine Demo ohne Kabel: Upload — Start meist „wenn mBot startet“ statt grüner Flagge."
  - question: "Ich finde keine mBot-LED-Blöcke — was tun?"
    answer: "mBot-Erweiterung aktivieren (Gerät → mBot) und die Anleitung mBot-Blöcke installieren befolgen."
---

Einige Links auf dieser Seite sind Affiliate-Links (Amazon.de). Bei einem Kauf können wir eine Provision erhalten — ohne Mehrkosten für Sie.

> **Direkte Antwort (Oktober 2026)** — In **mBlock 5** (Makeblock-Blocksoftware, nah an **Scratch**): **Start**-Ereignis, **Schleife**, **RGB-LED**-Blöcke und **warten** zum Farbwechsel am **klassischen mBot**; **hochladen** im Modus **Upload**, wenn der Roboter **ohne USB-Kabel** blinken soll.

Der [Makeblock mBot Lernroboter](/de/mbot-mein-erster-lernroboter/) hat **zwei RGB-LEDs** auf der **mCore**-Platine — der **Hauptsteuerplatine** des Roboters (Mikrocontroller, Stromversorgung, Motor- und Sensoranschlüsse). Jede LED ist eine **Leuchtdiode (LED)**, die **Rot, Grün und Blau** mischt (**RGB**: *Red, Green, Blue*). Drei kurze Programme: **abwechselnd rot**, **Rot/Grün/Blau-Zyklus**, dann **progressiver Fade** mit einer **Variable** (im Skript gespeicherter Wert). Sinnvoll nach dem [ersten mBot-Programm](/de/erstes-mbot-programm/) oder den [Projektideen für eine Stunde](/de/mbot-ein-stunden-projekte/).

<figure class="article-figure">
  <img src="/images/lot1/mbot-premier-hero.webp" alt="Klassischer Makeblock mBot Lernroboter von vorne, zwei RGB-LEDs auf der mCore-Platine." width="960" height="540" loading="eager" decoding="async" />
  <figcaption>Die beiden RGB-LEDs sitzen links und rechts des mittleren Tasters auf der mCore. Produktfoto — Emmanuel Sauvage, Robot Éducatif — Oktober 2026.</figcaption>
</figure>

<aside class="article-callout" role="note">
<p><strong>Klassischer mBot oder mBot2?</strong></p>
<p>Dieses Tutorial richtet sich an den <strong>mBot mit mCore-Platine</strong> (blaues Kit). Der <strong>mBot2</strong> nutzt eine andere Platine und andere Blöcke in mBlock; RGB-Prinzipien bleiben ähnlich. Vor dem Kauf: <a href="/de/mbot-vs-mbot2/">mBot vs mBot2</a> lesen.</p>
</aside>

<aside class="article-callout" role="note">
<p><strong>Vor Aktivität 1 — Upload-Modus</strong></p>
<ol>
<li>mBot per <strong>USB</strong> verbinden, mBlock öffnen, <strong>Gerät</strong> → <strong>mBot</strong>.</li>
<li>Aktivität 1 bauen, optional in <strong>Live</strong> testen (Echtzeit mit PC, Kabel oder Bluetooth).</li>
<li>Auf <strong>Upload / Hochladen</strong> wechseln, Ereignis <strong>wenn mBot startet</strong> wählen.</li>
<li>Hochladen, Kabel abziehen: Blinken läuft allein weiter (siehe <a href="/de/erste-schritte-mblock-5/">Erste Schritte mBlock</a> bei abweichenden Menüs).</li>
</ol>
</aside>

| Kriterium | Detail |
| --- | --- |
| **Niveau** | Einsteiger (Schleifen, Wartezeiten); Aktivität 3: mittel (Variable) |
| **Dauer** | Etwa 30–60 Minuten für alle drei Aktivitäten |
| **Hardware** | Geladener mBot, PC, USB-Kabel |
| **Software** | <a href="/de/mblock-5-installieren-windows/">mBlock 5</a>, <a href="/de/mbot-bloecke-installieren/">mBot-Blöcke</a> |
| **Erfolgskontrolle** | LEDs blinken wie beschrieben; Aktivität 3: sanfter Farbverlauf |

<aside class="article-callout" role="note">
<p><strong>Voraussetzungen</strong></p>
<ul>
<li>mBlock öffnen und <strong>mBot</strong> als Gerät wählen.</li>
<li><a href="/de/mbot-bloecke-installieren/">mBot-Blöcke installieren</a>, wenn LED-Blöcke fehlen.</li>
<li>Optional: einmal <a href="/de/erstes-mbot-programm/">Programm hochgeladen</a>.</li>
</ul>
</aside>

## Hardware und Software

- [mBot-Übersicht](/de/mbot-mein-erster-lernroboter/) · [mBlock 5 installieren](/de/mblock-5-installieren-windows/) · [Erste Schritte](/de/erste-schritte-mblock-5/) · [mBot-Blöcke](/de/mbot-bloecke-installieren/) · [mBlock vs Scratch](/de/mblock-vs-scratch/)

<figure class="article-figure">
  <img src="/images/blog/installer-blocs-mbot/etape-04-palette-blocs-mbot.webp" alt="Screenshot mBlock 5: orange mBot-Blockpalette mit LED-Kategorie." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>LED-Blöcke erscheinen in der orangefarbenen mBot-Palette, sobald das Gerät mBot gewählt ist. Screenshot mBlock 5 — Emmanuel Sauvage, Robot Éducatif — Oktober 2026.</figcaption>
</figure>

Jede Komponente **R**, **G**, **B** von **0 bis 255**; **0, 0, 0** = **aus**. Unterscheiden Sie diese **seitlichen RGB-LEDs** von der **LED-Matrix** in der Mitte (laufender Text): siehe [Text scrollen lassen](/de/mbot-aktivitaet-text-scrollen/).

## 1. Etwas Theorie

Im [RGB-Farbmodell](https://de.wikipedia.org/wiki/RGB-Farbraum) kann jede Komponente **0 bis 255** annehmen.

Beispiele: Rot **255 – 0 – 0** · Grün **0 – 255 – 0** · Blau **0 – 0 – 255** · Weiß **255 – 255 – 255** · Aus **0 – 0 – 0**.

Mehr als **16 Millionen** Farben — genau **16.777.216**.

## 2. Aktivität 1: abwechselnd rot blinken

**Ziel:** LEDs **abwechselnd links und rechts rot**, **10-mal**, je **1 Sekunde** an. Eine LED geht **nicht** von selbst aus: **0-0-0** setzen.

<figure class="article-figure">
  <img src="/images/lot3/leds-activite1-clignotement.webp" alt="Pädagogisches Diagramm der mBlock-Blöcke für abwechselndes rotes LED-Blinken am mBot" width="800" height="450" loading="lazy" decoding="async" />
  <figcaption>Blockfolge Aktivität 1 (in mBlock 5 nachbauen). Diagramm — Emmanuel Sauvage, Robot Éducatif — Oktober 2026.</figcaption>
</figure>

**Pseudo-Code:**

```text
wenn mBot startet
wiederhole 10 mal
  linke LED rot; rechte LED aus
  warte 1 s
  linke LED aus; rechte LED rot
  warte 1 s
```

**Erfolgskriterium:** zehn Zyklen, rot links dann rechts, ohne beide gleichzeitig an.

Speichern als `leds_blinken_1.mblock`.

<figure class="article-figure">
  <img src="/capture/premier_programme/12-televersement.png" alt="Screenshot mBlock 5: Fortschritt oder Bestätigung nach dem Hochladen zum mBot." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Nach erfolgreichem Upload USB abziehen: der Roboter blinkt allein. Screenshot mBlock 5 — Emmanuel Sauvage, Robot Éducatif — Oktober 2026.</figcaption>
</figure>

## 3. Aktivität 2: Rot, Grün, Blau

**Ziel:** **Rot, Grün, Blau** auf **beiden** LEDs, **10 Zyklen**.

<figure class="article-figure">
  <img src="/images/lot3/leds-activite2-rgb.webp" alt="Pädagogisches Diagramm der mBlock-Blöcke für einen Rot-Grün-Blau-LED-Zyklus" width="800" height="450" loading="lazy" decoding="async" />
  <figcaption>Blockfolge Aktivität 2. Diagramm — Emmanuel Sauvage, Robot Éducatif — Oktober 2026.</figcaption>
</figure>

**Pseudo-Code:**

```text
wenn mBot startet
wiederhole 10 mal
  beide LEDs rot → warte 1 s
  beide LEDs grün → warte 1 s
  beide LEDs blau → warte 1 s
```

**Erfolgskriterium:** beide LEDs wechseln zehnmal rot, grün, blau mit etwa einer Sekunde Pause.

Speichern als `leds_rgb.mblock`. Anschluss: [Entfernung messen](/de/mbot-aktivitaet-entfernung-messen/) oder [Einbruchmelder](/de/mbot-aktivitaet-einbruchmelder/).

## 4. Aktivität 3: progressiver Fade

**Ziel:** Rot, Grün, Blau **progressiv** von **0 bis 255** hochfahren. Variable (z. B. `intensitaet`), Start **0**, um **1** erhöhen, je **0,01 s** anzeigen.

<figure class="article-figure">
  <img src="/images/lot3/leds-activite3-progressif.webp" alt="Pädagogisches Diagramm zum progressiven LED-Fade mit Intensitätsvariable" width="800" height="450" loading="lazy" decoding="async" />
  <figcaption>Aktivität 3: Variable steigert die Farbintensität. Diagramm — Emmanuel Sauvage, Robot Éducatif — Oktober 2026.</figcaption>
</figure>

**Pseudo-Code (Rot-Fade — für Grün und Blau wiederholen):**

```text
setze intensitaet auf 0
wiederhole 255 mal
  ändere intensitaet um 1
  linke und rechte LED = (intensitaet, 0, 0)
  warte 0,01 s
```

Dann Schleifen mit `(0, intensitaet, 0)` und `(0, 0, intensitaet)`. Export als `leds_fade_rgb.mblock`.

**Erfolgskriterium:** sanfter Helligkeitsanstieg pro Farbe; **0,01 s** beibehalten oder leicht anpassen.

### Eigener Block

Drei Parameter (Schritt, Wartezeit, Farbindex **0/1/2**) sparen Wiederholungen — wichtig in [10 kostenlose mBot-Klassenprojekte](/de/10-kostenlose-mbot-klassenprojekte/).

Fazit: Sie haben RGB-LEDs genutzt und **Schleifen**, **Variablen** und optional **eigene Blöcke** in mBlock gesehen.

## 5. Prüfung und Fehlerbehebung

| Problem | Häufige Ursache | Lösung |
| --- | --- | --- |
| Keine LED leuchtet | Nicht verbunden / falsches Gerät | USB, Batterien, **mBot** in mBlock |
| Eine LED bleibt an | **0, 0, 0** vergessen | Nach jeder Farbe ausschalten |
| Live ok, nach Abziehen aus | Nicht hochgeladen | **Upload** und erneut hochladen |
| Keine LED-Blöcke | mBot-Bibliothek aus | <a href="/de/mbot-bloecke-installieren/">mBot-Blöcke installieren</a> |
| Blinken zu schnell / langsam | Falscher **warte**-Wert | **1 Sekunde** in Aktivität 1 und 2 |
| Farben blass oder falsch | RGB außerhalb 0–255 | Jede Komponente **0 bis 255** |

Bluetooth-Probleme im Live-Modus? Erst **USB** nutzen — siehe [mBlock Bluetooth](/de/mblock-bluetooth-probleme/).

## FAQ

### Wie blinken die LEDs?

Start, Schleife, **RGB-LED**- und **Warte**-Blöcke stapeln, dann hochladen.

### Warum bleibt eine LED an?

Explizit **0, 0, 0** senden.

### Live oder Upload?

**Live** = Test am PC; **Upload** = Programm im Roboter für Demo ohne Kabel.

## 6. Weiterlernen

- [Erstes mBot-Programm](/de/erstes-mbot-programm/)
- [Entfernung messen](/de/mbot-aktivitaet-entfernung-messen/)
- [mBlock-Tutorials](/en/tutorials/)
- [Einbruchmelder](/de/mbot-aktivitaet-einbruchmelder/)
- [Welche mBlock-Software wählen?](/de/mblock-software-welche-waehlen/)

Hardware (Affiliate): <a href="/go/az-de-cba2aade06/" rel="noopener nofollow sponsored">mBot auf Amazon.de</a> — Preis am Tag der Bestellung prüfen.

*Emmanuel Sauvage — aktualisiert am 31. Oktober 2026.*
