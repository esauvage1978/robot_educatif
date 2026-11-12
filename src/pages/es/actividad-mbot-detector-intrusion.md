---
layout: ../../layouts/EsPost.astro
title: "Actividad mBot: detector de intrusión"
description: "Detector de intrusión con mBot: el ultrasónico vigila un umbral; LED y zumbador alertan. Variables y condiciones."
updated: "30 de octubre de 2026"
---

Algunos enlaces de esta página son de afiliados. Si compras a través de ellos, podemos recibir una comisión sin coste extra para ti.

Vas a transformar tu **mBot** en un pequeño «guardián»:

- **Vigila** lo que hay delante (con el **sensor ultrasónico**).
- Si algo se mueve y «entra» en la zona, dispara una **alerta**:
  - LED **rojos**
  - una cara «enfadada» en la **matriz LED**
  - un **bip**
- Y en la versión mejorada, **cuenta** el número de intrusiones.

Prerrequisito recomendado: [medir distancias con el ultrasónico](/es/actividad-mbot-medir-distancias/).

## 1. Requisitos previos

Antes de empezar, asegúrate de tener:

- Un [robot educativo mBot (Makeblock)](/es/mbot-mi-primer-robot-educativo/).
- [mBlock 5 instalado](/es/instalar-mblock-5-windows/).
- Un primer manejo de la [interfaz mBlock 5](/es/primeros-pasos-mblock-5/) (dónde están los bloques, la zona de script, la pestaña Dispositivo).
- Los [bloques de instrucciones del mBot](/es/instalar-bloques-mbot/) (los bloques **naranjas**).

**Consejo**: para evitar problemas de conexión, empieza si puedes por **USB** (el Bluetooth funciona, pero puede ser más caprichoso).

## 2. Sensor ultrasónico

El **sensor ultrasónico** sirve para medir una **distancia**.

### Cómo funciona (versión simple)

El sensor hace como un murciélago:

- **Envía** un pequeño «ping» (un ultrasonido, inaudible).
- **Escucha** el eco que vuelve tras rebotar en un obstáculo.
- Calcula la distancia con el **tiempo** entre «ping» y «eco».

```text
mBot (sensor)                          obstáculo
  ping  ───────────────────────────────►
        ◄──────────────────────────────  eco
```

<details>
<summary><strong>Para curiosos (opcional)</strong> — física breve: por qué el sonido permite medir una distancia</summary>

El sonido viaja en el aire a una velocidad finita: en la práctica se suele retener **unos 340 m/s** (en realidad más bien **~343 m/s a 20 °C**; el valor exacto depende un poco de la **temperatura** y la **humedad**).

A escala del Universo, 340 m/s es **enorme** para un ser humano (como un avión de línea). A escala de un **pequeño robot** a unas decenas de centímetros de un obstáculo, es al contrario **bastante lento** — y por suerte:

- la **luz** va casi a **300 000 km por segundo**: para medir una distancia «salón / aula», un sensor luminoso (láser, infrarrojo muy rápido) vería un retraso casi nulo;
- la **onda sonora**, en cambio, tarda un **tiempo medible** en el **ida y vuelta**. Ese retraso (unos **microsegundos** o milisegundos) es lo que la placa del sensor mide con un cronómetro electrónico.

**Fórmula (ida y vuelta).** Si `t` es el tiempo entre la emisión del ping y el retorno del eco, la distancia `d` hasta el obstáculo es:

`d = (v_sonido × t) / 2`

El **÷2** viene de que `t` cuenta el **trayecto de ida + vuelta**: la onda recorre **dos veces** la distancia `d`.

**Ejemplo de orden de magnitud.** Para un obstáculo a **34 cm** (0,34 m), el ida y vuelta representa **0,68 m**; con `v_sonido ≈ 340 m/s`, el retraso es del orden de `0,68 / 340 ≈ 0,002 s`, es decir **2 ms**. Es corto para nosotros, pero **más que suficiente** para un chip electrónico — de ahí la precisión «a unos centímetros» de los sensores ultrasónicos habituales.

</details>

### Consejos prácticos (para medidas estables)

- El sensor suele funcionar bien entre **~3 cm y ~400 cm**.
- Para probar, usa un obstáculo **plano** (libro, caja), bien de frente.
- Si el obstáculo es **blando** (cortina) o **inclinado**, la medida puede «saltar».

En esta actividad no buscamos una medida perfecta al milímetro: queremos sobre todo detectar un **cambio** (algo ha aparecido / se ha movido).

## 3. Programa de detección de intrusión

### 3.1 Programa básico

**Objetivo**: el robot memoriza una distancia de «referencia» al inicio, luego compara en bucle.  
Si cambia mucho, grita «¡intrusión!».

