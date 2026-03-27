---
title: "Guide mBlock 5 pour débutants : interface, blocs et premier script"
description: "Découvre l’interface de mBlock 5, les catégories de blocs, le mode Live, et réalise ton premier programme sur mBot ou mBot2. Niveau débutant, avec ressource officielle Makeblock."
pubDate: "2026-03-27"
updatedDate: "2026-03-27"
heroImage: "../../assets/mbot/mbot-hero.png"
amazonPreset: mbot
relatedLinks:
  - title: "Comment installer mBlock 5 sur PC, Mac, navigateur et mobile"
    href: "/comment-installer-mblock-5/"
  - title: "Mon premier programme sur mBot avec mBlock 5"
    href: "/mon-premier-programme-mbot/"
  - title: "Guide mBlock 5 intermédiaire : capteurs, variables et logique"
    href: "/guide-mblock-5-intermediaire/"
  - title: "Les modes de programmation dans mBlock 5 : blocs, Python et Arduino"
    href: "/mblock-5-programmation-blocs-python-arduino/"
---

Ce guide **niveau débutant** t’aide à te repérer dans **mBlock 5** (environnement type Scratch) pour programmer un **mBot** ou un **mBot2**. Il complète les articles [Installer mBlock 5](/comment-installer-mblock-5/) et [Mon premier programme mBot](/mon-premier-programme-mbot/).

Pour aller plus loin avec une ressource **officielle en PDF**, Makeblock propose notamment le document **[mBlock Beginner’s Guide (PDF)](https://res-us.makeblock.com/doc/course/mBlock/mBlock_Beginner_s_Guide.pdf)** (contenu en anglais, illustré) — garde-le ouvert pendant tes séances.

> Cet article contient des liens affiliés Amazon. En tant que Partenaire Amazon, je peux percevoir une commission sur les achats éligibles, sans coût supplémentaire pour vous.

## 1. Ce que tu vois à l’écran

Après le lancement de **mBlock 5** et l’ajout de ton robot (voir le tutoriel [premier programme](/mon-premier-programme-mbot/)), l’interface repose sur quelques zones habituelles :

- **Zone de script** (au centre) : tu y **emboîtes** les blocs pour former un programme.  
- **Bibliothèque de blocs** (souvent à gauche) : blocs classés par **catégories** (événements, mouvement, affichage, capteurs, etc.).  
- **Zone de scène / sprites** : utile pour les projets « Scratch pur » ; avec un **robot connecté**, l’essentiel est surtout la **liste des périphériques** et les blocs **spécifiques au mBot / mBot2**.  
- **Boutons de connexion** : pour passer en **Live** ou **Upload**, selon l’usage (voir l’article [modes de programmation](/mblock-5-programmation-blocs-python-arduino/) pour un panorama).

Si les libellés exacts diffèrent légèrement selon ta **langue** ou ta **version** (ex. V5.6.x), la **logique** reste la même : événement → actions → éventuellement boucles ou conditions.

## 2. Ton premier enchaînement de blocs

Un programme classique commence par un **événement**, par exemple :

- **« Quand le drapeau vert est cliqué »** (ou équivalent).

Ensuite tu enchaînes des blocs **d’action** pour le robot : moteurs, LED, buzzer, etc.

**Exemple minimal (idée pédagogique)** :  
drapeau vert → **avancer** un court instant → **arrêter** les moteurs.

Les noms des blocs peuvent varier ; l’important est de comprendre la **séquence** : le robot exécute les blocs **dans l’ordre**, sauf si tu introduis des boucles ou des conditions (traité au niveau [intermédiaire](/guide-mblock-5-intermediaire/)).

## 3. Mode « Live » : idéal pour débuter

En **Live**, le programme tourne **tant que** le robot reste connecté à l’ordinateur. Tu vois tout de suite si ton idée fonctionne : parfait pour **apprendre** et **corriger**.

Quand tu es satisfait, tu pourras passer au mode **Upload** pour que le robot **garde** le programme sans câble (cf. [Mon premier programme mBot](/mon-premier-programme-mbot/) et le guide [modes](/mblock-5-programmation-blocs-python-arduino/)).

## 4. Catégories de blocs à explorer en premier

Pour un **débutant**, parcours ces familles dans l’ordre :

1. **Événements** — démarrage (drapeau, touches…).  
2. **Mouvement / moteurs** — vitesses, durées, directions.  
3. **Lumière et son** — LED RGB, buzzer : très motivant visuellement.  
4. **Temps** — pauses (`attendre`) pour calibrer les mouvements.  
5. **Capteurs (aperçu)** — lecture simple d’un capteur ; on approfondit dans le [guide intermédiaire](/guide-mblock-5-intermediaire/).

Un **clic droit sur un bloc** propose souvent une entrée **Aide** : utilise-la pour comprendre le rôle exact du bloc dans **ta** version de mBlock.

## 5. Pièges fréquents (et comment les éviter)

- **Robot qui ne réagit pas** : vérifie la **connexion**, le bon **périphérique** sélectionné, et que tu es bien en **Live** pour un test immédiat.  
- **Mouvements inversés** : sur un premier kit, il est fréquent d’ajuster le **signe** des vitesses gauche/droite.  
- **Oubli du « stop »** : si les moteurs restent actifs, ajoute un bloc **vitesse 0** ou **arrêter** à la fin du script.  
- **Version logicielle** : garde **mBlock 5** à jour depuis [mblock.cc/pages/downloads](https://mblock.cc/pages/downloads).

## 6. Ressources et suite du parcours

- PDF officiel (débutant) : **[mBlock Beginner’s Guide](https://res-us.makeblock.com/doc/course/mBlock/mBlock_Beginner_s_Guide.pdf)**  
- Aide constructeur : [support Makeblock](https://support.makeblock.com/)  
- Suite pédagogique sur ce site : [Guide mBlock 5 intermédiaire](/guide-mblock-5-intermediaire/)

## Liens Amazon (affiliation)

- <a href="https://www.amazon.fr/s?k=Makeblock+mBot&tag=manuso06-21" target="_blank" rel="noopener sponsored">mBot sur Amazon</a>  
- <a href="https://www.amazon.fr/s?k=mBot2+Makeblock&tag=manuso06-21" target="_blank" rel="noopener sponsored">mBot2 sur Amazon</a>

## Conclusion

Maîtriser **l’interface**, le **drapeau vert**, les **moteurs** et le mode **Live** te donne une base solide. Enchaîne avec le [guide intermédiaire](/guide-mblock-5-intermediaire/) pour les capteurs et la logique, puis le [guide avancé](/guide-mblock-5-avance/) quand tu voudras optimiser ou lire le code généré.
