---
title: "Premiers pas avec mBlock 5 : comprendre l’environnement"
description: "Tour d’horizon de mBlock 5 : scène, lutins, onglet Appareil, palettes de blocs, zone de script, connexion au robot et exécution du programme. Guide pour débutants après l’installation."
pubDate: "2020-04-07"
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
updatedDate: "2026-03-31"
categories:
  - "mBlock"
  - "Guide"
  - "Scratch"
  - "Débutant"
relatedLinks:
  - title: "Installer mBlock 5 sous Windows 10"
    href: "/installer-mblock-5-sous-windows-10/"
  - title: "Quel logiciel mBlock pour votre robot"
    href: "/logiciel-mblock-makeblock-mbot-quel-choisir/"
  - title: "Installer les blocs du mBot"
    href: "/installer-les-blocs-du-mbot/"
  - title: "Mon premier programme mBot"
    href: "/mon-premier-programme-mbot/"
  - title: "Dépannage Bluetooth mBlock"
    href: "/mblock-bluetooth-erreurs-frequentes-depannage/"
---

**mBlock 5** est l’application de **programmation par blocs** de Makeblock, proche de **Scratch**, mais pensée pour **brancher** des robots (mBot, mBot2, Codey Rocky, CyberPi, etc.) en plus d’animer des **lutins** à l’écran. Une fois [mBlock installé](/installer-mblock-5-sous-windows-10/), ce guide vous aide à **vous repérer** dans la fenêtre : menus, zones, vocabulaire — avant de enchaîner sur un [premier programme pour le mBot](/mon-premier-programme-mbot/).

## 1. Écran « type Scratch » et robot : ce que mBlock permet

mBlock n’est **pas** coupé en deux bandes dans la fenêtre : c’est **un seul** logiciel, avec des **zones** (scène, scripts, palettes de blocs) qui se ressemblent à Scratch.

**Côté écran**, vous utilisez la **scène**, les **lutins** et les arrière-plans comme sur Scratch : animer des personnages, des décors, de petits jeux — tout reste **dans la fenêtre** de mBlock.

**Côté robot**, ce n’est pas une « autre moitié » de l’interface : une fois un **appareil Makeblock** ajouté (mBot, etc.) et **connecté** en USB ou Bluetooth, des **blocs supplémentaires** apparaissent pour le matériel réel — moteurs, LED, capteurs, buzzer, etc. Tant que vous n’avez pas ajouté d’appareil, vous ne voyez que la partie **lutins / scène** ; après ajout, vous programmez avec les blocs **dédiés au robot**, seuls ou **en plus** des lutins si le projet mélange les deux (par exemple un score à l’écran pendant que le robot avance).

En pratique : **sans robot**, vous restez sur l’animation à l’écran comme sur Scratch. **Avec robot**, vous vous concentrez souvent sur les blocs **appareil** — la scène peut attendre. **Les deux** peuvent aussi être combinés dans un même projet.

## 2. Vue globale de la fenêtre

![Vue globale de la fenêtre mBlock 5 — barre de titre, scène, palettes, zone de script](/images/blog/premier-pas-mblock/mblock-vue-globale.png)

En parcourant l’interface de gauche à droite et de haut en bas, on retrouve en général :

1. **Barre de menus** : fichier, édition, réglages, langue, aide, parfois compte Makeblock.
2. **Scène** : aperçu du projet visuel (lutins, décor).
3. **Contrôles sous la scène** : **drapeau vert** (démarrer), **stop**, parfois **plein écran**, **taille des blocs**.
4. **Zone des lutins / appareils** : onglets pour choisir **qui** est programmé (lutin, robot…).
5. **Catégories de blocs** : colonnes colorées (Mouvement, Apparence, etc., + catégories **mBot** ou autre appareil une fois ajouté).
6. **Zone de script** : grand espace central où l’on **emboîte** les blocs pour former le programme.

Les libellés exacts peuvent varier selon la **langue** (français / anglais) et la **version** de mBlock ; la **logique** des zones reste la même.

