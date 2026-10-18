---
title: "Capteur température ESP32 + ESPHome pour Home Assistant : tuto complet"
description: "Tutoriel : créer un capteur température DHT22 ou BME280 avec ESP32-C6 et ESPHome. Code YAML, flashage, intégration Home Assistant. DIY à 10 €."
pubDate: 2026-10-18T00:00:00Z
category: "esp32"
products: ["esp32-c6-devkitc", "xiao-esp32c6"]
priority: 8
---

Créer son propre **capteur température ESP32 + ESPHome** coûte 10 € et s'intègre automatiquement dans Home Assistant. Ce tuto vous guide pas à pas.

## Matériel (10–15 €)

- **ESP32-C6-DevKitC** ou **XIAO ESP32-C6** : 6–15 €
- **DHT22** (température + humidité) : 3–5 € OU **BME280** (+ pression) : 5–8 €
- Câbles Dupont, breadboard (optionnel)
- Câble USB-C

*Pourquoi ESP32-C6 ?* Zigbee/Thread natif (futur), WiFi 6, basse conso.

*Liens Amazon : [ESP32-C6 DevKit](https://www.amazon.fr/s?k=ESP32-C6&tag=manuso06-21), [DHT22](https://www.amazon.fr/s?k=DHT22&tag=manuso06-21).*

## Étape 1 : Installer ESPHome dans Home Assistant

1. **Paramètres → Modules complémentaires → Boutique**
2. Installer **ESPHome**
3. Démarrer + Activer "Afficher dans la barre latérale"

## Étape 2 : Créer l'appareil ESPHome

1. **ESPHome → + Nouvel appareil**
2. Nom : `Capteur salon`
3. Type : `ESP32-C6`
4. WiFi : SSID + mot de passe
5. **Installer** : brancher l'ESP32 en USB, choisir "Plug into this computer"

Le firmware ESPHome se flash (2 min).

## Étape 3 : Ajouter le capteur DHT22

**Code YAML** (cliquer "Edit" sur l'appareil) :

```yaml
sensor:
  - platform: dht
    pin: GPIO4
    model: DHT22
    temperature:
      name: "Salon Température"
      accuracy_decimals: 1
    humidity:
      name: "Salon Humidité"
      accuracy_decimals: 0
    update_interval: 60s
```

**Câblage DHT22** :
- VCC → 3.3V
- GND → GND
- DATA → GPIO4

**Installer** à nouveau (OTA cette fois, sans câble).

## Étape 4 : Voir dans Home Assistant

L'appareil apparaît automatiquement dans **Paramètres → Appareils**.

Entités créées :
- `sensor.salon_temperature`
- `sensor.salon_humidite`

## Variante : BME280 (I2C)

**Code YAML** :

```yaml
i2c:
  sda: GPIO6
  scl: GPIO7

sensor:
  - platform: bme280
    temperature:
      name: "Salon Température"
    humidity:
      name: "Salon Humidité"
    pressure:
      name: "Salon Pression"
    address: 0x76
    update_interval: 60s
```

**Câblage** : VCC/GND + SDA GPIO6 + SCL GPIO7

## Automatisation exemple

```yaml
automation:
  - alias: "Radiateur salon < 19°C"
    trigger:
      platform: numeric_state
      entity_id: sensor.salon_temperature
      below: 19
    action:
      - service: switch.turn_on
        target:
          entity_id: switch.radiateur_salon
```

## Avantages ESP32 vs capteurs Zigbee

✅ **Moins cher** : 10 € vs 15–20 €  
✅ **DIY** : ajouter LED, relais, écran OLED  
✅ **WiFi direct** : pas besoin de dongle Zigbee

❌ **Alimentation** : USB 5V (pas de pile)  
❌ **Config** : plus technique que Zigbee plug & play

## Pour aller plus loin

- [10 projets ESP32 domotique](/domotique/projets-esp32-domotique/)
- [Capteur Zigbee](/domotique/capteur-temperature-zigbee/)
- [Installer Home Assistant](/domotique/home-assistant-raspberry-pi-5-installation/)

---

*Affiliation Amazon tag manuso06-21, ~3 % commission.*