#### La idea

1. Colocas el mBot para que mire la zona a vigilar.
2. Espera 3 segundos (tiempo de colocarlo).
3. Mide una primera distancia: es la **referencia**.
4. Después mide en bucle:
   - si es casi igual → se queda calmado
   - si es muy distinto → dispara la alerta

### Ilustraciones (capturas)

![Imagen del robot mBot en espera de detección](/capture/activite-mbot-detecteur-dintrusion/robot-mbot-attente-detection.png)

![Imagen del robot mBot detectando una intrusión](/capture/activite-mbot-detecteur-dintrusion/robot-mbot-detectant-intrusion.png)

![Imagen del programa de detección básico](/capture/activite-mbot-detecteur-dintrusion/programme-detection-basique.png)

#### ¿Por qué esperar 3 segundos al principio?

Para darte tiempo de:

- encender el robot,
- colocarlo bien frente a la zona,
- no mover las manos delante del sensor mientras toma la referencia.

#### Las variables (palabras sencillas)

> En mBlock, el **nombre visible** puede estar en español; el identificador en el código generado sigue el idioma de la interfaz. Aquí: `referencia` y `medida`.

- `referencia`: la distancia «normal» al inicio.
- `medida`: la distancia medida ahora.

### 3.1 bis Redacción del programa (mBlock 5) — versión muy guiada

**A crear en Variables**:

| Variable (en el programa) | Etiqueta ES | Para qué sirve |
|---|---|---|
| `referencia` | Referencia | Distancia de partida (cm) |
| `medida` | Medida / lectura | Distancia actual (cm) |
| `intrusiones` | Intrusiones | Contador (para la versión 3.2) |

**Programa básico (detección simple)**:

1. **Cuando se hace clic en la bandera verde** *(o «cuando el mBot arranca» si cargas)*  
2. **Esperar 3 segundos**  
3. **Poner `referencia` a** la `distancia ultrasónica (cm)`  
4. **Para siempre**:
   - poner `medida` a la `distancia ultrasónica (cm)`
   - **si** `medida` es muy distinta de `referencia` **entonces**:
     - LED **rojos**
     - cara «enfadada»
     - tocar una nota (bip) **0,25 pulsación**
   - **si no**:
     - LED **verdes**
     - cara «calmada»

#### El truco que lo cambia todo (muy importante)

El sensor puede variar un poco aunque nadie pase.  
Así que en lugar de «≠», usa un **umbral**, por ejemplo **3 cm**:

```text
si |medida - referencia| > 3 entonces intrusión
```

Así, un pequeño «temblor» de medida no dispara la alarma.

> Si no tienes el bloque «valor absoluto», puedes hacer un test más simple:  
> «intrusión si `medida > referencia + 3` O `medida < referencia - 3`».

## 3.2 Añadir una funcionalidad

El programa básico funciona, pero falta una cosa:  
**¿cuántas veces** ha pasado alguien?

Así que vamos a:

- crear (o usar) la variable `intrusiones`,
- incrementarla en cada intrusión,
- mostrar el número en la matriz LED (o hacerlo desfilar).

![Imagen del programa de detección con contador de intrusiones](/capture/activite-mbot-detecteur-dintrusion/programme-detection-compteur-intrusion.png)

#### Qué añadir en los bloques (versión simple)

- Al inicio: **poner `intrusiones` a 0**
- En la rama «intrusión»:
  - **añadir 1 a `intrusiones`**
  - mostrar `intrusiones` en la matriz LED

> Truco: para no contar 20 veces la misma intrusión (cuando alguien se queda delante), añade `esperar 1 segundo` después de la alerta.

### 3.3 Refactorización

Cuando el script crece, se vuelve difícil de leer.

Así que organizamos las acciones en «pequeñas funciones» (en mBlock: **Mis bloques**).

**Objetivo**: que el programa principal siga corto y claro.

![Imagen del programa con contador e subprogramas](/capture/activite-mbot-detecteur-dintrusion/programme-detection-compteur-intrusion-sous-programme.png)

#### Idea de desglose (muy simple)

- **Bloque personalizado «Estado en espera»**:
  - LED verdes
  - cara calmada
  - *(opción pedagógica)* un parámetro `nbr_intrusion` para mostrar el contador incluso en espera — ver el recuadro abajo
- **Bloque personalizado «Alerta intrusión»**:
  - LED rojos
  - cara enfadada
  - bip
  - `intrusiones = intrusions + 1`
  - mostrar el contador

Luego, en el bucle, solo haces:

- si intrusión → llamar **Alerta intrusión**
- si no → llamar **Estado en espera**

#### ¿Por qué añadí `nbr_intrusion` al bloque «Estado en espera»? (pedagogía)

