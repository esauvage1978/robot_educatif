---
title: "Activité mBot : mesurer des distances"
description: "Utiliser le capteur à ultrason du mBot pour mesurer une distance, l’afficher sur l’écran (mode Live) puis sur la matrice LED en autonome — types nombre / texte et piste Arduino."
pubDate: "2020-04-21"
heroImage: "../../assets/mbot/mbot-hero.png"
amazonPreset: mbot
updatedDate: "2026-03-29"
categories:
  - "Activité"
  - "mBot"
  - "Makeblock"
  - "À partir de 10 ans"
relatedLinks:
  - title: "Activité mBot : faire défiler un texte sur la LED"
    href: "/activite-mbot-faire-defiler-un-texte/"
  - title: "Installer les blocs du mBot"
    href: "/installer-les-blocs-du-mbot/"
  - title: "Premiers pas avec mBlock 5"
    href: "/premier-pas-avec-mblock-5/"
---

<aside class="article-callout" role="note">
<p><strong>Côté cours (collège / lycée)</strong></p>
<p>En une séance, tu peux montrer une <strong>mesure physique réelle</strong> (distance), un <strong>retour visuel</strong> sur l’écran mBlock, puis le même principe <strong>embarqué</strong> sur le robot — idéal pour parler capteur, variable, types de données et programme autonome.</p>
</aside>

Cette activité en **deux temps** guide pour :

