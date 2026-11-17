---
layout: ../../layouts/DePost.astro
title: "Das erste mBot-Programm in mBlock 5 (Schritt für Schritt)"
description: "Ein erstes mBot-Programm in mBlock 5 bauen, testen und hochladen: Startereignis, auf den Taster der Platine warten, einen Ton spielen, dann per USB oder Bluetooth verbinden und hochladen. Mit Projektdatei und Screenshots."
updated: "17. November 2026"
schemaUpdated: "2026-11-17"
faqSchema:
  - question: "Was ist das empfohlene erste mBot-Programm?"
    answer: "Ein einfaches mBlock-5-Skript: beim Start des mBot auf den Taster der mCore-Platte warten, dann eine Note spielen. Damit prüfen Sie Verbindung und Hochladen ohne komplexe Logik."
  - question: "USB oder Bluetooth für dieses Tutorial?"
    answer: "USB ist beim ersten Hochladen und bei Firmware-Updates am zuverlässigsten. Bluetooth eignet sich für Live-Tests am PC; zum Schreiben in den Roboter-Speicher bleibt USB die sichere Wahl."
  - question: "Funktioniert die Anleitung mit mBot2?"
    answer: "Die Logik ist ähnlich, aber dieser Guide gilt für den klassischen mBot (mCore). Wählen Sie in mBlock das richtige Gerät und lesen Sie mBot vs mBot2, wenn die Menüs abweichen."
  - question: "Wo liegt die .mblock-Datei aus dem Artikel?"
    answer: "Am Ende des Artikels: direkter Link zu premier_programme.mblock. In mBlock 5 öffnen (Datei → Öffnen) und mit Ihrem Skript vergleichen."
---

Einige Links sind **Amazon.de**-Partnerlinks: bei einem Kauf kann eine Provision anfallen, ohne Mehrkosten für Sie.

> **Kurzantwort (17. November 2026)** — **mBlock 5** öffnen, Gerät **mBot** wählen, stapeln: **Wenn mBot startet** → **warte bis** (Taster gedrückt) → **Note spielen**. Speichern, per **USB** verbinden, **hochladen**. Hilfe bei der Verbindung: [erste Schritte mBlock](/de/erste-schritte-mblock-5/).

Diese Anleitung führt **Schritt für Schritt** vom ersten Block in mBlock 5 bis zum **Hochladen** des Programms auf einen mBot von [Makeblock](/de/marke-makeblock/). Das Programm ist bewusst einfach: Nach dem Start wartet der mBot, bis Sie den **Taster auf seiner Platine** drücken, und spielt dann einen **kurzen Ton**. Ziel ist der Ablauf (Software öffnen → Blöcke stapeln → speichern → verbinden → testen → hochladen), noch keine komplexen Algorithmen.

<figure class="article-figure">
  <img src="/capture/premier_programme/04-jouer-note-c4.png" alt="mBlock 5: fertiges mBot-Programm mit Startblock, Warten auf Taster und Note C4." width="960" height="540" loading="eager" decoding="async" />
  <figcaption>Fertiges Programm in mBlock 5: drei verschachtelte Blöcke reichen für den ersten Upload. Screenshot mBlock 5 — Emmanuel Sauvage, Robot Éducatif — November 2026.</figcaption>
</figure>

| Kriterium | Detail |
| --- | --- |
| **Niveau** | Einsteiger (erstes Hochladen) |
| **Dauer** | etwa 30–45 Minuten (Verbindung + Test) |
| **Material** | [mBot (mCore)](/de/mbot-mein-erster-lernroboter/) mit geladenen Batterien, PC, USB-Kabel |
| **Software** | [mBlock 5](/de/mblock-5-installieren-windows/), [mBot-Blöcke](/de/mbot-bloecke-installieren/) |

## Voraussetzungen

- Ein **mBot** (mCore-Platine) mit geladenen Batterien.
- **mBlock 5** ist installiert: siehe [mBlock 5 unter Windows installieren](/de/mblock-5-installieren-windows/).
- In mBlock im Bereich **Geräte** den **mBot** hinzufügen, damit die orangefarbenen mBot-Blöcke erscheinen.

