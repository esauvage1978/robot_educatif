---
layout: ../../layouts/DePost.astro
title: "Erste Schritte mit mBlock 5: die Umgebung verstehen"
description: "mBlock 5 für Einsteiger: Bühne, Figuren, Blockpaletten und Roboterverbindung. Ein Schritt-für-Schritt-Leitfaden für Kinder und Eltern beim ersten Programm."
updated: "31. Oktober 2026"
---

Einige Links auf dieser Seite sind Affiliate-Links. Wenn Sie darüber kaufen, erhalten wir möglicherweise eine Provision — ohne Mehrkosten für Sie. Prüfen Sie den aktuellen Preis auf Amazon.de vor dem Kauf.

> **Direkte Antwort (Oktober 2026)** — **mBlock 5** ist eine Umgebung, die **Scratch** ähnelt (Programmieren mit farbigen Blöcken), plus Blöcke für Makeblock-Roboter. Nach der [Installation](/de/mblock-5-installieren-windows/) fügen Sie Ihr Gerät hinzu (zum Beispiel einen **mBot**), verbinden es per **USB** oder **Bluetooth** (Funkverbindung) und wählen dann den **Live-Modus** (sofortiges Testen, solange das Kabel oder die Bluetooth-Verbindung aktiv ist) oder **Hochladen** (das Programm wird im Roboter gespeichert). Häufige Stolpersteine: der falsche Modus oder der falsche **COM-Port** (der Name, den Windows dem USB-Seriellkabel gibt); siehe [Bluetooth-Fehlerbehebung](/de/mblock-bluetooth-probleme/).

Sie haben gerade **mBlock 5** geöffnet und das Fenster wirkt voller rätselhafter Bereiche? Dieser Leitfaden zeigt Ihnen anhand **echter Screenshots** der Oberfläche, wo **Bühne**, **Figuren**, **Blockpaletten** und die **Verbindung** zum Roboter liegen — bevor Sie irgendetwas kaufen und bevor Sie ein langes Programm schreiben.

**mBlock 5** ist die Blockprogrammier-Anwendung von Makeblock. Sie ähnelt Scratch, ist aber dafür gedacht, Roboter (**mBot**, **mBot2**, Codey Rocky, **CyberPi** usw.) anzuschließen und zusätzlich Figuren auf dem Bildschirm zu animieren. Sobald [mBlock installiert ist](/de/mblock-5-installieren-windows/), orientieren Sie sich hier und gehen dann weiter zum [ersten mBot-Programm](/de/erstes-mbot-programm/).

## 1. Ein Bildschirm „im Scratch-Stil“ und ein Roboter: was mBlock ermöglicht

mBlock ist im Fenster **nicht** in zwei Streifen geteilt: Es ist **eine** Software mit **Bereichen** (Bühne, Skripte, Blockpaletten), die wie bei Scratch aussehen.

**Auf der Bildschirmseite** nutzen Sie die **Bühne**, die **Figuren** (die Charaktere und Objekte, die Sie animieren) und die Hintergründe wie in Scratch: Figuren, Kulissen und kleine Spiele animieren. Alles bleibt **im** mBlock-Fenster.

**Auf der Roboterseite** ist es keine „andere Hälfte“ der Oberfläche: Sobald ein **Makeblock-Gerät** hinzugefügt (mBot usw.) und per USB oder Bluetooth **verbunden** ist, erscheinen **zusätzliche Blöcke** für die echte Hardware: Motoren, LEDs, Sensoren, Summer usw. Solange Sie kein Gerät hinzugefügt haben, sehen Sie nur den Teil **Figuren / Bühne**. Danach programmieren Sie mit den **roboterspezifischen** Blöcken, allein oder **zusätzlich** zu Figuren, wenn das Projekt beides mischt (zum Beispiel ein Punktestand auf dem Bildschirm, während der Roboter fährt).

