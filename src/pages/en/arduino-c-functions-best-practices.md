---
layout: ../../layouts/EnPost.astro
title: "Arduino functions: create and call functions in C"
description: "Arduino functions: scope, DRY, readable code, avoid globals. 20 exercises with solutions."
updated: "31 October 2026"
---

![Arduino Uno board seen from an angle — the board on which these function exercises run](/images/lot2/arduino-uno-perspective.webp)

*The Arduino Uno, the usual board for this course. Photo: Creative Tools — [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) — [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Arduino-uno-perspective.jpg) (resized / WebP).*

When your robotics program grows, it becomes hard to read: many `if`s, lots of repetition, and constants scattered everywhere. **Functions** help you to:

- group an action: `idleState()`, `raiseAlarm()`
- avoid copying code (the **DRY** principle: **Don't Repeat Yourself**)
- test more easily

These exercises use **Serial** output in the Arduino **IDE** (**Integrated Development Environment**): you can practise in simulation without live robot wiring.

This is lesson **5** of the [Arduino C course](/en/arduino-c/). Previous lessons: [sketch structure](/en/arduino-c-sketch-structure-serial/), [types](/en/arduino-c-types-variables/), [conditions](/en/arduino-c-conditions-sensors/), [loops and timing](/c-arduino-boucles-timing/).

Some links on this page are affiliate links: if you buy through them, we may earn a commission at no extra cost to you. To run the exercises on real hardware, an **Arduino Uno starter kit** (board, USB cable, LEDs, resistors, breadboard) is enough — check today’s price on [Amazon UK](https://www.amazon.co.uk/s?k=arduino+uno+starter+kit&tag=roboteducatif-21) · [Amazon.com](https://www.amazon.com/s?k=arduino+uno+starter+kit&tag=roboteducatif-20). Books on C for Arduino: [Amazon UK](https://www.amazon.co.uk/s?k=arduino+learn+c+programming&tag=roboteducatif-21) · [Amazon.com](https://www.amazon.com/s?k=arduino+learn+c+programming&tag=roboteducatif-20).

## 1) DRY (Don't Repeat Yourself)

**DRY** means **do not repeat the same information** in several places.

Example: if you write `"My message"` twice, you may change one copy and forget the other. In robotics, that creates bugs that are hard to understand.

Good practice: a single source:

```cpp
const char* message = "My message";
```

## 2) Scope

- **global** variable: visible everywhere
- **local** variable: visible only in the block where it is declared
- **parameter**: a value “given” to a function

In robotics, too many globals make the program hard to reason about. Keep globals for the **state** you truly need, and pass the rest as parameters.

## 3) Robotics example (structure)

```text
loop():
  read sensor
  if intrusion -> raiseAlarm()
  else -> idleState()
```

---

## Exercises (20)

### Simple level

**Exercise 1** — Write a function `void idleState()` that prints `IDLE` on Serial. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void idleState() {
  Serial.println("IDLE");
}</code></pre>
</div>
</details>

**Exercise 2** — Write `void raiseAlarm()` that prints `ALERT` and a simulated “beep” (`Serial.println("beep")`). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void raiseAlarm() {
  Serial.println("ALERT");
  Serial.println("beep");
}</code></pre>
</div>
</details>

**Exercise 3** — Call `idleState()` in `setup()` (after `Serial.begin`). <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void idleState() { Serial.println("IDLE"); }
void setup() {
  Serial.begin(9600);
  idleState();
}
void loop() {}</code></pre>
</div>
</details>

**Exercise 4** — DRY: declare `const int DIST_STOP = 15;` and use it in a function `bool isStop(int d)`. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">const int DIST_STOP = 15;
bool isStop(int d) { return d &lt;= DIST_STOP; }</code></pre>
</div>
</details>

**Exercise 5** — Write `int absInt(int v)` (absolute value) and use it for an intrusion threshold. <span class="exo-badge exo-badge--simple">Simple</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int absInt(int v) { return v &lt; 0 ? -v : v; }</code></pre>
</div>
</details>

### Intermediate level

**Exercise 6** — Write `bool intrusion(int ref, int measure, int threshold)` that returns true if `abs(measure-ref) > threshold`. <span class="exo-badge exo-badge--intermediate">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int absInt(int v) { return v &lt; 0 ? -v : v; }
bool intrusion(int ref, int measure, int threshold) {
  return absInt(measure - ref) &gt; threshold;
}</code></pre>
</div>
</details>

**Exercise 7** — Avoid a global: create `void showCounter(int n)` instead of reading `intrusions` directly. <span class="exo-badge exo-badge--intermediate">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void showCounter(int n) {
  Serial.print("intrusions=");
  Serial.println(n);
}</code></pre>
</div>
</details>

**Exercise 8** — Write `void idleState(int intrusionCount)` that prints a different simulated face/text depending on the counter (if 0: OK, else: WARNING). <span class="exo-badge exo-badge--intermediate">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void idleState(int intrusionCount) {
  if (intrusionCount == 0) Serial.println("OK");
  else Serial.println("WARNING");
}</code></pre>
</div>
</details>

**Exercise 9** — Explain in a comment: why passing `intrusionCount` as a parameter can help teaching even if the variable is global. <span class="exo-badge exo-badge--intermediate">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">// Teaching: you see which data the function uses (like f(x));
// good practice: depending less on globals makes code more testable and readable.</code></pre>
</div>
</details>

**Exercise 10** — Write `unsigned long periodFromDistance(int d)` that returns 1000 ms if 35..69, 250 ms if &lt;35, otherwise 100 ms. <span class="exo-badge exo-badge--intermediate">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">unsigned long periodFromDistance(int d) {
  if (d &gt;= 70) return 100;
  if (d &gt;= 35) return 1000;
  return 250;
}</code></pre>
</div>
</details>

### Advanced level

**Exercise 11** — Write `bool every(unsigned long period, unsigned long* last)` (generic timer). <span class="exo-badge exo-badge--advanced">Advanced</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">bool every(unsigned long period, unsigned long* last) {
  unsigned long now = millis();
  if (now - *last &gt;= period) { *last = now; return true; }
  return false;
}</code></pre>
</div>
</details>