1. **Lire la distance** renvoyée par le **capteur à ultrason** du [mBot](https://amzn.to/3avo9qi?tag=manuso06-21) et la voir **sur l’ordinateur** (variable + mode **Live**) ;
2. **Afficher cette distance sur la matrice LED** du robot en **mode autonome** (sans câble), en gérant le passage **nombre → texte**.

Les libellés exacts des blocs peuvent varier selon la **version de mBlock** et la **langue** de l’interface ; l’**enchaînement logique** reste le même.

> **Vidéo** — *Activité mBot : mesure des distances* : [YouTube — démonstration pas à pas](https://www.youtube.com/watch?v=1smaSvnB7Aw)

## 1. Prérequis

- Avoir un [robot éducatif mBot (Makeblock)](/mbot-mon-premier-robot-educatif/).
- [Installer mBlock 5](/installer-mblock-5-sous-windows-10/) et repérer l’[interface mBlock 5](/premier-pas-avec-mblock-5/) (scène, lutins, appareil, zone de script).
- [Installer / activer les blocs mBot](/installer-les-blocs-du-mbot/) pour voir capteurs et matrice LED.
- Avoir déjà suivi ou en parallèle l’[activité sur le défilement d’un texte](/activite-mbot-faire-defiler-un-texte/) sur la matrice : vous réutiliserez la même idée pour afficher une **chaîne de caractères** qui défile.

## 2. Le capteur à ultrason : rappel utile

Le module **à ultrasons** mesure une **distance** en émettant une onde et en mesurant le temps de retour après réflexion sur un obstacle. Sur le mBot classique, il est en général **à l’avant** ; orientez le robot vers ce que vous voulez « voir ».

- **Plage usuelle** (documentation constructeur / blocs) : souvent **environ 3 cm à 400 cm** — trop près ou trop loin, la mesure devient **peu fiable** ou absente.
- **Usages** : évitement d’obstacles, suivi de mur, **détecteur d’intrusion**, jeu « stop » à une distance donnée, etc.

La vitesse du son intervient dans le calcul côté carte ; pour l’activité, l’essentiel est de savoir que la valeur fournie par le bloc est en **centimètres** (selon le bloc choisi — vérifiez l’unité affichée dans mBlock).

## 3. Première partie : distance sur l’écran (mode Live)

**Objectif** : une **variable** (par ex. `data` ou `distance`) prend en boucle la valeur du capteur ; vous la voyez **dans la zone du lutin** sur le PC.

1. Créez une **variable** et cochez l’affichage sur la scène si mBlock le propose (souvent une case à cocher sur la variable).
2. Branchez le mBot (USB ou Bluetooth selon votre contexte) et passez en mode **Live** — en français l’interface parlait parfois de mode « vivre » : c’est le mode **temps réel** où les blocs dialoguent avec le robot **sans** tout téléverser à chaque clic.
3. Dans une boucle **répéter indéfiniment** (ou équivalent), affectez à la variable la **lecture du capteur ultrason** (bloc du type « distance / capteur ultrason » dans la catégorie **mBot** ou **Capteurs**).
4. Un petit **attendre** (quelques dizaines de ms) évite de saturer la liaison et stabilise l’affichage.

Quand vous lancez le script, la variable se **met à jour** : vous lisez la distance en **cm** (tant que l’obstacle reste dans la plage valide).

<figure class="article-figure">
  <img src="/capture/capteur/mblock-capteur-ultrason-variable-lutin.png" alt="Capture mBlock : script en boucle qui lit le capteur ultrason du mBot et affecte la valeur à une variable affichée dans la zone du lutin." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Exemple de script : le capteur alimente une variable visible près du lutin — pratique pour vérifier que la mesure « vit » quand tu bouges une feuille devant le robot.</figcaption>
</figure>

Références d’époque (si besoin de comparer avec d’autres versions de mBlock) : [blocks-4.png](https://robot-educatif.info/wp-content/uploads/2020/04/blocks-4.png), [c1.png](https://robot-educatif.info/wp-content/uploads/2020/04/c1.png).

## 4. Deuxième partie : distance sur la matrice LED (autonome)

**Objectif** : le robot **seul** affiche la distance sur la **matrice LED** (souvent 5×8), idéalement avec un **défilement** si le nombre est trop long — comme dans l’article [faire défiler un texte](/activite-mbot-faire-defiler-un-texte/).

### 4.1 Le problème : nombre vs texte

Le bloc de **défilement de texte** attend en général une **chaîne** (**string**), par exemple `"42 cm"`.  
Le capteur renvoie un **nombre** (**nombre entier ou décimal**). Ce n’est pas le même « type » : en Scratch / mBlock, il faut **convertir** ou **assembler** du texte, comme pour des pièces d’encastrement de formes différentes.

Deux approches courantes :

### 4.2 Approche A — Bloc personnalisé (simple, mais à manier avec soin)

Vous pouvez **dupliquer** ou **adapter** le bloc / la procédure qui affiche le texte défilant pour qu’elle accepte **directement un nombre**, ou pour qu’elle fasse la conversion en interne.

- **Avantage** : tout reste en **blocs** pour les élèves.
- **Inconvénient** : si vous avez besoin **dans le même programme** d’un affichage **texte libre** et d’un affichage **distance**, vous vous retrouvez souvent avec **deux jeux de blocs** (duplication). Pour un atelier court, ça reste acceptable ; pour un projet qui grossit, préférez l’approche B ou une **fonction** bien nommée par usage (`defiler_distance`, `defiler_message`, etc.).

### 4.3 Approche B — Passage par le code Arduino / C (plus propre à terme)

mBlock peut **générer** du code à partir des blocs, puis vous permettre d’éditer la partie **Arduino C** (bouton ou onglet **Code** / symbole `</>` selon la version).

**Étapes typiques** :

1. Construire le programme **en blocs** (boucle, lecture capteur, appel au défilement — même si le typage bloque encore).
2. Ouvrir la vue **code** (icône `</>` ou menu équivalent), **tout sélectionner** et **copier**.
3. Passer sur l’onglet **Arduino** (ou équivalent), **coller** puis **adapter** l’appel à la fonction de défilement pour **concaténer** nombre et unité en **chaîne**.

Exemple d’idée (les noms exacts `defilement_texte_…` dépendent de la génération mBlock — **à ajuster** après copie) :

```cpp
defilement_texte_N_N(String(data) + String(" cm"), 1);
```

Ici, `data` est la variable qui contient la distance lue ; on forme une **chaîne** du type `"37 cm"` avant l’appel. L’image d’origine de l’article montrait l’emplacement de cette ligne dans le fichier généré : [c2.png](https://robot-educatif.info/wp-content/uploads/2020/04/c2.png).

**Sécurité** : manipuler le code C implique **re-téléverser** sur la carte et vérifier **câble / piles**. Faites une **copie** du projet `.mblock` avant de modifier le code généré.

## 5. Pistes d’extension

- **Filtrer** les valeurs aberrantes (0, trop grand) avant affichage.
- **Seuil** : afficher un symbole ou une couleur différente si la distance passe sous un certain cm.
- Enchaîner avec une activité **détecteur d’intrusion** ou **évitement** pour réutiliser la même lecture capteur.

## 6. Aller plus loin

Pour prolonger avec le **mBot**, la **robotique** et l’**algorithmique**, poursuivez avec les autres fiches du site : [activités mBot](/categorie/mbot/), [détecteur d’intrusion](/activite-mbot-detecteur-dintrusion/) (même famille de capteur), et les guides **mBlock** dans la colonne « À lire aussi ».
