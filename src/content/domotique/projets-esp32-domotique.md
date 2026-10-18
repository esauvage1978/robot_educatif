---
title: "10 projets ESP32 pour la domotique avec ESPHome et Home Assistant"
description: "Idées de projets ESP32 + ESPHome : capteurs, relais, LED, station météo, assistant vocal, écran. De débutant à avancé. Intégration Home Assistant."
pubDate: 2026-10-18T00:00:00Z
category: "esp32"
products: ["esp32-c6-devkitc", "xiao-esp32c6", "m5stack-atom-echo"]
priority: 9
---

L'**ESP32 + ESPHome** transforme un microcontrôleur à 7 € en capteur, relais ou écran connecté Home Assistant. Voici 10 projets classés par difficulté.

## Projets débutants (1–2 heures)

### 1. Capteur température DHT22

**Matériel** : ESP32-C6 + DHT22 (10 €)  
**Utilité** : surveiller chaque pièce sans Zigbee  
[Tuto complet ici](/domotique/esp32-esphome-capteur-temperature/)

### 2. Bouton d'urgence

**Matériel** : ESP32 + bouton poussoir (8 €)  
**Code** :
```yaml
binary_sensor:
  - platform: gpio
    pin: GPIO4
    name: "Bouton SOS"
    on_press:
      - homeassistant.event:
          event: bouton_sos
```

**Utilité** : déclencher alarme, appeler téléphone, couper tout (panique).

### 3. LED de statut

**Matériel** : ESP32 + LED RGB WS2812 (9 €)  
**Utilité** : afficher état maison (vert = OK, rouge = fenêtre ouverte, bleu = absent).

## Projets intermédiaires (2–4 heures)

### 4. Station météo complète

**Matériel** : ESP32 + BME280 (temp/hum/pression) + BH1750 (luminosité) (15 €)  
**Utilité** : météo locale, prédire pluie, automatiser stores selon luminosité.

### 5. Relais 4 canaux

**Matériel** : ESP32 + module relais 4 canaux (12 €)  
**Utilité** : piloter chauffage, ventilateur, pompe, portail.

### 6. Détecteur de présence mmWave

**Matériel** : ESP32 + LD2410 mmWave (18 €)  
**Utilité** : détection présence même immobile (bureau, chambre). Meilleur que PIR.

## Projets avancés (4–8 heures)

### 7. Écran e-paper météo

**Matériel** : ESP32 + écran e-paper 2,9" (25 €)  
**Utilité** : affichage météo, calendrier, température sans écran allumé en permanence.

**Code ESPHome** :
```yaml
display:
  - platform: waveshare_epaper
    model: 2.90in
    cs_pin: GPIO5
    dc_pin: GPIO17
    lambda: |-
      it.printf(10, 10, id(font1), "Salon: %.1f°C", id(temp_salon).state);
      it.printf(10, 50, id(font1), "Météo: %s", id(meteo).state.c_str());
```

### 8. Capteur CO2 (qualité air)

**Matériel** : ESP32 + MH-Z19B (35 €)  
**Utilité** : surveiller qualité de l'air, alerte si CO2 > 1000 ppm (aérer), automatiser VMC.

**Seuils recommandés** :
- < 800 ppm : excellent
- 800-1000 ppm : bon
- 1000-1500 ppm : aérer
- \> 1500 ppm : très mauvais (maux de tête, concentration difficile)

**Automatisation HA** :
```yaml
automation:
  - alias: "VMC boost si CO2 élevé"
    trigger:
      platform: numeric_state
      entity_id: sensor.co2_bureau
      above: 1200
    action:
      - service: fan.set_speed
        target:
          entity_id: fan.vmc
        data:
          speed: "high"
```

### 9. Assistant vocal local (Atom Echo)

**Matériel** : M5Stack Atom Echo (15 €) ou HA Voice Preview Edition (60 €)  
**Utilité** : commandes vocales "Allume salon" sans cloud Google/Alexa. 100 % local.

**Installation** :
1. Flasher Atom Echo avec ESPHome Voice Assistant
2. Ajouter dans HA : **Paramètres → Voice Assistants**
3. Configurer pipeline : Wake Word (OK Nabu) → Whisper (speech-to-text) → conversation → TTS

**Commandes exemples** :
- "Allume le salon"
- "Quelle est la température de la chambre ?"
- "Lance l'aspirateur"

### 10. Compteur d'eau/électricité

**Matériel** : ESP32 + capteur effet Hall (12 €)  
**Utilité** : lire les impulsions du compteur Linky ou d'eau, suivre consommation réelle.

**Linky** : sortie télé-info (RX via ESP32 UART)  
**Eau** : capteur Hall qui détecte rotation de l'aiguille

**Code ESPHome compteur eau** :
```yaml
sensor:
  - platform: pulse_counter
    pin: GPIO4
    name: "Débit eau"
    unit_of_measurement: 'L/min'
    filters:
      - multiply: 0.5
    total:
      name: "Volume eau total"
      unit_of_measurement: 'L'
```

## Projets bonus (niveau expert)

### 11. Portail connecté avec caméra

**Matériel** : ESP32-CAM (8 €) + relais  
**Utilité** : Ouvrir portail depuis HA, photo de qui sonne, reconnaissance faciale.

### 12. Irrigation automatique jardin

**Matériel** : ESP32 + capteur humidité sol + électrovanne (25 €)  
**Utilité** : arroser uniquement si sol sec, économie d'eau.

### 13. Alarme DIY avec sirène

**Matériel** : ESP32 + détecteurs PIR + sirène 12V (30 €)  
**Utilité** : alarme locale sans abonnement, notification HA.

### 14. Sonnette vidéo DIY

**Matériel** : ESP32-CAM + bouton + haut-parleur (20 €)  
**Utilité** : alternative Ring/Nest, 100 % local, enregistrement HA.

### 15. Mesure qualité air complète

**Matériel** : ESP32 + BME680 (temp/hum/pression/VOC) + PMS5003 (particules) (40 €)  
**Utilité** : surveiller pollution intérieure (COV, PM2.5, PM10).

## Pourquoi ESP32 plutôt que Zigbee ?

✅ **Personnalisable** : ajouter n'importe quel capteur I2C, SPI, GPIO  
✅ **WiFi direct** : pas de dongle  
✅ **Moins cher** : 7–15 € vs 15–25 € Zigbee

❌ **Alimentation secteur** : USB 5V (sauf batterie externe)  
❌ **Plus technique** : souder, câbler

## Ressources

**ESPHome** : [esphome.io](https://esphome.io)  
**Composants** : AliExpress, Amazon  
**Forum** : [community.home-assistant.io](https://community.home-assistant.io)

## Pour aller plus loin

- [Tuto capteur température ESP32](/domotique/esp32-esphome-capteur-temperature/)
- [Installer Home Assistant](/domotique/home-assistant-raspberry-pi-5-installation/)
- [Débuter en domotique](/domotique/debuter-domotique-par-ou-commencer/)

---

*Affiliation Amazon tag manuso06-21, ~3 % commission.*
