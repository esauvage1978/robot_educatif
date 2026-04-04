---
title: "Arduino C — démarrer : structure d’un sketch, setup/loop, Serial (20 exercices)"
description: "Découvrir Arduino C pour la robotique : structure d’un sketch (setup/loop), compilation, téléversement, Serial, et premières bonnes pratiques. 20 exercices corrigés."
pubDate: 2026-04-02
updatedDate: 2026-04-02
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: "Arduino C"
seriesOrder: 1
tags: ["C", "Arduino", "Robotique", "Programmation"]
relatedLinks:
  - title: "Leçon 2 — types et variables"
    href: "/c-arduino-types-variables/"
categories:
  - "C"
  - "Arduino"
  - "Programmation"
  - "Débutant"
---

Arduino C (souvent appelé « Arduino C ») est du **C/C++** adapté à des microcontrôleurs. En robotique, l’idée est simple : ton programme tourne **en boucle** sur la carte et lit des **capteurs** / commande des **actionneurs** (LED, moteurs, buzzer…).

Dans cette leçon, tu apprends :

- la structure d’un **sketch** (`setup()` / `loop()`),
- comment vérifier que ça compile,
- comment utiliser **Serial** (très utile pour déboguer),
- quelques bonnes pratiques dès le début.

> Les exemples fonctionnent sur Arduino “classique”. Sur mBot/mCore via mBlock en mode Arduino C, tu as la même logique, avec en plus des bibliothèques Makeblock.

## 1) La structure d’un sketch : `setup()` et `loop()`

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

## 2) Compiler et téléverser (le réflexe)

- **Compiler / Vérifier** : repérer les erreurs sans toucher au robot.
- **Téléverser** : envoyer le programme sur la carte.

Bonne pratique : fais des **petits changements**, compile souvent, et teste progressivement.

## 3) Déboguer avec `Serial`

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

## 4) Bonnes pratiques (dès maintenant)

- **Nommer clairement** : `compteur`, `distance_cm`, `etat`.
- Utiliser `const` pour les constantes : `const int LED_PIN = 13;`
- Éviter les « nombres magiques » dans le code (ex. `9600`, `13`, `1000`) : mets-les dans des constantes.

---

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

