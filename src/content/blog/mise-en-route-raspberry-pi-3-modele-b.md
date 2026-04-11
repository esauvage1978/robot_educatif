---
title: "Mise en route Raspberry Pi 3 Modèle B : SD, Raspberry Pi OS, SSH, VNC"
headline: "Mise en route Raspberry Pi 3 Modèle B : SD, Raspberry Pi OS, SSH, VNC"
description: "Guide détaillé : matériel, Raspberry Pi Imager, options sans écran (Wi‑Fi, SSH), premier démarrage, mises à jour, accès distant et transfert de fichiers. Schémas et photo (Wikimedia)."
pubDate: "2020-05-01"
updatedDate: "2026-03-30"
heroImage: "../../assets/blog-heroes/hero-raspberry.png"
amazonPreset: raspberry
categories:
  - "Raspberry Pi"
  - "Linux"
  - "Tutoriel"
  - "À partir de 12 ans"
relatedLinks:
  - title: "Comparatif Pi 3 / 4 / 5"
    href: "/raspberry-pi-3-vs-4-vs-5-comparatif-2026/"
  - title: "Raspberry Pi 4 : quelle mémoire ?"
    href: "/raspberry-pi-4-quelle-version-memoire-acheter/"
  - title: "Raspberry Pi 5 : quelle mémoire ?"
    href: "/raspberry-pi-5-quelle-version-memoire-acheter/"
  - title: "Raspberry Pi ou kit robot pour ado"
    href: "/raspberry-pi-ou-kit-robot-ado-guide/"
---

Le **Raspberry Pi 3 Modèle B** (2016) reste une entrée abordable dans l’écosystème **Linux embarqué**, la **programmation** (Python, C…) et les **projets GPIO** (LED, capteurs, petits robots de bureau). Ce n’est plus le modèle le plus récent, mais la **démarche de mise en route** est la même pour beaucoup de cartes Pi : **carte microSD**, **Raspberry Pi OS**, **réseau**, **mises à jour**, puis **accès distant** (SSH, VNC).

Ce tutoriel vous guide **pas à pas** ; il met à jour l’ancienne dénomination **Raspbian** (aujourd’hui **Raspberry Pi OS**) et intègre les **options modernes** d’Imager (Wi‑Fi, SSH, utilisateur) pour éviter un écran au premier boot.

## 1. Rappel : ce qu’est un Raspberry Pi 3 Modèle B

| Élément | Détail utile |
|--------|----------------|
| **Processeur** | Broadcom BCM2837, quadricœur **~1,2 GHz** (ARMv8, mode 32 bits courant) |
| **Mémoire** | **1 Go** de RAM LPDDR2 |
| **Réseau** | Ethernet **100 Mbit/s**, Wi‑Fi **802.11n**, **Bluetooth 4.1** |
| **USB** | 4 ports USB 2.0 |
| **Vidéo** | HDMI **pleine taille** (pas de micro-HDMI comme sur Pi 4/5) |
| **Stockage** | **Carte microSD** (système d’exploitation) |
| **GPIO** | 40 broches (compatible nombre de châssis et « HAT ») |

*En pratique* : pour du **multimédia 4K**, du **desktop** très fluide ou du **USB 3**, un **Pi 4** ou **Pi 5** est plus confortable ; pour **apprendre**, **domotique légère**, **serveur** modeste ou **robotique** à petite échelle, un Pi 3 peut encore suffire — surtout si vous l’avez déjà sous la main.

**Illustration (carte réelle)** — Raspberry Pi 3 Modèle B :

![Raspberry Pi 3 Model B, vue de dessus — connecteurs USB, Ethernet, GPIO](/images/blog/raspberry-pi3-mise-en-route/raspberry-pi-3-model-b-sven-petersen-cc-by-sa-4.jpg)

