---
layout: ../../layouts/EsPost.astro
title: "Robot mBot Makeblock: mi primer robot educativo"
description: "El mBot clásico de Makeblock para empezar: montaje con un adulto, modos precargados, pilas y primeros pasos con mBlock (programación por bloques al estilo Scratch)."
updated: "31 de octubre de 2026"
faqSchema:
  - question: "¿Cómo funciona el robot mBot?"
    answer: "El mBot es una pequeña plataforma móvil. La placa mCore ejecuta un programa (un modo precargado o un script enviado desde mBlock), controla los motores, los LED y el zumbador, y lee los sensores (ultrasonidos para la distancia, sensor de línea bajo el chasis). Puedes probar en modo directo con el robot conectado al ordenador, o cargar el programa en la placa para que funcione sin cable."
  - question: "¿El mBot es un robot educativo?"
    answer: "Sí. Un robot educativo (o pedagógico) sirve para aprender programación y robótica manipulando un objeto real. El mBot está muy extendido en familias y centros escolares precisamente para eso."
  - question: "¿Qué diferencia hay entre el mBot y el mBot2?"
    answer: "El mBot clásico usa sobre todo la placa mCore y conectores RJ25. El mBot2 se basa en la placa CyberPi y el bus mBuild, con un camino más natural hacia Python."
  - question: "Mi programa de mBot no hace lo que quiero: ¿por dónde empiezo?"
    answer: "Comprueba que esté seleccionado el dispositivo correcto en mBlock, revisa la conexión (USB es lo mejor para probar) y vuelve a cargar el programa tras cada cambio. Para problemas inalámbricos, consulta la página de solución de problemas de Bluetooth."
  - question: "¿Dónde comprar el mBot clásico (no el mBot2)?"
    answer: "En Amazon busca «mBot Makeblock», lee con atención el título del anuncio (mBot o mBot2) y las fotos antes de pedir, y compara vendedores."
---

¿Buscas un **robot mBot** para un primer contacto con la robótica? El **mBot** de **Makeblock** (a veces escrito «m bot») es un pequeño robot que se construye y luego se programa, pensado para quienes empiezan a partir de unos **8–10 años**, con un adulto que ayuda en el montaje. Al final de esta página sabrás qué hay en la caja, cómo montarlo sin soldar, qué modos funcionan sin escribir código y cómo pasar a **mBlock**, el software de programación por bloques de Makeblock (muy parecido a **Scratch**, el lenguaje de bloques que se usa en muchos colegios).

![Robot educativo mBot Makeblock montado, vista de tres cuartos](/images/products/mbot.webp)

*Foto de producto del mBot clásico (kit Makeblock). Revisa siempre la ficha del vendedor: el modelo y el contenido de la caja pueden cambiar.*

> **Atención al modelo** — Este artículo trata del **mBot clásico** (placa **mCore**, conectores **RJ25**). El **mBot2** es otra generación (placa **CyberPi**, bus **mBuild**). Los enlaces de compra de abajo llevan a la búsqueda del **mBot clásico**. Para comparar ambos: [mBot vs mBot2](/es/mbot-vs-mbot2/).

