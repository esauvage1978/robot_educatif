# Pinterest Pins pour robot-educatif.info

Ce dossier contient les visuels Pinterest optimisés pour le trafic social.

## 📁 Contenu

- **31 pins optimisés** (1000x1500px, format JPG)
  - 28 pins pour les pages principales (2 variants chacune)
  - 3 infographies thématiques
- **pins.csv** : Fichier d'import en masse pour Pinterest

## 🎨 Régénérer les pins

Pour régénérer tous les pins (par exemple après avoir mis à jour les articles) :

```bash
npm run generate:pins
```

Le script :
- Lit automatiquement les images hero des articles
- Génère 2 variants par page avec différents accroches
- Crée 3 infographies thématiques
- Met à jour le fichier pins.csv

## 📌 Importer sur Pinterest

1. Rendez-vous sur [Pinterest Bulk Create](https://business.pinterest.com/bulk-create-pins)
2. Téléchargez le fichier `pins.csv`
3. Créez les boards suggérés s'ils n'existent pas encore :
   - **Cadeaux robots enfants**
   - **Robots programmables par âge**
   - **Projets mBot et robotique en classe**
   - **Raspberry Pi et Arduino pour ados**

## 🔧 Configuration

Les paramètres Pinterest sont dans `src/consts.ts` :
- `PINTEREST_ENABLED` : Activer/désactiver les fonctionnalités Pinterest
- `PINTEREST_DOMAIN_VERIFY` : Code de vérification du domaine Pinterest (optionnel)

## 📋 Boards Pinterest suggérés

1. **Cadeaux robots enfants** : Idées cadeaux, guides par âge, budgets
2. **Robots programmables par âge** : Guides d'achat 5/8/10/12 ans
3. **Projets mBot et robotique en classe** : Tutoriels, activités, projets
4. **Raspberry Pi et Arduino pour ados** : Kits avancés, projets experts

## 🎯 UTM Tracking

Tous les liens incluent automatiquement des paramètres UTM :
- `utm_source=pinterest`
- `utm_medium=social`
- `utm_campaign=[slug-de-la-page]`
