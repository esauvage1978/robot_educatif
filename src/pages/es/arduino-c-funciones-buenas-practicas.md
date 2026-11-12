---
layout: ../../layouts/EsPost.astro
title: "Funciones Arduino: crear y llamar funciones en C"
description: "Funciones Arduino: alcance, DRY, código legible, evitar globales. 20 ejercicios con soluciones."
updated: "31 de octubre de 2026"
---

![Placa Arduino Uno vista en tres cuartos — la placa en la que corren estos ejercicios de funciones](/images/lot2/arduino-uno-perspective.webp)

*La placa Arduino Uno, la más habitual para este recorrido. Foto: Creative Tools — [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) — [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Arduino-uno-perspective.jpg) (redimensionada / WebP).*

Cuando tu programa robótico crece, se vuelve difícil de leer: muchos `if`, muchas repeticiones y constantes por todas partes. Las **funciones** sirven para:

- agrupar una acción: `idleState()`, `raiseAlarm()`
- evitar copiar código (principio **DRY**: no repetirte)
- probar más fácilmente

Esta es la lección **5** del [curso Arduino C](/es/arduino-c/). Lecciones anteriores: [estructura del sketch y Serial](/en/arduino-c-sketch-structure-serial/), [tipos y variables](/en/arduino-c-types-variables/), [condiciones y sensores](/en/arduino-c-conditions-sensors/), [bucles y timing](/c-arduino-boucles-timing/).

Algunos enlaces de esta página son de afiliados: si compras a través de ellos, podemos recibir una comisión sin coste extra para ti. Para ejecutar los ejercicios en hardware real basta con un **kit de inicio Arduino Uno** (placa, cable USB, LED, resistencias, protoboard) — comprueba el precio del día en [Amazon.es](https://www.amazon.es/s?k=arduino+uno+starter+kit&tag=roboteducat07-21). Libros sobre C para Arduino: [Amazon.es](https://www.amazon.es/s?k=arduino+aprender+c+programacion&tag=roboteducat07-21).

## 1) DRY (no repetirte)

**DRY** (*Don't Repeat Yourself*) = **no repetir la misma información** en varios sitios.

Ejemplo: si escribes 2 veces `"Mi mensaje"`, puedes modificar una copia y no la otra. En robótica eso crea bugs difíciles de entender.

Buena práctica: una sola fuente:

```cpp
const char* message = "Mi mensaje";
```

## 2) Alcance (scope)

- variable **global**: visible en todas partes
- variable **local**: visible en el bloque donde se declara
- **parámetro**: un valor «dado» a una función

En robótica, demasiadas globales = programa difícil de razonar. Se guardan globales para los **estados** necesarios y se pasa el resto como parámetros.

## 3) Ejemplo robótico (estructura)

```text
loop():
  leer sensor
  si intrusion -> raiseAlarm()
  si no -> idleState()
```

---

## Ejercicios (20)

### Nivel simple

**Ejercicio 1** — Escribe una función `void idleState()` que muestre `IDLE` en Serial. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void idleState() {
  Serial.println("IDLE");
}</code></pre>
</div>
</details>

**Ejercicio 2** — Escribe `void raiseAlarm()` que muestre `ALERT` y un «bip» simulado (`Serial.println("beep")`). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void raiseAlarm() {
  Serial.println("ALERT");
  Serial.println("beep");
}</code></pre>
</div>
</details>

**Ejercicio 3** — Llama a `idleState()` en `setup()` (después de `Serial.begin`). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void idleState() { Serial.println("IDLE"); }
void setup() {
  Serial.begin(9600);
  idleState();
}
void loop() {}</code></pre>
</div>
</details>

**Ejercicio 4** — DRY: declara `const int DIST_STOP = 15;` y úsala en `bool isStop(int d)`. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">const int DIST_STOP = 15;
bool isStop(int d) { return d &lt;= DIST_STOP; }</code></pre>
</div>
</details>

**Ejercicio 5** — Escribe `int absInt(int v)` (valor absoluto) y úsala para un umbral de intrusion. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int absInt(int v) { return v &lt; 0 ? -v : v; }</code></pre>
</div>
</details>

### Nivel intermedio

**Ejercicio 6** — Escribe `bool intrusion(int ref, int measure, int threshold)` que devuelva true si `abs(measure-ref) > threshold`. <span class="exo-badge exo-badge--intermediate">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int absInt(int v) { return v &lt; 0 ? -v : v; }
bool intrusion(int ref, int measure, int threshold) {
  return absInt(measure - ref) &gt; threshold;
}</code></pre>
</div>
</details>

**Ejercicio 7** — Evita una global: crea `void showCounter(int n)` en lugar de acceder directamente a `intrusions`. <span class="exo-badge exo-badge--intermediate">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void showCounter(int n) {
  Serial.print("intrusions=");
  Serial.println(n);
}</code></pre>
</div>
</details>

**Ejercicio 8** — Escribe `void idleState(int intrusionCount)` que muestre un texto distinto según el contador (si 0: OK, si no: WARNING). <span class="exo-badge exo-badge--intermediate">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void idleState(int intrusionCount) {
  if (intrusionCount == 0) Serial.println("OK");
  else Serial.println("WARNING");
}</code></pre>
</div>
</details>

**Ejercicio 9** — Explica en un comentario: por qué pasar `intrusionCount` como parámetro ayuda a la pedagogía aunque la variable sea global. <span class="exo-badge exo-badge--intermediate">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">// Pedagogía: se ve qué datos usa la función (como f(x));
// buena práctica: depender menos de globales hace el código más comprobable y legible.</code></pre>
</div>
</details>

**Ejercicio 10** — Escribe `unsigned long periodFromDistance(int d)` que devuelva 1000 ms si 35..69, 250 ms si &lt;35, si no 100 ms. <span class="exo-badge exo-badge--intermediate">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">unsigned long periodFromDistance(int d) {
  if (d &gt;= 70) return 100;
  if (d &gt;= 35) return 1000;
  return 250;
}</code></pre>
</div>
</details>

### Nivel avanzado

**Ejercicio 11** — Escribe `bool every(unsigned long period, unsigned long* last)` (temporizador genérico). <span class="exo-badge exo-badge--advanced">Avanzado</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">bool every(unsigned long period, unsigned long* last) {
  unsigned long now = millis();
  if (now - *last &gt;= period) { *last = now; return true; }
  return false;
}</code></pre>
</div>
</details>

