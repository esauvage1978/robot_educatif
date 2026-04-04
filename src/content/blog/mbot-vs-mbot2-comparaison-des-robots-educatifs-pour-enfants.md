---
title: "mbot vs mbot2 : Comparaison des robots éducatifs pour enfants"
description: "mBot vs mBot 2 (comparatif) : prix indicatifs, tableau des fonctionnalités, accessoires, Python et CyberPi. Choisir entre le robot Makeblock classique et le mBot2 pour enfants ou collège."
pubDate: "2023-04-09"
updatedDate: "2026-03-29"
heroImage: "../../assets/blog-heroes/hero-mbot-vs.png"
amazonPreset: mbotVs
categories:
  - "Comparatif"
  - "mBot"
  - "Makeblock"
  - "Robot éducatif"
relatedLinks:
  - title: "mBot2 : présentation détaillée"
    href: "/mbot2-de-makeblock-le-robot-educatif-pour-apprendre-la-robotique/"
  - title: "Accessoires mBot : par où commencer"
    href: "/accessoires-mbot-par-ou-commencer/"
  - title: "mBot, mon premier robot"
    href: "/mbot-mon-premier-robot-educatif/"
  - title: "Quel logiciel mBlock choisir"
    href: "/logiciel-mblock-makeblock-mbot-quel-choisir/"
---
La robotique et la programmation sont des compétences de plus en plus utiles pour les enfants curieux de technologie. Les **robots éducatifs** permettent d’apprendre en manipulant : capteurs, moteurs, petits défis sur la table. Si vous tapez **« mbot vs mbot 2 »** ou **« robot mbot »** pour comparer les générations, vous tombez souvent sur cette paire : le **mBot** (« classique ») et le **mBot2**, plus récent et centré sur une carte **CyberPi** plus puissante — ce que développe cet article.

Cette page compare **prix**, **fonctionnalités** et **accessoires** pour vous aider à trancher — sans remplacer la fiche technique officielle du fabricant, que vous devriez toujours vérifier avant d’acheter (révision de kit, couleur du châssis, présence ou non du module Bluetooth, etc.).

![Schéma illustratif : deux familles de robots éducatifs côte à côte (illustration d’ambiance)](/images/blog/inset-mbot-vs.png)

*Illustration générée pour l’article — schéma conceptuel, sans reproduire des produits commerciaux précis.*

## Prix indicatifs (France, mars 2026)

À titre **indicatif** au **29 mars 2026**, sur des offres courantes en ligne (Amazon et autres vendeurs), on trouve souvent :

| Modèle | Prix indicatif* |
|--------|------------------|
| **mBot** (kit de base, selon offre) | **environ 89,99 €** |
| **mBot2** | **environ 167,95 €** |

\*Montants **variables** selon promotions, stock, vendeur, présence d’accessoires dans le pack et TVA affichée. Vérifiez le **prix au moment de l’achat**.

**Écart budgétaire** : le mBot2 coûte souvent **près du double** du mBot en entrée de gamme. La question n’est pas « lequel est meilleur », mais **ce que vous voulez prioriser** : un premier robot complet et accessible, ou une plateforme plus riche pour **aller plus loin** (Python, capteurs intégrés, connectivité).

## Ce qui les rapproche

- **Même univers logiciel** : programmation par blocs avec **mBlock** (proche de Scratch), tutoriels et communauté nombreuse.
- **Même idée pédagogique** : assembler un châssis, brancher des capteurs, faire des **parcours** et des petits défis.
- **Makeblock** : pièces, documentations et **accessoires** officiels — attention toutefois à la **compatibilité** génération par génération (voir plus bas).

## Fonctionnalités : tableau comparatif

Les détails peuvent légèrement varier selon la **révision** du kit ; le tableau résume l’**esprit** des deux gammes.

