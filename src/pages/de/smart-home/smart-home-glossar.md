---
layout: ../../../layouts/DePost.astro
title: "Smart-Home-Glossar: wichtige Begriffe"
description: "Die Wörter des Smart Home einfach erklärt: Zentrale, Hub, Zigbee, Matter, MQTT, ESPHome, Automatisierung, Flow, OTA, Mesh... jeweils mit einem konkreten Beispiel."
updated: "30. Oktober 2026"
faqSchema:
  - question: "Sind Box, Hub und Gateway dasselbe?"
    answer: "Im Alltag fast. Genauer gesagt ist die Box (oder der Hub) das Gehirn des Hauses, während ein Gateway nur ein Übersetzer von einer Funksprache in eine andere sein kann."
  - question: "Muss ich MQTT kennen, um anzufangen?"
    answer: "Nein. ZHA funktioniert ohne MQTT. Dieses Nachrichtensystem wird nützlich, wenn Sie sich für Zigbee2MQTT entscheiden oder viele Bastelprojekte machen."
  - question: "Wo tauchen diese Wörter im Pfad auf?"
    answer: "In der Wahl der Zentrale, im Ratgeber zu den Protokollen und auf der Seite zu den ersten Automatisierungen."
---

Sie lesen einen Artikel über Smart Home und ein Wort bremst Sie: eine Abkürzung, ein englischer Begriff oder ein Markenname, den Ihnen niemand erklärt hat? Das ist normal. In diesem Feld wird das alles gern vermischt.

Dafür ist dieses Glossar da. Jeder Begriff wird in ein oder zwei Sätzen erklärt und dann mit einem Beispiel aus einem echten Zuhause veranschaulicht. Sie können es mit dem Index Buchstabe für Buchstabe durchgehen oder wiederkommen, wenn Ihnen ein Wort entgeht. Die vollständigen Spezifikationen finden Sie in den offiziellen Unterlagen der Hersteller und Normungsorganisationen (Connectivity Standards Alliance, Thread Group, Z-Wave Alliance).

## Weiterlesen

- [Wie Ihre Geräte miteinander sprechen (Protokolle)](/de/smart-home/smart-home-protokolle-zigbee-wifi-thread-matter/)
- [Ihre ersten Automatisierungen](/de/smart-home/erste-smart-home-automatisierungen/)
- [Anfängerfehler und ihre Antworten](/de/smart-home/smart-home-anfaengerfehler-faq/)
- [Welche Smart-Home-Zentrale für Einsteiger](/de/smart-home/welche-smart-home-zentrale-fuer-einsteiger/)

## Alphabetischer Index

