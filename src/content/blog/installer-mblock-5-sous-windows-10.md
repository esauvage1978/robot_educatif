---
title: "Télécharger et installer mBlock 5 sous Windows 10 / 11"
description: "Où télécharger mBlock 5 gratuitement (site officiel Makeblock), puis l’installer sur Windows 10 ou 11 : étapes détaillées, captures d’écran, FAQ dépannage (SmartScreen, antivirus, droits admin, fichier bloqué)."
pubDate: "2020-04-07"
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
updatedDate: "2026-03-29"
categories:
  - "mBlock"
  - "Guide"
  - "Installation"
  - "Windows"
---

Ce guide vous accompagne **de A à Z** pour **installer mBlock 5.6** (programmation par blocs Makeblock) sur **Windows 10** ou **Windows 11**. Le numéro exact de version peut évoluer (**5.6.x**) selon le site officiel ; l’**ordre des écrans** de l’assistant reste en général le même.

**À propos des images :** les étapes **sans** capture réelle sont illustrées par des **schémas** (fenêtres simplifiées) ; les **trois** illustrations en **photo d’écran** correspondent au site de téléchargement, à la **barre de progression** et à l’**écran de fin**. Les **libellés** peuvent différer selon la langue ou la version ; en cas de doute, suivez la **logique** décrite (Suivant, Installer, Oui, etc.).

**Affichage des illustrations** : **trois étapes clés** (page de téléchargement, installation en cours, fin d’installation) sont illustrées par de **vraies captures d’écran** (PNG) dans `public/images/blog/installer-mblock/`. Les **autres étapes** restent en **schémas SVG** (représentation des fenêtres), servis en direct comme les PNG — pas d’optimiseur obligatoire, chemins `/images/...` réécrits en **relatifs** après `npm run build` pour WAMP / sous-dossiers. Déployez **tout** le dossier `dist/` (dont `_astro/` et `images/`).

mBlock existe aussi pour **macOS**, **iOS**, **Android**, **Linux** et **Chromebook** — ici nous ne traitons que **Windows**.

