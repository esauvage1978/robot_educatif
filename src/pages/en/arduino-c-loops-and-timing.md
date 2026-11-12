---
layout: ../../layouts/EnPost.astro
title: "Arduino C: loops and timing (delay vs millis)"
description: "Arduino for and while loops, counters, and timing: delay blocks the robot, millis does not. Twenty corrected exercises on beeps, sensors and cadence."
updated: "2 November 2026"
faqSchema:
  - question: "Why is delay() a problem on a robot?"
    answer: "delay() is simple, but it blocks the whole program. A robot that runs delay(5000) cannot read its sensors for five seconds, so it cannot react to an obstacle. A while loop inside loop() can keep rereading sensors."
  - question: "How does millis() time an action without blocking?"
    answer: "Store last, the previous instant, and act when now - last is at least the period. loop() keeps running between ticks, so a blink or a beep can happen while buttons are still read."
---

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/en/arduino-c/">Arduino C</a> · Lesson 4 — loops and timing</nav>

> **Direct answer (November 2026)** — In robotics, a **`while`** loop inside **`loop()`** rereads the sensors continuously; **`delay()`** is simple but **blocks** the whole program; **`millis()`** lets a blink or a beep happen **without** freezing the reading of the buttons.

![mBot / Arduino setup for timing exercises](/images/products/mbot.webp)

## Hardware and software you need

- An **Arduino UNO** board or an **mBot** robot (an Arduino-compatible board).
- A **USB** cable, and **Arduino IDE 2.x** installed.
- Lessons already seen: [sketch structure](/en/arduino-c-sketch-structure-serial/) and [sensor conditions](/en/arduino-c-conditions-sensors/) in the [Arduino C track](/en/arduino-c/).

In robotics, loops are used to:

- measure continuously (`distance_cm = lireCapteur();`),
- retry until a condition (wait for a button),
- produce a cadence (beeps, blinking).

Be careful: a robot that runs `delay(5000)` can no longer react for 5 seconds. That is why `millis()` is useful for **non-blocking timing**.

The logical next step in the Arduino C series: [lesson 5 — functions and modularity](/en/arduino-c-functions-best-practices/).

## 1) `for`: when you know the number of turns

```cpp
for (int i = 0; i < 5; i++) {
  Serial.println(i);
}
```

## 2) `while`: as long as

```cpp
int n = 3;
while (n > 0) {
  Serial.println(n);
  n--;
}
```

## 3) Timing

### `delay(ms)` (simple but blocking)

```cpp
Serial.println("beep");
delay(1000);
```

### `millis()` (non-blocking)

The idea:

- store `last` (the previous instant),
- act if `now - last >= periode`.

---

## Exercises (20)

### Easy

**Exercise 1** — Print 0 through 9 with a `for` loop. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  for (int i = 0; i &lt; 10; i++) Serial.println(i);
}
void loop() {}</code></pre>
</div>
</details>

**Exercise 2** — Print a dot `.` 5 times with `for`, with `delay(200)` between each one. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  for (int i = 0; i &lt; 5; i++) {
    Serial.print('.');
    delay(200);
  }
  Serial.println();
}
void loop() {}</code></pre>
</div>
</details>

**Exercise 3** — Sum: compute the sum 1..20 with a `for` and print it. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int total = 0;
  for (int i = 1; i &lt;= 20; i++) total += i;
  Serial.println(total);
}
void loop() {}</code></pre>
</div>
</details>

**Exercise 4** — `while`: count down from 5 to 1. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int n = 5;
  while (n &gt; 0) {
    Serial.println(n);
    n--;
  }
}
void loop() {}</code></pre>
</div>
</details>

**Exercise 5** — `delay`: print `tick` every 500 ms in `loop()`. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() { Serial.begin(9600); }
void loop() {
  Serial.println("tick");
  delay(500);
}</code></pre>
</div>
</details>

### Intermediate

**Exercise 6** — Stepped radar: if `d >= 70` do nothing, otherwise print `beep` then `delay(1000)` if `d >= 35`, otherwise `delay(250)`. (Serial only.) <span class="exo-badge exo-badge--intermediate">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() { Serial.begin(9600); }
void loop() {
  int d = 50; // test
  if (d &gt;= 70) {
    delay(100);
  } else if (d &gt;= 35) {
    Serial.println("beep");
    delay(1000);
  } else {
    Serial.println("beep");
    delay(250);
  }
}</code></pre>
</div>
</details>

**Exercise 7** — Avoid blocking for 3 seconds: print `READY` after 3 s using `millis()` (no `delay`). <span class="exo-badge exo-badge--intermediate">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">unsigned long t0 = 0;
bool done = false;

void setup() {
  Serial.begin(9600);
  t0 = millis();
}

void loop() {
  if (!done &amp;&amp; (millis() - t0 &gt;= 3000)) {
    Serial.println("READY");
    done = true;
  }
}</code></pre>
</div>
</details>

**Exercise 8** — Non-blocking cadence: print `beep` every 1000 ms with `millis()` and `last`. <span class="exo-badge exo-badge--intermediate">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">const unsigned long PERIOD = 1000;
unsigned long last = 0;

void setup() { Serial.begin(9600); }
void loop() {
  unsigned long now = millis();
  if (now - last &gt;= PERIOD) {
    Serial.println("beep");
    last = now;
  }
}</code></pre>
</div>
</details>

**Exercise 9** — Two cadences: print `A` every 1000 ms and `B` every 250 ms (two timers). <span class="exo-badge exo-badge--intermediate">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">unsigned long lastA = 0;
unsigned long lastB = 0;
const unsigned long PA = 1000;
const unsigned long PB = 250;