Puedes ver el precio del día en la ficha del [mBot Makeblock en Amazon.es](https://www.amazon.es/dp/B07XR98YYQ?tag=roboteducat07-21) (enlace de afiliado). Los precios cambian: comprueba la ficha antes de comprar.

Para situar la marca y la serie mBot: la ficha [Makeblock en Wikipedia](https://es.wikipedia.org/wiki/Makeblock).

## ¿Para quién es el mBot?

El mBot encaja sobre todo si quieres:

- un **kit para montar** (tornillos, chasis, motores) en lugar de un robot ya listo;
- una entrada a la **programación por bloques** con el mismo espíritu que Scratch;
- **modos listos para usar** (evitar obstáculos, seguir una línea) antes de escribir un solo programa;
- un robot **evolutivo**: más adelante, los [accesorios Makeblock](/es/accesorios-mbot-por-donde-empezar/) (sensores, brazo, orugas) se conectan a los puertos del kit.

No es la mejor opción si buscas un robot **sin pantalla** para un niño muy pequeño (3–6 años): mira mejor soluciones como el [Tale-Bot Pro de Matatalab](/es/matatalab-tale-bot-robot-educativo/).

## 1. Contenido típico de la caja

Según los packs y los años, la caja del mBot clásico contiene en general:

| Elemento | Papel en pocas palabras |
|--------|-------------|
| **Chasis** y piezas mecánicas | La estructura del robot (ruedas, soportes). |
| **Placa mCore** | El «cerebro» electrónico del robot. |
| **Dos motores** | Hacen girar las ruedas. |
| **Sensor de ultrasonidos** | Mide la distancia delante del robot (para evitar obstáculos). |
| **Sensor de línea** | Lee una línea negra en el suelo. |
| **Mando a distancia por infrarrojos** | Maneja el robot a distancia (necesita pilas de botón). |
| **Tornillos, destornillador, manual** | Montaje sin soldar. |

El manual en papel sigue siendo la referencia para **tu** revisión exacta: síguelo paso a paso. No hace falta soldar nada.

## 2. Montaje: con un adulto, sin estrés

El montaje requiere **herramientas pequeñas** (a menudo incluidas) y **paciencia**. Un niño de 10 años puede lograrlo, pero **con un adulto**: para sujetar las piezas, comprobar el sentido de los motores y evitar forzar un tornillo.

### Por qué ayuda el adulto

- **Seguridad**: piezas pequeñas, herramientas, pilas — se recomienda supervisión.
- **Aprendizaje**: leer un esquema, contar tornillos, comprobar una polaridad (el sentido en que va una pila o un cable) ya es robótica.
- **Menos errores**: motores invertidos o cables mal encajados hacen que el robot arranque al revés; una segunda mirada evita la frustración.

Prepara una mesa despejada, un cuenco para los tornillos y **de 30 a 60 minutos** según la práctica. Si un paso del manual no está claro, detente y compara la foto del manual con tu montaje en lugar de forzar.

### Alimentación (consumibles)

Para que el robot funcione, prevé:

- **pilas recargables** adecuadas al compartimento del kit (a menudo formato AA — **comprueba el manual**) **o**
- una **batería LiPo** compatible con Makeblock (litio-polímero, la misma tecnología que muchos teléfonos) con conector adecuado, a menudo de tipo **JST** (un pequeño enchufe blanco de dos cables), **solo** si tu modelo y el manual lo contemplan;
- pilas **CR2032** (de botón) para el mando a infrarrojos.

Sin energía fiable, ni el mejor programa hará nada: las pilas son el primer «accesorio» útil.

## 3. Primer uso: modos precargados

Una vez montado y alimentado, el mBot ya puede **moverse sin ordenador**, gracias a **programas ya guardados** en la placa (según el modelo y el modo elegido en el robot o en el mando):

- **evitar obstáculos** (el sensor de ultrasonidos detecta lo que hay delante);
- **seguir una línea negra** en el suelo (sensor bajo el chasis);
- **manejo manual** con el mando.

Es ideal para comprobar que el montaje es correcto **antes** de instalar ningún software. Si el robot no reacciona: pilas, interruptor, cables de los motores y, después, el manual.

## 4. Programar con mBlock (no «la aplicación Scratch»)

Para crear tus propios comportamientos usas **mBlock** (normalmente **mBlock 5**): es el software de Makeblock, **inspirado en Scratch** (la misma idea de bloques de colores que se encajan). **No** es simplemente la web scratch.mit.edu: mBlock añade los **bloques del robot** (motores, sensores, LED…).

Recorrido recomendado en este sitio:

1. [Instalar mBlock 5 en Windows](/es/instalar-mblock-5-windows/) (o la versión adecuada para tu ordenador).
2. [Entender la interfaz de mBlock 5](/es/primeros-pasos-mblock-5/) (escenario, paletas, conexión).
3. [Instalar los bloques del mBot](/es/instalar-bloques-mbot/) si no aparece la paleta del robot.
4. [Mi primer programa mBot](/es/primer-programa-mbot/) para un script corto y fácil de probar.

En clase o en casa, la conexión **USB** suele ser la más sencilla para empezar; el **Bluetooth** (conexión inalámbrica) viene después — consulta la [solución de problemas de Bluetooth en mBlock](/es/mblock-bluetooth-solucion/).

## 5. Puntos fuertes y límites (opinión práctica)

**Puntos fuertes**

- Montaje pedagógico (mecánica más electrónica ligera).
- Modos precargados para un éxito rápido.
- Paso natural hacia Scratch / mBlock y, más adelante, hacia otros robots Makeblock.
- Un ecosistema de accesorios una vez asimiladas las bases.

**Límites**

- Hace falta un **ordenador** (o una tableta compatible) para programar de verdad.
- El **mBot2** es más reciente (pantalla, Python más presente): si dudas, lee la [comparativa mBot / mBot2](/es/mbot-vs-mbot2/).
- Los accesorios **RJ25** del mBot clásico no se conectan tal cual al bus **mBuild** del mBot2.

Esto no es una prueba de laboratorio con mediciones: la opinión se basa en la documentación de Makeblock, el uso escolar habitual del kit y la coherencia con las demás guías de mBot de este sitio. Los precios que indican los vendedores cambian; comprueba la ficha el día de la compra.

## Preguntas frecuentes

### ¿Cómo funciona el robot mBot?

El **mBot** es una pequeña plataforma móvil: la placa **mCore** ejecuta un programa (un modo precargado o un script enviado desde mBlock), controla los **motores**, los **LED** y el **zumbador** (un pequeño altavoz) y lee los **sensores** (ultrasonidos para la distancia, línea bajo el chasis). Puedes probar en **modo directo** (robot conectado al ordenador) o **cargar** el programa en la placa para que funcione sin cable.

### Robot educativo, robot pedagógico: ¿lo es el mBot?

Sí. Un **robot educativo** (o pedagógico) sirve para **aprender** programación y robótica manipulando un objeto real. El mBot está muy extendido en familias y centros escolares para este uso.

### ¿Qué diferencia hay entre el mBot y el mBot2?

El **mBot** clásico usa sobre todo la placa **mCore** y conectores **RJ25**. El **mBot2** se basa en la **CyberPi** y el bus **mBuild**, con un camino más natural hacia **Python**. Detalle: [mBot vs mBot2](/es/mbot-vs-mbot2/).

### Mi «programa mBot» no hace lo que quiero: ¿por dónde empiezo?

Comprueba el **dispositivo correcto** en mBlock y la **conexión** (USB para probar), y luego **vuelve a cargar** el programa tras cada cambio. Para lo inalámbrico: [solución de problemas de Bluetooth](/es/mblock-bluetooth-solucion/).

### ¿Dónde comprar el mBot clásico (no el mBot2)?

En Amazon, el enlace de producto seguido para el **mBot clásico** es este: [mBot Makeblock en Amazon.es](https://www.amazon.es/dp/B07XR98YYQ?tag=roboteducat07-21). Lee el **título del anuncio** (mBot / mBot2) y las fotos antes de pedir, y compara vendedores.

## Para ir más lejos

- [Accesorios mBot: por dónde empezar](/es/accesorios-mbot-por-donde-empezar/)
- [Proyectos mBot para hacer en una hora](/es/proyectos-mbot-una-hora/)
- [Robot programable para un niño de 10 años](/es/robot-programable-10-anos/)

*Socio de Amazon — puede generarse una comisión en compras elegibles, sin coste adicional para ti.*
