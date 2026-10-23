---
layout: ../../layouts/EnPost.astro
title: "Arduino C lesson 1: sketch structure, setup() and loop(), Serial Monitor"
description: "Learn how an Arduino sketch is built: setup() runs once, loop() repeats forever, and Serial prints debug messages. Lesson 1 of our Arduino C course, with 12 exercises and solutions."
updated: "23 October 2026"
---

**Arduino C** is C/C++ adapted to microcontrollers. In robotics the idea is simple: your program runs **in a loop** on the board, reads **sensors** and drives **actuators** (LEDs, motors, buzzer). This is lesson 1 of our [Arduino course](/en/arduino/); the code works on any UNO-compatible board, including the one in an [Arduino robot kit](/en/arduino-robot-kit-for-kids/).

In this lesson you will learn:

- the structure of a **sketch** (`setup()` / `loop()`);
- how to check that it compiles;
- how to use **Serial** to debug;
- a few good habits from day one.

> On a Makeblock mBot (mCore board) programmed in Arduino C through mBlock, the logic is the same, with Makeblock's libraries on top.

## 1. Sketch structure: `setup()` and `loop()`

Almost every Arduino sketch contains:

- `setup()`: runs **once** at start-up;
- `loop()`: runs **again and again**.

```text
board starts
  └── setup() (once)
        └── loop() (repeated forever)
```

```cpp
void setup() {
  // runs once
}

void loop() {
  // runs forever
}
```

## 2. Verify and upload

- **Verify / Compile** finds errors without touching the robot.
- **Upload** sends the program to the board.

Make **small changes**, compile often and test step by step. The [Arduino IDE](https://www.arduino.cc/en/software) is free for Windows, macOS and Linux.

## 3. Debugging with `Serial`

`Serial` prints messages to the computer (the Serial Monitor). It is the Arduino equivalent of Python's `print()`.

```cpp
void setup() {
  Serial.begin(9600);
  Serial.println("Hello!");
}

void loop() {
  Serial.println("Running");
  delay(1000);
}
```

- Always call `Serial.begin(...)` in `setup()`, and pick the same speed in the Serial Monitor.
- Don't flood the port: add a `delay(...)` or, later, use `millis()`.

## 4. Good habits from the start

- **Clear names**: `counter`, `distance_cm`, `state`.
- Use `const` for constants: `const int LED_PIN = 13;`
- Avoid "magic numbers" (`9600`, `13`, `1000`) scattered in the code: give them a named constant.

## Exercises (12)

Solutions are hidden: click **Show solution**.

### Easy

**Exercise 1**: Write an empty sketch that compiles: empty `setup()` and `loop()`. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {}
void loop() {}</code></pre>
</div>
</details>

**Exercise 2**: Start `Serial` at 9600 baud in `setup()`. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
}
void loop() {}</code></pre>
</div>
</details>

**Exercise 3**: Print `Hello` once at start-up. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  Serial.println("Hello");
}
void loop() {}</code></pre>
</div>
</details>

**Exercise 4**: Print `Running` every 2 seconds in `loop()`. <span class="exo-badge exo-badge--simple">Easy</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
}
void loop() {
  Serial.println("Running");
  delay(2000);
}</code></pre>
</div>
</details>

### Intermediate

**Exercise 5**: Declare a constant `const int BAUD = 9600;` and use it. <span class="exo-badge exo-badge--intermediate">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">const int BAUD = 9600;

void setup() {
  Serial.begin(BAUD);
}
void loop() {}</code></pre>
</div>
</details>

**Exercise 6**: Create a global `int counter = 0;`, print it every second, then increment it. <span class="exo-badge exo-badge--intermediate">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int counter = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.println(counter);
  counter++;
  delay(1000);
}</code></pre>
</div>
</details>

**Exercise 7**: Print `counter=` followed by the value on the same line. <span class="exo-badge exo-badge--intermediate">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int counter = 0;

void setup() { Serial.begin(9600); }

void loop() {
  Serial.print("counter=");
  Serial.println(counter);
  counter++;
  delay(1000);
}</code></pre>
</div>
</details>

**Exercise 8**: Count from 0 to 9 only, then print `END` and stop (deliberate infinite loop). <span class="exo-badge exo-badge--intermediate">Intermediate</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">int counter = 0;

void setup() { Serial.begin(9600); }

void loop() {
  if (counter &lt;= 9) {
    Serial.println(counter);
    counter++;
    delay(500);
  } else {
    Serial.println("END");
    while (true) {
      // stop
    }
  }
}</code></pre>
</div>
</details>

### Advanced

**Exercise 9**: Print `millis()` (milliseconds since start-up) every second. <span class="exo-badge exo-badge--advanced">Advanced</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
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

**Exercise 10**: Without `delay`, print `READY` once after 3 seconds using `millis()` (hint: store the start time). <span class="exo-badge exo-badge--advanced">Advanced</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">unsigned long t0 = 0;
bool shown = false;

void setup() {
  Serial.begin(9600);
  t0 = millis();
}

void loop() {
  if (!shown &amp;&amp; (millis() - t0 &gt;= 3000)) {
    Serial.println("READY");
    shown = true;
  }
}</code></pre>
</div>
</details>

**Exercise 11**: Write a function `void logValue(const char* name, int v)` that prints `name=v`. <span class="exo-badge exo-badge--advanced">Advanced</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void logValue(const char* name, int v) {
  Serial.print(name);
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

**Exercise 12**: Explain `Serial.print` vs `Serial.println` in a comment, then use both. <span class="exo-badge exo-badge--advanced">Advanced</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Show solution</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-cpp">void setup() {
  Serial.begin(9600);
  // print: no line break
  // println: adds a line break at the end
  Serial.print("A");
  Serial.print("B");
  Serial.println("C"); // end of line here
}
void loop() {}</code></pre>
</div>
</details>

---

Next: [Lesson 2: types, variables and constants](/en/arduino-c-types-variables/) → · [Back to the course](/en/arduino/)
