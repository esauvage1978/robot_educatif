---
layout: ../../layouts/DePost.astro
title: "mBlock 5 kostenlos: offizieller Link und Online-IDE"
description: "mBlock 5 kostenlos vom offiziellen Makeblock-Server (Windows, Mac) oder ide.mblock.cc online ohne Installation. CH340-mBot-Treiber, UAC und Fehlerbehebung — Leitfaden Okt. 2026."
updated: "31. Oktober 2026"
schemaUpdated: "2026-10-31"
faqSchema:
  - question: "Wo lade ich mBlock 5 kostenlos herunter?"
    answer: "Nutzen Sie ausschließlich mblock.cc/en-us/download, laden Sie die Windows-64-Bit-.exe (etwa 380 MB) oder macOS-.dmg herunter und starten Sie den Installer. Die Sprache stellen Sie über das Globus-Symbol oben links um."
  - question: "Brauche ich ein Konto für mBlock 5?"
    answer: "Nein. Offline-Nutzung, Speichern auf dem PC und USB-Upload auf mBot oder mBot2 funktionieren ohne Registrierung. Ein Makeblock-Konto dient nur der Cloud-Sicherung."
  - question: "Wie installiere ich den USB-Treiber CH340 des mBot in 3 Minuten?"
    answer: "Bestätigen Sie am Ende der mBlock-5-Installation das Fenster Setup_Driver_CH341 und klicken Sie auf Install. Der Roboter erscheint beim ersten USB-Anschluss auf einem COM-Port."
  - question: "Was tun, wenn ich nichts installieren darf?"
    answer: "Öffnen Sie ide.mblock.cc in Chrome oder Edge oder folgen Sie unserem Leitfaden mBlock online ohne Installation. Kein 380-MB-Download nötig."
  - question: "Was ist der Unterschied zwischen mblock.cc und ide.mblock.cc?"
    answer: "mblock.cc/download dient dem Download der Desktop-App mBlock 5 (Windows/Mac). ide.mblock.cc ist die Online-IDE: Programmieren im Browser ohne Desktop-Installation."
  - question: "Ist mBlock 5 wirklich kostenlos?"
    answer: "Ja. Der offizielle Makeblock-Installer und die Browser-Version sind kostenlos. Vermeiden Sie Spiegel-Seiten und Crack-Links."
---

Einige Links auf dieser Seite sind Affiliate-Links. Wenn Sie darüber kaufen, erhalten wir möglicherweise eine Provision — ohne Mehrkosten für Sie. Prüfen Sie den aktuellen Preis auf Amazon.de; wir erfinden keine lokalen Preise.

<div class="callout-no-install" style="border:2px solid #0f766e;border-radius:12px;padding:1rem 1.25rem;margin:0.75rem 0 1.5rem;background:#f0fdfa;color:#134e4a;font-size:1.03rem;">
<strong>Möchten Sie nichts installieren?</strong> Öffnen Sie die offizielle <strong>IDE</strong> (integrierte Entwicklungsumgebung: das Fenster, in dem man die Blöcke zusammensetzt) unter <a href="https://ide.mblock.cc/" rel="noopener noreferrer" target="_blank" style="font-weight:700;color:#0f766e;text-decoration:underline;">ide.mblock.cc</a> (mBlock online) und folgen Sie unserem Leitfaden <a href="/de/mblock-online-ohne-installation/" style="font-weight:700;color:#0f766e;text-decoration:underline;">mBlock online ohne Installation</a>. Diese Seite dient nur dem <strong>Download</strong> der Desktop-App für Windows/Mac.
</div>

<div class="callout-quick" style="border:2px solid #2b7de9;border-radius:12px;padding:1rem 1.2rem;margin:0 0 1.25rem;background:#f2f7ff;color:#1f2430;">
<strong>Direkte Antwort (Oktober 2026)</strong> — <strong>mBlock 5 kostenlos herunterladen</strong>: offizielle Seite <a href="https://www.mblock.cc/en-us/download/">Makeblock Download</a> öffnen, Installer für <strong>Windows 10/11 (64 Bit)</strong> oder <strong>Mac</strong> (~380&nbsp;MB) laden, <strong>Ja</strong> bei der <strong>UAC</strong>-Abfrage (<strong>Benutzerkontensteuerung</strong>) klicken, Installation abschließen, dann den <strong>CH340-Treiber</strong> installieren, um einen <a href="/de/mbot-mein-erster-lernroboter/">mBot</a> per USB anzuschließen. Ohne Admin-Rechte: <a href="/de/mblock-online-ohne-installation/">mBlock online</a>.
</div>

