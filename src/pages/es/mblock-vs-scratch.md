---
layout: ../../layouts/EsPost.astro
title: "mBlock o Scratch: ¿cuál elegir para empezar?"
description: "¿Solo Scratch o mBlock con un robot Makeblock? Diferencias, edad recomendada y cuándo pasar de uno a otro."
updated: "2026-11-06"
---

Esta página compara Scratch y mBlock como lenguajes y entornos. No es la página para descargar o abrir el IDE. Para eso usa [mBlock en línea (ide.mblock.cc)](/es/mblock-online-sin-instalar/), [descargar mBlock 5](/es/descargar-mblock-5-gratis/) o el [comparativo de software Makeblock](/es/software-mblock-cual-elegir/). Scratch en línea basta si no hay robot. mBlock añade los bloques Makeblock, incluido el mBot.

Los dos son entornos de programación por bloques, pensados para niños y principiantes. Scratch sirve para inventar un juego, una animación o una historia en el ordenador. mBlock toma la misma lógica y la envía a un robot o a una placa. La elección depende del contexto: colegio, casa o robótica.

## Resumen rápido: mBlock vs Scratch

| Criterio | Scratch | mBlock |
|---------|---------|--------|
| **Uso principal** | Videojuegos, animaciones, historias | Robótica, IoT (internet de las cosas), proyectos electrónicos |
| **Hardware** | 100 % software (solo ordenador) | Compatible con robots (mBot, Arduino, micro:bit…) |
| **Edad objetivo** | 6–14 años | 8–16 años |
| **Comunidad** | Muy amplia (proyectos públicos en scratch.mit.edu) | Media, ligada a los robots Makeblock |
| **Gratis** | Sí, por completo | Sí, cuenta opcional |
| **En línea** | Sí, scratch.mit.edu | Sí, ide.mblock.cc |
| **Aplicación** | Sí: Windows, Mac, Linux, tabletas | Sí: Windows, Mac, Linux, iOS, Android |
| **Exportar código** | No, solo bloques | Sí: Arduino C y Python |
| **Siguiente lenguaje** | Python, JavaScript | Arduino C, Python |

En una frase: Scratch crea juegos y animaciones en el ordenador, y mBlock programa robots y objetos conectados.

## ¿Qué es Scratch?

![Logo Scratch](/images/logos/scratch-logo.svg)

Scratch es un lenguaje de programación visual creado por el MIT (Massachusetts Institute of Technology) en 2007. El niño apila bloques de código de colores para construir un juego, una animación o una historia interactiva.

Se empieza en el navegador, sin una instalación complicada. La comunidad es muy amplia, los proyectos públicos de scratch.mit.edu se pueden abrir y modificar. Hay tutoriales, cursos en línea y libros en muchos idiomas. Basta un ordenador, lo que encaja en el colegio. Los proyectos habituales son juegos de plataformas, cuestionarios e historias animadas.

Los límites van en el mismo sentido. El programa se queda en la pantalla: Scratch, de serie, no se conecta a un robot ni a un sensor físico. No hay un paso integrado de los bloques al código de texto, y un proyecto no se convierte en una aplicación exportada. Los juegos complejos chocan bastante pronto con el rendimiento.

Scratch encaja de los 6 a los 12 años, cuando se descubre la programación, y sigue siendo útil hasta unos 14. Es la herramienta de primaria cuando el proyecto es una historia, un juego o una animación y bastan un ordenador o una tableta. El punto de partida está en [Scratch en el colegio y en casa](/es/scratch-escuela-casa-empezar/).

## ¿Qué es mBlock?

![Logo mBlock](/images/logos/mblock-logo.svg)

mBlock es el entorno de Makeblock, empresa china de robótica educativa. Se basa en Scratch, con bloques de más para manejar robots físicos: mBot, Arduino, micro:bit y otras placas.

Habla con los robots Makeblock (mBot, mBot2), con Arduino, con el micro:bit y con CyberPi. Los bloques se pueden exportar a Arduino C o a Python, así que el paso al texto se ve. Los proyectos pueden usar Wi-Fi, Bluetooth y sensores conectados. El programa es gratis en Windows, Mac, Linux, iOS y Android. Hay dos modos a la vez: «En directo» prueba mientras el robot sigue unido al ordenador, y «Cargar» copia el programa en el robot para que funcione solo.

