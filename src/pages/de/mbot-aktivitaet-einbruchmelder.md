---
layout: ../../layouts/DePost.astro
title: "mBot-Aktivität: Einbruchmelder"
description: "Einbruchmelder mit mBot: Ultraschall überwacht einen Schwellwert; LEDs und Summer alarmieren. Variablen und Bedingungen."
updated: "30. Oktober 2026"
---

Einige Links auf dieser Seite sind Affiliate-Links. Beim Kauf darüber kann eine Provision anfallen — ohne Mehrkosten für Sie.

Du verwandelst deinen **mBot** in einen kleinen „Wächter“:

- Er **überwacht**, was vor ihm liegt (mit dem **Ultraschallsensor**).
- Wenn sich etwas bewegt und in die Zone „eindringt“, löst er einen **Alarm** aus:
  - **rote** LEDs
  - ein „unzufriedenes“ Gesicht auf der **LED-Matrix**
  - ein **Piepton**
- In der erweiterten Version **zählt** er außerdem die Anzahl der Intrusionen.

## 1. Voraussetzungen

Bevor du startest, stelle sicher, dass du hast:

- Einen [Lernroboter mBot (Makeblock)](/de/mbot-mein-erster-lernroboter/).
- [mBlock 5 installiert](/de/mblock-5-installieren-windows/).
- Eine erste Orientierung in der [mBlock-5-Oberfläche](/de/erste-schritte-mblock-5/) (Blöcke, Skriptbereich, Geräte-Tab).
- Die [mBot-Befehlsblöcke](/de/mbot-bloecke-installieren/) (die **orangen** Blöcke).

**Tipp**: Um Verbindungsprobleme zu vermeiden, beginne möglichst über **USB** (Bluetooth funktioniert, kann aber wählerischer sein).

## 2. Ultraschallsensor

Der **Ultraschallsensor** misst eine **Entfernung**.

### Wie er funktioniert (einfache Version)

Der Sensor verhält sich wie eine Fledermaus:

- Er **sendet** einen kurzen „Ping“ (Ultraschall, unhörbar).
- Er **hört** das Echo, das von einem Hindernis zurückkommt.
- Er berechnet die Entfernung aus der **Zeit** zwischen „Ping“ und „Echo“.

```text
mBot (Sensor)                          Hindernis
  ping  ───────────────────────────────►
        ◄──────────────────────────────  Echo
```

### Etwas Physik: warum Schall Entfernung messen kann

Schall läuft in Luft mit endlicher Geschwindigkeit: praktisch nimmt man oft **etwa 340 m/s** (eher **~343 m/s bei 20 °C**; der genaue Wert hängt etwas von **Temperatur** und **Feuchte** ab).

Im kosmischen Maßstab ist 340 m/s für einen Menschen **enorm** (wie ein Verkehrsflugzeug). Im Maßstab eines **kleinen Roboters** wenige Dutzend Zentimeter vor einem Hindernis ist es umgekehrt **relativ langsam** — und das ist gut:

- **Licht** läuft fast **300 000 km pro Sekunde**: für eine Wohnzimmer-/Klassenzimmer-Distanz wäre die Verzögerung eines Lichtsensors (Laser, sehr schnelles Infrarot) nahezu null;
- eine **Schallwelle** braucht dagegen eine **messbare Zeit** für den **Hin- und Rückweg**. Diese Verzögerung (wenige **Mikrosekunden** oder Millisekunden) misst die Sensorplatine mit einer elektronischen Stoppuhr.

**Hin-und-Rück-Formel.** Wenn `t` die Zeit zwischen Ping und Echo ist, gilt für die Entfernung `d` zum Hindernis:

`d = (v_Schall × t) / 2`

Das **÷2** kommt daher, dass `t` den Weg **hin und zurück** zählt: die Welle legt **zweimal** die Distanz `d` zurück.

**Größenordnungsbeispiel.** Bei einem Hindernis in **34 cm** (0,34 m) entspricht der Hin- und Rückweg **0,68 m**; mit `v_Schall ≈ 340 m/s` beträgt die Verzögerung etwa `0,68 / 340 ≈ 0,002 s`, also **2 ms**. Für uns kurz, für einen Chip **mehr als genug** — daher die Präzision „wenige Zentimeter“ gängiger Ultraschallsensoren.

### Praxis-Tipps (für stabile Messungen)

- Der Sensor arbeitet meist gut zwischen **~3 cm und ~400 cm**.
- Zum Testen nimm ein **flaches** Hindernis (Buch, Karton), frontal.
- Bei **weichen** (Vorhang) oder **schrägen** Hindernissen kann der Wert „springen“.

In dieser Aktivität jagen wir keine Millimetergenauigkeit: wir wollen vor allem eine **Veränderung** erkennen (etwas erschien / bewegte sich).

## 3. Programm zur Intrusionserkennung

### 3.1 Basisprogramm

**Ziel**: Der Roboter speichert zu Beginn eine „Referenz“-Distanz und vergleicht in einer Schleife.  
Wenn sie sich stark ändert, ruft er „Intrusion!“.

