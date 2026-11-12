---
layout: ../../layouts/DePost.astro
title: "mBot-Blöcke in mBlock 5 installieren (echte Screenshots)"
description: "mBot oder mBot2 als Gerät in mBlock 5 hinzufügen: echte Oberflächencaptures, orangene Blockpalette, Modellwahl und Fehlerhilfe — Oktober 2026."
updated: "31. Oktober 2026"
schemaUpdated: "2026-10-31"
faqSchema:
  - question: "Brauche ich USB, um die mBot-Blöcke zu installieren?"
    answer: "Nein. Das Hinzufügen des mBot-Geräts lädt die orangenen Blöcke ohne Kabel. USB oder Bluetooth brauchen Sie später zum Verbinden und Hochladen."
  - question: "Ich sehe nur Scratch-Blöcke, keine mBot-Blöcke"
    answer: "Geräte öffnen, Hinzufügen (+) wählen, mBot oder mBot2 passend zum Kit wählen, OK bestätigen, dann mBot in der Liste aktiv lassen."
  - question: "mBot oder mBot2 in der Bibliothek?"
    answer: "Blaues Zwei-Motor-Kit mit mCore → mBot. CyberPi oder mBot2 → mBot2. Im Zweifel: mBot vs mBot2 auf dieser Site."
  - question: "mBot-Blöcke nach anderem Projekt verschwunden"
    answer: "Ein anderes Gerät (CyberPi, Ranger…) ist aktiv. Erneut auf mBot unter Geräte klicken."
---

