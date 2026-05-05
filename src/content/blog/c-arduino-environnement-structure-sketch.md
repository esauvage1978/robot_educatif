---
title: "Environnement Arduino et structure d’un sketch : guide complet pour débutants"
headline: "Environnement Arduino et structure d’un sketch : guide complet pour débutants"
description: "Comprendre l’environnement Arduino, le rôle d’un sketch Arduino, la structure setup() / loop(), la compilation, le téléversement et les premières erreurs à éviter."
pubDate: 2026-04-02
updatedDate: 2026-05-03
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: "Arduino C"
seriesOrder: 1
tags: ["C", "Arduino", "Robotique", "Programmation", "Débutant"]
relatedLinks:
  - title: "Guide complet — apprendre Arduino C/C++"
    href: "/programmation/arduino-c/"
  - title: "Leçon 2 — types et variables"
    href: "/c-arduino-types-variables/"
  - title: "Leçon 3 — conditions pour capteurs"
    href: "/c-arduino-conditions-capteurs-actionneurs/"
  - title: "Projet capteur ultrason mBot"
    href: "/serie-capteur-ultrason-mbot-1-mesurer-distance/"
categories:
  - "C"
  - "Arduino"
  - "Programmation"
  - "Débutant"
faqSchema:
  - question: "Qu’est-ce qu’un sketch Arduino ?"
    answer: "Un sketch Arduino est le programme que l’on écrit dans l’IDE Arduino avant de l’envoyer sur la carte. Il contient presque toujours setup(), exécuté une fois au démarrage, et loop(), répétée en continu."
  - question: "Comment fonctionne loop() sur Arduino ?"
    answer: "loop() est appelée encore et encore tant que la carte Arduino est alimentée. C’est là que l’on place la logique répétée : lire un capteur, tester une condition, commander une LED, un moteur ou un buzzer."
  - question: "Quelle différence entre Arduino et C ?"
    answer: "Arduino utilise un langage dérivé du C/C++. La syntaxe ressemble au C/C++, mais l’environnement Arduino ajoute des fonctions pratiques comme pinMode(), digitalWrite(), analogRead() et Serial.begin()."
  - question: "Quel logiciel utiliser pour programmer Arduino ?"
    answer: "Le logiciel le plus simple pour débuter est Arduino IDE. Il permet d’écrire le code, de compiler le sketch, de choisir la carte et le port, puis de téléverser le programme sur l’Arduino."
  - question: "Arduino est-il adapté aux débutants ?"
    answer: "Oui. Arduino est adapté aux débutants car on voit rapidement le résultat du code sur du matériel réel : LED, bouton, capteur, buzzer ou petit robot."
---

Arduino est une carte programmable qui permet de relier du code au monde réel : allumer une LED, lire un bouton, mesurer une distance, faire sonner un buzzer ou commander un moteur. Pour un **débutant**, le premier obstacle n’est pas forcément l’électronique, mais la compréhension de la structure d’un **sketch Arduino**. Un sketch est le programme que tu écris dans l’environnement Arduino avant de l’envoyer sur la carte. Il contient presque toujours deux fonctions essentielles : `setup()` et `loop()`.

Comprendre cette structure est indispensable pour progresser en **programmation Arduino**. Sans elle, on copie du code sans savoir où placer une initialisation, une lecture de capteur ou une action répétée. Avec elle, tout devient plus clair : on prépare la carte dans `setup()`, puis on fait vivre le programme dans `loop()`. Cette leçon pose les bases du parcours Arduino du site : environnement de travail, compilation, téléversement, structure du code, exemple LED, lien avec les capteurs et premières erreurs à éviter.

<aside class="article-callout" role="note">
<p><strong>Fiche rapide</strong></p>
<ul>
<li><strong>Niveau :</strong> Arduino débutant, première leçon du parcours.</li>
<li><strong>Durée :</strong> 45 à 60 minutes avec les exercices.</li>
<li><strong>Matériel :</strong> carte Arduino Uno compatible, câble USB, IDE Arduino. Une LED sera utile pour la suite.</li>
<li><strong>Objectif :</strong> comprendre la structure obligatoire d’un sketch Arduino et réussir un premier téléversement.</li>
</ul>
</aside>