La comunidad es más pequeña que la de Scratch y hay menos proyectos compartidos. La documentación está a veces en inglés, con menos recursos locales. Para usar mBlock entero hace falta hardware. La instalación puede atascarse: controladores, Bluetooth, cable USB.

mBlock va dirigido a los 8-16 años que quieren programar un objeto que se mueve. En secundaria, en tecnología o en un club de robótica, sirve para robots, sensores, LED y motores, y prepara la programación embebida en Arduino. Para instalar y empezar: [Instalar mBlock 5 en Windows](/es/instalar-mblock-5-windows/), [Primeros pasos con mBlock 5](/es/primeros-pasos-mblock-5/), [mBot: mi primer robot educativo](/es/mbot-mi-primer-robot-educativo/) y [Robot programable con Scratch: ¿cuál elegir?](/robot-programmable-scratch-lequel-choisir/).

## Comparación detallada

### 1. Interfaz y primeros pasos

Scratch es limpio y colorido. La paleta de bloques queda a la izquierda, el escenario en el centro y el código a la derecha. Un primer programa lleva unos cinco minutos.

mBlock copia esa disposición a propósito. La paleta sigue ahí, y las extensiones de hardware colocan el robot junto a los sprites. Cuenta de diez a quince minutos, porque todavía hay que conectar el robot.

Scratch es el comienzo más simple. mBlock pide una fase de instalación.

### 2. Proyectos posibles

Con Scratch se hacen juegos (plataformas, laberinto, cuestionario), animaciones y dibujos animados, simulaciones como un sistema solar o un ecosistema, y arte generativo (fractales, espirógrafos).

Con mBlock el programa sale de la pantalla: robot seguidor de línea, evasión de obstáculos, detector de intrusión, matriz de LED, o un pequeño proyecto conectado (temperatura, meteorología, domótica). El IoT, el internet de las cosas, es eso: objetos que intercambian datos por la red.

Son dos universos. Se elige según el objetivo, virtual o físico.

### 3. Aprendizaje de la programación

Scratch cubre las ideas de base: bucles, condiciones, variables, eventos. La lógica se ve sin la distracción del hardware, y los niños inventan sus propias reglas. El paso posterior a Python o JavaScript no lo prepara la herramienta: te quedas en los bloques.

mBlock retoma esos conceptos y añade sensores y actuadores. La exportación muestra cómo un bloque se convierte en C o en Python. El código maneja un objeto real, y el siguiente paso natural es Arduino C o Python.

mBlock prepara mejor una programación más técnica.

### 4. Hardware necesario

Scratch pide un ordenador o una tableta con navegador, conexión a internet o la versión sin conexión, y nada más.

mBlock pide un ordenador Windows, Mac o Linux, un cable USB (a veces Bluetooth) y pilas o una alimentación. El robot más directo es el Makeblock mBot: 89,99 € en Amazon.es, consulta del 6 de noviembre de 2026. Una placa Arduino o un micro:bit pueden sustituir al robot completo. Consulta el precio: esta lectura no da un importe actual para esas placas. Scratch no cuesta nada en hardware. mBlock supone comprar un robot o una placa.

### 5. Recursos y comunidad

Scratch publica los proyectos en scratch.mit.edu: se pueden consultar y modificar. Los foros están activos, el soporte viene del MIT, y hay libros, cursos y MOOC en muchos idiomas.

mBlock sigue ligado a los productos Makeblock. Hay tutoriales oficiales, de calidad desigual. Los foros son menos activos que los de Arduino o Scratch. Como recurso local quedan sobre todo este sitio y algunos canales de YouTube.

En tamaño de comunidad, Scratch va muy por delante.

### 6. Evolución y vida útil

Scratch acompaña más o menos de los 6 a los 14 años. Después, los pasos habituales son Python con pygame o JavaScript con p5.js. Los proyectos siguen accesibles en línea.

