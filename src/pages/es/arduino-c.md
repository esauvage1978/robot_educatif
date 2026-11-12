---
layout: ../../layouts/EsPost.astro
title: "Aprender Arduino C — recorrido de robótica para principiantes"
description: "Aprender Arduino C paso a paso: setup y loop, tipos, condiciones, bucles y funciones. Curso gratuito con ejercicios para robótica educativa."
updated: "31 de octubre de 2026"
faqSchema:
  - question: "¿Qué es Arduino C?"
    answer: "Arduino C designa el C/C++ simplificado usado para programar una placa Arduino. Cada programa (sketch) tiene setup() una vez y luego loop() sin parar."
  - question: "¿Cómo aprender Arduino desde cero?"
    answer: "Sigue este recorrido en orden: estructura del sketch, tipos y variables, condiciones con sensores, bucles y timing, luego funciones. Cada lección incluye código y ejercicios."
  - question: "¿Necesito saber ya el lenguaje C?"
    answer: "No. Este recorrido parte de cero y explica setup, loop, los tipos básicos y la lectura de sensores antes de llegar a las funciones."
---

Algunos enlaces de esta página son de afiliados. Si compras a través de ellos, podemos recibir una comisión sin coste adicional para ti. Comprueba el precio del día en la ficha del producto.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Aprender Arduino C — recorrido de robótica para principiantes",
  "description": "Curso gratuito de Arduino C: estructura setup/loop, tipos, condiciones, bucles y funciones, con ejercicios de robótica.",
  "url": "https://robot-educatif.info/es/arduino-c/",
  "inLanguage": "es",
  "isAccessibleForFree": true,
  "provider": { "@type": "Organization", "name": "Robot Éducatif", "sameAs": "https://robot-educatif.info/" },
  "hasCourseInstance": { "@type": "CourseInstance", "courseMode": "online", "inLanguage": "es" }
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Lecciones del recorrido Arduino C",
  "numberOfItems": 5,
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Estructura del sketch, setup/loop, Serial", "url": "https://robot-educatif.info/en/arduino-c-sketch-structure-serial/" },
    { "@type": "ListItem", "position": 2, "name": "Tipos y variables", "url": "https://robot-educatif.info/en/arduino-c-types-variables/" },
    { "@type": "ListItem", "position": 3, "name": "Condiciones, sensores y actuadores", "url": "https://robot-educatif.info/en/arduino-c-conditions-sensors/" },
    { "@type": "ListItem", "position": 4, "name": "Bucles y timing", "url": "https://robot-educatif.info/c-arduino-boucles-timing/" },
    { "@type": "ListItem", "position": 5, "name": "Funciones, modularidad, buenas prácticas", "url": "https://robot-educatif.info/es/arduino-c-funciones-buenas-practicas/" }
  ]
}
</script>

![Placa Arduino Uno vista en tres cuartos — la placa azul más habitual para programar en Arduino C](/images/lot2/arduino-uno-perspective.webp)

*La placa Arduino Uno, el modelo más habitual para empezar. Ejecuta tu programa `setup()` / `loop()`. Foto: Creative Tools — [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) — [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Arduino-uno-perspective.jpg) (redimensionada / WebP).*

> **En una frase.** El llamado «lenguaje Arduino» es **C/C++** simplificado para placas con microcontrolador: cada programa (un **sketch**, archivo `.ino`) contiene **`setup()`** (preparación, una vez) y **`loop()`** (después se repite sin parar). El entorno oficial compila con **avr-gcc** (el compilador incluido en el IDE Arduino) y envía el programa por USB. Primera lección: [estructura del sketch](/en/arduino-c-sketch-structure-serial/).

Quieres aprender Arduino para hacer parpadear un LED, leer un sensor o pilotar un pequeño robot, pero muchos tutoriales saltan demasiado. Este recorrido gratuito te guía lección a lección: estructura del sketch, tipos de variables, condiciones, bucles y luego funciones. Cada página propone código para escribir, ejercicios y los errores más frecuentes.

