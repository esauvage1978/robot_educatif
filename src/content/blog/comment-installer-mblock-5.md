---
title: "Comment installer mBlock 5 sur PC, Mac, navigateur et mobile"
description: "Guide d’installation de mBlock 5 : téléchargement officiel, Windows 64 bits, macOS (Intel et Apple Silicon), version web avec mLink, Android et iOS. À jour avec la page de téléchargement Makeblock."
pubDate: "2026-03-27"
updatedDate: "2026-03-27"
heroImage: "../../assets/mbot2/mbot2-hero.jpg"
amazonPreset: mbot
relatedLinks:
  - title: "Guide mBlock 5 pour débutants : interface, blocs et premier script"
    href: "/guide-mblock-5-debutant/"
  - title: "Les modes de programmation dans mBlock 5 : blocs, Python et Arduino"
    href: "/mblock-5-programmation-blocs-python-arduino/"
  - title: "Mon premier programme sur mBot avec mBlock 5"
    href: "/mon-premier-programme-mbot/"
  - title: "mBot, mon premier robot éducatif"
    href: "/mbot-mon-premier-robot-educatif/"
  - title: "mBot2 de Makeblock : le robot éducatif pour apprendre la robotique"
    href: "/mbot2-de-makeblock-le-robot-educatif-pour-apprendre-la-robotique/"
---

