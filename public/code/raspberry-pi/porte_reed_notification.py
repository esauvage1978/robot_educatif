#!/usr/bin/env python3
"""Capteur d'ouverture de porte (interrupteur reed) sur Raspberry Pi -> notification ntfy + MQTT.

Câblage : reed entre GPIO17 (broche 11) et GND (broche 9) ; la résistance de tirage
interne du Pi est activée par gpiozero (pull_up=True). Aucune tension externe.
Compatible Pi 4 et Pi 5 : gpiozero + lgpio, pas de RPi.GPIO.
Dépendances (dans un venv) : gpiozero, lgpio, paho-mqtt (MQTT facultatif).
Source : robot-educatif.info - tutoriel « Capteur d'ouverture de porte avec notification ».
"""
import json
import os
import signal
import urllib.request
from datetime import datetime

from gpiozero import Button

REED_GPIO = int(os.getenv("REED_GPIO", "17"))
NTFY_URL = os.getenv("NTFY_URL", "")            # ex. https://ntfy.sh/mon-sujet-secret-123 (vide = désactivé)
MQTT_HOST = os.getenv("MQTT_HOST", "")          # vide = pas de MQTT
MQTT_PORT = int(os.getenv("MQTT_PORT", "1883"))
MQTT_USER = os.getenv("MQTT_USER", "")
MQTT_PASS = os.getenv("MQTT_PASS", "")
DEVICE_ID = os.getenv("DEVICE_ID", "pi_porte_entree")
STATE_TOPIC = f"robotedu/{DEVICE_ID}/door"


def notifier(message):
    """Envoie une notification push via ntfy (POST HTTP simple)."""
    if not NTFY_URL:
        return
    req = urllib.request.Request(NTFY_URL, data=message.encode("utf-8"),
                                 headers={"Title": "Porte", "Tags": "door"}, method="POST")
    try:
        urllib.request.urlopen(req, timeout=10).close()
    except OSError as e:                         # pas de réseau : on n'arrête pas le script
        print("Notification impossible :", e, flush=True)


def creer_client_mqtt():
    if not MQTT_HOST:
        return None
    import paho.mqtt.client as mqtt
    client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2, client_id=DEVICE_ID)
    if MQTT_USER:
        client.username_pw_set(MQTT_USER, MQTT_PASS)
    client.connect(MQTT_HOST, MQTT_PORT, keepalive=60)
    client.loop_start()
    cfg = {"name": "Porte", "unique_id": f"{DEVICE_ID}_door", "state_topic": STATE_TOPIC,
           "device_class": "door", "payload_on": "ON", "payload_off": "OFF",
           "device": {"identifiers": [DEVICE_ID], "name": f"Raspberry Pi porte ({DEVICE_ID})"}}
    client.publish(f"homeassistant/binary_sensor/{DEVICE_ID}/config", json.dumps(cfg), retain=True)
    return client


def main():
    client = creer_client_mqtt()
    # Porte fermée = aimant proche = contact fermé = GPIO relié à GND = "pressed".
    # bounce_time filtre les rebonds mécaniques du contact.
    reed = Button(REED_GPIO, pull_up=True, bounce_time=0.1)

    def publier(etat):
        if client:
            client.publish(STATE_TOPIC, etat, retain=True)

    def ouverte():
        heure = datetime.now().strftime("%H:%M:%S")
        print(heure, "porte OUVERTE", flush=True)
        publier("ON")                        # pour HA, ON = ouverte
        notifier(f"Porte ouverte à {heure}")

    def fermee():
        print(datetime.now().strftime("%H:%M:%S"), "porte fermée", flush=True)
        publier("OFF")

    reed.when_released = ouverte             # contact qui s'ouvre = aimant éloigné
    reed.when_pressed = fermee
    publier("OFF" if reed.is_pressed else "ON")   # état initial

    def stop(*_):
        reed.close()
        if client:
            client.loop_stop()
            client.disconnect()
        raise SystemExit(0)

    signal.signal(signal.SIGTERM, stop)
    signal.signal(signal.SIGINT, stop)
    print(f"Reed sur GPIO{REED_GPIO}, porte {'fermée' if reed.is_pressed else 'ouverte'}", flush=True)
    signal.pause()


if __name__ == "__main__":
    main()