Dans cette leçon, tu apprends :

- la structure d’un **sketch** (`setup()` / `loop()`),
- comment vérifier que ça compile,
- comment utiliser **Serial** (très utile pour déboguer),
- quelques bonnes pratiques dès le début.

> Les exemples fonctionnent sur Arduino “classique”. Sur mBot/mCore via mBlock en mode Arduino C, tu retrouves la même logique, avec des bibliothèques Makeblock en plus.

Pour replacer cette leçon dans le parcours complet, commence par le [guide Arduino C/C++ pour débutants](/programmation/arduino-c/), puis enchaîne avec les [types et variables Arduino](/c-arduino-types-variables/).

## 1) Qu’est-ce qu’un sketch Arduino ?

Un **sketch Arduino** est un programme destiné à une carte Arduino. Le mot “sketch” vient de l’environnement Arduino : il désigne le fichier de travail que tu écris, vérifies, puis téléverses sur la carte. Dans un programme classique sur ordinateur, on lance souvent une application qui s’arrête quand l’utilisateur ferme la fenêtre. Sur Arduino, le principe est différent : la carte exécute ton programme tant qu’elle est alimentée.

Le sketch est donc pensé pour un objet autonome. Une fois téléversé, il reste dans la mémoire de la carte. Tu peux débrancher l’Arduino de l’ordinateur, l’alimenter autrement, et il exécutera encore le dernier programme envoyé.

Exemples de sketchs Arduino simples :

- faire clignoter une LED ;
- lire un bouton ;
- afficher une valeur dans le moniteur série ;
- mesurer une distance avec un capteur ultrason ;
- faire avancer ou arrêter un robot Arduino.

La structure du sketch est toujours la base. Avant les capteurs, les moteurs et les robots, il faut savoir où placer chaque instruction.

## 2) L’environnement Arduino : IDE, compilation et téléversement

Pour programmer une carte Arduino, on utilise généralement **Arduino IDE**. C’est le logiciel officiel le plus simple pour débuter. Il regroupe plusieurs outils dans une même interface :

- un éditeur de code pour écrire le sketch ;
- un bouton de vérification pour compiler ;
- un bouton de téléversement pour envoyer le programme sur la carte ;
- un sélecteur de carte et de port série ;
- un moniteur série pour afficher des messages et déboguer.

Le flux de travail est toujours le même :

```text
code → compilation → upload → exécution
```

1. Tu écris le code dans l’éditeur.
2. L’IDE compile le sketch pour vérifier qu’il est correct.
3. L’IDE téléverse le programme vers la carte via USB.
4. La carte redémarre et exécute le sketch.

La compilation repère les erreurs de syntaxe : accolade oubliée, point-virgule manquant, nom de fonction incorrect. Le téléversement, lui, dépend aussi du matériel : bonne carte sélectionnée, bon port USB, câble fonctionnel, driver installé si nécessaire.

## 3) Structure d’un programme Arduino : `setup()` et `loop()`

Un sketch Arduino contient presque toujours :

- `setup()` : exécutée **une fois** au démarrage.
- `loop()` : exécutée **en boucle** (encore et encore).

Schéma logique :

```text
démarrage carte
  └── setup() (1 fois)
        └── loop() (répété à l’infini)
              └── loop()
                    └── loop()
```

Exemple minimal :

```cpp
void setup() {
  // 1 fois
}

void loop() {
  // en boucle
}
```

`setup()` sert à initialiser : démarrer la communication série, définir une broche en sortie, préparer un capteur, configurer un servomoteur. `loop()` contient la logique vivante : lire une valeur, tester une condition, commander une action, attendre un court instant, puis recommencer.

Exemple complet :

```cpp
void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.println("Hello");
}
```

Explication ligne par ligne :