| Critère | mBot (classique) | mBot2 |
|--------|-------------------|--------|
| **Carte / cerveau** | Carte **mCore** (écosystème Arduino-compatible côté usage) | **CyberPi** (plus de puissance, Wi-Fi, usage **Python** poussé) |
| **Programmation** | Blocs **mBlock** ; possibilité d’approfondir selon niveau | Blocs **mBlock** + **Python** intégré de façon naturelle pour monter en niveau |
| **Moteurs** | Deux moteurs pour se déplacer | Moteurs avec **codeurs** (meilleure précision de déplacement pour les projets avancés) |
| **Capteurs courants** | Suivi de **ligne**, **ultrason** (distance), usage **IR** (télécommande selon kit) | **Ultrason**, suivi de **ligne**, **lumière** ambiante, **gyroscope** |
| **Retour visuel / son** | LED RGB, **buzzer** | **Matrice LED** (affichages, visages, petites animations), **haut-parleur** et **micro** |
| **Connectivité** | Souvent **Bluetooth** selon pack (vérifier la fiche produit) | **Bluetooth** et **Wi-Fi** (téléchargement de programmes, usages connectés) |
| **Châssis** | Plastique, pédagogique, léger | Châssis **métallique**, construction plus « pro » |
| **Public conseillé** | Découverte, clubs, familles qui veulent un **prix maîtrisé** | Collège / lycée, passionnés, projets qui durent et **montée en compétence** |

**En résumé** : le **mBot** couvre très bien **découverte et premiers défis** (ligne, obstacle, lumière). Le **mBot2** ajoute une **vraie couche « projet »** : précision des mouvements, richesse des interactions (écran LED, son, micro), et une carte pensée pour **Scratch → Python** sans changer de robot.

## Accessoires et évolutivité

### mBot (gamme classique)

- Ports **RJ25** et écosystème d’**extensions** Makeblock historiques : capteurs supplémentaires, **bras**, **chenilles**, pièces de rechange.
- Beaucoup de retours d’expérience (forums, tutos) pour le **premier achat** : voir notre guide [Accessoires mBot : par où commencer](/accessoires-mbot-par-ou-commencer/) avant d’empiler les modules.
- L’erreur fréquente est d’acheter un accessoire **sans vérifier** qu’il correspond à **votre** révision de mBot.

### mBot2

- Logique plutôt **mBuild** / **broches** compatibles avec l’univers CyberPi : capteurs et blocs **modulaires** pour étendre le robot (couleurs, distance, etc. — selon catalogue Makeblock).
- Moins question d’« empiler n’importe quoi » : mieux vaut suivre la **compatibilité officielle** avec la carte **CyberPi** du mBot2.
- Budget accessoires : à prévoir **après** maîtrise des bases — sinon le robot principal reste sous-exploité.

**À retenir** : le mBot a souvent l’avantage du **volume de ressources** et du **prix d’entrée** ; le mBot2 a l’avantage du **plafond pédagogique** et des **projets plus ambitieux** sans changer de famille de produit.

## Logiciel et démarrage

Les deux se pilotent avec **mBlock** sur ordinateur (et selon versions, applications mobiles — voir la doc Makeblock). Pour le mBot2, l’intérêt est souvent de **enchaîner** blocs et **Python** sur la même machine. Si vous hésitez sur la version du logiciel ou les canaux (appli / navigateur), lisez [Quel logiciel mBlock pour vos appareils](/logiciel-mblock-makeblock-mbot-quel-choisir/).

Installez aussi les **blocs du robot** dans mBlock si besoin : [Installer les blocs du mBot](/installer-les-blocs-du-mbot/) (principe proche pour déclarer le bon appareil).

## Quel robot choisir ?

- **Choisissez le mBot** si vous voulez un **premier robot** solide, une communauté immense, un **budget** plus serré, et des ateliers type **ligne / obstacle / LED** sans viser tout de suite la robotique « lycée ».
- **Choisissez le mBot2** si le budget le permet et si vous visez **plusieurs années** d’usage, des **projets audio / lumière**, une **précision** de déplacement utile, et une montée vers **Python** sérieuse sans racheter un autre robot tout de suite.

En conclusion, le choix entre le **mBot** et le **mBot2** dépend du **budget**, de l’**âge**, de la **durée** de projet envisagée et de l’envie d’explorer **Python** tôt ou tard. Les deux restent d’excellents outils pour apprendre en s’amusant ; la différence est surtout **où vous placez le plafond** de votre parcours.

## Acheter sur Amazon

- [mBot Makeblock sur Amazon.fr](https://www.amazon.fr/s?k=mBot+Makeblock&tag=manuso06-21)
- [mBot2 Makeblock sur Amazon.fr](https://www.amazon.fr/s?k=mBot2+Makeblock&tag=manuso06-21)
- [Accessoires et capteurs mBot / Makeblock](https://www.amazon.fr/s?k=mBot+Makeblock+accessoires+capteur&tag=manuso06-21)

*Liens affiliés — commission possible pour le site sur des achats éligibles, sans surcoût pour vous.*
