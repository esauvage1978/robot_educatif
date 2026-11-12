---
layout: ../../../layouts/DePost.astro
title: "Smart-Home-Protokolle: Zigbee, WLAN, Z-Wave, Thread und Matter erklärt"
description: "Welches Funkprotokoll passt zu Ihrem Zuhause? Frequenzen, Mesh, Gateway, Stromverbrauch und Home-Assistant-Kompatibilität im Vergleich — für Deutschland, Österreich und die Schweiz."
updated: "24. Oktober 2026"
---

Bevor Sie den ersten Sensor kaufen, entscheiden Sie, **welche Sprache Ihre Geräte sprechen**. Eine WLAN-Steckdose (Schuko), ein Zigbee-Sensor und eine Matter-Lampe lassen sich nicht gleich anschließen — und diese Wahl bestimmt, welche Zentrale Sie brauchen. Diese Seite fasst die fünf Protokolle zusammen, die Sie im Handel sehen, anhand der offiziellen Dokumentationen ([Connectivity Standards Alliance](https://csa-iot.org/all-solutions/matter/), [Thread Group](https://www.threadgroup.org/What-is-Thread/Overview), [Z-Wave Alliance](https://z-wavealliance.org/), [Home-Assistant-Integrationen](https://www.home-assistant.io/integrations/)).

## Das Wichtigste in einer Tabelle

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Protokoll</th>
<th scope="col">Frequenz (Europa)</th>
<th scope="col">Netz</th>
<th scope="col">Gateway nötig</th>
<th scope="col">Verbrauch</th>
<th scope="col">In Home Assistant</th>
</tr></thead><tbody>
<tr>
<td data-label="Protokoll"><span class="td-val"><strong>WLAN</strong></span></td>
<td data-label="Frequenz (Europa)"><span class="td-val">2,4 GHz (manchmal 5 GHz)</span></td>
<td data-label="Netz"><span class="td-val">Stern um den Router</span></td>
<td data-label="Gateway nötig"><span class="td-val">nein</span></td>
<td data-label="Verbrauch"><span class="td-val">hoch: Geräte am Netz</span></td>
<td data-label="In Home Assistant"><span class="td-val">je nach Marke (lokal oder Cloud)</span></td>
</tr>
<tr>
<td data-label="Protokoll"><span class="td-val"><strong>Zigbee</strong></span></td>
<td data-label="Frequenz (Europa)"><span class="td-val">2,4 GHz (IEEE 802.15.4)</span></td>
<td data-label="Netz"><span class="td-val">Mesh: netzbetriebene Geräte leiten weiter</span></td>
<td data-label="Gateway nötig"><span class="td-val">ja: Koordinator (USB-Stick)</span></td>
<td data-label="Verbrauch"><span class="td-val">sehr niedrig: Sensoren monatelang mit Knopfzelle</span></td>
<td data-label="In Home Assistant"><span class="td-val">ZHA (integriert) oder Zigbee2MQTT</span></td>
</tr>
<tr>
<td data-label="Protokoll"><span class="td-val"><strong>Z-Wave</strong></span></td>
<td data-label="Frequenz (Europa)"><span class="td-val">868,4 MHz</span></td>
<td data-label="Netz"><span class="td-val">Mesh</span></td>
<td data-label="Gateway nötig"><span class="td-val">ja: Z-Wave-Controller</span></td>
<td data-label="Verbrauch"><span class="td-val">sehr niedrig</span></td>
<td data-label="In Home Assistant"><span class="td-val">Z-Wave JS</span></td>
</tr>
<tr>
<td data-label="Protokoll"><span class="td-val"><strong>Thread</strong></span></td>
<td data-label="Frequenz (Europa)"><span class="td-val">2,4 GHz (IEEE 802.15.4)</span></td>
<td data-label="Netz"><span class="td-val">Mesh, IPv6</span></td>
<td data-label="Gateway nötig"><span class="td-val">ja: Border Router</span></td>
<td data-label="Verbrauch"><span class="td-val">sehr niedrig</span></td>
<td data-label="In Home Assistant"><span class="td-val">Thread- und Matter-Integrationen</span></td>
</tr>
<tr>
<td data-label="Protokoll"><span class="td-val"><strong>Matter</strong></span></td>
<td data-label="Frequenz (Europa)"><span class="td-val">über WLAN, Thread oder Ethernet</span></td>
<td data-label="Netz"><span class="td-val">gemeinsame Anwendungsschicht</span></td>
<td data-label="Gateway nötig"><span class="td-val">hängt vom Transport ab</span></td>
<td data-label="Verbrauch"><span class="td-val">hängt vom Transport ab</span></td>
<td data-label="In Home Assistant"><span class="td-val">Matter-Integration</span></td>
</tr>
</tbody>
</table>
</div>

**Unser Tipp für den Einstieg: Zigbee** mit einem Koordinator-Stick an Home Assistant. Das Sortiment ist groß, Sensoren sind günstig und halten lange mit der Batterie, alles bleibt lokal. Stick-Vergleich: [bester Zigbee-Stick für Home Assistant](/de/smart-home/bester-zigbee-stick-home-assistant/).

## WLAN: am einfachsten, nicht am sparsamsten

Ein WLAN-Gerät verbindet sich direkt mit dem Router — kein Gateway. Ideal für eine [smarte Steckdose (Schuko)](/de/smart-home/smarte-steckdosen/) oder eine Kamera. Für kleine Batterie-Sensoren ist WLAN zu stromhungrig, und jedes Gerät belegt einen Platz im WLAN. Viele Einsteiger-WLAN-Produkte laufen über die Cloud des Herstellers: Prüfen Sie vor dem Kauf eine **lokale** Integration.

## Zigbee: der Standard für Sensoren

Zigbee nutzt IEEE 802.15.4 bei 2,4 GHz. Netzbetriebene Geräte (Steckdosen, Lampen) **leiten** Nachrichten weiter — je mehr Sie haben, desto weiter reicht das Netz. Ein **Koordinator** (meist USB-Stick) und Home Assistant mit ZHA oder Zigbee2MQTT steuern das Netz. Details: [Zigbee2MQTT oder ZHA](/de/smart-home/zigbee2mqtt-oder-zha-home-assistant/). Beispiel: [Zigbee-Temperatursensor](/de/smart-home/zigbee-temperatursensor/) hält monatelang mit einer Knopfzelle.

**Achtung:** Zigbee und WLAN teilen sich 2,4 GHz. Entfernen Sie den Stick per USB-Verlängerung vom Router und wählen Sie nicht überlappende Kanäle.

## Z-Wave: robust, schmaler Katalog

Z-Wave sendet bei **868,4 MHz** in Europa — weg vom WLAN. Das Netz ist gemischt und zertifiziert. Dafür ist die Auswahl kleiner und Module oft teurer als Zigbee-Äquivalente. Die Frequenz ist regional unterschiedlich (908,4 MHz in den USA): Ein US-Modul funktioniert in Deutschland nicht.

## Thread und Matter: die nächste Generation

**Thread** ist ein stromsparendes Mesh auf IEEE 802.15.4 mit IPv6; ein **Border Router** verbindet es mit dem Heimnetz (manche Router und Lautsprecher haben einen eingebaut).

**Matter** ist keine Funktechnik, sondern eine gemeinsame Sprache ([CSA](https://csa-iot.org/all-solutions/matter/), Version 1.0 seit Oktober 2022) über WLAN, Thread oder Ethernet. Ein Matter-Gerät kann von mehreren Ökosystemen gleichzeitig gesteuert werden. Die Geräteliste wächst, ist aber noch kürzer als bei Zigbee — Kategorie vor dem Kauf prüfen.

## Empfehlung nach Situation

- **Einstieg mit Home Assistant:** Zigbee für Sensoren, lokales WLAN für Steckdosen und Kameras.
- **Apple, Google und Amazon gleichzeitig:** Matter-Geräte bevorzugen.
- **Beton, große Distanzen:** Z-Wave oder Zigbee mit vielen Steckdosen als Repeater.
- **Eigene Sensoren basteln:** [ESP32 mit ESPHome](/de/smart-home/esp32-esphome-temperatursensor/) (WLAN; manche Boards auch Thread — [welche ESP32-Platine](/de/smart-home/welche-esp32-platine-smart-home/)).

Weiter: [Smart Home für Einsteiger](/de/smart-home/einstieg/), [Home Assistant, Jeedom, Homey](/de/smart-home/home-assistant-jeedom-homey-welche-zentrale/), [Smart Home in der Mietwohnung](/de/smart-home/smart-home-mietwohnung-ohne-bohren/).

[Alle Smart-Home-Ratgeber](/de/smart-home/)