Une fois l’installation faite, vous pourrez programmer un robot comme le **[mBot](https://amzn.to/34eEFtr?tag=manuso06-21)** (lien Amazon affilié).

## Avant de commencer (prérequis)

- **Compte administrateur** (ou mot de passe administrateur) : Windows affichera souvent une fenêtre **Contrôle de compte d’utilisateur** ; il faut pouvoir cliquer sur **Oui**.
- **Connexion Internet** uniquement pour **télécharger** l’installateur ; l’usage de mBlock en local peut ensuite se faire sans réseau selon votre usage.
- **Espace disque** : prévoyez au moins **300 à 500 Mo** libres (marge confortable).
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

Le fichier téléchargé ressemble en général à un nom du type **`mblock5-win32-….exe`** ou **`mblock5-win64-….exe`** — le préfixe exact peut varier selon la version publiée.

![Capture d’écran : page de téléchargement Makeblock — mBlock 5 pour Windows](/images/blog/installer-mblock/ecran-01-page-makeblock.png)

*Repérez la section **mBlock 5** et le bouton **Download** pour **Windows** (libellés pouvant varier selon la version du site).*

### 1.3 Où est enregistré le fichier ?

Après le clic sur **Download** :

- Le fichier arrive souvent dans **`Ce PC → Téléchargements`**.
- Sous **Edge** ou **Chrome**, une barre en bas de la fenêtre peut afficher le téléchargement : vous pouvez cliquer sur **Ouvrir le fichier** ou **Afficher dans le dossier**.
- Raccourci utile : **`Ctrl + J`** ouvre la liste des téléchargements dans plusieurs navigateurs.

**À propos de mLink :** l’outil **mLink** sert surtout à la connexion matérielle / certains usages. Pour travailler **avec l’application installée** comme dans ce guide, concentrez-vous sur **mBlock 5** pour Windows. Vous pouvez aussi utiliser **[mBlock en ligne](https://ide.mblock.cc/)** si vous préférez ne rien installer.

---

## Étape 2 — Lancer l’installateur et suivre l’assistant

### 2.1 Ouvrir le fichier `.exe`

1. Ouvrez l’**Explorateur de fichiers** (`Windows + E`).
2. Allez dans **Téléchargements**.
3. Repérez le fichier **`.exe`** téléchargé (icône d’application ou d’installateur).
4. **Double-cliquez** sur ce fichier pour lancer l’installation.

![Représentation : Explorateur Windows — fichier installateur dans Téléchargements](/images/blog/installer-mblock/ecran-02-explorateur-exe.svg)

*Le **nom exact** du fichier dépend de la version ; l’important est de lancer le **bon** `.exe` que vous venez de télécharger.*

### 2.2 Contrôle de compte d’utilisateur (UAC)

Windows peut afficher une fenêtre **« Voulez-vous autoriser cette application… »** avec les boutons **Non** et **Oui**.

- Cliquez sur **Oui** pour autoriser l’installateur à modifier l’ordinateur (comportement normal pour un logiciel installé dans `Program Files`).

![Représentation : fenêtre UAC — cliquer sur Oui](/images/blog/installer-mblock/ecran-03-uac.svg)

*Si vous n’êtes pas administrateur, demandez à une personne qui a les droits sur la machine.*

### 2.3 Choix de la langue

L’assistant peut proposer en premier le **choix de la langue** d’installation.

- Sélectionnez **Français** (ou la langue souhaitée).
- Validez avec **OK** (ou **Suivant** selon l’écran).

![Représentation : assistant mBlock — choix de la langue](/images/blog/installer-mblock/ecran-04-langue.svg)

### 2.4 Dossier d’installation (destination)

L’écran suivant indique le **dossier** où mBlock sera installé (souvent sous **`Program Files`**).

- En général, **gardez le chemin proposé** pour éviter les problèmes de droits ou de mises à jour.
- Utilisez **Parcourir…** seulement si vous savez pourquoi vous changez d’emplacement (disque secondaire, politique établissement, etc.).
- Cliquez sur **Suivant**.

![Représentation : assistant — dossier d’installation](/images/blog/installer-mblock/ecran-05-dossier-destination.svg)

### 2.5 Menu Démarrer (dossier du programme)

L’installateur propose souvent un **nom de dossier** dans le **menu Démarrer** (ex. « mBlock »).

- Le nom par défaut convient dans la plupart des cas.
- Cliquez sur **Suivant**.

![Représentation : assistant — dossier dans le menu Démarrer](/images/blog/installer-mblock/ecran-06-menu-demarrer.svg)

### 2.6 Raccourci sur le bureau

Une case à cocher permet de **créer un raccourci sur le bureau**.

- Il est **conseillé de laisser cette option activée** pour retrouver mBlock rapidement après l’installation.
- Cliquez sur **Suivant**.

![Représentation : assistant — raccourci sur le bureau](/images/blog/installer-mblock/ecran-07-raccourci-bureau.svg)

### 2.7 Résumé puis installation

Un écran récapitule les choix (**Prêt à installer** ou équivalent).

- Vérifiez que le dossier d’installation et les options vous conviennent.
- Cliquez sur **Installer** (ou **Installer maintenant**).

Une **nouvelle demande UAC** peut réapparaître : cliquez encore sur **Oui** si Windows le demande.

![Représentation : assistant — prêt à installer, bouton Installer](/images/blog/installer-mblock/ecran-08-pret-installer.svg)

### 2.8 Barre de progression

Patientez pendant la **copie des fichiers**. Ne fermez pas la fenêtre tant que l’assistant ne l’indique pas.

![Capture d’écran : assistant d’installation mBlock — copie des fichiers en cours](/images/blog/installer-mblock/ecran-09-progression.png)

### 2.9 Fin de l’installation

À la fin, une page **Installation terminée** peut proposer de **lancer mBlock** immédiatement (case à cocher).

- Cochez-la si vous voulez ouvrir le logiciel tout de suite ; décochez si vous préférez le lancer plus tard.
- Cliquez sur **Terminer** (ou **Fermer**).

![Capture d’écran : assistant — installation terminée, option pour lancer mBlock](/images/blog/installer-mblock/ecran-10-termine.png)

### 2.10 Premier lancement (si vous n’avez pas coché « Lancer »)

Sinon, ouvrez mBlock via :

- le **raccourci sur le bureau**, ou  
- le **menu Démarrer** : tapez **mBlock** dans la recherche puis cliquez sur l’application.

Ensuite, suivez l’article **[Premier pas avec mBlock 5](/premier-pas-avec-mblock-5/)** pour vous repérer dans l’interface.

---

## Dépannage rapide

| Problème | Piste |
|----------|--------|
| Le fichier `.exe` ne se lance pas | **Propriétés** → **Débloquer** si visible ; **Exécuter en tant qu’administrateur** ; retélécharger le fichier ; voir la FAQ ci-dessous. |
| Message **Windows a protégé votre PC** (SmartScreen) | **Informations complémentaires** → **Exécuter quand même** — uniquement si le fichier vient bien de **mblock.cc**. |
| Installation interrompue / écran d’erreur | Antivirus ou pare-feu : autoriser l’installateur ou désactiver **temporairement** la protection le temps de l’installation (puis la réactiver). |
| UAC bloqué / pas de droits admin | Compte administrateur ou aide d’un adulte / du service informatique. |
| Installateur dans une autre langue | Repérez **Next** / **Back** / **Install** ; revenez en arrière ou relancez et choisissez **Français**. |

---

## Questions fréquentes (FAQ)

### Qu’est-ce que mBlock 5 ?

**mBlock 5** (parfois noté **mblock 5**) est l’environnement de programmation par blocs développé par **Makeblock**, proche de **Scratch**, utilisé notamment pour les robots **mBot** et le reste de l’écosystème Makeblock.

### Où télécharger mBlock 5.6 gratuitement ?

Page officielle : **[mblock.cc — download](https://www.mblock.cc/en-us/download/)**. Sélectionnez **Windows** et la variante adaptée (**64 bits** en priorité). Évitez les installateurs sur des sites tiers non officiels.

### mBlock 5 est-il gratuit et disponible en français ?

Oui : le téléchargement standard est **gratuit**. Pour le **français**, choisissez **Français** à l’écran de langue au début de l’installation.

### Windows 11 : la même procédure ?

Oui. Les étapes décrites pour **Windows 10** s’appliquent en général telles quelles sous **Windows 11** (UAC, assistant, dossiers par défaut).

### Dois-je installer exactement la 5.6 ?

Installez la **dernière version stable** proposée sur le site officiel (souvent **5.6.x** ou plus récent) : les écrans peuvent être légèrement différents, mais la logique est la même.

### « Télécharger mblock » et « télécharger mblock 5 », c’est la même chose ?

Dans la plupart des cas, oui : il s’agit de **mBlock 5** pour PC. Vérifiez bien que la source est **Makeblock** / **mblock.cc**.

---

## FAQ — Quand l’installation ne fonctionne pas

Les causes les plus fréquentes viennent de **Windows Defender / SmartScreen**, d’un **antivirus tiers**, de **droits insuffisants** ou d’un **fichier téléchargé incomplet**. La documentation Makeblock indique notamment que certains **logiciels de sécurité** (antivirus, suites « tout-en-un ») peuvent **bloquer** l’installation ou l’exécution : il faut alors **autoriser** l’application ou l’**ajouter aux exceptions** après vérification que le fichier provient du **site officiel**.

### Windows affiche « Windows a protégé votre PC » ou SmartScreen bloque l’installateur

C’est courant pour des fichiers **récemment téléchargés** ou peu « connus » de SmartScreen, même pour des logiciels légitimes.

1. Vérifiez que le `.exe` vient bien de **[mblock.cc](https://www.mblock.cc/en-us/download/)** (pas d’un site inconnu).
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

- Installez dans le chemin **par défaut** (`Program Files\…`) plutôt qu’un dossier personnel restreint.
- Évitez les chemins avec **caractères spéciaux** ou disques pleins.
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

Libérez de la place sur le disque **C:** (vidage de la corbeille, fichiers temporaires, *Paramètres → Stockage*). Prévoyez **plusieurs centaines de Mo** libres pour l’installation et les mises à jour.

### Où demander de l’aide si rien ne fonctionne ?

- **[Centre d’aide Makeblock](https://support.makeblock.com/)** (articles, tickets).
- **E-mail** souvent indiqué sur le site officiel : **service@makeblock.com** — joignez la **version de Windows**, le **message d’erreur exact** (capture d’écran) et la **version** du fichier téléchargé.

*Les libellés d’erreur et les écrans peuvent varier selon la version de mBlock et de Windows ; les principes ci-dessus correspondent aux cas les plus signalés par les utilisateurs et aux recommandations des éditeurs de logiciels sur Windows.*
