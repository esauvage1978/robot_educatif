---
title: "Activité mBot : Détecteur d’intrusion"
description: "Cette activité permet de réaliser un détecteur d’intrusion avec un compteur des intrus. Utilisation du capteur à ultrason , des LED, du capteur sonore et de la matrice LED du mBot. 1. pré requis Avoir en sa possession le robot éducatif mBot de chez MakeBlock Installer l’application mBlock 5 S’être familiariser avec l’interface graphique de […]"
pubDate: "2020-04-28"
heroImage: "../../assets/mbot/mbot-hero.png"
updatedDate: "2020-04-29"
categories:
  - "Activité"
  - "mBot"
  - "Makeblock"
  - "À partir de 8 ans"
---
Cette activité permet de réaliser un détecteur d’intrusion avec un compteur des intrus. Utilisation du capteur à ultrason , des LED, du capteur sonore et de la matrice LED du mBot.

[Prev](#) 1 of 1 [Next](#)

*   [
    
    ![intrusion final](https://i.ytimg.com/vi/7y2WVvbFuQY/sddefault.jpg)
    
    ### intrusion final
    
    ](#7y2WVvbFuQY "intrusion final")

[Prev](#) 1 of 1 [Next](#)

## 1\. pré requis

Avoir en sa possession le [robot éducatif mBot de chez MakeBlock](/mbot-mon-premier-robot-educatif/)

[Installer l’application mBlock 5](/installer-mblock-5-sous-windows-10/)

S’être familiariser avec l’[interface graphique de mBlock 5](/premier-pas-avec-mblock-5/)

Avoir installé les [blocs d’instruction du mBot](/installer-les-blocs-du-mbot/)

## 2\. Capteur à ultrason

Le capteur à ultrason permet de calculer des distances. Il est composé de deux composants : 1 émetteur et 1 récepteur. Le son est envoyé par l’émetteur, lorsque celui ci atteint un obstacle, il rebondit et est capté par le récepteur. La vitesse du son est de 340 m/s. L’obtention de l’information est très rapide.

Ce capteur peut servir à calculer les distances mais également à faire de l’évitement d’obstacle, des détecteurs d’intrusion…

Il fonctionne dans pour des valeurs comprises entre 3 cm et 400 cm.

## 3\. Programme de détection d’intrusion

### 3.1 Programme de base

Ce programme est la première étape à la réalisation du détecteur. Nous allons utiliser le capteur à ultrason pour détecter les intrusions.

Le principe du programme est assez simple. Lors de la mise en route du mBot, il va mesurer la distance avec le premier obstacle et stocker la valeur dans une variable. Si la valeur de la mesure change, c’est qu’il y a eu une intrusion. Cette intrusion sera matérialisée par les LED en rouge, l’affichage des yeux en « colère » et l’émission d’un son pendant 0.25 pulsation.

![Image représentant le robot mBot en attente de détection](https://robot-educatif.info/wp-content/uploads/2020/04/int1-1-1024x871.png)

![Image représentant le robot mBot détectant une intrusion](https://robot-educatif.info/wp-content/uploads/2020/04/int2.png)

![Image représentant le programme de détection basique](https://robot-educatif.info/wp-content/uploads/2020/04/int3-1.png)

la temporisation de 3 secondes au départ permet juste de vous laisser le temps d’allumer le mBot et de le placer à l’endroit désiré.

2 variables sont utilisées. La première sert à stocker la valeur de référence de la zone à contrôler. La seconde permet de stocker la valeur si intrusion.

### 3.1 bis Rédaction du programme (mBlock 5)

Voici une **rédaction en français** du programme, au format des blocs **mBlock** (équivalent Scratch pour mBot). À recopier dans l’éditeur en choisissant les blocs correspondants dans la catégorie **Robots** / **mBot** et **Capteurs**.

**Variables à créer** (onglet *Variables* → *Créer une variable*) :

| Nom (exemple) | Rôle |
|---------------|------|
| `reference` | Distance de référence (cm) mesurée au démarrage, après la pause de 3 s. |
| `mesure` | Distance courante lue en boucle. |
| `intrusions` | Compteur d’intrusions (à partir de la version « avec compteur »). |

**Programme de base** (section 3.1 — détection simple) :

1. **Quand le drapeau vert est cliqué**
2. **Attendre** `3` **secondes** (temps pour allumer le mBot et le placer).
3. **Mettre** `reference` **à** `distance ultrason en cm` (bloc capteur ultrason du mBot).
4. **Répéter indéfiniment** :
   - **Mettre** `mesure` **à** `distance ultrason en cm`.
   - **Si** `mesure` ≠ `reference` **alors** :
     - **Mettre la couleur des LED** sur **rouge** (ou toutes les LED en rouge selon les blocs disponibles).
     - **Afficher sur la matrice LED** une figure du type **yeux en colère** / visage agressif (bloc *matrice LED* / *face*).
     - **Jouer une note** (par ex. *do* ou un bip court) **pendant** `0,25` **pulsations** (bloc *son* / *buzzer*).
   - **Sinon** (pas d’intrusion) :
     - **Mettre la couleur des LED** sur **vert** (état « veille »).
     - **Afficher** un visage **neutre** ou **content** sur la matrice.

*Astuce :* en pratique, le capteur peut varier d’un ou deux centimètres sans qu’il y ait d’intrusion. Vous pouvez remplacer le test `≠` par : *si la valeur absolue de* `(mesure - reference)` *est supérieure à un seuil* (par ex. `3` cm), *alors*… (blocs *Opérateurs* pour la soustraction et la valeur absolue si disponibles).

**Version avec compteur** (section 3.2) :

- Au début (après le drapeau), **mettre** `intrusions` **à** `0`.
- Dans la branche **si intrusion** (quand `mesure` ≠ `reference` ou seuil dépassé), **ajouter** `1` **à** `intrusions`.
- **Afficher** la valeur de `intrusions` sur la **matrice LED** (nombre entier) ; vous pouvez faire clignoter ou changer la couleur des LED (par ex. rouge si intrusion, autre couleur en veille) comme sur vos captures.

**Refactorisation** (section 3.3) — blocs **Mes blocs** / **Fonctions** :

- Créer par exemple une fonction **« état veille »** : LED vertes + visage calme sur la matrice.
- Créer **« signaler intrusion »** : LED rouges + yeux en colère + son 0,25 pulsation + incrément du compteur + affichage du nombre sur la matrice.
- Le programme principal ne fait plus qu’appeler ces fonctions dans la boucle **répéter indéfiniment**, ce qui allège la lecture.

**Optimisation Arduino** (section 3.4) : après passage en **Arduino C**, si le nombre d’intrusions s’affiche en **décimal** sur la matrice, passez la variable concernée en type **`int`** plutôt que **`float`** dans le code généré, comme indiqué dans la procédure pas à pas (onglet *<>* puis *Arduino C*).

## 3.2 Ajout de fonctionnalité

Ce programme fonctionne mais comment savoir si une détection a eu lieu ?

Pour répondre à cette question, nous allons modifier le programme en stockant le nombre d’intrusion et en affichant une couleur différente si une intrusion a eu lieu.

![](https://robot-educatif.info/wp-content/uploads/2020/04/blocks-5-838x1024.png)

### 3.3 Refactorisation

Ce programme commence a être long et à devenir un peu illisible.

Nous allons utiliser les blocs pour réduire le programme principal et gagner en visibilité.

![](https://robot-educatif.info/wp-content/uploads/2020/04/int4.png)

## 3.4 Optimisation d’affichage

Le dernier détail est visuel. Lors d’une intrusion, le programme affiche le nombre d’intrusion sur la matrice LED mais en format décimal et ça n’est ni esthétique ni pertinent.

Nous allons donc procéder à une petite modification du code source pour modifier ce point.

1.  Cliquer sur le symbole </>
2.  Copier le code source affiché (CTRL + A puis CTRL + C)
3.  Appuyer sur l’onglet Arduino C
4.  Coller le code
5.  Le modifier le type de la variable intrusion de float à int

### 3.5 Programme mBlock

Le fichier projet **detection_intrusion.mblock** d’origine n’a pas été conservé ; la **rédaction détaillée des blocs** figure en [§ 3.1 bis](#31-bis-rédaction-du-programme-mblock-5) ci-dessus. Complétez-la en vous aidant des **captures d’écran** des sections 3.1 à 3.3. Voir aussi la page [Programmes mBlock](/programmes/).

## 4\. Apprendre le développement

Je vous ai sélectionné une série de livre pour vous former avec le mBot et l’algorithme