**Exercise 12** — Create `int readDistanceFake()` that returns a distance going from 70 down to 0 then back up (simulation). <span class="exo-badge exo-badge--advanced">Advanced</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
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

**Exercise 13** — Write `void radarTick(int distance_cm)` that prints `beep` if distance &lt; 70 (otherwise nothing). <span class="exo-badge exo-badge--advanced">Advanced</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void radarTick(int distance_cm) {
  if (distance_cm &lt; 70) Serial.println("beep");
}</code></pre>
</div>
</details>

**Exercise 14** — Mini architecture: in `loop`, read distance, compute `period`, then if `every(period)` call `radarTick`. <span class="exo-badge exo-badge--advanced">Advanced</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
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

int readDistanceFake() { static int d = 70; d = d - 1; if (d &lt; 0) d = 70; return d; }

void setup() { Serial.begin(9600); }
void loop() {
  int d = readDistanceFake();
  unsigned long p = periodFromDistance(d);
  if (every(p, &amp;last) &amp;&amp; d &lt; 70) Serial.println("beep");
}</code></pre>
</div>
</details>

**Exercise 15** — Write `void logKV(const char* k, int v)` and use it to log `distance`. <span class="exo-badge exo-badge--advanced">Advanced</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void logKV(const char* k, int v) {
  Serial.print(k);
  Serial.print('=');
  Serial.println(v);
}</code></pre>
</div>
</details>

**Exercise 16** — DRY: create `const int THRESHOLD = 3;` and use it in two places (intrusion + alert) without copying the `3`. <span class="exo-badge exo-badge--advanced">Advanced</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">const int THRESHOLD = 3;
int absInt(int v) { return v &lt; 0 ? -v : v; }
bool intrusion(int ref, int measure) { return absInt(measure - ref) &gt; THRESHOLD; }</code></pre>
</div>
</details>

**Exercise 17** — Explain in a comment what “modularity” means. <span class="exo-badge exo-badge--advanced">Advanced</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">// Modularity: split a program into independent, reusable blocks/functions,
// each with a clear responsibility.</code></pre>
</div>
</details>

**Exercise 18** — Create `int speedFromDistance(int d)` that returns 0 if d&lt;=15, 80 if d&gt;=50, otherwise 30. <span class="exo-badge exo-badge--advanced">Advanced</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int speedFromDistance(int d) {
  if (d &lt;= 15) return 0;
  if (d &gt;= 50) return 80;
  return 30;
}</code></pre>
</div>
</details>

**Exercise 19** — Add `void drive(int v)` that simulates sending motor speed (`Serial.println(v)`). <span class="exo-badge exo-badge--advanced">Advanced</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void drive(int v) {
  Serial.print("drive=");
  Serial.println(v);
}</code></pre>
</div>
</details>

**Exercise 20** — Mini project: in `loop`, read a simulated distance, compute speed via `speedFromDistance`, then call `drive(v)` every 200 ms (non-blocking). <span class="exo-badge exo-badge--advanced">Advanced</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
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
int readDistanceFake() { static int d = 70; d = d - 1; if (d &lt; 0) d = 70; return d; }
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

*Author: Emmanuel Sauvage.*
