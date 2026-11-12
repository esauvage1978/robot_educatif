---
layout: ../../layouts/DePost.astro
title: "mBot Ultraschall 4/4: langsam bremsen und stoppen"
description: "mBlock-Tutorial 4/4: mBot fährt, bremst ab und stoppt vor einem flachen Hindernis — cm-Schwellen, Motorgeschwindigkeit, USB-Upload und Fehlerbehebung."
updated: "31. Oktober 2026"
faqSchema:
  - question: "Arduino-Code oder mBlock-Blöcke?"
    answer: "Nur mBlock / mBot-Blöcke. Ereignisse, Ultraschallsensor, Bedingungen und Motoren zusammensetzen. Kein Arduino-Sketch nötig."
  - question: "Was misst der Ultraschallsensor des mBot?"
    answer: "Den Abstand in Zentimetern zu einem Hindernis vor dem Roboter. Ihr Programm wandelt den Wert mit Schwellen in Motorgeschwindigkeit um."
  - question: "Funktioniert der mBot2 mit diesem Tutorial?"
    answer: "Ja, wenn mBot-Blöcke aktiv sind und das Ultraschallmodul vorne angeschlossen ist. Die cm-Schwellen sind Startwerte — auf Ihrem Boden nachjustieren."
---

Einige Links auf dieser Seite sind Affiliate-Links. Beim Kauf darüber kann eine Provision anfallen — ohne Mehrkosten für Sie.

> **Kurzantwort (Oktober 2026)** — In **mBlock 5** (Makeblock-Blocksoftware, nah an **Scratch**) lesen Sie die **Ultraschall-Distanz** in **cm** (Zentimeter), berechnen eine **Motorgeschwindigkeit** zwischen zwei Schwellen (z. B. Stopp bei 15 cm, Volllauf ab 50 cm) und setzen **linken und rechten Motor** gleich. Programm per **USB** (Datenkabel PC ↔ Platine) **hochladen**, **flaches Buch** als Hindernis: der Roboter **bremst ab** und **stoppt** ohne Anstoß. Kein **Arduino**-Textcode nötig.

Sie schließen die **Ultraschall-Sensor**-Reihe am [Makeblock mBot](/de/mbot-mein-erster-lernroboter/) ab — das vordere Modul misst Abstände in Zentimetern. Ziel: **fahren**, **abbremsen**, **stoppen**. Alles in **mBlock** mit **mBot-Blöcken**.

<aside class="article-callout" role="note">
<p><strong>Lernziel</strong></p>
<p>Ein vollständiges Roboterverhalten in <strong>mBlock-Blöcken</strong>: Messung (Abstand) steuert Motorgeschwindigkeit, mit <strong>Schwellen</strong> und sanfter Progression (abbremsen → Stopp).</p>
</aside>

<aside class="article-callout" role="note">
<p><strong>Voraussetzungen</strong></p>
<ul>
<li>Sensor sicher auslesen: <a href="/de/mbot-aktivitaet-entfernung-messen/">Entfernung messen</a> und <a href="/de/mbot-aktivitaet-einbruchmelder/">Einbruchmelder</a> (vollständige deutsche Schritte).</li>
<li>Optionale Vertiefung (französische Episoden, gleiche Blocklogik): <a href="/serie-capteur-ultrason-mbot-1-mesurer-distance/">Episode 1 — Messen</a>, <a href="/serie-capteur-ultrason-mbot-2-radar-recul-paliers/">Episode 2 — Stufen</a>, <a href="/serie-capteur-ultrason-mbot-3-radar-recul-cadence-distance/">Episode 3 — Piep-Radar</a>.</li>
<li><a href="/de/mblock-5-installieren-windows/">mBlock 5</a>, <a href="/de/mbot-bloecke-installieren/">mBot-Blöcke</a>, geladene Batterien, flaches Hindernis.</li>
<li><a href="/de/erstes-mbot-programm/">Programm hochladen</a> (Upload-Modus) beherrschen.</li>
</ul>
<p>Schwerpunkt: <strong>klassischer mBot</strong> (mCore). Der <strong>mBot2</strong> eignet sich ebenfalls mit erkanntem Ultraschallsensor.</p>
</aside>

| Kriterium | Angabe |
|---|---|
| **Niveau** | Mittel (Schleife, Bedingungen, einfache Formel) |
| **Dauer** | ca. 45–75 Minuten |
| **Material** | mBot mit Ultraschall vorne, PC, USB, flaches Hindernis |
| **Software** | mBlock 5, Gerät → mBot, Upload |
| **Erfolg** | Schnell ab ~50 cm, langsamer zwischen 50 und 15 cm, Stopp bei ~15 cm |

## Aufgabenstellung

Programmieren Sie mit mBot-Blöcken:

1. **Geradeaus fahren**
2. **Töne / Pieps** während der Fahrt
3. **Abbremsen** bei Hindernis voraus
4. **Stoppen** wenn zu nah

Sanfte Progression — Geschwindigkeit aus dem Abstand berechnen.

---

## 1) Referenzabstände

- `DIST_STOP = 15` cm
- `DIST_LANGSAM = 50` cm

Zwischen 15 und 50 cm sinkt die Geschwindigkeit stufenlos oder über Stufen.

### Geschwindigkeitszonen

| Abstand vor dem Sensor | Verhalten |
|------------------------|-----------|
| **≥ 50 cm** | Normaltempo (z. B. 80 %) |
| **15–50 cm** | Progressives Abbremsen |
| **≤ 15 cm** | Stopp |

<figure class="article-figure">
  <img src="/capture/activite-mbot-detecteur-dintrusion/robot-mbot-detectant-intrusion.png" alt="mBot Makeblock vor einem flachen Hindernis; der Ultraschallsensor misst den Abstand in Zentimetern." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Test mit flachem Hindernis: Sensor gerade auf die Fläche richten. Foto: Emmanuel Sauvage, Robot Éducatif — Oktober 2026.</figcaption>
