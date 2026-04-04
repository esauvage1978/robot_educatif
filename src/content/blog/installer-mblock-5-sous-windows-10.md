---
title: "Télécharger et installer mBlock 5 sous Windows 10 / 11"
description: "Télécharger mBlock 5 gratuitement (mblock5, mBlock v5) pour Windows : installer mBlock sur PC, mblock download Windows, versions 5.6.x vs anciennes 5.4.x ; étapes après l’UAC, ~380 Mo / ~1,05 Go installé, lien de secours, FAQ SmartScreen et antivirus."
pubDate: "2020-04-07"
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
updatedDate: "2026-03-31"
categories:
  - "mBlock"
  - "Guide"
  - "Installation"
  - "Windows"
---

Ce guide vous accompagne **de A à Z** pour **installer mBlock 5.6** (programmation par blocs Makeblock) sur **Windows 10** ou **Windows 11**. Le numéro exact de version peut évoluer (**5.6.x**) selon le site officiel. Depuis les versions récentes de l’installateur, **après l’acceptation du Contrôle de compte d’utilisateur (UAC)**, l’installation **démarre tout de suite** : il n’y a **plus d’écran** pour la langue par défaut, le dossier d’installation, le menu Démarrer, le raccourci bureau ou un résumé avant la copie des fichiers.

**Illustrations :** **captures** pour la **page de téléchargement**, le fichier dans **Téléchargements**, l’**écran de fin** et la **taille du dossier** une fois installé ; l’**UAC** reste schématisé. Les libellés peuvent varier selon la langue de Windows ou la version : en cas de doute, suivez la **logique** (Oui, Terminer, etc.).

mBlock existe aussi pour **macOS**, **iOS**, **Android**, **Linux** et **Chromebook** — ici nous ne traitons que **Windows**.

