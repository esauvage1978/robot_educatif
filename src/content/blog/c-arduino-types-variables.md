---
title: "Arduino C — types, variables et constantes (20 exercices)"
description: "Types utiles en robotique (int, unsigned long, float, bool, char, const char*), variables globales/locales, constantes, conversions et bonnes pratiques. 20 exercices corrigés."
pubDate: 2026-04-02
updatedDate: 2026-04-02
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: "Arduino C"
seriesOrder: 2
tags: ["C", "Arduino", "Robotique", "Programmation"]
relatedLinks:
  - title: "Leçon 1 — structure d’un sketch"
    href: "/c-arduino-environnement-structure-sketch/"
categories:
  - "C"
  - "Arduino"
  - "Programmation"
  - "Débutant"
---

En robotique, tu manipules beaucoup de **nombres** (vitesses, distances, temps) et des **états** (allumé/éteint). En Arduino C, choisir le bon **type** rend ton programme plus clair et évite des erreurs.

## 1) Les types les plus utiles

- **`int`** : entier (compteur, vitesse, seuil).
- **`unsigned long`** : temps `millis()` (important : `millis()` renvoie ce type).
- **`float`** : nombre à virgule (mesure “réelle”, moyenne, calcul).
- **`bool`** : vrai/faux (état, drapeau).
- **`char`** : un caractère (ex. `'A'`).
- **`const char*`** : texte (chaîne) constant, pratique pour afficher un message.

> Bon réflexe : si tu comptes des intrusions, c’est un **entier** → `int`, pas `float`.

## 2) Variables globales vs locales (portée)

- **Globale** : déclarée en dehors des fonctions → visible partout (ex. compteur).
- **Locale** : déclarée dans une fonction → visible seulement dans ce bloc.

Schéma :

```text
int global;        ← visible dans setup() et loop()

void loop() {
  int local;       ← visible seulement dans loop()
}
```

## 3) Constantes : éviter les “nombres magiques”

```cpp
const int LED_PIN = 13;
const int BAUD = 9600;
const int DELAI_MS = 100;
```

Bonne pratique : mets des noms qui disent **pourquoi** ce nombre existe.

## 4) Conversions fréquentes

- `int n = 3; float f = n;` OK (3 → 3.0)
- `float f = 3.7; int n = (int)f;` tronque (3.7 → 3)

Pour des **textes**, on affiche souvent sans stocker de `String` global : on garde des nombres en `int`, et on affiche avec `Serial.print`.

---

## Exercices (20)

### Niveau simple

**Exercice 1** — Déclare une constante `const int BAUD = 9600;` et utilise-la dans `Serial.begin`. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">const int BAUD = 9600;
void setup() { Serial.begin(BAUD); }
void loop() {}</code></pre>
</div>
</details>

**Exercice 2** — Déclare `int compteur = 0;` et incrémente-le dans `loop()`. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int compteur = 0;
void setup() {}
void loop() { compteur++; }</code></pre>
</div>
</details>

**Exercice 3** — Déclare `bool alarme = false;` puis mets-la à `true` dans `setup()`. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">bool alarme = false;
void setup() { alarme = true; }
void loop() {}</code></pre>
</div>
</details>

**Exercice 4** — Déclare `unsigned long t0 = 0;` et stocke `millis()` dans `setup()`. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">unsigned long t0 = 0;
void setup() { t0 = millis(); }
void loop() {}</code></pre>
</div>
</details>

**Exercice 5** — Affiche le type “implicite” : affiche une phrase avec un `int` et un `float` (avec `Serial.print`). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int n = 7;
float f = 3.5;
void setup() {
  Serial.begin(9600);
  Serial.print("n=");
  Serial.print(n);
  Serial.print(" f=");
  Serial.println(f);
}
void loop() {}</code></pre>
</div>
</details>

### Niveau intermédiaire

**Exercice 6** — Évite les nombres magiques : remplace `delay(250)` par `const int DELAI_MS = 250;`. <span class="exo-badge exo-badge--intermediate">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">const int DELAI_MS = 250;
void setup() {}
void loop() { delay(DELAI_MS); }</code></pre>
</div>
</details>

**Exercice 7** — Portée : déclare une variable locale `int x` dans `loop()` et essaye (mentalement) de l’utiliser dans `setup()` : explique pourquoi ça ne marche pas (commentaire). <span class="exo-badge exo-badge--intermediate">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  // int x; ici n'existe pas si x est déclaré dans loop()
  // Portée : une variable locale n'est visible que dans son bloc.
}
void loop() {
  int x = 0;
  x++;
}</code></pre>
</div>
</details>

**Exercice 8** — Déclare un texte : `const char* msg = \"OK\";` et affiche-le au démarrage. <span class="exo-badge exo-badge--intermediate">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">const char* msg = "OK";
void setup() {
  Serial.begin(9600);
  Serial.println(msg);
}
void loop() {}</code></pre>
</div>
</details>

**Exercice 9** — Conversion : avec `float d = 12.9;` calcule `int n = (int)d;` et affiche `n` (doit afficher 12). <span class="exo-badge exo-badge--intermediate">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  float d = 12.9;
  int n = (int)d;
  Serial.println(n); // 12
}
void loop() {}</code></pre>
</div>
</details>

**Exercice 10** — Écris une fonction `int clampInt(int v, int minV, int maxV)` qui force `v` à rester entre min et max. <span class="exo-badge exo-badge--intermediate">Intermédiaire</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int clampInt(int v, int minV, int maxV) {
  if (v &lt; minV) return minV;
  if (v &gt; maxV) return maxV;
  return v;
}</code></pre>
</div>
</details>

