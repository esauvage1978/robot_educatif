---
layout: ../../layouts/EsPost.astro
title: "Primer programa mBot en mBlock 5 (paso a paso)"
description: "Primer programa mBlock 5 para mBot: al arranque esperar el botón de la placa y luego tocar una nota. Guía para principiantes con capturas y archivo .mblock."
updated: "31 de octubre de 2026"
schemaUpdated: "2026-10-31"
faqSchema:
  - question: "¿Cuál es el primer programa mBot recomendado?"
    answer: "Un script sencillo en mBlock 5: al arrancar el mBot, esperar el botón de la placa mCore y luego tocar una nota. Valida la carga sin lógica compleja."
  - question: "¿Hace falta USB o Bluetooth para este tutorial?"
    answer: "Se recomienda USB para la primera carga y actualizaciones de firmware. Bluetooth sirve para pruebas en Live con el PC; para escribir el programa en el robot, USB es más fiable."
  - question: "¿Este tutorial sirve para mBot2?"
    answer: "Los bloques y la lógica son parecidos, pero la guía apunta al mBot clásico (placa mCore). En mBot2 elige el dispositivo mBot2 en mBlock y consulta mBot vs mBot2 si los menús difieren."
  - question: "¿Dónde descargar el archivo .mblock del artículo?"
    answer: "Al final del artículo: enlace directo a premier_programme.mblock. Ábrelo en mBlock 5 (Archivo → Abrir) para compararlo con tu script."
---

Algunos enlaces son de afiliación **Amazon.es**: si compras, podemos recibir una comisión sin coste adicional para ti.

> **Respuesta directa (octubre 2026)** — Abre **mBlock 5** (software de bloques Makeblock, cercano a **Scratch**), añade el dispositivo **mBot**, construye: **Cuando el mBot arranca** → **esperar hasta** (botón de la placa pulsado) → **tocar una nota**. Guarda, conecta por **USB**, **carga**. Al arranque, una pulsación del botón hace sonar la nota. Ayuda: [primeros pasos mBlock](/es/primeros-pasos-mblock-5/).

Este tutorial te guía **paso a paso** desde el primer bloque en mBlock 5 hasta la **carga** (envío del programa a la memoria del robot). El programa se mantiene a propósito **simple**: al arrancar, el mBot espera a que pulses el **botón de la placa**; entonces reproduce una **nota breve**. El objetivo es aprender el **flujo de trabajo** (abrir el software → apilar bloques → guardar → conectar → probar → cargar), no todavía algoritmos avanzados.

<figure class="article-figure">
  <img src="/capture/premier_programme/04-jouer-note-c4.png" alt="Captura mBlock 5: programa mBot completo con bloque de arranque, espera del botón de placa y nota C4." width="960" height="540" loading="eager" decoding="async" />
  <figcaption>Programa final en mBlock 5: tres bloques anidados bastan para validar la carga. Captura mBlock 5 — Emmanuel Sauvage, Robótica educativa — octubre 2026.</figcaption>
</figure>

| Criterio | Detalle |
| --- | --- |
| **Nivel** | Principiante (primera carga) |
| **Duración** | Unos 30–45 minutos (conexión + prueba) |
| **Material** | [mBot clásico (mCore)](/es/mbot-mi-primer-robot-educativo/) cargado, PC, cable USB |
| **Software** | [mBlock 5](/es/instalar-mblock-5-windows/), [bloques mBot](/es/instalar-bloques-mbot/) |
| **Resultado** | Una nota tras pulsar el botón, robot autónomo sin PC |

<aside class="article-callout" role="note">
<p><strong>¿mBot clásico o mBot2?</strong></p>
<p>Esta guía supone un <strong>mBot con placa mCore</strong>. El <strong>mBot2</strong> usa otra placa: los menús de mBlock cambian un poco. Compara ambos en <a href="/es/mbot-vs-mbot2/">mBot vs mBot2</a> antes de comprar o prestar un robot.</p>
</aside>

## Antes de empezar

- Un [robot educativo mBot de Makeblock](/es/mbot-mi-primer-robot-educativo/) con pilas cargadas.
- [Instalar mBlock 5](/es/instalar-mblock-5-windows/) (o probar [mBlock en línea](/es/mblock-online-sin-instalar/)).
- Conocer la [interfaz de mBlock 5](/es/primeros-pasos-mblock-5/) (sprites, modo **Dispositivo**, zona de script).
- [Añadir los bloques mBot](/es/instalar-bloques-mbot/) si falta la paleta naranja.

En mBlock 5 cambia al modo **Dispositivo** y selecciona el **mBot** (placa **mCore**). La **mCore** es la **placa principal** del mBot: alberga el **microcontrolador** (pequeño procesador que ejecuta tu programa), el **botón**, conectores de **motores** y **sensores**, **USB** (cable al PC) y, opcionalmente, **Bluetooth** (enlace inalámbrico con el ordenador).

## Construir el programa

### 1. Punto de entrada: al arrancar el robot

