---
title: "Activité mBot : faire défiler un texte sur la matrice LED"
description: "Faire défiler un message sur la matrice LED du mBot dans mBlock : position X, boucle simple, double boucle pour répéter l’affichage, règle longueur × 5 + 15. Schémas de la logique du programme."
pubDate: "2020-04-20"
heroImage: "../../assets/mbot/mbot-hero.png"
updatedDate: "2026-04-01"
amazonPreset: mbot
categories:
  - "Activité"
  - "mBot"
  - "Makeblock"
  - "À partir de 8 ans"
relatedLinks:
  - title: "Premiers pas avec mBlock 5"
    href: "/premier-pas-avec-mblock-5/"
  - title: "Installer les blocs du mBot"
    href: "/installer-les-blocs-du-mbot/"
  - title: "Activité : mesurer des distances (réutilise le défilement)"
    href: "/activite-mbot-mesurer-des-distances/"
  - title: "Mon premier programme mBot"
    href: "/mon-premier-programme-mbot/"
  - title: "Cours Arduino C — types et variables (pour comprendre int/float/bool)"
    href: "/c-arduino-types-variables/"
---

Sur le **mBot**, la **matrice LED** (souvent **5 colonnes × 8 lignes**) permet d’afficher lettres et symboles. Pour donner l’illusion d’un **bandeau qui défile**, on ne “fait pas tourner les pixels” à la main : on **affiche le même texte** plusieurs fois par seconde, mais en changeant à chaque fois sa **position horizontale** (souvent notée **`X`** dans mBlock).

À la fin de cette activité, tu auras une **logique réutilisable** pour afficher n’importe quel message, plusieurs fois, dans d’autres projets.

---

## 1. Prérequis

- Un [robot mBot (Makeblock)](/mbot-mon-premier-robot-educatif/).
- [mBlock 5](/installer-mblock-5-sous-windows-10/) et une première [prise en main de l’interface](/premier-pas-avec-mblock-5/).
- Les [blocs du mBot](/installer-les-blocs-du-mbot/) (matrice LED, LED, etc.).
- Savoir **téléverser** un programme sur la carte : [mon premier programme mBot](/mon-premier-programme-mbot/).

Les **noms exacts** des blocs peuvent varier selon la **langue** et la **version** de mBlock ; l’**idée** (variable `X`, boucle, temporisation) reste la même.

---

## 2. Comprendre la matrice avant de coder

### 2.1 Une fenêtre mobile sur le message

Imagine le texte comme un **ruban** plus large que l’écran. La matrice ne montre qu’une **fenêtre** de quelques colonnes. En **déplaçant** le ruban vers la gauche (ou en décalant la position d’affichage), on fait **défiler** les lettres.

```text
     matrice (5 colonnes visibles)
          ┌─────┐
ruban  … H e l l o  w o r l d …  →  on fait glisser le ruban
          └─────┘
```

Pour bien voir ce qui se passe « en vrai », voici une photo/capture sur le robot avec un affichage simple :

![Photo : affichage d’un mot sur la matrice LED](/capture/activite-mbot-faire-defiler-un-texte/2.1/photo_affichage_hel.jpeg)

Et la capture du programme correspondant (activité 2.1) :

![Image représentant la première activité d'affichage du texte](/capture/activite-mbot-faire-defiler-un-texte/2.1/Image%20repr%C3%A9sentant%20la%20premi%C3%A8re%20activit%C3%A9%20d'affichage%20du%20texte.png)

Programme mBlock : [`afficher_1_mot.mblock`](/capture/activite-mbot-faire-defiler-un-texte/2.1/afficher_1_mot.mblock)

### 2.2 Le rôle de la variable `X`

Dans mBlock, un bloc du type **« afficher le texte à la position X »** (libellé approchant) place le **début** du texte à une abscisse `X` sur la matrice.

- Si tu veux faire le lien avec la programmation “texte” en **Arduino C**, `X` est une **variable** au sens classique : tu lui donnes un type (souvent `int`) et tu modifies sa valeur au fil des boucles. Voir : [Arduino C — types et variables](/c-arduino-types-variables/).

- **`X` grand** : le texte commence **à droite** ; une partie peut être **hors écran** (invisible).
- **`X` diminue** : le texte se décale vers la **gauche** → effet **défilant**.