Einige Links auf dieser Seite sind Affiliate-Links. Bei einem Kauf können wir eine Provision erhalten, ohne Mehrkosten für Sie. Preise auf [Amazon.de](https://www.amazon.de/s?k=Makeblock+mBot&tag=roboteducat00-21) prüfen — wir erfinden keine Tagespreise.

> **Direkte Antwort (Oktober 2026)** — In **mBlock 5** (Makeblocks blockbasierter Editor, ähnlich **Scratch** vom MIT): **Geräte** → **Hinzufügen (+)** → **mBot** (klassisches **mCore**-Kit) oder **mBot2** (**CyberPi**) → **OK**. Dann erscheinen **orangene** Robot-Blöcke (Motoren, Sensoren, LEDs, Summer). Ohne diesen Schritt nur Standard-Scratch-Blöcke. Zuerst: [mBlock 5 unter Windows installieren](/de/mblock-5-installieren-windows/) oder [mBlock 5 kostenlos laden](/de/mblock-5-kostenlos-herunterladen/). Danach: [Erste Schritte mBlock 5](/de/erste-schritte-mblock-5/) und [Erstes mBot-Programm](/de/erstes-mbot-programm/).

<figure class="article-figure">
  <img src="/capture/mblock_add_mbot.webp" alt="Screenshot mBlock 5: Gerätebibliothek mit mBot-Kachel in der Makeblock-Liste." width="960" height="540" loading="eager" decoding="async" />
  <figcaption>Gerätebibliothek mBlock 5 — Kachel **mBot** (zweite Reihe) = klassischer blauer Roboter. Screenshot — Emmanuel Sauvage, Robot Éducatif — Oktober 2026.</figcaption>
</figure>

| Kriterium | Wert |
| --- | --- |
| **Ziel** | mBot-Befehlsblöcke in mBlock 5 anzeigen |
| **Schwierigkeit** | Einsteiger (Software) |
| **Dauer** | 2–5 Minuten |
| **Material** | PC mit [mBlock 5](/de/mblock-5-installieren-windows/); Roboter kann aus bleiben |
| **Erfolg** | **mBot** unter **Geräte**; mBot-Blockkategorie sichtbar |

Um den [Lernroboter mBot](/de/mbot-mein-erster-lernroboter/) in mBlock zu programmieren, müssen Sie das **Modell in der Makeblock-Bibliothek** wählen. Das ist kein separates Download-Paket: das **aktive Gerät** lädt Motor-, Sensor- und LED-Blöcke. Unsicher zwischen Desktop, Browser und Python? Hub-Artikel: [Welche mBlock-Software für mBot?](/de/mblock-software-welche-waehlen/).

## Welches Gerät in mBlock wählen?

| Ihr Kit | In mBlock wählen | Nicht verwechseln mit |
| --- | --- | --- |
| Blauer Zwei-Motor-mBot, **mCore** | **mBot** | mBot2, Ranger |
| **mBot2**, **CyberPi** | **mBot2** oder **CyberPi** | mBot v1 |
| **Ranger**-Set | **mBot Ranger** | Klassischer mBot |

Abweichende Menüs? [mBot vs mBot2](/de/mbot-vs-mbot2/) lesen.

## Voraussetzungen

- **mBlock 5** installiert — [mBlock 5 unter Windows](/de/mblock-5-installieren-windows/).
- Oberfläche kennen: [Erste Schritte mit mBlock 5](/de/erste-schritte-mblock-5/).
- **USB** / **Bluetooth** erst später zum Testen nötig.

**Tablet:** Anleitung für **Desktop-mBlock**. Auf dem iPad die offizielle mBlock-App nutzen.

## 1. Bereich „Geräte“ öffnen

Linke Spalte → Reiter **Geräte**. Dort wählen Sie **welchen Roboter** Sie programmieren — das steuert **welche Blöcke** rechts erscheinen.

Typische Bezeichnungen (mBlock 5.x, Deutsch): **Geräte**, **Hinzufügen**, **Verbinden**, **En direct** / **Téléverser** (je nach Sprachpaket teils Englisch).

<figure class="article-figure">
  <img src="/capture/mblock_appareil.png" alt="Screenshot mBlock 5: Geräte-Panel mit Schaltfläche Hinzufügen (+)." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Panel **Geräte** — **Hinzufügen (+)** öffnet die Bibliothek. Ein anderes Gerät kann bereits angezeigt sein (z. B. CyberPi). Screenshot — Emmanuel Sauvage, Robot Éducatif — Oktober 2026.</figcaption>
</figure>

Auf **Hinzufügen** (oder **+**) klicken.

## 2. mBot in der Liste wählen

Fenster **Gerätebibliothek**: **mBot**, **mBot2**, **Ranger**, **CyberPi** …

<figure class="article-figure">
  <img src="/capture/mblock_add_mbot.webp" alt="Screenshot mBlock 5: Gerätebibliothek mit mBot-Symbol." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Kachel **mBot** finden. **Suche** oben nutzen. Screenshot — Emmanuel Sauvage, Robot Éducatif — Oktober 2026.</figcaption>
</figure>

## 3. Mit OK bestätigen

**mBot** (oder **mBot2**) anklicken → **OK**.

<figure class="article-figure">
  <img src="/capture/mblock_add_mbot_validation.webp" alt="Screenshot mBlock 5: mBot ausgewählt, OK aktiv." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>**mBot** markiert vor **OK**. Screenshot — Emmanuel Sauvage, Robot Éducatif — Oktober 2026.</figcaption>
</figure>

## 4. mBot-Blöcke prüfen

**mBot** erscheint unter **Geräte** — anklicken, damit es **aktiv** bleibt. Palette: **vorwärts**, **LED-Matrix**, **Ultraschall** / **Linie**, **Summer** …

<figure class="article-figure">
  <img src="/capture/mbot_verification_bloc.webp" alt="Screenshot mBlock 5: mBot aktiv, Motor- und LED-Blöcke sichtbar." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Mit aktivem **mBot** erscheinen Bewegungs- und LED-Blöcke. Screenshot — Emmanuel Sauvage, Robot Éducatif — Oktober 2026.</figcaption>
</figure>

**Kurz-Check:** mBot hervorgehoben · Blöcke mit **mBot** / **mCore** · weiter mit [Erstes mBot-Programm](/de/erstes-mbot-programm/).

## Fehlerhilfe

| Symptom | Ursache | Lösung |
| --- | --- | --- |
| Kein **mBot** in der Liste | Alte Version / Lite-Modus | Update von [mblock.cc](https://www.mblock.cc/en-us/download/); Lite aus; Neustart |
| Nur Scratch-Blöcke | Kein Makeblock-Gerät | **Geräte → Hinzufügen → mBot → OK** |
| Blöcke weg | Anderes Gerät aktiv | **mBot** erneut wählen |
| Andere UI | Falsches Modell | [mBot vs mBot2](/de/mbot-vs-mbot2/) |
| Roboter reagiert nicht | Verbindung | [Bluetooth-Probleme mBlock](/de/mblock-bluetooth-probleme/); **USB** zuerst |
| Keine Installation | Browser | [mBlock online](/de/mblock-online-ohne-installation/) |

**Erweiterungen:** Menü **Extension** / **+ Extension** — [Makeblock Support](https://support.makeblock.com).

## FAQ

**Reichen die Blöcke zum Fahren?**  
Nein — danach **verbinden** und **hochladen**: [Erste Schritte mBlock 5](/de/erste-schritte-mblock-5/).

**Scratch statt mBlock?**  
Scratch allein steuert kein Makeblock-Hardware — [mBlock vs Scratch](/de/mblock-vs-scratch/).

## Orientierungspreise (Oktober 2026)

[Makeblock mBot bei Amazon.de](https://www.amazon.de/s?k=Makeblock+mBot&tag=roboteducat00-21) — Modell mBot vs mBot2 auf der Produktseite prüfen.

---

**Nächster Schritt:** [Erstes mBot-Programm](/de/erstes-mbot-programm/).

*Stand 31. Oktober 2026 — Emmanuel Sauvage.*
