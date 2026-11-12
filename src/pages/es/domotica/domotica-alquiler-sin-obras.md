---
layout: ../../../layouts/EsPost.astro
title: "Domótica en alquiler: ¿qué se puede instalar sin obras?"
description: "Inquilino o vivienda temporal: enchufes inteligentes, sensores a pilas, cabezales termostáticos, interruptores inalámbricos y cámaras sin taladrar. Qué instalar, qué pedir al propietario y cómo llevarte todo al mudarte."
updated: "24 de octubre de 2026"
---

Ser inquilino no impide tener una casa conectada. La regla es simple: **todo lo que se enchufa, se pega o se atornilla en algo existente** se puede montar y llevarte al irte. Lo que toca el cuadro eléctrico, interruptores empotrados o la caldera requiere permiso del propietario y, a menudo, un electricista autorizado.

## Lo esencial en una tabla

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Equipo</th>
<th scope="col">Instalación</th>
<th scope="col">¿Permiso del propietario?</th>
<th scope="col">¿Te lo llevas?</th>
<th scope="col">Protocolo habitual</th>
</tr></thead><tbody>
<tr>
<td data-label="Equipo"><span class="td-val">Enchufe inteligente</span></td>
<td data-label="Instalación"><span class="td-val">se enchufa</span></td>
<td data-label="¿Permiso del propietario?"><span class="td-val">no</span></td>
<td data-label="¿Te lo llevas?"><span class="td-val">sí</span></td>
<td data-label="Protocolo habitual"><span class="td-val">Wi-Fi, Zigbee, Matter</span></td>
</tr>
<tr>
<td data-label="Equipo"><span class="td-val">Sensor temp. / humedad</span></td>
<td data-label="Instalación"><span class="td-val">colocado o pegado</span></td>
<td data-label="¿Permiso del propietario?"><span class="td-val">no</span></td>
<td data-label="¿Te lo llevas?"><span class="td-val">sí</span></td>
<td data-label="Protocolo habitual"><span class="td-val">Zigbee, Bluetooth</span></td>
</tr>
<tr>
<td data-label="Equipo"><span class="td-val">Sensor de apertura</span></td>
<td data-label="Instalación"><span class="td-val">adhesivo</span></td>
<td data-label="¿Permiso del propietario?"><span class="td-val">no</span></td>
<td data-label="¿Te lo llevas?"><span class="td-val">sí (quitar el adhesivo)</span></td>
<td data-label="Protocolo habitual"><span class="td-val">Zigbee</span></td>
</tr>
<tr>
<td data-label="Equipo"><span class="td-val">Bombilla conectada</span></td>
<td data-label="Instalación"><span class="td-val">se enrosca</span></td>
<td data-label="¿Permiso del propietario?"><span class="td-val">no</span></td>
<td data-label="¿Te lo llevas?"><span class="td-val">sí (vuelves la antigua)</span></td>
<td data-label="Protocolo habitual"><span class="td-val">Zigbee, Wi-Fi, Matter</span></td>
</tr>
<tr>
<td data-label="Equipo"><span class="td-val">Botón / interruptor inalámbrico</span></td>
<td data-label="Instalación"><span class="td-val">adhesivo</span></td>
<td data-label="¿Permiso del propietario?"><span class="td-val">no</span></td>
<td data-label="¿Te lo llevas?"><span class="td-val">sí</span></td>
<td data-label="Protocolo habitual"><span class="td-val">Zigbee</span></td>
</tr>
<tr>
<td data-label="Equipo"><span class="td-val">Cabezal termostático inteligente</span></td>
<td data-label="Instalación"><span class="td-val">sustituye la cabeza del radiador</span></td>
<td data-label="¿Permiso del propietario?"><span class="td-val">consultar</span></td>
<td data-label="¿Te lo llevas?"><span class="td-val">sí (guarda la antigua)</span></td>
<td data-label="Protocolo habitual"><span class="td-val">Zigbee, Thread</span></td>
</tr>
<tr>
<td data-label="Equipo"><span class="td-val">Cámara interior</span></td>
<td data-label="Instalación"><span class="td-val">apoyada</span></td>
<td data-label="¿Permiso del propietario?"><span class="td-val">no (respeta la privacidad)</span></td>
<td data-label="¿Te lo llevas?"><span class="td-val">sí</span></td>
<td data-label="Protocolo habitual"><span class="td-val">Wi-Fi</span></td>
</tr>
<tr>
<td data-label="Equipo"><span class="td-val">Módulo detrás del interruptor</span></td>
<td data-label="Instalación"><span class="td-val">obra eléctrica</span></td>
<td data-label="¿Permiso del propietario?"><span class="td-val"><strong>sí</strong></span></td>
<td data-label="¿Te lo llevas?"><span class="td-val">no recomendable</span></td>
<td data-label="Protocolo habitual"><span class="td-val">—</span></td>
</tr>
<tr>
<td data-label="Equipo"><span class="td-val">Termostato de caldera</span></td>
<td data-label="Instalación"><span class="td-val">cableado</span></td>
<td data-label="¿Permiso del propietario?"><span class="td-val"><strong>sí</strong></span></td>
<td data-label="¿Te lo llevas?"><span class="td-val">—</span></td>
<td data-label="Protocolo habitual"><span class="td-val">—</span></td>
</tr>
</tbody>
</table>
</div>

