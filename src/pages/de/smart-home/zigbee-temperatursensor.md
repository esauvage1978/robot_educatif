---
layout: ../../../layouts/DePost.astro
title: "Zigbee-Temperatursensor für Home Assistant: SNZB-02D, Aqara & Co."
description: "Temperatur- und Luftfeuchte-Sensoren Zigbee 3.0 für ZHA und Zigbee2MQTT: Genauigkeit, Batterie, Platzierung, Heiz-Automatisierung — Schuko-Mesh."
updated: "2. November 2026"
---

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/de/smart-home/">Smart Home</a> · Zigbee-Temperatursensor</nav>

> **Kurzantwort (November 2026)** — Für die meisten Wohnungen: **SONOFF SNZB-02D** (LCD, ±0,2 °C laut Hersteller, CR2450 ~2 Jahre). Luftdruck oder E-Ink? **Aqara T1**. Mindestbudget ohne Display: **Tuya TS0201**.

Diese Seite gehört zum [Smart-Home-Hub](/de/smart-home/). **Zigbee** = Funk-Mesh 2,4 GHz mit geringem Stromverbrauch; **Home Assistant (HA)** = lokale Automatisierung; **ZHA** = Zigbee-Integration in HA.

Ein **Zigbee-Temperatursensor** überwacht Räume, steuert Heizung und warnt bei trockener Luft oder Frost. Vergleich gängiger Modelle — **Preise nicht fest**, beim Händler prüfen (Amazon.de, Fachhandel).

![SONOFF SNZB-02D Zigbee Temperatur- und Luftfeuchtesensor mit LCD](/images/products/sonoff-snzb-02d.webp)

*Produktfoto: SONOFF SNZB-02D (typische Verpackung).*

## Empfehlung: SONOFF SNZB-02D

- **LCD** mit Temperatur und Luftfeuchte  
- Genauigkeit laut Hersteller ±0,2 °C, ±2 % rF  
- Batterie CR2450, Laufzeit laut Hersteller bis ca. 2 Jahre  
- Min/Max der letzten 24 h auf dem Display  
- ZHA und Zigbee2MQTT  

