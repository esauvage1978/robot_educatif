---
layout: ../../../layouts/DePost.astro
title: "Garagentor per Smartphone: ESP32, ESPHome und Home Assistant"
description: "Sicherer Anleitung: Relais am Taster-Eingang der Torantrieb-Niederspannung, Reed-Kontakt, Cover in der HA-App — keine 230-V-Arbeiten, Bestätigung vor Öffnen."
updated: "24. Oktober 2026"
---

Das Garagentor vom Handy öffnen und **sehen, ob es offen steht**, ist eines der nützlichsten Projekte. Prinzip: **Relais parallel zum Wandtaster** (Kurzimpuls wie Fingerdruck) plus **Reed-Kontakt** für zu/offen — Anzeige als Garagentor in Home Assistant.

## Sicherheit zuerst

- In der **Bedienungsanleitung des Antriebs** muss ein Eingang **Taster / potentialfreier Kontakt / Schritt** existieren. Sonst abbrechen.
- **230 V der Antriebsversorgung** nur durch Elektrofachkraft — hier nur **Niederspannungs-Tasterklemmen**.
- Sicherheitsfunktionen ( Lichtschranke, Aufschlag-Erkennung) **nie überbrücken**.
- Fernzugriff: **VPN (Tailscale)** oder Home Assistant Cloud, **2FA** — kein offenes HA im Internet.
- **Bestätigung in der App** vor Öffnen; nur auslösen, wenn unter dem Tor niemand stehen kann.

## Ablauf (Kurz)

1. Taster-Klemmen in der Anleitung finden
2. Antrieb spannungsfrei schalten (Hauptschalter)
3. ESPHome flashen, Relais + Reed verdrahten
4. Test mit Wandtaster, dann per HA
5. Automatisierung „offen geblieben“

Dauer: etwa 2–3 h, Niveau: mittel. **Keine Preise** — ESP32, Relais (3,3-V-Steuerung!) und Reed sind Standardteile ([ESP32](https://www.amazon.de/s?k=ESP32+DevKit&tag=roboteducat00-21), [Reed Garagentor](https://www.amazon.de/s?k=Reed+Kontakt+Garage&tag=roboteducat00-21), Werbelinks).

## Material

- ESP32 DevKit
- Relais 1 Kanal, **Steuerung 3,3 V** zuverlässig (Datenblatt lesen)
- Reed-Kontakt mit Magnet
- USB-Netzteil 5 V

Alternative: Shelly mit **Trockenkontakt** laut Hersteller — gleiche Taster-Parallelschaltung.

## Verdrahtung

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Element</th>
<th scope="col">Anschluss</th>
</tr></thead><tbody>
<tr>
<td data-label="Element"><span class="td-val">Relais IN</span></td>
<td data-label="Anschluss"><span class="td-val">GPIO26</span></td>
</tr>
<tr>
<td data-label="Element"><span class="td-val">Relais COM/NO</span></td>
<td data-label="Anschluss"><span class="td-val">parallel zum Wandtaster (potentialfrei)</span></td>
</tr>
<tr>
<td data-label="Element"><span class="td-val">Reed</span></td>
<td data-label="Anschluss"><span class="td-val">GPIO27 und GND (Pull-up, Reed bei „Tor zu“ geschlossen)</span></td>
</tr>
</tbody>
</table>
</div>

Impulsdauer **0,5–1 s** — Wert aus Antriebsanleitung.

## ESPHome

Vollständiges Beispiel-YAML liegt im Repository unter `/code/esphome/porte-garage.yaml` (Französischer Pfad — gleiche Logik). Kern:

- `switch` mit Impuls, `restore_mode: ALWAYS_OFF`
- `cover` template mit `open_action` → Script Impuls
- Reed als `binary_sensor` „Tor geschlossen“

Nach Flash: Gerät in HA, Karte mit **Bestätigung** für `cover.open`.

## Automatisierung „Tor offen“

Benachrichtigung aufs Handy, wenn Reed länger als X Minuten „offen“ meldet.

Details ESPHome: [Temperatur-Tutorial](/de/smart-home/esp32-esphome-temperatursensor/), [Projektideen](/de/smart-home/esp32-smart-home-projektideen/).

[Alle Smart-Home-Ratgeber](/de/smart-home/)
