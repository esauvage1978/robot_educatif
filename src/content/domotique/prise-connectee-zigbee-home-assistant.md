---
title: "Prise connectée Zigbee Home Assistant : notre sélection 2026"
description: "NOUS A1Z, Tapo P110, SONOFF S60ZB : comparatif prises Zigbee avec mesure de consommation pour Home Assistant. Répéteurs, compatibilité ZHA."
pubDate: 2026-10-18T00:00:00Z
category: "guides-achat"
products: ["nous-a1z", "tapo-p110"]
priority: 6
---

Les **prises connectées Zigbee** mesurent la consommation, automatisent les appareils et **font répéteur** pour étendre le réseau Zigbee. Voici notre sélection Home Assistant 2026.

## Top 3 prises Zigbee

### 1. NOUS A1Z (meilleur choix)

**Prix** : 15–17 €  
**Protocole** : Zigbee 3.0  
**Mesure** : oui (W, kWh, tension, courant)  
**Répéteur** : oui  
**Charge max** : 16 A (3680 W)

✅ Prise type E (FR), compact, bouton physique, LED désactivable  
✅ Compatible ZHA et Zigbee2MQTT  
✅ Fait répéteur Zigbee (essentiel pour maillage)

**Pour qui ?** Standard français, mesure précise, très bon rapport qualité/prix.

*Recherche Amazon : [NOUS A1Z Zigbee](https://www.amazon.fr/s?k=NOUS+A1Z&tag=manuso06-21).*

### 2. Tapo P110 (Wi-Fi, sans Zigbee)

**Prix** : 10–15 €/prise (lot de 4 : 45 €)  
**Protocole** : Wi-Fi 2,4 GHz  
**Mesure** : oui

✅ **Le moins cher**, app Tapo simple  
❌ **Wi-Fi** : pas de répéteur, dépend du cloud Tapo (intégration HA via HACS)

**Pour qui ?** Débuter sans box Zigbee. [Guide débutant](/domotique/debuter-domotique-par-ou-commencer/).

*Lien Amazon : [Tapo P110 lot FR B0CJC8WMXV](https://www.amazon.fr/dp/B0CJC8WMXV?tag=manuso06-21).*

### 3. SONOFF S60ZB

**Prix** : 14–18 €  
**Protocole** : Zigbee 3.0  
**Mesure** : oui

✅ Type E, répéteur, marque fiable  
❌ Plus gros que NOUS A1Z

**Pour qui ?** Alternative si NOUS en rupture.

## Tableau comparatif

| Modèle | Prix | Protocole | Mesure | Type prise | Répéteur |
|--------|------|-----------|--------|------------|----------|
| **NOUS A1Z** | 15–17 € | Zigbee | ✅ | E (FR) | ✅ |
| **Tapo P110** | 10–15 € | Wi-Fi | ✅ | E (FR) | ❌ |
| **SONOFF S60ZB** | 14–18 € | Zigbee | ✅ | E (FR) | ✅ |

*Prix octobre 2026.*

## Utilisation typique

**Chauffage d'appoint** : mesurer consommation, couper si fenêtre ouverte (capteur porte SNZB-04P)  
**Lave-linge** : alerte "linge terminé" si conso < 5 W après avoir été > 200 W  
**Veilles** : couper TV, box, chargeurs la nuit

**Exemple automatisation** :
```yaml
automation:
  - alias: "Alerte lave-linge"
    trigger:
      platform: numeric_state
      entity_id: sensor.nous_a1z_lavelinge_power
      below: 5
      for: "00:02:00"
    condition:
      - condition: state
        entity_id: binary_sensor.lavelinge_en_cours
        state: "on"
    action:
      - service: notify.mobile_app
        data:
          message: "Linge terminé !"
```

## Installation ZHA

1. Brancher la prise NOUS A1Z
2. **Appareils → Ajouter → Zigbee (ZHA)**
3. Maintenir bouton 5 sec (LED clignote)
4. Elle apparaît : `sensor.nous_a1z_power`, `switch.nous_a1z`

## Combien de prises pour un bon maillage ?

**1 répéteur tous les 10 m** : en appartement 70 m², 3–4 prises suffisent. En maison 120 m², 6–8.

## Pour aller plus loin

- [Capteur température Zigbee](/domotique/capteur-temperature-zigbee/)
- [Meilleure clé Zigbee](/domotique/meilleur-dongle-zigbee-home-assistant/)
- [Débuter en domotique](/domotique/debuter-domotique-par-ou-commencer/)

---

*Affiliation Amazon tag manuso06-21, ~3 % commission.*
