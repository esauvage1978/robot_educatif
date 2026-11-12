---
layout: ../../../layouts/DePost.astro
title: "Homey Pro mini: Auspacken und Einrichtung (Teil 1)"
description: "Homey Pro mini von Athom: Lieferumfang, Ethernet, App-Einrichtung Schritt für Schritt — etwa 15 Minuten bis „Alles bereit!“ für Smart-Home-Nutzer in DE, AT und CH."
updated: "24. Oktober 2026"
---

*Test begonnen am 23. Oktober 2026.*

Der **Homey Pro mini** ist die kompakte Zentrale von Athom: Zigbee, Matter, Thread, Z-Wave, 433 MHz und Infrarot ohne extra Funk-Sticks. Dieser erste Teil beschreibt **Lieferumfang und Einrichtung** von der Box bis zum Bildschirm „Alles bereit!“ in der App.

Vergleich mit anderen Systemen: [Home Assistant, Jeedom, Homey](/de/smart-home/home-assistant-jeedom-homey-welche-zentrale/).

## Kurzfassung

**Bisher positiv**
- Sehr **einfache, geführte Einrichtung** (ca. 15 Minuten)
- Software-Update startet automatisch (bei uns etwa 4 Minuten)
- **Ethernet RJ45** und flaches Netzwerkkabel in der Box
- Hausstruktur (Etagen, Räume) gleich am Anfang
- Beim Gerät hinzufügen: 433 MHz, IR, Matter, Z-Wave, Zigbee

**Noch offen**
- Mitgeliefertes Ethernet-Adapter-Kit ist für das **große** Homey Pro gedacht, nicht für das mini (eigenes RJ45)
- Noch keine Geräte gekoppelt — Reichweite und Flows folgen in Teil 2

## Lieferumfang

1. Homey Pro mini
2. Flaches Ethernet-Kabel
3. USB-C-Kabel
4. USB-Netzteil (Schuko/EU je nach Shop)
5. Hinweise „Legal & Safety“ mit QR zu [setup.homey.app](https://setup.homey.app)

Kleines schwarzes Gehäuse, LED an der Front — passt neben Router oder Fritzbox.

## Anschlüsse

Hinten: **RJ45** und **USB-C** (Strom). Wi-Fi geht auch; für eine feststehende Box ist **Ethernet** stabiler.

Der separate „Homey Pro Ethernet Adapter“ (USB-C → LAN) brauchen Sie **nur beim großen Homey Pro** ohne LAN-Buchse. Der Test dieses Modells: [Auspacken und Einrichtung](/de/smart-home/homey-pro-auspacken-einrichtung/).

## Einrichtung in der App

1. App installieren (QR auf dem Beileger)
2. Homey-Konto anlegen
3. Automatisches **Firmware-Update** — währenddessen nicht trennen
4. Anzahl Etagen und Räume wählen (Keller, Dach, Garage, Garten …)
5. **Thread-Netz** konfigurieren (Berechtigung in der App)
6. „Alles bereit!“ — dann „Neues Gerät“ mit Protokollwahl

Rechnen Sie mit **etwa 15 Minuten** inklusive Update.

Offizielle Produktseite: [Homey Pro mini](https://homey.app/de-de/homey-pro-mini/) (Preis beim Hersteller).

## FAQ

**Ethernet-Adapter für das mini?** Nein — RJ45 ist eingebaut.

**Dauer?** Ca. 15 Minuten in unserem Test.

**Welches Protokoll zuerst?** [Zigbee, WLAN, Thread, Matter](/de/smart-home/smart-home-protokolle-zigbee-wifi-thread-matter/).

**Teil 2:** Matter auf Thread und Zigbee-Geräte koppeln, erste Flows.

Weiter: [Smart Home Einstieg](/de/smart-home/einstieg/). Homey Pro mini [bei Amazon.de](https://www.amazon.de/s?k=Homey+Pro+mini&tag=roboteducat00-21) (Werbelink, Verfügbarkeit prüfen).

[Alle Smart-Home-Ratgeber](/de/smart-home/)