Schéma logique **une seule image** à l’écran :

```text
position X (schématique)
  X petit     →  début du mot visible à gauche
  X moyen     →  mot centré ou partiellement visible
  X grand     →  mot poussé à droite / hors champ
```

Conclusion : **pour faire défiler, on doit faire varier `X`** (souvent en le diminuant petit à petit dans une boucle).

---

## 3. Première étape : affichage fixe (texte tronqué)

**But** : afficher **« Hello »** pour voir comment la matrice réagit.

Structure logique minimale :

```text
┌─────────────────────────────┐
│  Au démarrage du mBot       │
│    afficher texte "Hello"   │
│    (à une position X fixe)  │
└─────────────────────────────┘
```

Après **téléversement**, tu constates souvent que **seules les premières lettres** apparaissent (les suivantes sortent de la zone visible). C’est normal : la matrice est **étroite**.

- En poussant **`X`** (par ex. vers **10** ou **15**), tu peux **cacher** le début du mot ou le faire **entrer** depuis la droite.

Voici exactement le même mot, mais avec un décalage `X` différent (exemple `X = 10`) :

![Photo : affichage d’un seul caractère quand X vaut 10](/capture/activite-mbot-faire-defiler-un-texte/2.2/photo_affichage_h.jpeg)

Capture du programme (activité 2.2) :

![Image représentant la première activité d'affichage du texte quand X vaut 10](/capture/activite-mbot-faire-defiler-un-texte/2.2/Image%20repr%C3%A9sentant%20la%20premi%C3%A8re%20activit%C3%A9%20d'affichage%20du%20texte_x_vaut_10.png)

Programme mBlock : [`afficher_1_mot_x_vaut_10.mblock`](/capture/activite-mbot-faire-defiler-un-texte/2.2/afficher_1_mot_x_vaut_10.mblock)

**Idée à retenir** : l’affichage statique **prouve** le lien entre **`X`** et ce que l’œil voit. Le défilement sera **cette même opération**, répétée avec **`X` qui change**.

---

## 4. Deuxième étape : une boucle qui fait bouger `X`

**But** : **répéter** : afficher le texte à la position actuelle, **diminuer `X`**, attendre un peu — pour créer le mouvement.

### 4.1 Préparer le départ

- Créer une variable **`X`**.
- Au début, mettre **`X = 15`** (valeur typique pour commencer **hors champ à droite** et laisser le message **entrer**). Tu peux ajuster selon ton texte.

### 4.2 Boucle de défilement (une passe)

Structure logique :

```text
┌──────────────────────────────────────────┐
│  Au démarrage                             │
│    X ← 15                                 │
│    ┌────────────────────────────────────┐ │
│    │  Répéter indéfiniment *             │ │
│    │    afficher texte à la position X  │ │
│    │    X ← X − 1                        │ │
│    │    attendre 0,1 s                   │ │
│    └────────────────────────────────────┘ │
└──────────────────────────────────────────┘

* Ou « pour toujours » selon les blocs disponibles
```

Flux détaillé (une itération) :

```text
   ┌──────────────┐
   │  Afficher    │
   │  texte à X   │
   └──────┬───────┘
          │
          ▼
   ┌──────────────┐
   │  X ← X − 1   │
   └──────┬───────┘
          │
          ▼
   ┌──────────────┐
   │  Attendre    │
   │  0,1 s       │
   └──────┬───────┘
          │
          └──────► (retour au début de la boucle)
```

La **temporisation** (souvent **0,1 s**) est indispensable : sans elle, le défilement serait trop rapide pour lire.

Capture locale (point 4) :

![Défilement : boucle qui diminue X](/capture/activite-mbot-faire-defiler-un-texte/4/D%C3%A9filement%20%20boucle%20qui%20diminue%20X.png)

Programme mBlock : [`boucle.mblock`](/capture/activite-mbot-faire-defiler-un-texte/4/boucle.mblock)

### 4.3 Limite de cette version

- Le programme peut **continuer indéfiniment** alors que le texte est déjà **parti** de l’écran.
- Tu veux souvent **enchaîner** une **nouvelle passe** (ou **plusieurs répétitions** du message) proprement.

→ D’où la **troisième étape** : **bornner** la boucle intérieure et **envelopper** tout ça dans une boucle de **répétitions**.

