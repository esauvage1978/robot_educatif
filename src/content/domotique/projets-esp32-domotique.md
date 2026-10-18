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
**Utilité** : météo, calendrier, température sans écran PC.

### 8. Capteur CO2 (qualité air)

**Matériel** : ESP32 + MH-Z19B (35 €)  
**Utilité** : alerte si CO2 > 1000 ppm (aérer), automatiser VMC.

### 9. Assistant vocal local (Atom Echo)

**Matériel** : M5Stack Atom Echo (15 €)  
**Utilité** : "Allume salon" sans cloud Google/Alexa. HA Voice PE officiel (60 €) ou DIY.

*Lien Amazon : [Atom Echo](https://www.amazon.fr/s?k=M5Stack+Atom+Echo&tag=manuso06-21).*

### 10. Compteur d'eau/électricité

**Matériel** : ESP32 + capteur effet Hall (12 €)  
**Utilité** : lire compteur Linky ou compteur d'eau (impulsions), suivre conso réelle.

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