</figure>

---

## 2) Logik aufbauen

Variablen: `distance_cm`, `speed` (0–100).

### 2.1 Abstand laufend lesen

Wie bei <a href="/de/mbot-aktivitaet-entfernung-messen/">Entfernung messen</a>: Sensor in einer **für immer**-Schleife, kurz warten.

<figure class="article-figure">
  <img src="/capture/capteur/mblock-capteur-ultrason-variable-lutin.png" alt="mBlock-Screenshot: Schleife liest Ultraschall-Distanz des mBot in eine Variable." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>mBlock: Distanz in einer Variable speichern. Screenshot: Emmanuel Sauvage, Robot Éducatif — Oktober 2026. Blocknamen hängen von der mBlock-Sprache ab.</figcaption>
</figure>

### 2.2 Geschwindigkeit beim Annähern senken

- `SPEED_MAX = 80`, `SPEED_MIN = 30`
- `>= 50` → 80 ; `<= 15` → 0 ; dazwischen Formel oder Stufen

Lineare Formel zwischen 15 und 50 cm:

`speed = SPEED_MIN + (distance_cm - 15) × (SPEED_MAX - SPEED_MIN) / 35`

Alternativ **Stufen** wie in [Episode 2 (Französisch)](/serie-capteur-ultrason-mbot-2-radar-recul-paliers/).

---

## 3) Geradeausfahrt

Gleiche Geschwindigkeit links/rechts (oder Block „vorwärts“).

Pseudologik:

```text
beim Start
  für immer
    setze distance_cm auf (Ultraschall-Distanz)

    wenn distance_cm <= 15
      setze speed auf 0
      Motoren stoppen
      tiefen Ton / langen Piep
      warte 0,1 s
    sonst
      wenn distance_cm >= 50 → speed 80
      sonst → Formel für Zwischengeschwindigkeit

      vorwärts (links = speed, rechts = speed)
      kurzer Piep
      warte 0,5 s
```

### 3.1 Töne

- kurzer Piep alle 0,5 s bei Normalfahrt ;
- schnellere Pieps beim Abbremsen (optional, wie [Episode 3 (Französisch)](/serie-capteur-ultrason-mbot-3-radar-recul-cadence-distance/)) ;
- anderer Ton beim Stopp.

---

## 4) Tests

- Zuerst **USB**, dann **Upload**.
- Flaches Buch, Sensor frontal.
- Bei **Zittern**: `DIST_STOP` auf 18 cm, `warte 0,05 s` nach Sensor, `SPEED_MIN` 30–40.

**Erfolg:** bei ~40 cm schnell, bei ~25 cm hörbar langsamer, bei ~15 cm Stopp ohne Stoß.

---

## 5) Blockliste

Ereignis mBot startet · für immer · Variablen · Ultraschall cm · wenn/s sonst · Operatoren · Motoren · Ton · warten.

Hilfe: [Erste Schritte mBlock 5](/de/erste-schritte-mblock-5/) · [Bluetooth-Probleme](/de/mblock-bluetooth-probleme/).

---

## Fehlerbehebung

| Symptom | Wahrscheinliche Ursache | Maßnahme |
|---------|-------------------------|----------|
| Distanz **0** oder **400+** | Hindernis zu nah/weit, schräge/weiche Fläche | Flaches Ziel 20–80 cm, Sensor senkrecht |
| Kein Abbremsen | speed nicht an beide Motoren | Links **und** rechts prüfen |
| **Ruckeln** | Stopp-Schwelle zu tief | `DIST_STOP` → 18 cm, kurze Wartezeit nach Sensor |
| Kein Ton | Buzzer-Block fehlt | Einzelnen Ton vor der Schleife testen |
| mBot nicht sichtbar | USB/Ladekabel oder Live statt Upload | [Erstes Programm](/de/erstes-mbot-programm/) |

Vor dem Kauf eines Ersatzsensors den vorderen **RJ25**-Anschluss prüfen (farbiger Makeblock-Stecker) — siehe [mBot-Zubehör-Einstieg](/de/mbot-zubehoer-einstieg/).

---

## Weiterführende Ideen

- LED-Farbe nach Abstand (grün / orange / rot).
- „Einparkhilfe“: langsam rückwärts, dann Stopp.
- [mBlock vs Scratch](/de/mblock-vs-scratch/) für Softwarewahl im Unterricht.

---

## FAQ

### Arduino oder mBlock?

**Nur mBlock-Blöcke** — kein Arduino-Sketch nötig.

### Was misst der Sensor?

**Abstand in cm** vor dem Roboter → **Motorgeschwindigkeit** mit Ihren Schwellen.

### mBot2?

Ja, mit Ultraschallmodul und mBot-Blöcken. Schwellen auf Ihrem Boden feinjustieren.

---

## Material (Hinweise)

<a href="/go/az-de-cba2aade06/" rel="sponsored nofollow noopener">Makeblock mBot auf Amazon.de</a> — Preis am Tag der Bestellung prüfen. Amazon-Partner — Provision möglich, ohne Mehrkosten für Sie.

---

## Reihe

[← Episode 3 — Piep-Radar (Französisch)](/serie-capteur-ultrason-mbot-3-radar-recul-cadence-distance/) · [Entfernung messen](/de/mbot-aktivitaet-entfernung-messen/) · [Erstes Programm](/de/erstes-mbot-programm/) · [Bluetooth-Hilfe](/de/mblock-bluetooth-probleme/)

*Emmanuel Sauvage — aktualisiert am 31. Oktober 2026.*
