---
title: "Meilleure clé Zigbee pour Home Assistant 2026 : comparatif complet"
description: "Comparatif détaillé des dongles Zigbee 3.0 pour Home Assistant : SONOFF ZBDongle-E, Connect ZBT-2, ConBee II, Dongle Lite. Compatibilité ZHA et Zigbee2MQTT, portée, firmware."
pubDate: 2026-10-18T00:00:00Z
category: "home-assistant"
products: ["sonoff-zbdongle-e", "sonoff-dongle-lite-mg21"]
priority: 5
---

Choisir une **clé Zigbee** pour Home Assistant, c'est la fondation d'un réseau stable avec des dizaines de capteurs et prises connectées. Ce guide compare les 6 dongles Zigbee 3.0 les plus populaires en 2026 pour vous aider à choisir selon votre budget, surface et niveau technique.

## Tableau comparatif : 6 dongles Zigbee pour Home Assistant

| Modèle | Prix | Puce | Antenne | Portée indoor | Thread | ZHA | Z2M | Pour qui ? |
|--------|------|------|---------|---------------|--------|-----|-----|------------|
| **SONOFF ZBDongle-E** | 16–25 € | EFR32MG21 | Externe SMA | 50 m | ❌ | ✅ | ✅ | **Tout le monde** — meilleur rapport qualité/prix |
| **HA Connect ZBT-2** | 45–80 € | EFR32MG21 + nRF52840 | Externe | 50 m | ✅ | ✅ | ✅ | Early adopters Matter, support officiel Nabu Casa |
| **SONOFF Dongle Lite MG21** | 15–20 € | EFR32MG21 | Interne PCB | 25 m | ✅ | ✅ | ✅ | Budget mini, appartement < 70 m² |
| **ConBee II** | 35–45 € | deCONZ | Interne | 30 m | ❌ | ✅ | ✅ | Alternative deCONZ gateway, compatible Phoscon |
| **Elelabs ELR023** | 40–60 € | EFR32MG13 | Externe | 60 m | ❌ | ✅ | ✅ | Longue portée, firmware modifiable |
| **ZZH! (Electrolama)** | 30–40 € | CC2652R | Externe | 40 m | ❌ | ✅ | ✅ | DIY, puces TI CC26xx populaires |

*Prix octobre 2026, indicatifs. Portée indoor = murs en plâtre, 2–3 obstacles.*

## Notre sélection détaillée

### 1. SONOFF ZBDongle-E — Notre choix n°1 (16–25 €)

**Pourquoi c'est le meilleur** :
- Puce **Silabs EFR32MG21** (même que ZBT-2), fiable et mature
- **Antenne externe SMA** : portée 50 m indoor, possible de remplacer par antenne plus puissante
- **Firmware modifiable** : EmberZNet 7.x, mises à jour via Silabs Simplicity Studio
- Compatible **ZHA** (intégré HA) et **Zigbee2MQTT** (module complémentaire)
- Boîtier plastique robuste avec LED de statut

**Compatibilité** : 90 % des capteurs Zigbee 3.0 du marché (SONOFF, Aqara, Philips Hue, IKEA Tradfri, Tuya).

**Limites** :
- Pas de Thread/Matter natif (utiliser ZBT-2 si besoin)
- Boîtier plastique léger (mais antenne dévissable = avantage)

**Pour qui ?** Tout le monde. C'est le standard de facto en 2026.

