---
layout: ../../../layouts/DePost.astro
title: "PIR-Bewegungsmelder am Raspberry Pi: Licht über Home Assistant"
description: "HC-SR501 an GPIO, MQTT-Occupancy, Automatisierung für Zigbee-Lampen — ohne 230 V am Pi. Voraussetzungen, Schaltplan, FAQ."
updated: "3. November 2026"
---

<nav class="breadcrumb" aria-label="Brotkrumen"><a href="/de/smart-home/">Smart Home</a> · PIR + Beleuchtung</nav>

> **Kurzantwort (November 2026)** — Ein **PIR-Sensor HC-SR501** (passiver Infrarot-Bewegungsmelder) am **Raspberry Pi** meldet Anwesenheit per **MQTT** (Message Queuing Telemetry Transport — leichtes Nachrichtenprotokoll für IoT). **Home Assistant** (**HA**, lokale Smart-Home-Software) schaltet Ihre **Zigbee-** oder **WLAN-Lampen**. **Kein 230 V am Pi** — nur 5 V an GPIO. Dauer ca. 45 Min. mit Pi bereits eingerichtet. Hub: [Smart Home DE](/de/smart-home/).

Dieser Leitfaden gehört zum [Smart-Home-Hub](/de/smart-home/) und ergänzt [Türsensor-Benachrichtigung](/de/smart-home/raspberry-pi-tuersensor-benachrichtigung/) sowie [Home Assistant auf Pi 5](/de/smart-home/home-assistant-raspberry-pi-5-installation/).

Ca. 45 Min., Einsteiger mit laufendem Pi. <a href="/go/az-de-4b9e302936/" rel="nofollow sponsored noopener" target="_blank">HC-SR501 bei Amazon.de</a> (Werbelink).

![PIR Bewegungsmelder am Raspberry Pi — Illustration](/images/illustrations/raspberry-pi-detecteur-presence-pir-eclairage.webp)

<p><em>Illustration : PIR + Raspberry Pi + Home Assistant (Flurbeleuchtung).</em></p>

## Voraussetzungen (bitte vor dem Löten prüfen)

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Was</th>
<th scope="col">Warum</th>
</tr></thead><tbody>
<tr>
<td data-label="Was"><span class="td-val">Raspberry Pi 3/4/5 mit <strong>Raspberry Pi OS</strong></span></td>
<td data-label="Warum"><span class="td-val">Skript läuft unter Linux</span></td>
</tr>
<tr>
<td data-label="Was"><span class="td-val"><strong>Home Assistant</strong> erreichbar (Pi oder anderer Server)</span></td>
<td data-label="Warum"><span class="td-val">Automatisierung schaltet Lampen</span></td>
</tr>
<tr>
<td data-label="Was"><span class="td-val">MQTT-Broker (oft <strong>Mosquitto</strong> in HA)</span></td>
<td data-label="Warum"><span class="td-val">Discovery des <code>binary_sensor</code></span></td>
</tr>
<tr>
<td data-label="Was"><span class="td-val">Smarte Lampen oder Steckdosen (<strong>Zigbee</strong>, Matter, Shelly)</span></td>
<td data-label="Warum"><span class="td-val">Pi schaltet <strong>kein</strong> Hausstrom</span></td>
</tr>
<tr>
<td data-label="Was"><span class="td-val">Grundkenntnis <strong>SSH</strong> oder Tastatur am Pi</span></td>
<td data-label="Warum"><span class="td-val">Skript installieren</span></td>
</tr>
</tbody>
</table>
</div>

Fehlt HA noch: [Installation Home Assistant Pi 5](/de/smart-home/home-assistant-raspberry-pi-5-installation/). Zigbee-Stick: [bester Zigbee-Stick](/de/smart-home/bester-zigbee-stick-home-assistant/) · [Z2M vs ZHA](/de/smart-home/zigbee2mqtt-oder-zha-home-assistant/).

## Ziel

- Bewegung im Flur/Keller erkennen  
- Entität **Occupancy** in HA  
- Licht ein bei Bewegung, aus nach 2 Minuten ohne Bewegung  

