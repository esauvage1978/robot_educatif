---
layout: ../../../layouts/DePost.astro
title: ESP32 mit ESPHome flashen (USB, Boot)
description: "Erstes Flashen eines ESP32-C6: USB, CP210x/CH340-Treiber, ESPHome Web, Boot-Modus und Verbindungsfehler. Material, GPIO-Plan, ESPHome-YAML und Home Assista"
updated: "30. Oktober 2026"
---

**Flashen** bedeutet, das Programm einer ESP32-Platine zum ersten Mal in ihren Speicher zu schreiben. Dieses erste Schreiben muss per USB-Kabel geschehen, denn eine neue Platine kennt weder Ihr WLAN noch ESPHome, die Software, die dieses Programm aus einer Konfigurationsdatei namens YAML erzeugt (ein einfacher Text, der beschreibt, was die Platine tun soll). Danach laufen alle Updates ohne Kabel übers Netzwerk, man spricht von [OTA-Updates](/de/smart-home/esphome-ota-updates/). Dieses Tutorial führt Sie Schritt für Schritt durch das erste Flashen mit einem ESP32-C6-DevKitC-1, einer kleinen Elektronikplatine mit WLAN, von einem Windows-, macOS- oder Linux-Rechner aus.

**Erwartetes Ergebnis:** Die Platine startet mit Ihrer Konfiguration, verbindet sich mit dem 2,4-GHz-WLAN und erscheint in Home Assistant. **Dauer:** 15 bis 30 Minuten. **Schwierigkeit:** Einsteiger.

![Espressif ESP32-C6-DevKitC-1: Modul ESP32-C6-WROOM-1, Anschlüsse UART und USB, Tasten BOOT und RESET](/images/products/esp32-c6-devkitc.webp)

Die Platine dieses Tutorials ist das **ESP32-C6-DevKitC-1**. Der Anschluss **UART** dient dem ersten Flash per Kabel; der Anschluss **USB** ist der native Port des Mikrocontrollers. Die beiden Tasten vorne sind **RESET** und **BOOT**.

## Was Sie vorab brauchen

- Eine ESP32-Platine (siehe [welche ESP32-Platine für Smart Home](/de/smart-home/welche-esp32-platine-smart-home/)) und ein **USB-C-Datenkabel**: Viele reine Ladekabel übertragen keine Daten – die häufigste Ursache für eine nicht gefundene Platine.
- ESPHome in Home Assistant ([ESPHome installieren](/de/smart-home/esphome-home-assistant-installieren/)) und eine YAML-Datei für das Gerät.
- Ein **Chrome- oder Edge-Browser** (Firefox und Safari unterstützen kein USB-Seriell im Browser).

## Schritt 1: Platine anschließen und ggf. Treiber installieren

Das ESP32-C6-DevKitC-1 hat zwei USB-C-Buchsen. Nutzen Sie die mit **UART** beschriftete: Sie läuft über einen USB-Seriell-Chip (CP210x auf der offiziellen Platine). Die andere, mit USB beschriftet, ist der native Anschluss des Mikrocontrollers.

Unter Windows 10 und 11 installiert sich der Treiber meist von selbst. Sonst den **CP210x**-Treiber von Silicon Labs installieren, oder den **CH340**-Treiber bei Platinen mit diesem Chip. Im Geräte-Manager unter „Anschlüsse (COM & LPT)“ muss ein COM-Port erscheinen. macOS bringt den Treiber oft mit. Unter Linux den Benutzer zur Gruppe `dialout` hinzufügen (`sudo usermod -a -G dialout $USER`) und sich neu anmelden.

**Prüfung:** Beim Ab- und Wiederanstecken erscheint in der Portliste eine Zeile und verschwindet wieder.

## Schritt 2: Flash-Datei erzeugen

Im ESPHome Device Builder auf der Karte Ihres Geräts das Menü **⋮ → Install** öffnen und **Manual download** wählen. Nach dem Kompilieren (beim ersten Mal einige Minuten) das **Factory format** wählen und die `.bin`-Datei speichern.

Ist Home Assistant per HTTPS geöffnet und die Platine am Rechner angeschlossen, der die Seite anzeigt, erspart die Option **Plug into the computer running ESPHome Dashboard** den Download. Über eine lokale Adresse mit reinem HTTP funktioniert sie nicht.

## Schritt 3: Mit ESPHome Web flashen

1. [web.esphome.io](https://web.esphome.io/) in Chrome oder Edge öffnen.
2. **Connect** klicken und den Port der Platine wählen (etwa „USB JTAG/serial“ oder „CP210x“).
3. **Install** klicken, die heruntergeladene `.bin`-Datei auswählen und bestätigen.
4. Das Ende des Schreibens abwarten: Die Seite zeigt den Fortschritt, dann eine Erfolgsmeldung.

**Schlägt die Verbindung fehl:** Die Platine in den Download-Modus versetzen. Die Taste **BOOT** gedrückt halten, kurz **RESET** (oder EN) drücken, BOOT loslassen und erneut versuchen.

## Schritt 4: Funktion prüfen

In ESPHome Web nach der Installation **Logs** öffnen: Die Startzeilen sollten die WLAN-Verbindung und dann die IP-Adresse zeigen. In Home Assistant **Einstellungen → Geräte & Dienste** öffnen: Das ESPHome-Gerät erscheint unter den gefundenen Geräten. **Konfigurieren** klicken und den API-Verschlüsselungsschlüssel aus Ihrem YAML eintragen.

## Häufige Probleme

| Symptom | Wahrscheinliche Ursache | Lösung |
|---|---|---|
| Kein Port in der Liste | Reines Ladekabel oder falscher USB-Port | Kabel wechseln, UART-Port nutzen |
| „Failed to connect“ | Platine nicht im Download-Modus | BOOT halten, RESET, BOOT loslassen |
| Schreiben abgebrochen | Unzuverlässiges Kabel oder USB-Hub | Direkt am Rechner anschließen |
| Platine startet in Schleife neu | Ungültige Konfiguration oder reservierter Pin | Logs lesen; siehe [GPIO-Verkabelung: Grundlagen](/de/smart-home/esp32-verkabelung-gpio-grundlagen/) |
| Keine WLAN-Verbindung | Nur-5-GHz-Netz oder falsches Passwort | 2,4 GHz nutzen, `secrets.yaml` prüfen |

## Wie geht es weiter?

Setzen Sie es mit einem [ESP32-Projekt Schritt für Schritt](/de/smart-home/esp32-smart-home-projektideen/) oder der vollständigen Anleitung zum [Temperatursensor](/de/smart-home/esp32-esphome-temperatursensor/) um. Offizielle Dokumentation: [ESPHome Web](https://web.esphome.io/) und die [ESPHome-Einstiegsanleitung](https://esphome.io/guides/getting_started_hassio/).

<small>Aktualisiert am 30. Oktober 2026. Menünamen in ESPHome und Home Assistant ändern sich: Prüfen Sie sie in Ihrer Version.</small>
