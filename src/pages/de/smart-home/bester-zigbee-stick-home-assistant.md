---
layout: ../../../layouts/DePost.astro
title: "Bester Zigbee-Stick für Home Assistant (2026) im Vergleich"
description: "SONOFF ZBDongle-E, Home Assistant Connect ZBT-2, SONOFF Dongle Lite MG21 oder ConBee II? Chips, Thread-Unterstützung, Kompatibilität mit ZHA und Zigbee2MQTT im Vergleich."
updated: "22. Oktober 2026"
---

Um Zigbee-Geräte aus **Home Assistant** zu steuern, brauchen Sie einen **Zigbee-Koordinator**: einen USB-Stick mit Funkchip. Zigbee funkt **weltweit auf 2,4 GHz**, dieselben Sticks funktionieren also in Deutschland, Österreich und der Schweiz; nur Händler und Lagerbestand ändern sich. Die Tabelle listet Chips und Funktionen laut Herstellerseiten; wir haben die Reichweite nicht selbst gemessen und nennen daher keine Reichweitenwerte.

## 1. Vergleichstabelle

| Modell | Chip | Antenne | Thread / Matter | ZHA | Zigbee2MQTT | Ideal für |
|---|---|---|---|---|---|---|
| **SONOFF ZBDongle-E** | Silicon Labs EFR32MG21 | extern | nicht standardmäßig (Zigbee-Firmware) | ja | ja | die meisten: gut dokumentiert |
| **Home Assistant Connect ZBT-2** | Silicon Labs MG24 | intern, in optimiertem Gehäuse | ja (Thread-Firmware wählbar) | ja | ja | offizieller Support von Nabu Casa, Thread-fähig |
| **SONOFF Dongle Lite MG21** | Silicon Labs EFR32MG21 | intern | nicht standardmäßig | ja | ja | kleinstes Budget, kleine Wohnungen |
| **ConBee II** (dresden elektronik) | deCONZ-Firmware | intern | nein | ja | ja | wer bereits deCONZ / Phoscon nutzt |

Offizielle Seiten: [SONOFF ZBDongle-E](https://sonoff.tech/products/sonoff-zigbee-3-0-usb-dongle-plus-zbdongle-e), [Home Assistant Connect ZBT-2](https://www.home-assistant.io/connect/zbt-2/), [ConBee II](https://phoscon.de/en/conbee2) (dresden elektronik ist ein Hersteller aus Dresden). Preise ändern sich oft: Preis prüfen beim Händler.

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
