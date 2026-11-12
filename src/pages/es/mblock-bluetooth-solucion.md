---
layout: ../../layouts/EsPost.astro
title: "mBlock Bluetooth: el mBot no se conecta (solución)"
description: "¿El mBot, el mBot2 o el Codey Rocky no se conectan en mBlock? Revisa USB, firmware, Bluetooth del PC, emparejamiento, distancia e interferencias, en ese orden. Primero el cable USB."
updated: "11 de noviembre de 2026"
---

El **Bluetooth** entre **mBlock** y un robot (**mBot**, **mBot2**, **Codey Rocky**) suele ser el primer tropiezo: con el cable USB funciona, sin cable no. Las causas caben en pocos grupos: **software**, **radio del PC**, **emparejamiento** y **entorno**. El orden de abajo evita mezclarlo todo.

## 1. El orden

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Paso</th>
<th scope="col">Comprobación</th>
<th scope="col">Por qué</th>
</tr></thead><tbody>
<tr>
<td data-label="Paso"><span class="td-val">1</span></td>
<td data-label="Comprobación"><span class="td-val"><strong>Probar el robot por USB</strong></span></td>
<td data-label="Por qué"><span class="td-val">si la carga por USB falla, el Bluetooth no es el problema</span></td>
</tr>
<tr>
<td data-label="Paso"><span class="td-val">2</span></td>
<td data-label="Comprobación"><span class="td-val"><strong>Actualizar mBlock</strong></span></td>
<td data-label="Por qué"><span class="td-val">hace falta una versión adecuada al sistema</span></td>
</tr>
<tr>
<td data-label="Paso"><span class="td-val">3</span></td>
<td data-label="Comprobación"><span class="td-val"><strong>Actualizar el firmware del robot</strong></span></td>
<td data-label="Por qué"><span class="td-val">un firmware antiguo puede bloquear el Bluetooth</span></td>
</tr>
<tr>
<td data-label="Paso"><span class="td-val">4</span></td>
<td data-label="Comprobación"><span class="td-val"><strong>Bluetooth del PC</strong></span></td>
<td data-label="Por qué"><span class="td-val">modo avión, tecla Fn, controladores</span></td>
</tr>
<tr>
<td data-label="Paso"><span class="td-val">5</span></td>
<td data-label="Comprobación"><span class="td-val"><strong>Emparejar de nuevo</strong></span></td>
<td data-label="Por qué"><span class="td-val">quitar el dispositivo antiguo y emparejar otra vez</span></td>
</tr>
<tr>
<td data-label="Paso"><span class="td-val">6</span></td>
<td data-label="Comprobación"><span class="td-val"><strong>Distancia e interferencias</strong></span></td>
<td data-label="Por qué"><span class="td-val">probar primero a cerca de 1 m</span></td>
</tr>
</tbody>
</table>
</div>

## 2. Software y firmware

Instala mBlock desde el sitio oficial y lee las notas de la versión de tu modelo: [instalar mBlock 5](/es/instalar-mblock-5-windows/). Actualiza el firmware siguiendo la documentación de Makeblock **de tu** robot. Tras una actualización importante, reinicia el robot y el PC.

## 3. Bluetooth en el ordenador

En un portátil, el **modo avión** o una **tecla Fn** pueden apagar la radio sin un aviso claro. Si los intentos siguen vacíos, un adaptador USB Bluetooth reciente puede ser más estable que el chip integrado. Esta página no nombra un modelo.

## 4. Emparejamiento en Windows

Si Windows está en español, abre **Configuración** y luego **Bluetooth y dispositivos**. Quita el dispositivo antiguo y empareja de nuevo. Cierra las otras aplicaciones que puedan retener el robot (mandos, una segunda ventana de mBlock). Los nombres de menú siguen el idioma de Windows.

## 5. Distancia e interferencias

Prueba **cerca del ordenador** (alrededor de 1 m), sin un muro metálico de por medio. Aleja los dispositivos **USB 3.0**: pueden molestar algunos enlaces a 2,4 GHz. No es sistemático.

## 6. ¿USB o Bluetooth?

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Situación</th>
<th scope="col">Elección</th>
</tr></thead><tbody>
<tr>
<td data-label="Situación"><span class="td-val">Aula</span></td>
<td data-label="Elección"><span class="td-val">USB para <strong>cargar</strong> el programa; Bluetooth para las pruebas si la sala lo permite</span></td>
</tr>
<tr>
<td data-label="Situación"><span class="td-val">Concurso o demostración</span></td>
<td data-label="Elección"><span class="td-val">USB, o un enlace <strong>probado el día anterior</strong></span></td>
</tr>
<tr>
<td data-label="Situación"><span class="td-val">Búsqueda del fallo</span></td>
<td data-label="Elección"><span class="td-val"><strong>siempre</strong> comprobar por USB antes de culpar al robot</span></td>
</tr>
</tbody>
</table>
</div>

Primero el **USB**, para ver si el robot responde. Después el **Bluetooth**, con mBlock al día y un emparejamiento limpio. El paso siguiente es el [primer programa mBot](/es/primer-programa-mbot/).
