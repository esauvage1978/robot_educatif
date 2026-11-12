---
layout: ../../../layouts/ItPost.astro
title: "Sensore PIR su Raspberry Pi per accendere le luci con Home Assistant"
description: "HC-SR501 su Raspberry Pi 4 o 5, presenza via MQTT e illuminazione automatica in Home Assistant. Codice gpiozero, compatibile Pi 5."
updated: "2 novembre 2026"
shareTitle: "PIR su Raspberry Pi con Home Assistant"
shareDescription: "Cablaggio HC-SR501, script MQTT e automazione luci — tutorial completo in italiano."
---

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/it/domotica/">Domotica</a> · PIR e luci</nav>

**Risposta diretta (novembre 2026)** — Un modulo **PIR** (*passive infrared*: rileva il calore corporeo) collegato al **GPIO** del Raspberry Pi invia presenza via **MQTT** (*Message Queuing Telemetry Transport*: protocollo leggero per messaggi) a **Home Assistant** (automazione domestica open source), che accende e spegne le lampade smart — **nessun 230 V** sul Pi.

Corridoio o ripostiglio accesi al passaggio: **PIR HC-SR501** segnala movimento; il Pi **non** commuta 230 V — lo fa Home Assistant sulle lampade smart già integrate. Vedi anche [hub domotica](/it/domotica/), [notifiche porta](/it/domotica/raspberry-pi-sensore-porta-notifica/) e [installare Home Assistant](/it/domotica/installare-home-assistant-raspberry-pi-5/).

![Modulo PIR HC-SR501 collegato al GPIO del Raspberry Pi — riferimento cablaggio](/images/illustrations/raspberry-pi-detecteur-presence-pir-eclairage.webp)

## Obiettivo

- Movimento su **GPIO4** (numerazione BCM, pin fisico 7).  
- Sensore binario **occupancy** in Home Assistant via MQTT.  
- Luce ON al movimento, OFF dopo 2 minuti senza movimento.

## Tempo, livello, materiali

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Durata</th>
<th scope="col">Livello</th>
</tr></thead><tbody>
<tr>
<td data-label="Durata"><span class="td-val">~45 min</span></td>
<td data-label="Livello"><span class="td-val">principiante</span></td>
</tr>
</tbody>
</table>
</div>

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Termine</th>
<th scope="col">Significato</th>
</tr></thead><tbody>
<tr>
<td data-label="Termine"><span class="td-val"><strong>PIR</strong></span></td>
<td data-label="Significato"><span class="td-val">Rileva persone in movimento (animali piccoli: meno affidabile).</span></td>
</tr>
<tr>
<td data-label="Termine"><span class="td-val"><strong>GPIO</strong></span></td>
<td data-label="Significato"><span class="td-val">Pin del Pi letto come acceso/spento.</span></td>
</tr>
<tr>
<td data-label="Termine"><span class="td-val"><strong>MQTT</strong></span></td>
<td data-label="Significato"><span class="td-val">Canale tra Pi e Home Assistant.</span></td>
</tr>
</tbody>
</table>
</div>

