---
title: "Capteur température ESP32 + ESPHome pour Home Assistant : tuto complet"
description: "Tutoriel complet : créer un capteur température DHT22 ou BME280 avec ESP32 et ESPHome. Câblage, code YAML, automatisations, troubleshooting. DIY à 10 €."
pubDate: 2026-10-18T00:00:00Z
category: "esp32"
products: ["esp32-c6-devkitc", "xiao-esp32c6"]
priority: 8
---

Créer son propre **capteur température ESP32 + ESPHome** coûte 10 € et s'intègre automatiquement dans Home Assistant. Ce tutoriel détaillé vous guide pas à pas du câblage à la première automatisation, avec des explications pour comprendre chaque étape et personnaliser votre capteur.

## Liste complète du matériel nécessaire (10–25 €)

### Composants essentiels

**ESP32 DevKit** : 6–15 €
- **ESP32-C6-DevKitC-1** (recommandé) : 10–15 € — Zigbee/Thread natif, WiFi 6, basse consommation
- **XIAO ESP32-C6** (compact) : 8–12 € — même puce, format mini (21 × 17,5 mm)
- **ESP32-S3-DevKitC-1** (alternatif) : 8–12 € — pas de Zigbee/Thread, mais WiFi stable

*Pourquoi l'ESP32-C6 ?* Puce RISC-V avec WiFi 6, Zigbee 3.0 et Thread natifs. Futur-proof pour Matter. Consommation 50 % inférieure au S3 en deep sleep.