In der Praxis: **Ohne Roboter** bleiben Sie wie bei Scratch bei der Animation auf dem Bildschirm. **Mit Roboter** konzentrieren Sie sich oft auf die **Geräte**-Blöcke, die Bühne kann warten. **Beides** lässt sich auch in einem Projekt kombinieren.

## 2. Gesamtansicht des Fensters

![Gesamtansicht des mBlock-5-Fensters: Titelleiste, Bühne, Paletten, Skriptbereich](/images/blog/premier-pas-mblock/mblock-vue-globale.png)

Wenn Sie die Oberfläche von links nach rechts und von oben nach unten durchgehen, finden Sie in der Regel:

1. **Menüleiste**: Datei, Bearbeiten, Einstellungen, Sprache, Hilfe, manchmal ein Makeblock-Konto.
2. **Bühne**: Vorschau des visuellen Projekts (Figuren, Hintergrund).
3. **Steuerelemente unter der Bühne**: die **grüne Flagge** (Start), **Stopp**, manchmal **Vollbild** und **Blockgröße**.
4. **Bereich Figuren / Geräte**: Reiter, um zu wählen, **wer** programmiert wird (eine Figur, der Roboter …).
5. **Blockkategorien**: farbige Spalten (Bewegung, Aussehen usw., plus Kategorien für **mBot** oder ein anderes Gerät, sobald es hinzugefügt ist).
6. **Skriptbereich**: der große zentrale Raum, in dem Sie Blöcke zum Programm **zusammenstecken**.

Die genauen Bezeichnungen können je nach **Sprache** und **Version** von mBlock abweichen; die **Logik** der Bereiche bleibt dieselbe.

## 3. Das Hauptmenü

![Menüleiste: Neu, Öffnen, Speichern, Sprache, Tutorial](/images/blog/premier-pas-mblock/mblock-menu-principal.png)

Was Sie von Anfang an wissen sollten:

- **Neu / Öffnen / Speichern**: Ihre Projekte sind oft **.mblock**-Dateien (speichern Sie häufig).
- **Sprache**: Stellen Sie die Oberfläche bei Bedarf auf **Deutsch** um, oft in den Einstellungen oder im Menü.
- **Tutorial oder Online-Hilfe**: eine nützliche Abkürzung in der ersten Woche.
- **Anmeldung / Konto**: je nach Nutzung optional; um einen Roboter zu steuern, zählt die **Verbindung zum Gerät** (siehe unten), nicht unbedingt ein Cloud-Konto.

## 4. Die Bühne und die Wiedergabe-Steuerung

![Bühne mit Figur, grüner Flagge, Stopp und Einstellung der Blockgröße](/images/blog/premier-pas-mblock/mblock-scene-controles.png)