### Niveau avancé (débutant + rigueur)

**Exercice 11** — Corrige un mauvais type : un compteur d’événements ne doit pas être un `float`. Remplace par `int` et affiche-le. <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int intrusions = 0;
void setup() { Serial.begin(9600); }
void loop() {
  intrusions++;
  Serial.println(intrusions);
  delay(1000);
}</code></pre>
</div>
</details>

**Exercice 12** — Explique pourquoi `millis()` doit être stocké dans `unsigned long` (commentaire + exemple). <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  // millis() renvoie un grand nombre positif (ms depuis le démarrage)
  // => unsigned long évite les débordements signés et garde la bonne plage.
  unsigned long t = millis();
  Serial.begin(9600);
  Serial.println(t);
}
void loop() {}</code></pre>
</div>
</details>

**Exercice 13** — Écris une fonction `bool isNear(int distanceCm, int seuil)` qui renvoie true si `distanceCm` est &lt;= seuil. <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">bool isNear(int distanceCm, int seuil) {
  return distanceCm &lt;= seuil;
}</code></pre>
</div>
</details>

**Exercice 14** — Constantes nommées : crée `const int DIST_STOP_CM = 15;` et utilise-la dans un test. <span class="exo-badge exo-badge--advanced">Avancé</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Afficher la solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">const int DIST_STOP_CM = 15;
int distance_cm = 12;
void setup() {
  Serial.begin(9600);
  if (distance_cm &lt;= DIST_STOP_CM) Serial.println("STOP");
}
void loop() {}</code></pre>
</div>
</details>

**Exercice 15** — Texte + DRY : déclare `const char* message = \"MBOT\";` et affiche-le 3 fois sans recopier \"MBOT\" en dur. <span class=\"exo-badge exo-badge--advanced\">Avancé</span>

<details class=\"exercise-solution\">
<summary class=\"exercise-solution__summary\">Afficher la solution</summary>
<div class=\"exercise-solution__body\">
<pre class=\"exercise-solution__pre\"><code class=\"language-cpp\">const char* message = \"MBOT\";
void setup() {
  Serial.begin(9600);
  for (int i = 0; i &lt; 3; i++) Serial.println(message);
}
void loop() {}</code></pre>
</div>
</details>

**Exercice 16** — Crée deux variables : `int vitesse = 80;` et `int vitesse_min = 30;` puis calcule `int v = vitesse - vitesse_min;` et affiche `v`. <span class=\"exo-badge exo-badge--advanced\">Avancé</span>

<details class=\"exercise-solution\">
<summary class=\"exercise-solution__summary\">Afficher la solution</summary>
<div class=\"exercise-solution__body\">
<pre class=\"exercise-solution__pre\"><code class=\"language-cpp\">void setup() {
  Serial.begin(9600);
  int vitesse = 80;
  int vitesse_min = 30;
  int v = vitesse - vitesse_min;
  Serial.println(v);
}
void loop() {}</code></pre>
</div>
</details>

**Exercice 17** — `static` : crée une fonction qui compte combien de fois elle a été appelée (retourne un `int`). <span class=\"exo-badge exo-badge--advanced\">Avancé</span>

<details class=\"exercise-solution\">
<summary class=\"exercise-solution__summary\">Afficher la solution</summary>
<div class=\"exercise-solution__body\">
<pre class=\"exercise-solution__pre\"><code class=\"language-cpp\">int countCalls() {
  static int c = 0;
  c++;
  return c;
}</code></pre>
</div>
</details>

**Exercice 18** — Écris un petit “état” : `bool enVeille = true;` puis passe en `false` après 5 secondes (avec `millis()`). <span class=\"exo-badge exo-badge--advanced\">Avancé</span>

<details class=\"exercise-solution\">
<summary class=\"exercise-solution__summary\">Afficher la solution</summary>
<div class=\"exercise-solution__body\">
<pre class=\"exercise-solution__pre\"><code class=\"language-cpp\">bool enVeille = true;
unsigned long t0 = 0;

void setup() {
  Serial.begin(9600);
  t0 = millis();
}

void loop() {
  if (enVeille &amp;&amp; millis() - t0 &gt;= 5000) {
    enVeille = false;
    Serial.println(\"GO\");
  }
}</code></pre>
</div>
</details>

**Exercice 19** — Écris une fonction `float toM(float cm)` qui convertit des cm en mètres. <span class=\"exo-badge exo-badge--advanced\">Avancé</span>

<details class=\"exercise-solution\">
<summary class=\"exercise-solution__summary\">Afficher la solution</summary>
<div class=\"exercise-solution__body\">
<pre class=\"exercise-solution__pre\"><code class=\"language-cpp\">float toM(float cm) {
  return cm / 100.0;
}</code></pre>
</div>
</details>

**Exercice 20** — Mini-projet : fais une variable `int distance_cm = 42;` et affiche `Distance: 42 cm` (formatage simple). <span class=\"exo-badge exo-badge--advanced\">Avancé</span>

<details class=\"exercise-solution\">
<summary class=\"exercise-solution__summary\">Afficher la solution</summary>
<div class=\"exercise-solution__body\">
<pre class=\"exercise-solution__pre\"><code class=\"language-cpp\">void setup() {
  Serial.begin(9600);
  int distance_cm = 42;
  Serial.print(\"Distance: \");
  Serial.print(distance_cm);
  Serial.println(\" cm\");
}
void loop() {}</code></pre>
</div>
</details>