- Modulo **HC-SR501** — [ricerca Amazon.it](https://www.amazon.it/s?k=HC-SR501+PIR&tag=roboteducat0f-21)  
- Raspberry Pi 4/5 con **Raspberry Pi OS Bookworm**  
- Broker MQTT (es. Mosquitto su Home Assistant)  
- Lampada o presa già integrata in HA

## Cablaggio

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">PIR</th>
<th scope="col">Pi (pin fisico)</th>
</tr></thead><tbody>
<tr>
<td data-label="PIR"><span class="td-val">VCC</span></td>
<td data-label="Pi (pin fisico)"><span class="td-val">2 (5V)</span></td>
</tr>
<tr>
<td data-label="PIR"><span class="td-val">OUT</span></td>
<td data-label="Pi (pin fisico)"><span class="td-val">7 (GPIO4)</span></td>
</tr>
<tr>
<td data-label="PIR"><span class="td-val">GND</span></td>
<td data-label="Pi (pin fisico)"><span class="td-val">6 (GND)</span></td>
</tr>
</tbody>
</table>
</div>

Jumper **H** (ripetizione trigger), potenziometro tempo al **minimo** — il timer resta in automazione HA.

## Preparazione Pi

Su Pi 4 e **Pi 5** usa **gpiozero** con backend **lgpio** (non RPi.GPIO):

sudo apt update
sudo apt install -y python3-venv python3-gpiozero python3-lgpio
mkdir -p ~/capteurs && cd ~/capteurs
python3 -m venv --system-site-packages venv
source venv/bin/activate
pip install paho-mqtt

## Script Python (gpiozero + MQTT discovery)

Salva come `presence_pir_mqtt.py` (o scarica [`presence_pir_mqtt.py`](/code/raspberry-pi/presence_pir_mqtt.py)):

#!/usr/bin/env python3
import json, os, signal
from gpiozero import MotionSensor
import paho.mqtt.client as mqtt

PIR_GPIO = int(os.getenv("PIR_GPIO", "4"))
MQTT_HOST = os.getenv("MQTT_HOST", "localhost")
DEVICE_ID = os.getenv("DEVICE_ID", "pi_pir_corridoio")
STATE_TOPIC = f"robotedu/{DEVICE_ID}/occupancy"

def main():
    client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2, client_id=DEVICE_ID)
    client.connect(MQTT_HOST, int(os.getenv("MQTT_PORT", "1883")), 60)
    client.loop_start()
    cfg = {
        "name": "Presenza",
        "unique_id": f"{DEVICE_ID}_occupancy",
        "state_topic": STATE_TOPIC,
        "device_class": "occupancy",
        "payload_on": "ON",
        "payload_off": "OFF",
    }
    client.publish(
        f"homeassistant/binary_sensor/{DEVICE_ID}/config",
        json.dumps(cfg),
        retain=True,
    )
    pir = MotionSensor(PIR_GPIO, queue_len=1)
    pir.when_motion = lambda: client.publish(STATE_TOPIC, "ON", retain=True)
    pir.when_no_motion = lambda: client.publish(STATE_TOPIC, "OFF", retain=True)
    signal.pause()

if __name__ == "__main__":
    main()

Avvio di prova (sostituisci l’IP del broker):

export MQTT_HOST=192.168.1.10
export MQTT_USER=ha_mqtt
export MQTT_PASS=***
python presence_pir_mqtt.py

In Home Assistant compaiono entità **MQTT** dopo la discovery.

## Automazione Home Assistant

alias: Luce corridoio su movimento
mode: restart
triggers:
  - trigger: state
    entity_id: binary_sensor.pi_pir_corridoio_occupancy
    to: "on"
actions:
  - action: light.turn_on
    target:
      entity_id: light.corridoio
  - wait_for_trigger:
      - trigger: state
        entity_id: binary_sensor.pi_pir_corridoio_occupancy
        to: "off"
        for: "00:02:00"
  - action: light.turn_off
    target:
      entity_id: light.corridoio

Sostituisci gli `entity_id`. Modalità **restart** evita lampeggi se il PIR invia più impulsi.

## systemd

Crea `/etc/systemd/system/pir-mqtt.service` con `Environment=MQTT_HOST=...` e `ExecStart=/home/pi/capteurs/venv/bin/python .../presence_pir_mqtt.py`, poi:

sudo systemctl enable --now pir-mqtt.service

Stesso schema degli altri sensori in `~/capteurs` — vedi [CO2 SCD41](/it/domotica/raspberry-pi-co2-scd41-home-assistant/).

## FAQ

**La luce lampeggia?**  
Usa `mode: restart` e regola i 2 minuti di attesa dopo `off`.

**Falsi trigger all’accensione?**  
Attendi ~60 s di warm-up del PIR dopo l’alimentazione.

**Errori GPIO su Pi 5?**  
Installa `python3-lgpio` e venv con `--system-site-packages`.

## Risoluzione problemi

- Evita puntare il PIR verso radiatori o finestre soleggiate.  
- Se GPIO4 è occupato, imposta `PIR_GPIO` nel servizio systemd.  
- Nessun messaggio MQTT: controlla firewall e credenziali broker.

Vedi [CO2 SCD41](/it/domotica/raspberry-pi-co2-scd41-home-assistant/), [Zigbee2MQTT vs ZHA](/it/domotica/zigbee2mqtt-o-zha-home-assistant/).

[Tutte le guide](/it/domotica/)
