---
title: "Activité mBot : Détecteur d’intrusion"
description: "Créer un détecteur d’intrusion avec le mBot : le capteur à ultrason surveille une zone, le robot alerte (LED + visage + son) et compte le nombre d’intrusions. Activité pas à pas, accessible aux plus jeunes."
pubDate: "2020-04-28"
heroImage: "../../assets/mbot/mbot-hero.png"
updatedDate: "2026-03-31"
categories:
  - "Activité"
  - "mBot"
  - "Makeblock"
  - "À partir de 8 ans"
---
Tu vas transformer ton **mBot** en petit “gardien” :

- Il **surveille** ce qu’il y a devant lui (avec le **capteur à ultrason**).
- Si quelque chose bouge et “entre” dans la zone, il déclenche une **alerte** :
  - LED **rouges**
  - visage “pas content” sur la **matrice LED**
  - un **bip**
- Et dans la version améliorée, il **compte** le nombre d’intrusions.

## 1\. pré requis

Avant de commencer, assure-toi d’avoir :

- Un [robot éducatif mBot (Makeblock)](/mbot-mon-premier-robot-educatif/).
- [mBlock 5 installé](/installer-mblock-5-sous-windows-10/).
- Une première prise en main de l’[interface mBlock 5](/premier-pas-avec-mblock-5/) (où sont les blocs, la zone de script, l’onglet Appareil).
- Les [blocs d’instruction du mBot](/installer-les-blocs-du-mbot/) (les blocs **orange**).

**Conseil** : pour éviter les soucis de connexion, commence si possible en **USB** (le Bluetooth marche, mais peut être plus capricieux).

## 2\. Capteur à ultrason

Le **capteur à ultrason** sert à mesurer une **distance**.

### Comment ça marche (version simple)

Le capteur fait comme une chauve-souris :

- Il **envoie** un petit “ping” (un ultrason, inaudible).
- Il **écoute** l’écho qui revient après avoir rebondi sur un obstacle.
- Il calcule la distance avec le **temps** entre “ping” et “écho”.

```text
mBot (capteur)                          obstacle
  ping  ───────────────────────────────►
        ◄──────────────────────────────  écho
```

### Un peu de physique : pourquoi le son permet de mesurer une distance ?

Le son voyage dans l’air à une vitesse finie : en pratique on retient souvent **environ 340 m/s** (en réalité plutôt **~343 m/s à 20 °C** ; la valeur exacte dépend un peu de la **température** et de l’**humidité**).

À l’échelle de l’Univers, 340 m/s, c’est **énorme** pour un être humain (comme un avion de ligne). À l’échelle d’un **petit robot** à quelques dizaines de centimètres d’un obstacle, c’est au contraire **assez lent** — et heureusement :

- la **lumière** va presque **300 000 km par seconde** : pour mesurer une distance “salon / classe”, un capteur lumineux (laser, infrarouge très rapide) verrait un délai quasi nul ;
- l’**onde sonore**, elle, met un **temps mesurable** à faire l’**aller-retour**. C’est ce délai (quelques **microsecondes** ou millisecondes) que la carte du capteur mesure avec un chronomètre électronique.

**Formule (aller-retour).** Si `t` est le temps entre l’émission du ping et le retour de l’écho, alors la distance `d` jusqu’à l’obstacle est :

`d = (v_son × t) / 2`

Le **÷2** vient du fait que `t` compte le **trajet aller + retour** : l’onde parcourt **deux fois** la distance `d`.

**Exemple d’ordre de grandeur.** Pour un obstacle à **34 cm** (0,34 m), l’aller-retour représente **0,68 m** ; avec `v_son ≈ 340 m/s`, le délai est de l’ordre de `0,68 / 340 ≈ 0,002 s`, soit **2 ms**. C’est court pour nous, mais c’est **largement suffisant** pour une puce électronique — d’où la précision “à quelques centimètres” des capteurs ultrason courants.

### Pratico-pratique (pour des mesures stables)

- Le capteur marche bien en général entre **~3 cm et ~400 cm**.
- Pour tester, utilise un obstacle **plat** (livre, boîte), bien en face.
- Si l’obstacle est **mou** (rideau) ou **incliné**, la mesure peut “sauter”.

Dans cette activité, on ne cherche pas une mesure parfaite au millimètre : on veut surtout détecter un **changement** (quelque chose est apparu / a bougé).

## 3\. Programme de détection d’intrusion

### 3.1 Programme de base

**But** : le robot mémorise une distance “de référence” au départ, puis compare en boucle.  
Si ça change beaucoup, il crie “intrusion !”.

#### L’idée

