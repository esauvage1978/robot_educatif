---
layout: ../../../layouts/EsPost.astro
title: "Respaldo eléctrico Home Assistant: SAI, estación y NUT"
description: "Apagones: dimensionar SAI o estación, NUT en HA, apagado limpio del Pi y router Zigbee. Tabla de consumos y autonomía."
updated: "3 de noviembre de 2026"
---

> **Respuesta rápida** — Mide **vatios reales** (Pi + router + dongle Zigbee). Un **SAI USB (NUT)** basta para cortes cortos; una **estación** (>300 Wh) para muchas horas. Prueba desenchufando la toma del respaldo, no solo el botón.

Hub: [domótica](/es/domotica/) · [instalar HA en Pi 5](/es/domotica/instalar-home-assistant-raspberry-pi-5/) · [comparativa hubs](/es/domotica/home-assistant-jeedom-homey-que-sistema/) · [Zigbee](/es/domotica/mejor-dongle-zigbee-home-assistant/).

![Respaldo eléctrico — SAI y estación para Home Assistant](/images/illustrations/secours-electrique-home-assistant-onduleur-station.webp)

*Ilustración — dimensionamiento UPS/estación, robot-educatif.info.*

Un corte de segundos reinicia Home Assistant, el router y parte de la malla Zigbee. En cortes largos desaparecen alarmas y sensores justo cuando más los necesitas. Cómo **dimensionar** respaldo, elegir **SAI vs estación**, ver batería en HA y **apagar limpio** antes de quedarte sin carga.

## Objetivo

- Consumo real del núcleo domótico.  
- Autonomía o capacidad necesaria.  
- Tiempo de conmutación compatible.  
- Alertas y apagado automático de HA.

## Qué debe seguir encendido

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Equipo</th>
<th scope="col">Por qué</th>
</tr></thead><tbody>
<tr>
<td data-label="Equipo"><span class="td-val">Servidor HA (Pi 5, Green…)</span></td>
<td data-label="Por qué"><span class="td-val">automatizaciones y notificaciones</span></td>
</tr>
<tr>
<td data-label="Equipo"><span class="td-val">Dongle/coordinador Zigbee</span></td>
<td data-label="Por qué"><span class="td-val">enlace con sensores</span></td>
</tr>
<tr>
<td data-label="Equipo"><span class="td-val">Router (y ONT fibra si va aparte)</span></td>
<td data-label="Por qué"><span class="td-val">móvil y acceso remoto</span></td>
</tr>
<tr>
<td data-label="Equipo"><span class="td-val">Switch de red</span></td>
<td data-label="Por qué"><span class="td-val">sin él no hay LAN local</span></td>
</tr>
</tbody>
</table>
</div>

Sensores a pilas siguen emitiendo. **Enchufes Zigbee enchufados** hacen de repetidor: si no están en respaldo, sensores lejanos pueden caer. Revisa mapa en ZHA o Zigbee2MQTT.

## Medir y calcular

Suma potencias medidas con wattímetro (W).  
**E = Wh × % usable × rendimiento**; **t (h) = E / P**.

Ejemplo: Green ~3 W + router medido 15 W + switch 2 W → **20 W**. Estación 300 Wh, salida 230 V, ~85 % rendimiento → unas **11 h**. Para **24 h** con 20 W hacen falta ~**630 Wh**.

La **caja del operador** (Movistar, Orange, Vodafone, Digi…) suele pesar más que el propio Pi.

Green admite **12 V DC** (5,5 × 2,1 mm): si la estación tiene salida 12 V compatible, evitas doble conversión; comprueba ficha antes.

## SAI vs estación

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col"> </th>
<th scope="col">SAI (UPS)</th>
<th scope="col">Estación eléctrica</th>
</tr></thead><tbody>
<tr>
<td><span class="td-val">Uso</span></td>
<td data-label="SAI (UPS)"><span class="td-val">minutos a pocas horas + apagado limpio</span></td>
<td data-label="Estación eléctrica"><span class="td-val">gran reserva</span></td>
</tr>
<tr>
<td><span class="td-val">Conmutación</span></td>
<td data-label="SAI (UPS)"><span class="td-val">diseñada para ello</span></td>
<td data-label="Estación eléctrica"><span class="td-val">solo si marca función UPS/EPS</span></td>
</tr>
<tr>
<td><span class="td-val">HA</span></td>
<td data-label="SAI (UPS)"><span class="td-val">USB HID + NUT</span></td>
<td data-label="Estación eléctrica"><span class="td-val">raro; a menudo app/nube</span></td>
</tr>
<tr>
<td><span class="td-val">Autonomía a 20 W</span></td>
<td data-label="SAI (UPS)"><span class="td-val">horas</span></td>
<td data-label="Estación eléctrica"><span class="td-val">medio día o más</span></td>
</tr>
</tbody>
</table>
</div>

**Passthrough ≠ UPS**: leer tiempo de conmutación en ficha del fabricante.

Estaciones: ALLPOWERS, BLUETTI, EcoFlow… SAI: modelo con USB y lista [NUT HCL](https://networkupstools.org/stable-hcl.html) ([Amazon.es SAI USB](https://www.amazon.es/s?k=SAI+USB+HID&tag=roboteducat07-21)).

## Probar un corte real

Carga completa, desenchufa la **toma del SAI/estación** (no solo botón), comprueba que el Pi no reinicia y recalcula autonomía.

## NUT en Home Assistant

Onduletor USB → add-on **Network UPS Tools** + integración **NUT** → `sensor.ups_status`, `sensor.ups_battery_charge`.

Estación sin NUT: **testigo** en enchufe **no** respaldado (ESP32 o enchufe que pase a `unavailable`).

Automatización: aviso al pasar a batería; a &lt;25 % con condición «On Battery», notificar y `hassio.host_shutdown` tras 2 min.

## Reinicio al volver la luz

Tras apagado limpio, a veces hace falta **corte y restablecimiento** de la salida del SAI para que el Pi arranque; configura aviso «HA ha iniciado».

## FAQ respaldo

**¿Basta un SAI de 600 VA?** Depende de vatios reales — mira la etiqueta del router, no solo el Pi.

**¿Estación sin NUT?** Usa sensor de red o enchufe testigo para alertas.

Errores: dimensionar por etiqueta del cargador; olvidar router; SAI sobrecargado; integración cloud que falla sin Internet.

Más: [cómo empezar](/es/domotica/como-empezar/), [CO2 Pi](/es/domotica/raspberry-pi-co2-scd41-home-assistant/), [cámara solar](/es/domotica/camara-vigilancia-exterior-solar-iegeek/).

[Todas las guías](/es/domotica/)
