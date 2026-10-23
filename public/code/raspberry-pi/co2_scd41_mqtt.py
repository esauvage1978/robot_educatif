#!/usr/bin/env python3
"""Capteur CO2 SCD41 (ou SCD40) sur Raspberry Pi -> MQTT / Home Assistant.

Matériel : Raspberry Pi 4 ou 5 (Raspberry Pi OS Bookworm), module SCD40/SCD41 en I2C (adresse 0x62).
Dépendances (dans un venv) : adafruit-circuitpython-scd4x, paho-mqtt (Blinka est installé avec).
Source : robot-educatif.info - tutoriel « Mesurer le CO2 avec un Raspberry Pi ».
"""
import json
import os
import signal
import sys
import time

import board                      # fourni par Adafruit Blinka
import adafruit_scd4x
import paho.mqtt.client as mqtt

# --- Réglages (modifiables par variables d'environnement) -------------------
MQTT_HOST = os.getenv("MQTT_HOST", "localhost")    # IP du broker (ex. Home Assistant)
MQTT_PORT = int(os.getenv("MQTT_PORT", "1883"))
MQTT_USER = os.getenv("MQTT_USER", "")
MQTT_PASS = os.getenv("MQTT_PASS", "")
DEVICE_ID = os.getenv("DEVICE_ID", "pi_scd41_salon")
INTERVAL = int(os.getenv("INTERVAL", "30"))         # secondes entre deux publications
STATE_TOPIC = f"robotedu/{DEVICE_ID}/state"
AVAIL_TOPIC = f"robotedu/{DEVICE_ID}/availability"

# Capteurs annoncés à Home Assistant (MQTT discovery)
SENSORS = {
    "co2": {"name": "CO2", "unit": "ppm", "device_class": "carbon_dioxide"},
    "temperature": {"name": "Température", "unit": "°C", "device_class": "temperature"},
    "humidity": {"name": "Humidité", "unit": "%", "device_class": "humidity"},
}


def publish_discovery(client):
    """Publie une config 'retained' par mesure : HA crée les entités tout seul."""
    device = {"identifiers": [DEVICE_ID], "name": f"Raspberry Pi SCD41 ({DEVICE_ID})",
              "model": "SCD4x", "manufacturer": "DIY robot-educatif.info"}
    for key, s in SENSORS.items():
        cfg = {
            "name": s["name"],
            "unique_id": f"{DEVICE_ID}_{key}",
            "state_topic": STATE_TOPIC,
            "value_template": "{{ value_json.%s }}" % key,
            "unit_of_measurement": s["unit"],
            "device_class": s["device_class"],
            "state_class": "measurement",
            "availability_topic": AVAIL_TOPIC,
            "device": device,
        }
        client.publish(f"homeassistant/sensor/{DEVICE_ID}_{key}/config", json.dumps(cfg), retain=True)


def main():
    # 1) Capteur : bus I2C matériel (GPIO2 = SDA, GPIO3 = SCL)
    i2c = board.I2C()
    scd = adafruit_scd4x.SCD4X(i2c)
    print("SCD4x détecté, numéro de série :", [hex(i) for i in scd.serial_number])
    scd.start_periodic_measurement()          # une mesure toutes les 5 s environ

    # 2) MQTT (API de callbacks version 2 de paho-mqtt 2.x)
    client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2, client_id=DEVICE_ID)
    if MQTT_USER:
        client.username_pw_set(MQTT_USER, MQTT_PASS)
    client.will_set(AVAIL_TOPIC, "offline", retain=True)   # HA saura si le Pi tombe
    client.connect(MQTT_HOST, MQTT_PORT, keepalive=60)
    client.loop_start()
    client.publish(AVAIL_TOPIC, "online", retain=True)
    publish_discovery(client)

    def stop(*_):
        client.publish(AVAIL_TOPIC, "offline", retain=True)
        scd.stop_periodic_measurement()
        client.loop_stop()
        client.disconnect()
        sys.exit(0)

    signal.signal(signal.SIGTERM, stop)       # arrêt propre par systemd
    signal.signal(signal.SIGINT, stop)        # Ctrl+C

    # 3) Boucle de mesure
    while True:
        if scd.data_ready:
            payload = {
                "co2": int(scd.CO2),
                "temperature": round(scd.temperature, 1),
                "humidity": round(scd.relative_humidity, 1),
            }
            client.publish(STATE_TOPIC, json.dumps(payload))
            print(payload, flush=True)
            time.sleep(INTERVAL)
        else:
            time.sleep(1)


if __name__ == "__main__":
    main()
