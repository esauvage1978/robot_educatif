---
layout: ../../layouts/EnPost.astro
title: "Arduino C lesson 2: types, variables and constants"
description: "int, unsigned long, float, bool and const char*: which Arduino type fits speed, distance, time and state. Lesson 2 of the course, 12 solved exercises."
updated: "4 November 2026"
---

> **Quick answer (November 2026)** — Use **`int`** for counters and motor speeds (whole numbers), **`unsigned long`** for anything from **`millis()`** (milliseconds since the board booted), **`float`** only when you need decimals, and **`bool`** for on/off states. If a robot drives backward, you often fix it with a **negative speed**—that is a sign issue, not a new type.

This lesson is part of our [Arduino C course hub](/en/arduino/) (lesson 2 of 14). **Prerequisite:** [Lesson 1 — sketch structure and Serial](/en/arduino-c-sketch-structure-serial/). Parents and teachers: pair it with [programmable robots for kids](/en/best-programmable-robot-for-kids/) once block coding is comfortable.

![Arduino Starter Kit product photo](/images/products/arduino-starter-kit.webp)

<p><em>Arduino Starter Kit — editorial hardware illustration.</em></p>

![Arduino UNO R3 board](/images/models/arduino-uno-r3.webp)

<p><em>Arduino UNO R3 — typical board used in these exercises.</em></p>

## 1. The most useful types

- **`int`**: whole number (counter, speed, threshold). On an UNO it is 16-bit, from −32,768 to 32,767 ([Arduino reference](https://docs.arduino.cc/language-reference/en/variables/data-types/int/)).
- **`unsigned long`**: time from `millis()`, which returns this type.
- **`float`**: decimal number (measurement, average, calculation).
- **`bool`**: true/false (state, flag).
- **`char`**: one character (`'A'`).
- **`const char*`**: constant text, handy for messages.

> Rule of thumb: if you are counting events, it's a whole number, so `int`, not `float`.

## 2. Global vs local variables (scope)

- **Global**: declared outside any function, visible everywhere.
- **Local**: declared inside a function, visible only in that block.

```text
int global;        ← visible in setup() and loop()

void loop() {
  int local;       ← visible only in loop()
}
```

## 3. Constants: no magic numbers

```cpp
const int LED_PIN = 13;
const int BAUD = 9600;
const int DELAY_MS = 100;
```

Give names that say **why** the number exists.

## 4. Common conversions

- `int n = 3; float f = n;` works (3 becomes 3.0).
- `float f = 3.7; int n = (int)f;` truncates (3.7 becomes 3).

For text output, keep numbers as `int` and print them with `Serial.print` rather than building global `String` objects.

## Exercises (12)

Solutions are hidden: click **Show solution**.

### Easy

**Exercise 1**: Declare `int counter = 0;` and increment it in `loop()`. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int counter = 0;
void setup() {}
void loop() { counter++; }</code></pre>
</div>
</details>

**Exercise 2**: Declare `bool alarm = false;` and set it to `true` in `setup()`. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">bool alarm = false;
void setup() { alarm = true; }
void loop() {}</code></pre>
</div>
</details>

**Exercise 3**: Declare `unsigned long t0 = 0;` and store `millis()` in it in `setup()`. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">unsigned long t0 = 0;
void setup() { t0 = millis(); }
void loop() {}</code></pre>
</div>
</details>

**Exercise 4**: Print an `int` and a `float` on one line with `Serial.print`. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
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

### Intermediate

**Exercise 5**: Scope: declare a local `int x` in `loop()` and explain in a comment why `setup()` cannot use it. <span class="exo-badge exo-badge--intermediate">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  // x does not exist here if it is declared in loop()
  // Scope: a local variable is only visible inside its block.
}
void loop() {
  int x = 0;
  x++;
}</code></pre>
</div>
</details>

**Exercise 6**: Declare a text `const char* msg = "OK";` and print it at start-up. <span class="exo-badge exo-badge--intermediate">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">const char* msg = "OK";
void setup() {
  Serial.begin(9600);
  Serial.println(msg);
}
void loop() {}</code></pre>
</div>
</details>

**Exercise 7**: Conversion: with `float d = 12.9;` compute `int n = (int)d;` and print `n` (it should print 12). <span class="exo-badge exo-badge--intermediate">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
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

**Exercise 8**: Write `int clampInt(int v, int minV, int maxV)` that keeps `v` between min and max. <span class="exo-badge exo-badge--intermediate">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int clampInt(int v, int minV, int maxV) {
  if (v &lt; minV) return minV;
  if (v &gt; maxV) return maxV;
  return v;
}</code></pre>
</div>
</details>

### Advanced

**Exercise 9**: Explain in a comment why `millis()` must be stored in an `unsigned long`. <span class="exo-badge exo-badge--advanced">Advanced</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  // millis() returns a large positive number (ms since start-up)
  // unsigned long matches its return type and keeps the full range.
  unsigned long t = millis();
  Serial.begin(9600);
  Serial.println(t);
}
void loop() {}</code></pre>
</div>
</details>

**Exercise 10**: Write `bool isNear(int distanceCm, int threshold)` that returns true if `distanceCm <= threshold`. <span class="exo-badge exo-badge--advanced">Advanced</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">bool isNear(int distanceCm, int threshold) {
  return distanceCm &lt;= threshold;
}</code></pre>
</div>
</details>

**Exercise 11**: `static`: write a function that counts how many times it has been called. <span class="exo-badge exo-badge--advanced">Advanced</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int countCalls() {
  static int c = 0;
  c++;
  return c;
}</code></pre>
</div>
</details>

**Exercise 12**: Mini-project: with `int distance_cm = 42;` print `Distance: 42 cm`. <span class="exo-badge exo-badge--advanced">Advanced</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int distance_cm = 42;
  Serial.print("Distance: ");
  Serial.print(distance_cm);
  Serial.println(" cm");
}
void loop() {}</code></pre>
</div>
</details>

---

← Previous: [Lesson 1: sketch structure and Serial](/en/arduino-c-sketch-structure-serial/) · Next: [Lesson 3: conditions, sensors and actuators](/en/arduino-c-conditions-sensors/) → · [Back to the course](/en/arduino/)

## FAQ

**What type for an ultrasonic distance in cm?**  
Usually **`int distance_cm`** — ultrasonic modules return whole centimetres in most classroom sketches.

**Why not store everything in `float`?**  
It works for small programs, but **`int`** is clearer for counters and saves RAM on an **UNO** (the common Arduino board with 2 KB SRAM).

**Where does this fit in the full course?**  
After [lesson 1](/en/arduino-c-sketch-structure-serial/) (Serial monitor) and before [lesson 3](/en/arduino-c-conditions-sensors/) (if/else and sensors). See also [Arduino robot kit for kids](/en/arduino-robot-kit-for-kids/) for hardware that matches these lessons.