Une fois l’installation faite, vous pourrez programmer un robot comme le **[mBot](https://amzn.to/34eEFtr?tag=manuso06-21)** (lien Amazon affilié).

## Avant de commencer (prérequis)

- **Compte administrateur** (ou mot de passe administrateur) : Windows affichera souvent une fenêtre **Contrôle de compte d’utilisateur** ; il faut pouvoir cliquer sur **Oui**.
- **Connexion Internet** uniquement pour **télécharger** l’installateur ; l’usage de mBlock en local peut ensuite se faire sans réseau selon votre usage.
- **Espace disque** : le fichier d’installation fait **environ 380 Mo** ; **une fois installé**, le programme occupe **environ 1,05 Go** sur le disque (dossier sous `Program Files`, valeur pouvant varier légèrement selon la version). Prévoyez **au moins 1,5 à 2 Go** libres sur le disque système pour l’installation, les fichiers déployés et les mises à jour (marge confortable).
- **Antivirus / pare-feu** : en cas de blocage rare du fichier `.exe`, vérifiez que la source est bien **mblock.cc** (site officiel) avant d’autoriser l’exception.

---

## Étape 1 — Télécharger l’installateur Windows

### 1.1 Ouvrir la page officielle

Rendez-vous sur la page de téléchargement Makeblock :

**[mblock.cc — Download (Windows)](https://www.mblock.cc/en-us/download/)**

Utilisez de préférence **Chrome**, **Edge** ou **Firefox** à jour. Évitez les liens « miroir » ou sites tiers : téléchargez **uniquement** depuis le domaine officiel.

### 1.2 Choisir Windows et la bonne variante

Sur la page :

- Sélectionnez la section **Windows**.
- Privilégiez la version **64 bits** si votre PC est récent (cas le plus courant). Si vous ne savez pas : sous Windows, **Paramètres → Système → À propos** indique le type du système (**64 bits** ou **32 bits**).

Le fichier téléchargé ressemble en général à un nom du type **`mblock5-win32-….exe`**, **`mblock5-win64-….exe`** ou **`V5.6.0.exe`** — le nom exact peut varier selon la version publiée.

**Si le site officiel est indisponible**, vous pouvez utiliser à titre de secours une **copie de l’installateur** hébergée sur ce site (même famille de version) : **[Télécharger l’installateur mBlock 5 (Windows, secours)](/capture/installer-mblock-5-sous-windows-10/V5.6.0.exe)**. Préférez toujours **[mblock.cc](https://www.mblock.cc/en-us/download/)** dès qu’il est à nouveau accessible, pour avoir la **dernière** version et les **empreintes** attendues.

![Capture d’écran : page de téléchargement Makeblock — mBlock 5 pour Windows](/images/blog/installer-mblock/ecran-01-page-makeblock.png)

*Repérez la section **mBlock 5** et le bouton **Download** pour **Windows** (libellés pouvant varier selon la version du site).*

### 1.3 Où est enregistré le fichier ?

Après le clic sur **Download** :

- Le fichier arrive souvent dans **`Ce PC → Téléchargements`**.
- Sous **Edge** ou **Chrome**, une barre en bas de la fenêtre peut afficher le téléchargement : vous pouvez cliquer sur **Ouvrir le fichier** ou **Afficher dans le dossier**.
- Raccourci utile : **`Ctrl + J`** ouvre la liste des téléchargements dans plusieurs navigateurs.

**À propos de mLink :** l’outil **mLink** sert surtout à la connexion matérielle / certains usages. Pour travailler **avec l’application installée** comme dans ce guide, concentrez-vous sur **mBlock 5** pour Windows. Vous pouvez aussi utiliser **[mBlock en ligne](https://ide.mblock.cc/)** si vous préférez ne rien installer.

---

## Étape 2 — Lancer l’installateur

### 2.1 Ouvrir le fichier `.exe`

1. Ouvrez l’**Explorateur de fichiers** (`Windows + E`).
2. Allez dans **Téléchargements**.
3. Repérez le fichier **`.exe`** téléchargé (icône d’application ou d’installateur).
4. **Double-cliquez** sur ce fichier pour lancer l’installation.

![Capture d’écran : Explorateur Windows — fichier installateur mBlock dans Téléchargements](/capture/installer-mblock-5-sous-windows-10/explorateur_telechargement.png)

*Le **nom exact** du fichier dépend de la version ; l’important est de lancer le **bon** `.exe` que vous venez de télécharger.*

### 2.2 Contrôle de compte d’utilisateur (UAC)

Windows peut afficher une fenêtre **« Voulez-vous autoriser cette application… »** avec les boutons **Non** et **Oui**.

- Cliquez sur **Oui** pour autoriser l’installateur à modifier l’ordinateur (comportement normal pour un logiciel installé dans `Program Files`).

![Représentation : fenêtre UAC — cliquer sur Oui](/images/blog/installer-mblock/ecran-03-uac.svg)

*Si vous n’êtes pas administrateur, demandez à une personne qui a les droits sur la machine.*

### 2.3 Installation automatique (sans assistant « étape par étape »)

Après **Oui** sur l’**UAC**, l’installateur **récent** ne propose **plus** :

- de **langue** d’installation ;
- de **dossier** de destination à choisir manuellement ;
- d’options **menu Démarrer** / **raccourci bureau** ;
- d’écran **Résumé** avec un bouton **Installer** séparé.

La **copie des fichiers** commence **directement** (emplacement habituel : sous **`Program Files`**, géré par l’installateur). Patientez jusqu’à l’écran de fin.

### 2.4 Barre de progression

Pendant la **copie des fichiers**, une fenêtre avec une **barre de progression** peut s’afficher. **Ne fermez pas** la fenêtre tant que l’installateur ne l’indique pas.

### 2.5 Fin de l’installation

À la fin, un écran du type **« Install Finished »** / installation **terminée** s’affiche. Il n’y a en général **plus de case à cocher** du style « Lancer mBlock » : cliquez sur **Finish** / **Terminer** pour fermer l’assistant.

![Capture d’écran : fin de l’installation mBlock — bouton Terminer / Finish](/capture/installer-mblock-5-sous-windows-10/installation_fin.png)

### 2.6 Taille sur le disque après installation

Après l’installation, le dossier **mBlock** (souvent **`Program Files\mBlock5`**) affiche environ **1,05 Go** dans les **propriétés** Windows (**Taille** / **Taille sur disque**) — le chiffre exact peut varier un peu selon la **version** de mBlock et le **système de fichiers**.

![Capture d’écran : propriétés du dossier mBlock — taille sur le disque après installation](/capture/installer-mblock-5-sous-windows-10/taille-dossier-mblock-apres-install.png)

### 2.7 Ouvrir mBlock après l’installation

Ensuite, ouvrez mBlock via :

- le **raccourci sur le bureau**, ou  
- le **menu Démarrer** : tapez **mBlock** dans la recherche puis cliquez sur l’application.

Ensuite, suivez l’article **[Premier pas avec mBlock 5](/premier-pas-avec-mblock-5/)** pour vous repérer dans l’interface.

---

## Dépannage rapide

| Problème | Piste |
|----------|--------|
| Le fichier `.exe` ne se lance pas | **Propriétés** → **Débloquer** si visible ; **Exécuter en tant qu’administrateur** ; retélécharger le fichier ; voir la FAQ ci-dessous. |
| Message **Windows a protégé votre PC** (SmartScreen) | **Informations complémentaires** → **Exécuter quand même** — uniquement si le fichier vient bien de **mblock.cc** ou du **lien de secours** proposé plus haut sur **ce site**. |
| Installation interrompue / écran d’erreur | Antivirus ou pare-feu : autoriser l’installateur ou désactiver **temporairement** la protection le temps de l’installation (puis la réactiver). |
| UAC bloqué / pas de droits admin | Compte administrateur ou aide d’un adulte / du service informatique. |
| Écrans de l’installateur en anglais | Les libellés **Finish**, **Install Finished**, etc. sont courants ; la **langue d’interface** de mBlock se règle dans l’**application** après ouverture. |

---

## Questions fréquentes (FAQ)

### Qu’est-ce que mBlock 5 ?

**mBlock 5** (parfois noté **mblock 5**) est l’environnement de programmation par blocs développé par **Makeblock**, proche de **Scratch**, utilisé notamment pour les robots **mBot** et le reste de l’écosystème Makeblock.

### Où télécharger mBlock 5.6 gratuitement ?

Page officielle : **[mblock.cc — download](https://www.mblock.cc/en-us/download/)**. Sélectionnez **Windows** et la variante adaptée (**64 bits** en priorité). Évitez les installateurs sur des sites tiers non officiels.

### mBlock 5 est-il gratuit et disponible en français ?

Oui : le téléchargement standard est **gratuit**. L’installateur **ne demande plus** la langue au début : l’interface de **mBlock** peut suivre **Windows** ou se régler dans les **paramètres / langue** du logiciel après installation.

### Windows 11 : la même procédure ?

Oui. Les étapes décrites pour **Windows 10** s’appliquent en général telles quelles sous **Windows 11** (UAC, copie directe des fichiers, dossier sous `Program Files`).

### Dois-je installer exactement la 5.6 ?

Installez la **dernière version stable** proposée sur le site officiel (souvent **5.6.x** ou plus récent) : l’installateur peut **aller droit à la copie** des fichiers après l’**UAC**, sans les anciens écrans « Suivant » intermédiaires.

### « Télécharger mblock » et « télécharger mblock 5 », c’est la même chose ?

Dans la plupart des cas, oui : il s’agit de **mBlock 5** pour PC. Vérifiez bien que la source est **Makeblock** / **mblock.cc**.

### Recherches du type « mblock 5 télécharger », « telecharger mblock », « mblock téléchargement », « mblock download », « mblock5 download »

Toutes renvoient au **même logiciel** (mBlock **5** pour Windows). La **page officielle** reste **[mblock.cc — Download](https://www.mblock.cc/en-us/download/)** ; pour le **PC sous Windows**, choisissez la section **Windows** (souvent **64 bits**). Les équivalents en anglais (**mblock download**, **mblock 5 download**, **download mblock 5**) pointent vers la même installation.

### « mblock5 », « mblock v5 », « m block 5 », « mbloc 5 » (faute), « mblcok » : c’est bien mBlock ?

Oui : il s’agit en pratique du **même programme** (**mBlock 5**, environnement Makeblock proche de Scratch). Si une recherche ne trouve rien, retapez **mBlock 5 Makeblock** ou allez directement sur **mblock.cc**.

### Anciennes versions (5.3, 5.4.3, « télécharger mblock 5.4 3 ») : faut-il les installer ?

Les tutos ou vidéos peuvent citer **5.3** ou **5.4.3** : ce sont d’**anciennes références**. Pour un **nouveau** PC, installez plutôt la **dernière version stable** affichée sur le site officiel (souvent **5.6.x** ou plus récent). Une vieille version n’est utile que dans un cas **très spécifique** (compatibilité matériel signalée par le fabricant).

### « mblock PC », « mblock download pc », « télécharger mblock pour windows »

Sur **mblock.cc**, la section **Windows** fournit l’installateur **pour PC** (ordinateur fixe ou portable). La procédure de ce guide s’applique à **Windows 10** et **Windows 11**.

### « Installer mblock » après le téléchargement : rien d’autre à chercher ?

Une fois le **.exe** récupéré, il suffit de **lancer** le fichier (voir la section **« Étape 2 — Lancer l’installateur »** plus haut) ; il n’y a en général **pas** d’assistant « Suivant » multiple sur les installateurs récents — la copie démarre après l’**UAC**.

### mBlock en ligne, « mblock 5 web », ou installation : que choisir ?

**[mBlock en ligne](https://ide.mblock.cc/)** (navigateur) convient quand on **ne peut pas** installer de logiciel. Pour **firmware**, **USB** stable et **téléversement** vers le robot, l’**application bureau** est en général préférable — voir [Quel logiciel mBlock : app, Web, Python](/logiciel-mblock-makeblock-mbot-quel-choisir/).

### C’est quoi « mblock planet » ?

Souvent, il s’agit de l’**espace compte / cloud** historique autour de mBlock (adresse du type **planet.mblock.cc**). Pour **créer un compte** et la marche à suivre dans le logiciel, voyez [S’inscrire sur mBlock 5](/sinscrire-sur-mblock/).

### Logo mBlock, « image mblock » : où trouver une illustration officielle ?

Les **logos** et visuels de marque relèvent du **site Makeblock** et de leurs **conditions d’usage**. Pour apprendre le logiciel, les **captures d’écran** de l’interface dans les tutoriels du site montrent l’app telle qu’elle apparaît sur le bureau.

### mBlock et Minecraft : confusion ?

**Non** : **mBlock** (Makeblock, robots comme le **mBot**) n’**est pas** le jeu **Minecraft**. Si la recherche mélange les deux, précisez **Makeblock** ou **mBot**.

---

## FAQ — Quand l’installation ne fonctionne pas

Les causes les plus fréquentes viennent de **Windows Defender / SmartScreen**, d’un **antivirus tiers**, de **droits insuffisants** ou d’un **fichier téléchargé incomplet**. La documentation Makeblock indique notamment que certains **logiciels de sécurité** (antivirus, suites « tout-en-un ») peuvent **bloquer** l’installation ou l’exécution : il faut alors **autoriser** l’application ou l’**ajouter aux exceptions** après vérification que le fichier provient du **site officiel**.

### Windows affiche « Windows a protégé votre PC » ou SmartScreen bloque l’installateur

C’est courant pour des fichiers **récemment téléchargés** ou peu « connus » de SmartScreen, même pour des logiciels légitimes.

1. Vérifiez que le `.exe` vient bien de **[mblock.cc](https://www.mblock.cc/en-us/download/)** ou, en secours, du **lien d’installateur** fourni plus haut dans cet article (pas d’un site inconnu).
2. Sur l’avertissement, cliquez sur **Informations complémentaires** (ou **More info**), puis **Exécuter quand même** / **Run anyway**.
3. Si l’option n’apparaît pas : clic droit sur le fichier → **Propriétés** → cochez **Débloquer** en bas si la case existe → **OK**, puis relancez l’installateur.

### L’antivirus ou le pare-feu bloque l’installation (échec, fichier supprimé, quarantaine)

Plusieurs suites de sécurité **interceptent** les installateurs pendant la copie des fichiers. La doc Makeblock recommande notamment de **fermer temporairement** certains logiciels de protection **le temps de l’installation** (puis de les rouvrir), ou d’**ajouter une exception** pour l’installateur / le dossier d’installation.

- Ouvrez votre antivirus et regardez la section **Quarantaine**, **Menaces bloquées** ou **Historique**.
- Si **mblock** ou l’**installateur** y figure : restaurez le fichier **uniquement** s’il provient du téléchargement officiel, puis ajoutez une **exclusion** pour le dossier d’installation (souvent sous `Program Files`) ou pour l’exécutable.
- Pour le **pare-feu Windows** : en cas de blocage rare à l’ouverture de mBlock, autorisez l’application quand Windows le propose, ou créez une règle autorisant **mBlock** (voir *Pare-feu Windows Defender* dans les paramètres).

### Rien ne se passe quand je double-clique sur le `.exe`

1. **Clic droit** sur le fichier → **Exécuter en tant qu’administrateur**.
2. **Propriétés** → onglet **Général** → cochez **Débloquer** si présent.
3. **Retéléchargez** l’installateur (fichier incomplet ou corrompu : coupure réseau, navigateur qui a interrompu le téléchargement). Comparez la **taille** du fichier avec ce qu’indique le site si une taille est affichée ; supprimez l’ancienne copie avant de retélécharger.
4. Vérifiez que vous n’êtes pas sur une session **sans droits d’administration** sur un PC d’école ou d’entreprise : dans ce cas, contactez le **service informatique**.

### Message du type « Accès refusé » ou erreur d’écriture dans un dossier

- L’installateur **récent** pose en principe mBlock sous **`Program Files\…`** sans demander le chemin ; en cas d’échec, vérifiez les **droits** sur le disque **C:** et l’absence de **politique** qui bloque l’écriture.
- Évitez tout scénario où un **logiciel tiers** redirige l’installation vers un dossier personnel **restreint** ou des chemins avec **caractères spéciaux**.
- Assurez-vous d’avoir confirmé **Oui** à l’**UAC** quand Windows le demande.

### J’ai téléchargé la mauvaise architecture (32 / 64 bits)

Si le PC est en **64 bits** (cas le plus courant), prenez la version **64 bits** sur la page de téléchargement. Une version incompatible peut refuser de s’installer ou mal fonctionner. Vérifiez dans **Paramètres → Système → À propos** le **Type du système d’exploitation**.

### Une ancienne version de mBlock est déjà installée et ça pose problème

1. **Paramètres → Applications → Applications et fonctionnalités** (ou **Panneau de configuration → Programmes**).
2. Désinstallez **mBlock** (ou **Makeblock mBlock** selon le libellé).
3. Redémarrez le PC si l’assistant le propose, puis retéléchargez et réinstallez la **dernière version** depuis **mblock.cc**.

### Confusion entre mBlock et mLink

**mBlock** est l’application de programmation par blocs. **mLink** est un **outil séparé** (connexion / usage avec certaines configurations, notamment le web). Si vous installez **mLink** et voyez une erreur liée au **.NET Framework**, suivez les messages à l’écran ou la **[documentation mLink](https://support.makeblock.com/)** : mettre à jour **Windows** et les **composants optionnels .NET** via *Paramètres → Applications → Fonctionnalités facultatives* peut aider selon la version de Windows.

### L’installation semble réussie mais mBlock ne démarre pas

- Même logique qu’au-dessus : **antivirus** qui bloque l’exécutable au premier lancement → exception pour `mblock.exe` (ou nom affiché dans le dossier d’installation).
- Lancez mBlock en **administrateur** une fois pour tester (clic droit sur le raccourci). Si ça fonctionne, le problème venait souvent des **droits** ou du **blocage temps réel** de l’antivirus.
- Réinstallez **par-dessus** ou après **désinstallation propre** si le programme est listé mais cassé.

### Espace disque insuffisant

Libérez de la place sur le disque **C:** (vidage de la corbeille, fichiers temporaires, *Paramètres → Stockage*). Prévoyez **au moins ~1,5 à 2 Go** libres : installateur **~380 Mo** + programme installé **~1,05 Go** + marge pour les mises à jour.

### Où demander de l’aide si rien ne fonctionne ?

- **[Centre d’aide Makeblock](https://support.makeblock.com/)** (articles, tickets).
- **E-mail** souvent indiqué sur le site officiel : **service@makeblock.com** — joignez la **version de Windows**, le **message d’erreur exact** (capture d’écran) et la **version** du fichier téléchargé.

*Les libellés d’erreur et les écrans peuvent varier selon la version de mBlock et de Windows ; les principes ci-dessus correspondent aux cas les plus signalés par les utilisateurs et aux recommandations des éditeurs de logiciels sur Windows.*
