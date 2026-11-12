---
layout: ../../../layouts/DePost.astro
title: "Türsensor am Raspberry Pi: Reed-Kontakt und Push-Benachrichtigung"
description: "Magnetkontakt an GPIO17, Push über ntfy (selbst hostbar, DSGVO-freundlich) und optional MQTT für Home Assistant — Pi 4/5, Bookworm, systemd-Unit inklusive."
updated: "3. November 2026"
---

> **Kurzantwort (November 2026)** — Ein **Reed-Kontakt** (Magnetkontakt ohne Batterie) an **GPIO17** meldet Tür auf/zu. Ein Python-Skript auf dem **Raspberry Pi** (Einplatinencomputer) sendet Push über **ntfy** (Notification-Dienst per HTTPS) und kann optional **MQTT** (Message Queuing Telemetry Transport, Nachrichtenprotokoll für Smart Home) an **Home Assistant** (Open-Source-Smart-Home-Zentrale) publizieren.

Dieser Leitfaden gehört zum [Smart-Home-Hub](/de/smart-home/) und ergänzt [Bewegungsmelder + Licht](/de/smart-home/raspberry-pi-bewegungsmelder-beleuchtung/) sowie [CO₂-Sensor SCD41](/de/smart-home/raspberry-pi-co2-scd41-home-assistant/).

Dauer ca. 45 Min., Einsteiger. Reed-Kontakte [bei Amazon.de](https://www.amazon.de/s?k=Reed+Kontakt+Tür&tag=roboteducat00-21) (Werbelink, Preis prüfen, Stand November 2026).

## Ziel

- Öffnen/Schließen zuverlässig erkennen
- Push bei jeder Öffnung (oder nur in Home Assistant filtern)
- Optional: `binary_sensor` „Tür“ in HA

## ntfy verstehen

**ntfy** ist ein schlanker Push-Dienst: Sie abonnieren ein **Topic** (Themenname) in der App. Öffentliche Topics auf ntfy.sh sind lesbar, wenn jemand den Namen errät — wählen Sie einen **langen, zufälligen Topic-Namen** oder betreiben Sie ntfy selbst. URL im Skript: `NTFY_URL=https://ntfy.sh/IhrGeheimesTopic`.

## Verdrahtung

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Reed</th>
<th scope="col">Pi</th>
</tr></thead><tbody>
<tr>
<td data-label="Reed"><span class="td-val">Draht 1</span></td>
<td data-label="Pi"><span class="td-val">GPIO17 (Pin 11)</span></td>
</tr>
<tr>
<td data-label="Reed"><span class="td-val">Draht 2</span></td>
<td data-label="Pi"><span class="td-val">GND (Pin 9)</span></td>
</tr>
</tbody>
</table>
</div>

Tür zu: Magnet schließt den Kontakt. **Keine Fremdspannung** an GPIO — nur 3,3 V Logik.

![Reed-Kontakt am Raspberry Pi — Illustration](/images/illustrations/raspberry-pi-capteur-ouverture-porte-notification.webp)

## Vorbereitung Pi (Bookworm)

sudo apt update
sudo apt install -y python3-venv python3-gpiozero python3-lgpio
mkdir -p ~/capteurs && cd ~/capteurs
python3 -m venv --system-site-packages venv
source venv/bin/activate
pip install paho-mqtt   # nur bei Home Assistant

Skript herunterladen: [`porte_reed_notification.py`](/code/raspberry-pi/porte_reed_notification.py).

Umgebungsvariablen: `REED_GPIO=17`, `NTFY_URL`, optional `MQTT_HOST`, `MQTT_USER`, `MQTT_PASS`.

## Python-Auszug (Test auf dem Pi)

#!/usr/bin/env python3
from gpiozero import Button
import os
REED_GPIO = int(os.getenv("REED_GPIO", "17"))
reed = Button(REED_GPIO, pull_up=True, bounce_time=0.1)
print("Tür", "zu" if reed.is_pressed else "offen")

Speichern als `test_reed.py`, ausführen: `python3 test_reed.py` — Magnet nähern/entfernen, Ausgabe muss wechseln.

## systemd-Unit (Autostart)

Datei `/etc/systemd/system/tuer-reed.service` (Benutzer `pi` und Pfade anpassen):

[Unit]
Description=Türsensor Reed (robot-educatif.info)
After=network-online.target
Wants=network-online.target

[Service]
User=pi
WorkingDirectory=/home/pi/capteurs
Environment=NTFY_URL=https://ntfy.sh/geheimes-topic-8f3k2q
Environment=MQTT_HOST=192.168.1.10
Environment=MQTT_USER=pi
Environment=MQTT_PASS=bitte-aendern
ExecStart=/home/pi/capteurs/venv/bin/python /home/pi/capteurs/porte_reed_notification.py
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target

sudo systemctl daemon-reload
sudo systemctl enable --now tuer-reed.service
journalctl -u tuer-reed.service -f

## Home Assistant (optional)

**Mosquitto broker**-Add-on und Integration **MQTT** aktivieren. Das Skript sendet **MQTT Discovery** auf `homeassistant/.../config` — Entitäten erscheinen automatisch. Dedizierten HA-Benutzer anlegen.

## FAQ

**Push bei jeder Öffnung nervt?**  
Entfernen Sie `NTFY_URL` und nutzen Sie eine HA-Automatisierung „Tür offen seit 5 Minuten“.

**Zustand vertauscht?**  
Kontakt ist „normally closed“ — tauschen Sie `when_pressed` / `when_released` im Skript.

**Ohne Pi?**  
[Fensterkontakt Zigbee](/de/smart-home/zigbee-temperatursensor/) (andere Geräteklasse) oder [Zigbee2MQTT vs ZHA](/de/smart-home/zigbee2mqtt-oder-zha-home-assistant/).

Weiter: [PIR-Beleuchtung](/de/smart-home/raspberry-pi-bewegungsmelder-beleuchtung/), [HA auf Pi 5 installieren](/de/smart-home/home-assistant-raspberry-pi-5-installation/), [Notstrom-USV](/de/smart-home/home-assistant-notstrom-usv/).

[Alle Smart-Home-Ratgeber](/de/smart-home/)
