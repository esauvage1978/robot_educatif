---
title: "Meilleure clé Zigbee pour Home Assistant 2026 : notre sélection"
description: "SONOFF ZBDongle-E, Connect ZBT-2, Dongle Lite MG21 : comparatif des dongles Zigbee 3.0 pour Home Assistant. Compatibilité ZHA et Zigbee2MQTT."
pubDate: 2026-10-18T00:00:00Z
category: "home-assistant"
products: ["sonoff-zbdongle-e", "sonoff-dongle-lite-mg21"]
priority: 5
---

Choisir un **dongle Zigbee** pour Home Assistant, c'est la clé d'un réseau stable avec des dizaines de capteurs et prises connectées. Voici notre sélection 2026.

## Les 3 dongles recommandés

### 1. SONOFF ZBDongle-E (notre choix n°1)

**Prix** : 16–25 €  
**Puce** : Silabs EFR32MG21  
**Zigbee** : 3.0  
**Compatible** : ZHA, Zigbee2MQTT

✅ **Avantages** : rapport qualité/prix imbattable, firmware modifiable, antenne externe (portée 50 m indoor), compatible 90 % des capteurs du marché  
❌ **Inconvénients** : boîtier plastique fragile

**Pour qui ?** Tout le monde. C'est le standard de facto en 2026.

*Lien Amazon : [SONOFF ZBDongle-E B0B6P22YJC](https://www.amazon.fr/dp/B0B6P22YJC?tag=manuso06-21).*

### 2. Home Assistant Connect ZBT-2

**Prix** : 45–80 € (ruptures fréquentes en 2026)  
**Puce** : Silabs EFR32MG21 + nRF52840 (Thread/Matter)  
**Zigbee + Thread** : futur-proof

✅ **Support officiel Nabu Casa**, Thread/Matter natif  
❌ **Prix élevé**, disponibilité aléatoire

**Pour qui ?** Les early adopters Matter. [Comparatif avec ZBDongle-E](/domotique/home-assistant-green-vs-raspberry-pi-5/).

*Lien Amazon : [HA Connect ZBT-2 B0G34ZTW51](https://www.amazon.fr/dp/B0G34ZTW51?tag=manuso06-21).*

### 3. SONOFF Dongle Lite MG21

**Prix** : 15–20 €  
**Puce** : EFR32MG21 (même que ZBDongle-E)  
**Zigbee + Thread**

✅ **Le moins cher**, Thread inclus  
❌ **Antenne interne** (portée réduite), pas de boîtier

**Pour qui ?** Budget mini, appartement < 70 m².

## Tableau comparatif

| Modèle | Prix | Antenne | Thread | Portée | ZHA | Z2M |
|--------|------|---------|--------|--------|-----|-----|
| **ZBDongle-E** | 16–25 € | Externe | ❌ | 50 m | ✅ | ✅ |
| **ZBT-2** | 45–80 € | Externe | ✅ | 50 m | ✅ | ✅ |
| **Dongle Lite MG21** | 15–20 € | Interne | ✅ | 25 m | ✅ | ✅ |

*Prix octobre 2026, indicatifs.*

## ZHA ou Zigbee2MQTT ?

**ZHA** : intégré dans Home Assistant, simple, plug & play. Recommandé pour débuter.

**Zigbee2MQTT** : module complémentaire externe, plus d'options de config, compatible 2500+ appareils. Pour utilisateurs avancés.

[Guide complet ZHA vs Z2M ici](/domotique/home-assistant-zigbee2mqtt-ou-zha/).

## Installation (ZBDongle-E + ZHA)

1. Brancher le dongle sur un port USB du Pi/Green
2. **Paramètres → Modules complémentaires → Zigbee Home Automation**
3. **Paramètres → Intégrations → Ajouter → ZHA**
4. Sélectionner `/dev/ttyUSB0`
5. Appairer un capteur : maintenir bouton 5 sec

## Pour aller plus loin

- [Installer Home Assistant sur Pi 5](/domotique/home-assistant-raspberry-pi-5-installation/)
- [Capteur température Zigbee](/domotique/capteur-temperature-zigbee/)
- [Prise Zigbee](/domotique/prise-connectee-zigbee-home-assistant/)

---

*Affiliation : liens Amazon tag manuso06-21, ~3 % commission. Prix octobre 2026.*