- `void setup()` déclare une fonction qui ne renvoie rien et qui s’exécute une seule fois.
- `Serial.begin(9600);` démarre la communication avec le moniteur série.
- `void loop()` déclare la fonction répétée automatiquement par Arduino.
- `Serial.println("Hello");` affiche le texte `Hello` à chaque tour de boucle.

Si tu ouvres le moniteur série, tu verras le message s’afficher en continu. Pour ralentir l’affichage, ajoute un petit `delay(1000);` dans `loop()`.

## 4) Les autres éléments du code Arduino

Même si `setup()` et `loop()` sont les repères principaux, un sketch Arduino peut contenir d’autres éléments importants.

### Les variables

Une variable stocke une information : une distance, une vitesse, un compteur, un état. Exemple :

```cpp
int compteur = 0;
const int LED_PIN = 13;
```

`int compteur = 0;` crée un nombre entier modifiable. `const int LED_PIN = 13;` crée une constante : la valeur ne changera pas pendant l’exécution.

### Les fonctions

Une fonction regroupe une action sous un nom clair. Cela évite de tout mettre dans `loop()`.

```cpp
void afficherMessage() {
  Serial.println("Arduino prêt");
}
```

Tu peux ensuite appeler `afficherMessage();` dans `setup()` ou dans `loop()`.

### Les bibliothèques

Une bibliothèque ajoute des fonctions déjà prêtes pour un composant : écran, servomoteur, capteur, module Bluetooth. On l’ajoute souvent au début du sketch avec `#include`.

```cpp
#include <Servo.h>
```

Pour un débutant, inutile de commencer par les bibliothèques. Maîtrise d’abord `setup()`, `loop()`, les variables, les conditions et le moniteur série.

## 5) Exemple concret : LED qui clignote

Voici l’exemple classique pour comprendre la structure d’un programme Arduino. Il fait clignoter une LED branchée sur la broche 13. Sur beaucoup de cartes Arduino Uno, une LED intégrée est déjà reliée à cette broche.

```cpp
const int LED_PIN = 13;

void setup() {
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_PIN, HIGH);
  delay(500);
  digitalWrite(LED_PIN, LOW);
  delay(500);
}
```

Explication ligne par ligne :

- `const int LED_PIN = 13;` donne un nom clair à la broche utilisée.
- `void setup()` démarre la partie exécutée une seule fois.
- `pinMode(LED_PIN, OUTPUT);` indique que la broche servira de sortie.
- `void loop()` démarre la partie répétée à l’infini.
- `digitalWrite(LED_PIN, HIGH);` allume la LED.
- `delay(500);` attend 500 millisecondes.
- `digitalWrite(LED_PIN, LOW);` éteint la LED.
- `delay(500);` attend encore avant de recommencer.

Ce petit programme résume déjà la logique Arduino : préparer dans `setup()`, agir dans `loop()`, répéter. Pour aller plus loin, remplace la LED par un buzzer, puis par un moteur ou par une décision basée sur un capteur.

### Variante capteur simple

Dans un projet réel, la boucle lit souvent une mesure :

```cpp
const int CAPTEUR_PIN = A0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int valeur = analogRead(CAPTEUR_PIN);
  Serial.println(valeur);
  delay(200);
}
```

Ici, `analogRead()` lit une valeur sur une broche analogique. C’est le début d’un robot qui observe son environnement.

### Variante robot basique

Pour un robot, la logique devient :

```text
lire le capteur → décider → commander les moteurs
```

Exemple simplifié :

```cpp
int distanceCm = 12;
const int SEUIL_STOP = 15;

void loop() {
  if (distanceCm <= SEUIL_STOP) {
    // arrêter les moteurs
  } else {
    // avancer
  }
}
```

Ce code n’est pas encore un robot complet, mais il montre l’idée centrale : le sketch relie une mesure à une action.

## 6) Erreurs fréquentes quand on débute

### Oublier `setup()` ou `loop()`

Un sketch Arduino sans `setup()` ou sans `loop()` ne respecte pas la structure attendue. Même si une fonction est vide, elle doit exister :

```cpp
void setup() {}
void loop() {}
```

### Oublier un point-virgule

En C/C++ Arduino, beaucoup d’instructions se terminent par `;`.

