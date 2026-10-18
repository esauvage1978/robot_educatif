---
title: "Débuter en domotique : par où commencer en 2026 ?"
description: "Guide complet pour débutants : budget, protocoles (Zigbee, Matter, Wi-Fi), premier équipement, box domotique. Nos conseils pour bien démarrer."
pubDate: 2026-10-18T00:00:00Z
category: "debuter"
products: ["tapo-p110", "sonoff-snzb-02d", "home-assistant-green", "sonoff-zbdongle-e"]
priority: 2
---

La domotique fascine, mais **par où commencer** quand on découvre capteurs Zigbee, Home Assistant, Matter, ESP32 et robots aspirateurs connectés ? Ce guide vous donne un **parcours clair** et un **budget raisonnable** pour débuter sans vous noyer dans la technique ni regretter vos achats.

## Qu'est-ce que la domotique, concrètement ?

La domotique, c'est **automatiser et piloter sa maison** avec des objets connectés :

- **Piloter** : allumer une lampe depuis son téléphone, baisser le chauffage à distance.
- **Automatiser** : « éteindre toutes les lumières à 23 h », « m'alerter si une fenêtre reste ouverte avec le chauffage allumé ».
- **Surveiller** : température de chaque pièce, consommation électrique, caméra quand je suis absent.

Contrairement aux années 2010 (solutions propriétaires, abonnements cloud, compatibilité zéro), la domotique 2026 est **ouverte**, **locale** et **abordable**. Les protocoles comme **Zigbee** et le nouveau **Matter** permettent de mélanger les marques. **Home Assistant** (logiciel gratuit) centralise tout sur un Raspberry Pi ou une petite box.

## Les trois questions à se poser avant d'acheter

### 1. Quel est mon budget de départ ?

- **Moins de 50 € :** Wi-Fi uniquement (2 prises Tapo P110 + 1 ampoule L530E). Pilotage via app, sans box.
- **100–150 € :** Zigbee + Raspberry Pi 5 4 Go + dongle Zigbee + 2-3 capteurs SONOFF. Automatisations locales.
- **180–250 € :** Home Assistant Green (box clé en main) + dongle Zigbee HA Connect ZBT-2 + capteurs. Zéro config système.

**Notre conseil :** commencer à 50 €, puis ajouter une box Zigbee si on accroche.

### 2. Où vais-je utiliser la domotique ?

- **Appartement locataire :** privilégier le Wi-Fi ou Zigbee (rien à percer). Éviter les modules encastrés.
- **Maison propriétaire :** Zigbee + modules encastrés (volets, chauffage) possibles.
- **Avec des enfants :** automatisations « heure de lever » (veilleuse), surveillance de température, alerte fenêtre ouverte.

### 3. Suis-je prêt à bricoler ou je veux du clé en main ?

- **Clé en main :** Home Assistant Green + capteurs Zigbee certifiés (SONOFF, Aqara). Tout fonctionne.
- **Bricolage :** Raspberry Pi 5 + ESPHome + capteurs DIY (ESP32, DHT22). Maximum de liberté, plus technique.

## Les protocoles sans fil : Zigbee, Matter, Wi-Fi

| Protocole | Avantages | Inconvénients | Pour qui ? |
|-----------|-----------|---------------|------------|
| **Zigbee 3.0** | Basse conso, maillage (répéteurs), local, mature | Nécessite un hub USB | Capteurs, prises, têtes thermostatiques |
| **Matter** | Universel, certifié, prometteur | Encore jeune (2024-2026), peu d'appareils | Attendre 2027 ou acheter Matter/Zigbee |
| **Wi-Fi 2,4 GHz** | Aucun hub, app simple | Gourmand, dépend du cloud fabricant | Débuter sans investir dans une box |
| **Thread** | Maillage, basse conso, IP natif | Très peu d'appareils (2026) | Futur, pas urgent |

**En 2026, Zigbee reste le meilleur rapport qualité/prix.** Matter arrive, mais Zigbee fonctionne déjà avec des milliers de produits.

## Le parcours recommandé, étape par étape

### Étape 1 : Débuter en Wi-Fi sans box (budget 40–60 €)

