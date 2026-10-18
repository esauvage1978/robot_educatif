---
title: "Capteur température Zigbee Home Assistant : SNZB-02D, Aqara T1"
description: "Comparatif capteurs température et humidité Zigbee 2026 : SONOFF SNZB-02D, Aqara T1. Prix, autonomie, précision, compatibilité ZHA."
pubDate: 2026-10-18T00:00:00Z
category: "guides-achat"
products: ["sonoff-snzb-02d"]
priority: 7
---

Un **capteur température Zigbee** surveille chaque pièce, automatise le chauffage et alerte si ça sèche trop ou gèle. Voici les meilleurs en 2026 pour Home Assistant.

## Top 2 capteurs température

### 1. SONOFF SNZB-02D (notre choix)

**Prix** : 11–19 € (lot de 2 : 25 €)  
**Mesure** : température, humidité  
**Écran LCD** : oui  
**Autonomie** : 2 ans (pile CR2450)  
**Précision** : ±0,2 °C, ±2 % RH

✅ **Écran intégré** : pas besoin d'ouvrir HA pour voir la température  
✅ **Le moins cher** avec écran LCD  
✅ Compatible ZHA, Z2M

**Pour qui ?** Tout le monde. Rapport qualité/prix imbattable.

*Lien Amazon : [SNZB-02D B0BYZP8NK2](https://www.amazon.fr/dp/B0BYZP8NK2?tag=manuso06-21).*

### 2. Aqara T1 (WSDCGQ11LM)

**Prix** : 15–20 €  
**Mesure** : température, humidité, pression atmosphérique  
**Écran** : e-ink  
**Autonomie** : 1–2 ans (pile CR2032)

✅ Design élégant, pression atmosphérique (prédire météo)  
❌ Plus cher, pas de stock stable en France

**Pour qui ?** Fans de design, météo locale.

## Tableau comparatif

| Modèle | Prix | Écran | Précision | Autonomie | Pression |
|--------|------|-------|-----------|-----------|----------|
| **SNZB-02D** | 11–19 € | LCD | ±0,2 °C | 2 ans | ❌ |
| **Aqara T1** | 15–20 € | e-ink | ±0,3 °C | 1–2 ans | ✅ |

*Prix octobre 2026.*

## Utilisation typique

**Chauffage intelligent** : allumer radiateur si < 18 °C, couper si > 21 °C  
**Chambre bébé** : alerte si < 18 °C ou > 24 °C la nuit  
**Cave/grenier** : surveiller gel/moisissure (< 5 °C ou > 70 % humidité)

**Exemple automatisation** :
```yaml
automation:
  - alias: "Alerte chambre froide"
    trigger:
      platform: numeric_state
      entity_id: sensor.snzb_02d_chambre_temperature
      below: 17
    action:
      - service: notify.mobile_app
        data:
          message: "Chambre < 17 °C !"
```

## Installation

1. Retirer la languette pile
2. **ZHA → Ajouter appareil**
3. Maintenir bouton 5 sec (écran clignote)
4. Il apparaît : `sensor.snzb_02d_temperature`, `sensor.snzb_02d_humidity`

## Où placer les capteurs ?

❌ **Pas** : près d'une fenêtre, radiateur, lumière directe soleil  
✅ **Oui** : centre de pièce, 1,5 m du sol, circulation d'air normale

**Combien ?** 1 par pièce chauffée (salon, chambres, bureau). Pas besoin dans WC/couloir.

## Pour aller plus loin

- [Prise Zigbee](/domotique/prise-connectee-zigbee-home-assistant/)
- [Installer Home Assistant](/domotique/home-assistant-raspberry-pi-5-installation/)
- [Projets ESP32 DIY](/domotique/projets-esp32-domotique/)

---

*Affiliation Amazon tag manuso06-21, ~3 % commission.*
