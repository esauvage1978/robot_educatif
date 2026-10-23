---
layout: ../../layouts/EnPost.astro
title: "Arduino C lesson 3: if/else conditions for sensors and actuators"
description: "Comparisons, AND/OR/NOT and else if: write the rules that make a robot stop, slow down or beep from a distance reading. Lesson 3 of our Arduino C course, 12 exercises with solutions."
updated: "23 October 2026"
---

**Conditions** (`if`, `else if`, `else`) decide what to do based on the state of the world: measured distance, button pressed, low light. This is lesson 3 of our [Arduino course](/en/arduino/).

In robotics you constantly write rules like:

```text
IF distance <= 15 cm → STOP
ELSE → MOVE FORWARD
```

## 1. Comparisons

- `==` equal (careful: **two** `=` signs in C)
- `!=` not equal
- `<`, `>`, `<=`, `>=`

## 2. Combining conditions

- `&&`: AND
- `||`: OR
- `!`: NOT

```cpp
if (distance_cm <= 15 && speed > 0) {
  // obstacle close and robot moving
}
```

## 3. Readable `if` statements

- use **constants**: `const int DIST_STOP = 15;`
- avoid deep "pyramids" of nested `if`: split into functions;
- name boolean helpers like questions: `isNear`, `isPressed`.

On a real robot the distance usually comes from an ultrasonic sensor such as the HC-SR04 found in most [Arduino car kits](/en/arduino-robot-kit-for-kids/).

## Exercises (12)

If you don't have a sensor at hand, **simulate** a reading:

```cpp
int distance_cm = 42; // test value
```

### Easy

**Exercise 1**: With `int distance_cm = 12;` print `STOP` if `distance_cm <= 15`, otherwise `GO`. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int distance_cm = 12;
  if (distance_cm &lt;= 15) Serial.println("STOP");
  else Serial.println("GO");
}
void loop() {}</code></pre>
</div>
</details>

**Exercise 2**: Create `const int DIST_WARN = 35;` and print `WARN` if `distance_cm <= DIST_WARN`. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">const int DIST_WARN = 35;
void setup() {
  Serial.begin(9600);
  int distance_cm = 30;
  if (distance_cm &lt;= DIST_WARN) Serial.println("WARN");
}
void loop() {}</code></pre>
</div>
</details>

**Exercise 3**: Three zones: `d >= 70` prints `SILENT`, `d >= 35` prints `SLOW BEEP`, otherwise `FAST BEEP`. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int d = 50;
  if (d &gt;= 70) Serial.println("SILENT");
  else if (d &gt;= 35) Serial.println("SLOW BEEP");
  else Serial.println("FAST BEEP");
}
void loop() {}</code></pre>
</div>
</details>

**Exercise 4**: With `bool pressed = true;` print `CLICK` if `pressed` is true. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  bool pressed = true;
  if (pressed) Serial.println("CLICK");
}
void loop() {}</code></pre>
</div>
</details>

### Intermediate

**Exercise 5**: Noisy sensor: treat it as an intrusion only if `abs(reading - reference) > 3` (write `int absInt(int v)`). <span class="exo-badge exo-badge--intermediate">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int absInt(int v) { return v &lt; 0 ? -v : v; }

void setup() {
  Serial.begin(9600);
  int reference = 40;
  int reading = 44;
  if (absInt(reading - reference) &gt; 3) Serial.println("INTRUSION");
  else Serial.println("OK");
}
void loop() {}</code></pre>
</div>
</details>

**Exercise 6**: AND: print `DANGER` if `distance <= 15` AND `speed > 0`. <span class="exo-badge exo-badge--intermediate">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int distance = 12;
  int speed = 80;
  if (distance &lt;= 15 &amp;&amp; speed &gt; 0) Serial.println("DANGER");
}
void loop() {}</code></pre>
</div>
</details>

**Exercise 7**: OR: print `ALERT` if `distance <= 15` OR `soundDetected` is true. <span class="exo-badge exo-badge--intermediate">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int distance = 50;
  bool soundDetected = true;
  if (distance &lt;= 15 || soundDetected) Serial.println("ALERT");
}
void loop() {}</code></pre>
</div>
</details>

**Exercise 8**: With `int speed = 80;`, set `speed = 30` if `distance <= 50`, then print the speed. <span class="exo-badge exo-badge--intermediate">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int distance = 40;
  int speed = 80;
  if (distance &lt;= 50) speed = 30;
  Serial.println(speed);
}
void loop() {}</code></pre>
</div>
</details>

### Advanced

**Exercise 9**: Write `int radarZone(int d)` returning 0, 1 or 2 (silent, slow, fast), then print the matching text. <span class="exo-badge exo-badge--advanced">Advanced</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int radarZone(int d) {
  if (d &gt;= 70) return 0;
  if (d &gt;= 35) return 1;
  return 2;
}

void setup() {
  Serial.begin(9600);
  int z = radarZone(20);
  if (z == 0) Serial.println("SILENT");
  else if (z == 1) Serial.println("SLOW BEEP");
  else Serial.println("FAST BEEP");
}
void loop() {}</code></pre>
</div>
</details>

**Exercise 10**: Range check: print `OK` if `d` is between 35 and 70 inclusive. <span class="exo-badge exo-badge--advanced">Advanced</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int d = 50;
  if (d &gt;= 35 &amp;&amp; d &lt;= 70) Serial.println("OK");
}
void loop() {}</code></pre>
</div>
</details>

**Exercise 11**: Explain `=` vs `==` in a comment, then write a correct test. <span class="exo-badge exo-badge--advanced">Advanced</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int mode = 2;
  // = assigns a value; == compares two values
  if (mode == 2) Serial.println("MODE 2");
}
void loop() {}</code></pre>
</div>
</details>

**Exercise 12**: Mini-project, slow-down rule: if `distance <= 50` then `speed = 40`, otherwise `speed = 80`. Print `speed`. <span class="exo-badge exo-badge--advanced">Advanced</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int distance = 60;
  int speed = 0;
  if (distance &lt;= 50) speed = 40;
  else speed = 80;
  Serial.println(speed);
}
void loop() {}</code></pre>
</div>
</details>

---

← Previous: [Lesson 2: types, variables and constants](/en/arduino-c-types-variables/) · [Back to the course](/en/arduino/)
