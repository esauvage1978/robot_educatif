---
layout: ../../layouts/EsPost.astro
title: "Programa mBot: hacer parpadear los LED (mBlock)"
description: "Tres actividades mBlock con LED RGB del mBot: rojo alternado, ciclo RGB y fundido con variables. Modo Carga, comprobaciones y resolución de problemas."
updated: "31 de octubre de 2026"
schemaUpdated: "2026-10-31"
faqSchema:
  - question: "¿Cómo hago parpadear los LED del mBot en mBlock?"
    answer: "En mBlock 5 con dispositivo mBot: evento de inicio, bucle, bloques LED RGB (0–255) y esperar. Usa el modo Carga (Upload) si el robot debe parpadear sin cable USB."
  - question: "¿Por qué un LED sigue encendido tras el programa?"
    answer: "Un LED encendido no se apaga solo: hay que poner 0, 0, 0. En la actividad 1 apaga un lado antes de encender el otro."
  - question: "¿Modo Live o Carga para parpadear?"
    answer: "Live sirve para probar con el PC. Para una demo sin cable: Carga (Upload); el evento suele ser al iniciar el mBot en lugar de la bandera verde."
  - question: "No encuentro los bloques LED mBot — ¿qué reviso?"
    answer: "Activa la extensión mBot (Dispositivo → mBot) y sigue la guía instalar bloques mBot. Sin los bloques naranjas no puedes ajustar los LED RGB."
---

Algunos enlaces de esta página son de afiliados (Amazon.es). Si compras a través de ellos, podemos recibir una comisión sin coste adicional.

> **Respuesta directa (octubre 2026)** — En **mBlock 5** (software por bloques de Makeblock, cercano a **Scratch**), apila **inicio**, **bucle**, bloques **LED RGB** y **esperar** en el **mBot clásico**; **sube** en modo **Carga (Upload)** si el robot debe parpadear **sin cable USB**.

El [robot educativo mBot Makeblock](/es/mbot-mi-primer-robot-educativo/) tiene **dos LED RGB** en la placa **mCore** — la **placa electrónica principal** del robot (microcontrolador, alimentación, conectores). Cada LED es un **diodo emisor de luz (LED)** que mezcla **rojo, verde y azul** (**RGB**: *Red, Green, Blue*). Tres programas breves: parpadeo **rojo alternado**, ciclo **rojo/verde/azul** y **fundido progresivo** con una **variable**. Ideal tras el [primer programa mBot](/es/primer-programa-mbot/) o las [ideas de proyecto en una hora](/es/proyectos-mbot-una-hora/).

<figure class="article-figure">
  <img src="/images/lot1/mbot-premier-hero.webp" alt="Robot educativo mBot Makeblock clásico, vista frontal, dos LED RGB en la placa mCore." width="960" height="540" loading="eager" decoding="async" />
  <figcaption>Las dos LED RGB están a izquierda y derecha del botón central de la mCore. Foto de producto — Emmanuel Sauvage, Robot Éducatif — octubre 2026.</figcaption>
</figure>

<aside class="article-callout" role="note">
<p><strong>¿mBot clásico o mBot2?</strong></p>
<p>Este tutorial apunta al <strong>mBot con placa mCore</strong> (kit azul más extendido). El <strong>mBot2</strong> usa otra placa y otros bloques en mBlock; la lógica RGB es similar. Antes de comprar: <a href="/es/mbot-vs-mbot2/">mBot vs mBot2</a>.</p>
</aside>

<aside class="article-callout" role="note">
<p><strong>Antes de la actividad 1 — modo Carga</strong></p>
<ol>
<li>Conecta el mBot por <strong>USB</strong>, abre mBlock, <strong>Dispositivo</strong> → <strong>mBot</strong>.</li>
<li>Construye la actividad 1; prueba en <strong>Live</strong> si hace falta (tiempo real con PC, cable o Bluetooth).</li>
<li>Pasa a <strong>Carga (Upload)</strong>, evento <strong>cuando mBot inicia</strong> si está disponible.</li>
<li>Sube el programa, desconecta el cable: el parpadeo debe seguir solo (consulta <a href="/es/primeros-pasos-mblock-5/">primeros pasos mBlock</a> si los menús difieren).</li>
</ol>
</aside>