[SONOFF SNZB-02D bei Amazon.de](https://www.amazon.de/dp/B0BYZP8NK2?tag=roboteducat00-21) (Werbelink)

## Kurzvergleich

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Modell</th>
<th scope="col">Anzeige</th>
<th scope="col">Genauigkeit (Hersteller)</th>
<th scope="col">Batterie</th>
<th scope="col">Für wen</th>
</tr></thead><tbody>
<tr>
<td data-label="Modell"><span class="td-val"><strong>SONOFF SNZB-02D</strong></span></td>
<td data-label="Anzeige"><span class="td-val">LCD</span></td>
<td data-label="Genauigkeit (Hersteller)"><span class="td-val">±0,2 °C</span></td>
<td data-label="Batterie"><span class="td-val">CR2450, ~2 Jahre</span></td>
<td data-label="Für wen"><span class="td-val">bester Allrounder</span></td>
</tr>
<tr>
<td data-label="Modell"><span class="td-val"><strong>Aqara T1</strong></span></td>
<td data-label="Anzeige"><span class="td-val">E-Ink</span></td>
<td data-label="Genauigkeit (Hersteller)"><span class="td-val">±0,3 °C</span></td>
<td data-label="Batterie"><span class="td-val">CR2032</span></td>
<td data-label="Für wen"><span class="td-val">Design, optional Luftdruck</span></td>
</tr>
<tr>
<td data-label="Modell"><span class="td-val"><strong>SONOFF SNZB-02P</strong></span></td>
<td data-label="Anzeige"><span class="td-val">nein</span></td>
<td data-label="Genauigkeit (Hersteller)"><span class="td-val">±0,4 °C</span></td>
<td data-label="Batterie"><span class="td-val">CR2477</span></td>
<td data-label="Für wen"><span class="td-val">günstiger ohne Display</span></td>
</tr>
<tr>
<td data-label="Modell"><span class="td-val"><strong>Tuya TS0201</strong></span></td>
<td data-label="Anzeige"><span class="td-val">nein</span></td>
<td data-label="Genauigkeit (Hersteller)"><span class="td-val">±0,5 °C</span></td>
<td data-label="Batterie"><span class="td-val">2× AAA</span></td>
<td data-label="Für wen"><span class="td-val">Minimalbudget</span></td>
</tr>
<tr>
<td data-label="Modell"><span class="td-val"><strong>Aqara FP2</strong></span></td>
<td data-label="Anzeige"><span class="td-val">nein</span></td>
<td data-label="Genauigkeit (Hersteller)"><span class="td-val">±0,5 °C (Nebenfunktion)</span></td>
<td data-label="Batterie"><span class="td-val">USB-C</span></td>
<td data-label="Für wen"><span class="td-val">mmWave-Präsenz + Klima</span></td>
</tr>
</tbody>
</table>
</div>

## Auswahl

**Display nötig?** SNZB-02D oder Aqara T1. Nur App/HA: SNZB-02P oder Tuya.

**Genauigkeit:** ±0,2 °C für Babyzimmer oder feine Heizregelung; ±0,5 °C reicht oft für Schwellen wie „unter 19 °C einschalten“.

**Anzahl:** grob ein Sensor pro beheiztem Raum — nicht nötig in WC und kurzen Fluren.

## Platzierung

- Mitte des Raums, 1,2–1,8 m Höhe, nicht in direkter Sonne  
- Nicht über Heizkörper oder am Fenster  
- Bad: hohe Luftfeuchte kann Sensoren stressen — eher außerhalb oder gut lüften  

**Reichweite:** 10–15 m indoor; bei Abstand Zigbee-**Steckdosen (Schuko)** als Repeater: [smarte Steckdosen](/de/smart-home/smarte-steckdosen/), [Zigbee-Stick](/de/smart-home/bester-zigbee-stick-home-assistant/).

## ZHA koppeln (Schritt für Schritt)

1. Home Assistant → **Zigbee (ZHA) → Gerät hinzufügen**  
2. Batterie einlegen, Taste **5 s** gedrückt halten bis LED blinkt  
3. Gerät benennen und **Bereich** zuweisen  

Entitäten: Temperatur, Luftfeuchte, Batterie.

## Automatisierung: Heizung unter 19 °C

automation:
  - alias: "Heizung Wohnzimmer unter 19°C"
    trigger:
      - platform: numeric_state
        entity_id: sensor.snzb_02d_wohnzimmer_temperature
        below: 19
    condition:
      - condition: time
        after: "06:00"
        before: "22:00"
    action:
      - service: switch.turn_on
        target:
          entity_id: switch.steckdose_heizluefter_wohnzimmer

Nur Geräte mit passender **Nennlast** an Schuko-Steckdosen; Dauerheizung über Thermostat oder Fachkraft.

## FAQ

**Zigbee oder Wi-Fi-Sensor?**  
Zigbee: Knopfzelle, Mesh, lokal. Wi-Fi: oft cloud-abhängig.

**Brauche ich Zigbee2MQTT?**  
Nein für den Einstieg — **ZHA** reicht. Details: [Zigbee2MQTT oder ZHA](/de/smart-home/zigbee2mqtt-oder-zha-home-assistant/).

**ESP32 selbst bauen?**  
Günstiger, aber mit Kabel: [ESP32-Temperatur](/de/smart-home/esp32-esphome-temperatursensor/).

Weitere Sensoren: [PIR-Beleuchtung](/de/smart-home/raspberry-pi-bewegungsmelder-beleuchtung/), [Protokolle](/de/smart-home/smart-home-protokolle-zigbee-wifi-thread-matter/).

[Alle Smart-Home-Ratgeber](/de/smart-home/)