## 3. Le menu principal

![Barre de menus — Nouveau, Ouvrir, Enregistrer, langue, tutoriel](/images/blog/premier-pas-mblock/mblock-menu-principal.png)

À connaître dès le début :

- **Nouveau / Ouvrir / Enregistrer** : vos projets sont souvent des fichiers **.mblock** (pensez à sauvegarder souvent).
- **Langue** : basculer l’interface en **français** si besoin (souvent dans les préférences ou le menu).
- **Tutoriel ou aide en ligne** : raccourci utile la première semaine.
- **Connexion / compte** : optionnel selon l’usage ; pour piloter un robot, l’essentiel est la **connexion à l’appareil** (voir plus bas), pas forcément un compte cloud.

## 4. La scène et les contrôles de lecture

![Scène avec lutin, drapeau vert, stop, réglage taille des blocs](/images/blog/premier-pas-mblock/mblock-scene-controles.png)

- **Scène** : c’est le « théâtre » des lutins. Coordonnées, taille, ordre des calques : même idée que sur [scratch.mit.edu](https://scratch.mit.edu/).
- **Drapeau vert** : démarre les scripts qui commencent par le bloc « quand le drapeau vert est cliqué ».
- **Bouton stop** : arrête tout — indispensable si une boucle ne se termine pas.
- **Taille des blocs** : agrandir ou réduire pour les jeunes ou les démonstrations sur vidéoprojecteur.

## 5. Lutins, appareils et les trois onglets

![Onglets Appareil, Objet (lutins), Arrière-plan](/images/blog/premier-pas-mblock/mblock-onglets-lutins-appareil.png)

Sous ou à côté de la scène, la zone qui gère **qui** est sélectionné comporte souvent trois onglets :

| Onglet | Usage |
|--------|--------|
| **Appareil** | Ajouter un robot Makeblock (mBot, etc.), le **connecter** (USB / Bluetooth), puis utiliser ses **blocs** dédiés. |
| **Objet** (lutins) | Choisir le lutin actif, en créer ou en importer ; position sur la scène. |
| **Arrière-plan** | Choisir ou importer le décor de la scène. |

Pour le [mBot](/mbot-mon-premier-robot-educatif/), commencez par **ajouter l’appareil** puis [installer les blocs mBot](/installer-les-blocs-du-mbot/) si la palette n’apparaît pas. La connexion **USB** est la plus simple pour dépanner ; le **Bluetooth** est pratique sans fil mais plus sensible aux interférences — voir [dépannage Bluetooth](/mblock-bluetooth-erreurs-frequentes-depannage/).

## 6. Catégories de blocs et couleur

![Colonne des catégories et palette de blocs pour le lutin ou l’appareil sélectionné](/images/blog/premier-pas-mblock/mblock-categories-blocs.png)

- Les **catégories** regroupent les blocs par thème : mouvement, apparence, son, contrôle, capteurs, etc.
- Les blocs **du robot** n’apparaissent que lorsque l’**appareil** correspondant est **ajouté** et **sélectionné**.
- La catégorie **« Mes blocs »** (ou équivalent) sert à créer vos **propres** blocs à partir de scripts réutilisables — utile plus tard pour structurer de gros projets.

Les **couleurs** aident à retrouver rapidement une famille de commandes ; ce n’est pas décoratif seulement, c’est un **repère visuel** en classe.

## 7. La zone de script

![Zone de script avec blocs emboîtés](/images/blog/premier-pas-mblock/mblock-zone-script.png)

C’est ici que vous **construisez** le programme :

- Les blocs s’**emboîtent** comme des pièces de puzzle ; seuls certains assemblages sont valides (formes compatibles).
- L’exécution suit en général le **flux de haut en bas** pour une pile de blocs (sauf si vous utilisez des structures de contrôle plus avancées).
- Vous pouvez avoir **plusieurs scripts** en parallèle (plusieurs piles qui démarrent sur des événements différents).

**Astuce :** commencez toujours par un bloc **déclencheur** (drapeau vert, touche, message, événement robot…) pour savoir **quand** le programme démarre.

## 8. Mode Python (aperçu)

Sur certaines versions et appareils, mBlock propose un passage vers **Python** (onglet ou bascule « code »). Ce n’est pas nécessaire pour les premiers pas en blocs ; retenez simplement que c’est la **suite logique** quand la syntaxe texte devient un objectif pédagogique — comme sur [mBot2](/mbot2-de-makeblock-le-robot-educatif-pour-apprendre-la-robotique/) ou [CyberPi](/decouvrez-makeblock-cyberpi-une-carte-de-developpement-electronique-polyvalente/).

## 9. Connexion au robot : ce qu’il faut vérifier

Avant de cliquer sur « connecter » :

1. **Robot allumé** et **batterie** ou piles suffisantes.
2. **Câble USB** bien branché *ou* **Bluetooth** appairé côté Windows (voir [logiciel : app vs Web](/logiciel-mblock-makeblock-mbot-quel-choisir/)).
3. Dans mBlock, **bon appareil** sélectionné dans la liste (éviter de confondre deux robots identiques en classe).

Ensuite, selon le mode :

- **Exécution en direct** : le programme tourne **tant que** le lien avec le PC est actif (utile pour tester).
- **Téléversement** : le programme est **enregistré dans le robot** pour qu’il fonctionne **sans** le câble — détaillé dans [mon premier programme mBot](/mon-premier-programme-mbot/).

## 10. Mini-FAQ

### mBlock 5 et Scratch en ligne, c’est pareil ?

**Presque** pour la partie lutins / scène. La différence majeure est le **matériel Makeblock** : pilotes, blocs robots, mise à jour du **firmware**. Pour du pur Scratch sans robot, le site officiel suffit ; pour un **mBot**, mBlock est adapté.

### Je ne vois pas les blocs de mon robot

Ajoutez d’abord l’**appareil** dans l’onglet prévu, puis vérifiez la [procédure d’extension mBot](/installer-les-blocs-du-mbot/). Sans appareil reconnu, les blocs spécifiques n’apparaissent pas.

### L’interface est en anglais

Cherchez **Language** / **Préférences** / **Paramètres** dans le menu (emplacement variable selon la version) et choisissez **Français**.

### mBlock plante au premier lancement

Mettez à jour **Windows**, **mBlock** et les **pilotes** ; testez en **administrateur** une fois ; en cas de blocage antivirus, voir la FAQ de [l’article d’installation](/installer-mblock-5-sous-windows-10/).

### C’est quoi un « programme mblock » ?

Dans mBlock, un **programme** est le **script en blocs** (une ou plusieurs piles) que vous assemblez dans la **zone de script**, souvent sauvegardé dans un fichier projet **`.mblock`**. Pour en voir un exemple sur **robot mBot**, suivez [Mon premier programme mBot](/mon-premier-programme-mbot/).

### « mBlock 5 web » et l’application installée, même fonction ?

L’**interface** (scène, blocs, zone de script) se ressemble entre **[mBlock en ligne](https://ide.mblock.cc/)** et l’**appli bureau**. En revanche, le **branchement robot**, le **Bluetooth** et le **téléversement** sont souvent **plus fiables** dans l’application — détail dans [Quel logiciel mBlock](/logiciel-mblock-makeblock-mbot-quel-choisir/).

---

## Liens Amazon (affiliation)

- [mBot Makeblock](https://www.amazon.fr/s?k=mBot+Makeblock&tag=manuso06-21)
- [Robot éducatif programmable enfant](https://www.amazon.fr/s?k=robot+%C3%A9ducatif+programmable+enfant&tag=manuso06-21)

*Partenaire Amazon — commission possible sur achats éligibles.*

---

**Étape suivante :** enchaînez avec [l’installation des blocs mBot](/installer-les-blocs-du-mbot/) si nécessaire, puis [mon premier programme mBot](/mon-premier-programme-mbot/) pour relier **interface**, **connexion** et **téléversement**.
