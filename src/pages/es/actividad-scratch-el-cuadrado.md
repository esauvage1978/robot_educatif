---
layout: ../../layouts/EsPost.astro
title: "Cómo hacer un cuadrado en Scratch (actividad fácil)"
description: "Cómo hacer un cuadrado en Scratch: coloca el objeto, piensa el recorrido y prográmalo con el lápiz y el bucle «repetir 4 veces». Actividad paso a paso para empezar."
updated: "31 de octubre de 2026"
---

Algunos enlaces de esta página son de afiliados. Si compras a través de ellos, podemos recibir una comisión sin coste adicional.

Dibujar un cuadrado es uno de los mejores primeros retos para aprender a programar. Hacen falta muy pocos bloques, pero te obliga a hacerte las preguntas adecuadas: ¿dónde está el objeto? ¿Hacia dónde mira? ¿Qué debe hacer y cuántas veces?

En esta actividad vas a hacer caminar a un pequeño objeto (el personaje del escenario, aquí un panda) alrededor de un cuadrado de 200 pasos de lado. Primero entenderás cómo se localizan los puntos en el escenario, luego colocarás el objeto en el sitio correcto y por último **programarás tú mismo el recorrido**. La solución está más abajo, plegada, para que puedas probar primero: se aprende mejor intentándolo, e incluso equivocándose un poco.

La actividad es adecuada desde los 8 años, con un adulto al lado para los más pequeños. Calcula unos 30 minutos.

## Lo que necesitas antes de empezar

Un programa para programar con bloques y algo de familiaridad con su pantalla:

