---
title: "Installer Home Assistant sur Raspberry Pi 5 : guide complet 2026"
description: "Tutoriel pas à pas : installer Home Assistant OS sur Raspberry Pi 5, boot NVMe, configuration initiale, premier dongle Zigbee. Actualisé octobre 2026."
pubDate: 2026-10-18T00:00:00Z
category: "home-assistant"
products: ["raspberry-pi-5", "sonoff-zbdongle-e"]
priority: 3
---

Installer **Home Assistant sur Raspberry Pi 5** est devenu très simple en 2026 grâce au **Raspberry Pi Imager** et au boot direct sur SSD NVMe. Ce guide vous montre l'installation complète, de la carte SD au premier capteur Zigbee, en moins d'une heure.

## Matériel nécessaire

**Obligatoire :**
- Raspberry Pi 5 (4 Go suffit pour la domotique, 8 Go pour +50 caméras) : 70–110 €
- Alimentation officielle 27 W USB-C : 12 €
- Carte microSD 32 Go (démarrage initial) : 8 €

**Recommandé :**
- SSD NVMe M.2 2280 (256–512 Go) + HAT M.2 : 35–60 €. Le Pi 5 boote directement sur NVMe depuis 2024.
- Boîtier avec ventilateur : 10–15 €

**Pour Zigbee :**
- Dongle Zigbee **SONOFF ZBDongle-E** : 16–25 €

*Liens Amazon (tag manuso06-21) : [Pi 5 4 Go](https://www.amazon.fr/s?k=raspberry+pi+5+4gb&tag=manuso06-21), [ZBDongle-E B0B6P22YJC](https://www.amazon.fr/dp/B0B6P22YJC?tag=manuso06-21).*

**Budget total :** 120–180 € selon config. [Comparaison avec Home Assistant Green ici](/domotique/home-assistant-green-vs-raspberry-pi-5/).

## Étape 1 : Télécharger et flasher Home Assistant OS

1. **Télécharger Raspberry Pi Imager** : [rptl.io/imager](https://www.raspberrypi.com/software/)
2. **Lancer l'Imager**, choisir :
   - **Appareil** : Raspberry Pi 5
   - **Système d'exploitation** : *Autre → Home Assistant*
   - **Stockage** : votre carte microSD

3. **Paramètres avancés** (roue crantée) :
   - Hostname : `homeassistant` (facultatif)
   - Ne PAS activer SSH (Home Assistant OS le gère autrement)
   - Wi-Fi : configurer si pas d'Ethernet

4. **Écrire** : 5–10 minutes.

5. **Insérer la carte** dans le Pi 5, brancher Ethernet (recommandé) et alimentation.

## Étape 2 : Premier démarrage et accès Web

Le Pi 5 démarre sur Home Assistant OS (basé sur Linux). **Attendre 5–10 minutes** (premier boot + téléchargement des conteneurs Docker).

**Accès Web :**
- Depuis un navigateur : `http://homeassistant.local:8123`
- Si ça ne fonctionne pas, trouver l'IP du Pi sur votre box (ex. `http://192.168.1.42:8123`)

**Écran de bienvenue :**
1. **Créer un compte** (local, pas de cloud)
2. **Nom de la maison**, localisation (pour les automatisations soleil)
3. **Détection automatique** : HA trouve souvent la box Internet, Freebox, TV, etc.

## Étape 3 : Configuration initiale

### Mettre à jour
**Paramètres → Système → Mises à jour** : installer tout (core, supervisor, OS). Relancer.

### Désactiver la découverte cloud (optionnel)
Si on veut du 100 % local :
- **Paramètres → Intégrations → Découvertes** : désactiver *Google Cast*, *Spotify*, etc.

### Ajouter l'app mobile
**Paramètres → Companion App** : scanner le QR code depuis l'app Home Assistant (iOS/Android). Permet notifications et contrôle mobile.

## Étape 4 : Brancher le dongle Zigbee

1. **Brancher** le ZBDongle-E sur un port USB du Pi 5
2. **Paramètres → Modules complémentaires** :
   - Installer **Zigbee Home Automation (ZHA)**
   - Démarrer et activer "Démarrage automatique"

3. **Ajouter l'intégration ZHA** :
   - **Paramètres → Appareils et services → Ajouter → ZHA**
   - Sélectionner `/dev/ttyUSB0` (port série du dongle)
   - Laisser les paramètres par défaut

4. **Appairer un premier capteur** :
   - **Appareils Zigbee → Ajouter un appareil**
   - Maintenir le bouton du capteur SONOFF 5 secondes (LED clignote)
   - Il apparaît dans HA après 10–30 secondes

*Alternative : [Zigbee2MQTT vs ZHA, lequel choisir ?](/domotique/home-assistant-zigbee2mqtt-ou-zha/)*

## Étape 5 : Première automatisation

**Exemple** : allumer une prise si température < 18 °C.

1. **Paramètres → Automatisations et scènes → Créer une automatisation**
2. **Déclencheur** : "Capteur température" → en dessous de → 18
3. **Action** : "Allumer" → sélectionner la prise Zigbee
4. **Enregistrer** avec un nom ("Chauffage salon < 18 °C")

**Tester** : baisser manuellement la température du capteur (le mettre au congélateur 2 minutes) ou attendre qu'elle baisse naturellement.

## Bonus : Migrer vers SSD NVMe (optionnel)

Le Pi 5 peut **booter directement sur NVMe** sans carte SD (firmware 2024+).

1. **Installer le HAT M.2** sur le Pi 5
2. **Flasher HAOS** sur le SSD avec Raspberry Pi Imager (même méthode que la microSD)
3. **Éteindre** le Pi, retirer la carte SD, brancher le SSD
4. **Démarrer** : le Pi boot sur NVMe (10× plus rapide)

**Restaurer une sauvegarde** :
- Avant migration : **Paramètres → Système → Sauvegardes → Créer**
- Après boot NVMe : **Paramètres → Système → Sauvegardes → Restaurer** (transférer le fichier .tar via l'interface Web)

## Dépannage

**HA ne démarre pas après 20 minutes**
- Vérifier les LEDs du Pi (verte clignote = boot, rouge fixe = alimentation OK)
- Retirer le dongle Zigbee, redémarrer
- Reflasher la carte SD

**`homeassistant.local` ne fonctionne pas**
- Utiliser l'IP directe : `http://192.168.1.x:8123`
- Installer Bonjour sur Windows (inclus dans iTunes)

**Le dongle Zigbee n'est pas détecté**
- Vérifier `ls /dev/ttyUSB*` dans le terminal SSH (activer SSH dans les modules complémentaires)
- Changer de port USB
- Certains câbles USB-C → USB-A sont défectueux : tester avec un autre

## Pour aller plus loin

- [Comparatif Green vs Raspberry Pi 5](/domotique/home-assistant-green-vs-raspberry-pi-5/)
- [Meilleure clé Zigbee](/domotique/meilleur-dongle-zigbee-home-assistant/)
- [Capteur température Zigbee](/domotique/capteur-temperature-zigbee/)
- [Prise connectée Zigbee](/domotique/prise-connectee-zigbee-home-assistant/)
- [Projets ESP32 + ESPHome](/domotique/projets-esp32-domotique/)

---

*Affiliation : liens Amazon avec tag manuso06-21, commission ~3 % catégorie Électronique. Prix octobre 2026, indicatifs.*