#### Die Idee

1. Stelle den mBot so auf, dass er die zu überwachende Zone anschaut.
2. Er wartet 3 Sekunden (Zeit zum Abstellen).
3. Er misst eine erste Distanz: das ist die **Referenz**.
4. Danach misst er in einer Schleife:
   - fast gleich → bleibt ruhig
   - stark anders → Alarm

### Illustrationen (Screenshots)

![Bild: mBot wartet auf Erkennung](/capture/activite-mbot-detecteur-dintrusion/robot-mbot-attente-detection.png)

![Bild: mBot erkennt eine Intrusion](/capture/activite-mbot-detecteur-dintrusion/robot-mbot-detectant-intrusion.png)

![Bild: Basisprogramm Erkennung](/capture/activite-mbot-detecteur-dintrusion/programme-detection-basique.png)

#### Warum 3 Sekunden am Anfang warten?

Damit du Zeit hast:

- den Roboter einzuschalten,
- ihn frontal zur Zone zu stellen,
- die Hände vom Sensor fernzuhalten, während er die Referenz nimmt.

> **Erfolg:** Alarm (LED/Piep), wenn die aktuelle Distanz um mehr als ca. **3 cm** von der Start-Referenz abweicht.

#### Variablen (Deutsch + Bezeichner im Code)

| Deutsch | Bezeichner im Code | Rolle |
|---|---|---|
| Referenz / Startabstand | `reference` | „normale“ Distanz am Anfang |
| Messung / aktuelle Distanz | `mesure` | Distanz, die gerade gemessen wird |
| Intrusionen | `intrusions` / `nbr_intrusion` | Zähler (Version 3.2) |

### 3.1 bis Programm schreiben (mBlock 5) — sehr geführt

**Unter Variablen anlegen** (Namen wie in der Tabelle oben):

**Basisprogramm (einfache Erkennung)**:

1. **Wenn die grüne Flagge geklickt wird** *(oder „wenn mBot startet“ beim Hochladen)*  
2. **3 Sekunden warten**  
3. **`reference` setzen auf** die `Ultraschall-Distanz (cm)`  
4. **Für immer**:
   - `mesure` auf die `Ultraschall-Distanz (cm)` setzen
   - **wenn** `mesure` stark von `reference` abweicht **dann**:
     - **rote** LEDs
     - „wütendes“ Gesicht
     - Note (Piep) **0,25 Schlag** spielen
   - **sonst**:
     - **grüne** LEDs
     - „ruhiges“ Gesicht

#### Der Trick, der alles ändert (sehr wichtig)

Der Sensor kann etwas schwanken, auch wenn niemand vorbeigeht.  
Statt „≠“ nutze einen **Schwellwert**, z. B. **3 cm**:

```text
wenn |mesure - reference| > 3 dann Intrusion
```

So löst ein kleines Messzittern keinen Alarm aus.

> Ohne „Absolutwert“-Block: einfacher Test  
> „Intrusion wenn `mesure > reference + 3` ODER `mesure < reference - 3`“.

## 3.2 Funktion erweitern

Das Basisprogramm funktioniert, aber es fehlt etwas:  
**wie oft** ist jemand vorbeigekommen?

Also:

- Variable `intrusions` anlegen (oder nutzen),
- bei jeder Intrusion erhöhen,
- die Zahl auf der LED-Matrix anzeigen (oder scrollen).

![Bild: Erkennung mit Intrusionszähler](/capture/activite-mbot-detecteur-dintrusion/programme-detection-compteur-intrusion.png)

#### In den Blöcken ergänzen (einfache Version)

- Am Anfang: **`intrusions` auf 0 setzen**
- Im Zweig „Intrusion“:
  - **`intrusions` um 1 erhöhen**
  - `intrusions` auf der LED-Matrix anzeigen

> Tipp: Damit dieselbe Intrusion nicht 20-mal gezählt wird (jemand bleibt stehen), nach dem Alarm `1 Sekunde warten`.

### 3.3 Refactoring

Wenn das Skript wächst, wird es unleserlich.

Deshalb Aktionen in „kleine Funktionen“ packen (in mBlock: **Meine Blöcke**).

**Ziel**: Das Hauptprogramm bleibt kurz und klar.

![Bild: Erkennung mit Zähler und Unterprogrammen](/capture/activite-mbot-detecteur-dintrusion/programme-detection-compteur-intrusion-sous-programme.png)

#### Aufteilungsvorschlag (sehr einfach)

- **Eigener Block „Ruhezustand“**:
  - grüne LEDs
  - ruhiges Gesicht
  - *(didaktische Option)* Parameter `nbr_intrusion`, um den Zähler auch in Ruhe anzuzeigen — siehe unten
- **Eigener Block „Intrusionsalarm“**:
  - rote LEDs
  - wütendes Gesicht
  - Piep
  - `intrusions = intrusions + 1`
  - Zähler anzeigen

In der Schleife dann nur:

