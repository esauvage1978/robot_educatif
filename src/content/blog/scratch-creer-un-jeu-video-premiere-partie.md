---
title: "Scratch : développement d’un jeu vidéo, première partie"
description: "Cet article est le premier d’une série pour apprendre à créer un jeu vidéo sous scratch. Partie 1 : Déplacer le décor à l’aide des flèches du clavier"
pubDate: "2020-04-12"
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
updatedDate: "2020-04-13"
amazonPreset: scratch
categories:
  - "Scratch"
  - "Activité"
  - "Jeu vidéo"
  - "À partir de 10 ans"
---
Le but de cet série d’article est d’apprendre la programmation grâce au développement d’un jeu vidéo sous Scratch. Cet approche se veut ludique et facile grâce au bloc visuel de Scratch. En tout premier lieu, nous allons créer le décor. Puis nous allons le programmer pour le faire défiler à l’aide des flèches directionnelles du clavier. Au final, Nous allons réaliser un jeu de plateforme à la Mario Bross.

## 1\. pré requis

[Installer l’application mBlock 5](/installer-mblock-5-sous-windows-10/) ou scratch

S’être familiariser avec l’[interface graphique de mBlock 5](/premier-pas-avec-mblock-5/)

## 2\. Un peu de théorie

Dans l’article [activité facile avec scratch : le carré](/activite-scratch-le-carre/), nous avons écrit un programme pour déplacer notre lutin autour d’un carré. En fait, nous avons associé 1 programme à 1 objet lutin.

Ce qu’il faut savoir c’est qu’il est possible d’associer plusieurs programme à 1 ou plusieurs objets. Ces objets peuvent être des lutins ou des arrières plan.

Lorsque l’on sélectionne un de ces objets, la zone de script affichée correspond donc à cet objet.

De plus, les différents programmes fonctionnent en parallèles.