Empieza con **Cuando el mBot (mcore) arranca** (categoría **mBot** / eventos) — corresponde al **encendido** o **reset** de la placa.

<figure class="article-figure">
  <img src="/capture/premier_programme/01-bloc-demarrage-mbot.png" alt="Bloque naranja mBlock Cuando el mBot (mcore) arranca." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Bloque de arranque en el robot — sin él el script no corre solo. Captura mBlock 5 — Emmanuel Sauvage, Robótica educativa — octubre 2026.</figcaption>
</figure>

### 2. Esperar una acción

Debajo añade **esperar hasta** (**Control**). El **hexágono** espera una condición **verdadero/falso**: mientras es falsa, el programa **permanece** en la espera.

<figure class="article-figure">
  <img src="/capture/premier_programme/02-attendre-jusqua.png" alt="Bloque mBlock esperar hasta con hueco para una condición." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Estructura de espera: el robot continúa cuando la condición se vuelve verdadera. Captura mBlock 5 — Emmanuel Sauvage, Robótica educativa — octubre 2026.</figcaption>
</figure>

### 3. Condición: botón pulsado

Dentro del hexágono: **¿botón de la placa pulsado?** (**Detección**). Al pulsar el botón de la **mCore**, la condición se vuelve verdadera.

<figure class="article-figure">
  <img src="/capture/premier_programme/03-appui-bouton-carte.png" alt="Condición botón de placa pulsado dentro de esperar hasta." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>El botón está en la placa, no en la carcasa — localízalo antes de probar. Captura mBlock 5 — Emmanuel Sauvage, Robótica educativa — octubre 2026.</figcaption>
</figure>

### 4. Tocar una nota

Bajo **esperar hasta**: **tocar nota … durante … pulsaciones** (**Apariencia** / sonido). Aquí **C4** y **0,25 pulsaciones**.

<figure class="article-figure">
  <img src="/capture/premier_programme/04-jouer-note-c4.png" alt="Bloque tocar nota C4 durante 0,25 pulsaciones bajo esperar hasta." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Respuesta sonora tras la pulsación. Captura mBlock 5 — Emmanuel Sauvage, Robótica educativa — octubre 2026.</figcaption>
</figure>

**Resultado:** al arrancar, el robot solo espera; **una pulsación** dispara la nota **una vez**. Sin un bucle, la acción no se repite sola.

```text
Al arrancar el mBot:
  esperar hasta (botón placa pulsado)
    tocar nota C4 durante 0,25 pulsación
```

## Guardar el proyecto

Guarda a menudo: **Archivo → Guardar en tu ordenador**, carpeta y nombre (**extensión .mblock**).

<figure class="article-figure">
  <img src="/capture/premier_programme/05-enregistrement-barre.png" alt="Barra de herramientas mBlock con guardar." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Guardar desde el menú Archivo o el icono de disco. Captura mBlock 5 — Emmanuel Sauvage, Robótica educativa — octubre 2026.</figcaption>
</figure>

<figure class="article-figure">
  <img src="/capture/premier_programme/06-save-destination.png" alt="Diálogo nombre y carpeta del archivo .mblock." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Conserva una copia antes de cada carga. Captura mBlock 5 — Emmanuel Sauvage, Robótica educativa — octubre 2026.</figcaption>
</figure>

Los guardados siguientes son más rápidos con el **botón de disco** en la barra.

## Conectar el mBot al ordenador

Conecta el robot por **USB** (cable incluido) o prepara el **emparejamiento Bluetooth**. Enciende el mBot. En mBlock pulsa **Conectar**: aparece la lista de dispositivos.

<figure class="article-figure">
  <img src="/capture/premier_programme/07-connexion-dialogue.png" alt="Diálogo Conectar mBlock con lista de dispositivos." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Lista vacía: revisa cable USB y driver (ver párrafo siguiente). Captura mBlock 5 — Emmanuel Sauvage, Robótica educativa — octubre 2026.</figcaption>
</figure>

El chip **CH340** (a veces **CP2102**) es un puente **USB-serie**: permite que el PC hable con la **mCore**. Sin **driver** instalado en Windows, macOS o Linux, **Conectar** queda vacío aunque el cable esté enchufado. Instálalo con nuestra [guía de instalación mBlock 5](/es/instalar-mblock-5-windows/) o desde el sitio del fabricante del chip (nombre en el administrador de dispositivos). Usa un cable **de datos**, no solo de carga.

Elige **USB** o **Bluetooth** (etiquetas variables).

<figure class="article-figure">
  <img src="/capture/premier_programme/08-choix-connexion-usb-bluetooth.png" alt="Elección USB o Bluetooth." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Primera carga: preferir USB. Captura mBlock 5 — Emmanuel Sauvage, Robótica educativa — octubre 2026.</figcaption>
</figure>

<figure class="article-figure">
  <img src="/capture/premier_programme/09-bluetooth-connecte.png" alt="Bluetooth conectado." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Bluetooth — útil para modo Live. Captura mBlock 5 — Emmanuel Sauvage, Robótica educativa — octubre 2026.</figcaption>
