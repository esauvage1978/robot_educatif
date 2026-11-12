---
layout: ../../../layouts/DePost.astro
title: "Zigbee2MQTT oder ZHA in Home Assistant: welche Lösung?"
description: "ZHA vs Zigbee2MQTT in Home Assistant: Unterschiede, USB-Stick mit Verlängerung, Mosquitto, typische Fehler — ohne erfundene Reichweiten."
updated: "3. November 2026"
---

Sie haben einen **Zigbee-Stick** am Raspberry Pi oder Home Assistant Green — Home Assistant bietet **ZHA** und **Zigbee2MQTT**. Beide verbinden Sensoren und Schuko-Steckdosen mit HA, auf unterschiedliche Weise. Basierend auf [ZHA-Doku](https://www.home-assistant.io/integrations/zha/) und [Zigbee2MQTT](https://www.zigbee2mqtt.io/guide/getting-started/) (Oktober 2026).

<p>Smart-Home-Hub: <a href="/de/smart-home/">alle Ratgeber</a> · Stick-Vergleich: <a href="/de/smart-home/bester-zigbee-stick-home-assistant/">bester Zigbee-Stick 2026</a> · Protokolle: <a href="/de/smart-home/smart-home-protokolle-zigbee-wifi-thread-matter/">Zigbee, Wi-Fi, Thread, Matter</a>.</p>

![SONOFF ZBDongle-E — USB-Zigbee-Koordinator mit externer Antenne](/images/products/sonoff-zbdongle-e.webp)

<p><em>SONOFF ZBDongle-E — funktioniert mit ZHA und Zigbee2MQTT; Stick per <strong>USB-Verlängerung</strong> vom Pi entfernen (2,4-GHz-Störungen).</em></p>

## Kurzantwort

- **Schnell starten:** **ZHA** — integriert, kein MQTT-Broker nötig.
- **Tüfteln, exotische Geräte, MQTT auch außerhalb HA:** **Zigbee2MQTT** — eigene Weboberfläche, Gerätekatalog online.
- **Nur eines gleichzeitig pro Stick** — ein Koordinator pro Netz.

ZHA:           Sensor → USB-Stick → Home Assistant
Zigbee2MQTT:   Sensor → Stick → Z2M → Mosquitto → Home Assistant

## Tabelle

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col"> </th>
<th scope="col"><strong>ZHA</strong></th>
<th scope="col"><strong>Zigbee2MQTT</strong></th>
</tr></thead><tbody>
<tr>
<td><span class="td-val">Läuft in</span></td>
<td data-label="**ZHA**"><span class="td-val">Home Assistant</span></td>
<td data-label="**Zigbee2MQTT**"><span class="td-val">separate App / Container</span></td>
</tr>
<tr>
<td><span class="td-val">MQTT</span></td>
<td data-label="**ZHA**"><span class="td-val">nein</span></td>
<td data-label="**Zigbee2MQTT**"><span class="td-val">Mosquitto nötig</span></td>
</tr>
<tr>
<td><span class="td-val">Installation</span></td>
<td data-label="**ZHA**"><span class="td-val">wenige Klicks</span></td>
<td data-label="**Zigbee2MQTT**"><span class="td-val">Mosquitto, Repo, App, Assistent</span></td>
</tr>
<tr>
<td><span class="td-val">Sticks</span></td>
<td data-label="**ZHA**"><span class="td-val">Silicon Labs, TI, deCONZ, ZiGate</span></td>
<td data-label="**Zigbee2MQTT**"><span class="td-val">TI (zStack), Silicon Labs (ember) empfohlen</span></td>
</tr>
<tr>
<td><span class="td-val">Geräte außerhalb HA</span></td>
<td data-label="**ZHA**"><span class="td-val">nein</span></td>
<td data-label="**Zigbee2MQTT**"><span class="td-val">ja (MQTT)</span></td>
</tr>
<tr>
<td><span class="td-val">Hardware</span></td>
<td data-label="**ZHA**"><span class="td-val">wie HA</span></td>
<td data-label="**Zigbee2MQTT**"><span class="td-val">mindestens Pi 4 empfohlen für Z2M-App</span></td>
</tr>
</tbody>
</table>
</div>

Stick-Vergleich: [bester Zigbee-Stick](/de/smart-home/bester-zigbee-stick-home-assistant/). **SONOFF ZBDongle-E** funktioniert mit beiden Stacks. Der Preis steht auf der Seite des Händlers.

**Tipp:** Stick per **USB-Verlängerung** (Abstand 30–50 cm zum Pi/Router) — weniger Störung durch USB-3.0 und WLAN 2,4 GHz. Foto oben: ZBDongle-E mit externer Antenne.

![SONOFF Dongle Lite — kompakter Koordinator](/images/products/sonoff-dongle-lite-mg21.webp)

## ZHA einrichten

1. Stick einstecken (Verlängerung)
2. *Einstellungen → Geräte & Dienste → Integration hinzufügen → ZHA*
3. Seriellen Port wählen (EZSP für ZBDongle-E)
4. Gerät koppeln: *Einstellungen → Konnektivität → Zigbee → Gerät hinzufügen*

## Zigbee2MQTT (Home Assistant OS)

1. **Mosquitto broker** installieren und starten
2. Repo `https://github.com/zigbee2mqtt/hassio-zigbee2mqtt` in der App-Store-Depotliste
3. App **Zigbee2MQTT** (stable) installieren
4. Assistent: Stick wählen, WLAN-Kanal berücksichtigen
5. Geräte in der Z2M-Weboberfläche koppeln

Wenn ZHA den Stick nutzt: **ZHA zuerst entfernen**.

Beispiel ZBDongle-E:

adapter: ember
port: /dev/serial/by-id/usb-…-if00-port0

## Wechsel zwischen ZHA und Z2M

Migration **ohne Neukopplung** ist offiziell nur **innerhalb ZHA** (Stick tauschen mit Backup). Wechsel ZHA ↔ Z2M bedeutet praktisch **Neu-Pairing** — vorher entscheiden. Vollständiges HA-Backup anlegen.

## Häufige Fehler

- ZHA und Z2M gleichzeitig auf einem Stick
- Geräte fallen raus: WLAN-Kanal fixieren, **netzbetriebene Zigbee-Repeater** (Schuko-Steckdosen) hinzufügen; Lampe am Wandschalter aus = schwaches Mesh
- Auf Debian/Ubuntu: `modemmanager` kann USB blockieren — ZHA-Doku

## Profil

- **5–20 Standardgeräte:** ZHA
- **MQTT-Skripte** (z. B. [Türsensor Pi](/de/smart-home/raspberry-pi-tuersensor-benachrichtigung/)): Zigbee2MQTT
- **Konkretes Modell:** in [Z2M-Geräteliste](https://www.zigbee2mqtt.io/supported-devices/) und ZHA-Kompatibilität suchen

Weiter: [Home Assistant Pi 5](/de/smart-home/home-assistant-raspberry-pi-5-installation/), [Temperatursensor](/de/smart-home/zigbee-temperatursensor/), [Steckdosen](/de/smart-home/smarte-steckdosen/).

[Alle Smart-Home-Ratgeber](/de/smart-home/)
