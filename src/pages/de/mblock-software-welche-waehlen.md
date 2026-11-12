---
layout: ../../layouts/DePost.astro
title: "mBlock 5, App oder Python: welche Software für den mBot?"
description: "PC, Tablet oder Browser: Welche Makeblock-Software passt zu mBot und mBot2, je nach Alter und Niveau? Ein klarer Vergleich."
updated: "31. Oktober 2026"
---

Einige Links auf dieser Seite sind Affiliate-Links. Wenn Sie darüber kaufen, erhalten wir möglicherweise eine Provision — ohne Mehrkosten für Sie. Prüfen Sie den aktuellen Preis auf Amazon.de vor dem Kauf.

Sie öffnen **mBlock** zum ersten Mal und wissen nicht, ob Sie es **installieren**, **im Browser** öffnen oder gleich zu **Python** wechseln sollen? Diese Seite vergleicht die drei Einstiegswege in einfachen Worten, damit Sie je nach Computer, Administratorrechten und Roboter (**mBot**, **mBot2** usw.) entscheiden können.

> **Direkte Antwort (Oktober 2026)** — Um die **IDE** (integrierte Entwicklungsumgebung: das Fenster, in dem man die Blöcke zusammensetzt) **ohne Installation** zu öffnen, gehen Sie auf [ide.mblock.cc](https://ide.mblock.cc/) und folgen Sie dem Leitfaden [mBlock online](/de/mblock-online-ohne-installation/). Für die Desktop-App: [mBlock 5 installieren](/de/mblock-5-installieren-windows/) oder [mBlock 5 herunterladen](/de/mblock-5-kostenlos-herunterladen/). Für Scratch allein (ohne Makeblock-Roboter): [mBlock vs Scratch](/de/mblock-vs-scratch/). Inhalt geprüft mit mBlock 5.x (Oberfläche im Stil von Scratch 3).

![Die Oberfläche von mBlock online: Bühne, Figuren, Blöcke und Skriptbereich.](/images/blog/guides-2026/mblock-online-wikimedia.png)

*Echter Screenshot der IDE mBlock online ([ide.mblock.cc](https://ide.mblock.cc/)) — Matteo Ruffoni, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:MblockOnline.png), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.de).*

Mit **mBlock** programmiert man **Makeblock**-Roboter mit **Blöcken** (im selben Geist wie **Scratch**) und manchmal später in **Python** (einer textbasierten Sprache). Die installierte Anwendung, die Web-Version und der Python-Modus sind **nicht gleichwertig**: Alles hängt vom angeschlossenen Roboter, von den Admin-Rechten und von Bluetooth (der Funkverbindung) ab.

**Schnellzugriff**

- **Online:** [ide.mblock.cc](https://ide.mblock.cc/) in Chrome oder Edge.
- **Am PC:** [offizieller Download](https://www.mblock.cc/en-us/download/) + [Windows-Anleitung](/de/mblock-5-installieren-windows/).
- **Erster Versuch in 2 Minuten:** die Figur Panda, die Blöcke „Wenn die grüne Flagge angeklickt wird“ und „sage Hallo!“, dann auf die grüne Flagge klicken.

## Überblick: drei „Türen“ in dasselbe Universum

| | **Anwendung (Desktop)** | **mBlock Web (Browser)** | **Python in mBlock** |
| --- | --- | --- | --- |
| **Ideal, wenn …** | Sie einen Roboter **anschließen** (USB / Bluetooth), die **Firmware** (die eingebaute Software des Roboters) aktualisieren und **maximale Zuverlässigkeit** wollen. | die Schule Installationen **verbietet**, bei einem **einmaligen** Workshop oder einer schnellen Demo. | Lernende die Blöcke bereits **beherrschen** und zur **Syntax** übergehen (Sekundarstufe). |
| **Grenzen** | erfordert einen **Download** und manchmal **Admin**-Rechte (Windows). | **Bluetooth** ist je nach Browser und Gerät manchmal **instabil**; nicht immer so komfortabel wie die App. | hängt vom **Modell** (mBot2, CyberPi usw.) und der **Version** ab; erst dann, wenn die **Logik** der Blöcke verstanden ist. |

Das ist **keine** Entscheidung fürs Leben: Viele nutzen die **App** zu Hause oder im Labor und die **Web-Version** auf gesperrten Rechnern.

Falls Sie danach einen passenden Roboter brauchen: [klassischer mBot](https://www.amazon.de/dp/B07XR98YYQ?tag=roboteducat00-21) oder [mBot2](https://www.amazon.de/dp/B0919F9CKS?tag=roboteducat00-21) (Affiliate-Links: Prüfen Sie das Modell auf der Produktseite). Altersratgeber: [Roboter ab 8 Jahren](/de/lernroboter-8-jahre/), [Roboter ab 10 Jahren](/de/lernroboter-10-jahre/).

## 1. Die mBlock-Anwendung (Windows / macOS / Chromebook / mobil, je nach Version)

**Bevorzugen Sie sie** für alles, was **echte Hardware** betrifft:

- den Roboter per **USB** oder **Bluetooth** **verbinden**;
- das Programm auf die Platine des Roboters **hochladen**;
- die **Firmware aktualisieren** (oft **unmöglich** oder ohne USB nicht empfohlen: siehe die offizielle Hilfe zu Ihrem Modell im [Makeblock Support](https://support.makeblock.com/));
- **Treiber** und **Stabilität**: weniger Überraschungen als bei einem Browser, der sich oft ändert.

**Auf dieser Website** folgen Sie den Anleitungen [mBlock 5 unter Windows installieren](/de/mblock-5-installieren-windows/) und dann [Erste Schritte in mBlock 5](/de/erste-schritte-mblock-5/), um **Geräte**, **Blöcke**, den **Skriptbereich** und die **Verbindung** zu erkennen.

## 2. Browser-Version ohne Installation (Chromebook und gesperrte PCs)

Die **Web-Version** ([mBlock online](https://ide.mblock.cc/) und Entsprechungen je nach Zeitraum) ist **sehr nützlich**, wenn:

- der Klassencomputer die Installation von Software **verbietet**;
- Sie einen **einmaligen Workshop** ohne Administratorrechte durchführen;
- Sie **Blöcke** zeigen wollen, ohne den Roboter hervorzuholen (Bühne auf dem Bildschirm).

**Worauf Sie achten sollten:** **Bluetooth** kann **launischer** sein als in der Anwendung (Browserrechte, Akku, Treiber). Um einen echten Roboter aus dem Browser zu verbinden, braucht man in der Regel **mLink**, ein kleines Makeblock-Hilfsprogramm, das den Browser mit der USB- oder Bluetooth-Verbindung verknüpft. Bei Verbindungsabbrüchen oder wenn das Gerät nicht gefunden wird, folgen Sie der [Bluetooth-/mBlock-Fehlerbehebung](/de/mblock-bluetooth-probleme/).

## 3. Python in mBlock

Der Wechsel zu **Python** kommt oft **nach** einer **Blöcke**-Phase: Er hat **pädagogischen** Nutzen (Syntax, Einrückung, Variablen) und schafft **Kontinuität** mit dem Unterricht der Sekundarstufe. Es ist **nicht** dasselbe Publikum und nicht dasselbe Tempo wie das Zusammenstecken von Blöcken am Anfang.

Je nach **Modell** (**mBot2**, **CyberPi**, **Codey Rocky** usw.) und **Version** der Software unterscheiden sich der Zugang zum Textmodus und die verfügbaren **APIs** (Programmierschnittstellen: die Funktionen, mit denen man die Hardware ansteuert). Lesen Sie die Produktdokumentation und testen Sie an **einem** Roboter, bevor Sie es in der Klasse einführen. Zum Hardware-Kontext: [mBot vs mBot2](/de/mbot-vs-mbot2/), [CyberPi](/de/makeblock-cyberpi-ueberblick/).

## 4. Erweiterungen und mBot-Blöcke (Motoren, Sensoren)

Ohne die **richtige Konfiguration** erscheinen die **Motor**- oder **Sensor**-Blöcke des **mBot** nicht: Sie müssen das **Gerät** oder die passende **Erweiterung** in mBlock hinzufügen. Schritt-für-Schritt-Anleitung: [mBot-Blöcke installieren](/de/mbot-bloecke-installieren/).

## 5. Offizielles Scratch vs. mBlock: nicht alles vermischen

- **Scratch** ([offizielle Seite](https://scratch.mit.edu/)): Projekte **am Bildschirm**, Teilen im Netz, ein **allgemeines** Ökosystem.
- **mBlock**: gedacht für das **Makeblock-Ökosystem** (Roboter, Platinen, Sensoren) mit **eigenen Blöcken** und der **Verbindung** zur Hardware.

Für einen Workshop mit einem **Makeblock-Roboter** starten Sie fast immer mit **mBlock**, nicht mit Scratch allein.

## 6. Mini-FAQ

**Muss ich nur eines wählen?**  
Nein. Nutzen Sie die **Anwendung**, sobald ein **echter Roboter** auf dem Tisch steht; behalten Sie die **Web-Version** für Rechner, auf denen Sie nichts installieren können; öffnen Sie **Python** erst, wenn die **Blöcke verstanden** sind, nicht nur abgeschrieben.

**Was bedeutet „Live“ im Gegensatz zum Hochladen?**  
Im **Live**-Modus (verbunden) **testen** Sie oft in Echtzeit. Das **Hochladen** schickt das Programm **in** den Roboter, damit er **ohne** Kabel läuft. Das ist sinnvoll, sobald das Skript geprüft ist.

**Sind mBlock 5 und mBlock 3 dasselbe?**  
In den aktuellen Anleitungen dieser Website gehen wir von **mBlock 5** aus (die heutige Oberfläche im Stil von Scratch 3). Öffnen Sie eine sehr alte Anleitung, können die Bezeichnungen leicht abweichen.

**Sind „Minecraft mblock“ und Minecraft mit mBlock dasselbe?**  
**Nein.** **Minecraft** ist ein **Spiel** zum Bauen mit 3D-Blöcken. **mBlock** ist die **Programmiersoftware** von Makeblock (Codeblöcke, **mBot**-Roboter usw.). Liefert eine Suche nicht das richtige Werkzeug, fügen Sie **Makeblock** oder **mBot** zur Suchanfrage hinzu.

## Amazon-Links (Affiliate)

- [Makeblock mBot Roboter](https://www.amazon.de/dp/B07XR98YYQ?tag=roboteducat00-21)
- [Makeblock mBot2](https://www.amazon.de/dp/B0919F9CKS?tag=roboteducat00-21)
- [Scratch-Buch für Kinder](https://www.amazon.de/s?k=Scratch+Buch+Kinder+Programmieren&tag=roboteducat00-21) · [Scratch Programmierbuch Kinder](https://www.amazon.de/s?k=Scratch+Programmierbuch+Kinder&tag=roboteducat00-21)

<p style="margin:1rem 0;"><a href="https://www.amazon.de/dp/B0919F9CKS?tag=roboteducat00-21" class="affiliate-link" data-product-id="mbot2" data-placement="content" rel="sponsored nofollow noopener" target="_blank" style="display:inline-block;background:#ff9900;color:#111;font-weight:700;padding:0.55rem 1rem;border-radius:8px;text-decoration:none;">Tagespreis auf Amazon ansehen (mBot2)</a> · <a href="https://www.amazon.de/dp/B07XR98YYQ?tag=roboteducat00-21" class="affiliate-link" data-product-id="mbot" data-placement="content" rel="sponsored nofollow noopener" target="_blank" style="display:inline-block;background:#f1f5f9;color:#0f172a;font-weight:700;padding:0.55rem 1rem;border-radius:8px;text-decoration:none;border:1px solid #cbd5e1;">Tagespreis ansehen (mBot v1)</a></p>

*Amazon-Partner — Provision bei berechtigten Käufen möglich.*

---

**Zum Merken**: Installieren Sie die **Anwendung** auf dem Hauptrechner des Roboterprojekts; behalten Sie die **Web-Version** für gesperrte Rechner oder schnelle Demos; öffnen Sie **Python** erst, wenn die **Logik der Blöcke** sitzt. Die Software ist nur ein Werkzeug: Das **Projekt** und das **Verstehen** bleiben im Mittelpunkt.

**Auch lesenswert**: [mBlock oder Scratch?](/de/mblock-vs-scratch/)

*Autor: Emmanuel Sauvage.*
