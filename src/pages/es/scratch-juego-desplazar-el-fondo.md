---
layout: ../../layouts/EsPost.astro
title: "Scratch: desplazar un decorado con las flechas"
description: "Parte 1: dibujar un suelo más ancho que el escenario y moverlo 5 píxeles con las flechas, tres variables y un tope."
updated: "12 de noviembre de 2026"
---

Esta es la primera parte de una serie. Construye el suelo de un juego y lo desplaza con las flechas. El personaje, las plataformas y el salto no están en esta página.

## 1. Antes

[Instala mBlock 5](/es/instalar-mblock-5-windows/) o abre [Scratch](https://scratch.mit.edu/). Escenario, objeto y categorías de bloques: [interfaz de mBlock 5](/es/primeros-pasos-mblock-5/). El [cuadrado](/es/actividad-scratch-el-cuadrado/) es un primer programa en un objeto.

Varios programas pueden vivir en el mismo objeto y correr a la vez. La zona de programas muestra el objeto seleccionado.

## 2. Un suelo más ancho que el escenario

El suelo es un **objeto**, no un fondo. El fondo no tiene la categoría **Movimiento**, así que no cambia x.

1. En **Objetos**, pulsa **añadir** y luego **Pintar**.
2. Dibuja una losa cuya parte de arriba sea de un solo color en todo el recorrido.
3. Si hay varias piezas, **convertir en mapa de bits** y después el comando que funde la selección en una forma.
4. Duplica (Ctrl+C, Ctrl+V), alinea cinco copias, selecciona todo (Ctrl+A) y vuelve a fundir.
5. Desplaza ese bloque al borde derecho del área de dibujo y añade una losa. En el recorrido original la anchura pasaba entonces a 841 píxeles. Lee el número de tu pantalla.
6. Repite hasta un disfraz de al menos 7 000 píxeles. El escenario de Scratch mide 480 píxeles de ancho.

## 3. El programa

El escenario va de x = −240 a x = 240. La x del objeto es el centro del disfraz. Flecha derecha: el suelo se mueve 5 píxeles a la izquierda. Flecha izquierda: al revés.

Crea tres variables **solo para este objeto**: `decor_largeur` (anchura leída), `decor_debut` (x de inicio), `decor_fin` (x de fin).

Cuando se pulsa la bandera verde:

1. pon `decor_largeur` a esa anchura (7 000 en el ejemplo);
2. pon `decor_debut` a `(decor_largeur / 2) − 240`;
3. pon `decor_fin` a `240 − (decor_largeur / 2)`;
4. ve a x: `decor_debut`, y: 0.

Con 7 000, el inicio vale 3 260 y el fin −3 260. El borde izquierdo del disfraz coincide entonces con el borde izquierdo del escenario. Esta cuenta no se ha vuelto a ejecutar en Scratch para esta actualización. Si el suelo no empieza a la izquierda, el signo o la anchura leída no coinciden con el disfraz.

Dentro de **por siempre**:

- si **flecha derecha presionada** y **posición x > decor_fin**, **suma −5 a x**;
- si **flecha izquierda presionada** y **posición x < decor_debut**, **suma 5 a x**.

Comprobación: bandera verde, el suelo está a la izquierda. La flecha derecha lo desplaza y se para en `decor_fin`. La flecha izquierda lo devuelve y se para en `decor_debut`.

## 4. Seguir

Ejemplos en [Scratch](https://scratch.mit.edu/). En este sitio: [el cuadrado](/es/actividad-scratch-el-cuadrado/), [instalar mBlock 5](/es/instalar-mblock-5-windows/), [primer programa mBot](/es/primer-programa-mbot/).
