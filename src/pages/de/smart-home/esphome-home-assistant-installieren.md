---
layout: ../../../layouts/DePost.astro
title: ESPHome in Home Assistant installieren
description: "ESPHome Device Builder: Add-on, secrets.yaml, Schlüssel, erstes ESP32-C6 und Einbindung in Home Assistant. Material, GPIO-Plan, ESPHome-YAML und Home Assis"
updated: "30. Oktober 2026"
---

**ESPHome** ist eine Software, die aus einer ESP32-Platine, einer kleinen Elektronikplatine mit WLAN, ein Smart-Home-Gerät macht: Sie beschreiben in einer einfachen Konfigurationsdatei namens YAML, was die Platine tun soll, und ESPHome erzeugt daraus das Programm der Platine, ohne dass Sie Code schreiben. In Home Assistant, der freien Software, die Ihre vernetzten Geräte vereint, liefert das Add-on **ESPHome Device Builder** den Editor, den Compiler (das Werkzeug, das das Programm erstellt) und das Update-Werkzeug. Einmal installiert, dient es allen Ihren ESP32-Projekten.

**Erwartetes Ergebnis:** ESPHome in der Seitenleiste, eine `secrets.yaml`-Datei und ein erstes, flashbereites Gerät. **Dauer:** 20 Minuten. **Schwierigkeit:** Einsteiger.

## Welche Installationsmethode?

Add-ons gibt es nur bei **Home Assistant OS** (Green, Yellow, Raspberry Pi, virtuelle Maschine) und **Supervised**. Bei einer Installation als **Container** oder **Core** wird ESPHome separat installiert, wie unten beschrieben. Wenn Sie Ihre Variante nicht kennen: **Einstellungen → System → Info** öffnen, die Zeile „Installationsart“ nennt sie.

## Methode A: Add-on (Home Assistant OS)

1. **Einstellungen → Add-ons** öffnen, dann unten rechts **Add-on-Store**.
2. Nach **ESPHome Device Builder** suchen und auf **Installieren** klicken.
3. Nach der Installation **In der Seitenleiste anzeigen** aktivieren und **Starten** klicken.
4. **ESPHome** in der Seitenleiste öffnen: Das Dashboard erscheint, zunächst leer.

**Prüfung:** Das ESPHome-Dashboard lädt ohne Fehler und zeigt die Schaltfläche **+ New Device**.

## Methode B: Container oder Core

Ohne Add-ons installieren Sie ESPHome auf einem beliebigen Linux-, macOS- oder Windows-Rechner mit Python:

```bash
pip install esphome
esphome dashboard config/
```

Das Dashboard öffnet sich dann unter `http://localhost:6052`. Es gibt auch ein offizielles Docker-Image (`ghcr.io/esphome/esphome`, mit `--net=host`, damit die Netzwerkerkennung funktioniert): Folgen Sie der [ESPHome-Installationsdokumentation](https://esphome.io/guides/installing_esphome/).

## Die Datei secrets.yaml vorbereiten

In ESPHome oben rechts auf **Secrets** klicken. Diese Datei hält Ihre Passwörter aus den Gerätedateien heraus, sodass Sie diese teilen können, ohne etwas preiszugeben:

```yaml
wifi_ssid: "NameIhresNetzwerks"
wifi_password: "wlan-passwort"
ap_password: "notfall-passwort"
api_encryption_key: "ERZEUGTEN-SCHLUESSEL-EINFUEGEN"
ota_password: "ota-passwort"
```

Den Verschlüsselungsschlüssel mit `openssl rand -base64 32` erzeugen (oder mit einem beliebigen Generator für 32 Byte in Base64). Ihr Netzwerk muss **2,4 GHz** bieten: Der ESP32-C6 verbindet sich nicht mit einem reinen 5-GHz-Netz. Diese Datei niemals veröffentlichen.

## Das erste Gerät anlegen

1. **+ New Device** klicken, dann **Continue**.
2. Einen Namen in Kleinbuchstaben ohne Leerzeichen vergeben, zum Beispiel `test-esp32`, und bestätigen.
3. **ESP32-C6** als Platinentyp wählen. Der Assistent legt die Gerätedatei an; das Installationsfenster vorerst schließen, ohne zu flashen.
4. **Edit** klicken und den Inhalt durch eine minimale Basis ersetzen:

```yaml
esphome:
  name: test-esp32

esp32:
  board: esp32-c6-devkitc-1
  framework:
    type: esp-idf

logger:

api:
  encryption:
    key: !secret api_encryption_key

ota:
  - platform: esphome
    password: !secret ota_password

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
  ap:
    ssid: "test-esp32 Fallback"
    password: !secret ap_password

captive_portal:
```

**Validate** klicken: Die Meldung „Configuration is valid“ bestätigt die Syntax. Diese Datei wurde für diesen Artikel nicht auf einer Platine ausgeführt; sie folgt der Standardstruktur der ESPHome-Dokumentation.

## Flashen und das Gerät in Home Assistant übernehmen

Das erste Flashen läuft per USB-Kabel: Folgen Sie [ESP32 mit ESPHome flashen](/de/smart-home/esp32-esphome-flashen/). Danach erkennt Home Assistant das Gerät: **Einstellungen → Geräte & Dienste** öffnen, bei der gefundenen ESPHome-Karte auf **Konfigurieren** klicken und den Verschlüsselungsschlüssel einfügen. Spätere Updates laufen [ohne Kabel per OTA](/de/smart-home/esphome-ota-updates/).

## Häufige Probleme

| Symptom | Wahrscheinliche Ursache | Lösung |
|---|---|---|
| Das ESPHome-Add-on fehlt | Installation als Container oder Core | Methode B nutzen |
| „Invalid key“ bei der Übernahme | Schlüssel weicht vom YAML ab | Den exakten Wert von `api_encryption_key` kopieren |
| Sehr lange Kompilierung | Erster Build, leerer Cache | Abwarten: Spätere gehen schneller |
| Fehler „secret not defined“ | Eintrag fehlt in `secrets.yaml` | Fehlende Zeile ergänzen |
| Gerät wird nie gefunden | 5-GHz-WLAN, getrenntes VLAN oder blockiertes mDNS | 2,4 GHz und dasselbe Netz wie Home Assistant nutzen |

Weiter: ein [ESP32-Projekt](/de/smart-home/esp32-smart-home-projektideen/) wählen und die [GPIO-Grundlagen der Verkabelung](/de/smart-home/esp32-verkabelung-gpio-grundlagen/) prüfen.

<small>Aktualisiert am 30. Oktober 2026. Quellen: [ESPHome-Dokumentation](https://esphome.io/) und [Home-Assistant-Dokumentation](https://www.home-assistant.io/). Menünamen in Ihrer Version prüfen.</small>