**Nuestra recomendación para empezar en alquiler: dongle Zigbee en Home Assistant más enchufes y sensores Zigbee.** Nada va fijado al muro y el día de la mudanza cabe en una caja. Dongles: [comparativa de dongles Zigbee](/es/domotica/mejor-dongle-zigbee-home-assistant/).

## Equipos sin riesgo

**Enchufes inteligentes.** Entrada ideal: programar calefactor, medir consumo, apagar a distancia. Respeta la carga máxima del fabricante (a menudo 16 A en Schuko) y evita regletas en cascada. En [enchufes inteligentes](/es/domotica/enchufes-inteligentes/) explicamos qué modelos miden consumo.

**Sensores a pilas.** Temperatura, humedad, ventana, fuga de agua: se colocan o pegan. Guía: [sensores de temperatura Zigbee](/es/domotica/sensor-temperatura-zigbee/). Usa adhesivos reposicionables para no dañar la pintura.

**Botones inalámbricos.** Un botón Zigbee junto a la puerta puede apagar todas las luces al salir, sin tocar el cableado.

## Equipos a comprobar

**Cabezales termostáticos.** En radiadores de agua con válvula termostática, la cabeza se desenrosca y se cambia por una conectada, sin vaciar. Guarda la antigua. Comprueba el roscado con el adaptador incluido.

**Cámaras.** Una cámara interior no es un problema técnico. Filmar zonas comunes del edificio o la calle no está permitido: orienta solo hacia tu vivienda, como recuerda la [AEPD sobre videovigilancia en el hogar](https://www.aepd.es/es/documento/videovigilancia-en-el-hogar).

## Lo que debe quedarse en la vivienda

Módulos empotrados, persianas motorizadas en obra, cuadro eléctrico, termostato de caldera: modifican la vivienda. Pide autorización por escrito y un electricista.

## El «cerebro»: discreto y transportable

Un [Home Assistant Green o Raspberry Pi 5](/es/domotica/home-assistant-green-vs-raspberry-pi-5/) se conecta al router por cable. Al mudarte, lo enchufas en la nueva casa: automatizaciones e historial siguen contigo. Para elegir sistema: [Home Assistant, Jeedom, Homey](/es/domotica/home-assistant-jeedom-homey-que-sistema/) y [cómo empezar](/es/domotica/como-empezar/).

Un robot educativo en la misma vivienda se elige por el suelo libre, el ruido de los motores y una sola caja el día de la mudanza: [equipo de robótica para inquilinos](/es/equipo-robotica-para-inquilinos/).

[Todas las guías](/es/domotica/)