| Criterio | Detalle |
| --- | --- |
| **Nivel** | Principiante (bucles, tiempos); actividad 3: intermedio (variable) |
| **Duración** | Unos 30–60 minutos para las tres actividades |
| **Material** | mBot cargado, PC, cable USB |
| **Software** | <a href="/es/instalar-mblock-5-windows/">mBlock 5</a>, <a href="/es/instalar-bloques-mbot/">bloques mBot</a> |
| **Resultado esperado** | LED que parpadean según el escenario; actividad 3: subida suave de color |

<aside class="article-callout" role="note">
<p><strong>Requisitos previos</strong></p>
<ul>
<li>Saber abrir mBlock y elegir el <strong>mBot</strong>.</li>
<li><a href="/es/instalar-bloques-mbot/">Instalar bloques mBot</a> si faltan bloques LED.</li>
<li>Opcional: haber <a href="/es/primer-programa-mbot/">subido un programa</a> una vez.</li>
</ul>
</aside>

## Material y software

- [Presentación mBot](/es/mbot-mi-primer-robot-educativo/) · [Instalar mBlock 5](/es/instalar-mblock-5-windows/) · [Primeros pasos](/es/primeros-pasos-mblock-5/) · [Bloques mBot](/es/instalar-bloques-mbot/) · [mBlock vs Scratch](/es/mblock-vs-scratch/)

<figure class="article-figure">
  <img src="/images/blog/installer-blocs-mbot/etape-04-palette-blocs-mbot.webp" alt="Captura mBlock 5: paleta naranja de bloques mBot con categoría LED visible." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Los bloques LED aparecen en la paleta naranja « mBot » al seleccionar el dispositivo mBot. Captura mBlock 5 — Emmanuel Sauvage, Robot Éducatif — octubre 2026.</figcaption>
</figure>

Cada componente **R**, **G**, **B** de **0 a 255**; **0, 0, 0** = **apagado**. No confundas estos **LED RGB laterales** con la **matriz LED** central (texto deslizante): ver [desfilar un texto](/es/actividad-mbot-desfilar-texto/).

## 1. Un poco de teoría