## Verdrahtung (3,3 V/5 V — **kein Netzspannung**)

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">PIR HC-SR501</th>
<th scope="col">Raspberry Pi (40-Pin)</th>
</tr></thead><tbody>
<tr>
<td data-label="PIR HC-SR501"><span class="td-val">VCC</span></td>
<td data-label="Raspberry Pi (40-Pin)"><span class="td-val">5 V (Pin 2)</span></td>
</tr>
<tr>
<td data-label="PIR HC-SR501"><span class="td-val">OUT</span></td>
<td data-label="Raspberry Pi (40-Pin)"><span class="td-val">GPIO4 (Pin 7)</span></td>
</tr>
<tr>
<td data-label="PIR HC-SR501"><span class="td-val">GND</span></td>
<td data-label="Raspberry Pi (40-Pin)"><span class="td-val">GND (Pin 6)</span></td>
</tr>
</tbody>
</table>
</div>

Jumper auf **H** (Wiederholung), Zeitpoti minimum — Timeout steuert HA, nicht der Poti allein.

![Raspberry Pi 5 — Referenzfoto](/images/products/raspberry-pi-5.webp)

<p><em>Raspberry Pi 5 — GPIO-Header für PIR (3,3 V/5 V Logik, kein 230 V).</em></p>

## Skript (MQTT Discovery)

Wie im [Türsensor-Tutorial](/de/smart-home/raspberry-pi-tuersensor-benachrichtigung/): Python-**venv**, dann `pip install paho-mqtt`.

Code im Repo: `/code/raspberry-pi/presence_pir_mqtt.py` — publiziert `binary_sensor` mit MQTT Discovery (Occupancy).

## Automatisierung Home Assistant

automation:
  - alias: "Flurlicht bei Bewegung"
    trigger:
      platform: state
      entity_id: binary_sensor.pi_pir_flur_occupancy
      to: "on"
    action:
      - service: light.turn_on
        target:
          entity_id: light.flur
  - alias: "Flurlicht aus nach 2 Min"
    trigger:
      platform: state
      entity_id: binary_sensor.pi_pir_flur_occupancy
      to: "off"
      for: "00:02:00"
    action:
      - service: light.turn_off
        target:
          entity_id: light.flur

`light.flur` durch Ihre Entität ersetzen (Zigbee, Matter, Shelly). Steckdosen-Vergleich: [smarte Steckdosen](/de/smart-home/smarte-steckdosen/).

## Typische Fehler

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Symptom</th>
<th scope="col">Lösung</th>
</tr></thead><tbody>
<tr>
<td data-label="Symptom"><span class="td-val">Sensor meldet dauerhaft <strong>on</strong></span></td>
<td data-label="Lösung"><span class="td-val">PIR zu nah an Heizung/Fenster; Poti-Zeit reduzieren</span></td>
</tr>
<tr>
<td data-label="Symptom"><span class="td-val">Keine MQTT-Entität</span></td>
<td data-label="Lösung"><span class="td-val">Broker-Host/Port im Skript; HA MQTT-Integration aktiv</span></td>
</tr>
<tr>
<td data-label="Symptom"><span class="td-val">Licht schaltet nicht</span></td>
<td data-label="Lösung"><span class="td-val">Automation-Trace in HA; falsche <code>entity_id</code></span></td>
</tr>
<tr>
<td data-label="Symptom"><span class="td-val">GPIO Permission denied</span></td>
<td data-label="Lösung"><span class="td-val">Benutzer in Gruppe <code>gpio</code> oder Skript mit korrektem User</span></td>
</tr>
</tbody>
</table>
</div>

## FAQ

**PIR oder mmWave?** PIR ist günstig und reicht im Flur; mmWave erkennt feinere Präsenz — siehe [Smart-Home-Protokolle](/de/smart-home/smart-home-protokolle-zigbee-wifi-thread-matter/).

**Brauche ich Zigbee2MQTT?** Nein — ZHA oder Z2M reicht für Zigbee-Lampen; nur **eine** Stack-Instanz pro USB-Stick.

## Weiterlesen

- [PIR-Beleuchtung](/de/smart-home/raspberry-pi-bewegungsmelder-beleuchtung/) (diese Seite)  
- [Türsensor](/de/smart-home/raspberry-pi-tuersensor-benachrichtigung/)  
- [Alle Smart-Home-Ratgeber](/de/smart-home/)
