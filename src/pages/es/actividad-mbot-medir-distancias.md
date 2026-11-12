---
layout: ../../layouts/EsPost.astro
title: "Actividad mBot: medir distancias (sensor ultrasónico)"
description: "Tutorial mBlock para principiantes: sensor ultrasónico del mBot en Live, distancia en la matriz LED con bloques unir. Carga, comprobaciones y solución de problemas."
updated: "31 de octubre de 2026"
schemaUpdated: "2026-10-31"
faqSchema:
  - question: "¿Cómo leo la distancia del sensor ultrasónico del mBot en mBlock?"
    answer: "Crea una variable, conecta el mBot, activa el modo Live, en un bucle infinito asigna a la variable la lectura del bloque ultrasónico. El valor aparece en centímetros junto al sprite."
  - question: "¿Por qué la matriz LED no acepta el número directamente?"
    answer: "El sensor devuelve un número; el bloque de desfile de texto espera una cadena. Une distancia y unidad, por ejemplo unir(distancia, \" cm\")."
  - question: "¿Modo Live o Upload para esta actividad?"
    answer: "Live muestra la variable en el PC. Para la distancia sin cable USB construye el programa en bloques y carga en Upload."
  - question: "La medida se queda en 0 o salta — ¿qué revisar?"
    answer: "Obstáculo entre unos 3 y 400 cm, superficie plana, USB o carga, bloques mBot instalados."
---

Algunos enlaces de esta página son de afiliados (Amazon.es). Podemos recibir una comisión en compras elegibles, sin coste adicional para ti.

> **Respuesta directa (octubre 2026)** — En **mBlock 5** (software por bloques de Makeblock, parecido a **Scratch**), lee el **sensor de ultrasonidos** del mBot en una **variable** en **Live** (tiempo real con el PC, sin cargar en cada clic), luego muestra la misma distancia en la **matriz LED** convirtiendo el **número** en texto (**unir** + `" cm"`) y **cargando** el programa en el robot.

Esta actividad en **dos tiempos** guía para:

1. **Leer la distancia** del **sensor de ultrasonidos** del <a href="/go/az-es-3d4cce7de1/" rel="sponsored nofollow noopener" class="affiliate-link">mBot Makeblock</a> y verla **en el ordenador** (variable + **Live**);
2. **Mostrar esa distancia en la matriz LED** **sin cable** (programa **guardado en el robot**), gestionando **número → texto**.

Las etiquetas de los bloques pueden variar; la **secuencia lógica** se mantiene.

<figure class="article-figure">
  <img src="/capture/activite-mbot-detecteur-dintrusion/robot-mbot-detectant-intrusion.png" alt="Vista frontal del mBot Makeblock: sensor ultrasónico y matriz LED en la placa mCore." width="960" height="540" loading="eager" decoding="async" />
  <figcaption>En el mBot clásico el sensor suele ir delante; la matriz LED muestra mensajes o valores. Foto: Emmanuel Sauvage, Robot Éducatif — octubre de 2026.</figcaption>
</figure>

<aside class="article-callout" role="note">
<p><strong>¿mBot clásico o mBot2?</strong></p>
<p>Este tutorial apunta al <strong>mBot con placa mCore</strong> y el módulo ultrasónico RJ25 habitual. El <strong>mBot2</strong> usa bloques mBuild; los conceptos (variable, Live, unir, matriz) son similares. Antes de comprar: <a href="/es/mbot-vs-mbot2/">comparativa mBot vs mBot2</a>.</p>
</aside>

<aside class="article-callout" role="note">
<p><strong>Live y Upload — dos modos</strong></p>
<ol>
<li><strong>Live</strong>: el script habla con el robot <strong>en tiempo real</strong> desde el PC — ideal para ver la variable distancia en pantalla.</li>
<li><strong>Upload</strong> (carga): el programa se <strong>guarda en la placa</strong> del mBot; sin cable USB la matriz LED puede mostrar la distancia sola.</li>
<li>Prueba primero en Live, luego adapta para <strong>cuando el mBot inicia</strong> en Upload (véase <a href="/es/primeros-pasos-mblock-5/">primeros pasos mBlock</a>).</li>
</ol>
</aside>

