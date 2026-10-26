#!/usr/bin/env python3
"""Détection de présence PIR (HC-SR501 ou AM312) sur Raspberry Pi -> Home Assistant via MQTT.

Le Pi publie un binary_sensor "occupancy" ; c'est Home Assistant qui allume la lumière
(aucun câblage 230 V côté Raspberry Pi).
Compatible Pi 4 et Pi 5 : gpiozero (backend lgpio sous Bookworm), pas de RPi.GPIO.
Dépendances (dans un venv) : gpiozero, lgpio, paho-mqtt.
Source : robot-educatif.info - tutoriel « Détecteur de présence PIR + Home Assistant ».
"""
import json
import os
import signal

from gpiozero import MotionSensor
import paho.mqtt.client as mqtt

PIR_GPIO = int(os.getenv("PIR_GPIO", "4"))          # numérotation BCM : GPIO4 = broche physique 7
MQTT_HOST = os.getenv("MQTT_HOST", "localhost")
MQTT_PORT = int(os.getenv("MQTT_PORT", "1883"))
MQTT_USER = os.getenv("MQTT_USER", "")
MQTT_PASS = os.getenv("MQTT_PASS", "")
DEVICE_ID = os.getenv("DEVICE_ID", "pi_pir_couloir")
STATE_TOPIC = f"robotedu/{DEVICE_ID}/occupancy"
AVAIL_TOPIC = f"robotedu/{DEVICE_ID}/availability"


def creer_client():
    client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2, client_id=DEVICE_ID)
    if MQTT_USER:
        client.username_pw_set(MQTT_USER, MQTT_PASS)
    client.will_set(AVAIL_TOPIC, "offline", retain=True)
    client.connect(MQTT_HOST, MQTT_PORT, keepalive=60)
    client.loop_start()
    client.publish(AVAIL_TOPIC, "online", retain=True)
    cfg = {
        "name": "Présence",
        "unique_id": f"{DEVICE_ID}_occupancy",
        "state_topic": STATE_TOPIC,
        "device_class": "occupancy",
        "payload_on": "ON",
        "payload_off": "OFF",
        "availability_topic": AVAIL_TOPIC,
        "device": {"identifiers": [DEVICE_ID], "name": f"Raspberry Pi PIR ({DEVICE_ID})"},
    }
    client.publish(f"homeassistant/binary_sensor/{DEVICE_ID}/config", json.dumps(cfg), retain=True)
    return client


def main():
    client = creer_client()
    # queue_len=1 : réaction immédiate ; le module PIR fait déjà son propre filtrage.
    pir = MotionSensor(PIR_GPIO, queue_len=1)

    def mouvement():
        print("Mouvement détecté", flush=True)
        client.publish(STATE_TOPIC, "ON", retain=True)

    def calme():
        print("Plus de mouvement", flush=True)
        client.publish(STATE_TOPIC, "OFF", retain=True)

    pir.when_motion = mouvement
    pir.when_no_motion = calme

    def stop(*_):
        client.publish(AVAIL_TOPIC, "offline", retain=True)
        client.loop_stop()
        client.disconnect()
        pir.close()
        raise SystemExit(0)

    signal.signal(signal.SIGTERM, stop)
    signal.signal(signal.SIGINT, stop)
    print(f"PIR sur GPIO{PIR_GPIO}, en attente…", flush=True)
    signal.pause()                         # gpiozero gère les événements en arrière-plan


if __name__ == "__main__":
    main()