*Photo : [Sven.petersen](https://commons.wikimedia.org/wiki/File:9815_-_Raspberry_Pi_3.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), via Wikimedia Commons.*

## 2. Matériel nécessaire

- **La carte** Raspberry Pi 3 Modèle B.
- **Carte microSD** : 16 Go ou plus, **classe A1/A2** ou marque fiable ; 32 Go reste un bon compromis.
- **Alimentation** : **5 V** en **micro-USB**, courant **≥ 2,5 A** recommandé (sous-alimentation = écrans étranges ou redémarrages).
- **Écran + clavier + souris** (facultatif si vous préparez tout avec **Imager** en mode « sans écran »).
- **Câble réseau** ou Wi‑Fi ; pour le premier démarrage, le **filaire** évite une étape de dépannage.

Schéma des **branchements courants** (alimentation, HDMI, zone SD) :

![Schéma des branchements usuels Raspberry Pi 3 Modèle B](/images/blog/raspberry-pi3-mise-en-route/connexions-pi3.svg)

## 3. Préparer la carte SD avec Raspberry Pi Imager

L’outil officiel **Raspberry Pi Imager** écrit **Raspberry Pi OS** (ou une autre image) sur la microSD depuis un PC Windows, macOS ou Linux.

1. Téléchargez **Imager** sur la page officielle : [https://www.raspberrypi.com/software/](https://www.raspberrypi.com/software/)
2. Installez-le, insérez la **microSD** (adaptateur USB si besoin).
3. Lancez Imager ; enchaînez les étapes **Choisir l’OS** → **Choisir le stockage** → **Écrire** (en anglais : *CHOOSE OS → CHOOSE STORAGE → WRITE*).

![Flux logique : OS, stockage, écriture, puis insertion dans le Pi](/images/blog/raspberry-pi3-mise-en-route/imager-etapes.svg)

### 3.1 Quel OS choisir pour un Pi 3 ?

- **Raspberry Pi OS (32-bit)** : le plus **documenté** et **léger** pour cette carte.
- **Raspberry Pi OS (64-bit)** : possible sur Pi 3, parfois un peu plus **gourmand** en RAM ; à tester selon votre usage.

Évitez de surcharger avec un bureau trop lourd si vous visez surtout **serveur** ou **robotique** : l’image **Lite** (sans bureau graphique) est idéale pour SSH uniquement.

### 3.2 Options avancées (très recommandé)

Avant d’écrire sur la carte, ouvrez l’**icône en forme d’engrenage** (*Advanced options*) dans Imager. Vous pouvez souvent :

- définir le **nom d’hôte** (ex. `raspberrypi.local`) ;
- activer **SSH** et une **authentification par mot de passe** ou par **clé** ;
- configurer le **Wi‑Fi** (SSID + mot de passe) ;
- créer un **compte utilisateur** et un **mot de passe** (sur les images récentes, le couple historique `pi` / `raspberry` n’est **plus** le défaut imposé — tout se paramètre ici ou au premier démarrage).

C’est ce qui permet un premier boot **sans écran** : la carte joint le réseau, SSH est prêt, vous vous connectez depuis un autre PC.

### 3.3 Écrire et finaliser

- Confirmez bien que le **disque sélectionné** est votre **microSD** (tout le contenu sera effacé).
- Attendez la fin de l’écriture et de la **vérification** si proposée.
- Retirez la carte proprement, insérez-la **dans le Pi** (contacts vers le haut, côté « court » de la carte selon le boîtier).

## 4. Premier démarrage et assistant

1. Branchez **d’abord** l’écran et le clavier si vous les utilisez, puis l’**alimentation** micro-USB.
2. Au premier lancement, un **assistant** (selon version) peut demander : **pays**, **langue**, **fuseau horaire**, **mot de passe** du compte, mise en **plein écran** HDMI, **Wi‑Fi**, **mises à jour** logicielles.

**Conseil** : acceptez les **mises à jour** proposées à la fin de l’assistant, ou faites-les manuellement (section suivante).

Si vous aviez tout pré-réglé dans Imager et que vous êtes en **SSH** uniquement, cet assistant peut être minimal ou déjà contourné — selon l’image exacte.

## 5. Mettre à jour le système (indispensable)

Ouvrez un terminal sur le Pi (ou une session SSH) :

```bash
sudo apt update
sudo apt full-upgrade -y
sudo reboot
```

Cela aligne **Raspberry Pi OS** et les paquets sur les correctifs de sécurité. Réessayez régulièrement sur une machine exposée au réseau.

## 6. Activer SSH et VNC après coup

Si vous n’avez pas activé SSH dans Imager :

- Menu **Préférences** → **Raspberry Pi Configuration** (ou `sudo raspi-config`) → onglet **Interfaces** :
  - **SSH** : **Activé** pour la console à distance ;
  - **VNC** : **Activé** pour le bureau graphique à distance (serveur **RealVNC** intégré à Raspberry Pi OS avec bureau).

Redémarrez si demandé. Pour vous connecter en VNC depuis un autre PC, utilisez **VNC Viewer** (client officiel) avec l’**adresse IP** du Pi ou `raspberrypi.local` (mDNS).

## 7. Se connecter en SSH depuis Windows

1. Sur le Pi : notez l’**adresse IP** (`hostname -I` ou menu réseau).
2. Sous Windows 11, **OpenSSH** est souvent disponible : ouvrez **PowerShell** ou **Terminal** et tapez `ssh utilisateur@adresse_ip` (remplacez par votre utilisateur créé à l’installation).
3. Sinon, **PuTTY** reste un client graphique courant pour SSH.

**Sécurité** : changez le mot de passe par défaut, et préférez à terme une **clé SSH** plutôt qu’un mot de passe sur Internet.

## 8. Transférer des fichiers : plutôt SFTP que « FTP classique »

Avec **SSH** activé, vous avez déjà **SFTP** (SSH File Transfer Protocol) : même **port 22**, chiffrement intégré.

- **FileZilla** : protocole **SFTP**, hôte = IP du Pi, utilisateur / mot de passe (ou clé), port **22**.
- Pas besoin d’installer **vsftpd** pour un usage familial ou pédagogique ; le **FTP** non chiffré (port 21) est aujourd’hui **déconseillé** sur un réseau non maîtrisé.

*(L’ancienne version de cet article détaillait **vsftpd** : elle reste possible pour des besoins très spécifiques, mais SFTP couvre la quasi-totalité des cas « envoyer un fichier au Pi ».)*

## 9. Dépannage express

| Symptôme | piste |
|----------|--------|
| **Éclair jaune** (éclair sur fond couleur) en coin d’écran | Souvent **sous-alimentation** ou câble micro-USB trop fin — tester une **alim 5 V / 2,5 A** de qualité. |
| Écran noir au boot | Vérifier **HDMI**, parfois brancher **après** l’allumage ; essayer une autre résolution dans `raspi-config`. |
| Pas d’IP / pas de Wi‑Fi | Câble Ethernet pour le test ; vérifier SSID / mot de passe saisis dans **Imager** ; routeur qui accepte le Pi. |
| SSH « connection refused » | SSH non activé : brancher un écran une fois ou remonter la carte avec Imager (options avancées). |

## 10. Pi 3 et suite du projet

Une fois la **base système** stable, vous pouvez enchaîner vers des **projets code** (Python, GPIO), des **serveurs** (web, petit NAS, VPN maison), ou comparer avec un **robot éducatif tout-en-un** si l’objectif est surtout la **mécanique** et un parcours **guidé** — voir notre [comparatif Raspberry Pi ou kit robot pour ado](/raspberry-pi-ou-kit-robot-ado-guide/).

## Liens Amazon (affiliation)

Recherches indicatives (prix et vendeurs à vérifier sur la fiche) :

- [Raspberry Pi kit débutant](https://www.amazon.fr/s?k=Raspberry+Pi+kit+d%C3%A9butant&tag=manuso06-21)
- [Carte micro SD Raspberry Pi 32 Go](https://www.amazon.fr/s?k=carte+micro+SD+Raspberry+Pi+32+Go&tag=manuso06-21)
- [Alimentation 5V 2.5A micro USB Raspberry](https://www.amazon.fr/s?k=alimentation+5V+2.5A+micro+USB+Raspberry&tag=manuso06-21)
- [Livre Raspberry Pi débutant français](https://www.amazon.fr/s?k=Raspberry+Pi+livre+d%C3%A9butant+fran%C3%A7ais&tag=manuso06-21)

*Partenaire Amazon — commission possible sur achats éligibles.*

---

**En résumé** : **Raspberry Pi Imager** + **Raspberry Pi OS**, **options avancées** pour SSH/Wi‑Fi, **mises à jour** `apt`, puis **SSH** et **VNC** selon vos besoins — vous avez une base saine pour tout ce qui vient après sur un **Raspberry Pi 3 Modèle B**.
