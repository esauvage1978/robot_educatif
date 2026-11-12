---
layout: ../../layouts/DePost.astro
title: "mBot programmieren in 1 Stunde: Herausforderungen und Methode"
description: "mBot-Programmierung für eine Unterrichtsstunde: Minutenplan, 7 Aufgaben (LED, Ultraschall, Parcours) und Links zu den Schritt-für-Schritt-Tutorials im Kurs."
updated: "31. Oktober 2026"
faqSchema:
  - question: "Wie lange dauert ein mBot-Programm im Workshop?"
    answer: "Planen Sie 45 bis 60 Minuten pro Herausforderung: 5 Min. Ziel, 30 Min. Programmieren und Testen, 10 Min. Robustheit, 5 Min. Demo."
  - question: "Was kann man in einer Stunde auf dem mBot programmieren?"
    answer: "Kurze Herausforderungen: eine LED-Ampel, ein Ultraschall-Radar, einen Einbruchszähler, einen Parcours mit festen Zeiten oder ein Mini-Szenario auf der LED-Matrix."
---

Sie suchen **mBot-Programmierung** (der mit Blöcken programmierbare Lernroboter von Makeblock), die in **eine Stunde** Unterricht, AG oder Nachmittag zu Hause passt? Diese Seite liefert zuerst die **Methode** (Minutenplan), dann eine **Liste von Herausforderungen**, die sofort starten können, mit Links zu den Schritt-für-Schritt-Tutorials der Website.

> **Direkte Antwort (Oktober 2026)** — Planen Sie **45–60 Minuten** pro Herausforderung: 5 Min. Ziel, 30 Min. Code/Test, 10 Min. Robustheit, 5 Min. Demo. Schnelle Ideen: [LED](/de/mbot-aktivitaet-leds-blinken/), [Ultraschall](/de/mbot-aktivitaet-entfernung-messen/), [Einbruch](/de/mbot-aktivitaet-einbruchmelder/). Installieren Sie [mBlock 5](/de/mblock-5-installieren-windows/) vor der Sitzung.

Voraussetzung: **mBlock** installiert, Roboter **geladen** (oder Batterien in Ordnung), [erste Schritte in mBlock](/de/erste-schritte-mblock-5/) erledigt. Einige Kauf-Links stehen **nach** den Herausforderungen; es sind Affiliate-Links (Provision möglich). Prüfen Sie den Tagespreis auf Amazon.de.

![Makeblock mBot von schräg vorn, bereit für eine Einstunden-Herausforderung](/images/lot1/mbot-premier-hero.webp)

*Der klassische mBot — ideal für kurze Block-Challenges in Scratch / mBlock. Produktfoto für diesen Artikel.*

## 1. Die Stunde aufteilen (eine Methode, die funktioniert)

| Minuten | Aktivität |
|---------|----------|
| 0–5 | Ziel erinnern + **Erfolgskriterium** („wir hören auf, wenn…“). |
| 5–35 | Code und **kurze Tests** (kein Monsterprogramm mit 80 Blöcken). |
| 35–50 | **Robustheit**: Was passiert, wenn man den Roboter oder das Hindernis verschiebt? |
| 50–60 | **Demo** 2 Minuten + ein Satz „was wir nächstes Mal machen würden“. |

Dieser Ablauf verhindert, dass die ganze Stunde in der Fehlersuche vergeht, ohne je ein Ergebnis zu zeigen.

## 2. Ideen für Herausforderungen (mBot-Programmierung)

### Express-Ampel (~30 Min. Code)

**Rot / Grün** (dann Orange, falls vorhanden) auf den LEDs mit Zeitsteuerungen abwechseln — Basis: [LEDs blinken lassen](/de/mbot-aktivitaet-leds-blinken/).

### „Stopp“-Radar (~30 Min.)

**Alarm** (LED oder Matrix), wenn der gemessene Abstand unter einen Schwellenwert fällt — erweitert [Entfernung messen](/de/mbot-aktivitaet-entfernung-messen/).

### Einbruchszähler (~35 Min.)

