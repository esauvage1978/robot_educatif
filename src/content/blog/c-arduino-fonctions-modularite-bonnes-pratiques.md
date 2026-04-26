---
title: "Fonctions Arduino C : modularité & bonnes pratiques"
headline: "Arduino C : Fonctions, Modularité et Bonnes Pratiques pour Écrire un Code Propre"
description: "Fonctions Arduino en C/C++ : modularité, clean code, erreurs à éviter et mini-projet robot (ultrason + moteurs) structuré et réutilisable."
pubDate: 2026-04-02
updatedDate: 2026-04-02
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
articleJsonLd: true
series: "Arduino C"
seriesOrder: 5
tags: ["C", "Arduino", "Robotique", "Programmation"]
relatedLinks:
  - title: "Arduino C — environnement et structure du sketch"
    href: "/c-arduino-environnement-structure-sketch/"
  - title: "Arduino C — types et variables"
    href: "/c-arduino-types-variables/"
  - title: "Arduino C — conditions, capteurs, actionneurs"
    href: "/c-arduino-conditions-capteurs-actionneurs/"
  - title: "Arduino C — boucles et timing"
    href: "/c-arduino-boucles-timing/"
  - title: "Série capteur ultrason mBot (mesure distance)"
    href: "/serie-capteur-ultrason-mbot-1-mesurer-distance/"
  - title: "Meilleur robot programmable enfant (2026)"
    href: "/meilleur-robot-programmable-enfant-2026/"
  - title: "Hub programmation Arduino C"
    href: "/programmation/arduino-c/"
categories:
  - "C"
  - "Arduino"
  - "Programmation"
  - "Débutant"
faqSchema:
  - question: "Pourquoi utiliser des fonctions en Arduino ?"
    answer: "Pour rendre le code lisible, éviter les répétitions (DRY), isoler les actions (capteurs, moteurs) et faciliter debug + maintenance. En robotique, un sketch qui grossit sans fonctions devient vite ingérable."
  - question: "Qu’est-ce que la modularité Arduino ?"
    answer: "C’est découper le programme en blocs cohérents (fonctions / modules) : capteurs, moteurs, logique de décision, utilitaires. Chaque bloc a un rôle clair et peut évoluer sans casser le reste."
  - question: "Comment organiser le code d’un robot Arduino ?"
    answer: "Séparer lecture des capteurs, commande des actionneurs et prise de décision (souvent via une fonction run()). Quand ça grossit, passer en fichiers .h/.cpp par module (capteurs, moteurs, logique)."
  - question: "Un exemple de fonction Arduino simple ?"
    answer: "Par exemple void avancer() (commande moteurs) ou int lireDistanceCm() (capteur ultrason). L’article montre un avant/après et un mini-projet robot complet."
  - question: "Peut-on utiliser des fichiers .h et .cpp dans un sketch Arduino ?"
    answer: "Oui : l’IDE place les fichiers dans le même dossier que le .ino et les compile ensemble. C’est utile pour structurer code Arduino au-delà d’un seul fichier."
  - question: "Quelles erreurs éviter avec les fonctions sur Arduino ?"
    answer: "Fonctions trop longues, variables globales mutables partout, duplication, noms flous, logique mélangée au matériel — tout cela complique le débogage sur un robot réel."
---

Tu as déjà vécu ça : tu démarres un sketch Arduino “pour tester vite”, tu empiles des `if`, des `delay()`, des numéros de broches… et deux jours plus tard tu n’oses plus toucher à `loop()` parce que **tout casse**. C’est le début du *code spaghetti Arduino*.

Ce guide te donne une méthode simple et “pro” pour passer de **débutant** à **intermédiaire** :

- **fonctions Arduino** (C/C++) pour isoler *une action = une intention*  
- **modularité Arduino** pour séparer capteurs / moteurs / logique  
- **bonnes pratiques Arduino** (clean code Arduino) pour garder un projet lisible quand il grossit  
- un **mini-projet robot** (ultrason + moteurs) structuré, réutilisable et facile à déboguer