---

## 5. Troisième étape : plusieurs passes (double boucle)

**But** : faire défiler le **même message plusieurs fois**, avec une fin claire pour chaque passe.

### 5.1 Deux niveaux de boucles

Structure logique **vue d’ensemble** :

```text
┌─────────────────────────────────────────────────────┐
│  Au démarrage                                        │
│    ┌──────────────────────────────────────────────┐ │
│    │  Pour chaque affichage du message (ex. 3×)      │ │  ← boucle EXTÉRIEURE
│    │    X ← 15                                      │ │
│    │    ┌────────────────────────────────────────┐ │ │
│    │    │  Pour un nombre fixe d’étapes             │ │ │  ← boucle INTÉRIEURE
│    │    │    afficher texte à X                     │ │ │
│    │    │    X ← X − 1                              │ │ │
│    │    │    attendre 0,1 s                         │ │ │
│    │    └────────────────────────────────────────┘ │ │
│    └──────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

Schéma **imbriqué** (représentation « boîtes ») :

```text
 +-- répéter N fois (message entier) ----------------+
 |                                                   |
 |   X ← 15                                          |
 |   +-- répéter (longueur × 5 + 15) fois --------+  |
 |   |      afficher ; X←X-1 ; attendre           |  |
 |   +---------------------------------------------+  |
 +---------------------------------------------------+
```

### 5.2 Combien d’étapes pour la boucle intérieure ?

Pour que l’enchaînement entre deux passes ne soit ni trop long ni trop court, on utilise souvent une règle du type :

```text
nombre_d_etapes ≈ longueur_du_texte × 5 + 15
```

- **`longueur_du_texte`** : nombre de caractères du message (dans un premier temps, **sans compter les accents** si ton affichage les ignore — voir § 7).
- **× 5** : en pratique, chaque caractère “large” sur la matrice correspond à **environ 5 colonnes** de largeur dans la police utilisée par mBlock pour cette matrice — c’est une **approximation** utile pour un atelier, pas une loi physique.
- **`+ 15`** : marge pour **sortir** le texte **complètement** à gauche après l’avoir fait entrer depuis la droite (la même marge que tu utilisais déjà avec **`X` initial**).

Tu peux stocker **`longueur_du_texte`** dans une variable pour rendre le programme **lisible**.

Capture locale (étape 5.2) :

![Trois répétitions du défilement (double boucle)](/capture/activite-mbot-faire-defiler-un-texte/5.2/Trois%20r%C3%A9p%C3%A9titions%20du%20d%C3%A9filement%20(double%20boucle).png)

Programme mBlock : [`defiler52.mblock`](/capture/activite-mbot-faire-defiler-un-texte/5.2/defiler52.mblock)

### 5.2 bis DRY : ne pas écrire 2 fois la même info

Dans cet exemple, j’ai fait exprès de **ne pas écrire deux fois** le texte à afficher (une fois pour calculer la longueur, puis une fois pour l’afficher).

C’est une bonne habitude de programmation appelée **DRY** (*Don’t Repeat Yourself*), qu’on peut traduire par :

- **ne répète pas** la même information à plusieurs endroits ;
- sinon, le jour où tu changes le message, tu risques d’en oublier un et d’avoir un programme **incohérent**.

Ici, l’idée DRY est : **une seule source** pour le message (une variable), puis on réutilise cette variable :

- pour calculer `longueur_texte`
- pour afficher le message.

### 5.2 ter Bug mBlock : variable en `float` mais message en texte

Par défaut, le code généré par mBlock déclare souvent les variables en `float`. C’est OK pour des nombres (position `X`, compteur, etc.), mais **pas** pour une chaîne comme `"Mon nouveau message"`.

Si tu fais :

```cpp
texte = "Mon nouveau message";
```

alors que `texte` est déclaré en `float`, le téléversement peut échouer (capture ci-dessous) :

![Erreur de téléversement : variable float utilisée comme texte](/capture/activite-mbot-faire-defiler-un-texte/5.2/erreur_televersement.png)

Voici un exemple de code qui provoque l’erreur (à afficher dans l’article) :

```cpp
// generated by mBlock5 for mBot
// codes make you happy

#include <MeMCore.h>
#include <Arduino.h>
#include <Wire.h>
#include <SoftwareSerial.h>