<p><strong>mBlock 5 kostenlos herunterladen</strong> dauert in der Regel **weniger als 3 Minuten** für Download, UAC und Treiber — das Kopieren der Dateien hängt von der Festplatte ab. Ob Familien-PC unter <strong>Windows 10 oder 11</strong>, <strong>Mac (Intel oder Apple Silicon M1/M2/M3)</strong> oder Klassenraum: unten finden Sie <strong>geprüfte offizielle Links</strong>, <strong>echte Screenshots</strong>, die Installation des <strong>USB-Treibers CH340 für mBot</strong> (Seriell-Chip für den <code>COM</code>-Port) und den Sprachwechsel <strong>ohne Pflichtkonto</strong>.</p>

<h2 id="offizieller-download">1. Geprüfte offizielle Links (Windows 10/11, Mac, Linux, Tablet)</h2>

Laden Sie mBlock niemals von Drittanbieter-Spiegeln herunter: holen Sie immer den von **Makeblock Co., Ltd.** signierten Installer, damit die Bibliotheken für mBot, mBot2 (**CyberPi**: Wi-Fi-Steuerplatine von Makeblock für den mBot2) und der USB-Seriell-Treiber automatisch enthalten sind.

| Betriebssystem | Empfohlene offizielle Version (2026) | Ungefähre Größe | USB-CH340-Treiber enthalten |
|---|---|---|---|
| **PC Windows 10 / Windows 11 (64 Bit)** | `mBlock 5 PC Version (.exe)` auf [mblock.cc/download](https://www.mblock.cc/en-us/download/) | ~380 MB (≈ 1,05 GB installiert) | Ja (automatisch) |
| **Mac (macOS Intel & Apple M1/M2/M3)** | `mBlock 5 Mac Version (.dmg/.pkg)` auf [mblock.cc/download](https://www.mblock.cc/en-us/download/) | ~390 MB | Ja |
| **Chromebook / gesperrter Schul-PC** | Leitfaden: <a href="/de/mblock-online-ohne-installation/">mit mBlock online ohne Installation programmieren</a> | 0 MB (Browser) | Über **WebUSB** (USB aus dem Browser) und **mLink** (Makeblock-Seriell-Brücke) |
| **iPad (iOS) / Android-Tablet** | App *mBlock* im App Store / Google Play | ~180 MB | Bluetooth-Verbindung |

![Screenshot: offizielle Makeblock-Download-Seite für mBlock 5 unter Windows](/images/blog/installer-mblock/ecran-01-page-makeblock.png)

*Screenshot: Makeblock Download (mblock.cc), Windows-Bereich. Quelle: Emmanuel Sauvage, Robot Éducatif — Oktober 2026.*

<div class="article-cta-row" style="display:flex;flex-wrap:wrap;gap:0.75rem;margin:1.25rem 0;">
<a class="article-cta article-cta--primary" href="https://www.mblock.cc/en-us/download/" rel="noopener noreferrer" target="_blank" style="background:#1d4ed8;color:#fff;padding:0.7rem 1.2rem;border-radius:8px;font-weight:700;text-decoration:none;">Offizielle Makeblock-Download-Seite öffnen</a>
<a class="article-cta article-cta--secondary" href="/de/mblock-online-ohne-installation/" style="background:#0f766e;color:#fff;padding:0.7rem 1.2rem;border-radius:8px;font-weight:700;text-decoration:none;">Mit mBlock online programmieren (ohne Installation)</a>
</div>

<h2 id="windows">2. mBlock 5 unter Windows 10 und 11 installieren</h2>

**Kurz-Voraussetzungen:** Internet (~380 MB), Windows-<strong>Administrator</strong>-Konto (oder Erwachsener für **Ja** bei UAC), etwa **1,5–2 GB** freier Speicher.

1. **Laden Sie die offizielle EXE herunter** (`V5.6.x.exe`, etwa 380 MB) unter **mBlock PC version → Download for Windows**.
2. **Starten Sie die `.exe`-Datei** aus dem Ordner *Downloads* (`Strg + J`).

![Screenshot: Windows-Explorer — mBlock-Installer in Downloads](/capture/installer-mblock-5-sous-windows-10/explorateur_telechargement.png)

*Doppelklick auf die heruntergeladene `.exe`. Quelle: Emmanuel Sauvage, Robot Éducatif — Oktober 2026.*

3. **Bestätigen Sie die UAC-Abfrage** — **Benutzerkontensteuerung** — mit **Ja**. Ohne Admin-Rechte: <a href="/de/mblock-online-ohne-installation/">mBlock online</a>.
4. **SmartScreen**: bei *„Windows hat Ihren PC geschützt“* → **Weitere Informationen** → **Trotzdem ausführen**, wenn Herausgeber **Makeblock** und Quelle [mblock.cc](https://www.mblock.cc/en-us/download/).
5. **Fortschritt**: aktuelle Installer kopieren nach `Program Files` ohne Zwischenfragen.

![Screenshot: Installationsfortschritt mBlock 5 unter Windows](/images/blog/installer-mblock/ecran-09-progression.png)

*Fortschrittsanzeige (Windows 10/11). Quelle: Emmanuel Sauvage, Robot Éducatif — Oktober 2026.*

6. **Abschluss**: **Fertigstellen** / **Finish** klicken.

![Screenshot: Ende des mBlock-5-Installers](/capture/installer-mblock-5-sous-windows-10/installation_fin.png)

*Ende des Assistenten. Quelle: Emmanuel Sauvage, Robot Éducatif — Oktober 2026.*

Details: [mBlock 5 unter Windows 10/11 Schritt für Schritt](/de/mblock-5-installieren-windows/) · [Bluetooth/USB-Hilfe](/de/mblock-bluetooth-probleme/).

<h2 id="ch340-treiber">3. USB-Treiber mBot (CH340): der entscheidende Schritt</h2>

Am Ende der mBlock-5-Installation öffnet sich **Driver Setup (CH340 / CH341SER)**:

- **Install** klicken, *Driver install success* abwarten.
- Der **CH340** ist ein USB-Seriell-Chip auf der **mCore-Platine des mBot**; nötig für **Arduino UNO / Nano** auf `COM3`, `COM4` usw.
- **Keine Pflichtregistrierung** für Programmieren und `.mblock`-Speichern.

![Screenshot: mBlock-5-Installation unter Windows abgeschlossen](/images/blog/installer-mblock/ecran-10-termine.png)

*Ende der Desktop-Installation. Quelle: Emmanuel Sauvage, Robot Éducatif — Oktober 2026.*

<h2 id="macos">4. Installation auf Mac (macOS), Linux und Chromebook</h2>

- **Mac**: `.dmg`/`.pkg` → **mBlock** nach **Programme** ziehen; bei Blockade: **Systemeinstellungen → Datenschutz & Sicherheit → Trotzdem öffnen**.
- **Linux**: Browser-Version mit **mLink** ([mBlock online](/de/mblock-online-ohne-installation/)).
- **Chromebook**: [mBlock online](/de/mblock-online-ohne-installation/) + **mLink** in Chrome.

<h2 id="ohne-installation">5. Browser-Alternative (gesperrter PC oder Chromebook)</h2>

<div class="callout-web-link" style="border-left:4px solid #2563eb;background:#eff6ff;padding:0.9rem 1.15rem;border-radius:8px;margin:1rem 0;">
<strong>Direkter Browser-Zugang:</strong> <a href="/de/mblock-online-ohne-installation/">Mit mBlock online ohne Installation programmieren</a> (Sprache, USB/Bluetooth mit mLink, lokales Speichern).
</div>

Vergleich: [Welche mBlock-Software für mBot?](/de/mblock-software-welche-waehlen/).

<h2 id="nach-download">6. Sprache einstellen und mBot anschließen</h2>

1. **Globus** oben links → **Deutsch** oder **English**.
2. **Geräte** → **+ Hinzufügen** → **mBot** (oder **CyberPi / mBot2**) → **OK**.
3. USB anschließen → **Verbinden** → `COM`-Port bestätigen.
4. [Erste Schritte mit mBlock 5](/de/erste-schritte-mblock-5/) · [mBot-Blöcke installieren](/de/mbot-bloecke-installieren/).

<h2 id="welcher-roboter">7. Welchen Roboter mit mBlock 5 nutzen?</h2>

Der Produktkasten am Seitenende fasst mBot-/mBot2-Links zusammen. **Die Karten unten** listen beliebte Modelle mit **Richtpreisen** auf Amazon.de (aktuellen Preis prüfen).

<div class="merchant-cards-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem;margin:1.25rem 0;">
  <div style="border:1px solid #dce3ee;border-radius:12px;padding:1rem;background:#fff;">
    <h3 style="margin:0 0 0.35rem;font-size:1.1rem;"><a href="https://www.amazon.de/dp/B07XR98YYQ?tag=roboteducat00-21" rel="sponsored nofollow noopener" target="_blank">Makeblock mBot (v1.1 Bluetooth)</a></h3>
    <p style="margin:0 0 0.5rem;font-size:0.92rem;color:#475569;">Ideal ab 8 Jahren · Aufbau ca. 15 Min.</p>
    <p style="margin:0 0 0.75rem;font-weight:700;"><a href="https://www.amazon.de/dp/B07XR98YYQ?tag=roboteducat00-21" rel="sponsored nofollow noopener" target="_blank" style="color:#0f172a;text-decoration:underline;">Richtpreis: ~85–109 € (Preis des Tages prüfen)</a></p>
    <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
      <a href="https://www.amazon.de/dp/B07XR98YYQ?tag=roboteducat00-21" rel="sponsored nofollow noopener" target="_blank" class="affiliate-link" data-product-id="mbot" data-placement="content" style="background:#ff9900;color:#111;font-weight:700;padding:0.45rem 0.8rem;border-radius:8px;text-decoration:none;font-size:0.88rem;">Bei Amazon.de ansehen</a>
    </div>
  </div>
  <div style="border:1px solid #dce3ee;border-radius:12px;padding:1rem;background:#fff;">
    <h3 style="margin:0 0 0.35rem;font-size:1.1rem;"><a href="https://www.amazon.de/dp/B0919F9CKS?tag=roboteducat00-21" rel="sponsored nofollow noopener" target="_blank">Makeblock mBot2 (mit CyberPi Wi-Fi)</a></h3>
    <p style="margin:0 0 0.5rem;font-size:0.92rem;color:#475569;">Ideal 10–14 Jahre · Akku ca. 5 Std.</p>
    <p style="margin:0 0 0.75rem;font-weight:700;"><a href="https://www.amazon.de/dp/B0919F9CKS?tag=roboteducat00-21" rel="sponsored nofollow noopener" target="_blank" style="color:#0f172a;text-decoration:underline;">Richtpreis: ~159–179 € (Preis des Tages prüfen)</a></p>
    <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
      <a href="https://www.amazon.de/dp/B0919F9CKS?tag=roboteducat00-21" rel="sponsored nofollow noopener" target="_blank" class="affiliate-link" data-product-id="mbot2" data-placement="content" style="background:#ff9900;color:#111;font-weight:700;padding:0.45rem 0.8rem;border-radius:8px;text-decoration:none;font-size:0.88rem;">Bei Amazon.de ansehen</a>
    </div>
  </div>
</div>

<h2 id="fehlerbehebung">8. Fehlerbehebung Download und Installation</h2>

| Symptom | Wahrscheinliche Ursache | Lösung |
|---|---|---|
| Download blockiert | Antivirus, Schulnetz | Nur [mblock.cc](https://www.mblock.cc/en-us/download/); Ausnahme nach Prüfung; [mBlock online](/de/mblock-online-ohne-installation/) |
| **Nein** bei UAC | Keine Admin-Rechte | Mit Admin-Konto wiederholen oder [ide.mblock.cc](https://ide.mblock.cc/) |
| SmartScreen blockiert | Unbekannte Datei | **Weitere Informationen → Trotzdem ausführen** bei **Makeblock** |
| Kein **COM**-Port | CH340 übersprungen | **Setup_Driver_CH341** erneut · [Bluetooth-Hilfe](/de/mblock-bluetooth-probleme/) |
| Englische Oberfläche | Standardsprache | **Globus → Deutsch** · [Erste Schritte](/de/erste-schritte-mblock-5/) |
| Fehlende mBot-Blöcke | Erweiterungen fehlen | [mBot-Blöcke installieren](/de/mbot-bloecke-installieren/) |

<h2 id="faq">9. FAQ — mBlock 5 herunterladen</h2>

### Wo lade ich mBlock 5 kostenlos herunter?

**mblock.cc/en-us/download**, **mBlock PC version**, Installer starten. Sprache über Globus-Symbol.

### Brauche ich ein Konto?

**Nein.** Offline, lokales Speichern und USB-Upload ohne Registrierung.

### CH340-Treiber in 3 Minuten?

**Setup_Driver_CH341** bestätigen, **Install** klicken.

### Nichts installieren dürfen?

**[ide.mblock.cc](https://ide.mblock.cc/)** oder <a href="/de/mblock-online-ohne-installation/">mBlock online ohne Installation</a>.

### mblock.cc vs ide.mblock.cc?

**mblock.cc/download** = Desktop-Download. **ide.mblock.cc** = **Online-IDE** im Browser.

### Wirklich kostenlos?

Ja — nur [Makeblock Download](https://www.mblock.cc/en-us/download/) oder [ide.mblock.cc](https://ide.mblock.cc/).

<p style="margin-top:1.5rem;font-size:0.92rem;color:#64748b;">Leitfaden aktualisiert am 31. Oktober 2026 — <strong>Emmanuel Sauvage</strong>, Robot Éducatif.</p>