**mBlock 5** est l’application officielle Makeblock pour programmer notamment le **mBot**, le **mBot2** et d’autres cartes compatibles. Ce guide résume **comment l’installer** sur chaque type d’appareil à partir de la page officielle **[Téléchargements mBlock](https://mblock.cc/pages/downloads)**.

Une fois l’installation terminée, enchaîne avec le tutoriel [Mon premier programme sur mBot avec mBlock 5](/mon-premier-programme-mbot/) pour connecter le robot et créer ton premier script. Si tu débutes avec le matériel, [mBot, mon premier robot éducatif](/mbot-mon-premier-robot-educatif/) reste le bon point d’entrée côté montage et prise en main.

> Cet article contient des liens affiliés Amazon. En tant que Partenaire Amazon, je peux percevoir une commission sur les achats éligibles, sans coût supplémentaire pour vous.

## Ce que tu trouveras sur la page officielle

Sur **[mblock.cc/pages/downloads](https://mblock.cc/pages/downloads)**, Makeblock regroupe :

- la **version web** (blocs et Python dans le navigateur) ;
- la **version PC** (Windows et macOS) ;
- les applis **mobile** (Android / iOS) ;
- **mLink**, indispensable pour relier la **version web** à ton robot via l’ordinateur ;
- l’historique des versions et les **anciennes mises à jour** (journal des versions / versions précédentes).

À la date de rédaction, la **version bureau** affichée sur le site est la **V5.6.0**, publiée le **8 avril 2025**. Les numéros peuvent changer : télécharge toujours le **dernier installeur** proposé sur la page officielle plutôt que de réutiliser un vieux fichier.

**À éviter pour du matériel actuel** : **mBlock 3** est indiqué comme **« Stop updating »** sur la même page — oriente-toi vers **mBlock 5** pour suivre les tutoriels récents et éviter les blocages de compatibilité.

## 1. Installer mBlock 5 sur Windows

1. Ouvre **[mblock.cc/pages/downloads](https://mblock.cc/pages/downloads)**.
2. Dans **mBlock PC version**, télécharge l’installateur **Windows** (`.exe`).
3. **Exigence** : **Windows 64 bits** (le site mentionne Win7 ou Win10 64 bits comme prérequis pour cette ligne de produit).
4. Lance le fichier téléchargé, accepte les autorisations si Windows les demande, puis suis l’assistant jusqu’au raccourci **mBlock 5** sur le bureau ou le menu Démarrer.
5. **Déploiement sur plusieurs postes** : la page propose en général aussi un **installeur MSI** pour installation groupée (écoles, ateliers) — pratique si tu gères un parc informatique.

Après l’installation, pense à connecter le robot avec un **câble USB de qualité** (de préférence celui fourni avec le kit).

## 2. Installer mBlock 5 sur macOS

1. Sur la même page, section **Download for Mac**, récupère le fichier **`.dmg`** adapté à ton Mac :
   - version **classique** pour les Mac **Intel** ou indiquée pour macOS 10.12+ ;
   - version dédiée **Apple M1 / M2** (puce **ARM64**) si proposée — le bon installeur évite pas mal d’erreurs au lancement.
2. Ouvre le `.dmg`, fais glisser **mBlock 5** dans **Applications**.
3. Au premier lancement, **Gatekeeper** peut afficher un avertissement : dans ce cas, ouvre **Réglages système → Confidentialité et sécurité** et utilise **« Ouvrir quand même »**, ou fais un **clic droit → Ouvrir** sur l’application.

Les Mac récents et les mises à jour macOS peuvent changer les messages de sécurité : en cas de doute, reprends la [documentation ou le support Makeblock](https://support.makeblock.com/) depuis le site officiel.

## 3. Utiliser mBlock 5 dans le navigateur (version web)

La **version web** permet de coder en **blocs** ou en **Python** sans installer la grosse application PC — mais l’ordinateur doit quand même pouvoir **parler au robot**.

1. Utilise de préférence un navigateur **récent** ; le site recommande souvent **Chrome** pour la compatibilité.
2. Accède à l’éditeur en ligne depuis les liens **« Code with blocks »** / **« Code with Python »** sur [mblock.cc/pages/downloads](https://mblock.cc/pages/downloads), ou via **[ide.mblock.cc](https://ide.mblock.cc/)** et **[python.mblock.cc](https://python.mblock.cc/)** selon ton mode de travail.
3. **Installe mLink** (section **« mLink - mBlock web version driver »** sur la page des téléchargements) :
   - **mLink for Windows** ;
   - **mLink for Mac** ;
   - paquets **Linux** (`.deb` / `.rpm`) si besoin ;
   - variante **Chromebook** le cas échéant.

Sans **mLink**, la version web ne pourra en général **pas établir la liaison USB / radio** avec ta carte ou ton robot, même si l’éditeur s’affiche correctement.

## 4. Chromebook

Si tu travailles sur **Chromebook**, la page des téléchargements mentionne une version **mLink for Chromebook** à installer pour pouvoir utiliser l’écosystème web depuis cette plateforme. Suis les indications affichées au moment du téléchargement (évolution possible des procédures selon les modèles).

## 5. Application mobile : Android et iOS

La section **mBlock mobile app** de **[mblock.cc/pages/downloads](https://mblock.cc/pages/downloads)** renvoie vers les stores :

- **Android** : **6.0+**, sur **appareils ARM** (les Android **x86** ne sont en général **pas** pris en charge — message rappelé sur la page officielle).
- **iOS** : **10.0+** (voir la fiche App Store depuis le lien proposé).

Les applis mobiles sont utiles pour **apprendre** et prototyper ; pour les **premiers branchements**, firmware ou réglages poussés, l’**ordinateur + mBlock 5 PC** (ou web + mLink) reste souvent le plus confortable.

## 6. Après l’installation : ordre logique des étapes

1. **Lancer mBlock 5** (PC) ou **l’IDE web** avec **mLink** actif si tu es dans le navigateur.
2. **Ajouter ton appareil** (ex. **mBot**) depuis la bibliothèque de périphériques, comme expliqué dans [Mon premier programme mBot](/mon-premier-programme-mbot/).
3. Tester d’abord le mode **Live**, puis le mode **Upload** pour laisser le programme dans le robot.

Pour découvrir le modèle plus avancé **mBot2** (Scratch et Python), voir [mBot2 de Makeblock](/mbot2-de-makeblock-le-robot-educatif-pour-apprendre-la-robotique/).

## Matériel utile (liens Amazon affiliés)

- <a href="https://www.amazon.fr/s?k=Makeblock+mBot&tag=manuso06-21" target="_blank" rel="noopener sponsored">Rechercher le mBot sur Amazon</a>
- <a href="https://www.amazon.fr/s?k=mBot2+Makeblock&tag=manuso06-21" target="_blank" rel="noopener sponsored">Rechercher le mBot2 sur Amazon</a>
- <a href="https://www.amazon.fr/s?k=c%C3%A2ble+USB+mBot&tag=manuso06-21" target="_blank" rel="noopener sponsored">Câbles et accessoires USB</a>

## Conclusion

En résumé : récupère **mBlock 5** et éventuellement **mLink** depuis **[mblock.cc/pages/downloads](https://mblock.cc/pages/downloads)**, choisis le **bon installeur** (Windows 64 bits, Mac Intel ou Apple Silicon, web + mLink, mobile selon ton usage), et passe ensuite à la **programmation** avec les articles mis en avant dans la colonne **« À lire aussi »** et les liens internes de cet article.
