---
layout: ../../../layouts/DePost.astro
title: "Home Assistant auf Raspberry Pi 5 installieren: Anleitung 2026 (DE)"
description: "Home Assistant OS auf Raspberry Pi 5: Imager, NVMe-Boot, Netzwerk, Backups, HACS, ZHA mit Zigbee-Stick und sicherer Fernzugriff — Zeitzone Europe/Berlin, 230 V Schuko-Umfeld."
updated: "24. Oktober 2026"
---

**Home Assistant auf dem Raspberry Pi 5** einzurichten ist 2026 mit dem **Raspberry Pi Imager** und optionalem **NVMe-Boot** gut machbar. Diese Anleitung führt von der Hardware bis zur ersten Automatisierung — **ohne feste Preisangaben** (beim Händler prüfen).

## Hardware (Preise beim Händler prüfen)

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Komponente</th>
<th scope="col">Hinweis</th>
</tr></thead><tbody>
<tr>
<td data-label="Komponente"><span class="td-val"><strong>Raspberry Pi 5</strong> 4 GB</span></td>
<td data-label="Hinweis"><span class="td-val">für die meisten Installationen</span></td>
</tr>
<tr>
<td data-label="Komponente"><span class="td-val"><strong>Pi 5</strong> 8 GB</span></td>
<td data-label="Hinweis"><span class="td-val">viele Kameras, Frigate, große Installation</span></td>
</tr>
<tr>
<td data-label="Komponente"><span class="td-val"><strong>Offizielles 27-W-USB-C-Netzteil</strong></span></td>
<td data-label="Hinweis"><span class="td-val">Unterspannung vermeidet Abstürze</span></td>
</tr>
<tr>
<td data-label="Komponente"><span class="td-val"><strong>microSD</strong> (32–64 GB, hochwertig) oder <strong>NVMe + M.2 HAT</strong></span></td>
<td data-label="Hinweis"><span class="td-val">NVMe langlebiger bei vielen Schreibvorgängen</span></td>
</tr>
<tr>
<td data-label="Komponente"><span class="td-val"><strong>Gehäuse mit Lüfter</strong></span></td>
<td data-label="Hinweis"><span class="td-val">Pi 5 wird warm</span></td>
</tr>
<tr>
<td data-label="Komponente"><span class="td-val"><strong>Ethernet</strong></span></td>
<td data-label="Hinweis"><span class="td-val">WLAN möglich, Ethernet stabiler (wichtig neben Zigbee 2,4 GHz)</span></td>
</tr>
<tr>
<td data-label="Komponente"><span class="td-val"><strong>SONOFF ZBDongle-E</strong> (optional)</span></td>
<td data-label="Hinweis"><span class="td-val">Zigbee für Sensoren/Steckdosen — <a href="/de/smart-home/bester-zigbee-stick-home-assistant/">Vergleich</a></span></td>
</tr>
</tbody>
</table>
</div>