**Ultraschall + Zähler + Anzeige** kombinieren — siehe [Einbruchmelder](/de/mbot-aktivitaet-einbruchmelder/).

### Herausforderung „eine Minute Stille“ (~25 Min.)

Der Roboter bleibt still, solange kein **Geräusch** über einem Schwellenwert erkannt wird — **nur wenn** Ihr Modell ein in mBlock nutzbares Mikrofon hat (der klassische mBot v1 hat ab Werk keines, mBot2 / CyberPi schon). Andernfalls ersetzen Sie den Auslöser durch den Taster auf der Platine oder einen Liniensensor.

### Mini-Erzähl-Szenario (~30 Min.)

Der Roboter „überbringt“ eine Nachricht auf Matrix oder LEDs zwischen zwei Fahrten — ideal für eine **mündliche Präsentation** in der Klasse. Laufschrift auf der Matrix: [Text scrollen](/de/mbot-aktivitaet-text-scrollen/).

### Vorgeschriebener Parcours ohne schwarze Spur (~35 Min.)

**Vorwärts / drehen / rückwärts** mit festen Zeiten programmieren, um aus einem mit Kreide gezeichneten Labyrinth herauszukommen — am Anfang ist kein Linienfolger nötig. Ausgangspunkt: [erstes mBot-Programm](/de/erstes-mbot-programm/).

### Ampel + Ultraschall kombiniert (~45–55 Min.)

Verketten Sie LED-Sequenz und Abstandsschwelle, wenn die Gruppe schnell vorankommt: Die Ampel bleibt grün, solange der Weg frei ist, und springt auf Rot, sobald ein Hindernis näher als der Schwellenwert kommt. Halten Sie die Demo kurz.

## Nützliches Material (nach den Herausforderungen)

Wenn Methode und Ideen klar sind, hier das gängigste Material für diese Workshops. Amazon-Preise ändern sich: Prüfen Sie das Angebot am Kauftag.

**Makeblock mBot** — ca. 8–12 Jahre · Scratch und Arduino · schneller Aufbau für einen Workshop · LEDs und Ultraschallsensor passend zu 1-Stunden-Challenges · [Amazon.de](https://www.amazon.de/dp/B07XR98YYQ?tag=roboteducat00-21)

**ELEGOO Penguin Bot** (Budget-Alternative, kein mBot) — ca. 8–14 Jahre · Arduino C · origineller zweibeiniger Roboter für andere Workshop-Formate · [Amazon.de](https://www.amazon.de/s?k=ELEGOO+Penguin+Bot&tag=roboteducat00-21)

## 3. Weiterführendes

- Vorstellung des Roboters: [mBot, mein erster Lernroboter](/de/mbot-mein-erster-lernroboter/).
- Zubehör für später: [mBot-Zubehör — womit anfangen](/de/mbot-zubehoer-einstieg/).
- Längere Sequenz: [10 kostenlose mBot-Projekte für die Klasse](/de/10-kostenlose-mbot-klassenprojekte/).

## 4. Fallen in 1 Stunde vermeiden

- Ziel **zu breit** („wir machen alles“) — lieber **eine** fertige Funktion.
- Die **Abschlussdemo** vergessen: Sie verankert das Lernen.
- 40 Minuten mit USB-Kabel oder Bluetooth verlieren: Testen Sie die Verbindung **vor** der Sitzung ([mBlock-Bluetooth-Probleme lösen](/de/mblock-bluetooth-probleme/), falls nötig).

## Amazon-Links (Affiliate)

- [Makeblock mBot](https://www.amazon.de/dp/B07XR98YYQ?tag=roboteducat00-21)

*Amazon-Partner — Provision bei berechtigten Käufen möglich, ohne Mehrkosten für Sie.*

**Tipp.** Beenden Sie immer mit einer **2-Minuten-Demo** vor jemandem: Das festigt das Ziel und verhindert, das Programm zu überkomplizieren.

**Weiterlesen**: [bester Lernroboter 2026](/de/bester-lernroboter-2026/) · [Kaufberater](/de/kaufberater/).

*Autor: Emmanuel Sauvage · aktualisiert am 31. Oktober 2026.*