**Ejercicio 12** — Crea `int readDistanceFake()` que devuelva una distancia que baja de 70 a 0 y luego sube (simulación). <span class="exo-badge exo-badge--advanced">Avanzado</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int readDistanceFake() {
  static int d = 70;
  static int step = -1;
  d += step;
  if (d &lt;= 0) { d = 0; step = 1; }
  if (d &gt;= 70) { d = 70; step = -1; }
  return d;
}</code></pre>
</div>
</details>

**Ejercicio 13** — Escribe `void radarTick(int distance_cm)` que muestre `beep` si distancia &lt; 70 (si no, nada). <span class="exo-badge exo-badge--advanced">Avanzado</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void radarTick(int distance_cm) {
  if (distance_cm &lt; 70) Serial.println("beep");
}</code></pre>
</div>
</details>

**Ejercicio 14** — Mini-arquitectura: en `loop`, lee la distancia, calcula `period`, luego si `every(period)` llama a `radarTick`. <span class="exo-badge exo-badge--advanced">Avanzado</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">unsigned long last = 0;

bool every(unsigned long period, unsigned long* last) {
  unsigned long now = millis();
  if (now - *last &gt;= period) { *last = now; return true; }
  return false;
}

unsigned long periodFromDistance(int d) {
  if (d &gt;= 70) return 100;
  if (d &gt;= 35) return 1000;
  return 250;
}

int readDistanceFake() { static int d = 70; d--; if (d &lt; 0) d = 70; return d; }

void setup() { Serial.begin(9600); }
void loop() {
  int d = readDistanceFake();
  unsigned long p = periodFromDistance(d);
  if (every(p, &amp;last) &amp;&amp; d &lt; 70) Serial.println("beep");
}</code></pre>
</div>
</details>

**Ejercicio 15** — Escribe `void logKV(const char* k, int v)` y úsala para registrar `distance`. <span class="exo-badge exo-badge--advanced">Avanzado</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void logKV(const char* k, int v) {
  Serial.print(k);
  Serial.print('=');
  Serial.println(v);
}</code></pre>
</div>
</details>

**Ejercicio 16** — DRY: crea `const int THRESHOLD = 3;` y úsalo en 2 sitios (intrusion + alerta) sin copiar el `3`. <span class="exo-badge exo-badge--advanced">Avanzado</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">const int THRESHOLD = 3;
int absInt(int v) { return v &lt; 0 ? -v : v; }
bool intrusion(int ref, int measure) { return absInt(measure - ref) &gt; THRESHOLD; }</code></pre>
</div>
</details>

**Ejercicio 17** — Explica en un comentario qué significa «modularidad». <span class="exo-badge exo-badge--advanced">Avanzado</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">// Modularidad: dividir un programa en bloques/funciones independientes y reutilizables,
// cada uno con una responsabilidad clara.</code></pre>
</div>
</details>

**Ejercicio 18** — Crea `int speedFromDistance(int d)` que devuelva 0 si d&lt;=15, 80 si d&gt;=50, si no 30. <span class="exo-badge exo-badge--advanced">Avanzado</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int speedFromDistance(int d) {
  if (d &lt;= 15) return 0;
  if (d &gt;= 50) return 80;
  return 30;
}</code></pre>
</div>
</details>

**Ejercicio 19** — Añade `void drive(int v)` que simule el envío de velocidad al motor (`Serial.println(v)`). <span class="exo-badge exo-badge--advanced">Avanzado</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void drive(int v) {
  Serial.print("drive=");
  Serial.println(v);
}</code></pre>
</div>
</details>

**Ejercicio 20** — Mini-proyecto: en `loop`, lee una distancia simulada, calcula la velocidad con `speedFromDistance`, luego llama a `drive(v)` cada 200 ms (no bloqueante). <span class="exo-badge exo-badge--advanced">Avanzado</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">unsigned long last = 0;
bool every(unsigned long p, unsigned long* last) {
  unsigned long now = millis();
  if (now - *last &gt;= p) { *last = now; return true; }
  return false;
}
int speedFromDistance(int d) {
  if (d &lt;= 15) return 0;
  if (d &gt;= 50) return 80;
  return 30;
}
int readDistanceFake() { static int d = 70; d--; if (d &lt; 0) d = 70; return d; }
void drive(int v) { Serial.print("drive="); Serial.println(v); }

void setup() { Serial.begin(9600); }
void loop() {
  if (every(200, &amp;last)) {
    int d = readDistanceFake();
    int v = speedFromDistance(d);
    drive(v);
  }
}</code></pre>
</div>
</details>

*Autor: Emmanuel Sauvage.*