## 1. Das Programm im Überblick

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Schritt</th>
<th scope="col">Block (Kategorie)</th>
<th scope="col">Wirkung</th>
</tr></thead><tbody>
<tr>
<td data-label="Schritt"><span class="td-val">1</span></td>
<td data-label="Block (Kategorie)"><span class="td-val">Startblock des mBot, englisch <em>when mBot(mcore) starts up</em> (mBot / Ereignisse)</span></td>
<td data-label="Wirkung"><span class="td-val">Einstieg, wenn die Platine eingeschaltet oder zurückgesetzt wird</span></td>
</tr>
<tr>
<td data-label="Schritt"><span class="td-val">2</span></td>
<td data-label="Block (Kategorie)"><span class="td-val"><em>warte bis ⟨ ⟩</em> (Steuerung)</span></td>
<td data-label="Wirkung"><span class="td-val">hält an, bis die Bedingung wahr wird</span></td>
</tr>
<tr>
<td data-label="Schritt"><span class="td-val">3</span></td>
<td data-label="Block (Kategorie)"><span class="td-val">Abfrage des Platinen-Tasters, englisch <em>when on-board button pressed?</em> (Fühlen)</span></td>
<td data-label="Wirkung"><span class="td-val">wird wahr, wenn Sie den Taster drücken</span></td>
</tr>
<tr>
<td data-label="Schritt"><span class="td-val">4</span></td>
<td data-label="Block (Kategorie)"><span class="td-val">Tonblock, englisch <em>play note C4 for 0.25 beats</em> (Aussehen / Klang)</span></td>
<td data-label="Wirkung"><span class="td-val">spielt einen kurzen Ton</span></td>
</tr>
</tbody>
</table>
</div>

Die Beschriftungen der Blöcke hängen von der mBlock-Version und der eingestellten Sprache ab; die englischen Bezeichnungen helfen beim Wiederfinden.

```text
Wenn der mBot startet:
  warte bis (Platinen-Taster gedrückt)
  spiele Note C4 für 0,25 Schläge
```

**Ergebnis:** Nach dem Start wartet der Roboter; **ein Druck** auf den Taster spielt den Ton **einmal**. Ohne Schleife wiederholt sich die Aktion nicht von selbst.

## 2. Projekt speichern

Über **Datei → Auf Computer speichern** einen Ordner und Namen wählen (Endung `.mblock`). Speichern Sie oft.

## 3. mBot verbinden

Den Roboter per **USB** (Kabel liegt bei) anschließen oder eine **Bluetooth**-Kopplung vorbereiten und den mBot **einschalten**. In mBlock auf **Verbinden** klicken und USB oder Bluetooth wählen. Bluetooth eignet sich für **Live**-Tests ohne Kabel; für ein **Firmware-Update** oder zuverlässiges **Hochladen** wird in der Regel USB empfohlen.

Klappt Bluetooth nicht, hilft unsere Anleitung [mBlock-Bluetooth-Probleme lösen](/de/mblock-bluetooth-probleme/).

## 4. Firmware

Bietet mBlock ein **Firmware-Update** an, nur **per USB** durchführen, mit angeschlossenem Roboter und geladenen Batterien. Den Roboter während des Updates nicht trennen.

## 5. Testen, dann hochladen

Solange verbunden, klicken Sie auf die Blöcke, um das Verhalten **live zu prüfen**. Passt alles, in den Modus **Hochladen** wechseln und auf **Hochladen** klicken: Das Programm wird im Speicher des Roboters abgelegt und läuft dann **ohne Computer**.

Schlägt das Hochladen fehl, Verbindung und gewähltes Gerät prüfen und das Skript Block für Block durchgehen (Blöcke richtig verschachtelt, Startblock vorhanden).

## 6. Projektdatei und nächste Schritte

Das hier beschriebene Projekt zum Herunterladen: **[premier_programme.mblock](/programmes/premier_programme.mblock)** (mBlock-5-Datei).

Danach können Sie die Melodie mit **wiederhole** / **wiederhole fortlaufend** wiederholen lassen und dabei laufend testen. Dieselbe Logik in Code schreiben Sie im [Arduino-C-Kurs](/de/arduino/). Weitere Anleitungen unter [Anleitungen](/de/anleitungen/).

Hardware (Affiliate): <a href="/go/az-de-cba2aade06/" rel="sponsored nofollow noopener">Makeblock mBot bei Amazon.de</a> — Tagespreis prüfen.

## Häufige Fragen

### Welches erste Programm?

**Taster abwarten**, dann **eine Note** — so validieren Sie Verbindung, Blöcke und Hochladen.

### USB oder Bluetooth?

**USB** für Hochladen und Firmware; **Bluetooth** für Live-Tests. Siehe [mBlock-Bluetooth-Probleme](/de/mblock-bluetooth-probleme/).

### mBot2?

Guide für **mCore**; bei **mBot2** das passende Gerät wählen — [mBot vs mBot2](/de/mbot-vs-mbot2/).

*Emmanuel Sauvage — Aktualisiert am 17. November 2026.*
