---
layout: ../../layouts/DePost.astro
title: "Das erste mBot-Programm in mBlock 5 (Schritt für Schritt)"
description: "Ein erstes mBot-Programm in mBlock 5 bauen, testen und hochladen: Startereignis, auf den Taster der Platine warten, einen Ton spielen, dann per USB oder Bluetooth verbinden und hochladen. Mit Projektdatei."
updated: "23. Oktober 2026"
---

Diese Anleitung führt **Schritt für Schritt** vom ersten Block in mBlock 5 bis zum **Hochladen** des Programms auf einen mBot von [Makeblock](/de/marke-makeblock/). Das Programm ist bewusst einfach: Nach dem Start wartet der mBot, bis Sie den **Taster auf seiner Platine** drücken, und spielt dann einen **kurzen Ton**. Ziel ist der Ablauf (Software öffnen → Blöcke stapeln → speichern → verbinden → testen → hochladen), noch keine komplexen Algorithmen.

## Voraussetzungen

- Ein **mBot** (mCore-Platine) mit geladenen Batterien.
- **mBlock 5** ist installiert: siehe [mBlock 5 unter Windows installieren](/de/mblock-5-installieren-windows/).
- In mBlock im Bereich **Geräte** den **mBot** hinzufügen, damit die orangefarbenen mBot-Blöcke erscheinen.

## 1. Das Programm im Überblick

| Schritt | Block (Kategorie) | Wirkung |
|---|---|---|
| 1 | Startblock des mBot, englisch *when mBot(mcore) starts up* (mBot / Ereignisse) | Einstieg, wenn die Platine eingeschaltet oder zurückgesetzt wird |
| 2 | *warte bis ⟨ ⟩* (Steuerung) | hält an, bis die Bedingung wahr wird |
| 3 | Abfrage des Platinen-Tasters, englisch *when on-board button pressed?* (Fühlen) | wird wahr, wenn Sie den Taster drücken |
| 4 | Tonblock, englisch *play note C4 for 0.25 beats* (Aussehen / Klang) | spielt einen kurzen Ton |

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
