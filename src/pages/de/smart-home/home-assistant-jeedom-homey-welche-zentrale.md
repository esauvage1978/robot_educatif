---
layout: ../../../layouts/DePost.astro
title: "Home Assistant, Jeedom, Homey: FHEM-Alternative und welche Smart-Home-Zentrale?"
description: "Home Assistant als FHEM-Alternative: Vergleich mit Jeedom, Homey Pro, Google, Alexa und Apple. Lokal, Protokolle, Schwierigkeit — Tabelle und FAQ für Einsteiger in DE, AT und CH."
updated: "18. November 2026"
schemaUpdated: "2026-11-18"
faqSchema:
  - question: "Ist Home Assistant eine FHEM-Alternative?"
    answer: "Ja, wenn Sie eine lokale Open-Source-Zentrale ohne Cloud-Pflicht suchen. Home Assistant deckt Zigbee, Matter, WLAN und tausende Integrationen ab — ähnliche Zielgruppe wie FHEM, mit anderem Bedienkonzept und starker Community."
  - question: "Welche Zentrale ist am einfachsten?"
    answer: "Homey Pro oder Sprachassistenten für wenige Geräte. Home Assistant ist mächtiger, verlangt aber etwas Konfiguration. Jeedom liegt dazwischen mit Plugins."
  - question: "Brauche ich Internet für Automatisierungen?"
    answer: "Bei Home Assistant, Jeedom und Homey Pro laufen lokale Geräte und Regeln ohne dauerhaftes Internet. Cloud-Geräte und Sprachdienste sind die Ausnahme."
  - question: "Was kostet der Einstieg mit Home Assistant?"
    answer: "Die Software ist kostenlos. Hardware (Green, Raspberry Pi 5, Zigbee-Stick) kostet extra. Optional Nabu Casa für Fernzugriff — kein Muss für lokale Nutzung."
---

<p><em>Zuletzt aktualisiert am 18. November 2026.</em></p>

<div class="article-toc" role="navigation" aria-label="Inhalt">
<p><strong>Auf dieser Seite</strong></p>
<ol>
<li><a href="#vergleichstabelle">Vergleichstabelle</a></li>
<li><a href="#home-assistant">Home Assistant</a></li>
<li><a href="#jeedom">Jeedom</a></li>
<li><a href="#homey">Homey Pro</a></li>
<li><a href="#sprachassistenten">Sprachassistenten</a></li>
<li><a href="#entscheidung">Entscheidungshilfe</a></li>
<li><a href="#faq">FAQ</a></li>
</ol>
</div>

Ein vernetztes Zuhause braucht ein **Gehirn**: Software oder Box, die Sensordaten empfängt und Automatisierungen auslöst. Wer bisher **FHEM** oder eine andere **FHEM-Alternative** sucht, landet oft bei **Home Assistant**, **Jeedom** oder **Homey Pro**. Die Wahl bestimmt Protokolle, Betrieb ohne Internet und Aufwand im Alltag. Kurzüberblick nach offiziellen Dokumentationen ([Home Assistant](https://www.home-assistant.io/installation/), [Jeedom](https://doc.jeedom.com/), [Homey Pro](https://homey.app/de-de/homey-pro/)).

![Home Assistant Green, fertiges Gateway für lokale Heimautomatisierung](/images/models/home-assistant-green.webp)

*Home Assistant Green — festes Gateway für lokale Steuerung. Startgerät für Einsteiger ohne Raspberry-Pi-Montage.*

**Unser Einstieg mit Affiliate-Link:** Zigbee-Koordinator für Home Assistant — <a href="/go/az-de-268943419b/" rel="sponsored nofollow noopener">SONOFF ZBDongle-E bei Amazon.de</a> (Werbelink). Dazu: [bester Zigbee-Stick](/de/smart-home/bester-zigbee-stick-home-assistant/) und [Home Assistant auf Raspberry Pi 5](/de/smart-home/home-assistant-raspberry-pi-5-installation/).

## Vergleichstabelle {#vergleichstabelle}

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
<td data-label="Für wen"><span class="td-val">volle lokale Kontrolle, FHEM-Alternative</span></td>
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

## Home Assistant: am offensten {#home-assistant}

Open-Source-Projekt von Nabu Casa. Läuft auf [Raspberry Pi 5](/de/smart-home/home-assistant-raspberry-pi-5-installation/), Mini-PC oder Green. Über 1 500 Integrationen — von Philips Hue bis [Saugroboter](/de/smart-home/saugroboter-home-assistant/). USB-Stick für Zigbee: [Zigbee-Stick](/de/smart-home/bester-zigbee-stick-home-assistant/). Nachteil: gelegentliche Konfiguration und Updates. Fernzugriff: eigenes Setup oder optional Home Assistant Cloud.

## Jeedom {#jeedom}

Französischer Kern (GPL), Plugins erweitern Funktionen — manche kostenpflichtig im Market. Alternative, wenn Sie Plugin-Denken bevorzugen.

## Homey Pro: alles in einer Box {#homey}

Zigbee, Z-Wave, Thread, Matter, WLAN, Bluetooth, 433 MHz, Infrarot — Flows in der App. Weniger technisch, proprietäre Hardware. Kompaktversion im Test: [Homey Pro mini — Auspacken und Einrichtung](/de/smart-home/homey-pro-mini-auspacken-einrichtung/).

## Google Home, Alexa, Apple Home {#sprachassistenten}

Praktisch für wenige Geräte und Sprache; öffnen sich schrittweise für **Matter** ([Protokolle](/de/smart-home/smart-home-protokolle-zigbee-wifi-thread-matter/)). Für komplexe Automatisierung und Offline-Betrieb schnell an Grenzen. Als Ergänzung: Home Assistant kann Geräte für Sprache bereitstellen.

## Entscheidungshilfe {#entscheidung}

1. **Nur ein paar Lampen per Sprache** → Sprachassistent reicht.
2. **Lokal, ohne Abo — FHEM-Alternative gesucht** → Home Assistant.
3. **Lokal, wenig Konfiguration** → Homey Pro.
4. **Plugins im französischen Ökosystem** → Jeedom.

Weiter: [Einstieg](/de/smart-home/einstieg/), [Mietwohnung](/de/smart-home/smart-home-mietwohnung-ohne-bohren/).

[Alle Smart-Home-Ratgeber](/de/smart-home/)