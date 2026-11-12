---
layout: ../../../layouts/EsPost.astro
title: "Domótica para principiantes: ¿por dónde empezar en 2026?"
description: "Un primer plan de domótica práctico para pisos y casas en España: Wi-Fi, Zigbee, Thread y Matter explicados, qué comprar primero y qué normas eléctricas tener en cuenta."
updated: "24 de octubre de 2026"
---

Una casa inteligente no tiene por qué empezar con una gran central y un fin de semana de cables. Esta guía propone un camino paso a paso que funciona igual en un **piso de alquiler** que en una **casa en propiedad**, y señala lo que importa en España: **enchufes, marcado y quién puede tocar la instalación**.

## 1. Tres preguntas antes de la primera compra

1. **¿Qué quieres automatizar primero?** ¿Luces, calefacción, un aviso cuando termina la lavadora o la medición del consumo? Empieza por una necesidad real.
2. **¿Te gusta trastear?** Los aparatos Wi-Fi funcionan al momento con una app; Zigbee y Home Assistant ofrecen control local, pero piden algo de configuración.
3. **¿Vives de alquiler o en propiedad?** Si alquilas, quédate con **aparatos enchufables** y sensores a pilas, que no dejan huella.

## 2. Los protocolos, explicados de forma sencilla

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Protocolo</th>
<th scope="col">Puntos fuertes</th>
<th scope="col">Límites</th>
<th scope="col">Ideal para</th>
</tr></thead><tbody>
<tr>
<td data-label="Protocolo"><span class="td-val"><strong>Wi-Fi (2,4 GHz)</strong></span></td>
<td data-label="Puntos fuertes"><span class="td-val">sin central, app sencilla</span></td>
<td data-label="Límites"><span class="td-val">consume más, a menudo depende de la nube del fabricante</span></td>
<td data-label="Ideal para"><span class="td-val">el primer enchufe o bombilla inteligente</span></td>
</tr>
<tr>
<td data-label="Protocolo"><span class="td-val"><strong>Zigbee 3.0</strong></span></td>
<td data-label="Puntos fuertes"><span class="td-val">bajo consumo, red mallada, funciona en local</span></td>
<td data-label="Límites"><span class="td-val">necesita un coordinador USB o una central</span></td>
<td data-label="Ideal para"><span class="td-val">sensores, enchufes, cabezales termostáticos</span></td>
</tr>
<tr>
<td data-label="Protocolo"><span class="td-val"><strong>Thread</strong></span></td>
<td data-label="Puntos fuertes"><span class="td-val">mallado, bajo consumo, basado en IP</span></td>
<td data-label="Límites"><span class="td-val">por ahora, menos aparatos</span></td>
<td data-label="Ideal para"><span class="td-val">aparatos a pilas pensados para durar</span></td>
</tr>
<tr>
<td data-label="Protocolo"><span class="td-val"><strong>Matter</strong></span></td>
<td data-label="Puntos fuertes"><span class="td-val">un único estándar para Apple Casa, Google Home, Alexa y SmartThings</span></td>
<td data-label="Límites"><span class="td-val">aún en evolución; funciona sobre Wi-Fi o Thread</span></td>
<td data-label="Ideal para"><span class="td-val">comprar sin atarse a una marca</span></td>
</tr>
</tbody>
</table>
</div>

## 3. Lo básico de la electricidad en España

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col"> </th>
<th scope="col">España</th>
</tr></thead><tbody>
<tr>
<td><span class="td-val">Enchufes</span></td>
<td data-label="España"><span class="td-val">Schuko tipo F; las clavijas planas europeas (tipo C) también encajan</span></td>
</tr>
<tr>
<td><span class="td-val">Tensión de red</span></td>
<td data-label="España"><span class="td-val">230 V, 50 Hz</span></td>
</tr>
<tr>
<td><span class="td-val">Marcado</span></td>
<td data-label="España"><span class="td-val">CE (conformidad UE)</span></td>
</tr>
<tr>
<td><span class="td-val">Interruptores y relés empotrados</span></td>
<td data-label="España"><span class="td-val">los trabajos en la instalación fija debe hacerlos un instalador electricista autorizado, conforme al REBT</span></td>
</tr>
</tbody>
</table>
</div>

**Regla práctica:** compra siempre los aparatos enchufables en la **versión para tu país**. Un adaptador de viaje no es una solución segura a largo plazo, sobre todo con cargas grandes como un calefactor.

## 4. Un camino paso a paso

**Paso 1: empezar con Wi-Fi, sin central.** Uno o dos enchufes inteligentes con medición de consumo bastan para programar una lámpara y ver cuánto gastan de verdad tus aparatos. Shelly ofrece enchufes en versiones por país: consulta la [gama de enchufes Shelly](https://www.shelly.com/collections/smart-plugs) y elige la versión europea (Schuko).

**Paso 2: añadir una central.** Para el control local, instala [Home Assistant](https://www.home-assistant.io/) en un **Home Assistant Green** listo para usar o en una **Raspberry Pi 5**: comparativa en [Home Assistant Green vs Raspberry Pi 5](/es/domotica/home-assistant-green-vs-raspberry-pi-5/).

**Paso 3: añadir un coordinador Zigbee y los primeros sensores.** Los sensores de temperatura, apertura y movimiento son baratos y duran meses con una pila de botón. Mira [el mejor dongle Zigbee para Home Assistant](/es/domotica/mejor-dongle-zigbee-home-assistant/).

**Paso 4: ampliar donde aporte.** Módulos detrás de los interruptores (trabajo de instalador, ver [Shelly Gen4: qué módulo elegir](/es/shelly-gen4-que-modulo-elegir/)), cabezales termostáticos, un robot aspirador o sensores ESP32 hechos en casa.

## 5. Errores que conviene evitar

- Comprar aparatos que necesitan cinco apps distintas: da prioridad a **Matter** o **Zigbee** para tenerlo todo en el mismo sitio.
- Usar un enchufe barato sin marcado para un calefactor o un hervidor: revisa la **carga máxima** y el **marcado CE**.
- Recablear tú mismo los interruptores de la luz sin la cualificación necesaria.

**Siguiente lectura:** [Enchufes inteligentes para España](/es/domotica/enchufes-inteligentes/).

[Todas las guías de domótica](/es/domotica/)