```cpp
Serial.println("Bonjour");
```

Si tu l’oublies, l’erreur affichée peut parfois apparaître à la ligne suivante. Lis toujours les messages de compilation avec attention.

### Confondre compilation et téléversement

Si la compilation échoue, le code contient une erreur. Si la compilation réussit mais que le téléversement échoue, le problème vient plutôt du choix de carte, du port, du câble USB ou du driver.

### Écrire trop vite dans `loop()`

Une boucle sans pause peut afficher des milliers de lignes par seconde ou saturer un capteur. Pour débuter, un petit `delay()` aide à observer. Plus tard, tu apprendras à utiliser `millis()` avec la leçon sur les [boucles et le timing Arduino](/c-arduino-boucles-timing/).

## 7) Lien avec la robotique : du code au réel

Arduino est particulièrement intéressant parce que le code produit une action physique. Un robot Arduino suit souvent ce cycle :

1. Un capteur mesure quelque chose : distance, lumière, contact, ligne noire.
2. Le programme stocke cette valeur dans une variable.
3. Une condition décide quoi faire.
4. Les moteurs, LED ou buzzers réagissent.

Par exemple, un robot éviteur d’obstacles utilise un capteur ultrason pour mesurer une distance. Si l’obstacle est proche, il s’arrête ou tourne. Sinon, il avance. Cette logique sera beaucoup plus facile à écrire si tu comprends déjà la structure `setup()` / `loop()`.

Pour pratiquer côté capteur, tu peux continuer avec le projet [mesurer une distance avec un capteur ultrason](/serie-capteur-ultrason-mbot-1-mesurer-distance/). Pour organiser un robot plus proprement, la leçon sur les [fonctions Arduino et la modularité](/c-arduino-fonctions-modularite-bonnes-pratiques/) sera la dernière étape du parcours.

## 8) Continuer dans le parcours Arduino

Cette leçon est la porte d’entrée du parcours Arduino du site. Pour progresser sans te disperser :

- Reviens au [guide complet Arduino C/C++](/programmation/arduino-c/) pour voir l’ensemble du parcours.
- Continue avec les [types, variables et constantes Arduino](/c-arduino-types-variables/).
- Passe ensuite aux [conditions pour capteurs et actionneurs](/c-arduino-conditions-capteurs-actionneurs/).
- Travaille les [boucles et le timing avec `millis()`](/c-arduino-boucles-timing/).
- Termine avec les [fonctions Arduino pour structurer un robot](/c-arduino-fonctions-modularite-bonnes-pratiques/).

Pour choisir du matériel, consulte aussi les guides sur les [robots éducatifs](/quel-robot-educatif-choisir-2026/) et les [accessoires mBot utiles pour débuter](/accessoires-mbot-par-ou-commencer/).

## 9) Questions fréquentes

### Qu’est-ce qu’un sketch Arduino ?

Un sketch Arduino est le programme que tu écris dans Arduino IDE, puis que tu téléverses sur la carte. Il contient généralement `setup()` et `loop()`.

### Comment fonctionne `loop()` ?

`loop()` est exécutée encore et encore tant que la carte est alimentée. Elle sert à répéter la logique du programme : lire, décider, agir.

### Quelle différence entre Arduino et C ?

Arduino utilise un langage dérivé du C/C++. La syntaxe ressemble au C/C++, mais l’environnement Arduino ajoute des fonctions simples pour piloter les broches et les composants.

### Quel logiciel pour programmer Arduino ?

Le plus simple pour commencer est Arduino IDE. Il permet d’écrire, compiler et téléverser un sketch vers la carte.

### Arduino est-il adapté aux débutants ?

Oui. Arduino est très adapté aux débutants parce que l’on voit rapidement le résultat du code sur un objet réel : LED, bouton, capteur, buzzer ou robot.

---

## Avant les exercices : compiler, téléverser et déboguer

- **Compiler / Vérifier** : repérer les erreurs sans toucher au robot.
- **Téléverser** : envoyer le programme sur la carte.

