---
layout: ../../layouts/EsPost.astro
title: "Programar mBot en 1 hora: ideas de retos y método"
description: "Programación mBot para una sesión de una hora: plan minuto a minuto, 7 retos (LED, ultrasonidos, recorrido) y enlaces a los tutoriales paso a paso, en clase."
updated: "31 de octubre de 2026"
faqSchema:
  - question: "¿Cuánto tiempo lleva un programa mBot en un taller?"
    answer: "Cuenta de 45 a 60 minutos por reto: 5 min de objetivo, 30 min de código y pruebas, 10 min de robustez, 5 min de demo."
  - question: "¿Qué programar en un mBot en una hora?"
    answer: "Retos cortos: semáforo LED, radar de ultrasonidos, contador de intrusiones, recorrido con duraciones fijas o mini escenario en la matriz LED."
---

¿Buscas un **programa mBot** (el robot educativo de Makeblock programable por bloques) que quepa en **una hora** de clase, de club o en casa? Esta página da primero el **método** (reparto minuto a minuto) y luego una **lista de retos** listos para lanzar, con enlaces a los tutoriales paso a paso del sitio.

> **Respuesta directa (octubre 2026)** — Prevé **45–60 minutos** por reto: 5 min de objetivo, 30 min de código/prueba, 10 min de robustez, 5 min de demo. Ideas rápidas: [LED](/es/actividad-mbot-hacer-parpadear-leds/), [ultrasonidos](/es/actividad-mbot-medir-distancias/), [intrusión](/es/actividad-mbot-detector-intrusion/). Instala [mBlock 5](/es/instalar-mblock-5-windows/) antes de la sesión.

Requisitos: **mBlock** instalado, robot **cargado** (o pilas en buen estado) y [primeros pasos con mBlock](/es/primeros-pasos-mblock-5/) ya hechos. Algunos enlaces de compra aparecen **después** de los retos; son enlaces de afiliados (comisión posible). Comprueba el precio del día en Amazon.es.

![mBot Makeblock visto en tres cuartos, listo para un reto de una hora](/images/lot1/mbot-premier-hero.webp)

*El mBot clásico — ideal para retos cortos por bloques en Scratch / mBlock. Foto de producto usada para este artículo.*

## 1. Dividir la hora (un método que funciona)

| Minutos | Actividad |
|---------|----------|
| 0–5 | Recordar el objetivo + **criterio de éxito** («paramos cuando…»). |
| 5–35 | Código y **pruebas cortas** (nada de programa monstruo de 80 bloques). |
| 35–50 | **Robustez**: ¿qué pasa si mueves el robot o el obstáculo? |
| 50–60 | **Demo** de 2 minutos + una frase «lo que haríamos la próxima vez». |

Este guion evita pasar toda la sesión buscando un bug sin mostrar nunca un resultado.

## 2. Ideas de retos (programación mBot)

### Semáforo express (~30 min de código) <span class="exo-badge">dificultad baja</span>

Alternar **rojo / verde** (luego naranja si lo hay) en los LED con temporizaciones — base: [hacer parpadear los LED](/es/actividad-mbot-hacer-parpadear-leds/).

### Radar «stop» (~30 min) <span class="exo-badge">dificultad baja</span>

**Alerta** (LED o matriz) cuando la distancia medida baja de un umbral — prolonga [medir distancias](/es/actividad-mbot-medir-distancias/).

### Contador de intrusiones (~35 min) <span class="exo-badge">dificultad media</span>

Combinar **ultrasonidos + contador + pantalla** — ver [detector de intrusión](/es/actividad-mbot-detector-intrusion/).

### Reto «un minuto de silencio» (~25 min) <span class="exo-badge">dificultad media</span>

El robot permanece inmóvil mientras no se detecte un **sonido** por encima de un umbral — **solo si** tu modelo tiene un micrófono utilizable en mBlock (el mBot v1 clásico no lo incluye de serie; mBot2 / CyberPi sí). Si no, cambia el disparador por el botón de la placa o por un sensor de línea.

### Mini escenario narrativo (~30 min) <span class="exo-badge">dificultad baja</span>

El robot «entrega» un mensaje en la matriz o los LED entre dos desplazamientos — excelente para una **exposición oral** en clase. Desfile en la matriz: [hacer desfilar un texto](/es/actividad-mbot-desfilar-texto/).

### Recorrido impuesto sin pista negra (~35 min) <span class="exo-badge">dificultad media</span>

Programar **avanzar / girar / retroceder** con duraciones fijas para salir de un laberinto dibujado en el suelo con tiza — al principio no hace falta el seguidor de línea. Punto de partida: [primer programa mBot](/es/primer-programa-mbot/).

### Semáforo + ultrasonidos combinados (~45–55 min) <span class="exo-badge">dificultad media</span>

Encadena la secuencia LED y el umbral de distancia si el grupo avanza rápido: el semáforo sigue en verde mientras el camino está libre y pasa a rojo en cuanto un obstáculo se acerca por debajo del umbral. Mantén la demo corta.

## Material útil (después de los retos)

Cuando el método y las ideas están claros, este es el material más habitual para estos talleres. Los precios de Amazon cambian: consulta la ficha el día de la compra.

**Makeblock mBot** — unos 8–12 años · Scratch y Arduino · montaje rápido para un taller · LED y sensor de ultrasonidos adecuados para retos de 1 h · [Amazon.es](https://www.amazon.es/dp/B07XR98YYQ?tag=roboteducat07-21)

**ELEGOO Penguin Bot** (alternativa económica, no es un mBot) — unos 8–14 años · Arduino C · robot bípedo original para talleres de otro tipo · [Amazon.es](https://www.amazon.es/s?k=ELEGOO+Penguin+Bot&tag=roboteducat07-21)

## 3. Prolongaciones

- Presentación del robot: [mBot, mi primer robot educativo](/es/mbot-mi-primer-robot-educativo/).
- Accesorios para después: [accesorios mBot — por dónde empezar](/es/accesorios-mbot-por-donde-empezar/).
- Secuencia más larga: [10 proyectos mBot gratis para el aula](/es/10-proyectos-mbot-gratis-clase/).

## 4. Errores a evitar en 1 h

- Objetivo **demasiado amplio** («hagamos todo») — prefiere **una** funcionalidad bien terminada.
- Olvidar la **demo final**: es la que ancla el aprendizaje.
- Perder 40 minutos con un cable USB o el Bluetooth: prueba la conexión **antes** de la sesión ([solucionar problemas de Bluetooth en mBlock](/es/mblock-bluetooth-solucion/) si hace falta).

## Enlaces Amazon (afiliación)

- [Makeblock mBot](https://www.amazon.es/dp/B07XR98YYQ?tag=roboteducat07-21)

*Socio de Amazon — comisión posible en compras elegibles, sin coste extra para ti.*

**Consejo.** Termina siempre con una **demo de 2 minutos** delante de alguien: fija el objetivo y evita complicar demasiado el programa.

**También leer**: [mejor robot educativo 2026](/es/mejor-robot-educativo-2026/).

*Autor: Emmanuel Sauvage · actualizado el 31 de octubre de 2026.*