</figure>

<figure class="article-figure">
  <img src="/capture/premier_programme/10-usb-connecte.png" alt="USB conectado." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>USB — recomendado para carga y firmware. Captura mBlock 5 — Emmanuel Sauvage, Robótica educativa — octubre 2026.</figcaption>
</figure>

**Bluetooth** para pruebas **en directo**; **USB** para **firmware** y **carga** fiable. Consulta [Bluetooth mBlock](/es/mblock-bluetooth-solucion/).

## Firmware

Actualización **solo por USB**, pilas cargadas. **No desconectes** durante la operación.

<figure class="article-figure">
  <img src="/capture/premier_programme/11-firmware-a-jour.png" alt="mBlock: firmware actualizado." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>No apagues durante la actualización de firmware. Captura mBlock 5 — Emmanuel Sauvage, Robótica educativa — octubre 2026.</figcaption>
</figure>

## Probar antes de cargar

Haz clic en los bloques (o bandera verde) para **comprobar** el comportamiento mientras el PC sigue unido al mBot. **Prueba rápida:** pulsa el botón — la nota suena una vez. Los bloques deben estar **anidados**, no solo cerca.

## Cargar el programa en el mBot

**Cargar** / **Descargar al dispositivo** — luego el script funciona **sin** ordenador.

<figure class="article-figure">
  <img src="/capture/premier_programme/12-televersement.png" alt="mBlock durante la carga del programa." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Espera a que termine la transferencia antes de apagar. Captura mBlock 5 — Emmanuel Sauvage, Robótica educativa — octubre 2026.</figcaption>
</figure>

Si la **carga falla**, mBlock muestra un error (conexión perdida, dispositivo no encontrado): mantén el robot **alimentado**, **reconecta por USB**, confirma **mBot (mCore)**, revisa el script **bloque a bloque** — todo anidado bajo **Cuando el mBot arranca**. Guarda, prueba en **Live**, **Carga** de nuevo. Si falla el Bluetooth, pasa a USB y lee [Bluetooth mBlock](/es/mblock-bluetooth-solucion/).

## Comprobaciones y solución de problemas

| Problema | Causa frecuente | Qué hacer |
| --- | --- | --- |
| Lista **Conectar** vacía | Cable solo carga, falta driver **CH340** | Cable **datos**; driver USB-serie — [instalar mBlock](/es/instalar-mblock-5-windows/) |
| Sin sonido tras la carga | mBot2 seleccionado, bloques mal apilados | Elige **mBot mCore**; verifica los tres bloques anidados |
| OK en Live, nada al desenchufar | Programa no escrito en el robot | **Cargar** hasta el mensaje de fin |
| Carga falla repetidamente | Pilas bajas, firmware pendiente | Recarga; termina la actualización **firmware** por USB |
| Menús distintos de las capturas | Otro modelo | [mBot vs mBot2](/es/mbot-vs-mbot2/) o [bloques mBot](/es/instalar-bloques-mbot/) |

## Archivo de proyecto y siguientes pasos

- **[Descargar `premier_programme.mblock`](/programmes/premier_programme.mblock)** (archivo mBlock 5).
- **[Descargar `primer_programa.mblock`](/programmes/primer_programa.mblock)** (mismo proyecto, nombre en español).

Para ir más allá: haz **repetir** la melodía con **repetir** / **por siempre** — prueba paso a paso. Después [LED RGB](/es/actividad-mbot-hacer-parpadear-leds/) o [medir distancias](/es/actividad-mbot-medir-distancias/).

## Seguir con Scratch y mBlock

**Scratch** es el lenguaje visual del MIT; **mBlock 5** añade bloques **mBot**. Para continuar:

- [mBlock vs Scratch](/es/mblock-vs-scratch/) — diferencias antes de un libro o curso.
- [Actividad Scratch: el cuadrado](/es/actividad-scratch-el-cuadrado/) — bucles sin robot.
- [10 proyectos mBot gratis para el aula](/es/10-proyectos-mbot-gratis-clase/) — progresión en varias sesiones.
- [Proyectos en una hora](/es/proyectos-mbot-una-hora/) — seguimientos breves tras esta primera carga.

Libros generales sobre Scratch y robótica pueden complementar estos tutoriales; empieza por las actividades mBot anteriores, acordes a tu hardware.

## FAQ

### ¿Primer programa recomendado?

Esperar el **botón de placa**, luego **tocar una nota** — validas conexión, bloques y carga.

### ¿USB o Bluetooth?

**USB** para carga y firmware; **Bluetooth** para Live. Ver [primeros pasos](/es/primeros-pasos-mblock-5/).

### ¿mBot2?

Guía para **mCore**; en **mBot2** elige el dispositivo correcto — [mBot vs mBot2](/es/mbot-vs-mbot2/).

### ¿Archivo .mblock?

**[premier_programme.mblock](/programmes/premier_programme.mblock)** y **[primer_programa.mblock](/programmes/primer_programa.mblock)**

*Emmanuel Sauvage — actualizado el 31 de octubre de 2026.*