| Criterio | Detalle |
| --- | --- |
| **Dificultad** | Principiante (variables, sensor); parte C opcional: intermedio |
| **Duración** | Unos 45–75 minutos |
| **Material** | mBot cargado, PC, cable USB (Bluetooth opcional) |
| **Software** | <a href="/es/instalar-mblock-5-windows/">mBlock 5</a>, <a href="/es/instalar-bloques-mbot/">bloques mBot</a> |
| **Resultado** | cm en el PC, luego unos **`42 cm`** en la matriz |

<aside class="article-callout" role="note">
<p><strong>En clase</strong></p>
<p>En una sesión: <strong>medida real</strong>, retroalimentación en mBlock, luego el mismo principio con un <strong>programa autónomo en el robot</strong> — sensor, variable, tipos de datos, programa sin PC.</p>
</aside>

> **Vídeo** — demostración (voz en francés): [YouTube](https://www.youtube.com/watch?v=1smaSvnB7Aw). Activa **subtítulos automáticos** en español si están disponibles.

## Material y software

- [Presentación del mBot](/es/mbot-mi-primer-robot-educativo/) · [Instalar mBlock 5](/es/instalar-mblock-5-windows/) · [Primeros pasos](/es/primeros-pasos-mblock-5/) · [Bloques mBot](/es/instalar-bloques-mbot/) · [mBlock vs Scratch](/es/mblock-vs-scratch/)

## 1. Requisitos previos

- [Robot educativo mBot](/es/mbot-mi-primer-robot-educativo/).
- [mBlock 5](/es/instalar-mblock-5-windows/) e [interfaz](/es/primeros-pasos-mblock-5/).
- [Bloques mBot](/es/instalar-bloques-mbot/).
- Saber [cargar un primer programa](/es/primer-programa-mbot/) (**Upload**).
- [Desfilar un texto](/es/actividad-mbot-desfilar-texto/) en la matriz (misma idea para una **cadena**).

## 2. El sensor de ultrasonidos

Mide **distancia** con ondas sonoras y tiempo de retorno tras la reflexión. En el mBot clásico va **delante**; apunta el robot al obstáculo.

- **Rango habitual**: a menudo **unos 3–400 cm** — demasiado cerca o lejos, lectura **poco fiable**.
- **Usos**: evitación, [detector de intrusión](/es/actividad-mbot-detector-intrusion/), juego « stop » a distancia fija, etc.

Valor del bloque en **centímetros (cm)** — comprueba la unidad en mBlock.

## 3. Primera parte: distancia en pantalla (Live)

**Objetivo**: **variable** en bucle, visible **junto al sprite**.

1. Crea **variable** con visualización en el escenario.
2. Conecta mBot (USB o **Bluetooth** — inalámbrico; véase [Bluetooth mBlock](/es/mblock-bluetooth-solucion/) si se corta) y modo **Live** — **tiempo real**, sin cargar todo en cada clic.
3. Bucle **por siempre** → lectura ultrasónica → variable (bloque « distancia / ultrasónico » en **mBot** o **Sensores**).
4. Breve **esperar** (decenas de ms) estabiliza la lectura.

Al ejecutar el script (bandera verde o botón Live), la variable se actualiza en **cm** mientras el obstáculo esté en rango.

<figure class="article-figure">
  <img src="/capture/capteur/mblock-capteur-ultrason-variable-lutin.png" alt="Captura mBlock: bucle con sensor ultrasónico y variable." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Ejemplo: bucle → sensor → variable. Captura mBlock 5 — Emmanuel Sauvage, Robot Éducatif — octubre de 2026.</figcaption>
</figure>

Proyecto ejemplo: [distance_sans_affichage.mblock](/capture/capteur/distance_sans_affichage.mblock).

**Comprobación:** hoja a **40 cm** — valor cercano a **40**. Con **42**, di « cuarenta y dos centímetros » — misma cadena en la matriz.

## 4. Segunda parte: distancia en la matriz LED

**Objetivo**: robot **solo** con distancia en la **matriz LED**, con **desfile** si hace falta — como [desfilar un texto](/es/actividad-mbot-desfilar-texto/).

<figure class="article-figure">
  <img src="/capture/activite-mbot-faire-defiler-un-texte/2.1/photo_affichage_hel.webp" alt="Foto: palabra en la matriz LED del mBot." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Misma matriz que para texto deslizante — mostrarás « 42 cm ». Foto: Emmanuel Sauvage, Robot Éducatif — octubre de 2026.</figcaption>
</figure>

### 4.1 Número vs texto

El bloque de **desfile** espera una **cadena** (texto), p. ej. `"42 cm"`. El sensor devuelve un **número**. En Scratch / mBlock hay que **unir** texto.

### 4.2 Enfoque A — Solo bloques (recomendado)

Quédate en la **paleta de bloques** — pestaña **Arduino** no obligatoria.

1. Lee distancia en variable.
2. **Unir** / combinar: `unir(distancia, " cm")`.
3. Mismo patrón **desfile** que en el artículo de texto.
4. **Upload** — sin cable, sigue mostrando; evento **cuando el mBot inicia** si se ofrece.

**Criterio de éxito:** ~**42 cm** de la pared → **`42 cm`** en la matriz.

- **Ventaja**: todo en **bloques** para el alumnado.
- **Inconveniente**: dos procedimientos si mezclas texto libre y distancia — nómbralos (`desfile_distancia`, `desfile_mensaje`).

Guarda `distancia_matriz.mblock` antes del enfoque B.

### 4.3 Enfoque B — Código Arduino / C (opcional)

Tras el enfoque A. mBlock **genera** código; edita **Arduino C** (pestaña **Código** / `</>`).

**Pasos típicos**:

1. Programa **en bloques** (bucle, sensor, desfile).
2. Vista **código**, **copia todo**.
3. Pestaña **Arduino**, **pega**, adapta la llamada al desfile — **número + unidad** en **cadena**.

```cpp
desfile_texto_N_N(String(distancia) + String(" cm"), 1);
```

**Seguridad**: copia del `.mblock`, recarga, cable y pilas.

## 5. Ampliaciones

- Filtrar valores anómalos; [detector de intrusión](/es/actividad-mbot-detector-intrusion/).
- [Serie ultrasónico ep. 1 (página FR, misma lógica)](/serie-capteur-ultrason-mbot-1-mesurer-distance/), [proyectos en una hora](/es/proyectos-mbot-una-hora/) o [LED parpadeantes](/es/actividad-mbot-hacer-parpadear-leds/).

## 6. Comprobaciones y solución de problemas

| Problema | Causa frecuente | Qué hacer |
|----------|-----------------|-----------|
| Variable quieta | Live desactivado o mBot desconectado | USB, **mBot**, reinicia Live |
| **0** o valor raro | Fuera de 3–400 cm | Superficie plana 10–200 cm |
| Bluetooth inestable | Alcance / pilas | USB; [Bluetooth mBlock](/es/mblock-bluetooth-solucion/) |
| Matriz vacía sin cable | No cargado | **Upload**; **cuando el mBot inicia** |
| Sin bloques sensor | Librería mBot off | [Instalar bloques](/es/instalar-bloques-mbot/) |
| Error de tipo | Número en lugar de cadena | **Unir** + `" cm"` |
| Valor que salta | Superficie inclinada / mano en el haz | Superficie plana; manos fuera |

## FAQ

### ¿Cómo leo la distancia?

Variable + bucle + ultrasónico en **Live** con variable en el escenario.

### ¿Por qué `" cm"`?

El desfile espera **texto**; el sensor envía un **número**.

### ¿Live o Upload?

**Live** en el PC; **Upload** sin cable.

## 7. Ir más lejos

[Detector de intrusión](/es/actividad-mbot-detector-intrusion/), [LED](/es/actividad-mbot-hacer-parpadear-leds/), [primer programa](/es/primer-programa-mbot/), guías **mBlock** en la barra lateral.

**Clase**: [10 proyectos mBot gratis](/es/10-proyectos-mbot-gratis-clase/).

Hardware: <a href="/go/az-es-3d4cce7de1/" rel="sponsored nofollow noopener" class="affiliate-link">mBot en Amazon.es</a> — consulta el precio del día.

*Socio Amazon — comisión posible, sin coste adicional.*

*Emmanuel Sauvage — actualización 31 de octubre de 2026.*