> Objectif SEO (et réel) : savoir **comment organiser un code Arduino propre**, éviter le spaghetti, et créer des **fonctions réutilisables** pour des projets capteurs / moteurs.

## Résumé

- **Définition** : une *fonction* regroupe des instructions sous un nom (ex. `lireDistanceCm()`, `avancer()`).
- **But** : rendre `loop()` lisible comme une recette : *mesurer → décider → agir*.
- **Modularité** : séparer le code par rôle (capteurs, moteurs, logique), puis par fichiers quand nécessaire (`capteurs.h/.cpp`, `moteurs.h/.cpp`).
- **Clean code Arduino** : noms explicites, petites fonctions, duplication évitée, globales minimisées, commentaires “pourquoi”.
- **Anti-spaghetti** : pas de logique métier noyée dans les `digitalWrite()` / `analogWrite()`.

## Liens utiles (affiliation Amazon, sans spam)

- Idéal pour débuter : [kit Arduino débutant recommandé](https://www.amazon.fr/s?k=kit+arduino+d%C3%A9butant&tag=manuso06-21)
- Carte simple et standard : [Arduino Uno R3 (compatible)](https://www.amazon.fr/s?k=arduino+uno+r3&tag=manuso06-21)
- Plus d’E/S pour des robots + capteurs : [Arduino Mega 2560](https://www.amazon.fr/s?k=arduino+mega+2560&tag=manuso06-21)
- Capteur de distance pour ce tuto : [HC-SR04 (ultrason)](https://www.amazon.fr/s?k=hc-sr04&tag=manuso06-21)
- Pour motoriser un petit robot : [kit moteurs robotique + roues + driver](https://www.amazon.fr/s?k=kit+moteur+robotique+arduino+roues+driver&tag=manuso06-21)

## 1 — Pourquoi utiliser des fonctions en Arduino (et éviter le code spaghetti)

Quand tout est “en vrac” dans `loop()`, tu obtiens :

- **Duplication** : le même bloc de code copié-collé à 3 endroits (puis modifié à moitié).
- **Bugs difficiles** : un changement de broche nécessite de fouiller 200 lignes.
- **Debug lent** : tu ne peux pas tester une partie du robot sans déclencher les autres.

Une fonction te force à nommer l’intention : *“je lis la distance”*, *“j’avance”*, *“j’évite un obstacle”*.  
En robotique, c’est exactement le cycle : **percevoir → décider → agir**.

### Exemple minimal (1 bloc demandé)

```cpp
// Exemple de fonction simple : action unique (moteurs)
void avancer() {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
}
```

## 2 — Syntaxe des fonctions en C/C++ Arduino (déclaration, paramètres, return)

En “programmation C Arduino”, une fonction a :

- un **type de retour** (`void`, `int`, `bool`, etc.)
- un **nom** explicite
- des **paramètres** (optionnels)
- un **corps** `{ ... }`

### Exemple clair (avec `setup()` / `loop()`)

```cpp
const int LED_PIN = 13;

// Déclaration + définition : retourne un booléen
bool estPair(int n) {
  return (n % 2) == 0;
}

// Fonction qui ne retourne rien (void)
void clignoter(int nbFois, int delaiMs) {
  for (int i = 0; i < nbFois; i++) {
    digitalWrite(LED_PIN, HIGH);
    delay(delaiMs);
    digitalWrite(LED_PIN, LOW);
    delay(delaiMs);
  }
}

void setup() {
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  int v = 7;
  if (estPair(v)) clignoter(2, 120);
  else clignoter(1, 350);
  delay(800);
}
```

Points à retenir :

- **paramètres** = données d’entrée → évite les globales
- **return** = résultat → rend une fonction testable au moniteur série

## 3 — Modularité : la vraie clé des projets Arduino (quand ça devient “robot”)

La **modularité Arduino**, c’est : *un endroit pour chaque chose*.

- **Capteurs** : “comment mesurer”
- **Moteurs / actionneurs** : “comment agir”
- **Logique** : “quoi faire selon la situation”

### Schéma d’architecture (simple et efficace)

```
main.ino
  ├─ capteurs.h / capteurs.cpp     (ultrason, IR… → valeurs)
  ├─ moteurs.h / moteurs.cpp       (avancer, stop, tourner…)
  └─ logique.h / logique.cpp       (detectObstacle, eviterObstacle…)
```

Tu peux rester en **un seul fichier** au début, mais garde la séparation *conceptuelle*.  
Puis, quand tu dépasses ~150–200 lignes utiles : passe en modules.

## 4 — Bonnes pratiques (Clean Code Arduino) + “mauvais vs bon”

### Tableau récapitulatif (clean code Arduino)

| Principe | Mauvais signe | Bon réflexe |
|---|---|---|
| Noms explicites | `f1()`, `a`, `b` | `lireDistanceCm()`, `distanceCm` |
| 1 responsabilité | fonction “monstre” | petites fonctions “capteur / moteur / logique” |
| Limiter globales | globals modifiées partout | paramètres + `return`, globales “config” seulement |
| DRY | copier-coller | fonction ou constante `const` |
| Commentaires utiles | “ce code fait X” | “pourquoi ce seuil / ce choix” |

### Mauvais code (spaghetti)

```cpp
void loop() {
  int d = 42; // capteur
  if (d > 15) {
    digitalWrite(5, HIGH);
    digitalWrite(6, LOW);
  } else {
    digitalWrite(5, LOW);
    digitalWrite(6, LOW);
  }
  // ... puis 150 lignes de plus avec d'autres broches et seuils ...
}
```

### Bon code (même logique, mais lisible et modulaire)

```cpp
const int SEUIL_STOP_CM = 15;

int lireDistanceCm() {
  return 42; // à remplacer par le vrai capteur
}

void avancer() { /* ... */ }
void stopMoteurs() { /* ... */ }

void loop() {
  const int d = lireDistanceCm();
  if (d <= SEUIL_STOP_CM) stopMoteurs();
  else avancer();
}
```

Le vrai gain : tu peux maintenant améliorer `lireDistanceCm()` (filtrage, moyenne, timeouts) **sans toucher** à la décision.

## 5 — Erreurs fréquentes des débutants (et comment les corriger)

- **Tout mettre dans `loop()`** : corrige en créant 3 fonctions : `mesurer()`, `decider()`, `agir()`.
- **Variables globales inutiles** : garde en global uniquement la *configuration stable* (broches, seuils), pas les états transitoires.
- **Fonctions trop longues** : si tu scrolles pour la lire → découpe.
- **Mauvais noms** : si tu dois commenter “ce que fait la variable” → renomme-la.
- **Mélanger matériel et logique** : évite de disperser `digitalWrite()` partout.

## 6 — Exemple concret : robot Arduino modulaire (ultrason + moteurs)

Mini-projet : un robot avance et **s’arrête / tourne** si obstacle détecté.

### Matériel typique (simple)

- Arduino Uno R3 (ou Mega)  
- capteur ultrason HC-SR04  
- driver moteurs (L298N, TB6612…) + 2 moteurs DC + roues

Liens (affiliation) :

- [HC-SR04](https://www.amazon.fr/s?k=hc-sr04&tag=manuso06-21)
- [kit moteurs robotique](https://www.amazon.fr/s?k=kit+moteur+robotique+arduino+roues+driver&tag=manuso06-21)

### 6.1 — API “capteurs” (ce que ton code *utilise*)

```cpp
// capteurs.h
int lireDistanceCm();
```

### 6.2 — API “moteurs”

```cpp
// moteurs.h
void avancer();
void stopMoteurs();
void tournerDroite(unsigned long dureeMs);
```

### 6.3 — Logique (décision)

```cpp
// logique.h
bool detectObstacle(int distanceCm);
void eviterObstacle();
```

### 6.4 — Implémentation en un fichier (version pédagogique)

> Tu peux copier-coller tel quel dans un `main.ino`, puis extraire en `.h/.cpp` ensuite.

```cpp
// ===== Config (globales "stables") =====
const int TRIG_PIN = 9;
const int ECHO_PIN = 8;

const int IN1 = 5;
const int IN2 = 6;

const int SEUIL_OBSTACLE_CM = 18;

// ===== Capteurs =====
int lireDistanceCm() {
  // Version simple : pulseIn + conversion.
  // En vrai projet, ajoute un timeout + filtrage.
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  unsigned long duree = pulseIn(ECHO_PIN, HIGH, 25000UL); // 25 ms ~ 4m
  if (duree == 0) return 999; // timeout = "loin"
  // distance (cm) = durée/58 (approx)
  return (int)(duree / 58UL);
}

// ===== Moteurs =====
void avancer() {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
}

void stopMoteurs() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
}

void tournerDroite(unsigned long dureeMs) {
  // Placeholder : à adapter à ton vrai driver + 2 moteurs
  stopMoteurs();
  delay(80);
  // Ici on simule une rotation en changeant le sens.
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  delay(dureeMs);
  stopMoteurs();
}

// ===== Logique =====
bool detectObstacle(int distanceCm) {
  return distanceCm <= SEUIL_OBSTACLE_CM;
}

void eviterObstacle() {
  stopMoteurs();
  delay(120);
  tournerDroite(280);
}

// ===== Arduino lifecycle =====
void setup() {
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int d = lireDistanceCm();
  Serial.print("distance_cm=");
  Serial.println(d);

  if (detectObstacle(d)) eviterObstacle();
  else avancer();

  delay(40); // simple ; voir timing non-bloquant si besoin
}
```

### 6.5 — Passage en fichiers `.h/.cpp` (quand tu veux “propre”)

- `main.ino` : `setup()` / `loop()` et l’orchestration
- `capteurs.cpp` : tout le “comment mesurer”
- `moteurs.cpp` : tout le “comment agir”
- `logique.cpp` : règles métier du robot

Ce découpage est la réponse directe à “**comment éviter le code spaghetti Arduino**”.

## Checklist : code Arduino propre (à cocher)

- [ ] `loop()` tient en ~10–25 lignes et lit comme une recette  
- [ ] aucune broche “magique” au milieu du code (tout en `const`)  
- [ ] capteurs séparés des actionneurs  
- [ ] duplication éliminée (DRY)  
- [ ] noms explicites (verbes pour actions : `avancer`, `stopMoteurs`)  
- [ ] commentaires expliquent un *choix* (seuil, timeout), pas une évidence  

## Mini quiz (fin d’article)

1) Dans quel cas `int lireDistanceCm()` est préférable à `void lireDistanceCm()` ?  
2) Pourquoi “capteurs” et “moteurs” devraient être des modules séparés ?  
3) Cite 2 symptômes d’un `loop()` spaghetti.  
4) Quelle est une bonne règle pour décider de découper une fonction ?  

## Pour aller plus loin (maillage interne)

- Arduino C — structure d’un sketch : [/c-arduino-environnement-structure-sketch/](/c-arduino-environnement-structure-sketch/)  
- Arduino C — types et variables : [/c-arduino-types-variables/](/c-arduino-types-variables/)  
- Arduino C — conditions, capteurs, actionneurs : [/c-arduino-conditions-capteurs-actionneurs/](/c-arduino-conditions-capteurs-actionneurs/)  
- Arduino C — boucles et timing : [/c-arduino-boucles-timing/](/c-arduino-boucles-timing/)  