**Matériel :**
- 2 prises connectées **Tapo P110** (10–15 € l'unité) : mesure de consommation, programmation horaire.
- 1 ampoule **Tapo L530E** (12–15 €) : couleur RGB, app Tapo.

**Ce qu'on peut faire :**
- Programmer la cafetière le matin.
- Éteindre les veilles la nuit.
- Allumer une veilleuse depuis le canapé.

**Limite :** pas d'automatisations entre appareils (« si température < 18 °C, allumer radiateur »). Chaque marque a son app.

*Liens affiliés Amazon (tag manuso06-21, catégorie Maison ~3 % de commission) : [Tapo P110 lot de 4](https://www.amazon.fr/dp/B0CJC8WMXV?tag=manuso06-21), [Tapo L530E](https://www.amazon.fr/s?k=Tapo+L530E&tag=manuso06-21).*

### Étape 2 : Ajouter une box Zigbee (budget +120–180 €)

Si on accroche, on passe à **Home Assistant** pour automatiser vraiment.

**Option A — Raspberry Pi 5 + dongle (120–150 €) :**
- Raspberry Pi 5 4 Go (70 €) + alimentation 27 W (12 €) + carte microSD 32 Go (8 €).
- Dongle Zigbee **SONOFF ZBDongle-E** (16–25 €).
- [Guide installation ici](/domotique/home-assistant-raspberry-pi-5-installation/).

**Option B — Home Assistant Green (180–215 €) :**
- Box tout-en-un, processeur ARM, Home Assistant OS préinstallé.
- [Comparatif Green vs Pi 5](/domotique/home-assistant-green-vs-raspberry-pi-5/).

*Liens Amazon : [Raspberry Pi 5 4 Go](https://www.amazon.fr/s?k=raspberry+pi+5+4gb&tag=manuso06-21), [ZBDongle-E B0B6P22YJC](https://www.amazon.fr/dp/B0B6P22YJC?tag=manuso06-21), [HA Green B0CXVKSG19](https://www.amazon.fr/dp/B0CXVKSG19?tag=manuso06-21).*

### Étape 3 : Premiers capteurs Zigbee (budget +30–60 €)

Avec Home Assistant + dongle Zigbee, on ajoute :

- **SONOFF SNZB-02D** (11–19 €) : capteur température + humidité LCD. [Guide capteurs température](/domotique/capteur-temperature-zigbee/).
- **SONOFF SNZB-04P** (13–16 €) : capteur ouverture porte/fenêtre.
- **NOUS A1Z** (15–17 €) : prise Zigbee avec mesure de consommation. [Guide prises Zigbee](/domotique/prise-connectee-zigbee-home-assistant/).

*Liens Amazon : [SNZB-02D B0BYZP8NK2](https://www.amazon.fr/dp/B0BYZP8NK2?tag=manuso06-21).*

**Exemple d'automatisation :**
```yaml
# Allumer le radiateur si température < 18 °C entre 6h et 22h
automation:
  - alias: "Chauffage salon"
    trigger:
      - platform: numeric_state
        entity_id: sensor.snzb_02d_salon_temperature
        below: 18
    condition:
      - condition: time
        after: "06:00"
        before: "22:00"
    action:
      - service: switch.turn_on
        target:
          entity_id: switch.nous_a1z_radiateur
```

### Étape 4 : Élargir selon ses besoins

Une fois la base posée, on peut ajouter :

- **Têtes thermostatiques Zigbee** (SONOFF TRVZB, tado X) : économiser le chauffage pièce par pièce.
- **Détecteur de présence** (SNZB-03P PIR, Aqara FP2 mmWave) : allumer automatiquement.
- **Robot aspirateur compatible HA** (Roborock, Dreame) : programmer selon présence. [Robots moins de 200 €](/domotique/robots-aspirateurs/robot-aspirateur-moins-de-200-euros/).
- **Capteurs DIY ESP32 + ESPHome** : température, CO2, relais custom. [Projets ESP32](/domotique/projets-esp32-domotique/).

## Les erreurs classiques à éviter

1. **Acheter sans plan** : lister les pièces et les automatisations qu'on veut avant d'acheter.
2. **Mélanger trop de marques Wi-Fi** : on se retrouve avec 5 apps différentes. Privilégier une seule gamme (Tapo, Shelly) ou passer à Zigbee.
3. **Oublier les répéteurs Zigbee** : les prises Zigbee font répéteur. En mettre une tous les 10 m pour un réseau stable.
4. **Ignorer la sécurité** : utiliser des mots de passe forts, ne pas exposer Home Assistant sur Internet sans VPN.

## Budget récapitulatif (octobre 2026)

| Niveau | Matériel | Prix indicatif | Ce qu'on peut faire |
|--------|----------|----------------|---------------------|
| **Débutant Wi-Fi** | 2 prises Tapo P110 + 1 ampoule L530E | 40–60 € | Pilotage app, horaires |
| **Zigbee + Pi 5** | Pi 5 4 Go + ZBDongle-E + 3 capteurs SONOFF | 120–170 € | Automatisations locales, température, présence |
| **Clé en main** | HA Green + ZBT-2 + 3 capteurs | 250–300 € | Idem, zéro config système |
| **Avancé** | Pi 5 + Zigbee + 10 capteurs + robot aspirateur + ESP32 | 500–700 € | Maison complète, DIY |

*Les prix sont relevés en octobre 2026 et restent indicatifs. Commissions Amazon catégorie Maison environ 3 %.*

## Pour aller plus loin

- [Installer Home Assistant sur Raspberry Pi 5](/domotique/home-assistant-raspberry-pi-5-installation/)
- [Meilleure clé Zigbee pour Home Assistant](/domotique/meilleur-dongle-zigbee-home-assistant/)
- [Projets ESP32 pour la domotique](/domotique/projets-esp32-domotique/)
- [Robot aspirateur moins de 200 €](/domotique/robots-aspirateurs/robot-aspirateur-moins-de-200-euros/)

## FAQ

**Combien de temps pour installer Home Assistant ?**
1 heure avec le Raspberry Pi Imager (image HAOS, carte microSD, brancher le dongle Zigbee). 5 minutes avec Home Assistant Green (brancher, naviguer vers homeassistant.local:8123).

**Mes objets connectés actuels sont compatibles ?**
Si Wi-Fi et cloud fabricant, probablement non directement dans HA. Chercher « [marque] home assistant » pour voir si une intégration existe. Sinon, les garder dans leur app et acheter du Zigbee pour le nouveau.

**Je peux tout faire depuis mon téléphone ?**
Oui, Home Assistant a une app iOS et Android. On peut aussi utiliser l'interface web depuis n'importe quel navigateur.

---

*Affiliation : cet article contient des liens affiliés Amazon (tag manuso06-21). Nous touchons une petite commission (environ 3 % en catégorie Maison) si vous achetez via ces liens, sans surcoût pour vous. Les prix et disponibilités sont relevés en octobre 2026 et peuvent varier.*
