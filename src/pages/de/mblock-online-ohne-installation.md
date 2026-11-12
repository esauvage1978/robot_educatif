---
layout: ../../layouts/DePost.astro
title: "mBlock online (ide.mblock.cc): programmieren ohne Installation"
description: "mBot online auf ide.mblock.cc ohne Installation: Verbindung, mLink, .mblock lokal speichern. Kostenloser Leitfaden 2026 für Chrome und Edge."
updated: "30. Oktober 2026"
---

Einige Links auf dieser Seite sind Affiliate-Links. Bei einem Kauf können wir eine Provision erhalten — ohne Mehrkosten für Sie. Preise bitte auf der Shop-Seite prüfen.

<div class="callout-quick" style="border:2px solid #2563eb;border-radius:12px;padding:1rem 1.25rem;margin:0.75rem 0 1.5rem;background:#eff6ff;color:#1e293b;">
<p style="margin:0 0 0.5rem;font-weight:700;font-size:1.05rem;">Direktzugriff auf mBlock online (kostenlos, ohne Pflichtkonto)</p>
<ul style="margin:0 0 0.75rem;padding-left:1.2rem;">
  <li><strong>Offizieller Web-Editor:</strong> <a href="https://ide.mblock.cc/" rel="noopener noreferrer" target="_blank" style="font-weight:700;color:#1d4ed8;">ide.mblock.cc im Browser öffnen</a> (am besten <strong>Google Chrome</strong> oder <strong>Microsoft Edge</strong>).</li>
  <li><strong>Sprache:</strong> oben links auf das <strong>Globus</strong>-Symbol klicken → gewünschte Sprache wählen.</li>
  <li><strong>Speichern ohne Anmeldung:</strong> Menü <strong>Datei → Auf dem Computer speichern</strong> (lokale Datei <code>.mblock</code>).</li>
  <li><strong>Lieber die volle Offline-App?</strong> Siehe <a href="/de/mblock-5-kostenlos-herunterladen/">mBlock 5 kostenlos herunterladen</a>.</li>
</ul>
</div>

