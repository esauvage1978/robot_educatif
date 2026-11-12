---
layout: ../../../layouts/DePost.astro
title: "Home Assistant, Jeedom, Homey oder Sprachassistent: welche Smart-Home-Zentrale?"
description: "Vergleich der Systeme für DE, AT und CH: lokal vs. Cloud, Protokolle, Schwierigkeit und Zielgruppe — Home Assistant, Jeedom, Homey Pro, Google Home, Alexa, Apple Home."
updated: "24. Oktober 2026"
---

Ein vernetztes Zuhause braucht ein **Gehirn**: Software oder Box, die Sensordaten empfängt und Automatisierungen auslöst. Die Wahl bestimmt Protokolle, Betrieb ohne Internet und Aufwand im Alltag. Kurzüberblick nach offiziellen Dokumentationen ([Home Assistant](https://www.home-assistant.io/installation/), [Jeedom](https://doc.jeedom.com/), [Homey Pro](https://homey.app/de-de/homey-pro/)).

## Vergleichstabelle

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">System</th>
<th scope="col">Typ</th>
<th scope="col">Ohne Internet</th>
<th scope="col">Protokolle nativ</th>
<th scope="col">Schwierigkeit</th>
<th scope="col">Für wen</th>
</tr></thead><tbody>
<tr>
<td data-label="System"><span class="td-val"><strong>Home Assistant</strong></span></td>
<td data-label="Typ"><span class="td-val">Open Source (Apache 2.0) auf Pi, Mini-PC oder Green</span></td>
<td data-label="Ohne Internet"><span class="td-val">ja</span></td>
<td data-label="Protokolle nativ"><span class="td-val">WLAN, Matter; Zigbee, Z-Wave, Thread mit Funk-Stick</span></td>
<td data-label="Schwierigkeit"><span class="td-val">mittel</span></td>
<td data-label="Für wen"><span class="td-val">volle lokale Kontrolle</span></td>
</tr>
<tr>
<td data-label="System"><span class="td-val"><strong>Jeedom</strong></span></td>
<td data-label="Typ"><span class="td-val">französische Software, GPL-Kern, offizielle Boxen</span></td>
<td data-label="Ohne Internet"><span class="td-val">ja</span></td>
<td data-label="Protokolle nativ"><span class="td-val">über Plugins (teils kostenpflichtig)</span></td>
<td data-label="Schwierigkeit"><span class="td-val">mittel</span></td>
<td data-label="Für wen"><span class="td-val">Plugin-Ökosystem</span></td>
</tr>
<tr>
<td data-label="System"><span class="td-val"><strong>Homey Pro</strong></span></td>
<td data-label="Typ"><span class="td-val">All-in-one-Box</span></td>
<td data-label="Ohne Internet"><span class="td-val">ja (lokale Geräte)</span></td>
<td data-label="Protokolle nativ"><span class="td-val">Zigbee, Z-Wave, Thread, Matter, WLAN, Bluetooth, 433 MHz, IR</span></td>
<td data-label="Schwierigkeit"><span class="td-val">gering</span></td>
<td data-label="Für wen"><span class="td-val">fertige Box ohne Tüfteln</span></td>
</tr>
<tr>
<td data-label="System"><span class="td-val"><strong>Google / Alexa / Apple Home</strong></span></td>
<td data-label="Typ"><span class="td-val">Sprach-Ökosystem</span></td>
<td data-label="Ohne Internet"><span class="td-val">teilweise</span></td>
<td data-label="Protokolle nativ"><span class="td-val">WLAN, Matter, Thread je nach Gerät</span></td>
<td data-label="Schwierigkeit"><span class="td-val">sehr gering</span></td>
<td data-label="Für wen"><span class="td-val">wenige Lampen und Steckdosen, Sprache</span></td>
</tr>
</tbody>
</table>
</div>

**Unser Favorit: Home Assistant** auf [Green oder Raspberry Pi 5](/de/smart-home/home-assistant-green-vs-raspberry-pi-5/) — kostenlos, lokal, sehr viele Marken. Installation: [Home Assistant auf Raspberry Pi 5](/de/smart-home/home-assistant-raspberry-pi-5-installation/).

## Home Assistant: am offensten

Open-Source-Projekt von Nabu Casa. Läuft auf [Raspberry Pi 5](/de/smart-home/home-assistant-raspberry-pi-5-installation/), Mini-PC oder Green. Über 1 500 Integrationen — von Philips Hue bis [Saugroboter](/de/smart-home/saugroboter-home-assistant/). USB-Stick für Zigbee: [Zigbee-Stick](/de/smart-home/bester-zigbee-stick-home-assistant/). Nachteil: gelegentliche Konfiguration und Updates. Fernzugriff: eigenes Setup oder optional Home Assistant Cloud.

## Jeedom

Französischer Kern (GPL), Plugins erweitern Funktionen — manche kostenpflichtig im Market. Alternative, wenn Sie Plugin-Denken bevorzugen.

## Homey Pro: alles in einer Box

Zigbee, Z-Wave, Thread, Matter, WLAN, Bluetooth, 433 MHz, Infrarot — Flows in der App. Weniger technisch, proprietäre Hardware. Kompaktversion im Test: [Homey Pro mini — Auspacken und Einrichtung](/de/smart-home/homey-pro-mini-auspacken-einrichtung/).

## Google Home, Alexa, Apple Home

Praktisch für wenige Geräte und Sprache; öffnen sich schrittweise für **Matter** ([Protokolle](/de/smart-home/smart-home-protokolle-zigbee-wifi-thread-matter/)). Für komplexe Automatisierung und Offline-Betrieb schnell an Grenzen. Als Ergänzung: Home Assistant kann Geräte für Sprache bereitstellen.

## Entscheidungshilfe

1. **Nur ein paar Lampen per Sprache** → Sprachassistent reicht.
2. **Lokal, ohne Abo** → Home Assistant.
3. **Lokal, wenig Konfiguration** → Homey Pro.
4. **Plugins im französischen Ökosystem** → Jeedom.

Weiter: [Einstieg](/de/smart-home/einstieg/), [Mietwohnung](/de/smart-home/smart-home-mietwohnung-ohne-bohren/).

[Alle Smart-Home-Ratgeber](/de/smart-home/)
