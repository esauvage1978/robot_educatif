---
layout: ../../../layouts/EsPost.astro
title: "Zigbee2MQTT o ZHA: cuál elegir para Home Assistant"
description: "ZHA o Zigbee2MQTT en Home Assistant: diferencias, instalación paso a paso, dongles compatibles y errores habituales."
updated: "24 de octubre de 2026"
---

Has conectado un **dongle Zigbee** al Raspberry Pi o al Home Assistant Green y Home Assistant ofrece **ZHA** o **Zigbee2MQTT**. Ambos hablan con tus sensores, enchufes y bombillas Zigbee, pero de forma distinta. Guía basada en documentación oficial de [ZHA](https://www.home-assistant.io/integrations/zha/) y [Zigbee2MQTT](https://www.zigbee2mqtt.io/guide/getting-started/) (octubre 2026). Sin cifras de alcance inventadas.

## Respuesta corta

- **¿Empiezas y quieres rapidez?** **ZHA**. Integración incluida: sin MQTT extra, todo en la interfaz habitual.
- **¿Bricolaje, dispositivos raros o datos fuera de HA?** **Zigbee2MQTT**. Corre aparte, publica en MQTT, interfaz web detallada.
- **Solo uno a la vez por dongle.** Un coordinador, un software.

## Esquema

ZHA:          sensor → dongle → Home Assistant (ZHA)
Zigbee2MQTT:  sensor → dongle → Z2M → Mosquitto → Home Assistant

## Tabla comparativa

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col"> </th>
<th scope="col"><strong>ZHA</strong></th>
<th scope="col"><strong>Zigbee2MQTT</strong></th>
</tr></thead><tbody>
<tr>
<td><span class="td-val">Dónde corre</span></td>
<td data-label="**ZHA**"><span class="td-val">Integrado en HA</span></td>
<td data-label="**Zigbee2MQTT**"><span class="td-val">App/complemento aparte</span></td>
</tr>
<tr>
<td><span class="td-val">MQTT</span></td>
<td data-label="**ZHA**"><span class="td-val">No hace falta</span></td>
<td data-label="**Zigbee2MQTT**"><span class="td-val">Obligatorio (Mosquitto)</span></td>
</tr>
<tr>
<td><span class="td-val">Instalación</span></td>
<td data-label="**ZHA**"><span class="td-val">Pocos clics</span></td>
<td data-label="**Zigbee2MQTT**"><span class="td-val">Mosquitto + repo + app Z2M</span></td>
</tr>
<tr>
<td><span class="td-val">Interfaz</span></td>
<td data-label="**ZHA**"><span class="td-val">Ajustes de HA</span></td>
<td data-label="**Zigbee2MQTT**"><span class="td-val">Web propia</span></td>
</tr>
<tr>
<td><span class="td-val">Claves (familia chip)</span></td>
<td data-label="**ZHA**"><span class="td-val">Silicon Labs, TI, deCONZ, ZiGate</span></td>
<td data-label="**Zigbee2MQTT**"><span class="td-val">TI y Silicon Labs recomendados</span></td>
</tr>
<tr>
<td><span class="td-val">Dispositivos raros</span></td>
<td data-label="**ZHA**"><span class="td-val">«Quirks»</span></td>
<td data-label="**Zigbee2MQTT**"><span class="td-val">«Converters»</span></td>
</tr>
<tr>
<td><span class="td-val">OTA</span></td>
<td data-label="**ZHA**"><span class="td-val">Lista limitada</span></td>
<td data-label="**Zigbee2MQTT**"><span class="td-val">Depósito comunitario</span></td>
</tr>
<tr>
<td><span class="td-val">Fuera de HA</span></td>
<td data-label="**ZHA**"><span class="td-val">No</span></td>
<td data-label="**Zigbee2MQTT**"><span class="td-val">Cualquier cliente MQTT</span></td>
</tr>
<tr>
<td><span class="td-val">Hardware mínimo</span></td>
<td data-label="**ZHA**"><span class="td-val">El de HA</span></td>
<td data-label="**Zigbee2MQTT**"><span class="td-val">Pi 4 recomendado (Pi 3 inestable)</span></td>
</tr>
</tbody>
</table>
</div>

## ZHA: ventajas y límites

**Ventajas**: nada más que instalar; detección automática de muchos dongles; copias de red y migración entre claves (Silicon Labs, TI, ConBee) sin reemparejar; mapa en *Ajustes → Conectividad → Zigbee*.

**Límites**: dispositivos no estándar pueden quedar a medias hasta tener quirk; sensores solo visibles en HA.

## Zigbee2MQTT: ventajas y límites

**Ventajas**: web completa; [lista de dispositivos](https://www.zigbee2mqtt.io/supported-devices/) para comprobar antes de comprar; MQTT usable desde Node-RED o scripts Python ([tutoriales Pi](/es/domotica/raspberry-pi-sensor-puerta-notificacion/)).

**Límites**: Mosquitto + Z2M que mantener; más exigente en CPU.

## Dongles

**SONOFF ZBDongle-E** (EFR32MG21) funciona en ambos. **Home Assistant Connect ZBT-2** (MG24) es oficial; Zigbee o Thread. Detalle: [mejor dongle Zigbee](/es/domotica/mejor-dongle-zigbee-home-assistant/).

El precio del ZBDongle-E se lee en la ficha del vendedor en España.

**Consejo Z2M**: extensión USB ~1 m para alejar el dongle del Pi y del USB 3.

## Instalar ZHA

1. Dongle en el Pi/Green (mejor con extensión USB).  
2. Si aparece descubierto: *Ajustes → Dispositivos y servicios → Configurar*.  
3. Si no: *Añadir integración → Zigbee Home Automation* y el puerto serie.  
4. *Conectividad → Zigbee → Añadir dispositivo* y reset del sensor según manual.

## Instalar Zigbee2MQTT (HA OS)

Si ZHA usa el dongle, **elimina ZHA** antes.

1. App **Mosquitto broker** e iniciar.  
2. Repositorio `https://github.com/zigbee2mqtt/hassio-zigbee2mqtt`.  
3. App **Zigbee2MQTT** (estable, no Edge) e iniciar.  
4. Asistente web: elige dongle, canal Wi-Fi cercano.  
5. Emparejar desde la web Z2M; entidades llegan por MQTT.

SONOFF ZBDongle-E, ejemplo config:

adapter: ember
port: /dev/serial/by-id/usb-…-if00-port0

## Cambiar de uno a otro

Migración sin reemparejar solo **entre claves dentro de ZHA**. Cambiar ZHA ↔ Z2M implica **reemparejar**. Copia de seguridad completa antes.

## Errores frecuentes

- Dongle «ocupado»: solo ZHA o Z2M (o deCONZ), no ambos.  
- Caídas de red: fija canal Wi-Fi del router; añade **repetidores** (enchufes Zigbee).  
- Cambiar canal Zigbee en ZHA: puede tardar hasta ~1 h en reajustarse.  
- En Linux contenedor: desinstalar `modemmanager` si roba el USB (doc ZHA).

## Perfil

- **Familia, 5–20 dispositivos comunes**: **ZHA**.  
- **Maker + MQTT/Python**: **Zigbee2MQTT**.  
- **Modelo concreto**: búscalo en listas de soporte de ambos antes de elegir.

## FAQ

**¿Dos dongles, ZHA y Z2M a la vez?** Sí con dos redes separadas; poco útil en casa.

**¿Z2M más «pro»?** Más detalle, no necesariamente mejor para ti.

**¿MQTT para ZHA?** No.

**¿ConBee II?** ZHA (deCONZ) y Z2M (`deconz`); prioridad TI/Silicon Labs en Z2M.

**¿Pi 3?** Z2M pide Pi 4+. Hardware HA: [Green vs Pi 5](/es/domotica/home-assistant-green-vs-raspberry-pi-5/).

## Más lectura

- [Instalar Home Assistant en Pi 5](/es/domotica/instalar-home-assistant-raspberry-pi-5/)  
- [Sensor temperatura Zigbee](/es/domotica/sensor-temperatura-zigbee/)  
- [Enchufes inteligentes](/es/domotica/enchufes-inteligentes/)  
- [PIR Raspberry Pi](/es/domotica/raspberry-pi-sensor-movimiento-luces/)

*Enlaces Amazon.es tag roboteducat07-21. Comparativa documental, sin prueba física.*

[Todas las guías](/es/domotica/)