![plusieurs programme pour 1 lutin](https://robot-educatif.info/wp-content/uploads/2020/04/step14-1024x370.png)

Dans cette exemple, notre lutin a 3 programmes associés. Lorsque l’on appuie sur le drapeau vert, il avance de 10 pas et pense « Hummmm » simultanément. Lorsque l’on appuie sur la barre espace il se déplace aléatoirement.

## 3\. Place à la pratique

L’objet en question sera le décor. Donc il nous faut créer un jolie décor qui nous servira par la suite du jeu vidéo. Un fichier décor tout prêt était proposé à l’origine en téléchargement ; sans ce fichier, réalisez le vôtre en suivant les contraintes ci-dessous (voir aussi [Programmes mBlock](/programmes/)).

C’est maintenant à vous de jouer, Laisser faire votre imagination.

Cependant je vais vous imposer des contraintes, le dessus du sol devra avoir une seule couleur sur l’ensemble du parcours.

En toute logique c’est un **arrière plan** que l’on devrait utiliser mais nous allons plutôt choisir un **objet**. L’arrière plan n’a pas de catégorie **mouvement**.

Pour commencer, rendez-vous dans la section **Objets** et appuyer sur **ajouter**.

![Ajout d'un nouvel objet](https://robot-educatif.info/wp-content/uploads/2020/04/step1.png)

Ensuite appuyer sur le bouton **Peinture**

![Appuyer sur le bouton peinture](https://robot-educatif.info/wp-content/uploads/2020/04/step2-1024x718.png)

### 3.1 Création d’un bloc

Notre sol sera constitué de bloc que nous allons dupliquer. Pour ma part j’ai créé celui-ci

![Création du premier bloc](https://robot-educatif.info/wp-content/uploads/2020/04/step3.png)

Il est constitué de plusieurs éléments. Nous allons les fusionner afin d’avoir un bloc homogène. Pour se faire, appuyer sur le bouton **convertir en bitmap** et appuyer sur le bouton **Vectoriser**.

### 3.2 Création d’un grand bloc

La seconde étape est de faire des copier / coller de ce bloc pour commencer à créer un grand bloc constitué de 5 petits blocs.

Les touches de raccourci Windows pour le faire :

*   le copier **CTRL + C**
*   le coller **CTRL + V**
*   Tout sélectionner **CTRL + A**

Maintenant que vous avez 5 bloc, On va de nouveau les fusionner pour n’avoir qu’un bloc homogène.

![Ajout de 5 blocs pour créer un morceau](https://robot-educatif.info/wp-content/uploads/2020/04/step4.png)

![](https://robot-educatif.info/wp-content/uploads/2020/04/step5.png)

Sous le bloc vous avez les flèches de contrôle pour modifier l’inclinaison de celui-ci.

### 3.3 Décor plus large que l’écran

L’espace de travail n’a pas de scrollbar et créer un décor plus large que l’écran n’est pas intuitif.

La première étape consiste à avoir un bloc faisant à peu près toute la largeur. Il faut à ce moment là le sélectionner et le décaler sur le bord droit. Enfin ajouter un bloc. Comme vous pouvez le constater la largeur est maintenant passée à 841 pixels

*   ![](https://robot-educatif.info/wp-content/uploads/2020/04/step6.png)
    
*   ![](https://robot-educatif.info/wp-content/uploads/2020/04/step7.png)
    
*   ![](https://robot-educatif.info/wp-content/uploads/2020/04/step8.png)
    

### 3.4 Construction du décor

Vous allez maintenant pouvoir faire la même chose pour avoir un costume large d’au moins 7000 pixels.

![](https://robot-educatif.info/wp-content/uploads/2020/04/step9.png)

Pour ceux qui seraient tombés amoureux de mon décor, reproduisez-le à partir des captures (fichier projet **.mblock** non hébergé — [Programmes mBlock](/programmes/)).

## 4\. Le programme

nous allons faire défiler notre décor suivant l’axe des X. Lorsque vous allez appuyer sur la flèche directionnelle droite, votre décor devra se décaler vers la gauche et inversement.

Le pas de déplacement sera de 5.

Maintenant c’est à vous de coder !!!

Comme à l’habitude, je vais vous fournir une solution

### 4.1 Gestion des flèches

Ce programme ci-dessous permet de déplacer notre décor suivant les flèches appuyées

![](https://robot-educatif.info/wp-content/uploads/2020/04/step10.png)

*Pas de fichier .mblock — recopiez les blocs de la capture ci-dessus.*

### 4.2 Initialisation

Notons que ce programme fonctionne en l’état. Cela dit habituellement on ne démarre pas un jeu vidéo au milieu du parcours c’est pourquoi il nous manque l’initialisation qui va nous permettre de se positionner au début du décor.

Pour se faire, nous allons découvrir une nouvelle notion : **les variables**.

Les variables permettent de stocker des valeurs. Elles peuvent être partagé ou non entre les différents objets. Pour utiliser une variable, il faut la déclarer puis l’initialiser.

Nous allons donc déclarer 3 variables

*   decor\_largeur aura pour valeur la largeur de l’objet que nous avons créé
*   decor\_debut aura pour valeur la coordonnée X du début du décor. On la calculera par rapport à décor largeur.
*   et enfin decor\_fin qui aura pour valeur la coordonnée X de la fin du décor.

![](https://robot-educatif.info/wp-content/uploads/2020/04/step12.png)

*Pas de fichier .mblock — recopiez les blocs de la capture ci-dessus.*

### 4.3 Mettre des limites

En dernier lieu, nous allons mettre en place des limites au défilement de notre décor. Une fois une des bornes atteintes, il ne sera plus possible de poursuivre.

Pour cette partie je vous propose une solution avec une nouvelle notion : le **ET logique**.

Utilisé dans un structure conditionnelle SI, les instructions contenues ne seront effectuées uniquement si les 2 composantes du ET sont réalisées.

Ainsi, pour le déplacement par la droite la condition sera : Si la flèche de droite est pressée ET si la position de la valeur de X doit être supérieur à la valeur de la variable decor\_fin.

![](https://robot-educatif.info/wp-content/uploads/2020/04/step13.png)

*Pas de fichier .mblock — recopiez les blocs de la capture ci-dessus.*

Voilà notre premier partie concernant la programmation d’un jeu vidéo sous Scratch est maintenant terminée. Je vous invite fortement à vous exercer sur ce bout de code.

## 5\. Aller plus loin (Scratch, livres, robots)

Le site officiel [Scratch](https://scratch.mit.edu/) reste la référence pour télécharger l’appli, voir des exemples et la communauté.

Pour compléter ce tutoriel avec des **supports papier** ou des **robots compatibles Scratch**, vous pouvez parcourir ces recherches sur **Amazon.fr** (affiliation ; vérifiez fiche produit, avis et prix au moment de l’achat) :

- [Livres Scratch programmation enfants](https://www.amazon.fr/s?k=livre+Scratch+programmation+enfants&tag=manuso06-21)
- [Algorithmique et jeux pour débutants](https://www.amazon.fr/s?k=algorithmique+jeu+enfant+d%C3%A9butant+livre&tag=manuso06-21)
- [Robots éducatifs programmables Scratch](https://www.amazon.fr/s?k=robot+%C3%A9ducatif+Scratch+programmable&tag=manuso06-21)

*Commission possible pour le site via le programme Partenaires Amazon, sans surcoût pour vous.*

Sur ce site : [activité « le carré » avec Scratch](/activite-scratch-le-carre/), [installer mBlock 5](/installer-mblock-5-sous-windows-10/), [premiers pas mBot](/mon-premier-programme-mbot/).
