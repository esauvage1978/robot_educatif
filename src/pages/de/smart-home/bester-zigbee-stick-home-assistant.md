---
layout: ../../../layouts/DePost.astro
title: "Bester Zigbee-Stick für Home Assistant (2026) im Vergleich"
description: "SONOFF ZBDongle-E, Home Assistant Connect ZBT-2, SONOFF Dongle Lite MG21 oder ConBee II? Chips, Thread-Unterstützung, Kompatibilität mit ZHA und Zigbee2MQTT im Vergleich."
updated: "22. Oktober 2026"
---

Um Zigbee-Geräte aus **Home Assistant** zu steuern, brauchen Sie einen **Zigbee-Koordinator**: einen USB-Stick mit Funkchip. Zigbee funkt **weltweit auf 2,4 GHz**, dieselben Sticks funktionieren also in Deutschland, Österreich und der Schweiz; nur Händler und Lagerbestand ändern sich. Die Tabelle listet Chips und Funktionen laut Herstellerseiten; wir haben die Reichweite nicht selbst gemessen und nennen daher keine Reichweitenwerte.

## 1. Vergleichstabelle

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Modell</th>
<th scope="col">Chip</th>
<th scope="col">Antenne</th>
<th scope="col">Thread / Matter</th>
<th scope="col">ZHA</th>
<th scope="col">Zigbee2MQTT</th>
<th scope="col">Ideal für</th>
</tr></thead><tbody>
<tr>
<td data-label="Modell"><span class="td-val"><strong><a href="/de/marke-sonoff/">SONOFF</a> ZBDongle-E</strong></span></td>
<td data-label="Chip"><span class="td-val">Silicon Labs EFR32MG21</span></td>
<td data-label="Antenne"><span class="td-val">extern</span></td>
<td data-label="Thread / Matter"><span class="td-val">nicht standardmäßig (Zigbee-Firmware)</span></td>
<td data-label="ZHA"><span class="td-val">ja</span></td>
<td data-label="Zigbee2MQTT"><span class="td-val">ja</span></td>
<td data-label="Ideal für"><span class="td-val">die meisten: gut dokumentiert</span></td>
</tr>
<tr>
<td data-label="Modell"><span class="td-val"><strong>Home Assistant Connect ZBT-2</strong></span></td>
<td data-label="Chip"><span class="td-val">Silicon Labs MG24</span></td>
<td data-label="Antenne"><span class="td-val">intern, in optimiertem Gehäuse</span></td>
<td data-label="Thread / Matter"><span class="td-val">ja (Thread-Firmware wählbar)</span></td>
<td data-label="ZHA"><span class="td-val">ja</span></td>
<td data-label="Zigbee2MQTT"><span class="td-val">ja</span></td>
<td data-label="Ideal für"><span class="td-val">offizieller Support von Nabu Casa, Thread-fähig</span></td>
</tr>
<tr>
<td data-label="Modell"><span class="td-val"><strong>SONOFF Dongle Lite MG21</strong></span></td>
<td data-label="Chip"><span class="td-val">Silicon Labs EFR32MG21</span></td>
<td data-label="Antenne"><span class="td-val">intern</span></td>
<td data-label="Thread / Matter"><span class="td-val">nicht standardmäßig</span></td>
<td data-label="ZHA"><span class="td-val">ja</span></td>
<td data-label="Zigbee2MQTT"><span class="td-val">ja</span></td>
<td data-label="Ideal für"><span class="td-val">kleinstes Budget, kleine Wohnungen</span></td>
</tr>
<tr>
<td data-label="Modell"><span class="td-val"><strong>ConBee II</strong> (dresden elektronik)</span></td>
<td data-label="Chip"><span class="td-val">deCONZ-Firmware</span></td>
<td data-label="Antenne"><span class="td-val">intern</span></td>
<td data-label="Thread / Matter"><span class="td-val">nein</span></td>
<td data-label="ZHA"><span class="td-val">ja</span></td>
<td data-label="Zigbee2MQTT"><span class="td-val">ja</span></td>
<td data-label="Ideal für"><span class="td-val">wer bereits deCONZ / Phoscon nutzt</span></td>
</tr>
</tbody>
</table>
</div>

Offizielle Seiten: [SONOFF ZBDongle-E](https://sonoff.tech/products/sonoff-zigbee-3-0-usb-dongle-plus-zbdongle-e), [Home Assistant Connect ZBT-2](https://www.home-assistant.io/connect/zbt-2/), [ConBee II](https://phoscon.de/en/conbee2) (dresden elektronik ist ein Hersteller aus Dresden). Preise ändern sich oft: Preis prüfen beim Händler. Aktuelle Angebote: [SONOFF ZBDongle-E bei Amazon.de](https://www.amazon.de/s?k=SONOFF+ZBDongle-E&tag=roboteducat00-21) und [ConBee II bei Amazon.de](https://www.amazon.de/s?k=ConBee+II&tag=roboteducat00-21) (Werbelinks).

## 2. ZHA oder Zigbee2MQTT?

- **ZHA** ist in Home Assistant eingebaut: der einfachste Weg für Einsteiger.
- **Zigbee2MQTT** unterstützt eine sehr große Geräteliste und liefert mehr Details, braucht aber ein MQTT-Broker-Add-on.

Alle vier Sticks oben funktionieren mit beiden.

## 3. Tipps zur Einrichtung

1. Ein **USB-Verlängerungskabel** (etwa 1 m) verwenden, um den Stick vom Computer und von USB-3-Anschlüssen fernzuhalten, die 2,4 GHz stören.
2. Zigbee- und WLAN-Kanäle trennen (zum Beispiel Zigbee-Kanal 15, 20 oder 25).
3. Früh **Zigbee-Geräte mit Netzstrom** (Steckdosen) ergänzen: Sie arbeiten als Repeater und stärken das Mesh.

## 4. Wo kaufen?

Hardware von SONOFF und Home Assistant wird über offizielle Händler und große Online-Marktplätze auch im deutschsprachigen Raum verkauft. Verfügbarkeit vor der Bestellung auf den offiziellen Seiten oben prüfen.

Sie suchen eine Zentrale? Siehe [Home Assistant Green vs Raspberry Pi 5](/de/smart-home/home-assistant-green-vs-raspberry-pi-5/).

[Alle Smart-Home-Ratgeber](/de/smart-home/)