**mBlock online** (kostenlos unter **[ide.mblock.cc](https://ide.mblock.cc/)**) ermöglicht Programmieren mit **Scratch-3-ähnlichen Blöcken** und **Python** (auf unterstützten Geräten) **direkt im Browser**, ohne die vollständige Desktop-Software (~1 GB) zu installieren. Ideal auf einem **Chromebook**, auf einem **Schul-PC ohne Administratorrechte** oder wenn ein Workshop in unter 30 Sekunden starten soll.

![Oberfläche von mBlock online (ide.mblock.cc): Panda-Bühne, Scratch-Blöcke und Skriptbereich](/images/blog/guides-2026/mblock-online-wikimedia.png)

<h2 id="schritt-fuer-schritt">1. Schritt für Schritt: ide.mblock.cc in Chrome oder Edge öffnen</h2>

So starten Sie eine Sitzung mit **mBlock online** in unter einer Minute:

1. **Chrome oder Edge (aktuelle Version) öffnen** — Firefox und Safari schränken oft den seriellen USB-Zugriff (**WebSerial** / **WebUSB**) ein. **Google Chrome**, **Microsoft Edge** und **Chromium** unterstützen die Kommunikation mit Robotik-Boards nativ.
2. **Zu `https://ide.mblock.cc/` gehen** — der Arbeitsbereich lädt mit dem Panda-Maskottchen.
3. **Oberflächensprache einstellen** — oben links in der blauen Leiste auf das **Globus**-Symbol klicken und z. B. **Deutsch** wählen. Kategorien wie *Bewegung, Aussehen, Ereignisse, Steuerung, Fühlen* wechseln sofort.
4. **Ziel wählen (Sprites oder Geräte)**:
   - Register **Sprites (Objekte)**: Bildschirmspiel oder Animation wie in Scratch, ohne angeschlossenen Roboter.
   - Register **Geräte (Devices)**: ein **mBot**, **mBot2 (CyberPi)**, **mBot Ranger**, **Codey Rocky**, **Halocode** oder eine **Arduino UNO / Mega**-Platine programmieren.

<h2 id="mbot-verbinden">2. mBot oder mBot2 per USB mit mLink / WebUSB verbinden</h2>

Standardmäßig ist ein Browser aus Sicherheitsgründen vom Hardware-Zugang getrennt. Damit **mBlock online (`ide.mblock.cc`)** Ihr Programm über das USB-Kabel des Roboters senden kann, gibt es zwei Wege:

### Schritt A — Roboter im Register Geräte hinzufügen

1. Unten links unter der Bühne das Register **Geräte** öffnen.
2. Wenn standardmäßig *CyberPi* angezeigt wird und Sie einen klassischen **mBot (v1.1)** nutzen: auf **+ Hinzufügen** klicken, **mBot** in der Gerätebibliothek wählen und mit **OK** bestätigen.
3. Für Erweiterungen (LED-Matrix, Servo, Ultraschallsensor…) unten in der Blockspalte auf **+ Erweiterung** klicken (siehe [mBot-Blöcke installieren](/de/mbot-bloecke-installieren/)).

### Schritt B — USB-Verbindung herstellen (mLink 2 oder direkte Web-Verbindung)

1. **mBot** per USB anschließen und den Schalter auf **ON** stellen.
2. Unten links auf die blaue Schaltfläche **Verbinden** klicken.
3. Wenn der Dienst **mLink** noch nicht aktiv ist, bietet mBlock online an, **mLink** zu starten oder herunterzuladen (leichter Bridge von ca. 60 MB für Windows, Mac, Linux bzw. Chromebook-Erweiterung):
   - Auf dem **Chromebook** die offizielle *mLink*-Erweiterung aus dem Chrome Web Store installieren.
   - Unter **Windows / Mac**, wenn mLink bereits vorhanden ist: **Alle verbindbaren Geräte anzeigen** aktivieren, den seriellen Port wählen (`COM3`, `COM4` oder `/dev/tty.wchusbserial…`) und **Verbinden** klicken.
4. Unten links den Modus wählen:
   - **Live-Modus**: Programm läuft in Echtzeit mit angeschlossenem Kabel (ideal zum Testen mit der grünen Flagge).
   - **Upload-Modus**: Code wird kompiliert und in den Speicher des mBot geschrieben, damit er ohne Kabel autonom läuft.

<h2 id="ohne-konto-speichern">3. .mblock-Datei ohne Konto speichern und wieder öffnen</h2>

In der Klasse oder zu Hause ist **kein Makeblock-Konto nötig** (vermeidet auch die Erfassung von Schüler-E-Mails):

- **Arbeit speichern**: **Datei** (oben links) → **Auf dem Computer speichern**. Der Browser lädt eine `.mblock`-Datei in *Downloads* oder auf einen USB-Stick.
- **Projekt fortsetzen**: auf `ide.mblock.cc` **Datei → Vom Computer öffnen** und die `.mblock`-Datei wählen.
- **Volle Kompatibilität**: eine auf `ide.mblock.cc` erstellte `.mblock`-Datei öffnet sich genauso in der Desktop-App [mBlock 5](/de/mblock-5-kostenlos-herunterladen/) — und umgekehrt.

<h2 id="vergleich">4. Vergleich: mBlock online vs. mBlock 5 Desktop</h2>

| Kriterium | **mBlock online (`ide.mblock.cc`)** | **mBlock 5 Desktop (Windows / Mac)** |
|---|---|---|
| **Installation nötig** | **Keine** (oder kleiner mLink-Bridge ~60 MB für USB) | Vollständiger Installer (~380 MB Download, ~1 GB auf der Festplatte) |
| **Chromebook & gesperrte PCs** | **Sehr gut geeignet** | Auf Chromebook nicht installierbar |
| **Offline-Betrieb** | Nein (`ide.mblock.cc` muss laden) | **100 % offline** nach Installation |
| **Scratch am Bildschirm** | Sofort, ohne Konfiguration | Sofort nach Installation |
| **USB-Upload mBot / mBot2** | Ja über Chrome/Edge + mLink | **Sehr stabil** (CH340-Treiber enthalten) |
| **Firmware- & Bluetooth-Updates** | Empfindlicher gegenüber Browser-Einstellungen | **Empfohlen**, um das Standardprogramm wiederherzustellen |

Zum Vergleich mit der Tablet-App **mBlock Blockly** und dem **Python**-Editor siehe [Welche mBlock-Software wählen](/de/mblock-software-welche-waehlen/).

<h2 id="fehlerbehebung">5. Fehlerbehebung: warum wird mein mBot online nicht erkannt?</h2>

1. **Kein COM-Port im Fenster Verbinden**:
   - Schalter des mBot auf **ON**, Daten-USB-Kabel verwenden (manche Ladekabel haben keine Datenleitungen).
   - **Alle verbindbaren Geräte anzeigen** aktivieren.
   - Fehlt der serielle Treiber unter Windows: **CH340** über mLink installieren oder [mBlock 5 unter Windows installieren](/de/mblock-5-installieren-windows/).
2. **Firefox oder Safari**:
   - `https://ide.mblock.cc/` in **Google Chrome** oder **Microsoft Edge** öffnen.
3. **Bluetooth bricht ab oder koppelt nicht**:
   - mBot nie zuerst in den Windows-Bluetooth-Einstellungen koppeln: über die Schaltfläche **Verbinden** in mBlock gehen. Details: [mBlock-Bluetooth-Probleme](/de/mblock-bluetooth-probleme/).

<h2 id="kompatible-roboter">6. Kompatible Roboter</h2>

Die Makeblock-Bildungsroboter lassen sich von `ide.mblock.cc` aus programmieren. Produktname und Tagespreis vor dem Kauf prüfen:

- **[Makeblock mBot (ca. 8–12 Jahre)](https://www.amazon.de/dp/B07XR98YYQ?tag=roboteducat00-21)** — Klassiker für Schulen · Scratch-Blöcke & Arduino · [Preis auf Amazon.de prüfen](https://www.amazon.de/dp/B07XR98YYQ?tag=roboteducat00-21)
- **[Makeblock mBot2 CyberPi (ca. 10–14 Jahre)](https://www.amazon.de/dp/B0919F9CKS?tag=roboteducat00-21)** — Farbdisplay, Wi‑Fi, Akku · Blöcke & Python
- **[Makeblock Codey Rocky (ca. 6–12 Jahre)](https://www.amazon.de/s?k=Makeblock+Codey+Rocky&tag=roboteducat00-21)** — sofort spielbereit, LED-Matrix · Scratch & Python

<h2 id="faq">7. FAQ — mBlock online</h2>

### Wie öffne ich mBlock online kostenlos?

Öffnen Sie **https://ide.mblock.cc** in Chrome oder Edge, klicken Sie oben links auf das **Globus**-Symbol und wählen Sie Ihre Sprache.

### Kann ich einen echten mBot mit mBlock online programmieren?

Ja: mBot per USB anschließen, unten links auf **Verbinden** klicken und die **mLink**-Bridge (oder die Chromebook-Erweiterung) zum Hochladen nutzen.

### Wie speichere ich ein Projekt ohne Konto?

**Datei → Auf dem Computer speichern**, um die lokale `.mblock`-Datei zu erhalten.

### Wann ist die PC/Mac-Version besser?

Immer wenn Sie offline arbeiten oder die USB-Firmware des mBot aktualisieren müssen: siehe [mBlock 5 kostenlos herunterladen](/de/mblock-5-kostenlos-herunterladen/).

## Tipps für den Unterricht mit ide.mblock.cc

Auf gesperrten Schul-PCs: **https://ide.mblock.cc/** als Lesezeichen und nur die **mLink**-Chromebook-Erweiterung bzw. die leichte Windows/Mac-Bridge installieren, wenn USB nötig ist. Schüler sollen am Sitzungsende eine .mblock-Kopie auf USB oder in die Cloud speichern — der Browser-Cache allein ist kein Backup.

Wenn mehrere Roboter im Raum sind, USB-Kabel und COM-Ports beschriften. Im Live-Modus sollte nur ein Browser-Tab den seriellen Port besitzen; Schließen oder Aktualisieren gibt ihn oft wieder frei.

Für Offline-Firmware oder häufiges Upload ohne WLAN später auf die [Desktop-Download-Anleitung](/de/mblock-5-kostenlos-herunterladen/) wechseln und dieselben .mblock-Dateien behalten.

## Live- vs. Upload-Modus — wann welchen?

| Situation | Bevorzugen |
|---|---|
| Blöcke mit grüner Flagge debuggen, Sensoren beobachten | **Live** (Kabel verbunden) |
| Roboter soll allein ohne PC fahren | **Upload** |
| Firmware aktualisieren oder Standardprogramm wiederherstellen | lieber **Desktop mBlock 5** |
| Schnelles Scratch-Spiel ohne Hardware | Register Sprites — kein Verbinden nötig |

Live eignet sich für die erste Stunde. Upload ist das Ziel, sobald das Programm stabil ist.

## Produktkarten (Tagespreis prüfen)

### Makeblock mBot (ca. 8–12 Jahre)

Schulklassiker · Scratch-Blöcke und später Arduino. Listing prüfen: Bildungs-Kit Bluetooth/USB, keine reine Ersatzplatine.

- [Amazon.de — Preis prüfen](https://www.amazon.de/dp/B07XR98YYQ?tag=roboteducat00-21)

### Makeblock mBot2 CyberPi (ca. 10–14 Jahre)

Farbdisplay, Wi‑Fi, Akku · Blöcke und Python. Gut, wenn ein Roboter mitwachsen soll.

- [Amazon.de — Preis prüfen](https://www.amazon.de/dp/B0919F9CKS?tag=roboteducat00-21)

### Makeblock Codey Rocky (ca. 6–12 Jahre)

Sofort spielbereit · ausdrucksstarke LED-Matrix · Scratch und Python.

- [Amazon.de Suche](https://www.amazon.de/s?k=Makeblock+Codey+Rocky&tag=roboteducat00-21)

Verwandte Leitfäden: [Welche mBlock-Software](/de/mblock-software-welche-waehlen/), [Erste Schritte mBlock 5](/de/erste-schritte-mblock-5/), [Bluetooth-Probleme](/de/mblock-bluetooth-probleme/).

## Datenschutz-Hinweis für Schulen

mBlock online lässt sich **ohne Makeblock-Konto** nutzen. Bevorzugen Sie **Datei → Auf dem Computer speichern**, damit Schülerarbeiten auf dem Schulspeicher oder einem USB-Stick bleiben. Wenn Konten vorgeschrieben sind, IT-Richtlinie beachten und bei jüngeren Schülern keine privaten E-Mails eintragen.

WebSerial-/WebUSB-Dialoge sind Browser-Sicherheitsabfragen: Schüler sollten sie nur für einen physisch angeschlossenen Roboter bestätigen.

## Chromebook-Ablauf (Kurz)

1. Chrome öffnen → ide.mblock.cc  
2. Bei Bedarf **mLink** aus dem Chrome Web Store installieren  
3. Geräte → mBot oder mBot2 hinzufügen → Verbinden  
4. .mblock speichern, bevor die Chromebook-Sitzung endet  

So vermeiden Sie die ~1-GB-Desktop-App auf verwalteten Geräten.

## Nächste Schritte nach der Verbindung

Wenn Live funktioniert, testen Sie einen Ein-Block-Check: beide RGB-LEDs eine Sekunde rot. Dann [Erste Schritte in mBlock 5](/de/erste-schritte-mblock-5/) oder [mBot-Blöcke installieren](/de/mbot-bloecke-installieren/), falls Erweiterungen fehlen. Bei Bluetooth zuerst [Bluetooth-Probleme](/de/mblock-bluetooth-probleme/) lesen, bevor Windows-Kopplung geändert wird.



Weitere Hilfe: [mBlock 5 unter Windows installieren](/de/mblock-5-installieren-windows/) bei fehlendem CH340-Treiber.

*Autor: Emmanuel Sauvage.*