mBlock cubre más bien de los 8 a los 16 años, y luego Arduino C o Python. Los proyectos se guardan en local con el formato .mblock, o en la nube.

Gracias a la exportación de código, mBlock dura más.

## Casos de uso: ¿cuándo elegir qué?

Scratch es el primer contacto adecuado entre los 6 y los 8 años, sobre todo si no hay presupuesto para hardware. Encaja en una primaria con ordenadores y sin robots, cuando la prioridad es un juego, una historia o las artes visuales y no hay un paso siguiente hacia la robótica. Una clase de 4.º o 5.º que descubre los algoritmos es exactamente ese caso.

mBlock se impone cuando el robot ya está, o se va a comprar, en general desde los 8 años, cuando un proyecto físico es realista. Es la herramienta de secundaria y del club de robótica, de la preparación para Arduino y de los sensores conectados o la domótica. Una clase de 1.º de ESO en tecnología con mBot es el ejemplo típico.

Los dos se suceden bien. Se empieza con Scratch hacia los 6-8 años, el tiempo de aprender la lógica durante uno o dos años. Hacia los 8-10 años, mBlock reutiliza esas bases en un robot, otro año o dos. Desde los 12 años, Arduino C o Python pasan al código de texto.

## Diferencias técnicas

### Bloques disponibles

Scratch ofrece el movimiento de los sprites, la apariencia (disfraces, bocadillos, efectos), el sonido (notas y grabaciones), los eventos (clics y teclas), el control (bucles y condiciones), los sensores del ratón, el micrófono y el reloj, los operadores matemáticos, lógicos y de texto, y después las variables y las listas.

mBlock conserva todos esos bloques. Añade motores (avanzar, retroceder, velocidad), sensores (ultrasonidos, línea, luz, temperatura), actuadores (LED RGB, zumbador, servomotores), comunicación (Bluetooth, Wi-Fi, serie) y extensiones para Arduino, micro:bit, CyberPi e IA.

### Modos de ejecución

Scratch se ejecuta en línea, en tiempo real en el navegador. La aplicación sin conexión es la excepción.

mBlock tiene tres modos. «En directo» prueba al momento, con el robot unido al ordenador. «Cargar» copia el programa en el robot, que luego funciona sin PC. «Scratch» se comporta como Scratch, sin robot.

### Exportación de código

Scratch no exporta. El proyecto solo se vuelve a leer dentro de Scratch.

mBlock exporta a Arduino C: se ve el código generado y se puede modificar en el IDE de Arduino. La exportación a Python vale para los robots compatibles, en particular CyberPi y micro:bit. El interés es entender qué hace de verdad el bloque.

Ejemplo:

```cpp
// Bloque mBlock: «Avanzar a velocidad 100»
// se convierte en Arduino C:
mBot.motor.leftWheel.setSpeed(100);
mBot.motor.rightWheel.setSpeed(100);
```

## Instalación y primeros pasos