Para la enseñanza, di deliberadamente al bloque personalizado **«Estado en espera»** un **parámetro** del tipo `nbr_intrusion`, aunque **no era estrictamente necesario**.

En mBlock / Scratch, la variable `intrusiones` suele ser una variable **global**: una vez creada en la pestaña *Variables*, **todo el programa** (incluido el interior de un bloque personalizado) puede **leerla** y **modificarla** sin necesidad de «pasarla como argumento».

**¿Qué es el *alcance* (scope) de una variable?**

En informática, el **alcance** es **el lugar del programa donde una variable existe y es visible**.

- **Variable global**: conocida **en todas partes** del proyecto (el script principal, los bloques personalizados, etc.). Suele ser el caso de `intrusiones`.
- **Variable local**: visible **solo** en un trozo pequeño de código (por ejemplo **dentro** de una función, o un parámetro que solo existe para ese bloque). Cuando la función termina, esa variable a menudo «desaparece» desde el punto de vista del programa.

Así, para **Estado en espera**, *podríamos* usar directamente `intrusiones` dentro del bloque: el contador seguiría siendo el correcto gracias al alcance **global**.

**Entonces, ¿por qué añadir `nbr_intrusion` igualmente?**

- Para mostrar a los alumnos la idea de **función que recibe una información** (como en mates: \(f(x)\)), aunque aquí la información ya esté disponible en otro sitio.
- Para preparar lenguajes en los que se evita depender demasiado de variables globales: se **pasan explícitamente** los valores que el bloque necesita, lo que hace el programa más legible.

Cuando mBlock **genera** el programa en **C** (Arduino), a menudo se ve en forma de **funciones** con **parámetros**. La captura de abajo ilustra esa idea de alcance y cómo el bloque personalizado recibe `nbr_intrusion`:

![Extracto de código C: alcance de la variable intrusions y parámetro nbr_intrusion](/capture/activite-mbot-detecteur-dintrusion/code-c-portee-variable.png)

## 3.4 Optimización de la visualización

Último detalle: a veces el contador se muestra con **decimales** (p. ej. `3.00`).  
Para un contador de intrusiones queremos un **número entero**: `1`, `2`, `3`…

### Opción 1 (recomendada para los más jóvenes): quedarse en bloques

En muchas versiones de mBlock, si usas «añadir 1 a `intrusiones`» y lo muestras tal cual, ya se ve bien.

### Opción 2 (avanzada): pasar por el código Arduino (si hace falta)

Si en tu caso muestra decimales, puedes corregirlo en el código.

1. Clicar en el símbolo </>  
2. Copiar el código fuente mostrado (CTRL + A luego CTRL + C)  
3. Pulsar la pestaña Arduino C  
4. Pegar el código  
5. Cambiar el tipo de la variable `intrusiones` de `float` a `int`

> Hazlo con un adulto / un profesor si eres joven: se toca el código «texto».

### 3.5 Programas mBlock

Puedes descargar los programas mBlock de la actividad:

- Programa básico: [`programme_detection_basique.mblock`](/capture/activite-mbot-detecteur-dintrusion/programme_detection_basique.mblock)
- Versión contador: [`programme_detection_compteur intrusion.mblock`](/capture/activite-mbot-detecteur-dintrusion/programme_detection_compteur%20intrusion.mblock)
- Versión «subprogramas»: [`programme_detection_compteur_intrusion_sous_programme.mblock`](/capture/activite-mbot-detecteur-dintrusion/programme_detection_compteur_intrusion_sous_programme.mblock)

Si prefieres reconstruirlo a mano, también puedes seguir:

- la sección **3.1 bis** (programa básico),
- luego las adiciones de las secciones **3.2** y **3.3**,
- ayudándote con las capturas.

Ver también: [Programas mBlock](/programmes/) (índice francés).

## 4. Aprender a desarrollar

Si quieres progresar, aquí va una progresión «fácil»:

- rehacer esta actividad cambiando un solo parámetro (umbral 3 cm → 5 cm),
- añadir un LED «naranja» cuando el obstáculo está «en medio»,
- luego pasar a otras actividades mBot del sitio (sensores, motores, pequeños retos).

Y si quieres ir más lejos en programación, Scratch/mBlock son una muy buena puerta de entrada: lo más importante es entender **variables + condiciones + bucles**.

**Para el aula**: nuestros [10 proyectos mBot gratis](/es/10-proyectos-mbot-gratis-clase/) proponen una progresión completa en 10 sesiones, con fichas de alumnos y soluciones en PDF.

[mBot — Amazon.es](https://www.amazon.es/dp/B07XR98YYQ?tag=roboteducat07-21)
