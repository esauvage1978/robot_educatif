---
layout: ../../../layouts/EsPost.astro
title: "Zigbee, Wi-Fi, Z-Wave, Thread o Matter: ¿qué protocolo domótico elegir?"
description: "Protocolos domóticos explicados de forma sencilla: frecuencias, malla, pasarela, consumo y compatibilidad con Home Assistant. Tabla comparativa y consejos para empezar."
updated: "24 de octubre de 2026"
---

Antes de comprar el primer sensor, conviene elegir **el idioma que hablarán tus dispositivos**. Un enchufe Wi-Fi, un sensor Zigbee y una bombilla Matter no se conectan igual, y esa decisión condiciona la pasarela que necesitas. Esta página resume los cinco protocolos que verás en tienda, a partir de documentación oficial ([Connectivity Standards Alliance](https://csa-iot.org/all-solutions/matter/), [Thread Group](https://www.threadgroup.org/What-is-Thread/Overview), [Z-Wave Alliance](https://z-wavealliance.org/), [integraciones Home Assistant](https://www.home-assistant.io/integrations/)).

## Lo esencial en una tabla

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Protocolo</th>
<th scope="col">Frecuencia (Europa / España)</th>
<th scope="col">Red</th>
<th scope="col">¿Pasarela?</th>
<th scope="col">Consumo</th>
<th scope="col">En Home Assistant</th>
</tr></thead><tbody>
<tr>
<td data-label="Protocolo"><span class="td-val"><strong>Wi-Fi</strong></span></td>
<td data-label="Frecuencia (Europa / España)"><span class="td-val">2,4 GHz (a veces 5 GHz)</span></td>
<td data-label="Red"><span class="td-val">estrella alrededor del router</span></td>
<td data-label="¿Pasarela?"><span class="td-val">no</span></td>
<td data-label="Consumo"><span class="td-val">alto: dispositivos enchufados</span></td>
<td data-label="En Home Assistant"><span class="td-val">según marca (local o nube)</span></td>
</tr>
<tr>
<td data-label="Protocolo"><span class="td-val"><strong>Zigbee</strong></span></td>
<td data-label="Frecuencia (Europa / España)"><span class="td-val">2,4 GHz (IEEE 802.15.4)</span></td>
<td data-label="Red"><span class="td-val">malla: los enchufados hacen de repetidor</span></td>
<td data-label="¿Pasarela?"><span class="td-val">sí: coordinador (dongle USB)</span></td>
<td data-label="Consumo"><span class="td-val">muy bajo: sensores a pilas meses</span></td>
<td data-label="En Home Assistant"><span class="td-val">ZHA (integrado) o Zigbee2MQTT</span></td>
</tr>
<tr>
<td data-label="Protocolo"><span class="td-val"><strong>Z-Wave</strong></span></td>
<td data-label="Frecuencia (Europa / España)"><span class="td-val">868,4 MHz</span></td>
<td data-label="Red"><span class="td-val">malla</span></td>
<td data-label="¿Pasarela?"><span class="td-val">sí: controlador Z-Wave</span></td>
<td data-label="Consumo"><span class="td-val">muy bajo</span></td>
<td data-label="En Home Assistant"><span class="td-val">Z-Wave JS</span></td>
</tr>
<tr>
<td data-label="Protocolo"><span class="td-val"><strong>Thread</strong></span></td>
<td data-label="Frecuencia (Europa / España)"><span class="td-val">2,4 GHz (IEEE 802.15.4)</span></td>
<td data-label="Red"><span class="td-val">malla, IPv6</span></td>
<td data-label="¿Pasarela?"><span class="td-val">sí: «border router»</span></td>
<td data-label="Consumo"><span class="td-val">muy bajo</span></td>
<td data-label="En Home Assistant"><span class="td-val">integraciones Thread y Matter</span></td>
</tr>
<tr>
<td data-label="Protocolo"><span class="td-val"><strong>Matter</strong></span></td>
<td data-label="Frecuencia (Europa / España)"><span class="td-val">sobre Wi-Fi, Thread o Ethernet</span></td>
<td data-label="Red"><span class="td-val">capa de aplicación común</span></td>
<td data-label="¿Pasarela?"><span class="td-val">depende del transporte</span></td>
<td data-label="Consumo"><span class="td-val">depende del transporte</span></td>
<td data-label="En Home Assistant"><span class="td-val">integración Matter</span></td>
</tr>
</tbody>
</table>
</div>

**Nuestra recomendación para empezar: Zigbee**, con un coordinador USB en Home Assistant. El catálogo es amplio, los sensores son baratos y duran mucho con pilas, y todo puede quedarse en local. Los dongles que comparamos están en la [guía de dongles Zigbee](/es/domotica/mejor-dongle-zigbee-home-assistant/).

## Wi-Fi: lo más simple, no lo más eficiente

Un dispositivo Wi-Fi se conecta directo al router: no hace falta pasarela. Ideal para un [enchufe inteligente](/es/domotica/enchufes-inteligentes/) o una cámara, enchufados a la red. En cambio el Wi-Fi consume demasiado para un sensor a pilas, y cada aparato ocupa un hueco en la red. Muchos productos Wi-Fi de entrada pasan por la nube del fabricante: comprueba que exista integración **local** antes de comprar.

## Zigbee: el estándar de los sensores

Zigbee usa la radio IEEE 802.15.4 a 2,4 GHz. Los dispositivos enchufados (enchufes, bombillas) **retransmiten** mensajes: cuantos más haya, más lejos llega la red. Hace falta un **coordinador**, en la práctica un dongle USB, y Home Assistant lo gestiona con ZHA o Zigbee2MQTT. Detalle en [Zigbee2MQTT o ZHA](/es/domotica/zigbee2mqtt-o-zha-home-assistant/). Ejemplo: el [sensor de temperatura Zigbee](/es/domotica/sensor-temperatura-zigbee/) aguanta meses con una pila botón.

Atención: Zigbee y Wi-Fi comparten la banda 2,4 GHz. Aleja el dongle del router con una extensión USB y elige canales que no se solapen.

## Z-Wave: robusto, catálogo más pequeño

Z-Wave emite en **868,4 MHz** en Europa, lejos del Wi-Fi, con menos interferencias. Red en malla y productos certificados. A cambio, menos modelos y suele costar más que el equivalente Zigbee. La frecuencia cambia por región (908,4 MHz en EE. UU.): un módulo americano no vale en España.

## Thread y Matter: la nueva generación

**Thread** es una malla de bajo consumo sobre IEEE 802.15.4, con IPv6: cada dispositivo tiene IP. Necesita un **border router**; algunos altavoces y routers recientes lo incluyen.

**Matter** no es una radio: es un lenguaje común (Connectivity Standards Alliance) sobre Wi-Fi, Thread o Ethernet. Un dispositivo Matter puede usarse desde varios ecosistemas (Home Assistant, Apple, Google, Amazon). La lista de tipos crece en cada versión, pero sigue siendo más corta que Zigbee: comprueba la categoría antes de comprar.

## Consejo según tu situación

- **Empiezas con Home Assistant**: Zigbee para sensores, Wi-Fi local para enchufes y cámaras.
- **Quieres compatibilidad con Apple, Google y Amazon a la vez**: prioriza dispositivos Matter.
- **Hormigón, distancias largas**: Z-Wave o una malla Zigbee bien reforzada con enchufes repetidores.
- **Quieres montar tus sensores**: [ESP32 con ESPHome](/es/domotica/esp32-esphome-sensor-temperatura/) usa Wi-Fi; algunas placas recientes también Thread (ver [qué placa ESP32 elegir](/es/domotica/que-placa-esp32-domotica/)).

Para el resto del camino (presupuesto, primer equipo, «cerebro» de la casa), mira [Domótica para principiantes](/es/domotica/como-empezar/) y [Home Assistant, Jeedom, Homey o caja comercial](/es/domotica/home-assistant-jeedom-homey-que-sistema/).

[Todas las guías](/es/domotica/)