*Liens Amazon : [ESP32-C6 DevKit](https://www.amazon.fr/s?k=ESP32-C6+DevKit&tag=manuso06-21), [XIAO ESP32-C6](https://www.amazon.fr/s?k=XIAO+ESP32-C6&tag=manuso06-21).*

**Capteur température + humidité** : 3–8 €
- **DHT22 (AM2302)** : 3–5 € — ±0,5 °C, ±2 % RH, protocole 1-wire simple
- **BME280** : 5–8 € — ±0,5 °C, ±3 % RH, **+ pression atmosphérique**, I2C, plus précis

*Recommandation : BME280* pour les projets sérieux (pression = détection météo locale). DHT22 OK pour débuter.

*Liens Amazon : [DHT22 AM2302](https://www.amazon.fr/s?k=DHT22&tag=manuso06-21), [BME280 module](https://www.amazon.fr/s?k=BME280+module&tag=manuso06-21).*

**Accessoires de câblage** : 3–6 €
- **Breadboard 400 points** : 2 € — prototypage sans soudure
- **Câbles Dupont mâle-mâle** (10–20 fils) : 2–3 €
- **Résistance 4,7 kΩ** (optionnel DHT22, pull-up data) : 0,10 € — améliore stabilité signal longue distance

*Lien Amazon : [Kit breadboard + câbles](https://www.amazon.fr/s?k=breadboard+cable+kit&tag=manuso06-21).*

**Alimentation** : 2–5 €
- **Câble USB-C** (ESP32-C6) ou **micro-USB** (ESP32-S3) : 2–3 € — pour flashage et alimentation 5V
- **Alimentation USB 5V 1A** : 3–5 € — si branchement permanent (pas besoin de PC)

### Matériel optionnel (boîtier et alimentations avancées)

**Boîtier 3D** : 0–5 €
- Impression 3D maison (STL gratuits Thingiverse/Printables)
- Boîtier ABS 70 × 50 × 30 mm avec découpes : 3–5 € sur Amazon

**Alimentation batterie** (pour capteur extérieur/nomade) : 5–15 €
- **Batterie Li-ion 18650 3,7V** + module TP4056 (charge/protection) : 5–8 €
- **Panneau solaire 6V 1W** + régulateur : 8–15 € — autonomie totale

**Budget total** : 10 € (DHT22 + ESP32 + câbles) à 25 € (BME280 + ESP32-C6 + boîtier + batterie).

## Étape 1 : Installer ESPHome dans Home Assistant

**ESPHome** est un système de firmware pour ESP32 qui génère automatiquement le code C++ depuis un fichier YAML et l'intègre à Home Assistant via API native.

1. **Ouvrir Home Assistant → Paramètres → Modules complémentaires → Boutique des modules complémentaires**
2. Rechercher **ESPHome**
3. Cliquer **Installer** (2–3 minutes)
4. Cocher **Démarrage automatique** et **Afficher dans la barre latérale**
5. **Démarrer**

ESPHome apparaît maintenant dans la barre latérale gauche de Home Assistant.

**Version recommandée** : ESPHome 2024.10+ (octobre 2026). Vérifie la compatibilité ESP32-C6.

## Étape 2 : Câblage DHT22 ou BME280

### Variante A : DHT22 (1-wire, 3 fils)

**Schéma de câblage :**

```
DHT22              ESP32-C6 DevKit
─────              ───────────────
VCC (rouge)   →    3.3V (ou 5V)
DATA (jaune)  →    GPIO4
GND (noir)    →    GND
```

**Détails broches ESP32-C6 DevKitC-1** :
- **3.3V** : pin physique 1 (coin supérieur gauche si USB en bas)
- **GPIO4** : pin physique 5 (à vérifier sur le pinout — certains boards varient)
- **GND** : pin physique 2 ou n'importe quel GND

**Résistance pull-up 4,7 kΩ** (optionnel mais recommandé) :
- Entre VCC (3.3V) et DATA (GPIO4) — améliore lecture si câble > 20 cm

**Alimentation 3.3V ou 5V ?**
- DHT22 fonctionne avec les deux
- **3.3V recommandé** : pas de conversion de niveau logique nécessaire (ESP32 = 3.3V logic)

### Variante B : BME280 (I2C, 4 fils)

**Schéma de câblage :**

```
BME280             ESP32-C6 DevKit
──────             ───────────────
VCC (rouge)   →    3.3V
GND (noir)    →    GND
SDA (bleu)    →    GPIO6 (ou GPIO21 selon pinout)
SCL (jaune)   →    GPIO7 (ou GPIO22)
```

**I2C sur ESP32-C6** :
- Pins par défaut : SDA = GPIO6, SCL = GPIO7
- Vérifier votre DevKit (certains utilisent GPIO21/22)

**Adresse I2C du BME280** : `0x76` (par défaut) ou `0x77` (si SDO connecté à VCC)
- Vérifier avec un scan I2C si problème (voir section Troubleshooting)

**Pas de résistance pull-up externe nécessaire** : le module BME280 les inclut déjà (10 kΩ).

### Montage sur breadboard

1. **Insérer ESP32** sur les colonnes du breadboard (laisse accès aux deux côtés des pins)
2. **Capteur** sur une autre zone du breadboard
3. **Câbles Dupont** pour relier selon le schéma ci-dessus

**Astuce sécurité** : brancher d'abord tous les fils **sauf VCC**, puis VCC en dernier (évite court-circuit accidentel).

## Étape 3 : Créer l'appareil ESPHome

1. **ESPHome → + Nouvel appareil**
2. **Nom de l'appareil** : `capteur-salon` (minuscules, tirets, pas d'espaces ni accents)
3. **Type d'appareil** : sélectionner **ESP32-C6** (ou ESP32-S3 selon votre carte)
4. **Configuration WiFi** :
   - SSID : nom de votre réseau WiFi 2,4 GHz (ESP32 ne supporte pas 5 GHz)
   - Mot de passe WiFi
5. **Clé API** : générée automatiquement (chiffrement communication HA ↔ ESP32)

**Conseil WiFi** : utiliser le **2,4 GHz** uniquement (portée 50 m vs 15 m pour 5 GHz). Désactiver temporairement l'isolation client AP (mode invité) si l'ESP32 ne se connecte pas.

## Étape 4 : Premier flashage USB

1. **Brancher l'ESP32** en USB-C au PC (celui qui exécute le navigateur Home Assistant)
2. **ESPHome → Install → Plug into this computer**
3. Le navigateur demande l'autorisation USB : **sélectionner** le port série (COM3 sur Windows, /dev/ttyUSB0 sur Linux)
4. **Install** : ESPHome compile (2–3 min) et flashe le firmware (30 secondes)

**LED de statut** (sur l'ESP32) :
- Clignote rapidement = connexion WiFi en cours
- Fixe = connecté à Home Assistant

**Si erreur "Failed to connect"** :
- Maintenir le bouton **BOOT** (sur l'ESP32) pendant 5 secondes tout en branchant l'USB
- Certains câbles USB-C sont "charge-only" : tester avec un autre

**Port série non détecté (Windows)** :
- Installer pilote CP210x ou CH340 (selon puce USB de votre DevKit) : voir site du fabricant

Une fois flashé, l'ESP32 apparaît dans **Paramètres → Appareils et services** (intégration ESPHome automatique).

## Étape 5 : Ajouter le capteur DHT22 dans le YAML

**Retourner sur ESPHome → cliquer sur EDIT** (bouton crayon) de votre appareil `capteur-salon`.

**Code YAML complet DHT22** :

```yaml
# Configuration générée automatiquement
esphome:
  name: capteur-salon
  friendly_name: Capteur Salon

esp32:
  board: esp32-c6-devkitc-1
  variant: ESP32C6
  framework:
    type: esp-idf

# WiFi
wifi:
  ssid: "VotreSSID"
  password: "VotreMotDePasse"
  
  # Si connexion échoue, active point d'accès de secours
  ap:
    ssid: "Capteur-Salon"
    password: "12345678"

# API Home Assistant (chiffrée)
api:
  encryption:
    key: "votre-clé-générée-automatiquement"

# OTA (mise à jour sans fil)
ota:
  - platform: esphome
    password: "mot-de-passe-ota-généré"

# Logs via WiFi (debug)
logger:
  level: INFO

# Capteur DHT22
sensor:
  - platform: dht
    pin: GPIO4
    model: DHT22
    temperature:
      name: "Température Salon"
      id: temp_salon
      accuracy_decimals: 1
      filters:
        - offset: -0.5  # Calibration si nécessaire
        - sliding_window_moving_average:
            window_size: 3
            send_every: 1
    humidity:
      name: "Humidité Salon"
      id: hum_salon
      accuracy_decimals: 0
      filters:
        - offset: 0
    update_interval: 60s

# Signal WiFi (optionnel, utile pour diagnostiquer portée)
  - platform: wifi_signal
    name: "Signal WiFi Capteur Salon"
    update_interval: 120s

# Uptime (temps depuis dernier redémarrage)
  - platform: uptime
    name: "Uptime Capteur Salon"
    update_interval: 300s

# Bouton redémarrage (depuis HA)
button:
  - platform: restart
    name: "Redémarrer Capteur Salon"
```

**Explications du code** :

- **`pin: GPIO4`** : broche DATA du DHT22
- **`model: DHT22`** : change en `DHT11` si vous avez un DHT11 (moins précis)
- **`accuracy_decimals: 1`** : affiche 21,4 °C (1 décimale)
- **`filters: offset`** : ajuste calibration (+/- valeur si écart constaté)
- **`sliding_window_moving_average`** : moyenne glissante sur 3 mesures (lisse variations brusques)
- **`update_interval: 60s`** : lecture toutes les 60 secondes (ne pas descendre sous 2 secondes pour DHT22, risque freeze)

**Enregistrer** et **Install → Wirelessly** (OTA) : le firmware se met à jour sans câble (30 secondes).

## Étape 6 : Variante BME280 (I2C)

Si vous utilisez un BME280, **remplacer la section `sensor:`** du YAML par :

```yaml
# I2C
i2c:
  sda: GPIO6
  scl: GPIO7
  scan: true  # Affiche l'adresse I2C détectée dans les logs

sensor:
  - platform: bme280_i2c
    temperature:
      name: "Température Salon"
      id: temp_salon
      oversampling: 16x
      accuracy_decimals: 1
    humidity:
      name: "Humidité Salon"
      id: hum_salon
      oversampling: 16x
      accuracy_decimals: 0
    pressure:
      name: "Pression Atmosphérique Salon"
      id: pression_salon
      accuracy_decimals: 1
    address: 0x76
    update_interval: 60s
```

**Différences BME280** :
- `oversampling: 16x` : meilleure précision (±0,5 °C → ±0,2 °C en moyenne)
- `pressure` : pression en hPa (hectopascals) — baisse = pluie probable, hausse = beau temps
- `address: 0x76` : changer en `0x77` si votre module utilise cette adresse

**Tester l'adresse I2C** : voir les logs ESPHome après installation (le `scan: true` affiche les périphériques détectés).

## Étape 7 : Intégration dans Home Assistant

Après installation OTA, l'ESP32 crée automatiquement :

**Entités** (visibles dans **Paramètres → Appareils → ESPHome → Capteur Salon**) :
- `sensor.temperature_salon` (°C)
- `sensor.humidite_salon` (%)
- `sensor.signal_wifi_capteur_salon` (dBm)
- `sensor.uptime_capteur_salon` (secondes)

**Ajouter au dashboard** :

1. **Vue d'ensemble → Modifier le tableau de bord**
2. **+ Ajouter une carte → Entités**
3. Sélectionner `sensor.temperature_salon` et `sensor.humidite_salon`
4. Personnaliser icônes : `mdi:thermometer` (température), `mdi:water-percent` (humidité)

**Carte graphique historique** :

```yaml
type: history-graph
entities:
  - sensor.temperature_salon
  - sensor.humidite_salon
hours_to_show: 24
refresh_interval: 0
```

## Étape 8 : Automatisations avec le capteur

### Automatisation 1 : Chauffage si température < 19 °C

**Scénario** : allumer un radiateur connecté (prise Zigbee) quand la température descend sous 19 °C entre 6h et 22h.

```yaml
automation:
  - alias: "Chauffage salon automatique"
    trigger:
      - platform: numeric_state
        entity_id: sensor.temperature_salon
        below: 19
    condition:
      - condition: time
        after: "06:00:00"
        before: "22:00:00"
      - condition: state
        entity_id: binary_sensor.presence_salon
        state: "on"  # Optionnel : ne chauffer que si présence
    action:
      - service: switch.turn_on
        target:
          entity_id: switch.prise_radiateur_salon
      - service: notify.mobile_app_mon_telephone
        data:
          title: "🔥 Chauffage activé"
          message: "Température salon : {{ states('sensor.temperature_salon') }}°C"
```

**Arrêt automatique à 21 °C** :

```yaml
automation:
  - alias: "Arrêt chauffage salon 21°C"
    trigger:
      - platform: numeric_state
        entity_id: sensor.temperature_salon
        above: 21
    action:
      - service: switch.turn_off
        target:
          entity_id: switch.prise_radiateur_salon
```

### Automatisation 2 : Alerte humidité excessive (> 70 %)

**Scénario** : notification si humidité > 70 % pendant 1 heure (risque moisissures).

```yaml
automation:
  - alias: "Alerte humidité salon"
    trigger:
      - platform: numeric_state
        entity_id: sensor.humidite_salon
        above: 70
        for: "01:00:00"
    action:
      - service: notify.mobile_app_mon_telephone
        data:
          title: "💧 Humidité excessive"
          message: "Salon : {{ states('sensor.humidite_salon') }}% — aérer 10 minutes"
```

### Automatisation 3 : Enregistrer min/max journaliers

Créer des capteurs template qui retiennent les valeurs extrêmes de la journée.

```yaml
template:
  - sensor:
      - name: "Température Salon Min Aujourd'hui"
        state: >
          {{ state_attr('sensor.temperature_salon', 'min_value') | default(99) | round(1) }}
        unit_of_measurement: "°C"
      - name: "Température Salon Max Aujourd'hui"
        state: >
          {{ state_attr('sensor.temperature_salon', 'max_value') | default(-99) | round(1) }}
        unit_of_measurement: "°C"

automation:
  - alias: "Reset min/max température 00:00"
    trigger:
      - platform: time
        at: "00:00:00"
    action:
      - service: input_number.set_value
        target:
          entity_id: input_number.temp_min_reset
        data:
          value: 99
```

*(Configuration avancée : utiliser l'intégration Min/Max ou History Stats pour données précises.)*

## Étape 9 : Dashboard et visualisation

**Carte thermostat personnalisée** (type gauge) :

```yaml
type: gauge
entity: sensor.temperature_salon
name: Température Salon
min: 10
max: 30
severity:
  green: 18
  yellow: 15
  red: 10
```

**Carte combo température + humidité** (type entities) :

```yaml
type: entities
title: Climat Salon
entities:
  - entity: sensor.temperature_salon
    name: Température
    icon: mdi:thermometer
  - entity: sensor.humidite_salon
    name: Humidité
    icon: mdi:water-percent
  - entity: sensor.pression_atmospherique_salon  # Si BME280
    name: Pression
    icon: mdi:gauge
```

## Troubleshooting : 5 problèmes courants

### Problème 1 : ESP32 ne se connecte pas au WiFi

**Symptômes** :
- LED clignote rapidement indéfiniment
- Logs ESPHome : `WiFi connection failed` ou `Authentication timeout`

**Causes** :
- WiFi 5 GHz au lieu de 2,4 GHz
- SSID ou mot de passe incorrect (attention espaces, majuscules)
- Isolation client AP activée (mode invité)
- Routeur trop loin (> 50 m ou 3 murs épais)

**Solutions** :
1. Vérifier que le routeur émet bien un réseau **2,4 GHz** (pas seulement 5 GHz)
2. **Retaper manuellement** SSID et mot de passe dans le YAML (copier-coller peut ajouter caractères invisibles)
3. Désactiver **isolation AP / mode invité** temporairement sur le routeur
4. Rapprocher l'ESP32 du routeur (< 10 m) pour le test initial
5. Si échec : activer le point d'accès de secours (section `ap:` dans le YAML) et se connecter au WiFi `Capteur-Salon` avec mot de passe `12345678` → portail de config ESPHome apparaît

### Problème 2 : DHT22 renvoie "NaN" (pas de valeur)

**Symptômes** :
- Home Assistant affiche `unknown` ou `unavailable`
- Logs ESPHome : `Invalid reading from DHT sensor`

**Causes** :
- Câblage incorrect (DATA pas sur GPIO4 ou VCC/GND inversés)
- DHT22 défectueux (5 % des DHT22 cheap AliExpress sont DOA)
- Pas de résistance pull-up sur câble > 50 cm
- `update_interval` trop court (< 2 secondes)

**Solutions** :
1. **Vérifier câblage** : DATA → GPIO4, VCC → 3.3V, GND → GND
2. **Tester avec un autre pin** : changer `pin: GPIO4` en `pin: GPIO5` dans le YAML
3. **Ajouter résistance 4,7 kΩ** entre VCC et DATA (ou 10 kΩ)
4. **Augmenter `update_interval`** : passer de 60s à 120s (DHT22 n'aime pas lectures fréquentes)
5. **Mesurer tension VCC** : doit être 3,2–3,4V (si 2,8V = ESP32 sous-alimenté, changer câble USB)

### Problème 3 : BME280 non détecté (I2C)

**Symptômes** :
- Logs : `I2C device not found at address 0x76`
- Entités température/humidité absentes

**Causes** :
- Mauvais pinout SDA/SCL (confusion GPIO6/GPIO21)
- Adresse I2C incorrecte (0x76 vs 0x77)
- Court-circuit ou câble défectueux

**Solutions** :
1. **Activer scan I2C** : ajouter `scan: true` dans la section `i2c:` et vérifier les logs (affiche adresses détectées)
2. **Tester adresse 0x77** : changer `address: 0x76` en `address: 0x77` dans le YAML
3. **Vérifier pinout** : certains ESP32-C6 utilisent GPIO21 (SDA) et GPIO22 (SCL) au lieu de GPIO6/7
4. **Mesurer signaux** : avec un multimètre, vérifier que SDA et SCL ont 3,3V au repos (pull-up actives)
5. **Tester module BME280 séparément** : brancher sur un Arduino Uno avec bibliothèque Adafruit_BME280 (élimine doute ESP32)

### Problème 4 : Valeurs de température incorrectes (+5 °C d'écart)

**Symptômes** :
- Capteur affiche 25 °C, thermomètre référence indique 20 °C
- Écart constant (pas fluctuant)

**Causes** :
- Auto-échauffement ESP32 (WiFi actif = +2 °C)
- Capteur trop près d'une source de chaleur (ESP32, alimentation)
- Calibration usine approximative

**Solutions** :
1. **Éloigner DHT22 de l'ESP32** : utiliser des câbles Dupont de 20–30 cm (ou rallonge)
2. **Ajouter deep sleep** (avancé) : ESP32 se réveille 10 secondes pour lire capteur, rendort 5 minutes → économie + pas d'échauffement
3. **Calibrer avec offset** : dans le YAML, ajuster `filters: - offset: -2.0` (si capteur lit 2 °C de trop)
4. **Comparer avec thermomètre médical** (précis ±0,1 °C) dans un verre d'eau à température ambiante

### Problème 5 : Mises à jour OTA échouent

**Symptômes** :
- ESPHome : `Failed to connect to capteur-salon.local`
- Impossible d'installer nouvelle version sans câble USB

**Causes** :
- mDNS bloqué (certain routeurs filtrent Bonjour/Avahi)
- Firewall bloque port OTA (6053)
- ESP32 crashé (boucle infinie dans code custom)

**Solutions** :
1. **Utiliser IP directe** : dans ESPHome, éditer l'appareil et remplacer `capteur-salon.local` par `192.168.1.42` (votre IP ESP32)
2. **Désactiver firewall temporairement** : tester avec Windows Firewall off
3. **Ajouter `use_address`** dans le YAML (force IP fixe) :
   ```yaml
   wifi:
     use_address: 192.168.1.42
   ```
4. **Flasher USB en dernier recours** : rebrancher l'ESP32 et installer via "Plug into this computer"

## Options avancées : boîtier et alimentation batterie

### Boîtier imprimé 3D

**Modèles recommandés (Printables/Thingiverse)** :
- "ESP32 DHT22 enclosure" : boîtier 80 × 60 × 40 mm avec découpes aération
- "BME280 weather station case" : boîtier IP44 pour extérieur (PLA+)

**Conseils impression** :
- Matériau : **PETG** (résiste UV et chaleur > PLA)
- Infill 20 %, supports sur découpes
- Laisser **2–3 trous d'aération** pour circulation air (sinon auto-échauffement +3 °C)

### Alimentation batterie Li-ion

**Pour capteur nomade ou extérieur sans WiFi proche.**

**Matériel supplémentaire** :
- Batterie 18650 (3,7V 3000 mAh) : 3–5 €
- Module TP4056 (charge + protection) : 1 €
- Régulateur 3,3V (AMS1117 ou LDO) : 0,50 €
- Panneau solaire 6V 1W (optionnel) : 5 €

**Câblage batterie → ESP32** :
```
Batterie 18650 → TP4056 OUT+ → AMS1117 IN → AMS1117 OUT → ESP32 3.3V
                 TP4056 OUT- → GND → ESP32 GND
Panneau solaire → TP4056 IN+ / IN-
```

**Autonomie** : 3000 mAh ÷ 80 mA (ESP32-C6 WiFi actif) ≈ **37 heures en continu**.

**Améliorer autonomie avec deep sleep** :

```yaml
deep_sleep:
  id: deep_sleep_capteur
  run_duration: 10s  # Réveil 10 secondes
  sleep_duration: 5min  # Dort 5 minutes

# Lire capteur au réveil
sensor:
  - platform: dht
    # ... config DHT22 ...
    on_value:
      then:
        - deep_sleep.enter: deep_sleep_capteur
```

**Autonomie avec deep sleep** : 3000 mAh ÷ (80 mA × 10s + 0,01 mA × 290s) / 300s ≈ **3–4 mois** (!).

### Utilisation extérieure (jardin, serre)

**DHT22 n'est pas étanche** (IP20) → **ajouter protection** :

- **Boîtier Stevenson screen DIY** : boîte blanche avec persiennes (circulation air, ombre)
- **Module BME280 IP65** : existe en version protégée (membrane Gore-Tex)
- **Câble étanche** : gaine thermorétractable sur connexions

**Limites température** :
- DHT22 : -40 à +80 °C (OK hiver France)
- BME280 : -40 à +85 °C
- ESP32-C6 : -40 à +105 °C (puce résistante)

## FAQ

**Quelle différence entre ESP32-C6, S3 et original ESP32 ?**
**ESP32-C6** : puce RISC-V, WiFi 6, Zigbee/Thread, 20 mA en veille (2026, meilleur). **ESP32-S3** : dual-core Xtensa, pas Zigbee, 40 mA en veille, plus de GPIO (2022). **ESP32 original** : 2016, WiFi 4, 80 mA en veille (obsolète). Pour domotique 2026 : **C6 recommandé**.

**DHT22 ou BME280, lequel choisir ?**
**DHT22** : 3 €, facile (1-wire), précision OK (±0,5 °C). **BME280** : 6 €, I2C, précision +++ (±0,2 °C avec oversampling), bonus pression atmosphérique. Pour projet sérieux : **BME280**. Pour tester : **DHT22**.

**L'ESP32 consomme-t-il beaucoup en veille ?**
**ESP32-C6 WiFi actif** : 80 mA × 3,3V = 260 mW. Sur batterie 3000 mAh : 37h. **Avec deep sleep** : 0,01 mA → 3 mois. Sur secteur USB : négligeable (2 kWh/an = 0,40 €). Zigbee pur débutants : batterie < 1 an.

**Peut-on utiliser plusieurs capteurs ESP32 dans la même maison ?**
Oui, créer un appareil ESPHome par ESP32 (noms différents : `capteur-salon`, `capteur-chambre`, etc.). Limite : WiFi (50 clients sur routeur classique). Astuce : 1 ESP32 avec **plusieurs capteurs Dallas DS18B20** (1-wire bus) = 10 capteurs sur 1 ESP32.

**ESPHome fonctionne-t-il sans Home Assistant ?**
Oui (API standalone), mais **recommandé avec HA** pour dashboard et automatisations. Alternative : MQTT → Node-RED / Domoticz. ESPHome = firmware ESP32, HA = interface.

**Comment sécuriser l'API ESPHome (empêcher accès externe) ?**
L'**`encryption: key`** chiffre déjà les communications HA ↔ ESP32. Pour bloquer accès LAN : ajouter **`password: "secret"`** dans section `api:`. Pare-feu routeur : bloquer port 6053 externe (ne pas exposer à Internet, pas de port-forwarding).

## Pour aller plus loin

- [10 projets ESP32 domotique](/domotique/projets-esp32-domotique/) : relais, LED RGB, écran OLED, PIR
- [Capteur température Zigbee](/domotique/capteur-temperature-zigbee/) : alternative sans câblage (pile, plug & play)
- [Installer Home Assistant sur Raspberry Pi 5](/domotique/home-assistant-raspberry-pi-5-installation/) : créer la box domotique
- [Prise connectée Zigbee](/domotique/prise-connectee-zigbee-home-assistant/) : automatiser radiateur avec ce capteur
- [Hub domotique](/domotique/) : retour accueil section

---

*Affiliation : liens Amazon avec tag manuso06-21, commission ~3 % catégorie Électronique. Prix octobre 2026, indicatifs. Notre sélection basée sur recherche, sans tests physiques.*