- **Bühne**: das „Theater“ der Figuren. Koordinaten, Größe, Reihenfolge der Ebenen: dieselbe Idee wie auf [scratch.mit.edu](https://scratch.mit.edu/).
- **Grüne Flagge**: startet die Skripte, die mit dem Block „Wenn die grüne Flagge angeklickt wird“ beginnen.
- **Stopp-Schaltfläche**: stoppt alles — unverzichtbar, wenn eine Schleife nie endet.
- **Blockgröße**: Blöcke vergrößern oder verkleinern, für Jüngere oder für Vorführungen mit dem Beamer.

## 5. Figuren, Geräte und die drei Reiter

![Reiter Gerät, Objekt (Figuren) und Hintergrund](/images/blog/premier-pas-mblock/mblock-onglets-lutins-appareil.png)

Unter oder neben der Bühne hat der Bereich, der verwaltet, **wer** ausgewählt ist, oft drei Reiter:

| Reiter | Verwendung |
|--------|--------|
| **Gerät** | Einen Makeblock-Roboter (mBot usw.) hinzufügen, **verbinden** (USB / Bluetooth) und dann seine eigenen **Blöcke** nutzen. |
| **Objekt** (Figuren) | Die aktive Figur wählen, eine neue erstellen oder importieren; ihre Position auf der Bühne. |
| **Hintergrund** | Den Hintergrund der Bühne wählen oder importieren. |

Beim [mBot](/de/mbot-mein-erster-lernroboter/) fügen Sie zuerst das **Gerät hinzu** und [installieren dann die mBot-Blöcke](/de/mbot-bloecke-installieren/), falls die Palette nicht erscheint. Die **USB**-Verbindung ist für die Fehlersuche die einfachste; **Bluetooth** ist praktisch, weil kabellos, aber störanfälliger: siehe [Bluetooth-Fehlerbehebung](/de/mblock-bluetooth-probleme/).

## 6. Blockkategorien und Farbe

![Spalte der Kategorien und Blockpalette für die ausgewählte Figur oder das Gerät](/images/blog/premier-pas-mblock/mblock-categories-blocs.png)

- Die **Kategorien** gruppieren die Blöcke nach Thema: Bewegung, Aussehen, Klang, Steuerung, Fühlen usw.
- Die **Roboter**-Blöcke erscheinen nur, wenn das passende **Gerät** **hinzugefügt** und **ausgewählt** ist.
- Die Kategorie **„Meine Blöcke“** (oder Entsprechendes) dient dazu, **eigene** Blöcke aus wiederverwendbaren Skripten zu erstellen — später nützlich, um große Projekte zu gliedern.

Die **Farben** helfen, eine Befehlsfamilie schnell wiederzufinden. Sie sind nicht nur Dekoration, sondern ein **visueller Anhaltspunkt** im Unterricht.

## 7. Der Skriptbereich

![Skriptbereich mit zusammengesteckten Blöcken](/images/blog/premier-pas-mblock/mblock-zone-script.png)

Hier **bauen** Sie das Programm:

- Die Blöcke **rasten ineinander** wie Puzzleteile; nur manche Kombinationen sind gültig (passende Formen).
- Die Ausführung folgt bei einem Blockstapel in der Regel dem **Ablauf von oben nach unten** (außer Sie nutzen fortgeschrittenere Steuerstrukturen).
- Sie können **mehrere Skripte** nebeneinander haben (mehrere Stapel, die bei verschiedenen Ereignissen starten).

**Tipp:** Beginnen Sie immer mit einem **Auslöser**-Block (grüne Flagge, Taste, Nachricht, Roboterereignis …), damit Sie wissen, **wann** das Programm startet.

## 8. Python-Modus (Überblick)

Bei manchen Versionen und Geräten bietet mBlock einen Weg zu **Python** (einer textbasierten Programmiersprache). Für die ersten Schritte mit Blöcken ist er nicht nötig. Er ist der logische nächste Schritt, wenn die Textsyntax zum Ziel wird, etwa beim [mBot2](/de/mbot-vs-mbot2/) oder beim [CyberPi](/de/makeblock-cyberpi-ueberblick/). Wann Sie den Python-Editor öffnen sollten, lesen Sie unter [welche mBlock-Software wählen](/de/mblock-software-welche-waehlen/).

## Passende Hardware (wenn Sie die Oberfläche verstanden haben)

Wenn die Umgebung klar ist, hier zwei Roboter, die oft mit mBlock 5 verwendet werden. Preisspannen ändern sich: Prüfen Sie die aktuelle Produktseite. **IoT** bedeutet hier „vernetzte Geräte“ (Projekte, die zum Beispiel über das Wi‑Fi-Netz laufen).

- **Makeblock mBot2** — 10–14 Jahre · Scratch und Python · CyberPi-Platine mit Farbbildschirm · Wi‑Fi und vernetzte Projekte · gut geeignet, um mBlock 5 zu lernen. [Amazon.de](https://www.amazon.de/dp/B0919F9CKS?tag=roboteducat00-21)
- **Makeblock CyberPi** — ab 10 Jahren · Scratch und Python · vielseitige programmierbare Platine mit Bildschirm, Wi‑Fi und mehreren Sensoren · nur die Platine, nützlich für vernetzte Projekte mit mBlock. [Amazon.de](https://www.amazon.de/dp/B0BBZY9L59?tag=roboteducat00-21)

## 9. Verbindung zum Roboter: was Sie prüfen sollten

Bevor Sie auf „Verbinden“ klicken:

1. Der **Roboter ist eingeschaltet** und der **Akku** oder die Batterien reichen aus.
2. Das **USB-Kabel** steckt fest *oder* **Bluetooth** ist unter Windows gekoppelt (siehe [Software: App oder Web](/de/mblock-software-welche-waehlen/)).
3. In mBlock ist in der Liste das **richtige Gerät** ausgewählt (verwechseln Sie im Unterricht nicht zwei identische Roboter).

Dann, je nach Modus:

- **Live-Ausführung**: Das Programm läuft, **solange** die Verbindung zum PC aktiv ist (nützlich zum Testen).
- **Hochladen**: Das Programm wird **im Roboter gespeichert**, damit es **ohne** Kabel funktioniert — ausführlich im [ersten mBot-Programm](/de/erstes-mbot-programm/).

## 10. Mini-FAQ

### Sind mBlock 5 und Scratch online dasselbe?

**Fast**, was den Teil Figuren / Bühne betrifft. Der große Unterschied ist die **Makeblock-Hardware**: Treiber, Roboterblöcke, **Firmware**-Updates (die eingebaute Software des Roboters). Für reines Scratch ohne Roboter genügt die offizielle Seite; für einen **mBot** ist mBlock das richtige Werkzeug.

### Ich sehe die Blöcke meines Roboters nicht

Fügen Sie zuerst das **Gerät** im dafür vorgesehenen Reiter hinzu und prüfen Sie dann die [Anleitung zur mBot-Erweiterung](/de/mbot-bloecke-installieren/). Ohne erkanntes Gerät erscheinen die spezifischen Blöcke nicht.

### Die Oberfläche ist in einer anderen Sprache

Suchen Sie im Menü nach **Language** / **Einstellungen** (der Ort hängt von der Version ab) und wählen Sie **Deutsch**.

### mBlock stürzt beim ersten Start ab

Aktualisieren Sie **Windows**, **mBlock** und die **Treiber**; testen Sie einmal als **Administrator**; blockiert ein Virenschutzprogramm, lesen Sie die FAQ des [Installationsartikels](/de/mblock-5-installieren-windows/).

### Was ist ein „mblock-Programm“?

In mBlock ist ein **Programm** das **Blockskript** (ein oder mehrere Stapel), das Sie im **Skriptbereich** zusammensetzen und oft in einer **`.mblock`**-Projektdatei speichern. Ein Beispiel mit dem **mBot-Roboter** finden Sie im [ersten mBot-Programm](/de/erstes-mbot-programm/).

### Machen „mBlock 5 web“ und die installierte App dasselbe?

Die **Oberfläche** (Bühne, Blöcke, Skriptbereich) ähnelt sich bei **[mBlock online](https://ide.mblock.cc/)** und der **Desktop-App**. Das **Verbinden des Roboters**, **Bluetooth** und das **Hochladen** sind in der Anwendung aber oft **zuverlässiger**: Details unter [Welche mBlock-Software](/de/mblock-software-welche-waehlen/).

---

## Amazon-Links (Affiliate)

- [Makeblock mBot](https://www.amazon.de/dp/B07XR98YYQ?tag=roboteducat00-21)

*Amazon-Partner — Provision bei berechtigten Käufen möglich.*

---

**Nächster Schritt:** Machen Sie weiter mit der [Installation der mBot-Blöcke](/de/mbot-bloecke-installieren/), falls nötig, und dann mit dem [ersten mBot-Programm](/de/erstes-mbot-programm/), um **Oberfläche**, **Verbindung** und **Hochladen** zu verbinden.

**Auch lesenswert**: [mBlock oder Scratch?](/de/mblock-vs-scratch/)

*Autor: Emmanuel Sauvage.*