Para Scratch, abre [scratch.mit.edu](https://scratch.mit.edu) y haz clic en Crear. El proyecto arranca en el navegador. También existe la aplicación sin conexión para Windows, Mac y Linux.

Para mBlock, el editor en línea está en [ide.mblock.cc](https://ide.mblock.cc). Para la versión instalada, descarga mBlock 5 desde [mblock.cc](https://mblock.cc/), sigue el asistente, conecta el robot por USB o Bluetooth, añade su extensión (por ejemplo «mBot») y prueba la conexión. El detalle en Windows está en [Instalar mBlock 5 en Windows](/es/instalar-mblock-5-windows/).

## Proyectos de ejemplo

### Proyecto Scratch: juego de Pong

```
Cuando se hace clic en la bandera verde
Por siempre
  Si tecla «espacio» pulsada
    Mover pala 10 píxeles
  Si la pelota toca el borde
    Rebotar
```

Un juego completo cabe en 20 o 30 bloques y se juega en el navegador.

### Proyecto mBlock: robot seguidor de línea

```
Cuando el programa empieza
Por siempre
  Si sensor de línea izquierdo = negro Y derecho = blanco
    Girar a la izquierda
  Si no, si derecho = negro Y izquierdo = blanco
    Girar a la derecha
  Si no
    Avanzar recto
```

El robot autónomo sigue una línea negra sobre fondo blanco.

## Compatibilidad de hardware

Scratch no tiene un robot compatible de forma nativa. Existen extensiones no oficiales, ScratchX y Snap!, pero son poco fiables.

mBlock reconoce el mBot (robot con ruedas de Makeblock), el mBot2 (versión avanzada con CyberPi), Codey Rocky, las placas Arduino UNO, Nano y Mega, el micro:bit de la BBC, la Raspberry Pi Pico, el CyberPi usado solo y los sensores Grove del ecosistema Seeed Studio.

El Makeblock mBot es el primer robot habitual para mBlock, más o menos de los 8 a los 12 años. Se programa por bloques, al estilo de Scratch, y en Arduino. Los bloques siguen siendo asequibles y el kit ya incluye varios sensores. En Amazon.es cuesta 89,99 €, consulta del 6 de noviembre de 2026.

[mBot en Amazon.es](https://www.amazon.es/dp/B07XR98YYQ?tag=roboteducat07-21) — consulta el precio y la ficha del día.

*Socio Amazon — puede generarse una comisión en compras elegibles, sin coste adicional para ti.*

## FAQ — mBlock vs Scratch

### ¿Es mBlock más difícil que Scratch?

No realmente. La interfaz es casi la misma. La dificultad de más viene de conectar el robot (USB, Bluetooth, controladores) y de leer el hardware: sensores y motores. Una vez establecido el enlace, programar es del mismo orden.

### ¿Se puede pasar fácilmente de Scratch a mBlock?

Sí. Quien domina Scratch se sitúa en unos 30 minutos. Los bloques son los mismos. Solo cambia la parte de hardware.

### ¿Hace falta obligatoriamente un robot para usar mBlock?

No. El modo «Scratch» funciona sin robot, igual que Scratch. El interés principal de mBlock sigue siendo programar hardware.

### ¿Funciona mBlock con robots LEGO?

No. Mindstorms y SPIKE tienen su propio software. Para LEGO hace falta LEGO Education, o una alternativa como EV3 Classroom.

### ¿Scratch es de verdad gratis? ¿Y mBlock?

Sí, los dos son gratis por completo. Scratch es un proyecto del MIT, educativo y sin publicidad. mBlock es gratis para un uso personal y educativo: Makeblock se remunera vendiendo robots, no el programa.

### ¿Se puede usar mBlock sin conexión?

Sí. Una vez instalada, la aplicación funciona sin conexión. Se puede programar y cargar en el robot incluso sin Wi-Fi.

### ¿mBlock sustituye a Arduino IDE?

No, lo complementa. mBlock produce código Arduino C que se puede exportar y luego modificar en el IDE de Arduino. Es un puente, no un sustituto.

## Tabla resumen final

| Criterio | Scratch | mBlock |
|---------|---------|--------|
| **Facilidad** | Imbatible | Fácil con un poco de ayuda |
| **Creatividad** | Juegos y animaciones | Proyectos robóticos |
| **Comunidad** | Muy amplia, proyectos públicos en scratch.mit.edu | Media |
| **Hardware** | Nada que comprar | mBot 89,99 € (Amazon.es, 6 de noviembre de 2026). Arduino y micro:bit: consulta el precio |
| **Evolutividad** | Solo bloques | Exportación a Arduino C y Python |
| **Edad** | 6–14 años | 8–16 años |
| **Contexto** | Colegio, casa, creatividad | Robótica, tecnología, IoT |

De los 6 a los 10 años, para un primer contacto, empieza por Scratch. De los 8 a los 14, con un robot o un proyecto de robótica, usa mBlock, también entre los 10 y los 14 si el paso siguiente es Arduino. Una clase sin hardware se queda en Scratch. Un club de robótica pasa a mBlock.

Scratch y mBlock se complementan. Scratch enseña a pensar un programa. mBlock aplica ese pensamiento a objetos reales. Según el objetivo sea creativo o técnico, uno llega más lejos que el otro. Se puede empezar por Scratch y pasar a mBlock cuando la robótica se convierte en el tema.