Bonne pratique : fais des **petits changements**, compile souvent, et teste progressivement.

### Déboguer avec `Serial`

`Serial` te permet d’afficher des messages sur l’ordinateur (moniteur série). C’est l’équivalent du `print()` en Python.

```cpp
void setup() {
  Serial.begin(9600);
  Serial.println("Bonjour !");
}

void loop() {
  Serial.println("Je tourne");
  delay(1000);
}
```

Bonnes pratiques :

- toujours appeler `Serial.begin(...)` dans `setup()`,
- ne pas spammer trop vite : mets un `delay(...)` ou utilise `millis()` (plus tard).

### Bonnes pratiques (dès maintenant)

- **Nommer clairement** : `compteur`, `distance_cm`, `etat`.
- Utiliser `const` pour les constantes : `const int LED_PIN = 13;`
- Éviter les « nombres magiques » dans le code (ex. `9600`, `13`, `1000`) : mets-les dans des constantes.

## Exercices (20)

Les solutions sont masquées : clique sur **Afficher la solution**.

### Niveau simple

**Exercice 1** — Écris un sketch vide qui compile : `setup()` + `loop()` vides. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {}
void loop() {}</code></pre>
</div>
</details>

**Exercice 2** — Ajoute un commentaire en haut avec ton prénom et la date (sans changer le comportement). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">// Auteur : Lina — 2026-04-02
void setup() {}
void loop() {}</code></pre>
</div>
</details>

**Exercice 3** — Initialise `Serial` dans `setup()` en 9600 bauds. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
}
void loop() {}</code></pre>
</div>
</details>

**Exercice 4** — Affiche `Bonjour` une seule fois au démarrage. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  Serial.println("Bonjour");
}
void loop() {}</code></pre>
</div>
</details>

**Exercice 5** — Affiche `Je tourne` toutes les 2 secondes dans `loop()`. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
}
void loop() {
  Serial.println("Je tourne");
  delay(2000);
}</code></pre>
</div>
</details>

**Exercice 6** — Déclare une constante `const int BAUD = 9600;` et utilise-la. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">const int BAUD = 9600;

void setup() {
  Serial.begin(BAUD);
}
void loop() {}</code></pre>
</div>
</details>

**Exercice 7** — Affiche une ligne `---` au démarrage, puis `OK`. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  Serial.println("---");
  Serial.println("OK");
}
void loop() {}</code></pre>
</div>
</details>

### Niveau intermédiaire

**Exercice 8** — Crée une variable globale `int compteur = 0;` et affiche-la toutes les secondes, puis incrémente-la. <span class="exo-badge exo-badge--intermediate">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int compteur = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.println(compteur);
  compteur++;
  delay(1000);
}</code></pre>
</div>
</details>

**Exercice 9** — Affiche `compteur=` puis la valeur sur la même ligne. <span class="exo-badge exo-badge--intermediate">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int compteur = 0;

void setup() { Serial.begin(9600); }

void loop() {
  Serial.print("compteur=");
  Serial.println(compteur);
  compteur++;
  delay(1000);
}</code></pre>
</div>
</details>

**Exercice 10** — N’affiche le compteur que de 0 à 9, puis affiche `FIN` et arrête (boucle infinie volontaire). <span class="exo-badge exo-badge--intermediate">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int compteur = 0;

void setup() { Serial.begin(9600); }

void loop() {
  if (compteur &lt;= 9) {
    Serial.println(compteur);
    compteur++;
    delay(500);
  } else {
    Serial.println("FIN");
    while (true) {
      // stop
    }
  }
}</code></pre>
</div>
</details>

**Exercice 11** — Ajoute une fonction `void logStart()` qui écrit `START` sur Serial, et appelle-la dans `setup()`. <span class="exo-badge exo-badge--intermediate">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void logStart() {
  Serial.println("START");
}

void setup() {
  Serial.begin(9600);
  logStart();
}
void loop() {}</code></pre>
</div>
</details>

**Exercice 12** — Crée `const int DELAI_MS = 250;` et utilise `delay(DELAI_MS)` au lieu de `delay(250)`. <span class="exo-badge exo-badge--intermediate">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">const int DELAI_MS = 250;