- **Scratch** (el software gratuito del MIT, el Instituto Tecnológico de Massachusetts, que se puede usar en línea en [scratch.mit.edu](https://scratch.mit.edu/)) o **mBlock 5** (el software de Makeblock, construido a partir de Scratch 3, que añade la programación de robots). Para instalar mBlock, sigue nuestra guía [instalar mBlock 5 en Windows 10/11](/es/instalar-mblock-5-windows/).
- Haber dado una vuelta por la pantalla: el escenario, las categorías de bloques y la zona de scripts. La guía [primeros pasos con mBlock 5](/es/primeros-pasos-mblock-5/) presenta cada una de estas zonas.

Las capturas de este artículo proceden de mBlock 5. Con Scratch en línea los bloques son los mismos; solo cambian ligeramente algunos nombres de menús.

## El escenario y su sistema de coordenadas

Para decirle a un objeto adónde ir, hace falta una forma de señalar un lugar exacto del escenario. Scratch y mBlock usan para ello un **sistema de referencia ortonormal**: dos ejes que se cruzan en ángulo recto, con la misma graduación en ambos.

- El eje **X** es horizontal: los valores aumentan hacia la derecha.
- El eje **Y** es vertical: los valores aumentan hacia arriba.
- El punto donde se cruzan los dos ejes se llama **origen**. Sus coordenadas son **(0, 0)** y se encuentra en el **centro** del escenario.

Las coordenadas de un punto se escriben **(x, y)**: primero la **abscisa** (la posición horizontal) y luego la **ordenada** (la posición vertical). El punto (50, −30), por ejemplo, está 50 unidades a la derecha del centro y 30 unidades por debajo.

![Esquema del sistema de referencia del escenario de mBlock / Scratch: origen en el centro, eje x de −240 a +240, eje y de −180 a +180.](/images/blog/activite-scratch-carre/repere-orthonorme-mblock.svg)

*El escenario mide 480 unidades de ancho y 360 de alto. Una unidad corresponde a un «paso» del objeto: cuando escribas «mover 10 pasos», se desplazará 10 unidades.*

> **Límites del escenario:** para que el objeto siga visible, **x** debe permanecer entre **−240** y **+240**, e **y** entre **−180** y **+180**.

## Colocar el objeto en el punto de partida

Nuestro cuadrado empezará en la esquina superior izquierda. Coloca, pues, el objeto en las coordenadas **(−100, 100)**.

![El panda colocado en la parte alta izquierda del escenario, en el punto (−100, 100).](/capture/carre/01-placement-lutin-moins100-100.png)

*El panda, colocado arriba a la izquierda del escenario.*

Hay dos formas de hacerlo: **arrastrar el objeto con el ratón** por el escenario o **escribir los valores** en el panel del objeto, en la pestaña **Objetos**. El segundo método es el más preciso.

![El panel Objetos de mBlock, con X = −100, Y = 100, Tamaño = 100 y Dirección = 90.](/capture/carre/02-saisie-coordonnees-lutin.png)

*El panel Objetos: X vale −100 e Y vale 100. Fíjate también en el campo **Dirección**, que vale 90: el objeto mira hacia la derecha. Ten presente este dato, te hará falta.*

## ¡Te toca programar!

Este es el reto. El objeto está en (−100, 100), mira hacia la derecha y el lado del cuadrado mide **200 pasos**.

> **Tu misión:** al pulsar la **barra espaciadora**, el objeto recorre los cuatro lados del cuadrado en el **sentido de las agujas del reloj** (sentido horario) y luego vuelve a su punto de partida.

Antes de tocar un solo bloque, coge una hoja de papel. Dibuja el cuadrado, anota dónde está cada una de las cuatro esquinas e imagina qué debe hacer el objeto en cada esquina. Ese minuto de reflexión te ahorrará mucho tiempo.

### Dónde encontrar los bloques

Los bloques están ordenados por **categorías**, en la columna izquierda de la zona de programación. Cada categoría tiene su color: azul para **Movimiento**, naranja para **Control**, amarillo para **Eventos**, etc. En la parte inferior de la columna, el botón **extensión** permite añadir categorías adicionales.

![La lista de categorías de bloques de mBlock 5: Buscar, Movimiento, Apariencia, Sonido, Eventos, Control, Sensores, Operadores, Variables, Mis bloques y el botón extensión.](/images/blog/premier-pas-mblock/mblock-categories-blocs.png)

*Las categorías de bloques de mBlock 5. El botón «extensión», abajo, sirve para añadir la del lápiz.*

Después montas los bloques en la gran **zona de scripts**, arrastrándolos y encajándolos unos debajo de otros, como piezas de un puzle. Un bloque que no encaja no hace nada: si queda separado de los demás, no se ejecutará.

![La zona de scripts de mBlock 5, vacía: una cuadrícula de puntos sobre la que se sueltan los bloques.](/images/blog/premier-pas-mblock/mblock-zone-script.png)

*La zona de scripts, todavía vacía. Aquí construirás tu programa.*

### Una pista para lograrlo: el lápiz y el bucle

Con el **lápiz** puedes hacer que el objeto trace una línea tras de sí. Estos son los ingredientes del método que menos bloques usa, sin decirte en qué orden colocarlos:

- un bloque de la categoría **Eventos** para empezar con el teclado: «al presionar la tecla espacio»;
- el **lápiz**, que se añade con el botón **extensión** (elige la extensión Lápiz): hay que bajarlo para que el objeto deje un rastro;
- el bloque **mover … pasos**, de la categoría **Movimiento**;
- el bloque **girar ↻ … grados**, también en **Movimiento**. La flecha ↻ gira en sentido horario;
- el **bucle** «**repetir … veces**» de la categoría **Control**: en lugar de copiar varias veces los mismos bloques, se colocan dentro del bucle, que los repite tantas veces como se le pida.

Un cuadrado es cuatro veces lo mismo: un lado y luego un giro. Pregúntate entonces qué hay que meter en el bucle, cuántas veces repetirlo y cuántos grados girar en cada esquina.

Si prefieres razonar con las **coordenadas** de tus cuatro esquinas, también puedes usar el bloque «deslizar en … segundos a x: … y: …», que desplaza el objeto con suavidad hasta un punto dado. Los dos métodos son válidos.

### Cómo comprobar tu trabajo

Pulsa la **barra espaciadora** del teclado. Lo has logrado si:

1. el objeto da una vuelta completa en sentido horario;
2. vuelve exactamente a su punto de partida;
3. si usa el lápiz, el rastro dibuja de verdad un cuadrado, y no un rectángulo ni una espiral.

Algunas pistas si no funciona: un giro en el sentido equivocado (↺ en lugar de ↻) manda al objeto fuera del escenario, donde se queda atascado en el borde. Un bloque olvidado en el bucle da una figura abierta. Y si no se mueve nada, comprueba que todos los bloques estén bien encajados bajo el bloque «al presionar la tecla espacio».

Tómate el tiempo de probar. Cuando hayas terminado, o si te atascas, abre la solución de abajo.

<details class="exercise-solution">
<summary class="exercise-solution__summary">Ver una solución (después de intentarlo)</summary>

### Las coordenadas de las cuatro esquinas

El cuadrado mide 200 pasos de lado y el punto de partida es (−100, 100). En sentido horario, las cuatro esquinas son, por tanto:

| Etapa | Esquina | Coordenadas |
|---|---|---|
| Salida | Arriba a la izquierda | (−100, 100) |
| 1 | Arriba a la derecha | (100, 100) |
| 2 | Abajo a la derecha | (100, −100) |
| 3 | Abajo a la izquierda | (−100, −100) |
| Regreso | Arriba a la izquierda | (−100, 100) |

Para pasar de una esquina a otra, solo cambia una de las dos coordenadas, y cambia en 200: justo la longitud del lado.

### Solución con coordenadas

Este es el script que contiene el archivo del proyecto: al pulsar espacio, el objeto se desliza durante 1 segundo hacia cada una de las tres esquinas siguientes y luego vuelve a la salida.

![El script: al presionar la tecla espacio, cuatro bloques «deslizar en 1 segundos a x: y:» con los valores (100, 100), (100, −100), (−100, −100), (−100, 100).](/capture/carre/03-scene-preparee-carre.png)

*El script de la solución. Los cuatro bloques «deslizar» siguen las esquinas del cuadrado en sentido horario.*

Puedes **[descargar el proyecto `carre.mblock`](/capture/carre/carre.mblock)** (el nombre del archivo está en francés y significa «cuadrado»): contiene el panda ya colocado en (−100, 100) y este script. Ábrelo con mBlock 5 (menú **Archivo** y luego **Abrir**). Si usas Scratch en línea, copia simplemente los bloques de la captura.

### Solución con el lápiz y «repetir 4 veces»

Esta versión usa un giro de 90 grados en cada esquina. El objeto mira hacia la derecha (dirección 90): avanza 200 pasos, gira 90° a la derecha y mira entonces hacia abajo, avanza 200 pasos, y así sucesivamente hasta encontrar su posición de partida. Los cuatro giros de 90° suman justo una vuelta completa, es decir, 360°.

Esta es la estructura del script, bloque a bloque (en forma de texto, para reconstruirlo en la zona de scripts):

```text
al presionar la tecla [espacio]
borrar todo
ir a x: -100 y: 100
apuntar en dirección 90
bajar lápiz
repetir 4 veces
    mover 200 pasos
    girar ↻ 90 grados
subir lápiz
```

Las tres primeras líneas después del evento devuelven el objeto a su estado inicial: así puedes volver a lanzar el programa tantas veces como quieras, sin que los rastros anteriores ni la posición final estorben. Merece la pena adquirir este hábito.

</details>

## Para ir más lejos

Cuando tu cuadrado funcione, modifícalo para ver qué cambia cada valor:

- cambia la longitud del lado, por ejemplo 100 o 150 pasos;
- cambia el color o el grosor de la línea con los bloques de la extensión Lápiz;
- traza un **triángulo equilátero**: tiene 3 lados y el objeto gira 120° en cada esquina (360 dividido entre 3);
- traza un **hexágono**: 6 lados y 60° en cada esquina (360 dividido entre 6).

Acabas de descubrir una regla útil: para una figura regular de n lados, se repite n veces «avanzar y luego girar 360 ÷ n grados».

Si este primer programa te ha gustado, el siguiente paso con un robot real es el [primer programa mBot](/es/primer-programa-mbot/). Y si dudas entre los dos programas, lee [mBlock o Scratch: ¿cuál elegir?](/es/mblock-vs-scratch/).

## Preguntas frecuentes

### ¿Cómo se hace un cuadrado en Scratch?

Coloca el objeto en una esquina, baja el lápiz y luego repite 4 veces «mover 200 pasos» y «girar 90 grados». El objeto traza así cuatro lados iguales y cuatro ángulos rectos. El otro método consiste en usar las coordenadas de las cuatro esquinas con el bloque «deslizar a x: y:». Las dos soluciones se detallan más arriba, en la sección plegada.

### ¿Por qué hay que repetir 4 veces y por qué girar 90°?

Un cuadrado tiene 4 lados iguales y 4 ángulos rectos. Un ángulo recto mide 90 grados. El bucle «repetir 4 veces» vuelve a ejecutar las mismas dos instrucciones (un lado, un giro) en cada esquina, sin copiar los bloques. Tras cuatro giros de 90°, el objeto ha girado 360°: vuelve a mirar en su dirección inicial.

### ¿Hay alguna diferencia entre Scratch y mBlock para esta actividad?

No, los bloques de movimiento, control y lápiz son los mismos, porque mBlock 5 está construido a partir de Scratch 3. La diferencia está en las posibilidades: Scratch sirve para crear animaciones y juegos, mientras que mBlock permite además programar robots (como mBot) y ofrece un modo Python. Para elegir, lee [mBlock o Scratch: ¿cuál elegir?](/es/mblock-vs-scratch/).

### El objeto no traza ninguna línea, ¿qué hago?

Comprueba que el bloque que baja el lápiz («bajar lápiz») se ejecuta antes de los movimientos y que no va seguido demasiado pronto de un bloque que lo sube. Comprueba también que la extensión Lápiz está añadida.

*Autor: Emmanuel Sauvage.*