Links: [Raspberry Pi 5 bei Amazon.de](https://www.amazon.de/s?k=Raspberry+Pi+5&tag=roboteducat00-21), [ZBDongle-E](https://www.amazon.de/dp/B0B6P22YJC?tag=roboteducat00-21) (Werbelinks).

Alternativ fertige Box: [Home Assistant Green vs. Pi 5](/de/smart-home/home-assistant-green-vs-raspberry-pi-5/).

## Schritt 1: Imager (SD oder NVMe)

1. [Raspberry Pi Imager](https://www.raspberrypi.com/software/) installieren
2. Gerät: **Raspberry Pi 5**
3. OS: **Other → Home Assistant**
4. Speicher: SD-Karte oder NVMe (USB-Adapter zum Flashen)
5. Erweiterte Optionen: Hostname `homeassistant`, **Locale** `Europe/Berlin`, Tastatur `de`, WLAN nur wenn kein Ethernet
6. Schreiben, SD/NVMe einsetzen

NVMe-Boot: Firmware des Pi 5 muss aktuell sein — [Pi-Dokumentation](https://www.raspberrypi.com/documentation/computers/raspberry-pi.html#nvme-ssd-boot).

## Schritt 2: Erster Start

Ethernet an Router (Fritzbox, Speedport, …), Strom an. Erster Boot kann **5–8 Minuten** dauern.

Browser: **`http://homeassistant.local:8123`** — sonst IP in der Router-Oberfläche suchen.

Konto anlegen, Hausname, **Karte für Standort** (Sonnenauf-/untergang), Zeitzone **Europe/Berlin**, Einheiten metrisch, Währung EUR.

## Schritt 3: Updates und Backup

*Einstellungen → System → Updates* — Core, Supervisor, OS installieren.

*Einstellungen → System → Sicherungen* — erste **Vollständige Sicherung** erstellen und extern sichern.

## Schritt 4: HACS (optional)

Terminal-Add-on → `wget -O - https://get.hacs.xyz | bash -` → Neustart → Integration **HACS** mit GitHub-Konto.

## Schritt 5: ZHA und erster Zigbee-Sensor

Stick einstecken (USB-Verlängerung). Integration **ZHA** hinzufügen, Port `/dev/ttyUSB0` oder `/dev/ttyACM0`, Radio **EZSP** für ZBDongle-E.

Sensor koppeln (z. B. [SNZB-02D](/de/smart-home/zigbee-temperatursensor/)): Pairing-Modus, Taste am Sensor.

Mehr Details: [Zigbee2MQTT oder ZHA](/de/smart-home/zigbee2mqtt-oder-zha-home-assistant/).

## Schritt 6: Nützliche Add-ons

- **File editor** oder **Studio Code Server** — YAML bearbeiten
- **ESPHome** — [ESP32-Projekte](/de/smart-home/esp32-esphome-temperatursensor/)
- **Terminal & SSH**
- **Samba share** — Dateien im Netzwerk

## Schritt 7: Erste Automatisierung

Beispiel: Steckdose für Zusatzheizung ein, wenn Temperatur < 19 °C (nur tagsüber). **Nennlast** der Schuko-Steckdose beachten.

## Fernzugriff (Sicherheit)

- **Nabu Casa** — einfach, kostenpflichtig ([nabucasa.com](https://www.nabu.casa/))
- **Tailscale** — VPN ohne Port-Forwarding (empfohlen für Sicherheit)
- **DuckDNS + Let's Encrypt** — gratis, erfordert Port-Forwarding (Risiko)

Kein ungeschütztes Port-Forwarding auf Port 8123.

## Typische Probleme

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Symptom</th>
<th scope="col">Lösung</th>
</tr></thead><tbody>
<tr>
<td data-label="Symptom"><span class="td-val">Grüne LED blinkt 4×</span></td>
<td data-label="Lösung"><span class="td-val">SD/NVMe-Boot, Netzteil 27 W, Image neu flashen</span></td>
</tr>
<tr>
<td data-label="Symptom"><span class="td-val"><code>homeassistant.local</code> geht nicht</span></td>
<td data-label="Lösung"><span class="td-val">IP nutzen; unter Windows ggf. Bonjour</span></td>
</tr>
<tr>
<td data-label="Symptom"><span class="td-val">Freezes</span></td>
<td data-label="Lösung"><span class="td-val">Offizielles Netzteil, Temperatur, SD → NVMe</span></td>
</tr>
<tr>
<td data-label="Symptom"><span class="td-val">Zigbee-Stick unsichtbar</span></td>
<td data-label="Lösung"><span class="td-val">Anderen USB-Port, direkt am Pi (kein unversorgter Hub)</span></td>
</tr>
</tbody>
</table>
</div>

## Weiterführende Tutorials am Pi

- [CO₂ SCD41 + MQTT](/de/smart-home/raspberry-pi-co2-scd41-home-assistant/)
- [Wetterstation BME280](/de/smart-home/raspberry-pi-wetterstation-bme280/)
- [PIR + Licht](/de/smart-home/raspberry-pi-bewegungsmelder-beleuchtung/)
- [Türsensor + Benachrichtigung](/de/smart-home/raspberry-pi-tuersensor-benachrichtigung/)
- [Notstrom / USV](/de/smart-home/home-assistant-notstrom-usv/)

Erste WLAN-Geräte ohne Tüfteln: [Shelly Steckdosen (EU/Schuko)](https://www.shelly.com/collections/smart-plugs) in der passenden Länderversion.

[Alle Smart-Home-Ratgeber](/de/smart-home/)