MeLEDMatrix ledMtx_1(1);

float x = 0;
float texte = 0;
float longueur_texte = 0;
float nombre_de_repetition = 0;
float i = 0;
float j = 0;
float taille_ecran = 0;

void _delay(float seconds) {
  long endTime = millis() + seconds * 1000;
  while(millis() < endTime) _loop();
}

void setup() {
  ledMtx_1.setColorIndex(1);
  ledMtx_1.setBrightness(6);
  texte = "Mon nouveau message";
  longueur_texte = String(texte).length();
  taille_ecran = 15;
  nombre_de_repetition = 3;
  for(int i=0;i<(int)ceil(nombre_de_repetition);i+=1){
    x = taille_ecran;
    for(int count=0;count<int((longueur_texte * 5 + taille_ecran));count++){

      ledMtx_1.drawStr(x, 0 + 7, String(texte).c_str());
      x += -1;
      _delay(0.1);
    }

  }

}

void _loop() {
}

void loop() {
  _loop();
}
```

### 5.2 quater Correction : changer le type de `texte`

Le correctif consiste à déclarer `texte` comme **chaîne**.

#### Étapes dans mBlock (important)

1. Aller dans `</>` → **Aperçu Arduino C** (lecture seule).
2. **Copier** le code.
3. Aller dans l’onglet **Arduino C** (celui-ci est fait pour être édité).
4. **Coller** le code puis remplacer la déclaration de `texte`.

Version corrigée :

```cpp
// generated by mBlock5 for mBot
// codes make you happy

#include <MeMCore.h>
#include <Arduino.h>
#include <Wire.h>
#include <SoftwareSerial.h>

MeLEDMatrix ledMtx_1(1);

float x = 0;
const char* texte = "";
float longueur_texte = 0;
float nombre_de_repetition = 0;
float i = 0;
float j = 0;
float taille_ecran = 0;

void _delay(float seconds) {
  long endTime = millis() + seconds * 1000;
  while(millis() < endTime) _loop();
}

void setup() {
  ledMtx_1.setColorIndex(1);
  ledMtx_1.setBrightness(6);
  texte = "Mon nouveau message";
  longueur_texte = String(texte).length();
  taille_ecran = 15;
  nombre_de_repetition = 3;
  for(int i=0;i<(int)ceil(nombre_de_repetition);i+=1){
    x = taille_ecran;
    for(int count=0;count<int((longueur_texte * 5 + taille_ecran));count++){

      ledMtx_1.drawStr(x, 0 + 7, String(texte).c_str());
      x += -1;
      _delay(0.1);
    }

  }

}

void _loop() {
}

void loop() {
  _loop();
}
```

> Note : pour un mBot/mCore, `const char*` est souvent plus “léger” que `String` comme variable globale. Ici on utilise `String(texte)` uniquement pour obtenir la longueur et pour fournir un `c_str()` à l’affichage.

---

## 6. Piège fréquent : accents et caractères spéciaux

Les caractères **accentués** sont souvent **mal supportés** ou **invisibles** selon la version / le mode d’affichage. Pour un atelier :

- teste d’abord avec **`SALUT`**, **`HELLO`**, **`MBOT`** ;
- si tu dois afficher du français, prévois **sans accents** ou une **abréviation**, le temps de valider sur ta version de mBlock.

---

## 7. Récapitulatif : chaîne pédagogique

```text
affichage fixe (comprendre X et la troncature)
        │
        ▼
une boucle : X diminue → défilement continu
        │
        ▼
deux boucles : N passes propres + étapes ≈ longueur×5+15
        │
        ▼
tu sais faire défiler un message et le répéter proprement
```

Tu peux maintenant utiliser ce “moteur de défilement” dans tes projets (afficher un score, une consigne, une distance…), en copiant la logique quand tu en as besoin.

---

## 8. Pour aller plus loin

- Enchaîner avec [mesurer des distances](/activite-mbot-mesurer-des-distances/) pour afficher une valeur dynamique.
- Varier la **vitesse** (`attendre 0,05` vs `0,2`) et observer la **lisibilité**.
- Discuter en classe : **combien de colonnes** par caractère si on mesure sur une capture d’écran ? (lien avec **pixel** et **typographie**).