void setup() {
  Serial.begin(9600);
}
void loop() {
  Serial.println("tick");
  delay(DELAI_MS);
}</code></pre>
</div>
</details>

### Niveau avancé (débutant + rigueur)

**Exercice 13** — Affiche `millis()` toutes les secondes (le nombre de millisecondes depuis le démarrage). <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
}
void loop() {
  Serial.println(millis());
  delay(1000);
}</code></pre>
</div>
</details>

**Exercice 14** — Sans `delay` dans `setup()`, affiche `READY` après 3 secondes en utilisant `millis()` (indice : stocker l’instant de départ). <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">unsigned long t0 = 0;
bool affiche = false;

void setup() {
  Serial.begin(9600);
  t0 = millis();
}

void loop() {
  if (!affiche &amp;&amp; (millis() - t0 &gt;= 3000)) {
    Serial.println("READY");
    affiche = true;
  }
}</code></pre>
</div>
</details>

**Exercice 15** — Ajoute une constante `const int PERIOD_MS = 200;` et affiche `.` à cette cadence (avec `delay`, pour l’instant). <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">const int PERIOD_MS = 200;
void setup() { Serial.begin(9600); }
void loop() {
  Serial.print('.');
  delay(PERIOD_MS);
}</code></pre>
</div>
</details>

**Exercice 16** — Écris une fonction `void logValue(const char* nom, int v)` qui affiche `nom=v`. <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void logValue(const char* nom, int v) {
  Serial.print(nom);
  Serial.print('=');
  Serial.println(v);
}

void setup() {
  Serial.begin(9600);
  logValue("score", 42);
}
void loop() {}</code></pre>
</div>
</details>

**Exercice 17** — Explique (dans un commentaire) la différence `Serial.print` vs `Serial.println`, puis montre les deux. <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  // print : n'ajoute pas de retour à la ligne
  // println : ajoute un retour à la ligne à la fin
  Serial.print("A");
  Serial.print("B");
  Serial.println("C"); // ici, fin de ligne
}
void loop() {}</code></pre>
</div>
</details>

**Exercice 18** — Affiche `0,1,2,3,4` sur une seule ligne séparés par des espaces. <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  for (int i = 0; i &lt; 5; i++) {
    Serial.print(i);
    if (i &lt; 4) Serial.print(' ');
  }
  Serial.println();
}
void loop() {}</code></pre>
</div>
</details>

**Exercice 19** — Écris une fonction `bool once()` qui renvoie `true` la première fois puis `false` les fois suivantes (indice : variable statique). <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">bool once() {
  static bool first = true;
  if (first) {
    first = false;
    return true;
  }
  return false;
}

void setup() {
  Serial.begin(9600);
}

void loop() {
  if (once()) Serial.println("Une fois");
}</code></pre>
</div>
</details>

**Exercice 20** — Écris un mini “journal” : au démarrage, affiche `BOOT`, puis en boucle affiche `T=` + `millis()` toutes les 500 ms. <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  Serial.println("BOOT");
}

void loop() {
  Serial.print("T=");
  Serial.println(millis());
  delay(500);
}</code></pre>
</div>
</details>

## Amélioration possible

Transforme le dernier exercice en vrai test de carte : ajoute une LED sur la broche 13, affiche `LED ON` et `LED OFF` dans le moniteur série, puis fais clignoter la LED dans `loop()`. Tu obtiens ton premier pont entre code et électronique.

## Suite du parcours Arduino

Tu connais maintenant `setup()`, `loop()` et `Serial`. La suite logique est la leçon sur les [types, variables et constantes Arduino](/c-arduino-types-variables/) : elle te servira à stocker une distance, un état de bouton ou une vitesse de moteur. Pour voir où mène le parcours, garde aussi sous la main le [guide complet Arduino C/C++](/programmation/arduino-c/) et le projet [mesurer une distance avec un capteur ultrason](/serie-capteur-ultrason-mbot-1-mesurer-distance/).