En el [modelo RGB](https://es.wikipedia.org/wiki/RGB), cada componente va de **0 a 255**.

Ejemplos: rojo **255 – 0 – 0** · verde **0 – 255 – 0** · azul **0 – 0 – 255** · blanco **255 – 255 – 255** · apagado **0 – 0 – 0**.

Más de **16 millones** de colores (**16.777.216**).

## 2. Actividad 1: parpadeo rojo alternado

**Objetivo:** encender los LED **alternativamente izquierda y derecha en rojo**, **10 veces**, **1 segundo** cada uno. Un LED encendido **no** se apaga solo: **0-0-0**.

<figure class="article-figure">
  <img src="/images/lot3/leds-activite1-clignotement.webp" alt="Diagrama pedagógico de bloques mBlock para parpadeo rojo alternado de LED del mBot" width="800" height="450" loading="lazy" decoding="async" />
  <figcaption>Secuencia de bloques actividad 1 (reconstruir en mBlock 5). Diagrama — Emmanuel Sauvage, Robot Éducatif — octubre 2026.</figcaption>
</figure>

**Pseudo-código:**

```text
cuando mBot inicia
repetir 10 veces
  LED izquierdo rojo; LED derecho apagado
  esperar 1 s
  LED izquierdo apagado; LED derecho rojo
  esperar 1 s
```

**Criterio de éxito:** diez ciclos, rojo a la izquierda luego a la derecha, sin ambos encendidos.

Guarda como `parpadeo_led_01.mblock`.

<figure class="article-figure">
  <img src="/capture/premier_programme/12-televersement.png" alt="Captura mBlock 5: progreso o confirmación tras subir el programa al mBot." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Tras una subida correcta, desconecta el USB: el robot debe parpadear solo. Captura mBlock 5 — Emmanuel Sauvage, Robot Éducatif — octubre 2026.</figcaption>
</figure>

## 3. Actividad 2: rojo, verde, azul

**Objetivo:** **rojo, verde y azul** en **ambos** LED, **10 ciclos**.

<figure class="article-figure">
  <img src="/images/lot3/leds-activite2-rgb.webp" alt="Diagrama pedagógico de bloques mBlock para ciclo rojo-verde-azul de LED" width="800" height="450" loading="lazy" decoding="async" />
  <figcaption>Secuencia de bloques actividad 2. Diagrama — Emmanuel Sauvage, Robot Éducatif — octubre 2026.</figcaption>
</figure>

**Pseudo-código:**

```text
cuando mBot inicia
repetir 10 veces
  ambos LED rojo → esperar 1 s
  ambos LED verde → esperar 1 s
  ambos LED azul → esperar 1 s
```

**Criterio de éxito:** ambos LED alternan rojo, verde y azul diez veces con unos segundos de pausa.

Guarda como `parpadeo_rgb.mblock`. Siguiente paso: [medir distancias](/es/actividad-mbot-medir-distancias/) o [detector de intrusión](/es/actividad-mbot-detector-intrusion/).

## 4. Actividad 3: visualización progresiva

**Objetivo:** subir progresivamente rojo, verde y azul de **0 a 255**. Variable (p. ej. `intensidad`), inicio **0**, suma **1**, cada paso **0,01 s**.

<figure class="article-figure">
  <img src="/images/lot3/leds-activite3-progressif.webp" alt="Diagrama pedagógico del fundido progresivo de LED con variable intensidad" width="800" height="450" loading="lazy" decoding="async" />
  <figcaption>Actividad 3: una variable sube la intensidad del color. Diagrama — Emmanuel Sauvage, Robot Éducatif — octubre 2026.</figcaption>
</figure>

**Pseudo-código (fundido rojo — repetir para verde y azul):**

```text
fijar intensidad en 0
repetir 255 veces
  cambiar intensidad por 1
  LED izquierdo y derecho = (intensidad, 0, 0)
  esperar 0.01 segundos
```

Luego bucles con `(0, intensidad, 0)` y `(0, 0, intensidad)`. Exporta `fundido_rgb.mblock`.

**Criterio de éxito:** subida gradual del brillo en cada color; mantén **0,01 s** o ajusta ligeramente.

### Bloque personalizado

Tres parámetros (paso, retardo, índice **0/1/2**) evitan repetir tres veces la misma lógica — útil en los [10 proyectos mBot gratuitos para clase](/es/10-proyectos-mbot-gratis-clase/).

Conclusión: has **trabajado** con LED RGB y visto **bucles**, **variables** y **bloques personalizados** en mBlock.

## 5. Comprobaciones y resolución de problemas

| Problema | Causa frecuente | Qué hacer |
| --- | --- | --- |
| Ningún LED enciende | Sin conexión / dispositivo incorrecto | USB, pilas, **mBot** en mBlock |
| Un LED sigue encendido | Falta **0, 0, 0** | Apagar tras cada color |
| OK en Live, para al desconectar | No subido | **Carga** y vuelve a subir |
| Faltan bloques LED | Librería mBot off | <a href="/es/instalar-bloques-mbot/">Instalar bloques mBot</a> |
| Parpadeo demasiado rápido / lento | Valor **esperar** incorrecto | **1 segundo** en actividades 1 y 2 |
| Colores apagados o incorrectos | RGB fuera de rango | Cada componente **0–255** |

¿Problemas con Bluetooth en Live? Usa **USB** y consulta [mBlock Bluetooth](/es/mblock-bluetooth-solucion/).

## FAQ

### ¿Cómo parpadear los LED?

Apila inicio, bucle, bloques **LED RGB** y **esperar**, luego sube el programa.

### ¿Por qué sigue encendido?

Envía **0, 0, 0** explícitamente.

### ¿Live o Carga?

**Live** = prueba con PC; **Carga** = programa en el robot sin cable.

## 6. Seguir aprendiendo

- [Primer programa mBot](/es/primer-programa-mbot/)
- [Medir distancias](/es/actividad-mbot-medir-distancias/)
- [Tutoriales mBlock](/en/tutorials/)
- [Detector de intrusión](/es/actividad-mbot-detector-intrusion/)
- [¿Qué software mBlock elegir?](/es/software-mblock-cual-elegir/)

*Emmanuel Sauvage — actualizado el 31 de octubre de 2026.*