void setup() { Serial.begin(9600); }
void loop() {
  unsigned long now = millis();
  if (now - lastA &gt;= PA) { Serial.print('A'); lastA = now; }
  if (now - lastB &gt;= PB) { Serial.print('B'); lastB = now; }
}</code></pre>
</div>
</details>

**Exercise 10** — A "sensor reading" loop: simulate a changing `distance_cm` and print it every 200 ms (non-blocking). <span class="exo-badge exo-badge--intermediate">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">unsigned long last = 0;
const unsigned long PERIOD = 200;
int distance_cm = 70;

void setup() { Serial.begin(9600); }
void loop() {
  unsigned long now = millis();
  if (now - last &gt;= PERIOD) {
    Serial.println(distance_cm);
    distance_cm--;           // simulation
    if (distance_cm &lt; 0) distance_cm = 70;
    last = now;
  }
}</code></pre>
</div>
</details>

### Advanced

**Exercise 11** — Write a function `bool every(unsigned long period, unsigned long* last)` that returns true when it is time (a generic timer). <span class="exo-badge exo-badge--advanced">Advanced</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">bool every(unsigned long period, unsigned long* last) {
  unsigned long now = millis();
  if (now - *last &gt;= period) {
    *last = now;
    return true;
  }
  return false;
}</code></pre>
</div>
</details>

**Exercise 12** — Use `every` to print `.` every 100 ms. <span class="exo-badge exo-badge--advanced">Advanced</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">unsigned long last = 0;
bool every(unsigned long period, unsigned long* last) {
  unsigned long now = millis();
  if (now - *last &gt;= period) { *last = now; return true; }
  return false;
}
void setup() { Serial.begin(9600); }
void loop() {
  if (every(100, &amp;last)) Serial.print('.');
}</code></pre>
</div>
</details>

**Exercise 13** — Convert the stepped radar to non-blocking (a single beep on each tick). <span class="exo-badge exo-badge--advanced">Advanced</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">unsigned long last = 0;
void setup() { Serial.begin(9600); }
void loop() {
  int d = 30; // test
  unsigned long period = 100;
  if (d &gt;= 70) period = 100;
  else if (d &gt;= 35) period = 1000;
  else period = 250;

  unsigned long now = millis();
  if (now - last &gt;= period) {
    if (d &lt; 70) Serial.println("beep");
    last = now;
  }
}</code></pre>
</div>
</details>

**Exercise 14** — Write a `for` with a step of 2 (0, 2, 4, 6, 8). <span class="exo-badge exo-badge--advanced">Advanced</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  for (int i = 0; i &lt; 10; i += 2) Serial.println(i);
}
void loop() {}</code></pre>
</div>
</details>

**Exercise 15** — `while(true)` + `break`: find the first multiple of 7 between 1 and 100 and print it. <span class="exo-badge exo-badge--advanced">Advanced</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int n = 1;
  while (true) {
    if (n % 7 == 0) { Serial.println(n); break; }
    n++;
  }
}
void loop() {}</code></pre>
</div>
</details>

**Exercise 16** — Explain (in a comment) why `delay(5000)` is dangerous for a robot that must react. <span class="exo-badge exo-badge--advanced">Advanced</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  // delay blocks the loop: for 5 s, the robot no longer reads the sensors
  // => it cannot react to an obstacle.
}
void loop() {}</code></pre>
</div>
</details>

**Exercise 17** — Write an `unsigned long period;` that depends on the distance (0..70) with a simple rule (for example `period = d * 50`). <span class="exo-badge exo-badge--advanced">Advanced</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  int d = 20;
  unsigned long period = (unsigned long)d * 50;
  Serial.println(period);
}
void loop() {}</code></pre>
</div>
</details>

**Exercise 18** — Fix the rule from exercise 17 so it never goes to 0 ms (for example a minimum of 50 ms). <span class="exo-badge exo-badge--advanced">Advanced</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">unsigned long clampUL(unsigned long v, unsigned long minV) {
  return v &lt; minV ? minV : v;
}
void setup() {
  Serial.begin(9600);
  int d = 0;
  unsigned long period = (unsigned long)d * 50;
  period = clampUL(period, 50);
  Serial.println(period);
}
void loop() {}</code></pre>
</div>
</details>

**Exercise 19** — Mini-project: print `distance=...` every 100 ms, and `ALERT` if the distance is &lt;= 15 (non-blocking). <span class="exo-badge exo-badge--advanced">Advanced</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">unsigned long last = 0;
const unsigned long PERIOD = 100;
int distance_cm = 20;

void setup() { Serial.begin(9600); }
void loop() {
  unsigned long now = millis();
  if (now - last &gt;= PERIOD) {
    Serial.print("distance=");
    Serial.println(distance_cm);
    if (distance_cm &lt;= 15) Serial.println("ALERT");
    last = now;
    distance_cm--;
    if (distance_cm &lt; 0) distance_cm = 20;
  }
}</code></pre>
</div>
</details>

**Exercise 20** — Mini-project: "virtually" blink an LED: print `LED ON` then `LED OFF` every 500 ms without `delay` (with `millis`). <span class="exo-badge exo-badge--advanced">Advanced</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">unsigned long last = 0;
bool on = false;

void setup() { Serial.begin(9600); }
void loop() {
  unsigned long now = millis();
  if (now - last &gt;= 500) {
    on = !on;
    Serial.println(on ? "LED ON" : "LED OFF");
    last = now;
  }
}</code></pre>
</div>
</details>
