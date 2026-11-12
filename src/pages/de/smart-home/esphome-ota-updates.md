---
layout: ../../../layouts/DePost.astro
title: ESPHome-OTA-Updates ohne Kabel
description: "ESP32 per WLAN aktualisieren: OTA, Passwort, Home Assistant, Safe Mode und typische Fehler beheben. Material, GPIO-Plan, ESPHome-YAML und Home Assistant."
updated: "30. Oktober 2026"
---

**OTA** steht für „Over The Air“, wörtlich „über die Luft“: das Programm eines ESP32, einer kleinen Elektronikplatine mit WLAN, über das Funknetz aktualisieren, ohne die Platine von der Wand abzustecken oder zum Rechner zurückzubringen, um ein USB-Kabel anzuschließen. Bei einem Sensor im Zwischendeckenraum, einem Wandtablet oder einem Magnetventil im Garten macht das die Wartung erst praktikabel: Sie ändern Ihre Konfigurationsdatei (das YAML) bequem vom Sofa aus, und die Platine aktualisiert sich selbst.

**Erwartetes Ergebnis:** Eine neue YAML-Version ohne Kabel installiert und ein Wiederherstellungsweg, falls etwas schiefgeht. **Dauer:** 10 Minuten. **Schwierigkeit:** Einsteiger.

## Voraussetzungen

- Ein Gerät, das bereits einmal per USB mit einem YAML samt `ota:`-Block geflasht wurde ([erstes Flashen](/de/smart-home/esp32-esphome-flashen/)).
- Das Gerät ist eingeschaltet, im WLAN und in ESPHome sichtbar (Kennzeichnung „Online“).
- Ein Rechner oder Home Assistant im selben lokalen Netz.

## OTA im YAML aktivieren

Die Konfigurationen dieser Seite enthalten diesen Block bereits:

```yaml
ota:
  - platform: esphome
    password: !secret ota_password

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
  ap:
    ssid: "mein-geraet Fallback"
    password: !secret ap_password

captive_portal:
```

Das Passwort hindert jede andere Maschine im Netz daran, Ihrer Platine ein Programm zu schicken. Die Blöcke `ap` und `captive_portal` erzeugen ein Notfall-WLAN, falls die Platine das gewohnte Netz nicht findet: siehe Abschnitt Wiederherstellung.

## Aus dem ESPHome Device Builder aktualisieren

1. Die YAML-Datei des Geräts bearbeiten, zum Beispiel ein Messintervall ändern.
2. **Install** klicken (oder **⋮ → Install**).
3. **Wirelessly** wählen.
4. Kompilierung und Upload abwarten: Ein Fortschrittsbalken erscheint, dann startet die Platine neu.

Auf der Kommandozeile bietet `esphome run mein-geraet.yaml` dieselbe Auswahl und findet das Gerät im Netz.

**Prüfung:** In den Logs verbindet sich die Platine erneut mit dem WLAN und dann mit Home Assistant. Unter **Einstellungen → Geräte & Dienste** ist die ESPHome-Version des Geräts auf seiner Seite aktualisiert.

## Was tun, wenn OTA scheitert?

Die Platine lässt sich fast immer ohne Kabel retten:

- **Safe Mode:** Startet die Platine mehrmals hintereinander (standardmäßig 10-mal) nicht korrekt, aktiviert ESPHome einen Minimalmodus, der nur OTA annimmt. Das YAML korrigieren und drahtlos neu installieren.
- **Notfall-WLAN:** Wird das gewohnte Netz nicht gefunden, mit dem „Fallback“-WLAN der Platine und dem Passwort `ap_password` verbinden. Die Portalseite erlaubt, ein Netz zu wählen oder eine `.bin`-Datei hochzuladen.
- **Letzter Ausweg:** per USB neu flashen ([Tutorial](/de/smart-home/esp32-esphome-flashen/)).

## Häufige Probleme

| Symptom | Wahrscheinliche Ursache | Lösung |
|---|---|---|
| „Error resolving IP address“ | Der `.local`-Name wird nicht aufgelöst (mDNS) | `use_address: 192.168.x.x` unter `wifi:` ergänzen und diese IP im Router reservieren |
| Passwort abgelehnt | Das Passwort wurde im YAML geändert | Einmal per USB mit dem neuen Passwort neu flashen |
| Upload bricht ab | Schwaches WLAN-Signal | Platine näher an den Router bringen, erneut versuchen |
| Gerät „Offline“ | Ohne Strom oder in einem anderen Netz | Stromversorgung und WLAN prüfen |
| Kompiliert, aber nichts wird gesendet | Firewall oder VLAN zwischen Rechner und Platine | Port 3232 zwischen beiden freigeben |

## Sicherheit: bewährte Praxis

Ein OTA-Passwort beibehalten, es nie ins Internet freigeben (Port 3232 darf nie vom Router weitergeleitet werden) und den API-Verschlüsselungsschlüssel sicher aufbewahren. ESPHome regelmäßig aktualisieren: Jede Version listet ihre Änderungen im [Changelog](https://esphome.io/changelog/). Nach einem Versionssprung die Breaking Changes lesen, bevor Sie Geräte neu installieren.

Weiter: [ESP32-Projekte Schritt für Schritt](/de/smart-home/esp32-smart-home-projektideen/) und [GPIO-Grundlagen der Verkabelung](/de/smart-home/esp32-verkabelung-gpio-grundlagen/).

<small>Aktualisiert am 30. Oktober 2026. Quelle: [ESPHome-Dokumentation, OTA-Plattform](https://esphome.io/components/ota/esphome/). Standardwerte können sich zwischen Versionen ändern.</small>