1. Tu poses le mBot pour qu’il regarde la zone à surveiller.
2. Il attend 3 secondes (le temps de le poser).
3. Il mesure une première distance : c’est la **référence**.
4. Ensuite, il mesure en boucle :
   - si c’est presque pareil → il reste calme
   - si c’est très différent → il déclenche l’alerte

### Illustrations (captures)

![Image représentant le robot mBot en attente de détection](/capture/activite-mbot-detecteur-dintrusion/Image%20repr%C3%A9sentant%20le%20robot%20mBot%20en%20attente%20de%20d%C3%A9tection.png)

![Image représentant le robot mBot détectant une intrusion](/capture/activite-mbot-detecteur-dintrusion/Image%20repr%C3%A9sentant%20le%20robot%20mBot%20d%C3%A9tectant%20une%20intrusion.png)

![Image représentant le programme de détection basique](/capture/activite-mbot-detecteur-dintrusion/Image%20repr%C3%A9sentant%20le%20programme%20de%20d%C3%A9tection%20basique.png)

#### Pourquoi on attend 3 secondes au début ?

Pour te laisser le temps de :

- allumer le robot,
- le poser bien face à la zone,
- ne pas bouger tes mains devant le capteur pendant qu’il prend la référence.

#### Les variables (mots simples)

- `reference` : la distance “normale” au début.
- `mesure` : la distance mesurée maintenant.

### 3.1 bis Rédaction du programme (mBlock 5) — version très guidée

**À créer dans Variables** :

| Variable | À quoi elle sert |
|---|---|
| `reference` | Distance de départ (cm) |
| `mesure` | Distance actuelle (cm) |
| `intrusions` | Compteur (pour la version 3.2) |

**Programme de base (détection simple)** :

1. **Quand le drapeau vert est cliqué** *(ou “lorsque le mBot démarre” si tu téléverses)*  
2. **Attendre 3 secondes**  
3. **Mettre `reference` à** la `distance ultrason (cm)`  
4. **Pour toujours** :
   - mettre `mesure` à la `distance ultrason (cm)`
   - **si** `mesure` est très différente de `reference` **alors** :
     - LED **rouges**
     - visage “en colère”
     - jouer une note (bip) **0,25 pulsation**
   - **sinon** :
     - LED **vertes**
     - visage “calme”

#### L’astuce qui change tout (très important)

Le capteur peut varier un peu même si personne ne passe.  
Donc au lieu de “≠”, utilise un **seuil**, par exemple **3 cm** :

```text
si |mesure - reference| > 3 alors intrusion
```

Comme ça, un petit “tremblement” de mesure ne déclenche pas l’alarme.

> Si tu n’as pas le bloc “valeur absolue”, tu peux faire un test plus simple :  
> “intrusion si `mesure > reference + 3` OU `mesure < reference - 3`”.

## 3.2 Ajout de fonctionnalité

Le programme de base marche, mais il manque une chose :  
**combien de fois** quelqu’un est passé ?

On va donc :

- créer (ou utiliser) la variable `intrusions`,
- l’incrémenter à chaque intrusion,
- afficher le nombre sur la matrice LED (ou le faire défiler).

![Image représentant le programme de détection avec compteur intrusion](/capture/activite-mbot-detecteur-dintrusion/Image%20repr%C3%A9sentant%20le%20programme%20de%20d%C3%A9tection%20avec%20compteur%20intrusion.png)

#### À ajouter dans les blocs (version simple)

- Au début : **mettre `intrusions` à 0**
- Dans la branche “intrusion” :
  - **ajouter 1 à `intrusions`**
  - afficher `intrusions` sur la matrice LED

> Astuce : pour éviter de compter 20 fois la même intrusion (quand quelqu’un reste devant), ajoute un `attendre 1 seconde` après l’alerte.

### 3.3 Refactorisation

Quand le script grandit, il devient difficile à lire.

On va donc ranger les actions dans des “petites fonctions” (dans mBlock : **Mes blocs**).

**But** : que le programme principal reste court et clair.

![Image représentant le programme de détection avec compteur intrusion sous-programme](/capture/activite-mbot-detecteur-dintrusion/Image%20repr%C3%A9sentant%20le%20programme%20de%20d%C3%A9tection%20avec%20compteur%20intrusion%20sous%20programme.png)

#### Idée de découpage (très simple)

- **Bloc personnalisé “État veille”** :
  - LED vertes
  - visage calme
  - *(option pédagogique)* un paramètre `nbr_intrusion` pour afficher le compteur même en veille — voir l’encadré ci-dessous
- **Bloc personnalisé “Alerte intrusion”** :
  - LED rouges
  - visage en colère
  - bip
  - `intrusions = intrusions + 1`
  - afficher le compteur

Ensuite, dans la boucle, tu fais juste :

- si intrusion → appeler **Alerte intrusion**
- sinon → appeler **État veille**