- bei Intrusion → **Intrusionsalarm** aufrufen
- sonst → **Ruhezustand** aufrufen

#### Warum `nbr_intrusion` am Block „Ruhezustand“? (Didaktik)

Für den Unterricht habe ich dem eigenen Block **„Ruhezustand“** absichtlich einen **Parameter** `nbr_intrusion` gegeben, obwohl er **nicht zwingend nötig** war.

In mBlock / Scratch ist `intrusions` meist eine **globale** Variable: einmal unter *Variablen* angelegt, kann das **gesamte Programm** (auch in eigenen Blöcken) sie **lesen** und **ändern**, ohne sie „als Argument zu übergeben“.

**Was ist der *Gültigkeitsbereich* (Scope) einer Variablen?**

In der Informatik ist der **Scope** der Ort im Programm, an dem eine Variable **existiert und sichtbar** ist.

- **Globale Variable**: überall im Projekt bekannt (Hauptskript, eigene Blöcke …). Oft der Fall bei `intrusions`.
- **Lokale Variable**: nur in einem kleinen Codeabschnitt sichtbar (z. B. **innerhalb** einer Funktion oder als Parameter nur für diesen Block). Wenn die Funktion endet, „verschwindet“ sie oft aus Sicht des Programms.

Für **Ruhezustand** *könnte* man also direkt `intrusions` im Block nutzen: der Zähler wäre dank **globalem** Scope trotzdem korrekt.

**Warum trotzdem `nbr_intrusion`?**

- Um die Idee einer **Funktion, die Information empfängt**, zu zeigen (wie in Mathe: \(f(x)\)), auch wenn die Info schon woanders liegt.
- Als Vorbereitung auf Sprachen, in denen man Globals meidet: man **übergibt explizit**, was der Block braucht — das macht Programme lesbarer.

Wenn mBlock das Programm in **C** (Arduino) **generiert**, sieht man oft **Funktionen mit Parametern**. Der Screenshot unten zeigt Scope und wie der eigene Block `nbr_intrusion` empfängt:

![C-Code-Auszug: Scope von intrusions und Parameter nbr_intrusion](/capture/activite-mbot-detecteur-dintrusion/code-c-portee-variable.png)

## 3.4 Anzeige optimieren

Letztes Detail: Manchmal zeigt der Zähler **Nachkommastellen** (z. B. `3.00`).  
Für einen Intrusionszähler wollen wir eine **ganze Zahl**: `1`, `2`, `3`…

### Option 1 (für jüngere empfohlen): bei Blöcken bleiben

In vielen mBlock-Versionen zeigt „ändere `intrusions` um 1“ und Anzeige bereits sauber ganze Zahlen.

### Option 2 (fortgeschritten): über Arduino-Code (falls nötig)

Wenn bei dir Dezimalstellen erscheinen, kannst du den Typ im Code ändern.

1. Auf das Symbol </> klicken  
2. Quellcode kopieren (STRG + A, STRG + C)  
3. Tab **Arduino C** öffnen  
4. Code einfügen  
5. Typ von `intrusions` von `float` auf `int` ändern

> Mit Erwachsenem / Lehrkraft machen, wenn du jung bist: hier wird „Textcode“ angefasst.

### 3.5 mBlock-Programme

Du kannst die mBlock-Programme der Aktivität herunterladen:

- Basisprogramm: [`programme_detection_basique.mblock`](/capture/activite-mbot-detecteur-dintrusion/programme_detection_basique.mblock)
- Zähler-Version: [`programme_detection_compteur intrusion.mblock`](/capture/activite-mbot-detecteur-dintrusion/programme_detection_compteur%20intrusion.mblock)
- Version „Unterprogramme“: [`programme_detection_compteur_intrusion_sous_programme.mblock`](/capture/activite-mbot-detecteur-dintrusion/programme_detection_compteur_intrusion_sous_programme.mblock)

Wenn du lieber von Hand nachbaust:

- Abschnitt **3.1 bis** (Basis),
- dann Ergänzungen in **3.2** und **3.3**,
- mit den Screenshots als Hilfe.

Siehe auch: [mBlock-Programme](/programmes/) (französischer Index).

## 4. Entwickeln lernen

Wenn du weiterkommen willst, ein leichter Weg:

- die Aktivität mit nur einem Parameter wiederholen (Schwellwert 3 cm → 5 cm),
- eine „orange“ LED ergänzen, wenn das Hindernis „dazwischen“ liegt,
- dann andere mBot-Aktivitäten auf der Site (Sensoren, Motoren, kleine Challenges).

Für tieferes Programmieren sind Scratch/mBlock ein sehr guter Einstieg: entscheidend sind **Variablen + Bedingungen + Schleifen**.

**Für die Klasse**: unsere [10 kostenlosen mBot-Klassenprojekte](/de/10-kostenlose-mbot-klassenprojekte/) bieten eine vollständige Progression in 10 Sitzungen mit Schülerblätter und Lösungen als PDF.

[mBot — Amazon.de](https://www.amazon.de/dp/B07XR98YYQ?tag=roboteducat00-21)