[4](#zahlen) · [A](#a) · [B](#b) · [C](#c) · [D](#d) · [E](#e) · [F](#f) · [G](#g) · [H](#h) · [I](#i) · [K](#k) · [L](#l) · [M](#m) · [O](#o) · [P](#p) · [R](#r) · [S](#s) · [T](#t) · [W](#w) · [Y](#y) · [Z](#z)

## 4

### <span id="zahlen"></span>433 MHz

Ein älteres Funkband, das viele ferngesteuerte Rollläden, Klingeln und Steckdosen nutzen. Qualität und Sicherheit schwanken stark.  
**Beispiel:** eine ferngesteuerte Steckdose von vor einigen Jahren, die ein Empfänger oder ein Homey noch steuern kann.

## A

### <span id="a"></span>Aktion

Das, was Ihr Haus tut, wenn eine Automatisierung auslöst: eine Lampe einschalten, eine Benachrichtigung senden, die Heizung einstellen.  
**Beispiel:** Sie erhalten die Nachricht „Die Waschmaschine ist fertig“.

### Automatisierung

Eine Regel nach dem Muster „wenn das passiert, dann tu jenes“, manchmal mit zusätzlichen Bedingungen. Siehe unsere [ersten Automatisierungen](/de/smart-home/erste-smart-home-automatisierungen/).  
**Beispiel:** Gibt es im Flur Bewegung und ist es dunkel, geht das Licht an.

## B

### <span id="b"></span>Bedingung

Ein Filter, der festlegt, in welchem Fall die Automatisierung handeln soll: eine Uhrzeit, ein Zustand, eine Anwesenheit.  
**Beispiel:** Die Heizung nur zwischen 6 und 22 Uhr einschalten.

### Bluetooth Low Energy (BLE)

Ein stromsparender Funk mit kurzer Reichweite, der in Smartwatches, manchen Schlössern und Sensoren in der Nähe steckt.  
**Beispiel:** ein Schloss, das sich per Telefon öffnet, wenn Sie vor der Tür stehen.

### Border Router (Grenzrouter)

Ein Gerät, das ein Thread-Netz (siehe unten) mit Ihrem Heimnetz verbindet, damit Thread-Geräte gesteuert werden können.  
**Beispiel:** manche neueren smarten Lautsprecher oder Boxen haben diese Funktion eingebaut.

## C

### <span id="c"></span>Cloud und lokal

Die **Cloud** sind die Server des Herstellers im Internet. **Lokal** heißt, dass alles bei Ihnen zu Hause zwischen Ihren Geräten und Ihrer Zentrale abläuft.  
**Beispiel:** Eine Steckdose, die sich nur über die App des Herstellers steuern lässt, reagiert nicht mehr, wenn der Dienst oder Ihre Verbindung ausfällt; eine lokal gesteuerte Steckdose läuft weiter.

## D

### <span id="d"></span>Dongle

Ein kleiner USB-Stick, der Ihrer Zentrale einen Funk hinzufügt (zum Beispiel Zigbee, Z-Wave oder Thread).  
**Beispiel:** unser Ratgeber zum [besten Zigbee-Stick](/de/smart-home/bester-zigbee-stick-home-assistant/).

## E

### <span id="e"></span>Entität

In Home Assistant ist jede Information und jeder Befehl eine Entität: eine Temperatur, ein Schalter, ein Licht. Jede trägt einen technischen Namen.  
**Beispiel:** `sensor.wohnzimmer_temperatur` ist die Temperatur im Wohnzimmer.

### ESP32

Eine kleine, sehr günstige programmierbare Elektronikplatine mit WLAN und Bluetooth. Mit ihr bauen Sie eigene Sensoren oder Steuerungen.  
**Beispiel:** ein selbstgebauter Temperatursensor mit einer ESP32, siehe unsere [ESP32-Projektideen](/de/smart-home/esp32-smart-home-projektideen/).

### ESPHome

Ein kostenloses Werkzeug, um Platinen wie die ESP32 zu programmieren und sie von Home Assistant erkennen zu lassen, ohne ein echtes Programm zu schreiben.  
**Beispiel:** [ein ESP32-Temperatursensor mit ESPHome](/de/smart-home/esp32-esphome-temperatursensor/).

## F

### <span id="f"></span>Flow (Homey)

Die Art, wie Homey eine Automatisierung baut: Man setzt visuelle Karten „Wenn... Und... Dann...“ zusammen.  
**Beispiel:** Wenn sich eine Tür öffnet und die Heizung läuft, dann eine Benachrichtigung senden.

## G

### <span id="g"></span>Gateway

Hardware oder Software, die eine Sprache in eine andere übersetzt, zum Beispiel Funk in Ihr Internetnetz oder Cloud in lokal.  
**Beispiel:** Zigbee2MQTT dient als Gateway zwischen Zigbee und MQTT.

### GPIO

Die kleinen Metallstifte einer Platine wie des Raspberry Pi, an die man Elektronikbauteile direkt anschließt (eine LED, einen Sensor).  
**Beispiel:** einen Temperatursensor an die Pins eines Raspberry Pi anschließen.

## H

### <span id="h"></span>Home Assistant

Eine kostenlose Software, die alle Ihre vernetzten Geräte in einer einzigen App vereint und bei Ihnen zu Hause läuft, ohne Pflicht-Abo.  
**Beispiel:** Sie läuft auf einem Home Assistant Green oder einem Raspberry Pi 5.

### Hub oder Brücke

Zwei Wörter, mit denen man oft die Zentrale meint. Eine Brücke kann auch ein kleines Modul sein, das eine Funksprache in eine andere übersetzt.  
**Beispiel:** Die Philips-Hue-Bridge übersetzt die Befehle der App in Anweisungen an die Lampen.

## I

### <span id="i"></span>Integration

Ein Softwaremodul, das Ihrer Zentrale beibringt, mit einer bestimmten Marke oder Technik zu sprechen.  
**Beispiel:** die Matter-Integration von Home Assistant.

## K

### <span id="k"></span>Koordinator (Zigbee)

Der Chef des Zigbee-Netzes: Er nimmt die Geräte auf und organisiert ihren Austausch. In der Praxis ist es meist ein kleiner USB-Stick.  
**Beispiel:** der Stick SONOFF ZBDongle-E an einer Home-Assistant-Zentrale.

## L

### <span id="l"></span>Lokale Steuerung

Ein Gerät steuern, ohne von den Servern des Herstellers abzuhängen.  
**Beispiel:** ein Shelly-Modul, das direkt über seine Adresse im Netz gesteuert wird, oder ein Zigbee-Sensor, der über ZHA läuft.

## M

### <span id="m"></span>Matter

Eine gemeinsame Sprache, von mehreren großen Marken geschaffen, die über WLAN, Thread oder Netzwerkkabel läuft. Sie lässt dasselbe Gerät von mehreren Systemen verstehen.  
**Beispiel:** eine Matter-Lampe, die sowohl in Home Assistant als auch in Google Home sichtbar ist (je nach gewählter Konfiguration).

### Mesh (Maschennetz)

Eine Anordnung, bei der Geräte die Nachrichten ihrer Nachbarn weiterleiten, wie Menschen, die einen Eimer Wasser weitergeben. Zigbee, Z-Wave und Thread funktionieren so.  
**Beispiel:** Eine Zigbee-Steckdose im Flur gibt die Nachricht des Schlafzimmersensors weiter. Siehe die Seite zu den [Protokollen](/de/smart-home/smart-home-protokolle-zigbee-wifi-thread-matter/).

### MQTT

Ein sehr leichtes Nachrichtensystem, das Bastler gern nutzen. Ein Gerät „veröffentlicht“ eine Information unter einer Adresse, und die anderen können sie lesen.  
**Beispiel:** Die Wohnzimmertemperatur wird unter der Adresse `zigbee2mqtt/wohnzimmer_temp` veröffentlicht.

## O

### <span id="o"></span>OTA (Update per Funk)

OTA steht für „over the air“. Es ist ein Update der internen Software eines Geräts, ohne Kabel.  
**Beispiel:** [OTA-Updates mit ESPHome](/de/smart-home/esphome-ota-updates/).

## P

### <span id="p"></span>Pairing (Kopplung)

Der Schritt, in dem Sie Ihrer Zentrale ein neues Gerät „vorstellen“, damit sie es erkennt.  
**Beispiel:** Sie halten die Taste eines Zigbee-Sensors gedrückt, bis Ihre Software „neues Gerät gefunden“ meldet.

## R

### <span id="r"></span>Raspberry Pi

Ein kleiner Computer in der Größe einer Bankkarte, der häufig genutzt wird, um Home Assistant zu betreiben.  
**Beispiel:** der Raspberry Pi 5, mit passendem Netzteil und einer Speicherkarte.

## S

### <span id="s"></span>Szene

Eine Gruppe von Zuständen, die man auf einmal abruft: „Filmabend“, „abwesend“.  
**Beispiel:** alle Lichter ausschalten und die Heizung absenken, mit einem einzigen Handgriff.

## T

### <span id="t"></span>Thread

Ein stromsparendes Mesh-Netz. Es braucht einen Border Router, um mit Ihrem Heimnetz verbunden zu werden.  
**Beispiel:** ein Matter-Sensor, der Thread als Funk nutzt.

### Trigger (Auslöser)

Das Ereignis, das eine Automatisierung startet.  
**Beispiel:** Ein Kontaktsensor wechselt von „geschlossen“ auf „offen“.

## W

### <span id="w"></span>WLAN

Das Funknetz Ihres Internet-Routers. WLAN-Geräte verbinden sich direkt damit, ohne zusätzlichen Stick, verbrauchen aber mehr Strom und laufen selten mit Batterie.  
**Beispiel:** Eine Tapo-P110-Steckdose verbindet sich mit dem WLAN zu Hause.

## Y

### <span id="y"></span>YAML

Ein Textformat, mit dem man Regeln von Hand schreibt, mit Einrückungen für die Struktur. Zum Einstieg können Sie darauf verzichten.  
**Beispiel:** Die Beispiele in den [ersten Automatisierungen](/de/smart-home/erste-smart-home-automatisierungen/) zeigen einen kleinen YAML-Block.

## Z

### <span id="z"></span>Z-Wave

Ein Mesh-Funk, der in Europa bei etwa 868 MHz arbeitet (in anderen Regionen ist die Frequenz anders) und daher weniger vom WLAN gestört wird.  
**Beispiel:** ein Z-Wave-Rollladenmodul, gesteuert über einen eigenen USB-Stick.

### ZHA

Die in Home Assistant eingebaute Art, ein Zigbee-Netz zu verwalten. Der Name kommt von „Zigbee Home Automation“.  
**Beispiel:** zum Vergleich siehe [ZHA oder Zigbee2MQTT](/de/smart-home/zigbee2mqtt-oder-zha-home-assistant/).

### Zigbee

Ein sparsamer Funk, ideal für Sensoren, die monatelang mit einer Batterie laufen. Er arbeitet als Mesh und nutzt das 2,4-GHz-Band.  
**Beispiel:** der Sensor SONOFF SNZB-02D, über einen USB-Stick mit Home Assistant verbunden.

### Zigbee-Router

Ein netzbetriebenes Gerät, das die Zigbee-Nachrichten der anderen weiterleitet: eine Steckdose, eine Lampe.  
**Beispiel:** Eine Zigbee-Steckdose in der Mitte der Wohnung macht es möglich, einen entfernten Sensor zu erreichen.

### Zigbee2MQTT

Eine andere Art, Zigbee in Home Assistant zu verwalten: Es übersetzt Zigbee-Nachrichten in MQTT-Nachrichten. Es ist eine Alternative zu ZHA.  
**Beispiel:** Der Katalog kompatibler Geräte ist von der Community sehr gut dokumentiert.

## Häufige Fragen

**Sind Box, Hub und Gateway dasselbe?**
Im Alltag fast. Genauer gesagt ist die Box (oder der Hub) das Gehirn des Hauses, während ein Gateway nur ein Übersetzer von einer Funksprache in eine andere sein kann. Um den roten Faden wieder aufzunehmen, lesen Sie den [kompletten Einsteiger-Leitfaden](/de/smart-home/smart-home-einstieg-kompletter-leitfaden/).

**Muss ich MQTT kennen, um anzufangen?**
Nein. ZHA funktioniert ohne MQTT. Dieses Nachrichtensystem wird nützlich, wenn Sie sich für Zigbee2MQTT entscheiden oder viele Bastelprojekte machen.

**Wo tauchen diese Wörter im Pfad auf?**
In der [Wahl der Zentrale](/de/smart-home/welche-smart-home-zentrale-fuer-einsteiger/), im Ratgeber zu den [Protokollen](/de/smart-home/smart-home-protokolle-zigbee-wifi-thread-matter/) und auf der Seite zu den [Automatisierungen](/de/smart-home/erste-smart-home-automatisierungen/).

---

*Autor: Emmanuel Sauvage. Dieses Glossar erklärt die Wörter für den Einstieg; für die vollständigen technischen Einzelheiten sind die Spezifikationen der Normungsorganisationen (CSA, Thread Group, Z-Wave Alliance) und die Dokumentationen der Hersteller maßgeblich.*