#### Pourquoi j’ai ajouté `nbr_intrusion` au bloc “État veille” ? (pédagogie)

Pour l’enseignement, j’ai volontairement donné au bloc personnalisé **« État veille »** un **paramètre** du type `nbr_intrusion`, même si **ce n’était pas strictement nécessaire**.

Dans mBlock / Scratch, la variable `intrusions` est en général une variable **globale** : une fois créée dans l’onglet *Variables*, **tout le programme** (y compris l’intérieur d’un bloc personnalisé) peut la **lire** et la **modifier** sans qu’on ait besoin de la « passer en argument ».

**C’est quoi la *portée* d’une variable ?**

En informatique, la **portée** (ou *scope* en anglais), c’est **l’endroit du programme où une variable existe et est visible**.

- **Variable globale** : connue **partout** dans le projet (le script principal, les blocs personnalisés, etc.). C’est souvent le cas de `intrusions` quand tu l’as créée comme variable de scène.
- **Variable locale** : visible **seulement** dans un petit morceau de code (par exemple **à l’intérieur** d’une fonction, ou un paramètre qui n’existe que pour ce bloc). Quand la fonction se termine, cette variable « disparaît » souvent du point de vue du programme.

Donc, pour **État veille**, on *pourrait* tout à fait utiliser directement `intrusions` à l’intérieur du bloc : le compteur serait quand même le bon, grâce à la portée **globale**.

**Alors pourquoi ajouter `nbr_intrusion` quand même ?**

- Pour montrer aux élèves l’idée de **fonction qui reçoit une information** (comme en maths : \(f(x)\)), même si ici l’information est déjà disponible ailleurs.
- Pour préparer des langages où on évite de trop compter sur des variables globales : on **passe explicitement** les valeurs dont le bloc a besoin, ce qui rend le programme plus lisible.

Quand mBlock **génère** le programme en **C** (Arduino), on voit souvent ça sous forme de **fonctions** avec des **paramètres**. La capture ci-dessous illustre cette idée de portée et la façon dont le bloc personnalisé reçoit `nbr_intrusion` :

![Extrait de code C : portée de la variable intrusions et paramètre nbr_intrusion du bloc État veille](/capture/activite-mbot-detecteur-dintrusion/code_c_port%C3%A9e_variable.png)

## 3.4 Optimisation d’affichage

Dernier petit détail : parfois, le compteur s’affiche avec des **virgules** (ex. `3.00`).  
Pour un compteur d’intrusions, on veut un **nombre entier** : `1`, `2`, `3`…

### Option 1 (recommandée pour les plus jeunes) : garder ça en blocs

Dans beaucoup de versions de mBlock, si tu utilises “ajouter 1 à `intrusions`” et que tu l’affiches tel quel, ça s’affiche déjà bien.

### Option 2 (avancée) : passage par le code Arduino (si besoin)

Si, chez toi, ça affiche en décimal, tu peux corriger côté code.

1.  Cliquer sur le symbole </>
2.  Copier le code source affiché (CTRL + A puis CTRL + C)
3.  Appuyer sur l’onglet Arduino C
4.  Coller le code
5.  Modifier le type de la variable `intrusions` de `float` à `int`

> À faire avec un adulte / un prof si tu es jeune : on touche au code “texte”.

### 3.5 Programme mBlock

Tu peux télécharger les programmes mBlock de l’activité :

- Programme de base : [`programme_detection_basique.mblock`](/capture/activite-mbot-detecteur-dintrusion/programme_detection_basique.mblock)
- Version compteur : [`programme_detection_compteur intrusion.mblock`](/capture/activite-mbot-detecteur-dintrusion/programme_detection_compteur%20intrusion.mblock)
- Version “sous-programmes” : [`programme_detection_compteur_intrusion_sous_programme.mblock`](/capture/activite-mbot-detecteur-dintrusion/programme_detection_compteur_intrusion_sous_programme.mblock)

Si tu préfères le reconstruire à la main, tu peux aussi suivre :

- la section **3.1 bis** (programme de base),
- puis les ajouts des sections **3.2** et **3.3**,
- en t’aidant des captures.

Voir aussi : [Programmes mBlock](/programmes/).

## 4\. Apprendre le développement

Si tu veux progresser, voici une progression “facile” :

- refaire cette activité en changeant un seul paramètre (seuil 3 cm → 5 cm),
- ajouter une LED “orange” quand l’obstacle est “entre deux”,
- puis passer à d’autres activités mBot du site (capteurs, moteurs, petits défis).

Et si tu veux aller plus loin en programmation, Scratch/mBlock sont une très bonne porte d’entrée : le plus important, c’est de comprendre **variables + conditions + boucles**.