*Lien Amazon : [SONOFF ZBDongle-E B0B6P22YJC](https://www.amazon.fr/dp/B0B6P22YJC?tag=manuso06-21).*

### 2. Home Assistant Connect ZBT-2 — Support officiel (45–80 €)

**Avantages** :
- **Support officiel Nabu Casa** : mises à jour garanties, config simplifiée
- **Zigbee + Thread/Matter** : puce nRF52840 dédiée Thread, futur-proof
- Antenne externe, portée 50 m
- **Silicon Labs EFR32MG21** pour Zigbee (même que ZBDongle-E)

**Limites** :
- **Prix élevé** : 45–80 € (2–3× le ZBDongle-E)
- **Disponibilité aléatoire** : ruptures fréquentes en 2026 (réassort Domadoo prévu novembre)
- Thread/Matter encore jeune (peu d'appareils compatibles en 2026)

**Pour qui ?** Early adopters Matter, personnes qui veulent le support officiel Nabu Casa.

*Lien Amazon : [HA Connect ZBT-2 B0G34ZTW51](https://www.amazon.fr/dp/B0G34ZTW51?tag=manuso06-21).*

### 3. SONOFF Dongle Lite MG21 — Le moins cher (15–20 €)

**Avantages** :
- **Prix imbattable** : 15–20 €
- Même puce EFR32MG21 que ZBDongle-E
- **Thread inclus** (bonus)
- Compact, pas de boîtier (juste la carte nue protégée)

**Limites** :
- **Antenne interne PCB** : portée réduite à 25 m (vs 50 m externe)
- Pas de boîtier rigide : fragile si manipulé souvent

**Pour qui ?** Budget minimal, appartement < 70 m², installation fixe (pas de manipulation fréquente).

### 4. ConBee II — Alternative deCONZ (35–45 €)

**Avantages** :
- **deCONZ gateway** : alternative à ZHA/Z2M, interface Phoscon Web
- Compatible Philips Hue sans Hue Bridge (économie)
- Firmware stable, communauté active

**Limites** :
- Antenne interne : portée 30 m seulement
- deCONZ moins flexible que Z2M pour appareils exotiques
- Pas de Thread

**Pour qui ?** Utilisateurs deCONZ existants, fans de Philips Hue.

### 5. Elelabs ELR023 — Longue portée (40–60 €)

**Avantages** :
- Puce **EFR32MG13** (génération précédente mais très stable)
- **Portée 60 m** grâce à amplificateur PA intégré
- Antenne externe SMA
- Firmware modifiable facilement

**Limites** :
- Prix élevé : 40–60 €
- Puce plus ancienne que EFR32MG21 (mais toujours excellente)

**Pour qui ?** Grandes maisons (150+ m²), terrains avec garage/dépendance éloignés.

### 6. ZZH! (Electrolama) — DIY (30–40 €)

**Avantages** :
- Puce **CC2652R** (Texas Instruments) : très populaire en DIY
- Firmware Z-Stack 3.x open-source
- Communauté Zigbee2MQTT l'adore
- Antenne externe

**Limites** :
- **DIY** : nécessite flashage manuel du firmware
- Disponibilité limitée (fabriqué par petite équipe)
- Pas de boîtier officiel

**Pour qui ?** Makers, bricoleurs, fans de puces TI.

## Comment choisir son dongle Zigbee ?

### Critère 1 : Budget

- **< 20 €** : SONOFF Dongle Lite MG21
- **20–30 €** : SONOFF ZBDongle-E ⭐ (meilleur rapport qualité/prix)
- **30–50 €** : ConBee II, ZZH!, Elelabs
- **50–80 €** : HA Connect ZBT-2 (Thread/Matter)

### Critère 2 : Surface à couvrir

- **< 70 m²** : Dongle Lite MG21 (antenne interne OK)
- **70–120 m²** : ZBDongle-E ou ConBee II (antenne externe ou meilleure interne)
- **120–200 m²** : Elelabs ELR023 (portée 60 m) ou ZBDongle-E + répéteurs Zigbee (prises)
- **200+ m² ou multi-étages** : 2 dongles sur 2 Raspberry Pi (coordinateurs séparés) ou Elelabs + répéteurs

### Critère 3 : Besoin de Thread/Matter ?

- **Non** (Zigbee suffit en 2026) : ZBDongle-E
- **Oui** (futureproof) : HA Connect ZBT-2 ou Dongle Lite MG21

### Critère 4 : ZHA ou Zigbee2MQTT ?

Les 6 dongles fonctionnent avec les deux. Différences :

**ZHA (Zigbee Home Automation)** :
- Intégré dans Home Assistant (aucun module complémentaire)
- Simple, plug & play
- Compatible 2000+ appareils
- **Recommandé pour débutants**

**Zigbee2MQTT** :
- Module complémentaire externe (broker MQTT)
- Interface Web dédiée, plus d'options de configuration
- Compatible 2500+ appareils (support plus rapide des nouveautés)
- **Recommandé pour utilisateurs avancés**

[Guide complet ZHA vs Zigbee2MQTT ici](/domotique/home-assistant-zigbee2mqtt-ou-zha/) (prochainement).

## Installation ZBDongle-E avec ZHA (pas à pas)

### Étape 1 : Brancher le dongle

1. Brancher le ZBDongle-E sur un port USB du Raspberry Pi 5 ou Home Assistant Green
2. Attendre 10 secondes (LED rouge fixe = alimenté)

### Étape 2 : Installer l'intégration ZHA

1. **Paramètres → Appareils et services → Ajouter une intégration**
2. Chercher "ZHA" (Zigbee Home Automation)
3. Sélectionner le port série : `/dev/ttyUSB0` (ou `/dev/ttyACM0` selon le système)
4. Laisser les paramètres par défaut :
   - Type radio : EZSP (EmberZNet Serial Protocol)
   - Vitesse : 115200 bauds
   - Flow control : hardware
5. Cliquer "Soumettre"

**Durée** : 30 secondes. ZHA initialise le coordinateur Zigbee.

### Étape 3 : Appairer un premier capteur

1. **Appareils Zigbee → Ajouter un appareil**
2. ZHA passe en mode appairage (60 secondes)
3. Sur le capteur SONOFF SNZB-02D :
   - Maintenir le bouton 5 secondes
   - LED clignote rapidement
   - Apparaît dans HA après 10–30 secondes : "SONOFF SNZB-02D"

4. Renommer : "Capteur salon" → Entités créées :
   - `sensor.capteur_salon_temperature`
   - `sensor.capteur_salon_humidity`

## Erreurs courantes et dépannage

### Erreur : "Could not connect to /dev/ttyUSB0"

**Causes** :
- Le port USB n'est pas détecté
- Permissions insuffisantes (rare sur HAOS)
- Câble USB défectueux (surtout adaptateurs USB-C → USB-A)

**Solutions** :
1. Vérifier que le dongle est bien branché (LED allumée)
2. Changer de port USB (privilégier USB 2.0 si possible, plus stable)
3. Redémarrer Home Assistant
4. Accéder au terminal SSH et vérifier : `ls /dev/ttyUSB*` ou `ls /dev/ttyACM*`
5. Si rien : câble défectueux ou dongle mort (tester sur un PC avec Simplicity Studio)

### Erreur : "Radio failed to initialize"

**Causes** :
- Firmware corrompu
- Mauvais type de radio sélectionné
- Dongle déjà utilisé par un autre processus (Z2M en parallèle)

**Solutions** :
1. Vérifier qu'aucun autre addon (Zigbee2MQTT, deCONZ) n'utilise le même port
2. Choisir manuellement "EZSP" comme type de radio
3. Reflasher le firmware avec Silabs Simplicity Studio (voir docs SONOFF)

### Problème : Appareils Zigbee ne se connectent pas

**Causes** :
- Distance trop grande (> 10 m sans répéteur)
- Interférences Wi-Fi 2,4 GHz (canaux 11-14 Zigbee = canaux 1-6 Wi-Fi)
- Appareil pas en mode appairage

**Solutions** :
1. Rapprocher le capteur du dongle (< 3 m pour l'appairage initial)
2. Changer le canal Zigbee : **ZHA → Configurer → Radio → Canal → 25** (évite Wi-Fi)
3. Reset factory du capteur (maintenir bouton 10 secondes)
4. Ajouter des répéteurs Zigbee (prises connectées NOUS A1Z, Tapo)

### Problème : Réseau instable, appareils déconnectés

**Causes** :
- Trop d'appareils pour 1 coordinateur (limite ~40 directs, 200 avec répéteurs)
- Pas assez de répéteurs (prises)
- Interférences USB 3.0 (le Pi 5 émet du bruit électrique sur USB 3.0)

**Solutions** :
1. Ajouter **1 répéteur tous les 10 m** (prises Zigbee font répéteur)
2. Utiliser une **rallonge USB 2.0** de 50 cm pour éloigner le dongle du Pi (réduit interférences)
3. Vérifier la topologie réseau : **ZHA → Configurer → Visualiser réseau** (tous les appareils doivent avoir 2+ chemins)

## Entretien et optimisation

### Mise à jour du firmware

**ZBDongle-E** : firmware SONOFF est stable, mises à jour rares. Si besoin :
1. Télécharger nouveau firmware sur GitHub SONOFF (format `.gbl`)
2. Flasher avec Silabs Simplicity Commander (interface Web ou CLI)
3. Durée : 5 minutes

### Sauvegarde de la config Zigbee

**Automatique** : ZHA sauvegarde automatiquement la config dans `/config/.storage/zha.storage`.

**Manuelle** :
1. **Paramètres → Système → Sauvegardes → Créer**
2. Télécharger le fichier `.tar`
3. Restaurer en cas de changement de dongle ou réinstallation HA

### Migration vers un autre dongle

**Scénario** : passer de ZBDongle-E à ZBT-2 ou ConBee II.

**Méthode 1 — Avec sauvegarde ZHA** (expérimental, ne fonctionne pas toujours) :
1. Sauvegarder `/config/.storage/zha.storage`
2. Arrêter ZHA
3. Débrancher ancien dongle, brancher nouveau
4. Restaurer sauvegarde
5. Redémarrer ZHA → tous les appareils doivent réapparaître (parfois non)

**Méthode 2 — Réappairage complet** (recommandé) :
1. Noter tous les appareils et leurs noms
2. Débrancher ancien dongle
3. Configurer ZHA avec nouveau dongle
4. Réappairer tous les appareils (fastidieux mais fiable)

## Quelle quantité d'appareils par dongle ?

**Limites théoriques Zigbee 3.0** :
- Coordinateur : 40 appareils directs (sans répéteur)
- Avec répéteurs : 200+ appareils au total

**Limites pratiques ZBDongle-E (EFR32MG21)** :
- **< 30 appareils** : parfait, réseau stable
- **30–60 appareils** : OK avec 5+ répéteurs (prises)
- **60–100 appareils** : limite haute, ajouter rallonge USB, optimiser canaux
- **> 100 appareils** : envisager 2 coordinateurs (2 Raspberry Pi) ou passer à ZBT-2

**En 2026, une maison typique = 10–30 appareils Zigbee** (capteurs, prises, ampoules).

## FAQ

**Quelle est la différence entre ZHA et Zigbee2MQTT ?**
ZHA est intégré dans Home Assistant (simple, plug & play). Zigbee2MQTT est un addon externe avec interface Web dédiée (plus d'options, supporte plus d'appareils exotiques). Pour débuter : ZHA. Pour utilisateurs avancés : Z2M.

**Puis-je utiliser plusieurs dongles Zigbee en parallèle ?**
Non sur le même Home Assistant. Chaque coordinateur Zigbee gère son propre réseau. Si besoin de 2 réseaux : installer 2 Raspberry Pi ou utiliser Zigbee2MQTT sur un second Pi qui communique avec HA via MQTT.

**Mon dongle chauffe, c'est normal ?**
Oui, jusqu'à 40–50 °C en fonctionnement. Si > 60 °C : vérifier ventilation, éloigner des sources de chaleur (alimentation Pi). Un dissipateur thermique aide (optionnel).

**Zigbee interfère-t-il avec le Wi-Fi ?**
Oui, Zigbee 2,4 GHz partage la bande avec Wi-Fi. Canal Zigbee 25–26 évite canaux Wi-Fi 1–6. Si problèmes : passer Wi-Fi en 5 GHz ou changer canal Zigbee.

**Combien de répéteurs Zigbee faut-il ?**
1 répéteur (prise Zigbee) tous les 10 m. En appartement 70 m² : 3–4 prises suffisent. En maison 120 m² : 6–8 prises. Les prises font répéteur automatiquement (maillage).

**Puis-je utiliser une antenne plus puissante ?**
Oui sur ZBDongle-E (connecteur SMA). Antenne 5 dBi → portée 70–80 m indoor. Attention : antenne trop puissante (> 10 dBi) peut saturer le coordinateur (trop de signaux faibles captés).

## Pour aller plus loin

- [Installer Home Assistant sur Raspberry Pi 5](/domotique/home-assistant-raspberry-pi-5-installation/) avec ZBDongle-E
- [Capteur température Zigbee](/domotique/capteur-temperature-zigbee/) : premiers appareils à appairer
- [Prise connectée Zigbee](/domotique/prise-connectee-zigbee-home-assistant/) : créer un maillage répéteur
- [Comparatif Home Assistant Green vs Raspberry Pi 5](/domotique/home-assistant-green-vs-raspberry-pi-5/)
- [Hub domotique](/domotique/) : retour à l'accueil de la section

---

*Affiliation : liens Amazon avec tag manuso06-21, commission ~3 % catégorie Électronique. Prix octobre 2026, indicatifs. Nous présentons notre sélection après recherche, sans tests physiques.*