Recursos complementarios en [Amazon.es](https://www.amazon.es/s?k=arduino+aprender+c+programacion&tag=roboteducat07-21) (afiliado).

## C estándar vs lenguaje Arduino — ¿cuál es la diferencia?

En un curso de C en el PC se escribe a menudo una función **`main()`**. En Arduino no escribes **`main()`** tú: el IDE genera una que llama primero a tu **`setup()`** y luego repite **`loop()`**. Controlas los pines con **`pinMode`**, **`digitalWrite`**, **`digitalRead`** y **`analogRead`**.

![Esquema del ciclo Arduino: setup una vez, luego loop que lee sensores y comanda salidas](/images/lot2/arduino-setup-loop-cycle.svg)

*Al arrancar: `setup()` una vez. Después `loop()` lee entradas (sensores), comanda salidas (LED, motores) y vuelve a empezar.*

## Compilación y carga (pasos)

1. Abre o crea un sketch (`.ino`) en el IDE Arduino.
2. Selecciona la **placa** (por ejemplo Uno) y el **puerto serie** (`COM` en Windows, `/dev/ttyUSB*` en Linux).
3. Pulsa **Verificar** para compilar. Corrige errores de sintaxis (punto y coma, tipos).
4. Pulsa **Cargar** y espera «Done uploading» / «Carga completada».

## Errores frecuentes de compilación y carga

| Mensaje / síntoma | Qué probar |
|---|---|
| `stk500_getsync()` | Puerto incorrecto, cable USB solo de carga, placa no seleccionada, otro programa que bloquea el puerto |
| Puerto serie ausente | Instalar el controlador USB (a menudo CH340/CH341 o FTDI en placas clónicas) |
| `expected ';' before …` | Falta el punto y coma al final de una línea C |
| Tipos / conversión | Mezclar `int` y `float` — ver [tipos y variables](/en/arduino-c-types-variables/) |

## Ejemplo mínimo comentado

```cpp
const int LED = 13;

void setup() {
  pinMode(LED, OUTPUT);  // pin 13 como salida
}

void loop() {
  digitalWrite(LED, HIGH);  // encender
  delay(500);               // esperar 500 ms
  digitalWrite(LED, LOW);   // apagar
  delay(500);
}
```

Resultado esperado: el LED integrado parpadea unas dos veces por segundo. Si no pasa nada, comprueba primero la carga y la selección de placa.

## Lecciones del recorrido

Sigue el orden: cada lección se apoya en la anterior.

| # | Lección | Qué aprendes |
|---|---|---|
| 1 | [Estructura del sketch, setup/loop, Serial](/en/arduino-c-sketch-structure-serial/) | Cómo corre un sketch, Serial Monitor, primeros hábitos |
| 2 | [Tipos y variables](/en/arduino-c-types-variables/) | `int`, `float`, `bool`, `const`, alcance |
| 3 | [Condiciones, sensores y actuadores](/en/arduino-c-conditions-sensors/) | `if`/`else`, umbrales, `digitalRead` / `analogRead` |
| 4 | [Bucles y timing](/c-arduino-boucles-timing/) | `for`/`while`, `delay` vs `millis()` |
| 5 | [Funciones, modularidad, buenas prácticas](/es/arduino-c-funciones-buenas-practicas/) | DRY, parámetros, ayudantes reutilizables |

Después de Arduino, casa conectada: [Domótica: cómo empezar](/es/domotica/como-empezar/). Todos los recorridos de programación del sitio: [hub Programación](/programmation/).

## ¿Por qué aprender Arduino C para robótica?

Los programas robóticos crecen deprisa: sensores, umbrales, motores, timing. Empezando por una **estructura de sketch** clara, luego **tipos**, **condiciones**, **bucles** y **funciones**, evitas el código enredado y depuras más rápido con el Serial Monitor.

Progresión típica tras el ejemplo blink:

1. Leer un botón digital o un sensor de línea.
2. Accionar un motor o un LED cuando se cruza un umbral.
3. Sustituir `delay()` bloqueante por `millis()` para que el robot siga reaccionando.
4. Dividir comportamientos en funciones con nombre.

## Lista de comprobación antes de la primera carga

- Cable USB de **datos** (no solo carga).
- **Placa** correcta seleccionada en el IDE (UNO, Mega, Nano…).
- **Puerto** correcto visible tras conectar.
- El sketch compila con **Verificar** antes de Cargar.
- La velocidad del Monitor Serie coincide con `Serial.begin(...)`.

## FAQ

<details>
<summary>¿Qué es Arduino C?</summary>

Es el nombre habitual del C/C++ adaptado a las placas Arduino. Escribes un sketch con `setup()` y `loop()`; el IDE compila y lo carga en la placa.
</details>

<details>
<summary>¿Cómo aprender Arduino desde cero?</summary>

Sigue este recorrido en orden con una placa Uno (o compatible) y un cable USB de datos. Avanza solo cuando el ejemplo de la lección actual compile y funcione.
</details>

<details>
<summary>¿Necesito saber ya el lenguaje C?</summary>

No. Las bases útiles (tipos, condiciones, bucles, funciones) se introducen a lo largo del recorrido, con ejemplos de robótica concretos.
</details>

*Autor: Emmanuel Sauvage.*
